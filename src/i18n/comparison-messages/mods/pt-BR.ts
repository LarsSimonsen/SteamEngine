import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Plataforma",
    powerLimits: "Limites de potência",
    atomizerRange: "Faixa do atomizador",
    category: "Categoria",
    batteryConfiguration: "Configuração da bateria",
    baseProfile: "Perfil base",
    invalidSelection:
        "Um mod ou uma placa indicado por este link compartilhado não foi encontrado no " +
        "catálogo.",
    sameSelection: "Você selecionou o mesmo mod ou placa nos dois lados.",
    platformDiffers:
        "Estas entradas diferem na categoria ou configuração da bateria. Confirme se a " +
        "comparação serve ao uso pretendido.",
    platformUnknown:
        "Alguns detalhes da plataforma são desconhecidos, então a compatibilidade da "
        + "categoria e da configuração da bateria não pode ser totalmente comparada.",
    noSafetyFindings: "Não há achados de segurança específicos registrados para esta entrada.",
};
