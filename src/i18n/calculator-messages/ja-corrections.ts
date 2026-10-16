import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/ja";
import { messages as juiceDraft } from "./juice/ja";
import { messages as tcrDraft } from "./tcr/ja";
import { messages as wireWizDraft } from "./wirewiz/ja";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    legLength: "リード線の長さ",
    legPowerLoss: "リード線での電力損失",
    wireLengthWarning: "リード線分を除くと、コイルに必要なワイヤーが足りません。",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    nicStrengthIn: "ニコチン濃度",
    vg: "VG",
    nicBase: "ニコチンベース",
    baseLabel: "ラベルに記載された値",
    nicStrength: "ニコチン濃度",
    targetLabel: "目標とする値",
    safetyText:
        "高濃度のニコチンは、子供、ペット、大人を傷つけ、死に至らせるおそれがあります。自分でリキッドを調合する前に、"
        + "危険を減らす方法を確認し、計算結果を別のツールでも検算してください。",
};

export const tcr: CalculatorRouteMessages = { ...tcrDraft, wireWizard: "Wire Wizard" };

export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    importDesign: "Wire Wizard 設計をインポート",
    legLength: "リード線の長さ",
    volume: "体積",
    mass: "質量",
};
