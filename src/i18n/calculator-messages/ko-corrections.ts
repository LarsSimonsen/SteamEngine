import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/ko";
import { messages as juiceDraft } from "./juice/ko";
import { messages as tcrDraft } from "./tcr/ko";
import { messages as wireWizDraft } from "./wirewiz/ko";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    imperial: "야드파운드법 단위",
    legLength: "리드선 길이",
    legPowerLoss: "리드선 전력 손실",
    wireLengthWarning: "리드선 길이를 제외하면 코일에 필요한 와이어가 부족합니다.",
    wireVolume: "와이어 부피",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    amount: "만들 양",
    nicStrengthIn: "니코틴 농도",
    volume: "부피",
    nicBase: "니코틴 베이스",
    baseLabel: "라벨에 표시된 값",
    nicStrength: "니코틴 농도",
    targetLabel: "목표값",
    grams: "g",
    safetyText:
        "고농도 니코틴은 어린이, 반려동물 및 성인에게 해를 입히거나 사망에 이르게 할 수 있습니다. 직접 액상을 "
        + "혼합하기 전에 위험을 줄이는 방법을 확인하고, 계산 결과를 다른 도구로도 검산하십시오.",
};

export const tcr: CalculatorRouteMessages = { ...tcrDraft, wireWizard: "Wire Wizard" };

export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    importDesign: "Wire Wizard 설계 가져오기",
    export: "내보내기",
    legLength: "리드선 길이",
    volume: "부피",
};
