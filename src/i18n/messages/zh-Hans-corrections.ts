import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./zh-Hans";

export const messages: SharedMessages = {
    ...draftMessages,
    home: { ...draftMessages.home, tools: { ...draftMessages.home.tools,
        wirewiz: { ...draftMessages.home.tools.wirewiz, label: "Wire Wizard" } } },
    encyclopedia: { ...draftMessages.encyclopedia, kicker: "Steam Engine 参考资料", openEntry: "打开条目" },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        breadcrumb: "面包屑导航",
        availableBy: (date) => `最迟于 ${date} 上市`,
        loadingPowerCurve: "正在加载功率曲线",
        evidenceDate: "依据日期",
        catalogImplication: "对目录的影响",
    },
};
