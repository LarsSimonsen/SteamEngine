import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./is";

export const messages: SharedMessages = {
    ...draftMessages,
    home: {
        ...draftMessages.home,
        tools: {
            ...draftMessages.home.tools,
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Wire Wizard",
            },
        },
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        availableBy: (date) => `Tiltækt í síðasta lagi ${date}`,
        loadingPowerCurve: "Hleður aflferil",
        evidenceDate: "Dagsetning heimilda",
        catalogImplication: "Þýðing fyrir vöruskrá",
    },
};
