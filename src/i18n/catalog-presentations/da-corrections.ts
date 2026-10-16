import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./da";

type MutableExample = {
    title?: string;
    setup?: string;
    conclusion?: string;
    formulas?: string[];
};

type MutableTable = {
    headers: string[];
    rows: string[][];
};

type MutableSection = {
    id: string;
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    formulas?: Array<{ expression: string }>;
    examples?: MutableExample[];
    table?: MutableTable;
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
        throw new Error("Danish catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "worked-examples").examples![0].title = "Find strømmen";
getSection("concept-ohms-law", "electrical-power").title = "Elektrisk effekt";
getSection("concept-ohms-law", "limits").paragraphs![0] =
    "Ohms lov er en idealiseret model. Virkelige komponenter kan være ikke-ohmske: deres modstand kan ændre sig "
    + "med temperatur, spænding, strøm, frekvens eller driftstilstand. I serie- og parallelkredsløb skal Kirchhoffs "
    + "love bruges sammen med Ohms lov.";

const jouleHeating = corrected.concepts["concept-joule-heating"];
jouleHeating.summary = "Hvordan elektrisk energi omdannes til varme af strømmen.";
getSection("concept-joule-heating", "heating-power").title = "Varmeeffekt";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Elektrisk effekt er en overførselshastighed, ikke en temperatur. Varmekapacitet og varmeflux bestemmer, hvordan "
    + "energien ændrer temperaturen, og hvor hurtigt den forlader overfladen.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Kontrollér, at komponenter, forbindelser og isolering kan håndtere den forventede strøm og effekt. Brug passende "
    + "sikkerhedsmargin, fordi virkelige komponenter kan opvarmes ujævnt, og modstanden kan ændre sig med temperaturen. "
    + "Batterier og strømforsyninger har også grænser for kontinuerlig strøm.";

const kirchhoffs = corrected.concepts["concept-kirchhoffs-laws"];
kirchhoffs.description =
    "Kirchhoffs strøm- og spændingslove beskriver bevarelse ved kredsløbsknuder og omkring lukkede sløjfer.";
getSection("concept-kirchhoffs-laws", "circuit-terms").title = "Kredsløbsbegreber";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "De grundlæggende begreber gør et kredsløbsdiagram lettere at forstå:";
getSection("concept-kirchhoffs-laws", "current-law").title = "Kirchhoffs strømlov";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Hvis 8 A går ind i en knude, og en gren fører 3 A ud, skal de øvrige grene føre i alt 5 A ud. Angiv strømretningerne "
    + "før beregningen; et negativt resultat betyder, at den faktiske strøm løber modsat den antagne retning.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].title = "Seriemodstande";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Den algebraiske sum af spændingsstigninger og -fald omkring en lukket sløjfe er nul. Vælg én omløbsretning, og "
    + "vær konsekvent med polariteten. Hvis retningen vendes, ændres fortegnet, ikke den fysiske løsning. En større "
    + "seriemodstand har et større spændingsfald, fordi den samme strøm løber gennem hver seriekoblet komponent.";
getSection("concept-kirchhoffs-laws", "cells").title = "Celler i serie og parallel";
getSection("concept-kirchhoffs-laws", "cells").bullets![2] =
    "Strømfordelingen afhænger af indre modstand, kontakter, ledninger og afbrydere.";

getSection("concept-trigonometry", "right-triangles").title = "Retvinklede trekanter";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = tilstødende / hypotenusen";

getSection("concept-heat-capacity", "basic-relationships").formulas![0].expression = "C = Q / ΔT";
getSection("concept-heat-flux", "definition").title = "Varmestrømstæthed";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Skeln mellem gennemsnitlig varmestrømstæthed og lokale toppe; opvarmningen kan være ujævn.";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Varmestrømstæthed er en overførselshastighed, ikke en temperatur; brug varmekapacitet til temperaturændringer.";

const siUnits = getSection("concept-si-system-and-imperial-units", "base-units");
siUnits.table!.rows[1][0] = "Masse";
siUnits.table!.rows[5][0] = "Stofmængde";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![2] =
    "Konvertér enheder, før du ganger eller dividerer.";

getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Et større måletal betyder generelt en mindre diameter; størrelser over måler 0 bruger 00, 000 eller 0000.";

getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-ohms-law", "unit-conversions").paragraphs![0] =
    "Hold enhederne konsistente før beregningen:";

getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Spolen omdanner energi til varme med en effekt på 7,2 W, eller 72 J over 10 sekunder.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Varmeoverførsel til luft, væske og udstyr bestemmer den faktiske temperatur.";

getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![0] =
    "En knude er et sæt ledere, der er forbundet uden en mellemliggende komponent.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![3] =
    "En serieforbindelse fører strømmen kun én vej gennem komponenterne.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Parallelforbundne celler har samme spænding, mens kapacitet og tilgængelig strøm omtrent lægges sammen.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = den modstående / hypotenusen";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = den modstående / den tilstødende";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(tilstødende / hypotenusen)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(den modstående / den tilstødende)";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "Det ideelle energibehov er 41,8 kJ; et rigtigt varmelegeme har brug for mere på grund af varmetab.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Den ideelle tid er omkring 7,0 minutter; ved 80 % overførsel er den omkring 523 s.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "Den enkle ligning antager, at den specifikke varmekapacitet er nogenlunde konstant. Varmetab, konvektion, "
    + "stråling, fordampning, kontaktmodstand og ujævn temperatur kan få et reelt resultat til at afvige fra det ideelle.";

getSection("concept-heat-flux", "definition").paragraphs![0] =
    "Varmestrømstæthed adskiller sig fra varmekapacitet: varmekapacitet beskriver lagret energi pr. temperaturændring, "
    + "mens varmestrømstæthed beskriver, hvor hurtigt varme krydser en overflade.";
corrected.concepts["concept-heat-flux"].summary =
    "Hastigheden for varmeoverførsel pr. arealenhed.";
getSection("concept-heat-flux", "conduction").bullets![3] =
    "Minustegnet viser varmestrøm fra højere temperatur til lavere temperatur.";

getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Et pund kan betegne masse (lb) eller kraft (lbf), som er forskellige størrelser. Ligeledes betegner tommer, "
    + "kvadrattommer og kubiktommer forskellige dimensioner.";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 tomme = 25,4 mm = 0,0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 fod = 12 tommer = 0,3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 yard = 3 fod = 0,9144 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![3].expression =
    "1 tomme² = 645,16 mm²";

getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Et større måletal betyder generelt en mindre diameter; størrelser over måletrinnet 0 bruger 00, 000 eller 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "Disse værdier er nominelle. Produkttolerancer, belægninger, isolering og flertrådet konstruktion kan ændre den "
    + "målte eller samlede diameter.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "For flertrådede ledere skal du medtage trådkonstruktionen, når fleksibilitet og samlet diameter har betydning.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Bestem strømkapaciteten ud fra produktdata og elektriske regler, ikke ud fra måletallet alene.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Temperaturkoefficienten for modstand beskriver, hvordan modstanden ændrer sig, når et materiale opvarmes eller "
    + "afkøles.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").paragraphs![0] =
    "Ved en lille eller moderat temperaturændring skal du bruge førsteordensrelationen:";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![3] =
    "Koefficientens fortegn er vigtigt; hvis en negativ værdi erstattes af dens absolutte værdi, vendes forudsigelsen.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "Regneeksempel";

getSection("concept-ohms-law", "relationship").bullets![1] =
    "I er strøm, målt i ampere (A).";
corrected.concepts["concept-joule-heating"].summary =
    "Hvordan elektrisk energi omdannes til varme i en modstand.";
getSection("concept-joule-heating", "worked-example").title = "Regneeksempel";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "I forhold til en vinkel θ ligger den modstående side over for vinklen, den tilstødende side rører vinklen uden "
    + "at være hypotenusen, og hypotenusen ligger over for den rette vinkel. SOH-CAH-TOA er en huskeregel: sinus er "
    + "den modstående side divideret med hypotenusen, cosinus er den tilstødende side divideret med hypotenusen, "
    + "og tangens er den modstående side divideret med den tilstødende side.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "En hypotenuse på 10 cm danner en vinkel på 30°.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "den modstående = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "den tilstødende = 10 × cos(30°) ≈ 8,66 cm";

corrected.concepts["concept-heat-flux"].displayName = "Varmestrømstæthed";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' er varmestrømstæthed i W/m².";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Gennemsnitlig varmestrømstæthed";
getSection("concept-heat-flux", "worked-example").examples![0].setup =
    "Et varmelegeme på 100 W overfører varme gennem et areal på 0,020 m².";

getSection("concept-si-system-and-imperial-units", "base-units").table!.headers[1] = "SI-enhed";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![0] =
    "0,1 tomme × 25,4 = 2,54 mm";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![1] =
    "5 mm / 25,4 ≈ 0,19685 tomme";

corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Et måletal beskriver kun en nominel størrelse, når målesystemet er angivet.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].summary =
    "Hvorfor måletal for ledninger kræver et navngivet system og en angivet diameter.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").title =
    "AWG-diameter og areal";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.headers[2] =
    "Britisk SWG";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title =
    "Måletal, areal og modstand";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").formulas![0].expression =
    "R = ρ × L / A";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").title =
    "Praktisk angivelse";

getSection("concept-ohms-law", "worked-examples").examples![1].title = "Find modstanden";
getSection("concept-ohms-law", "worked-examples").examples![2].title = "Find spændingen";

getSection("concept-joule-heating", "what-affects-heating").bullets![0] =
    "Ved konstant modstand giver en fordobling af strømmen fire gange så stor varmeeffekt.";
getSection("concept-joule-heating", "what-affects-heating").bullets![1] =
    "Ved konstant strøm bliver varmeeffekten fordoblet, når modstanden fordobles.";
getSection("concept-joule-heating", "what-affects-heating").bullets![2] =
    "Ved konstant spænding stiger varmeeffekten, når modstanden sænkes.";

getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Seriekoblede celler lægger spændingerne sammen, mens kapaciteten i amperetimer svarer omtrent til én celle.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "Opladning af seriekoblede litiumionceller kræver overvågning på celleniveau og passende balancering eller beskyttelse.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").title = "Analyse af virkelige kredsløb";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![0] =
    "Markér knudespændinger, grenstrømme og de antagne strømretninger.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "Løs de samtidige ligninger, og kontrollér effektbalancen.";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "For en modstand med positiv TCR, der drives ved konstant spænding, øger stigende temperatur modstanden, og "
    + "strømmen har tendens til at falde. Ved en konstantstrømskilde øger den samme modstandsforøgelse effekten.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "Producentens TCR gælder normalt for et angivet temperatur- og modstandsområde. Temperaturgradienter, "
    + "materialeændringer, kontakter, mekanisk belastning og selvopvarmning kan få et virkeligt resultat til at afvige "
    + "fra førsteordensestimatet.";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![1] =
    "Vinkelfrekvensen ω måles i radianer i sekundet.";

getSection("concept-heat-capacity", "object-and-material").title = "Objekt og materiale";
getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "En temperaturforskel på 1 K er lige så stor som en forskel på 1 °C.";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "Konvertér arealet til m², før du bruger W/m².";

getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 tomme = 25,4 mm = 0,0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 fod = 12 tommer = 0,3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 yard = 3 fod = 0,9144 m";

getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![0] =
    "AWG er American Wire Gauge, også historisk kendt som Brown & Sharpe gauge.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![1] =
    "Medtag den nominelle diameter i millimeter, når systemerne kan forveksles.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![2] =
    "Angiv, om dimensionen gælder en blank leder, isoleret diameter, pladetykkelse eller rørvægstykkelse.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").paragraphs![0] =
    "SWG og BWG er tabellerede systemer og må ikke beregnes med AWG-formlen. Det samme måletal svarer derfor ikke "
    + "til samme diameter på tværs af systemerne.";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "Modstanden afhænger af lederens længde L, tværsnitsarealet A og materialets resistivitet ρ. Da arealet varierer "
    + "med diameterens kvadrat, kan en lille diameterforskel give en stor modstandsforskel. I AWG halverer en stigning "
    + "på cirka tre måletal arealet og fordobler modstanden pr. længdeenhed for samme materiale og temperatur.";
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Et pund kan betegne masse (lb) eller kraft (lbf), som er forskellige størrelser. Tilsvarende betegner tommer, "
    + "kvadrattommer og kubiktommer forskellige dimensioner.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Kirchhoffs strøm- og spændingslove beskriver bevarelse af ladning ved knudepunkter og energi i lukkede sløjfer.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Modstandens temperaturkoefficient beskriver, hvordan en komponents modstand ændrer sig med temperaturen.";
corrected.concepts["concept-heat-flux"].displayName = "Varmefluxdensitet";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Bestem strømføringsevnen ud fra produktdata og elektriske regler, ikke ud fra måletallet alene.";

getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Elektrisk effekt er en hastighed for energioverførsel, ikke en temperatur. Varmekapacitet og varmeflux bestemmer, " +
    "hvordan denne energi ændrer temperaturen, og hvor hurtigt den forlader overfladen.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Kontrollér, at komponenter, forbindelser og isolering kan håndtere den forventede strøm og effekt. Brug passende " +
    "sikkerhedsmargin, fordi virkelige komponenter kan opvarmes ujævnt, og modstanden kan ændre sig med temperaturen. " +
    "Batterier og strømforsyninger har også kontinuerlige strømgrænser.";
getSection("concept-ohms-law", "worked-examples").examples![0].title = "Find strømmen";
getSection("concept-ohms-law", "electrical-power").title = "Elektrisk effekt";
getSection("concept-kirchhoffs-laws", "current-law").title = "Kirchhoffs strømlov";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Hvis 8 A løber ind i en knude, og en gren leder 3 A væk, skal de resterende grene tilsammen lede 5 A væk. " +
    "Vælg strømretninger før løsningen; et negativt resultat betyder, at den faktiske strøm løber modsat den antagne retning.";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Den algebraiske sum af spændingsstigninger og spændingsfald omkring en lukket sløjfe er nul. Vælg én sløjferetning, " +
    "og hold polariteterne konsistente. Hvis retningen vendes, ændres tegnene, ikke den fysiske løsning. En større " +
    "seriemodstand har et større spændingsfald, fordi den samme strøm løber gennem hver seriemodstand.";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = tilstødende / hypotenusen";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(tilstødende / hypotenusen)";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![2] =
    "Konverter før du multiplicerer eller dividerer.";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![3] =
    "Rund kun af til sidst, så mellemresultaterne bevarer en brugbar præcision.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Et større almindeligt måletal betyder generelt en mindre diameter; størrelser over måler 0 bruger 00, 000 eller 0000.";
getSection("concept-trigonometry", "right-triangles").formulas = [
    { expression: "sin(θ) = den modstående side / hypotenusen" },
    { expression: "cos(θ) = den tilstødende side / hypotenusen" },
    { expression: "tan(θ) = den modstående side / den tilstødende side" }
];
getSection("concept-trigonometry", "finding-sides-and-angles").formulas = [
    { expression: "θ = sin^-1(den modstående side / hypotenusen)" },
    { expression: "θ = cos^-1(den tilstødende side / hypotenusen)" },
    { expression: "θ = tan^-1(den modstående side / den tilstødende side)" }
];
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "den modstående side = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "den tilstødende side = 10 × cos(30°) ≈ 8,66 cm";

const ohmRelationship = getSection("concept-ohms-law", "relationship");
ohmRelationship.bullets![2] = "R er modstanden, målt i ohm (Ω).";
ohmRelationship.bullets![1] = "I er strømmen, målt i ampere (A).";
getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "En modstand på nul Ω er en ideel kortslutning og skal håndteres separat.";
const ohmExamples = getSection("concept-ohms-law", "worked-examples").examples!;
getSection("concept-ohms-law", "worked-examples").title = "Gennemregnede eksempler";
ohmExamples[0].setup = "En 4,2 V-kilde er forbundet med en belastning på 1,0 Ω.";
ohmExamples[0].formulas![0] = "I = 4,2 V / 1,0 Ω = 4,2 A";
ohmExamples[1].formulas![0] = "R = 12 V / 2 A = 6 Ω";
ohmExamples[1].conclusion = "Kredsløbets modstand er 6 Ω.";
ohmExamples[1].setup = "Der er en spændingsforskel på 12 V over et kredsløb, som trækker 2 A.";
ohmExamples[2].setup = "En strøm på 0,5 A løber gennem en modstand på 10 Ω.";
const ohmConversions = getSection("concept-ohms-law", "unit-conversions");
ohmConversions.bullets![0] = "1 kΩ = 1.000 Ω";
ohmConversions.bullets![1] = "1 MΩ = 1.000.000 Ω";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Ohms lov kombineres med effektforholdet P = V × I. Effekten P måles i watt (W). For en kilde på 4,2 V og en "
    + "belastning på 1,0 Ω er den ideelle effekt 17,64 W. Komponenten skal have tilstrækkelig varmekapacitet og "
    + "sikkerhedsmargin til at bortlede den udviklede varme sikkert.";

getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "En coil med en modstand på 0,8 Ω fører 3 A.";
const kirchhoffExamples = getSection("concept-kirchhoffs-laws", "series-and-parallel").examples!;
kirchhoffExamples[0].setup = "To modstande på 0,20 Ω i serie er forbundet med 8,0 V.";
kirchhoffExamples[0].formulas![0] = "R_total = 0,40 Ω";
kirchhoffExamples[1].setup = "To lige store grene på 0,40 Ω er forbundet parallelt med 4,0 V.";
kirchhoffExamples[1].formulas![0] = "R_total = 0,20 Ω";
kirchhoffExamples[1].conclusion = "Når grenmodstandene er ens, løber der 10 A gennem hver gren.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![1] =
    "Anvend KCL ved uafhængige knudepunkter og KVL omkring uafhængige sløjfer.";

const tcrLinear = getSection("concept-temperature-coefficient-of-resistance", "linear-model");
tcrLinear.bullets![2] = "α er materialets temperaturkoefficient, udtrykt i 1/°C eller ppm/°C.";
const tcrExample = getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0];
tcrExample.setup = "En modstand på 1,00 Ω er specificeret ved 20 °C med en TCR på 400 ppm/°C.";
tcrExample.formulas![0] = "α = 400 × 10^-6 / °C = 0,0004 / °C";
tcrExample.formulas![1] = "ΔT = 100 - 20 = 80 °C";
tcrExample.formulas![2] = "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 Ω";
tcrExample.conclusion = "Den estimerede modstand er 1,032 Ω, cirka 3,2 % over værdien ved 20 °C.";

getSection("concept-si-system-and-imperial-units", "base-units").bullets![1] = "Modstand: ohm (Ω).";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").paragraphs![0] =
    "For eksempel er 2,2 kΩ lig med 2.200 Ω, og 15 mA er lig med 0,015 A. Konvertér værdier til kompatible "
    + "enheder, før du bruger en formel.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].displayName = "Trådmål: AWG, SWG og BWG";
corrected.concepts["concept-joule-heating"].displayName = "Joule-opvarmning";
const circuitTerms = getSection("concept-kirchhoffs-laws", "circuit-terms");
circuitTerms.title = "Kredsløbsbegreber";
circuitTerms.bullets![0] = "Et knudepunkt er et sæt ledere, der er forbundet uden en mellemliggende komponent.";
circuitTerms.bullets![4] = "En parallelforbindelse forbinder grene mellem de samme to knudepunkter.";
const kirchhoffCells = getSection("concept-kirchhoffs-laws", "cells");
kirchhoffCells.title = "Celler i serie og parallel";
kirchhoffCells.bullets![1] =
    "Parallelforbundne celler bevarer samme spænding, mens kapaciteten og den tilgængelige strøm omtrent lægges sammen.";
kirchhoffCells.bullets![2] =
    "Strømfordelingen afhænger af den indre modstand, kontakterne, ledningerne og afbryderne.";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
corrected.concepts["concept-si-system-and-imperial-units"].displayName = "SI-systemet og britiske måleenheder";
siBaseUnits.headers[1] = "SI-enhed";
siBaseUnits.rows[1] = ["Masse", "kilogram", "kg"];
siBaseUnits.rows[5] = ["Stofmængde", "mol", "mol"];
siBaseUnits.rows[6] = ["Lysstyrke", "candela", "cd"];
const lengthExample = getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0];
lengthExample.formulas![0] = "0,1 tomme × 25,4 = 2,54 mm";
lengthExample.formulas![1] = "5 mm / 25,4 ≈ 0,19685 tomme";

const heatFluxExample = getSection("concept-heat-flux", "worked-example").examples![0];
getSection("concept-heat-capacity", "worked-example").title = "Gennemregnet eksempel";
getSection("concept-heat-flux", "worked-example").title = "Gennemregnet eksempel";
heatFluxExample.setup = "Et varmelegeme på 100 W overfører varme gennem et areal på 0,020 m².";
const heatFluxChecks = getSection("concept-heat-flux", "practical-checks");
heatFluxChecks.bullets![1] = "Skeln mellem gennemsnitlig varmeflux og en lokal spidsværdi; opvarmningen kan være ujævn.";
heatFluxChecks.bullets![3] =
    "Varmeflux er en overførselshastighed, ikke en temperatur; brug varmekapacitet til temperaturændringer.";

const wireGaugeConcept = corrected.concepts["concept-wire-gauges-awg-swg-bwg"];
wireGaugeConcept.description = "Et måletal beskriver kun en nominel størrelse, når trådmålssystemet er angivet.";
wireGaugeConcept.summary = "Hvorfor et trådmål kræver et navngivet system og en angivet diameter.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.headers[0] = "Måletal";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").title = "AWG-diameter og -areal";
const danishGaugeRows = getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows;
danishGaugeRows[0][1] = "2,588 mm";
danishGaugeRows[0][2] = "3,251 mm";
danishGaugeRows[0][3] = "3,404 mm";

export const presentations = corrected as unknown as CatalogPresentationSet;
