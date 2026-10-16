import type { MaterialComparisonMessages } from "../../comparison-messages";

export const messages: MaterialComparisonMessages = {
    title: "Порівняти матеріали",
    description: "Порівняйте поруч два матеріали з каталогу Steam Engine.",
    chooseMaterial: "Виберіть матеріал",
    firstMaterial: "Перший матеріал",
    secondMaterial: "Другий матеріал",
    swap: "Поміняти матеріали місцями",
    identity: "Ідентифікація",
    name: "Назва",
    electricalProperties: "Електричні властивості",
    temperatureBehavior: "Температурна поведінка",
    physicalProperties: "Фізичні властивості",
    temperatureControlProfile: "Профіль контролю температури",
    profileAvailable: "Профіль каталогу доступний",
    profileUnavailable: "Профілю в каталозі немає",
    thermalConductivity: "Теплопровідність",
    invalidSelection: "Матеріал, на який посилається це спільне посилання, не знайдено в каталозі.",
    sameSelection: "З обох боків вибрано той самий матеріал.",
    capabilityDiffers:
        "Лише один із вибраних матеріалів має в каталозі профіль контролю температури. Перевірте підтримку " +
        "пристроєм і використовуйте профіль саме цього матеріалу.",
    noSafetyNote: "Для цього запису немає примітки з безпеки, специфічної для матеріалу.",
};
