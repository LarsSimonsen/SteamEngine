import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./it";

export const messages: SharedMessages = {
    ...draftMessages,
    catalogManager: {
        ...draftMessages.catalogManager,
        manage: (plural) => `Gestisci ${plural}`,
        shared: (noun) => `Catalogo condiviso: ${noun}`,
        close: (noun) => `Chiudi la gestione di ${noun}`,
        choose: (plural) => `Scegli gli elementi integrati visibili o crea ${plural} personalizzati nel browser.`,
        builtIn: (plural) => `${plural} integrati`,
        visibility: (plural) => `Le modifiche vengono salvate subito. I ${plural} nascosti possono essere clonati.`,
        custom: (plural) => `${plural} personalizzati`,
        newCustom: (noun) => `Nuovo ${noun} personalizzato`,
        noneYet: (plural) => `Non ci sono ancora ${plural} personalizzati.`,
        resetSaved: (noun) => `Reimposta i dati salvati per ${noun}`,
        savedReset: (noun) => `I dati salvati per ${noun} sono stati reimpostati.`,
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (noun) => `Modifica ${noun} personalizzato`,
        newCustom: (noun) => `Nuovo ${noun} personalizzato`,
        save: (noun) => `Salva ${noun}`,
    },
    home: {
        ...draftMessages.home,
        blogTitle: "Blog di Steam Engine",
        tools: {
            ...draftMessages.home.tools,
            wirewiz: { ...draftMessages.home.tools.wirewiz, label: "Wire Wizard" },
        },
    },
    ohm: {
        ...draftMessages.ohm,
        adjusting: (field) => `Durante la regolazione di ${field}`,
        lockSummary: (changed, fixed) => `La modifica di ${changed} mantiene costante ${fixed}.`,
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Riferimento Steam Engine",
        openEntry: "Apri voce",
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        breadcrumb: "Percorso di navigazione",
        availableBy: (date) => `Disponibile entro il ${date}`,
        evidenceNotes: "Note sulle evidenze",
        loadingPowerCurve: "Caricamento della curva di potenza",
        evidenceDate: "Data delle evidenze",
        recordStatus: "Stato della scheda",
        catalogImplication: "Impatto sul catalogo",
    },
};
