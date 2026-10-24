import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Plattform",
    powerLimits: "Effektgränser",
    atomizerRange: "Förångarens motståndsintervall",
    category: "Kategori",
    batteryConfiguration: "Batterikonfiguration",
    baseProfile: "Basprofil",
    invalidSelection:
        "En mod eller ett styrkort som anges av den delade länken hittades inte i " +
        "katalogen.",
    sameSelection: "Du har valt samma mod eller styrkort på båda sidor.",
    platformDiffers:
        "Posterna skiljer sig i kategori eller batterikonfiguration. Kontrollera att " +
        "jämförelsen passar ditt avsedda användningsområde.",
    platformUnknown:
        "Vissa plattformsuppgifter är okända, så kompatibiliteten för kategori och " +
        "batterikonfiguration kan inte jämföras fullständigt.",
    noSafetyFindings: "Inga postspecifika säkerhetsfynd finns registrerade.",
    chooseMod: "Välj en mod eller ett styrkort",
    firstMod: "Välj mod/styrkort A",
    secondMod: "Välj mod/styrkort B",
    swap: "Byt plats på mods/styrkort",
};
