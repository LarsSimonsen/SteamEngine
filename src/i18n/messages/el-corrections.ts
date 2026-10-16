import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./el";

export const messages: SharedMessages = {
    ...draftMessages,
    encyclopedia: {
        ...draftMessages.encyclopedia,
        openEntry: "Άνοιγμα καταχώρησης",
    },
};
