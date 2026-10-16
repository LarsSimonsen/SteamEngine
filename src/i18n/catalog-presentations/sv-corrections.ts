import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./sv";

type MutableExample = { title?: string; setup?: string; conclusion?: string; formulas?: string[] };
type MutableSection = {
    id: string;
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    formulas?: Array<{ expression: string }>;
    examples?: MutableExample[];
    table?: { headers: string[]; rows: string[][] };
};
type MutableConcept = { displayName?: string; description?: string; summary?: string; sections: MutableSection[] };
type MutablePresentationSet = { concepts: Record<string, MutableConcept> };

const corrected = JSON.parse(JSON.stringify(draftPresentations)) as MutablePresentationSet;
const getSection = (conceptId: string, sectionId: string): MutableSection => {
    const section = corrected.concepts[conceptId].sections.find((candidate) => candidate.id === sectionId);
    if (!section) {
        throw new Error("Swedish catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").bullets![1] = "I är ström, mätt i ampere (A).";
getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-joule-heating", "heating-power").title = "Värmeeffekt";
getSection("concept-joule-heating", "heating-power").formulas![2].expression = "P = V^2 / R";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Spolen omvandlar energi till värme med effekten 7,2 W, alltså 72 J under 10 sekunder.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = opposite / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = adjacent / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = opposite / adjacent";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(opposite / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(adjacent / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(opposite / adjacent)";

getSection("concept-heat-capacity", "basic-relationships").formulas![0].expression = "C = Q / ΔT";
getSection("concept-heat-capacity", "basic-relationships").formulas![1].expression = "Q = m × c × ΔT";
getSection("concept-heat-capacity", "worked-example").examples![0].formulas![0] =
    "ΔT = 70 - 20 = 50 °C";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Den ideala tiden är cirka 7,0 minuter; vid 80 % överföringseffektivitet är den cirka 523 s.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "Den enkla ekvationen antar att den specifika värmekapaciteten är ungefär konstant. Värmeförlust, konvektion, "
    + "strålning, avdunstning, kontaktresistans och ojämn temperatur kan göra att det verkliga resultatet avviker från det ideala.";

getSection("concept-heat-flux", "definition").formulas![0].expression = "q'' = Q_dot / A";
getSection("concept-heat-flux", "conduction").formulas![0].expression = "q'' = -k × ΔT / L";
corrected.concepts["concept-heat-flux"].description =
    "Värmeflödestäthet beskriver hur snabbt värme överförs genom varje ytenhet, oberoende av den totala mängden material "
    + "som lagrar värme.";
corrected.concepts["concept-heat-flux"].summary = "Värmeöverföringshastigheten per ytenhet.";
getSection("concept-heat-flux", "definition").bullets![0] = "q'' är värmeflödestäthet i W/m².";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "Konvektion använder konvektionskoefficienten h. Strålning använder emissiviteten ε och Stefan–Boltzmanns konstant σ; "
    + "temperaturerna i strålningsekvationen måste vara absoluta temperaturer i Kelvin.";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[1][0] = "Massa";
siBaseUnits.rows[2][0] = "Tid";
siBaseUnits.rows[2][1] = "sekund";
siBaseUnits.rows[5][0] = "Substansmängd";
siBaseUnits.rows[5][1] = "mol";

getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "För flertrådiga ledare ska trådarnas uppbyggnad anges när flexibilitet och total diameter är viktiga.";

getSection("concept-ohms-law", "worked-examples").examples![0].title = "Hitta strömmen";
getSection("concept-ohms-law", "electrical-power").title = "Elektrisk effekt";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Ohms lag kombineras med effektförhållandet P = V × I. Effekten P mäts i watt (W). För en 4,2 V-källa och en "
    + "belastning på 1,0 Ω är den ideala effekten 17,64 W. Komponenten behöver tillräcklig värmekapacitet och en "
    + "säkerhetsmarginal för att avleda den resulterande värmen på ett säkert sätt.";
corrected.concepts["concept-joule-heating"].summary =
    "Hur elektrisk ström omvandlar elektrisk energi till värme.";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "En spole på 0,8 Ω leder 3 A.";
getSection("concept-joule-heating", "what-affects-heating").bullets![1] =
    "Vid konstant ström fördubblar en fördubbling av motståndet värmeeffekten.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Värmeöverföring till luft, vätska och utrustning bestämmer den faktiska temperaturen.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Kontrollera att komponenter, anslutningar och isolering klarar förväntad ström och effekt. Använd en lämplig "
    + "säkerhetsmarginal eftersom verkliga komponenter kan värmas ojämnt och motståndet kan ändras med temperaturen. "
    + "Batterier och nätaggregat har också kontinuerliga strömgränser.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Kirchhoffs strömlag";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Om 8 A går in i en nod och en gren leder bort 3 A måste de återstående grenarna leda bort sammanlagt 5 A. Välj "
    + "strömriktningar innan du löser; ett negativt resultat betyder att den verkliga strömmen flyter motsatt den "
    + "antagna riktningen.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![3] =
    "En seriekoppling ger strömmen endast en väg genom komponenterna.";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Den algebraiska summan av spänningsökningar och spänningsfall runt en sluten slinga är noll. Välj en slingriktning "
    + "och håll polariteterna konsekventa. Att vända riktningen ändrar tecknen, inte den fysiska lösningen. Ett större "
    + "seriemotstånd ger ett större spänningsfall eftersom samma ström flyter genom varje seriekopplad komponent.";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (series)";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "Att ladda litiumjonceller i serie kräver övervakning på cellnivå och lämplig balansering eller skydd.";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").title =
    "TCR, effekt och praktiska gränser";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
corrected.concepts["concept-heat-flux"].displayName = "Värmeflödestäthet";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Värmeflöde är en överföringshastighet, inte en temperatur; använd värmekapacitet för temperaturförändringen.";

const siUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siUnits.rows[0][1] = "meter";
getSection("concept-si-system-and-imperial-units", "length-conversions").title = "Tum och metrisk längd";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].displayName =
    "Tråddimensioner: AWG, SWG och BWG";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Ett högre vanligt mätartal betyder i allmänhet en mindre diameter; storlekar över 0 skrivs 00, 000 eller 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0.005 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").formulas![0].expression =
    "R = ρ × L / A";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Bestäm strömkapaciteten utifrån produktdata och elektriska regler, inte enbart utifrån mätartalet.";

getSection("concept-ohms-law", "relationship").title = "Sambandet";
getSection("concept-ohms-law", "rearranged-formulas").title = "Omformade formler";
getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "En resistans på 0 Ω är en idealisk kortslutning och måste hanteras separat.";
getSection("concept-ohms-law", "worked-examples").examples![1].title = "Beräkna resistansen";
getSection("concept-ohms-law", "worked-examples").examples![2].title = "Beräkna spänningen";

corrected.concepts["concept-joule-heating"].displayName = "Jouleuppvärmning";
getSection("concept-joule-heating", "what-affects-heating").bullets![2] =
    "Vid konstant spänning ökar minskad resistans värmeeffekten.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Elektrisk effekt är en överföringshastighet för energi, inte en temperatur. Värmekapacitet och värmeflödestäthet avgör "
    + "hur energin förändrar temperaturen och hur snabbt den lämnar ytan.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Kirchhoffs ström- och spänningslagar beskriver bevarandet av laddning i noder och energi runt slutna slingor.";
getSection("concept-kirchhoffs-laws", "circuit-terms").title = "Kretstermer";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "De grundläggande termerna gör ett kretsschema lättare att tolka:";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (parallel branches)";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Seriekopplade celler adderar spänningen, medan kapaciteten i amperetimmar förblir densamma som för en motsvarande enskild cell.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Parallellkopplade celler behåller samma spänning, medan kapacitet och tillgänglig ström ökar ungefär proportionellt.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "Sambandet mellan resistansens spänning och ström är V = I × R.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].displayName =
    "Resistansens temperaturkoefficient (TCR)";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![3] =
    "Temperaturerna måste uttryckas med samma skala och enheter för skillnaden T - T_0.";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![3] =
    "Koefficientens tecken är viktigt; om ett negativt värde ersätts med absolutbeloppet blir förutsägelsen omvänd.";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "I förhållande till vinkeln θ ligger den motstående sidan mitt emot vinkeln, den närliggande sidan vidrör vinkeln utan att "
    + "vara hypotenusan, och hypotenusan ligger mitt emot den räta vinkeln. SOH-CAH-TOA hjälper dig att minnas att sinus är "
    + "motstående sida genom hypotenusan, cosinus är närliggande sida genom hypotenusan och tangens är motstående sida genom närliggande sida.";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "Kalkylatorn måste vara inställd på rätt vinkelläge. Om gradläget används för ett värde i radianer, eller tvärtom, blir resultatet "
    + "annorlunda. Ett helt varv är 360° eller 2π radianer.";

getSection("concept-heat-capacity", "basic-relationships").title = "Grundläggande samband";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "Värm 0,20 kg vatten från 20 °C till 70 °C med c = 4 180 J/(kg·K).";

getSection("concept-si-system-and-imperial-units", "base-units").title = "SI-grundenheter";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").title = "Decimala prefix";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 yard = 3 fot = 0,9144 m";

getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title = "Kalibersystem";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![0] =
    "AWG är American Wire Gauge, även historiskt känt som Brown & Sharpes tråddimensioneringssystem.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Kirchhoffs ström- och spänningslagar beskriver bevarandet av laddning i noder och energi i slutna slingor.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Motståndets temperaturkoefficient beskriver hur en komponents motstånd förändras med temperaturen.";
corrected.concepts["concept-heat-flux"].displayName = "Värmeflödestäthet";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Bestäm strömförmågan utifrån produktdata och elektriska regler, inte enbart utifrån mätetalet.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Kirchhoffs strömlag";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Om 8 A går in i en nod och en gren leder bort 3 A, måste de återstående grenarna tillsammans leda bort 5 A. " +
    "Välj strömriktningar innan du löser ekvationerna; ett negativt resultat betyder att den verkliga strömmen går motsatt " +
    "den antagna riktningen.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = motstående sida / hypotenusan";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = närliggande sida / hypotenusan";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = motstående sida / närliggande sida";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(motstående sida / hypotenusan)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(närliggande sida / hypotenusan)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(motstående sida / närliggande sida)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "motstående sida = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "närliggande sida = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (seriekoppling)";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (parallellkopplade grenar)";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 yard = 3 fot = 0,9144 m";

getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").title =
    "Diameter och area enligt AWG";

getSection("concept-ohms-law", "worked-examples").title =
    "Lösta exempel";
getSection("concept-joule-heating", "worked-example").title =
    "Löst exempel";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title =
    "Löst exempel";
getSection("concept-heat-capacity", "worked-example").title =
    "Löst exempel";
getSection("concept-heat-flux", "worked-example").title =
    "Löst exempel";
getSection("concept-kirchhoffs-laws", "cells").title =
    "Serie- och parallellkopplade celler";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "Sambandet mellan spänningen över ett motstånd och strömmen genom det är V = I × R.";
getSection("concept-heat-flux", "definition").bullets![2] =
    "A är arean genom vilken värme överförs, i kvadratmeter (m²).";
corrected.concepts["concept-si-system-and-imperial-units"].displayName =
    "SI-systemet och brittiska måttenheter";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Ett dimensionsnummer beskriver en nominell storlek endast när dess dimensionssystem anges.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].summary =
    "Varför trådens dimensionsnummer behöver ett namngivet system och en angiven diameter.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Ett högre vanligt dimensionsnummer betyder i allmänhet en mindre diameter; storlekar "
    + "över 0 skrivs 00, 000 eller 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.headers![0] =
    "Dimensionsnummer";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title =
    "Tråddimension, area och motstånd";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "Motstånd beror på ledarlängd L, tvärsnittsarea A och materialresistivitet ρ. Eftersom "
    + "arean varierar med kvadraten på diametern, kan en blygsam diameterskillnad göra en "
    + "betydande motståndsskillnad. I AWG halverar en ökning av dimensionsnumret med tre "
    + "storlekar ungefär arean och fördubblar motståndet per längdenhet för samma material "
    + "och temperatur.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Bestäm strömförmågan utifrån produktdata och elektriska regler, inte enbart utifrån "
    + "dimensionsnumret.";

getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "Lös ekvationssystemet och kontrollera effektbalansen.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "En tillverkares TCR gäller normalt för ett angivet temperatur- och motståndsområde. "
    + "Temperaturgradienter, materialförändringar, kontakter, mekanisk töjning och "
    + "självuppvärmning kan göra att ett verkligt resultat skiljer sig från första ordningens "
    + "uppskattning.";
getSection("concept-trigonometry", "right-triangles").title =
    "Rätvinkliga trianglar";
corrected.concepts["concept-heat-capacity"].summary =
    "Hur mycket energi ett föremål behöver för att ändra temperatur.";
getSection("concept-si-system-and-imperial-units", "base-units").title =
    "Vanliga SI-enheter";
getSection("concept-si-system-and-imperial-units", "base-units").table!.headers![0] =
    "Storhet";
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Ett pund kan hänvisa till massa (lb) eller kraft (lbf), som är olika storheter. På "
    + "samma sätt mäter tum, kvadrattum och kubiktum olika dimensioner.";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].conclusion =
    "Area- och volymomvandlingar använder längdfaktorn upphöjd till motsvarande potens.";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![3] =
    "Avrunda först i slutet så att mellanresultaten behåller användbar precision.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "För 1/0, 2/0, 3/0 och 4/0, använd n = 0, -1, -2 och -3. AWG bestämmer ledarstorlek, "
    + "inte en universell säker ström; strömförmåga beror också på material, isolering, "
    + "kylning, installation och tillämpliga elektriska regler.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "Dessa värden är nominella. Produkttoleranser, beläggningar, isolering och flertrådig "
    + "konstruktion kan ändra den uppmätta eller totala diametern.";
getSection("concept-ohms-law", "relationship").bullets![2] =
    "R är motstånd, mätt i ohm (Ω).";
getSection("concept-ohms-law", "worked-examples").examples![0].setup =
    "En 4,2 V-källa är ansluten till en 1,0 Ω belastning.";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 Ω = 4,2 A";
getSection("concept-ohms-law", "worked-examples").examples![1].formulas![0] =
    "R = 12 V / 2 A = 6 Ω";
getSection("concept-ohms-law", "worked-examples").examples![1].conclusion =
    "Kretsresistansen är 6 Ω.";
getSection("concept-ohms-law", "worked-examples").examples![2].setup =
    "En ström på 0,5 A flyter genom ett 10 Ω motstånd.";
getSection("concept-ohms-law", "unit-conversions").bullets![0] =
    "1 kΩ = 1 000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![1] =
    "1 MΩ = 1 000 000 Ω";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].setup =
    "Två 0,20 Ω motstånd i serie är anslutna till 8,0 V.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![0] =
    "R_total = 0,40 Ω";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].setup =
    "Två lika 0,40 Ω grenar är anslutna till 4,0 V.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![0] =
    "R_total = 0,20 Ω";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α är materialets temperaturkoefficient, uttryckt i 1/°C eller ppm/°C.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "Ett motstånd på 1,00 Ω specificeras vid 20 °C, med en TCR på 400 ppm/°C.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![0] =
    "α = 400 × 10^-6 / °C = 0,0004 / °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![1] =
    "ΔT = 100 - 20 = 80 °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![2] =
    "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 Ω";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].conclusion =
    "Det uppskattade motståndet är 1,032 Ω, cirka 3,2% över dess värde vid 20 °C.";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![1] =
    "Motstånd: ohm (Ω).";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").paragraphs![0] =
    "Till exempel är 2,2 kΩ lika med 2 200 Ω och 15 mA är lika med 0,015 A. Konvertera "
    + "värden till kompatibla enheter innan du använder en formel.";

export const presentations = corrected as unknown as CatalogPresentationSet;
