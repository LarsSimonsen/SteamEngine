import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./da";

export const messages: SharedMessages = {
    ...draftMessages,
    error: {
        ...draftMessages.error,
        retrying: "Prøver igen…",
    },
    catalogManager: {
        ...draftMessages.catalogManager,
        manage: (plural) => `Administrer ${plural}`,
        shared: (noun) => `Fælles katalog: ${noun}`,
        close: (noun) => `Luk administration af ${noun}`,
        choose: (plural) =>
            `Vælg synlige indbyggede elementer, eller opret brugerdefinerede ${plural}, som gemmes i denne browser.`,
        builtIn: (plural) => `Indbyggede ${plural}`,
        visibility: (plural) =>
            `Ændringer i synlighed gemmes med det samme. Skjulte ${plural.toLocaleLowerCase()} kan stadig klones.`,
        custom: (plural) => `Brugerdefinerede ${plural}`,
        newCustom: (noun) => `Opret ny brugerdefineret ${noun}`,
        noneYet: (plural) => `Der er endnu ingen brugerdefinerede ${plural}.`,
        resetSaved: (noun) => `Nulstil gemte data for ${noun}`,
        savedReset: (noun) => `De gemte data for ${noun} blev nulstillet.`,
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (noun) => `Rediger brugerdefineret ${noun}`,
        newCustom: (noun) => `Opret ny brugerdefineret ${noun}`,
        save: (noun) => `Gem ${noun}`,
        dataNote: "Datanote",
        wrapperColor: "Batterihylsterets farve",
        batteryHelp:
            "Angiv mindst én grænse for kontinuerlig afladning. Integrerede batterier er interne batteripakker i "
            + "mods, så særskilte celledimensioner er ikke nødvendige. Dimensionerne for udskiftelige celler er "
            + "nominelle; se noterne for målte dimensioner som solgt. Når begge afladningsgrænser er angivet, bruger "
            + "beregneren fortsat den sikreste beregnede grænse, hvis de afviger væsentligt.",
    },
    home: {
        ...draftMessages.home,
        catalogDescription: "Lær begreberne, og slå de materialer, batterier, mods og kontrolkort op, som Steam Engine bruger.",
        tools: {
            ...draftMessages.home.tools,
            wirewiz: {
                label: "Wire Wizard",
                description: "Kombinér forskellige tråde til en kompleks tråd og dens temperaturkurve.",
            },
            batt: {
                ...draftMessages.home.tools.batt,
                description: "Se strøm- og effektforbrug for en batteridrevet enhed.",
            },
        },
    },
    ohm: {
        ...draftMessages.ohm,
        adjusting: (field) => `Ved ændring af ${field}`,
        lockSummary: (changed, fixed) => `Ændring af ${changed} holder ${fixed} konstant.`,
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        openEntry: "Åbn opslag",
        categoryLabels: {
            ...draftMessages.encyclopedia.categoryLabels,
            mods: "Mods og kontrolkort",
        },
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        breadcrumb: "Brødkrummesti",
        availableBy: (date) => `Tilgængelig senest ${date}`,
        relatedEntry: "Relateret opslag",
        evidenceNotes: "Dokumentationsnoter",
        property: "Egenskab",
        additionalPropertyNotes: "Yderligere bemærkninger om egenskaben",
        loadingPowerCurve: "Indlæser effektkurve",
        loadingTemperatureCurve: "Indlæser temperaturkurve…",
        loadingResearchRecord: "Indlæser forskningspost…",
        modBoardCatalog: "Katalog over mods og kontrolkort",
        reviewed: (date) => `Gennemgået ${date}`,
        evidenceDate: "Dokumentationsdato",
        confidence: "Sikkerhedsniveau",
        recordStatus: "Poststatus",
        catalogImplication: "Betydning for kataloget",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            boardController: "Styrekort/controller",
        },
        wrapperColor: "Batterihylsterets farve",
    },
};
