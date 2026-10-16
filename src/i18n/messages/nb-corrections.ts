import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./nb";

export const messages: SharedMessages = {
    ...draftMessages,
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        evidenceDate: "Dokumentasjonsdato",
    },
};
