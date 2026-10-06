import dims from './images.json' with { type: 'json' };

// Project content taken from the previous celinevanhaaren.com.
// `cover` and `lens` are indexes into the project's images (public/images/<slug>-NN.webp).
// `before` may later hold a real before-photo index per project; without it the lens
// reveals the hand-drawn "design" rendering of the same photograph.
const raw = [
  {
    slug: 'xx',
    title: 'Project XX',
    location: { nl: 'Van Baerlestraat, Amsterdam', en: 'Van Baerlestraat, Amsterdam' },
    lens: 0,
  },
  {
    slug: 'xxix',
    title: 'Project XXIX',
    location: { nl: 'Michelangelostraat, Amsterdam', en: 'Michelangelostraat, Amsterdam' },
    lens: 1,
  },
  {
    slug: 'xxii',
    title: 'Project XXII',
    location: { nl: 'Vrijheidslaan, Amsterdam', en: 'Vrijheidslaan, Amsterdam' },
    lens: 4,
  },
  { slug: 'iii', title: 'Project III', location: { nl: 'Amsterdam', en: 'Amsterdam' }, lens: 0 },
  { slug: 'xix', title: 'Project XIX', location: { nl: 'Amsterdam', en: 'Amsterdam' }, lens: 5 },
  { slug: 'viii', title: 'Project VIII', location: { nl: 'Amsterdam', en: 'Amsterdam' }, lens: 0 },
  { slug: 'xviii', title: 'Project XVIII', location: { nl: 'Amsterdam', en: 'Amsterdam' }, lens: 0 },
  {
    slug: 'xfv',
    title: 'Project XFV',
    location: { nl: 'Wirdum, Friesland', en: 'Wirdum, Friesland' },
    heading: {
      nl: 'Luxe familiewoning in Friesland met klassieke elementen',
      en: 'A refined family home in Friesland with classic elements',
    },
    body: {
      nl: [
        'In Friesland kreeg een vijftien jaar oude woning een complete renovatie door Céline van Haaren Interiors. Het resultaat is een warm familiehuis met een luxe uitstraling, waarin moderne en klassieke elementen harmonieus samenkomen.',
        'De ruime, donkerbruin-eiken keuken met travertin blad vormt samen met het grote kookeiland het centrale hart van de woning. Een stijlvolle gashaard verbindt de keuken en woonkamer op natuurlijke wijze en creëert sfeer in beide ruimtes.',
        'Met oog voor detail en hoogwaardige materialen werd deze woning volledig opnieuw ingericht tot een karaktervol en tijdloos thuis voor het hele gezin.',
      ],
      en: [
        'In Friesland, a fifteen-year-old house was completely renovated by Céline van Haaren Interiors. The result is a warm family home with a luxurious character, where modern and classic elements come together in harmony.',
        'The generous dark-oak kitchen with its travertine worktop and large cooking island forms the heart of the home. An elegant gas fireplace connects kitchen and living room naturally and brings atmosphere to both.',
        'With an eye for detail and high-quality materials, the house was entirely reimagined as a characterful, timeless home for the whole family.',
      ],
    },
    cover: 0,
    lens: 2,
  },
  {
    slug: 'xmc',
    title: 'Project XMC',
    location: { nl: 'Chopinstraat, Amsterdam', en: 'Chopinstraat, Amsterdam' },
    heading: {
      nl: 'Engelse sfeer en moderne elegantie',
      en: 'English atmosphere and modern elegance',
    },
    body: {
      nl: [
        'Céline van Haaren Interiors bracht bij dit project de warme, klassieke Engelse sfeer samen met een modern en natuurlijk interieur. Warme neutrale kleuren zoals beige en taupe vormen de basis, gecombineerd met matzwart en bronzen accenten voor extra warmte en karakter.',
        'Natuurlijke materialen als eikenhout, marmer en linnen creëren een tijdloze en sfeervolle ambiance. Subtiele details zoals messing grepen in de keuken, stoffen wandlampen en een opvallende traploper met een Engelse knipoog geven het interieur een persoonlijke touch.',
        'Dankzij zorgvuldig gekozen accessoires, zoals lampenkappen van Duran Interiors op Neptune-lampen, ontstaat een harmonieus geheel waarin stijl en sfeer hand in hand gaan.',
      ],
      en: [
        'In this project Céline van Haaren Interiors brought the warm, classic English atmosphere together with a modern, natural interior. Warm neutrals such as beige and taupe form the base, paired with matte black and bronze accents for added warmth and character.',
        'Natural materials such as oak, marble and linen create a timeless, atmospheric setting. Subtle details — brass handles in the kitchen, fabric wall lights and a striking stair runner with an English wink — give the interior a personal touch.',
        'Carefully chosen accessories, such as Duran Interiors shades on Neptune lamps, complete a harmonious whole in which style and atmosphere go hand in hand.',
      ],
    },
    lens: 2,
  },
  {
    slug: 'ivii',
    title: 'Project IVII',
    location: { nl: 'Amsterdam-Zuid', en: 'Amsterdam-Zuid' },
    heading: {
      nl: 'Luxe appartement in Amsterdam-Zuid met op maat gemaakt interieur',
      en: 'A luxury apartment in Amsterdam-Zuid with a bespoke interior',
    },
    body: {
      nl: [
        'Voor dit luxe appartement in Amsterdam-Zuid ontwierp Céline van Haaren Interiors een stijlvol en functioneel interieur met een rustige, natuurlijke uitstraling. Warme tinten travertin komen terug in zowel de keuken als de badkamer, wat zorgt voor een tijdloos geheel met een verfijnde uitstraling.',
        'De open indeling creëert een harmonieuze verbinding tussen wonen, koken en werken. De keuken vormt het visuele hart van de woning, met strakke lijnen en een serene sfeer. Ook de comfortabele werkplek en de sfeervolle eetbank zijn naadloos geïntegreerd in het ontwerp.',
        'Met oog voor detail, hoogwaardige materialen en lichte kleurtonen ontstaat een interieur waarin rust, luxe en leefbaarheid samenkomen.',
      ],
      en: [
        'For this luxury apartment in Amsterdam-Zuid, Céline van Haaren Interiors designed a stylish, functional interior with a calm, natural feel. Warm shades of travertine return in both kitchen and bathroom, creating a timeless, refined whole.',
        'The open layout connects living, cooking and working in harmony. The kitchen is the visual heart of the home, with clean lines and a serene atmosphere. A comfortable workspace and an inviting dining bench are seamlessly integrated into the design.',
        'An eye for detail, fine materials and light tones result in an interior where calm, luxury and liveability meet.',
      ],
    },
    lens: 0,
  },
  {
    slug: 'xv',
    title: 'Project XV',
    location: { nl: 'Loftvilla, Gelderland', en: 'Loft villa, Gelderland' },
    heading: {
      nl: 'Een kunstwerk om mooi oud in te worden',
      en: 'A work of art to grow old in beautifully',
    },
    body: {
      nl: [
        'Project Gelderland is een prachtige gelijkvloerse loftvilla waar luxe en stijl samenkomen. Met een strak afgewerkte buitenkant en een open, modern interieur creëerde Céline van Haaren Interiors een warme, uitnodigende leefruimte.',
        'De indrukwekkende keuken, compleet met hoogwaardige apparatuur en een grote wijnklimaatkast, is een prachtig onderdeel van het ontwerp. Het subtiele nisje in de woonkamer en de unieke wijnkelder maken dit project extra bijzonder. Overal in de villa zorgen gashaarden en natuursteen voor een sfeervolle en luxe uitstraling.',
      ],
      en: [
        'Project Gelderland is a beautiful single-storey loft villa where luxury and style meet. With a crisply finished exterior and an open, modern interior, Céline van Haaren Interiors created a warm, inviting living space.',
        'The impressive kitchen, complete with high-end appliances and a large wine climate cabinet, is a highlight of the design. The subtle niche in the living room and the unique wine cellar make the project truly special. Throughout the villa, gas fireplaces and natural stone lend an atmospheric, luxurious feel.',
      ],
    },
    lens: 1,
  },
  {
    slug: 'ii',
    title: 'Project II',
    location: { nl: 'Hilversum', en: 'Hilversum' },
    heading: {
      nl: 'Stijlvolle familievilla met karaktervolle details',
      en: 'An elegant family villa with characterful details',
    },
    body: {
      nl: [
        'Voor een gezin van vijf gaf Céline van Haaren Interiors een ruime villa in Hilversum een complete make-over, met behoud van het karakter en de charme van het oorspronkelijke huis. De imposante hal met groot trappenhuis en vide vormt een indrukwekkend welkom, verlicht door een statementlamp die direct de toon zet.',
        'In de masterbedroom leidt een elegante kastenwand naar de en-suitebadkamer, waarin luxe marmer en een verborgen toilet naadloos zijn geïntegreerd. De originele houten balken zijn behouden en gecombineerd met moderne elementen zoals betonciré, waardoor oud en nieuw perfect samensmelten.',
        'Ook de keuken kreeg een moderne, luxe uitstraling, passend bij de rest van het interieur. Een woning waarin stijl, comfort en functionaliteit samenkomen voor het hele gezin.',
      ],
      en: [
        'For a family of five, Céline van Haaren Interiors gave a spacious villa in Hilversum a complete make-over while keeping the character and charm of the original house. The grand hall with its large staircase and void makes an impressive welcome, lit by a statement pendant that sets the tone.',
        'In the master bedroom an elegant wall of wardrobes leads to the en-suite bathroom, where luxurious marble and a concealed toilet are seamlessly integrated. The original timber beams were kept and combined with modern elements such as béton ciré, so old and new blend perfectly.',
        'The kitchen, too, was given a modern, luxurious look in keeping with the rest of the interior. A home where style, comfort and function come together for the whole family.',
      ],
    },
    lens: 5,
  },
  {
    slug: 'xvi',
    title: 'Project XVI',
    location: { nl: 'Amsterdam-Oost', en: 'Amsterdam-Oost' },
    heading: {
      nl: 'Luxe maatwerkinterieur in Amsterdam-Oost',
      en: 'A bespoke interior in Amsterdam-Oost',
    },
    body: {
      nl: [
        'In dit stijlvolle huis in Amsterdam-Oost realiseerde Céline van Haaren Interiors een warm en harmonieus interieur waarin luxe en functionaliteit perfect samenkomen. De op maat gemaakte keuken van eikenhout vormt het hart van de woning, met een uitnodigend kookeiland en een elegante wijnklimaatkast als eyecatcher.',
        'Naast de keuken ontstond een rustige werkplek in dezelfde materialen, voor een consistent en praktisch geheel. Met sfeervolle Maretti-verlichting, natuurlijke materialen en oog voor detail is dit een interieur dat inspireert en aanvoelt als thuiskomen.',
      ],
      en: [
        'In this elegant house in Amsterdam-Oost, Céline van Haaren Interiors created a warm, harmonious interior where luxury and function meet. The bespoke oak kitchen is the heart of the home, with an inviting island and an elegant wine climate cabinet as its focal point.',
        'Beside the kitchen, a calm workspace in the same materials keeps the whole consistent and practical. With atmospheric Maretti lighting, natural materials and an eye for detail, this is an interior that inspires and feels like coming home.',
      ],
    },
    lens: 4,
  },
  {
    slug: 'vvx',
    title: 'Project VVX',
    location: { nl: 'Amsterdam', en: 'Amsterdam' },
    heading: {
      nl: 'Warm familiehuis met een uniek ontwerp',
      en: 'A warm family home with a singular design',
    },
    body: {
      nl: [
        'Voor een gezin dat verhuisde van Naarden naar Amsterdam ontwierp Céline van Haaren Interiors een stijlvol en persoonlijk droomhuis. Het resultaat is een warm familiehuis vol karakter en bijzondere elementen.',
        'Blikvanger in de leefruimte is het vierkante kookeiland, dat niet alleen functioneel is maar ook zorgt voor een uitnodigende sfeer: je zit er gezellig omheen, in plaats van op een rij. De doorkijkhaard vormt een stijlvolle verbinding tussen de woonkamer en het kantoor, waardoor openheid en comfort samenkomen.',
        'Dit Amsterdamse familiehuis is een perfecte balans tussen luxe en leefbaarheid, met maatwerk dat elke ruimte bijzonder maakt.',
      ],
      en: [
        'For a family moving from Naarden to Amsterdam, Céline van Haaren Interiors designed a stylish, personal dream home. The result is a warm family house full of character and distinctive elements.',
        'The centrepiece of the living space is the square cooking island — functional, but above all inviting: you gather around it rather than sit in a row. A see-through fireplace elegantly links the living room and the study, bringing openness and comfort together.',
        'This Amsterdam family home strikes a perfect balance between luxury and liveability, with bespoke joinery that makes every room special.',
      ],
    },
    lens: 2,
  },
  {
    slug: 'mxi',
    title: 'Project MXI',
    location: { nl: 'Loft, Amsterdam', en: 'Loft, Amsterdam' },
    heading: {
      nl: 'Lichte loft met hangende gashaard',
      en: 'A light-filled loft with a suspended fireplace',
    },
    body: {
      nl: [
        'In deze Amsterdamse loft realiseerde Céline van Haaren Interiors een stijlvol interieur dat draait om licht, ruimte en uitzicht. De grote wens van de bewoners — een hangende gashaard centraal in de woonkamer — werd het sfeervolle middelpunt van de woning.',
        'Dankzij de royale raampartijen stroomt natuurlijk licht binnen en kijk je vanaf het kookeiland uit over het prachtige uitzicht. De keuken bestaat uit een ruim opgezet eiland en een luxe koffiehoek met travertin planken, perfect voor ontspannen momenten.',
        'Deze loft combineert comfort, design en een unieke woonbeleving in het hart van de stad.',
      ],
      en: [
        'In this Amsterdam loft, Céline van Haaren Interiors created an elegant interior centred on light, space and view. The residents’ great wish — a suspended gas fireplace at the centre of the living room — became the atmospheric heart of the home.',
        'Generous windows let natural light pour in, and from the cooking island you look out over the beautiful view. The kitchen pairs a spacious island with a refined coffee corner on travertine shelves, perfect for quiet moments.',
        'This loft combines comfort, design and a singular way of living in the heart of the city.',
      ],
    },
    lens: 2,
  },
];

export const projects = raw.map((p) => ({
  cover: 0,
  ...p,
  images: dims[p.slug].map(([w, h], i) => {
    const n = String(i).padStart(2, '0');
    return { src: `/images/${p.slug}-${n}.webp`, sm: `/images/${p.slug}-${n}-sm.webp`, w, h };
  }),
}));

export const featured = ['xx', 'xv', 'xxix', 'xfv', 'ivii', 'viii'].map((s) =>
  projects.find((p) => p.slug === s),
);
