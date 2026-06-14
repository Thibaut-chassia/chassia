import { useState } from "react";

// ─── TRANSLATIONS (i18n) ─────────────────────────────────────────────────────
const LANGS = {
  fr: {
    code:"fr", flag:"🇧🇪", name:"Français", region:"Wallonie",
    subtitle:"L'ASSISTANT IA DU CHASSEUR BELGE",
    tabs:["🎯 Cible","🔫 Calibre","💥 Munition","🔒 Coffre","📖 Carnet","🦌 Gibier","🤖 Assistant IA","ℹ️ À propos"],
    tabIds:["cible","calibre","munition","coffre","carnet","gibier","assistant","apropos"],
    cibleIntro:"Génère ta cible de réglage personnalisée. Choisis ton calibre, ta munition, la distance à laquelle tu tires et la DRO souhaitée.",
    droLabel:"DRO souhaitée (m)", btnImprimer:"⎙ Imprimer la cible",
    ciblePH:'Configure ton réglage ci-dessus et clique sur "Générer" pour obtenir ta cible et les données balistiques.',
    calibreIntro:"Obtenez une recommandation de calibre adaptée à votre gibier, terrain et style de chasse.",
    gibierLabel:"Gibier ciblé *", selectionner:"Sélectionner",
    typeLabel:"Type de chasse", typePH:"— Optionnel —",
    distTirLabel:"Distance typique de tir (m)", distTirPH:"— Optionnel —",
    btnCalLoading:"Analyse…",
    calPH:"Sélectionne ton gibier pour obtenir une analyse personnalisée.",
    typeList:["Battue","Affût / Approche"],
    distTirList:["moins de 50","50 à 100","100 à 150","150 à 250","plus de 250"],
    munitionIntro:"Trouvez la munition optimale selon votre calibre, gibier et contexte de chasse.",
    munCalibreLabel:"Calibre de la carabine *", munCalPH:"— Sélectionner —",
    munTypeList:["Battue","Affût / Approche"],
    munPH:"Sélectionne ton gibier et calibre pour une recommandation détaillée.",
    assistIntro:"Pose n'importe quelle question sur la chasse en Belgique.",
    freeLabel:"question(s) restante(s) (version gratuite)",
    limitLabel:"Limite atteinte aujourd'hui",
    premiumBtn:"Passer Premium", premiumActive:"★ Premium",
    limitTitle:"Limite quotidienne atteinte",
    limitText:"Tu as utilisé tes 3 questions gratuites du jour. Passe en Premium pour des questions illimitées.",
    assistPH:"Pose ta question sur la chasse en Belgique… (Entrée pour envoyer)",
    assistLimitPH:"Limite quotidienne atteinte — passe en Premium",
    freeNote:"Version gratuite : 3 questions / jour · Illimité avec Premium",
    examples:["Quelle est la saison du sanglier en Belgique ?","Quelle distance de sécurité pour une battue ?","Peut-on chasser le chevreuil en novembre ?","Quelles sont les règles pour le tir de nuit en Belgique ?"],
    footerName:"CHASSIA BELGIQUE",
    aboutDesc1:"ChassIA est un assistant numérique destiné aux chasseurs belges. Il fournit des recommandations de calibres et munitions, génère des cibles de réglage personnalisées, et répond aux questions relatives à la chasse en Belgique.",
    aboutDesc2:"L'application est disponible en français, néerlandais, allemand et anglais.",
    aboutLegal:"Mentions légales",
    aboutEditor:"Éditeur", aboutContact:"Contact", aboutHost:"Hébergement", aboutAI:"Intelligence artificielle", aboutData:"Données personnelles", aboutCookies:"Cookies",
    aboutEditorVal:"ChassIA — Application développée et exploitée en Belgique",
    aboutContactVal:"contact@chassia.be",
    aboutHostVal:"Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    aboutAIVal:"Propulsé par Claude (Anthropic). Les réponses sont générées par IA et peuvent contenir des inexactitudes.",
    aboutDataVal:"Aucune donnée personnelle collectée sans consentement. Les préférences sont stockées localement sur votre appareil.",
    aboutCookiesVal:"Aucun cookie tiers. Stockage local uniquement pour vos préférences et votre carnet de chasse.",
    aboutWarning:"Avertissement important",
    aboutWarningText:"Les recommandations de ChassIA sont indicatives et non contractuelles. Elles ne remplacent pas les textes légaux officiels ni l'avis d'un professionnel qualifié.",
    aboutSources:"Pour toute question réglementaire, consultez les sources officielles :",
    aboutVersion:"ChassIA v1.0 · Données 2025-2030 · © 2025 ChassIA",
    footerLegal:"Les recommandations sont indicatives. Vérifiez toujours via chasse.be ou wallonie.be.",
    footerRegl:"chasse.be · wallonie.be · DNF · SPW Environnement",
    printTitle:"⎙ Impression de la cible", printFormat:"Format papier",
    printLaunch:"⎙ Lancer l'impression",
    printWarnTitle:"IMPORTANT — AVANT D'IMPRIMER",
    printWarnText:"Pour que les dimensions de la cible correspondent à la taille réelle, vérifiez dans les options d'impression que la mise à l'échelle est réglée sur « 100 % » (ou « Taille réelle »). N'activez pas « Ajuster à la page » ni aucune mise à l'échelle automatique, qui modifierait la taille des anneaux et fausserait le réglage.",
    system:`Tu es un expert en chasse wallon, spécialisé exclusivement sur la chasse en Wallonie (Belgique). Tu connais parfaitement : le Code wallon de l'Agriculture et du Bien-être animal, le décret sur la chasse en Région wallonne, les espèces chassables en Wallonie et leurs saisons officielles, les règles des cantonnements, la réglementation DNF (Département de la Nature et des Forêts), les permis de chasse wallons et leur renouvellement, les pratiques locales (battues au sanglier en Ardenne, chasse au chevreuil en Condroz, chasse en Fagnes, etc.). Tu réponds uniquement aux questions liées à la chasse : réglementation wallonne, espèces locales, techniques, équipement, armes, munitions, balistique. Tes réponses sont précises, pratiques et structurées avec des sous-titres (###), des listes et du gras pour les points importants. Pour toute question réglementaire, rappelle de vérifier sur chasse.be, wallonie.be ou auprès du DNF. Tu parles comme un chasseur wallon expérimenté, avec des références aux terrains locaux (Ardenne, Condroz, Fagne, Famenne, Hesbaye, Gaume). Rappelle toujours que les munitions au plomb sont progressivement interdites en zones humides en Wallonie. Réponds toujours en français. Sois concis (max 400 mots) mais complet.`,
  },
  nl: {
    code:"nl", flag:"🇧🇪", name:"Nederlands", region:"Vlaanderen",
    subtitle:"DE AI-ASSISTENT VOOR DE BELGISCHE JAGER",
    tabs:["🎯 Doel","🔫 Kaliber","💥 Munitie","🔒 Kluis","📖 Logboek","🦌 Wild","🤖 AI-Assistent","ℹ️ Over"],
    tabIds:["cible","calibre","munition","coffre","carnet","gibier","assistant","apropos"],
    cibleIntro:"Genereer je gepersonaliseerde regelingsdoel. Kies je kaliber, munitie, schietafstand en gewenste NRE.",
    droLabel:"Gewenste NRE (m)", btnImprimer:"⎙ Doel afdrukken",
    ciblePH:"Configureer je instelling hierboven en klik op Genereren.",
    calibreIntro:"Krijg een kaliberaanbeveling op basis van uw wild, terrein en jachtstijl.",
    gibierLabel:"Beoogd wild *", selectionner:"Selecteren",
    typeLabel:"Type jacht", typePH:"— Optioneel —",
    distTirLabel:"Typische schietafstand (m)", distTirPH:"— Optioneel —",
    btnCalLoading:"Analyse…",
    calPH:"Selecteer uw wild voor een gepersonaliseerde analyse.",
    typeList:["Drijfjacht","Bersjacht / Aanzitjacht"],
    distTirList:["minder dan 50","50 tot 100","100 tot 150","150 tot 250","meer dan 250"],
    munitionIntro:"Vind de optimale munitie voor uw kaliber, wild en jachtcontext.",
    munCalibreLabel:"Kaliber van het geweer *", munCalPH:"— Selecteren —",
    munTypeList:["Drijfjacht","Bersjacht / Aanzitjacht"],
    munPH:"Selecteer uw wild en kaliber voor een gedetailleerde aanbeveling.",
    assistIntro:"Stel elke vraag over de jacht in Vlaanderen of België.",
    freeLabel:"vraag/vragen resterend (gratis versie)",
    limitLabel:"Daglimiet bereikt",
    premiumBtn:"Premium worden", premiumActive:"★ Premium",
    limitTitle:"Dagelijkse limiet bereikt",
    limitText:"Je hebt je 3 gratis vragen van vandaag gebruikt. Ga naar Premium voor onbeperkte vragen.",
    assistPH:"Stel je vraag over de jacht in België… (Enter om te verzenden)",
    assistLimitPH:"Daglimiet bereikt — upgrade naar Premium",
    freeNote:"Gratis versie: 3 vragen/dag · Onbeperkt met Premium",
    examples:["Wat is het jachtseizoen voor wild zwijn in België?","Welke veiligheidsafstand geldt bij drijfjacht?","Mag ik ree jagen in november in Vlaanderen?","Wat zijn de regels voor nachtjacht in België?"],
    footerName:"CHASSIA BELGIË",
    aboutDesc1:"ChassIA is een digitale assistent voor Belgische jagers. De app geeft aanbevelingen over kalibers en munitie, genereert gepersonaliseerde regelingsdoelen en beantwoordt vragen over de jacht in België.",
    aboutDesc2:"De applicatie is beschikbaar in het Frans, Nederlands, Duits en Engels.",
    aboutLegal:"Wettelijke vermeldingen",
    aboutEditor:"Uitgever", aboutContact:"Contact", aboutHost:"Hosting", aboutAI:"Artificiële intelligentie", aboutData:"Persoonsgegevens", aboutCookies:"Cookies",
    aboutEditorVal:"ChassIA — Toepassing ontwikkeld en geëxploiteerd in België",
    aboutContactVal:"contact@chassia.be",
    aboutHostVal:"Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    aboutAIVal:"Aangedreven door Claude (Anthropic). Antwoorden worden gegenereerd door AI en kunnen onnauwkeurigheden bevatten.",
    aboutDataVal:"Er worden geen persoonsgegevens verzameld zonder toestemming. Voorkeuren worden lokaal op uw apparaat opgeslagen.",
    aboutCookiesVal:"Geen cookies van derden. Alleen lokale opslag voor uw voorkeuren en jachtlogboek.",
    aboutWarning:"Belangrijke waarschuwing",
    aboutWarningText:"De aanbevelingen van ChassIA zijn indicatief en niet bindend. Ze vervangen niet de officiële wetteksten of het advies van een gekwalificeerde professional.",
    aboutSources:"Voor reglementaire vragen, raadpleeg de officiële bronnen:",
    aboutVersion:"ChassIA v1.0 · Gegevens 2025-2030 · © 2025 ChassIA",
    footerLegal:"Aanbevelingen zijn indicatief. Controleer altijd via natuurenbos.vlaanderen.be.",
    footerRegl:"natuurenbos.vlaanderen.be · ANB · Jachtdecreet 1991",
    printTitle:"⎙ Doel afdrukken", printFormat:"Papierformaat",
    printLaunch:"⎙ Afdrukken starten",
    printWarnTitle:"BELANGRIJK — VÓÓR HET AFDRUKKEN",
    printWarnText:"Controleer in de afdrukopties dat de schaal is ingesteld op « 100% » (of « Werkelijke grootte »). Schakel « Aanpassen aan pagina » of automatische schaling niet in, want dat wijzigt de ringgrootte en zou uw instelling ongeldig maken.",
    system:`Je bent een Belgische jachtexpert, gespecialiseerd in Vlaanderen. Je kent de Vlaamse jachtregelgeving (ANB, jachtdecreet, Agentschap Natuur en Bos) en de Waalse regelgeving (DNF) perfect. Je beantwoordt alleen vragen over de jacht: regelgeving, soorten, technieken, uitrusting, wapens, munitie, ballistiek. Structureer je antwoorden met subtitels (###), lijsten en vet. Antwoord altijd in het NEDERLANDS. Wees beknopt (max 400 woorden).`,
  },
  de: {
    code:"de", flag:"🇧🇪", name:"Deutsch", region:"Ostbelgien",
    subtitle:"DER KI-ASSISTENT FÜR DEN BELGISCHEN JÄGER",
    tabs:["🎯 Scheibe","🔫 Kaliber","💥 Munition","🔒 Tresor","📖 Jagdbuch","🦌 Wild","🤖 KI-Assistent","ℹ️ Über uns"],
    tabIds:["cible","calibre","munition","coffre","carnet","gibier","assistant","apropos"],
    cibleIntro:"Erstellen Sie Ihre personalisierte Einstellungsscheibe. Wählen Sie Kaliber, Munition, Schussdistanz und gewünschte NDE.",
    droLabel:"Gewünschte NDE (m)", btnImprimer:"⎙ Scheibe drucken",
    ciblePH:"Konfigurieren Sie Ihre Einstellung und klicken Sie auf Generieren.",
    calibreIntro:"Erhalten Sie eine Kaliberempfehlung für Ihr Wild, Gelände und Ihre Jagdmethode.",
    gibierLabel:"Zielwild *", selectionner:"Auswählen",
    typeLabel:"Jagdart", typePH:"— Optional —",
    distTirLabel:"Typische Schussdistanz (m)", distTirPH:"— Optional —",
    btnCalLoading:"Analyse…",
    calPH:"Wählen Sie Ihr Wild für eine personalisierte Analyse.",
    typeList:["Drückjagd","Pirsch / Ansitzjagd"],
    distTirList:["unter 50","50 bis 100","100 bis 150","150 bis 250","über 250"],
    munitionIntro:"Finden Sie die optimale Munition für Ihr Kaliber, Wild und den Jagdkontext.",
    munCalibreLabel:"Kaliber des Gewehrs *", munCalPH:"— Auswählen —",
    munTypeList:["Drückjagd","Pirsch / Ansitzjagd"],
    munPH:"Wählen Sie Wild und Kaliber für eine detaillierte Empfehlung.",
    assistIntro:"Stellen Sie jede Frage zur Jagd in Belgien.",
    freeLabel:"verbleibende Frage(n) (kostenlose Version)",
    limitLabel:"Tageslimit erreicht",
    premiumBtn:"Premium werden", premiumActive:"★ Premium",
    limitTitle:"Tageslimit erreicht",
    limitText:"Sie haben Ihre 3 kostenlosen Fragen für heute verbraucht. Wechseln Sie zu Premium für unbegrenzte Fragen.",
    assistPH:"Stellen Sie Ihre Frage zur Jagd in Belgien… (Enter zum Senden)",
    assistLimitPH:"Tageslimit erreicht — auf Premium upgraden",
    freeNote:"Kostenlose Version: 3 Fragen/Tag · Unbegrenzt mit Premium",
    examples:["Was ist die Jagdzeit für Wildschweine in Belgien?","Welcher Sicherheitsabstand gilt bei Drückjagden?","Darf ich im November Rehe in Ostbelgien jagen?","Welche Munition empfehlen Sie für Wildschweine?"],
    footerName:"CHASSIA BELGIEN",
    aboutDesc1:"ChassIA ist ein digitaler Assistent für belgische Jäger. Die App gibt Empfehlungen zu Kalibern und Munition, erstellt personalisierte Einstellungsscheiben und beantwortet Fragen zur Jagd in Belgien.",
    aboutDesc2:"Die Anwendung ist auf Französisch, Niederländisch, Deutsch und Englisch verfügbar.",
    aboutLegal:"Rechtliche Hinweise",
    aboutEditor:"Herausgeber", aboutContact:"Kontakt", aboutHost:"Hosting", aboutAI:"Künstliche Intelligenz", aboutData:"Personenbezogene Daten", aboutCookies:"Cookies",
    aboutEditorVal:"ChassIA — In Belgien entwickelte und betriebene Anwendung",
    aboutContactVal:"contact@chassia.be",
    aboutHostVal:"Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    aboutAIVal:"Betrieben von Claude (Anthropic). Antworten werden von KI generiert und können Ungenauigkeiten enthalten.",
    aboutDataVal:"Ohne Zustimmung werden keine personenbezogenen Daten gesammelt. Einstellungen werden lokal auf Ihrem Gerät gespeichert.",
    aboutCookiesVal:"Keine Drittanbieter-Cookies. Nur lokale Speicherung für Ihre Einstellungen und Ihr Jagdtagebuch.",
    aboutWarning:"Wichtiger Hinweis",
    aboutWarningText:"Die Empfehlungen von ChassIA sind indikativ und nicht bindend. Sie ersetzen nicht die offiziellen Gesetzestexte oder den Rat eines qualifizierten Fachmanns.",
    aboutSources:"Für rechtliche Fragen konsultieren Sie bitte die offiziellen Quellen:",
    aboutVersion:"ChassIA v1.0 · Daten 2025-2030 · © 2025 ChassIA",
    footerLegal:"Empfehlungen sind indikativ. Überprüfen Sie immer bei Ihrer regionalen Behörde.",
    footerRegl:"ANB · DNF · Ministerium der Deutschsprachigen Gemeinschaft",
    printTitle:"⎙ Scheibe drucken", printFormat:"Papierformat",
    printLaunch:"⎙ Druck starten",
    printWarnTitle:"WICHTIG — VOR DEM DRUCKEN",
    printWarnText:"Überprüfen Sie in den Druckoptionen, dass der Maßstab auf « 100 % » (oder « Originalgröße ») eingestellt ist. Aktivieren Sie nicht « An Seite anpassen » oder automatische Skalierung, da dies die Ringgröße verändert und Ihre Einstellung ungültig machen würde.",
    system:`Du bist ein belgischer Jagdexperte, spezialisiert auf Ostbelgien und ganz Belgien. Du kennst die wallonische Jagdgesetzgebung (DNF) und die flämische Regelung (ANB) sowie die Regelungen der Deutschsprachigen Gemeinschaft. Du beantwortest ausschließlich Fragen zur Jagd: Vorschriften, Wildarten, Techniken, Ausrüstung, Waffen, Munition, Ballistik. Antworte immer auf DEUTSCH. Sei prägnant (max. 400 Wörter).`,
  },
  en: {
    code:"en", flag:"🇬🇧", name:"English", region:"Belgium",
    subtitle:"THE AI ASSISTANT FOR THE BELGIAN HUNTER",
    tabs:["🎯 Target","🔫 Caliber","💥 Ammunition","🔒 Safe","📖 Logbook","🦌 Game","🤖 AI Assistant","ℹ️ About"],
    tabIds:["cible","calibre","munition","coffre","carnet","gibier","assistant","apropos"],
    cibleIntro:"Generate your personalized zeroing target. Choose your caliber, ammunition, shooting distance and desired zero range.",
    droLabel:"Desired zero range (m)", btnImprimer:"⎙ Print target",
    ciblePH:'Configure your settings above and click "Generate" to get your target and ballistic data.',
    calibreIntro:"Get a caliber recommendation based on your game, terrain and hunting style.",
    gibierLabel:"Target game *", selectionner:"Select",
    typeLabel:"Hunting type", typePH:"— Optional —",
    distTirLabel:"Typical shooting distance (m)", distTirPH:"— Optional —",
    btnCalLoading:"Analysing…",
    calPH:"Select your game for a personalised analysis.",
    typeList:["Driven hunt","Stalking / Hide"],
    distTirList:["under 50","50 to 100","100 to 150","150 to 250","over 250"],
    munitionIntro:"Find the optimal ammunition for your caliber, game and hunting context.",
    munCalibreLabel:"Rifle caliber *", munCalPH:"— Select —",
    munTypeList:["Driven hunt","Stalking / Hide"],
    munPH:"Select your game and caliber for a detailed recommendation.",
    assistIntro:"Ask any question about hunting in Belgium.",
    freeLabel:"question(s) remaining (free version)",
    limitLabel:"Daily limit reached",
    premiumBtn:"Go Premium", premiumActive:"★ Premium",
    limitTitle:"Daily limit reached",
    limitText:"You have used your 3 free questions for today. Go Premium for unlimited questions.",
    assistPH:"Ask your question about hunting in Belgium… (Enter to send)",
    assistLimitPH:"Daily limit reached — upgrade to Premium",
    freeNote:"Free version: 3 questions/day · Unlimited with Premium",
    examples:["What is the wild boar season in Belgium?","What safety distance applies during driven hunts?","Can I hunt roe deer in November in Belgium?","What ammunition do you recommend for wild boar?"],
    footerName:"CHASSIA BELGIUM",
    aboutDesc1:"ChassIA is a digital assistant for Belgian hunters. The app provides caliber and ammunition recommendations, generates personalised zeroing targets, and answers questions about hunting in Belgium.",
    aboutDesc2:"The application is available in French, Dutch, German and English.",
    aboutLegal:"Legal notices",
    aboutEditor:"Publisher", aboutContact:"Contact", aboutHost:"Hosting", aboutAI:"Artificial intelligence", aboutData:"Personal data", aboutCookies:"Cookies",
    aboutEditorVal:"ChassIA — Application developed and operated in Belgium",
    aboutContactVal:"contact@chassia.be",
    aboutHostVal:"Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    aboutAIVal:"Powered by Claude (Anthropic). Responses are AI-generated and may contain inaccuracies.",
    aboutDataVal:"No personal data is collected without consent. Preferences are stored locally on your device.",
    aboutCookiesVal:"No third-party cookies. Local storage only for your preferences and hunting logbook.",
    aboutWarning:"Important disclaimer",
    aboutWarningText:"ChassIA recommendations are indicative and non-binding. They do not replace official legal texts or the advice of a qualified professional.",
    aboutSources:"For regulatory questions, always consult official sources:",
    aboutVersion:"ChassIA v1.0 · Data 2025-2030 · © 2025 ChassIA",
    footerLegal:"Recommendations are indicative. Always verify with your regional authority.",
    footerRegl:"ANB · DNF · Service Public de Wallonie · FPS Justice",
    printTitle:"⎙ Print target", printFormat:"Paper format",
    printLaunch:"⎙ Start printing",
    printWarnTitle:"IMPORTANT — BEFORE PRINTING",
    printWarnText:"Check in the print options that the scale is set to 100% (or Actual size). Do not enable Fit to page or automatic scaling, as this changes the ring size and would invalidate your zeroing.",
    system:`You are a Belgian hunting expert, specialised in all three Belgian regions: Wallonia (DNF, Walloon hunting decree), Flanders (ANB, hunting decree) and the German-speaking Community. You answer only questions related to hunting: regulations, species, techniques, equipment, firearms, ammunition, ballistics. Always reply in ENGLISH. Be concise (max 400 words).`,
  },
};


// ─── PALETTE & STYLES ───────────────────────────────────────────────────────
const COLORS = {
  bg: "#0d0f0a",
  bgCard: "#131508",
  bgInput: "#1a1e0f",
  border: "#2a3015",
  borderHover: "#4a5a20",
  accent: "#8fb020",
  accentDark: "#6a8415",
  accentGlow: "rgba(143,176,32,0.15)",
  text: "#e8ead8",
  textMuted: "#7a8060",
  textDim: "#4a5035",
  danger: "#c0392b",
  warn: "#e67e22",
  white: "#f5f7e8",
};

// Title set dynamically
if (typeof document !== 'undefined') {
  document.title = "ChassIA — L'assistant IA du chasseur belge";
  const favicon = document.querySelector("link[rel~='icon']") || document.createElement("link");
  favicon.rel = "icon";
  favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'><circle cx='18' cy='18' r='17' fill='%230d0f0a' stroke='%23a8c44a' stroke-width='1.5'/><circle cx='18' cy='18' r='11' fill='none' stroke='%23a8c44a' stroke-width='0.8' opacity='0.6'/><line x1='2' y1='18' x2='34' y2='18' stroke='%23a8c44a' stroke-width='1'/><line x1='18' y1='2' x2='18' y2='34' stroke='%23a8c44a' stroke-width='1'/><circle cx='18' cy='18' r='2.5' fill='%23a8c44a'/></svg>";
  document.head.appendChild(favicon);
}

const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=IBM+Plex+Mono:wght@400;500&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: 'Crimson Pro', serif; }
  
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }

  @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  @keyframes crosshair { 0%,100% { transform:scale(1); opacity:0.6; } 50% { transform:scale(1.08); opacity:1; } }
  @keyframes reticleRotate { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }

  .fade-in { animation: fadeIn 0.4s ease forwards; }

  select, input {
    background: ${COLORS.bgInput};
    color: ${COLORS.text};
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
    padding: 10px 14px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }
  select:hover, input:hover { border-color: ${COLORS.borderHover}; }
  select:focus, input:focus { border-color: ${COLORS.accent}; box-shadow: 0 0 0 2px ${COLORS.accentGlow}; }
  select option { background: #1a1e0f; }

  button {
    cursor: pointer;
    font-family: 'IBM Plex Mono', monospace;
    letter-spacing: 0.05em;
    transition: all 0.2s;
  }

  .prose h3 { font-family:'Playfair Display',serif; font-size:1.1rem; color:${COLORS.accent}; margin:1rem 0 0.4rem; }
  .prose p { line-height:1.75; font-size:1.05rem; margin-bottom:0.6rem; color:${COLORS.text}; }
  .prose ul { padding-left:1.4rem; margin-bottom:0.6rem; }
  .prose li { line-height:1.7; font-size:1.05rem; color:${COLORS.text}; margin-bottom:0.2rem; }
  .prose strong { color:${COLORS.accent}; font-weight:600; }
  .prose em { color:${COLORS.textMuted}; font-style:italic; }
`;

// ─── API CALL ────────────────────────────────────────────────────────────────
async function askClaude(prompt, systemPrompt, history = [], premium = false) {
  const model = premium ? "claude-opus-4-8" : "claude-sonnet-4-6";
  const messages = [
    ...history,
    { role: "user", content: prompt },
  ];
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      system: systemPrompt,
      messages,
    }),
  });
  let data;
  try { data = await res.json(); } catch(e) { throw new Error("Réponse invalide du serveur"); }
  if (data && data.content && data.content[0] && data.content[0].text) {
    return data.content[0].text;
  }
  throw new Error(data?.error?.message || data?.error || JSON.stringify(data).slice(0, 200));
}

// (SYSTEM_CHASSE retiré — remplacé par T.system par langue)

// ─── DATA ────────────────────────────────────────────────────────────────────
const CALIBRE_CATEGORIES = [
  {
    groupe: "Petits calibres — Renard, nuisibles, petit gibier",
    calibres: [
      { value: ".17 HMR",        label: ".17 HMR",               gibier: "Renard, nuisibles, lapins",        dro: 75,  droOptions: [50, 75, 100]           },
      { value: ".22 Hornet",     label: ".22 Hornet",             gibier: "Renard, petit gibier",             dro: 100, droOptions: [75, 100, 125]          },
      { value: ".222 Rem",       label: ".222 Remington",         gibier: "Renard, lapin de garenne",         dro: 100, droOptions: [75, 100, 125]          },
      { value: ".223 Rem",       label: ".223 Remington",         gibier: "Renard, chevreuil léger",          dro: 100, droOptions: [75, 100, 150]          },
      { value: ".22-250 Rem",    label: ".22-250 Remington",      gibier: "Renard, nuisibles longue dist.",   dro: 100, droOptions: [75, 100, 150]          },
      { value: "5.6x50R Mag",    label: "5,6×50R Magnum",         gibier: "Renard, chevreuil",                dro: 100, droOptions: [75, 100, 125]          },
      { value: "5.6x52R",        label: "5,6×52R Savage",         gibier: "Renard, petit gibier",             dro: 100, droOptions: [75, 100, 125]          },
    ],
  },
  {
    groupe: "Calibres intermédiaires — Chevreuil, chamois",
    calibres: [
      { value: ".243 Win",       label: ".243 Winchester",        gibier: "Chevreuil, jeune cerf",            dro: 150, droOptions: [100, 150, 200]         },
      { value: "6mm Rem",        label: "6 mm Remington",         gibier: "Chevreuil, renard",                dro: 150, droOptions: [100, 150, 200]         },
      { value: "6.5x55 SE",      label: "6,5×55 Swedish",         gibier: "Chevreuil, cerf, sanglier",        dro: 200, droOptions: [100, 150, 200, 250]    },
      { value: "6.5 Creedmoor",  label: "6,5 Creedmoor",          gibier: "Chevreuil, cerf, longue dist.",    dro: 200, droOptions: [100, 150, 200, 250]    },
      { value: ".260 Rem",       label: ".260 Remington",         gibier: "Chevreuil, cerf léger",            dro: 200, droOptions: [100, 150, 200]         },
      { value: "6.5 PRC",        label: "6,5 PRC",                gibier: "Cerf, longue distance",            dro: 200, droOptions: [150, 200, 250, 300]    },
      { value: "6.5x57",         label: "6,5×57",                 gibier: "Chevreuil, cerf",                  dro: 200, droOptions: [100, 150, 200]         },
      { value: "6.5x57R",        label: "6,5×57R",                gibier: "Chevreuil, cerf (arme mixte)",     dro: 200, droOptions: [100, 150, 200]         },
      { value: ".257 Roberts",   label: ".257 Roberts",           gibier: "Chevreuil, petit cerf",            dro: 150, droOptions: [100, 150, 200]         },
      { value: ".25-06 Rem",     label: ".25-06 Remington",       gibier: "Chevreuil, renard",                dro: 150, droOptions: [100, 150, 200]         },
    ],
  },
  {
    groupe: "Calibres polyvalents européens — Chevreuil, cerf, sanglier",
    calibres: [
      { value: "7x57",           label: "7×57 Mauser",            gibier: "Cerf, chevreuil, sanglier",        dro: 200, droOptions: [100, 150, 200]         },
      { value: "7x57R",          label: "7×57R",                  gibier: "Cerf, sanglier (arme mixte)",      dro: 200, droOptions: [100, 150, 200]         },
      { value: "7x64",           label: "7×64 Brenneke",          gibier: "Cerf, sanglier, daim",             dro: 200, droOptions: [100, 150, 200, 250]    },
      { value: "7x65R",          label: "7×65R",                  gibier: "Cerf, sanglier (arme mixte)",      dro: 200, droOptions: [100, 150, 200]         },
      { value: ".270 Win",       label: ".270 Winchester",        gibier: "Cerf, chevreuil, longue dist.",    dro: 200, droOptions: [100, 150, 200, 250]    },
      { value: ".270 WSM",       label: ".270 WSM",               gibier: "Cerf, longue distance",            dro: 200, droOptions: [150, 200, 250]         },
      { value: ".280 Rem",       label: ".280 Remington",         gibier: "Cerf, sanglier",                   dro: 200, droOptions: [100, 150, 200]         },
      { value: "7mm-08",         label: "7 mm-08 Remington",      gibier: "Chevreuil, cerf léger",            dro: 200, droOptions: [100, 150, 200]         },
      { value: "7mm Rem Mag",    label: "7 mm Remington Magnum",  gibier: "Cerf, tirs longue distance",       dro: 250, droOptions: [150, 200, 250, 300]    },
      { value: "7mm PRC",        label: "7 mm PRC",               gibier: "Cerf, longue distance",            dro: 250, droOptions: [150, 200, 250, 300]    },
    ],
  },
  {
    groupe: "Calibres universels — Grand gibier wallon",
    calibres: [
      { value: ".308 Win",       label: ".308 Winchester",        gibier: "Cerf, sanglier, grand gibier",     dro: 200, droOptions: [100, 150, 200, 250]    },
      { value: "30-06",          label: ".30-06 Springfield",     gibier: "Tout grand gibier wallon",         dro: 200, droOptions: [100, 150, 200, 250]    },
      { value: ".30R Blaser",    label: ".30R Blaser",            gibier: "Cerf, sanglier",                   dro: 200, droOptions: [100, 150, 200]         },
      { value: ".300 Win Mag",   label: ".300 Winchester Magnum", gibier: "Grand gibier, longue distance",    dro: 300, droOptions: [150, 200, 250, 300]    },
      { value: ".300 WSM",       label: ".300 WSM",               gibier: "Grand gibier, longue distance",    dro: 250, droOptions: [150, 200, 250, 300]    },
      { value: ".300 Wby Mag",   label: ".300 Weatherby Magnum",  gibier: "Grand gibier, très longue dist.",  dro: 300, droOptions: [200, 250, 300]         },
      { value: ".300 PRC",       label: ".300 PRC",               gibier: "Grand gibier, précision longue",   dro: 300, droOptions: [200, 250, 300]         },
    ],
  },
  {
    groupe: "Gros calibres de battue — Sanglier, cerf d'Ardenne",
    calibres: [
      { value: "8x57 JS",        label: "8×57 JS",                gibier: "Sanglier, cerf d'Ardenne",         dro: 150, droOptions: [75, 100, 150, 200]     },
      { value: "8x57 JRS",       label: "8×57 JRS",               gibier: "Sanglier (arme mixte)",            dro: 150, droOptions: [75, 100, 150]          },
      { value: "8x68S",          label: "8×68 S",                 gibier: "Grand gibier, très puissant",      dro: 200, droOptions: [100, 150, 200]         },
      { value: ".338 Win Mag",   label: ".338 Winchester Magnum", gibier: "Très grand gibier, battue",        dro: 150, droOptions: [100, 150, 200]         },
      { value: ".338 Lapua Mag", label: ".338 Lapua Magnum", dro: 180, droOptions: [100,150,200,250,300], gibier: "Grand gibier, tir longue distance" },
      { value: "9.3x62",         label: "9,3×62",                 gibier: "Sanglier lourd, cerf imposant",    dro: 100, droOptions: [50, 75, 100, 150]      },
      { value: "9.3x74R",        label: "9,3×74R",                gibier: "Sanglier, battue (arme mixte)",    dro: 100, droOptions: [50, 75, 100, 150]      },
      { value: "9.3x64",         label: "9,3×64 Brenneke",        gibier: "Grand gibier, très puissant",      dro: 150, droOptions: [75, 100, 150]          },
    ],
  },
  {
    groupe: "Calibres à levier de sous-garde",
    calibres: [
      { value: ".30-30 Win",     label: ".30-30 Winchester",      gibier: "Sanglier, cerf (courte dist.)",    dro: 75,  droOptions: [50, 75, 100]           },
      { value: ".444 Marlin",    label: ".444 Marlin",            gibier: "Sanglier, tirs proches",           dro: 75,  droOptions: [50, 75, 100]           },
      { value: ".45-70 Govt",    label: ".45-70 Government",      gibier: "Sanglier, tirs très proches",      dro: 75,  droOptions: [50, 75, 100]           },
    ],
  },
];

// Liste plate pour les sélecteurs simples
const CALIBRES = CALIBRE_CATEGORIES.flatMap(g => g.calibres);

// Structure : { label, marque, sansPlomb, v0, poids }
// Sources: catalogues officiels RWS, GECO et Norma (vérifiés juin 2026)
const MUNITIONS_DATA = {

  // ── .17 HMR ──────────────────────────────────────────────────────────────
  ".17 HMR": [
    { label: "Hornady V-MAX 1,1g",              marque:"Hornady", sansPlomb:false, v0:777, poids:1.1  },
    { label: "Hornady NTX 1,0g 🌿",              marque:"Hornady", sansPlomb:true,  v0:770, poids:1.0  },
    { label: "Winchester Varmint HV 1,1g",      marque:"Winchester", sansPlomb:false, v0:777, poids:1.1  },
    { label: "Norma V-MAX 1,1g",                marque:"Norma",   sansPlomb:false, v0:777, poids:1.1  },
  ],

  // ── .22 HORNET ────────────────────────────────────────────────────────────
  ".22 Hornet": [
    { label: "RWS HIT 2,6g 🌿",                marque:"RWS",   sansPlomb:true,  v0:736,  poids:2.6  },
    { label: "RWS TMS 3,0g",                   marque:"RWS",   sansPlomb:false, v0:700,  poids:3.0  },
  ],

  // ── .222 REMINGTON ───────────────────────────────────────────────────────
  ".222 Rem": [
    { label: "Sako Gamehead 3,2g", marque:"Sako", sansPlomb:false, v0:970, poids:3.2 },
    { label: "RWS HIT 2,6g 🌿",                marque:"RWS",   sansPlomb:true,  v0:1060, poids:2.6  },
    { label: "RWS Match Jagd 3,4g",            marque:"RWS",   sansPlomb:false, v0:980,  poids:3.4  },
    { label: "RWS TMS 3,2g",                   marque:"RWS",   sansPlomb:false, v0:1020, poids:3.2  },
    { label: "GECO Express 3,6g",              marque:"GECO",  sansPlomb:false, v0:951, poids:3.6  },
  ],

  // ── .223 REMINGTON ───────────────────────────────────────────────────────
  ".223 Rem": [
    { label: "Norma Tipstrike 3,6g", marque:"Norma", sansPlomb:false, v0:980, poids:3.6 },
    { label: "Sako Gamehead 3,6g", marque:"Sako", sansPlomb:false, v0:965, poids:3.6 },
    { label: "Winchester Power Point 3,6g", marque:"Winchester", sansPlomb:false, v0:988, poids:3.6 },
    { label: "RWS TMS 3,6g",                   marque:"RWS",   sansPlomb:false, v0:1000, poids:3.6  },
    { label: "GECO Express 3,6g",              marque:"GECO",  sansPlomb:false, v0:1010, poids:3.6  },
    { label: "GECO Softpoint 3,4g",            marque:"GECO",  sansPlomb:false, v0:980,  poids:3.4  },
  ],

  // ── .22-250 REMINGTON ─────────────────────────────────────────────────────
  ".22-250 Rem": [
    { label: "Norma Tipstrike 3,6g", marque:"Norma", sansPlomb:false, v0:1090, poids:3.6 },
    { label: "Sako Gamehead 3,6g", marque:"Sako", sansPlomb:false, v0:1100, poids:3.6 },
    { label: "Hornady Varmint Express 3,2g 🌿", marque:"Hornady", sansPlomb:true, v0:1158, poids:3.2 },
    { label: "Winchester Power Point 3,6g", marque:"Winchester", sansPlomb:false, v0:1122, poids:3.6 },
  ],

  // ── 5,6×50R MAGNUM ────────────────────────────────────────────────────────
  "5.6x50R Mag": [
    { label: "RWS 5,6x50 R Mag. HIT 2,6g 🌿",  marque:"RWS",   sansPlomb:true,  v0:1034, poids:2.6  },
    { label: "RWS 5,6x50 R Mag. TMS 3,2g",    marque:"RWS",   sansPlomb:false, v0:1015, poids:3.2  },
    { label: "RWS 5,6x50 R Mag. TMS 4,1g",    marque:"RWS",   sansPlomb:false, v0:900,  poids:4.1  },
  ],

  // ── 5,6×52R SAVAGE ───────────────────────────────────────────────────────
  "5.6x52R": [
    { label: "Norma Whitetail 4,6g", marque:"Norma", sansPlomb:false, v0:850, poids:4.6 },
    { label: "RWS 5,6x52 R TMS 4,6g",         marque:"RWS",   sansPlomb:false, v0:870,  poids:4.6  },
  ],

  // ── .243 WINCHESTER ──────────────────────────────────────────────────────
  ".243 Win": [
    { label: "Hornady SST 6,3g", marque:"Hornady", sansPlomb:false, v0:971, poids:6.3 },
    { label: "Winchester Deer Season XP Copper 5,8g 🌿", marque:"Winchester", sansPlomb:true, v0:945, poids:5.8 },
    { label: "Lapua Naturalis 6,5g 🌿", marque:"Lapua", sansPlomb:true, v0:910, poids:6.5 },
    { label: "Sako Gamehead 6,5g", marque:"Sako", sansPlomb:false, v0:905, poids:6.5 },
    { label: "Winchester Ballistic Silvertip 5,8g", marque:"Winchester", sansPlomb:false, v0:945, poids:5.8 },
    { label: "Winchester Deer Season XP 6,5g", marque:"Winchester", sansPlomb:false, v0:945, poids:6.5 },
    { label: "Hornady American Whitetail 6,2g", marque:"Hornady", sansPlomb:false, v0:902, poids:6.2 },
    { label: "Hornady Precision Hunter ELD-X 5,8g", marque:"Hornady", sansPlomb:false, v0:960, poids:5.8 },
    { label: "Winchester Power Point 6,5g", marque:"Winchester", sansPlomb:false, v0:902, poids:6.5 },
    { label: "Norma Whitetail 6,5g", marque:"Norma", sansPlomb:false, v0:900, poids:6.5 },
    { label: "RWS KS 6,2g",                    marque:"RWS",   sansPlomb:false, v0:910,  poids:6.2  },
    { label: "RWS TMS 6,5g",                   marque:"RWS",   sansPlomb:false, v0:900,  poids:6.5  },
    { label: "GECO Softpoint 6,8g",            marque:"GECO",  sansPlomb:false, v0:880,  poids:6.8  },
    { label: "Norma Oryx 6,5g",                marque:"Norma", sansPlomb:false, v0:910,  poids:6.5  },
  ],

  // ── 6 mm REMINGTON ───────────────────────────────────────────────────────
  "6mm Rem": [
    { label: "Hornady SST 6,1g", marque:"Hornady", sansPlomb:false, v0:986, poids:6.1 },
  ],

  // ── 6,5×55 SE ────────────────────────────────────────────────────────────
  "6.5x55 SE": [
    { label: "Sako Powerhead Blade 7,8g 🌿", marque:"Sako", sansPlomb:true, v0:855, poids:7.8 },
    { label: "Hornady SST 9,1g", marque:"Hornady", sansPlomb:false, v0:834, poids:9.1 },
    { label: "Sako Super Hammerhead 9,1g", marque:"Sako", sansPlomb:false, v0:815, poids:9.1 },
    { label: "Lapua Mega 11,0g", marque:"Lapua", sansPlomb:false, v0:800, poids:11.0 },
    { label: "Hornady Custom International InterLock 8,8g", marque:"Hornady", sansPlomb:false, v0:800, poids:8.8 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:777, poids:9.7 },
    { label: "Norma Evostrike 6,0g 🌿", marque:"Norma", sansPlomb:true, v0:1000, poids:6.0 },
    { label: "Norma Vulkan 10,1g", marque:"Norma", sansPlomb:false, v0:780, poids:10.1 },
    { label: "Norma Whitetail 10,1g", marque:"Norma", sansPlomb:false, v0:780, poids:10.1 },
    { label: "RWS Evolution Green 6,0g 🌿",     marque:"RWS",   sansPlomb:true,  v0:990,  poids:6.0  },
    { label: "RWS HIT 7,8g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:811,  poids:7.8  },
    { label: "RWS Speed Tip Pro 9,1g",          marque:"RWS",   sansPlomb:false, v0:797,  poids:9.1  },
    { label: "RWS DK 9,1g",                    marque:"RWS",   sansPlomb:false, v0:820,  poids:9.1  },
    { label: "GECO Express 9,1g",              marque:"GECO",  sansPlomb:false, v0:730,  poids:9.1  },
    { label: "GECO Plus 10,1g",                 marque:"GECO",  sansPlomb:false, v0:750,  poids:10.1  },
    { label: "Norma Bondstrike 9,3g",          marque:"Norma", sansPlomb:false, v0:830,  poids:9.3  },
    { label: "Norma Tipstrike 9,1g",           marque:"Norma", sansPlomb:false, v0:790,  poids:9.1  },
    { label: "Norma Oryx 10,1g",               marque:"Norma", sansPlomb:false, v0:760,  poids:10.1  },
    { label: "Norma Ecostrike 7,8g 🌿",         marque:"Norma", sansPlomb:true,  v0:860,  poids:7.8  },
  ],

  // ── 6,5 CREEDMOOR ────────────────────────────────────────────────────────
  "6.5 Creedmoor": [
    { label: "Winchester Expedition Big Game 9,2g", marque:"Winchester", sansPlomb:false, v0:823, poids:9.2 },
    { label: "Sako Powerhead Blade 7,8g 🌿", marque:"Sako", sansPlomb:true, v0:890, poids:7.8 },
    { label: "Sako Gamehead 9,1g", marque:"Sako", sansPlomb:false, v0:835, poids:9.1 },
    { label: "Lapua Naturalis 9,1g 🌿", marque:"Lapua", sansPlomb:true, v0:780, poids:9.1 },
    { label: "Winchester Power Point 8,4g", marque:"Winchester", sansPlomb:false, v0:860, poids:8.4 },
    { label: "Lapua Mega 10,1g", marque:"Lapua", sansPlomb:false, v0:780, poids:10.1 },
    { label: "Winchester Ballistic Silvertip 8,4g", marque:"Winchester", sansPlomb:false, v0:823, poids:8.4 },
    { label: "Hornady SST 8,4g", marque:"Hornady", sansPlomb:false, v0:899, poids:8.4 },
    { label: "Hornady American Whitetail 8,4g", marque:"Hornady", sansPlomb:false, v0:860, poids:8.4 },
    { label: "Sako Super Hammerhead 9,1g", marque:"Sako", sansPlomb:false, v0:835, poids:9.1 },
    { label: "Hornady Precision Hunter ELD-X 9,1g", marque:"Hornady", sansPlomb:false, v0:823, poids:9.1 },
    { label: "Winchester Deer Season XP 8,1g", marque:"Winchester", sansPlomb:false, v0:869, poids:8.1 },
    { label: "GECO Star 7,8g", marque:"GECO", sansPlomb:false, v0:879, poids:7.8 },
    { label: "Norma Evostrike 6,5g 🌿", marque:"Norma", sansPlomb:true, v0:1010, poids:6.5 },
    { label: "Norma Whitetail 9,1g", marque:"Norma", sansPlomb:false, v0:810, poids:9.1 },
    { label: "RWS Evolution Green 6,0g 🌿",     marque:"RWS",   sansPlomb:true,  v0:990,  poids:6.0  },
    { label: "RWS HIT 7,8g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:859,  poids:7.8  },
    { label: "RWS Speed Tip Pro 9,1g",          marque:"RWS",   sansPlomb:false, v0:797,  poids:9.1  },
    { label: "GECO Express 9,1g",              marque:"GECO",  sansPlomb:false, v0:807,  poids:9.1  },
    { label: "Norma Bondstrike 9,1g",          marque:"Norma", sansPlomb:false, v0:835,  poids:9.1  },
    { label: "Norma Tipstrike 8,0g",           marque:"Norma", sansPlomb:false, v0:800,  poids:8.0  },
    { label: "Norma Oryx 8,0g",               marque:"Norma", sansPlomb:false, v0:780,  poids:8.0  },
    { label: "Norma Ecostrike 7,8g 🌿",         marque:"Norma", sansPlomb:true,  v0:880,  poids:7.8  },
  ],

  // ── .260 REMINGTON ───────────────────────────────────────────────────────
  ".260 Rem": [
  ],

  // ── 6,5 PRC ──────────────────────────────────────────────────────────────
  "6.5 PRC": [
    { label: "Winchester Expedition Big Game LR 9,2g", marque:"Winchester", sansPlomb:false, v0:920, poids:9.2 },
    { label: "Winchester Expedition Big Game 9,1g", marque:"Winchester", sansPlomb:false, v0:920, poids:9.1 },
    { label: "Hornady Precision Hunter ELD-X 9,3g", marque:"Hornady", sansPlomb:false, v0:902, poids:9.3 },
    { label: "Norma Whitetail 9,1g", marque:"Norma", sansPlomb:false, v0:880, poids:9.1 },
    { label: "Norma Bondstrike 9,3g",          marque:"Norma", sansPlomb:false, v0:900,  poids:9.3  },
  ],

  // ── 6,5×57 ───────────────────────────────────────────────────────────────
  "6.5x57": [
    { label: "RWS Evolution Green 6,0g 🌿",     marque:"RWS",   sansPlomb:true,  v0:950,  poids:6.0  },
    { label: "RWS KS 8,2g",                    marque:"RWS",   sansPlomb:false, v0:840,  poids:8.2  },
    { label: "RWS DK 9,1g",                    marque:"RWS",   sansPlomb:false, v0:800,  poids:9.1  },
  ],

  // ── 6,5×57R ──────────────────────────────────────────────────────────────
  "6.5x57R": [
    { label: "RWS Evolution Green 6,0g 🌿",     marque:"RWS",   sansPlomb:true,  v0:920,  poids:6.0  },
    { label: "RWS KS 8,2g",                    marque:"RWS",   sansPlomb:false, v0:800,  poids:8.2  },
    { label: "RWS DK 9,1g",                    marque:"RWS",   sansPlomb:false, v0:760,  poids:9.1  },
  ],

  // ── .257 ROBERTS ─────────────────────────────────────────────────────────
  ".257 Roberts": [
    { label: "Winchester Power Point 7,6g", marque:"Winchester", sansPlomb:false, v0:847, poids:7.6 },
  ],

  // ── .25-06 REMINGTON ──────────────────────────────────────────────────────
  ".25-06 Rem": [
    { label: "Sako Gamehead 7,1g", marque:"Sako", sansPlomb:false, v0:910, poids:7.1 },
    { label: "Hornady Precision Hunter ELD-X 7,1g", marque:"Hornady", sansPlomb:false, v0:957, poids:7.1 },
    { label: "Winchester Power Point 7,1g", marque:"Winchester", sansPlomb:false, v0:911, poids:7.1 },
  ],

  // ── 7×57 MAUSER ──────────────────────────────────────────────────────────
  "7x57": [
    { label: "RWS ID Classic 10,5g",           marque:"RWS",   sansPlomb:false, v0:810,  poids:10.5 },
    { label: "RWS Evolution Green 8,2g 🌿",     marque:"RWS",   sansPlomb:true,  v0:830,  poids:8.2  },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:775,  poids:10.7 },
    { label: "Norma Oryx 10,5g",              marque:"Norma", sansPlomb:false, v0:805,  poids:10.5 },
  ],

  // ── 7×57R ─────────────────────────────────────────────────────────────────
  "7x57R": [
    { label: "Norma Tipstrike 10,4g", marque:"Norma", sansPlomb:false, v0:800, poids:10.4 },
    { label: "RWS Evolution Green 8,2g 🌿",     marque:"RWS",   sansPlomb:true,  v0:830,  poids:8.2  },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:730,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:760,  poids:10.5 },
    { label: "GECO Zero 8,2g 🌿",               marque:"GECO",  sansPlomb:true,  v0:820,  poids:8.2  },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:750,  poids:10.7 },
    { label: "Norma Oryx 10,5g",              marque:"Norma", sansPlomb:false, v0:795,  poids:10.5 },
  ],

  // ── 7×64 BRENNEKE ────────────────────────────────────────────────────────
  "7x64": [
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:870, poids:9.7 },
    { label: "Sako Gamehead 11,7g", marque:"Sako", sansPlomb:false, v0:935, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 10,5g", marque:"Hornady", sansPlomb:false, v0:811, poids:10.5 },
    { label: "Sako Powerhead Blade 9,3g 🌿", marque:"Sako", sansPlomb:true, v0:860, poids:9.3 },
    { label: "Lapua Naturalis 10,1g 🌿", marque:"Lapua", sansPlomb:true, v0:840, poids:10.1 },
    { label: "Sako Hammerhead 11,0g", marque:"Sako", sansPlomb:false, v0:860, poids:11.0 },
    { label: "Sako Gamehead 7,8g", marque:"Sako", sansPlomb:false, v0:935, poids:7.8 },
    { label: "Hornady International ECX 9,7g 🌿", marque:"Hornady", sansPlomb:true, v0:850, poids:9.7 },
    { label: "Hornady Custom International InterLock 10,0g", marque:"Hornady", sansPlomb:false, v0:823, poids:10.0 },
    { label: "Norma Vulkan 11,0g", marque:"Norma", sansPlomb:false, v0:840, poids:11.0 },
    { label: "RWS Evolution Green 8,2g 🌿",     marque:"RWS",   sansPlomb:true,  v0:950,  poids:8.2  },
    { label: "RWS HIT 9,1g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:940,  poids:9.1  },
    { label: "RWS Speed Tip Pro 9,7g",          marque:"RWS",   sansPlomb:false, v0:930,  poids:9.7  },
    { label: "RWS Evolution 10,3g",             marque:"RWS",   sansPlomb:false, v0:855,  poids:10.3 },
    { label: "RWS ID Classic 10,5g",           marque:"RWS",   sansPlomb:false, v0:820,  poids:10.5 },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:820,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:890,  poids:10.5 },
    { label: "RWS KS 8,0g",                    marque:"RWS",   sansPlomb:false, v0:965,  poids:8.0  },
    { label: "GECO Star 9,1g 🌿",               marque:"GECO",  sansPlomb:true,  v0:928,  poids:9.1  },
    { label: "GECO Zero 8,2g 🌿",               marque:"GECO",  sansPlomb:true,  v0:940,  poids:8.2  },
    { label: "GECO Plus 11,0g",                marque:"GECO",  sansPlomb:false, v0:830,  poids:11.0 },
    { label: "GECO Express 10,0g",             marque:"GECO",  sansPlomb:false, v0:880,  poids:10.0 },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:840,  poids:10.7 },
    { label: "Norma Oryx 10,7g",              marque:"Norma", sansPlomb:false, v0:840,  poids:10.7 },
    { label: "Norma Tipstrike 10,0g",          marque:"Norma", sansPlomb:false, v0:890,  poids:10.0 },
    { label: "Norma Bondstrike 10,7g",         marque:"Norma", sansPlomb:false, v0:870,  poids:10.7 },
    { label: "Norma Ecostrike 10,0g 🌿",        marque:"Norma", sansPlomb:true,  v0:910,  poids:10.0 },
  ],

  // ── 7×65R ─────────────────────────────────────────────────────────────────
  "7x65R": [
    { label: "Sako Hammerhead 11,0g", marque:"Sako", sansPlomb:false, v0:790, poids:11.0 },
    { label: "Norma Tipstrike 10,4g", marque:"Norma", sansPlomb:false, v0:850, poids:10.4 },
    { label: "Norma Vulkan 11,0g", marque:"Norma", sansPlomb:false, v0:810, poids:11.0 },
    { label: "RWS Evolution Green 8,2g 🌿",     marque:"RWS",   sansPlomb:true,  v0:910,  poids:8.2  },
    { label: "RWS HIT 9,1g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:850,  poids:9.1  },
    { label: "RWS Evolution 10,3g",             marque:"RWS",   sansPlomb:false, v0:810,  poids:10.3 },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:810,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:820,  poids:10.5 },
    { label: "RWS KS 8,0g",                    marque:"RWS",   sansPlomb:false, v0:925,  poids:8.0  },
    { label: "GECO Zero 8,2g 🌿",               marque:"GECO",  sansPlomb:true,  v0:890,  poids:8.2  },
    { label: "GECO Plus 11,0g",                marque:"GECO",  sansPlomb:false, v0:810,  poids:11.0 },
    { label: "GECO Softpoint 8,2g",            marque:"GECO",  sansPlomb:false, v0:800,  poids:8.2  },
    { label: "Norma Oryx 10,7g",              marque:"Norma", sansPlomb:false, v0:830,  poids:10.7 },
    { label: "Norma Ecostrike 9,1g 🌿",        marque:"Norma", sansPlomb:true,  v0:860,  poids:9.1 },
  ],

  // ── .270 WINCHESTER ──────────────────────────────────────────────────────
  ".270 Win": [
    { label: "Sako Hammerhead 10,1g", marque:"Sako", sansPlomb:false, v0:830, poids:10.1 },
    { label: "Sako Powerhead Blade 8,2g 🌿", marque:"Sako", sansPlomb:true, v0:915, poids:8.2 },
    { label: "Sako Super Hammerhead 9,7g", marque:"Sako", sansPlomb:false, v0:925, poids:9.7 },
    { label: "Winchester Power Max Bonded 8,4g", marque:"Winchester", sansPlomb:false, v0:933, poids:8.4 },
    { label: "Winchester Expedition Big Game 8,4g", marque:"Winchester", sansPlomb:false, v0:899, poids:8.4 },
    { label: "Winchester Deer Season XP 8,4g", marque:"Winchester", sansPlomb:false, v0:933, poids:8.4 },
    { label: "Hornady SST 8,4g", marque:"Hornady", sansPlomb:false, v0:975, poids:8.4 },
    { label: "Hornady American Whitetail 8,4g", marque:"Hornady", sansPlomb:false, v0:933, poids:8.4 },
    { label: "Sako Gamehead 9,7g", marque:"Sako", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Hornady Custom International InterLock 9,7g", marque:"Hornady", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Hornady Precision Hunter ELD-X 9,1g", marque:"Hornady", sansPlomb:false, v0:905, poids:9.1 },
    { label: "Winchester Ballistic Silvertip 8,4g", marque:"Winchester", sansPlomb:false, v0:930, poids:8.4 },
    { label: "Norma Evostrike 7,1g 🌿", marque:"Norma", sansPlomb:true, v0:1080, poids:7.1 },
    { label: "Norma Vulkan 10,1g", marque:"Norma", sansPlomb:false, v0:870, poids:10.1 },
    { label: "Norma Whitetail 8,4g", marque:"Norma", sansPlomb:false, v0:930, poids:8.4 },
    { label: "RWS Evolution Green 6,2g 🌿",     marque:"RWS",   sansPlomb:true,  v0:1080, poids:6.2  },
    { label: "RWS HIT 8,4g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:921,  poids:8.4  },
    { label: "RWS Speed Tip Pro 9,1g",          marque:"RWS",   sansPlomb:false, v0:925,  poids:9.1  },
    { label: "RWS Evolution 10,0g",             marque:"RWS",   sansPlomb:false, v0:830,  poids:10.0 },
    { label: "RWS KS 9,7g",                    marque:"RWS",   sansPlomb:false, v0:896,  poids:9.7  },
    { label: "GECO Star 8,4g 🌿",               marque:"GECO",  sansPlomb:true,  v0:910,  poids:8.4  },
    { label: "GECO Plus 9,7g",                marque:"GECO",  sansPlomb:false, v0:850,  poids:9.7 },
    { label: "GECO Express 8,4g",              marque:"GECO",  sansPlomb:false, v0:940,  poids:8.4  },
    { label: "GECO Softpoint 9,1g",            marque:"GECO",  sansPlomb:false, v0:910,  poids:9.1  },
    { label: "Norma Oryx 10,0g",              marque:"Norma", sansPlomb:false, v0:870,  poids:10.0 },
    { label: "Norma Tipstrike 9,7g",           marque:"Norma", sansPlomb:false, v0:910,  poids:9.7  },
    { label: "Norma Ecostrike 8,4g 🌿",         marque:"Norma", sansPlomb:true,  v0:900,  poids:8.4  },
  ],

  // ── .270 WSM ─────────────────────────────────────────────────────────────
  ".270 WSM": [
    { label: "Winchester Power Max Bonded 8,4g", marque:"Winchester", sansPlomb:false, v0:998, poids:8.4 },
    { label: "RWS HIT 8,4g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:940,  poids:8.4  },
    { label: "Norma Oryx 10,0g",              marque:"Norma", sansPlomb:false, v0:940,  poids:10.0 },
    { label: "Norma Ecostrike 8,4g 🌿",         marque:"Norma", sansPlomb:true,  v0:935,  poids:8.4  },
  ],

  // ── .280 REMINGTON ───────────────────────────────────────────────────────
  ".280 Rem": [
    { label: "Hornady SST 9,0g", marque:"Hornady", sansPlomb:false, v0:942, poids:9.0 },
    { label: "Hornady Precision Hunter ELD-X 9,7g", marque:"Hornady", sansPlomb:false, v0:892, poids:9.7 },
    { label: "Norma Vulkan 11,0g", marque:"Norma", sansPlomb:false, v0:790, poids:11.0 },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:830,  poids:10.7 },
    { label: "Norma Oryx 10,1g",              marque:"Norma", sansPlomb:false, v0:845,  poids:10.1 },
  ],

  // ── 7mm-08 REMINGTON ──────────────────────────────────────────────────────
  "7mm-08": [
    { label: "Hornady SST 9,0g", marque:"Hornady", sansPlomb:false, v0:899, poids:9.0 },
    { label: "Winchester Power Point 9,1g", marque:"Winchester", sansPlomb:false, v0:853, poids:9.1 },
    { label: "Winchester Ballistic Silvertip 9,1g", marque:"Winchester", sansPlomb:false, v0:844, poids:9.1 },
    { label: "Hornady American Whitetail 9,0g", marque:"Hornady", sansPlomb:false, v0:866, poids:9.0 },
    { label: "Sako Gamehead 9,1g", marque:"Sako", sansPlomb:false, v0:860, poids:9.1 },
    { label: "Hornady Precision Hunter ELD-X 9,7g", marque:"Hornady", sansPlomb:false, v0:844, poids:9.7 },
    { label: "Winchester Deer Season XP 9,1g", marque:"Winchester", sansPlomb:false, v0:853, poids:9.1 },
    { label: "Norma Whitetail 9,7g", marque:"Norma", sansPlomb:false, v0:840, poids:9.7 },
    { label: "Norma Tipstrike 9,0g",           marque:"Norma", sansPlomb:false, v0:820,  poids:9.0  },
    { label: "Norma Oryx 10,1g",               marque:"Norma", sansPlomb:false, v0:805,  poids:10.1  },
  ],

  // ── 7mm REMINGTON MAGNUM ──────────────────────────────────────────────────
  "7mm Rem Mag": [
    { label: "Hornady SST 9,0g", marque:"Hornady", sansPlomb:false, v0:988, poids:9.0 },
    { label: "Hornady SST 9,1g", marque:"Hornady", sansPlomb:false, v0:988, poids:9.1 },
    { label: "Winchester Power Max Bonded 9,7g", marque:"Winchester", sansPlomb:false, v0:942, poids:9.7 },
    { label: "Hornady American Whitetail 9,5g", marque:"Hornady", sansPlomb:false, v0:960, poids:9.5 },
    { label: "Sako Arrowhead II 9,7g", marque:"Sako", sansPlomb:false, v0:890, poids:9.7 },
    { label: "Hornady Precision Hunter ELD-X 10,5g", marque:"Hornady", sansPlomb:false, v0:896, poids:10.5 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:945, poids:9.7 },
    { label: "Winchester Power Point 10,2g", marque:"Winchester", sansPlomb:false, v0:942, poids:10.2 },
    { label: "Norma Tipstrike 10,4g", marque:"Norma", sansPlomb:false, v0:920, poids:10.4 },
    { label: "Norma Evostrike 8,2g 🌿", marque:"Norma", sansPlomb:true, v0:1010, poids:8.2 },
    { label: "Norma Vulkan 11,0g", marque:"Norma", sansPlomb:false, v0:900, poids:11.0 },
    { label: "Norma Whitetail 9,7g", marque:"Norma", sansPlomb:false, v0:920, poids:9.7 },
    { label: "RWS Evolution Green 8,2g 🌿",     marque:"RWS",   sansPlomb:true,  v0:1010, poids:8.2  },
    { label: "RWS HIT 9,1g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:940,  poids:9.1  },
    { label: "RWS Speed Tip Pro 9,7g",          marque:"RWS",   sansPlomb:false, v0:950,  poids:9.7  },
    { label: "RWS Evolution 10,3g",             marque:"RWS",   sansPlomb:false, v0:870,  poids:10.3 },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:840,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:890,  poids:10.5 },
    { label: "GECO Zero 8,2g 🌿",               marque:"GECO",  sansPlomb:true,  v0:980,  poids:8.2  },
    { label: "GECO Plus 11,0g",                marque:"GECO",  sansPlomb:false, v0:866,  poids:11.0 },
    { label: "GECO Express 10,0g",             marque:"GECO",  sansPlomb:false, v0:890,  poids:10.0 },
    { label: "Norma Bondstrike 10,7g",         marque:"Norma", sansPlomb:false, v0:910,  poids:10.7 },
    { label: "Norma Oryx 11,0g",              marque:"Norma", sansPlomb:false, v0:880,  poids:11.0 },
    { label: "Norma Ecostrike 10,0g 🌿",        marque:"Norma", sansPlomb:true,  v0:950,  poids:10.0 },
  ],

  // ── 7mm PRC ──────────────────────────────────────────────────────────────
  "7mm PRC": [
    { label: "Hornady Precision Hunter ELD-X 11,3g", marque:"Hornady", sansPlomb:false, v0:914, poids:11.3 },
    { label: "Norma Bondstrike 10,7g",         marque:"Norma", sansPlomb:false, v0:910,  poids:10.7 },
  ],

  // ── .308 WINCHESTER ──────────────────────────────────────────────────────
  ".308 Win": [
    { label: "Sako Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:750, poids:11.7 },
    { label: "Sako Super Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:760, poids:11.7 },
    { label: "Lapua Scenar OTM 10,1g", marque:"Lapua", sansPlomb:false, v0:860, poids:10.1 },
    { label: "Winchester Deer Season XP Copper 9,7g 🌿", marque:"Winchester", sansPlomb:true, v0:856, poids:9.7 },
    { label: "Winchester Super-X Power-Point 11,7g", marque:"Winchester", sansPlomb:false, v0:799, poids:11.7 },
    { label: "Lapua Mega 12,0g", marque:"Lapua", sansPlomb:false, v0:765, poids:12.0 },
    { label: "Sako Gamehead 9,7g", marque:"Sako", sansPlomb:false, v0:855, poids:9.7 },
    { label: "Winchester Copper Impact 9,7g 🌿", marque:"Winchester", sansPlomb:true, v0:856, poids:9.7 },
    { label: "Hornady Outfitter GMX 9,7g 🌿", marque:"Hornady", sansPlomb:true, v0:838, poids:9.7 },
    { label: "Hornady SST 9,7g", marque:"Hornady", sansPlomb:false, v0:914, poids:9.7 },
    { label: "Hornady American Whitetail 10,7g", marque:"Hornady", sansPlomb:false, v0:823, poids:10.7 },
    { label: "Lapua Naturalis 11,0g 🌿", marque:"Lapua", sansPlomb:true, v0:791, poids:11.0 },
    { label: "Lapua Mega 9,7g", marque:"Lapua", sansPlomb:false, v0:850, poids:9.7 },
    { label: "Sako Powerhead Blade 10,5g 🌿", marque:"Sako", sansPlomb:true, v0:815, poids:10.5 },
    { label: "Sako Super Hammerhead 9,7g", marque:"Sako", sansPlomb:false, v0:855, poids:9.7 },
    { label: "Hornady GMX 10,7g 🌿", marque:"Hornady", sansPlomb:true, v0:838, poids:10.7 },
    { label: "Hornady Custom International InterLock 11,7g", marque:"Hornady", sansPlomb:false, v0:792, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 11,7g", marque:"Hornady", sansPlomb:false, v0:792, poids:11.7 },
    { label: "Winchester Power Max Bonded 11,7g", marque:"Winchester", sansPlomb:false, v0:799, poids:11.7 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:860, poids:9.7 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:856, poids:9.7 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:860, poids:9.7 },
    { label: "Norma Evostrike 9,0g 🌿", marque:"Norma", sansPlomb:true, v0:885, poids:9.0 },
    { label: "Norma Vulkan 11,7g", marque:"Norma", sansPlomb:false, v0:796, poids:11.7 },
    { label: "Norma Whitetail 11,7g", marque:"Norma", sansPlomb:false, v0:796, poids:11.7 },
    { label: "RWS Driven Hunt 10,7g 🌿",           marque:"RWS",   sansPlomb:true, v0:810,  poids:10.7 },
    { label: "RWS Driven Hunt SR 9,7g 🌿",         marque:"RWS",   sansPlomb:true, v0:812,  poids:9.7  },
    { label: "RWS Evolution Green 9,0g 🌿",      marque:"RWS",   sansPlomb:true,  v0:885,  poids:9.0  },
    { label: "RWS Evolution Green SR 9,0g 🌿",   marque:"RWS",   sansPlomb:true,  v0:900,  poids:9.0  },
    { label: "RWS HIT 10,7g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:820,  poids:10.7 },
    { label: "RWS HIT SR 9,7g 🌿",               marque:"RWS",   sansPlomb:true,  v0:870,  poids:9.7  },
    { label: "RWS Speed Tip Pro 10,7g",          marque:"RWS",   sansPlomb:false, v0:830,  poids:10.7 },
    { label: "RWS Speed Tip Pro SR 10,7g",       marque:"RWS",   sansPlomb:false, v0:830,  poids:10.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:810,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:820,  poids:11.7 },
    { label: "RWS ID Classic 9,7g",              marque:"RWS",   sansPlomb:false, v0:860,  poids:9.7  },
    { label: "RWS KS 9,7g",                      marque:"RWS",   sansPlomb:false, v0:900,  poids:9.7  },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:855,  poids:10.7 },
    { label: "GECO Star 10,7g 🌿",               marque:"GECO",  sansPlomb:true,  v0:783,  poids:10.7 },
    { label: "GECO Zero 8,8g 🌿",                marque:"GECO",  sansPlomb:true,  v0:870,  poids:8.8  },
    { label: "GECO Plus 11,0g",                 marque:"GECO",  sansPlomb:false, v0:810,  poids:11.0 },
    { label: "GECO Express 10,7g",              marque:"GECO",  sansPlomb:false, v0:825,  poids:10.7 },
    { label: "GECO Softpoint 11,0g",            marque:"GECO",  sansPlomb:false, v0:805,  poids:11.0 },
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:796,  poids:11.7 },
    { label: "Norma Tipstrike 11,0g",           marque:"Norma", sansPlomb:false, v0:800,  poids:11.0 },
    { label: "Norma Bondstrike 11,7g",          marque:"Norma", sansPlomb:false, v0:800,  poids:11.7 },
    { label: "Norma Ecostrike 11,0g 🌿",         marque:"Norma", sansPlomb:true,  v0:860,  poids:11.0 },
  ],

  // ── .30-06 SPRINGFIELD ───────────────────────────────────────────────────
  "30-06": [
    { label: "Sako Super Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:820, poids:11.7 },
    { label: "Winchester Deer Season XP Copper 9,7g 🌿", marque:"Winchester", sansPlomb:true, v0:890, poids:9.7 },
    { label: "Winchester Super-X Power-Point 9,7g", marque:"Winchester", sansPlomb:false, v0:890, poids:9.7 },
    { label: "Sako Gamehead 9,7g", marque:"Sako", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Winchester Copper Impact 9,7g 🌿", marque:"Winchester", sansPlomb:true, v0:890, poids:9.7 },
    { label: "Winchester Expedition Big Game 11,7g", marque:"Winchester", sansPlomb:false, v0:838, poids:11.7 },
    { label: "Hornady Outfitter GMX 9,7g 🌿", marque:"Hornady", sansPlomb:true, v0:914, poids:9.7 },
    { label: "Hornady SST 9,7g", marque:"Hornady", sansPlomb:false, v0:939, poids:9.7 },
    { label: "Hornady American Whitetail 11,7g", marque:"Hornady", sansPlomb:false, v0:823, poids:11.7 },
    { label: "Lapua Naturalis 11,0g 🌿", marque:"Lapua", sansPlomb:true, v0:830, poids:11.0 },
    { label: "Lapua Mega 12,0g", marque:"Lapua", sansPlomb:false, v0:800, poids:12.0 },
    { label: "Sako Hammerhead 14,3g", marque:"Sako", sansPlomb:false, v0:720, poids:14.3 },
    { label: "Sako Super Hammerhead 9,7g", marque:"Sako", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Hornady Custom International InterLock 11,7g", marque:"Hornady", sansPlomb:false, v0:797, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 12,0g", marque:"Hornady", sansPlomb:false, v0:838, poids:12.0 },
    { label: "Winchester Power Max Bonded 11,7g", marque:"Winchester", sansPlomb:false, v0:823, poids:11.7 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:890, poids:9.7 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:884, poids:9.7 },
    { label: "Winchester Power Point 11,7g", marque:"Winchester", sansPlomb:false, v0:823, poids:11.7 },
    { label: "Norma Evostrike 9,0g 🌿", marque:"Norma", sansPlomb:true, v0:910, poids:9.0 },
    { label: "Norma Vulkan 11,7g", marque:"Norma", sansPlomb:false, v0:823, poids:11.7 },
    { label: "Norma Whitetail 11,7g", marque:"Norma", sansPlomb:false, v0:823, poids:11.7 },
    { label: "RWS Driven Hunt 10,7g 🌿",           marque:"RWS",   sansPlomb:true, v0:810,  poids:10.7 },
    { label: "RWS Driven Hunt SR 9,7g 🌿",         marque:"RWS",   sansPlomb:true, v0:821,  poids:9.7  },
    { label: "RWS Evolution Green 9,0g 🌿",      marque:"RWS",   sansPlomb:true,  v0:875,  poids:9.0  },
    { label: "RWS Evolution Green SR 9,0g 🌿",   marque:"RWS",   sansPlomb:true,  v0:881,  poids:9.0  },
    { label: "RWS HIT 10,7g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:840,  poids:10.7 },
    { label: "RWS HIT SR 10,7g 🌿",              marque:"RWS",   sansPlomb:true,  v0:840,  poids:10.7 },
    { label: "RWS Speed Tip Pro 10,7g",          marque:"RWS",   sansPlomb:false, v0:870,  poids:10.7 },
    { label: "RWS Speed Tip Pro SR 10,7g",       marque:"RWS",   sansPlomb:false, v0:870,  poids:10.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:810,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:820,  poids:11.7 },
    { label: "RWS UNI Classic 13,0g",            marque:"RWS",   sansPlomb:false, v0:770,  poids:13.0 },
    { label: "RWS ID Classic 9,7g",              marque:"RWS",   sansPlomb:false, v0:915,  poids:9.7  },
    { label: "RWS KS 10,7g",                     marque:"RWS",   sansPlomb:false, v0:860,  poids:10.7 },
    { label: "RWS KS 9,7g",                      marque:"RWS",   sansPlomb:false, v0:900,  poids:9.7  },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:855,  poids:10.7 },
    { label: "GECO Star 10,7g 🌿",               marque:"GECO",  sansPlomb:true,  v0:824,  poids:10.7 },
    { label: "GECO Zero 8,8g 🌿",                marque:"GECO",  sansPlomb:true,  v0:920,  poids:8.8  },
    { label: "GECO Plus 11,0g",                 marque:"GECO",  sansPlomb:false, v0:835,  poids:11.0 },
    { label: "GECO Express 10,7g",              marque:"GECO",  sansPlomb:false, v0:864,  poids:10.7 },
    { label: "GECO Softpoint 11,0g",            marque:"GECO",  sansPlomb:false, v0:850,  poids:11.0 },
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:823,  poids:11.7 },
    { label: "Norma Tipstrike 11,0g",           marque:"Norma", sansPlomb:false, v0:850,  poids:11.0 },
    { label: "Norma Bondstrike 11,7g",          marque:"Norma", sansPlomb:false, v0:840,  poids:11.7 },
    { label: "Norma Ecostrike 10,7g 🌿",         marque:"Norma", sansPlomb:true,  v0:860,  poids:10.7 },
  ],

  // ── .30R BLASER ──────────────────────────────────────────────────────────
  ".30R Blaser": [
    { label: "RWS Evolution Green 9,0g 🌿",      marque:"RWS",   sansPlomb:true,  v0:933,  poids:9.0  },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:840,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:860,  poids:11.7 },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:870,  poids:10.7 },
  ],

  // ── .300 WINCHESTER MAGNUM ────────────────────────────────────────────────
  ".300 Win Mag": [
    { label: "Lapua Mega 12,0g", marque:"Lapua", sansPlomb:false, v0:900, poids:12.0 },
    { label: "Winchester Super-X Power-Point 9,7g", marque:"Winchester", sansPlomb:false, v0:1003, poids:9.7 },
    { label: "Sako Powerhead Blade 11,0g 🌿", marque:"Sako", sansPlomb:true, v0:920, poids:11.0 },
    { label: "Winchester Expedition Big Game 12,3g", marque:"Winchester", sansPlomb:false, v0:884, poids:12.3 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:994, poids:9.7 },
    { label: "Hornady Outfitter GMX 11,0g 🌿", marque:"Hornady", sansPlomb:true, v0:994, poids:11.0 },
    { label: "Hornady SST 10,7g", marque:"Hornady", sansPlomb:false, v0:954, poids:10.7 },
    { label: "Hornady American Whitetail 11,7g", marque:"Hornady", sansPlomb:false, v0:902, poids:11.7 },
    { label: "Lapua Naturalis 11,0g 🌿", marque:"Lapua", sansPlomb:true, v0:902, poids:11.0 },
    { label: "Lapua Mega 11,7g", marque:"Lapua", sansPlomb:false, v0:900, poids:11.7 },
    { label: "Sako Hammerhead 14,3g", marque:"Sako", sansPlomb:false, v0:805, poids:14.3 },
    { label: "Sako Super Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:880, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 12,0g", marque:"Hornady", sansPlomb:false, v0:872, poids:12.0 },
    { label: "Winchester Power Max Bonded 11,7g", marque:"Winchester", sansPlomb:false, v0:902, poids:11.7 },
    { label: "Winchester Ballistic Silvertip 11,7g", marque:"Winchester", sansPlomb:false, v0:899, poids:11.7 },
    { label: "Winchester Power Point 11,7g", marque:"Winchester", sansPlomb:false, v0:902, poids:11.7 },
    { label: "Norma Evostrike 9,0g 🌿", marque:"Norma", sansPlomb:true, v0:1025, poids:9.0 },
    { label: "Norma Whitetail 9,7g", marque:"Norma", sansPlomb:false, v0:990, poids:9.7 },
    { label: "RWS Driven Hunt 10,7g 🌿",           marque:"RWS",   sansPlomb:true, v0:924,  poids:10.7 },
    { label: "RWS Evolution Green 9,0g 🌿",      marque:"RWS",   sansPlomb:true,  v0:1014, poids:9.0  },
    { label: "RWS HIT 10,7g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:950,  poids:10.7 },
    { label: "RWS HIT SR 10,7g 🌿",              marque:"RWS",   sansPlomb:true,  v0:950,  poids:10.7 },
    { label: "RWS Speed Tip Pro 10,7g",          marque:"RWS",   sansPlomb:false, v0:978,  poids:10.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:880,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:910,  poids:11.7 },
    { label: "RWS KS 10,7g",                     marque:"RWS",   sansPlomb:false, v0:920,  poids:10.7 },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:940,  poids:10.7 },
    { label: "GECO Star 10,7g 🌿",               marque:"GECO",  sansPlomb:true,  v0:921,  poids:10.7 },
    { label: "GECO Zero 8,8g 🌿",                marque:"GECO",  sansPlomb:true,  v0:1010, poids:8.8  },
    { label: "GECO Plus 11,0g",                 marque:"GECO",  sansPlomb:false, v0:940,  poids:11.0 },
    { label: "GECO Express 10,7g",              marque:"GECO",  sansPlomb:false, v0:970,  poids:10.7 },
    { label: "GECO Softpoint 11,0g",            marque:"GECO",  sansPlomb:false, v0:950,  poids:11.0 },
    { label: "Norma Bondstrike 11,7g",          marque:"Norma", sansPlomb:false, v0:900,  poids:11.7 },
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:890,  poids:11.7 },
    { label: "Norma Ecostrike 10,7g 🌿",         marque:"Norma", sansPlomb:true,  v0:950,  poids:10.7 },
  ],

  // ── .300 WSM ─────────────────────────────────────────────────────────────
  ".300 WSM": [
    { label: "Hornady Precision Hunter ELD-X 12,0g", marque:"Hornady", sansPlomb:false, v0:860, poids:12.0 },
    { label: "Winchester Expedition Big Game 12,3g", marque:"Winchester", sansPlomb:false, v0:876, poids:12.3 },
    { label: "Winchester Ballistic Silvertip 11,7g", marque:"Winchester", sansPlomb:false, v0:917, poids:11.7 },
    { label: "Winchester Power Max Bonded 11,7g", marque:"Winchester", sansPlomb:false, v0:905, poids:11.7 },
    { label: "Winchester Power Point 11,7g", marque:"Winchester", sansPlomb:false, v0:905, poids:11.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:880,  poids:11.9 },
    { label: "Norma Bondstrike 13,0g",          marque:"Norma", sansPlomb:false, v0:940,  poids:13.0 },
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:900,  poids:11.7 },
    { label: "Norma Ecostrike 10,7g 🌿",         marque:"Norma", sansPlomb:true,  v0:940,  poids:10.7 },
  ],

  // ── .300 WEATHERBY MAGNUM ─────────────────────────────────────────────────
  ".300 Wby Mag": [
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:990,  poids:11.7 },
  ],

  // ── .300 PRC ─────────────────────────────────────────────────────────────
  ".300 PRC": [
    { label: "Hornady Precision Hunter ELD-X 14,2g", marque:"Hornady", sansPlomb:false, v0:872, poids:14.2 },
    { label: "Norma Bondstrike 13,0g",          marque:"Norma", sansPlomb:false, v0:950,  poids:13.0 },
    { label: "Norma Ecostrike 11,7g 🌿",         marque:"Norma", sansPlomb:true,  v0:970,  poids:11.7 },
  ],

  // ── 8×57 JS ──────────────────────────────────────────────────────────────
  "8x57 JS": [
    { label: "Winchester Ballistic Silvertip 11,7g", marque:"Winchester", sansPlomb:false, v0:760, poids:11.7 },
    { label: "Hornady Custom International InterLock 12,6g", marque:"Hornady", sansPlomb:false, v0:745, poids:12.6 },
    { label: "Lapua Naturalis 11,7g 🌿", marque:"Lapua", sansPlomb:true, v0:740, poids:11.7 },
    { label: "Sako Hammerhead 13,0g", marque:"Sako", sansPlomb:false, v0:765, poids:13.0 },
    { label: "Hornady Custom International InterLock 11,7g", marque:"Hornady", sansPlomb:false, v0:745, poids:11.7 },
    { label: "Hornady International ECX 11,7g 🌿", marque:"Hornady", sansPlomb:true, v0:760, poids:11.7 },
    { label: "Winchester Power Point 12,7g", marque:"Winchester", sansPlomb:false, v0:719, poids:12.7 },
    { label: "Norma Evostrike 9,0g 🌿", marque:"Norma", sansPlomb:true, v0:920, poids:9.0 },
    { label: "Norma Vulkan 12,7g", marque:"Norma", sansPlomb:false, v0:770, poids:12.7 },
    { label: "Norma Whitetail 12,7g", marque:"Norma", sansPlomb:false, v0:770, poids:12.7 },
    { label: "RWS Driven Hunt 10,4g 🌿",           marque:"RWS",   sansPlomb:true, v0:783,  poids:10.4 },
    { label: "RWS Evolution Green 9,0g 🌿",      marque:"RWS",   sansPlomb:true,  v0:920,  poids:9.0  },
    { label: "RWS HIT 10,4g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:830,  poids:10.4 },
    { label: "RWS HIT SR 10,4g 🌿",              marque:"RWS",   sansPlomb:true,  v0:835,  poids:10.4 },
    { label: "RWS Speed Tip Pro 11,7g",          marque:"RWS",   sansPlomb:false, v0:770,  poids:11.7 },
    { label: "RWS Speed Tip Pro SR 11,7g",       marque:"RWS",   sansPlomb:false, v0:765,  poids:11.7 },
    { label: "RWS Evolution 13,0g",              marque:"RWS",   sansPlomb:false, v0:745,  poids:13.0 },
    { label: "RWS ID Classic 12,8g",             marque:"RWS",   sansPlomb:false, v0:775,  poids:12.8 },
    { label: "GECO Star 10,4g 🌿",               marque:"GECO",  sansPlomb:true,  v0:816,  poids:10.4 },
    { label: "GECO Zero 9,0g 🌿",                marque:"GECO",  sansPlomb:true,  v0:900,  poids:9.0  },
    { label: "GECO Plus 12,7g",                 marque:"GECO",  sansPlomb:false, v0:750,  poids:12.7 },
    { label: "GECO Express 11,7g",              marque:"GECO",  sansPlomb:false, v0:798,  poids:11.7 },
    { label: "GECO Softpoint 12,0g",            marque:"GECO",  sansPlomb:false, v0:790,  poids:12.0 },
    { label: "Norma Oryx 12,7g",               marque:"Norma", sansPlomb:false, v0:770,  poids:12.7 },
    { label: "Norma Tipstrike 11,7g",           marque:"Norma", sansPlomb:false, v0:800,  poids:11.7 },
    { label: "Norma Ecostrike 10,4g 🌿",         marque:"Norma", sansPlomb:true,  v0:850,  poids:10.4 },
  ],

  // ── 8×57 JRS ─────────────────────────────────────────────────────────────
  "8x57 JRS": [
    { label: "Sako Gamehead 11,3g", marque:"Sako", sansPlomb:false, v0:775, poids:11.3 },
    { label: "Hornady Custom International InterLock 12,7g", marque:"Hornady", sansPlomb:false, v0:720, poids:12.7 },
    { label: "Sako Hammerhead 13,0g", marque:"Sako", sansPlomb:false, v0:720, poids:13.0 },
    { label: "Winchester Power Point 12,7g", marque:"Winchester", sansPlomb:false, v0:719, poids:12.7 },
    { label: "Norma Tipstrike 11,7g", marque:"Norma", sansPlomb:false, v0:760, poids:11.7 },
    { label: "Norma Vulkan 12,7g", marque:"Norma", sansPlomb:false, v0:730, poids:12.7 },
    { label: "Norma Whitetail 12,7g", marque:"Norma", sansPlomb:false, v0:730, poids:12.7 },
    { label: "RWS Evolution Green 9,0g 🌿",      marque:"RWS",   sansPlomb:true,  v0:865,  poids:9.0  },
    { label: "RWS HIT 10,4g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:805,  poids:10.4 },
    { label: "RWS Speed Tip Pro 11,7g",          marque:"RWS",   sansPlomb:false, v0:745,  poids:11.7 },
    { label: "RWS Evolution 13,0g",              marque:"RWS",   sansPlomb:false, v0:695,  poids:13.0 },
    { label: "RWS ID Classic 12,8g",             marque:"RWS",   sansPlomb:false, v0:750,  poids:12.8 },
    { label: "GECO Star 10,4g 🌿",               marque:"GECO",  sansPlomb:true,  v0:836,  poids:10.4 },
    { label: "GECO Zero 9,0g 🌿",                marque:"GECO",  sansPlomb:true,  v0:850,  poids:9.0  },
    { label: "GECO Plus 12,7g",                 marque:"GECO",  sansPlomb:false, v0:710,  poids:12.7 },
    { label: "GECO Express 11,7g",              marque:"GECO",  sansPlomb:false, v0:836,  poids:11.7 },
    { label: "GECO Softpoint 12,0g",            marque:"GECO",  sansPlomb:false, v0:760,  poids:12.0 },
    { label: "Norma Oryx 12,7g",               marque:"Norma", sansPlomb:false, v0:770,  poids:12.7 },
  ],

  // ── 8×68 S ───────────────────────────────────────────────────────────────
  "8x68S": [
    { label: "Norma Tipstrike 11,7g", marque:"Norma", sansPlomb:false, v0:910, poids:11.7 },
    { label: "RWS Driven Hunt 10,4g 🌿",           marque:"RWS",   sansPlomb:true, v0:985,  poids:10.4 },
    { label: "RWS Evolution Green 9,0g 🌿",      marque:"RWS",   sansPlomb:true,  v0:1019, poids:9.0  },
    { label: "RWS HIT 10,4g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:970,  poids:10.4 },
    { label: "RWS Speed Tip Pro 11,7g",          marque:"RWS",   sansPlomb:false, v0:930,  poids:11.7 },
    { label: "RWS Evolution 13,0g",              marque:"RWS",   sansPlomb:false, v0:895,  poids:13.0 },
    { label: "RWS KS 11,7g",                     marque:"RWS",   sansPlomb:false, v0:950,  poids:11.7 },
    { label: "Norma Swift A-Frame 13,0g",               marque:"Norma", sansPlomb:false, v0:900,  poids:13.0 },
  ],

  // ── .338 WINCHESTER MAGNUM ────────────────────────────────────────────────
  ".338 Win Mag": [
    { label: "Hornady Custom InterLock 14,9g", marque:"Hornady", sansPlomb:false, v0:800, poids:14.9 },
    { label: "Winchester Ballistic Silvertip 13,0g", marque:"Winchester", sansPlomb:false, v0:899, poids:13.0 },
    { label: "Hornady Precision Hunter ELD-X 14,9g", marque:"Hornady", sansPlomb:false, v0:856, poids:14.9 },
    { label: "Sako Hammerhead 16,2g", marque:"Sako", sansPlomb:false, v0:745, poids:16.2 },
    { label: "Norma Oryx 14,9g",               marque:"Norma", sansPlomb:false, v0:840,  poids:14.9 },
    { label: "Norma Ecostrike 13,0g 🌿",         marque:"Norma", sansPlomb:true,  v0:900,  poids:13.0 },
  ],
  ".338 Lapua Mag": [
    { label: "Lapua Naturalis 15,0g 🌿", marque:"Lapua", sansPlomb:true, v0:920, poids:15.0 },
    { label: "Lapua Scenar OTM 16,2g", marque:"Lapua", sansPlomb:false, v0:905, poids:16.2 },
    { label: "Hornady Precision Hunter ELD-X 18,5g", marque:"Hornady", sansPlomb:false, v0:853, poids:18.5 },
  ],

  // ── 9,3×62 ───────────────────────────────────────────────────────────────
  "9.3x62": [
    { label: "Sako Powerhead Blade 14,9g 🌿", marque:"Sako", sansPlomb:true, v0:780, poids:14.9 },
    { label: "RWS Speed Tip Pro 16,7g", marque:"RWS", sansPlomb:false, v0:776, poids:16.7 },
    { label: "Lapua Naturalis 16,2g 🌿", marque:"Lapua", sansPlomb:true, v0:740, poids:16.2 },
    { label: "Lapua Mega 18,5g", marque:"Lapua", sansPlomb:false, v0:690, poids:18.5 },
    { label: "Sako Hammerhead 18,5g", marque:"Sako", sansPlomb:false, v0:710, poids:18.5 },
    { label: "Hornady Custom International InterLock 18,5g", marque:"Hornady", sansPlomb:false, v0:722, poids:18.5 },
    { label: "Winchester Power Point 18,5g", marque:"Winchester", sansPlomb:false, v0:719, poids:18.5 },
    { label: "Norma Tipstrike 16,5g", marque:"Norma", sansPlomb:false, v0:760, poids:16.5 },
    { label: "Norma Evostrike 11,9g 🌿", marque:"Norma", sansPlomb:true, v0:900, poids:11.9 },
    { label: "Norma Whitetail 18,5g", marque:"Norma", sansPlomb:false, v0:720, poids:18.5 },
    { label: "RWS Driven Hunt 16,2g 🌿",           marque:"RWS",   sansPlomb:true, v0:690,  poids:16.2 },
    { label: "RWS Driven Hunt SR 16,2g 🌿",        marque:"RWS",   sansPlomb:true, v0:704,  poids:16.2 },
    { label: "RWS Evolution Green 11,9g 🌿",     marque:"RWS",   sansPlomb:true,  v0:900,  poids:11.9 },
    { label: "RWS HIT 16,2g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:765,  poids:16.2 },
    { label: "RWS HIT SR 16,2g 🌿",              marque:"RWS",   sansPlomb:true,  v0:770,  poids:16.2 },
    { label: "RWS Evolution 18,8g",              marque:"RWS",   sansPlomb:false, v0:690,  poids:18.8 },
    { label: "RWS UNI Classic 19,0g",            marque:"RWS",   sansPlomb:false, v0:690,  poids:19.0 },
    { label: "RWS KS 16,0g",                     marque:"RWS",   sansPlomb:false, v0:750,  poids:16.0 },
    { label: "RWS DK 14,6g",                     marque:"RWS",   sansPlomb:false, v0:805,  poids:14.6 },
    { label: "GECO Star 16,2g 🌿",               marque:"GECO",  sansPlomb:true,  v0:738,  poids:16.2 },
    { label: "GECO Zero 12,2g 🌿",               marque:"GECO",  sansPlomb:true,  v0:870,  poids:12.2 },
    { label: "GECO Plus 16,5g",                 marque:"GECO",  sansPlomb:false, v0:740,  poids:16.5 },
    { label: "GECO Express 16,5g",              marque:"GECO",  sansPlomb:false, v0:760,  poids:16.5 },
    { label: "GECO Softpoint 16,5g",            marque:"GECO",  sansPlomb:false, v0:760,  poids:16.5 },
    { label: "Norma Oryx 18,5g",               marque:"Norma", sansPlomb:false, v0:720,  poids:18.5 },
    { label: "Norma Ecostrike 16,2g 🌿",         marque:"Norma", sansPlomb:true,  v0:765,  poids:16.2 },
  ],

  // ── 9,3×74R ──────────────────────────────────────────────────────────────
  "9.3x74R": [
    { label: "Sako Hammerhead 18,5g", marque:"Sako", sansPlomb:false, v0:685, poids:18.5 },
    { label: "Hornady Custom International InterLock 18,5g", marque:"Hornady", sansPlomb:false, v0:719, poids:18.5 },
    { label: "Winchester Power Point 18,5g", marque:"Winchester", sansPlomb:false, v0:719, poids:18.5 },
    { label: "Norma Tipstrike 16,5g", marque:"Norma", sansPlomb:false, v0:750, poids:16.5 },
    { label: "Norma Vulkan 15,0g", marque:"Norma", sansPlomb:false, v0:780, poids:15.0 },
    { label: "RWS Evolution Green 11,9g 🌿",     marque:"RWS",   sansPlomb:true,  v0:885,  poids:11.9 },
    { label: "RWS HIT 16,2g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:765,  poids:16.2 },
    { label: "RWS Evolution 18,8g",              marque:"RWS",   sansPlomb:false, v0:665,  poids:18.8 },
    { label: "RWS UNI Classic 19,0g",            marque:"RWS",   sansPlomb:false, v0:675,  poids:19.0 },
    { label: "RWS KS 16,0g",                     marque:"RWS",   sansPlomb:false, v0:740,  poids:16.0 },
    { label: "GECO Zero 11,9g 🌿",               marque:"GECO",  sansPlomb:true,  v0:825,  poids:11.9 },
    { label: "GECO Plus 16,5g",                 marque:"GECO",  sansPlomb:false, v0:730,  poids:16.5 },
    { label: "GECO Softpoint 16,5g",            marque:"GECO",  sansPlomb:false, v0:740,  poids:16.5 },
    { label: "Norma Oryx 18,5g",               marque:"Norma", sansPlomb:false, v0:720,  poids:18.5 },
    { label: "Norma Ecostrike 16,0g 🌿",         marque:"Norma", sansPlomb:true,  v0:750,  poids:16.0 },
  ],

  // ── 9,3×64 BRENNEKE ──────────────────────────────────────────────────────
  "9.3x64": [
    { label: "RWS Evolution Green 11,9g 🌿",     marque:"RWS",   sansPlomb:true,  v0:970,  poids:11.9 },
    { label: "RWS UNI Classic 19,0g",            marque:"RWS",   sansPlomb:false, v0:765,  poids:19.0 },
  ],

  // ── LEVIER DE SOUS-GARDE ─────────────────────────────────────────────────
  ".30-30 Win": [
    { label: "Hornady InterLock 9,7g", marque:"Hornady", sansPlomb:false, v0:728, poids:9.7 },
    { label: "Norma Whitetail 9,7g", marque:"Norma", sansPlomb:false, v0:720, poids:9.7 },
    { label: "Hornady LEVERevolution FTX 10,4g", marque:"Hornady", sansPlomb:false, v0:731, poids:10.4 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:670, poids:9.7 },
    { label: "Winchester Power Point 11,0g", marque:"Winchester", sansPlomb:false, v0:670, poids:11.0 },
  ],
  ".444 Marlin": [
    { label: "Hornady LEVERevolution FTX 17,0g", marque:"Hornady", sansPlomb:false, v0:709, poids:17.0 },
  ],
  ".45-70 Govt": [
    { label: "Hornady LEVERevolution FTX 16,2g", marque:"Hornady", sansPlomb:false, v0:617, poids:16.2 },
    { label: "Winchester Super-X Power-Point 19,4g", marque:"Winchester", sansPlomb:false, v0:573, poids:19.4 },
  ],
};

// ─── MARKDOWN-LIKE RENDERER ──────────────────────────────────────────────────
function ProseResponse({ text }) {
  if (!text) return null;
  const lines = text.split("\n");
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length) {
      elements.push(<ul key={`ul-${elements.length}`}>{listItems}</ul>);
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("### ")) {
      flushList();
      elements.push(<h3 key={i}>{line.replace("### ", "")}</h3>);
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(<h3 key={i}>{line.replace("## ", "")}</h3>);
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      const content = line.replace(/^[-•]\s/, "");
      listItems.push(
        <li key={i} dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>") }} />
      );
    } else if (line.trim()) {
      flushList();
      elements.push(
        <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>") }} />
      );
    }
  });
  flushList();

  return <div className="prose fade-in">{elements}</div>;
}

// ─── LOADER ──────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0", color: COLORS.textMuted }}>
      <div style={{ width: 16, height: 16, border: `2px solid ${COLORS.border}`, borderTopColor: COLORS.accent, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, animation: "pulse 1.5s ease infinite" }}>Analyse en cours…</span>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────



// ─── FUSIL DATA ──────────────────────────────────────────────────────────────
const FUSIL_CALIBRES = [
  { value:"10/89",   label:"Cal. 10 — 89mm",           chambres:["10/89"] },
  { value:"12/70",   label:"Cal. 12 — 70mm",           chambres:["12/65","12/67,5","12/70"] },
  { value:"12/76",   label:"Cal. 12 — 76mm (Magnum)",  chambres:["12/76"] },
  { value:"12/89",   label:"Cal. 12 — 89mm (Super Mag)",chambres:["12/89"] },
  { value:"16/70",   label:"Cal. 16 — 70mm",           chambres:["16/65","16/67,5","16/70"] },
  { value:"20/70",   label:"Cal. 20 — 70mm",           chambres:["20/70"] },
  { value:"20/76",   label:"Cal. 20 — 76mm (Magnum)",  chambres:["20/76"] },
  { value:"28/70",   label:"Cal. 28 — 70mm",           chambres:["28/70"] },
  { value:".410/76", label:"Cal. .410 — 76mm",          chambres:[".410/65",".410/76"] },
];

const FUSIL_PLOMBS = {
  "Bécasse des bois":   { plombs:"n°7–8",              charge:"28–32g", note:"Tir rapproché en sous-bois, plombs fins pour densité maximale" },
  "Faisan de chasse":   { plombs:"n°5–6",              charge:"32–36g", note:"Plombs standard, polyvalents pour faisan au lever" },
  "Perdrix grise":      { plombs:"n°6–7",              charge:"28–32g", note:"Tir à courte distance, plombs fins conseillés" },
  "Lièvre brun":        { plombs:"n°4–5",              charge:"32–36g", note:"Plombs plus gros pour pénétration suffisante sur lièvre" },
  "Lapin de garenne":   { plombs:"n°5–6",              charge:"28–32g", note:"Plombs standard, tir à courte distance" },
  "Pigeon ramier":      { plombs:"n°5–6",              charge:"30–34g", note:"Plombs standard pour pigeon en vol" },
  "Canard colvert":     { plombs:"acier n°3–4",        charge:"32–36g", note:"⚠️ Plomb interdit en zone humide — acier ou bismuth obligatoire" },
  "Bernache du Canada": { plombs:"acier n°1–2",        charge:"36–42g", note:"⚠️ Grand gabarit — acier impératif en zone humide" },
  "Foulque macroule":   { plombs:"acier n°4–5",        charge:"30–34g", note:"⚠️ Acier obligatoire en zone humide" },
  "Renard roux":        { plombs:"n°2–3", charge:"34–38g", note:"Gros plombs conseillés pour le renard. La chevrotine est interdite en Belgique." },
  "Sanglier":           { plombs:"Balle fusil uniquement", charge:"Balle fusil", note:"⚠️ La chevrotine est INTERDITE en Belgique. Seule la balle fusil est autorisée pour le sanglier. Vérifiez la réglementation de votre région." },
};


// ─── COEFFICIENTS BALISTIQUES (BC G1) ───
const SPECIFIC_BC = {
                  "8x57 JS|||Naturalis": 0.33,
                  "6.5 Creedmoor|||Mega": 0.29,
                  "8x57 JRS|||Custom International InterLock": 0.408,
                  "7x64|||Custom International InterLock": 0.433,
                  "7x64|||Precision Hunter ELD-X": 0.63,
                  "30-06|||Outfitter": 0.403,
                  ".338 Win Mag|||Custom": 0.514,
                  ".270 Win|||Custom International InterLock": 0.408,
                  "6.5 Creedmoor|||Super Hammerhead": 0.437,
                  ".300 Win Mag|||Powerhead Blade": 0.41,
                  "9.3x74R|||Power Point": 0.283,
                  "9.3x62|||UNI Classic": 0.465,
                  "9.3x62|||Evolution": 0.4,
                  "9.3x62|||HIT SR": 0.395,
                  "9.3x62|||Evolution Green": 0.312,
                  "9.3x62|||Driven Hunt SR": 0.273,
                  "8x57 JS|||HIT SR": 0.338,
                  "30-06|||Speed Tip Pro SR": 0.405,
                  "30-06|||HIT SR": 0.42,
                  "30-06|||Evolution Green SR": 0.332,
                  "30-06|||Driven Hunt SR": 0.169,
                  ".308 Win|||Speed Tip Pro SR": 0.421,
                  ".300 Win Mag|||UNI Classic": 0.35,
                  ".270 WSM|||HIT": 0.385,
                  "8x68S|||Swift A-Frame": 0.357,
                  "7x57R|||Tipstrike": 0.51,
                  "7x65R|||Ecostrike": 0.443,
                  "7x65R|||Tipstrike": 0.51,
                  ".300 Wby Mag|||Oryx": 0.354,
                  ".300 WSM|||Oryx": 0.354,
                  ".300 WSM|||Ecostrike": 0.431,
                  ".270 WSM|||Ecostrike": 0.36,
                  ".270 Win|||Ecostrike": 0.36,
                  ".270 Win|||Whitetail": 0.359,
                  "7x64|||Bondstrike": 0.632,
                  "9.3x62|||Ecostrike": 0.328,
                  ".338 Win Mag|||Ecostrike": 0.441,
                  "8x57 JS|||Whitetail": 0.305,
                  "8x57 JRS|||Whitetail": 0.305,
                  "8x57 JRS|||Vulkan": 0.347,
                  ".300 Win Mag|||Ecostrike": 0.431,
                  "30-06|||Ecostrike": 0.431,
                  ".308 Win|||Whitetail": 0.257,
                  ".223 Rem|||Tipstrike": 0.245,
                  ".22-250 Rem|||Tipstrike": 0.245,
                  "8x57 JS|||Express": 0.373,
                  "8x57 JRS|||Express": 0.251,
                  ".270 Win|||Express": 0.344,
                  ".300 Win Mag|||Softpoint": 0.305,
                  "8x57 JRS|||Plus": 0.346,
                  "8x57 JRS|||Zero": 0.225,
                  "30-06|||Zero": 0.229,
                  ".300 Win Mag|||Zero": 0.229,
                  "8x57 JRS|||Star": 0.251,
                  "30-06|||Star": 0.397,
                  "8x57 JS|||Power Point": 0.205,
                  "7x64|||Evolution Green": 0.392,
                  "7mm Rem Mag|||Power Point": 0.373,
                  ".45-70 Govt|||Super-X Power-Point": 0.283,
                  ".338 Win Mag|||Ballistic Silvertip": 0.414,
                  "30-06|||Softpoint": 0.305,
                  "30-06|||Plus": 0.274,
                  "30-06|||Expedition Big Game": 0.509,
                  "30-06|||Copper Impact": 0.387,
                  "30-06|||Deer Season XP Copper": 0.387,
                  ".308 Win|||Powerhead Blade": 0.415,
                  ".308 Win|||Copper Impact": 0.387,
                  ".308 Win|||Deer Season XP Copper": 0.387,
                  ".300 Win Mag|||Plus": 0.274,
                  ".300 WSM|||Power Max Bonded": 0.394,
                  ".25-06 Rem|||Power Point": 0.344,
                  ".25-06 Rem|||Gamehead": 0.381,
                  ".270 Win|||Vulkan": 0.34,
                  ".270 Win|||Expedition Big Game": 0.472,
                  "6.5 PRC|||Expedition Big Game": 0.314,
                  "6.5 Creedmoor|||Ballistic Silvertip": 0.509,
                  "6.5x55 SE|||Custom International InterLock": 0.465,
                  "5.6x52R|||Whitetail": 0.268,
                  ".243 Win|||Precision Hunter ELD-X": 0.409,
                  ".243 Win|||Deer Season XP": 0.363,
                  ".223 Rem|||Power Point": 0.197,
                  ".223 Rem|||Gamehead": 0.207,
                  ".22-250 Rem|||Power Point": 0.197,
                  ".270 Win|||Evostrike": 0.292,
                  ".30-30 Win|||Whitetail": 0.217,
                  ".338 Win Mag|||Oryx": 0.37,
                  "8x57 JS|||Speed Tip Pro SR": 0.393,
                  ".300 PRC|||Ecostrike": 0.431,
                  ".300 PRC|||Bondstrike": 0.615,
                  ".300 WSM|||Bondstrike": 0.615,
                  ".300 WSM|||Power Point": 0.438,
                  ".300 WSM|||Ballistic Silvertip": 0.507,
                  ".300 WSM|||Expedition Big Game": 0.301,
                  ".300 WSM|||Precision Hunter ELD-X": 0.597,
                  ".300 Win Mag|||Driven Hunt": 0.185,
                  ".300 Win Mag|||Star": 0.387,
                  ".300 Win Mag|||Express": 0.404,
                  ".300 Win Mag|||Whitetail": 0.274,
                  ".300 Win Mag|||Evostrike": 0.318,
                  ".300 Win Mag|||Power Max Bonded": 0.394,
                  ".300 Win Mag|||Power Point": 0.438,
                  ".300 Win Mag|||Deer Season XP": 0.392,
                  ".300 Win Mag|||Expedition Big Game": 0.301,
                  ".300 Win Mag|||Super-X Power-Point": 0.294,
                  ".30R Blaser|||Oryx": 0.33,
                  "30-06|||Express": 0.404,
                  "30-06|||Evostrike": 0.318,
                  "30-06|||Power Max Bonded": 0.394,
                  "30-06|||Power Point": 0.381,
                  "30-06|||Ballistic Silvertip": 0.435,
                  "30-06|||Deer Season XP": 0.392,
                  "30-06|||Super-X Power-Point": 0.294,
                  ".308 Win|||HIT SR": 0.386,
                  ".308 Win|||Evolution Green SR": 0.332,
                  ".308 Win|||Driven Hunt SR": 0.169,
                  ".308 Win|||Softpoint": 0.305,
                  ".308 Win|||Plus": 0.274,
                  ".308 Win|||Zero": 0.229,
                  ".308 Win|||Star": 0.388,
                  ".308 Win|||Express": 0.404,
                  ".308 Win|||Tipstrike": 0.454,
                  ".308 Win|||Vulkan": 0.315,
                  ".308 Win|||Evostrike": 0.318,
                  ".308 Win|||Power Max Bonded": 0.394,
                  ".308 Win|||Power Point": 0.294,
                  ".308 Win|||Super-X Power-Point": 0.382,
                  ".270 WSM|||Oryx": 0.373,
                  ".270 WSM|||Power Max Bonded": 0.34,
                  ".270 Win|||Tipstrike": 0.48,
                  ".270 Win|||Power Max Bonded": 0.34,
                  ".270 Win|||Ballistic Silvertip": 0.433,
                  "7x64|||Oryx": 0.324,
                  "7mm PRC|||Precision Hunter ELD-X": 0.689,
                  "7mm Rem Mag|||Whitetail": 0.341,
                  "7mm Rem Mag|||Evostrike": 0.392,
                  "7mm Rem Mag|||Ballistic Silvertip": 0.493,
                  "7mm-08|||Tipstrike": 0.51,
                  "7mm-08|||Power Point": 0.36,
                  "6.5 Creedmoor|||Express": 0.406,
                  "6.5 Creedmoor|||HIT": 0.401,
                  "6.5 Creedmoor|||Deer Season XP": 0.54,
                  ".223 Rem|||Softpoint": 0.237,
                  "9.3x74R|||Custom International InterLock": 0.4,
                  "9.3x62|||Custom International InterLock": 0.4,
                  ".338 Lapua Mag|||Precision Hunter ELD-X": 0.757,
                  ".338 Lapua Mag|||Scenar OTM": 0.648,
                  ".338 Win Mag|||Hammerhead": 0.342,
                  ".338 Win Mag|||Precision Hunter ELD-X": 0.616,
                  "8x68S|||Tipstrike": 0.361,
                  "8x57 JRS|||Tipstrike": 0.361,
                  "8x57 JRS|||Hammerhead": 0.276,
                  "8x57 JRS|||Gamehead": 0.374,
                  "8x57 JS|||Ecostrike": 0.353,
                  "8x57 JS|||Tipstrike": 0.361,
                  "8x57 JS|||ID Classic": 0.36,
                  "8x57 JS|||Evolution": 0.38,
                  "8x57 JS|||Speed Tip Pro": 0.394,
                  "8x57 JS|||Evolution Green": 0.327,
                  "8x57 JS|||Hammerhead": 0.276,
                  "8x57 JS|||Custom International InterLock": 0.398,
                  ".300 PRC|||Precision Hunter ELD-X": 0.663,
                  ".300 WSM|||Super Hammerhead": 0.421,
                  ".300 WSM|||Evolution": 0.366,
                  ".300 Win Mag|||Ballistic Silvertip": 0.507,
                  ".300 Win Mag|||Precision Hunter ELD-X": 0.597,
                  ".300 Win Mag|||Super Hammerhead": 0.421,
                  ".300 Win Mag|||Hammerhead": 0.408,
                  ".300 Win Mag|||American Whitetail": 0.425,
                  ".300 Win Mag|||SST": 0.48,
                  ".300 Win Mag|||Outfitter GMX": 0.44,
                  ".300 Win Mag|||Naturalis": 0.354,
                  ".300 Win Mag|||Mega": 0.319,
                  "30-06|||Precision Hunter ELD-X": 0.552,
                  "30-06|||Custom International InterLock": 0.425,
                  "30-06|||American Whitetail": 0.425,
                  "30-06|||SST": 0.415,
                  "30-06|||Hammerhead": 0.408,
                  "30-06|||Gamehead": 0.41,
                  "30-06|||Super Hammerhead": 0.41,
                  ".308 Win|||Ecostrike": 0.376,
                  ".308 Win|||Oryx": 0.354,
                  ".308 Win|||DK": 0.293,
                  ".308 Win|||KS": 0.298,
                  ".308 Win|||ID Classic": 0.303,
                  ".308 Win|||UNI Classic": 0.35,
                  ".308 Win|||Evolution": 0.366,
                  ".308 Win|||HIT": 0.42,
                  ".308 Win|||Evolution Green": 0.318,
                  ".308 Win|||Driven Hunt": 0.185,
                  ".308 Win|||Ballistic Silvertip": 0.435,
                  ".308 Win|||Deer Season XP": 0.392,
                  ".308 Win|||Naturalis": 0.354,
                  ".308 Win|||Precision Hunter ELD-X": 0.552,
                  ".308 Win|||Custom International InterLock": 0.425,
                  ".308 Win|||American Whitetail": 0.435,
                  ".308 Win|||SST": 0.415,
                  ".308 Win|||GMX": 0.44,
                  ".308 Win|||Outfitter GMX": 0.44,
                  ".308 Win|||Gamehead": 0.41,
                  ".308 Win|||Mega": 0.33,
                  ".308 Win|||Scenar OTM": 0.46,
                  ".308 Win|||Super Hammerhead": 0.41,
                  ".308 Win|||Hammerhead": 0.387,
                  "7mm PRC|||Bondstrike": 0.632,
                  "7mm Rem Mag|||Arrowhead": 0.515,
                  "7mm Rem Mag|||Ecostrike": 0.443,
                  "7mm Rem Mag|||KS": 0.381,
                  "7mm Rem Mag|||ID Classic": 0.356,
                  "7mm Rem Mag|||Speed Tip Pro": 0.479,
                  "7mm Rem Mag|||HIT": 0.409,
                  ".270 Win|||KS": 0.345,
                  ".270 Win|||Evolution": 0.335,
                  ".270 Win|||HIT": 0.385,
                  ".270 Win|||Deer Season XP": 0.45,
                  "7x65R|||KS": 0.29,
                  "7x65R|||ID Classic": 0.356,
                  "7x65R|||Evolution": 0.399,
                  "7x65R|||HIT": 0.409,
                  "7x65R|||Evolution Green": 0.392,
                  "7x64|||Ecostrike": 0.443,
                  "7x64|||Tipstrike": 0.51,
                  "7x64|||KS": 0.29,
                  "7x64|||HIT": 0.409,
                  "7x57R|||KS": 0.381,
                  "7x57R|||ID Classic": 0.356,
                  "7x57R|||Evolution Green": 0.392,
                  "7x57|||Evolution Green": 0.392,
                  "7x57|||ID Classic": 0.325,
                  "6.5 Creedmoor|||Whitetail": 0.373,
                  "6.5 Creedmoor|||Evostrike": 0.317,
                  "6.5 Creedmoor|||Oryx": 0.348,
                  "6.5 Creedmoor|||Tipstrike": 0.428,
                  "6.5 Creedmoor|||Speed Tip Pro": 0.457,
                  "6.5 Creedmoor|||Evolution Green": 0.309,
                  "6.5 Creedmoor|||Gamehead": 0.471,
                  "5.6x52R|||TMS": 0.248,
                  "5.6x50R Mag|||TMS": 0.24,
                  "5.6x50R Mag|||HIT": 0.124,
                  ".22-250 Rem|||Varmint Express": 0.242,
                  ".22-250 Rem|||Gamehead": 0.207,
                  ".222 Rem|||Gamehead": 0.181,
                  ".17 HMR|||Varmint HV": 0.125,
                  "9.3x62|||Driven Hunt": 0.273,
                  "9.3x62|||HIT": 0.395,
                  "9.3x62|||Speed Tip Pro": 0.474,
                  "9.3x62|||KS": 0.32,
                  "9.3x62|||DK": 0.266,
                  "9.3x62|||Star": 0.237,
                  "9.3x62|||Zero": 0.241,
                  "9.3x62|||Plus": 0.335,
                  "9.3x62|||Express": 0.398,
                  "9.3x62|||Softpoint": 0.277,
                  "9.3x62|||Oryx": 0.356,
                  "9.3x62|||Whitetail": 0.365,
                  "9.3x62|||Evostrike": 0.312,
                  "9.3x62|||Naturalis": 0.419,
                  "9.3x62|||Mega": 0.339,
                  "9.3x62|||Hammerhead": 0.315,
                  "9.3x62|||Powerhead Blade": 0.342,
                  "7x64|||Speed Tip Pro": 0.479,
                  "7x64|||Evolution": 0.399,
                  "7x64|||ID Classic": 0.356,
                  "7x64|||Express": 0.418,
                  "7x64|||Softpoint": 0.36,
                  "7x64|||Star": 0.22,
                  "7x64|||Plus": 0.375,
                  "7x64|||Zero": 0.274,
                  "7x64|||Vulkan": 0.353,
                  "7x64|||Naturalis": 0.28,
                  "7x64|||Hammerhead": 0.371,
                  "7x64|||Gamehead": 0.328,
                  "7x64|||Arrowhead": 0.515,
                  "7x64|||Powerhead": 0.45,
                  ".308 Win|||Bondstrike": 0.615,
                  ".308 Win|||Speed Tip Pro": 0.422,
                  "30-06|||Speed Tip Pro": 0.422,
                  "30-06|||Evolution": 0.366,
                  "30-06|||Evolution Green": 0.318,
                  "30-06|||Driven Hunt": 0.185,
                  "30-06|||UNI Classic": 0.38,
                  "30-06|||HIT": 0.42,
                  "30-06|||KS": 0.298,
                  "30-06|||DK": 0.293,
                  "30-06|||Oryx": 0.354,
                  "30-06|||Vulkan": 0.315,
                  "30-06|||Bondstrike": 0.615,
                  "30-06|||Tipstrike": 0.454,
                  "30-06|||Whitetail": 0.257,
                  "30-06|||Mega": 0.319,
                  "30-06|||Naturalis": 0.354,
                  "30-06|||ID Classic": 0.303,
                  "6.5 Creedmoor|||ELD-X": 0.625,
                  "6.5 Creedmoor|||Precision Hunter": 0.625,
                  "6.5 Creedmoor|||Bondstrike": 0.629,
                  "6.5 Creedmoor|||Star": 0.255,
                  "6.5 Creedmoor|||SST": 0.485,
                  "6.5 Creedmoor|||American Whitetail": 0.445,
                  "6.5 Creedmoor|||Ecostrike": 0.39,
                  "6.5 Creedmoor|||Powerhead Blade": 0.431,
                  "6.5 Creedmoor|||Gamehead Pro": 0.51,
                  "6.5 Creedmoor|||Naturalis": 0.201,
                  "6.5x55 SE|||HIT": 0.401,
                  "6.5x55 SE|||Speed Tip Pro": 0.457,
                  "6.5x55 SE|||Evolution Green": 0.309,
                  "6.5x55 SE|||Express": 0.428,
                  "6.5x55 SE|||Plus": 0.308,
                  "6.5x55 SE|||DK": 0.305,
                  "6.5x55 SE|||Bondstrike": 0.629,
                  "6.5x55 SE|||Oryx": 0.348,
                  "6.5x55 SE|||Ecostrike": 0.39,
                  "6.5x55 SE|||Tipstrike": 0.428,
                  "6.5x55 SE|||Whitetail": 0.276,
                  "6.5x55 SE|||Evostrike": 0.309,
                  "6.5x55 SE|||SST": 0.498,
                  "6.5x55 SE|||Mega": 0.377,
                  "6.5x55 SE|||Powerhead Blade": 0.443,
                  "6.5x55 SE|||Vulkan": 0.354,
                  ".270 Win|||Speed Tip Pro": 0.459,
                  ".270 Win|||Evolution Green": 0.292,
                  ".270 Win|||SST": 0.46,
                  ".270 Win|||American Whitetail": 0.462,
                  ".270 Win|||ELD-X": 0.536,
                  ".270 Win|||Star": 0.3,
                  ".270 Win|||Plus": 0.316,
                  ".270 Win|||Softpoint": 0.247,
                  ".270 Win|||Oryx": 0.373,
                  ".270 Win|||Super Hammerhead": 0.4,
                  ".270 Win|||Powerhead": 0.431,
                  ".270 Win|||Hammerhead": 0.321,
                  ".300 Win Mag|||Evolution Green": 0.326,
                  ".300 Win Mag|||Evolution": 0.366,
                  ".300 Win Mag|||Bondstrike": 0.615,
                  ".300 Win Mag|||Oryx": 0.354,
                  ".300 Win Mag|||HIT": 0.42,
                  ".300 Win Mag|||Speed Tip Pro": 0.422,
                  ".300 Win Mag|||KS": 0.329,
                  ".300 Win Mag|||DK": 0.293,
                  "8x57 JS|||Driven Hunt": 0.17,
                  "8x57 JS|||HIT": 0.338,
                  "8x57 JS|||Star": 0.255,
                  "8x57 JS|||Zero": 0.225,
                  "8x57 JS|||Plus": 0.346,
                  "8x57 JS|||Softpoint": 0.245,
                  "8x57 JS|||Vulkan": 0.347,
                  "8x57 JS|||Oryx": 0.331,
                  "7mm Rem Mag|||Evolution Green": 0.392,
                  "7mm Rem Mag|||Evolution": 0.399,
                  "7mm Rem Mag|||Express": 0.418,
                  "7mm Rem Mag|||Zero": 0.274,
                  "7mm Rem Mag|||Plus": 0.375,
                  "7mm Rem Mag|||Oryx": 0.324,
                  "7mm Rem Mag|||Bondstrike": 0.632,
                  "7mm Rem Mag|||Vulkan": 0.353,
                  "7mm Rem Mag|||Tipstrike": 0.51,
                  "7mm Rem Mag|||SST": 0.486,
                  "7mm Rem Mag|||ELD-X": 0.631,
                  "7mm Rem Mag|||American Whitetail": 0.453,
                  "7mm Rem Mag|||Outfitter": 0.455,
                  ".243 Win|||SST": 0.355,
                  ".243 Win|||Naturalis": 0.23,
                  ".243 Win|||ELD-X": 0.41,
                  ".243 Win|||American Whitetail": 0.405,
                  ".243 Win|||Power Point": 0.356,
                  ".243 Win|||Softpoint": 0.335,
                  ".243 Win|||Oryx": 0.261,
                  ".243 Win|||Whitetail": 0.257,
                  ".243 Win|||KS": 0.294,
                  ".243 Win|||TMS": 0.371,
                  ".243 Win|||Gamehead": 0.367,
                  ".243 Win|||Ballistic Silvertip": 0.4,
                  ".243 Win|||Deer Season": 0.363,
                  "6.5 PRC|||ELD-X": 0.625,
                  "6.5 PRC|||Precision Hunter": 0.625,
                  "6.5 PRC|||Bondstrike": 0.629,
                  "6.5 PRC|||Whitetail": 0.373,
                  "6.5 PRC|||Powerhead Blade": 0.348,
                  "9.3x74R|||HIT": 0.395,
                  "9.3x74R|||Evolution": 0.4,
                  "9.3x74R|||Evolution Green": 0.312,
                  "9.3x74R|||UNI Classic": 0.465,
                  "9.3x74R|||KS": 0.32,
                  "9.3x74R|||Zero": 0.241,
                  "9.3x74R|||Plus": 0.335,
                  "9.3x74R|||Softpoint": 0.277,
                  "9.3x74R|||Tipstrike": 0.428,
                  "9.3x74R|||Vulkan": 0.278,
                  "9.3x74R|||Ecostrike": 0.328,
                  "9.3x74R|||Oryx": 0.33,
                  "9.3x74R|||Hammerhead": 0.315,
                  "9.3x74R|||Mega": 0.339,
                  "9.3x64|||Evolution Green": 0.312,
                  "9.3x64|||UNI Classic": 0.465,
                  ".30-30 Win|||LEVERevolution": 0.33,
                  ".30-30 Win|||FTX": 0.33,
                  ".30-30 Win|||American Whitetail": 0.186,
                  ".30-30 Win|||InterLock": 0.186,
                  ".30-30 Win|||Power Point": 0.241,
                  ".444 Marlin|||LEVERevolution": 0.225,
                  ".444 Marlin|||FTX": 0.225,
                  ".45-70 Govt|||MonoFlex": 0.175,
                  ".45-70 Govt|||LEVERevolution": 0.175,
                  ".45-70 Govt|||FTX": 0.175,
                  ".338 Lapua Mag|||Speed Tip Pro": 0.566,
                  ".338 Lapua Mag|||Naturalis": 0.62,
                  ".338 Lapua Mag|||Mega": 0.64,
                  ".338 Lapua Mag|||Scenar": 0.64,
                  ".280 Rem|||SST": 0.486,
                  ".280 Rem|||ELD-X": 0.574,
                  ".280 Rem|||Vulkan": 0.353,
                  ".280 Rem|||Softpoint": 0.36,
                  ".280 Rem|||Oryx": 0.33,
                  "7mm-08|||SST": 0.486,
                  "7mm-08|||ELD-X": 0.574,
                  "7mm-08|||American Whitetail": 0.392,
                  "7mm-08|||Gamehead": 0.394,
                  "7mm-08|||Whitetail": 0.341,
                  "7mm-08|||Ballistic Silvertip": 0.454,
                  "7mm-08|||Deer Season": 0.484,
                  "7mm-08|||Oryx": 0.33,
                  "7x65R|||Zero": 0.274,
                  "7x65R|||Plus": 0.375,
                  "7x65R|||Softpoint": 0.36,
                  "7x65R|||Vulkan": 0.353,
                  "7x65R|||Hammerhead": 0.371,
                  "7x65R|||Oryx": 0.33,
                  "7x65R|||Naturalis": 0.28,
                  "6.5x57|||Evolution Green": 0.309,
                  "6.5x57|||KS": 0.361,
                  "6.5x57|||DK": 0.305,
                  "6.5x57R|||Evolution Green": 0.309,
                  "6.5x57R|||KS": 0.361,
                  "6.5x57R|||DK": 0.305,
                  "7x57|||Zero": 0.274,
                  "7x57|||Softpoint": 0.36,
                  "7x57|||Oryx": 0.33,
                  "7x57R|||Zero": 0.274,
                  "7x57R|||Softpoint": 0.36,
                  "7x57R|||Oryx": 0.33,
                  ".257 Roberts|||Power Point": 0.24,
                  ".25-06 Rem|||ELD-X": 0.465,
                  "8x57 JRS|||HIT": 0.338,
                  "8x57 JRS|||Speed Tip Pro": 0.394,
                  "8x57 JRS|||Evolution": 0.38,
                  "8x57 JRS|||Evolution Green": 0.327,
                  "8x57 JRS|||ID Classic": 0.36,
                  "8x57 JRS|||Softpoint": 0.245,
                  "8x68S|||Driven Hunt": 0.152,
                  "8x68S|||Evolution Green": 0.327,
                  "8x68S|||HIT": 0.338,
                  "8x68S|||Speed Tip Pro": 0.394,
                  "8x68S|||Evolution": 0.38,
                  "8x68S|||KS": 0.31,
                  ".30R Blaser|||Evolution Green": 0.319,
                  ".30R Blaser|||Evolution": 0.366,
                  ".30R Blaser|||UNI Classic": 0.35,
                  ".30R Blaser|||DK": 0.293,
                  ".222 Rem|||HIT": 0.124,
                  ".222 Rem|||TMS": 0.186,
                  ".222 Rem|||Match Jagd": 0.183,
                  ".222 Rem|||Express": 0.219,
                  ".223 Rem|||TMS": 0.207,
                  ".223 Rem|||Express": 0.202,
                  ".22 Hornet|||HIT": 0.123,
                  ".22 Hornet|||TMS": 0.152,
                  ".17 HMR|||V-MAX": 0.125,
                  ".17 HMR|||NTX": 0.087,
                  ".17 HMR|||Varmint": 0.125,
                };

const GAMME_BC = [
                  ["V-MAX", 0.125],
                  ["NTX", 0.087],
                  ["Varmint HV", 0.125],
                  ["Speed Tip Professional", 0.47],
                  ["Ballistic Silvertip", 0.43],
                  ["American Whitetail", 0.43],
                  ["Precision Hunter", 0.58],
                  ["Super Hammerhead", 0.38],
                  ["Evolution Green", 0.31],
                  ["Powerhead Blade", 0.4],
                  ["LEVERevolution", 0.33],
                  ["Speed Tip Pro", 0.47],
                  ["Copper Impact", 0.4],
                  ["Gamehead Pro", 0.5],
                  ["Driven Hunt", 0.2],
                  ["UNI Classic", 0.42],
                  ["Power Point", 0.32],
                  ["Deer Season", 0.4],
                  ["ID Classic", 0.35],
                  ["Match Jagd", 0.18],
                  ["Bondstrike", 0.62],
                  ["Hammerhead", 0.36],
                  ["Expedition", 0.45],
                  ["Evolution", 0.38],
                  ["Softpoint", 0.3],
                  ["Ecostrike", 0.38],
                  ["Tipstrike", 0.45],
                  ["Whitetail", 0.3],
                  ["Evostrike", 0.31],
                  ["Outfitter", 0.45],
                  ["InterLock", 0.4],
                  ["Naturalis", 0.32],
                  ["Powerhead", 0.42],
                  ["Arrowhead", 0.51],
                  ["Power Max", 0.35],
                  ["MonoFlex", 0.18],
                  ["Gamehead", 0.36],
                  ["Express", 0.4],
                  ["Super-X", 0.32],
                  ["Vulkan", 0.34],
                  ["Alaska", 0.3],
                  ["Scenar", 0.5],
                  ["ELD-X", 0.58],
                  ["Star", 0.24],
                  ["Plus", 0.35],
                  ["Zero", 0.26],
                  ["Oryx", 0.34],
                  ["Mega", 0.34],
                  ["HIT", 0.4],
                  ["TMS", 0.2],
                  ["SST", 0.48],
                  ["FTX", 0.3],
                  ["DGS", 0.3],
                  ["GMX", 0.45],
                  ["KS", 0.32],
                  ["DK", 0.29],
                  ["CX", 0.45],
                ];

const CAL_FALLBACK = {
                    ".17 HMR":0.125, ".22 Hornet":0.13, ".222 Rem":0.20, ".223 Rem":0.21,
                    ".22-250 Rem":0.24, "5.6x50R Mag":0.21, "5.6x52R":0.21,
                    ".243 Win":0.35, "6mm Rem":0.36, "6.5x55 SE":0.35, "6.5 Creedmoor":0.40,
                    ".260 Rem":0.40, "6.5 PRC":0.45, "6.5x57":0.34, "6.5x57R":0.34,
                    ".257 Roberts":0.28, ".25-06 Rem":0.35,
                    "7x57":0.34, "7x57R":0.34, "7x64":0.38, "7x65R":0.36,
                    ".270 Win":0.40, ".270 WSM":0.40, ".280 Rem":0.40, "7mm-08":0.40,
                    "7mm Rem Mag":0.45, "7mm PRC":0.50,
                    ".308 Win":0.40, "30-06":0.40, ".30R Blaser":0.35,
                    ".300 Win Mag":0.45, ".300 WSM":0.45, ".300 Wby Mag":0.50, ".300 PRC":0.55,
                    "8x57 JS":0.32, "8x57 JRS":0.34, "8x68S":0.38,
                    ".338 Win Mag":0.45, ".338 Lapua Mag":0.62,
                    "9.3x62":0.30, "9.3x74R":0.30, "9.3x64":0.32,
                    ".30-30 Win":0.25, ".444 Marlin":0.22, ".45-70 Govt":0.20
                  };

export default function ChassIA() {
  const getSavedLang = () => {
    try { return localStorage.getItem("chassia_lang") || null; } catch { return null; }
  };
  const [lang, setLang] = useState(getSavedLang());
  const handleSetLang = (code) => {
    try { localStorage.setItem("chassia_lang", code); } catch {}
    setLang(code);
  };
  const [tab, setTab] = useState("cible");

  // ── CARNET DE CHASSE ─────────────────────────────────────────────────────
  const CARNET_KEY = "chassia_carnet_v1";
  const getSaison = (dateStr) => {
    const d = dateStr ? new Date(dateStr) : new Date();
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    return m >= 7 ? `${y}-${y+1}` : `${y-1}-${y}`;
  };
  const loadCarnet = () => { try { return JSON.parse(localStorage.getItem(CARNET_KEY) || "[]"); } catch { return []; } };
  const saveCarnet = (entries) => { try { localStorage.setItem(CARNET_KEY, JSON.stringify(entries)); } catch {} };
  const [carnetEntries, setCarnetEntries] = useState(loadCarnet);
  const [carnetSaison, setCarnetSaison] = useState(getSaison());
  const [carnetView, setCarnetView] = useState("liste"); // "liste" | "stats" | "form"
  const [confirmDelete, setConfirmDelete] = useState(null);
  const emptyForm = { date: new Date().toISOString().slice(0,10), espece:"", sexe:"", calibre:"", munition:"", distance:"", distanceFuite:"", nbTirs:1, poids:"", tir:"", meteo:"", lieu:"", emotion:3, difficulte:3, notes:"", saison: getSaison() };
  const [carnetDraft, setCarnetDraft] = useState(emptyForm);

  // Cible state
  const [calibre, setCalib] = useState(".308 Win");

  // Cible personnalisée DRO state
  const [customDist, setCustomDist] = useState(100);
  const [customDRO, setCustomDRO] = useState(100);
  const [customMun, setCustomMun] = useState("");
  const [customResult, setCustomResult] = useState(null);
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [printModal, setPrintModal] = useState(false);
  const [printFormat, setPrintFormat] = useState("A4");

  // Calibre conseil state
  const [gibierCMulti, setGibierCMulti] = useState([]); // Premium multi-select
  const [calMode, setCalMode] = useState("carabine"); // "carabine" ou "fusil" (onglet calibre)
  const [typeChasse, setTypeChasse] = useState("");
  const [distC, setDistC] = useState("");
  const [loadingC, setLoadingC] = useState(false);
  const [conseilCalib, setConseilCalib] = useState("");

  // Munition conseil state
  const [gibierM, setGibierM] = useState("");
  const [gibierMMulti, setGibierMMulti] = useState([]); // Premium multi-select
  const [munMode, setMunMode] = useState("carabine"); // "carabine", "fusil" ou "comparateur"
  const [compCalibre, setCompCalibre] = useState(".308 Win");
  const [compMun1, setCompMun1] = useState("");
  const [compMun2, setCompMun2] = useState("");
  const [compMun3, setCompMun3] = useState("");
  const [compDRO, setCompDRO] = useState(150);
  const [calibreFusil, setCaliFusil] = useState("");
  const [calibreM, setCalibreM] = useState("");
  const [typeM, setTypeM] = useState("");
  const [loadingM, setLoadingM] = useState(false);
  const [conseilMun, setConseilMun] = useState("");

  const T = LANGS[lang] || LANGS.fr;
  const calibreObj = CALIBRES.find(c => c.value === calibre) || CALIBRES[6];
  const munList = MUNITIONS_DATA[calibre] || [];

  async function calculerCibleCustom() {
    if (!customDist || !customDRO) return;
    setLoadingCustom(true); setCustomResult(null);
    const munInfo = customMun
      ? `Munition : ${customMun}.`
      : `Calibre : ${calibre} (munition non précisée).`;
    const prompt = `Je dois régler ma carabine ${calibre} à une DRO de ${customDRO}m. Je tire actuellement depuis ${customDist}m.
${munInfo}
Donne-moi avec précision :
1. Le point d'impact attendu à ${customDist}m si la DRO est ${customDRO}m (en cm par rapport au point de visée, +haut/-bas) — c'est le point où je dois régler ma lunette à ${customDist}m pour obtenir une DRO de ${customDRO}m
2. La formule de calcul utilisée
3. Un conseil pratique pour ce réglage à ${customDist}m
4. La vérification recommandée (tirs de confirmation à différentes distances)
Réponds avec des ### titres, sois très précis sur les valeurs numériques.`;
    const resp = await askClaude(prompt, T.system);
    setCustomResult(resp); setLoadingCustom(false);
  }

  async function conseillerCalibre() {
    if (gibierCMulti.length === 0) return;
    setLoadingC(true); setConseilCalib("");
    const gibierCible = gibierCMulti.join(", ");
    const multiNote = gibierCMulti.length > 1 ? ` Calibre polyvalent pour ${gibierCMulti.length} gibiers.` : "";
    const prompt = `Je chasse en Belgique. Conseille-moi sur le meilleur calibre de carabine pour chasser ${gibierCible}${typeChasse ? ` en ${typeChasse}` : ""}${distC ? ` à des distances typiques de ${distC}m` : ""}.${multiNote}
    Donne 2-3 calibres recommandés avec leurs avantages/inconvénients, et un conseil sur le choix selon le profil du chasseur belge.`;
    try {
      const resp = await askClaude(prompt, T.system);
      setConseilCalib(resp);
    } catch(e) {
      setConseilCalib("❌ Erreur: " + (e?.message || String(e)));
    } finally {
      setLoadingC(false);
    }
  }

  async function conseillerMunition() {
    if ((!gibierM && gibierMMulti.length === 0) || !calibreM) return;
    setLoadingM(true); setConseilMun("");
    const listeMun = (MUNITIONS_DATA[calibreM] || []).map(m => m.label).join(", ");
    const gibierMCible = gibierMMulti.length > 0 ? gibierMMulti.join(", ") : gibierM;
                                const prompt = `Je chasse en Belgique. Quelles munitions recommandes-tu pour chasser ${gibierMCible} avec un ${calibreM}${typeM ? ` en ${typeM}` : ""}?
    Voici les munitions disponibles pour ce calibre (RWS, Norma et GECO uniquement) : ${listeMun}.
    Recommande 3 à 5 munitions parmi cette liste uniquement, avec pour chacune : le type d'ogive, le poids, l'usage idéal et pourquoi elle est adaptée à ce gibier en Belgique.
    Indique clairement lesquelles sont sans plomb (marquées 🌿). Rappelle la réglementation belge sur le plomb en zones humides si pertinent.`;
    try {
      const resp = await askClaude(prompt, T.system);
      setConseilMun(resp);
    } catch(e) {
      setConseilMun("❌ Erreur: " + (e?.message || String(e)));
    } finally {
      setLoadingM(false);
    }
  }

  // ── Assistant IA state ──────────────────────────────────────────────────
  const MAX_FREE = 3;
  const STORAGE_KEY = "chassia_questions_" + new Date().toDateString();

  const getQuestionsUsed = () => {
    try { return parseInt(localStorage.getItem(STORAGE_KEY) || "0"); } catch { return 0; }
  };
  const incrementQuestions = () => {
    try { localStorage.setItem(STORAGE_KEY, String(getQuestionsUsed() + 1)); } catch {}
  };

  const [isPremium, setIsPremium] = useState(false);
  const [questionsUsed, setQuestionsUsed] = useState(getQuestionsUsed());
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingQ, setLoadingQ] = useState(false);
  const canAsk = isPremium || questionsUsed < MAX_FREE;

  async function poserQuestion() {
    if (!question.trim() || !canAsk || loadingQ) return;

    // Garde-fou technique Premium : max 500 questions/mois (anti-abus)
    if (isPremium) {
      const monthKey = `chassia_premium_${new Date().getFullYear()}_${new Date().getMonth()}`;
      const monthCount = parseInt(localStorage.getItem(monthKey) || "0", 10);
      if (monthCount >= 500) {
        setChatHistory(h => [...h,
          { role:"assistant", content:"⚠️ Limite mensuelle de 500 questions atteinte. Elle se renouvelle automatiquement le 1er du mois." }
        ]);
        return;
      }
      try { localStorage.setItem(monthKey, String(monthCount + 1)); } catch {}
    }
    const q = question.trim();
    setQuestion("");
    setLoadingQ(true);

    // Build message history for API — Premium gets full context, Free gets none
    // We only send assistant text blocks (not loading states)
    const apiHistory = isPremium
      ? chatHistory.map(m => ({ role: m.role, content: m.content }))
      : [];

    const newHistory = [...chatHistory, { role: "user", content: q }];
    setChatHistory(newHistory);

    if (!isPremium) {
      incrementQuestions();
      setQuestionsUsed(getQuestionsUsed());
    }

    try {
      const resp = await askClaude(q, T.system, apiHistory, isPremium);
      setChatHistory([...newHistory, { role: "assistant", content: resp }]);
    } catch(e) {
      setChatHistory([...newHistory, { role: "assistant", content: "❌ Erreur: " + (e?.message || String(e)) }]);
    } finally {
      setLoadingQ(false);
    }
  }

  const tabs = T.tabs.map((label, i) => ({ id: T.tabIds[i], label }));

  const btnPrimary = {
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    color: "#0d0f0a", border: "none", borderRadius: 4,
    padding: "11px 24px", fontSize: 13, fontWeight: 600,
    letterSpacing: "0.06em", cursor: "pointer",
    boxShadow: `0 2px 16px ${COLORS.accentGlow}`,
    transition: "all 0.2s",
  };

  const card = {
    background: COLORS.bgCard,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    padding: "20px 22px",
    marginBottom: 16,
  };

  const fieldLabel = {
    display: "block",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 11,
    color: COLORS.textMuted,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginBottom: 6,
  };

  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ minHeight: "100vh", background: COLORS.bg, padding: "0 0 40px" }}>

        {/* HEADER */}
        <div style={{ borderBottom: `1px solid ${COLORS.border}`, padding: "22px 24px 18px", background: "rgba(13,15,10,0.95)", position: "sticky", top: 0, zIndex: 10, backdropFilter: "blur(8px)" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", alignItems: "center", gap: 14 }}>
            {/* Logo */}
            <svg width="36" height="36" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="17" fill="none" stroke={COLORS.accent} strokeWidth="1" />
              <circle cx="18" cy="18" r="11" fill="none" stroke={COLORS.accent} strokeWidth="0.5" opacity="0.5" />
              <line x1="2" y1="18" x2="34" y2="18" stroke={COLORS.accent} strokeWidth="0.8" />
              <line x1="18" y1="2" x2="18" y2="34" stroke={COLORS.accent} strokeWidth="0.8" />
              <circle cx="18" cy="18" r="2.5" fill={COLORS.accent} />
            </svg>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: COLORS.white, letterSpacing: "-0.02em", lineHeight: 1 }}>
                Chass<span style={{ color: COLORS.accent }}>IA</span>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textMuted, letterSpacing: "0.12em", marginTop: 2 }}>
                {T.subtitle}
              </div>
            </div>
            {lang && (
              <button onClick={() => { try { localStorage.removeItem('chassia_lang'); } catch {} setLang(null); }} style={{ background:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:4, color:COLORS.textMuted, padding:"4px 10px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, cursor:"pointer", marginLeft:"auto", flexShrink:0 }}>
                {LANGS[lang].flag} {lang.toUpperCase()}
              </button>
            )}
          </div>
        </div>

        {/* TABS */}
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 24px 0" }}>
          <div style={{ overflowX: "auto", overflowY: "visible", WebkitOverflowScrolling: "touch", marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${COLORS.border}`, minWidth: "max-content" }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{
                    background: tab === t.id ? COLORS.accentGlow : "transparent",
                    border: "none",
                    borderBottom: tab === t.id ? `2px solid ${COLORS.accent}` : "2px solid transparent",
                    color: tab === t.id ? COLORS.accent : COLORS.textMuted,
                    padding: "10px 14px",
                    fontSize: 11,
                    fontWeight: tab === t.id ? 600 : 400,
                    letterSpacing: "0.04em",
                    marginBottom: -1,
                    borderRadius: "4px 4px 0 0",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── TAB 1 : CIBLE ── */}
          {tab === "cible" && (
            <div className="fade-in">
              <p style={{ color: COLORS.textMuted, fontStyle: "italic", marginBottom: 16, fontSize: "1.05rem" }}>
                {T.cibleIntro}
              </p>

              {/* Formulaire */}
              <div style={card}>
                <div style={{ marginBottom: 14 }}>
                  <label style={fieldLabel}>Calibre *</label>
                  <select value={calibre} onChange={e => { setCalib(e.target.value); setCustomMun(""); setCustomResult(null); }}>
                    {CALIBRES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>

                </div>

                {/* Munition selector grouped by brand */}
                <div style={{ marginBottom: 14 }}>
                  <label style={fieldLabel}>Munition (optionnel)</label>
                  <select value={customMun} onChange={e => setCustomMun(e.target.value)} style={{width:"100%"}}>
                    <option value="">— Sélectionner —</option>
                    {calibre && ["RWS","Norma","GECO","Winchester","Hornady","Sako","Lapua"].flatMap(marque => {
                      const muns = (MUNITIONS_DATA[calibre] || []).filter(m => m.marque === marque);
                      if (!muns.length) return [];
                      return [
                        <option key={marque+"_h"} disabled value="">── {marque} ──</option>,
                        ...muns.map((m, i) => <option key={marque+i} value={m.label}>{m.label}</option>)
                      ];
                    })}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={fieldLabel}>{T.distTirLabel} *</label>
                    <select value={customDist} onChange={e => setCustomDist(parseInt(e.target.value) || "")}>
                      <option value="">— {T.selectionner} —</option>
                      {[50, 75, 100, 150, 200].map(d => <option key={d} value={d}>{d} m</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={fieldLabel}>{T.droLabel} *</label>
                    {isPremium ? (
                      <select value={customDRO} onChange={e => setCustomDRO(parseInt(e.target.value) || "")}>
                        <option value="">— {T.selectionner} —</option>
                        {Array.from({length: 30}, (_, i) => (i+1)*10).map(d => (
                          <option key={d} value={d}>{d} m</option>
                        ))}
                      </select>
                    ) : (
                      <>
                        <select value={customDRO} onChange={e => setCustomDRO(parseInt(e.target.value) || "")}>
                          <option value="">— {T.selectionner} —</option>
                          {(CALIBRES.find(c => c.value === calibre)?.droOptions || [100,150,200,250,300]).map(d => (
                            <option key={d} value={d}>{d} m</option>
                          ))}
                        </select>
                        <button onClick={() => setIsPremium(true)}
                          style={{ marginTop: 6, ...btnPrimary, background: COLORS.accentGlow, border: `1px solid ${COLORS.accent}`, color: COLORS.accent, fontSize: 10, padding: "4px 10px" }}>
                          ★ Premium : DRO libre 10–300m
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Cible SVG + Tableau */}
              {calibre && customDist && customDRO && (() => {
                // Calcul balistique simplifié (Pejsa)
                const munData = customMun ? (MUNITIONS_DATA[calibre] || []).find(m => m.label === customMun || m.label.trim() === customMun.trim()) : null;
                const v0 = munData ? munData.v0 : (CALIBRES.find(c => c.value === calibre)?.defaultV0 || 800);
                const massKg = munData ? munData.poids / 1000 : 0.010;
                const bc = (() => {
                
                
                  // 1. BC officiel exact (calibre + gamme)
                  if (munData) {
                    let g = munData.label.replace(/\s*\u2713\s*$/, '');
                    for (const m of ["RWS","Norma","GECO","Winchester","Hornady","Lapua","Sako"]) {
                      if (g.startsWith(m)) { g = g.slice(m.length).trim(); break; }
                    }
                    g = g.replace(/\d+[,.]?\d*\s*g.*$/, '').trim();
                    for (const [gKey] of GAMME_BC) {
                      if (g.toLowerCase().includes(gKey.toLowerCase())) {
                        const spec = SPECIFIC_BC[calibre + "|||" + gKey];
                        if (spec) return spec;
                      }
                    }
                    for (const [gKey, gBC] of GAMME_BC) {
                      if (g.toLowerCase().includes(gKey.toLowerCase())) return gBC;
                    }
                  }
                  
                  return CAL_FALLBACK[calibre] || 0.40;
                })();
                const dro = customDRO;
                const stand = customDist;

                // Modèle balistique calibré sur tableaux officiels RUAG (GECO/RWS)
                // Validé: ≤0,3cm d'écart vs tableaux officiels (50-300m, 2 réglages)
                const sightH = 0.05; // hauteur de visée 50mm (standard RUAG/européen)
                const k = 0.000375 / bc;
                const velAtM = d => v0 * Math.exp(-k * d);
                const tof = d => {
                  let t = 0; const steps = 50; const dx = d/steps;
                  for (let i = 0; i < steps; i++) { t += dx / velAtM(i*dx + dx/2); }
                  return t;
                };
                // Facteur de chute variable: corrige la traînée verticale (0,99 à 0m → ~0,89 à 300m)
                const dropF = d => Math.max(0.80, 0.99 - 0.268 * k * d);
                const dropGrav = d => 0.5 * 9.81 * tof(d) * tof(d) * dropF(d);
                const angle = (sightH + dropGrav(dro)) / dro;
                const dropAt = d => (-sightH + angle*d - dropGrav(d)) * 100;

                const impact = dropAt(stand);
                const impStr = impact >= 0 ? `+${impact.toFixed(1)}` : impact.toFixed(1);
                const SC = 130/15;
                const impSVGY = -impact * SC;
                const impSVGX = 0;
                const ly = impSVGY > 20 ? impSVGY + 22 : impSVGY - 15;
                const DISTS = [25,50,75,100,125,150,175,200,250,300];

                return (
                  <div style={{ marginTop: 14 }}>
                    {/* Conseil */}
                    <div style={{ background: COLORS.accentGlow, border: `1px solid ${COLORS.accent}40`, borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                        🎯 Réglage recommandé
                      </div>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: COLORS.white, lineHeight: 1.8 }}>
                        À <strong style={{color:COLORS.accent}}>{stand}m</strong>, le point d'impact sera <strong style={{color:COLORS.accent}}>{impStr} cm</strong> {impact >= 0 ? "au-dessus" : "en-dessous"} du centre.<br/>
                        À ta DRO de <strong style={{color:COLORS.accent}}>{dro}m</strong> : point d'impact = <strong style={{color:COLORS.accent}}>0 cm</strong>.
                      </div>
                    </div>

                    {/* Cible */}
                    <div className="chassia-print-target" style={{ background: "white", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 14 }}>
                      <div className="chassia-print-header" style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: "monospace", fontSize: "0.58rem", color: "#555" }}>
                        <div>
                          <strong style={{color:"#1a3a0a",fontSize:"0.85rem"}}>Chass<span style={{color:"#8bc34a"}}>IA</span></strong>
                          <div style={{color:"#888",fontSize:"0.5rem"}}>L'ASSISTANT IA DU CHASSEUR BELGE</div>
                        </div>
                        <div style={{textAlign:"right",lineHeight:1.7}}>
                          <strong>{calibre}</strong>{customMun ? ` · ${customMun.split(' ').slice(0,3).join(' ')}` : ""}<br/>
                          Stand:{stand}m · DRO:{dro}m
                        </div>
                      </div>

                      <svg width="280" height="280" viewBox="-140 -140 280 280">
                        <rect x="-140" y="-140" width="280" height="280" fill="white"/>
                        {[{r:15,f:"#f5f5f5",s:"#ddd"},{r:12,f:"#ebebeb",s:"#ccc"},{r:10,f:"#e0e0e0",s:"#bbb"},{r:8,f:"#ccc",s:"#aaa"},{r:6,f:"#bbb",s:"#999"},{r:4.5,f:"#222",s:"#000"},{r:3,f:"#111",s:"#000"},{r:1.5,f:"#c62828",s:"#b71c1c"},{r:0.5,f:"#ff1744",s:"#d50000"}].map((r,i) =>
                          <circle key={i} cx="0" cy="0" r={r.r*SC} fill={r.f} stroke={r.s} strokeWidth="0.8"/>
                        )}
                        <line x1="-140" y1="0" x2="140" y2="0" stroke="#ccc" strokeWidth="0.5" strokeDasharray="3,3"/>
                        <line x1="0" y1="-140" x2="0" y2="140" stroke="#ccc" strokeWidth="0.5" strokeDasharray="3,3"/>
                        {[-10,-5,5,10].map(i => (
                          <g key={i}>
                            <line x1={i*SC} y1="-4" x2={i*SC} y2="4" stroke="#aaa" strokeWidth="0.8"/>
                            <text x={i*SC} y="13" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#999">{i>0?`+${i}`:i}</text>
                          </g>
                        ))}
                        {/* Impact calculé */}
                        <line x1={impSVGX-13} y1={impSVGY} x2={impSVGX+13} y2={impSVGY} stroke="#1565c0" strokeWidth="2.5"/>
                        <line x1={impSVGX} y1={impSVGY-13} x2={impSVGX} y2={impSVGY+13} stroke="#1565c0" strokeWidth="2.5"/>
                        <circle cx={impSVGX} cy={impSVGY} r="5" fill="none" stroke="#1565c0" strokeWidth="2"/>
                        <rect x={impSVGX-30} y={ly-10} width="60" height="14" rx="2" fill="#1565c0"/>
                        <text x={impSVGX} y={ly} textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="white" fontWeight="bold">{impStr}cm/{stand}m</text>
                        {/* DRO */}
                        <circle cx="0" cy="0" r="6" fill="none" stroke="#2e7d32" strokeWidth="3"/>
                        <rect x="-26" y="-21" width="52" height="13" rx="2" fill="#2e7d32"/>
                        <text x="0" y="-12" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="white" fontWeight="bold">DRO {dro}m</text>
                        {/* Légende */}
                        <rect x="-135" y="122" width="270" height="16" rx="3" fill="#f5f5f5"/>
                        <circle cx="-115" cy="130" r="4" fill="none" stroke="#1565c0" strokeWidth="1.5"/>
                        <text x="-106" y="133" fontSize="7" fontFamily="monospace" fill="#333">Impact {stand}m ({impStr} cm)</text>
                        <circle cx="30" cy="130" r="4" fill="none" stroke="#2e7d32" strokeWidth="1.5"/>
                        <text x="38" y="133" fontSize="7" fontFamily="monospace" fill="#333">DRO {dro}m</text>
                      </svg>

                      <div className="chassia-print-specs" style={{width:"100%",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginTop:10,borderTop:"1px solid #eee",paddingTop:8}}>
                        {[[calibre,"Calibre"],[`${stand}m`,"Stand"],[`${dro}m`,"DRO"],[`${impStr}cm`,`à ${stand}m`]].map(([v,l]) => (
                          <div key={l} style={{textAlign:"center"}}>
                            <div style={{fontFamily:"monospace",fontSize:"0.6rem",fontWeight:700,color:"#1a3a0a"}}>{v}</div>
                            <div style={{fontFamily:"monospace",fontSize:"0.48rem",color:"#888",textTransform:"uppercase"}}>{l}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bouton Imprimer */}
                    <button onClick={() => setPrintModal(true)}
                      style={{ ...btnPrimary, width:"100%", marginTop:10, marginBottom:4, background:"transparent", border:`1px solid ${COLORS.border}`, color:COLORS.text, fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                      <span>⎙</span> {T.btnImprimer}
                    </button>

                    {/* Bouton IA Premium */}
                    {isPremium ? (
                      <div>
                        <button onClick={calculerCibleCustom} disabled={loadingCustom}
                          style={{ ...btnPrimary, width:"100%", background:"transparent", color:COLORS.accent, border:`1px solid ${COLORS.accent}`, fontSize:12 }}>
                          {loadingCustom ? "⏳ Analyse en cours..." : "🤖 Analyse IA approfondie — conseil personnalisé"}
                        </button>
                        {loadingCustom && <Loader />}
                        {customResult && <div style={{ ...card, marginTop:10 }}><ProseResponse text={customResult} /></div>}
                      </div>
                    ) : (
                      <button onClick={() => setIsPremium(true)}
                        style={{ ...btnPrimary, width:"100%", background:COLORS.accentGlow, border:`2px solid ${COLORS.accent}`, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                        <span style={{fontSize:16}}>★</span>
                        <div style={{textAlign:"left"}}>
                          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,fontWeight:700,color:COLORS.accent}}>Passer Premium — Analyse IA approfondie</div>
                          
                        </div>
                      </button>
                    )}
                  </div>
                );
              })()}

              {!(calibre && customDist && customDRO) && (
                <div style={{ ...card, borderStyle:"dashed", marginTop:12 }}>
                  <p style={{ color:COLORS.textDim, fontStyle:"italic", fontSize:"0.95rem", textAlign:"center" }}>
                    {T.ciblePH || "Sélectionne un calibre, une distance et une DRO pour générer ta cible."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── TAB 2 : CALIBRE ── */}
          {tab === "calibre" && (
            <div className="fade-in">
              <p style={{ color: COLORS.textMuted, fontStyle: "italic", marginBottom: 20, fontSize: "1.05rem" }}>
                {T.calibreIntro}
              </p>

              {/* Toggle Carabine / Fusil */}
              <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                {[["carabine","🔫 Carabine"],["fusil","🦆 Fusil"]].map(([mode, label]) => (
                  <button key={mode} onClick={() => { setCalMode(mode); setGibierCMulti([]); }}
                    style={{
                      flex:1, padding:"10px", borderRadius:6, fontFamily:"'IBM Plex Mono',monospace",
                      fontSize:12, fontWeight: calMode===mode ? 700 : 400, cursor:"pointer",
                      background: calMode===mode ? COLORS.accentGlow : COLORS.bgInput,
                      border: `2px solid ${calMode===mode ? COLORS.accent : COLORS.border}`,
                      color: calMode===mode ? COLORS.accent : COLORS.textMuted,
                      transition:"all 0.2s",
                    }}>
                    {label}
                  </button>
                ))}
              </div>

              <div style={card}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={fieldLabel}>
                      {T.gibierLabel}
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.accent, marginLeft:8 }}>jusqu'à 5</span>
                    </label>
                    <div>
                        <select onChange={e => {
                            const val = e.target.value;
                            if (!val) return;
                            setGibierCMulti(prev => prev.includes(val) ? prev : prev.length < 5 ? [...prev, val] : prev);
                            e.target.value = "";
                          }}>
                          <option value="">— Ajouter un gibier (jusqu'à 5) —</option>
                          {calMode === "carabine" ? (
                            <>
                              <optgroup label="🦌 Grand gibier">
                                {["Cerf élaphe","Chevreuil","Sanglier","Daim","Mouflon"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{g}</option>)}
                              </optgroup>
                              <optgroup label="🦊 Autre gibier">
                                {["Renard roux"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{g}</option>)}
                              </optgroup>
                            </>
                          ) : (
                            <>
                              <optgroup label="🐇 Petit gibier">
                                {["Lièvre brun","Faisan de chasse","Perdrix grise","Bécasse des bois"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{g}</option>)}
                              </optgroup>
                              <optgroup label="🦊 Autre gibier">
                                {["Lapin de garenne","Pigeon ramier","Renard roux"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{g}</option>)}
                              </optgroup>
                              <optgroup label="🦆 Gibier d'eau">
                                {["Bernache du Canada","Canard colvert","Foulque macroule"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{g}</option>)}
                              </optgroup>
                            </>
                          )}
                        </select>
                        {gibierCMulti.length > 0 && (
                          <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:6 }}>
                            {gibierCMulti.map(g => (
                              <span key={g} onClick={() => setGibierCMulti(gibierCMulti.filter(x=>x!==g))}
                                style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, background: COLORS.accentGlow, border:`1px solid ${COLORS.accent}`, color: COLORS.accent, borderRadius:4, padding:"3px 8px", cursor:"pointer" }}>
                                {g} ×
                              </span>
                            ))}
                            <span onClick={() => setGibierCMulti([])}
                              style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim, padding:"3px 6px", cursor:"pointer", alignSelf:"center" }}>
                              Effacer tout
                            </span>
                          </div>
                        )}
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim, marginTop:3 }}>
                          {gibierCMulti.length}/5 sélectionné{gibierCMulti.length>1?"s":""}
                        </div>
                      </div>
                  </div>
                  <div>
                    <label style={fieldLabel}>{T.typeLabel}</label>
                    <select value={typeChasse} onChange={e => setTypeChasse(e.target.value)} disabled={calMode === "fusil"} style={calMode === "fusil" ? {opacity:0.4} : {}}>
                      <option value="">{calMode === "fusil" ? "— Non applicable —" : T.typePH}</option>
                      {calMode === "carabine" && T.typeList.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                {calMode === "carabine" && (
                  <div style={{ marginBottom: 16 }}>
                    <label style={fieldLabel}>{T.distTirLabel}</label>
                    <select value={distC} onChange={e => setDistC(e.target.value)}>
                      <option value="">{T.distTirPH}</option>
                      {T.distTirList.map(d => <option key={d} value={d}>{d} m</option>)}
                    </select>
                  </div>
                )}
              </div>

              {/* Recommandations directes calibre */}
              {gibierCMulti.length > 0 && (() => {
                const gibiers = gibierCMulti;
                const isBattue = typeChasse === "Battue" || typeChasse === "Drijfjacht" || typeChasse === "Drückjagd" || typeChasse === "Driven hunt";
                const isShort    = distC && /moins|minder|unter|under|50.*(à|tot|bis|to)/i.test(distC);
                const isMedium   = distC && /100.*(à|tot|bis|to)/i.test(distC);
                const isLong     = distC && /150|plus|meer|über|over/i.test(distC);
                const isVeryLong = distC && /plus|meer|über|over/i.test(distC);

                // Grand gibier (cerf, sanglier, daim, mouflon)
                const isGrand = gibiers.some(g => ["Cerf élaphe","Sanglier","Daim","Mouflon","Red deer","Wild boar","Fallow deer","Mouflon","Rothirsch","Wildschwein","Damhirsch","Edelhert","Wild zwijn"].includes(g));
                // Moyen gibier (chevreuil)
                const isMoyen = gibiers.some(g => ["Chevreuil","Roe deer","Reh","Ree"].includes(g));
                // Renard (carabine)
                const isRenard = gibiers.some(g => ["Renard roux","Red fox","Rotfuchs","Vos"].includes(g));
                // Gibier à fusil de chasse
                const FUSIL_GIBIER = ["Faisan de chasse","Perdrix grise","Bécasse des bois","Lièvre brun","Lapin de garenne","Pigeon ramier","Bernache du Canada","Canard colvert","Foulque macroule","Pheasant","Grey partridge","Woodcock","Brown hare","Wild rabbit","Wood pigeon","Canada goose","Mallard","Coot","Fasan","Rebhuhn","Waldschnepfe","Feldhase","Wildkaninchen","Ringeltaube","Kanadagans","Stockente","Blässhuhn","Fazant","Patrijs","Houtsnip","Haas","Konijn","Houtduif","Canadese gans","Wilde eend","Meerkoet"];
                const isFusilGibier = gibiers.some(g => FUSIL_GIBIER.includes(g));
                // Gibier d'eau (plombs acier obligatoires)
                const isGibierEau = gibiers.some(g => ["Bernache du Canada","Canard colvert","Foulque macroule","Canada goose","Mallard","Coot","Kanadagans","Stockente","Blässhuhn","Canadese gans","Wilde eend","Meerkoet"].includes(g));
                // Petit gibier + gibier d'eau
                const isPetit = gibiers.some(g => ["Lièvre brun","Faisan de chasse","Perdrix grise","Bécasse des bois","Lapin de garenne","Pigeon ramier","Renard roux","Bernache du Canada","Canard colvert","Foulque macroule","Brown hare","Pheasant","Grey partridge","Woodcock","Wild rabbit","Wood pigeon","Red fox","Canada goose","Mallard","Coot","Feldhase","Fasan","Rebhuhn","Haas","Fazant","Patrijs","Vos"].includes(g));
                // Fusil de chasse uniquement si : pas de grand gibier, pas de moyen gibier, pas de renard
                const isFusilOnly = isFusilGibier && !isGrand && !isMoyen && !isRenard;

                // Recommendation logic
                let recs = [];
                let isFusilRec = false;

                if (isGrand && isBattue) {
                  recs = [
                    { cal:"9,3×62", note:"Le calibre de battue par excellence en Belgique — puissance d'arrêt maximale sur sanglier et cerf" },
                    { cal:"8×57 JS", note:"Classique du grand gibier en forêt — excellent compromis puissance/recul pour la battue" },
                    { cal:".30-06 Springfield", note:"Polyvalent et universel — munitions disponibles partout, idéal pour débuter en battue" },
                  ];
                } else if (isGrand && isVeryLong) {
                  recs = [
                    { cal:".300 Win Mag", note:"Trajectoire ultra-plate au-delà de 250m — énergie et précision maximales sur grand gibier" },
                    { cal:"7mm Rem Mag", note:"Balistique exceptionnelle à très longue portée — excellent pour l'affût en plaine" },
                    { cal:"6,5 PRC", note:"Le calibre moderne longue distance — BC élevé, dérive au vent minimale à 300m+" },
                  ];
                } else if (isGrand && isLong) {
                  recs = [
                    { cal:".300 Win Mag", note:"Plat, puissant, précis — idéal pour les tirs à plus de 150m sur cerf ou daim" },
                    { cal:"7mm Rem Mag", note:"Trajectoire plate et énergie élevée — excellent pour l'affût longue distance" },
                    { cal:".30-06 Springfield", note:"Très efficace jusqu'à 250m sur grand gibier — polyvalent et accessible" },
                  ];
                } else if (isGrand && isShort) {
                  recs = [
                    { cal:"9,3×62", note:"Puissance d'arrêt maximale à courte distance — le choix des professionnels pour le grand gibier" },
                    { cal:"8×57 JS", note:"Très efficace à moins de 100m — recul modéré et grande disponibilité des munitions" },
                    { cal:".30-06 Springfield", note:"Polyvalent même à courte distance — idéal si tu chasses aussi à moyenne portée" },
                  ];
                } else if (isGrand) {
                  recs = [
                    { cal:"9,3×62", note:"Le standard belge pour le grand gibier — puissance et versatilité toutes distances" },
                    { cal:".308 Winchester", note:"Précis, polyvalent, très répandu — munitions disponibles partout en Belgique" },
                    { cal:".30-06 Springfield", note:"L'un des calibres les plus complets — efficace de 50m à 300m sur cerf et sanglier" },
                  ];
                } else if (isMoyen && isVeryLong) {
                  recs = [
                    { cal:"6,5 PRC", note:"Le meilleur BC disponible pour l'affût chevreuil à très longue portée — précis à 300m+" },
                    { cal:"6,5 Creedmoor", note:"Balistique exceptionnelle au-delà de 250m — trajectoire ultra-plate" },
                    { cal:".270 Winchester", note:"Très efficace à longue distance sur chevreuil — trajectoire plate et précision" },
                  ];
                } else if (isMoyen && isLong) {
                  recs = [
                    { cal:"6,5 Creedmoor", note:"Balistique exceptionnelle à longue portée — le meilleur choix actuel pour l'affût chevreuil" },
                    { cal:"6,5×55 SE", note:"Le classique nordique — précis, doux au tir, idéal à l'affût à plus de 150m" },
                    { cal:".270 Winchester", note:"Trajectoire très plate — excellent pour les tirs ouverts à grande distance" },
                  ];
                } else if (isMoyen && isShort) {
                  recs = [
                    { cal:"7×64", note:"Polyvalent et précis — reste efficace même à courte distance en forêt dense" },
                    { cal:".308 Winchester", note:"Fiable à toutes distances — très bon choix pour les tirs de moins de 100m" },
                    { cal:"6,5×55 SE", note:"Doux, précis, peu destructeur — idéal pour la venaison de qualité à courte distance" },
                  ];
                } else if (isMoyen) {
                  recs = [
                    { cal:"7×64", note:"Le calibre de chasse par excellence en Belgique — polyvalent chevreuil, cerf et daim" },
                    { cal:"6,5×55 SE", note:"Doux, précis, efficace — idéal pour le chasseur qui tire peu souvent" },
                    { cal:".308 Winchester", note:"Fiable et universel — parfait pour débuter ou chasser en toutes conditions" },
                  ];
                } else if (isFusilOnly) {
                  isFusilRec = true;
                  const hasGrosGibierEau = gibiers.some(g => ["Bernache du Canada","Canada goose","Kanadagans","Canadese gans"].includes(g));
                  const hasMoyenGibierEau = gibiers.some(g => ["Canard colvert","Foulque macroule","Mallard","Coot","Stockente","Blässhuhn","Wilde eend","Meerkoet"].includes(g));
                  const hasBecasse = gibiers.some(g => ["Bécasse des bois","Woodcock","Waldschnepfe","Houtsnip"].includes(g));
                  const hasFaisan = gibiers.some(g => ["Faisan de chasse","Pheasant","Fasan","Fazant"].includes(g));
                  const hasLievre = gibiers.some(g => ["Lièvre brun","Brown hare","Feldhase","Haas"].includes(g));
                  const hasPetitGibier = gibiers.some(g => ["Perdrix grise","Lapin de garenne","Pigeon ramier","Grey partridge","Wild rabbit","Wood pigeon","Rebhuhn","Wildkaninchen","Ringeltaube","Patrijs","Konijn","Houtduif"].includes(g));

                  // Détecter si le mix couvre plusieurs "tailles" de gibier à fusil
                  const categories = [
                    hasGrosGibierEau,                          // gros (bernache, oie)
                    hasMoyenGibierEau || hasLievre || hasFaisan, // moyen (canard, foulque, lièvre, faisan)
                    hasBecasse || hasPetitGibier,              // petit (bécasse, perdrix, lapin, pigeon)
                  ].filter(Boolean).length;

                  if (categories >= 2) {
                    // Mix de tailles → un calibre représentatif par catégorie
                    recs = [
                      hasGrosGibierEau
                        ? { cal:"Fusil 10/89 ou 12/76 Mag", note:"Pour le gros gibier d'eau (bernache) — ⚠️ plombs acier obligatoires en zone humide" }
                        : { cal:"Fusil 12/76 Magnum", note:"Pour le gibier d'eau de taille moyenne (canard, foulque) — ⚠️ plombs acier obligatoires" },
                      { cal:"Fusil 12/70", note:"Le calibre polyvalent — couvre la majorité des situations intermédiaires" },
                      (hasBecasse && !hasFaisan && !hasLievre)
                        ? { cal:"Fusil 20/70 ou .410", note:"Pour la bécasse en sous-bois — léger et maniable" }
                        : { cal:"Fusil 20/70", note:"Pour le petit gibier et les tirs en sous-bois — plus léger et maniable" },
                    ];
                  } else if (isGibierEau) {
                    recs = [
                      { cal:"Fusil 10/89", note:"Le calibre roi pour la grande oie et le gros gibier d'eau — ⚠️ plombs acier obligatoires" },
                      { cal:"Fusil 12/76 Magnum", note:"⚠️ Plombs acier obligatoires — puissance suffisante pour bernache et grand gibier d'eau" },
                      { cal:"Fusil 12/70", note:"Polyvalent — utilisable avec plombs bismuth ou acier sur le gibier d'eau" },
                    ];
                  } else if (hasBecasse && !hasFaisan && !hasLievre) {
                    recs = [
                      { cal:"Fusil 20/70", note:"Idéal pour la bécasse en sous-bois — léger et maniable pour les tirs rapides" },
                      { cal:"Fusil .410", note:"Le petit calibre par excellence pour la bécasse — pour les chasseurs expérimentés" },
                      { cal:"Fusil 28/70", note:"Très maniable en sous-bois dense — pour les amateurs de petits calibres" },
                    ];
                  } else if (hasLievre) {
                    recs = [
                      { cal:"Fusil 12/70", note:"Le plus adapté pour le lièvre — puissance suffisante pour une pénétration efficace" },
                      { cal:"Fusil 12/76 Magnum", note:"Pour les tirs à plus grande distance sur lièvre" },
                      { cal:"Fusil 16/70", note:"Bon compromis légèreté/puissance pour le lièvre" },
                    ];
                  } else {
                    recs = [
                      { cal:"Fusil 12/70", note:"Le calibre universel belge — polyvalent pour faisan, perdrix et pigeon" },
                      { cal:"Fusil 20/70", note:"Plus léger et maniable — idéal en sous-bois ou pour les jeunes chasseurs" },
                      { cal:"Fusil 16/70", note:"Le calibre intermédiaire traditionnel — bon compromis puissance/légèreté" },
                    ];
                  }
                } else if (isPetit) {
                  if (isVeryLong) {
                    recs = [
                      { cal:".243 Winchester", note:"Excellent pour le renard à très longue distance — trajectoire plate et précision au rendez-vous" },
                      { cal:".22-250 Remington", note:"Vitesse initiale élevée et trajectoire ultra-plate — idéal pour le renard à 300m+" },
                      { cal:"6,5 Creedmoor", note:"Polyvalent si tu chasses aussi le chevreuil — très précis à longue portée" },
                    ];
                  } else if (isLong) {
                    recs = [
                      { cal:".243 Winchester", note:"Excellent pour le renard à longue distance — précis et peu destructeur" },
                      { cal:".222 Remington", note:"Précis jusqu'à 200m — le classique pour le renard en affût" },
                      { cal:".22-250 Remington", note:"Très plat et rapide — efficace sur renard à plus de 150m" },
                    ];
                  } else if (isShort) {
                    recs = [
                      { cal:".17 HMR", note:"Idéal pour le renard à courte distance — très précis et peu de dommages sur la fourrure" },
                      { cal:".22 Hornet", note:"Léger et économique pour le renard à moins de 100m" },
                      { cal:".222 Remington", note:"Le classique — précis, peu destructeur, économique" },
                    ];
                  } else {
                    recs = [
                      { cal:".222 Remington", note:"Le classique pour le renard — précis, peu destructeur, économique" },
                      { cal:".243 Winchester", note:"Excellent pour le renard à longue distance — trajectoire plate et précision au rendez-vous" },
                      { cal:".17 HMR", note:"Idéal pour le renard à courte et moyenne distance — très précis et peu de dommages sur la fourrure" },
                    ];
                  }
                } else {
                  if (isVeryLong) {
                    recs = [
                      { cal:".300 Win Mag", note:"Le choix longue distance par excellence — efficace et précis à 300m+" },
                      { cal:"6,5 PRC", note:"Balistique moderne optimale — BC élevé, dérive au vent minimale" },
                      { cal:"7mm Rem Mag", note:"Trajectoire ultra-plate — polyvalent grand et moyen gibier à très longue portée" },
                    ];
                  } else if (isLong) {
                    recs = [
                      { cal:"6,5 Creedmoor", note:"Le calibre moderne en plein essor — performances balistiques optimales à longue distance" },
                      { cal:".270 Winchester", note:"Trajectoire très plate — excellent pour les tirs ouverts à plus de 150m" },
                      { cal:".30-06 Springfield", note:"Polyvalent et puissant — efficace sur tout gibier jusqu'à 300m" },
                    ];
                  } else if (isShort) {
                    recs = [
                      { cal:"7×64", note:"Calibre belge polyvalent — couvre la majorité des situations à courte et moyenne distance" },
                      { cal:".308 Winchester", note:"Standard universel — munitions disponibles dans toutes les armureries" },
                      { cal:"8×57 JS", note:"Puissant à courte distance — idéal si tu commences la chasse en forêt" },
                    ];
                  } else {
                    recs = [
                      { cal:"7×64", note:"Calibre belge polyvalent — couvre la majorité des situations de chasse" },
                      { cal:".308 Winchester", note:"Standard universel — munitions disponibles dans toutes les armureries" },
                      { cal:"6,5 Creedmoor", note:"Le calibre moderne en plein essor — performances balistiques optimales" },
                    ];
                  }
                }

                return (
                  <div className="fade-in">
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, marginTop:4 }}>
                      {isFusilRec ? "🔫 Fusils recommandés" : "Calibres recommandés"} pour {gibiers.join(" · ")}{typeChasse ? ` · ${typeChasse}` : ""}{distC ? ` · ${distC}m` : ""}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
                      {recs.map((r, i) => (
                        <div key={r.cal} style={{ background: COLORS.bgInput, border:`1px solid ${isFusilRec ? "#ff9800" : COLORS.accent}30`, borderLeft:`3px solid ${isFusilRec ? "#ff9800" : COLORS.accent}`, borderRadius:7, padding:"12px 14px" }}>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: isFusilRec ? "#ff9800" : COLORS.accent, fontWeight:600, marginBottom:4 }}>{isFusilRec ? "🔫" : ""} Suggestion {i+1}</div>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, color: COLORS.white, marginBottom:6 }}>{r.cal}</div>
                          <div style={{ fontSize:"0.85rem", color: COLORS.textDim, fontStyle:"italic", lineHeight:1.5 }}>{r.note}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bouton IA Premium */}
                    {isPremium ? (
                      <button onClick={conseillerCalibre} disabled={loadingC}
                        style={{ ...btnPrimary, width:"100%", background:"transparent", color: COLORS.accent, border:`1px solid ${COLORS.accent}`, fontSize:12 }}>
                        {loadingC ? T.btnCalLoading : "🤖 Analyse IA approfondie — conseil personnalisé"}
                      </button>
                    ) : (
                      <button onClick={() => setIsPremium(true)}
                        style={{ ...btnPrimary, width:"100%", background: COLORS.accentGlow, border:`2px solid ${COLORS.accent}`, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                        <span style={{ fontSize:16 }}>★</span>
                        <div style={{ textAlign:"left" }}>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:700, color: COLORS.accent }}>Passer Premium — Analyse IA approfondie</div>
                          
                        </div>
                      </button>
                    )}

                    {loadingC && <Loader />}
                    {conseilCalib && (
                      <div style={{ ...card, marginTop:10 }}>
                        <ProseResponse text={conseilCalib} />
                      </div>
                    )}
                  </div>
                );
              })()}

              {!(gibierCMulti.length > 0) && (
                <div style={{ ...card, borderStyle: "dashed" }}>
                  <p style={{ color: COLORS.textDim, fontStyle: "italic", fontSize: "0.95rem", textAlign: "center" }}>
                    {T.calPH}
                  </p>
                </div>
              )}

              {/* Premium upsell toujours visible */}
              {!isPremium && gibierCMulti.length > 0 ? null : !isPremium && (
                <button onClick={() => setIsPremium(true)}
                  style={{ ...btnPrimary, width:"100%", marginTop:8, background: COLORS.accentGlow, border:`2px solid ${COLORS.accent}`, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  <span style={{ fontSize:16 }}>★</span>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:700, color: COLORS.accent }}>Passer Premium — Analyse IA approfondie</div>
                    
                  </div>
                </button>
              )}
            </div>
          )}

          {/* ── TAB 3 : MUNITION ── */}
          {tab === "munition" && (
            <div className="fade-in">
              <p style={{ color: COLORS.textMuted, fontStyle: "italic", marginBottom: 16, fontSize: "1.05rem" }}>
                {T.munitionIntro}
              </p>

              {/* Toggle Carabine / Fusil */}
              <div style={{ display:"flex", gap:8, marginBottom:20 }}>
                {[["carabine","🔫 Carabine"],["fusil","🦆 Fusil"],["comparateur","📊 Comparer"]].map(([mode, label]) => (
                  <button key={mode} onClick={() => { setMunMode(mode); setConseilMun(null); }}
                    style={{
                      flex:1, padding:"10px", borderRadius:6, fontFamily:"'IBM Plex Mono',monospace",
                      fontSize:12, fontWeight: munMode===mode ? 700 : 400, cursor:"pointer",
                      background: munMode===mode ? COLORS.accentGlow : COLORS.bgInput,
                      border: `2px solid ${munMode===mode ? COLORS.accent : COLORS.border}`,
                      color: munMode===mode ? COLORS.accent : COLORS.textMuted,
                      transition:"all 0.2s",
                    }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* ── MODE CARABINE ── */}
                            {munMode === "carabine" && (
                <div>
                  <div style={card}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={fieldLabel}>
                          Gibier ciblé *
                          <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.accent, marginLeft:8 }}>jusqu'à 5</span>
                        </label>
                        <div>
                            <select onChange={e => {
                                const val = e.target.value;
                                if (!val) return;
                                setGibierMMulti(prev => prev.includes(val) ? prev : prev.length < 5 ? [...prev, val] : prev);
                                setConseilMun(null);
                                e.target.value = "";
                              }}>
                              <option value="">— Ajouter un gibier (jusqu'à 5) —</option>
                              <optgroup label="🦌 Grand gibier">
                                {["Cerf élaphe","Chevreuil","Sanglier","Daim","Mouflon"].map(g =>
                                  <option key={g} value={g} disabled={gibierMMulti.includes(g)}>{gibierMMulti.includes(g)?"✓ ":""}{g}</option>)}
                              </optgroup>
                              <optgroup label="🦊 Autre gibier">
                                {["Renard roux"].map(g =>
                                  <option key={g} value={g} disabled={gibierMMulti.includes(g)}>{gibierMMulti.includes(g)?"✓ ":""}{g}</option>)}
                              </optgroup>
                            </select>
                            {gibierMMulti.length > 0 && (
                              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:6 }}>
                                {gibierMMulti.map(g => (
                                  <span key={g} onClick={() => { setGibierMMulti(gibierMMulti.filter(x=>x!==g)); setConseilMun(null); }}
                                    style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, background: COLORS.accentGlow, border:`1px solid ${COLORS.accent}`, color: COLORS.accent, borderRadius:4, padding:"3px 8px", cursor:"pointer" }}>
                                    {g} ×
                                  </span>
                                ))}
                                <span onClick={() => { setGibierMMulti([]); setConseilMun(null); }}
                                  style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim, padding:"3px 6px", cursor:"pointer", alignSelf:"center" }}>
                                  Effacer tout
                                </span>
                              </div>
                            )}
                            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim, marginTop:3 }}>
                              {gibierMMulti.length}/5 sélectionné{gibierMMulti.length>1?"s":""}
                            </div>
                          </div>
                      </div>
                      <div>
                        <label style={fieldLabel}>{T.munCalibreLabel}</label>
                        <select value={calibreM} onChange={e => { setCalibreM(e.target.value); setConseilMun(null); }}>
                          <option value="">{T.munCalPH}</option>
                          {CALIBRES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <label style={fieldLabel}>Type de chasse</label>
                      <select value={typeM} onChange={e => setTypeM(e.target.value)}>
                        <option value="">— Optionnel —</option>
                        {T.munTypeList.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Recommandations directes */}
                  {calibreM && (gibierM || gibierMMulti.length > 0) && (() => {
                    const list = MUNITIONS_DATA[calibreM] || [];
                    if (list.length === 0) return null;

                    // ── RECOMMANDATIONS SELON TECHNOLOGIE D'OGIVE ET MODE ──
                    // 3 suggestions adaptées au mode + 1 sans plomb — aucune marque forcée

                    const isBattue = typeM === "Battue"  || typeM === "Drijfjacht"  || typeM === "Drückjagd"  || typeM === "Driven hunt";
                    const isAffut  = typeM === "Affût / Approche" || typeM === "Bersjacht / Aanzitjacht" || typeM === "Pirsch / Ansitzjagd" || typeM === "Stalking / Hide";

                    // Priorité par technologie d'ogive selon le mode de chasse
                    const battueKeys = ["RWS Driven Hunt","Norma Tipstrike","GECO Express","RWS KS","Sako Arrowhead II","Hornady SST","Norma Vulkan","GECO Softpoint","Winchester Power Point","Sako Hammerhead","Norma Oryx","RWS UNI Classic","Winchester Deer Season XP","Hornady American Whitetail","RWS Evolution","Lapua Mega","GECO Plus","Winchester Power Max Bonded"];
                    const affutKeys  = ["RWS Speed Tip Pro","Norma Bondstrike","Lapua Naturalis","Hornady Precision Hunter ELD-X","Sako Super Hammerhead","Norma Oryx","Winchester Expedition Big Game","GECO Star","Lapua Mega","Winchester Ballistic Silvertip","RWS Evolution","Hornady SST","Sako Gamehead","Norma Tipstrike"];
                    const polyKeys   = ["Norma Oryx","RWS KS","Sako Super Hammerhead","Hornady SST","GECO Softpoint","Winchester Power Point","RWS Evolution","Lapua Mega","Norma Bondstrike","Hornady American Whitetail","GECO Plus","Winchester Power Max Bonded"];
                    const spKeys     = isBattue
                      ? ["RWS Driven Hunt","RWS HIT","Norma Ecostrike","Norma Evostrike","Sako Powerhead Blade","GECO Zero","GECO Star","Hornady GMX","Winchester Copper Impact","Lapua Naturalis","RWS Evolution Green"]
                      : isAffut
                      ? ["RWS Speed Tip Pro","Lapua Naturalis","Norma Ecostrike","RWS Evolution Green","Hornady Outfitter GMX","Sako Powerhead Blade","Norma Evostrike","Winchester Copper Impact","GECO Zero"]
                      : ["Lapua Naturalis","RWS Evolution Green","Norma Ecostrike","RWS HIT","Norma Evostrike","GECO Zero","Sako Powerhead Blade","Hornady GMX"];

                    const activeKeys = isBattue ? battueKeys : isAffut ? affutKeys : polyKeys;

                    // Sélectionne les 3 meilleures munitions selon le mode (toutes marques)
                    const recs = [];
                    for (const k of activeKeys) {
                      if (recs.length >= 3) break;
                      const m = list.find(m => m.label.startsWith(k) && !recs.some(r => r.label === m.label));
                      if (m) recs.push(m);
                    }
                    for (const m of list) {
                      if (recs.length >= 3) break;
                      if (!recs.some(r => r.label === m.label)) recs.push(m);
                    }

                    // Sans plomb : meilleure ogive lead-free, différente des 3 suggestions
                    const recSP = (() => {
                      const already = recs.map(r => r.label);
                      for (const k of spKeys) {
                        const m = list.find(m => m.sansPlomb && m.label.startsWith(k) && !already.includes(m.label));
                        if (m) return m;
                      }
                      // Ne propose une carte sans plomb QUE si elle est différente des 3 suggestions
                      return list.find(m => m.sansPlomb && !already.includes(m.label)) || null;
                    })();

                    const modeDesc = isBattue
                      ? "Ogives à expansion rapide — choc et arrêt immédiats pour la battue"
                      : isAffut
                      ? "Ogives longue portée — expansion progressive et haute rétention de masse"
                      : "Ogives polyvalentes — efficaces sur toutes distances";

                    return (
                      <div className="fade-in">
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6, marginTop:4 }}>
                          Suggestions pour {gibierMMulti.length > 0 ? gibierMMulti.join(" · ") : gibierM} · {calibreM}{typeM ? ` · ${typeM}` : ""}
                        </div>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim, marginBottom:12, fontStyle:"italic" }}>
                          {modeDesc}
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                          {recs.map((rec, i) => (
                            <div key={rec.label} style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.accent}30`, borderLeft:`3px solid ${COLORS.accent}`, borderRadius:7, padding:"12px 14px" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.accent, fontWeight:600 }}>Suggestion {i+1}</span>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: rec.sansPlomb ? "#5bc8af" : COLORS.textMuted }}>
                                  {rec.sansPlomb ? "🌿 Sans plomb" : "Plomb"}
                                </span>
                              </div>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color: COLORS.white, marginBottom:6 }}>{rec.label}</div>
                              <div style={{ display:"flex", gap:14 }}>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>{rec.marque}</span>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>v₀ {rec.v0} m/s</span>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>{rec.poids} g</span>
                              </div>
                            </div>
                          ))}
                          {recSP && (
                            <div style={{ background: COLORS.bgInput, border:`1px solid #5bc8af40`, borderLeft:`3px solid #5bc8af`, borderRadius:7, padding:"12px 14px" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#5bc8af", fontWeight:600 }}>🌿 Sans plomb 🌿</span>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#5bc8af" }}>Obligatoire zones humides</span>
                              </div>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color: COLORS.white, marginBottom:6 }}>{recSP.label}</div>
                              <div style={{ display:"flex", gap:14 }}>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>{recSP.marque}</span>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>v₀ {recSP.v0} m/s</span>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>{recSP.poids} g</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}

                  {loadingM && <Loader />}
                  {conseilMun && (
                    <div style={card}><ProseResponse text={conseilMun} /></div>
                  )}
                  {!calibreM || (!gibierM && gibierMMulti.length === 0) ? (
                    <div style={{ ...card, borderStyle: "dashed", marginTop:8 }}>
                      <p style={{ color: COLORS.textDim, fontStyle: "italic", fontSize: "0.95rem", textAlign: "center" }}>{T.munPH}</p>
                    </div>
                  ) : null}

                  {/* Bouton IA carabine — Premium uniquement */}
                  {isPremium && (gibierMMulti.length > 0 || gibierM) && calibreM && (
                    <button onClick={conseillerMunition} disabled={loadingM}
                      style={{ ...btnPrimary, width:"100%", marginTop:8, background:"transparent", color: COLORS.accent, border:`1px solid ${COLORS.accent}`, fontSize:12 }}>
                      {loadingM ? T.btnCalLoading : "🤖 Choix supplémentaires & conseil IA approfondi"}
                    </button>
                  )}

                  {/* Premium upsell — toujours visible */}
                  {!isPremium && (
                    <button onClick={() => setIsPremium(true)}
                      style={{ ...btnPrimary, width:"100%", marginTop:8, background: COLORS.accentGlow, border:`2px solid ${COLORS.accent}`, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                      <span style={{ fontSize:16 }}>★</span>
                      <div style={{ textAlign:"left" }}>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:700, color: COLORS.accent }}>Passer Premium — Conseil IA approfondi</div>
                        
                      </div>
                    </button>
                  )}
                </div>
              )}

              {munMode === "fusil" && (
                <div>
                  <div style={card}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={fieldLabel}>Gibier ciblé *</label>
                        <select value={gibierM} onChange={e => setGibierM(e.target.value)}>
                          <option value="">— Sélectionner —</option>
                          <optgroup label="🐇 Petit gibier">
                            <option value="Lièvre brun">Lièvre brun</option>
                            <option value="Faisan de chasse">Faisan de chasse</option>
                            <option value="Perdrix grise">Perdrix grise</option>
                            <option value="Bécasse des bois">Bécasse des bois</option>
                          </optgroup>
                          <optgroup label="🦊 Autre gibier">
                            <option value="Lapin de garenne">Lapin de garenne</option>
                            <option value="Pigeon ramier">Pigeon ramier</option>
                            <option value="Renard roux">Renard roux</option>
                          </optgroup>
                          <optgroup label="🦆 Gibier d'eau">
                            <option value="Bernache du Canada">Bernache du Canada</option>
                            <option value="Canard colvert">Canard colvert</option>
                            <option value="Foulque macroule">Foulque macroule</option>
                          </optgroup>
                        </select>
                      </div>
                      <div>
                        <label style={fieldLabel}>Calibre du fusil *</label>
                        <select value={calibreFusil} onChange={e => setCaliFusil(e.target.value)}>
                          <option value="">— Sélectionner —</option>
                          {FUSIL_CALIBRES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                        {calibreFusil && (() => {
                          const fc = FUSIL_CALIBRES.find(c => c.value === calibreFusil);
                          return fc ? (
                            <div style={{ marginTop:6, fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>
                              Chambres compatibles : {fc.chambres.join(", ")}
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>

                    {/* Recommandation directe sans IA */}
                    {gibierM && calibreFusil && (() => {
                      const rec = FUSIL_PLOMBS[gibierM];
                      if (!rec) return (
                        <div style={{ background: COLORS.bgInput, borderRadius:6, padding:"12px 16px", border:`1px solid ${COLORS.border}`, marginBottom:16 }}>
                          <p style={{ color: COLORS.textMuted, fontSize:"0.9rem", fontStyle:"italic" }}>
                            Ce gibier est généralement chassé à la carabine. Consultez l'onglet carabine pour les recommandations de munitions.
                          </p>
                        </div>
                      );
                      return (
                        <div style={{ background: COLORS.bgInput, borderRadius:8, padding:"16px", border:`1px solid ${COLORS.accent}40`, marginBottom:16 }} className="fade-in">
                          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                            <div style={{ background: COLORS.bgCard, borderRadius:6, padding:"10px 12px", textAlign:"center" }}>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted, textTransform:"uppercase", marginBottom:4 }}>Plombs recommandés</div>
                              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", color: COLORS.accent, fontWeight:700 }}>{rec.plombs}</div>
                            </div>
                            <div style={{ background: COLORS.bgCard, borderRadius:6, padding:"10px 12px", textAlign:"center" }}>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted, textTransform:"uppercase", marginBottom:4 }}>Charge conseillée</div>
                              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", color: COLORS.white, fontWeight:600 }}>{rec.charge}</div>
                            </div>
                            <div style={{ background: COLORS.bgCard, borderRadius:6, padding:"10px 12px", textAlign:"center" }}>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted, textTransform:"uppercase", marginBottom:4 }}>Calibre</div>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.white }}>{calibreFusil}</div>
                            </div>
                          </div>
                          <div style={{ fontSize:"0.88rem", color: COLORS.textMuted, fontStyle:"italic", lineHeight:1.6 }}>
                            💡 {rec.note}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Bouton IA — Premium uniquement, visible après sélection */}
                    {isPremium && (
                      <button style={{ ...btnPrimary, opacity: (!gibierM || !calibreFusil) ? 0.5 : 1 }}
                        onClick={() => {
                          const prompt = `Je chasse en Belgique avec un fusil calibre ${calibreFusil} pour le ${gibierM}. Donne-moi des conseils détaillés sur le choix des cartouches (marque, plombs, charge), la technique de tir et les règles à respecter notamment sur le plomb en zones humides.`;
                          setLoadingM(true); setConseilMun(null);
                          askClaude(prompt, T.system).then(r => { setConseilMun(r); }).catch((err) => { setConseilMun("❌ Erreur: " + (err?.message || String(err))); }).finally(() => { setLoadingM(false); });
                        }}
                        disabled={loadingM || !gibierM || !calibreFusil}>
                        {loadingM ? T.btnCalLoading : "🤖 Conseil IA approfondi"}
                      </button>
                    )}
                  </div>

                  {loadingM && <Loader />}
                  {conseilMun && (
                    <div style={card}><ProseResponse text={conseilMun} /></div>
                  )}
                  {!gibierM && !calibreFusil && (
                    <div style={{ ...card, borderStyle:"dashed", marginTop:8 }}>
                      <p style={{ color: COLORS.textDim, fontStyle:"italic", fontSize:"0.95rem", textAlign:"center" }}>
                        {T.munPH}
                      </p>
                    </div>
                  )}

                  {/* Premium upsell — toujours visible */}
                  {!isPremium && (
                    <button onClick={() => setIsPremium(true)}
                      style={{ ...btnPrimary, width:"100%", marginTop:8, background: COLORS.accentGlow, border:`2px solid ${COLORS.accent}`, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                      <span style={{ fontSize:16 }}>★</span>
                      <div style={{ textAlign:"left" }}>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:700, color: COLORS.accent }}>Passer Premium — Conseil IA approfondi</div>
                        
                      </div>
                    </button>
                  )}
                </div>
              )}

              {/* ── MODE COMPARATEUR ── */}
              {munMode === "comparateur" && (() => {
                const list = MUNITIONS_DATA[compCalibre] || [];
                const MARQUES = ["RWS","Norma","GECO","Winchester","Hornady","Sako","Lapua"];
                const munOptions = MARQUES.flatMap(marque => {
                  const muns = list.filter(m => m.marque === marque);
                  if (!muns.length) return [];
                  return [
                    <option key={marque+"_h"} disabled value="">── {marque} ──</option>,
                    ...muns.map((m, i) => <option key={marque+i} value={m.label}>{m.label}</option>)
                  ];
                });
                // getBC identique à l'onglet cible
                const getBC = (label) => {
                  let g = label.replace(/\s*🌿\s*$/, "");
                  for (const marque of ["RWS","Norma","GECO","Winchester","Hornady","Lapua","Sako"]) {
                    if (g.startsWith(marque)) { g = g.slice(marque.length).trim(); break; }
                  }
                  g = g.replace(/\d+[,.]?\d*\s*g.*$/, "").trim();
                  const key = `${compCalibre}|||${g}`;
                  if (SPECIFIC_BC[key] != null) return SPECIFIC_BC[key];
                  for (const [gamme, bc] of GAMME_BC) { if (g.includes(gamme)) return bc; }
                  return CAL_FALLBACK[compCalibre] || 0.40;
                };
                // Calcul trajectoire (modèle calibré identique onglet cible)
                const traj = (v0, bc, dro) => {
                  const sightH = 0.05, k = 0.000375 / bc;
                  const velAtM = d => v0 * Math.exp(-k * d);
                  const tof = d => { let t=0; const st=50, dx=d/st; for(let i=0;i<st;i++) t+=dx/velAtM(i*dx+dx/2); return t; };
                  const dropF = d => Math.max(0.80, 0.99 - 0.268*k*d);
                  const dg = d => 0.5*9.81*tof(d)*tof(d)*dropF(d);
                  const ang = (sightH+dg(dro))/dro;
                  return d => (-sightH + ang*d - dg(d)) * 100;
                };
                const m1 = list.find(m => m.label === compMun1);
                const m2 = list.find(m => m.label === compMun2);
                const m3 = isPremium ? list.find(m => m.label === compMun3) : null;
                const DISTS = [25,50,75,100,125,150,175,200,250,300];
                const f1 = m1 ? traj(m1.v0, getBC(m1.label), compDRO) : null;
                const f2 = m2 ? traj(m2.v0, getBC(m2.label), compDRO) : null;
                const f3 = m3 ? traj(m3.v0, getBC(m3.label), compDRO) : null;
                // Échelle graphique
                const allVals = [];
                if (f1) DISTS.forEach(d => allVals.push(f1(d)));
                if (f2) DISTS.forEach(d => allVals.push(f2(d)));
                if (f3) DISTS.forEach(d => allVals.push(f3(d)));
                const maxA = allVals.length ? Math.max(8, ...allVals.map(Math.abs)) : 20;
                const W = 300, H = 200, padL = 32, padB = 24, padT = 12, padR = 8;
                const xPos = d => padL + (d/300)*(W-padL-padR);
                const yPos = v => padT + (H-padT-padB)/2 - (v/maxA)*((H-padT-padB)/2);
                const pathOf = f => DISTS.map((d,i) => `${i===0?"M":"L"}${xPos(d).toFixed(1)},${yPos(f(d)).toFixed(1)}`).join(" ");

                return (
                  <div className="fade-in">
                    <p style={{ color: COLORS.textDim, fontSize:"0.95rem", marginBottom:16, fontStyle:"italic" }}>
                      Compare la trajectoire de plusieurs munitions du même calibre. {isPremium ? "Jusqu'à 3 munitions." : "Version gratuite : 2 munitions (3 en Premium)."}
                    </p>

                    {/* Calibre */}
                    <label style={fieldLabel}>Calibre</label>
                    <select value={compCalibre} onChange={e => { setCompCalibre(e.target.value); setCompMun1(""); setCompMun2(""); setCompMun3(""); }} style={{width:"100%", marginBottom:14}}>
                      {CALIBRES.filter(c => MUNITIONS_DATA[c.value]).map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>

                    {/* DRO */}
                    <label style={fieldLabel}>Distance de réglage (DRO) : {compDRO}m</label>
                    <input type="range" min="50" max="250" step="10" value={compDRO}
                      onChange={e => setCompDRO(parseInt(e.target.value))}
                      style={{ width:"100%", accentColor: COLORS.accent, marginBottom:14 }} />

                    {/* Sélecteurs munitions */}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                      <div>
                        <label style={{...fieldLabel, color:"#1565c0"}}>● Munition 1</label>
                        <select value={compMun1} onChange={e => setCompMun1(e.target.value)} style={{width:"100%"}}>
                          <option value="">— {T.selectionner} —</option>
                          {munOptions}
                        </select>
                      </div>
                      <div>
                        <label style={{...fieldLabel, color:"#e65100"}}>● Munition 2</label>
                        <select value={compMun2} onChange={e => setCompMun2(e.target.value)} style={{width:"100%"}}>
                          <option value="">— {T.selectionner} —</option>
                          {munOptions}
                        </select>
                      </div>
                      {isPremium ? (
                        <div style={{ gridColumn:"1 / -1" }}>
                          <label style={{...fieldLabel, color:"#6a1b9a"}}>● Munition 3 <span style={{fontSize:9, color:COLORS.accent}}>Premium</span></label>
                          <select value={compMun3} onChange={e => setCompMun3(e.target.value)} style={{width:"100%"}}>
                            <option value="">— {T.selectionner} —</option>
                            {munOptions}
                          </select>
                        </div>
                      ) : (
                        <div style={{ gridColumn:"1 / -1" }}>
                          <div onClick={() => setIsPremium(true)} style={{ cursor:"pointer", border:`1px dashed ${COLORS.accent}`, borderRadius:6, padding:"8px 12px", display:"flex", alignItems:"center", justifyContent:"center", gap:6, background:COLORS.accentGlow }}>
                            <span style={{fontSize:13}}>★</span>
                            <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.accent }}>Passe Premium pour comparer une 3ᵉ munition</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Graphique */}
                    {(f1 || f2 || f3) ? (
                      <div style={{ background:"white", borderRadius:10, padding:14, marginBottom:14 }}>
                        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:"block"}}>
                          {/* Grille horizontale */}
                          {[-maxA, -maxA/2, 0, maxA/2, maxA].map((v,i) => (
                            <g key={i}>
                              <line x1={padL} y1={yPos(v)} x2={W-padR} y2={yPos(v)} stroke={v===0?"#999":"#eee"} strokeWidth={v===0?1:0.5} strokeDasharray={v===0?"":"2,2"}/>
                              <text x={padL-4} y={yPos(v)+3} textAnchor="end" fontSize="7" fontFamily="monospace" fill="#999">{v>0?"+":""}{v.toFixed(0)}</text>
                            </g>
                          ))}
                          {/* Axe distances */}
                          {[0,50,100,150,200,250,300].map(d => (
                            <g key={d}>
                              <line x1={xPos(d)} y1={padT} x2={xPos(d)} y2={H-padB} stroke="#f0f0f0" strokeWidth="0.5"/>
                              <text x={xPos(d)} y={H-padB+10} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#999">{d}</text>
                            </g>
                          ))}
                          <text x={W/2} y={H-2} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#666">Distance (m)</text>
                          {/* DRO marker */}
                          <line x1={xPos(compDRO)} y1={padT} x2={xPos(compDRO)} y2={H-padB} stroke="#2e7d32" strokeWidth="1" strokeDasharray="3,2"/>
                          <text x={xPos(compDRO)} y={padT+8} textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#2e7d32">DRO</text>
                          {/* Courbes */}
                          {f1 && <path d={pathOf(f1)} fill="none" stroke="#1565c0" strokeWidth="2"/>}
                          {f2 && <path d={pathOf(f2)} fill="none" stroke="#e65100" strokeWidth="2"/>}
                          {f3 && <path d={pathOf(f3)} fill="none" stroke="#6a1b9a" strokeWidth="2"/>}
                        </svg>
                        {/* Légende */}
                        <div style={{ display:"flex", flexDirection:"column", gap:4, marginTop:8, fontFamily:"monospace", fontSize:"0.7rem" }}>
                          {m1 && <div style={{color:"#1565c0"}}>● {m1.label} — {m1.v0} m/s · BC {getBC(m1.label)}</div>}
                          {m2 && <div style={{color:"#e65100"}}>● {m2.label} — {m2.v0} m/s · BC {getBC(m2.label)}</div>}
                          {m3 && <div style={{color:"#6a1b9a"}}>● {m3.label} — {m3.v0} m/s · BC {getBC(m3.label)}</div>}
                        </div>
                      </div>
                    ) : (
                      <div style={{ ...card, borderStyle:"dashed" }}>
                        <p style={{ color: COLORS.textDim, fontStyle:"italic", fontSize:"0.95rem", textAlign:"center" }}>
                          Sélectionne au moins une munition pour voir sa trajectoire.
                        </p>
                      </div>
                    )}

                    {/* Tableau comparatif rapide aux distances clés */}
                    {(f1 && f2) && (
                      <div style={{ ...card, padding:0, overflow:"hidden" }}>
                        <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"monospace", fontSize:"0.72rem" }}>
                          <thead>
                            <tr style={{ background: COLORS.bgInput }}>
                              <th style={{ padding:"6px 8px", textAlign:"left", color:COLORS.textMuted }}>Dist.</th>
                              <th style={{ padding:"6px 8px", textAlign:"right", color:"#1565c0" }}>Mun.1</th>
                              <th style={{ padding:"6px 8px", textAlign:"right", color:"#e65100" }}>Mun.2</th>
                              {f3 && <th style={{ padding:"6px 8px", textAlign:"right", color:"#6a1b9a" }}>Mun.3</th>}
                              {!f3 && <th style={{ padding:"6px 8px", textAlign:"right", color:COLORS.textMuted }}>Δ</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {[50,100,150,200,250,300].map(d => {
                              const v1=f1(d), v2=f2(d), v3=f3?f3(d):null;
                              return (
                                <tr key={d} style={{ borderTop:`1px solid ${COLORS.border}` }}>
                                  <td style={{ padding:"5px 8px", color:COLORS.text }}>{d}m</td>
                                  <td style={{ padding:"5px 8px", textAlign:"right", color:"#1565c0" }}>{v1>0?"+":""}{v1.toFixed(1)}</td>
                                  <td style={{ padding:"5px 8px", textAlign:"right", color:"#e65100" }}>{v2>0?"+":""}{v2.toFixed(1)}</td>
                                  {f3 && <td style={{ padding:"5px 8px", textAlign:"right", color:"#6a1b9a" }}>{(v3 ?? 0)>0?"+":""}{(v3 ?? 0).toFixed(1)}</td>}
                                  {!f3 && <td style={{ padding:"5px 8px", textAlign:"right", color:COLORS.textMuted }}>{Math.abs(v1-v2).toFixed(1)}</td>}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <div style={{ padding:"6px 8px", fontFamily:"monospace", fontSize:"0.6rem", color:COLORS.textDim, textAlign:"center" }}>
                          Valeurs en cm vs ligne de visée{!f3 ? " · Δ = écart entre les deux" : ""}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── TAB 4 : ASSISTANT IA ── */}
          {tab === "assistant" && (
            <div className="fade-in">

              {/* Header + compteur */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: 16 }}>
                <div>
                  <p style={{ color: COLORS.textMuted, fontStyle:"italic", fontSize:"1.05rem", marginBottom: 4 }}>
                    {T.assistIntro}
                  </p>
                  {!isPremium && (
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 11, display:"flex", alignItems:"center", gap: 8 }}>
                      <div style={{ display:"flex", gap: 4 }}>
                        {[0,1,2].map(i => (
                          <div key={i} style={{
                            width: 10, height: 10, borderRadius: "50%",
                            background: i < (MAX_FREE - questionsUsed) ? COLORS.accent : COLORS.border,
                            border: `1px solid ${i < (MAX_FREE - questionsUsed) ? COLORS.accent : COLORS.borderHover}`,
                            transition: "background 0.3s",
                          }} />
                        ))}
                      </div>
                      <span style={{ color: questionsUsed >= MAX_FREE ? "#c0392b" : COLORS.textMuted }}>
                        {questionsUsed >= MAX_FREE
                          ? T.limitLabel
                          : `${MAX_FREE - questionsUsed} ${T.freeLabel}`}
                      </span>
                    </div>
                  )}
                  {isPremium && (
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 11, color: COLORS.accent }}>
                        🌿 PREMIUM — Questions illimitées
                      </div>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textDim, display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ color: COLORS.accent }}>◈</span> Mémoire active — l'IA se souvient de tout l'échange
                      </div>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textDim, display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ color: COLORS.accent }}>⚡</span> Assistant IA sur Claude Opus — analyse approfondie
                      </div>
                    </div>
                  )}
                </div>
                {/* Toggle démo premium */}
                <button onClick={() => setIsPremium(!isPremium)}
                  style={{
                    background: isPremium ? COLORS.accent : "transparent",
                    border: `1px solid ${isPremium ? COLORS.accent : COLORS.border}`,
                    borderRadius: 4, color: isPremium ? "#0d0f0a" : COLORS.textMuted,
                    padding: "6px 14px", fontSize: 11,
                    fontFamily:"'IBM Plex Mono',monospace", cursor:"pointer",
                    transition: "all 0.2s",
                  }}>
                  {isPremium ? T.premiumActive : T.premiumBtn}
                </button>
              </div>

              {/* Bloc premium si limite atteinte */}
              {!isPremium && questionsUsed >= MAX_FREE && (
                <div style={{ ...card, border:`1px solid ${COLORS.accent}`, background: COLORS.accentGlow, marginBottom: 20, textAlign:"center" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.3rem", color: COLORS.accent, marginBottom: 8 }}>
                    {T.limitTitle}
                  </div>
                  <p style={{ color: COLORS.text, marginBottom: 14, fontSize:"1.05rem" }}>
                    {T.limitText}
                  </p>
                  <button onClick={() => setIsPremium(true)}
                    style={{ ...btnPrimary, marginTop: 16, padding:"10px 32px" }}>
                    Activer Premium (démo)
                  </button>
                </div>
              )}

              {/* Historique de la conversation */}
              {chatHistory.length > 0 && (
                <div style={{ ...card, maxHeight: 420, overflowY:"auto", display:"flex", flexDirection:"column", gap: 14 }}>
                  {chatHistory.map((msg, i) => (
                    <div key={i} style={{
                      display:"flex",
                      flexDirection: msg.role === "user" ? "row-reverse" : "row",
                      gap: 10, alignItems:"flex-start",
                    }}>
                      {/* Avatar */}
                      <div style={{
                        width: 28, height: 28, borderRadius:"50%", flexShrink: 0,
                        background: msg.role === "user" ? COLORS.border : COLORS.accentGlow,
                        border: `1px solid ${msg.role === "user" ? COLORS.borderHover : COLORS.accent}`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontFamily:"'IBM Plex Mono',monospace", fontSize: 10,
                        color: msg.role === "user" ? COLORS.textMuted : COLORS.accent,
                      }}>
                        {msg.role === "user" ? "T" : "IA"}
                      </div>
                      {/* Bulle */}
                      <div style={{
                        background: msg.role === "user" ? COLORS.bgInput : COLORS.bgCard,
                        border: `1px solid ${msg.role === "user" ? COLORS.border : COLORS.accentGlow}`,
                        borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                        padding:"10px 14px", maxWidth:"80%",
                      }}>
                        {msg.role === "user"
                          ? <p style={{ fontSize:"0.95rem", color: COLORS.text, margin:0 }}>{msg.content}</p>
                          : <ProseResponse text={msg.content} />
                        }
                      </div>
                    </div>
                  ))}
                  {loadingQ && (
                    <div style={{ display:"flex", gap: 10, alignItems:"center", paddingLeft: 38 }}>
                      <Loader />
                    </div>
                  )}
                </div>
              )}

              {chatHistory.length === 0 && !loadingQ && (
                <div style={{ ...card, borderStyle:"dashed" }}>
                  <p style={{ color: COLORS.textDim, fontStyle:"italic", textAlign:"center", fontSize:"0.95rem", marginBottom: 12 }}>
                    Quelques exemples de questions :
                  </p>
                  <div style={{ display:"flex", flexDirection:"column", gap: 8 }}>
                    {T.examples.map(ex => (
                      <button key={ex} onClick={() => setQuestion(ex)}
                        style={{
                          background: COLORS.bgInput, border:`1px solid ${COLORS.border}`,
                          borderRadius: 6, color: COLORS.textMuted, padding:"8px 14px",
                          fontFamily:"'Crimson Pro',serif", fontSize:"0.95rem",
                          textAlign:"left", cursor:"pointer", transition:"all 0.2s",
                        }}
                        onMouseEnter={e => { e.target.style.borderColor = COLORS.accent; e.target.style.color = COLORS.text; }}
                        onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textMuted; }}>
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Barre de saisie */}
              <div style={{ marginTop: 12, display:"flex", gap: 10, alignItems:"flex-end" }}>
                <div style={{ flex: 1 }}>
                  <textarea
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); poserQuestion(); } }}
                    placeholder={canAsk ? T.assistPH : T.assistLimitPH}
                    disabled={!canAsk || loadingQ}
                    rows={2}
                    style={{
                      width:"100%", background: COLORS.bgInput,
                      border:`1px solid ${canAsk ? COLORS.border : "#c0392b40"}`,
                      borderRadius: 8, padding:"10px 14px", color: COLORS.text,
                      fontFamily:"'Crimson Pro',serif", fontSize:"1rem",
                      outline:"none", resize:"none", lineHeight: 1.5,
                      opacity: canAsk ? 1 : 0.5, transition:"border 0.2s",
                    }}
                  />
                </div>
                <button
                  onClick={poserQuestion}
                  disabled={!canAsk || loadingQ || !question.trim()}
                  style={{
                    ...btnPrimary,
                    padding:"10px 18px", fontSize: 18,
                    opacity: (!canAsk || loadingQ || !question.trim()) ? 0.4 : 1,
                    flexShrink: 0,
                  }}>
                  ↑
                </button>
              </div>
              {!isPremium && canAsk && (
                <div style={{ marginTop: 6, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textDim, margin:0 }}>
                    ⚠ Sans mémoire — chaque question est indépendante
                  </p>
                  <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textDim, margin:0 }}>
                    {T.freeNote}
                  </p>
                </div>
              )}

              {/* Bouton effacer l'historique */}
              {chatHistory.length > 0 && (
                <button onClick={() => setChatHistory([])}
                  style={{ background:"transparent", border:"none", color: COLORS.textDim, fontSize: 11, fontFamily:"'IBM Plex Mono',monospace", cursor:"pointer", marginTop: 8, padding: 0 }}>
                  ✕ Effacer la conversation
                </button>
              )}
            </div>
          )}

          {/* ── TAB 5 : GIBIER ── */}
          {tab === "gibier" && (
            <div className="fade-in">
              {!isPremium ? (
                <div style={{ ...card, border:`1px solid ${COLORS.accent}`, background: COLORS.accentGlow, textAlign:"center", padding:"36px 24px" }}>
                  <div style={{ fontSize:40, marginBottom:12 }}>🦌</div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", color: COLORS.accent, marginBottom:10 }}>
                    Contenu Premium
                  </div>
                  <p style={{ color: COLORS.textMuted, marginBottom:20, fontSize:"1rem", lineHeight:1.6 }}>
                    La fiche complète des espèces chassables en Belgique (saisons, régions, conseils calibres) est réservée aux membres Premium.
                  </p>
                  <button onClick={() => setIsPremium(true)}
                    style={{ ...btnPrimary, padding:"11px 36px" }}>
                    Activer Premium (démo)
                  </button>
                </div>
              ) : (
              <div>
              <p style={{ color: COLORS.textMuted, fontStyle:"italic", marginBottom: 20, fontSize:"1.05rem" }}>
                Espèces chassables en Belgique — saisons officielles 2025-2030 (source : chasse.be / natuurenbos.vlaanderen.be).
              </p>

              {/* Grand gibier */}
              <div style={card}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.accent, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  🦌 Grand gibier
                </div>
                {[
                  {
                    nom:"Cerf élaphe", latin:"Cervus elaphus", emoji:"🦌",
                    wallonie:"Biche & faon : 1 août → 31 déc · Cerf boisé : 1 oct → 31 déc (conseils cynégétiques agréés)",
                    flandre:"Cerf : 1 oct → 31 déc (plan de tir) · Biches/faons : 1 oct → 31 jan",
                    poids:"120–250 kg", habitat:"Forêts ardennaises, Famenne, Fagne",
                    calibreMin:"7×64 / .308 Win / 30-06 / 9,3×62",
                    conseil:"Tir fichant impératif. Éviter les petits calibres — le cerf est un gibier résistant.",
                  },
                  {
                    nom:"Chevreuil", latin:"Capreolus capreolus", emoji:"🫎",
                    wallonie:"Brocard : 15 avr→15 mai & 15 juil→15 août (approche/affût) · Battue : 1 oct→31 déc · Chevrette/faon : 1 oct→31 déc",
                    flandre:"Brocard : 1 mai → 14 sept · Chevrette & faon : 1 jan → 31 mars",
                    poids:"15–35 kg", habitat:"Lisières, bocages, forêts mixtes",
                    calibreMin:".243 Win / 6,5×55 SE / 6,5 Creedmoor / 7×57 / .308 Win",
                    conseil:"Gibier léger mais résistant. DRO recommandée 150–200 m. Ogive à expansion rapide conseillée pour limiter les blessures.",
                  },
                  {
                    nom:"Sanglier", latin:"Sus scrofa", emoji:"🐗",
                    wallonie:"Toute l'année à l'affût/approche · Battue : 1 oct→31 jan",
                    flandre:"Sanglier : 1 jan → 14 juil & 1 août → 31 déc",
                    poids:"50–200 kg", habitat:"Forêts denses, fonds de vallées, cultures",
                    calibreMin:".308 Win / 30-06 / 8×57 JS / 9,3×62",
                    conseil:"Animal très résistant. En battue : ogives à fort pouvoir d'arrêt (RWS Driven Hunt, GECO Star). Tirs courts — moins de 80 m en forêt ardennaise.",
                  },
                  {
                    nom:"Daim", latin:"Dama dama", emoji:"🦌",
                    wallonie:"Saison définie par plan de tir local · 1 oct→31 déc",
                    flandre:"Daim : 1 oct → 31 déc (plan de tir)",
                    poids:"40–100 kg", habitat:"Parcs forestiers, Haute-Ardenne",
                    calibreMin:".243 Win / 6,5×55 SE / 7×57 / 7×64 / .308 Win",
                    conseil:"Gibier intermédiaire entre chevreuil et cerf. Tirs souvent à faible distance en forêt dense. Ogive classique à expansion suffisante.",
                  },
                  {
                    nom:"Mouflon", latin:"Ovis gmelini musimon", emoji:"🐏",
                    wallonie:"1 oct→31 déc · Uniquement sur territoires agréés",
                    flandre:"Mouflon : 1 oct → 31 déc (plan de tir)",
                    poids:"25–50 kg", habitat:"Hautes Fagnes, plateaux ardennais (introduction années 1950)",
                    calibreMin:".243 Win / 6,5×55 SE / 7×57 / 7×64",
                    conseil:"Animal vif, cuir épais. Tir précis nécessaire. Population très localisée en Ardenne — vérifier le plan de tir du conseil cynégétique.",
                  },
                ].map(g => (
                  <div key={g.nom} style={{ marginBottom:14, paddingBottom:14, borderBottom:`1px solid ${COLORS.border}` }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                      <span style={{ fontSize:22 }}>{g.emoji}</span>
                      <div>
                        <span style={{ fontWeight:700, color: COLORS.white, fontSize:"1.05rem" }}>{g.nom}</span>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textDim, marginLeft:10, fontStyle:"italic" }}>{g.latin}</span>
                      </div>
                      <span style={{ marginLeft:"auto", fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>{g.poids}</span>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:8 }}>
                      <div style={{ background: COLORS.bgInput, borderRadius:6, padding:"8px 12px", border:`1px solid ${COLORS.border}` }}>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#8aab5a", textTransform:"uppercase", marginBottom:4 }}>🇧🇪 Wallonie</div>
                        <div style={{ fontSize:"0.85rem", color: COLORS.textMuted, lineHeight:1.5 }}>{g.wallonie}</div>
                      </div>
                      <div style={{ background: COLORS.bgInput, borderRadius:6, padding:"8px 12px", border:`1px solid ${COLORS.border}` }}>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#f0c040", textTransform:"uppercase", marginBottom:4 }}>🇧🇪 Flandre</div>
                        <div style={{ fontSize:"0.85rem", color: COLORS.textMuted, lineHeight:1.5 }}>{g.flandre}</div>
                      </div>
                    </div>
                    <div style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.accentGlow}`, borderRadius:5, padding:"6px 10px", display:"flex", gap:8, alignItems:"center" }}>
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.accent, textTransform:"uppercase", flexShrink:0 }}>Exemple de calibre recommandé</span>
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.white }}>{g.calibreMin}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Petit gibier */}
              <div style={card}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.accent, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  🐇 Petit gibier
                </div>
                {[
                  { nom:"Lièvre brun", emoji:"🐇",
                    wallonie:"01/10 → 31/12 (CC agréés uniquement)", flandre:"Lièvre : 15 oct → 31 déc (territoire agréé uniquement)",
                    calibreMin:"Fusil de chasse — plombs n°5-6",
                    note:"Chasse interdite hors conseil cynégétique agréé en Wallonie." },
                  { nom:"Faisan de chasse", emoji:"🦚",
                    wallonie:"01/10 → 31/01 (coq et poule — tous territoires)", flandre:"Faisan coq : 15 oct → 31 jan · Faisan poule : 15 oct → 31 déc",
                    calibreMin:"Fusil de chasse — plombs n°5-6",
                    note:"Tous les procédés de chasse à tir autorisés." },
                  { nom:"Perdrix grise", emoji:"🐦",
                    wallonie:"20/09 → 15/11 (CC agréés + plan de gestion obligatoire)", flandre:"Perdrix : 15 sept → 14 nov (territoire agréé + protocole obligatoire)",
                    calibreMin:"Fusil de chasse — plombs n°6-7",
                    note:"Chasse interdite sans plan de gestion approuvé. Espèce en déclin." },
                  { nom:"Bécasse des bois", emoji:"🪶",
                    wallonie:"01/11 → 15/01 — affût autorisé 1h avant lever/1h après coucher", flandre:"⚠️ Pas de saison officielle en Flandre",
                    calibreMin:"Fusil de chasse — plombs n°7-8",
                    note:"Bag limit Wallonie : 2/jour, 10/semaine. Vente interdite toute l'année." },
                ].map(g => (
                  <div key={g.nom} style={{ display:"flex", gap:12, marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${COLORS.border}`, alignItems:"flex-start" }}>
                    <span style={{ fontSize:20, flexShrink:0 }}>{g.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, color: COLORS.white, marginBottom:4 }}>{g.nom}</div>
                      <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:6 }}>
                        <span style={{ fontSize:"0.82rem", color: COLORS.textMuted }}><span style={{color:"#8aab5a"}}>W :</span> {g.wallonie}</span>
                        <span style={{ fontSize:"0.82rem", color: COLORS.textMuted }}><span style={{color:"#f0c040"}}>F :</span> {g.flandre}</span>
                      </div>
                      <div style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.accentGlow}`, borderRadius:5, padding:"5px 10px", display:"inline-flex", gap:8, alignItems:"center" }}>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.accent, textTransform:"uppercase", flexShrink:0 }}>Exemple de calibre recommandé</span>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.white }}>{g.calibreMin}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Autre gibier */}
              <div style={card}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.accent, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  🐰 Autre gibier
                </div>
                {[
                  { nom:"Lapin de garenne", emoji:"🐰",
                    wallonie:"01/10 → 31/01 — bourses et furet autorisés", flandre:"Lapin : 15 août → 28 fév",
                    calibreMin:"Fusil de chasse — plombs n°6-7",
                    note:"N'est plus ouvert toute l'année en Wallonie (AGW 2025-2030). Bourses et furet autorisés." },
                  { nom:"Renard roux", emoji:"🦊",
                    wallonie:"01/07 → 30/06 (affût/approche) · 01/08 → 29/02 (chien courant) · Appeaux autorisés", flandre:"Renard : 15 oct → 28 fév",
                    calibreMin:".222 Rem / .223 Rem / .22-250 Rem / .243 Win",
                    note:"En 2025 uniquement : pas de chasse du 1er au 15 juillet (délai publication AGW)." },
                  { nom:"Pigeon ramier", emoji:"🕊️",
                    wallonie:"20/10 → 29/02 — appeaux/leurres/appelants autorisés", flandre:"Pigeon ramier : 15 sept → 28 fév",
                    calibreMin:"Fusil de chasse — plombs n°5-6",
                    note:"Ouverture AGW 2025-2030. Tous les procédés de chasse à tir autorisés." },
                ].map(g => (
                  <div key={g.nom} style={{ display:"flex", gap:12, marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${COLORS.border}`, alignItems:"flex-start" }}>
                    <span style={{ fontSize:20, flexShrink:0 }}>{g.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, color: COLORS.white, marginBottom:4 }}>{g.nom}</div>
                      <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:6 }}>
                        <span style={{ fontSize:"0.82rem", color: COLORS.textMuted }}><span style={{color:"#8aab5a"}}>W :</span> {g.wallonie}</span>
                        <span style={{ fontSize:"0.82rem", color: COLORS.textMuted }}><span style={{color:"#f0c040"}}>F :</span> {g.flandre}</span>
                      </div>
                      <div style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.accentGlow}`, borderRadius:5, padding:"5px 10px", display:"inline-flex", gap:8, alignItems:"center" }}>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.accent, textTransform:"uppercase", flexShrink:0 }}>Exemple de calibre recommandé</span>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.white }}>{g.calibreMin}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gibier d'eau */}
              <div style={card}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.accent, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  🦆 Gibier d'eau
                </div>
                {[
                  { nom:"Bernache du Canada", emoji:"🪿",
                    wallonie:"01/08 → 10/03 — appeaux/leurres autorisés",
                    flandre:"Bernache : 15 août → 31 mars",
                    calibreMin:"Fusil calibre 12 — plombs acier n°2-3 (sans plomb obligatoire)" },
                  { nom:"Canard colvert", emoji:"🦆",
                    wallonie:"01/09 → 15/01 — appeaux/leurres autorisés",
                    flandre:"Canard colvert : 15 août → 31 jan",
                    calibreMin:"Fusil calibre 12 ou 20 — plombs acier n°3-4 (sans plomb obligatoire)" },
                  { nom:"Foulque macroule", emoji:"🐦",
                    wallonie:"15/10 → 31/01 — commercialisation interdite",
                    flandre:"Foulque : dates non fixées",
                    calibreMin:"Fusil calibre 12 ou 20 — plombs acier n°4-5" },
                ].map(g => (
                  <div key={g.nom} style={{ display:"flex", gap:12, marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${COLORS.border}`, alignItems:"flex-start" }}>
                    <span style={{ fontSize:20, flexShrink:0 }}>{g.emoji}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600, color: COLORS.white, marginBottom:4 }}>{g.nom}</div>
                      <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:6 }}>
                        <span style={{ fontSize:"0.82rem", color: COLORS.textMuted }}><span style={{color:"#8aab5a"}}>W :</span> {g.wallonie}</span>
                        <span style={{ fontSize:"0.82rem", color: COLORS.textMuted }}><span style={{color:"#f0c040"}}>F :</span> {g.flandre}</span>
                      </div>
                      <div style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.accentGlow}`, borderRadius:5, padding:"5px 10px", display:"inline-flex", gap:8, alignItems:"center" }}>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.accent, textTransform:"uppercase", flexShrink:0 }}>Exemple de calibre recommandé</span>
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.white }}>{g.calibreMin}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ background:"rgba(231,76,60,0.08)", border:"1px solid rgba(231,76,60,0.25)", borderRadius:6, padding:"10px 14px", marginTop:8 }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#e74c3c" }}>⚠️ PLOMB INTERDIT</span>
                  <span style={{ fontSize:"0.85rem", color: COLORS.textMuted, marginLeft:10 }}>Les munitions au plomb sont interdites dans et à moins de 100m des zones humides en Wallonie. Utilisez des munitions sans plomb (✓) pour tout tir en zone humide.</span>
                </div>
              </div>

              {/* Note légale */}
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textDim, textAlign:"center", padding:"8px 0" }}>
                Données indicatives — Saisons 2025-2030 · Vérifiez toujours les ouvertures en vigueur sur chasse.be (Wallonie) ou natuurenbos.vlaanderen.be (Flandre)
              </div>
              </div>
              )}
            </div>
          )}

          {/* ── TAB 6 : À PROPOS ── */}
          {/* ── ONGLET CARNET DE CHASSE (Premium) ── */}
          {tab === "carnet" && (
            <div className="fade-in">
              {!isPremium ? (
                <div style={card}>
                  <div style={{ textAlign:"center", padding:"20px 0" }}>
                    <div style={{ fontSize:40, marginBottom:12 }}>📖</div>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:16, color:COLORS.white, fontWeight:700, marginBottom:8 }}>Carnet de chasse numérique</div>
                    <p style={{ color:COLORS.textMuted, fontSize:"0.95rem", marginBottom:20 }}>Notez chaque prise, suivez vos statistiques saison par saison. Fonctionnalité Premium.</p>
                    <button onClick={() => setIsPremium(true)} style={{ background: COLORS.accent, color:"#000", border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer" }}>★ Activer Premium</button>
                  </div>
                </div>
              ) : (() => {
                // Filtrer par saison
                const saisons = [...new Set(carnetEntries.map(e => e.saison))].sort().reverse();
                if (!saisons.includes(carnetSaison) && saisons.length > 0) setCarnetSaison(saisons[0]);
                const filtered = carnetEntries.filter(e => e.saison === carnetSaison);

                // Stats
                const statEspeces = filtered.reduce((acc, e) => { acc[e.espece] = (acc[e.espece]||0)+1; return acc; }, {});
                const statCalibres = filtered.reduce((acc, e) => { if(e.calibre) acc[e.calibre] = (acc[e.calibre]||0)+1; return acc; }, {});

                const fieldStyle = { background: COLORS.bgInput, border:`1px solid ${COLORS.border}`, borderRadius:6, padding:"8px 10px", color: COLORS.white, fontFamily:"'IBM Plex Mono',monospace", fontSize:12, width:"100%", boxSizing:"border-box" };
                const lblStyle = { fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.accent, textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:4 };

                return (
                  <div>
                    {/* Header */}
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                      <div>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:16, color:COLORS.white, fontWeight:700 }}>📖 Carnet de chasse</div>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textMuted }}>Saison {carnetSaison} · {filtered.length} prise{filtered.length!==1?"s":""}</div>
                      </div>
                      <button onClick={() => { setCarnetDraft({...emptyForm, saison:getSaison()}); setCarnetView("form"); }}
                        style={{ background:COLORS.accent, color:"#000", border:"none", borderRadius:7, padding:"8px 14px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:700, cursor:"pointer" }}>
                        + Nouvelle prise
                      </button>
                    </div>

                    {/* Sélecteur de saison + vue */}
                    <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                      <select value={carnetSaison} onChange={e => setCarnetSaison(e.target.value)} style={{ flex:1 }}>
                        {[getSaison(), ...saisons.filter(s=>s!==getSaison())].map(s => <option key={s} value={s}>Saison {s}</option>)}
                      </select>
                      {[["liste","📋 Liste"],["stats","📊 Stats"]].map(([v,l]) => (
                        <button key={v} onClick={() => setCarnetView(v)} style={{ padding:"8px 12px", borderRadius:6, border:`1px solid ${carnetView===v?COLORS.accent:COLORS.border}`, background: carnetView===v?COLORS.accentGlow:"transparent", color: carnetView===v?COLORS.accent:COLORS.textMuted, fontFamily:"'IBM Plex Mono',monospace", fontSize:11, cursor:"pointer" }}>{l}</button>
                      ))}
                    </div>

                    {/* FORMULAIRE */}
                    {carnetView === "form" && (
                      <div style={card}>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:COLORS.accent, marginBottom:16, fontWeight:700 }}>
                          {carnetDraft.id ? "✏️ Modifier la prise" : "➕ Nouvelle prise"}
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                          {[
                            ["date","Date","date","text"],
                            ["espece","Espèce *","Cerf élaphe,Chevreuil,Sanglier,Daim,Mouflon,Renard roux,Lièvre brun,Faisan de chasse,Perdrix grise,Bécasse des bois,Lapin de garenne,Pigeon ramier,Bernache du Canada,Canard colvert,Foulque macroule,Autre","select"],
                            ["sexe","Sexe","Mâle,Femelle,Indéterminé","select"],
                            ["calibre","Calibre","","calibre"],
                          ].map(([key, label, opts, type]) => (
                            <div key={key}>
                              <label style={lblStyle}>{label}</label>
                              {type === "select" ? (
                                <select value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value}))} style={fieldStyle}>
                                  <option value="">—</option>
                                  {opts.split(",").map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                              ) : type === "calibre" ? (
                                <select value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value, munition:""}))} style={fieldStyle}>
                                  <option value="">—</option>
                                  {CALIBRES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                              ) : key === "date" ? (
                                <input type="date" value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d, date:e.target.value, saison:getSaison(e.target.value)}))} style={{...fieldStyle, WebkitAppearance:"none", appearance:"none", textAlign:"left"}}/>
                              ) : (
                                <input type={type} value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value}))} style={fieldStyle}/>
                              )}
                            </div>
                          ))}
                          {/* Munition — dépend du calibre sélectionné */}
                          <div>
                            <label style={lblStyle}>Munition</label>
                            <select value={carnetDraft.munition||""} onChange={e => setCarnetDraft(d=>({...d,munition:e.target.value}))} style={fieldStyle}>
                              <option value="">—</option>
                              {carnetDraft.calibre && (() => {
                                const muns = MUNITIONS_DATA[carnetDraft.calibre] || [];
                                const MARQUES = ["RWS","Norma","GECO","Winchester","Hornady","Sako","Lapua"];
                                return MARQUES.flatMap(marque => {
                                  const m = muns.filter(m => m.marque === marque);
                                  if (!m.length) return [];
                                  return [
                                    <option key={marque+"_h"} disabled value="">── {marque} ──</option>,
                                    ...m.map((mm,i) => <option key={marque+i} value={mm.label}>{mm.label}</option>)
                                  ];
                                });
                              })()}
                            </select>
                          </div>
                          {[
                            ["distance","Distance de tir (m)","","number"],
                            ["distanceFuite","Distance de fuite (m)","","number"],
                            ["poids","Poids animal (kg)","","number"],
                            ["tir","Type de tir","Affût,Battue,Approche,Poste fixe,Autre","select"],
                            ["meteo","Météo","Ensoleillé,Nuageux,Brouillard,Pluie légère,Vent fort,Neige,Autre","select"],
                            ["lieu","Lieu / Territoire","","text"],
                          ].map(([key, label, opts, type]) => (
                            <div key={key}>
                              <label style={lblStyle}>{label}</label>
                              {type === "select" ? (
                                <select value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value}))} style={fieldStyle}>
                                  <option value="">—</option>
                                  {opts.split(",").map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                              ) : (
                                <input type={type} value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value}))} style={fieldStyle}/>
                              )}
                            </div>
                          ))}
                          {/* Nombre de tirs */}
                          <div>
                            <label style={lblStyle}>Nombre de tirs</label>
                            <div style={{ display:"flex", alignItems:"center", gap:12, background:COLORS.bgInput, border:`1px solid ${COLORS.border}`, borderRadius:6, padding:"6px 10px" }}>
                              <button onClick={() => setCarnetDraft(d=>({...d, nbTirs: Math.max(1,(d.nbTirs||1)-1)}))} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:20, cursor:"pointer", width:30 }}>−</button>
                              <span style={{ flex:1, textAlign:"center", fontFamily:"'IBM Plex Mono',monospace", fontSize:14, color:COLORS.white, fontWeight:700 }}>{carnetDraft.nbTirs||1}</span>
                              <button onClick={() => setCarnetDraft(d=>({...d, nbTirs:(d.nbTirs||1)+1}))} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:20, cursor:"pointer", width:30 }}>+</button>
                            </div>
                          </div>
                          {/* Slider Émotion */}
                          <div>
                            <label style={lblStyle}>Émotion ressentie</label>
                            <input type="range" min="1" max="5" value={carnetDraft.emotion||3} onChange={e => setCarnetDraft(d=>({...d, emotion:parseInt(e.target.value)}))} style={{ width:"100%", accentColor:COLORS.accent }}/>
                            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, marginTop:2 }}>
                              <span>Sang-froid</span><span>Adrénaline</span>
                            </div>
                          </div>
                          {/* Slider Difficulté */}
                          <div>
                            <label style={lblStyle}>Difficulté du tir</label>
                            <input type="range" min="1" max="5" value={carnetDraft.difficulte||3} onChange={e => setCarnetDraft(d=>({...d, difficulte:parseInt(e.target.value)}))} style={{ width:"100%", accentColor:COLORS.accent }}/>
                            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, marginTop:2 }}>
                              <span>Très facile</span><span>Quel tir !</span>
                            </div>
                          </div>
                          <div>
                            <label style={lblStyle}>Notes</label>
                            <textarea value={carnetDraft.notes||""} onChange={e => setCarnetDraft(d=>({...d,notes:e.target.value}))} rows={3} style={{...fieldStyle, resize:"vertical"}} placeholder="Observations, détails du tir..."/>
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:10, marginTop:16 }}>
                          <button onClick={() => {
                            if (!carnetDraft.espece) return;
                            const entry = { ...carnetDraft, id: carnetDraft.id || Date.now() };
                            const updated = carnetDraft.id
                              ? carnetEntries.map(e => e.id === carnetDraft.id ? entry : e)
                              : [entry, ...carnetEntries];
                            setCarnetEntries(updated); saveCarnet(updated);
                            setCarnetSaison(carnetDraft.saison || getSaison());
                            setCarnetView("liste");
                          }} style={{ flex:1, background:COLORS.accent, color:"#000", border:"none", borderRadius:7, padding:"10px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                            💾 Enregistrer
                          </button>
                          <button onClick={() => setCarnetView("liste")} style={{ flex:1, background:"transparent", color:COLORS.textMuted, border:`1px solid ${COLORS.border}`, borderRadius:7, padding:"10px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, cursor:"pointer" }}>
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}

                    {/* LISTE */}
                    {carnetView === "liste" && (
                      filtered.length === 0 ? (
                        <div style={{ ...card, textAlign:"center", padding:"30px 16px" }}>
                          <div style={{ fontSize:32, marginBottom:8 }}>🦌</div>
                          <p style={{ color:COLORS.textMuted, fontStyle:"italic" }}>Aucune prise enregistrée pour la saison {carnetSaison}.</p>
                        </div>
                      ) : (
                        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                          {[...filtered].sort((a,b)=>b.date.localeCompare(a.date)).map(entry => (
                            <div key={entry.id} style={{ ...card, padding:"12px 14px" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                                <div>
                                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, color:COLORS.white, fontWeight:700 }}>{entry.espece || "—"}{entry.sexe ? ` · ${entry.sexe}` : ""}</div>
                                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textMuted, marginTop:2 }}>{entry.date}{entry.lieu ? ` · ${entry.lieu}` : ""}</div>
                                </div>
                                {confirmDelete === entry.id ? (
                                  <div style={{ display:"flex", gap:4 }}>
                                    <button onClick={() => { const u=carnetEntries.filter(e=>e.id!==entry.id); setCarnetEntries(u); saveCarnet(u); setConfirmDelete(null); }} style={{ background:"#c62828", border:"none", borderRadius:5, padding:"4px 10px", color:"white", fontSize:10, cursor:"pointer", fontWeight:700 }}>Confirmer</button>
                                    <button onClick={() => setConfirmDelete(null)} style={{ background:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:5, padding:"4px 8px", color:COLORS.textMuted, fontSize:10, cursor:"pointer" }}>✕</button>
                                  </div>
                                ) : (
                                  <div style={{ display:"flex", gap:6 }}>
                                    <button onClick={() => { setCarnetDraft(entry); setCarnetView("form"); }} style={{ background:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:5, padding:"4px 8px", color:COLORS.textMuted, fontSize:10, cursor:"pointer" }}>✏️</button>
                                    <button onClick={() => setConfirmDelete(entry.id)} style={{ background:"transparent", border:`1px solid #c62828`, borderRadius:5, padding:"4px 8px", color:"#c62828", fontSize:10, cursor:"pointer" }}>🗑</button>
                                  </div>
                                )}
                              </div>
                              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginTop:10 }}>
                                {[
                                  ["🔫",entry.calibre||"—"],
                                  ["📏",entry.distance?`${entry.distance}m`:"—"],
                                  ["⚖️",entry.poids?`${entry.poids}kg`:"—"],
                                  ["🎯",entry.tir||"—"],
                                  ["🌤",entry.meteo||"—"],
                                  ["💥",entry.munition?entry.munition.split(" ").slice(0,3).join(" "):"—"],
                                  ["🏃",entry.distanceFuite?`${entry.distanceFuite}m fuite`:"—"],
                                  ["🔢",entry.nbTirs?`${entry.nbTirs} tir${entry.nbTirs>1?"s":""}`:"—"],
                                  ["⭐",entry.difficulte?`Diff. ${entry.difficulte}/5`:"—"],
                                ].map(([icon,val],i) => (
                                  <div key={i} style={{ background:COLORS.bgInput, borderRadius:5, padding:"5px 8px" }}>
                                    <span style={{ fontSize:10 }}>{icon}</span>
                                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, marginLeft:4 }}>{val}</span>
                                  </div>
                                ))}
                              </div>
                              {entry.notes && <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textDim, marginTop:8, fontStyle:"italic" }}>"{entry.notes}"</div>}
                            </div>
                          ))}
                        </div>
                      )
                    )}

                    {/* STATS */}
                    {carnetView === "stats" && (
                      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                        {/* Total */}
                        <div style={{ ...card, textAlign:"center" }}>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:36, color:COLORS.accent, fontWeight:700 }}>{filtered.length}</div>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textMuted, textTransform:"uppercase" }}>Prises saison {carnetSaison}</div>
                        </div>
                        {/* Par espèce */}
                        {Object.keys(statEspeces).length > 0 && (
                          <div style={card}>
                            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.accent, marginBottom:12, textTransform:"uppercase" }}>Par espèce</div>
                            {Object.entries(statEspeces).sort((a,b)=>b[1]-a[1]).map(([esp,n]) => (
                              <div key={esp} style={{ marginBottom:8 }}>
                                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.white }}>{esp}</span>
                                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.accent, fontWeight:700 }}>{n}</span>
                                </div>
                                <div style={{ height:4, background:COLORS.border, borderRadius:2 }}>
                                  <div style={{ height:4, background:COLORS.accent, borderRadius:2, width:`${(n/filtered.length)*100}%`, transition:"width 0.4s" }}/>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Par calibre */}
                        {Object.keys(statCalibres).length > 0 && (
                          <div style={card}>
                            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.accent, marginBottom:12, textTransform:"uppercase" }}>Par calibre</div>
                            {Object.entries(statCalibres).sort((a,b)=>b[1]-a[1]).map(([cal,n]) => (
                              <div key={cal} style={{ marginBottom:8 }}>
                                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.white }}>{cal}</span>
                                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.accent, fontWeight:700 }}>{n}</span>
                                </div>
                                <div style={{ height:4, background:COLORS.border, borderRadius:2 }}>
                                  <div style={{ height:4, background:"#1565c0", borderRadius:2, width:`${(n/filtered.length)*100}%`, transition:"width 0.4s" }}/>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Distance moyenne */}
                        {filtered.some(e=>e.distance) && (
                          <div style={{ ...card, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, textAlign:"center" }}>
                            {[
                              ["Distance moy.", Math.round(filtered.filter(e=>e.distance).reduce((a,e)=>a+parseFloat(e.distance),0)/filtered.filter(e=>e.distance).length)+"m"],
                              ["Poids moy.", filtered.some(e=>e.poids) ? Math.round(filtered.filter(e=>e.poids).reduce((a,e)=>a+parseFloat(e.poids),0)/filtered.filter(e=>e.poids).length*10)/10+"kg" : "—"],
                            ].map(([l,v]) => (
                              <div key={l}>
                                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:20, color:COLORS.accent, fontWeight:700 }}>{v}</div>
                                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, textTransform:"uppercase" }}>{l}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {filtered.length === 0 && <div style={{ ...card, textAlign:"center" }}><p style={{ color:COLORS.textMuted, fontStyle:"italic" }}>Aucune donnée pour cette saison.</p></div>}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* ── ONGLET COFFRE-FORT ── */}
          {tab === "coffre" && (
            <div className="fade-in">
              <p style={{ color:COLORS.textMuted, fontStyle:"italic", marginBottom:20, fontSize:"0.95rem" }}>
                Stockez ici les photos ou PDFs de vos documents importants. Accessibles hors-ligne, stockés uniquement sur votre appareil.
              </p>

              {/* Bannière stockage local */}
              <div style={{ background:"#1a2a1a", border:`1px solid ${COLORS.accent}30`, borderRadius:8, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:16 }}>🔒</span>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textMuted }}>
                  Vos documents restent sur votre appareil — aucun envoi vers nos serveurs.
                </span>
              </div>

              {/* Documents */}
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  { id:"carte_id",     emoji:"🪪", label:"Carte d'identité",               desc:"Recto / Verso" },
                  { id:"permis_chasse",emoji:"🦌", label:"Permis de chasse",                desc:"Permis annuel wallon / flamand" },
                  { id:"assurance",    emoji:"🛡️", label:"Assurance de chasse",             desc:"Attestation en cours de validité" },
                  { id:"carte_eu",     emoji:"🇪🇺", label:"Carte européenne d'arme à feu",  desc:"European Firearms Pass" },
                  { id:"certificat",   emoji:"🏥", label:"Certificat médical",              desc:"Aptitude au port d'arme" },
                  { id:"modele9",      emoji:"📋", label:"Modèle 9",                        desc:"Un document par arme enregistrée" },
                  { id:"permis_cond",  emoji:"🚗", label:"Permis de conduire",              desc:"Recto / Verso" },
                ].map(doc => (
                  <div key={doc.id} style={{ ...card, padding:"14px 16px", display:"flex", alignItems:"center", gap:14, opacity:0.7 }}>
                    <div style={{ fontSize:28, flexShrink:0 }}>{doc.emoji}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:COLORS.white, fontWeight:700 }}>{doc.label}</div>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, marginTop:2 }}>{doc.desc}</div>
                    </div>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textDim, background:COLORS.bgInput, borderRadius:5, padding:"4px 8px", flexShrink:0 }}>
                      Bientôt
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop:24, background:COLORS.bgInput, borderRadius:8, padding:"14px 16px", textAlign:"center" }}>
                <div style={{ fontSize:28, marginBottom:8 }}>📂</div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.textMuted }}>
                  La gestion des fichiers sera disponible dans une prochaine mise à jour.
                </div>
              </div>
            </div>
          )}

          {tab === "apropos" && (
            <div className="fade-in">

              {/* Présentation */}
              <div style={card}>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:16 }}>
                  <svg width="40" height="40" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="17" fill="none" stroke={COLORS.accent} strokeWidth="1"/>
                    <circle cx="18" cy="18" r="11" fill="none" stroke={COLORS.accent} strokeWidth="0.5" opacity="0.5"/>
                    <line x1="2" y1="18" x2="34" y2="18" stroke={COLORS.accent} strokeWidth="0.8"/>
                    <line x1="18" y1="2" x2="18" y2="34" stroke={COLORS.accent} strokeWidth="0.8"/>
                    <circle cx="18" cy="18" r="2.5" fill={COLORS.accent}/>
                  </svg>
                  <div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", fontWeight:900, color: COLORS.white }}>
                      Chass<span style={{color:COLORS.accent}}>IA</span>
                    </div>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, letterSpacing:"0.1em" }}>
                      {T.subtitle}
                    </div>
                  </div>
                </div>
                <p style={{ color: COLORS.textMuted, fontSize:"0.95rem", lineHeight:1.7 }}>{T.aboutDesc1}</p>
                <p style={{ color: COLORS.textMuted, fontSize:"0.95rem", lineHeight:1.7, marginTop:10 }}>{T.aboutDesc2}</p>
              </div>

              {/* Mentions légales */}
              <div style={card}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.accent, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  ⚖️ {T.aboutLegal}
                </div>
                {[
                  [T.aboutEditor, T.aboutEditorVal],
                  [T.aboutContact, T.aboutContactVal],
                  [T.aboutHost, T.aboutHostVal],
                  [T.aboutAI, T.aboutAIVal],
                  [T.aboutData, T.aboutDataVal],
                  [T.aboutCookies, T.aboutCookiesVal],
                ].map(([titre, texte]) => (
                  <div key={titre} style={{ marginBottom:12, paddingBottom:12, borderBottom:`1px solid ${COLORS.border}` }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.accent, textTransform:"uppercase", marginBottom:4 }}>{titre}</div>
                    <div style={{ color: COLORS.textMuted, fontSize:"0.9rem", lineHeight:1.6 }}>{texte}</div>
                  </div>
                ))}
              </div>

              {/* Avertissement */}
              <div style={{ ...card, background:"rgba(231,76,60,0.05)", border:"1px solid rgba(231,76,60,0.2)" }}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:"#e74c3c", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  ⚠️ {T.aboutWarning}
                </div>
                <p style={{ color: COLORS.textMuted, fontSize:"0.9rem", lineHeight:1.7 }}>
                  {T.aboutWarningText}
                </p>
                <p style={{ color: COLORS.textMuted, fontSize:"0.9rem", lineHeight:1.7, marginTop:10 }}>
                  {T.aboutSources}
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:10 }}>
                  {[
                    ["Wallonie", "chasse.be · wallonie.be · DNF · SPW Environnement"],
                    ["Flandre", "natuurenbos.vlaanderen.be · ANB"],
                    ["Fédéral", "fishandgame.be · SPF Justice"],
                  ].map(([region, sites]) => (
                    <div key={region} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>
                      <span style={{color:COLORS.accent}}>{region} : </span>{sites}
                    </div>
                  ))}
                </div>
              </div>

              {/* Version */}
              <div style={{ ...card, textAlign:"center" }}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.accent, marginBottom:6 }}>
                  Premium
                </div>
                {!isPremium && (
                  <button onClick={() => setIsPremium(true)}
                    style={{ ...btnPrimary, marginTop:16, padding:"10px 32px" }}>
                    Activer Premium (démo)
                  </button>
                )}
              </div>

              {/* Version app */}
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textDim, textAlign:"center", padding:"8px 0" }}>
                {T.aboutVersion}
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${COLORS.border}`, textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textDim, letterSpacing: "0.08em" }}>
                {T.footerName}
              </span>
              <span style={{ color: COLORS.textDim, fontSize: 10 }}>·</span>
              <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textDim, letterSpacing: "0.06em" }}>
                {T.subtitle}
              </span>
            </div>
            <p style={{ fontFamily: "'Crimson Pro',serif", fontSize: 12, color: COLORS.textDim, fontStyle: "italic", marginBottom: 4 }}>
              {T.footerLegal}
            </p>
            <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textDim }}>
              {T.footerRegl}
            </p>
          </div>
        </div>
      </div>
      {/* ── LANGUE SELECTOR POPUP ── */}
      {!lang && (
        <div style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.93)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div className="fade-in" style={{ background:COLORS.bgCard,border:`1px solid ${COLORS.accent}`,borderRadius:12,padding:"36px 32px 28px",width:"min(440px, 92vw)",boxShadow:`0 12px 60px rgba(0,0,0,0.8)`,textAlign:"center" }}>
            <svg width="48" height="48" viewBox="0 0 36 36" style={{margin:"0 auto 10px",display:"block"}}>
              <circle cx="18" cy="18" r="17" fill="none" stroke={COLORS.accent} strokeWidth="1"/>
              <circle cx="18" cy="18" r="11" fill="none" stroke={COLORS.accent} strokeWidth="0.5" opacity="0.5"/>
              <line x1="2" y1="18" x2="34" y2="18" stroke={COLORS.accent} strokeWidth="0.8"/>
              <line x1="18" y1="2" x2="18" y2="34" stroke={COLORS.accent} strokeWidth="0.8"/>
              <circle cx="18" cy="18" r="2.5" fill={COLORS.accent}/>
            </svg>
            <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.8rem",fontWeight:900,color:COLORS.white,letterSpacing:"-0.02em" }}>
              Chass<span style={{color:COLORS.accent}}>IA</span>
            </div>
            <div style={{ fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:COLORS.textMuted,letterSpacing:"0.14em",marginTop:4,marginBottom:22 }}>
              BELGIQUE · BELGIË · BELGIEN · BELGIUM
            </div>
            <p style={{ fontFamily:"'Crimson Pro',serif",fontSize:"0.95rem",color:COLORS.textMuted,marginBottom:22,fontStyle:"italic" }}>
              Choisissez votre langue · Kies uw taal · Wählen Sie Ihre Sprache · Choose your language
            </p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
              {Object.values(LANGS).map(l => (
                <button key={l.code} onClick={() => handleSetLang(l.code)}
                  style={{ background:COLORS.bgInput,border:`1px solid ${COLORS.border}`,borderRadius:8,padding:"14px 12px",cursor:"pointer",transition:"all 0.2s",textAlign:"left" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=COLORS.accent; e.currentTarget.style.background=COLORS.accentGlow; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=COLORS.border; e.currentTarget.style.background=COLORS.bgInput; }}>
                  <div style={{fontSize:22,marginBottom:4}}>{l.flag}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",color:COLORS.white,fontWeight:700}}>{l.name}</div>
                  <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:COLORS.textMuted,marginTop:2}}>{l.region}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL IMPRESSION ── */}
      {printModal && (
        <>
          {/* Overlay */}
          <div onClick={() => setPrintModal(false)}
            style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:100, backdropFilter:"blur(4px)" }} />

          {/* Modal */}
          <div className="fade-in" style={{
            position:"fixed", top:"50%", left:"50%",
            transform:"translate(-50%,-50%)",
            background: COLORS.bgCard, border:`1px solid ${COLORS.accent}`,
            borderRadius: 10, padding:"28px 28px 24px",
            zIndex: 101, width:"min(420px, 92vw)",
            boxShadow:`0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${COLORS.accentGlow}`,
          }}>
            {/* Titre */}
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", color: COLORS.white, marginBottom: 6 }}>
              {T.printTitle}
            </div>

            {/* Format */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ ...fieldLabel, marginBottom: 8 }}>{T.printFormat}</label>
              <div style={{ display:"flex", gap: 10 }}>
                {["A4","A3"].map(f => (
                  <button key={f} onClick={() => setPrintFormat(f)}
                    style={{
                      flex: 1, padding:"10px", borderRadius: 6, cursor:"pointer",
                      fontFamily:"'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 600,
                      background: printFormat === f ? COLORS.accentGlow : COLORS.bgInput,
                      border:`2px solid ${printFormat === f ? COLORS.accent : COLORS.border}`,
                      color: printFormat === f ? COLORS.accent : COLORS.textMuted,
                      transition:"all 0.2s",
                    }}>
                    {f}
                    <div style={{ fontSize: 9, fontWeight:400, marginTop: 2, color: COLORS.textMuted }}>
                      {f === "A4" ? "210 × 297 mm" : "297 × 420 mm"}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Avertissement */}
            <div style={{
              background:"rgba(231,76,60,0.08)", border:"1px solid rgba(231,76,60,0.3)",
              borderRadius: 8, padding:"14px 16px", marginBottom: 20,
            }}>
              <div style={{ display:"flex", gap: 10, alignItems:"flex-start" }}>
                <span style={{ fontSize: 18, flexShrink:0 }}>⚠️</span>
                <div>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 11, color:"#e74c3c", marginBottom: 6, letterSpacing:"0.05em" }}>
                    {T.printWarnTitle}
                  </div>
                  <p style={{ fontSize:"0.92rem", color: COLORS.text, lineHeight: 1.6, margin: 0 }}>
                    {T.printWarnText}
                  </p>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div style={{ display:"flex", gap: 10 }}>
              <button onClick={() => setPrintModal(false)}
                style={{ flex:1, background:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:6, color: COLORS.textMuted, padding:"10px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, cursor:"pointer" }}>
                Annuler
              </button>
              <button onClick={() => {
                  setPrintModal(false);
                  // Petit délai pour fermer le modal avant le dialogue système
                  setTimeout(() => window.print(), 150);
                }}
                style={{ ...btnPrimary, flex:2, padding:"10px" }}>
                {T.printLaunch} ({printFormat})
              </button>
            </div>
          </div>
        </>
      )}

      {/* CSS d'impression */}
      <style>{`
        @media print {
          @page {
            size: ${printFormat === "A3" ? "297mm 420mm" : "210mm 297mm"} portrait;
            margin: 0;
          }
          * { visibility: hidden !important; }
          .chassia-print-target,
          .chassia-print-target * { visibility: visible !important; }
          .chassia-print-target {
            position: fixed !important;
            inset: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 4mm !important;
            background: white !important;
            padding: 8mm !important;
            box-sizing: border-box !important;
            border-radius: 0 !important;
            margin: 0 !important;
          }
          .chassia-print-target svg {
            width: ${printFormat === "A3" ? "230mm" : "160mm"} !important;
            height: ${printFormat === "A3" ? "230mm" : "160mm"} !important;
            flex-shrink: 0 !important;
            display: block !important;
          }
          .chassia-print-header {
            width: ${printFormat === "A3" ? "230mm" : "160mm"} !important;
            flex-shrink: 0 !important;
          }
          .chassia-print-specs {
            width: ${printFormat === "A3" ? "230mm" : "160mm"} !important;
            flex-shrink: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
