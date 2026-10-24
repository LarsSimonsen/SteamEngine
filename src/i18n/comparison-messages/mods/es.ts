import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Plataforma",
    powerLimits: "Límites de potencia",
    atomizerRange: "Rango del atomizador",
    category: "Categoría",
    batteryConfiguration: "Configuración de batería",
    baseProfile: "Perfil base",
    invalidSelection:
        "No se encontró en el catálogo un mod o una placa indicada por este enlace " +
        "compartido.",
    sameSelection: "Has seleccionado el mismo mod o placa en ambos lados.",
    platformDiffers:
        "Estas entradas difieren en categoría o configuración de batería. Confirma que la " +
        "comparación se ajusta al uso previsto.",
    platformUnknown:
        "Faltan algunos datos de la plataforma, por lo que no se puede comparar por " +
        "completo la compatibilidad de categoría y batería.",
    noSafetyFindings: "No hay hallazgos de seguridad específicos registrados para esta entrada.",
    chooseMod: "Elija un mod o una placa",
    firstMod: "Seleccione mod/placa A",
    secondMod: "Seleccione mod/placa B",
    swap: "Intercambiar mods/placas",
};
