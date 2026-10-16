import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Comparar materiais",
    description: "Compare lado a lado dois materiais do catálogo Steam Engine.",
    chooseMaterial: "Escolher um material",
    firstMaterial: "Primeiro material",
    secondMaterial: "Segundo material",
    swap: "Trocar materiais",
    identity: "Identidade",
    name: "Nome",
    electricalProperties: "Propriedades elétricas",
    temperatureBehavior: "Comportamento térmico",
    physicalProperties: "Propriedades físicas",
    temperatureControlProfile: "Perfil de controlo de temperatura",
    profileAvailable: "Perfil do catálogo disponível",
    profileUnavailable: "Sem perfil no catálogo",
    thermalConductivity: "Condutividade térmica",
    invalidSelection: "Não foi encontrado no catálogo um material referido por esta ligação partilhada.",
    sameSelection: "Selecionou o mesmo material em ambos os lados.",
    capabilityDiffers:
        "Apenas um dos materiais selecionados tem um perfil de controlo de temperatura no catálogo. Verifique o " +
        "suporte do dispositivo e utilize o perfil do material exato.",
    noSafetyNote: "Não está registada qualquer nota de segurança específica do material para esta entrada.",
};
