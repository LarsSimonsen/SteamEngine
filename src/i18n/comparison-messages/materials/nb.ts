import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Sammenlign materialer",
    description: "Sammenlign to materialer fra Steam Engine-katalogen side ved side.",
    chooseMaterial: "Velg et materiale",
    firstMaterial: "Første materiale",
    secondMaterial: "Andre materiale",
    swap: "Bytt materialer",
    identity: "Identitet",
    name: "Navn",
    electricalProperties: "Elektriske egenskaper",
    temperatureBehavior: "Temperaturatferd",
    physicalProperties: "Fysiske egenskaper",
    temperatureControlProfile: "Temperaturkontrollprofil",
    profileAvailable: "Katalogprofil tilgjengelig",
    profileUnavailable: "Ingen katalogprofil",
    thermalConductivity: "Varmeledningsevne",
    invalidSelection: "Et materiale i denne delte lenken ble ikke funnet i katalogen.",
    sameSelection: "Du har valgt samme materiale på begge sider.",
    capabilityDiffers:
        "Bare ett av de valgte materialene har en temperaturkontrollprofil i katalogen. Kontroller enhetsstøtten og " +
        "bruk profilen for det nøyaktige materialet.",
    noSafetyNote: "Ingen materialspesifikk sikkerhetsmerknad er registrert for denne oppføringen.",
};
