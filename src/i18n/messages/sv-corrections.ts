import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./sv";

const catalogNouns: Readonly<Record<string, string>> = {
    material: "material", materials: "material",
    battery: "batteri", batteries: "batterier",
    mod: "mod", mods: "moddar",
};

const localizeCatalogNoun = (noun: string): string => catalogNouns[noun.toLowerCase()] ?? noun;

export const messages: SharedMessages = {
    ...draftMessages,
    catalogManager: {
        ...draftMessages.catalogManager,
        manage: (plural) => `Hantera ${localizeCatalogNoun(plural)}`,
        shared: (noun) => `Delad katalog: ${localizeCatalogNoun(noun)}`,
        close: (noun) => `Stäng hanteringen av ${localizeCatalogNoun(noun)}`,
        choose: (arg0) => "Välj synliga inbyggda poster eller skapa anpassade "
            + localizeCatalogNoun(arg0)
            + " som sparas i den här webbläsaren.",
        builtIn: (plural) => `Inbyggda ${localizeCatalogNoun(plural)}`,
        visibility: (arg0) => "Ändringar av synligheten sparas direkt. Dolda "
            + localizeCatalogNoun(arg0)
            + " kan fortfarande klonas.",
        custom: (plural) => `Anpassade ${localizeCatalogNoun(plural)}`,
        newCustom: (arg0) => "Ny anpassad post: "
            + localizeCatalogNoun(arg0),
        noneYet: (plural) => `Det finns inga anpassade ${localizeCatalogNoun(plural)} ännu.`,
        resetSaved: (arg0) => "Återställ sparade data för "
            + localizeCatalogNoun(arg0),
        savedReset: (noun) => `Sparade data för ${localizeCatalogNoun(noun)} återställdes.`,
        usedBy: (arg0, arg1) => "Kan inte ta bort "
            + arg0
            + "; "
            + arg1
            + " använder posten.",
        customItemsDescription: (arg0) => "Anpassade "
            + localizeCatalogNoun(arg0)
            + " visas alltid i kalkylatorns väljare.",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (arg0) => "Redigera anpassad post: "
            + localizeCatalogNoun(arg0),
        newCustom: (arg0) => "Ny anpassad post: "
            + localizeCatalogNoun(arg0),
        save: (noun) => `Spara ${localizeCatalogNoun(noun)}`,
        properties: (arg0) => "Egenskaper för "
            + localizeCatalogNoun(arg0),
        saved: (arg0) => "Post sparad: "
            + localizeCatalogNoun(arg0)
            + ".",
        terminalStyle: "Poltyp",
        buttonTop: "Upphöjd pol",
        protectedStatus: "Skyddsstatus",
        continuousC: "C-värde för kontinuerlig urladdning",
        dataNote: "Dataanmärkning",
        batteryHelp: "Ange minst en gräns för kontinuerlig urladdning. Integrerade batterier är "
            + "interna batteripaket i modden, så mått för fristående celler krävs inte. "
            + "Måtten för löstagbara celler är nominella; använd anteckningarna för uppmätta "
            + "mått i det skick cellerna säljs. När båda urladdningsgränserna är angivna "
            + "fortsätter räknaren att använda den säkrare härledda gränsen om de skiljer sig "
            + "väsentligt.",
        normalizationInterpolated: " 20 °C-punkten interpolerades och kurvan normaliserades.",
        normalizationExtrapolated: " 20 °C-punkten extrapolerades och kurvan normaliserades.",
        normalizationExisting: " TFR-kurvan normaliserades vid 20 °C.",
        minAtomizerResistance: "Minsta motstånd i förångaren (Ω)",
        maxAtomizerResistance: "Största motstånd i förångaren (Ω)",
        sizeCodePlaceholder: "Valfritt, t.ex. 18650",
        wrapperColorPlaceholder: "Valfritt, beskrivande",
        markingsPlaceholder: "Valfritt; en märkning från höljet per rad",
        currentWithCRatingPlaceholder: "Valfritt när C-värdet är angivet",
        cRatingWithCurrentPlaceholder: "Valfritt när strömmen är angiven",
    },
    home: {
        ...draftMessages.home,
        tools: {
            ...draftMessages.home.tools,
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Wire Wizard",
            },
            coil: {
                ...draftMessages.home.tools.coil,
                description: "Planera coils för byggbara förångare och utforska deras elektriska "
                    + "beteende.",
            },
            batt: {
                ...draftMessages.home.tools.batt,
                description: "Se ström- och effektförbrukning för en batteridriven enhet.",
            },
            converter: {
                ...draftMessages.home.tools.converter,
                description: "Omvandla mellan millimeter, tum, tum i bråkform och tråddimensioner.",
            },
        },
        intro: "Steam Engine är en svit med praktiska miniräknare för att bygga spolar, "
            + "kontrollera batteriförbrukningen, blanda e-vätska och förstå siffrorna bakom "
            + "din installation.",
    },
    ohm: {
        ...draftMessages.ohm,
        adjusting: (field) => `Vid justering av ${field}`,
        lockSummary: (changed, fixed) => `Ändring av ${changed} håller ${fixed} konstant.`,
        descriptionBeforeOhm: "Den här enkla kalkylatorn använder",
        descriptionAfterLaws: "för beräkningarna.",
        values: "Värden",
        joulesLawLinkLabel: "Joules lag",
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Steam Engine-referens",
        openEntry: "Öppna post",
        browseCategory: (arg0, arg1) => "Bläddra bland "
            + arg0
            + " ("
            + arg1
            + " poster)",
        categoryLabels: {
            ...draftMessages.encyclopedia.categoryLabels,
            mods: "Moddar och styrkort",
        },
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        availableBy: (date) => `Tillgänglig senast ${date}`,
        breadcrumb: "Navigeringssökväg",
        property: "Egenskap",
        additionalPropertyNotes: "Ytterligare egenskapsanteckningar",
        loadingPowerCurve: "Läser in effektkurva",
        evidenceDate: "Dokumentationsdatum",
        recordStatus: "Poststatus",
        catalogImplication: "Betydelse för katalogen",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            boardController: "Kort/styrenhet",
            continuousDischarge: "Märkvärde för kontinuerlig urladdning",
        },
        introduced: (arg0) => "Introducerad "
            + arg0,
        reviewed: (arg0) => "Granskad "
            + arg0,
        continuousDischargeCurrent: (arg0) => "Katalogen anger ett kontinuerligt urladdningsvärde på "
            + arg0
            + " A.",
        continuousDischargeC: (arg0) => "Katalogen anger ett kontinuerligt urladdningsvärde på "
            + arg0
            + " C.",
        rewrapExplanation: "Märket behandlas som ett varumärke som märker om andra tillverkares celler; "
            + "den ursprungliga celltillverkaren antas inte enbart utifrån höljet.",
        basedOnBoardProfile: "Den här enhetsprofilen är baserad på styrkortets profil:",
        noAuthenticityAssessment: "Ingen postspecifik äkthetsbedömning har registrerats.",
        modBoardCatalog: "Katalog över moddar och styrkort",
        inVaping: "Vid vejping",
        basedOnArticle: "Baserat på artikeln i kunskapsbasen för Steam Engine",
    },
};
