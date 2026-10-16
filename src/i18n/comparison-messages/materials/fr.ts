import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Comparer les matériaux",
    description: "Comparez côte à côte deux matériaux du catalogue Steam Engine.",
    chooseMaterial: "Choisir un matériau",
    firstMaterial: "Premier matériau",
    secondMaterial: "Deuxième matériau",
    swap: "Permuter les matériaux",
    identity: "Identité",
    name: "Nom",
    electricalProperties: "Propriétés électriques",
    temperatureBehavior: "Comportement thermique",
    physicalProperties: "Propriétés physiques",
    temperatureControlProfile: "Profil de contrôle de température",
    profileAvailable: "Profil du catalogue disponible",
    profileUnavailable: "Aucun profil dans le catalogue",
    thermalConductivity: "Conductivité thermique",
    invalidSelection: "Un matériau indiqué par ce lien partagé est introuvable dans le catalogue.",
    sameSelection: "Vous avez sélectionné le même matériau des deux côtés.",
    capabilityDiffers:
        "Un seul des matériaux sélectionnés possède un profil de contrôle de température dans le catalogue. " +
        "Vérifiez la compatibilité de l’appareil et utilisez le profil du matériau exact.",
    noSafetyNote: "Aucune note de sécurité propre au matériau n’est enregistrée pour cette entrée.",
};
