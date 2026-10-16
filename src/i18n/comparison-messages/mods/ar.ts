import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "المنصة",
    powerLimits: "حدود القدرة",
    atomizerRange: "نطاق مقاومة المبخّر",
    category: "الفئة",
    batteryConfiguration: "تكوين البطارية",
    baseProfile: "ملف التعريف الأساسي",
    invalidSelection: "تعذر العثور على العنصر المشار إليه في هذا الرابط المشترك ضمن كتالوج المودات ولوحات التحكم.",
    sameSelection: "لقد اخترت العنصر نفسه في جانبي المقارنة، سواء كان مودًا أم لوحة تحكم.",
    platformDiffers:
        "تختلف هذه الإدخالات في الفئة أو تكوين البطارية. تأكد من أن المقارنة تناسب استخدامك " +
        "المقصود.",
    platformUnknown:
        "بعض تفاصيل المنصة غير معروفة، لذلك لا يمكن مقارنة توافق الفئة وتكوين البطارية " +
        "بالكامل.",
    noSafetyFindings: "لم تُسجّل نتائج سلامة خاصة بهذا الإدخال.",
};
