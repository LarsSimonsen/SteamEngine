import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./ko";

export const messages: SharedMessages = {
    ...draftMessages,
    navigation: { ...draftMessages.navigation, home: "Steam Engine 홈" },
    home: {
        ...draftMessages.home,
        blogTitle: "Steam Engine 블로그",
        tools: {
            ...draftMessages.home.tools,
            coil: { ...draftMessages.home.tools.coil, label: "코일 감기" },
            wirewiz: { ...draftMessages.home.tools.wirewiz, label: "Wire Wizard" },
            juice: { ...draftMessages.home.tools.juice, label: "전자담배 액상" },
        },
    },
    encyclopedia: { ...draftMessages.encyclopedia, kicker: "Steam Engine 참고 자료" },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        evidenceNotes: "근거 참고 사항",
        property: "속성",
        value: "값",
        confidence: "신뢰도",
        loadingPowerCurve: "전력 곡선을 불러오는 중",
        evidenceDate: "근거 자료 날짜",
        recordStatus: "레코드 상태",
        lifecycleEvidence: "수명 주기 근거",
        catalogImplication: "카탈로그에 미치는 영향",
    },
};
