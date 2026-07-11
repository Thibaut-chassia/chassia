// api/claude.js — Proxy Anthropic durci pour ChassIA
// Protections : CORS restreint · validation du payload · plafond max_tokens ·
// rate limiting best-effort par IP · alerte de volume best-effort (log + webhook optionnel).
//
// NOTE IMPORTANTE (limites) : les compteurs de rate limiting et d'alerte vivent EN MÉMOIRE,
// par instance serverless « chaude ». Ils freinent les abus naïfs et signalent les pics,
// mais ne sont ni globaux ni persistants (réinitialisés au démarrage à froid). La protection
// fiable et exacte viendra avec le comptage côté serveur (Supabase / store partagé).

// ── Réglages (ajustables) ──────────────────────────────────────────────────
const ALLOWED_ORIGINS    = ['https://chassia.be', 'https://www.chassia.be']; // apex + www ; appels de l'app en relatif → same-origin, non affectés
const ALLOWED_HOSTS      = ['chassia.be', 'www.chassia.be'];
const ALLOWED_MODELS     = ['claude-sonnet-4-6', 'claude-opus-4-8'];
const MAX_TOKENS_DEFAULT = 1500;   // aligné avec le frontend
const MAX_TOKENS_CAP     = 2000;   // plafond dur (coût par requête maîtrisé)
const MAX_MESSAGES       = 50;     // nb max de messages dans une requête
const MAX_BODY_CHARS     = 100000; // ~100 Ko de contenu (messages / system)

// Rate limiting best-effort (par instance chaude)
const RATE_WINDOW_MS = 60000;      // fenêtre 1 minute
const RATE_MAX       = 40;         // 40 requêtes / minute / IP (large pour le CGNAT mobile)
const rateMap = new Map();         // ip -> [timestamps]

// Alerte de volume best-effort (par instance chaude)
const ALERT_WINDOW_MS = 3600000;   // fenêtre 1 heure
const ALERT_THRESHOLD = 300;       // > 300 appels/h → alerte (ajuste selon ta croissance)
let alertWindowStart = Date.now();
let alertCount = 0;
let alertSent = false;

// ── Helpers ────────────────────────────────────────────────────────────────
function clientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return String(xff).split(',')[0].trim();
  return req.headers['x-real-ip'] || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const arr = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  arr.push(now);
  rateMap.set(ip, arr);
  if (rateMap.size > 5000) rateMap.clear(); // garde-fou mémoire
  return arr.length > RATE_MAX;
}

async function trackVolume() {
  const now = Date.now();
  if (now - alertWindowStart > ALERT_WINDOW_MS) {
    alertWindowStart = now;
    alertCount = 0;
    alertSent = false;
  }
  alertCount++;
  if (alertCount > ALERT_THRESHOLD && !alertSent) {
    alertSent = true;
    console.warn(`[ALERTE] ${alertCount} appels au proxy IA en moins d'1h (seuil ${ALERT_THRESHOLD}).`);
    const hook = process.env.ALERT_WEBHOOK_URL;
    if (hook) {
      try {
        await fetch(hook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `⚠️ ChassIA : ${alertCount} appels à l'assistant IA en moins d'1h (seuil ${ALERT_THRESHOLD}). Vérifie un éventuel abus du proxy.`,
          }),
        });
      } catch (e) {
        /* alerte best-effort : on n'échoue jamais la requête pour ça */
      }
    }
  }
}

// ── Handler ────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // Rejette toute requête qui n'arrive pas via le vrai domaine de production.
  // Complète la restriction CORS ci-dessous : le CORS ne bloque que les scripts
  // d'UN AUTRE site qui appelleraient ce proxy — il ne bloque PAS un accès direct
  // à l'app via une autre adresse pointant vers ce même déploiement (ex. l'alias
  // automatique <projet>.vercel.app fourni par Vercel, ou une URL de preview).
  // Depuis cette adresse-là, l'appel serait "same-origin" et le CORS ne s'applique pas.
  const host = (req.headers.host || '').toLowerCase();
  if (!ALLOWED_HOSTS.includes(host)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // CORS restreint à l'apex + www (reflète l'origine si elle est autorisée).
  // Un site tiers qui tenterait d'appeler ce proxy depuis un navigateur sera refusé.
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  // Rate limiting best-effort par IP
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Trop de requêtes, réessaie dans un instant.' });
  }

  try {
    const { model, messages, system, max_tokens } = req.body || {};

    // Validation du modèle
    if (!ALLOWED_MODELS.includes(model)) {
      return res.status(400).json({ error: 'Model not allowed' });
    }
    // Validation des messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid messages' });
    }
    if (messages.length > MAX_MESSAGES) {
      return res.status(400).json({ error: 'Too many messages' });
    }
    // Bornes de taille (coût / abus)
    if (JSON.stringify(messages).length > MAX_BODY_CHARS) {
      return res.status(413).json({ error: 'Payload too large' });
    }
    if (typeof system === 'string' && system.length > MAX_BODY_CHARS) {
      return res.status(413).json({ error: 'System too large' });
    }

    // Plafond max_tokens
    const cappedMaxTokens = Math.min(Number(max_tokens) || MAX_TOKENS_DEFAULT, MAX_TOKENS_CAP);

    // Suivi de volume + alerte (best-effort)
    await trackVolume();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        max_tokens: cappedMaxTokens,
        system,
        messages,
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      return res.status(502).json({ error: 'Invalid response from AI provider' });
    }

    if (!response.ok) {
      // On ne relaie pas le détail interne d'Anthropic au client
      return res.status(response.status).json({ error: 'AI provider error' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('API route error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
