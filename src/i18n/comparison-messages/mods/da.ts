import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Platform",
    powerLimits: "Effektgrænser",
    atomizerRange: "Forstøverområde",
    category: "Kategori",
    batteryConfiguration: "Batterikonfiguration",
    baseProfile: "Basisprofil",
    invalidSelection: "En mod eller et styrekort i dette delte link blev ikke fundet i kataloget.",
    sameSelection: "Du har valgt samme mod eller styrekort på begge sider.",
    platformDiffers:
        "Disse poster har forskellig kategori eller batterikonfiguration. Kontrollér, at " +
        "sammenligningen passer til det tilsigtede formål.",
    platformUnknown:
        "Nogle platformoplysninger er ukendte, så kompatibiliteten for kategori og " +
        "batterikonfiguration kan ikke sammenlignes fuldt ud.",
    noSafetyFindings: "Der er ikke registreret postspecifikke sikkerhedsfund.",
    chooseMod: "Vælg en mod eller et styrekort",
    firstMod: "Vælg mod/styrekort A",
    secondMod: "Vælg mod/styrekort B",
    swap: "Byt mods/styrekort",
};
