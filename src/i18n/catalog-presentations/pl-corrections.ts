import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./pl";

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
        throw new Error("Polish catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").bullets![1] = "I to prąd mierzony w amperach (A).";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 Ω = 4,2 A";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] =
    "V = 0,5 A × 10 Ω = 5 V";
getSection("concept-ohms-law", "electrical-power").title = "Moc elektryczna";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Prawo Ohma łączy się z zależnością mocy P = V × I. Moc P mierzy się w watach (W). Dla źródła 4,2 V i obciążenia "
    + "1,0 Ω moc idealna wynosi 17,64 W. Element potrzebuje odpowiedniej pojemności cieplnej i marginesu bezpieczeństwa, "
    + "aby bezpiecznie odprowadzać wytworzone ciepło.";

getSection("concept-joule-heating", "worked-example").title = "Przykład obliczeniowy";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![1] =
    "E = P × t = 7,2 W × 10 s = 72 J";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Cewka przekształca energię w ciepło z mocą 7,2 W, czyli 72 J w ciągu 10 sekund.";

getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "opposite = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "adjacent = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression = "180° = π radianów";
getSection("concept-trigonometry", "waveforms-and-identities").formulas![0].expression =
    "x(t) = A × sin(2πft + φ)";
getSection("concept-trigonometry", "waveforms-and-identities").formulas![1].expression = "ω = 2πf";
getSection("concept-trigonometry", "waveforms-and-identities").formulas![2].expression =
    "sin^2(θ) + cos^2(θ) = 1";

getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "Różnica temperatur wynosząca 1 K ma taką samą wielkość jak różnica 1 °C.";
getSection("concept-heat-capacity", "worked-example").examples![0].formulas![0] =
    "ΔT = 70 - 20 = 50 °C";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Idealny czas to około 7,0 minut; przy sprawności transferu 80% wynosi około 523 s.";
getSection("concept-heat-capacity", "phase-changes-and-limits").formulas![0].expression = "Q = m × L";

corrected.concepts["concept-heat-flux"].description =
    "Gęstość strumienia ciepła opisuje szybkość przepływu ciepła przez każdą jednostkę powierzchni, niezależnie od "
    + "całkowitej ilości materiału magazynującego ciepło.";
corrected.concepts["concept-heat-flux"].summary = "Szybkość przenikania ciepła na jednostkę powierzchni.";
getSection("concept-heat-flux", "definition").bullets![0] = "q'' to gęstość strumienia ciepła w W/m².";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0,020 m² = 5 000 W/m²";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "Konwekcja wykorzystuje współczynnik konwekcji h. Promieniowanie wykorzystuje emisyjność ε i stałą Stefana–Boltzmanna σ; "
    + "temperatury w równaniu promieniowania muszą być temperaturami bezwzględnymi w kelwinach.";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[2][1] = "sekunda";
siBaseUnits.rows[3][1] = "kelwin";
siBaseUnits.rows[5][0] = "ilość substancji";
siBaseUnits.rows[5][1] = "mol";
siBaseUnits.rows[6][2] = "cd";
const decimalPrefixes = getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!;
decimalPrefixes.rows[4][2] = "n";

corrected.concepts["concept-joule-heating"].summary =
    "Jak prąd elektryczny zamienia energię elektryczną w ciepło.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![3] =
    "Połączenie szeregowe zapewnia prądowi tylko jedną ścieżkę przez elementy.";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Jeśli do węzła wpływa 8 A, a jedna gałąź odprowadza 3 A, pozostałe gałęzie muszą łącznie odprowadzać 5 A. "
    + "Przed rozwiązaniem wybierz kierunki prądu; wynik ujemny oznacza, że rzeczywisty prąd płynie przeciwnie do "
    + "przyjętego kierunku.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "Przy jednakowych rezystancjach gałęzi przez każdą gałąź płynie 10 A.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "Ładowanie ogniw litowo-jonowych połączonych szeregowo wymaga monitorowania na poziomie ogniw oraz odpowiedniego "
    + "równoważenia lub zabezpieczenia.";

getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "Rezystancja 1,00 Ω jest określona w temperaturze 20 °C, a TCR wynosi 400 ppm/°C.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "W przypadku rezystora o dodatnim TCR zasilanego stałym napięciem wzrost temperatury zwiększa rezystancję i "
    + "zwykle zmniejsza prąd. Przy źródle stałoprądowym ten sam wzrost rezystancji zwiększa moc.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α to współczynnik temperaturowy materiału wyrażony w 1 / °C lub ppm / °C.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "Przykład obliczeniowy";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (parallel branches)";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Względem kąta θ bok przeciwległy leży naprzeciw tego kąta, bok przyległy dotyka kąta, ale nie jest "
    + "przeciwprostokątną, a przeciwprostokątna leży naprzeciw kąta prostego. SOH-CAH-TOA pomaga zapamiętać, że "
    + "sinus to bok przeciwległy/przeciwprostokątna, cosinus to bok przyległy/przeciwprostokątna, a tangens to bok "
    + "przeciwległy/bok przyległy.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "Znajdź bok";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "opposite = 10 × sin(30°) = 5 cm";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Podczas topnienia lub wrzenia dostarczona energia może zmienić stan skupienia materiału bez zmiany jego "
    + "temperatury. L to właściwe ciepło utajone w J/kg.";

corrected.concepts["concept-heat-flux"].displayName = "Gęstość strumienia ciepła";
getSection("concept-heat-flux", "definition").bullets![1] =
    "Q_dot to całkowita szybkość przepływu ciepła w watach (W).";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Średnia gęstość strumienia ciepła wynosi 5 000 W/m², czyli 0,5 W/cm².";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Strumień ciepła to szybkość przenikania, a nie temperatura; do opisu zmiany temperatury użyj pojemności cieplnej.";

const siUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siUnits.rows[1][0] = "Masa";
siUnits.rows[3][1] = "kelwin";
const prefixes = getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!;
prefixes.rows[4] = ["nano", "n", "0,000000001 = 10^-9"];

corrected.concepts["concept-wire-gauges-awg-swg-bwg"].displayName =
    "Wymiary drutu: AWG, SWG i BWG";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Większy zwykły numer grubości zazwyczaj oznacza mniejszą średnicę; rozmiary większe niż 0 zapisuje się jako 00, "
    + "000 lub 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title =
    "Rozmiar drutu, pole przekroju i rezystancja";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "W przypadku przewodów linkowych uwzględnij konstrukcję splotu, gdy ważne są elastyczność i całkowita średnica.";

getSection("concept-ohms-law", "relationship").title = "Zależność";
getSection("concept-ohms-law", "rearranged-formulas").title = "Przekształcone wzory";
getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "Rezystancja równa zero jest idealnym zwarciem i należy traktować ją osobno.";
getSection("concept-ohms-law", "worked-examples").examples![1].title = "Oblicz rezystancję";
getSection("concept-ohms-law", "worked-examples").examples![2].title = "Oblicz napięcie";
getSection("concept-ohms-law", "unit-conversions").bullets![0] = "1 kΩ = 1 000 Ω";

corrected.concepts["concept-joule-heating"].description =
    "Ogrzewanie Joule'a opisuje zamianę energii elektrycznej w ciepło, gdy prąd przepływa przez rezystancję.";
getSection("concept-joule-heating", "heating-power").bullets![2] = "I to prąd wyrażony w amperach (A).";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Przekazywanie ciepła do powietrza, cieczy i elementów otoczenia określa rzeczywistą temperaturę.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Moc elektryczna to szybkość przekazywania energii, a nie temperatura. Pojemność cieplna i gęstość strumienia ciepła "
    + "określają, jak energia zmienia temperaturę i jak szybko opuszcza powierzchnię.";

getSection("concept-kirchhoffs-laws", "circuit-terms").title = "Terminy dotyczące obwodu";
corrected.concepts["concept-kirchhoffs-laws"].description =
    "Prawa Kirchhoffa dla prądu i napięcia opisują zachowanie w węzłach obwodu oraz wokół zamkniętych pętli.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Ogniwa połączone równolegle zachowują to samo napięcie, a ich pojemność i dostępny prąd w przybliżeniu się sumują.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "Rozwiąż układ równań i sprawdź bilans mocy.";

getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![3] =
    "Temperatury muszą być wyrażone w tej samej skali i w zgodnych jednostkach, aby można było obliczyć różnicę T - T_0.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![0] =
    "α = 400 × 10^-6 / °C = 0,0004 / °C";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "Wartość TCR podawana przez producenta zwykle odnosi się do określonego zakresu temperatury i rezystancji. "
    + "Gradienty temperatury, zmiany właściwości materiału, styki, naprężenia mechaniczne i samonagrzewanie mogą sprawić, "
    + "że rzeczywisty wynik będzie się różnił od oszacowania pierwszego rzędu.";

corrected.concepts["concept-trigonometry"].description =
    "Trygonometria łączy kąty z długościami i jest przydatna do opisu wektorów, zależności fazowych i przebiegów.";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "Kalkulator musi pracować we właściwym trybie kąta. Użycie trybu stopni dla wartości w radianach lub odwrotnie daje "
    + "inny wynik. Pełny obrót to 360° lub 2π radianów.";

getSection("concept-heat-capacity", "basic-relationships").bullets![0] =
    "C to pojemność cieplna wyrażona w J/K lub J/°C.";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "Podgrzej 0,20 kg wody od 20 °C do 70 °C, stosując c = 4180 J/(kg·K).";
getSection("concept-heat-capacity", "electrical-heating").title = "Ogrzewanie elektryczne";
getSection("concept-heat-capacity", "object-and-material").title = "Obiekt a materiał";

getSection("concept-si-system-and-imperial-units", "base-units").title = "Jednostki podstawowe SI";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Prawa Kirchhoffa dotyczące prądu i napięcia opisują zachowanie ładunku w węzłach oraz energii w zamkniętych " +
    "oczach.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Współczynnik temperaturowy rezystancji opisuje, jak rezystancja elementu zmienia się wraz z temperaturą.";
corrected.concepts["concept-heat-flux"].displayName = "Gęstość strumienia ciepła";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Obciążalność prądową określaj na podstawie danych produktu i przepisów elektrycznych, a nie tylko numeru grubości.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Prawo prądowe Kirchhoffa";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Jeśli do węzła wpływa 8 A, a jedna gałąź odprowadza 3 A, pozostałe gałęzie muszą łącznie odprowadzać 5 A. " +
    "Przed rozwiązaniem wybierz kierunki prądu; wynik ujemny oznacza, że rzeczywisty prąd płynie przeciwnie do kierunku " +
    "założonego.";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![1] =
    "E = P × t = 7,2 W × 10 s = 72 J";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = bok przeciwległy / przeciwprostokątna";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = bok przyległy / przeciwprostokątna";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = bok przeciwległy / bok przyległy";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(bok przeciwległy / przeciwprostokątna)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(bok przyległy / przeciwprostokątna)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(bok przeciwległy / bok przyległy)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "bok przeciwległy = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "bok przyległy = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (szeregowo)";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (gałęzie równoległe)";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 cal = 25,4 mm = 0,0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 stopa = 12 cali = 0,3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 jard = 3 stopy = 0,9144 m";

corrected.concepts["concept-kirchhoffs-laws"].sections[5].paragraphs![0] =
    "Uproszczony model może pomijać rezystancję wewnętrzną ogniwa, rezystancję styków, sprawność "
    + "przetwornicy, wpływ temperatury, zachowanie w stanach przejściowych, obwody zabezpieczające i "
    + "tolerancje komponentów. Uwzględnij każde pominięte zachowanie, które w istotny sposób wpływa na obwód "
    + "wysokoprądowy.";
corrected.concepts["concept-heat-flux"].sections[0].paragraphs![0] =
    "Gęstość strumienia ciepła różni się od pojemności cieplnej: pojemność cieplna opisuje zmagazynowaną "
    + "energię na zmianę temperatury, podczas gdy gęstość strumienia ciepła opisuje szybkość, z jaką ciepło "
    + "przenika przez jednostkę powierzchni.";
corrected.concepts["concept-heat-flux"].sections[1].examples![0].title =
    "Średnia gęstość strumienia ciepła grzejnika";
corrected.concepts["concept-heat-flux"].sections[4].bullets![1] =
    "Odróżnij średnią gęstość strumienia ciepła od lokalnego maksimum; ogrzewanie może być nierównomierne.";
corrected.concepts["concept-heat-flux"].sections[4].bullets![3] =
    "Gęstość strumienia ciepła to szybkość przenikania ciepła na jednostkę powierzchni, a nie temperatura; "
    + "do opisu zmiany temperatury użyj pojemności cieplnej.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Numer rozmiaru drutu określa rozmiar nominalny tylko wtedy, gdy podano system numeracji.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].sections[0].title =
    "Systemy numeracji rozmiarów drutu";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].sections[0].bullets![0] =
    "AWG to American Wire Gauge, amerykański system numeracji rozmiarów drutu, znany historycznie również "
    + "jako system Brown & Sharpe.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].sections[2].table!.headers![0] =
    "Numer rozmiaru";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].sections[3].paragraphs![0] =
    "Rezystancja zależy od długości przewodu L, pola przekroju poprzecznego A i rezystywności materiału ρ. "
    + "Ponieważ pole przekroju zmienia się wraz z kwadratem średnicy, niewielka różnica średnicy może "
    + "spowodować znaczną różnicę rezystancji. W systemie AWG zwiększenie numeru o trzy rozmiary w "
    + "przybliżeniu zmniejsza pole przekroju o połowę i podwaja rezystancję na jednostkę długości dla tego "
    + "samego materiału i temperatury.";

corrected.concepts["concept-ohms-law"].sections[2].title =
    "Przykłady obliczeniowe";
corrected.concepts["concept-heat-capacity"].sections[1].title =
    "Przykład obliczeniowy";
corrected.concepts["concept-heat-flux"].sections[1].title =
    "Przykład obliczeniowy";
corrected.concepts["concept-joule-heating"].sections[3].paragraphs![0] =
    "Sprawdź, czy komponenty, połączenia i izolacja wytrzymują oczekiwany prąd i moc. Zachowaj "
    + "odpowiedni zapas bezpieczeństwa, ponieważ rzeczywiste komponenty mogą nagrzewać się "
    + "nierównomiernie, a rezystancja może zmieniać się wraz z temperaturą. Akumulatory i zasilacze "
    + "również mają limity prądu ciągłego.";
corrected.concepts["concept-kirchhoffs-laws"].sections[2].examples![0].formulas![0] =
    "R_total = 0,40 \\u03a9";
corrected.concepts["concept-kirchhoffs-laws"].sections[2].examples![1].formulas![0] =
    "R_total = 0,20 \\u03a9";
corrected.concepts["concept-kirchhoffs-laws"].sections[2].examples![1].formulas![1] =
    "I_total = 4,0 V / 0,20 Ω = 20 A";
corrected.concepts["concept-heat-capacity"].sections[4].paragraphs![1] =
    "Proste równanie zakłada, że ciepło właściwe jest w przybliżeniu stałe. Straty ciepła, konwekcja, "
    + "promieniowanie, parowanie, opór cieplny styku i nierówna temperatura mogą sprawić, że rzeczywisty "
    + "wynik będzie różnił się od idealnego.";
corrected.concepts["concept-heat-flux"].sections[4].bullets![2] =
    "W razie potrzeby uwzględnij opór cieplny styku, konwekcję, promieniowanie i straty ciepła.";
corrected.concepts["concept-si-system-and-imperial-units"].sections[0].title =
    "Typowe jednostki SI";
corrected.concepts["concept-si-system-and-imperial-units"].sections[0].table!.headers[0] =
    "Wielkość fizyczna";
corrected.concepts["concept-si-system-and-imperial-units"].sections[0].table!.rows[5][0] =
    "Liczność materii";
corrected.concepts["concept-si-system-and-imperial-units"].sections[0].table!.rows[6][0] =
    "Światłość";

export const presentations = corrected as unknown as CatalogPresentationSet;
