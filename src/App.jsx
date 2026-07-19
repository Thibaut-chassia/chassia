import { useState, useEffect } from "react";

// ─── TRANSLATIONS (i18n) ─────────────────────────────────────────────────────
const LANGS = {
  fr: {
    code:"fr", flag:"🇧🇪", name:"Français", region:"Wallonie",
    subtitle:"L'ASSISTANT IA DE LA CHASSE EN BELGIQUE",
    tabs:["🎯 Cible","🔫 Calibre","💥 Munition","🔒 Coffre","📖 Carnet","🦌 Gibier","🤖 Assistant IA","ℹ️ À propos"],
    tabIds:["cible","calibre","munition","coffre","carnet","gibier","assistant","apropos"],
    cibleIntro:"Génère ta cible de réglage personnalisée. Choisis ton calibre, ta munition, la distance à laquelle tu tires et la DRO souhaitée.",
    droLabel:"DRO souhaitée (m)", droHint:"💡 La DRO idéale dépend de la munition choisie — vérifie les préconisations du fabricant (boîte ou fiche technique).", btnImprimer:"⎙ Imprimer la cible",
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
    premiumBtn:"Passer Premium", premiumActive:"★ Premium", premiumPlusActive:"★★ Premium+",
    limitTitle:"Limite quotidienne atteinte",
    limitText:"Tu as utilisé ta question gratuite du jour. Passe en Premium pour plus de questions IA.",
    assistPH:"Pose ta question sur la chasse en Belgique… (Entrée pour envoyer)",
    assistLimitPH:"Limite quotidienne atteinte — passe en Premium",
    freeNote:"Version gratuite : 1 question / jour · Plus de questions avec Premium",
    examples:["Quelle est la saison du sanglier en Belgique ?","Quelle distance de sécurité pour une battue ?","Peut-on chasser le chevreuil en novembre ?","Quelles sont les règles pour le tir de nuit en Belgique ?"],
    footerName:"CHASSIA BELGIQUE",
    aboutDesc1:"ChassIA est un assistant numérique dédié à la chasse en Belgique. Il fournit des recommandations de calibres et munitions, génère des cibles de réglage personnalisées, et répond aux questions relatives à la chasse en Belgique.",
    aboutDesc2:"L'application est disponible en français, néerlandais, allemand et anglais.",
    aboutLegal:"Mentions légales", aboutPrivacy:"Politique de confidentialité",
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
    aboutVersion:"ChassIA v1.0 · Données 2025-2030",
    aboutCopyright:"© 2025-2026 ChassIA · Tous droits réservés. Le contenu, le nom, le logo et l'ensemble des fonctionnalités de ChassIA sont protégés par le droit d'auteur. Toute reproduction ou utilisation sans autorisation est interdite.",
    footerLegal:"Les recommandations sont indicatives. Vérifiez toujours via chasse.be ou wallonie.be.",
    footerRegl:"chasse.be · wallonie.be · DNF · SPW Environnement",
    printTitle:"⎙ Impression de la cible", printFormat:"Format papier",
    printLaunch:"⎙ Lancer l'impression", printCancel:"Annuler",
    printWarnTitle:"IMPORTANT — AVANT D'IMPRIMER",
    printWarnText:"Pour que les dimensions de la cible correspondent à la taille réelle, vérifiez dans les options d'impression que la mise à l'échelle est réglée sur « 100 % » (ou « Taille réelle »). N'activez pas « Ajuster à la page » ni aucune mise à l'échelle automatique, qui modifierait la taille des anneaux et fausserait le réglage.",
    system:`Tu es un expert de la chasse en Belgique (Wallonie: DNF, décret chasse; Flandre: ANB), connaissant les espèces chassables, permis et pratiques locales des 3 régions. Tu aides aussi les chasseurs luxembourgeois et français : donne les grandes lignes si tu connais leur réglementation, sinon renvoie vers leurs autorités locales. Tu réponds uniquement aux questions chasse : réglementation, espèces, techniques, équipement, armes, munitions, balistique (ces derniers sans restriction géographique). Réponses structurées (###, listes, gras). Rappelle l'interdiction progressive du plomb en zones humides. Réponds en français, concis (max 400 mots) mais complet.`,
  },
  nl: {
    code:"nl", flag:"🇧🇪", name:"Nederlands", region:"Vlaanderen",
    subtitle:"DE AI-ASSISTENT VOOR DE JACHT IN BELGIË",
    tabs:["🎯 Doel","🔫 Kaliber","💥 Munitie","🔒 Kluis","📖 Logboek","🦌 Wild","🤖 AI-Assistent","ℹ️ Over"],
    tabIds:["cible","calibre","munition","coffre","carnet","gibier","assistant","apropos"],
    cibleIntro:"Genereer je gepersonaliseerde regelingsdoel. Kies je kaliber, munitie, schietafstand en gewenste NRE.",
    droLabel:"Gewenste NRE (m)", droHint:"💡 De ideale DRO hangt af van de gekozen munitie — controleer de aanbevelingen van de fabrikant (doos of technische fiche).", btnImprimer:"⎙ Doel afdrukken",
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
    premiumBtn:"Premium worden", premiumActive:"★ Premium", premiumPlusActive:"★★ Premium+",
    limitTitle:"Dagelijkse limiet bereikt",
    limitText:"Je hebt je gratis vraag van vandaag gebruikt. Ga naar Premium voor meer AI-vragen.",
    assistPH:"Stel je vraag over de jacht in België… (Enter om te verzenden)",
    assistLimitPH:"Daglimiet bereikt — upgrade naar Premium",
    freeNote:"Gratis versie: 1 vraag/dag · Meer vragen met Premium",
    examples:["Wat is het jachtseizoen voor wild zwijn in België?","Welke veiligheidsafstand geldt bij drijfjacht?","Mag ik ree jagen in november in Vlaanderen?","Wat zijn de regels voor nachtjacht in België?"],
    footerName:"CHASSIA BELGIË",
    aboutDesc1:"ChassIA is een digitale assistent voor de jacht in België. De app geeft aanbevelingen over kalibers en munitie, genereert gepersonaliseerde regelingsdoelen en beantwoordt vragen over de jacht in België.",
    aboutDesc2:"De applicatie is beschikbaar in het Frans, Nederlands, Duits en Engels.",
    aboutLegal:"Wettelijke vermeldingen", aboutPrivacy:"Privacybeleid",
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
    aboutVersion:"ChassIA v1.0 · Gegevens 2025-2030",
    aboutCopyright:"© 2025-2026 ChassIA · Alle rechten voorbehouden. De inhoud, naam, het logo en alle functies van ChassIA zijn beschermd door het auteursrecht. Elk gebruik zonder toestemming is verboden.",
    footerLegal:"Aanbevelingen zijn indicatief. Controleer altijd via natuurenbos.vlaanderen.be.",
    footerRegl:"natuurenbos.vlaanderen.be · ANB · Jachtdecreet 1991",
    printTitle:"⎙ Doel afdrukken", printFormat:"Papierformaat",
    printLaunch:"⎙ Afdrukken starten", printCancel:"Annuleren",
    printWarnTitle:"BELANGRIJK — VÓÓR HET AFDRUKKEN",
    printWarnText:"Controleer in de afdrukopties dat de schaal is ingesteld op « 100% » (of « Werkelijke grootte »). Schakel « Aanpassen aan pagina » of automatische schaling niet in, want dat wijzigt de ringgrootte en zou uw instelling ongeldig maken.",
    system:`Je bent een Belgische jachtexpert, gespecialiseerd in Vlaanderen. Je kent de Vlaamse jachtregelgeving (ANB, jachtdecreet, Agentschap Natuur en Bos) en de Waalse regelgeving (DNF) perfect. Je beantwoordt alleen vragen over de jacht: regelgeving, soorten, technieken, uitrusting, wapens, munitie, ballistiek. Structureer je antwoorden met subtitels (###), lijsten en vet. Antwoord altijd in het NEDERLANDS. Wees beknopt (max 400 woorden).`,
  },
  de: {
    code:"de", flag:"🇧🇪", name:"Deutsch", region:"Ostbelgien",
    subtitle:"DER KI-ASSISTENT FÜR DIE JAGD IN BELGIEN",
    tabs:["🎯 Scheibe","🔫 Kaliber","💥 Munition","🔒 Tresor","📖 Jagdbuch","🦌 Wild","🤖 KI-Assistent","ℹ️ Über uns"],
    tabIds:["cible","calibre","munition","coffre","carnet","gibier","assistant","apropos"],
    cibleIntro:"Erstellen Sie Ihre personalisierte Einstellungsscheibe. Wählen Sie Kaliber, Munition, Schussdistanz und gewünschte NDE.",
    droLabel:"Gewünschte NDE (m)", droHint:"💡 Die ideale DRO hängt von der gewählten Munition ab — prüfe die Empfehlungen des Herstellers (Schachtel oder Datenblatt).", btnImprimer:"⎙ Scheibe drucken",
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
    premiumBtn:"Premium werden", premiumActive:"★ Premium", premiumPlusActive:"★★ Premium+",
    limitTitle:"Tageslimit erreicht",
    limitText:"Sie haben Ihre kostenlose Frage für heute verbraucht. Wechseln Sie zu Premium für mehr KI-Fragen.",
    assistPH:"Stellen Sie Ihre Frage zur Jagd in Belgien… (Enter zum Senden)",
    assistLimitPH:"Tageslimit erreicht — auf Premium upgraden",
    freeNote:"Kostenlose Version: 1 Frage/Tag · Mehr Fragen mit Premium",
    examples:["Was ist die Jagdzeit für Wildschweine in Belgien?","Welcher Sicherheitsabstand gilt bei Drückjagden?","Darf ich im November Rehe in Ostbelgien jagen?","Welche Munition empfehlen Sie für Wildschweine?"],
    footerName:"CHASSIA BELGIEN",
    aboutDesc1:"ChassIA ist ein digitaler Assistent für die Jagd in Belgien. Die App gibt Empfehlungen zu Kalibern und Munition, erstellt personalisierte Einstellungsscheiben und beantwortet Fragen zur Jagd in Belgien.",
    aboutDesc2:"Die Anwendung ist auf Französisch, Niederländisch, Deutsch und Englisch verfügbar.",
    aboutLegal:"Rechtliche Hinweise", aboutPrivacy:"Datenschutzerklärung",
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
    aboutVersion:"ChassIA v1.0 · Daten 2025-2030",
    aboutCopyright:"© 2025-2026 ChassIA · Alle Rechte vorbehalten. Inhalt, Name, Logo und alle Funktionen von ChassIA sind urheberrechtlich geschützt. Jede Nutzung ohne Genehmigung ist untersagt.",
    footerLegal:"Empfehlungen sind indikativ. Überprüfen Sie immer bei Ihrer regionalen Behörde.",
    footerRegl:"ANB · DNF · Ministerium der Deutschsprachigen Gemeinschaft",
    printTitle:"⎙ Scheibe drucken", printFormat:"Papierformat",
    printLaunch:"⎙ Druck starten", printCancel:"Abbrechen",
    printWarnTitle:"WICHTIG — VOR DEM DRUCKEN",
    printWarnText:"Überprüfen Sie in den Druckoptionen, dass der Maßstab auf « 100 % » (oder « Originalgröße ») eingestellt ist. Aktivieren Sie nicht « An Seite anpassen » oder automatische Skalierung, da dies die Ringgröße verändert und Ihre Einstellung ungültig machen würde.",
    system:`Du bist ein belgischer Jagdexperte, spezialisiert auf Ostbelgien und ganz Belgien. Du kennst die wallonische Jagdgesetzgebung (DNF) und die flämische Regelung (ANB) sowie die Regelungen der Deutschsprachigen Gemeinschaft. Du beantwortest ausschließlich Fragen zur Jagd: Vorschriften, Wildarten, Techniken, Ausrüstung, Waffen, Munition, Ballistik. Antworte immer auf DEUTSCH. Sei prägnant (max. 400 Wörter).`,
  },
  en: {
    code:"en", flag:"🇬🇧", name:"English", region:"Belgium",
    subtitle:"THE AI ASSISTANT FOR HUNTING IN BELGIUM",
    tabs:["🎯 Target","🔫 Caliber","💥 Ammunition","🔒 Safe","📖 Logbook","🦌 Game","🤖 AI Assistant","ℹ️ About"],
    tabIds:["cible","calibre","munition","coffre","carnet","gibier","assistant","apropos"],
    cibleIntro:"Generate your personalized zeroing target. Choose your caliber, ammunition, shooting distance and desired zero range.",
    droLabel:"Desired zero range (m)", droHint:"💡 The ideal DRO depends on the chosen round — check the manufacturer's recommendation (box or data sheet).", btnImprimer:"⎙ Print target",
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
    premiumBtn:"Go Premium", premiumActive:"★ Premium", premiumPlusActive:"★★ Premium+",
    limitTitle:"Daily limit reached",
    limitText:"You have used your free question for today. Go Premium for more AI questions.",
    assistPH:"Ask your question about hunting in Belgium… (Enter to send)",
    assistLimitPH:"Daily limit reached — upgrade to Premium",
    freeNote:"Free version: 1 question/day · More questions with Premium",
    examples:["What is the wild boar season in Belgium?","What safety distance applies during driven hunts?","Can I hunt roe deer in November in Belgium?","What ammunition do you recommend for wild boar?"],
    footerName:"CHASSIA BELGIUM",
    aboutDesc1:"ChassIA is a digital assistant for hunting in Belgium. The app provides caliber and ammunition recommendations, generates personalised zeroing targets, and answers questions about hunting in Belgium.",
    aboutDesc2:"The application is available in French, Dutch, German and English.",
    aboutLegal:"Legal notices", aboutPrivacy:"Privacy policy",
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
    aboutVersion:"ChassIA v1.0 · Data 2025-2030",
    aboutCopyright:"© 2025-2026 ChassIA · All rights reserved. The content, name, logo and all features of ChassIA are protected by copyright. Any reproduction or use without permission is prohibited.",
    footerLegal:"Recommendations are indicative. Always verify with your regional authority.",
    footerRegl:"ANB · DNF · Service Public de Wallonie · FPS Justice",
    printTitle:"⎙ Print target", printFormat:"Paper format",
    printLaunch:"⎙ Start printing", printCancel:"Cancel",
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
  danger: "#c62828",
  dangerSoft: "#e57373",
  alert: "#e74c3c",
  limit: "#c0392b",
  warn: "#e67e22",
  white: "#f5f7e8",
  onAccent: "#0d0f0a",
  leadFree: "#5bc8af",
  warnBg: "#1a1a00",
  warnLine: "#b8860b",
  compare1: "#1565c0",
  compare2: "#e65100",
  compare3: "#6a1b9a",
  compare4: "#c2185b",
};

// Title set dynamically
if (typeof document !== 'undefined') {
  document.title = "ChassIA — L'assistant IA de la chasse en Belgique";
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
async function askClaude(prompt, systemPrompt, history = [], premium = false, timeoutMsg = "", offlineMsg = "") {
  const model = premium ? "claude-opus-4-8" : "claude-sonnet-4-6";
  const messages = [
    ...history,
    { role: "user", content: prompt },
  ];
  // Timeout de 30 s : évite un spinner infini si le réseau se fige
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  let res;
  try {
    res = await fetch("/api/claude", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        // system en cache : identique a chaque appel pour une langue donnee,
        // partage entre TOUS les utilisateurs (cle API commune) -> reduit le cout d'entree
        system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
        messages,
      }),
      signal: ctrl.signal,
    });
  } catch (e) {
    if (e?.name === "AbortError") throw new Error(timeoutMsg || "La requête a expiré. Vérifie ta connexion et réessaie.");
    throw new Error(offlineMsg || "Connexion impossible. Vérifie ta connexion internet.");
  } finally {
    clearTimeout(timer);
  }
  let data;
  try { data = await res.json(); } catch(e) { throw new Error("Réponse invalide du serveur"); }
  if (data && data.content && data.content[0] && data.content[0].text) {
    return data.content[0].text;
  }
  throw new Error(data?.error?.message || data?.error || JSON.stringify(data).slice(0, 200));
}


// ─── DATA ────────────────────────────────────────────────────────────────────
const CALIBRE_CATEGORIES = [
  {
    groupe: "Petits calibres — Renard, nuisibles, petit gibier",
    calibres: [
      { value: ".17 HMR", label: ".17 HMR", droOptions: [50, 75, 100] },
      { value: ".22 Hornet", label: ".22 Hornet", droOptions: [75, 100, 125] },
      { value: ".222 Rem", label: ".222 Remington", droOptions: [75, 100, 125] },
      { value: ".223 Rem", label: ".223 Remington", droOptions: [75, 100, 150] },
      { value: ".22-250 Rem", label: ".22-250 Remington", droOptions: [75, 100, 150] },
      { value: "5.6x50R Mag", label: "5,6×50R Magnum", droOptions: [75, 100, 125] },
      { value: "5.6x52R", label: "5,6×52R Savage", droOptions: [75, 100, 125] },
    ],
  },
  {
    groupe: "Calibres intermédiaires — Chevreuil, chamois",
    calibres: [
      { value: ".243 Win", label: ".243 Winchester", droOptions: [100, 150, 200] },
      { value: "6mm Rem", label: "6 mm Remington", droOptions: [100, 150, 200] },
      { value: "6.5x55 SE", label: "6,5×55 Swedish", droOptions: [100, 150, 200, 250] },
      { value: "6.5 Creedmoor", label: "6,5 Creedmoor", droOptions: [100, 150, 200, 250] },
      { value: "6.5 PRC", label: "6,5 PRC", droOptions: [150, 200, 250, 300] },
      { value: "6.5x57", label: "6,5×57", droOptions: [100, 150, 200] },
      { value: "6.5x57R", label: "6,5×57R", droOptions: [100, 150, 200] },
      { value: ".257 Roberts", label: ".257 Roberts", droOptions: [100, 150, 200] },
      { value: ".25-06 Rem", label: ".25-06 Remington", droOptions: [100, 150, 200] },
    ],
  },
  {
    groupe: "Calibres polyvalents européens — Chevreuil, cerf, sanglier",
    calibres: [
      { value: "7x57", label: "7×57 Mauser", droOptions: [100, 150, 200] },
      { value: "7x57R", label: "7×57R", droOptions: [100, 150, 200] },
      { value: "7x64", label: "7×64 Brenneke", droOptions: [100, 150, 200, 250] },
      { value: "7x65R", label: "7×65R", droOptions: [100, 150, 200] },
      { value: ".270 Win", label: ".270 Winchester", droOptions: [100, 150, 200, 250] },
      { value: ".270 WSM", label: ".270 WSM", droOptions: [150, 200, 250] },
      { value: ".280 Rem", label: ".280 Remington", droOptions: [100, 150, 200] },
      { value: "7mm-08", label: "7 mm-08 Remington", droOptions: [100, 150, 200] },
      { value: "7mm Rem Mag", label: "7 mm Remington Magnum", droOptions: [150, 200, 250, 300] },
      { value: "7mm PRC", label: "7 mm PRC", droOptions: [150, 200, 250, 300] },
    ],
  },
  {
    groupe: "Calibres universels — Grand gibier wallon",
    calibres: [
      { value: ".308 Win", label: ".308 Winchester", droOptions: [100, 150, 200, 250] },
      { value: "30-06", label: ".30-06 Springfield", droOptions: [100, 150, 200, 250] },
      { value: ".30R Blaser", label: ".30R Blaser", droOptions: [100, 150, 200] },
      { value: ".300 Win Mag", label: ".300 Winchester Magnum", droOptions: [150, 200, 250, 300] },
      { value: ".300 WSM", label: ".300 WSM", droOptions: [150, 200, 250, 300] },
      { value: ".300 Wby Mag", label: ".300 Weatherby Magnum", droOptions: [200, 250, 300] },
      { value: ".300 PRC", label: ".300 PRC", droOptions: [200, 250, 300] },
    ],
  },
  {
    groupe: "Gros calibres de battue — Sanglier, cerf d'Ardenne",
    calibres: [
      { value: "8x57 JS", label: "8×57 JS", droOptions: [75, 100, 150, 200] },
      { value: "8x57 JRS", label: "8×57 JRS", droOptions: [75, 100, 150] },
      { value: "8x68S", label: "8×68 S", droOptions: [100, 150, 200] },
      { value: ".338 Win Mag", label: ".338 Winchester Magnum", droOptions: [100, 150, 200] },
      { value: ".338 Lapua Mag", label: ".338 Lapua Magnum", droOptions: [100,150,200,250,300] },
      { value: "9.3x62", label: "9,3×62", droOptions: [50, 75, 100, 150] },
      { value: "9.3x74R", label: "9,3×74R", droOptions: [50, 75, 100, 150] },
      { value: "9.3x64", label: "9,3×64 Brenneke", droOptions: [75, 100, 150] },
    ],
  },
  {
    groupe: "Calibres à levier de sous-garde",
    calibres: [
      { value: ".30-30 Win", label: ".30-30 Winchester", droOptions: [50, 75, 100] },
      { value: ".444 Marlin", label: ".444 Marlin", droOptions: [50, 75, 100] },
      { value: ".45-70 Govt", label: ".45-70 Government", droOptions: [50, 75, 100] },
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
    { label: "Sako Gamehead 3,6g", marque:"Sako", sansPlomb:false, v0:1015, poids:3.6 },
    { label: "Winchester Power Point 4,1g", marque:"Winchester", sansPlomb:false, v0:920, poids:4.1 },
    { label: "RWS TMS 3,6g",                   marque:"RWS",   sansPlomb:false, v0:1000, poids:3.6  },
    { label: "GECO Express 3,6g",              marque:"GECO",  sansPlomb:false, v0:1010, poids:3.6  },
    { label: "GECO Softpoint 3,4g",            marque:"GECO",  sansPlomb:false, v0:980,  poids:3.4  },
  ],

  // ── .22-250 REMINGTON ─────────────────────────────────────────────────────
  ".22-250 Rem": [
    { label: "Norma Tipstrike 3,6g", marque:"Norma", sansPlomb:false, v0:1090, poids:3.6 },
    { label: "Sako Gamehead 3,6g", marque:"Sako", sansPlomb:false, v0:1115, poids:3.6 },
    { label: "Hornady Varmint Express 3,2g", marque:"Hornady", sansPlomb:false, v0:1219, poids:3.2 },
    { label: "Winchester Power Point 4,1g", marque:"Winchester", sansPlomb:false, v0:1067, poids:4.1 },
  ],

  // ── 5,6×50R MAGNUM ────────────────────────────────────────────────────────
  "5.6x50R Mag": [
    { label: "RWS 5,6x50 R Mag. HIT 2,6g 🌿",  marque:"RWS",   sansPlomb:true,  v0:1034, poids:2.6  },
    { label: "RWS 5,6x50 R Mag. TMS 3,2g",    marque:"RWS",   sansPlomb:false, v0:1015, poids:3.2  },
    { label: "RWS 5,6x50 R Mag. TMS 4,1g",    marque:"RWS",   sansPlomb:false, v0:920,  poids:4.1  },
  ],

  // ── 5,6×52R SAVAGE ───────────────────────────────────────────────────────
  "5.6x52R": [
    { label: "Norma Whitetail 4,6g", marque:"Norma", sansPlomb:false, v0:850, poids:4.6 },
    { label: "RWS 5,6x52 R TMS 4,6g",         marque:"RWS",   sansPlomb:false, v0:870,  poids:4.6  },
  ],

  // ── .243 WINCHESTER ──────────────────────────────────────────────────────
  ".243 Win": [
    { label: "Hornady SST 6,2g", marque:"Hornady", sansPlomb:false, v0:971, poids:6.2 },
    { label: "Winchester Deer Season XP Copper 5,5g 🌿", marque:"Winchester", sansPlomb:true, v0:994, poids:5.5 },
    { label: "Lapua Naturalis 5,8g 🌿", marque:"Lapua", sansPlomb:true, v0:910, poids:5.8 },
    { label: "Sako Gamehead 6,5g", marque:"Sako", sansPlomb:false, v0:905, poids:6.5 },
    { label: "Winchester Ballistic Silvertip 6,2g", marque:"Winchester", sansPlomb:false, v0:945, poids:6.2 },
    { label: "Winchester Deer Season XP 6,2g", marque:"Winchester", sansPlomb:false, v0:945, poids:6.2 },
    { label: "Hornady American Whitetail 6,5g", marque:"Hornady", sansPlomb:false, v0:902, poids:6.5 },
    { label: "Hornady Precision Hunter ELD-X 5,8g", marque:"Hornady", sansPlomb:false, v0:960, poids:5.8 },
    { label: "Winchester Power Point 6,5g", marque:"Winchester", sansPlomb:false, v0:902, poids:6.5 },
    { label: "Norma Whitetail 6,5g", marque:"Norma", sansPlomb:false, v0:900, poids:6.5 },
    { label: "RWS KS 6,2g",                    marque:"RWS",   sansPlomb:false, v0:910,  poids:6.2  },
    { label: "RWS TMS 6,5g",                   marque:"RWS",   sansPlomb:false, v0:900,  poids:6.5  },
    { label: "GECO Softpoint 6,8g",            marque:"GECO",  sansPlomb:false, v0:880,  poids:6.8  },
    { label: "Norma Oryx 6,5g",                marque:"Norma", sansPlomb:false, v0:910,  poids:6.5  },
    { label: "GECO Express 4,9g", marque:"GECO", sansPlomb:false, v0:1020, poids:4.9 },
    { label: "Winchester Super-X 5,2g", marque:"Winchester", sansPlomb:false, v0:1021, poids:5.2 },
    { label: "Winchester Power Max Bonded 6,5g", marque:"Winchester", sansPlomb:false, v0:902, poids:6.5 },
  ],

  // ── 6 mm REMINGTON ───────────────────────────────────────────────────────
  "6mm Rem": [
    { label: "Hornady SST 6,2g", marque:"Hornady", sansPlomb:false, v0:986, poids:6.2 },
  ],

  // ── 6,5×55 SE ────────────────────────────────────────────────────────────
  "6.5x55 SE": [
    { label: "Lapua Naturalis 9,1g 🌿", marque:"Lapua", sansPlomb:true, v0:800, poids:9.1 },
    { label: "Sako Powerhead Blade 7,8g 🌿", marque:"Sako", sansPlomb:true, v0:855, poids:7.8 },
    { label: "Hornady SST 9,1g", marque:"Hornady", sansPlomb:false, v0:834, poids:9.1 },
    { label: "Sako Super Hammerhead 9,1g", marque:"Sako", sansPlomb:false, v0:815, poids:9.1 },
    { label: "Lapua Mega 10,1g", marque:"Lapua", sansPlomb:false, v0:780, poids:10.1 },
    { label: "Hornady Custom International InterLock 8,8g", marque:"Hornady", sansPlomb:false, v0:800, poids:8.8 },
    { label: "Winchester Power Point 9,1g", marque:"Winchester", sansPlomb:false, v0:777, poids:9.1 },
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
    { label: "Sako Powerhead Blade 7,8g 🌿", marque:"Sako", sansPlomb:true, v0:875, poids:7.8 },
    { label: "Sako Gamehead 9,1g", marque:"Sako", sansPlomb:false, v0:835, poids:9.1 },
    { label: "Lapua Naturalis 9,1g 🌿", marque:"Lapua", sansPlomb:true, v0:780, poids:9.1 },
    { label: "Winchester Power Point 9,1g", marque:"Winchester", sansPlomb:false, v0:860, poids:9.1 },
    { label: "Lapua Mega 10,1g", marque:"Lapua", sansPlomb:false, v0:780, poids:10.1 },
    { label: "Winchester Ballistic Silvertip 9,1g", marque:"Winchester", sansPlomb:false, v0:823, poids:9.1 },
    { label: "Hornady SST 8,4g", marque:"Hornady", sansPlomb:false, v0:899, poids:8.4 },
    { label: "Hornady American Whitetail 8,4g", marque:"Hornady", sansPlomb:false, v0:860, poids:8.4 },
    { label: "Sako Super Hammerhead 9,1g", marque:"Sako", sansPlomb:false, v0:835, poids:9.1 },
    { label: "Hornady Precision Hunter ELD-X 9,3g", marque:"Hornady", sansPlomb:false, v0:823, poids:9.3 },
    { label: "Winchester Deer Season XP 8,1g", marque:"Winchester", sansPlomb:false, v0:869, poids:8.1 },
    { label: "GECO Star 7,8g 🌿", marque:"GECO", sansPlomb:true, v0:879, poids:7.8 },
    { label: "Norma Evostrike 6,0g 🌿", marque:"Norma", sansPlomb:true, v0:1010, poids:6 },
    { label: "Norma Whitetail 9,1g", marque:"Norma", sansPlomb:false, v0:810, poids:9.1 },
    { label: "RWS Evolution Green 6,0g 🌿",     marque:"RWS",   sansPlomb:true,  v0:990,  poids:6.0  },
    { label: "RWS HIT 7,8g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:859,  poids:7.8  },
    { label: "RWS Speed Tip Pro 9,1g",          marque:"RWS",   sansPlomb:false, v0:828,  poids:9.1  },
    { label: "GECO Express 9,1g",              marque:"GECO",  sansPlomb:false, v0:807,  poids:9.1  },
    { label: "Norma Bondstrike 9,3g",          marque:"Norma", sansPlomb:false, v0:835,  poids:9.3  },
    { label: "Norma Tipstrike 9,1g",           marque:"Norma", sansPlomb:false, v0:800,  poids:9.1  },
    { label: "Norma Oryx 10,1g",               marque:"Norma", sansPlomb:false, v0:780,  poids:10.1  },
    { label: "Norma Ecostrike 7,8g 🌿",         marque:"Norma", sansPlomb:true,  v0:880,  poids:7.8  },
    { label: "Sako Gamehead Pro 9,1g", marque:"Sako", sansPlomb:false, v0:810, poids:9.1 },
    { label: "Sako Powerhead Blade Pro 8,4g 🌿", marque:"Sako", sansPlomb:true, v0:870, poids:8.4 },
    { label: "Winchester Deer Season XP 9,1g", marque:"Winchester", sansPlomb:false, v0:808, poids:9.1 },
    { label: "Winchester Copper Impact 8,1g 🌿", marque:"Winchester", sansPlomb:true, v0:869, poids:8.1 },
  ],

  // ── 6,5 PRC ──────────────────────────────────────────────────────────────
  "6.5 PRC": [
    { label: "Winchester Expedition Big Game LR 9,2g", marque:"Winchester", sansPlomb:false, v0:920, poids:9.2 },
    { label: "Winchester Expedition Big Game 9,2g", marque:"Winchester", sansPlomb:false, v0:920, poids:9.2 },
    { label: "Hornady Precision Hunter ELD-X 9,3g", marque:"Hornady", sansPlomb:false, v0:902, poids:9.3 },
    { label: "Norma Whitetail 9,1g", marque:"Norma", sansPlomb:false, v0:880, poids:9.1 },
    { label: "Norma Bondstrike 9,3g",          marque:"Norma", sansPlomb:false, v0:900,  poids:9.3  },
    { label: "Winchester Ballistic Silvertip 9,1g", marque:"Winchester", sansPlomb:false, v0:920, poids:9.1 },
    { label: "Winchester Copper Impact 8,1g 🌿", marque:"Winchester", sansPlomb:true, v0:945, poids:8.1 },
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
    { label: "Sako Gamehead 7,6g", marque:"Sako", sansPlomb:false, v0:910, poids:7.6 },
    { label: "Hornady Precision Hunter ELD-X 7,1g", marque:"Hornady", sansPlomb:false, v0:957, poids:7.1 },
    { label: "Winchester Power Point 7,8g", marque:"Winchester", sansPlomb:false, v0:911, poids:7.8 },
  ],

  // ── 7×57 MAUSER ──────────────────────────────────────────────────────────
  "7x57": [
    { label: "RWS ID Classic 10,5g",           marque:"RWS",   sansPlomb:false, v0:810,  poids:10.5 },
    { label: "RWS Evolution Green 8,2g 🌿",     marque:"RWS",   sansPlomb:true,  v0:830,  poids:8.2  },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:775,  poids:10.7 },
    { label: "Norma Oryx 10,1g",              marque:"Norma", sansPlomb:false, v0:805,  poids:10.1 },
    { label: "GECO Zero 8,2g 🌿", marque:"GECO", sansPlomb:true, v0:870, poids:8.2 },
  ],

  // ── 7×57R ─────────────────────────────────────────────────────────────────
  "7x57R": [
    { label: "Norma Tipstrike 10,4g", marque:"Norma", sansPlomb:false, v0:800, poids:10.4 },
    { label: "RWS Evolution Green 8,2g 🌿",     marque:"RWS",   sansPlomb:true,  v0:830,  poids:8.2  },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:730,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:760,  poids:10.5 },
    { label: "GECO Zero 8,2g 🌿",               marque:"GECO",  sansPlomb:true,  v0:820,  poids:8.2  },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:750,  poids:10.7 },
    { label: "Norma Oryx 10,1g",              marque:"Norma", sansPlomb:false, v0:795,  poids:10.1 },
  ],

  // ── 7×64 BRENNEKE ────────────────────────────────────────────────────────
  "7x64": [
    { label: "Hornady Precision Hunter ELD-X 10,5g", marque:"Hornady", sansPlomb:false, v0:811, poids:10.5 },
    { label: "Sako Powerhead Blade 9,3g 🌿", marque:"Sako", sansPlomb:true, v0:860, poids:9.3 },
    { label: "Lapua Naturalis 10,1g 🌿", marque:"Lapua", sansPlomb:true, v0:840, poids:10.1 },
    { label: "Sako Hammerhead 11,0g", marque:"Sako", sansPlomb:false, v0:795, poids:11.0 },
    { label: "Sako Gamehead 7,8g", marque:"Sako", sansPlomb:false, v0:935, poids:7.8 },
    { label: "Hornady International ECX 9,7g 🌿", marque:"Hornady", sansPlomb:true, v0:850, poids:9.7 },
    { label: "Hornady Custom International InterLock 10,0g", marque:"Hornady", sansPlomb:false, v0:823, poids:10.0 },
    { label: "Norma Vulkan 11,0g", marque:"Norma", sansPlomb:false, v0:840, poids:11.0 },
    { label: "RWS Evolution Green 8,2g 🌿",     marque:"RWS",   sansPlomb:true,  v0:950,  poids:8.2  },
    { label: "RWS HIT 9,1g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:940,  poids:9.1  },
    { label: "RWS Speed Tip Pro 9,7g",          marque:"RWS",   sansPlomb:false, v0:930,  poids:9.7  },
    { label: "RWS Evolution 10,3g",             marque:"RWS",   sansPlomb:false, v0:855,  poids:10.3 },
    { label: "RWS ID Classic 10,5g",           marque:"RWS",   sansPlomb:false, v0:865,  poids:10.5 },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:820,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:850,  poids:10.5 },
    { label: "RWS KS 8,0g",                    marque:"RWS",   sansPlomb:false, v0:965,  poids:8.0  },
    { label: "GECO Star 9,1g 🌿",               marque:"GECO",  sansPlomb:true,  v0:928,  poids:9.1  },
    { label: "GECO Zero 8,2g 🌿",               marque:"GECO",  sansPlomb:true,  v0:940,  poids:8.2  },
    { label: "GECO Plus 11,0g",                marque:"GECO",  sansPlomb:false, v0:830,  poids:11.0 },
    { label: "GECO Express 10,0g",             marque:"GECO",  sansPlomb:false, v0:880,  poids:10.0 },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:840,  poids:10.7 },
    { label: "Norma Oryx 11,0g",              marque:"Norma", sansPlomb:false, v0:840,  poids:11 },
    { label: "Norma Tipstrike 10,4g",          marque:"Norma", sansPlomb:false, v0:890,  poids:10.4 },
    { label: "Norma Bondstrike 10,7g",         marque:"Norma", sansPlomb:false, v0:870,  poids:10.7 },
    { label: "Norma Ecostrike 9,1g 🌿",        marque:"Norma", sansPlomb:true,  v0:910,  poids:9.1 },
    { label: "Winchester Power Point 10,5g", marque:"Winchester", sansPlomb:false, v0:841, poids:10.5 },
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
    { label: "GECO Softpoint 10,7g",            marque:"GECO",  sansPlomb:false, v0:800,  poids:10.7  },
    { label: "Norma Oryx 11,0g",              marque:"Norma", sansPlomb:false, v0:810,  poids:11 },
    { label: "Norma Ecostrike 9,1g 🌿",        marque:"Norma", sansPlomb:true,  v0:860,  poids:9.1 },
  ],

  // ── .270 WINCHESTER ──────────────────────────────────────────────────────
  ".270 Win": [
    { label: "Sako Hammerhead 10,1g", marque:"Sako", sansPlomb:false, v0:830, poids:10.1 },
    { label: "Sako Powerhead Blade 7,8g 🌿", marque:"Sako", sansPlomb:true, v0:915, poids:7.8 },
    { label: "Sako Super Hammerhead 8,4g", marque:"Sako", sansPlomb:false, v0:925, poids:8.4 },
    { label: "Winchester Power Max Bonded 8,4g", marque:"Winchester", sansPlomb:false, v0:933, poids:8.4 },
    { label: "Winchester Expedition Big Game 9,7g", marque:"Winchester", sansPlomb:false, v0:884, poids:9.7 },
    { label: "Winchester Deer Season XP 8,4g", marque:"Winchester", sansPlomb:false, v0:933, poids:8.4 },
    { label: "Hornady SST 8,4g", marque:"Hornady", sansPlomb:false, v0:975, poids:8.4 },
    { label: "Hornady American Whitetail 8,4g", marque:"Hornady", sansPlomb:false, v0:933, poids:8.4 },
    { label: "Sako Gamehead 9,7g", marque:"Sako", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Hornady Custom International InterLock 9,7g", marque:"Hornady", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Hornady Precision Hunter ELD-X 9,4g", marque:"Hornady", sansPlomb:false, v0:905, poids:9.4 },
    { label: "Winchester Ballistic Silvertip 8,4g", marque:"Winchester", sansPlomb:false, v0:930, poids:8.4 },
    { label: "Norma Evostrike 6,2g 🌿", marque:"Norma", sansPlomb:true, v0:1080, poids:6.2 },
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
    { label: "Norma Oryx 9,7g",              marque:"Norma", sansPlomb:false, v0:870,  poids:9.7 },
    { label: "Norma Tipstrike 9,7g",           marque:"Norma", sansPlomb:false, v0:910,  poids:9.7  },
    { label: "Norma Ecostrike 8,4g 🌿",         marque:"Norma", sansPlomb:true,  v0:900,  poids:8.4  },
    { label: "Sako Powerhead Blade Pro 7,8g 🌿", marque:"Sako", sansPlomb:true, v0:960, poids:7.8 },
    { label: "Winchester Copper Impact 8,4g 🌿", marque:"Winchester", sansPlomb:true, v0:914, poids:8.4 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:869, poids:9.7 },
  ],

  // ── .270 WSM ─────────────────────────────────────────────────────────────
  ".270 WSM": [
    { label: "Winchester Power Max Bonded 8,4g", marque:"Winchester", sansPlomb:false, v0:998, poids:8.4 },
    { label: "RWS HIT 8,4g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:940,  poids:8.4  },
    { label: "Norma Oryx 9,7g",              marque:"Norma", sansPlomb:false, v0:940,  poids:9.7 },
    { label: "Norma Ecostrike 8,4g 🌿",         marque:"Norma", sansPlomb:true,  v0:935,  poids:8.4  },
    { label: "Winchester Ballistic Silvertip 8,4g", marque:"Winchester", sansPlomb:false, v0:998, poids:8.4 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:951, poids:9.7 },
    { label: "Winchester Deer Season XP 8,4g", marque:"Winchester", sansPlomb:false, v0:998, poids:8.4 },
    { label: "Winchester Copper Impact 8,4g 🌿", marque:"Winchester", sansPlomb:true, v0:980, poids:8.4 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:960, poids:9.7 },
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
    { label: "Norma Tipstrike 10,4g",           marque:"Norma", sansPlomb:false, v0:820,  poids:10.4  },
    { label: "Norma Oryx 10,1g",               marque:"Norma", sansPlomb:false, v0:805,  poids:10.1  },
  ],

  // ── 7mm REMINGTON MAGNUM ──────────────────────────────────────────────────
  "7mm Rem Mag": [
    { label: "Hornady SST 9,0g", marque:"Hornady", sansPlomb:false, v0:988, poids:9.0 },
    { label: "Hornady American Whitetail 9,0g", marque:"Hornady", sansPlomb:false, v0:960, poids:9 },
    { label: "Hornady Precision Hunter ELD-X 10,5g", marque:"Hornady", sansPlomb:false, v0:896, poids:10.5 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:945, poids:9.7 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:942, poids:9.7 },
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
    { label: "Norma Ecostrike 9,1g 🌿",        marque:"Norma", sansPlomb:true,  v0:910,  poids:9.1 },
    { label: "Hornady SST Superformance 10,0g", marque:"Hornady", sansPlomb:false, v0:945, poids:10 },
    { label: "Winchester Deer Season XP 9,1g", marque:"Winchester", sansPlomb:false, v0:945, poids:9.1 },
    { label: "Winchester Expedition Big Game 10,9g", marque:"Winchester", sansPlomb:false, v0:884, poids:10.9 },
    { label: "Winchester Expedition Big Game AccuBond 10,4g", marque:"Winchester", sansPlomb:false, v0:899, poids:10.4 },
    { label: "Winchester Power Point 11,3g", marque:"Winchester", sansPlomb:false, v0:872, poids:11.3 },
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
    { label: "Winchester Super-X Power-Point 11,7g", marque:"Winchester", sansPlomb:false, v0:799, poids:11.7 },
    { label: "Lapua Mega 12,0g", marque:"Lapua", sansPlomb:false, v0:765, poids:12.0 },
    { label: "Sako Gamehead 9,7g", marque:"Sako", sansPlomb:false, v0:870, poids:9.7 },
    { label: "Winchester Copper Impact 9,7g 🌿", marque:"Winchester", sansPlomb:true, v0:856, poids:9.7 },
    { label: "Hornady Outfitter GMX 9,7g 🌿", marque:"Hornady", sansPlomb:true, v0:838, poids:9.7 },
    { label: "Hornady SST 9,7g", marque:"Hornady", sansPlomb:false, v0:914, poids:9.7 },
    { label: "Hornady American Whitetail 10,7g", marque:"Hornady", sansPlomb:false, v0:823, poids:10.7 },
    { label: "Lapua Naturalis 11,0g 🌿", marque:"Lapua", sansPlomb:true, v0:800, poids:11.0 },
    { label: "Lapua Mega 9,7g", marque:"Lapua", sansPlomb:false, v0:850, poids:9.7 },
    { label: "Sako Powerhead Blade 10,5g 🌿", marque:"Sako", sansPlomb:true, v0:815, poids:10.5 },
    { label: "Sako Super Hammerhead 9,7g", marque:"Sako", sansPlomb:false, v0:855, poids:9.7 },
    { label: "Hornady GMX 10,7g 🌿", marque:"Hornady", sansPlomb:true, v0:838, poids:10.7 },
    { label: "Hornady Custom International InterLock 11,7g", marque:"Hornady", sansPlomb:false, v0:792, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 11,5g", marque:"Hornady", sansPlomb:false, v0:792, poids:11.5 },
    { label: "Winchester Power Max Bonded 11,7g", marque:"Winchester", sansPlomb:false, v0:799, poids:11.7 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:860, poids:9.7 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:856, poids:9.7 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:860, poids:9.7 },
    { label: "Norma Evostrike 9,0g 🌿", marque:"Norma", sansPlomb:true, v0:885, poids:9.0 },
    { label: "Norma Vulkan 11,7g", marque:"Norma", sansPlomb:false, v0:796, poids:11.7 },
    { label: "Norma Whitetail 11,7g", marque:"Norma", sansPlomb:false, v0:796, poids:11.7 },
    { label: "RWS Driven Hunt 10,7g 🌿",           marque:"RWS",   sansPlomb:true, v0:765,  poids:10.7 },
    { label: "RWS Driven Hunt SR 9,7g 🌿",         marque:"RWS",   sansPlomb:true, v0:812,  poids:9.7  },
    { label: "RWS Evolution Green 9,0g 🌿",      marque:"RWS",   sansPlomb:true,  v0:885,  poids:9.0  },
    { label: "RWS Evolution Green SR 9,0g 🌿",   marque:"RWS",   sansPlomb:true,  v0:900,  poids:9.0  },
    { label: "RWS HIT 10,7g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:820,  poids:10.7 },
    { label: "RWS HIT SR 9,7g 🌿",               marque:"RWS",   sansPlomb:true,  v0:870,  poids:9.7  },
    { label: "RWS Speed Tip Pro 10,7g",          marque:"RWS",   sansPlomb:false, v0:830,  poids:10.7 },
    { label: "RWS Speed Tip Pro SR 10,7g",       marque:"RWS",   sansPlomb:false, v0:830,  poids:10.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:750,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:770,  poids:11.7 },
    { label: "RWS ID Classic 9,7g",              marque:"RWS",   sansPlomb:false, v0:860,  poids:9.7  },
    { label: "RWS KS 9,7g",                      marque:"RWS",   sansPlomb:false, v0:850,  poids:9.7  },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:800,  poids:10.7 },
    { label: "GECO Star 10,7g 🌿",               marque:"GECO",  sansPlomb:true,  v0:783,  poids:10.7 },
    { label: "GECO Zero 8,8g 🌿",                marque:"GECO",  sansPlomb:true,  v0:870,  poids:8.8  },
    { label: "GECO Plus 11,0g",                 marque:"GECO",  sansPlomb:false, v0:780,  poids:11.0 },
    { label: "GECO Express 10,7g",              marque:"GECO",  sansPlomb:false, v0:825,  poids:10.7 },
    { label: "GECO Softpoint 11,0g",            marque:"GECO",  sansPlomb:false, v0:805,  poids:11.0 },
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:796,  poids:11.7 },
    { label: "Norma Tipstrike 11,0g",           marque:"Norma", sansPlomb:false, v0:800,  poids:11.0 },
    { label: "Norma Bondstrike 11,7g",          marque:"Norma", sansPlomb:false, v0:800,  poids:11.7 },
    { label: "Norma Ecostrike 9,7g 🌿",          marque:"Norma", sansPlomb:true,  v0:860,  poids:9.7 },
    { label: "Norma Ecostrike 10,7g 🌿", marque:"Norma", sansPlomb:true, v0:820, poids:10.7 },
    { label: "Winchester Ballistic Silvertip 10,9g", marque:"Winchester", sansPlomb:false, v0:814, poids:10.9 },
    { label: "Winchester Deer Season XP 10,9g", marque:"Winchester", sansPlomb:false, v0:814, poids:10.9 },
    { label: "Winchester Expedition Big Game 10,9g", marque:"Winchester", sansPlomb:false, v0:817, poids:10.9 },
  ],

  // ── .30-06 SPRINGFIELD ───────────────────────────────────────────────────
  "30-06": [
    { label: "Sako Super Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:820, poids:11.7 },
    { label: "Winchester Super-X Power-Point 9,7g", marque:"Winchester", sansPlomb:false, v0:890, poids:9.7 },
    { label: "Sako Gamehead 8,0g", marque:"Sako", sansPlomb:false, v0:950, poids:8 },
    { label: "Winchester Copper Impact 9,7g 🌿", marque:"Winchester", sansPlomb:true, v0:890, poids:9.7 },
    { label: "Winchester Expedition Big Game 12,3g", marque:"Winchester", sansPlomb:false, v0:838, poids:12.3 },
    { label: "Hornady Outfitter GMX 9,7g 🌿", marque:"Hornady", sansPlomb:true, v0:914, poids:9.7 },
    { label: "Hornady SST 9,7g", marque:"Hornady", sansPlomb:false, v0:939, poids:9.7 },
    { label: "Hornady American Whitetail 11,7g", marque:"Hornady", sansPlomb:false, v0:823, poids:11.7 },
    { label: "Lapua Naturalis 11,0g 🌿", marque:"Lapua", sansPlomb:true, v0:830, poids:11.0 },
    { label: "Lapua Mega 12,0g", marque:"Lapua", sansPlomb:false, v0:800, poids:12.0 },
    { label: "Sako Hammerhead 14,3g", marque:"Sako", sansPlomb:false, v0:735, poids:14.3 },
    { label: "Sako Super Hammerhead 9,7g", marque:"Sako", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Hornady Custom International InterLock 11,7g", marque:"Hornady", sansPlomb:false, v0:797, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 11,5g", marque:"Hornady", sansPlomb:false, v0:838, poids:11.5 },
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
    { label: "GECO Softpoint 11,0g",            marque:"GECO",  sansPlomb:false, v0:840,  poids:11.0 },
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:823,  poids:11.7 },
    { label: "Norma Tipstrike 11,0g",            marque:"Norma", sansPlomb:false, v0:850,  poids:11 },
    { label: "Norma Bondstrike 11,7g",          marque:"Norma", sansPlomb:false, v0:840,  poids:11.7 },
    { label: "Norma Ecostrike 9,7g 🌿",          marque:"Norma", sansPlomb:true,  v0:900,  poids:9.7 },
    { label: "Norma Ecostrike 10,7g 🌿", marque:"Norma", sansPlomb:true, v0:860, poids:10.7 },
    { label: "Sako Powerhead Blade 11,0g 🌿", marque:"Sako", sansPlomb:true, v0:860, poids:11 },
    { label: "Winchester Power Point 10,7g", marque:"Winchester", sansPlomb:false, v0:853, poids:10.7 },
    { label: "Winchester Power Max Bonded 9,7g", marque:"Winchester", sansPlomb:false, v0:890, poids:9.7 },
    { label: "Winchester Ballistic Silvertip 11,7g", marque:"Winchester", sansPlomb:false, v0:838, poids:11.7 },
    { label: "Winchester Copper Impact 11,7g 🌿", marque:"Winchester", sansPlomb:true, v0:831, poids:11.7 },
    { label: "Winchester Deer Season XP 11,7g", marque:"Winchester", sansPlomb:false, v0:838, poids:11.7 },
    { label: "Winchester Super-X 8,1g", marque:"Winchester", sansPlomb:false, v0:957, poids:8.1 },
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
    { label: "Lapua Mega 12,0g", marque:"Lapua", sansPlomb:false, v0:830, poids:12.0 },
    { label: "Winchester Super-X Power-Point 9,7g", marque:"Winchester", sansPlomb:false, v0:1003, poids:9.7 },
    { label: "Sako Powerhead Blade 11,0g 🌿", marque:"Sako", sansPlomb:true, v0:920, poids:11.0 },
    { label: "Winchester Expedition Big Game 12,3g", marque:"Winchester", sansPlomb:false, v0:884, poids:12.3 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:994, poids:9.7 },
    { label: "Hornady Outfitter GMX 11,7g 🌿", marque:"Hornady", sansPlomb:true, v0:902, poids:11.7 },
    { label: "Hornady SST 11,7g", marque:"Hornady", sansPlomb:false, v0:954, poids:11.7 },
    { label: "Hornady American Whitetail 11,7g", marque:"Hornady", sansPlomb:false, v0:902, poids:11.7 },
    { label: "Lapua Naturalis 11,0g 🌿", marque:"Lapua", sansPlomb:true, v0:902, poids:11.0 },
    { label: "Sako Hammerhead 14,3g", marque:"Sako", sansPlomb:false, v0:825, poids:14.3 },
    { label: "Sako Super Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:880, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 13,0g", marque:"Hornady", sansPlomb:false, v0:872, poids:13 },
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
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:900,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:910,  poids:11.7 },
    { label: "RWS KS 10,7g",                     marque:"RWS",   sansPlomb:false, v0:920,  poids:10.7 },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:940,  poids:10.7 },
    { label: "GECO Star 10,7g 🌿",               marque:"GECO",  sansPlomb:true,  v0:921,  poids:10.7 },
    { label: "GECO Zero 8,8g 🌿",                marque:"GECO",  sansPlomb:true,  v0:1010, poids:8.8  },
    { label: "GECO Plus 11,0g",                 marque:"GECO",  sansPlomb:false, v0:940,  poids:11.0 },
    { label: "GECO Express 10,7g",              marque:"GECO",  sansPlomb:false, v0:970,  poids:10.7 },
    { label: "GECO Softpoint 11,0g",            marque:"GECO",  sansPlomb:false, v0:950,  poids:11.0 },
    { label: "Norma Bondstrike 11,7g",          marque:"Norma", sansPlomb:false, v0:940,  poids:11.7 },
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:890,  poids:11.7 },
    { label: "Norma Ecostrike 10,7g 🌿",         marque:"Norma", sansPlomb:true,  v0:950,  poids:10.7 },
    { label: "Winchester Deer Season XP 11,7g", marque:"Winchester", sansPlomb:false, v0:899, poids:11.7 },
    { label: "Winchester Expedition Big Game AccuBond 11,7g", marque:"Winchester", sansPlomb:false, v0:899, poids:11.7 },
    { label: "Winchester Copper Impact 9,7g 🌿", marque:"Winchester", sansPlomb:true, v0:994, poids:9.7 },
    { label: "Winchester Copper Impact 11,7g 🌿", marque:"Winchester", sansPlomb:true, v0:899, poids:11.7 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:1003, poids:9.7 },
  ],

  // ── .300 WSM ─────────────────────────────────────────────────────────────
  ".300 WSM": [
    { label: "Hornady Precision Hunter ELD-X 13,0g", marque:"Hornady", sansPlomb:false, v0:860, poids:13 },
    { label: "Winchester Expedition Big Game 12,3g", marque:"Winchester", sansPlomb:false, v0:876, poids:12.3 },
    { label: "Winchester Ballistic Silvertip 11,7g", marque:"Winchester", sansPlomb:false, v0:917, poids:11.7 },
    { label: "Winchester Power Point 11,7g", marque:"Winchester", sansPlomb:false, v0:905, poids:11.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:880,  poids:11.9 },
    { label: "Norma Bondstrike 11,7g",          marque:"Norma", sansPlomb:false, v0:940,  poids:11.7 },
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:900,  poids:11.7 },
    { label: "Norma Ecostrike 10,7g 🌿",         marque:"Norma", sansPlomb:true,  v0:940,  poids:10.7 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:1006, poids:9.7 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:994, poids:9.7 },
    { label: "Winchester Deer Season XP 11,7g", marque:"Winchester", sansPlomb:false, v0:884, poids:11.7 },
    { label: "Winchester Copper Impact 9,7g 🌿", marque:"Winchester", sansPlomb:true, v0:975, poids:9.7 },
    { label: "Winchester Copper Impact 11,7g 🌿", marque:"Winchester", sansPlomb:true, v0:884, poids:11.7 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:997, poids:9.7 },
  ],

  // ── .300 WEATHERBY MAGNUM ─────────────────────────────────────────────────
  ".300 Wby Mag": [
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:990,  poids:11.7 },
  ],

  // ── .300 PRC ─────────────────────────────────────────────────────────────
  ".300 PRC": [
    { label: "Hornady Precision Hunter ELD-X 13,7g", marque:"Hornady", sansPlomb:false, v0:872, poids:13.7 },
    { label: "Norma Bondstrike 11,7g",          marque:"Norma", sansPlomb:false, v0:970,  poids:11.7 },
  ],

  // ── 8×57 JS ──────────────────────────────────────────────────────────────
  "8x57 JS": [
    { label: "Hornady Custom International InterLock 12,6g", marque:"Hornady", sansPlomb:false, v0:745, poids:12.6 },
    { label: "Lapua Naturalis 11,7g 🌿", marque:"Lapua", sansPlomb:true, v0:800, poids:11.7 },
    { label: "Sako Hammerhead 13,0g", marque:"Sako", sansPlomb:false, v0:765, poids:13.0 },
    { label: "Hornady International ECX 11,7g 🌿", marque:"Hornady", sansPlomb:true, v0:760, poids:11.7 },
    { label: "Norma Evostrike 9,0g 🌿", marque:"Norma", sansPlomb:true, v0:920, poids:9.0 },
    { label: "Norma Vulkan 12,7g", marque:"Norma", sansPlomb:false, v0:770, poids:12.7 },
    { label: "Norma Whitetail 12,7g", marque:"Norma", sansPlomb:false, v0:770, poids:12.7 },
    { label: "RWS Driven Hunt 10,4g 🌿",           marque:"RWS",   sansPlomb:true, v0:783,  poids:10.4 },
    { label: "RWS Evolution Green 9,0g 🌿",      marque:"RWS",   sansPlomb:true,  v0:920,  poids:9.0  },
    { label: "RWS HIT 10,4g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:830,  poids:10.4 },
    { label: "RWS HIT SR 10,4g 🌿",              marque:"RWS",   sansPlomb:true,  v0:835,  poids:10.4 },
    { label: "RWS Speed Tip Pro 11,7g",          marque:"RWS",   sansPlomb:false, v0:770,  poids:11.7 },
    { label: "RWS Speed Tip Pro SR 11,7g",       marque:"RWS",   sansPlomb:false, v0:795,  poids:11.7 },
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
    { label: "Winchester Power Point 12,6g", marque:"Winchester", sansPlomb:false, v0:719, poids:12.6 },
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
    { label: "Norma Oryx 12,7g",               marque:"Norma", sansPlomb:false, v0:730,  poids:12.7 },
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
    { label: "Hornady SST Superformance 14,6g", marque:"Hornady", sansPlomb:false, v0:866, poids:14.6 },
  ],
  ".338 Lapua Mag": [
    { label: "Lapua Naturalis 15,0g 🌿", marque:"Lapua", sansPlomb:true, v0:920, poids:15.0 },
    { label: "Lapua Scenar OTM 16,2g", marque:"Lapua", sansPlomb:false, v0:890, poids:16.2 },
    { label: "Hornady Precision Hunter ELD-X 17,5g", marque:"Hornady", sansPlomb:false, v0:853, poids:17.5 },
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
    { label: "Norma Oryx 21,1g", marque:"Norma", sansPlomb:false, v0:670, poids:21.1 },
  ],

  // ── 9,3×74R ──────────────────────────────────────────────────────────────
  "9.3x74R": [
    { label: "Sako Hammerhead 18,5g", marque:"Sako", sansPlomb:false, v0:685, poids:18.5 },
    { label: "Hornady Custom International InterLock 18,5g", marque:"Hornady", sansPlomb:false, v0:719, poids:18.5 },
    { label: "Winchester Power Point 18,5g", marque:"Winchester", sansPlomb:false, v0:719, poids:18.5 },
    { label: "Norma Tipstrike 16,5g", marque:"Norma", sansPlomb:false, v0:750, poids:16.5 },
    { label: "Norma Vulkan 15,0g", marque:"Norma", sansPlomb:false, v0:780, poids:15.0 },
    { label: "RWS Evolution Green 11,9g 🌿",     marque:"RWS",   sansPlomb:true,  v0:885,  poids:11.9 },
    { label: "RWS HIT 16,2g 🌿",                 marque:"RWS",   sansPlomb:true,  v0:719,  poids:16.2 },
    { label: "RWS Evolution 18,8g",              marque:"RWS",   sansPlomb:false, v0:665,  poids:18.8 },
    { label: "RWS UNI Classic 19,0g",            marque:"RWS",   sansPlomb:false, v0:675,  poids:19.0 },
    { label: "RWS KS 16,0g",                     marque:"RWS",   sansPlomb:false, v0:740,  poids:16.0 },
    { label: "GECO Zero 11,9g 🌿",               marque:"GECO",  sansPlomb:true,  v0:825,  poids:11.9 },
    { label: "GECO Plus 16,5g",                 marque:"GECO",  sansPlomb:false, v0:730,  poids:16.5 },
    { label: "GECO Softpoint 16,5g",            marque:"GECO",  sansPlomb:false, v0:740,  poids:16.5 },
    { label: "Norma Oryx 18,5g",               marque:"Norma", sansPlomb:false, v0:720,  poids:18.5 },
    { label: "Norma Ecostrike 16,2g 🌿",         marque:"Norma", sansPlomb:true,  v0:750,  poids:16.2 },
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
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:729, poids:9.7 },
    { label: "Winchester Power Point 11,0g", marque:"Winchester", sansPlomb:false, v0:670, poids:11.0 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:729, poids:9.7 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:729, poids:9.7 },
    { label: "Winchester Super-X HP 9,7g", marque:"Winchester", sansPlomb:false, v0:729, poids:9.7 },
  ],
  ".444 Marlin": [
    { label: "Hornady LEVERevolution FTX 17,2g", marque:"Hornady", sansPlomb:false, v0:709, poids:17.2 },
  ],
  ".45-70 Govt": [
    { label: "Hornady LEVERevolution FTX 16,2g 🌿", marque:"Hornady", sansPlomb:true, v0:617, poids:16.2 },
    { label: "Winchester Super-X Power-Point 19,4g", marque:"Winchester", sansPlomb:false, v0:573, poids:19.4 },
    { label: "Hornady LEVERevolution FTX 21,1g", marque:"Hornady", sansPlomb:false, v0:625, poids:21.1 },
    { label: "Winchester Ballistic Silvertip 19,4g", marque:"Winchester", sansPlomb:false, v0:573, poids:19.4 },
    { label: "Winchester Super-X 26,2g", marque:"Winchester", sansPlomb:false, v0:351, poids:26.2 },
  ],
};

// ─── MARKDOWN-LIKE RENDERER ──────────────────────────────────────────────────
// ─── DONNÉES GIBIER MULTILINGUES (FR / NL / DE / EN) ─────────────────────────
const GIBIER_I18N = {
  fr: {
    intro: "Espèces chassables en Belgique — saisons officielles 2025-2030 (source : chasse.be / natuurenbos.vlaanderen.be).",
    regionW: "Wallonie", regionF: "Flandre", wLabel: "W :", fLabel: "F :",
    leadTag: "⚠️ PLOMB INTERDIT",
    leadText: "Les munitions au plomb sont interdites dans et à moins de 100m des zones humides en Wallonie. Utilisez des munitions sans plomb (✓) pour tout tir en zone humide.",
    footnote: "Données indicatives — Saisons 2025-2030 · Vérifiez toujours les ouvertures en vigueur sur chasse.be (Wallonie) ou natuurenbos.vlaanderen.be (Flandre)",
    cats: [
      { title: "🦌 Grand gibier", big: true, sp: [
        { emoji:"🦌", nom:"Cerf élaphe", latin:"Cervus elaphus", poids:"120–250 kg", w:"Biche & faon : 1 août → 31 déc · Cerf boisé : 1 oct → 31 déc (conseils cynégétiques agréés)", f:"Cerf : 1 oct → 31 déc (plan de tir) · Biches/faons : 1 oct → 31 jan" },
        { emoji:"🫎", nom:"Chevreuil", latin:"Capreolus capreolus", poids:"15–35 kg", w:"Brocard : 15 avr→15 mai & 15 juil→15 août (approche/affût) · Battue : 1 oct→31 déc · Chevrette/faon : 1 oct→31 déc", f:"Brocard : 1 mai → 14 sept · Chevrette & faon : 1 jan → 31 mars" },
        { emoji:"🐗", nom:"Sanglier", latin:"Sus scrofa", poids:"50–200 kg", w:"Toute l'année à l'affût/approche · Battue : 1 oct→31 jan", f:"Sanglier : 1 jan → 14 juil & 1 août → 31 déc" },
        { emoji:"🦌", nom:"Daim", latin:"Dama dama", poids:"40–100 kg", w:"Saison définie par plan de tir local · 1 oct→31 déc", f:"Daim : 1 oct → 31 déc (plan de tir)" },
        { emoji:"🐏", nom:"Mouflon", latin:"Ovis gmelini musimon", poids:"25–50 kg", w:"1 oct→31 déc · Uniquement sur territoires agréés", f:"Mouflon : 1 oct → 31 déc (plan de tir)" },
      ]},
      { title: "🐇 Petit gibier", sp: [
        { emoji:"🐇", nom:"Lièvre brun", w:"01/10 → 31/12 (CC agréés uniquement)", f:"Lièvre : 15 oct → 31 déc (territoire agréé uniquement)" },
        { emoji:"🦚", nom:"Faisan de chasse", w:"01/10 → 31/01 (coq et poule — tous territoires)", f:"Faisan coq : 15 oct → 31 jan · Faisan poule : 15 oct → 31 déc" },
        { emoji:"🐦", nom:"Perdrix grise", w:"20/09 → 15/11 (CC agréés + plan de gestion obligatoire)", f:"Perdrix : 15 sept → 14 nov (territoire agréé + protocole obligatoire)" },
        { emoji:"🪶", nom:"Bécasse des bois", w:"01/11 → 15/01 — affût autorisé 1h avant lever/1h après coucher", f:"⚠️ Pas de saison officielle en Flandre" },
      ]},
      { title: "🦆 Gibier d'eau", leadBan: true, sp: [
        { emoji:"🪿", nom:"Bernache du Canada", w:"01/08 → 10/03 — appeaux/leurres autorisés", f:"Bernache : 15 août → 31 mars" },
        { emoji:"🦆", nom:"Canard colvert", w:"01/09 → 15/01 — appeaux/leurres autorisés", f:"Canard colvert : 15 août → 31 jan" },
        { emoji:"🐦", nom:"Foulque macroule", w:"15/10 → 31/01 — commercialisation interdite", f:"Foulque : dates non fixées" },
      ]},
      { title: "🐰 Autre gibier", sp: [
        { emoji:"🐰", nom:"Lapin de garenne", w:"01/10 → 31/01 — bourses et furet autorisés", f:"Lapin : 15 août → 28 fév" },
        { emoji:"🦊", nom:"Renard roux", w:"01/07 → 30/06 (affût/approche) · 01/08 → 29/02 (chien courant) · Appeaux autorisés", f:"Renard : 15 oct → 28 fév" },
        { emoji:"🕊️", nom:"Pigeon ramier", w:"20/10 → 29/02 — appeaux/leurres/appelants autorisés", f:"Pigeon ramier : 15 sept → 28 fév" },
      ]},
    ],
  },
  nl: {
    intro: "Bejaagbare soorten in België — officiële seizoenen 2025-2030 (bron: chasse.be / natuurenbos.vlaanderen.be).",
    regionW: "Wallonië", regionF: "Vlaanderen", wLabel: "W:", fLabel: "V:",
    leadTag: "⚠️ LOOD VERBODEN",
    leadText: "Loodhoudende munitie is verboden in en binnen 100 m van waterrijke gebieden in Wallonië. Gebruik loodvrije munitie (✓) voor elk schot in watergebied.",
    footnote: "Indicatieve gegevens — Seizoenen 2025-2030 · Controleer altijd de geldende openingen op chasse.be (Wallonië) of natuurenbos.vlaanderen.be (Vlaanderen)",
    cats: [
      { title: "🦌 Grof wild", big: true, sp: [
        { emoji:"🦌", nom:"Edelhert", latin:"Cervus elaphus", poids:"120–250 kg", w:"Hinde & kalf: 1 aug → 31 dec · Hert met gewei: 1 okt → 31 dec (erkende wildbeheereenheden)", f:"Hert: 1 okt → 31 dec (afschotplan) · Hindes/kalveren: 1 okt → 31 jan" },
        { emoji:"🫎", nom:"Ree", latin:"Capreolus capreolus", poids:"15–35 kg", w:"Reebok: 15 apr→15 mei & 15 jul→15 aug (bersjacht/aanzit) · Drijfjacht: 1 okt→31 dec · Geit/kalf: 1 okt→31 dec", f:"Reebok: 1 mei → 14 sep · Geit & kalf: 1 jan → 31 mrt" },
        { emoji:"🐗", nom:"Wild zwijn", latin:"Sus scrofa", poids:"50–200 kg", w:"Hele jaar aanzit/bersjacht · Drijfjacht: 1 okt→31 jan", f:"Wild zwijn: 1 jan → 14 jul & 1 aug → 31 dec" },
        { emoji:"🦌", nom:"Damhert", latin:"Dama dama", poids:"40–100 kg", w:"Seizoen volgens lokaal afschotplan · 1 okt→31 dec", f:"Damhert: 1 okt → 31 dec (afschotplan)" },
        { emoji:"🐏", nom:"Moeflon", latin:"Ovis gmelini musimon", poids:"25–50 kg", w:"1 okt→31 dec · Enkel in erkende gebieden", f:"Moeflon: 1 okt → 31 dec (afschotplan)" },
      ]},
      { title: "🐇 Klein wild", sp: [
        { emoji:"🐇", nom:"Haas", w:"01/10 → 31/12 (enkel erkende WBE)", f:"Haas: 15 okt → 31 dec (enkel erkend gebied)" },
        { emoji:"🦚", nom:"Fazant", w:"01/10 → 31/01 (haan en hen — alle gebieden)", f:"Haan: 15 okt → 31 jan · Hen: 15 okt → 31 dec" },
        { emoji:"🐦", nom:"Patrijs", w:"20/09 → 15/11 (erkende WBE + verplicht beheerplan)", f:"Patrijs: 15 sep → 14 nov (erkend gebied + verplicht protocol)" },
        { emoji:"🪶", nom:"Houtsnip", w:"01/11 → 15/01 — aanzit toegestaan 1u voor zonsopgang/1u na zonsondergang", f:"⚠️ Geen officieel seizoen in Vlaanderen" },
      ]},
      { title: "🦆 Watervogels", leadBan: true, sp: [
        { emoji:"🪿", nom:"Canadese gans", w:"01/08 → 10/03 — lokfluiten/lokkers toegestaan", f:"Canadese gans: 15 aug → 31 mrt" },
        { emoji:"🦆", nom:"Wilde eend", w:"01/09 → 15/01 — lokfluiten/lokkers toegestaan", f:"Wilde eend: 15 aug → 31 jan" },
        { emoji:"🐦", nom:"Meerkoet", w:"15/10 → 31/01 — handel verboden", f:"Meerkoet: data niet vastgelegd" },
      ]},
      { title: "🐰 Overig wild", sp: [
        { emoji:"🐰", nom:"Konijn", w:"01/10 → 31/01 — buidels en fret toegestaan", f:"Konijn: 15 aug → 28 feb" },
        { emoji:"🦊", nom:"Vos", w:"01/07 → 30/06 (aanzit/bersjacht) · 01/08 → 29/02 (drijvende hond) · Lokmiddelen toegestaan", f:"Vos: 15 okt → 28 feb" },
        { emoji:"🕊️", nom:"Houtduif", w:"20/10 → 29/02 — lokfluiten/lokkers/lokvogels toegestaan", f:"Houtduif: 15 sep → 28 feb" },
      ]},
    ],
  },
  de: {
    intro: "Jagdbare Arten in Belgien — offizielle Jagdzeiten 2025-2030 (Quelle: chasse.be / natuurenbos.vlaanderen.be).",
    regionW: "Wallonien", regionF: "Flandern", wLabel: "W:", fLabel: "F:",
    leadTag: "⚠️ BLEI VERBOTEN",
    leadText: "Bleihaltige Munition ist in und im Umkreis von 100 m um Feuchtgebiete in Wallonien verboten. Verwenden Sie bleifreie Munition (✓) für jeden Schuss im Feuchtgebiet.",
    footnote: "Richtwerte — Jagdzeiten 2025-2030 · Prüfen Sie stets die geltenden Öffnungszeiten auf chasse.be (Wallonien) oder natuurenbos.vlaanderen.be (Flandern)",
    cats: [
      { title: "🦌 Schalenwild", big: true, sp: [
        { emoji:"🦌", nom:"Rothirsch", latin:"Cervus elaphus", poids:"120–250 kg", w:"Tier & Kalb: 1. Aug → 31. Dez · Geweihträger: 1. Okt → 31. Dez (anerkannte Hegegemeinschaften)", f:"Hirsch: 1. Okt → 31. Dez (Abschussplan) · Tiere/Kälber: 1. Okt → 31. Jan" },
        { emoji:"🫎", nom:"Reh", latin:"Capreolus capreolus", poids:"15–35 kg", w:"Rehbock: 15. Apr→15. Mai & 15. Jul→15. Aug (Pirsch/Ansitz) · Drückjagd: 1. Okt→31. Dez · Ricke/Kitz: 1. Okt→31. Dez", f:"Rehbock: 1. Mai → 14. Sep · Ricke & Kitz: 1. Jan → 31. Mär" },
        { emoji:"🐗", nom:"Wildschwein", latin:"Sus scrofa", poids:"50–200 kg", w:"Ganzjährig Ansitz/Pirsch · Drückjagd: 1. Okt→31. Jan", f:"Wildschwein: 1. Jan → 14. Jul & 1. Aug → 31. Dez" },
        { emoji:"🦌", nom:"Damhirsch", latin:"Dama dama", poids:"40–100 kg", w:"Saison nach lokalem Abschussplan · 1. Okt→31. Dez", f:"Damhirsch: 1. Okt → 31. Dez (Abschussplan)" },
        { emoji:"🐏", nom:"Mufflon", latin:"Ovis gmelini musimon", poids:"25–50 kg", w:"1. Okt→31. Dez · Nur in anerkannten Revieren", f:"Mufflon: 1. Okt → 31. Dez (Abschussplan)" },
      ]},
      { title: "🐇 Niederwild", sp: [
        { emoji:"🐇", nom:"Feldhase", w:"01.10 → 31.12 (nur anerkannte HG)", f:"Hase: 15. Okt → 31. Dez (nur anerkanntes Revier)" },
        { emoji:"🦚", nom:"Fasan", w:"01.10 → 31.01 (Hahn und Henne — alle Reviere)", f:"Hahn: 15. Okt → 31. Jan · Henne: 15. Okt → 31. Dez" },
        { emoji:"🐦", nom:"Rebhuhn", w:"20.09 → 15.11 (anerkannte HG + Pflicht-Bewirtschaftungsplan)", f:"Rebhuhn: 15. Sep → 14. Nov (anerkanntes Revier + Pflichtprotokoll)" },
        { emoji:"🪶", nom:"Waldschnepfe", w:"01.11 → 15.01 — Ansitz erlaubt 1 Std vor Sonnenaufgang/1 Std nach Sonnenuntergang", f:"⚠️ Keine offizielle Saison in Flandern" },
      ]},
      { title: "🦆 Wasserwild", leadBan: true, sp: [
        { emoji:"🪿", nom:"Kanadagans", w:"01.08 → 10.03 — Lockmittel/Lockbilder erlaubt", f:"Kanadagans: 15. Aug → 31. Mär" },
        { emoji:"🦆", nom:"Stockente", w:"01.09 → 15.01 — Lockmittel/Lockbilder erlaubt", f:"Stockente: 15. Aug → 31. Jan" },
        { emoji:"🐦", nom:"Blässhuhn", w:"15.10 → 31.01 — Vermarktung verboten", f:"Blässhuhn: Daten nicht festgelegt" },
      ]},
      { title: "🐰 Sonstiges Wild", sp: [
        { emoji:"🐰", nom:"Wildkaninchen", w:"01.10 → 31.01 — Netze und Frettchen erlaubt", f:"Kaninchen: 15. Aug → 28. Feb" },
        { emoji:"🦊", nom:"Rotfuchs", w:"01.07 → 30.06 (Ansitz/Pirsch) · 01.08 → 29.02 (Brackieren) · Lockmittel erlaubt", f:"Fuchs: 15. Okt → 28. Feb" },
        { emoji:"🕊️", nom:"Ringeltaube", w:"20.10 → 29.02 — Lockmittel/Lockbilder/Lockvögel erlaubt", f:"Ringeltaube: 15. Sep → 28. Feb" },
      ]},
    ],
  },
  en: {
    intro: "Huntable species in Belgium — official seasons 2025-2030 (source: chasse.be / natuurenbos.vlaanderen.be).",
    regionW: "Wallonia", regionF: "Flanders", wLabel: "W:", fLabel: "F:",
    leadTag: "⚠️ LEAD PROHIBITED",
    leadText: "Lead ammunition is prohibited in and within 100 m of wetlands in Wallonia. Use lead-free ammunition (✓) for any shot in wetland areas.",
    footnote: "Indicative data — Seasons 2025-2030 · Always check the current open seasons on chasse.be (Wallonia) or natuurenbos.vlaanderen.be (Flanders)",
    cats: [
      { title: "🦌 Big game", big: true, sp: [
        { emoji:"🦌", nom:"Red deer", latin:"Cervus elaphus", poids:"120–250 kg", w:"Hind & calf: 1 Aug → 31 Dec · Antlered stag: 1 Oct → 31 Dec (approved game management units)", f:"Stag: 1 Oct → 31 Dec (culling plan) · Hinds/calves: 1 Oct → 31 Jan" },
        { emoji:"🫎", nom:"Roe deer", latin:"Capreolus capreolus", poids:"15–35 kg", w:"Roebuck: 15 Apr→15 May & 15 Jul→15 Aug (stalking/stand) · Driven hunt: 1 Oct→31 Dec · Doe/fawn: 1 Oct→31 Dec", f:"Roebuck: 1 May → 14 Sep · Doe & fawn: 1 Jan → 31 Mar" },
        { emoji:"🐗", nom:"Wild boar", latin:"Sus scrofa", poids:"50–200 kg", w:"Year-round stand/stalking · Driven hunt: 1 Oct→31 Jan", f:"Wild boar: 1 Jan → 14 Jul & 1 Aug → 31 Dec" },
        { emoji:"🦌", nom:"Fallow deer", latin:"Dama dama", poids:"40–100 kg", w:"Season set by local culling plan · 1 Oct→31 Dec", f:"Fallow deer: 1 Oct → 31 Dec (culling plan)" },
        { emoji:"🐏", nom:"Mouflon", latin:"Ovis gmelini musimon", poids:"25–50 kg", w:"1 Oct→31 Dec · Approved territories only", f:"Mouflon: 1 Oct → 31 Dec (culling plan)" },
      ]},
      { title: "🐇 Small game", sp: [
        { emoji:"🐇", nom:"Brown hare", w:"01/10 → 31/12 (approved GMU only)", f:"Hare: 15 Oct → 31 Dec (approved territory only)" },
        { emoji:"🦚", nom:"Pheasant", w:"01/10 → 31/01 (cock and hen — all territories)", f:"Cock: 15 Oct → 31 Jan · Hen: 15 Oct → 31 Dec" },
        { emoji:"🐦", nom:"Grey partridge", w:"20/09 → 15/11 (approved GMU + mandatory management plan)", f:"Partridge: 15 Sep → 14 Nov (approved territory + mandatory protocol)" },
        { emoji:"🪶", nom:"Woodcock", w:"01/11 → 15/01 — stand allowed 1h before sunrise/1h after sunset", f:"⚠️ No official season in Flanders" },
      ]},
      { title: "🦆 Waterfowl", leadBan: true, sp: [
        { emoji:"🪿", nom:"Canada goose", w:"01/08 → 10/03 — calls/decoys allowed", f:"Canada goose: 15 Aug → 31 Mar" },
        { emoji:"🦆", nom:"Mallard", w:"01/09 → 15/01 — calls/decoys allowed", f:"Mallard: 15 Aug → 31 Jan" },
        { emoji:"🐦", nom:"Eurasian coot", w:"15/10 → 31/01 — sale prohibited", f:"Coot: dates not set" },
      ]},
      { title: "🐰 Other game", sp: [
        { emoji:"🐰", nom:"Rabbit", w:"01/10 → 31/01 — purse-nets and ferret allowed", f:"Rabbit: 15 Aug → 28 Feb" },
        { emoji:"🦊", nom:"Red fox", w:"01/07 → 30/06 (stand/stalking) · 01/08 → 29/02 (hound) · Calls allowed", f:"Fox: 15 Oct → 28 Feb" },
        { emoji:"🕊️", nom:"Wood pigeon", w:"20/10 → 29/02 — calls/decoys/live decoys allowed", f:"Wood pigeon: 15 Sep → 28 Feb" },
      ]},
    ],
  },
};

// Traductions des espèces et catégories (dérivées de GIBIER_I18N — le français reste la clé/valeur stockée)
const SPECIES_LABELS = (() => {
  const m = { "Autre": { fr:"Autre", nl:"Andere", de:"Andere", en:"Other" } };
  GIBIER_I18N.fr.cats.forEach((cat, ci) => cat.sp.forEach((sp, si) => {
    m[sp.nom] = { fr: sp.nom, nl: GIBIER_I18N.nl.cats[ci].sp[si].nom, de: GIBIER_I18N.de.cats[ci].sp[si].nom, en: GIBIER_I18N.en.cats[ci].sp[si].nom };
  }));
  return m;
})();
const CAT_WORDS = (() => {
  const strip = t => t.replace(/^\S+\s/, "");
  const m = {};
  GIBIER_I18N.fr.cats.forEach((cat, ci) => {
    m[strip(cat.title)] = { fr: strip(cat.title), nl: strip(GIBIER_I18N.nl.cats[ci].title), de: strip(GIBIER_I18N.de.cats[ci].title), en: strip(GIBIER_I18N.en.cats[ci].title) };
  });
  return m;
})();
const spLabel = (fr, lang) => (SPECIES_LABELS[fr] && SPECIES_LABELS[fr][lang]) || fr;
const catLabel = (frTitle, lang) => {
  const mm = frTitle.match(/^(\S+)\s(.*)$/);
  if (!mm) return frTitle;
  const t = CAT_WORDS[mm[2]];
  return t ? mm[1] + " " + t[lang] : frTitle;
};

// ─── TRADUCTIONS CARNET (FR / NL / DE / EN) ──────────────────────────────────
const CARNET_I18N = {
  fr: {
    gateTitle:"Carnet de chasse numérique",
    gateDesc:"Notez chaque prise, suivez vos statistiques saison par saison. Fonctionnalité Premium.",
    title:"📖 Carnet de chasse", season:"Saison", take:"prise", takes:"prises", newTake:"+ Nouvelle prise",
    backupWarn:"Vos données sont sauvegardées sur cet appareil uniquement. Si vous changez d'appareil ou videz votre navigateur, elles seront perdues. Synchronisation cloud bientôt disponible (Premium+).",
    viewList:"📋 Liste", viewStats:"📊 Stats", reportBtn:"🖨️ Rapport de saison PDF", reportTitle:"Rapport de saison de chasse", reportGenerated:"Généré le",
    formNew:"➕ Nouvelle prise", formEdit:"✏️ Modifier la prise",
    fields:{ date:"Date", espece:"Espèce *", sexe:"Sexe", calibre:"Calibre", munition:"Munition", distance:"Distance de tir (m)", distanceFuite:"Distance de fuite (m)", poids:"Poids animal (kg)", tir:"Type de chasse", meteo:"Météo", lieu:"Lieu / Territoire", nbTirs:"Nombre de tirs", emotion:"Émotion ressentie", difficulte:"Difficulté du tir", notes:"Notes" },
    emotionLow:"Calme", emotionHigh:"Survolté", plombPrefix:"Plomb", balle:"Balle", plombMax3:"Jusqu'à 3 numéros de plomb.", photos:"Photos", photoMax3:"Maximum 3 photos par prise.", photoRemove:"Supprimer la photo", photoErrFormat:"Format non supporté — utilisez une photo (JPG, PNG).", photoErrSize:"Fichier trop volumineux — maximum 20 Mo.", diffLow:"Très facile", diffHigh:"Quel tir !",
    notesPlaceholder:"Observations, détails du tir...", save:"💾 Enregistrer", cancel:"Annuler", saveErr:"Espace de stockage plein sur cet appareil. Supprimez une entrée ou un document existant avant d'enregistrer.",
    empty:"Aucune prise enregistrée pour la saison", confirm:"Confirmer", flee:"fuite", shot:"tir", shots:"tirs", diff:"Diff.",
    takesSeasonStat:"Prises saison", bySpecies:"Par espèce", byCaliber:"Par calibre", avgDist:"Distance moy.", avgWeight:"Poids moy.", noData:"Aucune donnée pour cette saison.",
    optSexe:{ "Mâle":"Mâle", "Femelle":"Femelle", "Indéterminé":"Indéterminé" },
   
  },
  nl: {
    gateTitle:"Digitaal jachtlogboek",
    gateDesc:"Noteer elk stuk, volg je statistieken seizoen per seizoen. Premium-functie.",
    title:"📖 Jachtlogboek", season:"Seizoen", take:"stuk", takes:"stukken", newTake:"+ Nieuw stuk",
    backupWarn:"Je gegevens worden enkel op dit toestel opgeslagen. Als je van toestel verandert of je browser wist, gaan ze verloren. Cloudsynchronisatie binnenkort beschikbaar (Premium+).",
    viewList:"📋 Lijst", viewStats:"📊 Stats", reportBtn:"🖨️ PDF-seizoensrapport", reportTitle:"Jachtseizoen rapport", reportGenerated:"Gegenereerd op",
    formNew:"➕ Nieuw stuk", formEdit:"✏️ Stuk bewerken",
    fields:{ date:"Datum", espece:"Soort *", sexe:"Geslacht", calibre:"Kaliber", munition:"Munitie", distance:"Schotafstand (m)", distanceFuite:"Vluchtafstand (m)", poids:"Gewicht dier (kg)", tir:"Type jacht", meteo:"Weer", lieu:"Plaats / Gebied", nbTirs:"Aantal schoten", emotion:"Beleefde emotie", difficulte:"Moeilijkheid van het schot", notes:"Notities" },
    emotionLow:"Kalm", emotionHigh:"Opgewonden", plombPrefix:"Lood", balle:"Kogel", plombMax3:"Tot 3 loodnummers.", photos:"Foto's", photoMax3:"Maximaal 3 foto's per vangst.", photoRemove:"Foto verwijderen", photoErrFormat:"Formaat niet ondersteund — gebruik een foto (JPG, PNG).", photoErrSize:"Bestand te groot — maximaal 20 MB.", diffLow:"Heel makkelijk", diffHigh:"Wat een schot!",
    notesPlaceholder:"Observaties, details van het schot...", save:"💾 Opslaan", cancel:"Annuleren", saveErr:"Opslagruimte vol op dit toestel. Verwijder een bestaande vangst of document voordat u opslaat.",
    empty:"Geen stuk geregistreerd voor seizoen", confirm:"Bevestigen", flee:"vlucht", shot:"schot", shots:"schoten", diff:"Moeil.",
    takesSeasonStat:"Stukken seizoen", bySpecies:"Per soort", byCaliber:"Per kaliber", avgDist:"Gem. afstand", avgWeight:"Gem. gewicht", noData:"Geen gegevens voor dit seizoen.",
    optSexe:{ "Mâle":"Mannelijk", "Femelle":"Vrouwelijk", "Indéterminé":"Onbepaald" },
   
  },
  de: {
    gateTitle:"Digitales Jagdbuch",
    gateDesc:"Erfassen Sie jede Erlegung, verfolgen Sie Ihre Statistiken Saison für Saison. Premium-Funktion.",
    title:"📖 Jagdbuch", season:"Saison", take:"Stück", takes:"Stück", newTake:"+ Neue Erlegung",
    backupWarn:"Ihre Daten werden nur auf diesem Gerät gespeichert. Wenn Sie das Gerät wechseln oder den Browser leeren, gehen sie verloren. Cloud-Synchronisierung bald verfügbar (Premium+).",
    viewList:"📋 Liste", viewStats:"📊 Statistik", reportBtn:"🖨️ Saisonbericht PDF", reportTitle:"Jagdsaison-Bericht", reportGenerated:"Erstellt am",
    formNew:"➕ Neue Erlegung", formEdit:"✏️ Erlegung bearbeiten",
    fields:{ date:"Datum", espece:"Art *", sexe:"Geschlecht", calibre:"Kaliber", munition:"Munition", distance:"Schussentfernung (m)", distanceFuite:"Fluchtdistanz (m)", poids:"Gewicht Tier (kg)", tir:"Jagdart", meteo:"Wetter", lieu:"Ort / Revier", nbTirs:"Anzahl Schüsse", emotion:"Empfundene Emotion", difficulte:"Schwierigkeit des Schusses", notes:"Notizen" },
    emotionLow:"Ruhig", emotionHigh:"Aufgedreht", plombPrefix:"Schrot", balle:"Flintenlaufgeschoss", plombMax3:"Bis zu 3 Schrotgrößen.", photos:"Fotos", photoMax3:"Maximal 3 Fotos pro Abschuss.", photoRemove:"Foto löschen", photoErrFormat:"Format nicht unterstützt — verwende ein Foto (JPG, PNG).", photoErrSize:"Datei zu groß — maximal 20 MB.", diffLow:"Sehr leicht", diffHigh:"Was für ein Schuss!",
    notesPlaceholder:"Beobachtungen, Details zum Schuss...", save:"💾 Speichern", cancel:"Abbrechen", saveErr:"Speicherplatz auf diesem Gerät voll. Löschen Sie einen vorhandenen Abschuss oder ein Dokument, bevor Sie speichern.",
    empty:"Keine Erlegung erfasst für Saison", confirm:"Bestätigen", flee:"Flucht", shot:"Schuss", shots:"Schüsse", diff:"Schwier.",
    takesSeasonStat:"Erlegungen Saison", bySpecies:"Nach Art", byCaliber:"Nach Kaliber", avgDist:"Ø Entfernung", avgWeight:"Ø Gewicht", noData:"Keine Daten für diese Saison.",
    optSexe:{ "Mâle":"Männlich", "Femelle":"Weiblich", "Indéterminé":"Unbestimmt" },
   
  },
  en: {
    gateTitle:"Digital hunting logbook",
    gateDesc:"Record every harvest, track your statistics season by season. Premium feature.",
    title:"📖 Hunting logbook", season:"Season", take:"entry", takes:"entries", newTake:"+ New entry",
    backupWarn:"Your data is saved on this device only. If you change device or clear your browser, it will be lost. Cloud sync coming soon (Premium+).",
    viewList:"📋 List", viewStats:"📊 Stats", reportBtn:"🖨️ Season report PDF", reportTitle:"Hunting season report", reportGenerated:"Generated on",
    formNew:"➕ New entry", formEdit:"✏️ Edit entry",
    fields:{ date:"Date", espece:"Species *", sexe:"Sex", calibre:"Caliber", munition:"Ammunition", distance:"Shot distance (m)", distanceFuite:"Flight distance (m)", poids:"Animal weight (kg)", tir:"Hunt type", meteo:"Weather", lieu:"Location / Territory", nbTirs:"Number of shots", emotion:"Emotion felt", difficulte:"Shot difficulty", notes:"Notes" },
    emotionLow:"Calm", emotionHigh:"Wired", plombPrefix:"Shot", balle:"Slug", plombMax3:"Up to 3 shot sizes.", photos:"Photos", photoMax3:"Maximum 3 photos per entry.", photoRemove:"Remove photo", photoErrFormat:"Unsupported format — use a photo (JPG, PNG).", photoErrSize:"File too large — maximum 20 MB.", diffLow:"Very easy", diffHigh:"What a shot!",
    notesPlaceholder:"Observations, shot details...", save:"💾 Save", cancel:"Cancel", saveErr:"Storage full on this device. Delete an existing entry or document before saving.",
    empty:"No entry recorded for season", confirm:"Confirm", flee:"flight", shot:"shot", shots:"shots", diff:"Diff.",
    takesSeasonStat:"Entries season", bySpecies:"By species", byCaliber:"By caliber", avgDist:"Avg. distance", avgWeight:"Avg. weight", noData:"No data for this season.",
    optSexe:{ "Mâle":"Male", "Femelle":"Female", "Indéterminé":"Undetermined" },
   
  },
};

const OPT_LABELS = (() => {
  const m = {};
  ["optSexe"].forEach(set => Object.keys(CARNET_I18N.fr[set]).forEach(fr => {
    m[fr] = { fr, nl: CARNET_I18N.nl[set][fr], de: CARNET_I18N.de[set][fr], en: CARNET_I18N.en[set][fr] };
  }));
  return m;
})();
const optLabel = (fr, lang) => (OPT_LABELS[fr] && OPT_LABELS[fr][lang]) || fr;

// ─── TRADUCTIONS COFFRE (FR / NL / DE / EN) ──────────────────────────────────
const COFFRE_I18N = {
  fr: {
    intro:"Stockez ici les photos ou PDFs de vos documents importants. Accessibles hors-ligne, stockés uniquement sur votre appareil.",
    banner:"Vos documents sont sauvegardés sur cet appareil uniquement. Si vous changez d'appareil ou videz votre navigateur, ils seront perdus. Synchronisation cloud bientôt disponible (Premium+).",
    view:"👁 Voir", replace:"Remplacer", confirm:"Confirmer", add:"+ Ajouter", close:"✕ Fermer", gateTitle:"Coffre-fort numérique", gateDesc:"Stockez vos documents de chasse en lieu sûr : permis, assurance, certificats. Fonctionnalité Premium.",
    docsTab:"Documents", equipTab:"Équipement", catArmes:"Armes", catMunition:"Munition", catOptique:"Optique", catAutres:"Autres", equipNomPlaceholder:"Marque et modèle", equipDetailCalibre:"Calibre", equipDetailGrossissement:"Grossissement", equipAutresPlaceholder:"Nom ou description", equipEmpty:"Aucun équipement enregistré dans cette catégorie.",
    docs:{
      carte_id:{ label:"Carte d'identité", desc:"Recto / Verso" },
      permis_chasse:{ label:"Permis de chasse", desc:"Permis annuel wallon / flamand" },
      assurance:{ label:"Assurance de chasse", desc:"Attestation en cours de validité" },
      carte_eu:{ label:"Carte européenne d'arme à feu", desc:"European Firearms Pass" },
      certificat:{ label:"Certificat médical", desc:"Aptitude au port d'arme" },
    },
  },
  nl: {
    intro:"Bewaar hier de foto's of PDF's van je belangrijke documenten. Offline beschikbaar, enkel op je toestel opgeslagen.",
    banner:"Je documenten worden enkel op dit toestel opgeslagen. Als je van toestel verandert of je browser wist, gaan ze verloren. Cloudsynchronisatie binnenkort beschikbaar (Premium+).",
    view:"👁 Bekijken", replace:"Vervangen", confirm:"Bevestigen", add:"+ Toevoegen", close:"✕ Sluiten", gateTitle:"Digitale kluis", gateDesc:"Bewaar je jachtdocumenten veilig: jachtverlof, verzekering, certificaten. Premium-functie.",
    docsTab:"Documenten", equipTab:"Uitrusting", catArmes:"Wapens", catMunition:"Munitie", catOptique:"Optiek", catAutres:"Overige", equipNomPlaceholder:"Merk en model", equipDetailCalibre:"Kaliber", equipDetailGrossissement:"Vergroting", equipAutresPlaceholder:"Naam of omschrijving", equipEmpty:"Geen uitrusting geregistreerd in deze categorie.",
    docs:{
      carte_id:{ label:"Identiteitskaart", desc:"Voorzijde / Achterzijde" },
      permis_chasse:{ label:"Jachtverlof", desc:"Jaarlijks Waals / Vlaams verlof" },
      assurance:{ label:"Jachtverzekering", desc:"Geldig attest" },
      carte_eu:{ label:"Europese vuurwapenpas", desc:"European Firearms Pass" },
      certificat:{ label:"Medisch attest", desc:"Geschiktheid om wapen te dragen" },
    },
  },
  de: {
    intro:"Speichern Sie hier Fotos oder PDFs Ihrer wichtigen Dokumente. Offline verfügbar, nur auf Ihrem Gerät gespeichert.",
    banner:"Ihre Dokumente werden nur auf diesem Gerät gespeichert. Wenn Sie das Gerät wechseln oder den Browser leeren, gehen sie verloren. Cloud-Synchronisierung bald verfügbar (Premium+).",
    view:"👁 Ansehen", replace:"Ersetzen", confirm:"Bestätigen", add:"+ Hinzufügen", close:"✕ Schließen", gateTitle:"Digitaler Tresor", gateDesc:"Bewahren Sie Ihre Jagddokumente sicher auf: Jagdschein, Versicherung, Bescheinigungen. Premium-Funktion.",
    docsTab:"Dokumente", equipTab:"Ausrüstung", catArmes:"Waffen", catMunition:"Munition", catOptique:"Optik", catAutres:"Sonstiges", equipNomPlaceholder:"Marke und Modell", equipDetailCalibre:"Kaliber", equipDetailGrossissement:"Vergrößerung", equipAutresPlaceholder:"Name oder Beschreibung", equipEmpty:"Keine Ausrüstung in dieser Kategorie erfasst.",
    docs:{
      carte_id:{ label:"Personalausweis", desc:"Vorderseite / Rückseite" },
      permis_chasse:{ label:"Jagdschein", desc:"Jährlicher wallonischer / flämischer Schein" },
      assurance:{ label:"Jagdversicherung", desc:"Gültige Bescheinigung" },
      carte_eu:{ label:"Europäischer Feuerwaffenpass", desc:"European Firearms Pass" },
      certificat:{ label:"Ärztliches Attest", desc:"Tauglichkeit zum Waffentragen" },
    },
  },
  en: {
    intro:"Store photos or PDFs of your important documents here. Available offline, stored only on your device.",
    banner:"Your documents are saved on this device only. If you change device or clear your browser, they will be lost. Cloud sync coming soon (Premium+).",
    view:"👁 View", replace:"Replace", confirm:"Confirm", add:"+ Add", close:"✕ Close", gateTitle:"Digital safe", gateDesc:"Store your hunting documents securely: licence, insurance, certificates. Premium feature.",
    docsTab:"Documents", equipTab:"Equipment", catArmes:"Weapons", catMunition:"Ammunition", catOptique:"Optics", catAutres:"Other", equipNomPlaceholder:"Brand and model", equipDetailCalibre:"Caliber", equipDetailGrossissement:"Magnification", equipAutresPlaceholder:"Name or description", equipEmpty:"No equipment recorded in this category.",
    docs:{
      carte_id:{ label:"ID card", desc:"Front / Back" },
      permis_chasse:{ label:"Hunting license", desc:"Annual Walloon / Flemish license" },
      assurance:{ label:"Hunting insurance", desc:"Valid certificate" },
      carte_eu:{ label:"European Firearms Pass", desc:"European Firearms Pass" },
      certificat:{ label:"Medical certificate", desc:"Fitness to carry a weapon" },
    },
  },
};

// ─── TRADUCTIONS UI DIVERSES (FR / NL / DE / EN) ─────────────────────────────
const UIX_I18N = {
  fr: {
    calibreFusil:"Calibre du fusil *", chambres:"Chambres compatibles :",
    carbineRedirect:"Ce gibier est généralement chassé à la carabine. Consultez l'onglet carabine pour les recommandations de munitions.",
    plombsRec:"Plombs recommandés", chargeConseil:"Charge conseillée",
    leadFreeToggle:"🌿 Sans plomb 🌿",
    addGame:"— Ajouter un gibier (jusqu'à 5) —", clearAll:"Effacer tout", munOptional:"Munition (optionnel)", upTo5:"jusqu'à 5", munition:"Munition", calRec:"Calibres recommandés", calibreStar:"Calibre *", calibreLabel:"Calibre", distanceM:"Distance (m)", wetlandMandatory:"Obligatoire zones humides", atDist:"à", modeDescBattue:"Ogives à expansion rapide — choc et arrêt immédiats pour la battue", modeDescAffut:"Ogives longue portée — expansion progressive et haute rétention de masse", modeDescPoly:"Ogives polyvalentes — efficaces sur toutes distances", moreChoicesBtn:"🤖 Choix supplémentaires & conseil IA approfondi", deepAdviceBtn:"🤖 Conseil IA approfondi", federal:"Fédéral", notApplicable:"— Non applicable —", modeCarabine:"🔫 Carabine", modeFusil:"🦆 Fusil", modeComparer:"📊 Comparer", opusAnalysis:"Assistant IA sur Claude Opus — analyse approfondie", sonnetAnalysis:"Assistant IA sur Claude Sonnet", upgradeNudge:"Envie de réponses plus poussées et de 150 crédits/mois ? Passe à Premium+ →", creditsLabel:"crédits IA / mois (toutes fonctions confondues)", quotaMsgPrefix:"⚠️ Limite mensuelle de ", quotaMsgSuffix:" crédits IA atteinte (toutes fonctions IA confondues : Assistant, Conseil calibre, Conseil munition). Elle se renouvelle automatiquement le 1er du mois.", premiumPlusBtn:"Passer Premium+", examplesTitle:"Quelques exemples de questions :", suggestion:"Suggestion", coffreErrFormat:"Format non supporté — utilisez une photo (JPG, PNG) ou un PDF.", coffreErrSize:"Fichier trop volumineux — maximum 10 MB.", coffreErrStorage:"Espace de stockage plein sur cet appareil. Supprimez un document existant avant d'en ajouter un nouveau.", leadFreeShort:"🌿 Sans plomb", leadShort:"Plomb", compareIntro:"Compare la trajectoire de plusieurs munitions du même calibre.", compareMax3:"Jusqu'à 3 munitions.", compareMax4:"Jusqu'à 4 munitions.", compareFree:"Version gratuite : 2 munitions (3 en Premium).", chartLegend:"Valeurs en cm vs ligne de visée", chartDelta:" · Δ = écart entre les deux", fusilRec:"🔫 Fusils recommandés", aiDeepBtn:"🤖 Analyse IA approfondie — conseil personnalisé", clearConv:"✕ Effacer la conversation", aiTimeout:"La requête a expiré (30 s). Vérifie ta connexion et réessaie.", aiOffline:"Connexion impossible. Vérifie ta connexion internet.", coffreErrRead:"Impossible de lire ce fichier. Il est peut-être endommagé — réessaie avec un autre.", favorisGroup:"Favoris", favorisAdd:"Ajouter aux favoris", favorisRemove:"Retirer des favoris", favorisWarn:"Munition en favoris, stockées sur cet appareil uniquement, comme le Coffre et le Carnet.", selected:"sélectionné", droCompLabel:"Distance de réglage (DRO)", compSelectOne:"Sélectionne au moins une munition pour voir sa trajectoire.",
    errorPrefix:"❌ Erreur: ", tuneTitle:"🎯 Réglage recommandé",
    impPre:"À ", impMid:", le point d'impact sera ", above:"au-dessus", below:"en-dessous", fromCenter:"du centre.",
    droPre:"À ta DRO de ", droMid:" : point d'impact = ",
  },
  nl: {
    calibreFusil:"Kaliber van het geweer *", chambres:"Compatibele kamers:",
    carbineRedirect:"Dit wild wordt doorgaans met de kogel bejaagd. Raadpleeg het tabblad kogel voor munitieaanbevelingen.",
    plombsRec:"Aanbevolen hagel", chargeConseil:"Aanbevolen lading",
    leadFreeToggle:"🌿 Loodvrij 🌿",
    addGame:"— Wild toevoegen (tot 5) —", clearAll:"Alles wissen", munOptional:"Munitie (optioneel)", upTo5:"tot 5", munition:"Munitie", calRec:"Aanbevolen kalibers", calibreStar:"Kaliber *", calibreLabel:"Kaliber", distanceM:"Afstand (m)", wetlandMandatory:"Verplicht in waterrijk gebied", atDist:"op", modeDescBattue:"Kogels met snelle expansie — onmiddellijke schok en stop voor de drijfjacht", modeDescAffut:"Kogels voor lange afstand — geleidelijke expansie en hoog massabehoud", modeDescPoly:"Veelzijdige kogels — doeltreffend op alle afstanden", moreChoicesBtn:"🤖 Extra keuzes & uitgebreid AI-advies", deepAdviceBtn:"🤖 Uitgebreid AI-advies", federal:"Federaal", notApplicable:"— Niet van toepassing —", modeCarabine:"🔫 Geweer", modeFusil:"🦆 Hagelgeweer", modeComparer:"📊 Vergelijken", opusAnalysis:"AI-assistent op Claude Opus — uitgebreide analyse", sonnetAnalysis:"AI-assistent op Claude Sonnet", upgradeNudge:"Zin in diepgaandere antwoorden en 150 credits/maand? Upgrade naar Premium+ →", creditsLabel:"AI-credits / maand (alle functies samen)", quotaMsgPrefix:"⚠️ Maandelijkse limiet van ", quotaMsgSuffix:" AI-credits bereikt (alle AI-functies samen: Assistent, Kaliberadvies, Munitieadvies). Wordt automatisch hersteld op de 1e van de maand.", premiumPlusBtn:"Naar Premium+", examplesTitle:"Enkele voorbeeldvragen:", suggestion:"Suggestie", coffreErrFormat:"Niet-ondersteund formaat — gebruik een foto (JPG, PNG) of een PDF.", coffreErrSize:"Bestand te groot — maximaal 10 MB.", coffreErrStorage:"Opslagruimte vol op dit apparaat. Verwijder een bestaand document voordat u een nieuw toevoegt.", leadFreeShort:"🌿 Loodvrij", leadShort:"Lood", compareIntro:"Vergelijk de kogelbaan van meerdere munities van hetzelfde kaliber.", compareMax3:"Tot 3 munities.", compareMax4:"Tot 4 munities.", compareFree:"Gratis versie: 2 munities (3 in Premium).", chartLegend:"Waarden in cm t.o.v. vizierlijn", chartDelta:" · Δ = verschil tussen beide", fusilRec:"🔫 Aanbevolen geweren", aiDeepBtn:"🤖 Uitgebreide AI-analyse — persoonlijk advies", clearConv:"✕ Gesprek wissen", aiTimeout:"De aanvraag is verlopen (30 s). Controleer je verbinding en probeer opnieuw.", aiOffline:"Geen verbinding mogelijk. Controleer je internetverbinding.", coffreErrRead:"Dit bestand kan niet worden gelezen. Het is mogelijk beschadigd — probeer een ander.", favorisGroup:"Favorieten", favorisAdd:"Toevoegen aan favorieten", favorisRemove:"Verwijderen uit favorieten", favorisWarn:"Favoriete munitie, enkel op dit toestel opgeslagen, net als de Kluis en het Logboek.", selected:"geselecteerd", droCompLabel:"Instelafstand (DRO)", compSelectOne:"Selecteer minstens één munitie om de kogelbaan te zien.",
    errorPrefix:"❌ Fout: ", tuneTitle:"🎯 Aanbevolen afstelling",
    impPre:"Op ", impMid:", ligt het trefpunt ", above:"boven", below:"onder", fromCenter:"het centrum.",
    droPre:"Op je DRO van ", droMid:" : trefpunt = ",
  },
  de: {
    calibreFusil:"Kaliber der Flinte *", chambres:"Kompatible Patronenlager:",
    carbineRedirect:"Dieses Wild wird in der Regel mit der Büchse bejagt. Siehe Reiter Büchse für Munitionsempfehlungen.",
    plombsRec:"Empfohlener Schrot", chargeConseil:"Empfohlene Ladung",
    leadFreeToggle:"🌿 Bleifrei 🌿",
    addGame:"— Wild hinzufügen (bis zu 5) —", clearAll:"Alles löschen", munOptional:"Munition (optional)", upTo5:"bis zu 5", munition:"Munition", calRec:"Empfohlene Kaliber", calibreStar:"Kaliber *", calibreLabel:"Kaliber", distanceM:"Entfernung (m)", wetlandMandatory:"In Feuchtgebieten vorgeschrieben", atDist:"auf", modeDescBattue:"Geschosse mit schneller Expansion — sofortiger Schock und Stopp für die Drückjagd", modeDescAffut:"Geschosse für lange Distanz — progressive Expansion und hohe Masseerhaltung", modeDescPoly:"Vielseitige Geschosse — wirksam auf allen Distanzen", moreChoicesBtn:"🤖 Zusätzliche Optionen & vertiefte KI-Beratung", deepAdviceBtn:"🤖 Vertiefte KI-Beratung", federal:"Föderal", notApplicable:"— Nicht zutreffend —", modeCarabine:"🔫 Büchse", modeFusil:"🦆 Flinte", modeComparer:"📊 Vergleichen", opusAnalysis:"KI-Assistent auf Claude Opus — vertiefte Analyse", sonnetAnalysis:"KI-Assistent auf Claude Sonnet", upgradeNudge:"Lust auf tiefgründigere Antworten und 150 Credits/Monat? Wechsle zu Premium+ →", creditsLabel:"KI-Credits / Monat (alle Funktionen zusammen)", quotaMsgPrefix:"⚠️ Monatliches Limit von ", quotaMsgSuffix:" KI-Credits erreicht (alle KI-Funktionen zusammen: Assistent, Kaliberberatung, Munitionsberatung). Wird automatisch am 1. des Monats zurückgesetzt.", premiumPlusBtn:"Zu Premium+ wechseln", examplesTitle:"Einige Beispielfragen:", suggestion:"Vorschlag", coffreErrFormat:"Nicht unterstütztes Format — verwenden Sie ein Foto (JPG, PNG) oder ein PDF.", coffreErrSize:"Datei zu groß — maximal 10 MB.", coffreErrStorage:"Speicherplatz auf diesem Gerät voll. Löschen Sie ein vorhandenes Dokument, bevor Sie ein neues hinzufügen.", leadFreeShort:"🌿 Bleifrei", leadShort:"Blei", compareIntro:"Vergleicht die Flugbahn mehrerer Munitionen desselben Kalibers.", compareMax3:"Bis zu 3 Munitionen.", compareMax4:"Bis zu 4 Munitionen.", compareFree:"Kostenlose Version: 2 Munitionen (3 in Premium).", chartLegend:"Werte in cm zur Visierlinie", chartDelta:" · Δ = Differenz zwischen beiden", fusilRec:"🔫 Empfohlene Flinten", aiDeepBtn:"🤖 Vertiefte KI-Analyse — persönliche Beratung", clearConv:"✕ Unterhaltung löschen", aiTimeout:"Die Anfrage ist abgelaufen (30 s). Prüfe deine Verbindung und versuche es erneut.", aiOffline:"Keine Verbindung möglich. Prüfe deine Internetverbindung.", coffreErrRead:"Diese Datei kann nicht gelesen werden. Sie ist möglicherweise beschädigt — versuche eine andere.", favorisGroup:"Favoriten", favorisAdd:"Zu Favoriten hinzufügen", favorisRemove:"Aus Favoriten entfernen", favorisWarn:"Favorisierte Munition, nur auf diesem Gerät gespeichert, wie der Tresor und das Jagdbuch.", selected:"ausgewählt", droCompLabel:"Einschussentfernung (DRO)", compSelectOne:"Wähle mindestens eine Munition, um die Flugbahn zu sehen.",
    errorPrefix:"❌ Fehler: ", tuneTitle:"🎯 Empfohlene Einstellung",
    impPre:"Auf ", impMid:", liegt der Treffpunkt ", above:"über", below:"unter", fromCenter:"der Mitte.",
    droPre:"Bei deiner DRO von ", droMid:" : Treffpunkt = ",
  },
  en: {
    calibreFusil:"Shotgun caliber *", chambres:"Compatible chambers:",
    carbineRedirect:"This game is usually hunted with a rifle. See the rifle tab for ammunition recommendations.",
    plombsRec:"Recommended shot", chargeConseil:"Recommended load",
    leadFreeToggle:"🌿 Lead-free 🌿",
    addGame:"— Add game (up to 5) —", clearAll:"Clear all", munOptional:"Ammunition (optional)", upTo5:"up to 5", munition:"Ammunition", calRec:"Recommended calibers", calibreStar:"Caliber *", calibreLabel:"Caliber", distanceM:"Distance (m)", wetlandMandatory:"Mandatory in wetlands", atDist:"at", modeDescBattue:"Rapid-expansion bullets — immediate shock and stop for driven hunts", modeDescAffut:"Long-range bullets — progressive expansion and high weight retention", modeDescPoly:"Versatile bullets — effective at all ranges", moreChoicesBtn:"🤖 Additional choices & in-depth AI advice", deepAdviceBtn:"🤖 In-depth AI advice", federal:"Federal", notApplicable:"— Not applicable —", modeCarabine:"🔫 Rifle", modeFusil:"🦆 Shotgun", modeComparer:"📊 Compare", opusAnalysis:"AI Assistant on Claude Opus — in-depth analysis", sonnetAnalysis:"AI Assistant on Claude Sonnet", upgradeNudge:"Want deeper answers and 150 credits/month? Upgrade to Premium+ →", creditsLabel:"AI credits / month (all features combined)", quotaMsgPrefix:"⚠️ Monthly limit of ", quotaMsgSuffix:" AI credits reached (all AI features combined: Assistant, Caliber advice, Ammunition advice). Automatically renews on the 1st of the month.", premiumPlusBtn:"Go Premium+", examplesTitle:"Some example questions:", suggestion:"Suggestion", coffreErrFormat:"Unsupported format — use a photo (JPG, PNG) or a PDF.", coffreErrSize:"File too large — maximum 10 MB.", coffreErrStorage:"Storage full on this device. Delete an existing document before adding a new one.", leadFreeShort:"🌿 Lead-free", leadShort:"Lead", compareIntro:"Compare the trajectory of several ammunitions of the same caliber.", compareMax3:"Up to 3 ammunitions.", compareMax4:"Up to 4 ammunitions.", compareFree:"Free version: 2 ammunitions (3 in Premium).", chartLegend:"Values in cm vs line of sight", chartDelta:" · Δ = difference between the two", fusilRec:"🔫 Recommended shotguns", aiDeepBtn:"🤖 In-depth AI analysis — personalized advice", clearConv:"✕ Clear conversation", aiTimeout:"The request timed out (30 s). Check your connection and try again.", aiOffline:"Connection failed. Check your internet connection.", coffreErrRead:"This file could not be read. It may be damaged — try another one.", favorisGroup:"Favorites", favorisAdd:"Add to favorites", favorisRemove:"Remove from favorites", favorisWarn:"Favorite ammunition, stored on this device only, like the Safe and the Logbook.", selected:"selected", droCompLabel:"Zero distance (DRO)", compSelectOne:"Select at least one ammunition to see its trajectory.",
    errorPrefix:"❌ Error: ", tuneTitle:"🎯 Recommended zero",
    impPre:"At ", impMid:", the point of impact will be ", above:"above", below:"below", fromCenter:"the center.",
    droPre:"At your DRO of ", droMid:" : point of impact = ",
  },
};

// ─── MODALE DE CHOIX PREMIUM / PREMIUM+ ─────────────────────────────────────
// ─── LIENS POLITIQUE DE CONFIDENTIALITE (pages statiques dans public/) ───
const PRIVACY_URL = {
  fr: "/confidentialite.html",
  nl: "/privacy-nl.html",
  de: "/privacy-de.html",
  en: "/privacy-en.html",
};

const TIER_MODAL_I18N = {
  fr: {
    title: "Choisis ton niveau Premium",
    subtitle: "Les deux niveaux débloquent l'intégralité des fonctions payantes de l'app — la différence porte sur l'IA.",
    freeNote: "Gratuit : 1 question IA / jour, fonctions de base.",
    premiumName: "Premium",
    premiumFeatures: ["Carnet de chasse numérique", "Coffre-fort numérique (documents)", "Distances et DRO personnalisées sans restriction", "Comparateur jusqu'à 3 munitions, multi-gibier", "Assistant IA + conseils calibre/munition — 75 crédits IA / mois sur Claude Sonnet"],
    premiumCta: "Choisir Premium",
    currentBadge: "Niveau actuel",
    plusUpgradeCta: "Passer à Premium+",
    plusName: "Premium+",
    plusFeatures: ["Tout ce qui est inclus dans Premium", "Comparateur jusqu'à 4 munitions (3 en Premium)", "Rapport de saison PDF (statistiques + détail des prélèvements)", "Photos dans le Carnet — jusqu'à 3 par prise", "Munitions favorites — accès rapide dans toute l'app", "Fiche équipement dans le Coffre — armes, munition, optique", "150 crédits IA / mois au lieu de 75", "Réponses sur Claude Opus — analyses plus approfondies", "Synchronisation cloud entre tes appareils (bientôt disponible)"],
    plusCta: "Choisir Premium+",
    close: "Annuler",
  },
  nl: {
    title: "Kies je Premium-niveau",
    subtitle: "Beide niveaus ontgrendelen alle betaalde functies van de app — het verschil zit in de AI.",
    freeNote: "Gratis: 1 AI-vraag / dag, basisfuncties.",
    premiumName: "Premium",
    premiumFeatures: ["Digitaal jachtlogboek", "Digitale kluis (documenten)", "Vrije afstand en DRO zonder beperking", "Vergelijk tot 3 munities, meerdere soorten wild", "AI-assistent + kaliber-/munitieadvies — 75 AI-credits / maand op Claude Sonnet"],
    premiumCta: "Kies Premium",
    currentBadge: "Huidig niveau",
    plusUpgradeCta: "Upgraden naar Premium+",
    plusName: "Premium+",
    plusFeatures: ["Alles wat in Premium is inbegrepen", "Vergelijker tot 4 munities (3 in Premium)", "PDF-seizoensrapport (statistieken + detail van de vangsten)", "Foto's in het Logboek — tot 3 per vangst", "Favoriete munities — snelle toegang in de hele app", "Uitrusting in de Kluis — wapens, munitie, optiek", "150 AI-credits / maand in plaats van 75", "Antwoorden op Claude Opus — diepgaandere analyses", "Cloudsynchronisatie tussen je toestellen (binnenkort beschikbaar)"],
    plusCta: "Kies Premium+",
    close: "Annuleren",
  },
  de: {
    title: "Wähle deine Premium-Stufe",
    subtitle: "Beide Stufen schalten alle kostenpflichtigen Funktionen der App frei — der Unterschied liegt bei der KI.",
    freeNote: "Kostenlos: 1 KI-Frage / Tag, Basisfunktionen.",
    premiumName: "Premium",
    premiumFeatures: ["Digitales Jagdbuch", "Digitaler Tresor (Dokumente)", "Freie Entfernung und DRO ohne Einschränkung", "Vergleich von bis zu 3 Munitionen, mehrere Wildarten", "KI-Assistent + Kaliber-/Munitionsberatung — 75 KI-Credits / Monat auf Claude Sonnet"],
    premiumCta: "Premium wählen",
    currentBadge: "Aktuelle Stufe",
    plusUpgradeCta: "Auf Premium+ upgraden",
    plusName: "Premium+",
    plusFeatures: ["Alles, was in Premium enthalten ist", "Vergleich mit bis zu 4 Munitionen (3 in Premium)", "Saisonbericht PDF (Statistiken + Detail der Abschüsse)", "Fotos im Jagdbuch — bis zu 3 pro Abschuss", "Lieblingsmunition — schneller Zugriff in der ganzen App", "Ausrüstungsliste im Tresor — Waffen, Munition, Optik", "150 KI-Credits / Monat statt 75", "Antworten auf Claude Opus — vertiefte Analysen", "Cloud-Synchronisierung zwischen deinen Geräten (bald verfügbar)"],
    plusCta: "Premium+ wählen",
    close: "Abbrechen",
  },
  en: {
    title: "Choose your Premium tier",
    subtitle: "Both tiers unlock every paid feature of the app — the difference is the AI.",
    freeNote: "Free: 1 AI question / day, basic features.",
    premiumName: "Premium",
    premiumFeatures: ["Digital hunting logbook", "Digital safe (documents)", "Free distance and zero-point range, no restriction", "Compare up to 3 ammunitions, multi-species", "AI assistant + caliber/ammunition advice — 75 AI credits / month on Claude Sonnet"],
    premiumCta: "Choose Premium",
    currentBadge: "Current tier",
    plusUpgradeCta: "Upgrade to Premium+",
    plusName: "Premium+",
    plusFeatures: ["Everything included in Premium", "Comparator with up to 4 ammunitions (3 in Premium)", "Season report PDF (statistics + detailed harvest log)", "Photos in the Logbook — up to 3 per entry", "Favorite ammunitions — quick access throughout the app", "Equipment list in the Safe — weapons, ammunition, optics", "150 AI credits / month instead of 75", "Answers on Claude Opus — more in-depth analysis", "Cloud sync across your devices (coming soon)"],
    plusCta: "Choose Premium+",
    close: "Cancel",
  },
};


const NOTE_I18N = {
  fr: [
    "Tir rapproché en sous-bois, plombs fins pour densité maximale",
    "Plombs standard, polyvalents pour faisan au lever",
    "Tir à courte distance, plombs fins conseillés",
    "Plombs plus gros pour pénétration suffisante sur lièvre",
    "Plombs standard, tir à courte distance",
    "Plombs standard pour pigeon en vol",
    "⚠️ Plomb interdit en zone humide — acier ou bismuth obligatoire",
    "⚠️ Grand gabarit — acier impératif en zone humide",
    "⚠️ Acier obligatoire en zone humide",
    "Gros plombs conseillés pour le renard. La chevrotine est interdite en Belgique.",
    "⚠️ La chevrotine est INTERDITE en Belgique. Seule la balle fusil est autorisée pour le sanglier. Vérifiez la réglementation de votre région.",
    "Le calibre de battue par excellence en Belgique — puissance d'arrêt maximale sur sanglier et cerf",
    "Classique du grand gibier en forêt — excellent compromis puissance/recul pour la battue",
    "Polyvalent et universel — munitions disponibles partout, idéal pour débuter en battue",
    "Trajectoire ultra-plate au-delà de 250m — énergie et précision maximales sur grand gibier",
    "Balistique exceptionnelle à très longue portée — excellent pour l'affût en plaine",
    "Le calibre moderne longue distance — BC élevé, dérive au vent minimale à 300m+",
    "Plat, puissant, précis — idéal pour les tirs à plus de 150m sur cerf ou daim",
    "Trajectoire plate et énergie élevée — excellent pour l'affût longue distance",
    "Très efficace jusqu'à 250m sur grand gibier — polyvalent et accessible",
    "Puissance d'arrêt maximale à courte distance — le choix des professionnels pour le grand gibier",
    "Très efficace à moins de 100m — recul modéré et grande disponibilité des munitions",
    "Polyvalent même à courte distance — idéal si tu chasses aussi à moyenne portée",
    "Le standard belge pour le grand gibier — puissance et versatilité toutes distances",
    "Précis, polyvalent, très répandu — munitions disponibles partout en Belgique",
    "L'un des calibres les plus complets — efficace de 50m à 300m sur cerf et sanglier",
    "Le meilleur BC disponible pour l'affût chevreuil à très longue portée — précis à 300m+",
    "Balistique exceptionnelle au-delà de 250m — trajectoire ultra-plate",
    "Très efficace à longue distance sur chevreuil — trajectoire plate et précision",
    "Balistique exceptionnelle à longue portée — le meilleur choix actuel pour l'affût chevreuil",
    "Le classique nordique — précis, doux au tir, idéal à l'affût à plus de 150m",
    "Trajectoire très plate — excellent pour les tirs ouverts à grande distance",
    "Polyvalent et précis — reste efficace même à courte distance en forêt dense",
    "Fiable à toutes distances — très bon choix pour les tirs de moins de 100m",
    "Doux, précis, peu destructeur — idéal pour la venaison de qualité à courte distance",
    "Le calibre de chasse par excellence en Belgique — polyvalent chevreuil, cerf et daim",
    "Doux, précis, efficace — idéal pour le chasseur qui tire peu souvent",
    "Fiable et universel — parfait pour débuter ou chasser en toutes conditions",
    "Pour le gros gibier d'eau (bernache) — ⚠️ plombs acier obligatoires en zone humide",
    "Pour le gibier d'eau de taille moyenne (canard, foulque) — ⚠️ plombs acier obligatoires",
    "Le calibre polyvalent — couvre la majorité des situations intermédiaires",
    "Pour la bécasse en sous-bois — léger et maniable",
    "Pour le petit gibier et les tirs en sous-bois — plus léger et maniable",
    "Le calibre roi pour la grande oie et le gros gibier d'eau — ⚠️ plombs acier obligatoires",
    "⚠️ Plombs acier obligatoires — puissance suffisante pour bernache et grand gibier d'eau",
    "Polyvalent — utilisable avec plombs bismuth ou acier sur le gibier d'eau",
    "Idéal pour la bécasse en sous-bois — léger et maniable pour les tirs rapides",
    "Le petit calibre par excellence pour la bécasse — pour les chasseurs expérimentés",
    "Très maniable en sous-bois dense — pour les amateurs de petits calibres",
    "Le plus adapté pour le lièvre — puissance suffisante pour une pénétration efficace",
    "Pour les tirs à plus grande distance sur lièvre",
    "Bon compromis légèreté/puissance pour le lièvre",
    "Le calibre universel belge — polyvalent pour faisan, perdrix et pigeon",
    "Plus léger et maniable — idéal en sous-bois ou pour les jeunes chasseurs",
    "Le calibre intermédiaire traditionnel — bon compromis puissance/légèreté",
    "Excellent pour le renard à très longue distance — trajectoire plate et précision au rendez-vous",
    "Vitesse initiale élevée et trajectoire ultra-plate — idéal pour le renard à 300m+",
    "Polyvalent si tu chasses aussi le chevreuil — très précis à longue portée",
    "Excellent pour le renard à longue distance — précis et peu destructeur",
    "Précis jusqu'à 200m — le classique pour le renard en affût",
    "Très plat et rapide — efficace sur renard à plus de 150m",
    "Idéal pour le renard à courte distance — très précis et peu de dommages sur la fourrure",
    "Léger et économique pour le renard à moins de 100m",
    "Le classique — précis, peu destructeur, économique",
    "Le classique pour le renard — précis, peu destructeur, économique",
    "Excellent pour le renard à longue distance — trajectoire plate et précision au rendez-vous",
    "Idéal pour le renard à courte et moyenne distance — très précis et peu de dommages sur la fourrure",
    "Le choix longue distance par excellence — efficace et précis à 300m+",
    "Balistique moderne optimale — BC élevé, dérive au vent minimale",
    "Trajectoire ultra-plate — polyvalent grand et moyen gibier à très longue portée",
    "Le calibre moderne en plein essor — performances balistiques optimales à longue distance",
    "Trajectoire très plate — excellent pour les tirs ouverts à plus de 150m",
    "Polyvalent et puissant — efficace sur tout gibier jusqu'à 300m",
    "Calibre belge polyvalent — couvre la majorité des situations à courte et moyenne distance",
    "Standard universel — munitions disponibles dans toutes les armureries",
    "Puissant à courte distance — idéal si tu commences la chasse en forêt",
    "Calibre belge polyvalent — couvre la majorité des situations de chasse",
    "Standard universel — munitions disponibles dans toutes les armureries",
    "Le calibre moderne en plein essor — performances balistiques optimales",
  ],
  nl: [
    "Schot op korte afstand in dicht bos, fijne hagel voor maximale dichtheid",
    "Standaard hagel, veelzijdig voor fazant bij het opvliegen",
    "Schot op korte afstand, fijne hagel aanbevolen",
    "Grotere hagel voor voldoende penetratie op haas",
    "Standaard hagel, schot op korte afstand",
    "Standaard hagel voor duif in vlucht",
    "⚠️ Lood verboden in waterrijk gebied — staal of bismut verplicht",
    "⚠️ Groot formaat — staal verplicht in waterrijk gebied",
    "⚠️ Staal verplicht in waterrijk gebied",
    "Grove hagel aanbevolen voor de vos. Grof schroot (buckshot) is verboden in België.",
    "⚠️ Grof schroot (buckshot) is VERBODEN in België. Enkel een hagelgeweerkogel is toegelaten voor wild zwijn. Controleer de regelgeving van jouw regio.",
    "Het drijfjachtkaliber bij uitstek in België — maximale stopkracht op wild zwijn en hert",
    "Klassieker voor grof wild in het bos — uitstekend compromis kracht/terugslag voor drijfjacht",
    "Veelzijdig en universeel — munitie overal beschikbaar, ideaal om te starten met drijfjacht",
    "Ultravlakke kogelbaan voorbij 250m — maximale energie en precisie op grof wild",
    "Uitzonderlijke ballistiek op zeer lange afstand — uitstekend voor aanzit in open veld",
    "Het moderne langeafstandskaliber — hoge BC, minimale winddrift voorbij 300m",
    "Vlak, krachtig, precies — ideaal voor schoten voorbij 150m op hert of damhert",
    "Vlakke kogelbaan en hoge energie — uitstekend voor aanzit op lange afstand",
    "Zeer doeltreffend tot 250m op grof wild — veelzijdig en betaalbaar",
    "Maximale stopkracht op korte afstand — de keuze van professionals voor grof wild",
    "Zeer doeltreffend onder 100m — gematigde terugslag en ruime beschikbaarheid van munitie",
    "Veelzijdig zelfs op korte afstand — ideaal als je ook op middellange afstand jaagt",
    "De Belgische standaard voor grof wild — kracht en veelzijdigheid op alle afstanden",
    "Precies, veelzijdig, zeer verspreid — munitie overal in België beschikbaar",
    "Een van de meest complete kalibers — doeltreffend van 50m tot 300m op hert en wild zwijn",
    "De beste BC-waarde beschikbaar voor aanzit op ree op zeer lange afstand — precies voorbij 300m",
    "Uitzonderlijke ballistiek voorbij 250m — ultravlakke kogelbaan",
    "Zeer doeltreffend op lange afstand op ree — vlakke kogelbaan en precisie",
    "Uitzonderlijke ballistiek op lange afstand — momenteel de beste keuze voor aanzit op ree",
    "De Scandinavische klassieker — precies, zacht bij het schieten, ideaal voor aanzit voorbij 150m",
    "Zeer vlakke kogelbaan — uitstekend voor schoten in open terrein op grote afstand",
    "Veelzijdig en precies — blijft doeltreffend zelfs op korte afstand in dicht bos",
    "Betrouwbaar op alle afstanden — zeer goede keuze voor schoten onder 100m",
    "Zacht, precies, weinig destructief — ideaal voor kwaliteitswildbraad op korte afstand",
    "Het jachtkaliber bij uitstek in België — veelzijdig voor ree, hert en damhert",
    "Zacht, precies, doeltreffend — ideaal voor de jager die niet vaak schiet",
    "Betrouwbaar en universeel — perfect om te starten of in alle omstandigheden te jagen",
    "Voor groot watergevogelte (Canadese gans) — ⚠️ stalen hagel verplicht in waterrijk gebied",
    "Voor middelgroot watergevogelte (eend, meerkoet) — ⚠️ stalen hagel verplicht",
    "Het veelzijdige kaliber — dekt de meeste tussenliggende situaties",
    "Voor houtsnip in dicht bos — licht en handelbaar",
    "Voor klein wild en schoten in dicht bos — lichter en handelbaarder",
    "Het koningskaliber voor grote gans en groot watergevogelte — ⚠️ stalen hagel verplicht",
    "⚠️ Stalen hagel verplicht — voldoende kracht voor Canadese gans en groot watergevogelte",
    "Veelzijdig — bruikbaar met bismut- of stalen hagel op watergevogelte",
    "Ideaal voor houtsnip in dicht bos — licht en handelbaar voor snelle schoten",
    "Het kleine kaliber bij uitstek voor houtsnip — voor ervaren jagers",
    "Zeer handelbaar in dicht bos — voor liefhebbers van kleine kalibers",
    "Het best geschikt voor haas — voldoende kracht voor doeltreffende penetratie",
    "Voor schoten op grotere afstand op haas",
    "Goed compromis tussen lichtheid en kracht voor haas",
    "Het universele Belgische kaliber — veelzijdig voor fazant, patrijs en duif",
    "Lichter en handelbaarder — ideaal in dicht bos of voor jonge jagers",
    "Het traditionele tussenkaliber — goed compromis tussen kracht en lichtheid",
    "Uitstekend voor vos op zeer lange afstand — vlakke kogelbaan en precisie gegarandeerd",
    "Hoge aanvangssnelheid en ultravlakke kogelbaan — ideaal voor vos voorbij 300m",
    "Veelzijdig als je ook op ree jaagt — zeer precies op lange afstand",
    "Uitstekend voor vos op lange afstand — precies en weinig destructief",
    "Precies tot 200m — de klassieker voor vos bij aanzit",
    "Zeer vlak en snel — doeltreffend op vos voorbij 150m",
    "Ideaal voor vos op korte afstand — zeer precies en weinig schade aan de pels",
    "Licht en zuinig voor vos onder 100m",
    "De klassieker — precies, weinig destructief, zuinig",
    "De klassieker voor vos — precies, weinig destructief, zuinig",
    "Uitstekend voor vos op lange afstand — vlakke kogelbaan en precisie gegarandeerd",
    "Ideaal voor vos op korte en middellange afstand — zeer precies en weinig schade aan de pels",
    "De langeafstandskeuze bij uitstek — doeltreffend en precies voorbij 300m",
    "Optimale moderne ballistiek — hoge BC, minimale winddrift",
    "Ultravlakke kogelbaan — veelzijdig voor groot en middelgroot wild op zeer lange afstand",
    "Het moderne kaliber in opmars — optimale ballistische prestaties op lange afstand",
    "Zeer vlakke kogelbaan — uitstekend voor schoten in open terrein voorbij 150m",
    "Veelzijdig en krachtig — doeltreffend op alle wild tot 300m",
    "Veelzijdig Belgisch kaliber — dekt de meeste situaties op korte en middellange afstand",
    "Universele standaard — munitie verkrijgbaar in elke wapenwinkel",
    "Krachtig op korte afstand — ideaal als je begint met jagen in het bos",
    "Veelzijdig Belgisch kaliber — dekt de meeste jachtsituaties",
    "Universele standaard — munitie verkrijgbaar in elke wapenwinkel",
    "Het moderne kaliber in opmars — optimale ballistische prestaties",
  ],
  de: [
    "Nahschuss im Unterholz, feiner Schrot für maximale Dichte",
    "Standardschrot, vielseitig für aufsteigenden Fasan",
    "Schuss auf kurze Distanz, feiner Schrot empfohlen",
    "Größerer Schrot für ausreichende Durchschlagskraft bei Hase",
    "Standardschrot, Schuss auf kurze Distanz",
    "Standardschrot für fliegende Taube",
    "⚠️ Blei verboten in Feuchtgebieten — Stahl oder Bismut vorgeschrieben",
    "⚠️ Großes Kaliber — Stahl zwingend in Feuchtgebieten",
    "⚠️ Stahl vorgeschrieben in Feuchtgebieten",
    "Grober Schrot für den Fuchs empfohlen. Rehposten sind in Belgien verboten.",
    "⚠️ Rehposten sind in Belgien VERBOTEN. Nur das Flintenlaufgeschoss ist für Wildschwein zugelassen. Prüfen Sie die Vorschriften Ihrer Region.",
    "Das Drückjagdkaliber par excellence in Belgien — maximale Stoppwirkung auf Wildschwein und Rothirsch",
    "Klassiker für Schalenwild im Wald — ausgezeichneter Kompromiss zwischen Kraft und Rückstoß für die Drückjagd",
    "Vielseitig und universell — Munition überall erhältlich, ideal für den Einstieg in die Drückjagd",
    "Ultraflache Flugbahn jenseits von 250m — maximale Energie und Präzision auf Schalenwild",
    "Außergewöhnliche Ballistik auf sehr große Distanz — ausgezeichnet für den Ansitz im offenen Feld",
    "Das moderne Langdistanzkaliber — hoher BC-Wert, minimale Winddrift ab 300m",
    "Flach, kraftvoll, präzise — ideal für Schüsse über 150m auf Rothirsch oder Damhirsch",
    "Flache Flugbahn und hohe Energie — ausgezeichnet für den Ansitz auf große Distanz",
    "Sehr wirksam bis 250m auf Schalenwild — vielseitig und erschwinglich",
    "Maximale Stoppwirkung auf kurze Distanz — die Wahl der Profis für Schalenwild",
    "Sehr wirksam unter 100m — moderater Rückstoß und gute Munitionsverfügbarkeit",
    "Vielseitig auch auf kurze Distanz — ideal, wenn du auch auf mittlere Distanz jagst",
    "Der belgische Standard für Schalenwild — Kraft und Vielseitigkeit auf allen Distanzen",
    "Präzise, vielseitig, weit verbreitet — Munition überall in Belgien erhältlich",
    "Eines der vollständigsten Kaliber — wirksam von 50m bis 300m auf Rothirsch und Wildschwein",
    "Der beste verfügbare BC-Wert für den Rehansitz auf sehr große Distanz — präzise ab 300m",
    "Außergewöhnliche Ballistik jenseits von 250m — ultraflache Flugbahn",
    "Sehr wirksam auf große Distanz auf Reh — flache Flugbahn und Präzision",
    "Außergewöhnliche Ballistik auf große Distanz — derzeit die beste Wahl für den Rehansitz",
    "Der nordische Klassiker — präzise, schussfreundlich, ideal für den Ansitz über 150m",
    "Sehr flache Flugbahn — ausgezeichnet für Schüsse im offenen Gelände auf große Distanz",
    "Vielseitig und präzise — bleibt auch auf kurze Distanz im dichten Wald wirksam",
    "Zuverlässig auf allen Distanzen — sehr gute Wahl für Schüsse unter 100m",
    "Sanft, präzise, wenig zerstörend — ideal für hochwertiges Wildbret auf kurze Distanz",
    "Das Jagdkaliber par excellence in Belgien — vielseitig für Reh, Rothirsch und Damhirsch",
    "Sanft, präzise, wirksam — ideal für den Jäger, der selten schießt",
    "Zuverlässig und universell — perfekt für Einsteiger oder die Jagd unter allen Bedingungen",
    "Für großes Wassergeflügel (Kanadagans) — ⚠️ Stahlschrot vorgeschrieben in Feuchtgebieten",
    "Für mittelgroßes Wassergeflügel (Ente, Blässhuhn) — ⚠️ Stahlschrot vorgeschrieben",
    "Das vielseitige Kaliber — deckt die meisten mittleren Situationen ab",
    "Für Waldschnepfe im Unterholz — leicht und handlich",
    "Für Niederwild und Schüsse im Unterholz — leichter und handlicher",
    "Das Königskaliber für große Gans und großes Wassergeflügel — ⚠️ Stahlschrot vorgeschrieben",
    "⚠️ Stahlschrot vorgeschrieben — ausreichende Kraft für Kanadagans und großes Wassergeflügel",
    "Vielseitig — verwendbar mit Bismut- oder Stahlschrot auf Wassergeflügel",
    "Ideal für Waldschnepfe im Unterholz — leicht und handlich für schnelle Schüsse",
    "Das kleine Kaliber par excellence für Waldschnepfe — für erfahrene Jäger",
    "Sehr handlich im dichten Unterholz — für Liebhaber kleiner Kaliber",
    "Am besten geeignet für Hase — ausreichende Kraft für wirksame Durchschlagskraft",
    "Für Schüsse auf größere Distanz auf Hase",
    "Guter Kompromiss zwischen Leichtigkeit und Kraft für Hase",
    "Das universelle belgische Kaliber — vielseitig für Fasan, Rebhuhn und Taube",
    "Leichter und handlicher — ideal im Unterholz oder für junge Jäger",
    "Das traditionelle Zwischenkaliber — guter Kompromiss zwischen Kraft und Leichtigkeit",
    "Ausgezeichnet für Fuchs auf sehr große Distanz — flache Flugbahn und garantierte Präzision",
    "Hohe Anfangsgeschwindigkeit und ultraflache Flugbahn — ideal für Fuchs ab 300m",
    "Vielseitig, wenn du auch auf Reh jagst — sehr präzise auf große Distanz",
    "Ausgezeichnet für Fuchs auf große Distanz — präzise und wenig zerstörend",
    "Präzise bis 200m — der Klassiker für den Fuchsansitz",
    "Sehr flach und schnell — wirksam auf Fuchs über 150m",
    "Ideal für Fuchs auf kurze Distanz — sehr präzise und wenig Schäden am Fell",
    "Leicht und sparsam für Fuchs unter 100m",
    "Der Klassiker — präzise, wenig zerstörend, sparsam",
    "Der Klassiker für Fuchs — präzise, wenig zerstörend, sparsam",
    "Ausgezeichnet für Fuchs auf große Distanz — flache Flugbahn und garantierte Präzision",
    "Ideal für Fuchs auf kurze und mittlere Distanz — sehr präzise und wenig Schäden am Fell",
    "Die Langdistanzwahl par excellence — wirksam und präzise ab 300m",
    "Optimale moderne Ballistik — hoher BC-Wert, minimale Winddrift",
    "Ultraflache Flugbahn — vielseitig für Schalen- und mittelgroßes Wild auf sehr große Distanz",
    "Das moderne Kaliber im Aufschwung — optimale ballistische Leistung auf große Distanz",
    "Sehr flache Flugbahn — ausgezeichnet für Schüsse im offenen Gelände über 150m",
    "Vielseitig und kraftvoll — wirksam auf jedes Wild bis 300m",
    "Vielseitiges belgisches Kaliber — deckt die meisten Situationen auf kurze und mittlere Distanz ab",
    "Universeller Standard — Munition in jedem Waffengeschäft erhältlich",
    "Kraftvoll auf kurze Distanz — ideal für den Einstieg in die Waldjagd",
    "Vielseitiges belgisches Kaliber — deckt die meisten Jagdsituationen ab",
    "Universeller Standard — Munition in jedem Waffengeschäft erhältlich",
    "Das moderne Kaliber im Aufschwung — optimale ballistische Leistung",
  ],
  en: [
    "Close-range shot in woodland, fine shot for maximum density",
    "Standard shot, versatile for pheasant on the rise",
    "Short-range shot, fine shot recommended",
    "Larger shot for sufficient penetration on hare",
    "Standard shot, short-range shot",
    "Standard shot for pigeon in flight",
    "⚠️ Lead prohibited in wetlands — steel or bismuth required",
    "⚠️ Large size — steel mandatory in wetlands",
    "⚠️ Steel mandatory in wetlands",
    "Larger shot recommended for fox. Buckshot is prohibited in Belgium.",
    "⚠️ Buckshot is PROHIBITED in Belgium. Only slug ammunition is authorized for wild boar. Check the regulations in your region.",
    "The quintessential driven-hunt caliber in Belgium — maximum stopping power on wild boar and red deer",
    "A classic for big game in forest — excellent power/recoil compromise for driven hunts",
    "Versatile and universal — ammunition available everywhere, ideal for starting out in driven hunts",
    "Ultra-flat trajectory beyond 250m — maximum energy and precision on big game",
    "Exceptional ballistics at very long range — excellent for stand hunting in open fields",
    "The modern long-range caliber — high BC, minimal wind drift at 300m+",
    "Flat, powerful, precise — ideal for shots beyond 150m on red deer or fallow deer",
    "Flat trajectory and high energy — excellent for long-range stand hunting",
    "Very effective up to 250m on big game — versatile and affordable",
    "Maximum stopping power at short range — the professionals' choice for big game",
    "Very effective under 100m — moderate recoil and wide ammunition availability",
    "Versatile even at short range — ideal if you also hunt at medium range",
    "The Belgian standard for big game — power and versatility at all ranges",
    "Precise, versatile, widespread — ammunition available everywhere in Belgium",
    "One of the most complete calibers — effective from 50m to 300m on red deer and wild boar",
    "The best BC available for very long-range roe deer stand hunting — precise at 300m+",
    "Exceptional ballistics beyond 250m — ultra-flat trajectory",
    "Very effective at long range on roe deer — flat trajectory and precision",
    "Exceptional long-range ballistics — currently the best choice for roe deer stand hunting",
    "The Nordic classic — precise, mild to shoot, ideal for stand hunting beyond 150m",
    "Very flat trajectory — excellent for open-field shots at long range",
    "Versatile and precise — remains effective even at short range in dense forest",
    "Reliable at all ranges — very good choice for shots under 100m",
    "Mild, precise, low damage — ideal for quality venison at short range",
    "The quintessential hunting caliber in Belgium — versatile for roe deer, red deer and fallow deer",
    "Mild, precise, effective — ideal for the hunter who shoots infrequently",
    "Reliable and universal — perfect for beginners or hunting in all conditions",
    "For large waterfowl (Canada goose) — ⚠️ steel shot mandatory in wetlands",
    "For medium-sized waterfowl (duck, coot) — ⚠️ steel shot mandatory",
    "The versatile caliber — covers most intermediate situations",
    "For woodcock in woodland — light and manageable",
    "For small game and woodland shots — lighter and more manageable",
    "The king caliber for large goose and big waterfowl — ⚠️ steel shot mandatory",
    "⚠️ Steel shot mandatory — sufficient power for Canada goose and large waterfowl",
    "Versatile — usable with bismuth or steel shot on waterfowl",
    "Ideal for woodcock in woodland — light and manageable for quick shots",
    "The small caliber par excellence for woodcock — for experienced hunters",
    "Very manageable in dense woodland — for small-caliber enthusiasts",
    "Best suited for hare — sufficient power for effective penetration",
    "For longer-range shots on hare",
    "Good lightness/power compromise for hare",
    "The universal Belgian caliber — versatile for pheasant, partridge and pigeon",
    "Lighter and more manageable — ideal in woodland or for young hunters",
    "The traditional intermediate caliber — good power/lightness compromise",
    "Excellent for fox at very long range — flat trajectory and reliable precision",
    "High muzzle velocity and ultra-flat trajectory — ideal for fox at 300m+",
    "Versatile if you also hunt roe deer — very precise at long range",
    "Excellent for fox at long range — precise and low damage",
    "Precise up to 200m — the classic for fox stand hunting",
    "Very flat and fast — effective on fox beyond 150m",
    "Ideal for fox at short range — very precise with minimal fur damage",
    "Light and economical for fox under 100m",
    "The classic — precise, low damage, economical",
    "The classic for fox — precise, low damage, economical",
    "Excellent for fox at long range — flat trajectory and reliable precision",
    "Ideal for fox at short to medium range — very precise with minimal fur damage",
    "The long-range choice par excellence — effective and precise at 300m+",
    "Optimal modern ballistics — high BC, minimal wind drift",
    "Ultra-flat trajectory — versatile for big and medium game at very long range",
    "The modern caliber on the rise — optimal long-range ballistic performance",
    "Very flat trajectory — excellent for open-field shots beyond 150m",
    "Versatile and powerful — effective on all game up to 300m",
    "Versatile Belgian caliber — covers most short- and medium-range situations",
    "Universal standard — ammunition available in every gun shop",
    "Powerful at short range — ideal if you're starting out hunting in forest",
    "Versatile Belgian caliber — covers most hunting situations",
    "Universal standard — ammunition available in every gun shop",
    "The modern caliber on the rise — optimal ballistic performance",
  ],
};
const noteAt = (idx, lang) => (NOTE_I18N[lang] && NOTE_I18N[lang][idx]) || NOTE_I18N.fr[idx];
const FUSIL_TERMS = {
  "Balle fusil uniquement": { nl:"Alleen kogel", de:"Nur Flintenlaufgeschoss", en:"Slug only" },
  "Balle fusil": { nl:"Kogel", de:"Flintenlaufgeschoss", en:"Slug" },
  "Fusil": { nl:"Hagelgeweer", de:"Flinte", en:"Shotgun" },
  " ou ": { nl:" of ", de:" oder ", en:" or " },
  "acier": { nl:"staal", de:"Stahl", en:"steel" },
};
const fusilTerm = (v, lang) => {
  if (!v || lang === "fr") return v;
  let out = v;
  for (const fr of Object.keys(FUSIL_TERMS)) {
    if (out.indexOf(fr) !== -1 && FUSIL_TERMS[fr][lang]) out = out.split(fr).join(FUSIL_TERMS[fr][lang]);
  }
  return out;
};

function ProseResponse({ text }) {
  if (!text) return null;
  // Échappe le HTML brut AVANT d'appliquer le markdown gras/italique (anti-injection)
  const escHtml = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const mdInline = s => escHtml(s).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>");
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
        <li key={i} dangerouslySetInnerHTML={{ __html: mdInline(content) }} />
      );
    } else if (line.trim()) {
      flushList();
      elements.push(
        <p key={i} dangerouslySetInnerHTML={{ __html: mdInline(line) }} />
      );
    }
  });
  flushList();

  return <div className="prose fade-in">{elements}</div>;
}

// ─── LOADER ──────────────────────────────────────────────────────────────────
function Loader({ lang }) {
  return (
    <div role="status" aria-live="polite" style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 0", color: COLORS.textMuted }}>
      <div style={{ width: 16, height: 16, border: `2px solid ${COLORS.border}`, borderTopColor: COLORS.accent, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, animation: "pulse 1.5s ease infinite" }}>{(UIX_I18N[lang] && UIX_I18N[lang].aiLoading) || UIX_I18N.fr.aiLoading}</span>
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

// Numéros de plomb (chasse au fusil) — universels, non traduits (le préfixe mot l'est)
const PLOMB_NUMEROS = ["9","8","7½","7","6","5","4","3","2","1","0","00","000"];

const FUSIL_PLOMBS = {
  "Bécasse des bois":   { plombs:"n°7–8",              charge:"28–32g", note:0 },
  "Faisan de chasse":   { plombs:"n°5–6",              charge:"32–36g", note:1 },
  "Perdrix grise":      { plombs:"n°6–7",              charge:"28–32g", note:2 },
  "Lièvre brun":        { plombs:"n°4–5",              charge:"32–36g", note:3 },
  "Lapin de garenne":   { plombs:"n°5–6",              charge:"28–32g", note:4 },
  "Pigeon ramier":      { plombs:"n°5–6",              charge:"30–34g", note:5 },
  "Canard colvert":     { plombs:"acier n°3–4",        charge:"32–36g", note:6 },
  "Bernache du Canada": { plombs:"acier n°1–2",        charge:"36–42g", note:7 },
  "Foulque macroule":   { plombs:"acier n°4–5",        charge:"30–34g", note:8 },
  "Renard roux":        { plombs:"n°2–3", charge:"34–38g", note:9 },
  "Sanglier":           { plombs:"Balle fusil uniquement", charge:"Balle fusil", note:10 },
};


// ─── COEFFICIENTS BALISTIQUES (BC G1) ───
const SPECIFIC_BC = {
                  ".243 Win|||Express|||4.9": 0.305,
                  "7x57|||Zero|||8.2": 0.274,
                  ".308 Win|||Ecostrike|||10.7": 0.431,
                  "30-06|||Ecostrike|||10.7": 0.431,
                  "9.3x62|||Oryx|||21.1": 0.383,
                  ".270 Win|||Powerhead Blade Pro|||7.8": 0.37,
                  "6.5 Creedmoor|||Gamehead Pro|||9.1": 0.546,
                  "30-06|||Powerhead Blade|||11.0": 0.41,
                  "6.5 Creedmoor|||Powerhead Blade Pro|||8.4": 0.5,
                  ".45-70 Govt|||LEVERevolution FTX|||21.1": 0.23,
                  "7mm Rem Mag|||SST Superformance|||10.0": 0.525,
                  ".338 Win Mag|||SST Superformance|||14.6": 0.515,
                  ".243 Win|||Super-X|||5.2": 0.255,
                  ".243 Win|||Power Max Bonded|||6.5": 0.372,
                  ".270 Win|||Copper Impact|||8.4": 0.418,
                  ".270 Win|||Power Point|||9.7": 0.344,
                  ".270 WSM|||Ballistic Silvertip|||8.4": 0.432,
                  ".270 WSM|||Ballistic Silvertip|||9.7": 0.496,
                  ".270 WSM|||Deer Season XP|||8.4": 0.45,
                  ".270 WSM|||Copper Impact|||8.4": 0.418,
                  ".270 WSM|||Power Point|||9.7": 0.344,
                  ".30-30 Win|||Ballistic Silvertip|||9.7": 0.232,
                  ".30-30 Win|||Deer Season XP|||9.7": 0.215,
                  ".30-30 Win|||Super-X HP|||9.7": 0.218,
                  ".300 WSM|||Ballistic Silvertip|||9.7": 0.424,
                  ".300 WSM|||Deer Season XP|||9.7": 0.392,
                  ".300 WSM|||Deer Season XP|||11.7": 0.422,
                  ".300 WSM|||Copper Impact|||9.7": 0.387,
                  ".300 WSM|||Copper Impact|||11.7": 0.47,
                  ".300 WSM|||Power Point|||9.7": 0.294,
                  ".300 Win Mag|||Deer Season XP|||11.7": 0.422,
                  ".300 Win Mag|||Expedition Big Game AccuBond|||11.7": 0.509,
                  ".300 Win Mag|||Copper Impact|||9.7": 0.387,
                  ".300 Win Mag|||Copper Impact|||11.7": 0.47,
                  ".300 Win Mag|||Power Point|||9.7": 0.294,
                  ".308 Win|||Ballistic Silvertip|||10.9": 0.474,
                  ".308 Win|||Deer Season XP|||10.9": 0.396,
                  ".308 Win|||Expedition Big Game|||10.9": 0.624,
                  "30-06|||Power Point|||10.7": 0.341,
                  "30-06|||Power Max Bonded|||9.7": 0.325,
                  "30-06|||Ballistic Silvertip|||11.7": 0.507,
                  "30-06|||Copper Impact|||11.7": 0.47,
                  "30-06|||Deer Season XP|||11.7": 0.422,
                  "30-06|||Super-X|||8.1": 0.268,
                  "6.5 Creedmoor|||Deer Season XP|||9.1": 0.478,
                  "6.5 Creedmoor|||Copper Impact|||8.1": 0.428,
                  "6.5 PRC|||Ballistic Silvertip|||9.1": 0.509,
                  "6.5 PRC|||Copper Impact|||8.1": 0.428,
                  "7mm Rem Mag|||Deer Season XP|||9.1": 0.484,
                  "7mm Rem Mag|||Expedition Big Game|||10.9": 0.606,
                  "7mm Rem Mag|||Expedition Big Game AccuBond|||10.4": 0.512,
                  "7mm Rem Mag|||Power Point|||11.3": 0.426,
                  ".45-70 Govt|||Ballistic Silvertip|||19.4": 0.191,
                  ".45-70 Govt|||Super-X|||26.2": 0.28,
                  ".30-30 Win|||Power Point|||9.7": 0.218,
                  ".30-30 Win|||Power Point|||11.0": 0.241,
                  "30-06|||KS|||10.7": 0.329,
                  "30-06|||KS|||9.7": 0.298,
                  "30-06|||Super Hammerhead|||11.7": 0.45,
                  "30-06|||Super Hammerhead|||9.7": 0.263,
                  "30-06|||UNI Classic|||11.7": 0.35,
                  "30-06|||UNI Classic|||13.0": 0.38,
                  "7x64|||ID Classic|||10.5": 0.325,
                  "7x64|||ID Classic|||11.5": 0.356,
                  "7x64|||KS|||10.5": 0.381,
                  "7x64|||KS|||8.0": 0.29,
                  "7x65R|||KS|||10.5": 0.381,
                  "7x65R|||KS|||8.0": 0.29,
                  "9.3x62|||Tipstrike": 0.428,
                  ".270 Win|||Powerhead Blade": 0.4,
                  "6.5x55 SE|||Super Hammerhead": 0.437,
                  ".444 Marlin|||LEVERevolution FTX": 0.205,
                  "6mm Rem|||SST": 0.355,
                  "6.5 Creedmoor|||Expedition Big Game": 0.624,
                  "6.5 Creedmoor|||Power Point": 0.413,
                  "6.5 PRC|||Expedition Big Game LR": 0.622,
                  "6.5x55 SE|||Power Point": 0.45,
                  "8x57 JS|||Naturalis": 0.33,
                  "6.5 Creedmoor|||Mega": 0.377,
                  "8x57 JRS|||Custom International InterLock": 0.408,
                  "7x64|||Custom International InterLock": 0.433,
                  "7x64|||Precision Hunter ELD-X": 0.63,
                  "30-06|||Outfitter": 0.403,
                  ".338 Win Mag|||Custom InterLock": 0.514,
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
                  "30-06|||Ecostrike": 0.376,
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
                  "30-06|||Expedition Big Game": 0.596,
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
                  ".270 Win|||Expedition Big Game": 0.59,
                  "6.5 PRC|||Expedition Big Game": 0.622,
                  "6.5 Creedmoor|||Ballistic Silvertip": 0.509,
                  "6.5x55 SE|||Custom International InterLock": 0.465,
                  "5.6x52R|||Whitetail": 0.268,
                  ".243 Win|||Precision Hunter ELD-X": 0.409,
                  ".243 Win|||Deer Season XP": 0.363,
                  ".223 Rem|||Power Point": 0.257,
                  ".223 Rem|||Gamehead": 0.207,
                  ".22-250 Rem|||Power Point": 0.251,
                  ".270 Win|||Evostrike": 0.292,
                  ".30-30 Win|||Whitetail": 0.217,
                  ".338 Win Mag|||Oryx": 0.37,
                  "8x57 JS|||Speed Tip Pro SR": 0.393,
                  ".300 PRC|||Ecostrike": 0.431,
                  ".300 PRC|||Bondstrike": 0.615,
                  ".300 WSM|||Bondstrike": 0.615,
                  ".300 WSM|||Power Point": 0.438,
                  ".300 WSM|||Ballistic Silvertip": 0.507,
                  ".300 WSM|||Expedition Big Game": 0.596,
                  ".300 WSM|||Precision Hunter ELD-X": 0.597,
                  ".300 Win Mag|||Driven Hunt": 0.185,
                  ".300 Win Mag|||Star": 0.387,
                  ".300 Win Mag|||Express": 0.404,
                  ".300 Win Mag|||Whitetail": 0.274,
                  ".300 Win Mag|||Evostrike": 0.318,
                  ".300 Win Mag|||Power Max Bonded": 0.394,
                  ".300 Win Mag|||Power Point": 0.438,
                  ".300 Win Mag|||Deer Season XP": 0.392,
                  ".300 Win Mag|||Expedition Big Game": 0.596,
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
                  "8x57 JRS|||Hammerhead": 0.253,
                  "8x57 JRS|||Gamehead": 0.374,
                  "8x57 JS|||Ecostrike": 0.353,
                  "8x57 JS|||Tipstrike": 0.361,
                  "8x57 JS|||ID Classic": 0.36,
                  "8x57 JS|||Evolution": 0.35,
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
                  ".300 Win Mag|||American Whitetail": 0.452,
                  ".300 Win Mag|||SST": 0.48,
                  ".300 Win Mag|||Outfitter GMX": 0.469,
                  ".300 Win Mag|||Naturalis": 0.354,
                  ".300 Win Mag|||Mega": 0.319,
                  "30-06|||Precision Hunter ELD-X": 0.552,
                  "30-06|||Custom International InterLock": 0.425,
                  "30-06|||American Whitetail": 0.425,
                  "30-06|||SST": 0.415,
                  "30-06|||Hammerhead": 0.408,
                  "30-06|||Gamehead": 0.332,
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
                  ".308 Win|||Gamehead": 0.279,
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
                  "7x65R|||Evolution": 0.369,
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
                  "6.5 Creedmoor|||Precision Hunter": 0.625,
                  "6.5 Creedmoor|||Bondstrike": 0.629,
                  "6.5 Creedmoor|||Star": 0.255,
                  "6.5 Creedmoor|||SST": 0.485,
                  "6.5 Creedmoor|||American Whitetail": 0.445,
                  "6.5 Creedmoor|||Ecostrike": 0.39,
                  "6.5 Creedmoor|||Powerhead Blade": 0.348,
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
                  "6.5x55 SE|||Naturalis": 0.201,
                  "6.5x55 SE|||Powerhead Blade": 0.348,
                  "6.5x55 SE|||Vulkan": 0.354,
                  ".270 Win|||Speed Tip Pro": 0.459,
                  ".270 Win|||Evolution Green": 0.292,
                  ".270 Win|||SST": 0.46,
                  ".270 Win|||American Whitetail": 0.409,
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
                  ".300 Win Mag|||Speed Tip Pro": 0.386,
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
                  "7mm Rem Mag|||American Whitetail": 0.392,
                  "7mm Rem Mag|||Outfitter": 0.455,
                  ".243 Win|||SST": 0.355,
                  ".243 Win|||Naturalis": 0.23,
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
                  "6.5 PRC|||Precision Hunter": 0.625,
                  "6.5 PRC|||Bondstrike": 0.629,
                  "6.5 PRC|||Whitetail": 0.373,
                  "6.5 PRC|||Powerhead Blade": 0.348,
                  "9.3x74R|||HIT": 0.314,
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
                  ".30-30 Win|||American Whitetail": 0.186,
                  ".30-30 Win|||InterLock": 0.186,
                  ".30-30 Win|||Power Point": 0.241,
                  ".444 Marlin|||LEVERevolution": 0.225,
                  ".45-70 Govt|||MonoFlex": 0.175,
                  ".45-70 Govt|||LEVERevolution": 0.175,
                  ".338 Lapua Mag|||Speed Tip Pro": 0.566,
                  ".338 Lapua Mag|||Naturalis": 0.373,
                  ".338 Lapua Mag|||Mega": 0.64,
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
                  "8x57 JRS|||Evolution": 0.35,
                  "8x57 JRS|||Evolution Green": 0.327,
                  "8x57 JRS|||ID Classic": 0.36,
                  "8x57 JRS|||Softpoint": 0.245,
                  "8x68S|||Driven Hunt": 0.152,
                  "8x68S|||Evolution Green": 0.327,
                  "8x68S|||HIT": 0.338,
                  "8x68S|||Speed Tip Pro": 0.394,
                  "8x68S|||Evolution": 0.35,
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
                    "6.5 PRC":0.45, "6.5x57":0.34, "6.5x57R":0.34,
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

// ─── HAUTEURS DE VISÉE PAR FABRICANT (calculateurs/tables officiels, audit juin 2026) ───
// RWS/GECO 50mm (RUAG), Norma 40mm ("Sight height is 40mm"), Sako 45mm (datatable 4,5cm),
// Lapua 45mm (défaut officiel), Winchester/Hornady 38mm (1,5 in, calculateurs officiels).
const SIGHT_H_DEFAULT = 0.05;
const SIGHT_H_MARQUE = { RWS:0.05, GECO:0.05, Norma:0.04, Sako:0.045, Lapua:0.045, Winchester:0.038, Hornady:0.038 };
const sightHFor = (marque) => SIGHT_H_MARQUE[marque] || SIGHT_H_DEFAULT;

// ─── RÉSOLUTION DU BC (partagée Cible + Comparateur) ─────────────────────────
// Priorité : clé par poids (calibre|||gamme|||poids) > clé exacte de gamme >
// sous-clé de gamme > BC de gamme générique > fallback calibre. Insensible à la casse.
const resolveBC = (label, calibre) => {
  let g = label.replace(/\s*🌿\s*$/, "").replace(/\s*\u2713\s*$/, "");
  for (const m of ["RWS","Norma","GECO","Winchester","Hornady","Lapua","Sako"]) {
    if (g.startsWith(m)) { g = g.slice(m.length).trim(); break; }
  }
  g = g.replace(/\d+[,.]?\d*\s*g.*$/, "").trim();
  const wm = label.match(/(\d+[.,]?\d*)\s*g\s*(?:🌿)?\s*$/);
  if (wm) {
    const wk = `${calibre}|||${g}|||${parseFloat(wm[1].replace(",", ".")).toFixed(1)}`;
    if (SPECIFIC_BC[wk] != null) return SPECIFIC_BC[wk];
  }
  if (SPECIFIC_BC[`${calibre}|||${g}`] != null) return SPECIFIC_BC[`${calibre}|||${g}`];
  for (const [gKey] of GAMME_BC) {
    if (g.toLowerCase().includes(gKey.toLowerCase())) {
      const spec = SPECIFIC_BC[`${calibre}|||${gKey}`];
      if (spec != null) return spec;
    }
  }
  for (const [gKey, gBC] of GAMME_BC) {
    if (g.toLowerCase().includes(gKey.toLowerCase())) return gBC;
  }
  return CAL_FALLBACK[calibre] || 0.40;
};

// ─── MODÈLE BALISTIQUE (partagé Cible + Comparateur) ─────────────────────────
// Calibré sur tableaux officiels RUAG (GECO/RWS, 50mm). Validé ≤0,3cm d'écart (50-300m, 2 réglages).
// v0 en m/s, bc (G1), dro = distance de réglage (m), sightH = hauteur de visée (m) selon le fabricant.
// Retourne d => point d'impact en cm (+ haut / - bas).
const makeTrajectory = (v0, bc, dro, sightH = SIGHT_H_DEFAULT) => {
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
  return d => (-sightH + angle*d - dropGrav(d)) * 100;
};

export default function ChassIA() {
  const getSavedLang = () => {
    try { return localStorage.getItem("chassia_lang") || null; } catch { return null; }
  };
  const [lang, setLang] = useState(getSavedLang());
  useEffect(() => { try { document.documentElement.lang = lang || "fr"; } catch {} }, [lang]);
  const handleSetLang = (code) => {
    try { localStorage.setItem("chassia_lang", code); } catch {}
    setLang(code);
  };
  const [tab, setTab] = useState("cible");

  // ── CARNET DE CHASSE ─────────────────────────────────────────────────────
  // ⚠️ Stockage localStorage uniquement (comme Carnet et Coffre) — à migrer vers Supabase
  const FAVORIS_KEY = "chassia_favoris_v1";
  const loadFavoris = () => { try { return JSON.parse(localStorage.getItem(FAVORIS_KEY) || "[]"); } catch { return []; } };
  const saveFavoris = (arr) => { try { localStorage.setItem(FAVORIS_KEY, JSON.stringify(arr)); } catch {} };
  const CARNET_KEY = "chassia_carnet_v1";
  const getSaison = (dateStr) => {
    const d = dateStr ? new Date(dateStr) : new Date();
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    return m >= 7 ? `${y}-${y+1}` : `${y-1}-${y}`;
  };
  const loadCarnet = () => { try { return JSON.parse(localStorage.getItem(CARNET_KEY) || "[]"); } catch { return []; } };
  const saveCarnet = (entries) => { try { localStorage.setItem(CARNET_KEY, JSON.stringify(entries)); return true; } catch { return false; } };
  const [carnetEntries, setCarnetEntries] = useState(loadCarnet);
  const [favoris, setFavoris] = useState(loadFavoris);
  const isFavori = (cal, label) => favoris.includes(`${cal}|||${label}`);
  const toggleFavori = (cal, label) => {
    const key = `${cal}|||${label}`;
    const updated = favoris.includes(key) ? favoris.filter(k => k !== key) : [...favoris, key];
    setFavoris(updated);
    saveFavoris(updated);
  };
  const [carnetSaison, setCarnetSaison] = useState(getSaison());
  const [carnetView, setCarnetView] = useState("liste"); // "liste" | "stats" | "form"
  const [confirmDelete, setConfirmDelete] = useState(null);
  const emptyForm = { date: new Date().toISOString().slice(0,10), espece:"", sexe:"", calibre:"", munition:"", distance:"", distanceFuite:"", nbTirs:1, poids:"", tir:"", meteo:"", lieu:"", emotion:3, difficulte:3, notes:"", saison: getSaison() };
  const [carnetDraft, setCarnetDraft] = useState(emptyForm);

  // ── COFFRE-FORT ──────────────────────────────────────────────────────────
  const COFFRE_KEY = "chassia_coffre_v1";
  const loadCoffre = () => { try { return JSON.parse(localStorage.getItem(COFFRE_KEY) || "{}"); } catch { return {}; } };
  const saveCoffre = (data) => { try { localStorage.setItem(COFFRE_KEY, JSON.stringify(data)); return true; } catch { return false; } };
  const [coffreData, setCoffreData] = useState(loadCoffre);
  const [confirmDeleteDoc, setConfirmDeleteDoc] = useState(null);
  const [coffreError, setCoffreError] = useState("");
  const [coffreView, setCoffreView] = useState("documents"); // "documents" | "equipement"

  // ── ÉQUIPEMENT (Coffre, Premium+) ────────────────────────────────────────
  const EQUIP_KEY = "chassia_coffre_equip_v1";
  const loadEquip = () => { try { return JSON.parse(localStorage.getItem(EQUIP_KEY) || "[]"); } catch { return []; } };
  const saveEquip = (list) => { try { localStorage.setItem(EQUIP_KEY, JSON.stringify(list)); return true; } catch { return false; } };
  const [coffreEquip, setCoffreEquip] = useState(loadEquip);
  const [addingEquipCat, setAddingEquipCat] = useState(null);
  const [equipForm, setEquipForm] = useState({ titre:"", detail:"" });
  const [confirmDeleteEquip, setConfirmDeleteEquip] = useState(null);
  const [equipError, setEquipError] = useState("");

  // Compresse une image avant stockage : réduit fortement l'espace occupé dans
  // localStorage (quota ~5 Mo partagé) tout en gardant un document lisible.
  // Les PDF ne sont pas compressés (renvoyés tels quels).
  const compressImage = (file) => new Promise((resolve) => {
    if (file.type === "application/pdf") { resolve(null); return; }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const MAX = 1600; // côté le plus long, suffisant pour lire un document
      let { width, height } = img;
      if (width > MAX || height > MAX) {
        const ratio = Math.min(MAX / width, MAX / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      try { resolve(canvas.toDataURL("image/jpeg", 0.8)); } catch { resolve(null); }
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });

  // Photos du Carnet (Premium+, max 3 par prise) — réutilise compressImage du Coffre
  const [carnetPhotoError, setCarnetPhotoError] = useState("");
  const [carnetSaveError, setCarnetSaveError] = useState("");
  // Normalise les numéros de plomb d'une entrée fusil vers la langue courante
  // (évite qu'un changement de langue entre création et édition ne désélectionne les boutons)
  const normalizePlombs = (str, lg) => {
    if (!str) return str;
    const CNl = CARNET_I18N[lg] || CARNET_I18N.fr;
    const PFX = ["Plomb", "Lood", "Schrot", "Shot"];
    const BALLE = ["Balle", "Kogel", "Flintenlaufgeschoss", "Slug"];
    return str.split(", ").filter(Boolean).map(tok => {
      if (BALLE.includes(tok)) return CNl.balle;
      for (const p of PFX) if (tok.startsWith(p + " ")) return `${CNl.plombPrefix} ${tok.slice(p.length + 1)}`;
      return tok;
    }).join(", ");
  };
  const addCarnetPhoto = (file) => {
    if (!file) return;
    if ((carnetDraft.photos||[]).length >= 3) { setCarnetPhotoError(CN.photoMax3); return; }
    if (!["image/jpeg","image/png","image/webp"].includes(file.type)) { setCarnetPhotoError(CN.photoErrFormat); return; }
    if (file.size > 20 * 1024 * 1024) { setCarnetPhotoError(CN.photoErrSize); return; }
    setCarnetPhotoError("");
    compressImage(file).then((compressed) => {
      if (compressed) {
        setCarnetDraft(d => {
          const cur = d.photos || [];
          if (cur.length >= 3) return d; // garde anti-course : limite déjà atteinte
          return {...d, photos: [...cur, compressed]};
        });
      } else {
        setCarnetPhotoError(UIX.coffreErrRead);
      }
    });
  };
  const removeCarnetPhoto = (idx) => {
    setCarnetDraft(d => ({...d, photos: (d.photos||[]).filter((_,i) => i!==idx)}));
  };

  const uploadDoc = (id, file) => {
    if (!file) return;
    if (!["image/jpeg","image/png","image/webp","application/pdf"].includes(file.type)) {
      setCoffreError(UIX.coffreErrFormat); return;
    }
    if (file.size > 10 * 1024 * 1024) { setCoffreError(UIX.coffreErrSize); return; }
    setCoffreError("");

    const store = (data, type) => {
      const updated = { ...coffreData, [id]: { name: file.name, type, data } };
      if (saveCoffre(updated)) {
        setCoffreData(updated);
      } else {
        setCoffreError(UIX.coffreErrStorage);
      }
    };

    compressImage(file).then((compressed) => {
      if (compressed) { store(compressed, "image/jpeg"); return; }
      // PDF ou échec de compression : on stocke le fichier d'origine
      const reader = new FileReader();
      reader.onload = (e) => store(e.target.result, file.type);
      reader.onerror = () => setCoffreError(UIX.coffreErrRead);
      reader.readAsDataURL(file);
    });
  };

  const deleteDoc = (id) => {
    const updated = { ...coffreData };
    delete updated[id];
    if (saveCoffre(updated)) {
      setCoffreData(updated);
    } else {
      setCoffreError(UIX.coffreErrStorage);
    }
  };


  // Sauvegarde localStorage à chaque modif carnet — renvoie false si le quota est plein
  const saveCarnetWithBackup = (entries) => saveCarnet(entries);

  // Cible state
  const [calibre, setCalib] = useState(".308 Win");

  // Cible personnalisée DRO state
  const [customDist, setCustomDist] = useState(100);
  const [customDRO, setCustomDRO] = useState(100);
  const [customMun, setCustomMun] = useState("");
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
  const [compMun4, setCompMun4] = useState("");
  const [compDRO, setCompDRO] = useState(150);
  const [calibreFusil, setCaliFusil] = useState("");
  const [calibreM, setCalibreM] = useState("");
  const [typeM, setTypeM] = useState("");
  const [loadingM, setLoadingM] = useState(false);
  const [conseilMun, setConseilMun] = useState("");

  const T = LANGS[lang] || LANGS.fr;
  const GIBIER = GIBIER_I18N[lang] || GIBIER_I18N.fr;
  const CN = CARNET_I18N[lang] || CARNET_I18N.fr;
  const CF = COFFRE_I18N[lang] || COFFRE_I18N.fr;
  const UIX = UIX_I18N[lang] || UIX_I18N.fr;

  // Tier : "free" | "premium" (Sonnet) | "premiumPlus" (Opus)
  const [tier, setTier] = useState("free");
  const isPremium = tier !== "free"; // déverrouille les fonctions payantes (Premium + Premium+)
  const isPremiumPlus = tier === "premiumPlus"; // déverrouille le modèle Opus
  const [showTierModal, setShowTierModal] = useState(false);

  // Accessibilité : la touche Échap ferme les modales ouvertes
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (showTierModal) setShowTierModal(false);
      else if (printModal) setPrintModal(false);
      else if (confirmDelete) setConfirmDelete(null);
      else if (confirmDeleteDoc) setConfirmDeleteDoc(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showTierModal, printModal, confirmDelete, confirmDeleteDoc]);
  const openTierModal = () => setShowTierModal(true);

  // ── Quota Premium partagé (Assistant IA + Conseil calibre + Conseil munition) ──
  const PREMIUM_CAP = 75;        // Premium (Sonnet)
  const PREMIUM_PLUS_CAP = 150;  // Premium+ (Opus)
  const currentQuotaCap = isPremiumPlus ? PREMIUM_PLUS_CAP : PREMIUM_CAP;
  const getPremiumMonthKey = () => `chassia_premium_${new Date().getFullYear()}_${new Date().getMonth()}`;
  const getPremiumMonthCount = () => {
    try { return parseInt(localStorage.getItem(getPremiumMonthKey()) || "0", 10); } catch { return 0; }
  };
  const consumePremiumQuota = () => {
    const count = getPremiumMonthCount();
    if (count >= currentQuotaCap) return false;
    try { localStorage.setItem(getPremiumMonthKey(), String(count + 1)); } catch {}
    return true;
  };
  const QUOTA_MSG = `${UIX.quotaMsgPrefix}${currentQuotaCap}${UIX.quotaMsgSuffix}`;

  async function conseillerCalibre() {
    if (gibierCMulti.length === 0) return;
    if (!consumePremiumQuota()) { setConseilCalib(QUOTA_MSG); return; }
    setLoadingC(true); setConseilCalib("");
    const gibierCible = gibierCMulti.join(", ");
    const multiNote = gibierCMulti.length > 1 ? ` Calibre polyvalent pour ${gibierCMulti.length} gibiers.` : "";
    const prompt = `Je chasse en Belgique. Conseille-moi sur le meilleur calibre de carabine pour chasser ${gibierCible}${typeChasse ? ` en ${typeChasse}` : ""}${distC ? ` à des distances typiques de ${distC}m` : ""}.${multiNote}
    Donne 2-3 calibres recommandés avec leurs avantages/inconvénients, et un conseil sur le choix selon le profil du chasseur belge.`;
    try {
      const resp = await askClaude(prompt, T.system, [], isPremiumPlus, UIX.aiTimeout, UIX.aiOffline);
      setConseilCalib(resp);
    } catch(e) {
      setConseilCalib(UIX.errorPrefix + (e?.message || String(e)));
    } finally {
      setLoadingC(false);
    }
  }

  async function conseillerMunition() {
    if ((!gibierM && gibierMMulti.length === 0) || !calibreM) return;
    if (!consumePremiumQuota()) { setConseilMun(QUOTA_MSG); return; }
    setLoadingM(true); setConseilMun("");
    const listeMun = (MUNITIONS_DATA[calibreM] || []).map(m => m.label).join(", ");
    const gibierMCible = gibierMMulti.length > 0 ? gibierMMulti.join(", ") : gibierM;
                                const prompt = `Je chasse en Belgique. Quelles munitions recommandes-tu pour chasser ${gibierMCible} avec un ${calibreM}${typeM ? ` en ${typeM}` : ""}?
    Voici les munitions disponibles pour ce calibre : ${listeMun}.
    Recommande 3 à 5 munitions parmi cette liste uniquement, avec pour chacune : le type d'ogive, le poids, l'usage idéal et pourquoi elle est adaptée à ce gibier en Belgique.
    Indique clairement lesquelles sont sans plomb (marquées 🌿). Rappelle la réglementation belge sur le plomb en zones humides si pertinent.`;
    try {
      const resp = await askClaude(prompt, T.system, [], isPremiumPlus, UIX.aiTimeout, UIX.aiOffline);
      setConseilMun(resp);
    } catch(e) {
      setConseilMun(UIX.errorPrefix + (e?.message || String(e)));
    } finally {
      setLoadingM(false);
    }
  }

  async function conseillerMunitionFusil() {
    if (!gibierM || !calibreFusil) return;
    if (!consumePremiumQuota()) { setConseilMun(QUOTA_MSG); return; }
    setLoadingM(true); setConseilMun("");
    const prompt = `Je chasse en Belgique avec un fusil calibre ${calibreFusil} pour le ${gibierM}. Donne-moi des conseils détaillés sur le choix des cartouches (marque, plombs, charge), la technique de tir et les règles à respecter notamment sur le plomb en zones humides.`;
    try {
      const resp = await askClaude(prompt, T.system, [], isPremiumPlus, UIX.aiTimeout, UIX.aiOffline);
      setConseilMun(resp);
    } catch(e) {
      setConseilMun(UIX.errorPrefix + (e?.message || String(e)));
    } finally {
      setLoadingM(false);
    }
  }

  // ── Assistant IA state ──────────────────────────────────────────────────
  const MAX_FREE = 1;
  // Clé du jour recalculée à chaque appel (comme getPremiumMonthKey) : bascule correcte à minuit
  const getFreeDayKey = () => "chassia_questions_" + new Date().toDateString();

  const getQuestionsUsed = () => {
    try { return parseInt(localStorage.getItem(getFreeDayKey()) || "0", 10); } catch { return 0; }
  };
  const incrementQuestions = () => {
    try { localStorage.setItem(getFreeDayKey(), String(getQuestionsUsed() + 1)); } catch {}
  };

  // Tier déjà déclaré plus haut (avant le bloc quota qui en dépend)
  const [questionsUsed, setQuestionsUsed] = useState(getQuestionsUsed());
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingQ, setLoadingQ] = useState(false);
  const canAsk = isPremium || questionsUsed < MAX_FREE;

  async function poserQuestion() {
    if (!question.trim() || !canAsk || loadingQ) return;

    // Garde-fou technique Premium : quota partagé (75/150 crédits/mois selon tier, toutes fonctions IA confondues)
    if (isPremium) {
      if (!consumePremiumQuota()) {
        setChatHistory(h => [...h, { role:"assistant", content: QUOTA_MSG }]);
        return;
      }
    }
    const q = question.trim();
    setQuestion("");
    setLoadingQ(true);

    // Memoire retiree (tous paliers) -- chaque question est independante, quel que soit le palier
    const apiHistory = [];

    const newHistory = [...chatHistory, { role: "user", content: q }];
    setChatHistory(newHistory);

    if (!isPremium) {
      incrementQuestions();
      setQuestionsUsed(getQuestionsUsed());
    }

    try {
      const resp = await askClaude(q, T.system, apiHistory, isPremiumPlus, UIX.aiTimeout, UIX.aiOffline);
      setChatHistory([...newHistory, { role: "assistant", content: resp }]);
    } catch(e) {
      setChatHistory([...newHistory, { role: "assistant", content: UIX.errorPrefix + (e?.message || String(e)) }]);
    } finally {
      setLoadingQ(false);
    }
  }

  const tabs = T.tabs.map((label, i) => ({ id: T.tabIds[i], label }));

  const btnPrimary = {
    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
    color: COLORS.onAccent, border: "none", borderRadius: 4,
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
            <div role="tablist" aria-label={T.subtitle} style={{ display: "flex", gap: 4, borderBottom: `1px solid ${COLORS.border}`, minWidth: "max-content" }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  role="tab" aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} id={`tab-${t.id}`}
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
                  <label style={fieldLabel}>{UIX.calibreStar}</label>
                  <select value={calibre} onChange={e => { setCalib(e.target.value); setCustomMun(""); setCustomResult(null); }}>
                    {CALIBRES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>

                </div>

                {/* Munition selector grouped by brand */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <label style={{...fieldLabel, flex:1}}>{UIX.munOptional}</label>
                    {isPremiumPlus && customMun && (
                      <button onClick={() => toggleFavori(calibre, customMun)} aria-label={isFavori(calibre,customMun) ? UIX.favorisRemove : UIX.favorisAdd} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:16, cursor:"pointer", padding:"0 0 6px" }}>
                        {isFavori(calibre, customMun) ? "★" : "☆"}
                      </button>
                    )}
                  </div>
                  <select value={customMun} onChange={e => setCustomMun(e.target.value)} style={{width:"100%"}}>
                    <option value="">— {T.selectionner} —</option>
                    {isPremiumPlus && calibre && (MUNITIONS_DATA[calibre] || []).filter(m => isFavori(calibre, m.label)).length > 0 && [
                      <option key="fav_h" disabled value="">⭐ {UIX.favorisGroup} ⭐</option>,
                      ...(MUNITIONS_DATA[calibre] || []).filter(m => isFavori(calibre, m.label)).map((m,i) => <option key={"fav"+i} value={m.label}>★ {m.label}</option>)
                    ]}
                    {calibre && ["RWS","Norma","GECO","Winchester","Hornady","Sako","Lapua"].flatMap(marque => {
                      const muns = (MUNITIONS_DATA[calibre] || []).filter(m => m.marque === marque);
                      if (!muns.length) return [];
                      return [
                        <option key={marque+"_h"} disabled value="">── {marque} ──</option>,
                        ...muns.map((m, i) => <option key={marque+i} value={m.label}>{m.label}</option>)
                      ];
                    })}
                  </select>
                  {isPremiumPlus && <p style={{ fontSize:10, color:COLORS.warnLine, fontStyle:"italic", marginTop:4 }}>⚠️ {UIX.favorisWarn}</p>}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={fieldLabel}>{T.distTirLabel} *</label>
                    {isPremium ? (
                      <select value={customDist} onChange={e => setCustomDist(parseInt(e.target.value, 10) || "")}>
                        <option value="">— {T.selectionner} —</option>
                        {Array.from({length: 30}, (_, i) => (i+1)*10).map(d => (
                          <option key={d} value={d}>{d} m</option>
                        ))}
                      </select>
                    ) : (
                      <select value={customDist} onChange={e => setCustomDist(parseInt(e.target.value, 10) || "")}>
                        <option value="">— {T.selectionner} —</option>
                        {[50, 100, 150, 200].map(d => <option key={d} value={d}>{d} m</option>)}
                      </select>
                    )}
                  </div>
                  <div>
                    <label style={fieldLabel}>{T.droLabel} *</label>
                    {isPremium ? (
                      <select value={customDRO} onChange={e => setCustomDRO(parseInt(e.target.value, 10) || "")}>
                        <option value="">— {T.selectionner} —</option>
                        {Array.from({length: 30}, (_, i) => (i+1)*10).map(d => (
                          <option key={d} value={d}>{d} m</option>
                        ))}
                      </select>
                    ) : (
                      <select value={customDRO} onChange={e => setCustomDRO(parseInt(e.target.value, 10) || "")}>
                        <option value="">— {T.selectionner} —</option>
                        {(CALIBRES.find(c => c.value === calibre)?.droOptions || [100,150,200,250,300]).map(d => (
                          <option key={d} value={d}>{d} m</option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <p style={{ fontSize: 11, color: COLORS.textMuted, fontStyle: "italic", lineHeight: 1.5, marginTop: 4, marginBottom: 14 }}>
                  {T.droHint}
                </p>

                {!isPremium && (
                  <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%" }}>{T.premiumBtn}</button>
                )}
              </div>

              {/* Cible SVG + Tableau */}
              {calibre && customDist && customDRO && (() => {
                // Calcul balistique simplifié (Pejsa)
                const munData = customMun ? (MUNITIONS_DATA[calibre] || []).find(m => m.label === customMun || m.label.trim() === customMun.trim()) : null;
                const v0 = munData ? munData.v0 : (() => {
                  const muns = MUNITIONS_DATA[calibre] || [];
                  return muns.length ? Math.round(muns.reduce((s, m) => s + m.v0, 0) / muns.length) : 800;
                })();
                const bc = munData ? resolveBC(munData.label, calibre) : (CAL_FALLBACK[calibre] || 0.40);
                const dro = customDRO;
                const stand = customDist;

                // Modèle balistique partagé — hauteur de visée selon le fabricant de la munition
                const dropAt = makeTrajectory(v0, bc, dro, munData ? sightHFor(munData.marque) : SIGHT_H_DEFAULT);

                const impact = dropAt(stand);
                const impStr = impact >= 0 ? `+${impact.toFixed(1)}` : impact.toFixed(1);
                const SC = 130/15;
                const impSVGY = -impact * SC;
                const impSVGX = 0;
                const ly = impSVGY > 20 ? impSVGY + 22 : impSVGY - 15;

                return (
                  <div style={{ marginTop: 14 }}>
                    {/* Conseil */}
                    <div style={{ background: COLORS.accentGlow, border: `1px solid ${COLORS.accent}40`, borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
                        {UIX.tuneTitle}
                      </div>
                      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: COLORS.white, lineHeight: 1.8 }}>
                        {UIX.impPre}<strong style={{color:COLORS.accent}}>{stand}m</strong>{UIX.impMid}<strong style={{color:COLORS.accent}}>{impStr} cm</strong> {impact >= 0 ? UIX.above : UIX.below} {UIX.fromCenter}<br/>
                        {UIX.droPre}<strong style={{color:COLORS.accent}}>{dro}m</strong>{UIX.droMid}<strong style={{color:COLORS.accent}}>0 cm</strong>.
                      </div>
                    </div>

                    {/* Cible */}
                    <div className="chassia-print-target" style={{ background: "white", borderRadius: 10, padding: 16, display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 14 }}>
                      <div className="chassia-print-header" style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: 10, fontFamily: "monospace", fontSize: "0.58rem", color: "#555" }}>
                        <div>
                          <strong style={{color:"#1a3a0a",fontSize:"0.85rem"}}>Chass<span style={{color:"#8bc34a"}}>IA</span></strong>
                          <div style={{color:"#888",fontSize:"0.5rem"}}>{T.subtitle}</div>
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
                        {[[calibre,UIX.calibreLabel],[`${stand}m`,"Stand"],[`${dro}m`,"DRO"],[`${impStr}cm`,`${UIX.atDist} ${stand}m`]].map(([v,l]) => (
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
                {[["carabine",UIX.modeCarabine],["fusil",UIX.modeFusil]].map(([mode, label]) => (
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
                      {isPremium && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.accent, marginLeft:8 }}>{UIX.upTo5}</span>}
                    </label>
                    <div>
                        <select onChange={e => {
                            const val = e.target.value;
                            if (!val) return;
                            const max = isPremium ? 5 : 1;
                            setGibierCMulti(prev => prev.includes(val) ? prev : prev.length < max ? [...prev, val] : isPremium ? prev : [val]);
                            e.target.value = "";
                          }}>
                          <option value="">{UIX.addGame}</option>
                          {calMode === "carabine" ? (
                            <>
                              <optgroup label={catLabel("🦌 Grand gibier", lang)}>
                                {["Cerf élaphe","Chevreuil","Sanglier","Daim","Mouflon"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{spLabel(g, lang)}</option>)}
                              </optgroup>
                              <optgroup label={catLabel("🦊 Autre gibier", lang)}>
                                {["Renard roux"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{spLabel(g, lang)}</option>)}
                              </optgroup>
                            </>
                          ) : (
                            <>
                              <optgroup label={catLabel("🐇 Petit gibier", lang)}>
                                {["Lièvre brun","Faisan de chasse","Perdrix grise","Bécasse des bois"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{spLabel(g, lang)}</option>)}
                              </optgroup>
                              <optgroup label={catLabel("🦊 Autre gibier", lang)}>
                                {["Lapin de garenne","Pigeon ramier","Renard roux"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{spLabel(g, lang)}</option>)}
                              </optgroup>
                              <optgroup label={catLabel("🦆 Gibier d'eau", lang)}>
                                {["Bernache du Canada","Canard colvert","Foulque macroule"].map(g =>
                                  <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{spLabel(g, lang)}</option>)}
                              </optgroup>
                            </>
                          )}
                        </select>
                        {gibierCMulti.length > 0 && (
                          <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:6 }}>
                            {gibierCMulti.map(g => (
                              <span key={g} onClick={() => setGibierCMulti(gibierCMulti.filter(x=>x!==g))}
                                style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, background: COLORS.accentGlow, border:`1px solid ${COLORS.accent}`, color: COLORS.accent, borderRadius:4, padding:"3px 8px", cursor:"pointer" }}>
                                {spLabel(g, lang)} ×
                              </span>
                            ))}
                            <span onClick={() => setGibierCMulti([])}
                              style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim, padding:"3px 6px", cursor:"pointer", alignSelf:"center" }}>
                              {UIX.clearAll}
                            </span>
                          </div>
                        )}
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim, marginTop:3 }}>
                          {gibierCMulti.length}/{isPremium ? 5 : 1} {UIX.selected}{lang==="fr" && gibierCMulti.length>1?"s":""}
                        </div>
                      </div>
                  </div>
                  <div>
                    <label style={fieldLabel}>{T.typeLabel}</label>
                    <select value={typeChasse} onChange={e => setTypeChasse(e.target.value)} disabled={calMode === "fusil"} style={calMode === "fusil" ? {opacity:0.4} : {}}>
                      <option value="">{calMode === "fusil" ? UIX.notApplicable : T.typePH}</option>
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
                    { cal:"9,3×62", note:noteAt(11, lang) },
                    { cal:"8×57 JS", note:noteAt(12, lang) },
                    { cal:".30-06 Springfield", note:noteAt(13, lang) },
                  ];
                } else if (isGrand && isVeryLong) {
                  recs = [
                    { cal:".300 Win Mag", note:noteAt(14, lang) },
                    { cal:"7mm Rem Mag", note:noteAt(15, lang) },
                    { cal:"6,5 PRC", note:noteAt(16, lang) },
                  ];
                } else if (isGrand && isLong) {
                  recs = [
                    { cal:".300 Win Mag", note:noteAt(17, lang) },
                    { cal:"7mm Rem Mag", note:noteAt(18, lang) },
                    { cal:".30-06 Springfield", note:noteAt(19, lang) },
                  ];
                } else if (isGrand && isShort) {
                  recs = [
                    { cal:"9,3×62", note:noteAt(20, lang) },
                    { cal:"8×57 JS", note:noteAt(21, lang) },
                    { cal:".30-06 Springfield", note:noteAt(22, lang) },
                  ];
                } else if (isGrand) {
                  recs = [
                    { cal:"9,3×62", note:noteAt(23, lang) },
                    { cal:".308 Winchester", note:noteAt(24, lang) },
                    { cal:".30-06 Springfield", note:noteAt(25, lang) },
                  ];
                } else if (isMoyen && isVeryLong) {
                  recs = [
                    { cal:"6,5 PRC", note:noteAt(26, lang) },
                    { cal:"6,5 Creedmoor", note:noteAt(27, lang) },
                    { cal:".270 Winchester", note:noteAt(28, lang) },
                  ];
                } else if (isMoyen && isLong) {
                  recs = [
                    { cal:"6,5 Creedmoor", note:noteAt(29, lang) },
                    { cal:"6,5×55 SE", note:noteAt(30, lang) },
                    { cal:".270 Winchester", note:noteAt(31, lang) },
                  ];
                } else if (isMoyen && isShort) {
                  recs = [
                    { cal:"7×64", note:noteAt(32, lang) },
                    { cal:".308 Winchester", note:noteAt(33, lang) },
                    { cal:"6,5×55 SE", note:noteAt(34, lang) },
                  ];
                } else if (isMoyen) {
                  recs = [
                    { cal:"7×64", note:noteAt(35, lang) },
                    { cal:"6,5×55 SE", note:noteAt(36, lang) },
                    { cal:".308 Winchester", note:noteAt(37, lang) },
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
                        ? { cal:"Fusil 10/89 ou 12/76 Mag", note:noteAt(38, lang) }
                        : { cal:"Fusil 12/76 Magnum", note:noteAt(39, lang) },
                      { cal:"Fusil 12/70", note:noteAt(40, lang) },
                      (hasBecasse && !hasFaisan && !hasLievre)
                        ? { cal:"Fusil 20/70 ou .410", note:noteAt(41, lang) }
                        : { cal:"Fusil 20/70", note:noteAt(42, lang) },
                    ];
                  } else if (isGibierEau) {
                    recs = [
                      { cal:"Fusil 10/89", note:noteAt(43, lang) },
                      { cal:"Fusil 12/76 Magnum", note:noteAt(44, lang) },
                      { cal:"Fusil 12/70", note:noteAt(45, lang) },
                    ];
                  } else if (hasBecasse && !hasFaisan && !hasLievre) {
                    recs = [
                      { cal:"Fusil 20/70", note:noteAt(46, lang) },
                      { cal:"Fusil .410", note:noteAt(47, lang) },
                      { cal:"Fusil 28/70", note:noteAt(48, lang) },
                    ];
                  } else if (hasLievre) {
                    recs = [
                      { cal:"Fusil 12/70", note:noteAt(49, lang) },
                      { cal:"Fusil 12/76 Magnum", note:noteAt(50, lang) },
                      { cal:"Fusil 16/70", note:noteAt(51, lang) },
                    ];
                  } else {
                    recs = [
                      { cal:"Fusil 12/70", note:noteAt(52, lang) },
                      { cal:"Fusil 20/70", note:noteAt(53, lang) },
                      { cal:"Fusil 16/70", note:noteAt(54, lang) },
                    ];
                  }
                } else if (isPetit) {
                  if (isVeryLong) {
                    recs = [
                      { cal:".243 Winchester", note:noteAt(55, lang) },
                      { cal:".22-250 Remington", note:noteAt(56, lang) },
                      { cal:"6,5 Creedmoor", note:noteAt(57, lang) },
                    ];
                  } else if (isLong) {
                    recs = [
                      { cal:".243 Winchester", note:noteAt(58, lang) },
                      { cal:".222 Remington", note:noteAt(59, lang) },
                      { cal:".22-250 Remington", note:noteAt(60, lang) },
                    ];
                  } else if (isShort) {
                    recs = [
                      { cal:".17 HMR", note:noteAt(61, lang) },
                      { cal:".22 Hornet", note:noteAt(62, lang) },
                      { cal:".222 Remington", note:noteAt(63, lang) },
                    ];
                  } else {
                    recs = [
                      { cal:".222 Remington", note:noteAt(64, lang) },
                      { cal:".243 Winchester", note:noteAt(65, lang) },
                      { cal:".17 HMR", note:noteAt(66, lang) },
                    ];
                  }
                } else {
                  if (isVeryLong) {
                    recs = [
                      { cal:".300 Win Mag", note:noteAt(67, lang) },
                      { cal:"6,5 PRC", note:noteAt(68, lang) },
                      { cal:"7mm Rem Mag", note:noteAt(69, lang) },
                    ];
                  } else if (isLong) {
                    recs = [
                      { cal:"6,5 Creedmoor", note:noteAt(70, lang) },
                      { cal:".270 Winchester", note:noteAt(71, lang) },
                      { cal:".30-06 Springfield", note:noteAt(72, lang) },
                    ];
                  } else if (isShort) {
                    recs = [
                      { cal:"7×64", note:noteAt(73, lang) },
                      { cal:".308 Winchester", note:noteAt(74, lang) },
                      { cal:"8×57 JS", note:noteAt(75, lang) },
                    ];
                  } else {
                    recs = [
                      { cal:"7×64", note:noteAt(76, lang) },
                      { cal:".308 Winchester", note:noteAt(77, lang) },
                      { cal:"6,5 Creedmoor", note:noteAt(78, lang) },
                    ];
                  }
                }

                return (
                  <div className="fade-in">
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, marginTop:4 }}>
                      {isFusilRec ? UIX.fusilRec : UIX.calRec} pour {gibiers.join(" · ")}{typeChasse ? ` · ${typeChasse}` : ""}{distC ? ` · ${distC}m` : ""}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
                      {recs.map((r, i) => (
                        <div key={r.cal} style={{ background: COLORS.bgInput, border:`1px solid ${isFusilRec ? "#ff9800" : COLORS.accent}30`, borderLeft:`3px solid ${isFusilRec ? "#ff9800" : COLORS.accent}`, borderRadius:7, padding:"12px 14px" }}>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: isFusilRec ? "#ff9800" : COLORS.accent, fontWeight:600, marginBottom:4 }}>{isFusilRec ? "🔫" : ""} {UIX.suggestion} {i+1}</div>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, color: COLORS.white, marginBottom:6 }}>{fusilTerm(r.cal, lang)}</div>
                          <div style={{ fontSize:"0.85rem", color: COLORS.textDim, fontStyle:"italic", lineHeight:1.5 }}>{r.note}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bouton IA Premium */}
                    {isPremium ? (
                      <button onClick={conseillerCalibre} disabled={loadingC}
                        style={{ ...btnPrimary, width:"100%", background:"transparent", color: COLORS.accent, border:`1px solid ${COLORS.accent}`, fontSize:12 }}>
                        {loadingC ? T.btnCalLoading : UIX.aiDeepBtn}
                      </button>
                    ) : (
                      <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%" }}>{T.premiumBtn}</button>
                    )}

                    {loadingC && <Loader lang={lang} />}
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
                <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%", marginTop:8 }}>{T.premiumBtn}</button>
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
                {[["carabine",UIX.modeCarabine],["fusil",UIX.modeFusil],["comparateur",UIX.modeComparer]].map(([mode, label]) => (
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
                          {T.gibierLabel}
                          {isPremium && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.accent, marginLeft:8 }}>{UIX.upTo5}</span>}
                        </label>
                        <div>
                            <select onChange={e => {
                                const val = e.target.value;
                                if (!val) return;
                                const max = isPremium ? 5 : 1;
                                setGibierMMulti(prev => prev.includes(val) ? prev : prev.length < max ? [...prev, val] : isPremium ? prev : [val]);
                                setConseilMun(null);
                                e.target.value = "";
                              }}>
                              <option value="">{UIX.addGame}</option>
                              <optgroup label={catLabel("🦌 Grand gibier", lang)}>
                                {["Cerf élaphe","Chevreuil","Sanglier","Daim","Mouflon"].map(g =>
                                  <option key={g} value={g} disabled={gibierMMulti.includes(g)}>{gibierMMulti.includes(g)?"✓ ":""}{spLabel(g, lang)}</option>)}
                              </optgroup>
                              <optgroup label={catLabel("🦊 Autre gibier", lang)}>
                                {["Renard roux"].map(g =>
                                  <option key={g} value={g} disabled={gibierMMulti.includes(g)}>{gibierMMulti.includes(g)?"✓ ":""}{spLabel(g, lang)}</option>)}
                              </optgroup>
                            </select>
                            {gibierMMulti.length > 0 && (
                              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:6 }}>
                                {gibierMMulti.map(g => (
                                  <span key={g} onClick={() => { setGibierMMulti(gibierMMulti.filter(x=>x!==g)); setConseilMun(null); }}
                                    style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, background: COLORS.accentGlow, border:`1px solid ${COLORS.accent}`, color: COLORS.accent, borderRadius:4, padding:"3px 8px", cursor:"pointer" }}>
                                    {spLabel(g, lang)} ×
                                  </span>
                                ))}
                                <span onClick={() => { setGibierMMulti([]); setConseilMun(null); }}
                                  style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim, padding:"3px 6px", cursor:"pointer", alignSelf:"center" }}>
                                  {UIX.clearAll}
                                </span>
                              </div>
                            )}
                            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim, marginTop:3 }}>
                              {gibierMMulti.length}/{isPremium ? 5 : 1} {UIX.selected}{lang==="fr" && gibierMMulti.length>1?"s":""}
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
                      <label style={fieldLabel}>{T.typeLabel}</label>
                      <select value={typeM} onChange={e => setTypeM(e.target.value)}>
                        <option value="">{T.typePH}</option>
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
                      ? UIX.modeDescBattue
                      : isAffut
                      ? UIX.modeDescAffut
                      : UIX.modeDescPoly;

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
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.accent, fontWeight:600 }}>{UIX.suggestion} {i+1}</span>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: rec.sansPlomb ? COLORS.leadFree : COLORS.textMuted }}>
                                  {rec.sansPlomb ? UIX.leadFreeShort : UIX.leadShort}
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
                            <div style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.leadFree}40`, borderLeft:`3px solid ${COLORS.leadFree}`, borderRadius:7, padding:"12px 14px" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.leadFree, fontWeight:600 }}>{UIX.leadFreeToggle}</span>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.leadFree }}>{UIX.wetlandMandatory}</span>
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

                  {loadingM && <Loader lang={lang} />}
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
                      {loadingM ? T.btnCalLoading : UIX.moreChoicesBtn}
                    </button>
                  )}

                  {/* Premium upsell — toujours visible */}
                  {!isPremium && (
                    <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%", marginTop:8 }}>{T.premiumBtn}</button>
                  )}
                </div>
              )}

              {munMode === "fusil" && (
                <div>
                  <div style={card}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={fieldLabel}>{T.gibierLabel}</label>
                        <select value={gibierM} onChange={e => setGibierM(e.target.value)}>
                          <option value="">— {T.selectionner} —</option>
                          <optgroup label={catLabel("🐇 Petit gibier", lang)}>
                            <option value="Lièvre brun">{spLabel("Lièvre brun", lang)}</option>
                            <option value="Faisan de chasse">{spLabel("Faisan de chasse", lang)}</option>
                            <option value="Perdrix grise">{spLabel("Perdrix grise", lang)}</option>
                            <option value="Bécasse des bois">{spLabel("Bécasse des bois", lang)}</option>
                          </optgroup>
                          <optgroup label={catLabel("🦊 Autre gibier", lang)}>
                            <option value="Lapin de garenne">{spLabel("Lapin de garenne", lang)}</option>
                            <option value="Pigeon ramier">{spLabel("Pigeon ramier", lang)}</option>
                            <option value="Renard roux">{spLabel("Renard roux", lang)}</option>
                          </optgroup>
                          <optgroup label={catLabel("🦆 Gibier d'eau", lang)}>
                            <option value="Bernache du Canada">{spLabel("Bernache du Canada", lang)}</option>
                            <option value="Canard colvert">{spLabel("Canard colvert", lang)}</option>
                            <option value="Foulque macroule">{spLabel("Foulque macroule", lang)}</option>
                          </optgroup>
                        </select>
                      </div>
                      <div>
                        <label style={fieldLabel}>{UIX.calibreFusil}</label>
                        <select value={calibreFusil} onChange={e => setCaliFusil(e.target.value)}>
                          <option value="">— {T.selectionner} —</option>
                          {FUSIL_CALIBRES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                        </select>
                        {calibreFusil && (() => {
                          const fc = FUSIL_CALIBRES.find(c => c.value === calibreFusil);
                          return fc ? (
                            <div style={{ marginTop:6, fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>
                              {UIX.chambres} {fc.chambres.join(", ")}
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
                            {UIX.carbineRedirect}
                          </p>
                        </div>
                      );
                      return (
                        <div style={{ background: COLORS.bgInput, borderRadius:8, padding:"16px", border:`1px solid ${COLORS.accent}40`, marginBottom:16 }} className="fade-in">
                          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                            <div style={{ background: COLORS.bgCard, borderRadius:6, padding:"10px 12px", textAlign:"center" }}>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted, textTransform:"uppercase", marginBottom:4 }}>{UIX.plombsRec}</div>
                              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.2rem", color: COLORS.accent, fontWeight:700 }}>{fusilTerm(rec.plombs, lang)}</div>
                            </div>
                            <div style={{ background: COLORS.bgCard, borderRadius:6, padding:"10px 12px", textAlign:"center" }}>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted, textTransform:"uppercase", marginBottom:4 }}>{UIX.chargeConseil}</div>
                              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.1rem", color: COLORS.white, fontWeight:600 }}>{fusilTerm(rec.charge, lang)}</div>
                            </div>
                            <div style={{ background: COLORS.bgCard, borderRadius:6, padding:"10px 12px", textAlign:"center" }}>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted, textTransform:"uppercase", marginBottom:4 }}>{UIX.calibreLabel}</div>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.white }}>{calibreFusil}</div>
                            </div>
                          </div>
                          <div style={{ fontSize:"0.88rem", color: COLORS.textMuted, fontStyle:"italic", lineHeight:1.6 }}>
                            💡 {noteAt(rec.note, lang)}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Bouton IA — Premium uniquement, visible après sélection */}
                    {isPremium && (
                      <button style={{ ...btnPrimary, opacity: (!gibierM || !calibreFusil) ? 0.5 : 1 }}
                        onClick={conseillerMunitionFusil}
                        disabled={loadingM || !gibierM || !calibreFusil}>
                        {loadingM ? T.btnCalLoading : UIX.deepAdviceBtn}
                      </button>
                    )}
                  </div>

                  {loadingM && <Loader lang={lang} />}
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
                    <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%", marginTop:8 }}>{T.premiumBtn}</button>
                  )}
                </div>
              )}

              {/* ── MODE COMPARATEUR ── */}
              {munMode === "comparateur" && (() => {
                const list = MUNITIONS_DATA[compCalibre] || [];
                const MARQUES = ["RWS","Norma","GECO","Winchester","Hornady","Sako","Lapua"];
                const favMuns = isPremiumPlus ? list.filter(m => isFavori(compCalibre, m.label)) : [];
                const munOptionsFav = favMuns.length > 0 ? [
                  <option key="fav_h" disabled value="">⭐ {UIX.favorisGroup} ⭐</option>,
                  ...favMuns.map((m,i) => <option key={"fav"+i} value={m.label}>★ {m.label}</option>)
                ] : [];
                const munOptions = [...munOptionsFav, ...MARQUES.flatMap(marque => {
                  const muns = list.filter(m => m.marque === marque);
                  if (!muns.length) return [];
                  return [
                    <option key={marque+"_h"} disabled value="">── {marque} ──</option>,
                    ...muns.map((m, i) => <option key={marque+i} value={m.label}>{m.label}</option>)
                  ];
                })];
                // BC via la fonction partagée resolveBC (définie plus haut)
                const getBC = (label) => resolveBC(label, compCalibre);
                // Calcul trajectoire (modèle calibré identique onglet cible)
                const m1 = list.find(m => m.label === compMun1);
                const m2 = list.find(m => m.label === compMun2);
                const m3 = isPremium ? list.find(m => m.label === compMun3) : null;
                const m4 = isPremiumPlus ? list.find(m => m.label === compMun4) : null;
                const DISTS = [25,50,75,100,125,150,175,200,250,300];
                const f1 = m1 ? makeTrajectory(m1.v0, getBC(m1.label), compDRO, sightHFor(m1.marque)) : null;
                const f2 = m2 ? makeTrajectory(m2.v0, getBC(m2.label), compDRO, sightHFor(m2.marque)) : null;
                const f3 = m3 ? makeTrajectory(m3.v0, getBC(m3.label), compDRO, sightHFor(m3.marque)) : null;
                const f4 = m4 ? makeTrajectory(m4.v0, getBC(m4.label), compDRO, sightHFor(m4.marque)) : null;
                // Échelle graphique
                const allVals = [];
                if (f1) DISTS.forEach(d => allVals.push(f1(d)));
                if (f2) DISTS.forEach(d => allVals.push(f2(d)));
                if (f3) DISTS.forEach(d => allVals.push(f3(d)));
                if (f4) DISTS.forEach(d => allVals.push(f4(d)));
                const maxA = allVals.length ? Math.max(8, ...allVals.map(Math.abs)) : 20;
                const W = 300, H = 200, padL = 32, padB = 24, padT = 12, padR = 8;
                const xPos = d => padL + (d/300)*(W-padL-padR);
                const yPos = v => padT + (H-padT-padB)/2 - (v/maxA)*((H-padT-padB)/2);
                const pathOf = f => DISTS.map((d,i) => `${i===0?"M":"L"}${xPos(d).toFixed(1)},${yPos(f(d)).toFixed(1)}`).join(" ");

                return (
                  <div className="fade-in">
                    <p style={{ color: COLORS.textDim, fontSize:"0.95rem", marginBottom:16, fontStyle:"italic" }}>
                      {UIX.compareIntro} {isPremiumPlus ? UIX.compareMax4 : isPremium ? UIX.compareMax3 : UIX.compareFree}
                    </p>

                    {/* Calibre */}
                    <label style={fieldLabel}>{UIX.calibreLabel}</label>
                    <select value={compCalibre} onChange={e => { setCompCalibre(e.target.value); setCompMun1(""); setCompMun2(""); setCompMun3(""); setCompMun4(""); }} style={{width:"100%", marginBottom:14}}>
                      {CALIBRES.filter(c => MUNITIONS_DATA[c.value]).map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>

                    {/* DRO */}
                    <label style={fieldLabel}>{UIX.droCompLabel} : {compDRO}m</label>
                    <input type="range" min="50" max="250" step="10" value={compDRO}
                      onChange={e => setCompDRO(parseInt(e.target.value, 10))}
                      style={{ width:"100%", accentColor: COLORS.accent, marginBottom:14 }} />

                    {/* Sélecteurs munitions */}
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 }}>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <label style={{...fieldLabel, color:COLORS.compare1, flex:1}}>● {UIX.munition} 1</label>
                          {isPremiumPlus && compMun1 && (
                            <button onClick={() => toggleFavori(compCalibre, compMun1)} aria-label={isFavori(compCalibre,compMun1) ? UIX.favorisRemove : UIX.favorisAdd} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:14, cursor:"pointer", padding:"0 0 4px" }}>{isFavori(compCalibre, compMun1) ? "★" : "☆"}</button>
                          )}
                        </div>
                        <select value={compMun1} onChange={e => setCompMun1(e.target.value)} style={{width:"100%"}}>
                          <option value="">— {T.selectionner} —</option>
                          {munOptions}
                        </select>
                      </div>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <label style={{...fieldLabel, color:COLORS.compare2, flex:1}}>● {UIX.munition} 2</label>
                          {isPremiumPlus && compMun2 && (
                            <button onClick={() => toggleFavori(compCalibre, compMun2)} aria-label={isFavori(compCalibre,compMun2) ? UIX.favorisRemove : UIX.favorisAdd} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:14, cursor:"pointer", padding:"0 0 4px" }}>{isFavori(compCalibre, compMun2) ? "★" : "☆"}</button>
                          )}
                        </div>
                        <select value={compMun2} onChange={e => setCompMun2(e.target.value)} style={{width:"100%"}}>
                          <option value="">— {T.selectionner} —</option>
                          {munOptions}
                        </select>
                      </div>
                      {isPremium ? (
                        <div>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <label style={{...fieldLabel, color:COLORS.compare3, flex:1}}>● {UIX.munition} 3 <span style={{fontSize:9, color:COLORS.accent}}>Premium</span></label>
                            {isPremiumPlus && compMun3 && (
                              <button onClick={() => toggleFavori(compCalibre, compMun3)} aria-label={isFavori(compCalibre,compMun3) ? UIX.favorisRemove : UIX.favorisAdd} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:14, cursor:"pointer", padding:"0 0 4px" }}>{isFavori(compCalibre, compMun3) ? "★" : "☆"}</button>
                            )}
                          </div>
                          <select value={compMun3} onChange={e => setCompMun3(e.target.value)} style={{width:"100%"}}>
                            <option value="">— {T.selectionner} —</option>
                            {munOptions}
                          </select>
                        </div>
                      ) : (
                        <div style={{ gridColumn:"1 / -1" }}>
                          <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%" }}>{T.premiumBtn}</button>
                        </div>
                      )}
                      {isPremiumPlus ? (
                        <div>
                          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                            <label style={{...fieldLabel, color:COLORS.compare4, flex:1}}>● {UIX.munition} 4 <span style={{fontSize:9, color:COLORS.accent}}>Premium+</span></label>
                            {compMun4 && (
                              <button onClick={() => toggleFavori(compCalibre, compMun4)} aria-label={isFavori(compCalibre,compMun4) ? UIX.favorisRemove : UIX.favorisAdd} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:14, cursor:"pointer", padding:"0 0 4px" }}>{isFavori(compCalibre, compMun4) ? "★" : "☆"}</button>
                            )}
                          </div>
                          <select value={compMun4} onChange={e => setCompMun4(e.target.value)} style={{width:"100%"}}>
                            <option value="">— {T.selectionner} —</option>
                            {munOptions}
                          </select>
                        </div>
                      ) : isPremium ? (
                        <div>
                          <label style={{...fieldLabel, visibility:"hidden"}}>●</label>
                          <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%" }}>{UIX.premiumPlusBtn}</button>
                        </div>
                      ) : null}
                    </div>
                    {isPremiumPlus && <p style={{ fontSize:10, color:COLORS.warnLine, fontStyle:"italic", marginTop:-10, marginBottom:14 }}>⚠️ {UIX.favorisWarn}</p>}

                    {/* Graphique */}
                    {(f1 || f2 || f3 || f4) ? (
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
                          <text x={W/2} y={H-2} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="#666">{UIX.distanceM}</text>
                          {/* DRO marker */}
                          <line x1={xPos(compDRO)} y1={padT} x2={xPos(compDRO)} y2={H-padB} stroke="#2e7d32" strokeWidth="1" strokeDasharray="3,2"/>
                          <text x={xPos(compDRO)} y={padT+8} textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#2e7d32">DRO</text>
                          {/* Courbes */}
                          {f1 && <path d={pathOf(f1)} fill="none" stroke={COLORS.compare1} strokeWidth="2"/>}
                          {f2 && <path d={pathOf(f2)} fill="none" stroke={COLORS.compare2} strokeWidth="2"/>}
                          {f3 && <path d={pathOf(f3)} fill="none" stroke={COLORS.compare3} strokeWidth="2"/>}
                          {f4 && <path d={pathOf(f4)} fill="none" stroke={COLORS.compare4} strokeWidth="2"/>}
                        </svg>
                        {/* Légende */}
                        <div style={{ display:"flex", flexDirection:"column", gap:4, marginTop:8, fontFamily:"monospace", fontSize:"0.7rem" }}>
                          {m1 && <div style={{color:COLORS.compare1}}>● {m1.label} — {m1.v0} m/s · BC {getBC(m1.label)}</div>}
                          {m2 && <div style={{color:COLORS.compare2}}>● {m2.label} — {m2.v0} m/s · BC {getBC(m2.label)}</div>}
                          {m3 && <div style={{color:COLORS.compare3}}>● {m3.label} — {m3.v0} m/s · BC {getBC(m3.label)}</div>}
                          {m4 && <div style={{color:COLORS.compare4}}>● {m4.label} — {m4.v0} m/s · BC {getBC(m4.label)}</div>}
                        </div>
                      </div>
                    ) : (
                      <div style={{ ...card, borderStyle:"dashed" }}>
                        <p style={{ color: COLORS.textDim, fontStyle:"italic", fontSize:"0.95rem", textAlign:"center" }}>
                          {UIX.compSelectOne}
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
                              <th style={{ padding:"6px 8px", textAlign:"right", color:COLORS.compare1 }}>Mun.1</th>
                              <th style={{ padding:"6px 8px", textAlign:"right", color:COLORS.compare2 }}>Mun.2</th>
                              {f3 && <th style={{ padding:"6px 8px", textAlign:"right", color:COLORS.compare3 }}>Mun.3</th>}
                              {f4 && <th style={{ padding:"6px 8px", textAlign:"right", color:COLORS.compare4 }}>Mun.4</th>}
                              {!f3 && !f4 && <th style={{ padding:"6px 8px", textAlign:"right", color:COLORS.textMuted }}>Δ</th>}
                            </tr>
                          </thead>
                          <tbody>
                            {[50,100,150,200,250,300].map(d => {
                              const v1=f1(d), v2=f2(d), v3=f3?f3(d):null, v4=f4?f4(d):null;
                              return (
                                <tr key={d} style={{ borderTop:`1px solid ${COLORS.border}` }}>
                                  <td style={{ padding:"5px 8px", color:COLORS.text }}>{d}m</td>
                                  <td style={{ padding:"5px 8px", textAlign:"right", color:COLORS.compare1 }}>{v1>0?"+":""}{v1.toFixed(1)}</td>
                                  <td style={{ padding:"5px 8px", textAlign:"right", color:COLORS.compare2 }}>{v2>0?"+":""}{v2.toFixed(1)}</td>
                                  {f3 && <td style={{ padding:"5px 8px", textAlign:"right", color:COLORS.compare3 }}>{(v3 ?? 0)>0?"+":""}{(v3 ?? 0).toFixed(1)}</td>}
                                  {f4 && <td style={{ padding:"5px 8px", textAlign:"right", color:COLORS.compare4 }}>{(v4 ?? 0)>0?"+":""}{(v4 ?? 0).toFixed(1)}</td>}
                                  {!f3 && !f4 && <td style={{ padding:"5px 8px", textAlign:"right", color:COLORS.textMuted }}>{Math.abs(v1-v2).toFixed(1)}</td>}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <div style={{ padding:"6px 8px", fontFamily:"monospace", fontSize:"0.6rem", color:COLORS.textDim, textAlign:"center" }}>
                          {UIX.chartLegend}{(!f3 && !f4) ? UIX.chartDelta : ""}
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
                      <span style={{ color: questionsUsed >= MAX_FREE ? COLORS.limit : COLORS.textMuted }}>
                        {questionsUsed >= MAX_FREE
                          ? T.limitLabel
                          : `${MAX_FREE - questionsUsed} ${T.freeLabel}`}
                      </span>
                    </div>
                  )}
                  {isPremium && (
                    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 11, color: COLORS.accent }}>
                        🌿 {isPremiumPlus ? "PREMIUM+" : "PREMIUM"} — {currentQuotaCap} {UIX.creditsLabel}
                      </div>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textDim, display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ color: COLORS.accent }}>⚡</span> {isPremiumPlus ? UIX.opusAnalysis : UIX.sonnetAnalysis}
                      </div>
                      {!isPremiumPlus && (
                        <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer", width:"100%", marginTop:8 }}>★★ {UIX.upgradeNudge}</button>
                      )}
                    </div>
                  )}
                </div>
                {/* Free : bouton gate-style · Premium/Premium+ : badge de statut compact (toggle démo) */}
                {!isPremium ? (
                  <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
                    {T.premiumBtn}
                  </button>
                ) : (
                  <button onClick={openTierModal}
                    style={{
                      background: isPremiumPlus ? COLORS.accent : COLORS.accentGlow,
                      border: `1px solid ${COLORS.accent}`,
                      borderRadius: 4, color: isPremiumPlus ? "#0d0f0a" : COLORS.accent,
                      padding: "6px 14px", fontSize: 11,
                      fontFamily:"'IBM Plex Mono',monospace", cursor:"pointer",
                      transition: "all 0.2s", whiteSpace:"nowrap",
                    }}>
                    {isPremiumPlus ? T.premiumPlusActive : T.premiumActive}
                  </button>
                )}
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
                  <button onClick={openTierModal}
                    style={{ ...btnPrimary, marginTop: 16, padding:"10px 32px" }}>
                    {T.premiumBtn}
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
                      <Loader lang={lang} />
                    </div>
                  )}
                </div>
              )}

              {chatHistory.length === 0 && !loadingQ && (
                <div style={{ ...card, borderStyle:"dashed" }}>
                  <p style={{ color: COLORS.textDim, fontStyle:"italic", textAlign:"center", fontSize:"0.95rem", marginBottom: 12 }}>
                    {UIX.examplesTitle}
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
                    aria-label={T.assistIntro}
                    disabled={!canAsk || loadingQ}
                    maxLength={2000}
                    rows={2}
                    style={{
                      width:"100%", background: COLORS.bgInput,
                      border:`1px solid ${canAsk ? COLORS.border : COLORS.limit + "40"}`,
                      borderRadius: 8, padding:"10px 14px", color: COLORS.text,
                      fontFamily:"'Crimson Pro',serif", fontSize:"1rem",
                      outline:"none", resize:"none", lineHeight: 1.5,
                      opacity: canAsk ? 1 : 0.5, transition:"border 0.2s",
                    }}
                  />
                </div>
                <button
                  onClick={poserQuestion}
                  aria-label={T.assistIntro}
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
                <div style={{ marginTop: 6, display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
                  <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textDim, margin:0 }}>
                    {T.freeNote}
                  </p>
                </div>
              )}

              {/* Bouton effacer l'historique */}
              {chatHistory.length > 0 && (
                <button onClick={() => setChatHistory([])}
                  style={{ background:"transparent", border:"none", color: COLORS.textDim, fontSize: 11, fontFamily:"'IBM Plex Mono',monospace", cursor:"pointer", marginTop: 8, padding: 0 }}>
                  {UIX.clearConv}
                </button>
              )}
            </div>
          )}

          {/* ── TAB 5 : GIBIER ── */}
          {tab === "gibier" && (
            <div className="fade-in">
              <p style={{ color: COLORS.textMuted, fontStyle:"italic", marginBottom: 20, fontSize:"1.05rem" }}>
                {GIBIER.intro}
              </p>
              {GIBIER.cats.map(cat => (
                <div key={cat.title} style={card}>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.accent, marginBottom:14, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                    {cat.title}
                  </div>
                  {cat.sp.map(g => cat.big ? (
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
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#8aab5a", textTransform:"uppercase", marginBottom:4 }}>🇧🇪 {GIBIER.regionW}</div>
                          <div style={{ fontSize:"0.85rem", color: COLORS.textMuted, lineHeight:1.5 }}>{g.w}</div>
                        </div>
                        <div style={{ background: COLORS.bgInput, borderRadius:6, padding:"8px 12px", border:`1px solid ${COLORS.border}` }}>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:"#f0c040", textTransform:"uppercase", marginBottom:4 }}>🇧🇪 {GIBIER.regionF}</div>
                          <div style={{ fontSize:"0.85rem", color: COLORS.textMuted, lineHeight:1.5 }}>{g.f}</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={g.nom} style={{ display:"flex", gap:12, marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${COLORS.border}`, alignItems:"flex-start" }}>
                      <span style={{ fontSize:20, flexShrink:0 }}>{g.emoji}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:600, color: COLORS.white, marginBottom:4 }}>{g.nom}</div>
                        <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:6 }}>
                          <span style={{ fontSize:"0.82rem", color: COLORS.textMuted }}><span style={{color:"#8aab5a"}}>{GIBIER.wLabel}</span> {g.w}</span>
                          <span style={{ fontSize:"0.82rem", color: COLORS.textMuted }}><span style={{color:"#f0c040"}}>{GIBIER.fLabel}</span> {g.f}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {cat.leadBan && (
                    <div style={{ background:"rgba(231,76,60,0.08)", border:"1px solid rgba(231,76,60,0.25)", borderRadius:6, padding:"10px 14px", marginTop:8 }}>
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.alert }}>{GIBIER.leadTag}</span>
                      <span style={{ fontSize:"0.85rem", color: COLORS.textMuted, marginLeft:10 }}>{GIBIER.leadText}</span>
                    </div>
                  )}
                </div>
              ))}
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textDim, textAlign:"center", padding:"8px 0" }}>
                {GIBIER.footnote}
              </div>
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
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:16, color:COLORS.white, fontWeight:700, marginBottom:8 }}>{CN.gateTitle}</div>
                    <p style={{ color:COLORS.textMuted, fontSize:"0.95rem", marginBottom:20 }}>{CN.gateDesc}</p>
                    <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer" }}>{T.premiumBtn}</button>
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
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:16, color:COLORS.white, fontWeight:700 }}>{CN.title}</div>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textMuted }}>{CN.season} {carnetSaison} · {filtered.length} {filtered.length!==1?CN.takes:CN.take}</div>
                      </div>
                      <button onClick={() => { setCarnetDraft({...emptyForm, saison:getSaison()}); setCarnetSaveError(""); setCarnetPhotoError(""); setCarnetView("form"); }}
                        style={{ background:COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:7, padding:"8px 14px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:700, cursor:"pointer" }}>
                        {CN.newTake}
                      </button>
                    </div>

                    {/* Bannière sauvegarde */}
                    <div style={{ background:COLORS.warnBg, border:`1px solid ${COLORS.warnLine}40`, borderRadius:8, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"flex-start", gap:10 }}>
                      <span style={{ fontSize:14, flexShrink:0 }}>⚠️</span>
                      <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.warnLine, lineHeight:1.6 }}>
                        {CN.backupWarn}
                      </span>
                    </div>

                    {/* Sélecteur de saison + vue */}
                    <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                      <select value={carnetSaison} onChange={e => setCarnetSaison(e.target.value)} style={{ flex:1 }}>
                        {[getSaison(), ...saisons.filter(s=>s!==getSaison())].map(s => <option key={s} value={s}>{CN.season} {s}</option>)}
                      </select>
                      {[["liste",CN.viewList],["stats",CN.viewStats]].map(([v,l]) => (
                        <button key={v} onClick={() => setCarnetView(v)} style={{ padding:"8px 12px", borderRadius:6, border:`1px solid ${carnetView===v?COLORS.accent:COLORS.border}`, background: carnetView===v?COLORS.accentGlow:"transparent", color: carnetView===v?COLORS.accent:COLORS.textMuted, fontFamily:"'IBM Plex Mono',monospace", fontSize:11, cursor:"pointer" }}>{l}</button>
                      ))}
                    </div>

                    {/* Rapport de saison PDF (Premium+) */}
                    {carnetView === "stats" && (
                      isPremiumPlus ? (
                        <button onClick={() => {
                          const escR = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
                          const rows = filtered.slice().sort((a,b)=>(a.date||"").localeCompare(b.date||"")).map(e => `
                            <tr style="border-bottom:1px solid #ddd">
                              <td style="padding:3px 6px">${escR(e.date || "—")}</td>
                              <td style="padding:3px 6px">${escR(spLabel(e.espece,lang))}</td>
                              <td style="padding:3px 6px">${escR(CN.optSexe[e.sexe] || e.sexe || "—")}</td>
                              <td style="padding:3px 6px">${escR(e.calibre || "—")}</td>
                              <td style="text-align:right;padding:3px 6px">${e.distance ? escR(e.distance)+"m" : "—"}</td>
                              <td style="text-align:right;padding:3px 6px">${e.poids ? escR(e.poids)+"kg" : "—"}</td>
                              <td style="padding:3px 6px">${escR(e.lieu || "—")}</td>
                            </tr>`).join("");
                          const tableOrEmpty = filtered.length > 0 ? `
                            <table style="width:100%;border-collapse:collapse;font-family:'IBM Plex Mono',monospace;font-size:9px;color:#000">
                              <thead><tr style="border-bottom:1px solid #000">
                                <th style="text-align:left;padding:3px 6px">${escR(CN.fields.date)}</th>
                                <th style="text-align:left;padding:3px 6px">${escR(CN.fields.espece)}</th>
                                <th style="text-align:left;padding:3px 6px">${escR(CN.fields.sexe)}</th>
                                <th style="text-align:left;padding:3px 6px">${escR(CN.fields.calibre)}</th>
                                <th style="text-align:right;padding:3px 6px">${escR(CN.fields.distance)}</th>
                                <th style="text-align:right;padding:3px 6px">${escR(CN.fields.poids)}</th>
                                <th style="text-align:left;padding:3px 6px">${escR(CN.fields.lieu)}</th>
                              </tr></thead>
                              <tbody>${rows}</tbody>
                            </table>` : `<p style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#666;font-style:italic">${escR(CN.noData)}</p>`;
                          const bySpeciesLine = Object.keys(statEspeces).length > 0
                            ? `<div><strong>${escR(CN.bySpecies)}</strong> : ${escR(Object.entries(statEspeces).sort((a,b)=>b[1]-a[1]).map(([esp,n]) => `${spLabel(esp,lang)} (${n})`).join(" · "))}</div>` : "";
                          const byCaliberLine = Object.keys(statCalibres).length > 0
                            ? `<div><strong>${escR(CN.byCaliber)}</strong> : ${escR(Object.entries(statCalibres).sort((a,b)=>b[1]-a[1]).map(([cal,n]) => `${cal} (${n})`).join(" · "))}</div>` : "";
                          const distLine = filtered.some(e=>e.distance)
                            ? `<div><strong>${escR(CN.avgDist)}</strong> : ${Math.round(filtered.filter(e=>e.distance).reduce((a,e)=>a+parseFloat(e.distance),0)/filtered.filter(e=>e.distance).length)}m${filtered.some(e=>e.poids) ? ` · <strong>${escR(CN.avgWeight)}</strong> : ${Math.round(filtered.filter(e=>e.poids).reduce((a,e)=>a+parseFloat(e.poids),0)/filtered.filter(e=>e.poids).length*10)/10}kg` : ""}</div>` : "";
                          const html = `
                            <h1 style="font-family:'Playfair Display',serif;font-size:20px;color:#000;margin:0 0 4px">ChassIA — ${escR(CN.reportTitle)}</h1>
                            <p style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#333;margin:0 0 16px">${escR(CN.season)} ${escR(carnetSaison)} · ${escR(CN.reportGenerated)} ${escR(new Date().toLocaleDateString(lang))}</p>
                            <div style="margin-bottom:16px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#000;line-height:1.8">
                              <div><strong>${escR(CN.takesSeasonStat)}</strong> : ${filtered.length}</div>
                              ${bySpeciesLine}${byCaliberLine}${distLine}
                            </div>
                            ${tableOrEmpty}
                          `;
                          const el = document.createElement("div");
                          el.className = "chassia-print-carnet";
                          el.innerHTML = html;
                          document.body.appendChild(el);
                          document.body.classList.add("printing-carnet");
                          const cleanup = () => {
                            document.body.classList.remove("printing-carnet");
                            if (el.parentNode) el.parentNode.removeChild(el);
                            window.removeEventListener("afterprint", cleanup);
                          };
                          window.addEventListener("afterprint", cleanup);
                          setPrintFormat("A4"); setTimeout(() => window.print(), 150);
                        }} style={{ ...btnPrimary, width:"100%", marginBottom:16, background:"transparent", border:`1px solid ${COLORS.accent}`, color:COLORS.accent, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                          <span>⎙</span> {CN.reportBtn}
                        </button>
                      ) : (
                        <button onClick={openTierModal} style={{ ...btnPrimary, width:"100%", marginBottom:16, fontSize:12 }}>
                          {UIX.premiumPlusBtn}
                        </button>
                      )
                    )}

                    {/* FORMULAIRE */}
                    {carnetView === "form" && (
                      <div style={card}>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:COLORS.accent, marginBottom:16, fontWeight:700 }}>
                          {carnetDraft.id ? CN.formEdit : CN.formNew}
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                          {[
                            ["date","Date","date","text"],
                            ["espece","Espèce *","Cerf élaphe,Chevreuil,Sanglier,Daim,Mouflon,Renard roux,Lièvre brun,Faisan de chasse,Perdrix grise,Bécasse des bois,Lapin de garenne,Pigeon ramier,Bernache du Canada,Canard colvert,Foulque macroule,Autre","select"],
                            ["sexe","Sexe","Mâle,Femelle,Indéterminé","select"],
                            ["calibre","Calibre","","calibre"],
                          ].map(([key, label, opts, type]) => (
                            <div key={key}>
                              <label style={lblStyle} htmlFor={"cn-"+key}>{CN.fields[key] || label}</label>
                              {type === "select" ? (
                                <select id={"cn-"+key} value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value}))} style={fieldStyle}>
                                  <option value="">—</option>
                                  {opts.split(",").map(o => <option key={o} value={o}>{key === "espece" ? spLabel(o, lang) : optLabel(o, lang)}</option>)}
                                </select>
                              ) : type === "calibre" ? (
                                <select id={"cn-"+key} value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value, munition:""}))} style={fieldStyle}>
                                  <option value="">—</option>
                                  <option key="rifle_h" disabled value="">{UIX.modeCarabine}</option>
                                  {CALIBRES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                  <option key="fusil_h" disabled value="">{UIX.modeFusil}</option>
                                  {FUSIL_CALIBRES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                </select>
                              ) : key === "date" ? (
                                <input id={"cn-"+key} type="date" value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d, date:e.target.value, saison:getSaison(e.target.value)}))} style={{...fieldStyle, WebkitAppearance:"none", appearance:"none", textAlign:"left"}}/>
                              ) : (
                                <input id={"cn-"+key} type={type} value={carnetDraft[key]||""} maxLength={type === "text" ? 200 : undefined} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value}))} style={fieldStyle}/>
                              )}
                            </div>
                          ))}
                          {/* Munition — dépend du calibre sélectionné (carabine : munition ; fusil : numéros de plomb) */}
                          <div>
                            {FUSIL_CALIBRES.some(c => c.value === carnetDraft.calibre) ? (
                              <>
                                <label style={lblStyle}>{CN.fields.munition}</label>
                                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                                  {[...PLOMB_NUMEROS.map(num => `${CN.plombPrefix} ${num}`), CN.balle].map(opt => {
                                    const selected = (carnetDraft.munition||"").split(", ").filter(Boolean);
                                    const isSel = selected.includes(opt);
                                    return (
                                      <button key={opt} onClick={() => setCarnetDraft(d => {
                                        const cur = (d.munition||"").split(", ").filter(Boolean);
                                        const next = cur.includes(opt) ? cur.filter(x => x !== opt) : (cur.length < 3 ? [...cur, opt] : cur);
                                        return {...d, munition: next.join(", ")};
                                      })} style={{ padding:"5px 10px", borderRadius:14, border:`1px solid ${isSel?COLORS.accent:COLORS.border}`, background: isSel?COLORS.accentGlow:"transparent", color: isSel?COLORS.accent:COLORS.textMuted, fontFamily:"'IBM Plex Mono',monospace", fontSize:10, cursor:"pointer" }}>
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>
                                <p style={{ fontSize:9, color:COLORS.textMuted, marginTop:4 }}>{CN.plombMax3}</p>
                              </>
                            ) : (
                              <>
                                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                                  <label style={{...lblStyle, flex:1}} htmlFor="cn-munition">{CN.fields.munition}</label>
                                  {isPremiumPlus && carnetDraft.munition && (
                                    <button onClick={() => toggleFavori(carnetDraft.calibre, carnetDraft.munition)} aria-label={isFavori(carnetDraft.calibre,carnetDraft.munition) ? UIX.favorisRemove : UIX.favorisAdd} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:14, cursor:"pointer", padding:"0 0 4px" }}>
                                      {isFavori(carnetDraft.calibre, carnetDraft.munition) ? "★" : "☆"}
                                    </button>
                                  )}
                                </div>
                                <select id="cn-munition" value={carnetDraft.munition||""} onChange={e => setCarnetDraft(d=>({...d,munition:e.target.value}))} style={fieldStyle}>
                                  <option value="">—</option>
                                  {isPremiumPlus && carnetDraft.calibre && (MUNITIONS_DATA[carnetDraft.calibre] || []).filter(m => isFavori(carnetDraft.calibre, m.label)).length > 0 && [
                                    <option key="fav_h" disabled value="">⭐ {UIX.favorisGroup} ⭐</option>,
                                    ...(MUNITIONS_DATA[carnetDraft.calibre] || []).filter(m => isFavori(carnetDraft.calibre, m.label)).map((m,i) => <option key={"fav"+i} value={m.label}>★ {m.label}</option>)
                                  ]}
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
                                {isPremiumPlus && <p style={{ fontSize:10, color:COLORS.warnLine, fontStyle:"italic", marginTop:4 }}>⚠️ {UIX.favorisWarn}</p>}
                              </>
                            )}
                          </div>
                          {[
                            ["distance","Distance de tir (m)","","number"],
                            ["distanceFuite","Distance de fuite (m)","","number"],
                            ["poids","Poids animal (kg)","","number"],
                            ["tir","Type de chasse","","text"],
                            ["meteo","Météo","","text"],
                            ["lieu","Lieu / Territoire","","text"],
                          ].map(([key, label, opts, type]) => (
                            <div key={key}>
                              <label style={lblStyle} htmlFor={"cn-"+key}>{CN.fields[key] || label}</label>
                              {type === "select" ? (
                                <select id={"cn-"+key} value={carnetDraft[key]||""} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value}))} style={fieldStyle}>
                                  <option value="">—</option>
                                  {opts.split(",").map(o => <option key={o} value={o}>{key === "espece" ? spLabel(o, lang) : optLabel(o, lang)}</option>)}
                                </select>
                              ) : (
                                <input id={"cn-"+key} type={type} value={carnetDraft[key]||""} maxLength={type === "text" ? 200 : undefined} onChange={e => setCarnetDraft(d=>({...d,[key]:e.target.value}))} style={fieldStyle}/>
                              )}
                            </div>
                          ))}
                          {/* Nombre de tirs */}
                          <div>
                            <label style={lblStyle}>{CN.fields.nbTirs}</label>
                            <div style={{ display:"flex", alignItems:"center", gap:12, background:COLORS.bgInput, border:`1px solid ${COLORS.border}`, borderRadius:6, padding:"6px 10px" }}>
                              <button onClick={() => setCarnetDraft(d=>({...d, nbTirs: Math.max(1,(d.nbTirs||1)-1)}))} aria-label={CN.fields.nbTirs + " −"} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:20, cursor:"pointer", width:30 }}>−</button>
                              <span style={{ flex:1, textAlign:"center", fontFamily:"'IBM Plex Mono',monospace", fontSize:14, color:COLORS.white, fontWeight:700 }}>{carnetDraft.nbTirs||1}</span>
                              <button onClick={() => setCarnetDraft(d=>({...d, nbTirs:(d.nbTirs||1)+1}))} aria-label={CN.fields.nbTirs + " +"} style={{ background:"transparent", border:"none", color:COLORS.accent, fontSize:20, cursor:"pointer", width:30 }}>+</button>
                            </div>
                          </div>
                          {/* Slider Émotion */}
                          <div>
                            <label style={lblStyle} htmlFor="cn-emotion">{CN.fields.emotion}</label>
                            <input id="cn-emotion" type="range" min="1" max="5" value={carnetDraft.emotion||3} onChange={e => setCarnetDraft(d=>({...d, emotion:parseInt(e.target.value, 10)}))} style={{ width:"100%", accentColor:COLORS.accent }}/>
                            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, marginTop:2 }}>
                              <span>{CN.emotionLow}</span><span>{CN.emotionHigh}</span>
                            </div>
                          </div>
                          {/* Slider Difficulté */}
                          <div>
                            <label style={lblStyle} htmlFor="cn-difficulte">{CN.fields.difficulte}</label>
                            <input id="cn-difficulte" type="range" min="1" max="5" value={carnetDraft.difficulte||3} onChange={e => setCarnetDraft(d=>({...d, difficulte:parseInt(e.target.value, 10)}))} style={{ width:"100%", accentColor:COLORS.accent }}/>
                            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, marginTop:2 }}>
                              <span>{CN.diffLow}</span><span>{CN.diffHigh}</span>
                            </div>
                          </div>
                          <div>
                            <label style={lblStyle} htmlFor="cn-notes">{CN.fields.notes}</label>
                            <textarea id="cn-notes" value={carnetDraft.notes||""} onChange={e => setCarnetDraft(d=>({...d,notes:e.target.value}))} rows={3} maxLength={1000} style={{...fieldStyle, resize:"vertical"}} placeholder={CN.notesPlaceholder}/>
                          </div>
                        </div>

                        {/* Photos (Premium+, max 3) */}
                        <div style={{ marginTop:14 }}>
                          {isPremiumPlus ? (
                            <>
                              <label style={lblStyle}>{CN.photos}</label>
                              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:4 }}>
                                {(carnetDraft.photos||[]).map((src, i) => (
                                  <div key={i} style={{ position:"relative", width:100, height:100 }}>
                                    <img src={src} alt="" style={{ width:100, height:100, objectFit:"cover", borderRadius:6, border:`1px solid ${COLORS.border}` }}/>
                                    <button onClick={() => removeCarnetPhoto(i)} aria-label={CN.photoRemove} style={{ position:"absolute", top:-7, right:-7, width:24, height:24, borderRadius:"50%", background:COLORS.danger, color:"#fff", border:"none", fontSize:13, cursor:"pointer", lineHeight:1, padding:0 }}>✕</button>
                                  </div>
                                ))}
                                {(carnetDraft.photos||[]).length < 3 && (
                                  <label style={{ width:100, height:100, borderRadius:6, border:`1px dashed ${COLORS.border}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:COLORS.textMuted, fontSize:28 }}>
                                    +
                                    <input type="file" accept="image/jpeg,image/png,image/webp" style={{ display:"none" }} onChange={e => { addCarnetPhoto(e.target.files[0]); e.target.value=""; }} />
                                  </label>
                                )}
                              </div>
                              {carnetPhotoError && <p style={{ fontSize:10, color:COLORS.danger, marginTop:4 }}>{carnetPhotoError}</p>}
                              <p style={{ fontSize:9, color:COLORS.textMuted, marginTop:4 }}>{CN.photoMax3}</p>
                            </>
                          ) : (
                            <button onClick={openTierModal} style={{ ...btnPrimary, width:"100%", fontSize:12 }}>
                              {UIX.premiumPlusBtn}
                            </button>
                          )}
                        </div>

                        {carnetSaveError && <p style={{ fontSize:11, color:COLORS.danger, marginTop:14, marginBottom:0 }}>{carnetSaveError}</p>}
                        <div style={{ display:"flex", gap:10, marginTop:16 }}>
                          <button onClick={() => {
                            if (!carnetDraft.espece) return;
                            const entry = { ...carnetDraft, id: carnetDraft.id || Date.now() };
                            const updated = carnetDraft.id
                              ? carnetEntries.map(e => e.id === carnetDraft.id ? entry : e)
                              : [entry, ...carnetEntries];
                            if (!saveCarnetWithBackup(updated)) { setCarnetSaveError(CN.saveErr); return; }
                            setCarnetEntries(updated);
                            setCarnetSaison(carnetDraft.saison || getSaison());
                            setCarnetSaveError("");
                            setCarnetView("liste");
                          }} style={{ flex:1, background:COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:7, padding:"10px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                            {CN.save}
                          </button>
                          <button onClick={() => setCarnetView("liste")} style={{ flex:1, background:"transparent", color:COLORS.textMuted, border:`1px solid ${COLORS.border}`, borderRadius:7, padding:"10px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, cursor:"pointer" }}>
                            {CN.cancel}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* LISTE */}
                    {carnetView === "liste" && (
                      filtered.length === 0 ? (
                        <div style={{ ...card, textAlign:"center", padding:"30px 16px" }}>
                          <div style={{ fontSize:32, marginBottom:8 }}>🦌</div>
                          <p style={{ color:COLORS.textMuted, fontStyle:"italic" }}>{CN.empty} {carnetSaison}.</p>
                        </div>
                      ) : (
                        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                          {[...filtered].sort((a,b)=>b.date.localeCompare(a.date)).map(entry => (
                            <div key={entry.id} style={{ ...card, padding:"12px 14px" }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                                <div>
                                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, color:COLORS.white, fontWeight:700 }}>{entry.espece ? spLabel(entry.espece, lang) : "—"}{entry.sexe ? ` · ${optLabel(entry.sexe, lang)}` : ""}</div>
                                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textMuted, marginTop:2 }}>{entry.date}{entry.lieu ? ` · ${entry.lieu}` : ""}</div>
                                </div>
                                {confirmDelete === entry.id ? (
                                  <div style={{ display:"flex", gap:4 }}>
                                    <button onClick={() => { const u=carnetEntries.filter(e=>e.id!==entry.id); setCarnetEntries(u); saveCarnetWithBackup(u); setConfirmDelete(null); }} style={{ background:COLORS.danger, border:"none", borderRadius:5, padding:"4px 10px", color:"white", fontSize:10, cursor:"pointer", fontWeight:700 }}>{CN.confirm}</button>
                                    <button onClick={() => setConfirmDelete(null)} aria-label={CN.cancel} style={{ background:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:5, padding:"4px 8px", color:COLORS.textMuted, fontSize:10, cursor:"pointer" }}>✕</button>
                                  </div>
                                ) : (
                                  <div style={{ display:"flex", gap:6 }}>
                                    <button onClick={() => { setCarnetDraft(FUSIL_CALIBRES.some(c => c.value === entry.calibre) ? {...entry, munition: normalizePlombs(entry.munition, lang)} : entry); setCarnetSaveError(""); setCarnetPhotoError(""); setCarnetView("form"); }} aria-label={CN.formEdit} style={{ background:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:5, padding:"4px 8px", color:COLORS.textMuted, fontSize:10, cursor:"pointer" }}>✏️</button>
                                    <button onClick={() => setConfirmDelete(entry.id)} aria-label={CN.confirm} style={{ background:"transparent", border:`1px solid ${COLORS.danger}`, borderRadius:5, padding:"4px 8px", color:COLORS.danger, fontSize:10, cursor:"pointer" }}>🗑</button>
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
                                  ["🏃",entry.distanceFuite?`${entry.distanceFuite}m ${CN.flee}`:"—"],
                                  ["🔢",entry.nbTirs?`${entry.nbTirs} ${entry.nbTirs>1?CN.shots:CN.shot}`:"—"],
                                  ["⭐",entry.difficulte?`${CN.diff} ${entry.difficulte}/5`:"—"],
                                ].map(([icon,val],i) => (
                                  <div key={i} style={{ background:COLORS.bgInput, borderRadius:5, padding:"5px 8px" }}>
                                    <span style={{ fontSize:10 }}>{icon}</span>
                                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, marginLeft:4 }}>{val}</span>
                                  </div>
                                ))}
                              </div>
                              {entry.notes && <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textDim, marginTop:8, fontStyle:"italic" }}>"{entry.notes}"</div>}
                              {entry.photos && entry.photos.length > 0 && (
                                <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginTop:8 }}>
                                  {entry.photos.map((src, i) => (
                                    <img key={i} src={src} alt="" style={{ width:56, height:56, objectFit:"cover", borderRadius:6, border:`1px solid ${COLORS.border}` }} />
                                  ))}
                                </div>
                              )}
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
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textMuted, textTransform:"uppercase" }}>{CN.takesSeasonStat} {carnetSaison}</div>
                        </div>
                        {/* Par espèce */}
                        {Object.keys(statEspeces).length > 0 && (
                          <div style={card}>
                            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.accent, marginBottom:12, textTransform:"uppercase" }}>{CN.bySpecies}</div>
                            {Object.entries(statEspeces).sort((a,b)=>b[1]-a[1]).map(([esp,n]) => (
                              <div key={esp} style={{ marginBottom:8 }}>
                                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.white }}>{spLabel(esp, lang)}</span>
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
                            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.accent, marginBottom:12, textTransform:"uppercase" }}>{CN.byCaliber}</div>
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
                              [CN.avgDist, Math.round(filtered.filter(e=>e.distance).reduce((a,e)=>a+parseFloat(e.distance),0)/filtered.filter(e=>e.distance).length)+"m"],
                              [CN.avgWeight, filtered.some(e=>e.poids) ? Math.round(filtered.filter(e=>e.poids).reduce((a,e)=>a+parseFloat(e.poids),0)/filtered.filter(e=>e.poids).length*10)/10+"kg" : "—"],
                            ].map(([l,v]) => (
                              <div key={l}>
                                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:20, color:COLORS.accent, fontWeight:700 }}>{v}</div>
                                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, textTransform:"uppercase" }}>{l}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        {filtered.length === 0 && <div style={{ ...card, textAlign:"center" }}><p style={{ color:COLORS.textMuted, fontStyle:"italic" }}>{CN.noData}</p></div>}
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
              {!isPremium ? (
                <div style={card}>
                  <div style={{ textAlign:"center", padding:"20px 0" }}>
                    <div style={{ fontSize:40, marginBottom:12 }}>🔐</div>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:16, color:COLORS.white, fontWeight:700, marginBottom:8 }}>{CF.gateTitle}</div>
                    <p style={{ color:COLORS.textMuted, fontSize:"0.95rem", marginBottom:20 }}>{CF.gateDesc}</p>
                    <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer" }}>{T.premiumBtn}</button>
                  </div>
                </div>
              ) : (
              <>
              {/* Sous-onglets Documents / Équipement */}
              <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                {[["documents",CF.docsTab],["equipement",CF.equipTab]].map(([v,l]) => (
                  <button key={v} onClick={() => setCoffreView(v)} style={{ padding:"8px 12px", borderRadius:6, border:`1px solid ${coffreView===v?COLORS.accent:COLORS.border}`, background: coffreView===v?COLORS.accentGlow:"transparent", color: coffreView===v?COLORS.accent:COLORS.textMuted, fontFamily:"'IBM Plex Mono',monospace", fontSize:11, cursor:"pointer" }}>{l}</button>
                ))}
              </div>

              {coffreView === "documents" && (
                <>
              <p style={{ color:COLORS.textMuted, fontStyle:"italic", marginBottom:16, fontSize:"0.95rem" }}>
                {CF.intro}
              </p>

              {/* Bannière stockage local */}
              <div style={{ background:COLORS.warnBg, border:`1px solid ${COLORS.warnLine}40`, borderRadius:8, padding:"10px 14px", marginBottom:20, display:"flex", alignItems:"flex-start", gap:10 }}>
                <span style={{ fontSize:14, flexShrink:0 }}>⚠️</span>
                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.warnLine, lineHeight:1.6 }}>
                  {CF.banner}
                </span>
              </div>

              {/* Message d'erreur upload (in-app, remplace alert) */}
              {coffreError && (
                <div style={{ background:COLORS.accentGlow, border:`1px solid ${COLORS.danger}`, borderRadius:8, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.danger }}>⚠️ {coffreError}</span>
                  <button onClick={() => setCoffreError("")} aria-label={CF.close} style={{ background:"transparent", border:"none", color:COLORS.danger, fontSize:14, cursor:"pointer", padding:0, lineHeight:1 }}>✕</button>
                </div>
              )}

              {/* Documents */}
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  { id:"carte_id",      emoji:"🪪", label:"Carte d'identité",              desc:"Recto / Verso" },
                  { id:"permis_chasse", emoji:"🦌", label:"Permis de chasse",               desc:"Permis annuel wallon / flamand" },
                  { id:"assurance",     emoji:"🛡️", label:"Assurance de chasse",            desc:"Attestation en cours de validité" },
                  { id:"carte_eu",      emoji:"🇪🇺", label:"Carte européenne d'arme à feu", desc:"European Firearms Pass" },
                  { id:"certificat",    emoji:"🏥", label:"Certificat médical",             desc:"Aptitude au port d'arme" },
                ].map(doc => {
                  const stored = coffreData[doc.id];
                  return (
                    <div key={doc.id} style={{ ...card, padding:"14px 16px", display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ fontSize:28, flexShrink:0 }}>{doc.emoji}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:COLORS.white, fontWeight:700 }}>{(CF.docs[doc.id] && CF.docs[doc.id].label) || doc.label}</div>
                        {stored ? (
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.accent, marginTop:3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                            ✓ {stored.name}
                          </div>
                        ) : (
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, marginTop:2 }}>{(CF.docs[doc.id] && CF.docs[doc.id].desc) || doc.desc}</div>
                        )}
                      </div>
                      <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                        {stored ? (
                          <>
                            <button onClick={() => {
                              if (stored.type === "application/pdf") {
                                const byteStr = atob(stored.data.split(',')[1]);
                                const ab = new ArrayBuffer(byteStr.length);
                                const ia = new Uint8Array(ab);
                                for (let k=0; k<byteStr.length; k++) ia[k] = byteStr.charCodeAt(k);
                                const blob = new Blob([ab], { type:"application/pdf" });
                                const url = URL.createObjectURL(blob);
                                window.open(url, "_blank");
                                setTimeout(() => URL.revokeObjectURL(url), 30000);
                              } else {
                                const w = window.open();
                                const safeName = String(stored.name).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
                                w.document.write(`<html><head><title>${safeName}</title><style>body{margin:0;background:#000;display:flex;flex-direction:column;align-items:center}button{position:fixed;top:12px;right:12px;background:#8fb020;color:#000;border:none;border-radius:8px;padding:8px 16px;font-size:14px;font-weight:700;cursor:pointer;z-index:9999}img{width:100%;height:auto;display:block;margin-top:0}</style></head><body><button onclick="window.close()">${CF.close}</button><img src="${stored.data}"/></body></html>`);
                                w.document.close();
                              }
                            }}
                              style={{ background:COLORS.accentGlow, color:COLORS.accent, border:`1px solid ${COLORS.accent}`, borderRadius:5, padding:"5px 10px", fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:700, cursor:"pointer" }}>
                              {CF.view}
                            </button>
                            <label style={{ background:"transparent", color:COLORS.textMuted, border:`1px solid ${COLORS.border}`, borderRadius:5, padding:"5px 8px", fontFamily:"'IBM Plex Mono',monospace", fontSize:10, cursor:"pointer" }}
                              title={CF.replace}>
                              ↺
                              <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" style={{ display:"none" }} onChange={e => { uploadDoc(doc.id, e.target.files[0]); e.target.value=""; }} />
                            </label>
                            <button onClick={() => { if(confirmDeleteDoc === doc.id) { deleteDoc(doc.id); setConfirmDeleteDoc(null); } else { setConfirmDeleteDoc(doc.id); } }}
                              style={{ background: confirmDeleteDoc === doc.id ? COLORS.danger : "transparent", color: confirmDeleteDoc === doc.id ? "white" : COLORS.dangerSoft, border: confirmDeleteDoc === doc.id ? "none" : `1px solid ${COLORS.dangerSoft}40`, borderRadius:5, padding:"5px 8px", fontFamily:"'IBM Plex Mono',monospace", fontSize:10, cursor:"pointer", transition:"all 0.2s" }}>
                              {confirmDeleteDoc === doc.id ? CF.confirm : "🗑"}
                            </button>
                          </>
                        ) : (
                          <label style={{ background:COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:5, padding:"5px 12px", fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:700, cursor:"pointer" }}>
                            {CF.add}
                            <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" style={{ display:"none" }} onChange={e => { uploadDoc(doc.id, e.target.files[0]); e.target.value=""; }} />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
                </>
              )}

              {coffreView === "equipement" && (
                isPremiumPlus ? (
                <>
                {equipError && (
                  <div style={{ background:COLORS.accentGlow, border:`1px solid ${COLORS.danger}`, borderRadius:8, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.danger }}>⚠️ {equipError}</span>
                    <button onClick={() => setEquipError("")} aria-label={CF.close} style={{ background:"transparent", border:"none", color:COLORS.danger, fontSize:14, cursor:"pointer", padding:0, lineHeight:1 }}>✕</button>
                  </div>
                )}
                {[["armes",CF.catArmes,"🔫",CF.equipDetailCalibre,CF.equipNomPlaceholder],["munition",CF.catMunition,"🎯",CF.equipDetailCalibre,CF.equipNomPlaceholder],["optique",CF.catOptique,"🔭",CF.equipDetailGrossissement,CF.equipNomPlaceholder],["autres",CF.catAutres,"🎒",null,CF.equipAutresPlaceholder]].map(([cat,catLabel,icon,detailPh,titrePh]) => (
                  <div key={cat} style={{ marginBottom:22 }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.accent, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>{icon} {catLabel}</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      {coffreEquip.filter(e => e.cat === cat).map(e => (
                        <div key={e.id} style={{ ...card, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:COLORS.white, fontWeight:700 }}>{e.titre}</div>
                            {e.detail && <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.textMuted, marginTop:2 }}>{e.detail}</div>}
                          </div>
                          <button onClick={() => {
                              if (confirmDeleteEquip === e.id) {
                                const updated = coffreEquip.filter(x => x.id !== e.id);
                                if (saveEquip(updated)) setCoffreEquip(updated); else setEquipError(UIX.coffreErrStorage);
                                setConfirmDeleteEquip(null);
                              } else { setConfirmDeleteEquip(e.id); }
                            }}
                            style={{ background: confirmDeleteEquip === e.id ? COLORS.danger : "transparent", color: confirmDeleteEquip === e.id ? "white" : COLORS.dangerSoft, border: confirmDeleteEquip === e.id ? "none" : `1px solid ${COLORS.dangerSoft}40`, borderRadius:5, padding:"5px 8px", fontFamily:"'IBM Plex Mono',monospace", fontSize:10, cursor:"pointer", flexShrink:0, transition:"all 0.2s" }}>
                            {confirmDeleteEquip === e.id ? CF.confirm : "🗑"}
                          </button>
                        </div>
                      ))}
                      {coffreEquip.filter(e => e.cat === cat).length === 0 && addingEquipCat !== cat && (
                        <p style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textMuted, fontStyle:"italic", margin:0 }}>{CF.equipEmpty}</p>
                      )}
                      {addingEquipCat === cat ? (
                        <div style={{ ...card, padding:"12px 14px", display:"flex", flexDirection:"column", gap:8 }}>
                          <input value={equipForm.titre} onChange={e => setEquipForm({ ...equipForm, titre:e.target.value })} placeholder={titrePh} maxLength={60} autoFocus />
                          {detailPh && (
                            <input value={equipForm.detail} onChange={e => setEquipForm({ ...equipForm, detail:e.target.value })} placeholder={detailPh} maxLength={60} />
                          )}
                          <div style={{ display:"flex", gap:8 }}>
                            <button onClick={() => {
                                if (!equipForm.titre.trim()) return;
                                const entry = { id:Date.now(), cat, titre:equipForm.titre.trim(), detail:equipForm.detail.trim() };
                                const updated = [...coffreEquip, entry];
                                if (saveEquip(updated)) { setCoffreEquip(updated); setAddingEquipCat(null); setEquipForm({ titre:"", detail:"" }); setEquipError(""); }
                                else setEquipError(UIX.coffreErrStorage);
                              }}
                              style={{ flex:1, background:COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:6, padding:"8px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, fontWeight:700, cursor:"pointer" }}>
                              {CF.confirm}
                            </button>
                            <button onClick={() => { setAddingEquipCat(null); setEquipForm({ titre:"", detail:"" }); }}
                              style={{ flex:1, background:"transparent", color:COLORS.textMuted, border:`1px solid ${COLORS.border}`, borderRadius:6, padding:"8px", fontFamily:"'IBM Plex Mono',monospace", fontSize:11, cursor:"pointer" }}>
                              {CF.close}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => { setAddingEquipCat(cat); setEquipForm({ titre:"", detail:"" }); }}
                          style={{ background:"transparent", border:`1px dashed ${COLORS.border}`, borderRadius:8, padding:"10px", color:COLORS.textMuted, fontFamily:"'IBM Plex Mono',monospace", fontSize:11, cursor:"pointer" }}>
                          {CF.add}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                </>
                ) : (
                  <div style={card}>
                    <div style={{ textAlign:"center", padding:"20px 0" }}>
                      <div style={{ fontSize:40, marginBottom:20 }}>🎒</div>
                      <button onClick={openTierModal} style={{ background: COLORS.accent, color:COLORS.onAccent, border:"none", borderRadius:8, padding:"12px 28px", fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, cursor:"pointer" }}>★★ {UIX.premiumPlusBtn}</button>
                    </div>
                  </div>
                )
              )}

              {/* Modale visualisation */}
              {/* Pas de modale — ouverture directe dans le navigateur via bouton Voir */}
              </>
              )}
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
                <a href={PRIVACY_URL[lang] || PRIVACY_URL.fr} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, textDecoration:"none", marginTop:4, padding:"10px 14px", borderRadius:8, border:`1px solid ${COLORS.accent}`, background:COLORS.accentGlow }}>
                  <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.accent, fontWeight:700 }}>🔒 {T.aboutPrivacy}</span>
                  <span style={{ color:COLORS.accent, fontSize:14 }}>→</span>
                </a>
              </div>

              {/* Avertissement */}
              <div style={{ ...card, background:"rgba(231,76,60,0.05)", border:"1px solid rgba(231,76,60,0.2)" }}>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color:COLORS.alert, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.1em" }}>
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
                    [UIX.federal, "fishandgame.be · SPF Justice"],
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
                {!isPremiumPlus && (
                  <button onClick={openTierModal}
                    style={{ ...btnPrimary, marginTop:16, padding:"10px 32px" }}>
                    {isPremium ? UIX.premiumPlusBtn : T.premiumBtn}
                  </button>
                )}
              </div>

              {/* Copyright */}
              <div style={{ ...card, borderColor:`${COLORS.warnLine}40`, background:COLORS.warnBg }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <span style={{ fontSize:18 }}>©</span>
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:12, color:COLORS.white, fontWeight:700 }}>Copyright</div>
                </div>
                <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:COLORS.textMuted, lineHeight:1.7 }}>
                  {T.aboutCopyright}
                </div>
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
          <div className="fade-in" role="dialog" aria-modal="true" aria-label="ChassIA — Langue / Taal / Sprache / Language" style={{ background:COLORS.bgCard,border:`1px solid ${COLORS.accent}`,borderRadius:12,padding:"36px 32px 28px",width:"min(440px, 92vw)",boxShadow:`0 12px 60px rgba(0,0,0,0.8)`,textAlign:"center" }}>
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
          <div className="fade-in" role="dialog" aria-modal="true" aria-label={T.btnImprimer} style={{
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
                  <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 11, color:COLORS.alert, marginBottom: 6, letterSpacing:"0.05em" }}>
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
                {T.printCancel}
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
          html, body, #root { background: #fff !important; margin: 0 !important; padding: 0 !important; }
          * { visibility: hidden !important; }
          .chassia-print-target,
          .chassia-print-target * { visibility: visible !important; }
          .chassia-print-carnet,
          .chassia-print-carnet * { visibility: visible !important; }
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
          body.printing-carnet #root { display: none !important; }
          .chassia-print-carnet {
            display: block !important;
            background: white !important;
            padding: 12mm !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>

      {/* MODALE CHOIX PREMIUM / PREMIUM+ */}
      {showTierModal && (() => {
        const TM = TIER_MODAL_I18N[lang] || TIER_MODAL_I18N.fr;
        return (
          <div onClick={() => setShowTierModal(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
            <div onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={TM.title} style={{ background:COLORS.bg, border:`1px solid ${COLORS.border}`, borderRadius:12, padding:"24px 22px", maxWidth:480, width:"100%", maxHeight:"90vh", overflowY:"auto" }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.3rem", color:COLORS.white, marginBottom:6 }}>{TM.title}</div>
              <p style={{ color:COLORS.textMuted, fontSize:"0.9rem", lineHeight:1.5, marginBottom:18 }}>{TM.subtitle}</p>

              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {/* Carte Premium */}
                <div style={{ border:`1px solid ${tier === "premium" ? COLORS.accent : COLORS.border}`, borderRadius:10, padding:"16px 16px" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, color:COLORS.accent }}>★ {TM.premiumName}</span>
                    {tier === "premium" && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.onAccent, background:COLORS.accent, borderRadius:4, padding:"2px 8px" }}>{TM.currentBadge}</span>}
                  </div>
                  <ul style={{ margin:0, padding:"0 0 0 4px", listStyle:"none", color:COLORS.text, fontSize:"0.88rem", lineHeight:1.6 }}>
                    {TM.premiumFeatures.map((f, i) => <li key={i}>• {f}</li>)}
                  </ul>
                  {tier !== "premium" && (
                    <button onClick={() => { setTier("premium"); setShowTierModal(false); }}
                      style={{ ...btnPrimary, width:"100%", marginTop:14, background:"transparent", color:COLORS.accent, border:`1px solid ${COLORS.accent}`, fontSize:12 }}>
                      {TM.premiumCta}
                    </button>
                  )}
                </div>

                {/* Carte Premium+ */}
                <div style={{ border:`1px solid ${COLORS.accent}`, borderRadius:10, padding:"16px 16px", background:COLORS.accentGlow }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
                    <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:13, fontWeight:700, color:COLORS.accent }}>★★ {TM.plusName}</span>
                    {isPremiumPlus && <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color:COLORS.onAccent, background:COLORS.accent, borderRadius:4, padding:"2px 8px" }}>{TM.currentBadge}</span>}
                  </div>
                  <ul style={{ margin:0, padding:"0 0 0 4px", listStyle:"none", color:COLORS.text, fontSize:"0.88rem", lineHeight:1.6 }}>
                    {TM.plusFeatures.map((f, i) => <li key={i}>• {f}</li>)}
                  </ul>
                  {!isPremiumPlus && (
                    <button onClick={() => { setTier("premiumPlus"); setShowTierModal(false); }}
                      style={{ ...btnPrimary, width:"100%", marginTop:14, fontSize:12 }}>
                      {tier === "premium" ? TM.plusUpgradeCta : TM.plusCta}
                    </button>
                  )}
                </div>
              </div>

              <p style={{ color:COLORS.textDim, fontSize:"0.78rem", fontStyle:"italic", marginTop:16, marginBottom:14 }}>{TM.freeNote}</p>

              <button onClick={() => setShowTierModal(false)}
                style={{ background:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:6, color:COLORS.textMuted, padding:"8px 18px", fontSize:12, fontFamily:"'IBM Plex Mono',monospace", cursor:"pointer", width:"100%" }}>
                {TM.close}
              </button>
            </div>
          </div>
        );
      })()}
    </>
  );
}
