import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./uk";

export const messages: SharedMessages = {
    ...draftMessages,
    home: {
        ...draftMessages.home,
        tools: {
            ...draftMessages.home.tools,
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Wire Wizard",
            },
            coil: {
                ...draftMessages.home.tools.coil,
                description: "Плануйте спіралі для обслуговуваних атомайзерів і досліджуйте їхні "
                    + "електричні характеристики.",
            },
            batt: {
                ...draftMessages.home.tools.batt,
                description: "Переглядайте споживання струму й потужності пристроєм, що живиться від "
                    + "акумулятора.",
            },
            modrange: {
                ...draftMessages.home.tools.modrange,
                label: "Діапазон мода",
            },
            juice: {
                ...draftMessages.home.tools.juice,
                label: "Рідина для вейпа",
            },
        },
        intro: "Steam Engine — це набір практичних калькуляторів для намотування спіралей, "
            + "перевірки розряду акумулятора, змішування рідини та розуміння числових "
            + "параметрів вашої конфігурації.",
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Довідник Steam Engine",
        openEntry: "Відкрити запис",
        lead: "Перегляньте поняття, матеріали, акумулятори, моди та плати керування, на яких "
            + "ґрунтуються калькулятори.",
        categoryDescriptions: {
            ...draftMessages.encyclopedia.categoryDescriptions,
            batteries: "Елементи, акумуляторні блоки та вбудовані джерела живлення.",
            mods: "Регульовані пристрої та профілі плат керування.",
        },
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        breadcrumb: "Навігаційний ланцюжок",
        availableBy: (date) => `Доступно не пізніше ${date}`,
        evidenceNotes: "Примітки щодо доказів",
        loadingPowerCurve: "Завантаження кривої потужності",
        evidenceDate: "Дата документування",
        catalogImplication: "Вплив на каталог",
        property: "Властивість",
        unknownPropertyValue: "У каталозі не встановлено значення цієї властивості.",
        temperatureResistanceCurve: "Залежність опору від температури",
        identityStability: "Стабільність ідентифікації",
        researchSources: "Джерела дослідження",
        rewrapExplanation: "Маркування розглядається як бренд перепакованих акумуляторів; виробника самого "
            + "елемента не визначають за оболонкою.",
        unknownBatteryIntroductionNotice:
            "Дата появи цього елемента на ринку невідома, тому неможливо визначити його вік "
            + "і те, чи його вже замінили новішою моделлю.",
        protectedCell: "Захищений акумуляторний елемент.",
        unprotectedCell: "Незахищений акумуляторний елемент.",
        modBoardCatalog: "Каталог плат керування та модів",
        materialCatalog: "Каталог матеріалів для спіралей",
        noUsableResistanceRange: "За обмеженнями, наведеними в каталозі, неможливо розрахувати придатний "
            + "діапазон опору.",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            ratedCapacity: "Номінальна ємність",
        },
    },
    navigation: {
        ...draftMessages.navigation,
        home: "Головна сторінка Steam Engine",
        calculators: "Навігація калькуляторами",
    },
    catalogManager: {
        ...draftMessages.catalogManager,
        filterBuiltIns: "Фільтрувати вбудовані записи",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        name: "Назва",
        removableCell: "Знімний акумуляторний елемент",
        terminalStyle: "Тип контакту",
        flatTop: "Плоский контакт",
        buttonTop: "Виступний контакт",
        protectedStatus: "Наявність захисту",
        continuousCurrent: "Струм безперервного розряду (A)",
        continuousC: "Рейтинг C безперервного розряду",
        batteryHelp: "Вкажіть принаймні одну межу безперервного розряду. Вбудовані акумулятори є "
            + "внутрішніми блоками мода, тому розміри окремого елемента не потрібні. Розміри "
            + "знімних елементів номінальні; фактичні розміри виробу зазначайте у примітках. "
            + "Якщо вказано обидві межі розряду й вони істотно відрізняються, калькулятор "
            + "використовує безпечнішу з отриманих меж.",
        removeTfrPoint: "Видалити точку TFR",
        addTfrPoint: "Додати точку TFR",
        weightGrams: "Вага (g)",
        nominalDiameter: "Номінальний діаметр (mm)",
        nominalLength: "Номінальна довжина (mm)",
        length: "Довжина (mm)",
        width: "Ширина (mm)",
        thickness: "Товщина (mm)",
        ratedCapacity: "Номінальна ємність (mAh)",
        nominalVoltage: "Номінальна напруга (V)",
        resistivity: "Питомий опір (Ω mm²/m)",
        heatCapacity: "Теплоємність (J/g·K)",
        density: "Щільність (g/cm³)",
        maxOutputVoltage: "Максимальна вихідна напруга (V)",
        maxOutputPower: "Максимальна вихідна потужність (W)",
    },
    ohm: {
        ...draftMessages.ohm,
        descriptionBeforeOhm: "Це простий калькулятор, що використовує",
        descriptionAfterLaws: "для розрахунків.",
        joulesLawLinkLabel: "закон Джоуля — Ленца",
        values: "Значення",
        lock: "Фіксувати",
        simpleLocks: "Проста фіксація",
        showDetailedLocks: "Показати докладні налаштування фіксації",
        hideDetailedLocks: "Приховати докладні налаштування фіксації",
        detailedLocks: "Докладні налаштування фіксації",
        fields: {
            ...draftMessages.ohm.fields,
            current: "Струм",
        },
    },
};
