import { writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export const ui = {
  en:{skip:'Skip to content',nav:'Main navigation',contact:'Contact',language:'Language',phone:'ORHAR app screens',home:'Daily home',bible:'Bible library',reader:'Bible reader',quiz:'Bible quiz',plan:'Reading plan',personal:'Personalisation',themes:'ORHAR themes',themeNames:['Default','Blue','Sunset','Forest','Violet','Oceanic','Earthy','Graphite','Sakura'],psalm:'Psalms 119',quote:'Your word is a lamp to my feet, and a light for my path.',footer:'Footer'},
  fr:{skip:'Aller au contenu',nav:'Navigation principale',contact:'Contact',language:'Langue',phone:'Écrans de l’application ORHAR',home:'Accueil quotidien',bible:'Bibliothèque biblique',reader:'Lecture biblique',quiz:'Quiz biblique',plan:'Plan de lecture',personal:'Personnalisation',themes:'Thèmes ORHAR',themeNames:['Défaut','Bleu','Coucher de soleil','Forêt','Violet','Océan','Terre','Graphite','Sakura'],psalm:'Psaumes 119',quote:'Ta parole est un flambeau devant mes pas, une lumière sur mon sentier.',footer:'Pied de page'},
  es:{skip:'Ir al contenido',nav:'Navegación principal',contact:'Contacto',language:'Idioma',phone:'Pantallas de ORHAR',home:'Inicio diario',bible:'Biblioteca bíblica',reader:'Lector bíblico',quiz:'Quiz bíblico',plan:'Plan de lectura',personal:'Personalización',themes:'Temas ORHAR',themeNames:['Predeterminado','Azul','Atardecer','Bosque','Violeta','Océano','Tierra','Grafito','Sakura'],psalm:'Salmos 119',quote:'Tu palabra es una lámpara para mis pies, y una luz para mi camino.',footer:'Pie de página'},
  de:{skip:'Zum Inhalt springen',nav:'Hauptnavigation',contact:'Kontakt',language:'Sprache',phone:'ORHAR-App-Bildschirme',home:'Tagesübersicht',bible:'Bibelbibliothek',reader:'Bibellektüre',quiz:'Bibelquiz',plan:'Leseplan',personal:'Personalisierung',themes:'ORHAR-Designs',themeNames:['Standard','Blau','Sonnenuntergang','Wald','Violett','Ozean','Erde','Graphit','Sakura'],psalm:'Psalmen 119',quote:'Dein Wort ist meine Fußes Leuchte und ein Licht auf meinem Wege.',footer:'Fußbereich'},
  it:{skip:'Vai al contenuto',nav:'Navigazione principale',contact:'Contatto',language:'Lingua',phone:'Schermate dell’app ORHAR',home:'Inizio quotidiano',bible:'Biblioteca biblica',reader:'Lettura biblica',quiz:'Quiz biblico',plan:'Piano di lettura',personal:'Personalizzazione',themes:'Temi ORHAR',themeNames:['Predefinito','Blu','Tramonto','Foresta','Viola','Oceano','Terra','Grafite','Sakura'],psalm:'Salmi 119',quote:'La tua parola è una lampana al mio piè, Ed un lume al mio sentiero.',footer:'Piè di pagina'},
  pt:{skip:'Ir para o conteúdo',nav:'Navegação principal',contact:'Contato',language:'Idioma',phone:'Telas do aplicativo ORHAR',home:'Início diário',bible:'Biblioteca bíblica',reader:'Leitura bíblica',quiz:'Quiz bíblico',plan:'Plano de leitura',personal:'Personalização',themes:'Temas ORHAR',themeNames:['Padrão','Azul','Pôr do sol','Floresta','Violeta','Oceano','Terra','Grafite','Sakura'],psalm:'Salmos 119',quote:'Sua palavra é uma lâmpada para os meus pés, e uma luz para o meu caminho.',footer:'Rodapé'},
  pl:{skip:'Przejdź do treści',nav:'Nawigacja główna',contact:'Kontakt',language:'Język',phone:'Ekrany aplikacji ORHAR',home:'Ekran dnia',bible:'Biblioteka Biblii',reader:'Czytnik Biblii',quiz:'Quiz biblijny',plan:'Plan czytania',personal:'Personalizacja',themes:'Motywy ORHAR',themeNames:['Domyślny','Niebieski','Zachód słońca','Las','Fiolet','Ocean','Ziemia','Grafit','Sakura'],psalm:'Księga Psalmów 119',quote:'Twoje słowo jest pochodnią dla moich nóg i światłością na mojej ścieżce.',footer:'Stopka'}
};

export const brandStory = {
  en:['The name behind the journey','OR means light. HAR means mountain.','The open Bible, the golden path and the mountain in the ORHAR emblem tell one story: the Word illuminates each step of the ascent. That meaning remains at the heart of the app as it grows.'],
  fr:['Le nom derrière le chemin','OR signifie lumière. HAR signifie montagne.','La Bible ouverte, le chemin doré et la montagne de l’emblème ORHAR racontent une même histoire : la Parole éclaire chaque pas de l’ascension. Ce sens demeure au cœur de l’app.'],
  es:['El nombre detrás del camino','OR significa luz. HAR significa montaña.','La Biblia abierta, el sendero dorado y la montaña del emblema ORHAR cuentan una historia: la Palabra ilumina cada paso del ascenso. Ese sentido sigue en el corazón de la app.'],
  de:['Der Name hinter dem Weg','OR bedeutet Licht. HAR bedeutet Berg.','Die offene Bibel, der goldene Pfad und der Berg im ORHAR-Zeichen erzählen eine Geschichte: Das Wort erhellt jeden Schritt des Aufstiegs. Dieser Gedanke bleibt das Herz der App.'],
  it:['Il nome dietro il cammino','OR significa luce. HAR means mountain.','La Bibbia aperta, il sentiero dorato e il monte dell’emblema ORHAR raccontano una storia: la Parola illumina ogni passo della salita. Questo significato resta al cuore dell’app.'],
  pt:['O nome por trás do caminho','OR significa luz. HAR significa monte.','A Bíblia aberta, a trilha dourada e o monte do emblema ORHAR contam uma história: a Palavra ilumina cada passo da subida. Esse significado continua no coração do app.'],
  pl:['Nazwa stojąca za drogą','OR oznacza światło. HAR oznacza górę.','Otwarta Biblia, złota ścieżka i góra w znaku ORHAR opowiadają jedną historię: Słowo rozświetla każdy krok wspinaczki. Ta myśl pozostaje sercem aplikacji.']
};

const localeScreens = {
  en: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
  fr: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
  es: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
  de: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
  it: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
  pt: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary'],
  pl: ['home','bible','reader','parobible','plan','quiz','books','mypath','meditbrary']
};
const localeScreenFiles = {
  en: {home:'001-home_en.png',bible:'002-bible-selection_en.png',reader:'003-bible-reader_en.png',parobible:'004-parobible_en.png',plan:'005-reading-plan_en.png',quiz:'006-quiz_en.png',books:'007-books_en.png',mypath:'008-my-path_en.png',meditbrary:'009-meditbrary_en.png'},
  fr: {home:'001-home_fr.png',bible:'002-bible-selection_fr.png',reader:'003-bible-reader_fr.png',parobible:'004-parobible_fr.png',plan:'005-reading-plan_fr.png',quiz:'006-quiz_fr.png',books:'007-books_fr.png',mypath:'008-my-path_fr.png',meditbrary:'009-meditbrary_fr.png'},
  es: {home:'001-home_es.png',bible:'002-bible-selection_es.png',reader:'003-bible-reader_es.png',parobible:'004-parobible_es.png',plan:'005-reading-plan_es.png',quiz:'006-quiz_es.png',books:'007-books_es.png',mypath:'008-my-path_es.png',meditbrary:'009-meditbrary_es.png'},
  de: {home:'001-home_de.png',bible:'002-bible-selection_de.png',reader:'003-bible-reader_de.png',parobible:'004-parobible_de.png',plan:'005-reading-plan_de.png',quiz:'006-quiz_de.png',books:'007-books_de.png',mypath:'008-my-path_de.png',meditbrary:'009-meditbrary_de.png'},
  it: {home:'001-home_it.png',bible:'002-bible-selection_it.png',reader:'003-bible-reader_it.png',parobible:'004-parobible_it.png',plan:'005-reading-plan_it.png',quiz:'006-quiz_it.png',books:'007-books_it.png',mypath:'008-my-path_it.png',meditbrary:'009-meditbrary_it.png'},
  pt: {home:'001-home_pt.png',bible:'002-bible-selection_pt.png',reader:'003-bible-reader_pt.png',parobible:'004-parobible_pt.png',plan:'005-reading-plan_pt.png',quiz:'006-quiz_pt.png',books:'007-books_pt.png',mypath:'008-my-path_pt.png',meditbrary:'009-meditbrary_pt.png'},
  pl: {home:'001-home_pl.png',bible:'002-bible-selection_pl.png',reader:'003-bible-reader_pl.png',parobible:'004-parobible_pl.png',plan:'005-reading-plan_pl.png',quiz:'006-quiz_pl.png',books:'007-books_pl.png',mypath:'008-my-path_pl.png',meditbrary:'009-meditbrary_pl.png'}
};
export const localizedScreenshotPaths = Object.fromEntries(
  Object.entries(localeScreenFiles).map(([locale, files]) => [locale,
    Object.fromEntries(Object.entries(files).map(([module]) => [module, `/screenshots/locales/${locale}/app-${module}-2026.webp`]))
  ])
);
const galleryCardIndex = {home:0,bible:1,reader:2,parobible:3,mypath:4,plan:5,quiz:6,books:7,meditbrary:8};

export const copy = {
 en:{back:'Home',eyebrow:'Real app screens · Version 1.3',title:'See ORHAR as it is today.',intro:'Explore a curated selection of real app screens, captured in English from the current release.',get:'Get ORHAR',gallery:'Gallery',download:'Take the Word with you.',downloadBody:'Bible reading, liturgical journey, plans, prayers, spiritual books, Meditbrary and voice experiences — together in ORHAR.',store:'Download on Google Play',view:'Explore the app',note:'Availability may vary by country and release phase. An iOS link will be added when publicly available.',cards:['A home for today','A complete Bible library','Focused Scripture reading','ParoBible and Catechism','The daily liturgical path','Reading plans','SianAQuiz','Spiritual books','Meditbrary','Prayers','Voice experience','Bible chapters']},
 fr:{back:'Accueil',eyebrow:'Captures réelles · Version 1.3',title:'ORHAR, tel qu’il vit aujourd’hui.',intro:'Découvrez une sélection de vrais écrans de l’app, capturés en français dans sa version actuelle.',get:'Obtenir ORHAR',gallery:'Galerie',download:'Emportez la Parole avec vous.',downloadBody:'Lecture biblique, parcours liturgique, plans, prières, livres spirituels, Meditbrary et expériences vocales réunis dans ORHAR.',store:'Télécharger sur Google Play',view:'Explorer l’app',note:'La disponibilité peut varier selon le pays et la phase de diffusion. Le lien iOS sera ajouté lorsqu’il sera public.',cards:['Un accueil pour aujourd’hui','Bibliothèque biblique','Lecture attentive','ParoBible et Catéchisme','Le parcours liturgique','Plans de lecture','SianAQuiz','Livres spirituels','Meditbrary','Prières','Expérience vocale','Chapitres bibliques']},
 es:{back:'Inicio',eyebrow:'Capturas reales · Versión 1.3',title:'ORHAR, como es hoy.',intro:'Descubre una selección de pantallas reales de la app, capturadas en español en su versión actual.',get:'Descargar ORHAR',gallery:'Galería',download:'Lleva la Palabra contigo.',downloadBody:'Lectura bíblica, camino litúrgico, planes, oraciones, libros espirituales, Meditbrary y experiencias de voz en ORHAR.',store:'Descargar en Google Play',view:'Explorar la app',note:'La disponibilidad puede variar según el país y la fase de lanzamiento. Añadiremos el enlace de iOS cuando sea público.',cards:['Un inicio para hoy','Biblioteca bíblica','Lectura de la Escritura','ParoBible y Catecismo','Camino litúrgico diario','Planes de lectura','SianAQuiz','Libros espirituales','Meditbrary','Oraciones','Experiencia de voz','Capítulos de la Biblia']},
 de:{back:'Startseite',eyebrow:'Echte App-Bilder · Version 1.3',title:'So sieht ORHAR heute aus.',intro:'Entdecke eine Auswahl echter App-Bildschirme, aufgenommen auf Deutsch mit der aktuellen Version.',get:'ORHAR herunterladen',gallery:'Galerie',download:'Nimm das Wort mit.',downloadBody:'Bibellektüre, liturgischer Weg, Lesepläne, Gebete, geistliche Bücher, Meditbrary und Stimmerlebnisse – alles in ORHAR.',store:'Bei Google Play herunterladen',view:'App entdecken',note:'Die Verfügbarkeit kann je nach Land und Veröffentlichungsphase variieren. Ein iOS-Link folgt, sobald er öffentlich verfügbar ist.',cards:['Startseite für heute','Bibelbibliothek','Konzentriertes Lesen','ParoBible und Katechismus','Täglicher liturgischer Weg','Lesepläne','SianAQuiz','Geistliche Bücher','Meditbrary','Gebete','Stimmerlebnis','Bibelkapitel']},
 it:{back:'Inizio',eyebrow:'Schermate reali · Versione 1.3',title:'ORHAR, com’è oggi.',intro:'Scopri una selezione di schermate reali dell’app, catturate in italiano nella versione attuale.',get:'Scarica ORHAR',gallery:'Galleria',download:'Porta la Parola con te.',downloadBody:'Lettura biblica, cammino liturgico, piani, preghiere, libri spirituali, Meditbrary ed esperienze vocali riuniti in ORHAR.',store:'Scarica da Google Play',view:'Esplora l’app',note:'La disponibilità può variare secondo il Paese e la fase di distribuzione. Il link iOS sarà aggiunto quando sarà pubblico.',cards:['Una schermata per oggi','Biblioteca biblica','Lettura della Scrittura','ParoBible e Catechismo','Cammino liturgico quotidiano','Piani di lettura','SianAQuiz','Libri spirituali','Meditbrary','Preghiere','Esperienza vocale','Capitoli della Bibbia']},
 pt:{back:'Início',eyebrow:'Telas reais · Versão 1.3',title:'ORHAR, como ele é hoje.',intro:'Explore uma seleção de telas reais do app, capturadas em português na versão atual.',get:'Baixar ORHAR',gallery:'Galeria',download:'Leve a Palavra com você.',downloadBody:'Leitura bíblica, caminho litúrgico, planos, orações, livros espirituais, Meditbrary e experiências de voz reunidos no ORHAR.',store:'Baixar no Google Play',view:'Explorar o app',note:'A disponibilidade pode variar conforme o país e a fase de lançamento. O link para iOS será adicionado quando estiver público.',cards:['Um início para hoje','Biblioteca bíblica','Leitura da Escritura','ParoBible e Catecismo','Caminho litúrgico diário','Planos de leitura','SianAQuiz','Livros espirituais','Meditbrary','Orações','Experiência de voz','Capítulos da Bíblia']},
 pl:{back:'Strona główna',eyebrow:'Prawdziwe ekrany · Wersja 1.3',title:'Tak wygląda ORHAR dzisiaj.',intro:'Poznaj wybrane prawdziwe ekrany aplikacji, zrzuty w języku polskim z aktualnej wersji.',get:'Pobierz ORHAR',gallery:'Galeria',download:'Zabierz Słowo ze sobą.',downloadBody:'Lektura Biblii, droga liturgiczna, plany, modlitwy, książki duchowe, Meditbrary i funkcje głosowe — wszystko w ORHAR.',store:'Pobierz z Google Play',view:'Poznaj aplikację',note:'Dostępność może się różnić zależnie od kraju i etapu publikacji. Link do iOS dodamy, gdy będzie publiczny.',cards:['Ekran na dziś','Biblioteka Biblii','Uważna lektura Pisma','ParoBible i Katechizm','Codzienna droga liturgiczna','Plany czytania','SianAQuiz','Książki duchowe','Meditbrary','Modlitwy','Funkcje głosowe','Rozdziały Biblii']}
};

export const navGalleryLabels = Object.fromEntries(
  Object.entries(copy).map(([code, locale]) => [code, locale.gallery])
);

export const newsNavLabels = {
  fr: 'Actualité', en: 'News', es: 'Novedades', de: 'Neuigkeiten', it: 'Novità', pt: 'Novidades', pl: 'Aktualności'
};

export const navFaqLabels = {
  fr: 'FAQ', en: 'FAQ', es: 'FAQ', de: 'FAQ', it: 'FAQ', pt: 'FAQ', pl: 'FAQ'
};

export const demoLabels = {
  fr: {
    nav: 'Démo',
    title: 'Démo Interactive',
    eyebrow: 'Goûter à l’Application · Expérience Démo',
    intro: 'Explorez ORHAR à travers nos modules interactifs réels : teaser vidéo cinématique, quiz SianAQuiz avec versets bibliques, et aperçus sonores et de lecture.',
    videoTitle: 'Aperçu Cinématique de l’App',
    videoSubtitle: 'Une découverte visuelle de l’ascension spirituelle et de l’interface épurée d’ORHAR.',
    audioTitle: 'Expérience Audio & Méditation',
    audioSubtitle: 'Découvrez la narration par voix naturelle et les ambiances sonores contemplatives.',
    audioCards: [
      ['fa-microphone-lines', 'Voix Naturelle', 'Une lecture biblique fluide avec intonation respectueuse et claire pour chaque chapitre.'],
      ['fa-mountain-sun', 'Ambiances Sonores', 'Des paysages sonores apaisants (Montagne de lumière, pluie douce, sanctuaire) pour accompagner votre prière.'],
      ['fa-compass', 'Mon Chemin', 'Parcours quotidien guidé, calendrier liturgique et méditations personnalisées.']
    ],
    readerTitle: 'Bibliothèque & Lecteur Biblique',
    readerSubtitle: 'Une expérience de lecture pure, rapide et personnalisable.',
    readerBody: 'Naviguez facilement entre les traductions, les chapitres et les Testaments. Ajustez la taille de police, surlignez vos versets préférés et méditez en toute sérénité.',
    ctaQuiz: 'Tester le Quiz ↓',
    ctaAudio: 'Démo Audio ↓',
    ctaReader: 'Lecteur Biblique ↓',
    ctaApp: 'Télécharger l’App ↗'
  },
  en: {
    nav: 'Demo',
    title: 'Interactive Demo',
    eyebrow: 'Taste the App · Interactive Experience',
    intro: 'Explore ORHAR through real interactive modules: cinematic video teaser, SianAQuiz with biblical verses, and upcoming audio & scripture previews.',
    videoTitle: 'Cinematic App Teaser',
    videoSubtitle: 'A visual discovery of the spiritual journey and the serene design of ORHAR.',
    audioTitle: 'Voice & Meditation Experience',
    audioSubtitle: 'Discover natural voice narration and immersive ambient soundscapes.',
    audioCards: [
      ['fa-microphone-lines', 'Natural Voice', 'Smooth Scripture reading with respectful, clear intonation for every chapter.'],
      ['fa-mountain-sun', 'Ambient Soundscapes', 'Peaceful background atmospheres (Mountain of Light, gentle rain, serene sanctuary) for your prayer time.'],
      ['fa-compass', 'My Path', 'Guided daily track, liturgical calendar, and personalised meditations.']
    ],
    readerTitle: 'Bible Library & Scripture Reader',
    readerSubtitle: 'A pure, fast, and customizable reading experience.',
    readerBody: 'Easily switch between Bible versions, chapters, and Testaments. Adjust font sizes, highlight favorite verses, and meditate with complete peace of mind.',
    ctaQuiz: 'Try the Quiz ↓',
    ctaAudio: 'Audio Demo ↓',
    ctaReader: 'Bible Reader ↓',
    ctaApp: 'Get the App ↗'
  },
  es: {
    nav: 'Demo',
    title: 'Demostración Interactiva',
    eyebrow: 'Prueba la App · Experiencia Interactiva',
    intro: 'Explora ORHAR a través de módulos interactivos reales: teaser en video, SianAQuiz con versículos bíblicos y avances de audio y lectura.',
    videoTitle: 'Teaser Cinemático de la App',
    videoSubtitle: 'Un descubrimiento visual del ascenso espiritual y el diseño sereno de ORHAR.',
    audioTitle: 'Experiencia de Voz y Meditación',
    audioSubtitle: 'Descubre la narración por voz natural y paisajes sonoros contemplativos.',
    audioCards: [
      ['fa-microphone-lines', 'Voz Natural', 'Lectura fluida de las Escrituras con entonación clara y respetuosa para cada capítulo.'],
      ['fa-mountain-sun', 'Paisajes Sonoros', 'Ambientes de fondo relajantes para acompañar tu momento de oración.'],
      ['fa-compass', 'Mi Sendero', 'Itinerario diario guiado, calendario litúrgico y meditaciones personalizadas.']
    ],
    readerTitle: 'Biblioteca Bíblica y Lector',
    readerSubtitle: 'Una experiencia de lectura pura, rápida y personalizable.',
    readerBody: 'Navega fácilmente entre traductions, capítulos y Testamentos. Ajusta tamaños de letra, resalta versículos y medita en paz.',
    ctaQuiz: 'Probar el Quiz ↓',
    ctaAudio: 'Demo de Audio ↓',
    ctaReader: 'Lector Bíblico ↓',
    ctaApp: 'Descargar la App ↗'
  },
  de: {
    nav: 'Demo',
    title: 'Interaktive Demo',
    eyebrow: 'App Erleben · Interaktives Erlebnis',
    intro: 'Entdecke ORHAR mit echten interaktiven Modulen: Video-Teaser, SianAQuiz mit Bibelversen sowie Audio- und Lese-Vorschauen.',
    videoTitle: 'Kinoreifer App-Teaser',
    videoSubtitle: 'Eine visuelle Reise durch den geistlichen Aufstieg und das klare Design von ORHAR.',
    audioTitle: 'Stimm- & Meditationserlebnis',
    audioSubtitle: 'Entdecke natürliche Stimmenlesung und beruhigende Klanglandschaften.',
    audioCards: [
      ['fa-microphone-lines', 'Natürliche Stimme', 'Flüssiges Vorlesen der Schrift mit respektvoller und klarer Intonation.'],
      ['fa-mountain-sun', 'Klanglandschaften', 'Friedliche Hintergrundklänge für deine persönliche Gebetszeit.'],
      ['fa-compass', 'Mein Weg', 'Geführter Tagespfad, liturgischer Kalender und individuelle Meditationen.']
    ],
    readerTitle: 'Bibelbibliothek & Leseansicht',
    readerSubtitle: 'Ein pures, schnelles und anpassbares Leseerlebnis.',
    readerBody: 'Wechsle mühelos zwischen Bibelausgaben, Kapiteln und Testamenten. Passe die Schriftgröße an und lese in Ruhe.',
    ctaQuiz: 'Quiz Testen ↓',
    ctaAudio: 'Audio-Demo ↓',
    ctaReader: 'Bibel-Reader ↓',
    ctaApp: 'App Herunterladen ↗'
  },
  it: {
    nav: 'Demo',
    title: 'Demo Interattiva',
    eyebrow: 'Assapora l’App · Esperienza Interattiva',
    intro: 'Esplora ORHAR attraverso moduli interattivi reali: teaser video, SianAQuiz con versetti biblici e anteprime audio e di lettura.',
    videoTitle: 'Teaser Cinematico dell’App',
    videoSubtitle: 'Una scoperta visiva dell’ascesa spirituale e del design essenziale di ORHAR.',
    audioTitle: 'Esperienza Audio & Meditazione',
    audioSubtitle: 'Scopri la narrazione con voce naturale e paesaggi sonori contemplativi.',
    audioCards: [
      ['fa-microphone-lines', 'Voce Naturale', 'Lettura fluida della Scrittura con intonazione chiara e rispettosa per ogni capitolo.'],
      ['fa-mountain-sun', 'Paesaggi Sonori', 'Atmosfere di sottofondo rilassanti per accompagnare la tua preghiera.'],
      ['fa-compass', 'Il Mio Percorso', 'Cammino quotidiano guidato, calendario liturgico e meditazioni personalizzate.']
    ],
    readerTitle: 'Biblioteca & Lettura della Bibbia',
    readerSubtitle: 'Un’expérience di lettura pura, rapida e personalizzabile.',
    readerBody: 'Passa agevolmente da una versione biblica all’altra. Regola i caratteri, evidenzia i versetti e medita in pace.',
    ctaQuiz: 'Prova il Quiz ↓',
    ctaAudio: 'Demo Audio ↓',
    ctaReader: 'Lettore Biblico ↓',
    ctaApp: 'Scarica l’App ↗'
  },
  pt: {
    nav: 'Demo',
    title: 'Demonstração Interativa',
    eyebrow: 'Experimente o App · Experiência Interativa',
    intro: 'Explore o ORHAR por meio de módulos interativos reais: teaser em vídeo, SianAQuiz com versículos bíblicos e prévias de áudio e leitura.',
    videoTitle: 'Teaser Cinemático do App',
    videoSubtitle: 'Uma descoberta visual da subida espiritual e do design sereno do ORHAR.',
    audioTitle: 'Experiência de Voz e Meditação',
    audioSubtitle: 'Descubra a narração por voz natural e paisagens sonoras contemplativas.',
    audioCards: [
      ['fa-microphone-lines', 'Voz Natural', 'Leitura bíblica fluida com entonação clara e respeitosa para cada capítulo.'],
      ['fa-mountain-sun', 'Paisagens Sonoras', 'Ambientes sonoros relaxantes para acompanhar seu momento de oração.'],
      ['fa-compass', 'Meu Caminho', 'Caminho diário guiado, calendário litúrgico e meditações personalizadas.']
    ],
    readerTitle: 'Biblioteca Bíblica e Leitor',
    readerSubtitle: 'Uma expérience de leitura pura, rápida e personalizável.',
    readerBody: 'Navegue facilmente entre versões, capítulos e Testamentos. Ajuste o tamanho da fonte e medite com serenidade.',
    ctaQuiz: 'Testar o Quiz ↓',
    ctaAudio: 'Demo de Áudio ↓',
    ctaReader: 'Leitor Bíblico ↓',
    ctaApp: 'Baixar o App ↗'
  },
  pl: {
    nav: 'Demo',
    title: 'Interaktywne Demo',
    eyebrow: 'Poznaj Aplikację · Interaktywne Doświadczenie',
    intro: 'Poznaj ORHAR poprzez prawdziwe moduły interaktywne: teaser wideo, SianAQuiz z wersetami biblijnymi oraz zapowiedzi audio i lektury.',
    videoTitle: 'Filmowa Zapowiedź Aplikacji',
    videoSubtitle: 'Wizualne odkrycie duchowej wspinaczki i harmonijnego projektu ORHAR.',
    audioTitle: 'Głos i Medytacja',
    audioSubtitle: 'Poznaj naturalne czytanie głosem oraz kojące tła dźwiękowe.',
    audioCards: [
      ['fa-microphone-lines', 'Naturalny Głos', 'Płynna lektura Pisma z szacunkiem i wyraźną intonacją dla każdego rozdziału.'],
      ['fa-mountain-sun', 'Klimaty Dźwiękowe', 'Spokojne tła dźwiękowe do osobistej modlitwy.'],
      ['fa-compass', 'Moja Ścieżka', 'Prowadzona ścieżka codzienna, kalendarz liturgiczny i medytacje.']
    ],
    readerTitle: 'Biblioteka i Czytnik Biblii',
    readerSubtitle: 'Czyste, szybkie i elastyczne doświadczenie lektury.',
    readerBody: 'Łatwo przełączaj się między przekładami, rozdziałami i Testamentami. Dostosuj czcionkę i czytaj w spokoju.',
    ctaQuiz: 'Rozwiąż Quiz ↓',
    ctaAudio: 'Demo Audio ↓',
    ctaReader: 'Czytnik Biblii ↓',
    ctaApp: 'Pobierz Aplikację ↗'
  }
};

export const navDemoLabels = Object.fromEntries(
  Object.entries(demoLabels).map(([code, locale]) => [code, locale.nav])
);

export const soundscapeSamples = {
  fr: {
    heading: 'Écoutez nos Compositions Originales',
    subheading: 'Deux œuvres complètes offertes dans ORHAR, composées pour accompagner la prière, la méditation et la lecture biblique.',
    usageTitle: 'Rôle dans l’application',
    loopBadge: 'Œuvre complète gratuite · 8 min 45',
    loopTag: 'Jardin sonore sacré',
    loopTitle: 'Le Jardin de Dieu',
    loopDesc: 'Jardin sonore sacré : eau vive en fond discret, brise respirante, feuillage doux et phrases lumineuses de piano et clarinette.',
    loopUsage: 'La version Présent (ambient) est proposée ici. Dans l’application, choisissez aussi les intensités Contemplatif et Profond selon votre moment de lecture ou de prière.',
    loopDetails: 'Version écoutée : Présent · Cycle long composé · 3 intensités dans l’application',
    masterpieceBadge: 'Œuvre complète gratuite · 8 min 30',
    masterpieceTag: 'Piano sacré',
    masterpieceTitle: 'De la Nuit à l’Aurore',
    masterpieceDesc: 'Piano sacré méditatif et chaleureux, accompagnant la prière, le recueillement et la lecture biblique.',
    masterpieceQuote: '',
    masterpieceDetails: 'Version écoutée : Présent · Cycle long composé · 3 intensités dans l’application'
  },
  en: {
    heading: 'Listen to Original Compositions',
    subheading: 'Two complete works included free in ORHAR, composed for prayer, meditation and Scripture reading.',
    usageTitle: 'In-App Experience',
    loopBadge: 'Complete free work · 8 min 45',
    loopTag: 'Sacred sound garden',
    loopTitle: 'Garden of God',
    loopDesc: 'A sacred garden soundscape: discreet living water, breathing breeze, soft foliage and luminous piano and clarinet phrases.',
    loopUsage: 'The Present (ambient) version is available here. In the app, you can also choose Contemplative and Deep intensities for reading or prayer.',
    loopDetails: 'Now playing: Present · Long-form composed cycle · 3 intensities in the app',
    masterpieceBadge: 'Complete free work · 8 min 30',
    masterpieceTag: 'Sacred piano',
    masterpieceTitle: 'From Night to Dawn',
    masterpieceDesc: 'A sacred, warm meditative piano composition accompanying prayer, contemplation and Scripture reading.',
    masterpieceQuote: '',
    masterpieceDetails: 'Now playing: Present · Long-form composed cycle · 3 intensities in the app'
  },
  es: {
    heading: 'Escucha Nuestras Composiciones Originales',
    subheading: 'Dos obras completas gratuitas en ORHAR, compuestas para la oración, la meditación y la lectura bíblica.',
    usageTitle: 'Uso en la aplicación',
    loopBadge: 'Obra completa gratuita · 8 min 45',
    loopTag: 'Jardín sonoro sagrado',
    loopTitle: 'El Jardín de Dios',
    loopDesc: 'Un jardín sonoro sagrado: agua viva discreta, brisa respirante, hojas suaves y frases luminosas de piano y clarinete.',
    loopUsage: 'Aquí se presenta la versión Presente (ambient). En la aplicación también puedes elegir las intensidades Contemplativa y Profunda.',
    loopDetails: 'Versión: Presente · Ciclo largo compuesto · 3 intensidades en la aplicación',
    masterpieceBadge: 'Obra completa gratuita · 8 min 30',
    masterpieceTag: 'Piano sagrado',
    masterpieceTitle: 'De la Noche al Amanecer',
    masterpieceDesc: 'Un piano sagrado meditativo y cálido que acompaña la oración, el recogimiento y la lectura bíblica.',
    masterpieceQuote: '',
    masterpieceDetails: 'Versión: Presente · Ciclo largo compuesto · 3 intensidades en la aplicación'
  },
  de: {
    heading: 'Höre Unsere Originalkompositionen',
    subheading: 'Zwei vollständige, kostenlose Werke in ORHAR für Gebet, Meditation und Bibellesung.',
    usageTitle: 'Nutzung in der App',
    loopBadge: 'Vollständiges Gratiswerk · 8 Min. 45',
    loopTag: 'Heiliger Klanggarten',
    loopTitle: 'Garten Gottes',
    loopDesc: 'Ein heiliger Klanggarten: dezentes lebendiges Wasser, atmende Brise, sanftes Laub und leuchtende Klavier- und Klarinettenphrasen.',
    loopUsage: 'Hier hören Sie die Version Präsent (ambient). In der App stehen außerdem die Intensitäten Kontemplativ und Tief zur Verfügung.',
    loopDetails: 'Version: Präsent · Komponierter Langzyklus · 3 Intensitäten in der App',
    masterpieceBadge: 'Vollständiges Gratiswerk · 8 Min. 30',
    masterpieceTag: 'Heiliges Klavier',
    masterpieceTitle: 'Von der Nacht zur Morgenröte',
    masterpieceDesc: 'Ein meditatives, warmes heiliges Klavierwerk zur Begleitung von Gebet, Andacht und Bibellesung.',
    masterpieceQuote: '',
    masterpieceDetails: 'Version: Präsent · Komponierter Langzyklus · 3 Intensitäten in der App'
  },
  it: {
    heading: 'Ascolta le Nostre Composizioni Originali',
    subheading: 'Due opere complete gratuite in ORHAR, composte per la preghiera, la meditazione e la lettura biblica.',
    usageTitle: 'Uso nell’applicazione',
    loopBadge: 'Opera completa gratuita · 8 min 45',
    loopTag: 'Giardino sonoro sacro',
    loopTitle: 'Il Giardino di Dio',
    loopDesc: 'Un giardino sonoro sacro: acqua viva discreta, brezza respirante, foglie morbide e frasi luminose di pianoforte e clarinetto.',
    loopUsage: 'Qui è disponibile la versione Presente (ambient). Nell’app puoi scegliere anche le intensità Contemplativa e Profonda.',
    loopDetails: 'Versione: Presente · Ciclo lungo composto · 3 intensità nell’app',
    masterpieceBadge: 'Opera completa gratuita · 8 min 30',
    masterpieceTag: 'Pianoforte sacro',
    masterpieceTitle: 'Dalla Notte all’Aurora',
    masterpieceDesc: 'Un pianoforte sacro meditativo e caloroso che accompagna la preghiera, il raccoglimento e la lettura biblica.',
    masterpieceQuote: '',
    masterpieceDetails: 'Versione: Presente · Ciclo lungo composto · 3 intensità nell’app'
  },
  pt: {
    heading: 'Ouça Nossas Composições Originais',
    subheading: 'Duas obras completas gratuitas no ORHAR, compostas para oração, meditação e leitura bíblica.',
    usageTitle: 'Uso no aplicativo',
    loopBadge: 'Obra completa gratuita · 8 min 45',
    loopTag: 'Jardim sonoro sagrado',
    loopTitle: 'O Jardim de Deus',
    loopDesc: 'Um jardim sonoro sagrado: água viva discreta, brisa respirante, folhas suaves e frases luminosas de piano e clarinete.',
    loopUsage: 'Aqui você ouve a versão Presente (ambient). No aplicativo também pode escolher as intensidades Contemplativa e Profunda.',
    loopDetails: 'Versão: Presente · Ciclo longo composto · 3 intensidades no aplicativo',
    masterpieceBadge: 'Obra completa gratuita · 8 min 30',
    masterpieceTag: 'Piano sagrado',
    masterpieceTitle: 'Da Noite à Aurora',
    masterpieceDesc: 'Um piano sagrado meditativo e acolhedor que acompanha a oração, o recolhimento e a leitura bíblica.',
    masterpieceQuote: '',
    masterpieceDetails: 'Versão: Presente · Ciclo longo composto · 3 intensidades no aplicativo'
  },
  pl: {
    heading: 'Posłuchaj Naszych Oryginalnych Kompozycji',
    subheading: 'Dwa pełne, bezpłatne utwory w ORHAR, stworzone do modlitwy, medytacji i lektury Pisma Świętego.',
    usageTitle: 'Zastosowanie w aplikacji',
    loopBadge: 'Pełny utwór bezpłatny · 8 min 45',
    loopTag: 'Święty ogród dźwięku',
    loopTitle: 'Ogród Boga',
    loopDesc: 'Święty ogród dźwięku: dyskretna żywa woda, oddychająca bryza, delikatne liście oraz świetliste frazy fortepianu i klarnetu.',
    loopUsage: 'Tutaj dostępna jest wersja Obecna (ambient). W aplikacji możesz również wybrać intensywność Kontemplacyjną i Głęboką.',
    loopDetails: 'Wersja: Obecna · Skomponowany długi cykl · 3 poziomy intensywności w aplikacji',
    masterpieceBadge: 'Pełny utwór bezpłatny · 8 min 30',
    masterpieceTag: 'Fortepian sakralny',
    masterpieceTitle: 'Od Nocy do Świtu',
    masterpieceDesc: 'Medytacyjny, ciepły sakralny fortepian towarzyszący modlitwie, skupieniu i czytaniu Pisma Świętego.',
    masterpieceQuote: '',
    masterpieceDetails: 'Wersja: Obecna · Skomponowany długi cykl · 3 poziomy intensywności w aplikacji'
  }
};

export const quizLabels = {
  fr: {
    eyebrow: 'SianAQuiz · Démo Interactive',
    title: 'Testez vos connaissances bibliques',
    subtitle: 'Une immersion immédiate dans l’expérience d’apprentissage et de méditation d’ORHAR.',
    soundLabel: 'Effets sonores',
    correctFeedback: '✨ Excellente réponse !',
    wrongFeedback: '💡 Regardons la réponse biblique :',
    catalogTitle: 'Plus de 9 500 questions & 97 thèmes',
    catalogSub: 'Explorez l’expérience biblique complète dans l’application ORHAR.',
    getApp: 'Obtenir l’App',
    next: 'Question suivante',
    difficulty: { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' },
    type: { 'MCQ': 'Choix Multiple', 'T/F': 'Vrai ou Faux' }
  },
  en: {
    eyebrow: 'SianAQuiz · Interactive Demo',
    title: 'Test Your Biblical Knowledge',
    subtitle: 'An instant taste of the learning and meditation experience in ORHAR.',
    soundLabel: 'Sound effects',
    correctFeedback: '✨ Excellent answer!',
    wrongFeedback: '💡 Here is the biblical insight:',
    catalogTitle: '9,500+ Questions & 97 Themes',
    catalogSub: 'Explore the complete biblical quiz journey in the ORHAR App.',
    getApp: 'Get the App',
    next: 'Next question',
    difficulty: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    type: { 'MCQ': 'Multiple Choice', 'T/F': 'True / False' }
  },
  es: {
    eyebrow: 'SianAQuiz · Demostración Interactiva',
    title: 'Pon a prueba tus conocimientos bíblicos',
    subtitle: 'Una inmersión inmediata en la experiencia de aprendizaje y meditación de ORHAR.',
    soundLabel: 'Efectos de sonido',
    correctFeedback: '✨ ¡Excelente respuesta!',
    wrongFeedback: '💡 Veamos la respuesta bíblica:',
    catalogTitle: 'Más de 9.500 preguntas y 97 temas',
    catalogSub: 'Explora la experiencia bíblica completa en la aplicación ORHAR.',
    getApp: 'Obtener la App',
    next: 'Siguiente pregunta',
    difficulty: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
    type: { 'MCQ': 'Opción Múltiple', 'T/F': 'Verdadero o Falso' }
  },
  de: {
    eyebrow: 'SianAQuiz · Interaktive Demo',
    title: 'Teste dein biblisches Wissen',
    subtitle: 'Ein direkter Einblick in das Lern- und Meditationserlebnis von ORHAR.',
    soundLabel: 'Soundeffekte',
    correctFeedback: '✨ Ausgezeichnete Antwort!',
    wrongFeedback: '💡 Hier ist die biblische Erklärung:',
    catalogTitle: 'Über 9.500 Fragen & 97 Themen',
    catalogSub: 'Entdecke das vollständige Bibelerlebnis in der ORHAR App.',
    getApp: 'App herunterladen',
    next: 'Nächste Frage',
    difficulty: { beginner: 'Anfänger', intermediate: 'Mittelstufe', advanced: 'Fortgeschritten' },
    type: { 'MCQ': 'Multiple Choice', 'T/F': 'Wahr oder Falsch' }
  },
  it: {
    eyebrow: 'SianAQuiz · Demo Interattiva',
    title: 'Metti alla prova la tua conoscenza biblica',
    subtitle: 'Un’immersione immediata nell’esperienza di apprendimento e meditazione di ORHAR.',
    soundLabel: 'Effetti sonori',
    correctFeedback: '✨ Risposta eccellente!',
    wrongFeedback: '💡 Ecco la spiegazione biblica:',
    catalogTitle: 'Oltre 9.500 domande e 97 percorsi tematici',
    catalogSub: 'Esplora l’esperienza biblica completa nell’app ORHAR.',
    getApp: 'Scarica l’App',
    next: 'Prossima domanda',
    difficulty: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzato' },
    type: { 'MCQ': 'Scelta Multipla', 'T/F': 'Vero o Falso' }
  },
  pt: {
    eyebrow: 'SianAQuiz · Demonstração Interativa',
    title: 'Teste seus conhecimentos bíblicos',
    subtitle: 'Uma imersão imediata na experiência de aprendizado e meditação do ORHAR.',
    soundLabel: 'Efeitos sonoros',
    correctFeedback: '✨ Resposta excelente!',
    wrongFeedback: '💡 Aqui está a explicação bíblica:',
    catalogTitle: 'Mais de 9.500 perguntas e 97 temas',
    catalogSub: 'Explore a experiência bíblica completa no aplicativo ORHAR.',
    getApp: 'Baixar o App',
    next: 'Próxima pergunta',
    difficulty: { beginner: 'Iniciante', intermediate: 'Intermediário', advanced: 'Avançado' },
    type: { 'MCQ': 'Múltipla Escolha', 'T/F': 'Verdadeiro ou Falso' }
  },
  pl: {
    eyebrow: 'SianAQuiz · Interaktywne Demo',
    title: 'Sprawdź swoją wiedzę biblijną',
    subtitle: 'Bezpośrednie doświadczenie nauki i medytacji ze SianAQuiz w ORHAR.',
    soundLabel: 'Efekty dźwiękowe',
    correctFeedback: '✨ Doskonała odpowiedź!',
    wrongFeedback: '💡 Oto biblijne wyjaśnienie:',
    catalogTitle: 'Ponad 9 500 pytań i 97 tematów',
    catalogSub: 'Odkryj pełne doświadczenie biblijne w aplikacji ORHAR.',
    getApp: 'Pobierz Aplikację',
    next: 'Następne pytanie',
    difficulty: { beginner: 'Początkujący', intermediate: 'Średniozaawansowany', advanced: 'Zaawansowany' },
    type: { 'MCQ': 'Wielokrotny Wybór', 'T/F': 'Prawda / Fałsz' }
  }
};

export function interactiveQuizSection(root, code) {
  const lbl = quizLabels[code] || quizLabels.en;
  const bundlePath = resolve(root, 'assets', 'quiz', `bundle_${code}.json`);
  const bundleRaw = readFileSync(bundlePath, 'utf8');
  const bundle = JSON.parse(bundleRaw);
  const total = bundle.length;
  const initial = bundle[0];
  const diffLabel = lbl.difficulty[initial.difficulty] || initial.difficulty;
  const exactRef = initial.verseExactRef || (initial.verseBookName ? `${initial.verseBookName} (${initial.reference})` : initial.reference);
  const verseText = initial.verseText ? `« ${initial.verseText} »` : '';

  return `<section class="section quiz-section" id="quiz-demo">
  <div class="section-inner">
    <div class="section-heading center reveal">
      <p class="eyebrow">${lbl.eyebrow}</p>
      <h2 class="section-title">${lbl.title}</h2>
      <p class="section-intro">${lbl.subtitle}</p>
    </div>
    <div class="quiz-container reveal">
      <div class="quiz-card" id="quizCard" data-lang="${code}">
        <div class="quiz-breadcrumb" id="quizBreadcrumb">
          <span><i class="fa-solid fa-book-bible"></i> <strong id="quizSectionName">${initial.sectionName}</strong></span>
          <i class="fa-solid fa-angle-right quiz-bc-sep"></i>
          <span><strong id="quizThemeName">${initial.themeName}</strong></span>
          <i class="fa-solid fa-angle-right quiz-bc-sep"></i>
          <span class="quiz-bc-sub"><strong id="quizSubThemeName">${initial.subThemeName}</strong></span>
        </div>
        
        <div class="quiz-card-header">
          <div class="quiz-meta-group">
            <span class="quiz-id-badge" id="quizIdBadge">Quiz #${initial.id}</span>
            <span class="quiz-diff-badge" id="quizDiffBadge">${diffLabel}</span>
            <span class="quiz-score-badge" id="quizScoreBadge" style="display:none"></span>
          </div>
          <div class="quiz-header-controls">
            <span class="quiz-counter" id="quizCounter">1 / ${total}</span>
            <button type="button" class="quiz-sound-btn" id="quizSoundToggle" aria-label="${lbl.soundLabel}" title="${lbl.soundLabel}">
              <i class="fa-solid fa-volume-high" id="quizSoundIcon"></i>
            </button>
          </div>
        </div>
        
        <h3 class="quiz-question" id="quizQuestion">${initial.question}</h3>
        
        <div class="quiz-options-list" id="quizOptionsList" role="group" aria-label="${initial.question}">
          ${initial.answers.map((opt, idx) => `
            <button type="button" class="quiz-option-btn" data-correct="${opt.correct}" data-index="${idx}">
              <span class="quiz-option-badge">${String.fromCharCode(65 + idx)}</span>
              <span class="quiz-option-text">${opt.text}</span>
              <span class="quiz-option-icon" aria-hidden="true"><i class="fa-solid fa-check"></i></span>
            </button>
          `).join('')}
        </div>
        
        <div class="quiz-feedback" id="quizFeedback" style="display:none" data-correct-title="${lbl.correctFeedback}" data-wrong-title="${lbl.wrongFeedback}">
          <div class="quiz-feedback-top">
            <div class="quiz-feedback-header" id="quizFeedbackHeader"></div>
            <div class="quiz-feedback-score-pill" id="quizFeedbackScorePill"></div>
          </div>
          <div class="quiz-feedback-exp" id="quizFeedbackExp">
            <div class="quiz-verse-card">
              <div class="quiz-verse-header">
                <span class="quiz-verse-badge"><i class="fa-solid fa-quote-left"></i> ${exactRef}</span>
              </div>
              ${verseText ? `<blockquote class="quiz-verse-text">${verseText}</blockquote>` : ''}
            </div>
          </div>
          <div class="quiz-feedback-actions">
            <button type="button" class="button button-primary quiz-next-btn" id="quizNextBtn">${lbl.next} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
          </div>
        </div>
        
        <div class="quiz-catalog-banner">
          <div class="quiz-catalog-info">
            <i class="fa-solid fa-layer-group quiz-catalog-icon" aria-hidden="true"></i>
            <div class="quiz-catalog-text">
              <strong>${lbl.catalogTitle}</strong>
              <span>${lbl.catalogSub}</span>
            </div>
          </div>
          <a class="button button-secondary quiz-catalog-btn" href="/${code}/app.html">${lbl.getApp} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  </div>
  <script type="application/json" id="quizBundleData">${bundleRaw}</script>
</section>`;
}

const descriptions = {
 en:['Daily verse, reflection and quick access to your journey.','Browse books, Testaments and available Bible editions.','Read a chapter and keep meaningful verses close.','Explore Scripture, the Catechism and recent passages.','Follow the readings and prayers of the day.','Build a reading habit with a plan that fits your pace.','Learn through levels and different quiz modes.','Discover books for spiritual reflection.','A dedicated space for guided meditation.','Return to prayers for every moment.','Choose the complimentary welcome voice included with Premium.','Move easily between chapters in a Bible book.'],
 fr:['Verset, pensée du jour et accès rapide à votre parcours.','Parcourez les livres, Testaments et versions bibliques.','Lisez un chapitre et gardez les versets importants.','Explorez l’Écriture, le Catéchisme et les passages récents.','Suivez les lectures et prières du jour.','Construisez une habitude de lecture à votre rythme.','Apprenez avec des niveaux et plusieurs modes de quiz.','Découvrez des livres pour nourrir la réflexion spirituelle.','Un espace dédié à la méditation guidée.','Retrouvez des prières pour chaque moment.','Choisissez la voix de bienvenue offerte avec Premium.','Passez facilement d’un chapitre à l’autre.'],
 es:['Versículo y reflexión del día con acceso rápido a tu camino.','Explora libros, Testamentos y versiones bíblicas.','Lee un capítulo y guarda los versículos importantes.','Descubre la Escritura, el Catecismo y lecturas recientes.','Sigue las lecturas y oraciones del día.','Crea un hábito de lectura a tu ritmo.','Aprende con niveles y distintos modos de juego.','Descubre libros para la reflexión espiritual.','Un espacio dedicado a la meditación guiada.','Encuentra oraciones para cada momento.','Elige la voz de bienvenida incluida con Premium.','Navega fácilmente entre capítulos.'],
 de:['Tagesvers, Impuls und schneller Zugang zu deinem Weg.','Entdecke Bücher, Testamente und Bibelfassungen.','Lies ein Kapitel und bewahre wichtige Verse auf.','Erkunde Schrift, Katechismus und zuletzt gelesene Stellen.','Begleite die Lesungen und Gebete des Tages.','Entwickle eine Lesegewohnheit in deinem Tempo.','Lerne mit Stufen und verschiedenen Quizmodi.','Entdecke Bücher zur geistlichen Vertiefung.','Ein eigener Raum für geführte Meditation.','Finde Gebete für jeden Augenblick.','Wähle die in Premium enthaltene Begrüßungsstimme.','Wechsle einfach zwischen Bibelkapiteln.'],
 it:['Versetto e pensiero del giorno con accesso al tuo cammino.','Esplora libri, Testamenti e versioni della Bibbia.','Leggi un capitolo e conserva i versetti importanti.','Scopri Scrittura, Catechismo e letture recenti.','Segui le letture e le preghiere del giorno.','Crea un’abitudine di lettura al tuo ritmo.','Impara con livelli e diverse modalità di quiz.','Scopri libri per la riflessione spirituale.','Uno spazio dedicato alla meditazione guidata.','Ritrova preghiere per ogni momento.','Scegli la voce di benvenuto inclusa con Premium.','Passa facilmente da un capitolo all’altro.'],
 pt:['Versículo e reflexão do dia com acesso ao seu caminho.','Explore livros, Testamentos e versões da Bíblia.','Leia um capítulo e guarde os versículos importantes.','Descubra a Escritura, o Catecismo e leituras recentes.','Acompanhe as leituras e orações do dia.','Crie o hábito de leitura no seu próprio ritmo.','Aprenda com níveis e diferentes modos de quiz.','Descubra livros para a reflexão espiritual.','Um espaço dedicado à meditação guiada.','Encontre orações para cada momento.','Escolha a voz de boas-vindas incluída no Premium.','Navegue facilmente entre os capítulos.'],
 pl:['Werset i myśl dnia oraz szybki dostęp do twojej drogi.','Przeglądaj księgi, Testamenty i przekłady Biblii.','Czytaj rozdział i zachowuj ważne wersety.','Poznaj Pismo, Katechizm i ostatnio czytane fragmenty.','Podążaj za czytaniami i modlitwami dnia.','Buduj nawyk lektury we własnym tempie.','Ucz się przez poziomy i różne tryby quizu.','Odkrywaj książki do duchowej refleksji.','Osobna przestrzeń do prowadzonej medytacji.','Znajdź modlitwy na każdą chwilę.','Wybierz głos powitalny dostępny w Premium.','Łatwo przechodź między rozdziałami.']
};

const pageCss = `<style>.gallery-hero{padding:105px 0 78px;color:#fff;background:radial-gradient(circle at 84% 24%,rgba(213,183,125,.2),transparent 30%),linear-gradient(135deg,rgba(7,17,30,.94),rgba(29,57,91,.88)),var(--orhar-bg-art);background-size:auto,auto,min(880px,90vw);background-position:center,center,right -120px center;background-repeat:no-repeat}.gallery-hero h1{max-width:850px;margin:0;font:600 clamp(3.5rem,8vw,7rem)/.97 var(--display)}.gallery-hero p{max-width:700px;color:rgba(255,255,255,.75);font-size:1.08rem}.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.shot{margin:0;padding:13px 13px 24px;border:1px solid var(--line);border-radius:30px;background:#fff;box-shadow:0 18px 45px rgba(19,38,61,.09)}.shot img{display:block;width:100%;height:auto;aspect-ratio:9/20;object-fit:contain;border-radius:20px;background:var(--paper-deep)}.shot figcaption{padding:20px 8px 0}.shot h2{margin:0;font:600 1.8rem/1 var(--display)}.shot p{margin:9px 0 0;color:var(--ink-soft);font-size:.87rem}.gallery-cta{margin-top:55px;text-align:center}.download{min-height:calc(100vh - 78px);display:grid;place-items:center;padding:70px 20px;color:#fff;background:radial-gradient(circle at 70% 25%,rgba(213,183,125,.22),transparent 30%),linear-gradient(145deg,rgba(7,17,30,.94),rgba(29,57,91,.88)),var(--orhar-bg-art);background-size:auto,auto,min(900px,94vw);background-position:center,center,right -110px center;background-repeat:no-repeat}.download-card{width:min(920px,100%);display:grid;grid-template-columns:.8fr 1.2fr;align-items:center;gap:55px;padding:55px;border:1px solid rgba(255,255,255,.14);border-radius:36px;background:rgba(255,255,255,.07);backdrop-filter:blur(18px);box-shadow:0 35px 90px rgba(0,0,0,.3)}.download-phone{display:block;width:min(280px,100%);height:auto;object-fit:contain;margin:auto;border:7px solid #fff;border-radius:35px;box-shadow:0 24px 65px rgba(0,0,0,.35)}.download-copy h1{margin:0;font:600 clamp(3.4rem,7vw,6rem)/.94 var(--display)}.download-copy p{color:rgba(255,255,255,.7)}.download-copy .hero-actions{margin-top:28px}.download-note{margin-top:20px;font-size:.8rem;color:rgba(255,255,255,.52)}html[data-theme=dark] .shot{background:#121d2d;border-color:var(--line);box-shadow:0 18px 45px rgba(0,0,0,.28)}html[data-theme=dark] .shot h2{color:#f6efe4}html[data-theme=dark] .download-card{background:rgba(18,29,45,.72);border-color:rgba(255,255,255,.16)}@media(max-width:900px){.gallery{grid-template-columns:repeat(2,1fr)}}@media(max-width:720px){.download-card{grid-template-columns:1fr;padding:30px}.download-phone{width:210px}.gallery-hero,.download{background-position:center,center,right -240px center}}@media(max-width:580px){.gallery{grid-template-columns:1fr}.gallery-hero{padding:70px 0}}@media(max-width:480px){.gallery-hero h1,.download-copy h1{font-size:clamp(2.2rem,8.5vw,3.4rem)}.download-card{padding:24px 18px;border-radius:24px}.download-phone{width:min(185px,65vw)}.download-copy .hero-actions{flex-direction:column;width:100%}.download-copy .hero-actions .button{width:100%}.shot{border-radius:22px;padding:12px 12px 18px}}</style>`;
const flags = {en:'🇬🇧',fr:'🇫🇷',es:'🇪🇸',de:'🇩🇪',it:'🇮🇹',pt:'🇵🇹',pl:'🇵🇱'};

function shell(code, title, body, pageSlug = 'preview', metaDesc = '') {
  const c = copy[code], u = ui[code], d = demoLabels[code];
  const desc = metaDesc || c.intro;
  const canonicalUrl = `https://orhar.com/${code}/${pageSlug}.html`;

  let schemas = [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "ORHAR",
          "item": `https://orhar.com/${code}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": title,
          "item": canonicalUrl
        }
      ]
    }
  ];

  if (pageSlug === 'appdemo') {
    schemas.push(
      {
        "@type": "VideoObject",
        "name": `ORHAR — ${d.videoTitle}`,
        "description": d.videoSubtitle,
        "thumbnailUrl": "https://orhar.com/og-image.png",
        "uploadDate": "2026-10-01T00:00:00Z",
        "contentUrl": `https://orhar.com/assets/videos/${code}/teaser.mp4`
      },
      {
        "@type": "VideoObject",
        "name": `ORHAR — ${d.readerTitle}`,
        "description": d.readerSubtitle,
        "thumbnailUrl": "https://orhar.com/og-image.png",
        "uploadDate": "2026-10-01T00:00:00Z",
        "contentUrl": `https://orhar.com/assets/videos/${code}/reader.mp4`
      },
      {
        "@type": "AudioObject",
        "name": "ORHAR — Garden of God (Present intensity)",
        "description": "Complete sacred garden soundscape offered free in ORHAR for prayer and Scripture reading.",
        "contentUrl": "https://orhar.com/assets/audio/garden_of_god_ambient.mp3",
        "encodingFormat": "audio/mpeg",
        "duration": "PT8M45S"
      },
      {
        "@type": "AudioObject",
        "name": "ORHAR — From Night to Dawn (Present intensity)",
        "description": "Complete sacred piano composition offered free in ORHAR for prayer, contemplation and Scripture reading.",
        "contentUrl": "https://orhar.com/assets/audio/piano_sacre_ambient.mp3",
        "encodingFormat": "audio/mpeg",
        "duration": "PT8M30S"
      }
    );
  } else if (pageSlug === 'app') {
    schemas.push({
      "@type": "SoftwareApplication",
      "name": "ORHAR",
      "applicationCategory": "ReligiousApplication",
      "operatingSystem": "Android",
      "description": desc,
      "url": canonicalUrl,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      }
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": schemas
  };

  return `<!doctype html><html lang="${code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} — ORHAR</title><meta name="description" content="${desc}"><meta name="theme-color" content="#0b182a"><meta name="author" content="ORHAR"><meta name="google-play-app" content="app-id=com.orhar.bible"><meta property="og:type" content="website"><meta property="og:title" content="${title} — ORHAR"><meta property="og:description" content="${desc}"><meta property="og:url" content="${canonicalUrl}"><meta property="og:image" content="https://orhar.com/og-image.png"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@orhar_app"><meta name="twitter:title" content="${title} — ORHAR"><meta name="twitter:image" content="https://orhar.com/og-image.png"><link rel="canonical" href="${canonicalUrl}"><link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-96x96.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1A2E4A"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><link rel="stylesheet" href="/site.css?v=27">${pageCss}<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script></head><body><a class="skip-link" href="#main">${u.skip}</a><header class="site-header"><div class="header-inner"><a class="brand" href="/${code}/index.html"><img src="/logo.png" alt=""><strong>ORHAR</strong></a><nav class="nav" data-nav aria-label="${u.nav}"><a href="/${code}/index.html">${c.back}</a><a href="/${code}/preview.html">${c.gallery}</a><a href="/${code}/appdemo.html">${d.nav}</a><a href="/${code}/actuality.html">${newsNavLabels[code]}</a><a href="/contact.html">${u.contact}</a></nav><select class="language" data-language aria-label="${u.language}">${Object.keys(copy).map(lang=>`<option value="${lang}" ${lang===code?'selected':''}>${flags[lang]} ${lang.toUpperCase()}</option>`).join('')}</select><button class="mode-toggle" data-mode-toggle type="button"><span aria-hidden="true">☾</span></button><button class="menu-button" data-menu aria-label="Menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button></div></header><main id="main">${body}</main><footer class="site-footer"><div class="section-inner"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/${code}/index.html"><img src="/logo.png" alt=""><strong>ORHAR</strong></a><p>${c.back}</p><p class="footer-verse">« ${u.quote} » <span class="footer-verse-ref">— ${u.psalm}:105</span></p></div><nav class="footer-links" aria-label="${u.footer}"><a href="/${code}/index.html">${c.back}</a><a href="/${code}/preview.html">${c.gallery}</a><a href="/${code}/appdemo.html">${d.nav}</a><a href="/${code}/app.html">${c.get}</a><a href="/contact.html">${u.contact}</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="/licenses.html">Licenses</a></nav></div><div class="footer-bottom"><span>© 2026 ORHAR.</span><a href="/${code}/index.html">${c.back}</a></div></div></footer><script src="/site.js?v=27" defer></script></body></html>`;
}

export function writeSecondaryPages(root) {
  for (const code of Object.keys(copy)) {
    const c = copy[code];
    const d = demoLabels[code];
    const s = soundscapeSamples[code] || soundscapeSamples.en;
    const localeKeys = localeScreens[code];

    // 1. Gallery Page (preview.html)
    const gallery = `<section class="gallery-hero"><div class="section-inner"><p class="eyebrow">${c.eyebrow}</p><h1>${c.title}</h1><p>${c.intro}</p></div></section><section class="section"><div class="section-inner"><div class="gallery">${localeKeys.map((key)=>{const sourceIndex=galleryCardIndex[key];const src=localizedScreenshotPaths[code][key];const label=c.cards[sourceIndex];const description=descriptions[code][sourceIndex];return `<figure class="shot reveal"><img src="${src}" alt="ORHAR — ${label}" loading="lazy" width="720" height="1600"><figcaption><h2>${label}</h2><p>${description}</p></figcaption></figure>`}).join('')}</div><div class="gallery-cta"><a class="button button-primary" href="/${code}/app.html">${c.get} ↗</a><a class="button button-secondary" href="/${code}/appdemo.html" style="margin-left: 12px;">${d.title}</a></div></div></section>`;
    writeFileSync(resolve(root, code, 'preview.html'), shell(code, c.gallery, gallery, 'preview'));

    // 2. Download App Page (app.html)
    const download = `<section class="download"><article class="download-card"><img class="download-phone" src="${localizedScreenshotPaths[code].home}" alt="ORHAR — ${c.cards[0]}"><div class="download-copy"><p class="eyebrow">ORHAR 1.3 · Android</p><h1>${c.download}</h1><p>${c.downloadBody}</p><div class="hero-actions"><a class="button button-primary" href="https://play.google.com/store/apps/details?id=com.orhar.bible">${c.store} ↗</a><a class="button button-secondary" href="/${code}/preview.html">${c.view}</a></div><p class="download-note">${c.note}</p></div></article></section>`;
    writeFileSync(resolve(root, code, 'app.html'), shell(code, c.get, download, 'app'));

    // 3. Interactive App Demo Page (appdemo.html)
    const appdemo = `
    <section class="demo-hero">
      <div class="section-inner">
        <p class="eyebrow">${d.eyebrow}</p>
        <h1>${d.title}</h1>
        <p>${d.intro}</p>
        <div class="hero-actions">
          <a class="button button-primary" href="#quiz-demo">${d.ctaQuiz}</a>
          <a class="button button-secondary" href="#demo-audio">${d.ctaAudio}</a>
          <a class="button button-primary" href="#demo-reader">${d.ctaReader}</a>
          <a class="button button-secondary" href="/${code}/app.html">${d.ctaApp}</a>
        </div>
      </div>
    </section>

    <!-- MODULE 1: VIDEO TEASER -->
    <section class="section" id="demo-video">
      <div class="section-inner">
        <div class="demo-teaser-preview reveal">
          <div class="demo-video-visual">
            <div class="demo-phone-stage">
              <div class="demo-phone-glow" aria-hidden="true"></div>
              <figure class="demo-phone-frame">
                <video controls autoplay loop muted playsinline poster="${localizedScreenshotPaths[code].home}" aria-label="${d.videoTitle}">
                  <source src="/assets/videos/${code}/teaser.mp4" type="video/mp4">
                  <source src="/assets/videos/${code}/teaser.webm" type="video/webm">
                </video>
              </figure>
            </div>
          </div>
          <div class="demo-video-copy">
            <p class="eyebrow">Module 01 · Video</p>
            <h3>${d.videoTitle}</h3>
            <p>${d.videoSubtitle}</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#quiz-demo">${d.ctaQuiz}</a>
              <a class="button button-secondary" href="#demo-audio">${d.ctaAudio}</a>
              <a class="button button-primary" href="#demo-reader">${d.ctaReader}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- MODULE 2: INTERACTIVE QUIZ (SIANAQUIZ) -->
    ${interactiveQuizSection(root, code)}

    <!-- MODULE 3: AUDIO & MYPATH PREVIEW -->
    <section class="section" id="demo-audio">
      <div class="section-inner">
        <div class="section-heading center reveal">
          <p class="eyebrow">Module 03 · Audio</p>
          <h2 class="section-title">${d.audioTitle}</h2>
          <p class="section-intro">${d.audioSubtitle}</p>
        </div>
        <div class="demo-audio-grid">
          ${d.audioCards.map(([icon, title, text]) => `
            <article class="demo-audio-card reveal">
              <span class="demo-audio-icon"><i class="fa-solid ${icon}"></i></span>
              <h3>${title}</h3>
              <p>${text}</p>
            </article>
          `).join('')}
        </div>

        <!-- AMBIENT & MASTERPIECE SHOWCASE PLAYERS -->
        <div class="demo-soundscapes-header reveal">
          <h3>${s.heading}</h3>
          <p>${s.subheading}</p>
        </div>

        <div class="demo-soundscapes-showcase reveal">
          <!-- Free pack 1: Garden of God -->
          <article class="soundscape-player-card">
            <div class="soundscape-card-top">
              <span class="soundscape-badge"><i class="fa-solid fa-gift"></i> ${s.loopBadge}</span>
              <span class="soundscape-tag"><i class="fa-solid fa-leaf"></i> ${s.loopTag}</span>
            </div>
            <div class="soundscape-card-body">
              <h4>${s.loopTitle}</h4>
              <p class="soundscape-desc">${s.loopDesc}</p>
              <div class="soundscape-app-usage">
                <i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
                <p><strong>${s.usageTitle} :</strong> ${s.loopUsage}</p>
              </div>
              <div class="soundscape-meta">
                <span><i class="fa-solid fa-sliders"></i> ${s.loopDetails}</span>
              </div>
            </div>
            <div class="soundscape-card-player">
              <audio controls preload="metadata" aria-label="${s.loopTitle}">
                <source src="/assets/audio/garden_of_god_ambient.mp3" type="audio/mpeg">
              </audio>
            </div>
          </article>

          <!-- Free pack 2: From Night to Dawn -->
          <article class="soundscape-player-card masterpiece-card">
            <div class="soundscape-card-top">
              <span class="soundscape-badge masterpiece-badge"><i class="fa-solid fa-gift"></i> ${s.masterpieceBadge}</span>
              <span class="soundscape-tag"><i class="fa-solid fa-music"></i> ${s.masterpieceTag}</span>
            </div>
            <div class="soundscape-card-body">
              <h4>${s.masterpieceTitle}</h4>
              <p class="soundscape-desc">${s.masterpieceDesc}</p>
              <div class="soundscape-meta">
                <span><i class="fa-solid fa-music"></i> ${s.masterpieceDetails}</span>
              </div>
            </div>
            <div class="soundscape-card-player">
              <audio controls preload="metadata" aria-label="${s.masterpieceTitle}">
                <source src="/assets/audio/piano_sacre_ambient.mp3" type="audio/mpeg">
              </audio>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- MODULE 4: SCRIPTURE READER PREVIEW -->
    <section class="section" id="demo-reader">
      <div class="section-inner">
        <div class="demo-reader-preview reveal">
          <div class="demo-reader-copy">
            <p class="eyebrow">Module 04 · Scripture</p>
            <h3>${d.readerTitle}</h3>
            <p>${d.readerBody}</p>
            <div class="hero-actions">
              <a class="button button-primary" href="/${code}/app.html">${c.get} ↗</a>
              <a class="button button-secondary" href="/${code}/preview.html">${c.view}</a>
            </div>
          </div>
          <div class="demo-reader-visual">
            <div class="demo-phone-stage">
              <div class="demo-phone-glow" aria-hidden="true"></div>
              <figure class="demo-phone-frame">
                <video controls autoplay loop muted playsinline poster="${localizedScreenshotPaths[code].reader}" aria-label="${d.readerTitle}">
                  <source src="/assets/videos/${code}/reader.mp4" type="video/mp4">
                  <source src="/assets/videos/${code}/reader.webm" type="video/webm">
                </video>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA DOWNLOAD -->
    <section class="section">
      <div class="section-inner">
        <div class="gallery-cta">
          <a class="button button-primary" href="https://play.google.com/store/apps/details?id=com.orhar.bible">${c.store} ↗</a>
          <a class="button button-secondary" href="/${code}/preview.html" style="margin-left: 12px;">${c.gallery}</a>
        </div>
      </div>
    </section>
    `;
    writeFileSync(resolve(root, code, 'appdemo.html'), shell(code, d.title, appdemo, 'appdemo', d.intro));
  }
}
