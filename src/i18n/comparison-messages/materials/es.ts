import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Comparar materiales",
    description: "Compara lado a lado dos materiales del catálogo de Steam Engine.",
    chooseMaterial: "Elige un material",
    firstMaterial: "Primer material",
    secondMaterial: "Segundo material",
    swap: "Intercambiar materiales",
    identity: "Identidad",
    name: "Nombre",
    electricalProperties: "Propiedades eléctricas",
    temperatureBehavior: "Comportamiento térmico",
    physicalProperties: "Propiedades físicas",
    temperatureControlProfile: "Perfil de control de temperatura",
    profileAvailable: "Perfil del catálogo disponible",
    profileUnavailable: "Sin perfil en el catálogo",
    thermalConductivity: "Conductividad térmica",
    invalidSelection: "No se encontró en el catálogo un material indicado por este enlace compartido.",
    sameSelection: "Has seleccionado el mismo material en ambos lados.",
    capabilityDiffers:
        "Solo uno de los materiales seleccionados tiene un perfil de control de temperatura en el catálogo. " +
        "Comprueba la compatibilidad del dispositivo y usa el perfil del material exacto.",
    noSafetyNote: "No hay ninguna nota de seguridad específica del material registrada para esta entrada.",
};
