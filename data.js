window.TRAVEL_DATA = (() => {
   const D = [
      ['sarajevo', 'Sarajevo', 'Sarajevo', 'Sarajevska regija', 'Sarajevo region', 43.859, 18.431, 'Grad u kojem se susreću različite kulture, historija i savremeni život.', 'A city where cultures, history and contemporary life meet.', 'Historija & gastronomija', 'History & food', 'https://kombiprevozflamingo.rs/lokacije/sarajevo.webp', 'https://en.wikipedia.org/wiki/Sarajevo'],
      ['mostar', 'Mostar', 'Mostar', 'Hercegovina', 'Herzegovina', 43.339, 17.815, 'Kameni most, živopisna čaršija i smaragdna Neretva.', 'The iconic stone bridge, historic lanes and emerald Neretva.', 'Stari most & kultura', 'Old Bridge & culture', 'https://www.belmondo-cruises.com/upld/xl/1464/mostar-dalmatian-coast-cruises-croatia.webp', 'https://en.wikipedia.org/wiki/Mostar'],
      ['travnik', 'Travnik', 'Travnik', 'Srednja Bosna', 'Central Bosnia', 44.227, 17.664, 'Grad vezira, tvrđave, tradicije i autentičnih bosanskih okusa.', 'A town of viziers, fortresses, traditions and authentic Bosnian flavors.', 'Tvrđava & tradicija', 'Fortress & heritage', 'https://www.worldinprint.com/p/191/travnik-fortress-bosnia-herzegovina-europe-39526132.jpg.webp', 'https://en.wikipedia.org/wiki/Travnik'],
      ['vlasic', 'Vlašić', 'Vlašić', 'Srednja Bosna', 'Central Bosnia', 44.317, 17.57, 'Planinska avantura tokom cijele godine, a ne samo za skijanje.', 'A mountain escape for every season, not just the ski season.', 'Planina & priroda', 'Mountain & nature', 'https://vlasicki-konak.com/wp-content/uploads/2018/05/49402-1.jpg', 'https://en.wikipedia.org/wiki/Vla%C5%A1i%C4%87_(mountain)'],
      ['jajce', 'Jajce', 'Jajce', 'Srednja Bosna', 'Central Bosnia', 44.34, 17.27, 'Vodopad u srcu grada, tvrđava i slikovita Plivska jezera.', 'A waterfall in the city, a fortress and beautiful Pliva Lakes.', 'Vodopadi & historija', 'Waterfalls & history', 'https://lll.ba/wp-content/uploads/2023/04/Pliva-Waterfall-Plivski-vodopad-Jajce-Bosnia-Herzegovina-lll.ba-%40sandronuhanovic-2.jpg', 'https://en.wikipedia.org/wiki/Jajce'],
      ['banjaluka', 'Banja Luka', 'Banja Luka', 'Krajina', 'Krajina', 44.772, 17.191, 'Zeleni grad na Vrbasu, poznat po šetalištima i tvrđavi Kastel.', 'A green riverside city known for its promenades and Kastel fortress.', 'Rijeka & grad', 'River & city', '', 'https://en.wikipedia.org/wiki/Banja_Luka'],
      ['bihac', 'Bihać / NP Una', 'Bihać / Una NP', 'Krajina', 'Krajina', 44.816, 15.869, 'Bistra Una, prirodni krajolici i veličanstveni slapovi.', 'Clear waters, natural landscapes and spectacular waterfalls.', 'Rijeka & avantura', 'River & adventure', '', 'https://en.wikipedia.org/wiki/Una_National_Park'],
      ['konjic', 'Konjic', 'Konjic', 'Hercegovina', 'Herzegovina', 43.652, 17.963, 'Stari kameni most, Neretva i planinski pejzaži.', 'An old stone bridge, the Neretva and dramatic mountains.', 'Mostovi & priroda', 'Bridges & nature', '', 'https://en.wikipedia.org/wiki/Konjic'],
      ['trebinje', 'Trebinje', 'Trebinje', 'Hercegovina', 'Herzegovina', 42.709, 18.346, 'Mediteranski duh, stari grad i prijatne šetnje uz rijeku.', 'Mediterranean atmosphere, old streets and riverside strolls.', 'Sunce & kultura', 'Sunshine & culture', '', 'https://en.wikipedia.org/wiki/Trebinje'],
      ['tuzla', 'Tuzla', 'Tuzla', 'Sjeveroistočna Bosna', 'Northeast Bosnia', 44.539, 18.678, 'Grad soli, zanimljive historije i Panonskih jezera.', 'The city of salt, rich history and the Pannonian lakes.', 'Jezera & kultura', 'Lakes & culture', '', 'https://en.wikipedia.org/wiki/Tuzla'],
      ['visoko', 'Visoko', 'Visoko', 'Centralna Bosna', 'Central Bosnia', 43.989, 18.178, 'Grad zanata i srednjovjekovne baštine u srcu Bosne.', 'Craft traditions and medieval heritage in the heart of Bosnia.', 'Baština & zanati', 'Heritage & crafts', '', 'https://en.wikipedia.org/wiki/Visoko']
   ].map(a => ({ id: a[0], name: a[1], nameEn: a[2], region: a[3], regionEn: a[4], lat: a[5], lon: a[6], description: a[7], descriptionEn: a[8], highlight: a[9], highlightEn: a[10], image: a[11], source: a[12] }));
   const A = [];
   function add(dest, title, titleEn, type, indoor, seasons, duration, lat, lon, description, descriptionEn, source, featured = false) {
      const d = D.find(x => x.id === dest);
      A.push({ id: dest + '-' + (A.filter(a => a.destination === dest).length + 1), destination: dest, title, titleEn, type, indoor, seasons, duration, lat: lat ?? d.lat, lon: lon ?? d.lon, description, descriptionEn, source: source || d.source, featured, price: null, hours: null });
   }
   add('sarajevo', 'Baščaršija i Sebilj', 'Baščaršija & Sebilj', 'culture', false, ['spring', 'summer', 'autumn', 'winter'], 90, 43.86, 18.431, 'Istraži historijsko srce Sarajeva i stare zanatske ulice.', 'Explore Sarajevo’s historic core and old craft streets.', 'https://en.wikipedia.org/wiki/Ba%C5%A1%C4%8Dar%C5%A1ija', true);
   add('sarajevo', 'Zemaljski muzej BiH', 'National Museum of BiH', 'culture', true, ['spring', 'summer', 'autumn', 'winter'], 100, 43.855, 18.403, 'Muzejsko iskustvo koje je odlična alternativa lošem vremenu.', 'An indoor museum experience, ideal as a rainy-day alternative.', 'https://zemaljskimuzej.ba/', true);
   add('sarajevo', 'Vrelo Bosne', 'Vrelo Bosne', 'nature', false, ['spring', 'summer', 'autumn'], 110, 43.819, 18.267, 'Šetnja prirodnim ambijentom na izvoru rijeke Bosne.', 'Enjoy riverside paths and nature around the Bosna spring.', 'https://en.wikipedia.org/wiki/Vrelo_Bosne');
   add('sarajevo', 'Gazi Husrev-begov bezistan', 'Gazi Husrev-beg’s Bezistan', 'history', true, ['spring', 'summer', 'autumn', 'winter'], 60, 43.859, 18.429, 'Upoznaj natkrivenu trgovačku tradiciju stare čaršije.', 'Discover the old covered bazaar and its trading history.');
   add('sarajevo', 'Bosanska kuhinja u starom gradu', 'Bosnian cuisine in the old town', 'food', true, ['spring', 'summer', 'autumn', 'winter'], 75, 43.86, 18.43, 'Potraži lokalne specijalitete; provjeri restorane i radno vrijeme.', 'Discover local dishes; check restaurant hours independently.');
   add('mostar', 'Stari most i stari grad', 'Old Bridge & old town', 'history', false, ['spring', 'summer', 'autumn', 'winter'], 90, 43.337, 17.815, 'Prošetaj kulturno-historijskom jezgrom i uz Neretvu.', 'Walk through the old quarter and admire the Neretva.', 'https://whc.unesco.org/en/list/946/', true);
   add('mostar', 'Muzej Starog mosta', 'Old Bridge Museum', 'culture', true, ['spring', 'summer', 'autumn', 'winter'], 65, 43.337, 17.815, 'Istraži priču o jednoj od najpoznatijih znamenitosti zemlje.', 'Discover the history of the landmark bridge.');
   add('mostar', 'Stara čaršija Kujundžiluk', 'Kujundžiluk craft street', 'culture', false, ['spring', 'summer', 'autumn', 'winter'], 70, 43.339, 17.816, 'Radnje, zanati i tradicionalna arhitektura.', 'Traditional crafts, shops and historic architecture.');
   add('mostar', 'Šetnja uz Neretvu', 'Neretva riverside walk', 'nature', false, ['spring', 'summer', 'autumn'], 70, 43.339, 17.814, 'Kratka šetnja i prelijepi pogledi na rijeku.', 'Take in the riverside scenery and beautiful views.');
   add('travnik', 'Stari grad Travnik', 'Travnik Fortress', 'history', false, ['spring', 'summer', 'autumn', 'winter'], 85, 44.23, 17.666, 'Istraži tvrđavu iznad historijskog dijela grada.', 'Explore the fortress above the historic town.', 'https://en.wikipedia.org/wiki/Travnik', true);
   add('travnik', 'Rodna kuća Ive Andrića', 'Ivo Andrić Birth House', 'culture', true, ['spring', 'summer', 'autumn', 'winter'], 65, 44.226, 17.667, 'Kulturna stanica posvećena nobelovcu; provjeri sezonsko radno vrijeme.', 'A museum associated with the Nobel laureate; verify seasonal hours.');
   add('travnik', 'Šarena džamija i stara čaršija', 'Colorful Mosque & old bazaar', 'history', false, ['spring', 'summer', 'autumn', 'winter'], 75, 44.227, 17.663, 'Jedinstvena arhitektura i prepoznatljiva atmosfera Travnika.', 'Distinctive architecture and an authentic town atmosphere.');
   add('travnik', 'Travnički ćevapi i lokalni okusi', 'Travnik food experience', 'food', true, ['spring', 'summer', 'autumn', 'winter'], 70, 44.227, 17.666, 'Probaj lokalne specijalitete u restoranu po izboru.', 'Sample regional cuisine at a restaurant of your choice.');
   add('vlasic', 'Babanovac — planinski centar', 'Babanovac mountain center', 'nature', false, ['spring', 'summer', 'autumn', 'winter'], 80, 44.317, 17.57, 'Istraži područje Vlašića; planinske aktivnosti zavise od uslova.', 'Explore the resort area; activities depend on actual conditions.', 'https://en.wikipedia.org/wiki/Vla%C5%A1i%C4%87_(mountain)', true);
   add('vlasic', 'Skijanje na Vlašiću', 'Skiing on Vlašić', 'adventure', false, ['winter'], 160, 44.319, 17.573, 'Moguće samo uz potvrdu da staze i liftovi rade.', 'Only possible when the resort confirms open slopes and lifts.');
   add('vlasic', 'Planinska šetnja', 'Mountain scenery walk', 'nature', false, ['spring', 'summer', 'autumn'], 110, 44.315, 17.572, 'Šetnja samo uz odgovarajuće vrijeme, opremu i provjeru terena.', 'Walk only when weather and trail conditions are appropriate.');
   add('vlasic', 'Planinski gastronomski predah', 'Mountain food & café break', 'food', true, ['spring', 'summer', 'autumn', 'winter'], 75, 44.317, 17.57, 'Predah uz lokalne okuse; rad restorana treba provjeriti.', 'Warm up with local food; verify businesses are open.');
   add('jajce', 'Vodopad Plive', 'Pliva Waterfall', 'nature', false, ['spring', 'summer', 'autumn', 'winter'], 70, 44.338, 17.271, 'Pogled na poznati vodopad u samom gradu.', 'See the famous waterfall in the heart of the town.', 'https://en.wikipedia.org/wiki/Pliva_Waterfall', true);
   add('jajce', 'Stari grad Jajce', 'Jajce Fortress', 'history', false, ['spring', 'summer', 'autumn', 'winter'], 90, 44.343, 17.269, 'Otkrij srednjovjekovni karakter grada.', 'Explore the town’s medieval heritage.');
   add('jajce', 'Muzej II zasjedanja AVNOJ-a', 'AVNOJ Museum', 'culture', true, ['spring', 'summer', 'autumn', 'winter'], 75, 44.339, 17.268, 'Historijsko muzejsko iskustvo kao alternativa lošem vremenu.', 'An indoor history museum as an alternative in poor weather.');
   add('jajce', 'Plivska jezera i mlinčići', 'Pliva Lakes & watermills', 'nature', false, ['spring', 'summer', 'autumn'], 100, 44.35, 17.23, 'Priroda i tradicionalni mlinovi izvan centra.', 'Enjoy nature and traditional watermills outside town.');
   add('banjaluka', 'Tvrđava Kastel', 'Kastel Fortress', 'history', false, ['spring', 'summer', 'autumn', 'winter'], 85, 44.769, 17.194, 'Prošetaj historijskim utvrđenjem uz Vrbas.', 'Walk through the riverside historic fortress.');
   add('banjaluka', 'Šetnja uz Vrbas', 'Vrbas riverside walk', 'nature', false, ['spring', 'summer', 'autumn'], 90, 44.774, 17.19, 'Uživaj u zelenilu i pogledu na rijeku.', 'Enjoy the green riverside scenery.');
   add('banjaluka', 'Muzej Republike Srpske', 'Museum of Republika Srpska', 'culture', true, ['spring', 'summer', 'autumn', 'winter'], 80, 44.771, 17.189, 'Istraži muzejske zbirke; provjeri termine posjeta.', 'Explore museum collections; verify visiting hours.');
   add('bihac', 'Nacionalni park Una', 'Una National Park', 'nature', false, ['spring', 'summer', 'autumn'], 160, 44.738, 15.947, 'Prirodni pejzaži i rijeka Una, uz provjeru pristupa.', 'Discover the Una landscape, subject to access conditions.', 'https://npuna.com/', true);
   add('bihac', 'Štrbački buk', 'Štrbački buk waterfall', 'nature', false, ['spring', 'summer', 'autumn'], 140, 44.656, 16.009, 'Veliki slapovi uz poseban oprez na mokrim stazama.', 'Spectacular cascades; take care on wet paths.');
   add('bihac', 'Gradska šetnja Bihaćem', 'Bihać old town walk', 'culture', false, ['spring', 'summer', 'autumn', 'winter'], 75, 44.817, 15.869, 'Upoznaj urbanu historiju Bihaća i obalu rijeke.', 'Discover Bihać’s urban history and riverside.');
   add('konjic', 'Stara kamena ćuprija', 'Konjic Old Bridge', 'history', false, ['spring', 'summer', 'autumn', 'winter'], 65, 43.652, 17.961, 'Poznati kameni most i šetnja starom jezgrom.', 'Admire the stone bridge and riverside town center.');
   add('konjic', 'Muzej drvorezbarstva', 'Woodcarving heritage', 'culture', true, ['spring', 'summer', 'autumn', 'winter'], 75, 43.652, 17.96, 'Upoznaj lokalnu tradiciju drvorezbarstva, uz provjeru termina.', 'Learn about traditional woodcarving, subject to opening times.');
   add('konjic', 'Jablaničko jezero', 'Jablanica Lake', 'nature', false, ['spring', 'summer', 'autumn'], 110, 43.695, 17.856, 'Uživaj u pogledu na jezero uz pogodne uslove.', 'Enjoy the lake scenery when conditions are suitable.');
   add('trebinje', 'Stari grad Trebinje', 'Trebinje old town', 'history', false, ['spring', 'summer', 'autumn', 'winter'], 90, 42.712, 18.345, 'Otkrij uske ulice i kamenu arhitekturu.', 'Explore stone streets and old-town architecture.');
   add('trebinje', 'Arslanagića most', 'Arslanagić Bridge', 'history', false, ['spring', 'summer', 'autumn', 'winter'], 65, 42.714, 18.359, 'Šetnja do prepoznatljivog osmanskog mosta.', 'Walk to a distinctive Ottoman stone bridge.');
   add('trebinje', 'Lokalna kuhinja Hercegovine', 'Herzegovinian food', 'food', true, ['spring', 'summer', 'autumn', 'winter'], 75, 42.711, 18.344, 'Potraži regionalne specijalitete kod lokalnih domaćina.', 'Try regional specialties in local restaurants.');
   add('tuzla', 'Panonska jezera — šetnja', 'Pannonian Lakes area', 'nature', false, ['spring', 'summer', 'autumn'], 70, 44.538, 18.675, 'Šetnja područjem jezera; kupanje zavisi od sezone i rada kompleksa.', 'Explore the lakes area; swimming depends on seasonal operation.');
   add('tuzla', 'Muzej soli', 'Salt heritage museum', 'culture', true, ['spring', 'summer', 'autumn', 'winter'], 70, 44.539, 18.675, 'Upoznaj historiju soli u Tuzli.', 'Discover Tuzla’s salt history.');
   add('tuzla', 'Historijsko jezgro Tuzle', 'Tuzla historic center', 'history', false, ['spring', 'summer', 'autumn', 'winter'], 70, 44.539, 18.678, 'Opusti se na gradskim trgovima i ulicama.', 'Stroll the city squares and streets.');
   add('visoko', 'Stari grad Visoki', 'Old Town of Visoki', 'history', false, ['spring', 'summer', 'autumn'], 100, 44.0, 18.175, 'Srednjovjekovna baština uz zahtjevnije pješačke prilaze.', 'Medieval heritage with potentially challenging walking access.');
   add('visoko', 'Zavičajni muzej Visoko', 'Visoko local museum', 'culture', true, ['spring', 'summer', 'autumn', 'winter'], 70, 43.989, 18.178, 'Upoznaj lokalnu historiju i kulturu.', 'Explore local history and culture.');
   add('visoko', 'Tradicionalni zanati', 'Traditional crafts', 'culture', true, ['spring', 'summer', 'autumn', 'winter'], 60, 43.989, 18.18, 'Istraži historiju zanata i radionice ako su dostupne.', 'Discover local crafts and workshops if available.');

   const extraDestinations = [
      ['neum', 'Neum', 'Neum', 'Hercegovina', 'Herzegovina', 42.923, 17.618, 'Jadranska obala, mirne šetnje i mediteranski zalasci sunca.', 'Adriatic shore, peaceful walks and Mediterranean sunsets.', 'More & šetnje', 'Coast & walks', '', 'https://en.wikipedia.org/wiki/Neum'],
      ['zenica', 'Zenica', 'Zenica', 'Centralna Bosna', 'Central Bosnia', 44.203, 17.907, 'Gradska kultura, muzeji i izleti uz rijeku Bosnu.', 'Urban culture, museums and walks along the Bosna River.', 'Grad & baština', 'City & heritage', '', 'https://en.wikipedia.org/wiki/Zenica'],
      ['doboj', 'Doboj', 'Doboj', 'Sjeverna Bosna', 'Northern Bosnia', 44.734, 18.088, 'Stara tvrđava, pogledi i zanimljiva historija na raskršću puteva.', 'Historic fortress, viewpoints and local heritage at a crossroads.', 'Tvrđava & istorija', 'Fortress & history', '', 'https://en.wikipedia.org/wiki/Doboj'],
      ['brcko', 'Brčko', 'Brčko', 'Posavina', 'Posavina', 44.873, 18.811, 'Šarmantan grad na Savi, riječna šetnica i gradska arhitektura.', 'A welcoming Sava River town with a promenade and architecture.', 'Sava & kultura', 'River & culture', '', 'https://en.wikipedia.org/wiki/Br%C4%8Dko'],
      ['bijeljina', 'Bijeljina', 'Bijeljina', 'Semberija', 'Semberija', 44.758, 19.217, 'Kapija Semberije, zanimljiva tradicija i obližnja izletišta.', 'The heart of Semberija with traditions and nearby day trips.', 'Semberija & baština', 'Semberija & heritage', '', 'https://en.wikipedia.org/wiki/Bijeljina'],
      ['prijedor', 'Prijedor', 'Prijedor', 'Krajina', 'Krajina', 44.978, 16.712, 'Šetnje uz Sanu, gradske galerije i priroda Kozare.', 'Sana riverside walks, galleries and Kozara nature.', 'Rijeka & Kozara', 'River & Kozara', '', 'https://en.wikipedia.org/wiki/Prijedor'],
      ['jahorina', 'Jahorina', 'Jahorina', 'Sarajevska regija', 'Sarajevo region', 43.738, 18.572, 'Olimpijska planina za zimske i ljetne izlete, uz provjeru uslova.', 'An Olympic mountain for winter and summer escapes, conditions permitting.', 'Planina & sport', 'Mountain & sport', '', 'https://en.wikipedia.org/wiki/Jahorina'],
      ['medjugorje', 'Međugorje', 'Medjugorje', 'Hercegovina', 'Herzegovina', 43.195, 17.678, 'Mjesto hodočašća i mirnog boravka u hercegovačkom krajoliku.', 'A pilgrimage destination amid the tranquil Herzegovinian landscape.', 'Hodočašće & kultura', 'Pilgrimage & culture', '', 'https://en.wikipedia.org/wiki/Me%C4%91ugorje'],
      ['kupres', 'Kupres', 'Kupres', 'Zapadna Bosna', 'Western Bosnia', 43.993, 17.279, 'Kupreška visoravan s centrima za skijanje, sanjkanje i planinski odmor.', 'Mountain plateau with ski centers, sledding and year-round outdoor experiences.', 'Skijanje & planine', 'Skiing & mountains', '', 'https://visitkupres.com/'],
      ['bjelasnica', 'Bjelašnica', 'Bjelašnica', 'Sarajevska regija', 'Sarajevo region', 43.714, 18.286, 'Olimpijska planina s Babinim Dolom i zimskim sportovima.', 'Olympic mountain with the Babin Do ski area and winter sports.', 'Olimpijska planina', 'Olympic skiing', '', 'https://visitbjelasnica.com/'],
      ['blidinje', 'Blidinje / Risovac', 'Blidinje / Risovac', 'Hercegovina', 'Herzegovina', 43.604, 17.478, 'Park prirode Blidinje i skijaški centar Risovac; uslovi se moraju provjeriti.', 'Blidinje nature park and the Risovac ski area; always check conditions.', 'Skijanje & priroda', 'Skiing & nature', '', 'https://parkprirodeblidinje.ba/turisticka-ponuda/zimska-sezona/']
   ];
   extraDestinations.forEach(a => D.push({ id: a[0], name: a[1], nameEn: a[2], region: a[3], regionEn: a[4], lat: a[5], lon: a[6], description: a[7], descriptionEn: a[8], highlight: a[9], highlightEn: a[10], image: a[11], source: a[12] }));
   const seasonalAffinities = {
      sarajevo: [8, 8, 11, 8], mostar: [10, 10, 9, 3], travnik: [10, 8, 13, 8], vlasic: [7, 9, 10, 13], jajce: [13, 10, 9, 7], banjaluka: [10, 9, 9, 8], bihac: [10, 12, 9, 5], konjic: [9, 11, 9, 6], trebinje: [10, 9, 10, 8], tuzla: [9, 9, 8, 9], visoko: [9, 9, 10, 8], neum: [8, 14, 8, 5], zenica: [9, 8, 9, 9], doboj: [9, 8, 9, 9], brcko: [9, 9, 9, 9], bijeljina: [9, 9, 9, 8], prijedor: [10, 9, 10, 8], jahorina: [8, 9, 9, 16], medjugorje: [10, 8, 10, 7], kupres: [8, 9, 9, 16], bjelasnica: [8, 10, 9, 16], blidinje: [10, 9, 9, 15]
   };
   D.forEach(d => { const a = seasonalAffinities[d.id] || [8, 8, 8, 8]; d.seasonScore = { spring: a[0], summer: a[1], autumn: a[2], winter: a[3] }; });
   D.forEach(d => { d.isSkiResort = ['vlasic', 'jahorina', 'kupres', 'bjelasnica', 'blidinje'].includes(d.id); d.nearbyMountains = { mostar: ['blidinje'], sarajevo: ['bjelasnica', 'jahorina'], travnik: ['vlasic'], konjic: ['bjelasnica'], jajce: ['vlasic'] }[d.id] || []; });
   const ALL = ['spring', 'summer', 'autumn', 'winter'], WARM = ['spring', 'summer', 'autumn'];
   const more = [
      ['sarajevo', 'Tunel spasa', 'Tunnel of Hope', 'history', true, ALL, 90, 43.822, 18.335],
      ['sarajevo', 'Vijećnica Sarajeva', 'Sarajevo City Hall', 'culture', true, ALL, 75, 43.859, 18.434],
      ['sarajevo', 'Žuta tabija — pogled', 'Yellow Fortress viewpoint', 'nature', false, WARM, 65, 43.861, 18.444],
      ['sarajevo', 'Muzej ratnog djetinjstva', 'War Childhood Museum', 'culture', true, ALL, 75, 43.861, 18.43],
      ['sarajevo', 'Trebević — šetnja', 'Trebević mountain outing', 'nature', false, WARM, 130, 43.831, 18.454],
      ['mostar', 'Koski Mehmed-pašina džamija', 'Koski Mehmed Pasha Mosque', 'history', true, ALL, 55, 43.339, 17.817],
      ['mostar', 'Muslibegovića kuća', 'Muslibegović House', 'culture', true, ALL, 70, 43.342, 17.815],
      ['mostar', 'Španski trg', 'Spanish Square', 'history', false, ALL, 45, 43.346, 17.806],
      ['mostar', 'Blagaj — vrelo Bune', 'Blagaj — Buna spring', 'nature', false, WARM, 115, 43.257, 17.903],
      ['mostar', 'Partizansko spomen-groblje', 'Partisan Memorial Cemetery', 'history', false, WARM, 70, 43.344, 17.797],
      ['travnik', 'Plava voda', 'Plava Voda spring', 'nature', false, WARM, 55, 44.23, 17.668],
      ['travnik', 'Elči Ibrahim-pašina medresa — izvana', 'Elči Ibrahim Pasha school exterior', 'history', false, ALL, 35, 44.225, 17.667],
      ['travnik', 'Jeni džamija Travnik', 'Travnik Jeni Mosque', 'culture', false, ALL, 55, 44.226, 17.663],
      ['travnik', 'Travnički zavičajni muzej', 'Travnik Local Museum', 'culture', true, ALL, 70, 44.229, 17.669],
      ['vlasic', 'Galica — planinski vidikovci', 'Galica mountain scenery', 'nature', false, WARM, 110, 44.29, 17.595],
      ['vlasic', 'Devečani — planinski pejzaži', 'Devečani ridge scenery', 'nature', false, ['summer', 'autumn'], 130, 44.31, 17.567],
      ['vlasic', 'Planinsko fotografisanje', 'Mountain photography walk', 'nature', false, WARM, 75, 44.324, 17.56],
      ['vlasic', 'Vlašićki sir — lokalna tradicija', 'Vlašić cheese heritage', 'food', true, ALL, 60, 44.316, 17.573],
      ['jajce', 'Katakombe Jajce', 'Jajce Catacombs', 'history', true, ALL, 60, 44.341, 17.271],
      ['jajce', 'Hram boga Mitrasa', 'Temple of Mithras', 'history', true, ALL, 50, 44.337, 17.27],
      ['jajce', 'Medvjed kula', 'Bear Tower', 'history', false, WARM, 50, 44.342, 17.273],
      ['jajce', 'Stara gradska kapija', 'Old Town Gate', 'history', false, ALL, 45, 44.339, 17.272],
      ['banjaluka', 'Banski dvor', 'Banski Dvor cultural centre', 'culture', true, ALL, 70, 44.777, 17.193],
      ['banjaluka', 'Muzej savremene umjetnosti RS', 'Museum of Contemporary Art RS', 'culture', true, ALL, 70, 44.774, 17.191],
      ['banjaluka', 'Gospodska ulica', 'Gospodska Street', 'history', false, ALL, 60, 44.776, 17.192],
      ['banjaluka', 'Trapisti — historija opatije', 'Trappist Abbey heritage', 'history', false, WARM, 70, 44.806, 17.21],
      ['bihac', 'Kapetanova kula', 'Captain’s Tower', 'history', false, ALL, 65, 44.815, 15.87],
      ['bihac', 'Fethija džamija', 'Fethija Mosque', 'history', true, ALL, 55, 44.816, 15.867],
      ['bihac', 'Japodski otoci', 'Japod Islands', 'nature', false, WARM, 110, 44.772, 15.953],
      ['bihac', 'Martinbrod — slapovi', 'Martin Brod cascades', 'nature', false, WARM, 145, 44.487, 16.142],
      ['konjic', 'Titov bunker ARK D-0', 'Tito’s Bunker ARK D-0', 'history', true, ALL, 110, 43.65, 17.966],
      ['konjic', 'Zavičajni muzej Konjic', 'Konjic Local Museum', 'culture', true, ALL, 70, 43.654, 17.96],
      ['konjic', 'Borci — pejzaži', 'Borci upland scenery', 'nature', false, WARM, 95, 43.6, 18.0],
      ['konjic', 'Neretva — gradska šetnica', 'Neretva town promenade', 'nature', false, WARM, 60, 43.653, 17.962],
      ['trebinje', 'Hercegovačka Gračanica', 'Hercegovačka Gračanica', 'history', false, ALL, 90, 42.705, 18.354],
      ['trebinje', 'Platani i Trg slobode', 'Plane trees & Freedom Square', 'culture', false, ALL, 65, 42.711, 18.345],
      ['trebinje', 'Manastir Tvrdoš', 'Tvrdoš Monastery', 'history', true, ALL, 75, 42.698, 18.292],
      ['trebinje', 'Trebišnjica — obalna šetnja', 'Trebišnjica riverside', 'nature', false, WARM, 70, 42.714, 18.347],
      ['tuzla', 'Trg slobode', 'Freedom Square', 'culture', false, ALL, 60, 44.538, 18.677],
      ['tuzla', 'Međunarodna galerija portreta', 'International Portrait Gallery', 'culture', true, ALL, 75, 44.536, 18.675],
      ['tuzla', 'Slana Banja — park', 'Slana Banja park', 'nature', false, WARM, 70, 44.533, 18.689],
      ['tuzla', 'Kapija — spomenik', 'Kapija memorial', 'history', false, ALL, 50, 44.538, 18.678],
      ['visoko', 'Franjevački samostan sv. Bonaventure', 'St Bonaventure Franciscan Monastery', 'history', true, ALL, 65, 43.987, 18.181],
      ['visoko', 'Čaršija u Visokom', 'Visoko old market walk', 'culture', false, ALL, 60, 43.988, 18.178],
      ['visoko', 'Bosanska dolina piramida — informativno', 'Visoko valley viewpoints', 'nature', false, WARM, 85, 43.988, 18.175],
      ['visoko', 'Stara gradska jezgra', 'Visoko historic centre', 'history', false, ALL, 60, 43.989, 18.178],
      ['neum', 'Neumska šetnica', 'Neum waterfront promenade', 'nature', false, ALL, 80, 42.923, 17.616],
      ['neum', 'Plaža Neum', 'Neum public beachfront', 'nature', false, ['summer'], 125, 42.927, 17.618],
      ['neum', 'Vidikovci Neumskog zaljeva', 'Neum Bay viewpoints', 'nature', false, WARM, 75, 42.929, 17.618],
      ['neum', 'Šetnja starom obalom', 'Old coastline walk', 'history', false, ALL, 65, 42.919, 17.62],
      ['neum', 'Hercegovačka mediteranska kuhinja', 'Herzegovinian coastal cuisine', 'food', true, ALL, 75, 42.923, 17.619],
      ['neum', 'Lokalna maritimna fotografija', 'Coastal photo trail', 'culture', false, WARM, 65, 42.918, 17.613],
      ['zenica', 'Muzej grada Zenice', 'Zenica City Museum', 'culture', true, ALL, 80, 44.202, 17.907],
      ['zenica', 'Vranduk — srednjovjekovna tvrđava', 'Vranduk medieval fortress', 'history', false, WARM, 110, 44.288, 17.912],
      ['zenica', 'Kamberovića polje', 'Kamberovića Field', 'nature', false, WARM, 70, 44.206, 17.905],
      ['zenica', 'Bosansko narodno pozorište', 'Bosnian National Theatre', 'culture', true, ALL, 80, 44.204, 17.91],
      ['zenica', 'Stara čaršija Zenice', 'Zenica old quarter', 'history', false, ALL, 65, 44.201, 17.906],
      ['zenica', 'Smetovi — izlet u prirodu', 'Smetovi highland outing', 'nature', false, WARM, 120, 44.204, 17.996],
      ['doboj', 'Dobojska tvrđava Gradina', 'Doboj Gradina Fortress', 'history', false, ALL, 90, 44.733, 18.086],
      ['doboj', 'Muzej u Doboju', 'Doboj Museum', 'culture', true, ALL, 75, 44.734, 18.087],
      ['doboj', 'Gradski park Doboj', 'Doboj City Park', 'nature', false, WARM, 70, 44.733, 18.091],
      ['doboj', 'Stari centar Doboja', 'Doboj historic centre', 'history', false, ALL, 65, 44.733, 18.09],
      ['doboj', 'Rijeka Bosna — gradski pogled', 'Bosna riverside views', 'nature', false, WARM, 60, 44.735, 18.075],
      ['doboj', 'Lokalna gastronomska pauza', 'Doboj local cuisine', 'food', true, ALL, 65, 44.734, 18.089],
      ['brcko', 'Trg mladih', 'Youth Square', 'culture', false, ALL, 65, 44.874, 18.81],
      ['brcko', 'Ficibajer — šetnja uz Savu', 'Ficibajer Sava riverside', 'nature', false, WARM, 85, 44.882, 18.805],
      ['brcko', 'Gradska vijećnica Brčko', 'Brčko City Hall', 'history', false, ALL, 60, 44.873, 18.81],
      ['brcko', 'Gradska galerija Brčko', 'Brčko City Gallery', 'culture', true, ALL, 75, 44.871, 18.811],
      ['brcko', 'Šetnja starom jezgrom', 'Brčko historic streets', 'history', false, ALL, 70, 44.874, 18.811],
      ['brcko', 'Posavska kuhinja', 'Posavina food experience', 'food', true, ALL, 70, 44.873, 18.81],
      ['bijeljina', 'Muzej Semberije', 'Museum of Semberija', 'culture', true, ALL, 75, 44.758, 19.217],
      ['bijeljina', 'Trg kralja Petra I', 'King Peter I Square', 'history', false, ALL, 60, 44.758, 19.217],
      ['bijeljina', 'Manastir Tavna', 'Tavna Monastery', 'history', true, ALL, 90, 44.634, 19.227],
      ['bijeljina', 'Etno selo Stanišići', 'Stanišići Ethno Village', 'culture', false, ALL, 100, 44.762, 19.283],
      ['bijeljina', 'Gradski park Bijeljina', 'Bijeljina City Park', 'nature', false, WARM, 60, 44.756, 19.219],
      ['bijeljina', 'Semberski domaći okusi', 'Semberija local food', 'food', true, ALL, 70, 44.758, 19.217],
      ['prijedor', 'Muzej Kozare', 'Kozara Museum', 'culture', true, ALL, 75, 44.979, 16.712],
      ['prijedor', 'Nacionalni park Kozara', 'Kozara National Park', 'nature', false, WARM, 145, 45.009, 16.897],
      ['prijedor', 'Rijeka Sana — šetnica', 'Sana riverside path', 'nature', false, WARM, 75, 44.979, 16.711],
      ['prijedor', 'Gradsko šetalište Prijedora', 'Prijedor town promenade', 'culture', false, ALL, 70, 44.979, 16.713],
      ['prijedor', 'Spomenik na Mrakovici', 'Mrakovica Memorial', 'history', false, WARM, 100, 45.011, 16.907],
      ['prijedor', 'Galerija Sreten Stojanović', 'Sreten Stojanović Gallery', 'culture', true, ALL, 65, 44.977, 16.714],
      ['jahorina', 'Olimpijski centar Jahorina', 'Jahorina Olympic Center', 'adventure', false, ['winter'], 145, 43.739, 18.572],
      ['jahorina', 'Poljice — planinski ambijent', 'Poljice mountain area', 'nature', false, ALL, 75, 43.741, 18.57],
      ['jahorina', 'Šetnja planinskim stazama', 'Jahorina mountain trail', 'nature', false, WARM, 135, 43.738, 18.575],
      ['jahorina', 'Odmor uz planinsku kuhinju', 'Mountain dining experience', 'food', true, ALL, 70, 43.738, 18.572],
      ['jahorina', 'Vidikovci Jahorine', 'Jahorina scenic viewpoints', 'nature', false, WARM, 105, 43.737, 18.567],
      ['jahorina', 'Planinska wellness pauza', 'Mountain spa break', 'culture', true, ALL, 85, 43.739, 18.57],
      ['medjugorje', 'Crkva sv. Jakova', 'St James Church', 'history', true, ALL, 80, 43.194, 17.678],
      ['medjugorje', 'Brdo ukazanja — Podbrdo', 'Apparition Hill — Podbrdo', 'nature', false, WARM, 135, 43.204, 17.674],
      ['medjugorje', 'Križevac — uspon', 'Križevac hill walk', 'nature', false, WARM, 160, 43.185, 17.672],
      ['medjugorje', 'Šetnja centrom Međugorja', 'Međugorje centre walk', 'culture', false, ALL, 65, 43.193, 17.679],
      ['medjugorje', 'Mirni vrtovi i molitveni prostori', 'Gardens and quiet reflection', 'culture', false, ALL, 70, 43.194, 17.68],
      ['medjugorje', 'Hercegovačka kuhinja', 'Herzegovinian cuisine', 'food', true, ALL, 75, 43.195, 17.68]
   ];
   add('kupres', 'Ski Kraljica / Stožer', 'Ski Kraljica / Stožer', 'adventure', false, ['winter'], 155, 43.987, 17.279, 'Skijanje samo uz provjeru rada žičara, snijega i staza.', 'Ski only after checking snow, slopes and lift operation.', 'https://visitkupres.com/skijalista/ski-kraljica/');
   add('kupres', 'Adria Ski Kupres', 'Adria Ski Kupres', 'adventure', false, ['winter'], 140, 43.984, 17.267, 'Zimski centar; provjeri aktuelno stanje staza.', 'Winter sports resort; check real-time slope status.', 'https://visitkupres.com/');
   add('kupres', 'Kupreška visoravan', 'Kupres plateau views', 'nature', false, ALL, 85, 43.993, 17.279, 'Pogledi na visoravan; zimski izleti zavise od stanja puteva.', 'Plateau views; winter visits depend on road and weather conditions.');
   add('kupres', 'Kupreška lokalna kuhinja', 'Kupres mountain food', 'food', true, ALL, 75, 43.99, 17.28, 'Planinski gastronomski predah.', 'A cozy mountain food stop.');
   add('kupres', 'Šetnje i fotografisanje Stožera', 'Stožer nature and photo stops', 'nature', false, WARM, 100, 43.986, 17.281, 'U toplijim mjesecima uz odgovarajuće uslove.', 'Nature and viewpoints in suitable conditions.');
   add('bjelasnica', 'Babin Do — skijalište', 'Babin Do ski slopes', 'adventure', false, ['winter'], 150, 43.715, 18.286, 'Provjeri rad liftova i sigurnost staza prije dolaska.', 'Check lifts and slope safety before visiting.', 'https://visitbjelasnica.com/');
   add('bjelasnica', 'Bjelašnica — planinska panorama', 'Bjelašnica mountain panorama', 'nature', false, ALL, 80, 43.715, 18.285, 'Pogledi na olimpijsku planinu, uz provjeru pristupa.', 'Olympic mountain scenery; check access.');
   add('bjelasnica', 'Planinski wellness i odmor', 'Mountain wellness break', 'culture', true, ALL, 85, 43.714, 18.286, 'Odaberi dostupni wellness centar i provjeri radno vrijeme.', 'Choose an available wellness center and verify hours.');
   add('bjelasnica', 'Ljetne pješačke staze', 'Summer hiking routes', 'nature', false, WARM, 140, 43.712, 18.288, 'Planinarska šetnja samo uz prikladne uslove.', 'Hiking only when routes and weather permit.');
   add('bjelasnica', 'Planinska gastronomija', 'Mountain food stop', 'food', true, ALL, 70, 43.716, 18.285, 'Predah uz topli napitak i lokalna jela.', 'Mountain meal and a warm drink.');
   add('blidinje', 'Skijalište Risovac', 'Risovac ski centre', 'adventure', false, ['winter'], 160, 43.606, 17.477, 'Skijanje i sanjkanje, samo ako je centar otvoren.', 'Ski and sled only when the centre confirms operations.', 'https://parkprirodeblidinje.ba/turisticka-ponuda/zimska-sezona/');
   add('blidinje', 'Blidinjsko jezero — vidikovac', 'Blidinje Lake viewpoint', 'nature', false, ALL, 85, 43.604, 17.479, 'Priroda jezera; zimski pristup i stanje ceste obavezno provjeriti.', 'Lake scenery; verify winter access and road conditions.');
   add('blidinje', 'Masna Luka — priroda', 'Masna Luka nature', 'nature', false, WARM, 105, 43.601, 17.467, 'Planinska priroda kada je sigurno i dostupno.', 'Mountain nature when conditions and access allow.');
   add('blidinje', 'Planinska kuhinja Risovca', 'Risovac mountain cuisine', 'food', true, ALL, 75, 43.606, 17.477, 'Predah uz lokalnu hranu u dostupnom objektu.', 'Try mountain cuisine at an operating venue.');
   add('blidinje', 'Hajdučka Vrleta — izlet', 'Hajdučke Vrleti mountain stop', 'culture', true, ALL, 70, 43.61, 17.47, 'Provjeri dostupnost i radno vrijeme.', 'Check opening hours and availability.');
   add('mostar', 'Rujište — planinski izlet (uslovi zavise)', 'Rujište mountain outing (conditions vary)', 'nature', false, ['spring', 'summer', 'autumn', 'winter'], 125, 43.478, 17.929, 'Planina iznad Mostara; rad skijaških sadržaja nije potvrđen.', 'A mountain above Mostar; skiing operation is NOT confirmed.', 'https://en.wikipedia.org/wiki/Ruji%C5%A1te');
   more.forEach(([dest, title, titleEn, type, indoor, seasons, duration, lat, lon]) => add(dest, title, titleEn, type, indoor, seasons, duration, lat, lon,
      'Otkrij ovu lokaciju uz provjeru aktuelnog pristupa i radnog vremena prije posjete.',
      'Explore this attraction and verify access and opening hours before visiting.',
      D.find(d => d.id === dest).source));
   return { destinations: D, activities: A };
})();
