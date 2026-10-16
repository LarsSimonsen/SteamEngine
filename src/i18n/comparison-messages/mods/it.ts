import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Piattaforma",
    powerLimits: "Limiti di potenza",
    atomizerRange: "Intervallo atomizzatore",
    category: "Categoria",
    batteryConfiguration: "Configurazione batteria",
    baseProfile: "Profilo di base",
    invalidSelection:
        "Un mod o una scheda indicata da questo link condiviso non è stato trovato nel " +
        "catalogo.",
    sameSelection: "Hai selezionato lo stesso mod o la stessa scheda su entrambi i lati.",
    platformDiffers:
        "Queste voci differiscono per categoria o configurazione della batteria. Verifica " +
        "che il confronto sia adatto all'uso previsto.",
    platformUnknown:
        "Alcuni dettagli della piattaforma sono sconosciuti, quindi la compatibilità di " +
        "categoria e batteria non può essere confrontata completamente.",
    noSafetyFindings: "Non sono registrati rilievi di sicurezza specifici per questa voce.",
};
