import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Plattform",
    powerLimits: "Leistungsgrenzen",
    atomizerRange: "Verdampferbereich",
    category: "Kategorie",
    batteryConfiguration: "Akkukonfiguration",
    baseProfile: "Basisprofil",
    invalidSelection:
        "Ein in diesem geteilten Link angegebener Mod oder eine Platine wurde im Katalog " +
        "nicht gefunden.",
    sameSelection: "Auf beiden Seiten wurde derselbe Mod oder dieselbe Platine ausgewählt.",
    platformDiffers:
        "Diese Einträge unterscheiden sich in Kategorie oder Akkukonfiguration. Prüfe, ob " +
        "der Vergleich zum vorgesehenen Einsatz passt.",
    platformUnknown:
        "Einige Plattformdetails sind unbekannt; die Kompatibilität von Kategorie und " +
        "Akkukonfiguration kann daher nicht vollständig verglichen werden.",
    noSafetyFindings: "Für diesen Eintrag sind keine eintragsspezifischen Sicherheitsbefunde verzeichnet.",
    chooseMod: "Mod oder Platine auswählen",
    firstMod: "Mod/Platine A auswählen",
    secondMod: "Mod/Platine B auswählen",
    swap: "Mods/Platinen tauschen",
};
