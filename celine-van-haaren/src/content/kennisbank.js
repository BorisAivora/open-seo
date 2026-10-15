// Kennisbank articles (Dutch only). Each article answers one question; the first screen is
// the answer. Facts about the studio come from the site itself (project texts, reviews);
// general material and regulation advice points readers to the official source.
// `image` is [project slug, image index]; `related` lists project slugs.

const p = (slug, label) => `<a href="/projecten/${slug}/">${label}</a>`;
const a = (slug, label) => `<a href="/kennisbank/${slug}/">${label}</a>`;

export const articles = [
  {
    slug: 'interieurontwerp-amsterdam',
    type: 'pillar',
    title: 'Interieurontwerp in Amsterdam: zo verloopt een compleet traject',
    metaTitle: 'Interieurontwerp in Amsterdam: zo verloopt een traject',
    metaDescription:
      'Wat een compleet interieurontwerp inhoudt, hoe het traject van kennismaking tot styling verloopt en waar u bij een Amsterdamse woning extra op let.',
    summary:
      'Wat een compleet interieurontwerp inhoudt, de vier stappen van kennismaking tot styling, en waar u bij een Amsterdamse woning extra op let.',
    published: '2026-10-15',
    updated: '2026-10-15',
    image: ['ivii', 0],
    intro: `<p>Bij een compleet interieurontwerp ontwerpt één ontwerper de indeling, materialen, kleuren, verlichting en het maatwerk van uw woning, en begeleidt zij ook de uitvoering. Bij Céline van Haaren Interiors, met een studio in Amsterdam-Zuid, verloopt dat in vier stappen: kennismaking, ontwerp, uitwerking en realisatie.</p>
<p>Hieronder leest u wat er in elke stap gebeurt, waar u bij een Amsterdamse woning extra op let en wat u zelf vooraf kunt voorbereiden.</p>`,
    sections: [
      {
        id: 'wat-valt-eronder',
        h2: 'Wat valt onder een compleet interieurontwerp?',
        html: `<p>Een compleet interieurontwerp gaat verder dan kleuren en meubels kiezen. Het gaat over hoe de hele woning werkt en voelt. Meestal hoort dit erbij:</p>
<ul>
  <li><strong>Indeling en looproutes.</strong> Waar komt de keuken, hoe loopt u van de hal naar de woonkamer, waar is ruimte voor een werkplek.</li>
  <li><strong>Materialen en kleur.</strong> Vloeren, wanden, natuursteen zoals travertijn en marmer, houtsoorten, stoffen.</li>
  <li><strong>Licht- en elektraplan.</strong> Waar komen lampen, schakelaars en stopcontacten, en welk licht hoort bij welke ruimte.</li>
  <li><strong>Maatwerk.</strong> Keukens, kastenwanden, badkamermeubels, werkplekken en nissen die precies passen.</li>
  <li><strong>Styling.</strong> Lampen, stoffen en accessoires die het geheel afmaken.</li>
</ul>
<p>Een paar voorbeelden uit projecten: in ${p('xfv', 'een familiewoning in Friesland')} vormen een donkereiken keuken met travertin blad en een groot kookeiland het hart van het huis. In ${p('ii', 'een villa in Hilversum')} leidt een kastenwand in de masterbedroom naar de en-suitebadkamer. In ${p('xvi', 'een huis in Amsterdam-Oost')} is naast de keuken een werkplek gemaakt in dezelfde materialen.</p>`,
      },
      {
        id: 'vier-stappen',
        h2: 'De vier stappen van een traject',
        html: `<h3>1. Kennismaking</h3>
<p>U vertelt over uw woning, uw wensen en uw ideeën. Samen kijkt u wat er mogelijk is en welke manier van samenwerken bij uw project past. Dit gesprek is vrijblijvend.</p>
<h3>2. Ontwerp</h3>
<p>Indeling, materialen, kleur en licht komen samen in één ontwerp. U ziet het geheel in een interieurpresentatie, zodat u de keuzes in samenhang beoordeelt en niet los per ruimte.</p>
<h3>3. Uitwerking</h3>
<p>Het ontwerp wordt uitgewerkt in maatwerk, een licht- en elektraplan en technische tekeningen. Daarmee weten de aannemer en leveranciers precies wat er moet gebeuren, en waar elk stopcontact en elke lamp komt.</p>
<h3>4. Realisatie</h3>
<p>Tijdens de verbouwing begeleidt Céline de uitvoering en stemt ze af met de aannemer en leveranciers, tot en met de styling. Het bouwwerk zelf doet de aannemer. Een opdrachtgever omschreef het zo: “Céline heeft ons van A tot Z begeleid en ons zoveel uit handen genomen, dit hadden wij van tevoren niet kunnen bedenken.”</p>`,
      },
      {
        id: 'amsterdamse-woning',
        h2: 'Waar u bij een Amsterdamse woning extra op let',
        html: `<p>Een woning in Amsterdam brengt eigen regels en praktische grenzen mee. Die bepalen soms wat er kan, nog voordat het ontwerp begint.</p>
<h3>Appartement met een VvE</h3>
<p>Woont u in een appartement, dan heeft u te maken met de Vereniging van Eigenaars. Veranderingen aan gemeenschappelijke delen, zoals de constructie, de gevel of gedeelde leidingen, vragen meestal toestemming van de VvE. Veel splitsingsaktes en huishoudelijke reglementen stellen ook eisen aan vloeren, vanwege geluid naar de buren. Lees die stukken vóór u een harde vloer of een nieuwe badkamerindeling kiest.</p>
<h3>Monument</h3>
<p>Amsterdam heeft veel rijks- en gemeentelijke monumenten. Bij een monument kan ook voor veranderingen binnen een omgevingsvergunning nodig zijn. Controleer dit via het <a href="https://omgevingswet.overheid.nl/" rel="noopener" target="_blank">Omgevingsloket</a> of bij de gemeente Amsterdam voordat u plannen vastlegt.</p>
<h3>Constructie en vergunning</h3>
<p>Wilt u een muur weghalen of een opening maken, laat dan eerst vaststellen of de muur dragend is. Daarvoor heeft u een constructeur nodig. Of er een vergunning nodig is, checkt u in het Omgevingsloket.</p>
<h3>Logistiek</h3>
<p>Smalle trappen in grachtenpanden en portiekwoningen bepalen hoe groot een stuk maatwerk of een natuurstenen blad kan zijn. Daar houdt het ontwerp rekening mee, bijvoorbeeld door delen te maken die naar binnen kunnen. Een container of steiger op straat vraagt in Amsterdam een vergunning van de gemeente.</p>`,
      },
      {
        id: 'voorbereiden',
        h2: 'Wat u zelf vooraf kunt voorbereiden',
        html: `<p>U hoeft niet precies te weten wat u wilt. Wel helpt het als u dit bij de hand heeft:</p>
<ul>
  <li>Een plattegrond of bouwtekening van de woning, als die er is.</li>
  <li>Foto’s van interieurs, materialen of details die u mooi vindt.</li>
  <li>Uw wensen per ruimte: wat moet er kunnen, wat stoort u nu.</li>
  <li>Uw planning, bijvoorbeeld een verhuisdatum.</li>
  <li>Bij een appartement: de splitsingsakte en het huishoudelijk reglement van de VvE.</li>
</ul>`,
      },
      {
        id: 'kosten-en-duur',
        h2: 'Wat kost het en hoe lang duurt het?',
        html: `<p>Op deze site staan geen vaste prijzen. De kosten hangen af van de omvang van uw project, van één ruimte tot een hele woning, en van de vorm van samenwerken. In het kennismakingsgesprek bespreekt u welke vorm bij uw project past.</p>
<p>Ook de duur hangt vooral af van de omvang en van de bouw. Ter indicatie: bij Project Amsterdam City Home, een complete woning, duurde de samenwerking bijna 2 jaar, volgens de opdrachtgevers zelf.</p>`,
      },
    ],
    faq: [
      ['Moet ik al precies weten wat ik wil?', 'Nee. Céline werkt vanuit uw wensen en ideeën en combineert die met haar eigen stijl en oog voor detail. Daar is het kennismakingsgesprek voor.'],
      ['Wanneer schakel ik een interieurontwerper in?', 'Zo vroeg mogelijk, het liefst voordat de aannemer begint. Dan kan de indeling nog mee in het ontwerp en komen leidingen, stopcontacten en lichtpunten meteen op de juiste plek.'],
      ['Werkt Céline van Haaren Interiors ook buiten Amsterdam?', 'Ja. De studio zit in Amsterdam-Zuid, maar er zijn ook projecten gerealiseerd in onder meer Hilversum, Bussum, Friesland en Gelderland.'],
      ['Wat neem ik mee naar het kennismakingsgesprek?', 'Een plattegrond als die er is, foto’s van wat u mooi vindt en uw wensen per ruimte. Meer is niet nodig.'],
    ],
    related: ['ivii', 'xvi', 'mxi'],
  },
  {
    slug: 'travertijn-in-huis',
    type: 'article',
    title: 'Travertijn in huis: voordelen, nadelen en onderhoud',
    metaTitle: 'Travertijn in huis: voordelen, nadelen en onderhoud',
    metaDescription:
      'Travertijn in keuken, badkamer of op de vloer? Wat de steen is, gevuld of ongevuld, welke afwerking bij welk gebruik past en hoe u hem onderhoudt.',
    summary:
      'Wat travertijn is, gevuld of ongevuld, welke afwerking bij welk gebruik past, hoe u de steen onderhoudt en wanneer u beter iets anders kiest.',
    published: '2026-10-15',
    updated: '2026-10-15',
    image: ['viii', 0],
    intro: `<p>Travertijn is een warme, beige kalksteen met kleine gaatjes en een gelaagde tekening. Hij past goed in een rustig, tijdloos interieur en wordt gebruikt voor vloeren, wanden, badkamers en keukenbladen. De steen is wel gevoelig voor zuren en heeft impregnering en een pH-neutrale reiniger nodig.</p>
<p>In dit artikel leest u wat travertijn is, welke afwerking bij welk gebruik past, hoe u hem onderhoudt en wanneer u beter een ander materiaal kiest.</p>`,
    sections: [
      {
        id: 'wat-is-travertijn',
        h2: 'Wat is travertijn?',
        html: `<p>Travertijn is een kalksteen die ontstaat doordat kalk uit bronwater neerslaat, vaak bij warmwaterbronnen. Gasbelletjes en plantenresten laten daarbij kleine holtes achter. Die gaatjes en de gelaagde tekening maken travertijn herkenbaar.</p>
<p>De kleur loopt van crème en beige tot walnoot en zilvergrijs. Hoe de steen eruitziet, hangt ook af van hoe hij gezaagd is. Langs de lagen gezaagd geeft een streeptekening. Dwars op de lagen gezaagd geeft een rustiger, wolkerig beeld.</p>`,
      },
      {
        id: 'gevuld-of-ongevuld',
        h2: 'Gevuld of ongevuld',
        html: `<p>Bij <strong>gevuld travertijn</strong> zijn de gaatjes dichtgemaakt met hars of cement. Het oppervlak is gladder en makkelijker schoon te houden. Dat is meestal de beste keuze voor een keuken, badkamer of vloer.</p>
<p><strong>Ongevuld travertijn</strong> heeft open gaatjes en een ruwer, natuurlijker uiterlijk. Het past bij wanden en plekken waar weinig vuil of water komt. In de gaatjes blijft vuil makkelijker hangen.</p>
<p>Let op: de vulling in de gaatjes kan na jaren loslaten. Een steenhouwer of vloerspecialist kan die bijwerken.</p>`,
      },
      {
        id: 'afwerking',
        h2: 'Welke afwerking past bij welk gebruik?',
        html: `<ul>
  <li><strong>Gezoet (honed).</strong> Mat en glad. De meest gekozen afwerking binnen, omdat kleine krasjes en vlekken minder opvallen.</li>
  <li><strong>Gepolijst.</strong> Glanzend, met een diepere kleur. Doffe vlekken door zuren vallen op een glanzend oppervlak juist meer op.</li>
  <li><strong>Geborsteld.</strong> Een zachte structuur die iets stroever is. Prettig voor een douchevloer.</li>
  <li><strong>Getrommeld (tumbled).</strong> Afgeronde randen en een verweerd, rustiek uiterlijk.</li>
</ul>`,
      },
      {
        id: 'waar-wel-en-niet',
        h2: 'In de keuken, badkamer of op de vloer?',
        html: `<h3>Keukenblad</h3>
<p>Het kan, maar travertijn reageert op zuur. Citroen, wijn, azijn en tomaat laten doffe plekken achter als ze blijven liggen. Wie een keukenblad van travertijn kiest, accepteert dat het blad met de jaren een patina krijgt. Wilt u een blad dat er altijd als nieuw uitziet, kies dan een ander materiaal. In ${p('xfv', 'Project XFV')} is een travertin werkblad gecombineerd met donker eikenhout.</p>
<h3>Badkamer</h3>
<p>Travertijn past goed in een badkamer, mits gevuld en geïmpregneerd. Kies voor een douchevloer een afwerking die niet glad wordt, zoals gezoet of geborsteld. In ${p('ivii', 'Project IVII')} komt dezelfde warme travertijn terug in de keuken en de badkamer, wat de woning één geheel maakt.</p>
<h3>Vloer en wanden</h3>
<p>Voor een woonhuis is travertijn slijtvast genoeg als vloer. Op wanden en planken is de steen het minst kwetsbaar. In ${p('mxi', 'Project MXI')} zijn planken van travertin gebruikt voor een koffiehoek.</p>`,
      },
      {
        id: 'onderhoud',
        h2: 'Zo onderhoudt u travertijn',
        html: `<ul>
  <li><strong>Impregneren</strong> na het plaatsen, en daarna opnieuw als de bescherming afneemt. Hoe vaak dat is, verschilt per steen en middel; volg het advies van de leverancier.</li>
  <li><strong>Test of de impregnering nog werkt.</strong> Blijft een druppel water op de steen parelen, dan is hij beschermd. Trekt de druppel in en kleurt de steen donker, dan is het tijd om opnieuw te impregneren.</li>
  <li><strong>Reinig met een pH-neutrale steenzeep.</strong> Gebruik geen azijn, citroen, kalkreiniger of schuurmiddel.</li>
  <li><strong>Dep gemorste vloeistof direct op</strong>, vooral zure dranken en olie.</li>
</ul>`,
      },
      {
        id: 'alternatieven',
        h2: 'Travertijn of iets anders?',
        html: `<p><strong>Marmer</strong> is ook een kalksteen en net zo gevoelig voor zuur, maar dichter en vaak met duidelijke aders. <strong>Keramische tegels in travertijnlook</strong> zijn bijna onderhoudsvrij, maar missen de diepte en het verloop van echte steen. Voor een keukenblad dat tegen een stootje moet kunnen, zijn keramiek of een harde natuursteen zoals kwartsiet praktischer.</p>
<p>Twijfelt u, kijk dan naar hoe u de ruimte gebruikt. Op een wand of in een rustig gebruikte badkamer geeft travertijn veel warmte voor weinig onderhoud. Op een druk gebruikt keukenblad vraagt hij om acceptatie van gebruikssporen. Meer over die afweging leest u in ${a('keuken-op-maat-ontwerpen', 'een keuken op maat laten ontwerpen')}.</p>`,
      },
    ],
    faq: [
      ['Is travertijn geschikt als keukenblad?', 'Ja, als u accepteert dat het blad gebruikssporen krijgt. Zure vloeistoffen zoals citroen, wijn en azijn laten doffe plekken achter. Impregneren beperkt vlekken, maar voorkomt doffe plekken door zuur niet.'],
      ['Kan travertijn in de douche?', 'Ja, mits de steen gevuld en geïmpregneerd is en de afwerking niet glad wordt, zoals gezoet of geborsteld. Reinig met een pH-neutraal middel en niet met kalkreiniger.'],
      ['Hoe vaak moet ik travertijn impregneren?', 'Dat verschilt per steen en impregneermiddel. Doe de watertest: blijft een druppel parelen, dan is de steen nog beschermd. Trekt hij in, dan is het tijd om opnieuw te impregneren.'],
      ['Wat is het verschil tussen travertijn en marmer?', 'Beide bestaan uit kalk. Marmer is kalksteen die onder hoge druk en temperatuur is omgezet en is daardoor dichter, vaak met aders. Travertijn is ontstaan uit bronwater en heeft kleine gaatjes en een gelaagde tekening.'],
    ],
    related: ['xfv', 'ivii', 'mxi', 'viii'],
  },
  {
    slug: 'keuken-op-maat-ontwerpen',
    type: 'article',
    title: 'Een keuken op maat laten ontwerpen: welke keuzes, in welke volgorde',
    metaTitle: 'Keuken op maat laten ontwerpen: keuzes en volgorde',
    metaDescription:
      'Een keuken op maat begint niet bij de fronten. In deze volgorde maakt u de keuzes: indeling, apparatuur, kasten, werkblad, licht en elektra, details.',
    summary:
      'Een keuken op maat begint niet bij de fronten. De volgorde van indeling en apparatuur tot werkblad, licht en details, met voorbeelden uit projecten.',
    published: '2026-10-15',
    updated: '2026-10-15',
    image: ['xv', 0],
    intro: `<p>Bij een keuken op maat maakt u de keuzes het best van groot naar klein: eerst de indeling en looproutes, dan de apparatuur, daarna kasten en fronten, het werkblad, verlichting en elektra, en als laatste grepen en details. Wie bij de fronten of het werkblad begint, loopt later vast op de maten van apparatuur en de plek van stopcontacten.</p>
<p>Hieronder vindt u die volgorde, met voorbeelden uit projecten van Céline van Haaren Interiors.</p>`,
    sections: [
      {
        id: 'indeling',
        h2: '1. Indeling en looproutes',
        html: `<p>Begin bij hoe u de keuken gebruikt. Kookt u met meer mensen tegelijk, zit het gezin aan het eiland, wilt u uitzicht tijdens het koken? Houd de afstanden tussen koelkast, spoelbak en kookplaat kort, en zorg dat looproutes niet door de werkplek lopen.</p>
<p>Een eiland bepaalt veel van de sfeer. In ${p('vvx', 'Project VVX')} is gekozen voor een vierkant kookeiland, zodat je er omheen zit in plaats van op een rij. In ${p('mxi', 'Project MXI')} staat het eiland zo dat u tijdens het koken naar buiten kijkt.</p>`,
      },
      {
        id: 'apparatuur',
        h2: '2. Apparatuur bepaalt de maten',
        html: `<p>Kies ovens, koelkast, vaatwasser en afzuiging voordat de kasten worden getekend. Elk apparaat heeft eigen inbouwmaten, ventilatie-eisen en aansluitingen. Een wijnklimaatkast of een tweede oven in een kolom vraagt ruimte die u vroeg moet reserveren.</p>
<p>Ook de afzuiging is een keuze met gevolgen: een kap boven het eiland, afzuiging in het plafond of in het werkblad. Elke oplossing stelt andere eisen aan de kasten en aan de afvoer. In ${p('xv', 'Project XV')} en ${p('xvi', 'Project XVI')} is een wijnklimaatkast onderdeel van het ontwerp.</p>`,
      },
      {
        id: 'kasten-en-fronten',
        h2: '3. Kasten, fronten en materiaal',
        html: `<p>Pas als indeling en apparatuur vastliggen, ontwerpt u de kasten. Denk aan wat u waar opbergt: pannen bij de kookplaat, servies bij de vaatwasser. Kies daarna het materiaal van de fronten. Hout geeft warmte; bij grote fronten is fineer vaak stabieler dan massief hout, dat meer werkt.</p>
<p>Een keuken kan doorlopen in andere ruimtes. In ${p('xvi', 'Project XVI')} is naast de eikenhouten keuken een werkplek gemaakt in dezelfde materialen. In ${p('xfv', 'Project XFV')} is gekozen voor donker eikenhout.</p>`,
      },
      {
        id: 'werkblad',
        h2: '4. Het werkblad',
        html: `<p>Het werkblad is het deel dat u het vaakst aanraakt en het meest belast. De belangrijkste vraag: hoeveel gebruikssporen accepteert u?</p>
<ul>
  <li><strong>Marmer en travertijn</strong> zijn warm en levendig, maar gevoelig voor zuur en krijgen patina. Lees meer in ${a('travertijn-in-huis', 'travertijn in huis')}.</li>
  <li><strong>Kwartsiet en graniet</strong> zijn harde natuursteen en minder kwetsbaar.</li>
  <li><strong>Keramiek</strong> is hittebestendig, krasvast en nauwelijks gevoelig voor vlekken.</li>
  <li><strong>Composiet</strong> is egaal en onderhoudsarm, maar minder hittebestendig.</li>
</ul>
<p>Ook dikte en randafwerking bepalen het beeld: een dik blad oogt stevig, een dun blad strak en licht.</p>`,
      },
      {
        id: 'licht-en-elektra',
        h2: '5. Verlichting en elektra',
        html: `<p>Plan licht in lagen: algemeen licht, werklicht boven het blad en sfeerlicht, bijvoorbeeld in een nis of boven het eiland. Bepaal ook waar stopcontacten komen, zeker op een eiland. Dit moet vastliggen voordat de aannemer leidingen legt.</p>
<p>Een goed licht- en elektraplan valt op in het dagelijks gebruik. Een opdrachtgever van een loftvilla in Gelderland noemde het “geweldige licht- en elektraplan” als een van de dingen waar ze elke dag van genieten.</p>`,
      },
      {
        id: 'details',
        h2: '6. Grepen en details',
        html: `<p>Als laatste kiest u grepen, kranen en kleine details. Die maken het verschil tussen een mooie en een persoonlijke keuken. Denk aan messing grepen, zoals in ${p('xmc', 'Project XMC')}, een koffiehoek met planken van travertin zoals in ${p('mxi', 'Project MXI')}, of een greeploze uitvoering voor een rustig beeld.</p>`,
      },
    ],
    faq: [
      ['Wanneer begin ik met het ontwerp van een nieuwe keuken?', 'Voordat de verbouwing start. Dan komen leidingen, afvoer, stopcontacten en lichtpunten meteen op de juiste plek en hoeft er niets opnieuw te worden gedaan.'],
      ['Kies ik voor een kookeiland of een keuken langs de wand?', 'Dat hangt af van de ruimte en hoe u leeft. Een eiland maakt van de keuken een plek om samen te zijn, maar vraagt ruimte rondom om te lopen en een oplossing voor afzuiging en stopcontacten.'],
      ['Welk werkblad is het meest onderhoudsvriendelijk?', 'Keramiek en composiet zijn het minst gevoelig voor vlekken. Natuursteen zoals marmer en travertijn vraagt meer zorg en krijgt met de jaren patina.'],
      ['Kan de keuken doorlopen in andere ruimtes?', 'Ja. Door dezelfde materialen te gebruiken voor bijvoorbeeld een werkplek of kastenwand, wordt de woning één geheel. In Project XVI is dat gedaan met een werkplek naast de keuken.'],
    ],
    related: ['vvx', 'xvi', 'xfv', 'mxi'],
  },
];
