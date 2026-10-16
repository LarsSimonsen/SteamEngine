import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./de";

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
        throw new Error("German catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").bullets![1] = "I ist der Strom, gemessen in Ampere (A).";
getSection("concept-ohms-law", "electrical-power").title = "Elektrische Leistung";

corrected.concepts["concept-joule-heating"].summary =
    "Wie elektrischer Strom elektrische Energie in Wärme umwandelt.";

const kirchhoffs = corrected.concepts["concept-kirchhoffs-laws"];
kirchhoffs.description =
    "Die Strom- und Spannungsgesetze von Kirchhoff beschreiben die Erhaltung an Schaltungsknoten und in geschlossenen "
    + "Schleifen.";
getSection("concept-kirchhoffs-laws", "circuit-terms").title = "Schaltungsbegriffe";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "Die Grundbegriffe erleichtern das Verständnis eines Schaltplans:";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Ein Zweig ist ein Strompfad zwischen zwei Knoten.";
getSection("concept-kirchhoffs-laws", "current-law").title = "Kirchhoffs Stromgesetz";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Wenn 8 A in einen Knoten eintreten und ein Zweig 3 A wegführt, müssen die übrigen Zweige zusammen 5 A wegführen. "
    + "Wählen Sie vor der Berechnung die Stromrichtung; ein negatives Ergebnis bedeutet, dass der tatsächliche Strom "
    + "entgegen der angenommenen Richtung fließt.";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Die algebraische Summe der Spannungsanstiege und -abfälle in einer geschlossenen Schleife ist Null. Wählen Sie eine "
    + "Schleifenrichtung und halten Sie die Polaritäten konsistent. Eine Richtungsumkehr ändert die Vorzeichen, nicht die "
    + "physikalische Lösung. Ein größerer Serienwiderstand hat einen größeren Spannungsabfall zur Folge, da durch alle "
    + "Serienkomponenten derselbe Strom fließt.";

getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].title =
    "Widerstand bei hoher Temperatur";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "Bei 20 °C ist ein Widerstand von 1,00 Ω spezifiziert, mit einem TCR von 400 ppm/°C.";

const trigonometry = getSection("concept-trigonometry", "right-triangles");
trigonometry.formulas![0].expression = "sin(θ) = Gegenkathete / Hypotenuse";
trigonometry.formulas![2].expression = "tan(θ) = Gegenkathete / Ankathete";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(Ankathete / Hypotenuse)";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "Ein Taschenrechner muss sich im richtigen Winkelmodus befinden. Die Verwendung des Gradmodus für einen Bogenmaßwert "
    + "oder umgekehrt führt zu einem anderen Ergebnis. Ein vollständiger Zyklus beträgt 360° oder 2π im Bogenmaß.";

getSection("concept-heat-capacity", "worked-example").examples![0].title = "Wasser erwärmen";
getSection("concept-heat-capacity", "electrical-heating").title = "Elektrische Erwärmung";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "Der ideale Energiebedarf beträgt 41,8 kJ; eine echte Heizung braucht wegen der Verluste mehr.";

getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' ist die Wärmestromdichte in W/m².";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Der Wärmefluss ist eine Übertragungsrate, keine Temperatur; nutzen Sie die Wärmekapazität für Temperaturänderungen.";

const siUnits = getSection("concept-si-system-and-imperial-units", "base-units");
siUnits.table!.rows[1][0] = "Masse";
siUnits.table!.rows[2][1] = "Sekunde";
siUnits.table!.rows[5][1] = "Mol";
siUnits.table!.rows[5][0] = "Stoffmenge";
siUnits.table!.rows[6][2] = "cd";

getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Das Ohmsche Gesetz verbindet sich mit der Leistungsbeziehung P = V × I. Die Leistung P wird in Watt (W) gemessen. "
    + "Bei einer 4,2-V-Quelle und einer 1,0-Ω-Last beträgt die ideale Leistung 17,64 W. Die Komponente benötigt "
    + "ausreichende Wärmekapazität und eine Sicherheitsmarge, um die entstehende Wärme sicher abzuleiten.";

getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Die Spule wandelt Energie mit einer Leistung von 7,2 W in Wärme um, also 72 J in 10 Sekunden.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Die Wärmeübertragung an Luft, Flüssigkeit und Geräte bestimmt die tatsächliche Temperatur.";

getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![4] =
    "Eine Parallelschaltung verbindet Zweige mit denselben beiden Knoten.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "Das Laden von Lithium-Ionen-Zellen in Serie erfordert eine Überwachung auf Zellebene sowie geeigneten Ausgleich "
    + "oder Schutz.";

getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![0] =
    "Ein positiver TCR bedeutet, dass der Widerstand mit steigender Temperatur zunimmt; viele Metalle verhalten sich so.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression = "I = V / R";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Bezogen auf einen Winkel θ liegt die Gegenkathete auf der gegenüberliegenden Seite. Die Ankathete berührt den "
    + "Winkel, ist aber nicht die Hypotenuse, und die Hypotenuse liegt dem rechten Winkel gegenüber. SOH-CAH-TOA ist "
    + "eine Merkhilfe: Sinus ist Gegenkathete durch Hypotenuse, Kosinus ist Ankathete durch Hypotenuse und Tangens ist "
    + "Gegenkathete durch Ankathete.";

getSection("concept-heat-capacity", "basic-relationships").formulas![0].expression = "C = Q / ΔT";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Die ideale Zeit beträgt etwa 7,0 Minuten; bei 80 % Übertragungseffizienz dauert es etwa 523 s.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "Die einfache Gleichung geht davon aus, dass die spezifische Wärmekapazität ungefähr konstant ist. Wärmeverlust, "
    + "Konvektion, Strahlung, Verdunstung, Kontaktwiderstand und ungleichmäßige Temperatur können dazu führen, dass ein "
    + "tatsächliches Ergebnis vom idealen Ergebnis abweicht.";

corrected.concepts["concept-heat-flux"].description =
    "Die Wärmestromdichte beschreibt, wie schnell Wärme eine Oberfläche durchquert, unabhängig von der Gesamtmenge des "
    + "Materials, das Wärme speichert.";
corrected.concepts["concept-heat-flux"].summary =
    "Die Wärmeübertragungsrate pro Flächeneinheit.";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Mittlere Wärmestromdichte eines Heizelements";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Unterscheiden Sie zwischen mittlerer Wärmestromdichte und einem lokalen Maximum; die Erwärmung kann ungleichmäßig sein.";
getSection("concept-heat-flux", "practical-checks").bullets![2] =
    "Berücksichtigen Sie Kontaktwiderstand, Konvektion, Strahlung und Wärmeverluste, wenn dies erforderlich ist.";
getSection("concept-heat-flux", "conduction").bullets![3] =
    "Das Minuszeichen zeigt einen Wärmestrom von höherer zu niedrigerer Temperatur an.";
getSection("concept-heat-flux", "conduction").formulas![0].expression = "q'' = -k × ΔT / L";

getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title = "Drahtstärkesysteme";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "Für 1/0, 2/0, 3/0 und 4/0 verwenden Sie n = 0, -1, -2 und -3. AWG bestimmt die Leitergröße, nicht einen "
    + "universellen sicheren Strom; die Strombelastbarkeit hängt auch von Material, Isolierung, Kühlung, Installation "
    + "und den geltenden elektrischen Vorschriften ab.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Bestimmen Sie die Strombelastbarkeit anhand von Produktdaten und elektrischen Vorschriften, nicht allein anhand der "
    + "Messgerätenummer.";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Die mittlere Wärmestromdichte beträgt 5.000 W/m² oder 0,5 W/cm².";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 Zoll = 25,4 mm = 0,0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 Fuß = 12 Zoll = 0,3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 Yard = 3 Fuß = 0,9144 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![3].expression =
    "1 Zoll² = 645,16 mm²";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "Diese Werte sind Nennwerte. Produkttoleranzen, Beschichtungen, Isolierung und mehrdrähtige Ausführung können den "
    + "gemessenen oder Gesamtdurchmesser verändern.";

getSection("concept-ohms-law", "worked-examples").title = "Rechenbeispiele";
getSection("concept-ohms-law", "rearranged-formulas").paragraphs![0] =
    "Verwenden Sie die Version, die den gesuchten Wert auf die linke Seite setzt:";
corrected.concepts["concept-joule-heating"].description =
    "Die Joule-Erwärmung beschreibt, wie elektrische Energie in Wärme umgewandelt wird, wenn Strom durch einen "
    + "Widerstand fließt.";
getSection("concept-joule-heating", "worked-example").title = "Rechenbeispiel";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "Beispielrechnung";

getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "Eine Seite bestimmen";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "Eine Hypotenuse mit 10 cm Länge bildet einen Winkel von 30°.";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(Gegenkathete / Ankathete)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "Gegenkathete = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "Ankathete = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-heat-capacity", "worked-example").title = "Beispielrechnung";
getSection("concept-heat-capacity", "object-and-material").title = "Objekt und Material";
getSection("concept-heat-capacity", "phase-changes-and-limits").title =
    "Phasenänderungen und praktische Grenzen";

corrected.concepts["concept-heat-flux"].displayName = "Wärmestromdichte";
getSection("concept-heat-flux", "practical-checks").title = "Praktische Prüfungen";
getSection("concept-heat-flux", "worked-example").examples![0].setup =
    "Ein Heizelement mit 100 W überträgt Wärme durch eine Fläche von 0,020 m².";

getSection("concept-si-system-and-imperial-units", "base-units").title = "SI-Basiseinheiten";
getSection("concept-si-system-and-imperial-units", "base-units").table!.headers[0] = "Größe";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![0] =
    "0,1 Zoll × 25,4 = 2,54 mm";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![1] =
    "5 mm / 25,4 ≈ 0,19685 Zoll";
getSection("concept-si-system-and-imperial-units", "other-conversions").title =
    "Weitere häufige Umrechnungen";

corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Eine Drahtstärkennummer beschreibt eine Nenngröße nur dann, wenn das zugehörige System angegeben ist.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].summary =
    "Warum Drahtstärkennummern ein benanntes System und einen angegebenen Durchmesser benötigen.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Eine größere Normalmaßzahl bedeutet im Allgemeinen einen kleineren Durchmesser; für Größen über Stärke 0 "
    + "verwenden Sie 00, 000 oder 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title =
    "Drahtstärke, Fläche und Widerstand";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").formulas![0].expression =
    "R = ρ × L / A";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").title =
    "Warum der Systemname wichtig ist";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").title =
    "Praktische Angabe";

getSection("concept-ohms-law", "worked-examples").examples![1].title = "Widerstand bestimmen";
getSection("concept-ohms-law", "worked-examples").examples![2].title = "Spannung bestimmen";

getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Elektrische Leistung ist eine Übertragungsrate, keine Temperatur. Wärmekapazität und Wärmestromdichte bestimmen, "
    + "wie Energie die Temperatur verändert und wie schnell sie die Oberfläche verlässt.";
getSection("concept-joule-heating", "what-affects-heating").bullets![0] =
    "Bei konstantem Widerstand vervierfacht sich die Wärmeleistung, wenn sich der Strom verdoppelt.";
getSection("concept-joule-heating", "what-affects-heating").bullets![1] =
    "Bei konstantem Strom verdoppelt sich die Wärmeleistung, wenn sich der Widerstand verdoppelt.";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "Bei einem Widerstand mit positivem TCR, der mit konstanter Spannung betrieben wird, steigt der Widerstand mit "
    + "zunehmender Temperatur, und der Strom nimmt tendenziell ab. Bei einer Konstantstromquelle steigt die Leistung "
    + "mit derselben Widerstandszunahme.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "Der TCR des Herstellers gilt normalerweise für einen angegebenen Temperatur- und Widerstandsbereich. "
    + "Temperaturgradienten, Materialänderungen, Kontakte, mechanische Belastung und Eigenerwärmung können dazu führen, "
    + "dass ein reales Ergebnis vom Ergebnis der Näherung erster Ordnung abweicht.";

getSection("concept-trigonometry", "waveforms-and-identities").bullets![0] =
    "A ist die Amplitude, f die Frequenz in Hertz, t die Zeit in Sekunden und φ der Phasenwinkel.";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![1] =
    "Die Kreisfrequenz ω wird in Radiant pro Sekunde angegeben.";

getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "Erwärmen Sie das Beispiel mit 41,8 kJ mit einer konstanten Quelle von 100 W ohne Verluste.";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "Wandeln Sie die Fläche in m² um, bevor Sie W/m² verwenden.";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "Die Wärmestromdichte unterscheidet sich von der Wärmekapazität: Die Wärmekapazität beschreibt gespeicherte Energie "
    + "pro Temperaturänderung, während die Wärmestromdichte beschreibt, wie schnell Wärme eine Oberfläche durchquert.";

getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].setup =
    "Wandeln Sie 0,1 Zoll in Millimeter und 5 mm in Zoll um.";
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Ein Pfund kann Masse (lb) oder Kraft (lbf) bezeichnen, also unterschiedliche Größen. Ebenso bezeichnen Zoll, "
    + "Quadratzoll und Kubikzoll unterschiedliche Dimensionen.";
getSection("concept-si-system-and-imperial-units", "unit-checks").title = "Praktische Einheitenprüfungen";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![2] =
    "Wandeln Sie die Einheiten vor dem Multiplizieren oder Dividieren um.";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![3] =
    "Runden Sie erst am Ende, damit die Zwischenergebnisse eine ausreichende Genauigkeit behalten.";

getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![0] =
    "AWG steht für American Wire Gauge und ist historisch auch als Brown-&-Sharpe-Gauge bekannt.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![1] =
    "SWG steht für Standard Wire Gauge, das historische britische System für Draht- und Blechdicken.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![2] =
    "BWG steht für Birmingham Wire Gauge und wurde historisch für Eisendraht, Rohre und Blechdicken verwendet.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![0] =
    "Geben Sie das System an, zum Beispiel 24 AWG oder 24 British SWG.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![1] =
    "Geben Sie den Nenndurchmesser in Millimetern an, wenn Systeme verwechselt werden können.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![2] =
    "Geben Sie an, ob die Abmessung für einen blanken Leiter, den isolierten Durchmesser, die Blechdicke oder die "
    + "Rohrwanddicke gilt.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "Geben Sie bei mehrdrähtigen Leitern die Drahtkonstruktion an, wenn Flexibilität und Gesamtdurchmesser wichtig sind.";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "Der Widerstand hängt von der Leiterlänge L, der Querschnittsfläche A und dem spezifischen Widerstand ρ des "
    + "Materials ab. Da die Fläche mit dem Quadrat des Durchmessers variiert, kann ein kleiner Durchmesserunterschied "
    + "einen großen Widerstandsunterschied verursachen. Bei AWG halbiert eine Zunahme um etwa drei Größen die Fläche "
    + "und verdoppelt den Widerstand pro Längeneinheit bei gleichem Material und gleicher Temperatur.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Die Kirchhoffschen Strom- und Spannungsgesetze beschreiben die Ladungserhaltung an Knoten und die Energieerhaltung " +
    "in geschlossenen Maschen.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Der Temperaturkoeffizient des Widerstands beschreibt, wie sich der Widerstand eines Bauteils mit der Temperatur " +
    "ändert.";
corrected.concepts["concept-heat-flux"].displayName = "Wärmestromdichte";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Bestimmen Sie die Strombelastbarkeit anhand von Produktdaten und elektrotechnischen Regeln, nicht allein anhand der " +
    "Gauge-Nummer.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Kirchhoffs Stromgesetz";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Wenn 8 A in einen Knoten eintreten und ein Zweig 3 A abführt, müssen die übrigen Zweige zusammen 5 A abführen. " +
    "Legen Sie vor dem Lösen die Stromrichtungen fest; ein negatives Ergebnis bedeutet, dass der tatsächliche Strom " +
    "entgegen der angenommenen Richtung fließt.";
getSection("concept-ohms-law", "worked-examples").examples![0].title = "Stromstärke bestimmen";
getSection("concept-ohms-law", "electrical-power").title = "Elektrische Leistung";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].title =
    "Ein erwärmter Widerstand";

getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Die Wärmestromdichte ist eine Übertragungsrate pro Fläche, keine Temperatur; nutzen "
    + "Sie die Wärmekapazität für Temperaturänderungen.";

getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].title =
    "Widerstände in Reihe";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.headers![0] =
    "Drahtstärke";
getSection("concept-si-system-and-imperial-units", "base-units").title =
    "Gebräuchliche SI-Einheiten";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets![0] =
    "1 lb ≈ 0,45359237 kg.";

export const presentations = corrected as unknown as CatalogPresentationSet;
