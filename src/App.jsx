import { useState, useRef, useEffect } from "react";

// ─── TRANSLATIONS (i18n) ─────────────────────────────────────────────────────
const LANGS = {
  fr: {
    code:"fr", flag:"🇧🇪", name:"Français", region:"Wallonie",
    subtitle:"L'ASSISTANT IA DU CHASSEUR BELGE",
    tabs:["🎯 Cible","🔫 Calibre","💥 Munition","🤖 Assistant IA","🦌 Gibier","ℹ️ À propos"],
    tabIds:["cible","calibre","munition","assistant","gibier","apropos"],
    cibleIntro:"Génère ta cible de réglage personnalisée. Choisis ton calibre, ta munition, la distance à laquelle tu tires et la DRO souhaitée.",
    calibreLabel:"Calibre", munitionLabel:"Munition (optionnel)", munitionPH:"— Sélectionner —",
    distLabel:"Distance de tir sur le stand (m)", distNote:"Distance à laquelle tu tires aujourd'hui",
    droLabel:"DRO souhaitée (m)", droNotePrefix:"DRO recommandée pour ce calibre :",
    gibierBadge:"GIBIER", tirBadge:"TIR À", droBadge:"→ DRO",
    btnGenerer:"Générer la cible & les données de réglage", btnGenerating:"Calcul en cours…",
    cibleTitle:"Cible", iaTitle:"Données de réglage IA",
    sliderH:"Décalage H (cm)", sliderV:"Décalage V (cm)",
    btnImprimer:"⎙ Imprimer la cible",
    ciblePH:'Configure ton réglage ci-dessus et clique sur "Générer" pour obtenir ta cible et les données balistiques.',
    iaPH:"Lance la génération pour obtenir les données balistiques et conseils de réglage.",
    calibreIntro:"Obtenez une recommandation de calibre adaptée à votre gibier, terrain et style de chasse.",
    gibierLabel:"Gibier ciblé *", gibierPH:"— Sélectionner —",
    typeLabel:"Type de chasse", typePH:"— Optionnel —",
    distTirLabel:"Distance typique de tir (m)", distTirPH:"— Optionnel —",
    btnCalConseiller:"Obtenir mes recommandations calibre", btnCalLoading:"Analyse…",
    calPH:"Sélectionne ton gibier pour obtenir une analyse personnalisée.",
    gibierList:["Chevreuil","Cerf élaphe","Sanglier","Daim","Mouflon","Lièvre brun","Faisan de chasse","Perdrix grise","Bécasse des bois","Lapin de garenne","Pigeon ramier","Renard roux","Bernache du Canada","Canard colvert","Foulque macroule"],
    typeList:["Battue","Affût / Approche"],
    distTirList:["moins de 50","50 à 100","100 à 150","150 à 250","plus de 250"],
    munitionIntro:"Trouvez la munition optimale selon votre calibre, gibier et contexte de chasse.",
    munCalibreLabel:"Calibre de la carabine *", munCalPH:"— Sélectionner —",
    munTypeList:["Battue","Affût / Approche"],
    btnMunConseiller:"Obtenir mes recommandations munitions", btnMunLoading:"Analyse…",
    munPH:"Sélectionne ton gibier et calibre pour une recommandation détaillée.",
    assistIntro:"Pose n'importe quelle question sur la chasse en Belgique.",
    freeLabel:"question(s) restante(s) (version gratuite)",
    limitLabel:"Limite atteinte aujourd'hui",
    premiumLabel:"✓ PREMIUM — Questions illimitées",
    premiumBtn:"Passer Premium", premiumActive:"★ Premium",
    limitTitle:"Limite quotidienne atteinte",
    limitText:"Tu as utilisé tes 3 questions gratuites du jour. Passe en Premium pour des questions illimitées.",
    monthly:"MENSUEL", annual:"ANNUEL", bestPrice:"MEILLEUR PRIX",
    activateBtn:"Activer Premium (démo)",
    assistPH:"Pose ta question sur la chasse en Belgique… (Entrée pour envoyer)",
    assistLimitPH:"Limite quotidienne atteinte — passe en Premium",
    freeNote:"Version gratuite : 3 questions / jour · Illimité avec Premium",
    clearBtn:"✕ Effacer la conversation",
    examples:["Quelle est la saison du sanglier en Belgique ?","Quelle distance de sécurité pour une battue ?","Peut-on chasser le chevreuil en novembre ?","Quelles sont les règles pour le tir de nuit en Belgique ?"],
    footerName:"CHASSIA BELGIQUE",
    aboutTitle:"À propos de ChassIA",
    aboutDesc1:"ChassIA est un assistant numérique destiné aux chasseurs belges. Il fournit des recommandations de calibres et munitions, génère des cibles de réglage personnalisées, et répond aux questions relatives à la chasse en Belgique.",
    aboutDesc2:"L'application est disponible en français, néerlandais, allemand et anglais.",
    aboutLegal:"Mentions légales",
    aboutEditor:"Éditeur", aboutContact:"Contact", aboutHost:"Hébergement", aboutAI:"Intelligence artificielle", aboutData:"Données personnelles", aboutCookies:"Cookies",
    aboutEditorVal:"ChassIA — Application développée et exploitée en Belgique",
    aboutContactVal:"contact@chassia.be",
    aboutHostVal:"Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    aboutAIVal:"Propulsé par Claude (Anthropic). Les réponses sont générées par IA et peuvent contenir des inexactitudes.",
    aboutDataVal:"Aucune donnée personnelle collectée sans consentement. Les préférences sont stockées localement sur votre appareil.",
    aboutCookiesVal:"Aucun cookie tiers. Stockage local uniquement pour vos préférences et historique.",
    aboutWarning:"Avertissement important",
    aboutWarningText:"Les recommandations de ChassIA sont indicatives et non contractuelles. Elles ne remplacent pas les textes légaux officiels ni l'avis d'un professionnel qualifié.",
    aboutSources:"Pour toute question réglementaire, consultez les sources officielles :",
    aboutVersion:"ChassIA v1.0 · Données 2025-2030 · © 2025 ChassIA",
    footerLegal:"Les recommandations sont indicatives. Vérifiez toujours via chasse.be ou wallonie.be.",
    footerRegl:"chasse.be · wallonie.be · DNF · SPW Environnement",
    printTitle:"⎙ Impression de la cible", printFormat:"Format papier",
    printCancel:"Annuler", printLaunch:"⎙ Lancer l'impression",
    printWarnTitle:"IMPORTANT — AVANT D'IMPRIMER",
    printWarnText:"Pour que les dimensions de la cible correspondent à la taille réelle, vérifiez dans les options d'impression que la mise à l'échelle est réglée sur « 100 % » (ou « Taille réelle »). N'activez pas « Ajuster à la page » ni aucune mise à l'échelle automatique, qui modifierait la taille des anneaux et fausserait le réglage.",
    system:`Tu es un expert en chasse wallon, spécialisé exclusivement sur la chasse en Wallonie (Belgique). Tu connais parfaitement : le Code wallon de l'Agriculture et du Bien-être animal, le décret sur la chasse en Région wallonne, les espèces chassables en Wallonie et leurs saisons officielles, les règles des cantonnements, la réglementation DNF (Département de la Nature et des Forêts), les permis de chasse wallons et leur renouvellement, les pratiques locales (battues au sanglier en Ardenne, chasse au chevreuil en Condroz, chasse en Fagnes, etc.). Tu réponds uniquement aux questions liées à la chasse : réglementation wallonne, espèces locales, techniques, équipement, armes, munitions, balistique. Tes réponses sont précises, pratiques et structurées avec des sous-titres (###), des listes et du gras pour les points importants. Pour toute question réglementaire, rappelle de vérifier sur chasse.be, wallonie.be ou auprès du DNF. Tu parles comme un chasseur wallon expérimenté, avec des références aux terrains locaux (Ardenne, Condroz, Fagne, Famenne, Hesbaye, Gaume). Rappelle toujours que les munitions au plomb sont progressivement interdites en zones humides en Wallonie. Réponds toujours en français. Sois concis (max 400 mots) mais complet.`,
  },
  nl: {
    code:"nl", flag:"🇧🇪", name:"Nederlands", region:"Vlaanderen",
    subtitle:"DE AI-ASSISTENT VOOR DE BELGISCHE JAGER",
    tabs:["🎯 Doel","🔫 Kaliber","💥 Munitie","🤖 AI-Assistent","🦌 Wild","ℹ️ Over"],
    tabIds:["cible","calibre","munition","assistant","gibier","apropos"],
    cibleIntro:"Genereer je gepersonaliseerde regelingsdoel. Kies je kaliber, munitie, schietafstand en gewenste NRE.",
    calibreLabel:"Kaliber", munitionLabel:"Munitie (optioneel)", munitionPH:"— Selecteren —",
    distLabel:"Schietafstand op het schietterrein (m)", distNote:"Afstand waarop je vandaag schiet",
    droLabel:"Gewenste NRE (m)", droNotePrefix:"Aanbevolen NRE voor dit kaliber:",
    gibierBadge:"WILD", tirBadge:"SCHIETEN OP", droBadge:"→ NRE",
    btnGenerer:"Doel & regelingsgegevens genereren", btnGenerating:"Berekenen…",
    cibleTitle:"Doel", iaTitle:"AI-Regelingsgegevens",
    sliderH:"Horizontale afwijking (cm)", sliderV:"Verticale afwijking (cm)",
    btnImprimer:"⎙ Doel afdrukken",
    ciblePH:"Configureer je instelling hierboven en klik op Genereren.",
    iaPH:"Klik op genereren voor ballistische gegevens en regelingsadviezen.",
    calibreIntro:"Krijg een kaliberaanbeveling op basis van uw wild, terrein en jachtstijl.",
    gibierLabel:"Beoogd wild *", gibierPH:"— Selecteren —",
    typeLabel:"Type jacht", typePH:"— Optioneel —",
    distTirLabel:"Typische schietafstand (m)", distTirPH:"— Optioneel —",
    btnCalConseiller:"Kaliberaanbevelingen ophalen", btnCalLoading:"Analyse…",
    calPH:"Selecteer uw wild voor een gepersonaliseerde analyse.",
    gibierList:["Ree","Edelhert","Wild zwijn","Damhert","Moeflon","Haas","Fazant","Patrijs","Houtsnip","Konijn","Houtduif","Vos","Canadese gans","Wilde eend","Meerkoet"],
    typeList:["Drijfjacht","Bersjacht / Aanzitjacht"],
    distTirList:["minder dan 50","50 tot 100","100 tot 150","150 tot 250","meer dan 250"],
    munitionIntro:"Vind de optimale munitie voor uw kaliber, wild en jachtcontext.",
    munCalibreLabel:"Kaliber van het geweer *", munCalPH:"— Selecteren —",
    munTypeList:["Drijfjacht","Bersjacht / Aanzitjacht"],
    btnMunConseiller:"Munitieaanbevelingen ophalen", btnMunLoading:"Analyse…",
    munPH:"Selecteer uw wild en kaliber voor een gedetailleerde aanbeveling.",
    assistIntro:"Stel elke vraag over de jacht in Vlaanderen of België.",
    freeLabel:"vraag/vragen resterend (gratis versie)",
    limitLabel:"Daglimiet bereikt",
    premiumLabel:"✓ PREMIUM — Onbeperkte vragen",
    premiumBtn:"Premium worden", premiumActive:"★ Premium",
    limitTitle:"Dagelijkse limiet bereikt",
    limitText:"Je hebt je 3 gratis vragen van vandaag gebruikt. Ga naar Premium voor onbeperkte vragen.",
    monthly:"MAANDELIJKS", annual:"JAARLIJKS", bestPrice:"BESTE PRIJS",
    activateBtn:"Premium activeren (demo)",
    assistPH:"Stel je vraag over de jacht in België… (Enter om te verzenden)",
    assistLimitPH:"Daglimiet bereikt — upgrade naar Premium",
    freeNote:"Gratis versie: 3 vragen/dag · Onbeperkt met Premium",
    clearBtn:"✕ Gesprek wissen",
    examples:["Wat is het jachtseizoen voor wild zwijn in België?","Welke veiligheidsafstand geldt bij drijfjacht?","Mag ik ree jagen in november in Vlaanderen?","Wat zijn de regels voor nachtjacht in België?"],
    footerName:"CHASSIA BELGIË",
    aboutTitle:"Over ChassIA",
    aboutDesc1:"ChassIA is een digitale assistent voor Belgische jagers. De app geeft aanbevelingen over kalibers en munitie, genereert gepersonaliseerde regelingsdoelen en beantwoordt vragen over de jacht in België.",
    aboutDesc2:"De applicatie is beschikbaar in het Frans, Nederlands, Duits en Engels.",
    aboutLegal:"Wettelijke vermeldingen",
    aboutEditor:"Uitgever", aboutContact:"Contact", aboutHost:"Hosting", aboutAI:"Artificiële intelligentie", aboutData:"Persoonsgegevens", aboutCookies:"Cookies",
    aboutEditorVal:"ChassIA — Toepassing ontwikkeld en geëxploiteerd in België",
    aboutContactVal:"contact@chassia.be",
    aboutHostVal:"Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    aboutAIVal:"Aangedreven door Claude (Anthropic). Antwoorden worden gegenereerd door AI en kunnen onnauwkeurigheden bevatten.",
    aboutDataVal:"Er worden geen persoonsgegevens verzameld zonder toestemming. Voorkeuren worden lokaal op uw apparaat opgeslagen.",
    aboutCookiesVal:"Geen cookies van derden. Alleen lokale opslag voor uw voorkeuren en regelingsgeschiedenis.",
    aboutWarning:"Belangrijke waarschuwing",
    aboutWarningText:"De aanbevelingen van ChassIA zijn indicatief en niet bindend. Ze vervangen niet de officiële wetteksten of het advies van een gekwalificeerde professional.",
    aboutSources:"Voor reglementaire vragen, raadpleeg de officiële bronnen:",
    aboutVersion:"ChassIA v1.0 · Gegevens 2025-2030 · © 2025 ChassIA",
    footerLegal:"Aanbevelingen zijn indicatief. Controleer altijd via natuurenbos.vlaanderen.be.",
    footerRegl:"natuurenbos.vlaanderen.be · ANB · Jachtdecreet 1991",
    printTitle:"⎙ Doel afdrukken", printFormat:"Papierformaat",
    printCancel:"Annuleren", printLaunch:"⎙ Afdrukken starten",
    printWarnTitle:"BELANGRIJK — VÓÓR HET AFDRUKKEN",
    printWarnText:"Controleer in de afdrukopties dat de schaal is ingesteld op « 100% » (of « Werkelijke grootte »). Schakel « Aanpassen aan pagina » of automatische schaling niet in, want dat wijzigt de ringgrootte en zou uw instelling ongeldig maken.",
    system:`Je bent een Belgische jachtexpert, gespecialiseerd in Vlaanderen. Je kent de Vlaamse jachtregelgeving (ANB, jachtdecreet, Agentschap Natuur en Bos) en de Waalse regelgeving (DNF) perfect. Je beantwoordt alleen vragen over de jacht: regelgeving, soorten, technieken, uitrusting, wapens, munitie, ballistiek. Structureer je antwoorden met subtitels (###), lijsten en vet. Antwoord altijd in het NEDERLANDS. Wees beknopt (max 400 woorden).`,
  },
  de: {
    code:"de", flag:"🇧🇪", name:"Deutsch", region:"Ostbelgien",
    subtitle:"DER KI-ASSISTENT FÜR DEN BELGISCHEN JÄGER",
    tabs:["🎯 Scheibe","🔫 Kaliber","💥 Munition","🤖 KI-Assistent","🦌 Wild","ℹ️ Über uns"],
    tabIds:["cible","calibre","munition","assistant","gibier","apropos"],
    cibleIntro:"Erstellen Sie Ihre personalisierte Einstellungsscheibe. Wählen Sie Kaliber, Munition, Schussdistanz und gewünschte NDE.",
    calibreLabel:"Kaliber", munitionLabel:"Munition (optional)", munitionPH:"— Auswählen —",
    distLabel:"Schussdistanz auf dem Stand (m)", distNote:"Distanz, auf die Sie heute schießen",
    droLabel:"Gewünschte NDE (m)", droNotePrefix:"Empfohlene NDE für dieses Kaliber:",
    gibierBadge:"WILD", tirBadge:"SCHUSS AUF", droBadge:"→ NDE",
    btnGenerer:"Scheibe & Einstelldaten generieren", btnGenerating:"Berechnung…",
    cibleTitle:"Scheibe", iaTitle:"KI-Einstelldaten",
    sliderH:"Horizontale Abweichung (cm)", sliderV:"Vertikale Abweichung (cm)",
    btnImprimer:"⎙ Scheibe drucken",
    ciblePH:"Konfigurieren Sie Ihre Einstellung und klicken Sie auf Generieren.",
    iaPH:"Klicken Sie auf Generieren für ballistische Daten und Einstelltipps.",
    calibreIntro:"Erhalten Sie eine Kaliberempfehlung für Ihr Wild, Gelände und Ihre Jagdmethode.",
    gibierLabel:"Zielwild *", gibierPH:"— Auswählen —",
    typeLabel:"Jagdart", typePH:"— Optional —",
    distTirLabel:"Typische Schussdistanz (m)", distTirPH:"— Optional —",
    btnCalConseiller:"Kaliberempfehlungen abrufen", btnCalLoading:"Analyse…",
    calPH:"Wählen Sie Ihr Wild für eine personalisierte Analyse.",
    gibierList:["Reh","Rothirsch","Wildschwein","Damhirsch","Mufflon","Feldhase","Fasan","Rebhuhn","Waldschnepfe","Wildkaninchen","Ringeltaube","Rotfuchs","Kanadagans","Stockente","Blässhuhn"],
    typeList:["Drückjagd","Pirsch / Ansitzjagd"],
    distTirList:["unter 50","50 bis 100","100 bis 150","150 bis 250","über 250"],
    munitionIntro:"Finden Sie die optimale Munition für Ihr Kaliber, Wild und den Jagdkontext.",
    munCalibreLabel:"Kaliber des Gewehrs *", munCalPH:"— Auswählen —",
    munTypeList:["Drückjagd","Pirsch / Ansitzjagd"],
    btnMunConseiller:"Munitionsempfehlungen abrufen", btnMunLoading:"Analyse…",
    munPH:"Wählen Sie Wild und Kaliber für eine detaillierte Empfehlung.",
    assistIntro:"Stellen Sie jede Frage zur Jagd in Belgien.",
    freeLabel:"verbleibende Frage(n) (kostenlose Version)",
    limitLabel:"Tageslimit erreicht",
    premiumLabel:"✓ PREMIUM — Unbegrenzte Fragen",
    premiumBtn:"Premium werden", premiumActive:"★ Premium",
    limitTitle:"Tageslimit erreicht",
    limitText:"Sie haben Ihre 3 kostenlosen Fragen für heute verbraucht. Wechseln Sie zu Premium für unbegrenzte Fragen.",
    monthly:"MONATLICH", annual:"JÄHRLICH", bestPrice:"BESTES ANGEBOT",
    activateBtn:"Premium aktivieren (Demo)",
    assistPH:"Stellen Sie Ihre Frage zur Jagd in Belgien… (Enter zum Senden)",
    assistLimitPH:"Tageslimit erreicht — auf Premium upgraden",
    freeNote:"Kostenlose Version: 3 Fragen/Tag · Unbegrenzt mit Premium",
    clearBtn:"✕ Gespräch löschen",
    examples:["Was ist die Jagdzeit für Wildschweine in Belgien?","Welcher Sicherheitsabstand gilt bei Drückjagden?","Darf ich im November Rehe in Ostbelgien jagen?","Welche Munition empfehlen Sie für Wildschweine?"],
    footerName:"CHASSIA BELGIEN",
    aboutTitle:"Über ChassIA",
    aboutDesc1:"ChassIA ist ein digitaler Assistent für belgische Jäger. Die App gibt Empfehlungen zu Kalibern und Munition, erstellt personalisierte Einstellungsscheiben und beantwortet Fragen zur Jagd in Belgien.",
    aboutDesc2:"Die Anwendung ist auf Französisch, Niederländisch, Deutsch und Englisch verfügbar.",
    aboutLegal:"Rechtliche Hinweise",
    aboutEditor:"Herausgeber", aboutContact:"Kontakt", aboutHost:"Hosting", aboutAI:"Künstliche Intelligenz", aboutData:"Personenbezogene Daten", aboutCookies:"Cookies",
    aboutEditorVal:"ChassIA — In Belgien entwickelte und betriebene Anwendung",
    aboutContactVal:"contact@chassia.be",
    aboutHostVal:"Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    aboutAIVal:"Betrieben von Claude (Anthropic). Antworten werden von KI generiert und können Ungenauigkeiten enthalten.",
    aboutDataVal:"Ohne Zustimmung werden keine personenbezogenen Daten gesammelt. Einstellungen werden lokal auf Ihrem Gerät gespeichert.",
    aboutCookiesVal:"Keine Drittanbieter-Cookies. Nur lokale Speicherung für Ihre Einstellungen und den Einstellungsverlauf.",
    aboutWarning:"Wichtiger Hinweis",
    aboutWarningText:"Die Empfehlungen von ChassIA sind indikativ und nicht bindend. Sie ersetzen nicht die offiziellen Gesetzestexte oder den Rat eines qualifizierten Fachmanns.",
    aboutSources:"Für rechtliche Fragen konsultieren Sie bitte die offiziellen Quellen:",
    aboutVersion:"ChassIA v1.0 · Daten 2025-2030 · © 2025 ChassIA",
    footerLegal:"Empfehlungen sind indikativ. Überprüfen Sie immer bei Ihrer regionalen Behörde.",
    footerRegl:"ANB · DNF · Ministerium der Deutschsprachigen Gemeinschaft",
    printTitle:"⎙ Scheibe drucken", printFormat:"Papierformat",
    printCancel:"Abbrechen", printLaunch:"⎙ Druck starten",
    printWarnTitle:"WICHTIG — VOR DEM DRUCKEN",
    printWarnText:"Überprüfen Sie in den Druckoptionen, dass der Maßstab auf « 100 % » (oder « Originalgröße ») eingestellt ist. Aktivieren Sie nicht « An Seite anpassen » oder automatische Skalierung, da dies die Ringgröße verändert und Ihre Einstellung ungültig machen würde.",
    system:`Du bist ein belgischer Jagdexperte, spezialisiert auf Ostbelgien und ganz Belgien. Du kennst die wallonische Jagdgesetzgebung (DNF) und die flämische Regelung (ANB) sowie die Regelungen der Deutschsprachigen Gemeinschaft. Du beantwortest ausschließlich Fragen zur Jagd: Vorschriften, Wildarten, Techniken, Ausrüstung, Waffen, Munition, Ballistik. Antworte immer auf DEUTSCH. Sei prägnant (max. 400 Wörter).`,
  },
  en: {
    code:"en", flag:"🇬🇧", name:"English", region:"Belgium",
    subtitle:"THE AI ASSISTANT FOR THE BELGIAN HUNTER",
    tabs:["🎯 Target","🔫 Caliber","💥 Ammunition","🤖 AI Assistant","🦌 Game","ℹ️ About"],
    tabIds:["cible","calibre","munition","assistant","gibier","apropos"],
    cibleIntro:"Generate your personalized zeroing target. Choose your caliber, ammunition, shooting distance and desired zero range.",
    calibreLabel:"Caliber", munitionLabel:"Ammunition (optional)", munitionPH:"— Select —",
    distLabel:"Shooting distance at the range (m)", distNote:"Distance at which you are shooting today",
    droLabel:"Desired zero range (m)", droNotePrefix:"Recommended zero for this caliber:",
    gibierBadge:"GAME", tirBadge:"SHOOTING AT", droBadge:"→ ZERO",
    btnGenerer:"Generate target & zeroing data", btnGenerating:"Calculating…",
    cibleTitle:"Target", iaTitle:"AI Zeroing Data",
    sliderH:"Horizontal offset (cm)", sliderV:"Vertical offset (cm)",
    btnImprimer:"⎙ Print target",
    ciblePH:'Configure your settings above and click "Generate" to get your target and ballistic data.',
    iaPH:"Click generate to get ballistic data and zeroing advice.",
    calibreIntro:"Get a caliber recommendation based on your game, terrain and hunting style.",
    gibierLabel:"Target game *", gibierPH:"— Select —",
    typeLabel:"Hunting type", typePH:"— Optional —",
    distTirLabel:"Typical shooting distance (m)", distTirPH:"— Optional —",
    btnCalConseiller:"Get my caliber recommendations", btnCalLoading:"Analysing…",
    calPH:"Select your game for a personalised analysis.",
    gibierList:["Roe deer","Red deer","Wild boar","Fallow deer","Mouflon","Brown hare","Pheasant","Grey partridge","Woodcock","Wild rabbit","Wood pigeon","Red fox","Canada goose","Mallard","Coot"],
    typeList:["Driven hunt","Stalking / Hide"],
    distTirList:["under 50","50 to 100","100 to 150","150 to 250","over 250"],
    munitionIntro:"Find the optimal ammunition for your caliber, game and hunting context.",
    munCalibreLabel:"Rifle caliber *", munCalPH:"— Select —",
    munTypeList:["Driven hunt","Stalking / Hide"],
    btnMunConseiller:"Get my ammunition recommendations", btnMunLoading:"Analysing…",
    munPH:"Select your game and caliber for a detailed recommendation.",
    assistIntro:"Ask any question about hunting in Belgium.",
    freeLabel:"question(s) remaining (free version)",
    limitLabel:"Daily limit reached",
    premiumLabel:"✓ PREMIUM — Unlimited questions",
    premiumBtn:"Go Premium", premiumActive:"★ Premium",
    limitTitle:"Daily limit reached",
    limitText:"You have used your 3 free questions for today. Go Premium for unlimited questions.",
    monthly:"MONTHLY", annual:"ANNUAL", bestPrice:"BEST PRICE",
    activateBtn:"Activate Premium (demo)",
    assistPH:"Ask your question about hunting in Belgium… (Enter to send)",
    assistLimitPH:"Daily limit reached — upgrade to Premium",
    freeNote:"Free version: 3 questions/day · Unlimited with Premium",
    clearBtn:"✕ Clear conversation",
    examples:["What is the wild boar season in Belgium?","What safety distance applies during driven hunts?","Can I hunt roe deer in November in Belgium?","What ammunition do you recommend for wild boar?"],
    footerName:"CHASSIA BELGIUM",
    aboutTitle:"About ChassIA",
    aboutDesc1:"ChassIA is a digital assistant for Belgian hunters. The app provides caliber and ammunition recommendations, generates personalised zeroing targets, and answers questions about hunting in Belgium.",
    aboutDesc2:"The application is available in French, Dutch, German and English.",
    aboutLegal:"Legal notices",
    aboutEditor:"Publisher", aboutContact:"Contact", aboutHost:"Hosting", aboutAI:"Artificial intelligence", aboutData:"Personal data", aboutCookies:"Cookies",
    aboutEditorVal:"ChassIA — Application developed and operated in Belgium",
    aboutContactVal:"contact@chassia.be",
    aboutHostVal:"Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    aboutAIVal:"Powered by Claude (Anthropic). Responses are AI-generated and may contain inaccuracies.",
    aboutDataVal:"No personal data is collected without consent. Preferences are stored locally on your device.",
    aboutCookiesVal:"No third-party cookies. Local storage only for your preferences and zeroing history.",
    aboutWarning:"Important disclaimer",
    aboutWarningText:"ChassIA recommendations are indicative and non-binding. They do not replace official legal texts or the advice of a qualified professional.",
    aboutSources:"For regulatory questions, always consult official sources:",
    aboutVersion:"ChassIA v1.0 · Data 2025-2030 · © 2025 ChassIA",
    footerLegal:"Recommendations are indicative. Always verify with your regional authority.",
    footerRegl:"ANB · DNF · Service Public de Wallonie · FPS Justice",
    printTitle:"⎙ Print target", printFormat:"Paper format",
    printCancel:"Cancel", printLaunch:"⎙ Start printing",
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
  // Premium users get Claude Opus (more powerful), free users get Claude Sonnet
  const model = premium
    ? "claude-opus-4-20250514"
    : "claude-sonnet-4-20250514";
  const messages = [
    ...history,
    { role: "user", content: prompt },
  ];
  // Use Vercel API route to keep the API key secure (never exposed in frontend)
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
  try {
    data = await res.json();
  } catch (e) {
    return "❌ Erreur API. Vérifie ta connexion ou réessaie.";
  }
  if (data && data.content && data.content[0] && data.content[0].text) {
    return data.content[0].text;
  }
  if (!res.ok) {
    console.error("API error:", data);
    return "❌ Erreur API. Vérifie ta connexion ou réessaie.";
  }
  return data.content?.[0]?.text || "Erreur lors de la réponse.";
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
    { label: "RWS HIT 1,6g ✓",                marque:"RWS",   sansPlomb:true,  v0:770,  poids:1.6  },
  ],

  // ── .22 HORNET ────────────────────────────────────────────────────────────
  ".22 Hornet": [
    { label: "RWS HIT 2,6g ✓",                marque:"RWS",   sansPlomb:true,  v0:736,  poids:2.6  },
    { label: "RWS TMS 3,0g",                   marque:"RWS",   sansPlomb:false, v0:700,  poids:3.0  },
  ],

  // ── .222 REMINGTON ───────────────────────────────────────────────────────
  ".222 Rem": [
    { label: "Sako Gamehead 3,2g", marque:"Sako", sansPlomb:false, v0:990, poids:3.2 },
    { label: "RWS HIT 2,6g ✓",                marque:"RWS",   sansPlomb:true,  v0:1060, poids:2.6  },
    { label: "RWS Match Jagd 3,4g",            marque:"RWS",   sansPlomb:false, v0:980,  poids:3.4  },
    { label: "RWS TMS 3,2g",                   marque:"RWS",   sansPlomb:false, v0:1020, poids:3.2  },
    { label: "GECO Express 3,6g",              marque:"GECO",  sansPlomb:false, v0:1030, poids:3.6  },
  ],

  // ── .223 REMINGTON ───────────────────────────────────────────────────────
  ".223 Rem": [
    { label: "Norma Ecostrike 3,2g ✓", marque:"Norma", sansPlomb:true, v0:1150, poids:3.2 },
    { label: "Norma Tipstrike 3,6g", marque:"Norma", sansPlomb:false, v0:1100, poids:3.6 },
    { label: "Sako Gamehead 3,6g", marque:"Sako", sansPlomb:false, v0:1085, poids:3.6 },
    { label: "Hornady American Whitetail 4,5g", marque:"Hornady", sansPlomb:false, v0:990, poids:4.5 },
    { label: "Winchester Power Point 3,6g", marque:"Winchester", sansPlomb:false, v0:1085, poids:3.6 },
    { label: "RWS TMS 3,6g",                   marque:"RWS",   sansPlomb:false, v0:1000, poids:3.6  },
    { label: "GECO Express 3,6g",              marque:"GECO",  sansPlomb:false, v0:1010, poids:3.6  },
    { label: "GECO Softpoint 3,4g",            marque:"GECO",  sansPlomb:false, v0:960,  poids:3.4  },
  ],

  // ── .22-250 REMINGTON ─────────────────────────────────────────────────────
  ".22-250 Rem": [
    { label: "Norma Tipstrike 3,6g", marque:"Norma", sansPlomb:false, v0:1180, poids:3.6 },
    { label: "Lapua Naturalis 3,6g ✓", marque:"Lapua", sansPlomb:true, v0:1100, poids:3.6 },
    { label: "Sako Gamehead 3,6g", marque:"Sako", sansPlomb:false, v0:1180, poids:3.6 },
    { label: "Hornady Varmint Express 3,2g ✓", marque:"Hornady", sansPlomb:true, v0:1200, poids:3.2 },
    { label: "Winchester Power Point 3,6g", marque:"Winchester", sansPlomb:false, v0:1180, poids:3.6 },
    { label: "RWS HIT 3,2g ✓",                marque:"RWS",   sansPlomb:true,  v0:1100, poids:3.2  },
    { label: "RWS TMS 3,6g",                   marque:"RWS",   sansPlomb:false, v0:1050, poids:3.6  },
  ],

  // ── 5,6×50R MAGNUM ────────────────────────────────────────────────────────
  "5.6x50R Mag": [
    { label: "RWS 5,6x50 R Mag. HIT 2,6g ✓",  marque:"RWS",   sansPlomb:true,  v0:1034, poids:2.6  },
    { label: "RWS 5,6x50 R Mag. TMS 3,2g",    marque:"RWS",   sansPlomb:false, v0:1015, poids:3.2  },
    { label: "RWS 5,6x50 R Mag. TMS 4,1g",    marque:"RWS",   sansPlomb:false, v0:900,  poids:4.1  },
  ],

  // ── 5,6×52R SAVAGE ───────────────────────────────────────────────────────
  "5.6x52R": [
    { label: "Norma Whitetail 4,6g", marque:"Norma", sansPlomb:false, v0:900, poids:4.6 },
    { label: "RWS 5,6x52 R TMS 4,6g",         marque:"RWS",   sansPlomb:false, v0:870,  poids:4.6  },
  ],

  // ── .243 WINCHESTER ──────────────────────────────────────────────────────
  ".243 Win": [
    { label: "Hornady SST 6,3g", marque:"Hornady", sansPlomb:false, v0:945, poids:6.3 },
    { label: "Sako Gamehead Pro 5,8g ✓", marque:"Sako", sansPlomb:true, v0:990, poids:5.8 },
    { label: "GECO Star 5,8g", marque:"GECO", sansPlomb:false, v0:990, poids:5.8 },
    { label: "Sako Super Hammerhead 6,5g", marque:"Sako", sansPlomb:false, v0:905, poids:6.5 },
    { label: "Winchester Deer Season XP Copper 5,8g ✓", marque:"Winchester", sansPlomb:true, v0:1010, poids:5.8 },
    { label: "Winchester Super-X Power-Point 5,8g", marque:"Winchester", sansPlomb:false, v0:990, poids:5.8 },
    { label: "Lapua Naturalis 6,5g ✓", marque:"Lapua", sansPlomb:true, v0:920, poids:6.5 },
    { label: "Sako Gamehead 6,5g", marque:"Sako", sansPlomb:false, v0:920, poids:6.5 },
    { label: "Winchester Ballistic Silvertip 5,8g", marque:"Winchester", sansPlomb:false, v0:1015, poids:5.8 },
    { label: "Winchester Deer Season XP 6,5g", marque:"Winchester", sansPlomb:false, v0:945, poids:6.5 },
    { label: "Hornady SST 5,8g", marque:"Hornady", sansPlomb:false, v0:1010, poids:5.8 },
    { label: "Hornady American Whitetail 6,2g", marque:"Hornady", sansPlomb:false, v0:920, poids:6.2 },
    { label: "Lapua Mega 6,5g", marque:"Lapua", sansPlomb:false, v0:950, poids:6.5 },
    { label: "Hornady Precision Hunter ELD-X 6,5g", marque:"Hornady", sansPlomb:false, v0:960, poids:6.5 },
    { label: "Winchester Power Point 6,5g", marque:"Winchester", sansPlomb:false, v0:975, poids:6.5 },
    { label: "Norma Whitetail 6,5g", marque:"Norma", sansPlomb:false, v0:905, poids:6.5 },
    { label: "RWS KS 6,2g",                    marque:"RWS",   sansPlomb:false, v0:910,  poids:6.2  },
    { label: "RWS TMS 6,5g",                   marque:"RWS",   sansPlomb:false, v0:900,  poids:6.5  },
    { label: "GECO Express 6,5g",              marque:"GECO",  sansPlomb:false, v0:920,  poids:6.5  },
    { label: "GECO Softpoint 6,8g",            marque:"GECO",  sansPlomb:false, v0:900,  poids:6.8  },
    { label: "Norma Tipstrike 6,5g",           marque:"Norma", sansPlomb:false, v0:890,  poids:6.5  },
    { label: "Norma Oryx 6,5g",                marque:"Norma", sansPlomb:false, v0:880,  poids:6.5  },
    { label: "Norma Ecostrike 6,5g ✓",         marque:"Norma", sansPlomb:true,  v0:890,  poids:6.5  },
  ],

  // ── 6 mm REMINGTON ───────────────────────────────────────────────────────
  "6mm Rem": [
    { label: "Hornady SST 6,1g", marque:"Hornady", sansPlomb:false, v0:945, poids:6.1 },
    { label: "Norma Oryx 6,5g",                marque:"Norma", sansPlomb:false, v0:895,  poids:6.5  },
    { label: "Norma Ecostrike 6,5g ✓",         marque:"Norma", sansPlomb:true,  v0:895,  poids:6.5  },
  ],

  // ── 6,5×55 SE ────────────────────────────────────────────────────────────
  "6.5x55 SE": [
    { label: "Winchester Ballistic Silvertip 9,1g", marque:"Winchester", sansPlomb:false, v0:808, poids:9.1 },
    { label: "Sako Powerhead Blade 7,8g ✓", marque:"Sako", sansPlomb:true, v0:850, poids:7.8 },
    { label: "Hornady SST 9,1g", marque:"Hornady", sansPlomb:false, v0:834, poids:9.1 },
    { label: "Sako Super Hammerhead 9,1g", marque:"Sako", sansPlomb:false, v0:800, poids:9.1 },
    { label: "Lapua Mega 11,0g", marque:"Lapua", sansPlomb:false, v0:760, poids:11.0 },
    { label: "Lapua Naturalis 8,0g ✓", marque:"Lapua", sansPlomb:true, v0:850, poids:8.0 },
    { label: "Lapua Mega 9,7g", marque:"Lapua", sansPlomb:false, v0:790, poids:9.7 },
    { label: "Sako Gamehead 9,1g", marque:"Sako", sansPlomb:false, v0:800, poids:9.1 },
    { label: "Hornady Custom International InterLock 8,8g", marque:"Hornady", sansPlomb:false, v0:810, poids:8.8 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:808, poids:9.7 },
    { label: "GECO Softpoint 9,1g", marque:"GECO", sansPlomb:false, v0:790, poids:9.1 },
    { label: "Norma Evostrike 6,5g ✓", marque:"Norma", sansPlomb:true, v0:920, poids:6.5 },
    { label: "Norma Vulkan 9,1g", marque:"Norma", sansPlomb:false, v0:800, poids:9.1 },
    { label: "Norma Whitetail 10,1g", marque:"Norma", sansPlomb:false, v0:770, poids:10.1 },
    { label: "RWS Evolution Green 6,0g ✓",     marque:"RWS",   sansPlomb:true,  v0:990,  poids:6.0  },
    { label: "RWS HIT 7,8g ✓",                 marque:"RWS",   sansPlomb:true,  v0:811,  poids:7.8  },
    { label: "RWS Speed Tip Pro 9,1g",          marque:"RWS",   sansPlomb:false, v0:797,  poids:9.1  },
    { label: "RWS DK 9,1g",                    marque:"RWS",   sansPlomb:false, v0:820,  poids:9.1  },
    { label: "GECO Express 9,1g",              marque:"GECO",  sansPlomb:false, v0:830,  poids:9.1  },
    { label: "GECO Plus 9,0g",                 marque:"GECO",  sansPlomb:false, v0:820,  poids:9.0  },
    { label: "Norma Bondstrike 9,1g",          marque:"Norma", sansPlomb:false, v0:800,  poids:9.1  },
    { label: "Norma Tipstrike 8,0g",           marque:"Norma", sansPlomb:false, v0:820,  poids:8.0  },
    { label: "Norma Oryx 9,0g",               marque:"Norma", sansPlomb:false, v0:790,  poids:9.0  },
    { label: "Norma Ecostrike 8,0g ✓",         marque:"Norma", sansPlomb:true,  v0:820,  poids:8.0  },
  ],

  // ── 6,5 CREEDMOOR ────────────────────────────────────────────────────────
  "6.5 Creedmoor": [
    { label: "Winchester Expedition Big Game 9,2g", marque:"Winchester", sansPlomb:false, v0:825, poids:9.2 },
    { label: "Sako Powerhead Blade 7,8g ✓", marque:"Sako", sansPlomb:true, v0:850, poids:7.8 },
    { label: "Sako Gamehead 9,1g", marque:"Sako", sansPlomb:false, v0:820, poids:9.1 },
    { label: "Lapua Naturalis 8,0g ✓", marque:"Lapua", sansPlomb:true, v0:840, poids:8.0 },
    { label: "Winchester Power Point 8,4g", marque:"Winchester", sansPlomb:false, v0:838, poids:8.4 },
    { label: "Lapua Mega 9,1g", marque:"Lapua", sansPlomb:false, v0:800, poids:9.1 },
    { label: "Sako Arrowhead II 9,1g", marque:"Sako", sansPlomb:false, v0:830, poids:9.1 },
    { label: "Winchester Ballistic Silvertip 8,4g", marque:"Winchester", sansPlomb:false, v0:875, poids:8.4 },
    { label: "Hornady SST 8,4g", marque:"Hornady", sansPlomb:false, v0:880, poids:8.4 },
    { label: "Hornady American Whitetail 8,4g", marque:"Hornady", sansPlomb:false, v0:838, poids:8.4 },
    { label: "Sako Super Hammerhead 9,1g", marque:"Sako", sansPlomb:false, v0:835, poids:9.1 },
    { label: "Hornady Precision Hunter ELD-X 9,1g", marque:"Hornady", sansPlomb:false, v0:829, poids:9.1 },
    { label: "Winchester Deer Season XP 8,1g", marque:"Winchester", sansPlomb:false, v0:845, poids:8.1 },
    { label: "GECO Star 8,2g", marque:"GECO", sansPlomb:false, v0:850, poids:8.2 },
    { label: "GECO Plus 9,1g", marque:"GECO", sansPlomb:false, v0:820, poids:9.1 },
    { label: "Norma Evostrike 6,5g ✓", marque:"Norma", sansPlomb:true, v0:950, poids:6.5 },
    { label: "Norma Whitetail 9,1g", marque:"Norma", sansPlomb:false, v0:820, poids:9.1 },
    { label: "RWS Evolution Green 6,0g ✓",     marque:"RWS",   sansPlomb:true,  v0:998,  poids:6.0  },
    { label: "RWS HIT 7,8g ✓",                 marque:"RWS",   sansPlomb:true,  v0:859,  poids:7.8  },
    { label: "RWS Speed Tip Pro 9,1g",          marque:"RWS",   sansPlomb:false, v0:828,  poids:9.1  },
    { label: "GECO Express 9,1g",              marque:"GECO",  sansPlomb:false, v0:840,  poids:9.1  },
    { label: "Norma Bondstrike 9,1g",          marque:"Norma", sansPlomb:false, v0:828,  poids:9.1  },
    { label: "Norma Tipstrike 8,0g",           marque:"Norma", sansPlomb:false, v0:850,  poids:8.0  },
    { label: "Norma Oryx 8,0g",               marque:"Norma", sansPlomb:false, v0:830,  poids:8.0  },
    { label: "Norma Ecostrike 8,0g ✓",         marque:"Norma", sansPlomb:true,  v0:840,  poids:8.0  },
  ],

  // ── .260 REMINGTON ───────────────────────────────────────────────────────
  ".260 Rem": [
    { label: "Hornady Precision Hunter ELD-X 9,1g", marque:"Hornady", sansPlomb:false, v0:820, poids:9.1 },
    { label: "Norma Oryx 8,4g",                marque:"Norma", sansPlomb:false, v0:810,  poids:8.4  },
    { label: "Norma Ecostrike 8,0g ✓",         marque:"Norma", sansPlomb:true,  v0:820,  poids:8.0  },
  ],

  // ── 6,5 PRC ──────────────────────────────────────────────────────────────
  "6.5 PRC": [
    { label: "Winchester Expedition Big Game LR 9,2g", marque:"Winchester", sansPlomb:false, v0:905, poids:9.2 },
    { label: "Hornady SST 8,7g", marque:"Hornady", sansPlomb:false, v0:880, poids:8.7 },
    { label: "Sako Super Hammerhead 9,1g", marque:"Sako", sansPlomb:false, v0:900, poids:9.1 },
    { label: "Winchester Expedition Big Game 9,1g", marque:"Winchester", sansPlomb:false, v0:915, poids:9.1 },
    { label: "Hornady American Whitetail 8,4g", marque:"Hornady", sansPlomb:false, v0:880, poids:8.4 },
    { label: "Hornady Precision Hunter ELD-X 9,1g", marque:"Hornady", sansPlomb:false, v0:900, poids:9.1 },
    { label: "Norma Whitetail 10,1g", marque:"Norma", sansPlomb:false, v0:860, poids:10.1 },
    { label: "RWS HIT 9,0g ✓",                 marque:"RWS",   sansPlomb:true,  v0:870,  poids:9.0  },
    { label: "RWS Speed Tip Pro 9,1g",          marque:"RWS",   sansPlomb:false, v0:860,  poids:9.1  },
    { label: "Norma Bondstrike 9,1g",          marque:"Norma", sansPlomb:false, v0:860,  poids:9.1  },
    { label: "Norma Ecostrike 9,0g ✓",         marque:"Norma", sansPlomb:true,  v0:870,  poids:9.0  },
  ],

  // ── 6,5×57 ───────────────────────────────────────────────────────────────
  "6.5x57": [
    { label: "Hornady Custom International InterLock 8,8g", marque:"Hornady", sansPlomb:false, v0:800, poids:8.8 },
    { label: "RWS Evolution Green 6,0g ✓",     marque:"RWS",   sansPlomb:true,  v0:950,  poids:6.0  },
    { label: "RWS KS 8,2g",                    marque:"RWS",   sansPlomb:false, v0:840,  poids:8.2  },
    { label: "RWS DK 9,1g",                    marque:"RWS",   sansPlomb:false, v0:800,  poids:9.1  },
    { label: "Norma Oryx 9,0g",               marque:"Norma", sansPlomb:false, v0:800,  poids:9.0  },
  ],

  // ── 6,5×57R ──────────────────────────────────────────────────────────────
  "6.5x57R": [
    { label: "Hornady Custom International InterLock 8,8g", marque:"Hornady", sansPlomb:false, v0:790, poids:8.8 },
    { label: "RWS Evolution Green 6,0g ✓",     marque:"RWS",   sansPlomb:true,  v0:920,  poids:6.0  },
    { label: "RWS KS 8,2g",                    marque:"RWS",   sansPlomb:false, v0:800,  poids:8.2  },
    { label: "RWS DK 9,1g",                    marque:"RWS",   sansPlomb:false, v0:760,  poids:9.1  },
    { label: "Norma Oryx 9,0g",               marque:"Norma", sansPlomb:false, v0:760,  poids:9.0  },
  ],

  // ── .257 ROBERTS ─────────────────────────────────────────────────────────
  ".257 Roberts": [
    { label: "Winchester Power Point 6,8g", marque:"Winchester", sansPlomb:false, v0:880, poids:6.8 },
    { label: "Norma Oryx 8,1g",                marque:"Norma", sansPlomb:false, v0:855,  poids:8.1  },
  ],

  // ── .25-06 REMINGTON ──────────────────────────────────────────────────────
  ".25-06 Rem": [
    { label: "GECO Express 7,1g", marque:"GECO", sansPlomb:false, v0:945, poids:7.1 },
    { label: "Norma Oryx 7,8g", marque:"Norma", sansPlomb:false, v0:920, poids:7.8 },
    { label: "Norma Whitetail 7,8g", marque:"Norma", sansPlomb:false, v0:945, poids:7.8 },
    { label: "Sako Gamehead 7,1g", marque:"Sako", sansPlomb:false, v0:945, poids:7.1 },
    { label: "Hornady Precision Hunter ELD-X 7,8g", marque:"Hornady", sansPlomb:false, v0:945, poids:7.8 },
    { label: "Winchester Power Point 7,1g", marque:"Winchester", sansPlomb:false, v0:945, poids:7.1 },
    { label: "RWS TMS 7,8g",                   marque:"RWS",   sansPlomb:false, v0:940,  poids:7.8  },
    { label: "Norma Oryx 8,1g",                marque:"Norma", sansPlomb:false, v0:915,  poids:8.1  },
    { label: "Norma Ecostrike 7,8g ✓",         marque:"Norma", sansPlomb:true,  v0:925,  poids:7.8  },
  ],

  // ── 7×57 MAUSER ──────────────────────────────────────────────────────────
  "7x57": [
    { label: "Hornady Custom International InterLock 10,9g", marque:"Hornady", sansPlomb:false, v0:792, poids:10.9 },
    { label: "RWS ID Classic 10,5g",           marque:"RWS",   sansPlomb:false, v0:810,  poids:10.5 },
    { label: "RWS Evolution Green 8,2g ✓",     marque:"RWS",   sansPlomb:true,  v0:890,  poids:8.2  },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:810,  poids:10.7 },
    { label: "Norma Oryx 10,5g",              marque:"Norma", sansPlomb:false, v0:800,  poids:10.5 },
    { label: "Norma Ecostrike 9,7g ✓",         marque:"Norma", sansPlomb:true,  v0:840,  poids:9.7  },
  ],

  // ── 7×57R ─────────────────────────────────────────────────────────────────
  "7x57R": [
    { label: "Hornady Custom International InterLock 10,9g", marque:"Hornady", sansPlomb:false, v0:780, poids:10.9 },
    { label: "Norma Tipstrike 10,4g", marque:"Norma", sansPlomb:false, v0:760, poids:10.4 },
    { label: "RWS Evolution Green 8,2g ✓",     marque:"RWS",   sansPlomb:true,  v0:830,  poids:8.2  },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:730,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:760,  poids:10.5 },
    { label: "GECO Zero 8,2g ✓",               marque:"GECO",  sansPlomb:true,  v0:790,  poids:8.2  },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:760,  poids:10.7 },
    { label: "Norma Oryx 10,5g",              marque:"Norma", sansPlomb:false, v0:750,  poids:10.5 },
  ],

  // ── 7×64 BRENNEKE ────────────────────────────────────────────────────────
  "7x64": [
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:870, poids:9.7 },
    { label: "Sako Gamehead 11,7g", marque:"Sako", sansPlomb:false, v0:800, poids:11.7 },
    { label: "Hornady SST 10,0g", marque:"Hornady", sansPlomb:false, v0:830, poids:10.0 },
    { label: "Hornady SST 9,1g", marque:"Hornady", sansPlomb:false, v0:870, poids:9.1 },
    { label: "Sako Super Hammerhead 11,0g", marque:"Sako", sansPlomb:false, v0:800, poids:11.0 },
    { label: "Hornady Precision Hunter ELD-X 10,7g", marque:"Hornady", sansPlomb:false, v0:800, poids:10.7 },
    { label: "Lapua Mega 11,0g", marque:"Lapua", sansPlomb:false, v0:800, poids:11.0 },
    { label: "Sako Powerhead Blade 9,3g ✓", marque:"Sako", sansPlomb:true, v0:850, poids:9.3 },
    { label: "Lapua Naturalis 10,1g ✓", marque:"Lapua", sansPlomb:true, v0:830, poids:10.1 },
    { label: "Sako Hammerhead 11,0g", marque:"Sako", sansPlomb:false, v0:795, poids:11.0 },
    { label: "Sako Gamehead 7,8g", marque:"Sako", sansPlomb:false, v0:935, poids:7.8 },
    { label: "Hornady International ECX 9,7g ✓", marque:"Hornady", sansPlomb:true, v0:850, poids:9.7 },
    { label: "Hornady Custom International InterLock 10,0g", marque:"Hornady", sansPlomb:false, v0:823, poids:10.0 },
    { label: "Winchester Power Point 10,5g", marque:"Winchester", sansPlomb:false, v0:800, poids:10.5 },
    { label: "Norma Vulkan 11,0g", marque:"Norma", sansPlomb:false, v0:830, poids:11.0 },
    { label: "RWS Evolution Green 8,2g ✓",     marque:"RWS",   sansPlomb:true,  v0:950,  poids:8.2  },
    { label: "RWS HIT 9,1g ✓",                 marque:"RWS",   sansPlomb:true,  v0:900,  poids:9.1  },
    { label: "RWS Speed Tip Pro 9,7g",          marque:"RWS",   sansPlomb:false, v0:930,  poids:9.7  },
    { label: "RWS Evolution 10,3g",             marque:"RWS",   sansPlomb:false, v0:855,  poids:10.3 },
    { label: "RWS ID Classic 10,5g",           marque:"RWS",   sansPlomb:false, v0:865,  poids:10.5 },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:820,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:850,  poids:10.5 },
    { label: "RWS KS 8,0g",                    marque:"RWS",   sansPlomb:false, v0:965,  poids:8.0  },
    { label: "GECO Star 9,1g ✓",               marque:"GECO",  sansPlomb:true,  v0:900,  poids:9.1  },
    { label: "GECO Zero 8,2g ✓",               marque:"GECO",  sansPlomb:true,  v0:910,  poids:8.2  },
    { label: "GECO Plus 11,0g",                marque:"GECO",  sansPlomb:false, v0:860,  poids:11.0 },
    { label: "GECO Express 10,0g",             marque:"GECO",  sansPlomb:false, v0:870,  poids:10.0 },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:860,  poids:10.7 },
    { label: "Norma Oryx 10,7g",              marque:"Norma", sansPlomb:false, v0:845,  poids:10.7 },
    { label: "Norma Tipstrike 10,0g",          marque:"Norma", sansPlomb:false, v0:880,  poids:10.0 },
    { label: "Norma Bondstrike 10,0g",         marque:"Norma", sansPlomb:false, v0:870,  poids:10.0 },
    { label: "Norma Ecostrike 10,0g ✓",        marque:"Norma", sansPlomb:true,  v0:875,  poids:10.0 },
  ],

  // ── 7×65R ─────────────────────────────────────────────────────────────────
  "7x65R": [
    { label: "Winchester Power Point 11,0g", marque:"Winchester", sansPlomb:false, v0:780, poids:11.0 },
    { label: "Lapua Mega 11,0g", marque:"Lapua", sansPlomb:false, v0:780, poids:11.0 },
    { label: "Sako Super Hammerhead 11,0g", marque:"Sako", sansPlomb:false, v0:780, poids:11.0 },
    { label: "Sako Hammerhead 11,0g", marque:"Sako", sansPlomb:false, v0:780, poids:11.0 },
    { label: "Hornady Custom International InterLock 10,9g", marque:"Hornady", sansPlomb:false, v0:793, poids:10.9 },
    { label: "Norma Tipstrike 10,4g", marque:"Norma", sansPlomb:false, v0:780, poids:10.4 },
    { label: "Norma Vulkan 11,0g", marque:"Norma", sansPlomb:false, v0:800, poids:11.0 },
    { label: "RWS Evolution Green 8,2g ✓",     marque:"RWS",   sansPlomb:true,  v0:910,  poids:8.2  },
    { label: "RWS HIT 9,1g ✓",                 marque:"RWS",   sansPlomb:true,  v0:850,  poids:9.1  },
    { label: "RWS Evolution 10,3g",             marque:"RWS",   sansPlomb:false, v0:810,  poids:10.3 },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:810,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:820,  poids:10.5 },
    { label: "RWS KS 8,0g",                    marque:"RWS",   sansPlomb:false, v0:925,  poids:8.0  },
    { label: "GECO Zero 8,2g ✓",               marque:"GECO",  sansPlomb:true,  v0:870,  poids:8.2  },
    { label: "GECO Plus 11,0g",                marque:"GECO",  sansPlomb:false, v0:820,  poids:11.0 },
    { label: "GECO Softpoint 8,2g",            marque:"GECO",  sansPlomb:false, v0:870,  poids:8.2  },
    { label: "Norma Oryx 10,7g",              marque:"Norma", sansPlomb:false, v0:810,  poids:10.7 },
    { label: "Norma Ecostrike 10,0g ✓",        marque:"Norma", sansPlomb:true,  v0:845,  poids:10.0 },
  ],

  // ── .270 WINCHESTER ──────────────────────────────────────────────────────
  ".270 Win": [
    { label: "Sako Hammerhead 10,1g", marque:"Sako", sansPlomb:false, v0:870, poids:10.1 },
    { label: "Lapua Mega 9,7g", marque:"Lapua", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Lapua Naturalis 8,3g ✓", marque:"Lapua", sansPlomb:true, v0:920, poids:8.3 },
    { label: "Sako Powerhead Blade 8,2g ✓", marque:"Sako", sansPlomb:true, v0:935, poids:8.2 },
    { label: "Sako Super Hammerhead 9,7g", marque:"Sako", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Winchester Power Max Bonded 8,4g", marque:"Winchester", sansPlomb:false, v0:930, poids:8.4 },
    { label: "Winchester Expedition Big Game 8,4g", marque:"Winchester", sansPlomb:false, v0:945, poids:8.4 },
    { label: "Winchester Deer Season XP 8,4g", marque:"Winchester", sansPlomb:false, v0:930, poids:8.4 },
    { label: "Hornady SST 8,4g", marque:"Hornady", sansPlomb:false, v0:975, poids:8.4 },
    { label: "Hornady American Whitetail 8,4g", marque:"Hornady", sansPlomb:false, v0:930, poids:8.4 },
    { label: "Sako Gamehead 9,7g", marque:"Sako", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Hornady Custom International InterLock 9,7g", marque:"Hornady", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Hornady Precision Hunter ELD-X 9,1g", marque:"Hornady", sansPlomb:false, v0:945, poids:9.1 },
    { label: "Winchester Ballistic Silvertip 8,4g", marque:"Winchester", sansPlomb:false, v0:975, poids:8.4 },
    { label: "Winchester Power Point 9,1g", marque:"Winchester", sansPlomb:false, v0:945, poids:9.1 },
    { label: "Norma Evostrike 7,1g ✓", marque:"Norma", sansPlomb:true, v0:1010, poids:7.1 },
    { label: "Norma Vulkan 9,7g", marque:"Norma", sansPlomb:false, v0:880, poids:9.7 },
    { label: "Norma Whitetail 8,4g", marque:"Norma", sansPlomb:false, v0:880, poids:8.4 },
    { label: "RWS Evolution Green 6,2g ✓",     marque:"RWS",   sansPlomb:true,  v0:1080, poids:6.2  },
    { label: "RWS HIT 8,4g ✓",                 marque:"RWS",   sansPlomb:true,  v0:921,  poids:8.4  },
    { label: "RWS Speed Tip Pro 9,1g",          marque:"RWS",   sansPlomb:false, v0:925,  poids:9.1  },
    { label: "RWS Evolution 10,0g",             marque:"RWS",   sansPlomb:false, v0:830,  poids:10.0 },
    { label: "RWS KS 9,7g",                    marque:"RWS",   sansPlomb:false, v0:896,  poids:9.7  },
    { label: "GECO Star 8,4g ✓",               marque:"GECO",  sansPlomb:true,  v0:920,  poids:8.4  },
    { label: "GECO Plus 11,0g",                marque:"GECO",  sansPlomb:false, v0:890,  poids:11.0 },
    { label: "GECO Express 9,7g",              marque:"GECO",  sansPlomb:false, v0:915,  poids:9.7  },
    { label: "GECO Softpoint 9,1g",            marque:"GECO",  sansPlomb:false, v0:900,  poids:9.1  },
    { label: "Norma Oryx 10,0g",              marque:"Norma", sansPlomb:false, v0:880,  poids:10.0 },
    { label: "Norma Tipstrike 9,7g",           marque:"Norma", sansPlomb:false, v0:900,  poids:9.7  },
    { label: "Norma Bondstrike 9,7g",          marque:"Norma", sansPlomb:false, v0:895,  poids:9.7  },
    { label: "Norma Ecostrike 9,7g ✓",         marque:"Norma", sansPlomb:true,  v0:900,  poids:9.7  },
  ],

  // ── .270 WSM ─────────────────────────────────────────────────────────────
  ".270 WSM": [
    { label: "GECO Express 9,1g", marque:"GECO", sansPlomb:false, v0:980, poids:9.1 },
    { label: "RWS Evolution Green 8,2g ✓", marque:"RWS", sansPlomb:true, v0:985, poids:8.2 },
    { label: "Winchester Ballistic Silvertip 9,1g", marque:"Winchester", sansPlomb:false, v0:975, poids:9.1 },
    { label: "Winchester Power Max Bonded 8,4g", marque:"Winchester", sansPlomb:false, v0:985, poids:8.4 },
    { label: "Winchester Power Point 9,1g", marque:"Winchester", sansPlomb:false, v0:980, poids:9.1 },
    { label: "RWS HIT 8,4g ✓",                 marque:"RWS",   sansPlomb:true,  v0:940,  poids:8.4  },
    { label: "Norma Bondstrike 9,7g",          marque:"Norma", sansPlomb:false, v0:935,  poids:9.7  },
    { label: "Norma Oryx 10,0g",              marque:"Norma", sansPlomb:false, v0:920,  poids:10.0 },
    { label: "Norma Ecostrike 9,7g ✓",         marque:"Norma", sansPlomb:true,  v0:935,  poids:9.7  },
  ],

  // ── .280 REMINGTON ───────────────────────────────────────────────────────
  ".280 Rem": [
    { label: "Hornady SST 9,1g", marque:"Hornady", sansPlomb:false, v0:880, poids:9.1 },
    { label: "Hornady Custom International InterLock 9,7g", marque:"Hornady", sansPlomb:false, v0:870, poids:9.7 },
    { label: "Sako Hammerhead 11,0g", marque:"Sako", sansPlomb:false, v0:850, poids:11.0 },
    { label: "Hornady Precision Hunter ELD-X 9,7g", marque:"Hornady", sansPlomb:false, v0:880, poids:9.7 },
    { label: "Winchester Power Point 9,5g", marque:"Winchester", sansPlomb:false, v0:880, poids:9.5 },
    { label: "Norma Vulkan 11,0g", marque:"Norma", sansPlomb:false, v0:840, poids:11.0 },
    { label: "GECO Softpoint 10,7g",           marque:"GECO",  sansPlomb:false, v0:850,  poids:10.7 },
    { label: "Norma Oryx 10,7g",              marque:"Norma", sansPlomb:false, v0:850,  poids:10.7 },
    { label: "Norma Ecostrike 10,0g ✓",        marque:"Norma", sansPlomb:true,  v0:860,  poids:10.0 },
  ],

  // ── 7mm-08 REMINGTON ──────────────────────────────────────────────────────
  "7mm-08": [
    { label: "Hornady SST 9,1g", marque:"Hornady", sansPlomb:false, v0:838, poids:9.1 },
    { label: "GECO Softpoint 9,1g", marque:"GECO", sansPlomb:false, v0:830, poids:9.1 },
    { label: "GECO Express 9,1g", marque:"GECO", sansPlomb:false, v0:838, poids:9.1 },
    { label: "Winchester Power Point 9,1g", marque:"Winchester", sansPlomb:false, v0:838, poids:9.1 },
    { label: "Winchester Ballistic Silvertip 9,1g", marque:"Winchester", sansPlomb:false, v0:880, poids:9.1 },
    { label: "Hornady American Whitetail 9,1g", marque:"Hornady", sansPlomb:false, v0:838, poids:9.1 },
    { label: "Sako Gamehead 9,1g", marque:"Sako", sansPlomb:false, v0:838, poids:9.1 },
    { label: "Hornady Precision Hunter ELD-X 9,1g", marque:"Hornady", sansPlomb:false, v0:838, poids:9.1 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:820, poids:9.7 },
    { label: "Norma Whitetail 9,7g", marque:"Norma", sansPlomb:false, v0:820, poids:9.7 },
    { label: "RWS Evolution Green 8,2g ✓",     marque:"RWS",   sansPlomb:true,  v0:870,  poids:8.2  },
    { label: "Norma Tipstrike 9,0g",           marque:"Norma", sansPlomb:false, v0:840,  poids:9.0  },
    { label: "Norma Oryx 9,7g",               marque:"Norma", sansPlomb:false, v0:820,  poids:9.7  },
    { label: "Norma Ecostrike 9,0g ✓",         marque:"Norma", sansPlomb:true,  v0:840,  poids:9.0  },
  ],

  // ── 7mm REMINGTON MAGNUM ──────────────────────────────────────────────────
  "7mm Rem Mag": [
    { label: "Hornady SST 10,0g", marque:"Hornady", sansPlomb:false, v0:945, poids:10.0 },
    { label: "Hornady SST 9,1g", marque:"Hornady", sansPlomb:false, v0:988, poids:9.1 },
    { label: "Winchester Expedition Big Game 9,7g", marque:"Winchester", sansPlomb:false, v0:930, poids:9.7 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:920, poids:9.7 },
    { label: "Winchester Power Max Bonded 9,7g", marque:"Winchester", sansPlomb:false, v0:905, poids:9.7 },
    { label: "Hornady American Whitetail 9,5g", marque:"Hornady", sansPlomb:false, v0:920, poids:9.5 },
    { label: "Sako Arrowhead II 9,7g", marque:"Sako", sansPlomb:false, v0:930, poids:9.7 },
    { label: "Hornady Precision Hunter ELD-X 10,5g", marque:"Hornady", sansPlomb:false, v0:930, poids:10.5 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:930, poids:9.7 },
    { label: "Winchester Power Point 10,2g", marque:"Winchester", sansPlomb:false, v0:900, poids:10.2 },
    { label: "Norma Tipstrike 10,4g", marque:"Norma", sansPlomb:false, v0:870, poids:10.4 },
    { label: "Norma Evostrike 8,2g ✓", marque:"Norma", sansPlomb:true, v0:1010, poids:8.2 },
    { label: "Norma Vulkan 11,0g", marque:"Norma", sansPlomb:false, v0:870, poids:11.0 },
    { label: "Norma Whitetail 9,7g", marque:"Norma", sansPlomb:false, v0:920, poids:9.7 },
    { label: "RWS Evolution Green 8,2g ✓",     marque:"RWS",   sansPlomb:true,  v0:1010, poids:8.2  },
    { label: "RWS HIT 9,1g ✓",                 marque:"RWS",   sansPlomb:true,  v0:940,  poids:9.1  },
    { label: "RWS Speed Tip Pro 9,7g",          marque:"RWS",   sansPlomb:false, v0:950,  poids:9.7  },
    { label: "RWS Evolution 10,3g",             marque:"RWS",   sansPlomb:false, v0:870,  poids:10.3 },
    { label: "RWS ID Classic 11,5g",           marque:"RWS",   sansPlomb:false, v0:840,  poids:11.5 },
    { label: "RWS KS 10,5g",                   marque:"RWS",   sansPlomb:false, v0:890,  poids:10.5 },
    { label: "GECO Zero 8,2g ✓",               marque:"GECO",  sansPlomb:true,  v0:950,  poids:8.2  },
    { label: "GECO Plus 11,0g",                marque:"GECO",  sansPlomb:false, v0:920,  poids:11.0 },
    { label: "GECO Express 10,0g",             marque:"GECO",  sansPlomb:false, v0:930,  poids:10.0 },
    { label: "Norma Bondstrike 10,7g",         marque:"Norma", sansPlomb:false, v0:900,  poids:10.7 },
    { label: "Norma Oryx 11,0g",              marque:"Norma", sansPlomb:false, v0:880,  poids:11.0 },
    { label: "Norma Ecostrike 10,0g ✓",        marque:"Norma", sansPlomb:true,  v0:910,  poids:10.0 },
  ],

  // ── 7mm PRC ──────────────────────────────────────────────────────────────
  "7mm PRC": [
    { label: "Hornady Precision Hunter ELD-X 11,3g", marque:"Hornady", sansPlomb:false, v0:890, poids:11.3 },
    { label: "RWS HIT 9,5g ✓",                 marque:"RWS",   sansPlomb:true,  v0:950,  poids:9.5  },
    { label: "RWS Speed Tip Pro 9,7g",          marque:"RWS",   sansPlomb:false, v0:940,  poids:9.7  },
    { label: "Norma Bondstrike 10,7g",         marque:"Norma", sansPlomb:false, v0:915,  poids:10.7 },
    { label: "Norma Ecostrike 10,0g ✓",        marque:"Norma", sansPlomb:true,  v0:930,  poids:10.0 },
  ],

  // ── .308 WINCHESTER ──────────────────────────────────────────────────────
  ".308 Win": [
    { label: "Sako Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:780, poids:11.7 },
    { label: "Sako Super Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:790, poids:11.7 },
    { label: "Lapua Scenar OTM 10,1g", marque:"Lapua", sansPlomb:false, v0:800, poids:10.1 },
    { label: "Winchester Deer Season XP Copper 9,7g ✓", marque:"Winchester", sansPlomb:true, v0:838, poids:9.7 },
    { label: "Winchester Super-X Power-Point 11,7g", marque:"Winchester", sansPlomb:false, v0:775, poids:11.7 },
    { label: "Lapua Mega 12,0g", marque:"Lapua", sansPlomb:false, v0:760, poids:12.0 },
    { label: "Sako Arrowhead II 9,7g", marque:"Sako", sansPlomb:false, v0:838, poids:9.7 },
    { label: "Sako Gamehead 9,7g", marque:"Sako", sansPlomb:false, v0:840, poids:9.7 },
    { label: "Winchester Copper Impact 9,7g ✓", marque:"Winchester", sansPlomb:true, v0:850, poids:9.7 },
    { label: "Winchester Expedition Big Game 11,7g", marque:"Winchester", sansPlomb:false, v0:780, poids:11.7 },
    { label: "Hornady Outfitter GMX 9,7g ✓", marque:"Hornady", sansPlomb:true, v0:869, poids:9.7 },
    { label: "Hornady SST 9,7g", marque:"Hornady", sansPlomb:false, v0:860, poids:9.7 },
    { label: "Hornady American Whitetail 10,7g", marque:"Hornady", sansPlomb:false, v0:847, poids:10.7 },
    { label: "Lapua Naturalis 11,0g ✓", marque:"Lapua", sansPlomb:true, v0:800, poids:11.0 },
    { label: "Lapua Mega 9,7g", marque:"Lapua", sansPlomb:false, v0:838, poids:9.7 },
    { label: "Sako Powerhead Blade 10,5g ✓", marque:"Sako", sansPlomb:true, v0:815, poids:10.5 },
    { label: "Sako Super Hammerhead 9,7g", marque:"Sako", sansPlomb:false, v0:838, poids:9.7 },
    { label: "Hornady GMX 10,7g ✓", marque:"Hornady", sansPlomb:true, v0:853, poids:10.7 },
    { label: "Hornady Custom International InterLock 11,7g", marque:"Hornady", sansPlomb:false, v0:820, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 11,7g", marque:"Hornady", sansPlomb:false, v0:838, poids:11.7 },
    { label: "Winchester Power Max Bonded 11,7g", marque:"Winchester", sansPlomb:false, v0:760, poids:11.7 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:857, poids:9.7 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:884, poids:9.7 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:838, poids:9.7 },
    { label: "Norma Evostrike 9,0g ✓", marque:"Norma", sansPlomb:true, v0:900, poids:9.0 },
    { label: "Norma Vulkan 11,7g", marque:"Norma", sansPlomb:false, v0:780, poids:11.7 },
    { label: "Norma Whitetail 11,7g", marque:"Norma", sansPlomb:false, v0:780, poids:11.7 },
    { label: "RWS Driven Hunt 10,7g ✓",           marque:"RWS",   sansPlomb:true, v0:765,  poids:10.7 },
    { label: "RWS Driven Hunt SR 9,7g ✓",         marque:"RWS",   sansPlomb:true, v0:812,  poids:9.7  },
    { label: "RWS Evolution Green 9,0g ✓",      marque:"RWS",   sansPlomb:true,  v0:885,  poids:9.0  },
    { label: "RWS Evolution Green SR 9,0g ✓",   marque:"RWS",   sansPlomb:true,  v0:900,  poids:9.0  },
    { label: "RWS HIT 10,7g ✓",                 marque:"RWS",   sansPlomb:true,  v0:820,  poids:10.7 },
    { label: "RWS HIT SR 9,7g ✓",               marque:"RWS",   sansPlomb:true,  v0:870,  poids:9.7  },
    { label: "RWS Speed Tip Pro 10,7g",          marque:"RWS",   sansPlomb:false, v0:830,  poids:10.7 },
    { label: "RWS Speed Tip Pro SR 10,7g",       marque:"RWS",   sansPlomb:false, v0:830,  poids:10.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:750,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:770,  poids:11.7 },
    { label: "RWS ID Classic 9,7g",              marque:"RWS",   sansPlomb:false, v0:860,  poids:9.7  },
    { label: "RWS KS 9,7g",                      marque:"RWS",   sansPlomb:false, v0:850,  poids:9.7  },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:800,  poids:10.7 },
    { label: "GECO Star 10,7g ✓",               marque:"GECO",  sansPlomb:true,  v0:820,  poids:10.7 },
    { label: "GECO Zero 8,8g ✓",                marque:"GECO",  sansPlomb:true,  v0:870,  poids:8.8  },
    { label: "GECO Plus 11,0g",                 marque:"GECO",  sansPlomb:false, v0:820,  poids:11.0 },
    { label: "GECO Express 10,7g",              marque:"GECO",  sansPlomb:false, v0:840,  poids:10.7 },
    { label: "GECO Softpoint 11,0g",            marque:"GECO",  sansPlomb:false, v0:800,  poids:11.0 },
    { label: "Norma Oryx 11,7g",               marque:"Norma", sansPlomb:false, v0:780,  poids:11.7 },
    { label: "Norma Tipstrike 11,0g",           marque:"Norma", sansPlomb:false, v0:800,  poids:11.0 },
    { label: "Norma Bondstrike 11,0g",          marque:"Norma", sansPlomb:false, v0:800,  poids:11.0 },
    { label: "Norma Ecostrike 11,0g ✓",         marque:"Norma", sansPlomb:true,  v0:800,  poids:11.0 },
  ],

  // ── .30-06 SPRINGFIELD ───────────────────────────────────────────────────
  "30-06": [
    { label: "Sako Gamehead 11,7g", marque:"Sako", sansPlomb:false, v0:810, poids:11.7 },
    { label: "Sako Super Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:810, poids:11.7 },
    { label: "Winchester Deer Season XP Copper 9,7g ✓", marque:"Winchester", sansPlomb:true, v0:860, poids:9.7 },
    { label: "Winchester Super-X Power-Point 9,7g", marque:"Winchester", sansPlomb:false, v0:890, poids:9.7 },
    { label: "Sako Arrowhead II 9,7g", marque:"Sako", sansPlomb:false, v0:870, poids:9.7 },
    { label: "Sako Powerhead Blade 10,5g ✓", marque:"Sako", sansPlomb:true, v0:860, poids:10.5 },
    { label: "Sako Gamehead 9,7g", marque:"Sako", sansPlomb:false, v0:870, poids:9.7 },
    { label: "Winchester Copper Impact 9,7g ✓", marque:"Winchester", sansPlomb:true, v0:880, poids:9.7 },
    { label: "Winchester Expedition Big Game 11,7g", marque:"Winchester", sansPlomb:false, v0:838, poids:11.7 },
    { label: "Hornady Outfitter GMX 9,7g ✓", marque:"Hornady", sansPlomb:true, v0:893, poids:9.7 },
    { label: "Hornady SST 9,7g", marque:"Hornady", sansPlomb:false, v0:890, poids:9.7 },
    { label: "Hornady American Whitetail 11,7g", marque:"Hornady", sansPlomb:false, v0:822, poids:11.7 },
    { label: "Lapua Naturalis 11,7g ✓", marque:"Lapua", sansPlomb:true, v0:860, poids:11.7 },
    { label: "Lapua Mega 11,7g", marque:"Lapua", sansPlomb:false, v0:845, poids:11.7 },
    { label: "Sako Hammerhead 14,3g", marque:"Sako", sansPlomb:false, v0:793, poids:14.3 },
    { label: "Sako Super Hammerhead 9,7g", marque:"Sako", sansPlomb:false, v0:884, poids:9.7 },
    { label: "Hornady Custom International InterLock 11,7g", marque:"Hornady", sansPlomb:false, v0:845, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 12,0g", marque:"Hornady", sansPlomb:false, v0:884, poids:12.0 },
    { label: "Winchester Power Max Bonded 11,7g", marque:"Winchester", sansPlomb:false, v0:793, poids:11.7 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:876, poids:9.7 },
    { label: "Winchester Ballistic Silvertip 9,7g", marque:"Winchester", sansPlomb:false, v0:900, poids:9.7 },
    { label: "Winchester Power Point 11,7g", marque:"Winchester", sansPlomb:false, v0:845, poids:11.7 },
    { label: "Norma Evostrike 9,0g ✓", marque:"Norma", sansPlomb:true, v0:920, poids:9.0 },
    { label: "Norma Vulkan 11,7g", marque:"Norma", sansPlomb:false, v0:800, poids:11.7 },
    { label: "Norma Whitetail 11,7g", marque:"Norma", sansPlomb:false, v0:800, poids:11.7 },
    { label: "RWS Driven Hunt 10,7g ✓",           marque:"RWS",   sansPlomb:true, v0:810,  poids:10.7 },
    { label: "RWS Driven Hunt SR 9,7g ✓",         marque:"RWS",   sansPlomb:true, v0:821,  poids:9.7  },
    { label: "RWS Evolution Green 9,0g ✓",      marque:"RWS",   sansPlomb:true,  v0:875,  poids:9.0  },
    { label: "RWS Evolution Green SR 9,0g ✓",   marque:"RWS",   sansPlomb:true,  v0:881,  poids:9.0  },
    { label: "RWS HIT 10,7g ✓",                 marque:"RWS",   sansPlomb:true,  v0:840,  poids:10.7 },
    { label: "RWS HIT SR 10,7g ✓",              marque:"RWS",   sansPlomb:true,  v0:840,  poids:10.7 },
    { label: "RWS Speed Tip Pro 10,7g",          marque:"RWS",   sansPlomb:false, v0:870,  poids:10.7 },
    { label: "RWS Speed Tip Pro SR 10,7g",       marque:"RWS",   sansPlomb:false, v0:870,  poids:10.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:810,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:820,  poids:11.7 },
    { label: "RWS UNI Classic 13,0g",            marque:"RWS",   sansPlomb:false, v0:770,  poids:13.0 },
    { label: "RWS ID Classic 9,7g",              marque:"RWS",   sansPlomb:false, v0:915,  poids:9.7  },
    { label: "RWS KS 10,7g",                     marque:"RWS",   sansPlomb:false, v0:860,  poids:10.7 },
    { label: "RWS KS 9,7g",                      marque:"RWS",   sansPlomb:false, v0:900,  poids:9.7  },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:855,  poids:10.7 },
    { label: "GECO Star 10,7g ✓",               marque:"GECO",  sansPlomb:true,  v0:840,  poids:10.7 },
    { label: "GECO Zero 8,8g ✓",                marque:"GECO",  sansPlomb:true,  v0:880,  poids:8.8  },
    { label: "GECO Plus 11,0g",                 marque:"GECO",  sansPlomb:false, v0:840,  poids:11.0 },
    { label: "GECO Express 10,7g",              marque:"GECO",  sansPlomb:false, v0:860,  poids:10.7 },
    { label: "GECO Softpoint 11,0g",            marque:"GECO",  sansPlomb:false, v0:820,  poids:11.0 },
    { label: "Norma Oryx 13,0g",               marque:"Norma", sansPlomb:false, v0:790,  poids:13.0 },
    { label: "Norma Tipstrike 11,7g",           marque:"Norma", sansPlomb:false, v0:830,  poids:11.7 },
    { label: "Norma Bondstrike 11,7g",          marque:"Norma", sansPlomb:false, v0:830,  poids:11.7 },
    { label: "Norma Ecostrike 11,7g ✓",         marque:"Norma", sansPlomb:true,  v0:830,  poids:11.7 },
  ],

  // ── .30R BLASER ──────────────────────────────────────────────────────────
  ".30R Blaser": [
    { label: "RWS Evolution Green 9,0g ✓",      marque:"RWS",   sansPlomb:true,  v0:933,  poids:9.0  },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:840,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:860,  poids:11.7 },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:870,  poids:10.7 },
    { label: "Norma Oryx 13,0g",               marque:"Norma", sansPlomb:false, v0:820,  poids:13.0 },
  ],

  // ── .300 WINCHESTER MAGNUM ────────────────────────────────────────────────
  ".300 Win Mag": [
    { label: "Lapua Mega 12,0g", marque:"Lapua", sansPlomb:false, v0:930, poids:12.0 },
    { label: "Lapua Naturalis 13,0g ✓", marque:"Lapua", sansPlomb:true, v0:930, poids:13.0 },
    { label: "Winchester Super-X Power-Point 9,7g", marque:"Winchester", sansPlomb:false, v0:975, poids:9.7 },
    { label: "Sako Arrowhead II 9,7g", marque:"Sako", sansPlomb:false, v0:960, poids:9.7 },
    { label: "Sako Powerhead Blade 11,0g ✓", marque:"Sako", sansPlomb:true, v0:940, poids:11.0 },
    { label: "Winchester Expedition Big Game 12,3g", marque:"Winchester", sansPlomb:false, v0:920, poids:12.3 },
    { label: "Winchester Deer Season XP 9,7g", marque:"Winchester", sansPlomb:false, v0:945, poids:9.7 },
    { label: "Hornady Outfitter GMX 11,0g ✓", marque:"Hornady", sansPlomb:true, v0:945, poids:11.0 },
    { label: "Hornady SST 10,7g", marque:"Hornady", sansPlomb:false, v0:960, poids:10.7 },
    { label: "Hornady American Whitetail 11,7g", marque:"Hornady", sansPlomb:false, v0:905, poids:11.7 },
    { label: "Lapua Naturalis 11,7g ✓", marque:"Lapua", sansPlomb:true, v0:990, poids:11.7 },
    { label: "Lapua Mega 11,7g", marque:"Lapua", sansPlomb:false, v0:985, poids:11.7 },
    { label: "Sako Hammerhead 14,3g", marque:"Sako", sansPlomb:false, v0:935, poids:14.3 },
    { label: "Sako Super Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:975, poids:11.7 },
    { label: "Hornady Precision Hunter ELD-X 12,0g", marque:"Hornady", sansPlomb:false, v0:985, poids:12.0 },
    { label: "Winchester Power Max Bonded 11,7g", marque:"Winchester", sansPlomb:false, v0:935, poids:11.7 },
    { label: "Winchester Ballistic Silvertip 11,7g", marque:"Winchester", sansPlomb:false, v0:985, poids:11.7 },
    { label: "Winchester Power Point 11,7g", marque:"Winchester", sansPlomb:false, v0:945, poids:11.7 },
    { label: "Norma Evostrike 9,0g ✓", marque:"Norma", sansPlomb:true, v0:1020, poids:9.0 },
    { label: "Norma Whitetail 9,7g", marque:"Norma", sansPlomb:false, v0:980, poids:9.7 },
    { label: "RWS Driven Hunt 10,7g ✓",           marque:"RWS",   sansPlomb:true, v0:924,  poids:10.7 },
    { label: "RWS Evolution Green 9,0g ✓",      marque:"RWS",   sansPlomb:true,  v0:1014, poids:9.0  },
    { label: "RWS HIT 10,7g ✓",                 marque:"RWS",   sansPlomb:true,  v0:950,  poids:10.7 },
    { label: "RWS HIT SR 10,7g ✓",              marque:"RWS",   sansPlomb:true,  v0:950,  poids:10.7 },
    { label: "RWS Speed Tip Pro 10,7g",          marque:"RWS",   sansPlomb:false, v0:978,  poids:10.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:900,  poids:11.9 },
    { label: "RWS UNI Classic 11,7g",            marque:"RWS",   sansPlomb:false, v0:910,  poids:11.7 },
    { label: "RWS KS 10,7g",                     marque:"RWS",   sansPlomb:false, v0:920,  poids:10.7 },
    { label: "RWS DK 10,7g",                     marque:"RWS",   sansPlomb:false, v0:940,  poids:10.7 },
    { label: "GECO Star 10,7g ✓",               marque:"GECO",  sansPlomb:true,  v0:950,  poids:10.7 },
    { label: "GECO Zero 8,8g ✓",                marque:"GECO",  sansPlomb:true,  v0:1000, poids:8.8  },
    { label: "GECO Plus 11,0g",                 marque:"GECO",  sansPlomb:false, v0:930,  poids:11.0 },
    { label: "GECO Express 10,7g",              marque:"GECO",  sansPlomb:false, v0:950,  poids:10.7 },
    { label: "GECO Softpoint 11,0g",            marque:"GECO",  sansPlomb:false, v0:910,  poids:11.0 },
    { label: "Norma Bondstrike 13,0g",          marque:"Norma", sansPlomb:false, v0:880,  poids:13.0 },
    { label: "Norma Oryx 13,0g",               marque:"Norma", sansPlomb:false, v0:880,  poids:13.0 },
    { label: "Norma Ecostrike 11,7g ✓",         marque:"Norma", sansPlomb:true,  v0:905,  poids:11.7 },
  ],

  // ── .300 WSM ─────────────────────────────────────────────────────────────
  ".300 WSM": [
    { label: "Hornady Precision Hunter ELD-X 12,0g", marque:"Hornady", sansPlomb:false, v0:905, poids:12.0 },
    { label: "Winchester Expedition Big Game 12,3g", marque:"Winchester", sansPlomb:false, v0:895, poids:12.3 },
    { label: "Winchester Ballistic Silvertip 11,7g", marque:"Winchester", sansPlomb:false, v0:920, poids:11.7 },
    { label: "Winchester Power Max Bonded 11,7g", marque:"Winchester", sansPlomb:false, v0:900, poids:11.7 },
    { label: "Winchester Power Point 11,7g", marque:"Winchester", sansPlomb:false, v0:905, poids:11.7 },
    { label: "RWS Evolution 11,9g",              marque:"RWS",   sansPlomb:false, v0:880,  poids:11.9 },
    { label: "Norma Bondstrike 13,0g",          marque:"Norma", sansPlomb:false, v0:860,  poids:13.0 },
    { label: "Norma Oryx 13,0g",               marque:"Norma", sansPlomb:false, v0:860,  poids:13.0 },
    { label: "Norma Ecostrike 11,7g ✓",         marque:"Norma", sansPlomb:true,  v0:880,  poids:11.7 },
  ],

  // ── .300 WEATHERBY MAGNUM ─────────────────────────────────────────────────
  ".300 Wby Mag": [
    { label: "Winchester Power Point 11,7g", marque:"Winchester", sansPlomb:false, v0:975, poids:11.7 },
    { label: "Norma Bondstrike 13,0g",          marque:"Norma", sansPlomb:false, v0:900,  poids:13.0 },
    { label: "Norma Oryx 13,0g",               marque:"Norma", sansPlomb:false, v0:900,  poids:13.0 },
  ],

  // ── .300 PRC ─────────────────────────────────────────────────────────────
  ".300 PRC": [
    { label: "Hornady Precision Hunter ELD-X 14,2g", marque:"Hornady", sansPlomb:false, v0:890, poids:14.2 },
    { label: "RWS HIT 11,7g ✓",                 marque:"RWS",   sansPlomb:true,  v0:940,  poids:11.7 },
    { label: "Norma Bondstrike 13,0g",          marque:"Norma", sansPlomb:false, v0:900,  poids:13.0 },
    { label: "Norma Ecostrike 11,7g ✓",         marque:"Norma", sansPlomb:true,  v0:925,  poids:11.7 },
  ],

  // ── 8×57 JS ──────────────────────────────────────────────────────────────
  "8x57 JS": [
    { label: "Winchester Ballistic Silvertip 11,7g", marque:"Winchester", sansPlomb:false, v0:760, poids:11.7 },
    { label: "Hornady Custom International InterLock 12,7g", marque:"Hornady", sansPlomb:false, v0:760, poids:12.7 },
    { label: "Lapua Naturalis 12,7g ✓", marque:"Lapua", sansPlomb:true, v0:745, poids:12.7 },
    { label: "Lapua Mega 12,7g", marque:"Lapua", sansPlomb:false, v0:745, poids:12.7 },
    { label: "Sako Super Hammerhead 11,7g", marque:"Sako", sansPlomb:false, v0:760, poids:11.7 },
    { label: "Sako Hammerhead 13,0g", marque:"Sako", sansPlomb:false, v0:745, poids:13.0 },
    { label: "Hornady Custom International InterLock 11,7g", marque:"Hornady", sansPlomb:false, v0:745, poids:11.7 },
    { label: "Hornady International ECX 11,7g ✓", marque:"Hornady", sansPlomb:true, v0:760, poids:11.7 },
    { label: "Winchester Power Point 12,7g", marque:"Winchester", sansPlomb:false, v0:745, poids:12.7 },
    { label: "Norma Evostrike 9,0g ✓", marque:"Norma", sansPlomb:true, v0:920, poids:9.0 },
    { label: "Norma Vulkan 12,7g", marque:"Norma", sansPlomb:false, v0:760, poids:12.7 },
    { label: "Norma Whitetail 12,7g", marque:"Norma", sansPlomb:false, v0:760, poids:12.7 },
    { label: "RWS Driven Hunt 10,4g ✓",           marque:"RWS",   sansPlomb:true, v0:783,  poids:10.4 },
    { label: "RWS Evolution Green 9,0g ✓",      marque:"RWS",   sansPlomb:true,  v0:920,  poids:9.0  },
    { label: "RWS HIT 10,4g ✓",                 marque:"RWS",   sansPlomb:true,  v0:830,  poids:10.4 },
    { label: "RWS HIT SR 10,4g ✓",              marque:"RWS",   sansPlomb:true,  v0:835,  poids:10.4 },
    { label: "RWS Speed Tip Pro 11,7g",          marque:"RWS",   sansPlomb:false, v0:770,  poids:11.7 },
    { label: "RWS Speed Tip Pro SR 11,7g",       marque:"RWS",   sansPlomb:false, v0:765,  poids:11.7 },
    { label: "RWS Evolution 13,0g",              marque:"RWS",   sansPlomb:false, v0:745,  poids:13.0 },
    { label: "RWS ID Classic 12,8g",             marque:"RWS",   sansPlomb:false, v0:775,  poids:12.8 },
    { label: "GECO Star 10,4g ✓",               marque:"GECO",  sansPlomb:true,  v0:820,  poids:10.4 },
    { label: "GECO Zero 9,0g ✓",                marque:"GECO",  sansPlomb:true,  v0:860,  poids:9.0  },
    { label: "GECO Plus 12,7g",                 marque:"GECO",  sansPlomb:false, v0:760,  poids:12.7 },
    { label: "GECO Express 11,7g",              marque:"GECO",  sansPlomb:false, v0:780,  poids:11.7 },
    { label: "GECO Softpoint 12,0g",            marque:"GECO",  sansPlomb:false, v0:760,  poids:12.0 },
    { label: "Norma Oryx 12,7g",               marque:"Norma", sansPlomb:false, v0:750,  poids:12.7 },
    { label: "Norma Tipstrike 12,7g",           marque:"Norma", sansPlomb:false, v0:760,  poids:12.7 },
    { label: "Norma Ecostrike 12,7g ✓",         marque:"Norma", sansPlomb:true,  v0:755,  poids:12.7 },
  ],

  // ── 8×57 JRS ─────────────────────────────────────────────────────────────
  "8x57 JRS": [
    { label: "Sako Gamehead 11,3g", marque:"Sako", sansPlomb:false, v0:775, poids:11.3 },
    { label: "Hornady Custom International InterLock 12,7g", marque:"Hornady", sansPlomb:false, v0:720, poids:12.7 },
    { label: "Sako Super Hammerhead 12,7g", marque:"Sako", sansPlomb:false, v0:720, poids:12.7 },
    { label: "Sako Hammerhead 13,0g", marque:"Sako", sansPlomb:false, v0:720, poids:13.0 },
    { label: "Winchester Power Point 12,7g", marque:"Winchester", sansPlomb:false, v0:720, poids:12.7 },
    { label: "Norma Tipstrike 11,7g", marque:"Norma", sansPlomb:false, v0:720, poids:11.7 },
    { label: "Norma Vulkan 12,7g", marque:"Norma", sansPlomb:false, v0:720, poids:12.7 },
    { label: "Norma Whitetail 12,7g", marque:"Norma", sansPlomb:false, v0:720, poids:12.7 },
    { label: "RWS Evolution Green 9,0g ✓",      marque:"RWS",   sansPlomb:true,  v0:865,  poids:9.0  },
    { label: "RWS HIT 10,4g ✓",                 marque:"RWS",   sansPlomb:true,  v0:805,  poids:10.4 },
    { label: "RWS Speed Tip Pro 11,7g",          marque:"RWS",   sansPlomb:false, v0:745,  poids:11.7 },
    { label: "RWS Evolution 13,0g",              marque:"RWS",   sansPlomb:false, v0:695,  poids:13.0 },
    { label: "RWS ID Classic 12,8g",             marque:"RWS",   sansPlomb:false, v0:750,  poids:12.8 },
    { label: "GECO Star 10,4g ✓",               marque:"GECO",  sansPlomb:true,  v0:800,  poids:10.4 },
    { label: "GECO Zero 9,0g ✓",                marque:"GECO",  sansPlomb:true,  v0:840,  poids:9.0  },
    { label: "GECO Plus 12,7g",                 marque:"GECO",  sansPlomb:false, v0:740,  poids:12.7 },
    { label: "GECO Express 11,7g",              marque:"GECO",  sansPlomb:false, v0:760,  poids:11.7 },
    { label: "GECO Softpoint 12,0g",            marque:"GECO",  sansPlomb:false, v0:740,  poids:12.0 },
    { label: "Norma Oryx 12,7g",               marque:"Norma", sansPlomb:false, v0:720,  poids:12.7 },
  ],

  // ── 8×68 S ───────────────────────────────────────────────────────────────
  "8x68S": [
    { label: "Norma Tipstrike 11,7g", marque:"Norma", sansPlomb:false, v0:900, poids:11.7 },
    { label: "RWS Driven Hunt 10,4g ✓",           marque:"RWS",   sansPlomb:true, v0:985,  poids:10.4 },
    { label: "RWS Evolution Green 9,0g ✓",      marque:"RWS",   sansPlomb:true,  v0:1019, poids:9.0  },
    { label: "RWS HIT 10,4g ✓",                 marque:"RWS",   sansPlomb:true,  v0:970,  poids:10.4 },
    { label: "RWS Speed Tip Pro 11,7g",          marque:"RWS",   sansPlomb:false, v0:930,  poids:11.7 },
    { label: "RWS Evolution 13,0g",              marque:"RWS",   sansPlomb:false, v0:895,  poids:13.0 },
    { label: "RWS KS 11,7g",                     marque:"RWS",   sansPlomb:false, v0:950,  poids:11.7 },
    { label: "Norma Oryx 14,2g",               marque:"Norma", sansPlomb:false, v0:870,  poids:14.2 },
  ],

  // ── .338 WINCHESTER MAGNUM ────────────────────────────────────────────────
  ".338 Win Mag": [
    { label: "Lapua Mega 16,2g", marque:"Lapua", sansPlomb:false, v0:790, poids:16.2 },
    { label: "Hornady Custom InterLock 14,9g", marque:"Hornady", sansPlomb:false, v0:800, poids:14.9 },
    { label: "Winchester Ballistic Silvertip 13,0g", marque:"Winchester", sansPlomb:false, v0:870, poids:13.0 },
    { label: "Winchester Power Max Bonded 14,9g", marque:"Winchester", sansPlomb:false, v0:795, poids:14.9 },
    { label: "Lapua Naturalis 15,0g ✓", marque:"Lapua", sansPlomb:true, v0:790, poids:15.0 },
    { label: "Hornady Precision Hunter ELD-X 14,9g", marque:"Hornady", sansPlomb:false, v0:800, poids:14.9 },
    { label: "Sako Hammerhead 16,2g", marque:"Sako", sansPlomb:false, v0:870, poids:16.2 },
    { label: "Winchester Power Point 16,2g", marque:"Winchester", sansPlomb:false, v0:870, poids:16.2 },
    { label: "RWS Speed Tip Pro 16,2g",          marque:"RWS",   sansPlomb:false, v0:860,  poids:16.2 },
    { label: "Norma Oryx 16,2g",               marque:"Norma", sansPlomb:false, v0:840,  poids:16.2 },
    { label: "Norma Bondstrike 16,2g",          marque:"Norma", sansPlomb:false, v0:845,  poids:16.2 },
    { label: "Norma Ecostrike 14,9g ✓",         marque:"Norma", sansPlomb:true,  v0:860,  poids:14.9 },
  ],
  ".338 Lapua Mag": [
    { label: "Lapua Naturalis 15,0g ✓", marque:"Lapua", sansPlomb:true, v0:880, poids:15.0 },
    { label: "Lapua Scenar OTM 16,2g", marque:"Lapua", sansPlomb:false, v0:900, poids:16.2 },
    { label: "Lapua Mega 16,2g", marque:"Lapua", sansPlomb:false, v0:880, poids:16.2 },
    { label: "Sako Powerhead Blade 15,0g ✓", marque:"Sako", sansPlomb:true, v0:880, poids:15.0 },
    { label: "Hornady Precision Hunter ELD-X 18,5g", marque:"Hornady", sansPlomb:false, v0:790, poids:18.5 },
  ],

  // ── 9,3×62 ───────────────────────────────────────────────────────────────
  "9.3x62": [
    { label: "Sako Powerhead Blade 14,0g ✓", marque:"Sako", sansPlomb:true, v0:690, poids:14.0 },
    { label: "RWS Speed Tip Pro 16,5g", marque:"RWS", sansPlomb:false, v0:700, poids:16.5 },
    { label: "Lapua Mega 16,5g", marque:"Lapua", sansPlomb:false, v0:700, poids:16.5 },
    { label: "Sako Super Hammerhead 14,2g", marque:"Sako", sansPlomb:false, v0:670, poids:14.2 },
    { label: "Hornady DGS 18,5g", marque:"Hornady", sansPlomb:false, v0:720, poids:18.5 },
    { label: "Lapua Naturalis 16,0g ✓", marque:"Lapua", sansPlomb:true, v0:720, poids:16.0 },
    { label: "Lapua Mega 18,5g", marque:"Lapua", sansPlomb:false, v0:670, poids:18.5 },
    { label: "Sako Hammerhead 18,5g", marque:"Sako", sansPlomb:false, v0:675, poids:18.5 },
    { label: "Hornady Custom International InterLock 18,5g", marque:"Hornady", sansPlomb:false, v0:670, poids:18.5 },
    { label: "Winchester Power Point 18,5g", marque:"Winchester", sansPlomb:false, v0:680, poids:18.5 },
    { label: "Norma Tipstrike 16,5g", marque:"Norma", sansPlomb:false, v0:720, poids:16.5 },
    { label: "Norma Evostrike 11,9g ✓", marque:"Norma", sansPlomb:true, v0:900, poids:11.9 },
    { label: "Norma Vulkan 18,5g", marque:"Norma", sansPlomb:false, v0:670, poids:18.5 },
    { label: "Norma Whitetail 18,5g", marque:"Norma", sansPlomb:false, v0:670, poids:18.5 },
    { label: "RWS Driven Hunt 16,2g ✓",           marque:"RWS",   sansPlomb:true, v0:690,  poids:16.2 },
    { label: "RWS Driven Hunt SR 16,2g ✓",        marque:"RWS",   sansPlomb:true, v0:704,  poids:16.2 },
    { label: "RWS Evolution Green 11,9g ✓",     marque:"RWS",   sansPlomb:true,  v0:900,  poids:11.9 },
    { label: "RWS HIT 16,2g ✓",                 marque:"RWS",   sansPlomb:true,  v0:765,  poids:16.2 },
    { label: "RWS HIT SR 16,2g ✓",              marque:"RWS",   sansPlomb:true,  v0:770,  poids:16.2 },
    { label: "RWS Evolution 18,8g",              marque:"RWS",   sansPlomb:false, v0:690,  poids:18.8 },
    { label: "RWS UNI Classic 19,0g",            marque:"RWS",   sansPlomb:false, v0:690,  poids:19.0 },
    { label: "RWS KS 16,0g",                     marque:"RWS",   sansPlomb:false, v0:750,  poids:16.0 },
    { label: "RWS DK 14,6g",                     marque:"RWS",   sansPlomb:false, v0:805,  poids:14.6 },
    { label: "GECO Star 16,2g ✓",               marque:"GECO",  sansPlomb:true,  v0:740,  poids:16.2 },
    { label: "GECO Zero 12,2g ✓",               marque:"GECO",  sansPlomb:true,  v0:790,  poids:12.2 },
    { label: "GECO Plus 16,5g",                 marque:"GECO",  sansPlomb:false, v0:680,  poids:16.5 },
    { label: "GECO Express 16,5g",              marque:"GECO",  sansPlomb:false, v0:695,  poids:16.5 },
    { label: "GECO Softpoint 16,5g",            marque:"GECO",  sansPlomb:false, v0:680,  poids:16.5 },
    { label: "Norma Oryx 18,5g",               marque:"Norma", sansPlomb:false, v0:670,  poids:18.5 },
    { label: "Norma Ecostrike 16,0g ✓",         marque:"Norma", sansPlomb:true,  v0:740,  poids:16.0 },
  ],

  // ── 9,3×74R ──────────────────────────────────────────────────────────────
  "9.3x74R": [
    { label: "Lapua Naturalis 16,0g ✓", marque:"Lapua", sansPlomb:true, v0:655, poids:16.0 },
    { label: "Lapua Mega 18,5g", marque:"Lapua", sansPlomb:false, v0:655, poids:18.5 },
    { label: "Sako Hammerhead 18,5g", marque:"Sako", sansPlomb:false, v0:655, poids:18.5 },
    { label: "Hornady Custom International InterLock 18,5g", marque:"Hornady", sansPlomb:false, v0:655, poids:18.5 },
    { label: "Winchester Power Point 18,5g", marque:"Winchester", sansPlomb:false, v0:660, poids:18.5 },
    { label: "Norma Tipstrike 16,5g", marque:"Norma", sansPlomb:false, v0:700, poids:16.5 },
    { label: "Norma Vulkan 18,5g", marque:"Norma", sansPlomb:false, v0:655, poids:18.5 },
    { label: "RWS Evolution Green 11,9g ✓",     marque:"RWS",   sansPlomb:true,  v0:885,  poids:11.9 },
    { label: "RWS HIT 16,2g ✓",                 marque:"RWS",   sansPlomb:true,  v0:710,  poids:16.2 },
    { label: "RWS Evolution 18,8g",              marque:"RWS",   sansPlomb:false, v0:665,  poids:18.8 },
    { label: "RWS UNI Classic 19,0g",            marque:"RWS",   sansPlomb:false, v0:675,  poids:19.0 },
    { label: "RWS KS 16,0g",                     marque:"RWS",   sansPlomb:false, v0:740,  poids:16.0 },
    { label: "GECO Zero 11,9g ✓",               marque:"GECO",  sansPlomb:true,  v0:750,  poids:11.9 },
    { label: "GECO Plus 16,5g",                 marque:"GECO",  sansPlomb:false, v0:660,  poids:16.5 },
    { label: "GECO Softpoint 16,5g",            marque:"GECO",  sansPlomb:false, v0:655,  poids:16.5 },
    { label: "Norma Oryx 18,5g",               marque:"Norma", sansPlomb:false, v0:655,  poids:18.5 },
    { label: "Norma Ecostrike 16,0g ✓",         marque:"Norma", sansPlomb:true,  v0:720,  poids:16.0 },
  ],

  // ── 9,3×64 BRENNEKE ──────────────────────────────────────────────────────
  "9.3x64": [
    { label: "RWS Evolution Green 11,9g ✓",     marque:"RWS",   sansPlomb:true,  v0:970,  poids:11.9 },
    { label: "RWS UNI Classic 19,0g",            marque:"RWS",   sansPlomb:false, v0:765,  poids:19.0 },
    { label: "Norma Oryx 18,5g",               marque:"Norma", sansPlomb:false, v0:760,  poids:18.5 },
  ],

  // ── LEVIER DE SOUS-GARDE ─────────────────────────────────────────────────
  ".30-30 Win": [
    { label: "Hornady InterLock 9,7g", marque:"Hornady", sansPlomb:false, v0:720, poids:9.7 },
    { label: "Norma Whitetail 9,7g", marque:"Norma", sansPlomb:false, v0:720, poids:9.7 },
    { label: "Hornady LEVERevolution FTX 10,4g", marque:"Hornady", sansPlomb:false, v0:724, poids:10.4 },
    { label: "Winchester Power Point 9,7g", marque:"Winchester", sansPlomb:false, v0:720, poids:9.7 },
    { label: "Winchester Power Point 11,0g", marque:"Winchester", sansPlomb:false, v0:670, poids:11.0 },
    { label: "Norma Oryx 11,0g",               marque:"Norma", sansPlomb:false, v0:710,  poids:11.0 },
  ],
  ".444 Marlin": [
    { label: "Hornady LEVERevolution FTX 17,0g", marque:"Hornady", sansPlomb:false, v0:671, poids:17.0 },
    { label: "Norma Oryx 19,4g",               marque:"Norma", sansPlomb:false, v0:625,  poids:19.4 },
  ],
  ".45-70 Govt": [
    { label: "Norma Whitetail 19,4g", marque:"Norma", sansPlomb:false, v0:405, poids:19.4 },
    { label: "Hornady LEVERevolution FTX 16,2g", marque:"Hornady", sansPlomb:false, v0:610, poids:16.2 },
    { label: "Winchester Super-X Power-Point 19,4g", marque:"Winchester", sansPlomb:false, v0:405, poids:19.4 },
    { label: "Norma Oryx 19,4g",               marque:"Norma", sansPlomb:false, v0:550,  poids:19.4 },
  ],
};

// ─── TARGET GENERATOR ────────────────────────────────────────────────────────
function TargetSVG({ calibre, droM, impactX, impactY }) {
  const rings = [100, 80, 60, 40, 20]; // scores
  const radii = [110, 90, 70, 50, 30, 12];
  const ringColors = ["#1a1e0f", "#1e2210", "#222610", "#262a10", "#2a2e10", "#8fb020"];
  const ringTextColors = ["#4a5a20", "#4a5a20", "#5a6a25", "#6a7a28", "#8a9a30", "#0d0f0a"];

  const cx = 150, cy = 150;
  const px = cx + (impactX || 0) * 2;
  const py = cy - (impactY || 0) * 2;

  return (
    <svg viewBox="0 0 300 300" style={{ width: "100%", maxWidth: 340, display: "block", margin: "0 auto" }}>
      {/* Background */}
      <rect width="300" height="300" fill="#0d0f0a" rx="4" />
      
      {/* Crosshair lines */}
      <line x1="0" y1="150" x2="300" y2="150" stroke="#2a3015" strokeWidth="0.5" />
      <line x1="150" y1="0" x2="150" y2="300" stroke="#2a3015" strokeWidth="0.5" />

      {/* Rings */}
      {radii.map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r}
          fill={ringColors[i] || "transparent"}
          stroke={i === 0 ? "#3a4520" : "#2a3015"}
          strokeWidth={i === 0 ? 1 : 0.5}
        />
      ))}

      {/* Ring numbers */}
      {rings.map((score, i) => (
        <text key={i} x={cx + radii[i] - 14} y={cy + 4}
          fill={ringTextColors[i]} fontSize="8"
          fontFamily="'IBM Plex Mono', monospace" textAnchor="middle">
          {score}
        </text>
      ))}

      {/* Cardinal ticks */}
      {[0, 90, 180, 270].map(angle => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line key={angle}
            x1={cx + Math.cos(rad) * 112} y1={cy + Math.sin(rad) * 112}
            x2={cx + Math.cos(rad) * 125} y2={cy + Math.sin(rad) * 125}
            stroke="#4a5a20" strokeWidth="1" />
        );
      })}

      {/* Rotating reticle decoration */}
      <g style={{ transformOrigin: "150px 150px", animation: "reticleRotate 20s linear infinite" }}>
        {[45, 135, 225, 315].map(angle => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line key={angle}
              x1={cx + Math.cos(rad) * 115} y1={cy + Math.sin(rad) * 115}
              x2={cx + Math.cos(rad) * 125} y2={cy + Math.sin(rad) * 125}
              stroke="#3a4a18" strokeWidth="0.8" />
          );
        })}
      </g>

      {/* DRO label */}
      <text x="150" y="20" fill="#4a5a20" fontSize="9" textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace">
        DRO {droM}m — {calibre}
      </text>

      {/* Distance scale */}
      <line x1="50" y1="285" x2="250" y2="285" stroke="#3a4520" strokeWidth="0.8" />
      <text x="150" y="280" fill="#3a4520" fontSize="7" textAnchor="middle"
        fontFamily="'IBM Plex Mono', monospace">10 cm</text>
      <line x1="50" y1="282" x2="50" y2="288" stroke="#3a4520" strokeWidth="0.8" />
      <line x1="250" y1="282" x2="250" y2="288" stroke="#3a4520" strokeWidth="0.8" />

      {/* Aim point indicator */}
      {(impactX !== undefined && impactY !== undefined) && (
        <g>
          <circle cx={px} cy={py} r="6" fill="none" stroke="#c0392b" strokeWidth="1.5" />
          <line x1={px - 10} y1={py} x2={px + 10} y2={py} stroke="#c0392b" strokeWidth="1" />
          <line x1={px} y1={py - 10} x2={px} y2={py + 10} stroke="#c0392b" strokeWidth="1" />
          <circle cx={px} cy={py} r="2" fill="#c0392b" />
        </g>
      )}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r="2.5" fill="#8fb020" style={{ animation: "crosshair 2s ease-in-out infinite" }} />
    </svg>
  );
}

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

  // Cible state
  const [calibre, setCalib] = useState(".308 Win");
  const [munition, setMunition] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [cibleData, setCibleData] = useState(null);
  const [impactX, setImpactX] = useState(0);
  const [impactY, setImpactY] = useState(0);
  const [printReady, setPrintReady] = useState(false);

  // Cible personnalisée DRO state
  const [customDist, setCustomDist] = useState(100);
  const [customDRO, setCustomDRO] = useState(100);
  const [customMun, setCustomMun] = useState("");
  const [customResult, setCustomResult] = useState(null);
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [printModal, setPrintModal] = useState(false);
  const [printFormat, setPrintFormat] = useState("A4");

  // Historique des réglages (Premium only — localStorage)
  const HISTO_KEY = "chassia_reglages_histo";
  const getHistorique = () => {
    try { return JSON.parse(localStorage.getItem(HISTO_KEY) || "[]"); } catch { return []; }
  };
  const [showHistorique, setShowHistorique] = useState(false);
  const [historique, setHistorique] = useState(getHistorique());
  const [saveModal, setSaveModal] = useState(false);
  const [pendingEntry, setPendingEntry] = useState(null);

  const proposerSauvegarde = (result) => {
    if (!isPremium) return;
    setPendingEntry({
      id: Date.now(),
      date: new Date().toLocaleDateString("fr-BE"),
      calibre,
      munition: munition || "—",
      distTir: customDist,
      dro: customDRO,
      resume: result.slice(0, 200),
    });
    setSaveModal(true);
  };

  const confirmerSauvegarde = () => {
    if (!pendingEntry) return;
    const updated = [pendingEntry, ...getHistorique()].slice(0, 20);
    try { localStorage.setItem(HISTO_KEY, JSON.stringify(updated)); } catch {}
    setHistorique(updated);
    setSaveModal(false);
    setPendingEntry(null);
  };

  // Calibre conseil state
  const [gibierC, setGibierC] = useState("");
  const [gibierCMulti, setGibierCMulti] = useState([]); // Premium multi-select
  const [typeChasse, setTypeChasse] = useState("");
  const [distC, setDistC] = useState("");
  const [loadingC, setLoadingC] = useState(false);
  const [conseilCalib, setConseilCalib] = useState("");

  // Munition conseil state
  const [gibierM, setGibierM] = useState("");
  const [gibierMMulti, setGibierMMulti] = useState([]); // Premium multi-select
  const [munMode, setMunMode] = useState("carabine"); // "carabine" ou "fusil"
  const [calibreFusil, setCaliFusil] = useState("");
  const [calibreM, setCalibreM] = useState("");
  const [typeM, setTypeM] = useState("");
  const [loadingM, setLoadingM] = useState(false);
  const [conseilMun, setConseilMun] = useState("");

  const T = LANGS[lang] || LANGS.fr;
  const calibreObj = CALIBRES.find(c => c.value === calibre) || CALIBRES[6];
  const munList = MUNITIONS_DATA[calibre] || [];

  async function genererCible() {
    setLoading1(true); setCibleData(null); setPrintReady(false);
    const munLabel = munition ? ` avec la munition ${munition}` : "";
    const prompt = `Génère les données de réglage pour une carabine ${calibre}${munLabel} utilisée en Belgique.
    Donne-moi :
    1. La DRO recommandée (distance de réglage zéro) en mètres pour ce calibre en contexte belge (forêt, plaine, battue)
    2. L'impact au point de visée à 50m, 100m et 200m (en cm, +haut/-bas)
    3. Un conseil pratique sur la technique de réglage sur cible
    4. Les conditions idéales pour le réglage (vent, lumière)
    Structure ta réponse avec des ### titres.`;
    const resp = await askClaude(prompt, T.system);
    setCibleData(resp);
    setLoading1(false); setPrintReady(true);
  }

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
    if (gibierCMulti.length === 0 && !gibierC) return;
    setLoadingC(true); setConseilCalib("");
    const gibierCible = gibierCMulti.length > 0 ? gibierCMulti.join(", ") : gibierC;
    const multiNote = gibierCMulti.length > 1 ? ` Calibre polyvalent pour ${gibierCMulti.length} gibiers.` : "";
    const prompt = `Je chasse en Belgique. Conseille-moi sur le meilleur calibre de carabine pour chasser ${gibierCible}${typeChasse ? ` en ${typeChasse}` : ""}${distC ? ` à des distances typiques de ${distC}m` : ""}.${multiNote}
    Donne 2-3 calibres recommandés avec leurs avantages/inconvénients, et un conseil sur le choix selon le profil du chasseur belge.`;
    const resp = await askClaude(prompt, T.system);
    setConseilCalib(resp); setLoadingC(false);
  }

  async function conseillerMunition() {
    if ((!gibierM && gibierMMulti.length === 0) || !calibreM) return;
    setLoadingM(true); setConseilMun("");
    const listeMun = (MUNITIONS_DATA[calibreM] || []).map(m => m.label).join(", ");
    const gibierMCible = gibierMMulti.length > 0 ? gibierMMulti.join(", ") : gibierM;
                                const prompt = `Je chasse en Belgique. Quelles munitions recommandes-tu pour chasser ${gibierMCible} avec un ${calibreM}${typeM ? ` en ${typeM}` : ""}?
    Voici les munitions disponibles pour ce calibre (RWS, Norma et GECO uniquement) : ${listeMun}.
    Recommande 3 à 5 munitions parmi cette liste uniquement, avec pour chacune : le type d'ogive, le poids, l'usage idéal et pourquoi elle est adaptée à ce gibier en Belgique.
    Indique clairement lesquelles sont sans plomb (marquées ✓). Rappelle la réglementation belge sur le plomb en zones humides si pertinent.`;
    const resp = await askClaude(prompt, T.system);
    setConseilMun(resp); setLoadingM(false);
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
      setQuestionsUsed(getQuestionsUsed() + 1);
    }

    const resp = await askClaude(q, T.system, apiHistory, isPremium);
    setChatHistory([...newHistory, { role: "assistant", content: resp }]);
    setLoadingQ(false);
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
              <p style={{ color: COLORS.textMuted, fontStyle: "italic", marginBottom: 20, fontSize: "1.05rem" }}>
                {T.cibleIntro}
              </p>

              {/* Formulaire unique */}
              <div style={card}>

                {/* Ligne 1 : Calibre + Munition */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={fieldLabel}>{T.calibreLabel}</label>
                    <select value={calibre} onChange={e => { setCalib(e.target.value); setMunition(""); setCibleData(null); setCustomResult(null); setPrintReady(false); }}>
                      {CALIBRES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={fieldLabel}>{T.munitionLabel}</label>
                    <select value={munition} onChange={e => setMunition(e.target.value)}>
                      <option value="">{T.munitionPH}</option>
                      {["RWS","Norma","GECO","Winchester","Hornady","Sako","Lapua"].map(marque => (
                        munList.filter(m => m.marque === marque).length > 0 ? [
                          <option key={marque+"-sep"} disabled>── {marque} ──</option>,
                          ...munList.filter(m => m.marque === marque).map(m =>
                            <option key={m.label} value={m.label}>{m.label}</option>)
                        ] : null
                      ))}
                    </select>
                  </div>
                </div>

                {/* Ligne 2 : Distance de tir + DRO */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={fieldLabel}>{T.distLabel}</label>
                    <select value={customDist} onChange={e => setCustomDist(+e.target.value)}>
                      {[25, 50, 75, 100, 125, 150, 200, 250, 300].map(d =>
                        <option key={d} value={d}>{d} m</option>)}
                    </select>
                    <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textMuted, marginTop: 4 }}>
                      {T.distNote}
                    </p>
                  </div>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <label style={{ ...fieldLabel, marginBottom:0 }}>{T.droLabel}</label>
                      {isPremium && (
                        <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.accent, background: COLORS.accentGlow, border:`1px solid ${COLORS.accent}`, borderRadius:3, padding:"1px 6px" }}>★ PREMIUM</span>
                      )}
                    </div>
                    <select value={customDRO} onChange={e => setCustomDRO(+e.target.value)}>
                      {isPremium
                        ? Array.from({length: 30}, (_, i) => (i + 1) * 10).map(d =>
                            <option key={d} value={d}>{d} m{d === calibreObj.dro ? " ★ recommandée" : ""}</option>)
                        : (calibreObj.droOptions || [50, 75, 100, 150, 200]).map(d =>
                            <option key={d} value={d}>{d} m{d === calibreObj.dro ? " ✓ recommandée" : ""}</option>)
                      }
                    </select>
                    <p style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textMuted, marginTop: 4 }}>
                      {isPremium
                        ? <span>Choix libre de 10m à 300m · Recommandée : <span style={{color:COLORS.accent}}>{calibreObj.dro}m</span></span>
                        : <span>{T.droNotePrefix} <span style={{color:COLORS.accent}}>{calibreObj.dro}m</span></span>
                      }
                    </p>
                    {!isPremium && (
                      <button onClick={() => setIsPremium(true)}
                        style={{
                          marginTop: 8, width:"100%",
                          background: COLORS.accentGlow,
                          border: `1px solid ${COLORS.accent}`,
                          borderRadius: 5, padding: "7px 10px",
                          cursor: "pointer", textAlign:"left",
                          display:"flex", alignItems:"center", gap:8,
                        }}>
                        <span style={{ fontSize:14 }}>★</span>
                        <div>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.accent, fontWeight:700 }}>
                            Passer Premium — DRO libre de 10 à 300m
                          </div>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted, marginTop:1 }}>
                            4,99€/mois · 49€/an — Activer (démo)
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Bandeau info */}
                <div style={{ background: COLORS.bgInput, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "10px 16px", marginBottom: 16, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11 }}>
                    <span style={{ color: COLORS.textMuted }}>{T.tirBadge} </span>
                    <span style={{ color: COLORS.accent }}>{customDist}m</span>
                    <span style={{ color: COLORS.textMuted }}> {T.droBadge} </span>
                    <span style={{ color: COLORS.accent }}>{customDRO}m</span>
                  </div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 6, flexWrap:"wrap" }}>
                    {["RWS","Norma","GECO","Winchester","Hornady","Sako","Lapua"].map(marque => {
                      const n = munList.filter(m => m.marque === marque).length;
                      return n > 0 ? (
                        <span key={marque} style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, background: COLORS.border, color: COLORS.accent, borderRadius:3, padding:"2px 7px" }}>
                          {marque} {n}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                <button style={btnPrimary} onClick={calculerCibleCustom} disabled={loadingCustom || loading1}>
                  {loadingCustom || loading1 ? T.btnGenerating : T.btnGenerer}
                </button>
              </div>

              {/* Loader */}
              {(loadingCustom || loading1) && <Loader />}

              {/* Résultat */}
              {(customResult || cibleData) && (
                <div style={{ ...card, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }} className="fade-in">
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: COLORS.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {T.cibleTitle} — {calibre} — {T.tirBadge} {customDist}m — {T.droBadge} {customDRO}m
                    </div>
                    <TargetSVG calibre={calibre} droM={customDRO} impactX={impactX} impactY={impactY} />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                      <div>
                        <label style={fieldLabel}>{T.sliderH}</label>
                        <input type="range" min="-40" max="40" value={impactX} onChange={e => setImpactX(+e.target.value)}
                          style={{ width: "100%", accentColor: COLORS.accent }} />
                        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: COLORS.accent, textAlign: "center" }}>{impactX > 0 ? "+" : ""}{impactX} cm</div>
                      </div>
                      <div>
                        <label style={fieldLabel}>{T.sliderV}</label>
                        <input type="range" min="-40" max="40" value={impactY} onChange={e => setImpactY(+e.target.value)}
                          style={{ width: "100%", accentColor: COLORS.accent }} />
                        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: COLORS.accent, textAlign: "center" }}>{impactY > 0 ? "+" : ""}{impactY} cm</div>
                      </div>
                    </div>
                    <button onClick={() => setPrintModal(true)}
                      style={{ ...btnPrimary, background: "transparent", color: COLORS.accent, border: `1px solid ${COLORS.accent}`, marginTop: 12, width: "100%", fontSize: 11, padding: "8px" }}>
                      {T.btnImprimer}
                    </button>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: COLORS.textMuted, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {T.iaTitle}
                    </div>
                    <ProseResponse text={customResult || cibleData} />
                  </div>
                </div>
              )}

              {/* Placeholder vide */}
              {!customResult && !cibleData && !loadingCustom && !loading1 && (
                <div style={{ ...card, borderStyle: "dashed", textAlign: "center" }}>
                  <p style={{ color: COLORS.textDim, fontStyle: "italic", fontSize: "0.95rem" }}>
                    {T.ciblePH}
                  </p>
                </div>
              )}

              {/* ── HISTORIQUE DES RÉGLAGES (Premium) ── */}
              {isPremium && (
                <div style={{ ...card, border: `1px solid ${showHistorique ? COLORS.accent : COLORS.border}`, marginTop: 8 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: showHistorique ? COLORS.accent : COLORS.textMuted, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                      ★ Historique des réglages
                      {historique.length > 0 && (
                        <span style={{ marginLeft:8, background: COLORS.accentGlow, border:`1px solid ${COLORS.accent}`, borderRadius:10, padding:"1px 7px", fontSize:9 }}>
                          {historique.length}
                        </span>
                      )}
                    </div>
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      {historique.length > 0 && showHistorique && (
                        <button onClick={() => { localStorage.removeItem(HISTO_KEY); setHistorique([]); }}
                          style={{ background:"transparent", border:"none", color: COLORS.textDim, fontSize:10, fontFamily:"'IBM Plex Mono',monospace", cursor:"pointer" }}>
                          Effacer
                        </button>
                      )}
                      <button onClick={() => setShowHistorique(!showHistorique)}
                        style={{ background: showHistorique ? COLORS.accentGlow : "transparent", border:`1px solid ${showHistorique ? COLORS.accent : COLORS.border}`, borderRadius:3, color: showHistorique ? COLORS.accent : COLORS.textMuted, padding:"4px 12px", fontSize:11, fontFamily:"'IBM Plex Mono',monospace", cursor:"pointer" }}>
                        {showHistorique ? "Fermer" : "Voir"}
                      </button>
                    </div>
                  </div>

                  {showHistorique && (
                    <div className="fade-in" style={{ marginTop:14 }}>
                      {historique.length === 0 ? (
                        <p style={{ color: COLORS.textDim, fontStyle:"italic", fontSize:"0.9rem", textAlign:"center" }}>
                          Aucun réglage sauvegardé. Lance une génération pour enregistrer automatiquement.
                        </p>
                      ) : (
                        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                          {historique.map(entry => (
                            <div key={entry.id}
                              style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.border}`, borderRadius:6, padding:"10px 14px", cursor:"pointer" }}
                              onClick={() => {
                                setCalib(entry.calibre);
                                setMunition(entry.munition === "—" ? "" : entry.munition);
                                setCustomDist(entry.distTir);
                                setCustomDRO(entry.dro);
                                setShowHistorique(false);
                              }}>
                              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.accent, fontWeight:600 }}>
                                  {entry.calibre}
                                </span>
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textDim }}>
                                  {entry.date}
                                </span>
                              </div>
                              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, marginBottom:4 }}>
                                {entry.munition !== "—" && <span>{entry.munition} · </span>}
                                Tir à {entry.distTir}m → DRO {entry.dro}m
                              </div>
                              <div style={{ fontSize:"0.8rem", color: COLORS.textDim, fontStyle:"italic", overflow:"hidden", maxHeight:36 }}>
                                {entry.resume}…
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Upsell historique pour les non-premium */}
              {!isPremium && (
                <div style={{ ...card, borderStyle:"dashed", display:"flex", alignItems:"center", gap:12, marginTop:8 }}>
                  <span style={{ fontSize:20 }}>📋</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>
                      PREMIUM — Historique des réglages
                    </div>
                    <div style={{ fontSize:"0.85rem", color: COLORS.textDim, marginTop:2 }}>
                      Sauvegardez jusqu'à 20 réglages et rechargez-les en un clic.
                    </div>
                  </div>
                  <button onClick={() => setIsPremium(true)}
                    style={{ ...btnPrimary, padding:"6px 12px", fontSize:11, flexShrink:0 }}>
                    ★ Premium
                  </button>
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
                          <optgroup label="🦌 Grand gibier">
                            {["Cerf élaphe","Chevreuil","Sanglier","Daim","Mouflon"].map(g =>
                              <option key={g} value={g} disabled={gibierCMulti.includes(g)}>{gibierCMulti.includes(g)?"✓ ":""}{g}</option>)}
                          </optgroup>
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
                    <select value={typeChasse} onChange={e => setTypeChasse(e.target.value)}>
                      <option value="">{T.typePH}</option>
                      {T.typeList.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={fieldLabel}>{T.distTirLabel}</label>
                  <select value={distC} onChange={e => setDistC(e.target.value)}>
                    <option value="">{T.distTirPH}</option>
                    {T.distTirList.map(d => <option key={d} value={d}>{d} m</option>)}
                  </select>
                </div>
              </div>

              {/* Recommandations directes calibre */}
              {(gibierCMulti.length > 0 || gibierC) && (() => {
                const gibiers = gibierCMulti.length > 0 ? gibierCMulti : [gibierC];
                const isBattue = typeChasse === "Battue" || typeChasse === "Drijfjacht" || typeChasse === "Drückjagd" || typeChasse === "Driven hunt";
                const isLong = distC && parseInt(distC) > 150;

                // Grand gibier (cerf, sanglier, daim, mouflon)
                const isGrand = gibiers.some(g => ["Cerf élaphe","Sanglier","Daim","Mouflon","Red deer","Wild boar","Fallow deer","Mouflon","Rothirsch","Wildschwein","Damhirsch","Edelhert","Wild zwijn"].includes(g));
                // Moyen gibier (chevreuil)
                const isMoyen = gibiers.some(g => ["Chevreuil","Roe deer","Reh","Ree"].includes(g));
                // Petit gibier + gibier d'eau
                const isPetit = gibiers.some(g => ["Lièvre brun","Faisan de chasse","Perdrix grise","Bécasse des bois","Lapin de garenne","Pigeon ramier","Renard roux","Bernache du Canada","Canard colvert","Foulque macroule","Brown hare","Pheasant","Grey partridge","Woodcock","Wild rabbit","Wood pigeon","Red fox","Canada goose","Mallard","Coot","Feldhase","Fasan","Rebhuhn","Haas","Fazant","Patrijs","Vos"].includes(g));

                // Recommendation logic
                let recs = [];
                if (isGrand && isBattue) {
                  recs = [
                    { cal:"9,3×62", note:"Le calibre de battue par excellence en Belgique — puissance d'arrêt maximale sur sanglier et cerf" },
                    { cal:"8×57 JS", note:"Classique du grand gibier en forêt — excellent compromis puissance/recul pour la battue" },
                    { cal:".30-06 Springfield", note:"Polyvalent et universel — munitions disponibles partout, idéal pour débuter en battue" },
                  ];
                } else if (isGrand && isLong) {
                  recs = [
                    { cal:"9,3×62", note:"Suffisamment puissant à longue distance sur grand gibier avec une bonne ogive bonded" },
                    { cal:".300 Win Mag", note:"Plat, puissant, précis — idéal pour les tirs à plus de 200m sur cerf ou daim" },
                    { cal:"7mm Rem Mag", note:"Trajectoire ultra-plate et énergie élevée — excellent pour l'affût longue distance" },
                  ];
                } else if (isGrand) {
                  recs = [
                    { cal:"9,3×62", note:"Le standard belge pour le grand gibier — puissance et versatilité" },
                    { cal:".308 Winchester", note:"Précis, polyvalent, très répandu — munitions disponibles partout en Belgique" },
                    { cal:".30-06 Springfield", note:"L'un des calibres les plus complets — efficace de 50m à 300m sur cerf et sanglier" },
                  ];
                } else if (isMoyen && isLong) {
                  recs = [
                    { cal:"6,5 Creedmoor", note:"Balistique exceptionnelle à longue portée — le meilleur choix actuel pour l'affût chevreuil" },
                    { cal:"6,5×55 SE", note:"Le classique nordique — précis, doux au tir, idéal à l'affût" },
                    { cal:".270 Winchester", note:"Trajectoire très plate — excellent pour les tirs ouverts à grande distance" },
                  ];
                } else if (isMoyen) {
                  recs = [
                    { cal:"7×64", note:"Le calibre de chasse par excellence en Belgique — polyvalent chevreuil, cerf et daim" },
                    { cal:"6,5×55 SE", note:"Doux, précis, efficace — idéal pour le chasseur qui tire peu souvent" },
                    { cal:".308 Winchester", note:"Fiable et universel — parfait pour débuter ou chasser en toutes conditions" },
                  ];
                } else if (isPetit) {
                  recs = [
                    { cal:".243 Winchester", note:"Excellent pour le petit gibier et le renard — précis et peu destructeur" },
                    { cal:"6,5 Creedmoor", note:"Polyvalent si tu chasses aussi le chevreuil — évite de changer de calibre" },
                    { cal:".222 Remington", note:"Le classique du petit gibier — précis et économique" },
                  ];
                } else {
                  recs = [
                    { cal:"7×64", note:"Calibre belge polyvalent — couvre la majorité des situations de chasse" },
                    { cal:".308 Winchester", note:"Standard universel — munitions disponibles dans toutes les armureries" },
                    { cal:"6,5 Creedmoor", note:"Le calibre moderne en plein essor — performances balistiques optimales" },
                  ];
                }

                return (
                  <div className="fade-in">
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8, marginTop:4 }}>
                      Calibres recommandés pour {gibiers.join(" · ")}{typeChasse ? ` · ${typeChasse}` : ""}{distC ? ` · ${distC}m` : ""}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
                      {recs.map((r, i) => (
                        <div key={r.cal} style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.accent}30`, borderLeft:`3px solid ${COLORS.accent}`, borderRadius:7, padding:"12px 14px" }}>
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.accent, fontWeight:600, marginBottom:4 }}>Suggestion {i+1}</div>
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
                          <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted }}>4,99€/mois · 49€/an</div>
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

              {!(gibierCMulti.length > 0 || gibierC) && (
                <div style={{ ...card, borderStyle: "dashed" }}>
                  <p style={{ color: COLORS.textDim, fontStyle: "italic", fontSize: "0.95rem", textAlign: "center" }}>
                    {T.calPH}
                  </p>
                </div>
              )}

              {/* Premium upsell toujours visible */}
              {!isPremium && (gibierCMulti.length > 0 || gibierC) ? null : !isPremium && (
                <button onClick={() => setIsPremium(true)}
                  style={{ ...btnPrimary, width:"100%", marginTop:8, background: COLORS.accentGlow, border:`2px solid ${COLORS.accent}`, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  <span style={{ fontSize:16 }}>★</span>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:700, color: COLORS.accent }}>Passer Premium — Analyse IA approfondie</div>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted }}>4,99€/mois · 49€/an</div>
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
                {[["carabine","🔫 Munition carabine"],["fusil","🦆 Munition fusil"]].map(([mode, label]) => (
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
                              <optgroup label="🐇 Petit gibier">
                                {["Lièvre brun","Faisan de chasse","Perdrix grise","Bécasse des bois"].map(g =>
                                  <option key={g} value={g} disabled={gibierMMulti.includes(g)}>{gibierMMulti.includes(g)?"✓ ":""}{g}</option>)}
                              </optgroup>
                              <optgroup label="🦊 Autre gibier">
                                {["Lapin de garenne","Pigeon ramier","Renard roux"].map(g =>
                                  <option key={g} value={g} disabled={gibierMMulti.includes(g)}>{gibierMMulti.includes(g)?"✓ ":""}{g}</option>)}
                              </optgroup>
                              <optgroup label="🦆 Gibier d'eau">
                                {["Bernache du Canada","Canard colvert","Foulque macroule"].map(g =>
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
                                  {rec.sansPlomb ? "✓ Sans plomb" : "Plomb"}
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
                                <span style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color:"#5bc8af", fontWeight:600 }}>🌿 Sans plomb ✓</span>
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

                  {/* Premium upsell — toujours visible */}
                  {!isPremium && (
                    <button onClick={() => setIsPremium(true)}
                      style={{ ...btnPrimary, width:"100%", marginTop:8, background: COLORS.accentGlow, border:`2px solid ${COLORS.accent}`, fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                      <span style={{ fontSize:16 }}>★</span>
                      <div style={{ textAlign:"left" }}>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, fontWeight:700, color: COLORS.accent }}>Passer Premium — Conseil IA approfondi</div>
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted }}>4,99€/mois · 49€/an</div>
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
                          <optgroup label="🦌 Grand gibier">
                            <option value="Sanglier">Sanglier</option>
                          </optgroup>
                          <optgroup label="🐇 Petit gibier">
                            <option value="Faisan de chasse">Faisan de chasse</option>
                            <option value="Perdrix grise">Perdrix grise</option>
                            <option value="Bécasse des bois">Bécasse des bois</option>
                            <option value="Lièvre brun">Lièvre brun</option>
                            <option value="Lapin de garenne">Lapin de garenne</option>
                          </optgroup>
                          <optgroup label="🦊 Autre gibier">
                            <option value="Pigeon ramier">Pigeon ramier</option>
                            <option value="Renard roux">Renard roux</option>
                          </optgroup>
                          <optgroup label="🦆 Gibier d'eau">
                            <option value="Canard colvert">Canard colvert</option>
                            <option value="Bernache du Canada">Bernache du Canada</option>
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
                          askClaude(prompt, T.system).then(r => { setConseilMun(r); setLoadingM(false); });
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
                        <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:9, color: COLORS.textMuted }}>4,99€/mois · 49€/an</div>
                      </div>
                    </button>
                  )}
                </div>
              )}
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
                            background: i < questionsUsed ? COLORS.accent : COLORS.border,
                            border: `1px solid ${i < questionsUsed ? COLORS.accent : COLORS.borderHover}`,
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
                        ✓ PREMIUM — Questions illimitées
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
                  <div style={{ display:"flex", gap: 12, justifyContent:"center", flexWrap:"wrap" }}>
                    <div style={{ background: COLORS.bgCard, border:`1px solid ${COLORS.border}`, borderRadius: 6, padding:"12px 20px", minWidth: 140 }}>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textMuted, marginBottom: 4 }}>MENSUEL</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", color: COLORS.white }}>4,99€<span style={{ fontSize:"0.8rem", color: COLORS.textMuted }}>/mois</span></div>
                    </div>
                    <div style={{ background: COLORS.bgCard, border:`1px solid ${COLORS.accent}`, borderRadius: 6, padding:"12px 20px", minWidth: 140, position:"relative" }}>
                      <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background: COLORS.accent, color:"#0d0f0a", fontSize:9, fontFamily:"'IBM Plex Mono',monospace", padding:"2px 8px", borderRadius: 10 }}>MEILLEUR PRIX</div>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize: 10, color: COLORS.textMuted, marginBottom: 4 }}>ANNUEL</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", color: COLORS.accent }}>49€<span style={{ fontSize:"0.8rem", color: COLORS.textMuted }}>/an</span></div>
                    </div>
                  </div>
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
                  <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:20 }}>
                    <div style={{ background: COLORS.bgCard, border:`1px solid ${COLORS.border}`, borderRadius:6, padding:"12px 20px", minWidth:130 }}>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, marginBottom:4 }}>MENSUEL</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", color: COLORS.white }}>4,99€<span style={{ fontSize:"0.8rem", color: COLORS.textMuted }}>/mois</span></div>
                    </div>
                    <div style={{ background: COLORS.bgCard, border:`2px solid ${COLORS.accent}`, borderRadius:6, padding:"12px 20px", minWidth:130, position:"relative" }}>
                      <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background: COLORS.accent, color:"#0d0f0a", fontSize:9, fontFamily:"'IBM Plex Mono',monospace", padding:"2px 8px", borderRadius:10 }}>MEILLEUR PRIX</div>
                      <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, marginBottom:4 }}>ANNUEL</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.4rem", color: COLORS.accent }}>49€<span style={{ fontSize:"0.8rem", color: COLORS.textMuted }}>/an</span></div>
                    </div>
                  </div>
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
                <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                  <div style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.border}`, borderRadius:6, padding:"10px 18px" }}>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, marginBottom:4 }}>MENSUEL</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.3rem", color: COLORS.white }}>4,99€<span style={{fontSize:"0.75rem", color: COLORS.textMuted}}>/mois</span></div>
                  </div>
                  <div style={{ background: COLORS.bgInput, border:`2px solid ${COLORS.accent}`, borderRadius:6, padding:"10px 18px", position:"relative" }}>
                    <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background: COLORS.accent, color:"#0d0f0a", fontSize:9, fontFamily:"'IBM Plex Mono',monospace", padding:"2px 8px", borderRadius:10 }}>MEILLEUR PRIX</div>
                    <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted, marginBottom:4 }}>ANNUEL</div>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.3rem", color: COLORS.accent }}>49€<span style={{fontSize:"0.75rem", color: COLORS.textMuted}}>/an</span></div>
                  </div>
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

      {/* ── MODAL SAUVEGARDE RÉGLAGE ── */}
      {saveModal && isPremium && pendingEntry && (
        <>
          <div onClick={() => setSaveModal(false)}
            style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:100, backdropFilter:"blur(4px)" }} />
          <div className="fade-in" style={{
            position:"fixed", top:"50%", left:"50%",
            transform:"translate(-50%,-50%)",
            background: COLORS.bgCard, border:`1px solid ${COLORS.accent}`,
            borderRadius:10, padding:"28px 28px 24px",
            zIndex:101, width:"min(380px, 92vw)",
            boxShadow:`0 8px 40px rgba(0,0,0,0.6)`,
          }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.15rem", color: COLORS.white, marginBottom:6 }}>
              📋 Sauvegarder ce réglage ?
            </div>
            <p style={{ color: COLORS.textMuted, fontSize:"0.9rem", marginBottom:16, lineHeight:1.6 }}>
              Voulez-vous enregistrer ce réglage dans votre historique Premium ?
            </p>
            <div style={{ background: COLORS.bgInput, border:`1px solid ${COLORS.border}`, borderRadius:6, padding:"10px 14px", marginBottom:20 }}>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:11, color: COLORS.accent, marginBottom:4 }}>
                {pendingEntry.calibre}
                {pendingEntry.munition !== "—" && <span style={{color:COLORS.textMuted}}> · {pendingEntry.munition}</span>}
              </div>
              <div style={{ fontFamily:"'IBM Plex Mono',monospace", fontSize:10, color: COLORS.textMuted }}>
                Tir à {pendingEntry.distTir}m → DRO {pendingEntry.dro}m · {pendingEntry.date}
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => { setSaveModal(false); setPendingEntry(null); }}
                style={{ flex:1, background:"transparent", border:`1px solid ${COLORS.border}`, borderRadius:6, color: COLORS.textMuted, padding:"10px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12, cursor:"pointer" }}>
                Ne pas sauvegarder
              </button>
              <button onClick={confirmerSauvegarde}
                style={{ ...btnPrimary, flex:2, padding:"10px" }}>
                ★ Sauvegarder
              </button>
            </div>
          </div>
        </>
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
            size: ${printFormat === "A3" ? "A3" : "A4"};
            margin: 12mm;
          }
          body > * { display: none !important; }
          .chassia-print-target { display: block !important; }
        }
      `}</style>
    </>
  );
}
