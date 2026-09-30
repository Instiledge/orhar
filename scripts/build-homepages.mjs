import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { overrides } from './locale-overrides.mjs';
import { ui, brandStory, navGalleryLabels, localizedScreenshotPaths, writeSecondaryPages } from './secondary-pages.mjs';
import { writeNewsPages } from './build-news.mjs';

const root = resolve(import.meta.dirname, '..');

const locales = {
  en: {
    lang: 'English', nav: ['Experience', 'Daily life', 'Features', 'News'],
    eyebrow: 'Scripture · Prayer · Growth', title: 'Your faith,', accent: 'every day.',
    hero: 'ORHAR brings the Bible, the liturgy, prayer, spiritual reading and meaningful progress together in one calm, multilingual companion.',
    actions: ['Discover the experience', 'Get ORHAR'], status: ['Version 1.3', '7 interface languages', 'Offline Bible reading'],
    facts: [['5', 'essential spaces'], ['7', 'interface languages'], ['9', 'visual themes'], ['1', 'daily spiritual rhythm']],
    journey: ['One app. A complete spiritual rhythm.', 'Open ORHAR for a verse, stay for a reading, a prayer, a plan or a moment of quiet. Each space supports a different step of the same journey.'],
    paths: [
      ['Read', 'A full Bible library designed for focused, offline reading.', ['Multiple Bible versions', 'Bookmarks and personal notes', 'Search and text settings']],
      ['Meditate', 'Let Scripture meet the moment through ParoBible and the Catechism.', ['Daily and random passages', 'Catechism of the Catholic Church', 'Recent reading history']],
      ['Advance', 'Create a rhythm that fits your life and see your progress.', ['Flexible reading plans', 'Daily Psalm and Proverb', 'Reminders and streaks']],
      ['Learn', 'Turn discovery into lasting knowledge with SianAQuiz.', ['Progressive levels', 'Several game modes', 'Custom quizzes and rankings']]
    ],
    real: ['Inside the app today', 'A home shaped around today', 'Your daily verse, spiritual quotation and liturgical path sit together on a living home screen. Notes, bookmarks and progress remain close at hand.', ['Verse and quotation of the day', 'Liturgical readings in My Path', 'Shareable cards and quick note-taking']],
    depth: ['Scripture, without friction', 'Read the Bible your way', 'Move between Testaments, Psalms and downloadable versions. Adjust typography, listen aloud and keep meaningful passages with you.', ['Offline-first Bible library', 'System and natural voices', 'Notes, bookmarks and cross-device sync for eligible accounts']],
    beyond: ['More than a reader', 'Practice, listen and go deeper', 'ORHAR connects structured plans, spiritual books, prayers, soundscapes and an evolving Bible quiz in one coherent experience.', ['Reading-plan library', 'Meditbrary, prayers and spiritual books', 'Natural voices and contemplative soundscapes']],
    featureTitle: ['Built for a life of faith', 'Rich enough to grow with you, quiet enough to use every day.'],
    features: [['Daily home', 'Verse, quotation and liturgical readings for the day.'], ['Bible versions', 'Choose the translation and edition that suit your reading.'], ['Bible reading', 'Focused reading, search and offline access.'], ['My Path', 'A daily liturgical path with readings and prayer.'], ['ParoBible', 'Explore Scripture, Catechism and recent passages.'], ['Reading plans', 'Build or download a plan and follow it at your pace.'], ['SianAQuiz', 'Levels, streaks, rankings and custom quizzes.'], ['System voices', 'Listen with the voices available on your device.'], ['Natural voices & sound', 'Premium narration and contemplative soundscapes.'], ['Spiritual books', 'Read a curated library of spiritual works.'], ['Meditbrary', 'Guided meditation and exercises for quiet reflection.'], ['Prayer', 'Return to prayers for different moments and needs.'], ['Personal space', 'Guest mode, profiles, premium and family options.']],
    theme: ['A space that feels like yours', 'Choose light or dark mode, tune text for comfort and select from nine color worlds drawn directly from ORHAR.', 'Default'],
    release: ['Current app', '1.3', 'The website now reflects the real ORHAR experience.', 'This update is grounded in the current application: its five main spaces, daily content, spiritual library, voice experience and account options.', ['Explore the gallery', 'Read the latest news']],
    footer: 'The Mountain of Light — Scripture, prayer and growth in one place.', legal: ['Privacy', 'Terms', 'Licenses', 'Contact', 'App preview', 'GitHub'], copyright: 'All rights reserved.'
  },
  fr: {
    lang: 'Français', nav: ['Expérience', 'Au quotidien', 'Fonctionnalités', 'Actualité'],
    eyebrow: 'Écriture · Prière · Cheminement', title: 'Votre foi,', accent: 'chaque jour.',
    hero: 'ORHAR réunit la Bible, la liturgie, la prière, la lecture spirituelle et une progression porteuse de sens dans un compagnon serein et multilingue.',
    actions: ['Découvrir l’expérience', 'Obtenir ORHAR'], status: ['Version 1.3', '7 langues d’interface', 'Lecture biblique hors ligne'],
    facts: [['5', 'espaces essentiels'], ['7', 'langues d’interface'], ['9', 'univers visuels'], ['1', 'rythme spirituel quotidien']],
    journey: ['Une app. Un rythme spirituel complet.', 'Ouvrez ORHAR pour un verset, poursuivez par une lecture, une prière, un plan ou un temps de silence. Chaque espace accompagne une étape du même chemin.'],
    paths: [
      ['Lire', 'Une bibliothèque biblique complète, pensée pour une lecture attentive et hors ligne.', ['Plusieurs versions de la Bible', 'Signets et notes personnelles', 'Recherche et réglages du texte']],
      ['Méditer', 'Laissez l’Écriture rejoindre le présent avec ParoBible et le Catéchisme.', ['Passages du jour et aléatoires', 'Catéchisme de l’Église catholique', 'Historique des lectures']],
      ['Avancer', 'Créez un rythme adapté à votre vie et suivez votre progression.', ['Plans de lecture flexibles', 'Psaume et Proverbe quotidiens', 'Rappels et séries']],
      ['Apprendre', 'Transformez la découverte en connaissance durable avec SianAQuiz.', ['Niveaux progressifs', 'Plusieurs modes de jeu', 'Quiz personnalisés et classements']]
    ],
    real: ['Dans l’app aujourd’hui', 'Un accueil construit autour du jour présent', 'Le verset, la pensée spirituelle et le parcours liturgique du jour se rejoignent sur un accueil vivant. Notes, signets et progression restent à portée de main.', ['Verset et pensée du jour', 'Lectures liturgiques dans Mon Chemin', 'Cartes à partager et prise de notes rapide']],
    depth: ['L’Écriture, sans friction', 'Lisez la Bible à votre manière', 'Passez des Testaments aux Psaumes et aux versions téléchargeables. Adaptez la typographie, écoutez le texte et gardez les passages importants.', ['Bibliothèque biblique hors ligne', 'Voix système et voix naturelles', 'Notes, signets et synchronisation pour les comptes éligibles']],
    beyond: ['Bien plus qu’un lecteur', 'Pratiquez, écoutez et allez plus loin', 'ORHAR relie plans structurés, livres spirituels, prières, paysages sonores et quiz biblique évolutif dans une seule expérience.', ['Bibliothèque de plans', 'Meditbrary, prières et livres spirituels', 'Voix naturelles et ambiances contemplatives']],
    featureTitle: ['Pensée pour une vie de foi', 'Assez riche pour grandir avec vous, assez paisible pour vous accompagner chaque jour.'],
    features: [['Accueil quotidien', 'Verset, pensée et lectures liturgiques du jour.'], ['Choix des Bibles', 'Sélectionnez la traduction et l’édition adaptées à votre lecture.'], ['Lecture biblique', 'Lecture attentive, recherche et accès hors ligne.'], ['Mon Chemin', 'Un parcours liturgique quotidien avec lectures et prière.'], ['ParoBible', 'Explorez l’Écriture, le Catéchisme et les passages récents.'], ['Plans de lecture', 'Créez ou téléchargez un plan et avancez à votre rythme.'], ['SianAQuiz', 'Niveaux, séries, classements et quiz personnalisés.'], ['Voix du système', 'Écoutez avec les voix disponibles sur votre appareil.'], ['Voix naturelles et ambiance', 'Narration Premium et paysages sonores contemplatifs.'], ['Livres spirituels', 'Découvrez une bibliothèque de lectures spirituelles.'], ['Meditbrary', 'Méditations guidées et exercices pour se recueillir.'], ['Prières', 'Retrouvez des prières pour différents moments et besoins.'], ['Espace personnel', 'Mode invité, profil, Premium et options Famille.']],
    theme: ['Un espace qui vous ressemble', 'Choisissez le mode clair ou sombre, adaptez la lecture et sélectionnez l’un des neuf univers colorés issus directement d’ORHAR.', 'Défaut'],
    release: ['App actuelle', '1.3', 'Le site reflète désormais l’expérience ORHAR réelle.', 'Cette mise à jour s’appuie sur l’application actuelle : ses cinq espaces, ses contenus quotidiens, sa bibliothèque spirituelle, ses voix et ses options de compte.', ['Explorer la galerie', 'Lire l’actualité']],
    footer: 'La Montagne de Lumière — Écriture, prière et cheminement en un seul lieu.', legal: ['Confidentialité', 'Conditions', 'Licences', 'Contact', 'Aperçu de l’app', 'GitHub'], copyright: 'Tous droits réservés.'
  }
};

Object.assign(locales, overrides);

const additionalModuleFeatures = {
  es:[['Inicio diario','Versículo, reflexión y lecturas litúrgicas.'],['Versiones de la Biblia','Elige la traducción y edición para cada lectura.'],['Lectura bíblica','Lee, busca y accede sin conexión.'],['Mi Camino','Camino litúrgico diario con lecturas y oración.'],['ParoBible','Escritura, Catecismo e historial de lecturas.'],['Planes de lectura','Crea o descarga un plan a tu ritmo.'],['SianAQuiz','Niveles, rachas, clasificaciones y quizzes.'],['Voces del sistema','Escucha con las voces disponibles en tu dispositivo.'],['Voces naturales y sonido','Narración Premium y ambientes contemplativos.'],['Libros espirituales','Una biblioteca de lecturas para profundizar.'],['Meditbrary','Meditaciones guiadas y ejercicios espirituales.'],['Oración','Oraciones para distintos momentos y necesidades.'],['Espacio personal','Perfil, Premium y opciones familiares.']],
  de:[['Tagesübersicht','Vers, Impuls und liturgische Lesungen.'],['Bibelausgaben','Wähle Übersetzung und Ausgabe für deine Lektüre.'],['Bibellektüre','Lesen, suchen und offline verfügbar.'],['Mein Weg','Täglicher liturgischer Weg mit Lesungen und Gebet.'],['ParoBible','Schrift, Katechismus und zuletzt gelesene Stellen.'],['Lesepläne','Erstelle oder lade einen Plan in deinem Tempo.'],['SianAQuiz','Stufen, Serien, Ranglisten und eigene Quiz.'],['Systemstimmen','Höre mit den Stimmen deines Geräts.'],['Natürliche Stimmen & Klang','Premium-Erzählstimmen und meditative Klangwelten.'],['Geistliche Bücher','Eine Bibliothek geistlicher Lektüre.'],['Meditbrary','Geführte Meditationen und geistliche Übungen.'],['Gebet','Gebete für verschiedene Momente und Anliegen.'],['Persönlicher Bereich','Profil, Premium und Familienoptionen.']],
  it:[['Inizio quotidiano','Versetto, pensiero e letture liturgiche.'],['Versioni della Bibbia','Scegli la traduzione e l’edizione per la lettura.'],['Lettura biblica','Leggi, cerca e accedi offline.'],['Il mio cammino','Percorso liturgico quotidiano con letture e preghiera.'],['ParoBible','Scrittura, Catechismo e letture recenti.'],['Piani di lettura','Crea o scarica un piano al tuo ritmo.'],['SianAQuiz','Livelli, serie, classifiche e quiz.'],['Voci di sistema','Ascolta con le voci disponibili sul dispositivo.'],['Voci naturali e suoni','Voci Premium e paesaggi sonori contemplativi.'],['Libri spirituali','Una biblioteca di letture per approfondire.'],['Meditbrary','Meditazioni guidate ed esercizi spirituali.'],['Preghiere','Preghiere per diversi momenti e necessità.'],['Spazio personale','Profilo, Premium e opzioni Famiglia.']],
  pt:[['Início diário','Versículo, reflexão e leituras litúrgicas.'],['Versões da Bíblia','Escolha a tradução e edição para sua leitura.'],['Leitura bíblica','Leia, pesquise e acesse offline.'],['Meu Caminho','Caminho litúrgico diário com leituras e oração.'],['ParoBible','Escritura, Catecismo e leituras recentes.'],['Planos de leitura','Crie ou baixe um plano no seu ritmo.'],['SianAQuiz','Níveis, sequências, classificações e quizzes.'],['Vozes do sistema','Ouça com as vozes disponíveis no dispositivo.'],['Vozes naturais e sons','Narração Premium e ambientes contemplativos.'],['Livros espirituais','Uma biblioteca de leituras para aprofundar.'],['Meditbrary','Meditações guiadas e exercícios espirituais.'],['Orações','Orações para diferentes momentos e necessidades.'],['Espaço pessoal','Perfil, Premium e opções Família.']],
  pl:[['Ekran dnia','Werset, myśl i czytania liturgiczne.'],['Przekłady Biblii','Wybierz przekład i wydanie do swojej lektury.'],['Lektura Biblii','Czytaj, wyszukuj i korzystaj offline.'],['Moja Droga','Codzienna ścieżka liturgiczna z czytaniami i modlitwą.'],['ParoBible','Pismo, Katechizm i ostatnio czytane fragmenty.'],['Plany czytania','Utwórz lub pobierz plan we własnym tempie.'],['SianAQuiz','Poziomy, serie, rankingi i własne quizy.'],['Głosy systemowe','Słuchaj głosów dostępnych na urządzeniu.'],['Głosy naturalne i dźwięki','Narracja Premium i kontemplacyjne pejzaże dźwiękowe.'],['Książki duchowe','Biblioteka lektur pogłębiających wiarę.'],['Meditbrary','Prowadzone medytacje i ćwiczenia duchowe.'],['Modlitwa','Modlitwy na różne chwile i potrzeby.'],['Przestrzeń osobista','Profil, Premium i opcje rodzinne.']]
};
for (const [code, features] of Object.entries(additionalModuleFeatures)) locales[code].features = features;

const languages = [['en','🇬🇧'],['fr','🇫🇷'],['es','🇪🇸'],['de','🇩🇪'],['it','🇮🇹'],['pt','🇵🇹'],['pl','🇵🇱']];
const icons = ['fa-house-chimney','fa-book-bible','fa-book-open-reader','fa-route','fa-book-open','fa-calendar-check','fa-puzzle-piece','fa-robot','fa-headphones','fa-book','fa-compass','fa-hands-praying','fa-user-shield'];
const themeColors = [['Default','#915b27'],['Blue','#0b9ac3'],['Sunset','#ef476f'],['Forest','#38a169'],['Violet','#845ec2'],['Oceanic','#088395'],['Earthy','#ac7060'],['Graphite','#4a4a4a'],['Sakura','#cc929d']];
const newsletter = {
  en: { eyebrow:'Stay connected', title:'Receive ORHAR updates', desc:'Be the first to receive important updates, release notes and spiritual reflections.', email:'your.email@example.com', button:'Subscribe', privacy:'We respect your privacy and will never send irrelevant information.', unsubscribe:'You can unsubscribe at any time by contacting us.', qr:'📱 Scan to subscribe' },
  fr: { eyebrow:'Restez informé', title:'Recevoir les alertes', desc:'Soyez le premier à recevoir les nouvelles importantes d’ORHAR, les notes de version et des réflexions spirituelles.', email:'votre.email@exemple.com', button:"S’abonner", privacy:'Nous respectons votre vie privée et ne vous enverrons jamais d’informations non pertinentes.', unsubscribe:'Vous pouvez vous désinscrire à tout moment en nous contactant.', qr:'📱 Scannez pour vous abonner' },
  es: { eyebrow:'Mantente informado', title:'Recibir novedades', desc:'Sé el primero en recibir actualizaciones importantes de ORHAR, notas de versión y reflexiones espirituales.', email:'tu.email@ejemplo.com', button:'Suscribirse', privacy:'Respetamos tu privacidad y nunca enviaremos información irrelevante.', unsubscribe:'Puedes darte de baja en cualquier momento contactándonos.', qr:'📱 Escanea para suscribirte' },
  de: { eyebrow:'Informiert bleiben', title:'ORHAR-Neuigkeiten erhalten', desc:'Erhalten Sie wichtige ORHAR-Neuigkeiten, Versionshinweise und geistliche Impulse.', email:'ihre.email@beispiel.de', button:'Abonnieren', privacy:'Wir respektieren Ihre Privatsphäre und senden Ihnen niemals irrelevante Informationen.', unsubscribe:'Sie können sich jederzeit abmelden, indem Sie uns kontaktieren.', qr:'📱 Scannen zum Abonnieren' },
  it: { eyebrow:'Resta aggiornato', title:'Ricevi gli aggiornamenti ORHAR', desc:'Ricevi aggiornamenti importanti di ORHAR, note di rilascio e riflessioni spirituali.', email:'tua.email@esempio.com', button:'Iscriviti', privacy:'Rispettiamo la tua privacy e non invieremo mai informazioni non pertinenti.', unsubscribe:'Puoi annullare l’iscrizione in qualsiasi momento contattandoci.', qr:'📱 Scansiona per iscriverti' },
  pt: { eyebrow:'Fique por dentro', title:'Receba novidades do ORHAR', desc:'Receba novidades importantes do ORHAR, notas de versão e reflexões espirituais.', email:'seu.email@exemplo.com', button:'Inscrever-se', privacy:'Respeitamos sua privacidade e nunca enviaremos informações irrelevantes.', unsubscribe:'Você pode cancelar a inscrição a qualquer momento entrando em contato conosco.', qr:'📱 Escaneie para se inscrever' },
  pl: { eyebrow:'Bądź na bieżąco', title:'Otrzymuj aktualizacje ORHAR', desc:'Otrzymuj ważne aktualizacje ORHAR, informacje o wydaniach i refleksje duchowe.', email:'twoj.email@przyklad.pl', button:'Zapisz się', privacy:'Szanujemy Twoją prywatność i nigdy nie wyślemy nieistotnych informacji.', unsubscribe:'Możesz zrezygnować w dowolnym momencie, kontaktując się z nami.', qr:'📱 Zeskanuj, aby się zapisać' }
};

const iconStory = {
  en: {
    title: 'Read the Icon',
    subtitle: 'Every element carries meaning — a sacred geography in a single glance.',
    cards: [
      ['fa-book-open', 'The Bible', 'Everything begins here: open, living pages ready to be entered. God’s Word is not closed; it waits for you.'],
      ['fa-bookmark', 'The Bookmark', 'A golden marker rests inside the open Bible. It says you will return; the Word is a place we come back to every day.'],
      ['fa-road', 'The Path', 'A golden road rises from the pages toward the summit. Each verse is a step, each chapter an ascent.'],
      ['fa-mountain', 'The Mountain', 'Sinai received the Law, Zion bears the promise, Tabor shone with glory. ORHAR places you on that mountain whenever you open the Word.'],
      ['fa-sun', 'The Halo', 'At the summit, a golden halo crowns the mountain — not as a reward, but as a gift: light shining over every page.']
    ]
  },
  fr: {
    title: "Lisez l’Icône",
    subtitle: 'Chaque élément porte un sens — une géographie sacrée en un seul regard.',
    cards: [
      ['fa-book-open', 'La Bible', "Tout commence ici. Des pages grandes ouvertes, vivantes, qui respirent. La Parole de Dieu n’est pas un livre fermé ; elle vous attend."],
      ['fa-bookmark', 'Le marque-page', "Un marque-page doré repose dans la Bible ouverte. Il dit que vous reviendrez. La Parole est un lieu où l’on revient chaque jour."],
      ['fa-road', 'Le chemin', "Une route dorée s’élève des pages jusqu’au sommet. Chaque verset devient un pas ; chaque chapitre, une ascension."],
      ['fa-mountain', 'La montagne', "Le Sinaï a reçu la Loi. Sion porte la promesse. Le Thabor a brillé de gloire. ORHAR vous place sur cette montagne chaque fois que vous ouvrez la Parole."],
      ['fa-sun', 'L’auréole', "Au sommet, une auréole dorée couronne la montagne — non comme récompense, mais comme un don : la lumière sur chaque page."]
    ]
  },
  es: {
    title: 'Lee el icono',
    subtitle: 'Cada elemento tiene un sentido: una geografía sagrada en una sola mirada.',
    cards: [
      ['fa-book-open', 'La Biblia', 'Todo empieza aquí: páginas abiertas, vivas, listas para ser habitadas. La Palabra de Dios no está cerrada; te espera.'],
      ['fa-bookmark', 'El marcador', 'Un marcador dorado descansa en la Biblia abierta. Dice que volverás. La Palabra es un lugar al que se regresa cada día.'],
      ['fa-road', 'El camino', 'Un camino dorado sube desde las páginas hasta la cima. Cada versículo es un paso; cada capítulo, una ascensión.'],
      ['fa-mountain', 'La montaña', 'El Sinaí recibió la Ley, Sion lleva la promesa y el Tabor brilló de gloria. ORHAR te sitúa en esa montaña al abrir la Palabra.'],
      ['fa-sun', 'La aureola', 'En la cima, una aureola dorada corona la montaña: no como recompensa, sino como don de luz sobre cada página.']
    ]
  },
  de: {
    title: 'Lies das Symbol',
    subtitle: 'Jedes Element trägt Bedeutung — eine heilige Landschaft auf einen Blick.',
    cards: [
      ['fa-book-open', 'Die Bibel', 'Alles beginnt hier: offene, lebendige Seiten, bereit betreten zu werden. Gottes Wort ist kein geschlossenes Buch; es wartet auf dich.'],
      ['fa-bookmark', 'Das Lesezeichen', 'Ein goldenes Lesezeichen ruht in der offenen Bibel. Es sagt: Du wirst zurückkehren. Das Wort ist ein Ort für jeden Tag.'],
      ['fa-road', 'Der Weg', 'Ein goldener Weg steigt von den Seiten zum Gipfel. Jeder Vers ist ein Schritt, jedes Kapitel ein Aufstieg.'],
      ['fa-mountain', 'Der Berg', 'Sinai empfing das Gesetz, Zion trägt die Verheißung, Tabor leuchtete in Herrlichkeit. ORHAR führt dich auf diesen Berg, wenn du das Wort öffnest.'],
      ['fa-sun', 'Der Heiligenschein', 'Auf dem Gipfel krönt ein goldener Schein den Berg — nicht als Belohnung, sondern als Gabe: Licht über jeder Seite.']
    ]
  },
  it: {
    title: 'Leggi l’icona',
    subtitle: 'Ogni elemento porta un senso: una geografia sacra in un solo sguardo.',
    cards: [
      ['fa-book-open', 'La Bibbia', 'Tutto comincia qui: pagine aperte, vive, pronte. La Parola di Dio non è un libro chiuso; ti attende.'],
      ['fa-bookmark', 'Il segnalibro', 'Un segnalibro dorato riposa nella Bibbia aperta. Dice che tornerai. La Parola è un luogo a cui si ritorna ogni giorno.'],
      ['fa-road', 'Il cammino', 'Una strada dorata sale dalle pagine verso la vetta. Ogni versetto è un passo, ogni capitolo un’ascesa.'],
      ['fa-mountain', 'La montagna', 'Il Sinai ricevette la Legge, Sion porta la promessa, il Tabor brillò di gloria. ORHAR ti pone su questa montagna quando apri la Parola.'],
      ['fa-sun', 'L’aureola', 'In cima, un’aureola dorata corona la montagna — non come ricompensa, ma come dono: luce su ogni pagina.']
    ]
  },
  pt: {
    title: 'Leia o ícone',
    subtitle: 'Cada elemento carrega um sentido — uma geografia sagrada em um só olhar.',
    cards: [
      ['fa-book-open', 'A Bíblia', 'Tudo começa aqui: páginas abertas, vivas, prontas. A Palavra de Deus não é um livro fechado; ela espera por você.'],
      ['fa-bookmark', 'O marcador', 'Um marcador dourado repousa na Bíblia aberta. Ele diz que você voltará. A Palavra é um lugar ao qual se retorna todos os dias.'],
      ['fa-road', 'O caminho', 'Uma estrada dourada sobe das páginas até o cume. Cada versículo é um passo; cada capítulo, uma ascensão.'],
      ['fa-mountain', 'A montanha', 'O Sinai recebeu a Lei, Sião carrega a promessa, o Tabor brilhou em glória. ORHAR coloca você nessa montanha quando abre a Palavra.'],
      ['fa-sun', 'A auréola', 'No cume, uma auréola dourada coroa a montanha — não como recompensa, mas como dom: luz sobre cada página.']
    ]
  },
  pl: {
    title: 'Odczytaj ikonę',
    subtitle: 'Każdy element niesie znaczenie — święta geografia w jednym spojrzeniu.',
    cards: [
      ['fa-book-open', 'Biblia', 'Wszystko zaczyna się tutaj: otwarte, żywe strony, gotowe do wejścia. Słowo Boże nie jest zamkniętą księgą; czeka na ciebie.'],
      ['fa-bookmark', 'Zakładka', 'Złota zakładka spoczywa w otwartej Biblii. Mówi, że wrócisz. Słowo jest miejscem codziennego powrotu.'],
      ['fa-road', 'Droga', 'Złota droga wznosi się ze stron ku szczytowi. Każdy werset jest krokiem, każdy rozdział wejściem wyżej.'],
      ['fa-mountain', 'Góra', 'Synaj otrzymał Prawo, Syjon niesie obietnicę, Tabor zajaśniał chwałą. ORHAR stawia cię na tej górze, gdy otwierasz Słowo.'],
      ['fa-sun', 'Aureola', 'Na szczycie złota aureola wieńczy górę — nie jako nagroda, lecz jako dar: światło nad każdą stroną.']
    ]
  }
};

const biblicalAnchors = {
  en: {
    title: 'The Word Behind the Name',
    subtitle: 'Five biblical anchors that illuminate the meaning of ORHAR',
    previous: 'Previous',
    next: 'Next',
    slides: [
      ['Genesis 1:3', '“God said, Let there be light — and there was light.”', 'The first word of creation is the light ORHAR carries.'],
      ['Psalm 119:105', '“Your word is a lamp to my feet and a light to my path.”', 'The golden path in the icon. The Word as a living lamp.'],
      ['Isaiah 60:19', '“The Lord will be your everlasting light.”', 'The halo above the summit. A light that never goes out.'],
      ['John 8:12', '“I am the light of the world. Whoever follows me will not walk in darkness.”', 'The one who climbs the mountain does not climb alone.'],
      ['Matthew 5:14', '“You are the light of the world. A city set on a hill cannot be hidden.”', 'The mountain lit from above becomes a beacon for others. ORHAR too.']
    ]
  },
  fr: {
    title: 'La Parole derrière le Nom',
    subtitle: 'Cinq ancres bibliques qui illuminent la signification d’ORHAR',
    previous: 'Précédent',
    next: 'Suivant',
    slides: [
      ['Genèse 1, 3', '« Dieu dit : Que la lumière soit — et la lumière fut. »', 'La première parole de la création est la lumière que porte ORHAR.'],
      ['Psaume 119, 105', '« Ta parole est une lampe à mes pieds, et une lumière sur mon sentier. »', 'Le chemin doré dans notre icône. La Parole comme lampe vivante.'],
      ['Isaïe 60, 19', '« L’Éternel sera ta lumière éternelle. »', 'L’auréole au-dessus du sommet. Une lumière qui ne s’éteint jamais.'],
      ['Jean 8, 12', '« Je suis la lumière du monde ; celui qui me suit ne marchera pas dans les ténèbres. »', 'Celui qui gravit la montagne ne gravit pas seul.'],
      ['Matthieu 5, 14', '« Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée. »', 'La montagne éclairée d’en haut devient un phare pour les autres. ORHAR aussi.']
    ]
  },
  es: {
    title: 'La Palabra detrás del Nombre',
    subtitle: 'Cinco anclas bíblicas que iluminan el significado de ORHAR',
    previous: 'Anterior',
    next: 'Siguiente',
    slides: [
      ['Génesis 1, 3', '« Dijo Dios: Sea la luz. Y fue la luz. »', 'La primera palabra de la creación es la luz que ORHAR lleva.'],
      ['Salmo 119, 105', '« Tu palabra es lámpara para mis pies y luz en mi sendero. »', 'El camino dorado del icono. La Palabra como lámpara viva.'],
      ['Isaías 60, 19', '« El Señor será tu luz eterna. »', 'La aureola sobre la cima. Una luz que no se apaga.'],
      ['Juan 8, 12', '« Yo soy la luz del mundo; quien me sigue no caminará en tinieblas. »', 'Quien sube la montaña no sube solo.'],
      ['Mateo 5, 14', '« Ustedes son la luz del mundo. No se puede ocultar una ciudad situada en un monte. »', 'La montaña iluminada desde lo alto se vuelve faro para otros. ORHAR también.']
    ]
  },
  de: {
    title: 'Das Wort hinter dem Namen',
    subtitle: 'Fünf biblische Anker, die die Bedeutung von ORHAR erhellen',
    previous: 'Zurück',
    next: 'Weiter',
    slides: [
      ['Genesis 1,3', '„Gott sprach: Es werde Licht. Und es wurde Licht.“', 'Das erste Wort der Schöpfung ist das Licht, das ORHAR trägt.'],
      ['Psalm 119,105', '„Dein Wort ist meines Fußes Leuchte und ein Licht auf meinem Weg.“', 'Der goldene Weg im Symbol. Das Wort als lebendige Lampe.'],
      ['Jesaja 60,19', '„Der Herr wird dein ewiges Licht sein.“', 'Der Schein über dem Gipfel. Ein Licht, das nie erlischt.'],
      ['Johannes 8,12', '„Ich bin das Licht der Welt. Wer mir nachfolgt, wird nicht in der Finsternis gehen.“', 'Wer den Berg hinaufsteigt, steigt nicht allein.'],
      ['Matthäus 5,14', '„Ihr seid das Licht der Welt. Eine Stadt, die auf einem Berg liegt, kann nicht verborgen bleiben.“', 'Der von oben erleuchtete Berg wird zum Leuchtfeuer für andere. ORHAR ebenso.']
    ]
  },
  it: {
    title: 'La Parola dietro il Nome',
    subtitle: 'Cinque ancore bibliche che illuminano il significato di ORHAR',
    previous: 'Precedente',
    next: 'Successivo',
    slides: [
      ['Genesi 1,3', '« Dio disse: Sia la luce. E la luce fu. »', 'La prima parola della creazione è la luce che ORHAR porta.'],
      ['Salmo 119,105', '« Lampada per i miei passi è la tua parola, luce sul mio cammino. »', 'Il cammino dorato nell’icona. La Parola come lampada viva.'],
      ['Isaia 60,19', '« Il Signore sarà per te luce eterna. »', 'L’aureola sopra la vetta. Una luce che non si spegne.'],
      ['Giovanni 8,12', '« Io sono la luce del mondo; chi segue me non camminerà nelle tenebre. »', 'Chi sale la montagna non sale da solo.'],
      ['Matteo 5,14', '« Voi siete la luce del mondo. Non può restare nascosta una città posta sopra un monte. »', 'La montagna illuminata dall’alto diventa faro per gli altri. Anche ORHAR.']
    ]
  },
  pt: {
    title: 'A Palavra por trás do Nome',
    subtitle: 'Cinco âncoras bíblicas que iluminam o significado de ORHAR',
    previous: 'Anterior',
    next: 'Seguinte',
    slides: [
      ['Gênesis 1,3', '« Deus disse: Faça-se a luz. E a luz se fez. »', 'A primeira palavra da criação é a luz que ORHAR carrega.'],
      ['Salmo 119,105', '« Tua palavra é lâmpada para os meus pés e luz para o meu caminho. »', 'O caminho dourado no ícone. A Palavra como lâmpada viva.'],
      ['Isaías 60,19', '« O Senhor será a tua luz eterna. »', 'A auréola acima do cume. Uma luz que não se apaga.'],
      ['João 8,12', '« Eu sou a luz do mundo; quem me segue não andará nas trevas. »', 'Quem sobe a montanha não sobe sozinho.'],
      ['Mateus 5,14', '« Vós sois a luz do mundo. Não se pode esconder uma cidade situada sobre um monte. »', 'A montanha iluminada do alto se torna farol para outros. ORHAR também.']
    ]
  },
  pl: {
    title: 'Słowo ukryte w Nazwie',
    subtitle: 'Pięć biblijnych kotwic, które rozświetlają znaczenie ORHAR',
    previous: 'Poprzedni',
    next: 'Następny',
    slides: [
      ['Rodzaju 1,3', '„Bóg rzekł: Niech stanie się światłość. I stała się światłość.”', 'Pierwszym słowem stworzenia jest światło, które niesie ORHAR.'],
      ['Psalm 119,105', '„Twoje słowo jest lampą dla moich stóp i światłem na mojej ścieżce.”', 'Złota droga w ikonie. Słowo jako żywa lampa.'],
      ['Izajasza 60,19', '„Pan będzie twoją wieczną światłością.”', 'Aureola nad szczytem. Światło, które nie gaśnie.'],
      ['Jana 8,12', '„Ja jestem światłością świata. Kto idzie za Mną, nie będzie chodził w ciemności.”', 'Ten, kto wchodzi na górę, nie idzie sam.'],
      ['Mateusza 5,14', '„Wy jesteście światłem świata. Nie może się ukryć miasto położone na górze.”', 'Góra oświetlona z wysoka staje się latarnią dla innych. ORHAR także.']
    ]
  }
};

function pathCards(items) {
  return items.map((item, index) => `<article class="path-card reveal"><span class="path-number">0${index + 1}</span><h3>${item[0]}</h3><p>${item[1]}</p><ul>${item[2].map(value => `<li>${value}</li>`).join('')}</ul></article>`).join('');
}

function story(data, images, klass = '') {
  return `<article class="story-row reveal"><div class="story-copy"><span class="story-kicker">${data[0]}</span><h3>${data[1]}</h3><p>${data[2]}</p><div class="story-list">${data[3].map(value => `<span>${value}</span>`).join('')}</div></div><div class="story-visual ${klass}">${images.map(({src,alt}) => `<img src="${src}" alt="${alt}" loading="lazy" width="720" height="1600">`).join('')}</div></article>`;
}

function newsletterSection(code) {
  const n = newsletter[code] || newsletter.en;
  return `<section class="section home-newsletter-section"><div class="section-inner"><article class="home-newsletter reveal"><div class="home-newsletter-copy"><p class="eyebrow">${n.eyebrow}</p><h2>${n.title}</h2><p>${n.desc}</p><form class="home-newsletter-form" action="https://formsubmit.co/contact@orhar.com" method="POST"><input type="hidden" name="_subject" value="[ORHAR] Newsletter subscription"><input type="hidden" name="_template" value="table"><input type="hidden" name="_captcha" value="false"><input type="hidden" name="language" value="${code}"><input type="email" name="email" placeholder="${n.email}" required><button type="submit">${n.button}</button></form><p class="home-newsletter-note">${n.privacy}</p><p class="home-newsletter-note">${n.unsubscribe}</p></div><div class="home-newsletter-qr"><img src="/${code}/qr-subscribe-${code}.png" alt="${n.qr}" loading="lazy" width="1148" height="1148"><p>${n.qr}</p></div></article></div></section>`;
}

function iconStorySection(code) {
  const storyCopy = iconStory[code] || iconStory.en;
  return `<section class="section icon-story" id="story"><div class="section-inner"><div class="section-heading center reveal"><p class="eyebrow">ORHAR</p><h2 class="section-title">${storyCopy.title}</h2><p class="section-intro">${storyCopy.subtitle}</p></div><div class="icon-story-grid">${storyCopy.cards.map(([icon,title,text]) => `<article class="icon-story-card reveal"><span class="icon-story-symbol"><i class="fa-solid ${icon}"></i></span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div></div></section>`;
}

function biblicalAnchorsSection(code) {
  const copy = biblicalAnchors[code] || biblicalAnchors.en;
  const total = copy.slides.length;
  const slides = copy.slides.map(([ref, text, note]) =>
    `<div class="anchor-slide"><div class="anchor-ref">${ref}</div><p class="anchor-text">${text}</p><div class="anchor-divider"></div><p class="anchor-note">${note}</p></div>`
  ).join('');
  const dots = copy.slides.map((_, i) =>
    `<span class="anchor-dot${i === 0 ? ' active' : ''}" onclick="goToAnchor(${i})"></span>`
  ).join('');
  const script = `<script>
(function(){
  var cur=0,total=${total};
  function upd(){
    var t=document.getElementById('anchorsTrack');
    if(t)t.style.transform='translateX(-'+(cur*100)+'%)';
    document.querySelectorAll('.anchor-dot').forEach(function(d,i){d.classList.toggle('active',i===cur);});
  }
  window.moveAnchor=function(dir){cur=(cur+dir+total)%total;upd();};
  window.goToAnchor=function(i){cur=i;upd();};
  setInterval(function(){cur=(cur+1)%total;upd();},6000);
})();
<\/script>`;
  return `<section class="section biblical-anchors" id="anchors"><div class="section-inner"><div class="section-heading center reveal"><p class="eyebrow">אוֹר הַר</p><h2 class="section-title">${copy.title}</h2><p class="section-intro">${copy.subtitle}</p></div><div class="anchors-canvas reveal"><div class="anchors-track" id="anchorsTrack">${slides}</div></div><div class="anchors-nav"><button class="anchor-arrow" onclick="moveAnchor(-1)" aria-label="${copy.previous}">&#10094;</button>${dots}<button class="anchor-arrow" onclick="moveAnchor(1)" aria-label="${copy.next}">&#10095;</button></div></div>${script}</section>`;
}

const ogLocale = {en:'en_US',fr:'fr_FR',es:'es_ES',de:'de_DE',it:'it_IT',pt:'pt_PT',pl:'pl_PL'};

function render(code, t) {
  const u = ui[code];
  const brand = brandStory[code];
  const screens = localizedScreenshotPaths[code];
  const title = `ORHAR — ${t.title} ${t.accent}`;
  return `<!doctype html>
<html lang="${code}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><meta name="description" content="${t.hero}"><meta name="theme-color" content="#0b182a"><meta name="author" content="ORHAR">
<link rel="canonical" href="https://orhar.com/${code}/">${languages.map(([value]) => `<link rel="alternate" hreflang="${value}" href="https://orhar.com/${value}/">`).join('')}<link rel="alternate" hreflang="x-default" href="https://orhar.com/en/">
<meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${t.hero}"><meta property="og:url" content="https://orhar.com/${code}/"><meta property="og:image" content="https://orhar.com/og-image.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:site_name" content="ORHAR"><meta property="og:locale" content="${ogLocale[code]||'en_US'}"><meta property="fb:app_id" content="826566160013437">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@orhar_app"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${t.hero}"><meta name="twitter:image" content="https://orhar.com/og-image.png">
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-96x96.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1A2E4A"><meta name="msapplication-TileColor" content="#1A2E4A"><link rel="apple-touch-startup-image" href="/apple-splash-2048.png" media="(device-width:1024px) and (device-height:1366px) and (-webkit-device-pixel-ratio:2)"><link rel="apple-touch-startup-image" href="/apple-splash-2048.png" media="(device-width:430px) and (device-height:932px) and (-webkit-device-pixel-ratio:3)"><link rel="apple-touch-startup-image" href="/apple-splash-2048.png" media="(device-width:393px) and (device-height:852px) and (-webkit-device-pixel-ratio:3)"><link rel="apple-touch-startup-image" href="/apple-splash-2048.png" media="(device-width:375px) and (device-height:667px) and (-webkit-device-pixel-ratio:2)"><link rel="manifest" href="/manifest.json">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"><link rel="stylesheet" href="/site.css?v=23">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"ORHAR","applicationCategory":"ReligiousApplication","operatingSystem":"Android","description":"${t.hero.replace(/"/g,'&quot;')}","url":"https://orhar.com/${code}/","image":"https://orhar.com/og-image.png","offers":{"@type":"Offer","price":"0","priceCurrency":"EUR"},"author":{"@type":"Organization","name":"ORHAR","url":"https://orhar.com"}}<\/script>
</head><body><a class="skip-link" href="#main">${u.skip}</a>
<header class="site-header"><div class="header-inner"><a class="brand" href="/${code}/index.html"><img src="/logo.png" alt=""><strong>ORHAR</strong></a><nav class="nav" data-nav aria-label="${u.nav}"><a href="#experience">${t.nav[0]}</a><a href="#daily">${t.nav[1]}</a><a href="#features">${t.nav[2]}</a><a href="/${code}/preview.html">${navGalleryLabels[code]}</a><a href="/${code}/actuality.html">${t.nav[3]}</a><a href="/contact.html">${u.contact}</a></nav><select class="language" data-language aria-label="${u.language}">${languages.map(([value, flag]) => `<option value="${value}" ${value === code ? 'selected' : ''}>${flag} ${value.toUpperCase()}</option>`).join('')}</select><button class="mode-toggle" data-mode-toggle type="button"><span aria-hidden="true">☾</span></button><button class="menu-button" data-menu aria-label="Menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button></div></header>
<main id="main"><a id="update-container" href="/${code}/actuality.html" style="display:none"></a><section class="hero"><div class="hero-inner"><div><p class="eyebrow">${t.eyebrow}</p><h1>${t.title} <em>${t.accent}</em></h1><p class="hero-copy">${t.hero}</p><div class="hero-actions"><a class="button button-primary" href="#experience">${t.actions[0]} <span aria-hidden="true">↓</span></a><a class="button button-secondary" href="/${code}/app.html">${t.actions[1]} <span aria-hidden="true">↗</span></a></div><div class="status-line">${t.status.map(value => `<span><i></i>${value}</span>`).join('')}</div></div><div class="phone-stage" aria-label="${u.phone}"><span class="orb orb-a"></span><span class="orb orb-b"></span><figure class="phone phone-left"><img src="${screens.bible}" alt="ORHAR — ${u.bible}" width="720" height="1600"></figure><figure class="phone phone-main"><video autoplay loop muted playsinline webkit-playsinline preload="auto" poster="${screens.home}" width="720" height="1600" aria-label="ORHAR — ${u.home}"><source src="/assets/videos/${code}/teaser.mp4" type="video/mp4"><source src="/assets/videos/${code}/teaser.webm" type="video/webm"><img src="${screens.home}" alt="ORHAR — ${u.home}" width="720" height="1600"></video></figure><figure class="phone phone-right"><img src="${screens.parobible}" alt="ORHAR — ${u.phone}" width="720" height="1600"></figure></div></div></section>
<aside class="facts"><div class="facts-inner">${t.facts.map(([big,small]) => `<div class="fact"><strong>${big}</strong><span>${small}</span></div>`).join('')}</div></aside>
<section class="brand-story section"><div class="section-inner brand-story-grid"><div class="brand-mark reveal"><img src="/logo.png" alt="" loading="lazy" width="300" height="300"><span>אוֹר הַר</span></div><div class="reveal"><p class="eyebrow">${brand[0]}</p><h2 class="section-title">${brand[1]}</h2><p class="section-intro">${brand[2]}</p></div></div></section>
${iconStorySection(code)}
${biblicalAnchorsSection(code)}
<section class="section" id="experience"><div class="section-inner"><div class="section-heading center reveal"><p class="eyebrow">ORHAR 1.3</p><h2 class="section-title">${t.journey[0]}</h2><p class="section-intro">${t.journey[1]}</p></div><div class="paths">${pathCards(t.paths)}</div></div></section>
<section class="section showcase" id="daily"><div class="section-inner">${story(t.real,[{src:screens.home,alt:`ORHAR — ${u.home}`}])}${story(t.depth,[{src:screens.bible,alt:`ORHAR — ${u.bible}`},{src:screens.reader,alt:`ORHAR — ${u.reader}`}],'double')}${story(t.beyond,[{src:screens.books,alt:`ORHAR — ${t.features[7][0]}`}])}</div></section>
<section class="section" id="features"><div class="section-inner"><div class="section-heading reveal"><p class="eyebrow">${t.featureTitle[0]}</p><h2 class="section-title">${t.featureTitle[1]}</h2></div><div class="feature-grid">${t.features.map((item,index) => `<article class="feature reveal"><span class="feature-icon"><i class="fa-solid ${icons[index]}"></i></span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join('')}</div></div></section>
<section class="section themes"><div class="section-inner theme-layout"><div class="reveal"><p class="eyebrow">${u.personal}</p><h2 class="section-title">${t.theme[0]}</h2><p class="section-intro">${t.theme[1]}</p><div class="palette" aria-label="${u.themes}">${themeColors.map(([,color],index) => `<button type="button" data-theme="${color}" style="background:${color}" aria-label="${u.themeNames[index]}" aria-pressed="${index === 0}"></button>`).join('')}</div><div class="theme-label" data-theme-label>${t.theme[2]}</div></div><div class="theme-preview reveal" data-theme-preview><div class="preview-bar"></div><div class="preview-card"><small>ORHAR · ${u.psalm}</small><blockquote>“${u.quote}”</blockquote><div class="preview-progress"></div></div></div></div></section>
${newsletterSection(code)}
<section class="section"><div class="section-inner"><article class="release-card reveal"><div class="release-side"><span>${t.release[0]}</span><strong>${t.release[1]}</strong></div><div class="release-body"><h2>${t.release[2]}</h2><p>${t.release[3]}</p><div class="release-links"><a class="button button-primary" href="/${code}/preview.html">${t.release[4][0]}</a><a class="button button-secondary" href="/${code}/actuality.html">${t.release[4][1]}</a></div></div></article></div></section></main>
<footer class="site-footer"><div class="section-inner"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="/${code}/index.html"><img src="/logo.png" alt=""><strong>ORHAR</strong></a><p>${t.footer}</p><p class="footer-verse">« ${u.quote} » <span class="footer-verse-ref">— ${u.psalm}:105</span></p></div><nav class="footer-links" aria-label="${u.footer}">${[['/privacy.html',t.legal[0]],['/terms.html',t.legal[1]],['/licenses.html',t.legal[2]],['/contact.html',t.legal[3]],[`/${code}/preview.html`,t.legal[4]]].map(([href,label]) => `<a href="${href}">${label}</a>`).join('')}</nav></div><div class="footer-bottom"><span>© 2026 ORHAR. ${t.copyright}</span><span>אוֹר הַר · The Mountain of Light</span></div></div></footer><script src="/site.js?v=24" defer></script><script>(function(){fetch('/actuality-data.json').then(function(r){return r.ok?r.json():null;}).then(function(d){if(!d||!d.updates||!d.updates.length)return;var lang=document.documentElement.lang||'en';var latest=d.updates.sort(function(a,b){return b.date.localeCompare(a.date);})[0];var tr=latest.translations[lang]||latest.translations['en'];if(!tr)return;var el=document.getElementById('update-container');if(!el)return;el.innerHTML='<div class="update-badge">'+tr.badge+'</div><p class="update-text">'+tr.title+'</p>';el.style.display='';}).catch(function(){});})();</script></body></html>`;
}

for (const [code, locale] of Object.entries(locales)) {
  writeFileSync(resolve(root, code, 'index.html'), render(code, locale));
}
writeSecondaryPages(root);
writeNewsPages(root, locales);
