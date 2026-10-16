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
    temperatureControlProfile: "Perfil de controle de temperatura",
    profileAvailable: "Perfil do catálogo disponível",
    profileUnavailable: "Sem perfil no catálogo",
    thermalConductivity: "Condutividade térmica",
    invalidSelection: "Não foi encontrado no catálogo um material mencionado por este link compartilhado.",
    sameSelection: "Você selecionou o mesmo material nos dois lados.",
    capabilityDiffers:
        "Apenas um dos materiais selecionados tem um perfil de controle de temperatura no catálogo. Verifique o " +
        "suporte do dispositivo e use o perfil do material exato.",
    noSafetyNote: "Não há nenhuma nota de segurança específica do material registrada para esta entrada.",
};
