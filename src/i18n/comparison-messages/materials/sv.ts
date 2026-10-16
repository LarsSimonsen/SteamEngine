import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Jämför material",
    description: "Jämför två material från Steam Engine-katalogen sida vid sida.",
    chooseMaterial: "Välj ett material",
    firstMaterial: "Första materialet",
    secondMaterial: "Andra materialet",
    swap: "Byt plats på materialen",
    identity: "Identitet",
    name: "Namn",
    electricalProperties: "Elektriska egenskaper",
    temperatureBehavior: "Temperaturbeteende",
    physicalProperties: "Fysikaliska egenskaper",
    temperatureControlProfile: "Temperaturkontrollprofil",
    profileAvailable: "Katalogprofil tillgänglig",
    profileUnavailable: "Ingen katalogprofil",
    thermalConductivity: "Värmeledningsförmåga",
    invalidSelection: "Ett material som anges i den delade länken hittades inte i katalogen.",
    sameSelection: "Du har valt samma material på båda sidor.",
    capabilityDiffers:
        "Endast ett av de valda materialen har en temperaturkontrollprofil i katalogen. Kontrollera enhetsstödet och " +
        "använd profilen för det exakta materialet.",
    noSafetyNote: "Ingen materialspecifik säkerhetsanmärkning finns registrerad för den här posten.",
};
