import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Sammenlign materialer",
    description: "Sammenlign to materialer fra Steam Engine-kataloget side om side.",
    chooseMaterial: "Vælg et materiale",
    firstMaterial: "Første materiale",
    secondMaterial: "Andet materiale",
    swap: "Byt materialer",
    identity: "Identitet",
    name: "Navn",
    electricalProperties: "Elektriske egenskaber",
    temperatureBehavior: "Temperaturadfærd",
    physicalProperties: "Fysiske egenskaber",
    temperatureControlProfile: "Temperaturkontrolprofil",
    profileAvailable: "Katalogprofil tilgængelig",
    profileUnavailable: "Ingen katalogprofil",
    thermalConductivity: "Varmeledningsevne",
    invalidSelection: "Et materiale i dette delte link blev ikke fundet i kataloget.",
    sameSelection: "Du har valgt det samme materiale på begge sider.",
    capabilityDiffers:
        "Kun ét af de valgte materialer har en temperaturkontrolprofil i kataloget. Kontrollér enhedsunderstøttelsen " +
        "og brug profilen for det nøjagtige materiale.",
    noSafetyNote: "Der er ikke registreret en materialespecifik sikkerhedsnote for denne post.",
};
