import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Plataforma",
    powerLimits: "Limites de potência",
    atomizerRange: "Gama do atomizador",
    category: "Categoria",
    batteryConfiguration: "Configuração da bateria",
    baseProfile: "Perfil base",
    invalidSelection:
        "Não foi encontrado no catálogo um mod ou uma placa indicado por esta ligação " +
        "partilhada.",
    sameSelection: "Selecionou o mesmo mod ou placa em ambos os lados.",
    platformDiffers:
        "Estas entradas diferem na categoria ou configuração da bateria. Confirme que a " +
        "comparação é adequada ao uso pretendido.",
    platformUnknown:
        "Alguns detalhes da plataforma são desconhecidos, pelo que a compatibilidade de " +
        "categoria e bateria não pode ser totalmente comparada.",
    noSafetyFindings: "Não existem conclusões de segurança específicas registadas para esta entrada.",
};
