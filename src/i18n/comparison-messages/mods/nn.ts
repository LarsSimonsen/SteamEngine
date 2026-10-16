import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Plattform",
    powerLimits: "Effektgrenser",
    atomizerRange: "Forstøvarområde",
    category: "Kategori",
    batteryConfiguration: "Batterikonfigurasjon",
    baseProfile: "Grunnprofil",
    invalidSelection: "Ein mod eller eit styrekort i denne delte lenkja vart ikkje funne i katalogen.",
    sameSelection: "Du har valt same mod eller styrekort på begge sider.",
    platformDiffers:
        "Desse oppføringane har ulik kategori eller batterikonfigurasjon. Stadfest at " +
        "samanlikninga passar til føremålet ditt.",
    platformUnknown:
        "Nokre plattformdetaljar er ukjende, så kompatibilitet for kategori og " +
        "batterikonfigurasjon kan ikkje samanliknast fullt ut.",
    noSafetyFindings: "Ingen oppføringsspesifikke tryggleiksfunn er registrerte.",
};
