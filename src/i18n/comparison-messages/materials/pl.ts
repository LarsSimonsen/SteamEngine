import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Porównaj materiały",
    description: "Porównaj obok siebie dwa materiały z katalogu Steam Engine.",
    chooseMaterial: "Wybierz materiał",
    firstMaterial: "Pierwszy materiał",
    secondMaterial: "Drugi materiał",
    swap: "Zamień materiały",
    identity: "Tożsamość",
    name: "Nazwa",
    electricalProperties: "Właściwości elektryczne",
    temperatureBehavior: "Zachowanie temperaturowe",
    physicalProperties: "Właściwości fizyczne",
    temperatureControlProfile: "Profil kontroli temperatury",
    profileAvailable: "Profil katalogowy dostępny",
    profileUnavailable: "Brak profilu katalogowego",
    thermalConductivity: "Przewodność cieplna",
    invalidSelection: "Materiał wskazany przez ten udostępniony link nie został znaleziony w katalogu.",
    sameSelection: "Po obu stronach wybrano ten sam materiał.",
    capabilityDiffers:
        "Tylko jeden z wybranych materiałów ma w katalogu profil kontroli temperatury. Sprawdź obsługę przez " +
        "urządzenie i użyj profilu właściwego dla danego materiału.",
    noSafetyNote: "Dla tego wpisu nie zapisano uwagi dotyczącej bezpieczeństwa właściwej dla materiału.",
};
