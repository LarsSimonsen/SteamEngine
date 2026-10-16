import { messages as tcrDraft } from "./tcr/de";
import { messages as wirewizDraft } from "./wirewiz/de";
import { messages as coilDraft } from "./coil/de";
import { messages as juiceDraft } from "./juice/de";
import { messages as battDraft } from "./batt/de";
import { messages as modrangeDraft } from "./modrange/de";
import type { CalculatorRouteMessages } from "../calculator-messages";

export const modrange: CalculatorRouteMessages = {
    ...modrangeDraft,
    current: "Strom",
    currentLimit: "Stromgrenze",
    currentLimitRequires: "die Stromgrenze erfordert",
    currentReachedFirst: "Zuerst wird die Stromgrenze erreicht.",
    power: "Leistung",
    optimalResistance: "Hinweise zum Widerstand",
    maximumPowerRange: "Widerstandsbereich für maximale Leistung",
    medianResistance: "Übergang zwischen Strom- und Spannungsbegrenzung",
    sweetSpot: "Mittelpunkt des oberen Bereichs",
    median: "Übergang zwischen Strom- und Spannungsbegrenzung",
    optimalRange: "Optimaler Bereich",
    adjustedGraph: "Die konfigurierte Maximalleistung ergibt mit den anderen erfassten Grenzen keinen "
        + "nutzbaren Widerstandsbereich. Für dieses Diagramm gilt eine reduzierte Obergrenze von",
    builtInDevices: "Vorgegebene Geräte",
};

export const batt: CalculatorRouteMessages = {
    ...battDraft,
    batteryHelp: "Nennspannung und Kapazität bestimmen die geschätzte gespeicherte Energie und "
        + "Dauerlaufzeit. Sie haben keinen Einfluss auf die Stromgrenze.",
    caution: "Es verbleiben weniger als 20 % Stromreserve.",
    batteryPresets: "Zellenvoreinstellung",
    cellSelection: "Zellenauswahl",
    batteryIntro: "Wählen Sie den im gesamten Akkupack verwendeten Zellentyp oder geben Sie unten "
        + "Werte pro Zelle ein.",
    batteryPreset: "Zellenvoreinstellung",
    batteryValues: "Zelle und Akkupack",
    batteryConfiguration: "Akkukonfiguration",
    singleCell: "1S — Einzelzelle",
    customConfiguration: "Benutzerdefinierte Konfiguration",
    cellsInSeries: "Zellen in Reihe",
    parallelStrings: "Parallele Stränge",
    cells: "Zellen",
    cell: "Zelle",
    matchedCells: "Verwenden Sie identische, aufeinander abgestimmte Zellen gleichen Alters und "
        + "Zustands. Die Stromaufteilung ist idealisiert; die schwächste Zelle begrenzt den "
        + "Akkupack.",
    pack: "Akkupack",
    currentPerCell: "Geschätzter Strom pro Zelle",
    enterValue: "Bitte einen Wert eingeben für:",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    nicStrengthIn: "Nikotinstärke in",
    nicBase: "Nikotinbase",
    nicStrength: "Nikotinstärke",
    volume: "Volumen",
    amount: "Menge, die Sie herstellen möchten",
    targetLabel: "was Sie erreichen möchten",
    flavor: "Aroma",
    flavorName: "Aroma",
    flavorPercentage: "Aromaanteil",
    flavorVg: "Das Aroma ist VG-basiert",
    adjustMix: "Möglicherweise müssen Sie Ihren angestrebten Nikotin-, VG- oder PG-Gehalt oder den "
        + "Aromaanteil reduzieren. Alternativ können Sie eine stärkere Nikotinbase oder eine "
        + "Nikotinbase mit einem anderen VG/PG-Verhältnis verwenden. Bitte passen Sie Ihre "
        + "Einstellungen an, bis alle Zahlen größer als Null sind.",
};

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    heatFlux: "Wärmestromdichte",
    targetHeatFlux: "Zielwärmestromdichte",
};

export const wirewiz: CalculatorRouteMessages = {
    ...wirewizDraft,
    heatFlux: "Wärmestromdichte",
    tfrEditor: "TFR-Editor",
    wraps: "Windungen",
    matchTemperature: "Verwendet Ihr Mod das Materialprofil",
    adjustTemperature: "stellen Sie zum Abgleich ungefähr folgende Temperatur ein:",
    resetPersistence: "Setzen Sie die Einstellungen zurück oder importieren Sie ein gültiges Design, um "
        + "die gespeicherten Daten zu ersetzen.",
    single: "Einzeldraht",
    twisted: "Verdrillt",
    sourceFactorSuffix: "bei dieser Temperatur.",
};

export const tcr: CalculatorRouteMessages = {
    ...tcrDraft,
    results: "Widerstand in Abhängigkeit von der Temperatur",
    noticeCleared: "Temperaturpunkte geändert; ausgewählte Materialien wurden entfernt.",
    export: "DNA 200-Ausgabe",
    help: "Durch Bearbeiten dieser Werte werden ausgewählte Materialien entfernt. Die DNA "
        + "200-Ausgabe akzeptiert 2–8 Punkte und benötigt einen Punkt in der Nähe von 70 °F "
        + "(ca. 21 °C).",
};
