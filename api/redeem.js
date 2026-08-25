// api/redeem.js — Activation d'un code d'accès temporaire (Membre, 1 an)
//
// Les codes ne sont JAMAIS lisibles ni modifiables directement depuis le client
// (RLS sans policy sur access_codes) — toute vérification et activation passe
// obligatoirement par ce endpoint, avec la clé service_role (secrète, jamais
// exposée au navigateur). C'est ce qui empêche quiconque de lister ou deviner
// des codes valides en interrogeant Supabase directement.

import { createClient } from '@supabase/supabase-js';

const ALLOWED_ORIGINS = ['https://chassia.be', 'https://www.chassia.be'];
const ALLOWED_HOSTS   = ['chassia.be', 'www.chassia.be'];
const SUPABASE_URL    = 'https://tcnvqpwdtunmxrngisyn.supabase.co';

function nextYearISODate() {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d.toISOString();
}

export default async function handler(req, res) {
  const host = (req.headers.host || '').toLowerCase();
  if (!ALLOWED_HOSTS.includes(host)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) return res.status(500).json({ error: 'Service role key not configured' });

  try {
    const { code, access_token } = req.body || {};

    if (!code || typeof code !== 'string' || code.length > 32) {
      return res.status(400).json({ error: 'CODE_INVALID' });
    }
    if (!access_token) {
      return res.status(401).json({ error: 'SESSION_INVALID' });
    }

    const supabaseAdmin = createClient(SUPABASE_URL, serviceRoleKey);

    // Vérifie la session : seul un utilisateur réellement connecté peut activer un code
    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(access_token);
    if (userErr || !userData?.user) {
      return res.status(401).json({ error: 'SESSION_INVALID' });
    }
    const userId = userData.user.id;

    // Normalisation : espaces retirés, majuscules (les codes générés sont déjà
    // en majuscules, mais une personne peut taper en minuscules sur son téléphone)
    const normalizedCode = code.trim().toUpperCase();

    const { data: codeRow, error: codeErr } = await supabaseAdmin
      .from('access_codes')
      .select('code, tier, redeemed_by')
      .eq('code', normalizedCode)
      .maybeSingle();

    if (codeErr || !codeRow) {
      return res.status(404).json({ error: 'CODE_NOT_FOUND' });
    }
    if (codeRow.redeemed_by) {
      return res.status(409).json({ error: 'CODE_ALREADY_USED' });
    }

    // Marque le code comme utilisé -- la condition .is('redeemed_by', null)
    // protège contre une double activation simultanée : si deux requêtes
    // arrivent en même temps pour le même code, une seule peut réussir
    // (l'autre trouve 0 ligne modifiée et échoue proprement).
    const { data: claimed, error: claimErr } = await supabaseAdmin
      .from('access_codes')
      .update({ redeemed_by: userId, redeemed_at: new Date().toISOString() })
      .eq('code', normalizedCode)
      .is('redeemed_by', null)
      .select();

    if (claimErr || !claimed || claimed.length === 0) {
      return res.status(409).json({ error: 'CODE_ALREADY_USED' });
    }

    const expiresAt = nextYearISODate();
    const nextReset = new Date();
    nextReset.setMonth(nextReset.getMonth() + 1);
    // .select() indispensable : sans lui, une mise à jour qui ne touche aucune
    // ligne (profil absent) renvoie un succès silencieux — on annoncerait une
    // activation réussie alors que rien n'a changé, ET le code serait perdu.
    const { data: updated, error: updateErr } = await supabaseAdmin
      .from('profiles')
      .update({
        tier: codeRow.tier,
        access_expires_at: expiresAt,
        credits_used: 0, // départ à plein quota, même si le profil avait déjà été utilisé avant
        credits_reset_at: nextReset.toISOString(),
      })
      .eq('id', userId)
      .select();

    if (updateErr || !updated || updated.length === 0) {
      // Le palier n'a pas pu être appliqué : on REND le code à son propriétaire
      // plutôt que de le laisser consommé pour rien. Il pourra réessayer.
      await supabaseAdmin
        .from('access_codes')
        .update({ redeemed_by: null, redeemed_at: null })
        .eq('code', normalizedCode);
      return res.status(500).json({ error: 'PROFILE_UPDATE_FAILED' });
    }

    return res.status(200).json({ ok: true, tier: codeRow.tier, expires_at: expiresAt });
  } catch (error) {
    console.error('redeem route error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
