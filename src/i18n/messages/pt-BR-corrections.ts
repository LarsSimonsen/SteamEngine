import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./pt-BR";

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
        blog: "Blog",
        home: "Página inicial do Steam Engine",
        calculators: "Navegação entre calculadoras",
    },
    catalogManager: {
        ...draftMessages.catalogManager,
        manage: (plural) => `Gerenciar ${localizeCatalogNoun(plural)}`,
        shared: (noun) => `Catálogo compartilhado: ${localizeCatalogNoun(noun)}`,
        close: (noun) => `Fechar o gerenciamento de ${localizeCatalogNoun(noun)}`,
        choose: (arg0) => "Escolha os itens predefinidos visíveis ou crie itens personalizados de "
            + localizeCatalogNoun(arg0)
            + " salvos neste navegador.",
        builtIn: (arg0) => "Itens predefinidos: "
            + localizeCatalogNoun(arg0),
        visibility: (arg0) => "As alterações de visibilidade são salvas imediatamente. Os itens ocultos ("
            + localizeCatalogNoun(arg0)
            + ") continuam disponíveis para clonagem.",
        custom: (arg0) => "Itens personalizados: "
            + localizeCatalogNoun(arg0),
        newCustom: (arg0) => "Novo item personalizado: "
            + localizeCatalogNoun(arg0),
        noneYet: (arg0) => "Ainda não há itens personalizados de "
            + localizeCatalogNoun(arg0)
            + ".",
        resetSaved: (arg0) => "Redefinir dados salvos de "
            + localizeCatalogNoun(arg0),
        savedReset: (arg0) => "Os dados salvos de "
            + localizeCatalogNoun(arg0)
            + " foram redefinidos.",
        customItemsDescription: (arg0) => "Os itens personalizados de "
            + localizeCatalogNoun(arg0)
            + " são sempre exibidos no seletor da calculadora.",
        filterBuiltIns: "Filtrar itens predefinidos",
        usedBy: (arg0, arg1) => "Não é possível excluir "
            + arg0
            + ": existe uma referência em "
            + arg1
            + ".",
        deleted: (arg0) => "Item excluído: "
            + arg0
            + ".",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (arg0) => "Editar item personalizado: "
            + localizeCatalogNoun(arg0),
        newCustom: (arg0) => "Novo item personalizado: "
            + localizeCatalogNoun(arg0),
        save: (noun) => `Salvar ${localizeCatalogNoun(noun)}`,
        properties: (arg0) => "Propriedades de "
            + localizeCatalogNoun(arg0),
        saved: (arg0) => "Item salvo: "
            + localizeCatalogNoun(arg0)
            + ".",
        sizeCodePlaceholder: "Opcional, por exemplo, 18650",
        wrapperColorPlaceholder: "Opcional, descrição da cor",
        markingsPlaceholder: "Opcional; uma marcação do invólucro por linha",
        currentWithCRatingPlaceholder: "Opcional quando a taxa C está definida",
        cRatingWithCurrentPlaceholder: "Opcional quando a corrente está definida",
        integratedMod: "Integrada ao mod",
        protectedStatus: "Estado da proteção",
        protectedCell: "Com proteção",
        unprotectedCell: "Sem proteção",
        terminalStyle: "Tipo de terminal",
        buttonTop: "Topo saliente",
        wrapperColor: "Cor do invólucro",
        batteryHelp: "Insira pelo menos um limite de descarga contínua. As baterias integradas são "
            + "conjuntos de células internos do mod, portanto não são necessárias dimensões "
            + "de células independentes. As dimensões das células removíveis são nominais; "
            + "use as notas para registrar as dimensões medidas da bateria tal como é "
            + "vendida. Quando ambos os limites de descarga estão definidos, a calculadora "
            + "continua a usar o limite derivado mais seguro se eles diferirem "
            + "significativamente.",
        normalizationHelp: "Ao salvar, os pontos da curva são ordenados, a referência de 20 °C é inserida "
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
            coil: {
                ...draftMessages.home.tools.coil,
                description: "Planeje bobinas para atomizadores reconstruíveis e explore seu "
                    + "comportamento elétrico.",
            },
            batt: {
                ...draftMessages.home.tools.batt,
                description: "Consulte o consumo de corrente e potência de um dispositivo alimentado "
                    + "por bateria.",
            },
            modrange: {
                ...draftMessages.home.tools.modrange,
                description: "Encontre a faixa de resistência útil para um mod regulado.",
            },
        },
    },
    ohm: {
        ...draftMessages.ohm,
        adjusting: (field) => `Ao ajustar ${field}`,
        lockSummary: (changed, fixed) => `Alterar ${changed} mantém ${fixed} constante.`,
        descriptionBeforeOhm: "Esta calculadora usa a",
        descriptionAfterLaws: "para cálculos simples.",
        joulesLawLinkLabel: "a lei de Joule",
        simpleLocks: "Bloqueios simples",
        detailedLocks: "Bloqueios detalhados",
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Referência Steam Engine",
        openEntry: "Abrir entrada",
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
        availableBy: (arg0) => "Já disponível em "
            + arg0,
        unit: "Unidade",
        loadingPowerCurve: "Carregando a curva de potência",
        evidenceDate: "Data da documentação",
        recordStatus: "Status do registro",
        catalogImplication: "Impacto no catálogo",
        integratedInMod: "Integrada ao mod",
        wrapperColor: "Cor do invólucro",
        batteryInternal: "Esta bateria é um conjunto de células interno do dispositivo, e não uma célula "
            + "substituível pelo usuário.",
        categoryLabels: {
            ...draftMessages.encyclopediaDetail.categoryLabels,
            mods: "Mods",
        },
        aliases: "Nomes alternativos",
        introduced: (arg0) => "Introdução no mercado: "
            + arg0,
        reviewed: (arg0) => "Data da revisão: "
            + arg0,
        temperatureResistanceCurve: "Curva da resistência em função da temperatura",
        continuousDischargeCurrent: (arg0) => "O catálogo lista uma classificação de descarga contínua de "
            + arg0
            + " A.",
        continuousDischargeC: (arg0) => "O catálogo lista uma classificação de descarga contínua de "
            + arg0
            + " C.",
        rewrapExplanation: "A marca é tratada como uma marca que reveste células de outros fabricantes; "
            + "não se deduz o fabricante original da célula apenas pelo invólucro.",
        modBoardCatalog: "Catálogo de placas e dispositivos mod",
    },
};
