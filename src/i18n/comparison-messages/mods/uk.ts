import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Платформа",
    powerLimits: "Межі потужності",
    atomizerRange: "Діапазон атомайзера",
    category: "Категорія",
    batteryConfiguration: "Конфігурація акумулятора",
    baseProfile: "Базовий профіль",
    invalidSelection: "Мод або плату з цього спільного посилання не знайдено в каталозі.",
    sameSelection: "З обох боків вибрано той самий мод або плату.",
    platformDiffers:
        "Ці записи відрізняються категорією або конфігурацією акумулятора. Переконайтеся, " +
        "що порівняння відповідає вашій меті.",
    platformUnknown:
        "Деякі дані платформи невідомі, тому сумісність категорії та конфігурації " +
        "акумулятора неможливо порівняти повністю.",
    noSafetyFindings: "Для цього запису не зафіксовано окремих висновків щодо безпеки.",
    chooseMod: "Виберіть мод або плату",
    firstMod: "Виберіть мод/плату A",
    secondMod: "Виберіть мод/плату B",
    swap: "Поміняти моди/плати місцями",
};
