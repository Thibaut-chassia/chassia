// tests/chassia.test.js — Suites de tests ChassIA (Vitest)
//
// STRATÉGIE : App.jsx n'exporte ni ses données ni ses fonctions internes (tout est
// dans le composant). Plutôt que de modifier App.jsx (risque de régression sur un
// fichier de ~5000 lignes édité à la main), ces tests EXTRAIENT le code depuis le
// fichier source et l'évaluent en isolation. Aucune modification d'App.jsx requise.
//
// Couvre :
//   1. Balistique — makeTrajectory (valeurs de référence, cohérence physique)
//   2. Données — les 522 munitions (doublons, label/poids, plages, 🌿)
//   3. Résolution BC — simulation sur toutes les munitions
//   4. i18n — parité stricte des 4 langues

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = readFileSync(resolve(__dirname, '../src/App.jsx'), 'utf8');

// ─── Helpers d'extraction ────────────────────────────────────────────────────

/** Extrait un littéral (objet ou tableau) déclaré via `const NAME = ...` et l'évalue. */
function extractLiteral(name) {
  const m = SRC.match(new RegExp('const ' + name + '\\s*=\\s*'));
  if (!m) throw new Error(`Constante introuvable : ${name}`);
  let i = SRC.indexOf('{', m.index);
  const j = SRC.indexOf('[', m.index);
  if (j >= 0 && (i < 0 || j < i)) i = j;
  const open = SRC[i];
  const close = open === '{' ? '}' : ']';
  let depth = 0, k = i, inStr = false, quote = '';
  for (; k < SRC.length; k++) {
    const c = SRC[k];
    if (inStr) {
      if (c === quote && SRC[k - 1] !== '\\') inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) { k++; break; } }
  }
  // eslint-disable-next-line no-eval
  return eval('(' + SRC.slice(i, k) + ')');
}

/** Reconstruit makeTrajectory à partir de la source (fonction pure, sans React). */
function buildMakeTrajectory() {
  const m = SRC.match(/const makeTrajectory = ([\s\S]*?\n\};)/);
  if (!m) throw new Error('makeTrajectory introuvable');
  // eslint-disable-next-line no-eval
  return eval('(' + m[1].replace(/SIGHT_H_DEFAULT/g, '0.05').replace(/;$/, '') + ')');
}

/** Reproduit la résolution BC de l'app (clé-poids → gamme → sous-clé → GAMME_BC → fallback). */
function makeResolveBC(SPECIFIC_BC, GAMME_BC, CAL_FALLBACK) {
  const MARQUES = ['RWS', 'Norma', 'GECO', 'Winchester', 'Hornady', 'Lapua', 'Sako'];
  const stripGamme = (label) => {
    let g = label.replace(/\s*🌿\s*$/, '');
    for (const mk of MARQUES) if (g.startsWith(mk)) { g = g.slice(mk.length).trim(); break; }
    return g.replace(/\d+[,.]?\d*\s*g.*$/, '').trim();
  };
  return (label, cal) => {
    const g = stripGamme(label);
    const wm = label.match(/(\d+[.,]?\d*)\s*g\s*(?:🌿)?\s*$/);
    if (wm) {
      const w = parseFloat(wm[1].replace(',', '.')).toFixed(1);
      const k = `${cal}|||${g}|||${w}`;
      if (SPECIFIC_BC[k] != null) return { bc: SPECIFIC_BC[k], via: 'cle-poids' };
    }
    if (SPECIFIC_BC[`${cal}|||${g}`] != null) return { bc: SPECIFIC_BC[`${cal}|||${g}`], via: 'cle-gamme' };
    for (const [gk] of GAMME_BC) {
      if (g.toLowerCase().includes(gk.toLowerCase()) && SPECIFIC_BC[`${cal}|||${gk}`] != null) {
        return { bc: SPECIFIC_BC[`${cal}|||${gk}`], via: 'sous-cle' };
      }
    }
    for (const [gk, bc] of GAMME_BC) {
      if (g.toLowerCase().includes(gk.toLowerCase())) return { bc, via: 'gamme-bc' };
    }
    if (CAL_FALLBACK[cal] != null) return { bc: CAL_FALLBACK[cal], via: 'cal-fallback' };
    return { bc: 0.40, via: 'defaut-generique' };
  };
}

// ─── Chargement ──────────────────────────────────────────────────────────────

let MUNITIONS_DATA, SPECIFIC_BC, GAMME_BC, CAL_FALLBACK, makeTrajectory, resolveBC, allMunitions;

beforeAll(() => {
  MUNITIONS_DATA = extractLiteral('MUNITIONS_DATA');
  SPECIFIC_BC = extractLiteral('SPECIFIC_BC');
  GAMME_BC = extractLiteral('GAMME_BC');
  CAL_FALLBACK = extractLiteral('CAL_FALLBACK');
  makeTrajectory = buildMakeTrajectory();
  resolveBC = makeResolveBC(SPECIFIC_BC, GAMME_BC, CAL_FALLBACK);
  allMunitions = Object.entries(MUNITIONS_DATA).flatMap(([cal, list]) =>
    list.map((m) => ({ cal, ...m }))
  );
});

// ─── 1. BALISTIQUE ───────────────────────────────────────────────────────────

describe('Balistique — makeTrajectory', () => {
  it('touche zéro exactement à la distance de réglage (DRO)', () => {
    for (const dro of [100, 150, 200, 250]) {
      const traj = makeTrajectory(800, 0.4, dro, 0.05);
      expect(Math.abs(traj(dro))).toBeLessThan(0.5); // < 0,5 cm
    }
  });

  it('part sous la ligne de visée à la bouche (hauteur de lunette)', () => {
    const traj = makeTrajectory(800, 0.4, 100, 0.05);
    expect(traj(0)).toBeCloseTo(-5, 0); // -5 cm ≈ hauteur de visée 50 mm
  });

  it('la balle retombe au-delà de la DRO (chute monotone)', () => {
    const traj = makeTrajectory(800, 0.4, 100, 0.05);
    const d150 = traj(150), d200 = traj(200), d300 = traj(300);
    expect(d150).toBeGreaterThan(d200);
    expect(d200).toBeGreaterThan(d300);
    expect(d300).toBeLessThan(0); // clairement sous la ligne de visée à 300 m
  });

  it('une V0 plus élevée donne une trajectoire plus tendue', () => {
    const lente = makeTrajectory(700, 0.4, 100, 0.05);
    const rapide = makeTrajectory(950, 0.4, 100, 0.05);
    expect(rapide(300)).toBeGreaterThan(lente(300)); // moins de chute
  });

  it('un BC plus élevé donne une trajectoire plus tendue', () => {
    const bas = makeTrajectory(800, 0.25, 100, 0.05);
    const haut = makeTrajectory(800, 0.60, 100, 0.05);
    expect(haut(300)).toBeGreaterThan(bas(300));
  });

  it('la hauteur de visée décale bien le point de départ', () => {
    const rws = makeTrajectory(800, 0.4, 100, 0.05);   // 50 mm
    const winch = makeTrajectory(800, 0.4, 100, 0.038); // 38 mm
    expect(rws(0)).toBeLessThan(winch(0));
  });

  it('ne produit jamais NaN/Infinity sur toutes les munitions réelles', () => {
    for (const m of allMunitions) {
      const { bc } = resolveBC(m.label, m.cal);
      const traj = makeTrajectory(m.v0, bc, 150, 0.05);
      for (const d of [0, 50, 100, 200, 300]) {
        const v = traj(d);
        expect(Number.isFinite(v), `${m.cal} | ${m.label} @ ${d}m → ${v}`).toBe(true);
      }
    }
  });
});

// ─── 2. DONNÉES MUNITIONS ────────────────────────────────────────────────────

describe('Données — munitions', () => {
  it('aucun calibre vide (chaque calibre proposé a des munitions)', () => {
    const vides = Object.entries(MUNITIONS_DATA).filter(([, l]) => l.length === 0).map(([c]) => c);
    expect(vides).toEqual([]);
  });

  it('aucun doublon de label au sein d’un même calibre', () => {
    const doublons = [];
    for (const [cal, list] of Object.entries(MUNITIONS_DATA)) {
      const vus = new Set();
      for (const m of list) {
        if (vus.has(m.label)) doublons.push(`${cal} | ${m.label}`);
        vus.add(m.label);
      }
    }
    expect(doublons).toEqual([]);
  });

  it('le poids affiché dans le label correspond au champ poids', () => {
    const ecarts = [];
    for (const m of allMunitions) {
      const wm = m.label.match(/(\d+[.,]?\d*)\s*g\s*(?:🌿)?\s*$/);
      if (!wm) { ecarts.push(`${m.cal} | ${m.label} (pas de poids dans le label)`); continue; }
      const labelW = parseFloat(wm[1].replace(',', '.'));
      if (Math.abs(labelW - m.poids) >= 0.15) {
        ecarts.push(`${m.cal} | ${m.label} → champ poids=${m.poids}`);
      }
    }
    expect(ecarts).toEqual([]);
  });

  it('les valeurs physiques restent dans des plages plausibles', () => {
    const aberrants = allMunitions
      .filter((m) => !(m.v0 >= 200 && m.v0 <= 1300) || !(m.poids >= 1 && m.poids <= 35))
      .map((m) => `${m.cal} | ${m.label} (v0=${m.v0}, poids=${m.poids})`);
    expect(aberrants).toEqual([]);
  });

  it('le 🌿 du label est cohérent avec le champ sansPlomb', () => {
    const incoherents = allMunitions
      .filter((m) => m.label.includes('🌿') !== m.sansPlomb)
      .map((m) => `${m.cal} | ${m.label} (sansPlomb=${m.sansPlomb})`);
    expect(incoherents).toEqual([]);
  });

  it('chaque label commence par sa marque', () => {
    const mauvais = allMunitions
      .filter((m) => !m.label.startsWith(m.marque))
      .map((m) => `${m.cal} | ${m.label} (marque=${m.marque})`);
    expect(mauvais).toEqual([]);
  });

  it('chaque munition a les champs requis, bien typés', () => {
    for (const m of allMunitions) {
      expect(typeof m.label, `${m.cal}`).toBe('string');
      expect(typeof m.marque, m.label).toBe('string');
      expect(typeof m.sansPlomb, m.label).toBe('boolean');
      expect(typeof m.v0, m.label).toBe('number');
      expect(typeof m.poids, m.label).toBe('number');
    }
  });
});

// ─── 3. RÉSOLUTION BC ────────────────────────────────────────────────────────

describe('Résolution BC', () => {
  it('aucune munition ne tombe sur le défaut générique (0.40)', () => {
    const orphelines = allMunitions
      .filter((m) => resolveBC(m.label, m.cal).via === 'defaut-generique')
      .map((m) => `${m.cal} | ${m.label}`);
    expect(orphelines).toEqual([]);
  });

  it('tous les BC résolus sont dans une plage plausible [0.05–0.90]', () => {
    const hors = allMunitions
      .map((m) => ({ m, ...resolveBC(m.label, m.cal) }))
      .filter(({ bc }) => !(bc >= 0.05 && bc <= 0.90))
      .map(({ m, bc }) => `${m.cal} | ${m.label} → ${bc}`);
    expect(hors).toEqual([]);
  });

  it('la clé-poids désambigüe bien les gammes multi-poids (Sako Super Hammerhead 30-06)', () => {
    // Deux poids, même gamme → doivent donner des BC DIFFÉRENTS grâce à la clé-poids
    const lourd = resolveBC('Sako Super Hammerhead 11,7g', '30-06');
    const leger = resolveBC('Sako Super Hammerhead 9,7g', '30-06');
    expect(lourd.via).toBe('cle-poids');
    expect(leger.via).toBe('cle-poids');
    expect(lourd.bc).not.toBe(leger.bc);
  });

  it('les BC officiels Hornady SST Superformance sont bien actifs', () => {
    expect(resolveBC('Hornady SST Superformance 10,0g', '7mm Rem Mag').bc).toBe(0.525);
    expect(resolveBC('Hornady SST Superformance 14,6g', '.338 Win Mag').bc).toBe(0.515);
  });

  it('chaque calibre a une valeur de repli (CAL_FALLBACK)', () => {
    const sansRepli = Object.keys(MUNITIONS_DATA).filter((c) => CAL_FALLBACK[c] == null);
    expect(sansRepli).toEqual([]);
  });
});

// ─── 4. i18n ─────────────────────────────────────────────────────────────────

describe('i18n — parité des 4 langues', () => {
  const LANGUES = ['fr', 'nl', 'de', 'en'];
  const OBJETS = ['LANGS', 'UIX_I18N', 'CARNET_I18N', 'COFFRE_I18N', 'GIBIER_I18N', 'TIER_MODAL_I18N'];

  it.each(OBJETS)('%s : les 4 langues ont exactement les mêmes clés', (nom) => {
    const obj = extractLiteral(nom);
    const ref = Object.keys(obj.fr).sort();
    for (const lang of LANGUES) {
      expect(obj[lang], `${nom}.${lang} absent`).toBeDefined();
      expect(Object.keys(obj[lang]).sort(), `${nom}.${lang}`).toEqual(ref);
    }
  });

  it('NOTE_I18N : les 4 langues ont le même nombre de notes', () => {
    const notes = extractLiteral('NOTE_I18N');
    const n = notes.fr.length;
    for (const lang of LANGUES) {
      expect(notes[lang].length, `NOTE_I18N.${lang}`).toBe(n);
    }
  });

  it('aucune traduction vide', () => {
    for (const nom of OBJETS) {
      const obj = extractLiteral(nom);
      for (const lang of LANGUES) {
        for (const [cle, val] of Object.entries(obj[lang])) {
          if (typeof val === 'string') {
            expect(val.trim().length, `${nom}.${lang}.${cle} est vide`).toBeGreaterThan(0);
          }
        }
      }
    }
  });
});
