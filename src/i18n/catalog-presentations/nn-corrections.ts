import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./nn";

type MutableExample = {
    title?: string;
    setup?: string;
    conclusion?: string;
    formulas?: string[];
};

type MutableSection = {
    id: string;
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    formulas?: Array<{ expression: string }>;
    examples?: MutableExample[];
};

type MutableConcept = {
    displayName?: string;
    description?: string;
    summary?: string;
    sections: MutableSection[];
};

type MutablePresentationSet = {
    concepts: Record<string, MutableConcept>;
};

const corrected = JSON.parse(JSON.stringify(draftPresentations)) as MutablePresentationSet;

const getSection = (conceptId: string, sectionId: string): MutableSection => {
    const section = corrected.concepts[conceptId].sections.find((candidate) => candidate.id === sectionId);
    if (!section) {
        throw new Error("Nynorsk catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-joule-heating", "what-affects-heating").bullets![2] =
    "Ved konstant spenning aukar oppvarmingseffekten når motstanden minkar.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Kontroller at komponentar, tilkoplingar og isolasjon toler den venta straumen og effekten. Legg inn tilstrekkeleg "
    + "margin fordi verkelege komponentar kan varmast opp ujamnt, og motstanden kan endrast med temperaturen. Batteri "
    + "og straumforsyningar har òg grenser for kontinuerleg straum.";

getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![3] =
    "Ei seriekopling gjev straumen berre éin veg gjennom komponentane.";
getSection("concept-kirchhoffs-laws", "current-law").title = "Kirchhoffs straumlov";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Viss 8 A går inn i ein node og éi grein fører 3 A ut, må dei andre greinene til saman føre 5 A ut. Vel "
    + "straumretningar før du reknar; eit negativt resultat betyr at den verkelege straumen går motsett veg av den "
    + "antatte retninga.";

corrected.concepts["concept-trigonometry"].summary = "Vinklar, lengder og nyttige geometriske forhold.";
getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = motståande / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = hosliggjande / hypotenuse";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "motståande = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "hosliggjande = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-trigonometry", "degrees-and-radians").title = "Grader og radianar";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "Ein kalkulator må vere i rett vinkelmodus. Viss gradmodus blir brukt for ein verdi i radianar, eller omvendt, "
    + "får du eit anna resultat. Ein heil sirkel er 360° eller 2π radianar.";

corrected.concepts["concept-heat-capacity"].description =
    "Varmekapasitet skildrar kor mykje energi som trengst for å endre temperaturen til eit objekt.";
getSection("concept-heat-capacity", "basic-relationships").title = "Grunnleggjande samanhengar";
getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "Ein temperaturskilnad på 1 K er like stor som ein skilnad på 1 °C.";
getSection("concept-heat-capacity", "worked-example").title = "Rekneeksempel";
getSection("concept-heat-capacity", "worked-example").examples![0].title = "Oppvarming av vatn";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "Det ideelle energibehovet er 41,8 kJ; ein verkeleg varmeomn treng meir på grunn av tap.";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "Varmekapasiteten gjeld for heile objektet og avheng av kor mykje materiale som er til stades. Spesifikk "
    + "varmekapasitet er ein materialeigenskap. Ei dobling av massen doblar varmekapasiteten for same materiale.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "Den enkle likninga føreset at den spesifikke varmekapasiteten er omtrent konstant. Varmetap, konveksjon, stråling, "
    + "fordamping, kontaktmotstand og ujamn temperatur kan gjere at eit verkeleg resultat avvik frå det ideelle.";

corrected.concepts["concept-heat-flux"].description =
    "Varmestrøm skildrar kor raskt varmeenergi passerer gjennom eller frå ei overflate.";
getSection("concept-heat-flux", "worked-example").examples![0].setup =
    "Ein varmeomn på 100 W overfører varme gjennom eit areal på 0,020 m².";
getSection("concept-heat-flux", "conduction").bullets![3] =
    "Minusteiknet viser straum frå høgare temperatur mot lågare temperatur.";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Skil mellom gjennomsnittleg varmestrømtettleik og ein lokal topp; oppvarminga kan vere ujamn.";
getSection("concept-heat-flux", "practical-checks").bullets![2] =
    "Ta med kontaktmotstand, konveksjon, stråling og varmetap når det er naudsynt.";

getSection("concept-ohms-law", "rearranged-formulas").bullets![0] =
    "Når motstanden er uendra, aukar straumen når spenninga aukar.";
getSection("concept-ohms-law", "rearranged-formulas").bullets![1] =
    "Når spenninga er uendra, søkk straumen når motstanden aukar.";
getSection("concept-ohms-law", "worked-examples").examples![1].conclusion =
    "Motstanden i krinsen er 6 Ω.";
getSection("concept-ohms-law", "worked-examples").examples![2].conclusion =
    "Spenninga er 5 V.";
getSection("concept-ohms-law", "unit-conversions").title = "Omrekning av einingar";
getSection("concept-ohms-law", "unit-conversions").paragraphs![0] =
    "Hald einingane konsistente før du reknar:";
getSection("concept-ohms-law", "limits").title = "Modellavgrensingar";

corrected.concepts["concept-joule-heating"].summary =
    "Korleis elektrisk energi blir til varme når straum går gjennom ein motstand.";
getSection("concept-joule-heating", "what-affects-heating").bullets![0] =
    "Ved konstant motstand gjev ei dobling av straumen fire gonger så stor oppvarmingseffekt.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Varmeoverføring til luft, væske og maskinvare avgjer den verkelege temperaturen.";

getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Den algebraiske summen av spenningsaukar og spenningsfall rundt ei lukka sløyfe er null. Vel éi sløyferetning "
    + "og hald polaritetane konsekvente. Viss du snur retninga, endrar fortegna seg, ikkje den fysiske løysinga. "
    + "Ein større seriemotstand gjev eit større spenningsfall fordi den same straumen går gjennom alle seriekopla "
    + "komponentane.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Parallellkopla celler held på same spenning, medan kapasitet og tilgjengeleg straum om lag blir lagde saman.";

getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression = "180° = π radianar";
getSection("concept-trigonometry", "waveforms-and-identities").title = "Bølgjeformer og nyttige identitetar";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![1] =
    "Vinkelfrekvensen ω blir målt i radianar per sekund.";

getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "Varm opp 0,20 kg vatn frå 20 °C til 70 °C med c = 4 180 J/(kg·K).";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "Varm opp eksempelet på 41,8 kJ med ei konstant kjelde på 100 W utan tap.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Den ideelle tida er om lag 7,0 minutt; ved 80 % overføringseffektivitet er ho om lag 523 sekund.";
getSection("concept-heat-capacity", "phase-changes-and-limits").title =
    "Faseendringar og praktiske avgrensingar";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Under smelting eller koking kan den tilførte energien endre fasen til materialet utan å endre temperaturen. "
    + "L er spesifikk latent varme i J/kg.";

corrected.concepts["concept-si-system-and-imperial-units"].description =
    "SI-systemet gjev eit samanhengande grunnlag for einingar og omrekning mellom måleverdiar.";
getSection("concept-si-system-and-imperial-units", "other-conversions").title = "Andre vanlege omrekningar";
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Eit pund kan vise til masse (lb) eller kraft (lbf), som er ulike storleikar. Tommar, kvadrattommar og "
    + "kubikktommar viser til ulike dimensjonar.";
getSection("concept-si-system-and-imperial-units", "unit-checks").title = "Praktiske einingskontrollar";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![0] =
    "Skriv eininga ved sida av kvar verdi medan du reknar.";

getSection("concept-ohms-law", "rearranged-formulas").title = "Omforma formlar";
getSection("concept-ohms-law", "rearranged-formulas").paragraphs![0] =
    "Bruk den forma som set verdien du vil finne, på venstresida:";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Ohms lov kan kombinerast med effektformelen P = V × I. Effekt P blir målt i watt (W). For ei kjelde på 4,2 V "
    + "og ei belastning på 1,0 Ω er den ideelle effekten 17,64 W. Komponenten må ha tilstrekkeleg varmekapasitet "
    + "og reserve til å leie bort varmen som oppstår, på ein trygg måte.";

corrected.concepts["concept-joule-heating"].description =
    "Joule-oppvarming skildrar korleis elektrisk energi blir til varme når straum går gjennom ein motstand.";
getSection("concept-joule-heating", "worked-example").title = "Rekneeksempel";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Kontroller at komponentar, tilkoplingar og isolasjon toler den venta straumen og effekten. Legg inn "
    + "tilstrekkeleg margin fordi verkelege komponentar kan varmast opp ujamnt, og motstanden kan endrast med "
    + "temperaturen. Batteri og straumforsyningar har òg grenser for kontinuerleg straum.";

getSection("concept-kirchhoffs-laws", "circuit-terms").title = "Omgrep i krinsar";

getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Gjennomsnittleg varmestrømtettleik frå ein varmeomn";
getSection("concept-heat-flux", "conduction").title = "Leiing gjennom eit flatt lag";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "Konveksjon brukar ein overflatekoeffisient h. Stråling brukar emissiviteten ε og Stefan–Boltzmanns konstant σ; "
    + "temperaturane i strålingslikninga må vere absolutte temperaturar i kelvin.";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "Gjer arealet om til m² før du brukar W/m².";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Varmestrøm er ein overføringsrate, ikkje ein temperatur; bruk varmekapasitet for å rekne temperaturendring.";

getSection("concept-si-system-and-imperial-units", "decimal-prefixes").paragraphs![0] =
    "Til dømes er 2,2 kΩ lik 2 200 Ω, og 15 mA er lik 0,015 A. Gjer om verdiar til kompatible einingar før du "
    + "brukar ein formel.";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].conclusion =
    "Areal- og volumsomrekning brukar lengdefaktoren opphøgd i den aktuelle potensen.";

corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Tråddimensjonssystem skildrar diameter og areal på ulike måtar.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title = "Dimensjonssystem";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Eit høgare vanleg dimensjonstal betyr generelt mindre diameter; storleikar over dimensjon 0 brukar 00, 000 "
    + "eller 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").paragraphs![0] =
    "SWG og BWG er tabellerte system og skal ikkje reknast ut med AWG-formelen. Det same talet viser derfor ikkje "
    + "til same diameter på tvers av systema.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "For 1/0, 2/0, 3/0 og 4/0 brukar du n = 0, -1, -2 og -3. AWG fastset leidarstorleiken, ikkje ein universell "
    + "trygg straum; straumføringsevna kjem òg an på materiale, isolasjon, kjøling, installasjon og gjeldande "
    + "elektriske reglar.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").title =
    "Kvifor systemnamnet er viktig";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "Motstanden kjem an på lengda L, tverrsnittsarealet A og resistiviteten ρ til leidaren. Sidan arealet varierer "
    + "med kvadratet av diameteren, kan ein moderat skilnad i diameter gje ein stor skilnad i motstand. I AWG "
    + "halver ein auke på om lag tre dimensjonar arealet og doblar motstanden per lengdeeining for same materiale "
    + "og temperatur.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![0] =
    "Oppgje systemet, til dømes 24 AWG eller 24 British SWG.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![1] =
    "Ta med nominell diameter i millimeter når systema kan forvekslast.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![2] =
    "Oppgje om dimensjonen gjeld bar leiar, isolert diameter, platetjukkleik eller tjukkleiken på røyrveggen.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "For fleirtrådige leidarar må du oppgje trådkonstruksjonen når fleksibilitet og samla diameter er viktig.";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "I høve til ein vinkel θ ligg den motståande sida på andre sida av vinkelen, den hosliggjande sida rører ved "
    + "vinkelen utan å vere hypotenusen, og hypotenusen ligg mot den rette vinkelen. SOH-CAH-TOA er ein "
    + "hugseregel: sinus er motståande side delt på hypotenusen, cosinus er hosliggjande side delt på hypotenusen, "
    + "og tangens er motståande side delt på hosliggjande side.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "Finn ei sidelengd";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![0] =
    "A er amplituden, f er frekvensen i hertz, t er tida i sekund, og φ er fasevinkelen.";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![2] =
    "Behald forteikn og kvadrant når retning eller fase er viktig.";

getSection("concept-heat-capacity", "basic-relationships").bullets![0] =
    "C er varmekapasiteten i J/K eller J/°C.";
getSection("concept-heat-capacity", "basic-relationships").bullets![1] =
    "Q er tilført eller overført varmeenergi i joule (J).";
getSection("concept-heat-capacity", "basic-relationships").bullets![2] =
    "m er massen i kilogram, og c er den spesifikke varmekapasiteten i J/(kg·K).";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "Varm opp 0,20 kg vatn frå 20 °C til 70 °C med c = 4 180 J/(kg·K).";
getSection("concept-heat-capacity", "electrical-heating").title = "Elektrisk oppvarming";
getSection("concept-heat-capacity", "object-and-material").title = "Objekt og materiale";

getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' er varmestrømtettleik i W/m².";
getSection("concept-heat-flux", "definition").bullets![1] =
    "Q_dot er samla varmeoverføringsrate i watt (W).";
getSection("concept-heat-flux", "definition").bullets![2] =
    "A er arealet som varmen blir overført gjennom, i kvadratmeter (m²).";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "Varmestrøm skil seg frå varmekapasitet: Varmekapasitet skildrar lagra energi per temperaturendring, medan "
    + "varmestrøm skildrar kor raskt varme passerer gjennom ei overflate.";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Den gjennomsnittlege varmestrømtettleiken er 5 000 W/m², eller 0,5 W/cm².";
getSection("concept-heat-flux", "conduction").bullets![0] =
    "k er varmeleiingsevna i W/(m·K).";
getSection("concept-heat-flux", "conduction").bullets![1] =
    "ΔT er temperaturskilnaden over laget.";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "Gjer om arealet til m² før du brukar W/m².";

getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![3].expression =
    "1 in² = 645,16 mm²";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].setup =
    "Gjer om 0,1 tomme til millimeter og 5 mm til tommar.";
getSection("concept-si-system-and-imperial-units", "length-conversions").title = "Tommar og metrisk lengd";

getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![0] =
    "AWG er American Wire Gauge, òg historisk kjent som Brown & Sharpe gauge.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![1] =
    "SWG er Standard Wire Gauge, det historiske britiske systemet for tråd- og platetjukkleik.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").title =
    "Kvifor systemnamnet er viktig";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "Desse verdiane er nominelle. Produkttoleransar, belegg, isolasjon og fleirtråda oppbygging kan endre målt eller "
    + "samla diameter.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Kirchhoffs straumlov";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![0] =
    "Eit knutepunkt er eit sett leiarar som er kopla saman utan ein komponent mellom dei.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![3] =
    "Ei seriekopling gjev straumen berre éin veg gjennom komponentane.";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Dersom 8 A går inn i eit knutepunkt og 3 A går ut gjennom ei grein, må dei andre greinene føre ut til saman 5 A. " +
    "Vel straumretningar før du reknar; eit negativt resultat betyr at den verkelege straumen går motsett veg av den " +
    "antatte retninga.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (parallellgreiner)";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Parallellkopla celler held same spenning, medan kapasitet og tilgjengeleg straum blir om lag summerte.";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Temperaturkoeffisienten skildrar korleis motstanden i ein komponent endrar seg med temperaturen.";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![0] =
    "Ein positiv temperaturkoeffisient tyder at motstanden aukar når temperaturen stig; mange metall oppfører seg slik.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "TCR-en til produsenten gjeld normalt for eit oppgitt temperatur- og motstandsområde. Temperaturgradientar, " +
    "materialendringar, kontaktar, mekanisk belastning og sjølvoppvarming kan gjere at eit verkeleg resultat avvik frå " +
    "førsteordensmodellen.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "motståande = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "hosliggjande = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-trigonometry", "degrees-and-radians").title = "Grader og radianar";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression = "180° = π radianar";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "Ein kalkulator må stå i rett vinkelmodus. Dersom gradmodus blir brukt for ein verdi i radianar, eller omvendt, får " +
    "du eit anna resultat. Ein heil sirkel er 360° eller 2π radianar.";
getSection("concept-trigonometry", "waveforms-and-identities").title = "Bølgjeformer og nyttige identitetar";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![0] =
    "A er amplituden, f er frekvensen i hertz, t er tida i sekund, og φ er fasevinkelen.";
getSection("concept-heat-capacity", "basic-relationships").title = "Grunnleggjande samanhengar";
getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "Ein temperaturforskjell på 1 K er like stor som ein forskjell på 1 °C.";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "Varm opp 0,20 kg vatn frå 20 °C til 70 °C med c = 4 180 J/(kg·K).";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "Varm opp eksempelet på 41,8 kJ med ei konstant kjelde på 100 W utan tap.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Den ideelle tida er om lag 7,0 minutt; ved 80 % overføringseffektivitet er ho om lag 523 sekund.";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "Varmekapasiteten gjeld heile objektet og kjem an på kor mykje materiale som er til stades. Spesifikk varmekapasitet " +
    "er ein materialeigenskap. Ei dobling av massen doblar varmekapasiteten for same materiale.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "Den enkle likninga føreset at den spesifikke varmekapasiteten er omtrent konstant. Varmetap, konveksjon, stråling, " +
    "fordamping, kontaktmotstand og ujamn temperatur kan gjere at eit verkeleg resultat avvik frå det ideelle.";
corrected.concepts["concept-heat-flux"].displayName = "Varmestrømtettleik";

getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 Ω = 4,2 A";
getSection("concept-ohms-law", "unit-conversions").title = "Einingomrekningar";
getSection("concept-ohms-law", "unit-conversions").paragraphs![0] =
    "Hald einingane konsekvente før du reknar:";
getSection("concept-joule-heating", "what-affects-heating").bullets![2] =
    "Ved konstant spenning aukar oppvarmingseffekten når motstanden blir redusert.";
getSection("concept-trigonometry", "right-triangles").formulas = [
    { expression: "sin(θ) = motståande side / hypotenusen" },
    { expression: "cos(θ) = hosliggjande side / hypotenusen" },
    { expression: "tan(θ) = motståande side / hosliggjande side" }
];
getSection("concept-trigonometry", "finding-sides-and-angles").formulas = [
    { expression: "θ = sin^-1(motståande side / hypotenusen)" },
    { expression: "θ = cos^-1(hosliggjande side / hypotenusen)" },
    { expression: "θ = tan^-1(motståande side / hosliggjande side)" }
];
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "motståande side = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "hosliggjande side = 10 × cos(30°) ≈ 8,66 cm";

getSection("concept-ohms-law", "worked-examples").title = "Rekneeksempel";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] =
    "V = 0,5 A × 10 Ω = 5 V";

corrected.concepts["concept-heat-flux"].displayName = "Varmefluks";
corrected.concepts["concept-heat-flux"].description =
    "Varmefluks skildrar kor raskt varme passerer gjennom ei overflate, uavhengig av den totale materialmengda som "
    + "lagrar varme.";
getSection("concept-heat-flux", "definition").bullets![0] = "q'' er varmefluks i W/m².";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "Varmefluks skil seg frå varmekapasitet: Varmekapasitet skildrar lagra energi per temperaturendring, medan "
    + "varmefluks skildrar kor raskt varme passerer gjennom ei overflate.";
getSection("concept-heat-flux", "worked-example").title = "Rekneeksempel";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Gjennomsnittleg varmefluks frå ein varmeomn";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Den gjennomsnittlege varmefluksen er 5 000 W/m², eller 0,5 W/cm².";
getSection("concept-heat-flux", "conduction").bullets![2] = "L er tjukkleiken på laget i meter.";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Skil mellom gjennomsnittleg varmefluks og ein lokal topp; oppvarminga kan vere ujamn.";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Varmefluks er ein overføringsrate, ikkje ein temperatur; bruk varmekapasitet for å rekne temperaturendring.";

corrected.concepts["concept-si-system-and-imperial-units"].displayName =
    "SI-systemet og britiske måleeiningar";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![1] =
    "Kontroller at begge sider av ei likning har kompatible dimensjonar.";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![2] =
    "Gjer om før du multipliserer eller dividerer.";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![3] =
    "Vent med å runde av til slutt, slik at mellomresultata held på nyttig presisjon.";

corrected.concepts["concept-wire-gauges-awg-swg-bwg"].displayName =
    "Tråddimensjonar: AWG, SWG og BWG";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![2] =
    "BWG er Birmingham Wire Gauge, historisk brukt for jarntråd, røyr og platetjukkleik.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Finn straumføringsevna i produktdata og elektriske reglar, ikkje berre ut frå dimensjonstalet.";

export const presentations = corrected as unknown as CatalogPresentationSet;
