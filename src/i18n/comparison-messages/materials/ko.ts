import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "재료 비교",
    description: "Steam Engine 카탈로그의 두 재료를 나란히 비교합니다.",
    chooseMaterial: "재료 선택",
    firstMaterial: "첫 번째 재료",
    secondMaterial: "두 번째 재료",
    swap: "재료 바꾸기",
    identity: "식별 정보",
    name: "이름",
    electricalProperties: "전기적 특성",
    temperatureBehavior: "온도 특성",
    physicalProperties: "물리적 특성",
    temperatureControlProfile: "온도 제어 프로필",
    profileAvailable: "카탈로그 프로필 있음",
    profileUnavailable: "카탈로그 프로필 없음",
    thermalConductivity: "열전도율",
    invalidSelection: "이 공유 링크에서 참조한 재료를 카탈로그에서 찾을 수 없습니다.",
    sameSelection: "양쪽에 같은 재료를 선택했습니다.",
    capabilityDiffers:
        "선택한 재료 중 하나에만 카탈로그 온도 제어 프로필이 있습니다. 기기 지원 여부를 확인하고 정확한 " +
        "재료의 프로필을 사용하세요.",
    noSafetyNote: "이 항목에는 재료별 안전 참고 사항이 기록되어 있지 않습니다.",
};
