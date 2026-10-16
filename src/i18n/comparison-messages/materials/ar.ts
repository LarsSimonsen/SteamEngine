import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "قارن بين المواد",
    description: "قارن مادتين من كتالوج Steam Engine جنبًا إلى جنب.",
    chooseMaterial: "اختر مادة",
    firstMaterial: "اختر المادة A",
    secondMaterial: "اختر المادة B",
    swap: "تبديل المادتين",
    identity: "الهوية",
    name: "الاسم",
    electricalProperties: "الخصائص الكهربائية",
    temperatureBehavior: "السلوك مع تغير درجة الحرارة",
    physicalProperties: "الخصائص الفيزيائية",
    temperatureControlProfile: "ملف التحكم في درجة الحرارة",
    profileAvailable: "يتوفر ملف في الكتالوج",
    profileUnavailable: "لا يتوفر ملف في الكتالوج",
    thermalConductivity: "الموصلية الحرارية",
    invalidSelection: "تعذر العثور في الكتالوج على مادة يشير إليها هذا الرابط المشترك.",
    sameSelection: "لقد اخترت المادة نفسها على الجانبين.",
    capabilityDiffers:
        "يتوفر لمادة واحدة فقط من المادتين المحددتين ملف للتحكم في درجة الحرارة في الكتالوج. تحقق من دعم الجهاز " +
        "واستخدم الملف الخاص بالمادة نفسها تحديدًا.",
    noSafetyNote: "لم تُسجّل ملاحظة سلامة خاصة بالمادة لهذا الإدخال.",
};
