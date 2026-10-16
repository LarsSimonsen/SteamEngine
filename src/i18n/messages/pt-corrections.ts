import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./pt";

const catalogNouns: Readonly<Record<string, string>> = {
    material: "material", materials: "materiais",
    battery: "bateria", batteries: "baterias",
    mod: "mod", mods: "mods",
};

const localizeCatalogNoun = (noun: string): string => catalogNouns[noun.toLowerCase()] ?? noun;

export const messages: SharedMessages = {
    ...draftMessages,
    navigation: {
        ...draftMessages.navigation,
        home: "Página inicial do Steam Engine",
    },
    catalogManager: {
        ...draftMessages.catalogManager,
        manage: (plural) => `Gerir ${localizeCatalogNoun(plural)}`,
        shared: (noun) => `Catálogo partilhado: ${localizeCatalogNoun(noun)}`,
        close: (noun) => `Fechar a gestão de ${localizeCatalogNoun(noun)}`,
        choose: (arg0) => "Escolha as entradas predefinidas visíveis ou crie entradas de "
            + localizeCatalogNoun(arg0)
            + " guardadas neste navegador.",
        builtIn: (arg0) => "Entradas predefinidas: "
            + localizeCatalogNoun(arg0),
        visibility: (arg0) => "As alterações de visibilidade são guardadas de imediato. As entradas ocultas ("
            + localizeCatalogNoun(arg0)
            + ") continuam disponíveis para clonagem.",
        custom: (arg0) => "Entradas personalizadas: "
            + localizeCatalogNoun(arg0),
        newCustom: (arg0) => "Nova entrada personalizada: "
            + localizeCatalogNoun(arg0),
        noneYet: (arg0) => "Ainda não existem entradas personalizadas de "
            + localizeCatalogNoun(arg0)
            + ".",
        resetSaved: (noun) => `Repor dados guardados de ${localizeCatalogNoun(noun)}`,
        savedReset: (noun) => `Os dados guardados de ${localizeCatalogNoun(noun)} foram repostos.`,
        usedBy: (arg0, arg1) => "Não é possível eliminar "
            + arg0
            + ": existe uma referência em "
            + arg1
            + ".",
        deleted: (arg0) => "Entrada eliminada: "
            + arg0
            + ".",
        customItemsDescription: (arg0) => "As entradas personalizadas de "
            + localizeCatalogNoun(arg0)
            + " são sempre apresentadas no seletor da calculadora.",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (arg0) => "Editar entrada personalizada: "
            + localizeCatalogNoun(arg0),
        newCustom: (arg0) => "Nova entrada personalizada: "
            + localizeCatalogNoun(arg0),
        save: (noun) => `Guardar ${localizeCatalogNoun(noun)}`,
        properties: (arg0) => "Propriedades de "
            + localizeCatalogNoun(arg0),
        saved: (arg0) => "Entrada guardada: "
            + localizeCatalogNoun(arg0)
            + ".",
        sizeCodePlaceholder: "Opcional, p. ex., 18650",
        wrapperColorPlaceholder: "Opcional, descrição da cor",
        markingsPlaceholder: "Opcional; uma marcação do invólucro por linha",
        currentWithCRatingPlaceholder: "Opcional quando a taxa C está definida",
        cRatingWithCurrentPlaceholder: "Opcional quando a corrente está definida",
        terminalStyle: "Tipo de terminal",
        buttonTop: "Topo saliente",
        integratedMod: "Integrada no mod",
        protectedCell: "Com proteção",
        unprotectedCell: "Sem proteção",
        batteryHelp: "Introduza pelo menos um limite de descarga contínua. As baterias integradas "
            + "são conjuntos de células internos do mod, pelo que não são necessárias "
            + "dimensões de células independentes. As dimensões das células amovíveis são "
            + "nominais; utilize as notas para as dimensões medidas da bateria tal como é "
            + "vendida. Quando ambos os limites de descarga estão definidos, a calculadora "
            + "continua a utilizar o limite derivado mais seguro se estes diferirem "
            + "significativamente.",
        normalizationHelp: "Ao guardar, os pontos da curva são ordenados, a referência de 20 °C é inserida "
            + "ou calculada e todos os fatores são normalizados.",
        normalizationInterpolated: " O ponto 20 °C foi interpolado e a curva foi normalizada.",
        normalizationExtrapolated: " O ponto de 20 °C foi extrapolado e a curva foi normalizada.",
        normalizationExisting: " A curva TFR foi normalizada a 20 °C.",
    },
    home: {
        ...draftMessages.home,
        blogTitle: "Blog do Steam Engine",
        tools: {
            ...draftMessages.home.tools,
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Wire Wizard",
            },
            batt: {
                ...draftMessages.home.tools.batt,
                description: "Consulte o consumo de corrente e potência de um dispositivo alimentado "
                    + "por bateria.",
            },
            modrange: {
                ...draftMessages.home.tools.modrange,
                description: "Encontre a gama de resistência útil para um mod regulado.",
            },
        },
    },
    ohm: {
        ...draftMessages.ohm,
        adjusting: (field) => `Ao ajustar ${field}`,
        lockSummary: (changed, fixed) => `Alterar ${changed} mantém ${fixed} constante.`,
        descriptionBeforeOhm: "Esta calculadora utiliza a",
        descriptionBetweenLaws: "e",
        descriptionAfterLaws: "para cálculos simples.",
        joulesLawLinkLabel: "a lei de Joule",
        simpleLocks: "Bloqueios simples",
        detailedLocks: "Bloqueios detalhados",
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Referência Steam Engine",
        openEntry: "Abrir entrada",
        searchPlaceholder: "Pesquise nomes, modelos ou designações alternativas",
        browseCategory: (arg0, arg1) => "Explorar "
            + arg0
            + " ("
            + arg1
            + " entradas)",
        categoryDescriptions: {
            ...draftMessages.encyclopedia.categoryDescriptions,
            batteries: "Células, conjuntos de células e fontes de energia integradas.",
        },
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        breadcrumb: "Navegação estrutural",
        availableBy: (arg0) => "Disponível, o mais tardar, em "
            + arg0,
        unit: "Unidade",
        loadingPowerCurve: "A carregar a curva de potência",
        evidenceDate: "Data da documentação",
        recordStatus: "Estado do registo",
        catalogImplication: "Impacto no catálogo",
        loadingResearchRecord: "A carregar o registo de investigação…",
        integratedInMod: "Integrada no mod",
        aliases: "Designações alternativas",
        batteryInternal: "Esta bateria é um conjunto de células interno do dispositivo, e não uma célula "
            + "substituível pelo utilizador.",
        categoryLabels: {
            ...draftMessages.encyclopediaDetail.categoryLabels,
            mods: "Mods",
        },
        introduced: (arg0) => "Introdução no mercado: "
            + arg0,
        reviewed: (arg0) => "Data de revisão: "
            + arg0,
        temperatureResistanceCurve: "Curva da resistência em função da temperatura",
        loadingTemperatureCurve: "A carregar a curva de temperatura…",
        rewrapExplanation: "A marca é tratada como uma marca que reveste células de outros fabricantes; "
            + "não se deduz o fabricante original da célula apenas pelo invólucro.",
        modBoardCatalog: "Catálogo de placas e dispositivos mod",
    },
    error: {
        ...draftMessages.error,
        retrying: "A tentar novamente…",
    },
};
