import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./nb";

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
    table?: { headers: string[]; rows: string[][] };
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
        throw new Error("Bokmål catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").bullets![1] = "I er strømstyrke, målt i ampere (A).";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] = "I = 4,2 V / 1,0 Ω = 4,2 A";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] = "V = 0,5 A × 10 Ω = 5 V";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Ohms lov kombineres med sammenhengen for effekt, P = V × I. Effekt P måles i watt (W). "
    + "For en kilde på 4,2 V og en belastning på 1,0 Ω er den ideelle effekten 17,64 W. "
    + "Komponenten må ha tilstrekkelig termisk kapasitet og sikkerhetsmargin til å lede bort varmen som oppstår.";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Spolen omdanner energi til varme med en effekt på 7,2 W; på 10 sekunder blir den overførte energien 72 J.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![1] =
    "I = 8,0 V / 0,40 Ω = 20 A";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = motstående side / hypotenusen";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = hosliggende side / hypotenusen";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = motstående side / hosliggende side";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "En hypotenuse på 10 cm danner en vinkel på 30°.";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(motstående side / hypotenusen)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(hosliggende side / hypotenusen)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(motstående side / hosliggende side)";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' er varmeflukstetthet, også kalt varmefluks, i W/m².";
getSection("concept-heat-flux", "conduction").title = "Varmeledning gjennom et flatt lag";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Varmefluks er en overføringsrate per arealenhet, ikke en temperatur; bruk varmekapasitet for å beregne temperaturendring.";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Temperaturkoeffisienten for motstand beskriver hvordan motstanden i et materiale endrer seg når temperaturen endres.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "For en motstand med positiv TCR som drives med konstant spenning, øker motstanden når temperaturen stiger, og "
    + "strømmen har en tendens til å synke. For en konstantstrømkilde øker effekten når den samme motstanden øker.";
getSection("concept-heat-capacity", "basic-relationships").bullets![1] =
    "Q er overført varmeenergi, målt i joule (J).";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Den ideelle tiden er omtrent 7,0 minutter; ved 80 % overføringseffektivitet er den omtrent 523 sekunder.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Under smelting eller koking kan tilført energi endre materialets fase uten å endre temperaturen. L er spesifikk latent "
    + "varme i J/kg.";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![3].expression =
    "1 in² = 645,16 mm²";
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Et pund kan vise til masse (lb) eller kraft (lbf), som er ulike størrelser. På samme måte måler tommer, kvadrattommer "
    + "og kubikktommer ulike dimensjoner.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Et høyere dimensjonstall betyr generelt mindre diameter; størrelser over dimensjon 0 bruker 00, 000 eller 0000.";

getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 Ω = 4,2 A";
corrected.concepts["concept-joule-heating"].summary =
    "Hvordan elektrisk energi omdannes til varme når strøm går gjennom motstand.";
getSection("concept-joule-heating", "heating-power").title = "Varmeeffekt";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "En spole på 0,8 Ω leder en strøm på 3 A.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Varmeoverføring til luft, væske og utstyr bestemmer den faktiske temperaturen.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Elektrisk effekt er en energioverføringsrate, ikke en temperatur. Varmekapasitet og varmeflukstetthet bestemmer "
    + "hvordan energien endrer temperaturen, og hvor raskt varme overføres fra overflaten.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Kontroller at komponenter, tilkoblinger og isolasjon tåler forventet strøm og effekt. Bruk en tilstrekkelig "
    + "sikkerhetsmargin fordi virkelige komponenter kan varmes opp ujevnt, og motstanden kan endres med temperaturen. "
    + "Batterier og strømforsyninger har også grenser for kontinuerlig strøm.";
getSection("concept-kirchhoffs-laws", "circuit-terms").title = "Termer i elektriske kretser";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Hvis 8 A går inn i en node og én gren fører 3 A ut, må de resterende grenene føre til sammen 5 A ut. Velg "
    + "strømretninger før du løser kretsen; et negativt resultat betyr at den virkelige strømmen går motsatt vei av "
    + "den antatte retningen.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "Når grenmotstandene er like, har hver gren en strøm på 10 A.";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Den algebraiske summen av spenningsøkninger og spenningsfall rundt en lukket sløyfe er null. Velg én sløyferetning "
    + "og hold polaritetene konsekvente. Hvis du snur retningen, endres fortegnene, ikke den fysiske løsningen. En "
    + "større seriemotstand gir et større spenningsfall fordi den samme strømmen går gjennom alle seriekoblede komponenter.";
getSection("concept-kirchhoffs-laws", "cells").title = "Serie- og parallellkoblede celler";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Seriekoblede celler legger sammen spenningen, mens kapasiteten i amperetimer tilsvarer én celle med samme kapasitet.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "Seriekoblede litium-ion-celler krever overvåking på cellenivå og egnet balansering eller beskyttelse.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "En forenklet modell kan utelate cellens indre motstand, kontaktmotstand, omformerens virkningsgrad, temperatureffekter, "
    + "transient oppførsel, beskyttelseskretser og komponenttoleranser. Ta med all utelatt oppførsel som påvirker en krets "
    + "med høy strøm vesentlig.";
corrected.concepts["concept-temperature-coefficient-of-resistance"].summary =
    "Hvordan temperaturen endrer motstanden i et materiale.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "Produsentens TCR gjelder normalt for et angitt temperatur- og motstandsområde. Temperaturgradienter, materialendringer, "
    + "kontakter, mekanisk belastning og selvoppvarming kan gjøre at det faktiske resultatet avviker fra førsteordensestimatet.";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "I forhold til en vinkel θ ligger den motstående siden på motsatt side av vinkelen, den hosliggende siden berører "
    + "vinkelen uten å være hypotenusen, og hypotenusen ligger mot den rette vinkelen. SOH-CAH-TOA er en huskeregel: "
    + "sinus er motstående side delt på hypotenusen, cosinus er hosliggende side delt på hypotenusen, og tangens er "
    + "motstående side delt på hosliggende side.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "En hypotenuse på 10 cm ligger overfor en vinkel på 30°.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "motstående side = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "hosliggende side = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-heat-capacity", "object-and-material").title = "Objekt og materiale";
corrected.concepts["concept-heat-flux"].displayName = "Varmeflukstetthet";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "Varmeflukstetthet er forskjellig fra varmekapasitet: Varmekapasitet beskriver lagret energi per temperaturendring, "
    + "mens varmeflukstetthet beskriver varmeoverføring per tids- og arealenhet.";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Ohms lov kombineres med sammenhengen for effekt, P = V × I. Effekt P måles i watt (W). For en kilde på 4,2 V og "
    + "en belastning på 1,0 Ω er den ideelle effekten 17,64 W. Komponenten må ha tilstrekkelig varmeavledningsevne og "
    + "sikkerhetsmargin til å lede bort varmen som oppstår på en trygg måte.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Et høyere dimensjonstall gir generelt mindre diameter; størrelser over dimensjon 0 skrives 00, 000 eller 0000.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Under smelting eller koking kan tilført energi endre materialets fase uten å endre temperaturen. L er den spesifikke "
    + "latente varmen i J/kg.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Kirchhoffs strøm- og spenningslover uttrykker henholdsvis bevaring av ladning i noder og bevaring av energi i "
    + "lukkede sløyfer.";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Hvis 8 A går inn i en node og én gren fører 3 A ut, må de øvrige grenene føre totalt 5 A ut. Velg strømretninger "
    + "før du løser kretsen; et negativt resultat betyr at den virkelige strømmen går motsatt vei av den antatte retningen.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].setup =
    "To motstander på 0,20 Ω kobles i serie til en kilde på 8,0 V.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Parallellkoblede celler har samme spenning, mens kapasiteten og den tilgjengelige strømmen omtrent summeres.";
getSection("concept-kirchhoffs-laws", "cells").bullets![2] =
    "Strømfordelingen avhenger av cellenes indre motstand, kontakter, ledninger og brytere.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].displayName =
    "Motstandens temperaturkoeffisient (TCR)";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].title =
    "Motstand ved høyere temperatur";

getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "Finn en ukjent side";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression = "180° = π radianer";

getSection("concept-heat-capacity", "electrical-heating").title = "Elektrisk oppvarming";

getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Gjennomsnittlig varmeflukstetthet fra en varmeovn";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Den gjennomsnittlige varmeflukstettheten er 5 000 W/m², eller 0,5 W/cm².";
getSection("concept-heat-flux", "conduction").bullets![3] =
    "Minustegnet viser at varme overføres fra høyere temperatur til lavere temperatur.";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "Konveksjon bruker en konveksjonskoeffisient h. Stråling bruker emissivitet ε og Stefan–Boltzmanns konstant σ; "
    + "temperaturene i strålingsligningen må være absolutte temperaturer i kelvin.";

corrected.concepts["concept-si-system-and-imperial-units"].displayName =
    "SI-systemet og imperiske enheter";
corrected.concepts["concept-si-system-and-imperial-units"].description =
    "SI-systemet gir et konsistent sett med grunnenheter, avledede enheter og desimalprefikser for tekniske beregninger.";
getSection("concept-si-system-and-imperial-units", "base-units").title = "SI-basisenheter";
getSection("concept-si-system-and-imperial-units", "length-conversions").title = "Tommer og metriske lengder";

corrected.concepts["concept-wire-gauges-awg-swg-bwg"].displayName =
    "Ledningsdimensjoner: AWG, SWG og BWG";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Et dimensjonstall beskriver bare en nominell størrelse når dimensjonssystemet er angitt.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0,005 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![1].expression =
    "d_mm = 0,127 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "Motstanden avhenger av lederens lengde L, tverrsnittsareal A og materialets resistivitet ρ. Fordi arealet varierer "
    + "med kvadratet av diameteren, kan en liten forskjell i diameter gi en betydelig forskjell i motstand. I AWG halverer "
    + "en økning på omtrent tre dimensjoner arealet og dobler motstanden per lengdeenhet for samme materiale og temperatur.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Finn strømføringsevnen i produktdata og elektriske regler, ikke ut fra dimensjonstallet alene.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Kirchhoffs strøm- og spenningslover beskriver bevaring av ladning i noder og energi i lukkede sløyfer.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Temperaturkoeffisienten for motstand beskriver hvordan motstanden i en komponent endres med temperaturen.";
corrected.concepts["concept-heat-flux"].displayName = "Varmeflukstetthet";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Fastsett strømføringsevnen ut fra produktdata og elektriske regler, ikke bare ut fra måletallet.";

getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 Ω = 4,2 A";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression = "180° = π radianer";

export const presentations = corrected as unknown as CatalogPresentationSet;
