import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./ja";

export const messages: SharedMessages = {
    ...draftMessages,
    navigation: { ...draftMessages.navigation, home: "Steam Engine ホーム" },
    home: {
        ...draftMessages.home,
        blogTitle: "Steam Engine ブログ",
        tools: {
            ...draftMessages.home.tools,
            wirewiz: { ...draftMessages.home.tools.wirewiz, label: "Wire Wizard" },
            modrange: { ...draftMessages.home.tools.modrange, label: "MOD の動作範囲" },
        },
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Steam Engine リファレンス",
        openEntry: "項目を開く",
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        introducedNoEarlier: (date) => `${date} 以降に導入`,
        evidenceNotes: "根拠に関する注記",
        confidence: "信頼度",
        loadingPowerCurve: "電力曲線を読み込み中",
        evidenceDate: "根拠資料の日付",
        recordStatus: "レコードの状態",
        catalogImplication: "カタログへの影響",
    },
};
