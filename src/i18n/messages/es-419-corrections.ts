import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./es-419";

export const messages: SharedMessages = {
    ...draftMessages,
    error: {
        ...draftMessages.error,
        reset: "Restablecer",
        retry: "Reintentar",
    },
    calculatorHeader: {
        ...draftMessages.calculatorHeader,
        oldVersionNote: "Puedes encontrar la versión antigua de esta calculadora",
    },
    navigation: {
        ...draftMessages.navigation,
        calculators: "Navegación de calculadoras",
        catalog: "Catálogo",
        home: "Inicio de Steam Engine",
    },
    theme: {
        ...draftMessages.theme,
        switchToLight: "Cambiar al modo claro",
    },
    calculatorVisibility: {
        ...draftMessages.calculatorVisibility,
        shown: "Mostrada",
        hidden: "Oculta",
    },
    catalogManager: {
        ...draftMessages.catalogManager,
        shared: (item) => `Catálogo compartido de ${item}`,
        close: (item) => `Cerrar el administrador de ${item}`,
        choose: (_item) => "Elige qué elementos integrados quieres mostrar o crea elementos personalizados; se "
            + "guardarán en este navegador.",
        builtIn: (item) => `Elementos integrados de ${item}`,
        visibility: (item) => `Los cambios de visibilidad se guardan de inmediato. Los elementos ocultos de ${item} `
            + "seguirán disponibles para clonarlos.",
        filterBuiltIns: "Filtrar elementos integrados",
        custom: (item) => `Elementos personalizados de ${item}`,
        newCustom: (item) => `Nuevo elemento personalizado de ${item}`,
        noneYet: (item) => `Aún no hay elementos personalizados de ${item}.`,
        clone: "Clonar",
        resetSaved: (item) => `Restablecer los datos guardados de ${item}`,
        savedReset: (item) => `Se restablecieron los datos guardados de ${item}.`,
        usedBy: (item, references) => `No se puede eliminar ${item} porque aparece en ${references}.`,
        deleted: (item) => `Se eliminó ${item}.`,
        resetSavedMessage: "Esto elimina solo los datos guardados. ¿Continuar?",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (item) => `Editar elemento personalizado de ${item}`,
        newCustom: (item) => `Nuevo elemento personalizado de ${item}`,
        properties: (item) => `Propiedades de ${item}`,
        saved: (item) => `Se guardó ${item}.`,
        sizeCode: "Código de tamaño",
        terminalStyle: "Tipo de terminal",
        flatTop: "Terminal plano",
        buttonTop: "Terminal con botón",
        selectFormFactor: "Selecciona un factor de forma",
        basedOnPreset: "Basado en un preajuste",
        batteryHelp: "Ingresa al menos un límite de corriente de descarga continua. Las baterías integradas son "
            + "paquetes internos del dispositivo, por lo que no requieren dimensiones independientes de celda. Las "
            + "dimensiones de las celdas extraíbles son nominales; consulta las notas para ver las medidas reales de "
            + "la celda tal como se vende. Si se especifican ambos límites de descarga y difieren de forma significativa, "
            + "la calculadora usará el límite calculado más seguro.",
        resistanceFactor: "Factor de resistencia",
        weightGrams: "Peso (g)",
        protectedStatus: "Estado de protección",
        normalizationInterpolated: " Se interpoló el punto de 20 °C y se normalizó la curva.",
        normalizationExtrapolated: " Se extrapoló el punto de 20 °C y se normalizó la curva.",
        normalizationExisting: " La curva TFR se normalizó a 20 °C.",
        normalizationHelp: "Al guardar se ordena la curva, se inserta o se deriva la referencia de 20 °C y se "
            + "normalizan todos los factores.",
        nominalVoltage: "Voltaje nominal (V)",
        maxOutputVoltage: "Voltaje máximo de salida (V)",
    },
    home: {
        ...draftMessages.home,
        intro: "Steam Engine reúne calculadoras prácticas para construir resistencias, comprobar el consumo de "
            + "batería, mezclar líquido para vapear y entender los valores de tu configuración.",
        blogEyebrow: "Mantente al día",
        blogDescription: "Consulta novedades y consejos sobre las calculadoras en el blog de Steam Engine.",
        catalogDescription: "Aprende los conceptos y consulta los materiales, las baterías, los mods y las tarjetas "
            + "de control que utiliza Steam Engine.",
        blogTitle: "Blog de Steam Engine",
        tools: {
            ...draftMessages.home.tools,
            ohm: {
                ...draftMessages.home.tools.ohm,
                label: "Ley de Ohm",
                description: "Calcula la resistencia, el voltaje, la corriente y la potencia mediante el efecto Joule.",
            },
            coil: {
                ...draftMessages.home.tools.coil,
                label: "Bobinado de resistencias",
                description: "Diseña resistencias reconstruibles para atomizadores y explora su comportamiento eléctrico.",
            },
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Asistente de alambres",
                description: "Combina distintos alambres para dar forma a una resistencia y a su curva de temperatura.",
            },
            batt: {
                ...draftMessages.home.tools.batt,
                label: "Consumo de batería",
                description: "Consulta el consumo de corriente y potencia de un dispositivo que funciona con batería.",
            },
            modrange: {
                ...draftMessages.home.tools.modrange,
                label: "Rango del mod",
                description: "Encuentra el rango de resistencia útil para un mod regulado.",
            },
            converter: {
                ...draftMessages.home.tools.converter,
                description: "Convierte entre milímetros, pulgadas, pulgadas fraccionarias y calibres de alambre.",
            },
            juice: {
                ...draftMessages.home.tools.juice,
                label: "Líquido para vapear",
                description: "Mezcla una receta para alcanzar la concentración de nicotina y la proporción VG/PG "
                    + "que deseas.",
            },
            old: {
                ...draftMessages.home.tools.old,
                description: "Aquí puedes encontrar las versiones antiguas de las calculadoras.",
            },
        },
    },
    ohm: {
        ...draftMessages.ohm,
        eyebrow: "Calculadora de la ley de Ohm",
        title: "Ley de Ohm",
        descriptionBeforeOhm: "Esta es una calculadora sencilla de la",
        descriptionBetweenLaws: "y la",
        descriptionAfterLaws: "para cálculos eléctricos.",
        joulesLawLinkLabel: "Ley de Joule",
        lock: "Bloquear",
        reset: "Restablecer",
        simpleLocks: "Bloqueos simples",
        showDetailedLocks: "Mostrar bloqueos detallados",
        hideDetailedLocks: "Ocultar bloqueos detallados",
        detailedLocks: "Bloqueos detallados",
        aboutText: "Puedes cambiar cualquier valor. Los demás valores se actualizan inmediatamente. Los valores se "
            + "pueden bloquear para que no cambien cuando ajustas otro valor.",
        fields: {
            ...draftMessages.ohm.fields,
            current: "Corriente",
            power: "Potencia",
        },
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Referencia de Steam Engine",
        title: "Catálogo",
        openEntry: "Abrir entrada",
        lead: "Explora los conceptos, materiales, baterías, mods y tarjetas de control en los que se basan las "
            + "calculadoras.",
        entriesLabel: (count) => `${count} ${count === 1 ? "entrada" : "entradas"}`,
        browseCategory: (category, count) => `Explorar ${category} (${count} ${count === 1 ? "entrada" : "entradas"})`,
        categoryLabels: {
            ...draftMessages.encyclopedia.categoryLabels,
            mods: "Mods y tarjetas",
        },
        categoryDescriptions: {
            ...draftMessages.encyclopedia.categoryDescriptions,
            materials: "Alambres resistivos y materiales para control de temperatura.",
            mods: "Dispositivos regulados y perfiles de tarjetas de control.",
        },
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        breadcrumb: "Ruta de navegación",
        availableBy: (date) => `Disponibilidad confirmada a más tardar: ${date}`,
        introduced: (date) => `Fecha de introducción: ${date}`,
        introducedBetween: (from, to) => `Fecha de introducción: entre ${from} y ${to}`,
        introducedNoEarlier: (date) => `Fecha de introducción: no antes de ${date}`,
        unit: "Unidad",
        loadingPowerCurve: "Cargando la curva de potencia",
        evidenceDate: "Fecha de la evidencia",
        confidence: "Nivel de confianza",
        catalogNote: "Nota del catálogo",
        chemistry: "Clasificación química",
        sourceBackedMaterial: "Registro de material respaldado por fuentes",
        sourceBackedEntity: "Registro de entidad respaldado por fuentes",
        evidenceNotes: "Notas sobre la evidencia",
        noSourceBackedRecord: "No hay un registro de investigación respaldado por fuentes disponible para esta entrada.",
        temperatureResistanceCurve: "Curva de resistencia en función de la temperatura",
        noBatterySafety: "No hay una nota de seguridad específica de la batería para esta entrada.",
        batteryInternal: "Esta batería es un paquete integrado en el dispositivo, no una celda que el usuario pueda reemplazar.",
        continuousDischargeCurrent: (current) => `El catálogo indica una corriente de descarga continua de ${current} A.`,
        continuousDischargeC: (cRate) => `El catálogo indica una tasa de descarga continua de ${cRate} C.`,
        noContinuousDischarge: "El catálogo no establece una clasificación de descarga continua.",
        rewrapExplanation: "La etiqueta se considera una marca de reenvasado; el fabricante de la celda subyacente "
            + "no se da por supuesto a partir de la envoltura.",
        oldBatteryWarning: "Este es un modelo de batería antiguo y probablemente ha sido sustituido por modelos más "
            + "adecuados.",
        unknownBatteryIntroductionNotice: "Se desconoce la fecha de lanzamiento de esta celda, por lo que no se puede "
            + "determinar su antigüedad ni si ya fue reemplazada.",
        unknownChemistry: "El registro de investigación no establece una clasificación química para esta entrada.",
        recordStatus: "Estado del registro",
        catalogImplication: "Impacto en el catálogo",
        categoryLabels: {
            ...draftMessages.encyclopediaDetail.categoryLabels,
            mods: "Mods",
        },
        basedOnBoardProfile: "Este perfil de dispositivo se basa en el perfil de la tarjeta de control:",
        builtIntoModProfile: "Este perfil de batería está integrado en el perfil del mod:",
        modBoardCatalog: "Catálogo de mods y tarjetas de control",
        materialCatalog: "Catálogo de materiales para resistencias",
        inVaping: "En el vapeo",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            continuousDischarge: "Clasificación de descarga continua",
            maximumVoltage: "Voltaje máximo",
            boardController: "Tarjeta de control/controlador",
            temperatureCoefficient: "Coeficiente de temperatura de la resistencia",
            maximumRecommendedTemperature: "Temperatura máxima de uso recomendada",
        },
        nominalVoltage: "Voltaje nominal",
    },
};
