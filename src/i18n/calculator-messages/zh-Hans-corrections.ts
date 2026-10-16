import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/zh-Hans";
import { messages as juiceDraft } from "./juice/zh-Hans";
import { messages as tcrDraft } from "./tcr/zh-Hans";
import { messages as wireWizDraft } from "./wirewiz/zh-Hans";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    legLength: "引线长度",
    wireLengthInCoil: "线圈内导线长度",
    wireVolume: "导线体积",
};
export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    safetyText: "高浓度尼古丁可能伤害或致死儿童、宠物和成年人。自行调配电子烟油前，请先了解如何降低风险，"
        + "并使用其他工具复核计算结果。",
};
export const tcr: CalculatorRouteMessages = { ...tcrDraft, wireWizard: "Wire Wizard" };
export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft, title: "Wire Wizard", importDesign: "导入 Wire Wizard 设计", legLength: "引线长度",
};
