import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Plattform",
    powerLimits: "Effektgrenser",
    atomizerRange: "Forstøverområde",
    category: "Kategori",
    batteryConfiguration: "Batterikonfigurasjon",
    baseProfile: "Grunnprofil",
    invalidSelection: "En mod eller et styrekort i denne delte lenken ble ikke funnet i katalogen.",
    sameSelection: "Du har valgt samme mod eller styrekort på begge sider.",
    platformDiffers:
        "Disse oppføringene har ulik kategori eller batterikonfigurasjon. Bekreft at " +
        "sammenligningen passer til formålet ditt.",
    platformUnknown:
        "Noen plattformdetaljer er ukjente, så kompatibilitet for kategori og " +
        "batterikonfigurasjon kan ikke sammenlignes fullstendig.",
    noSafetyFindings: "Ingen oppføringsspesifikke sikkerhetsfunn er registrert.",
    chooseMod: "Velg en mod eller et styrekort",
    firstMod: "Velg mod/styrekort A",
    secondMod: "Velg mod/styrekort B",
    swap: "Bytt om modder/styrekort",
};
