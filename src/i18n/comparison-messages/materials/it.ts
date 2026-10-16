import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Confronta materiali",
    description: "Confronta affiancati due materiali del catalogo Steam Engine.",
    chooseMaterial: "Scegli un materiale",
    firstMaterial: "Primo materiale",
    secondMaterial: "Secondo materiale",
    swap: "Scambia materiali",
    identity: "Identità",
    name: "Nome",
    electricalProperties: "Proprietà elettriche",
    temperatureBehavior: "Comportamento termico",
    physicalProperties: "Proprietà fisiche",
    temperatureControlProfile: "Profilo di controllo della temperatura",
    profileAvailable: "Profilo del catalogo disponibile",
    profileUnavailable: "Nessun profilo nel catalogo",
    thermalConductivity: "Conducibilità termica",
    invalidSelection: "Un materiale indicato da questo link condiviso non è stato trovato nel catalogo.",
    sameSelection: "Hai selezionato lo stesso materiale su entrambi i lati.",
    capabilityDiffers:
        "Solo uno dei materiali selezionati ha un profilo di controllo della temperatura nel catalogo. Verifica il " +
        "supporto del dispositivo e usa il profilo del materiale esatto.",
    noSafetyNote: "Per questa voce non è registrata alcuna nota di sicurezza specifica del materiale.",
};
