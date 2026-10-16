import type {
    BatteryComparisonMessages,
    MaterialComparisonMessages,
    ModComparisonMessages,
} from "../comparison-messages";
import { messages as batteryDraft } from "./batteries/es-419";
import { messages as materialDraft } from "./materials/es-419";
import { messages as modDraft } from "./mods/es-419";

export const batteries: BatteryComparisonMessages = {
    ...batteryDraft,
    compareDescription: "Elige dos baterías del catálogo para comparar su construcción, propiedades eléctricas, "
        + "contexto y notas de seguridad.",
    compareFirstBattery: "Selecciona la batería A",
    compareSecondBattery: "Selecciona la batería B",
    compareChooseBattery: "Elige una batería",
    compareSameBattery: "Seleccionaste la misma batería en ambos lados.",
    compareConstructionDiffers: "Estas baterías difieren en su construcción y es posible que no sean intercambiables. "
        + "Verifica el tamaño, las dimensiones, el estilo de terminal y los requisitos de protección admitidos por el "
        + "dispositivo.",
    compareConstructionUnknown: "Se desconocen algunos detalles de construcción. Confirma la compatibilidad con la "
        + "documentación del dispositivo antes de usarlo.",
    compareSwap: "Intercambiar baterías",
    compareElectrical: "Propiedades eléctricas",
    compareAuthenticitySuspected: "Sospechosa",
    compareAuthenticityVerified: "Verificada",
    compareAuthenticityCounterfeit: "Falsificada",
};

export const mods: ModComparisonMessages = {
    ...modDraft,
    baseProfile: "Perfil base",
    atomizerRange: "Rango del atomizador",
    invalidSelection: "El mod o la tarjeta de control que menciona este enlace compartido no está en el catálogo.",
    sameSelection: "Seleccionaste el mismo mod o la misma tarjeta de control en ambos lados.",
    platformDiffers: "Estas entradas difieren en la categoría o configuración de la batería. Verifica que la "
        + "comparación se ajuste al uso previsto.",
    platformUnknown: "Se desconocen algunos detalles de la plataforma, por lo que no se puede comparar por completo "
        + "la compatibilidad de las categorías y configuraciones de batería.",
    noSafetyFindings: "No hay hallazgos de seguridad específicos de esta entrada.",
};

export const materials: MaterialComparisonMessages = {
    ...materialDraft,
    description: "Compara dos materiales del catálogo de Steam Engine uno al lado del otro.",
    chooseMaterial: "Elige un material",
    firstMaterial: "Selecciona el material A",
    secondMaterial: "Selecciona el material B",
    temperatureBehavior: "Comportamiento térmico",
    invalidSelection: "No se encontró en el catálogo el material al que hace referencia este enlace compartido.",
    sameSelection: "Seleccionaste el mismo material en ambos lados.",
    capabilityDiffers: "Solo uno de los materiales seleccionados tiene un perfil de control de temperatura en el "
        + "catálogo. Verifica la compatibilidad del dispositivo y usa el perfil correspondiente a ese material.",
    noSafetyNote: "No hay una nota de seguridad específica del material para esta entrada.",
    electricalProperties: "Propiedades eléctricas",
};
