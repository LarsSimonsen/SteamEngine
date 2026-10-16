import { batteryPresets } from "../catalogs/batteries/defaults";
import { concepts } from "../catalogs/concepts/catalog";
import { builtInPresets } from "../catalogs/mods/presets";
import { materials } from "../catalogs/materials/catalog";
import { catalogPresentationFor } from "./catalog-presentations";
import { comparisonMessages } from "./comparison-messages";
import { modComparisonMetadata } from "./mod-comparison-metadata";
import { catalogCategoryForRouteSegment, type CatalogCategory } from "../pages/encyclopedia/routes";

export type Locale = "en" | "nb" | "nn" | "zh-Hans" | "ar" | "es" | "es-419" | "fr" | "pl" | "uk" | "it" | "vi" | "de"
    | "sv" | "da" | "is" | "hi" | "bn" | "pt" | "pt-BR" | "ja" | "ko" | "el" | "tr" | "id" | "fi";

export type LocaleCandidate = {
    readonly code: string;
    readonly htmlLang: string;
    readonly name: string;
    readonly englishAlias: string;
    readonly prefix: string;
};

export type LocalizedRoute = {
    readonly route: string;
    readonly title: string;
    readonly description?: string;
};

export type LocaleDefinition = {
    readonly code: Locale;
    readonly htmlLang: string;
    readonly name: string;
    readonly englishAlias: string;
    readonly prefix: string;
};

// A candidate is not routable until its complete translation and catalog parity checks pass.
export const localeCandidates: readonly LocaleCandidate[] = [
    { code: "nn", htmlLang: "nn", name: "Nynorsk", englishAlias: "Norwegian Nynorsk", prefix: "/nn" },
    { code: "sv", htmlLang: "sv", name: "Svenska", englishAlias: "Swedish", prefix: "/sv" },
    { code: "da", htmlLang: "da", name: "Dansk", englishAlias: "Danish", prefix: "/da" },
    { code: "is", htmlLang: "is", name: "Islenska", englishAlias: "Icelandic", prefix: "/is" },
    { code: "hi", htmlLang: "hi", name: "Hindi", englishAlias: "Hindi", prefix: "/hi" },
    { code: "fr", htmlLang: "fr", name: "Français", englishAlias: "French", prefix: "/fr" },
    { code: "pl", htmlLang: "pl", name: "Polski", englishAlias: "Polish", prefix: "/pl" },
    { code: "uk", htmlLang: "uk", name: "Українська", englishAlias: "Ukrainian", prefix: "/uk" },
    { code: "it", htmlLang: "it", name: "Italiano", englishAlias: "Italian", prefix: "/it" },
    { code: "vi", htmlLang: "vi", name: "Tiếng Việt", englishAlias: "Vietnamese", prefix: "/vi" },
    { code: "de", htmlLang: "de", name: "Deutsch", englishAlias: "German", prefix: "/de" },
    { code: "es", htmlLang: "es", name: "Espanol", englishAlias: "Spanish", prefix: "/es" },
    {
        code: "es-419",
        htmlLang: "es-419",
        name: "Español (Latinoamérica)",
        englishAlias: "Latin American Spanish",
        prefix: "/es-419",
    },
    { code: "de", htmlLang: "de", name: "Deutsch", englishAlias: "German", prefix: "/de" },
    { code: "ar", htmlLang: "ar", name: "Arabic", englishAlias: "Arabic", prefix: "/ar" },
    { code: "bn", htmlLang: "bn", name: "Bangla", englishAlias: "Bengali", prefix: "/bn" },
    { code: "uk", htmlLang: "uk", name: "Ukrainian", englishAlias: "Ukrainian", prefix: "/uk" },
    { code: "pt", htmlLang: "pt-PT", name: "Portugues", englishAlias: "European Portuguese", prefix: "/pt" },
    { code: "ur", htmlLang: "ur", name: "Urdu", englishAlias: "Urdu", prefix: "/ur" },
    { code: "id", htmlLang: "id", name: "Bahasa Indonesia", englishAlias: "Indonesian", prefix: "/id" },
    { code: "ja", htmlLang: "ja", name: "Japanese", englishAlias: "Japanese", prefix: "/ja" },
    { code: "ko", htmlLang: "ko", name: "Korean", englishAlias: "Korean", prefix: "/ko" },
    { code: "it", htmlLang: "it", name: "Italiano", englishAlias: "Italian", prefix: "/it" },
    { code: "nl", htmlLang: "nl", name: "Nederlands", englishAlias: "Dutch", prefix: "/nl" },
    { code: "tr", htmlLang: "tr", name: "Türkçe", englishAlias: "Turkish", prefix: "/tr" },
];

export const localeDefinitions: readonly LocaleDefinition[] = [
    { code: "en", htmlLang: "en", name: "English", englishAlias: "English", prefix: "" },
    { code: "fi", htmlLang: "fi", name: "Suomi", englishAlias: "Finnish", prefix: "/fi" },
    { code: "nb", htmlLang: "nb", name: "Bokm\u00e5l", englishAlias: "Norwegian Bokm\u00e5l", prefix: "/nb" },
    { code: "nn", htmlLang: "nn", name: "Nynorsk", englishAlias: "Norwegian Nynorsk", prefix: "/nn" },
    { code: "zh-Hans", htmlLang: "zh-Hans", name: "简体中文", englishAlias: "Simplified Chinese", prefix: "/zh-Hans" },
    { code: "ar", htmlLang: "ar", name: "العربية", englishAlias: "Arabic", prefix: "/ar" },
    { code: "es", htmlLang: "es", name: "Español", englishAlias: "Spanish", prefix: "/es" },
    {
        code: "es-419",
        htmlLang: "es-419",
        name: "Español (Latinoamérica)",
        englishAlias: "Latin American Spanish",
        prefix: "/es-419",
    },
    { code: "fr", htmlLang: "fr", name: "Français", englishAlias: "French", prefix: "/fr" },
    { code: "pl", htmlLang: "pl", name: "Polski", englishAlias: "Polish", prefix: "/pl" },
    { code: "uk", htmlLang: "uk", name: "Українська", englishAlias: "Ukrainian", prefix: "/uk" },
    { code: "it", htmlLang: "it", name: "Italiano", englishAlias: "Italian", prefix: "/it" },
    { code: "vi", htmlLang: "vi", name: "Tiếng Việt", englishAlias: "Vietnamese", prefix: "/vi" },
    { code: "de", htmlLang: "de", name: "Deutsch", englishAlias: "German", prefix: "/de" },
    { code: "sv", htmlLang: "sv", name: "Svenska", englishAlias: "Swedish", prefix: "/sv" },
    { code: "da", htmlLang: "da", name: "Dansk", englishAlias: "Danish", prefix: "/da" },
    { code: "is", htmlLang: "is", name: "Íslenska", englishAlias: "Icelandic", prefix: "/is" },
    { code: "hi", htmlLang: "hi", name: "हिन्दी", englishAlias: "Hindi", prefix: "/hi" },
    { code: "bn", htmlLang: "bn", name: "বাংলা", englishAlias: "Bengali", prefix: "/bn" },
    { code: "pt", htmlLang: "pt-PT", name: "Português", englishAlias: "European Portuguese", prefix: "/pt" },
    { code: "pt-BR", htmlLang: "pt-BR", name: "Português (Brasil)", englishAlias: "Brazilian Portuguese", prefix: "/pt-BR" },
    { code: "ja", htmlLang: "ja", name: "日本語", englishAlias: "Japanese", prefix: "/ja" },
    { code: "ko", htmlLang: "ko", name: "한국어", englishAlias: "Korean", prefix: "/ko" },
    { code: "el", htmlLang: "el", name: "Ελληνικά", englishAlias: "Greek", prefix: "/el" },
    { code: "tr", htmlLang: "tr", name: "Türkçe", englishAlias: "Turkish", prefix: "/tr" },
    { code: "id", htmlLang: "id", name: "Bahasa Indonesia", englishAlias: "Indonesian", prefix: "/id" },
];
export const supportedLocales = localeDefinitions.map(({ code }) => code) as readonly Locale[];

export const translatedCalculatorRoutes = [
    "batt", "coil", "converter", "juice", "modrange", "ohm", "tcr", "wirewiz",
] as const;

export const translatedPageRoutes = [
    ...translatedCalculatorRoutes, "compare/batteries", "compare/materials", "compare/mods",
] as const;

export type TranslatedCalculatorRoute = (typeof translatedCalculatorRoutes)[number];

const routeMetadata: Readonly<Record<Locale, Readonly<Record<string, LocalizedRoute>>>> = {
    fi: {
        "/": {
            "route": "/",
            "title": "Steam Engine"
        },
        "/catalog": {
            "route": "/catalog",
            "title": "Luettelo",
            "description": "Laskinten taustalla oleva tietoluettelo."
        },
        "/batt": {
            "route": "/batt",
            "title": "Akun kuormitus",
            "description": "Laske akkukäyttöisen laitteen virran- ja tehonkulutus."
        },
        "/coil": {
            "route": "/coil",
            "title": "Coilin käämintä",
            "description": "Suunnittele coilin mitat ja käämintäparametrit."
        },
        "/converter": {
            "route": "/converter",
            "title": "Yksikkömuunnin",
            "description": "Muunna yleisten pituusyksiköiden ja langan paksuusluokkien välillä."
        },
        "/juice": {
            "route": "/juice",
            "title": "Nesteen sekoitus",
            "description": "Suunnittele nesteen nikotiinipitoisuus ja ainesosien suhteet."
        },
        "/modrange": {
            "route": "/modrange",
            "title": "Modin toiminta-alueen laskin",
            "description": "Määritä käyttökelpoinen resistanssialue säädellyn modin lähtörajojen perusteella."
        },
        "/ohm": {
            "route": "/ohm",
            "title": "Ohmin laki",
            "description": "Laske jännite, virta, resistanssi ja teho."
        },
        "/tcr": {
            "route": "/tcr",
            "title": "TCR",
            "description": "Vertaa lankojen resistanssin lämpötilakertoimia ja lämpötilasta riippuvia resistanssisuhteita."
        },
        "/wirewiz": {
            "route": "/wirewiz",
            "title": "Wire Wizard",
            "description": "Suunnittele ja analysoi moniosaisia lankarakenteita omia coileja varten."
        },
        "/compare/batteries": {
            "route": "/compare/batteries",
            "title": "Akkujen vertailu",
            "description": "Vertaa kahta Steam Engine -luettelon akkua rinnakkain."
        },
        "/compare/materials": {
            "route": "/compare/materials",
            "title": "Materiaalien vertailu",
            "description": "Vertaa kahta Steam Engine -luettelon materiaalia rinnakkain."
        },
        "/compare/mods": {
            "route": "/compare/mods",
            "title": "Modien ja ohjauskorttien vertailu",
            "description": "Vertaa kahta Steam Engine -luettelon modia tai ohjauskorttia rinnakkain."
        }
    },
    en: {
        "/": { route: "/", title: "Steam Engine" },
        "/about": { route: "/about", title: "About", description: "About the Steam Engine calculators." },
        "/catalog": { route: "/catalog", title: "Catalog", description: "The reference catalog behind the calculators." },
        "/compare/batteries": { route: "/compare/batteries", title: "Compare batteries", description: "Compare two batteries from the Steam Engine catalog side by side." },
        "/batt": { route: "/batt", title: "Battery drain", description: "Calculate current and power drain for a battery-powered device." },
        "/coil": { route: "/coil", title: "Coil wrapping", description: "Plan coil dimensions and wrapping parameters." },
        "/converter": { route: "/converter", title: "Converter", description: "Convert between common length and wire-gauge units." },
        "/juice": { route: "/juice", title: "Liquid mixing", description: "Plan liquid strength and ingredient ratios." },
        "/modrange": { route: "/modrange", title: "Mod range calculator", description: "Find a useful resistance range from a regulated mod's output limits." },
        "/ohm": { route: "/ohm", title: "Ohm's law", description: "Calculate voltage, current, resistance, and power." },
        "/privacy": {
            route: "/privacy",
            title: "Privacy",
            description: "How Steam Engine uses local storage, analytics, advertising, and service data.",
        },
        "/tcr": { route: "/tcr", title: "TCR", description: "Compare temperature-coefficient and temperature-factor wire data." },
        "/wirewiz": { route: "/wirewiz", title: "Wire Wizard", description: "Build and analyze complex wires for custom coils." },
    },
    nb: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Katalog", description: "Referansekatalogen bak kalkulatorene." },
        "/compare/batteries": { route: "/compare/batteries", title: "Sammenlign batterier", description: "Sammenlign to batterier fra Steam Engine-katalogen side ved side." },
        "/batt": { route: "/batt", title: "Batteriforbruk", description: "Beregn str\u00f8m- og effektforbruk for en batteridrevet enhet." },
        "/coil": { route: "/coil", title: "Spolevikling", description: "Planlegg spolem\u00e5l og viklingsparametere." },
        "/converter": { route: "/converter", title: "Konvertering", description: "Konverter mellom vanlige lengde- og tr\u00e5ddiametere." },
        "/juice": { route: "/juice", title: "V\u00e6skeblanding", description: "Planlegg v\u00e6skestyrke og ingrediensforhold." },
        "/modrange": { route: "/modrange", title: "Mod-omr\u00e5de-kalkulator", description: "Finn et nyttig motstandsomr\u00e5de fra en regulert mods utgangsgrenser." },
        "/ohm": { route: "/ohm", title: "Ohms lov", description: "Beregn spenning, str\u00f8m, motstand og effekt." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Sammenlign temperaturkoeffisienter og temperaturfaktorer for tr\u00e5d." },
        "/wirewiz": { route: "/wirewiz", title: "Wire Wizard", description: "Bygg og analyser komplekse tr\u00e5der for egendefinerte spoler." },
    },
    nn: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Katalog", description: "Referansekatalogen bak kalkulatorane." },
        "/compare/batteries": { route: "/compare/batteries", title: "Samanlikn batteri", description: "Samanlikn to batteri frå Steam Engine-katalogen side om side." },
        "/batt": { route: "/batt", title: "Batteriforbruk", description: "Rekn ut straum- og effektforbruk for ei batteridriven eining." },
        "/coil": { route: "/coil", title: "Spolevikling", description: "Planlegg spolemål og viklingsparametrar." },
        "/converter": { route: "/converter", title: "Konvertering", description: "Konverter mellom vanlege lengde- og tråddiametrar." },
        "/juice": { route: "/juice", title: "Væskeblanding", description: "Planlegg væskestyrke og ingrediensforhold." },
        "/modrange": { route: "/modrange", title: "Mod-område-kalkulator", description: "Finn eit nyttig motstandsområde frå utgangsgrensene til ein regulert mod." },
        "/ohm": { route: "/ohm", title: "Ohms lov", description: "Rekn ut spenning, straum, motstand og effekt." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Samanlikn temperaturkoeffisientar og temperaturfaktorar for tråd." },
        "/wirewiz": { route: "/wirewiz", title: "Wire Wizard", description: "Bygg og analyser komplekse trådar for eigendefinerte spolar." },
    },
    "zh-Hans": {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "目录", description: "计算器背后的参考目录。" },
        "/compare/batteries": { route: "/compare/batteries", title: "比较电池", description: "并排比较 Steam Engine 目录中的两款电池。" },
        "/batt": { route: "/batt", title: "电池消耗", description: "计算电池供电设备的电流和功耗。" },
        "/coil": { route: "/coil", title: "线圈绕制", description: "规划线圈尺寸和绕制参数。" },
        "/converter": { route: "/converter", title: "转换器", description: "在常用长度和线规单位之间进行转换。" },
        "/juice": { route: "/juice", title: "液体混合", description: "规划液体浓度和成分比例。" },
        "/modrange": { route: "/modrange", title: "设备范围计算器", description: "根据调压设备的输出限制查找实用的电阻范围。" },
        "/ohm": { route: "/ohm", title: "欧姆定律", description: "计算电压、电流、电阻和功率。" },
        "/tcr": { route: "/tcr", title: "TCR", description: "比较线材的温度系数和温度因子数据。" },
        "/wirewiz": { route: "/wirewiz", title: "绕线助手", description: "构建和分析用于定制线圈的复杂线材。" },
    },
    ar: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "الفهرس", description: "الفهرس المرجعي الذي تستند إليه الحاسبات." },
        "/compare/batteries": { route: "/compare/batteries", title: "مقارنة البطاريات", description: "قارن بين بطاريتين من كتالوج Steam Engine جنبًا إلى جنب." },
        "/batt": { route: "/batt", title: "استهلاك البطارية", description: "احسب استهلاك التيار والقدرة لجهاز يعمل بالبطارية." },
        "/coil": { route: "/coil", title: "لفّ الكويل", description: "خطّط أبعاد الكويل ومعلمات لفّه." },
        "/converter": { route: "/converter", title: "المحوّل", description: "حوّل بين وحدات الطول ومقاييس الأسلاك الشائعة." },
        "/juice": { route: "/juice", title: "خلط السائل", description: "خطّط تركيز السائل ونسب مكوّناته." },
        "/modrange": { route: "/modrange", title: "حاسبة نطاق المود", description: "اعثر على نطاق مقاومة عملي انطلاقًا من حدود خرج المود المنظّم." },
        "/ohm": { route: "/ohm", title: "قانون أوم", description: "احسب الجهد والتيار والمقاومة والقدرة." },
        "/tcr": { route: "/tcr", title: "TCR", description: "قارن بيانات معامل درجة الحرارة وعامل درجة الحرارة للأسلاك." },
        "/wirewiz": { route: "/wirewiz", title: "مساعد لفّ الأسلاك", description: "أنشئ وحلّل أسلاكًا معقّدة للكويلات المخصّصة." },
    },
    es: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Catálogo", description: "El catálogo de referencia en el que se basan las calculadoras." },
        "/compare/batteries": { route: "/compare/batteries", title: "Comparar baterías", description: "Compara dos baterías del catálogo de Steam Engine lado a lado." },
        "/batt": { route: "/batt", title: "Consumo de batería", description: "Calcula el consumo de corriente y potencia de un dispositivo alimentado por batería." },
        "/coil": { route: "/coil", title: "Bobinado de resistencias", description: "Planifica las dimensiones y los parámetros de bobinado de una resistencia." },
        "/converter": { route: "/converter", title: "Conversor", description: "Convierte entre unidades comunes de longitud y calibres de hilo." },
        "/juice": { route: "/juice", title: "Mezcla de líquidos", description: "Planifica la concentración del líquido y las proporciones de sus ingredientes." },
        "/modrange": { route: "/modrange", title: "Calculadora de rango del mod", description: "Encuentra un rango de resistencias útil a partir de los límites de salida de un mod regulado." },
        "/ohm": { route: "/ohm", title: "Ley de Ohm", description: "Calcula voltaje, corriente, resistencia y potencia." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Compara los datos del coeficiente de temperatura y del factor de temperatura de los hilos." },
        "/wirewiz": { route: "/wirewiz", title: "Asistente de hilos", description: "Construye y analiza hilos complejos para resistencias personalizadas." },
    },
    "es-419": {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": {
            route: "/catalog",
            title: "Catálogo",
            description: "El catálogo de referencia en el que se basan las calculadoras.",
        },
        "/compare/batteries": {
            route: "/compare/batteries",
            title: "Comparar baterías",
            description: "Compara dos baterías del catálogo de Steam Engine lado a lado.",
        },
        "/batt": {
            route: "/batt",
            title: "Consumo de batería",
            description: "Calcula el consumo de corriente y potencia de un dispositivo alimentado por batería.",
        },
        "/coil": {
            route: "/coil",
            title: "Bobinado de resistencias",
            description: "Planifica las dimensiones y los parámetros de bobinado de una resistencia.",
        },
        "/converter": {
            route: "/converter",
            title: "Convertidor",
            description: "Convierte entre unidades comunes de longitud y calibres de alambre.",
        },
        "/juice": {
            route: "/juice",
            title: "Mezcla de líquidos",
            description: "Planifica la concentración del líquido y las proporciones de sus ingredientes.",
        },
        "/modrange": {
            route: "/modrange",
            title: "Calculadora de rango del mod",
            description: "Encuentra un rango útil de resistencias a partir de los límites de salida de un mod regulado.",
        },
        "/ohm": {
            route: "/ohm",
            title: "Ley de Ohm",
            description: "Calcula voltaje, corriente, resistencia y potencia.",
        },
        "/tcr": {
            route: "/tcr",
            title: "TCR",
            description: "Compara datos del coeficiente de temperatura de la resistencia y del factor de temperatura.",
        },
        "/wirewiz": {
            route: "/wirewiz",
            title: "Asistente de alambres",
            description: "Construye y analiza alambres complejos para resistencias personalizadas.",
        },
    },
    fr: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Catalogue", description: "Le catalogue de référence utilisé par les calculateurs." },
        "/compare/batteries": { route: "/compare/batteries", title: "Comparer des accus", description: "Comparez côte à côte deux accus du catalogue Steam Engine." },
        "/batt": { route: "/batt", title: "Consommation de la batterie", description: "Calculez le courant et la puissance consommés par un appareil alimenté par batterie." },
        "/coil": { route: "/coil", title: "Bobinage de résistance", description: "Planifiez les dimensions et les paramètres de bobinage d'une résistance." },
        "/converter": { route: "/converter", title: "Convertisseur", description: "Convertissez les unités courantes de longueur et de calibre de fil." },
        "/juice": { route: "/juice", title: "Mélange de liquide", description: "Planifiez le dosage du liquide et les proportions de ses ingrédients." },
        "/modrange": { route: "/modrange", title: "Calculateur de plage du mod", description: "Trouvez une plage de résistances utile à partir des limites de sortie d'un mod régulé." },
        "/ohm": { route: "/ohm", title: "Loi d'Ohm", description: "Calculez la tension, le courant, la résistance et la puissance." },
        "/tcr": {
            route: "/tcr", title: "TCR",
            description: "Comparez les coefficients de température de la résistance et les facteurs de résistance "
                + "en fonction de la température des fils.",
        },
        "/wirewiz": {
            route: "/wirewiz", title: "Wire Wizard",
            description: "Construisez et analysez des fils complexes pour des résistances personnalisées.",
        },
    },
    pl: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Katalog", description: "Katalog referencyjny używany przez kalkulatory." },
        "/compare/batteries": { route: "/compare/batteries", title: "Porównaj akumulatory", description: "Porównaj obok siebie dwa akumulatory z katalogu Steam Engine." },
        "/batt": {
            route: "/batt", title: "Zużycie baterii",
            description: "Oblicz pobór prądu i mocy przez urządzenie zasilane baterią.",
        },
        "/coil": { route: "/coil", title: "Nawijanie grzałki", description: "Zaplanuj wymiary i parametry nawijania grzałki." },
        "/converter": { route: "/converter", title: "Przelicznik", description: "Przeliczaj popularne jednostki długości i grubości drutu." },
        "/juice": { route: "/juice", title: "Mieszanie liquidu", description: "Zaplanuj stężenie liquidu i proporcje składników." },
        "/modrange": { route: "/modrange", title: "Kalkulator zakresu moda", description: "Znajdź użyteczny zakres oporu na podstawie limitów wyjściowych regulowanego moda." },
        "/ohm": { route: "/ohm", title: "Prawo Ohma", description: "Oblicz napięcie, prąd, opór i moc." },
        "/tcr": {
            route: "/tcr", title: "TCR",
            description: "Porównuj dane TCR i TFR drutów, opisujące zależność rezystancji od temperatury.",
        },
        "/wirewiz": {
            route: "/wirewiz", title: "Wire Wizard",
            description: "Buduj i analizuj złożone druty do własnych grzałek.",
        },
    },
    uk: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Каталог", description: "Довідковий каталог, на якому ґрунтуються калькулятори." },
        "/compare/batteries": { route: "/compare/batteries", title: "Порівняти акумулятори", description: "Порівняйте поруч два акумулятори з каталогу Steam Engine." },
        "/batt": { route: "/batt", title: "Споживання акумулятора", description: "Розрахуйте споживання струму й потужності пристроєм з живленням від акумулятора." },
        "/coil": { route: "/coil", title: "Намотування спіралі", description: "Сплануйте розміри спіралі та параметри намотування." },
        "/converter": { route: "/converter", title: "Конвертер", description: "Перетворюйте поширені одиниці довжини та калібри дроту." },
        "/juice": { route: "/juice", title: "Змішування рідини", description: "Сплануйте міцність рідини та співвідношення інгредієнтів." },
        "/modrange": {
            route: "/modrange",
            title: "Калькулятор діапазону мода",
            description: "Знайдіть придатний діапазон опору за обмеженнями вихідних параметрів регульованого мода.",
        },
        "/ohm": { route: "/ohm", title: "Закон Ома", description: "Розрахуйте напругу, струм, опір і потужність." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Порівнюйте дані температурного коефіцієнта та температурного фактора дроту." },
        "/wirewiz": { route: "/wirewiz", title: "Майстер дроту", description: "Створюйте й аналізуйте складні дроти для індивідуальних спіралей." },
    },
    it: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Catalogo", description: "Il catalogo di riferimento alla base dei calcolatori." },
        "/compare/batteries": { route: "/compare/batteries", title: "Confronta batterie", description: "Confronta affiancate due batterie del catalogo Steam Engine." },
        "/batt": { route: "/batt", title: "Consumo della batteria", description: "Calcola il consumo di corrente e potenza di un dispositivo alimentato a batteria." },
        "/coil": { route: "/coil", title: "Avvolgimento della resistenza", description: "Pianifica le dimensioni della resistenza e i parametri di avvolgimento." },
        "/converter": { route: "/converter", title: "Convertitore", description: "Converti tra comuni unità di lunghezza e calibri del filo." },
        "/juice": { route: "/juice", title: "Miscelazione del liquido", description: "Pianifica la concentrazione del liquido e le proporzioni degli ingredienti." },
        "/modrange": { route: "/modrange", title: "Calcolatore del range del mod", description: "Trova un intervallo di resistenza utile dai limiti di uscita di un mod regolato." },
        "/ohm": { route: "/ohm", title: "Legge di Ohm", description: "Calcola tensione, corrente, resistenza e potenza." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Confronta i dati del coefficiente di temperatura e del fattore di temperatura dei fili." },
        "/wirewiz": { route: "/wirewiz", title: "Assistente del filo", description: "Costruisci e analizza fili complessi per resistenze personalizzate." },
    },
    vi: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Danh mục", description: "Danh mục tham khảo làm nền tảng cho các máy tính." },
        "/compare/batteries": { route: "/compare/batteries", title: "So sánh pin", description: "So sánh song song hai pin trong danh mục Steam Engine." },
        "/batt": { route: "/batt", title: "Mức tiêu hao pin", description: "Tính dòng điện và công suất tiêu hao của thiết bị chạy bằng pin." },
        "/coil": { route: "/coil", title: "Quấn coil", description: "Lập kế hoạch kích thước và thông số quấn coil." },
        "/converter": { route: "/converter", title: "Bộ chuyển đổi", description: "Chuyển đổi giữa các đơn vị chiều dài và cỡ dây thông dụng." },
        "/juice": { route: "/juice", title: "Pha tinh dầu", description: "Lập kế hoạch nồng độ tinh dầu và tỷ lệ các thành phần." },
        "/modrange": { route: "/modrange", title: "Máy tính phạm vi mod", description: "Tìm phạm vi điện trở phù hợp từ các giới hạn đầu ra của mod có điều chỉnh." },
        "/ohm": { route: "/ohm", title: "Định luật Ohm", description: "Tính điện áp, dòng điện, điện trở và công suất." },
        "/tcr": { route: "/tcr", title: "TCR", description: "So sánh dữ liệu hệ số nhiệt độ và hệ số nhiệt của dây." },
        "/wirewiz": { route: "/wirewiz", title: "Trợ lý dây", description: "Xây dựng và phân tích dây phức tạp cho coil tùy chỉnh." },
    },
    de: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Katalog", description: "Der Referenzkatalog hinter den Rechnern." },
        "/compare/batteries": { route: "/compare/batteries", title: "Akkus vergleichen", description: "Vergleiche zwei Akkus aus dem Steam-Engine-Katalog nebeneinander." },
        "/batt": { route: "/batt", title: "Akkuverbrauch", description: "Berechne Strom- und Leistungsverbrauch eines akkubetriebenen Geräts." },
        "/coil": { route: "/coil", title: "Wicklung berechnen", description: "Plane die Abmessungen und Wickelparameter einer Wicklung." },
        "/converter": { route: "/converter", title: "Umrechner", description: "Wandle gängige Längen- und Drahtstärken-Einheiten um." },
        "/juice": { route: "/juice", title: "Liquid mischen", description: "Plane Liquidstärke und Zutatenverhältnisse." },
        "/modrange": { route: "/modrange", title: "Mod-Bereichsrechner", description: "Finde aus den Ausgangsgrenzen eines geregelten Akkuträgers einen passenden Widerstandsbereich." },
        "/ohm": { route: "/ohm", title: "Ohmsches Gesetz", description: "Berechne Spannung, Strom, Widerstand und Leistung." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Vergleiche Temperaturkoeffizient und Temperaturfaktor verschiedener Drähte." },
        "/wirewiz": { route: "/wirewiz", title: "Draht-Assistent", description: "Erstelle und analysiere komplexe Drähte für individuelle Wicklungen." },
    },
    sv: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Katalog", description: "Referenskatalogen bakom räknarna." },
        "/compare/batteries": { route: "/compare/batteries", title: "Jämför batterier", description: "Jämför två batterier från Steam Engine-katalogen sida vid sida." },
        "/batt": { route: "/batt", title: "Batteriförbrukning", description: "Beräkna ström- och effektförbrukningen för en batteridriven enhet." },
        "/coil": { route: "/coil", title: "Coil-lindning", description: "Planera coilens mått och lindningsparametrar." },
        "/converter": { route: "/converter", title: "Omvandlare", description: "Konvertera mellan vanliga längd- och trådtjockleksenheter." },
        "/juice": { route: "/juice", title: "Blanda e-vätska", description: "Planera vätskestyrka och ingrediensförhållanden." },
        "/modrange": { route: "/modrange", title: "Kalkylator för modens intervall", description: "Hitta ett användbart motståndsintervall utifrån en reglerad mods utgångsgränser." },
        "/ohm": { route: "/ohm", title: "Ohms lag", description: "Beräkna spänning, ström, motstånd och effekt." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Jämför temperaturkoefficienter och temperaturfaktorer för tråddata." },
        "/wirewiz": { route: "/wirewiz", title: "Trådassistent", description: "Bygg och analysera komplexa trådar för anpassade coils." },
    },
    da: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Katalog", description: "Referencekataloget bag beregnerne." },
        "/compare/batteries": { route: "/compare/batteries", title: "Sammenlign batterier", description: "Sammenlign to batterier fra Steam Engine-kataloget side om side." },
        "/batt": { route: "/batt", title: "Batteriforbrug", description: "Beregn strøm- og effektforbruget for en batteridrevet enhed." },
        "/coil": { route: "/coil", title: "Coil-vikling", description: "Planlæg coilens mål og viklingsparametre." },
        "/converter": { route: "/converter", title: "Konverter", description: "Konverter mellem almindelige længde- og tråddiameterenheder." },
        "/juice": { route: "/juice", title: "Bland e-væske", description: "Planlæg væskestyrke og ingrediensforhold." },
        "/modrange": { route: "/modrange", title: "Beregner til mod-område", description: "Find et nyttigt modstandsområde ud fra en reguleret mods udgangsgrænser." },
        "/ohm": { route: "/ohm", title: "Ohms lov", description: "Beregn spænding, strøm, modstand og effekt." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Sammenlign temperaturkoefficienter og temperaturfaktorer for tråddata." },
        "/wirewiz": { route: "/wirewiz", title: "Trådassistent", description: "Byg og analysér komplekse tråde til brugerdefinerede coils." },
    },
    is: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Vörulisti", description: "Skoðaðu vörulistann sem reiknivélarnar nota." },
        "/compare/batteries": { route: "/compare/batteries", title: "Berðu saman rafhlöður", description: "Berðu saman tvær rafhlöður úr Steam Engine-skránni hlið við hlið." },
        "/batt": { route: "/batt", title: "Rafhlöðunotkun", description: "Reiknaðu straum- og aflnotkun rafhlöðuknúins tækis." },
        "/coil": { route: "/coil", title: "Spóluvinding", description: "Áætlaðu stærð spólunnar og hvernig hún er vafin." },
        "/converter": { route: "/converter", title: "Einingabreyting", description: "Breyttu á milli algengra lengdar- og vírþykktareininga." },
        "/juice": { route: "/juice", title: "Blöndun rafvökva", description: "Blandaðu rafvökva með réttum styrk og innihaldshlutföllum." },
        "/modrange": { route: "/modrange", title: "Svið rafrettutækis", description: "Finndu nothæft viðnámssvið út frá úttaksmörkum stýrðs rafrettutækis." },
        "/ohm": { route: "/ohm", title: "Lögmál Ohms", description: "Reiknaðu spennu, straum, viðnám og afl." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Berðu saman hitastuðla og hitastuðulsupplýsingar fyrir vír." },
        "/wirewiz": { route: "/wirewiz", title: "Vírhjálparinn", description: "Hannaðu og greindu flókna víra fyrir sérsniðnar spólur." },
    },
    hi: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "कैटलॉग", description: "कैलकुलेटरों के पीछे का संदर्भ कैटलॉग।" },
        "/compare/batteries": { route: "/compare/batteries", title: "बैटरियों की तुलना करें", description: "Steam Engine कैटलॉग की दो बैटरियों की साथ-साथ तुलना करें।" },
        "/batt": { route: "/batt", title: "बैटरी उपयोग", description: "बैटरी से चलने वाले उपकरण के करंट और पावर उपयोग की गणना करें।" },
        "/coil": { route: "/coil", title: "कॉइल वाइंडिंग", description: "कॉइल के आयाम और वाइंडिंग पैरामीटर की योजना बनाएँ।" },
        "/converter": { route: "/converter", title: "कन्वर्टर", description: "सामान्य लंबाई और वायर-गेज इकाइयों के बीच बदलें।" },
        "/juice": { route: "/juice", title: "ई-लिक्विड मिलाना", description: "लिक्विड की ताकत और सामग्री के अनुपात की योजना बनाएँ।" },
        "/modrange": { route: "/modrange", title: "मॉड रेंज कैलकुलेटर", description: "रेगुलेटेड मॉड की आउटपुट सीमाओं से उपयोगी प्रतिरोध रेंज खोजें।" },
        "/ohm": { route: "/ohm", title: "ओम का नियम", description: "वोल्टेज, करंट, प्रतिरोध और पावर की गणना करें।" },
        "/tcr": { route: "/tcr", title: "TCR", description: "वायर के तापमान गुणांक और तापमान फैक्टर डेटा की तुलना करें।" },
        "/wirewiz": { route: "/wirewiz", title: "वायर विज़ार्ड", description: "कस्टम कॉइल के लिए जटिल वायर बनाएँ और उनका विश्लेषण करें।" },
    },
    bn: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "ক্যাটালগ", description: "ক্যালকুলেটরগুলোর পেছনের রেফারেন্স ক্যাটালগ।" },
        "/compare/batteries": { route: "/compare/batteries", title: "ব্যাটারি তুলনা করুন", description: "Steam Engine ক্যাটালগের দুটি ব্যাটারি পাশাপাশি তুলনা করুন।" },
        "/batt": { route: "/batt", title: "ব্যাটারি ব্যবহার", description: "ব্যাটারিচালিত ডিভাইসের কারেন্ট ও পাওয়ার ব্যবহার হিসাব করুন।" },
        "/coil": { route: "/coil", title: "কয়েল উইন্ডিং", description: "কয়েলের মাপ ও উইন্ডিং প্যারামিটার পরিকল্পনা করুন।" },
        "/converter": { route: "/converter", title: "কনভার্টার", description: "সাধারণ দৈর্ঘ্য ও তারের গেজের এককের মধ্যে রূপান্তর করুন।" },
        "/juice": { route: "/juice", title: "ই-লিকুইড মেশানো", description: "লিকুইডের শক্তি ও উপাদানের অনুপাত পরিকল্পনা করুন।" },
        "/modrange": { route: "/modrange", title: "মড রেঞ্জ ক্যালকুলেটর", description: "রেগুলেটেড মডের আউটপুট সীমা থেকে কার্যকর রেজিস্ট্যান্স রেঞ্জ খুঁজুন।" },
        "/ohm": { route: "/ohm", title: "ওহমের সূত্র", description: "ভোল্টেজ, কারেন্ট, রেজিস্ট্যান্স ও পাওয়ার হিসাব করুন।" },
        "/tcr": { route: "/tcr", title: "TCR", description: "তারের তাপমাত্রা সহগ ও তাপমাত্রা ফ্যাক্টরের ডেটা তুলনা করুন।" },
        "/wirewiz": { route: "/wirewiz", title: "ওয়্যার উইজার্ড", description: "কাস্টম কয়েলের জন্য জটিল তার তৈরি ও বিশ্লেষণ করুন।" },
    },
    pt: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Catálogo", description: "O catálogo de referência por trás das calculadoras." },
        "/compare/batteries": { route: "/compare/batteries", title: "Comparar baterias", description: "Compare lado a lado duas baterias do catálogo Steam Engine." },
        "/batt": { route: "/batt", title: "Consumo da bateria", description: "Calcule o consumo de corrente e potência de um dispositivo alimentado por bateria." },
        "/coil": { route: "/coil", title: "Enrolamento de resistências", description: "Planeie as dimensões e os parâmetros de enrolamento de uma resistência." },
        "/converter": { route: "/converter", title: "Conversor", description: "Converta entre unidades comuns de comprimento e de bitola de fio." },
        "/juice": { route: "/juice", title: "Mistura de líquidos", description: "Planeie a concentração do líquido e as proporções dos ingredientes." },
        "/modrange": { route: "/modrange", title: "Calculadora de gama do mod", description: "Encontre a gama de resistências útil a partir dos limites de saída de um mod regulado." },
        "/ohm": { route: "/ohm", title: "Lei de Ohm", description: "Calcule tensão, corrente, resistência e potência." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Compare dados de coeficientes de temperatura e fatores de temperatura dos fios." },
        "/wirewiz": { route: "/wirewiz", title: "Assistente de fios", description: "Construa e analise fios complexos para resistências personalizadas." },
    },
    "pt-BR": {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Catálogo", description: "O catálogo de referência por trás das calculadoras." },
        "/compare/batteries": { route: "/compare/batteries", title: "Comparar baterias", description: "Compare lado a lado duas baterias do catálogo Steam Engine." },
        "/batt": { route: "/batt", title: "Consumo da bateria", description: "Calcule o consumo de corrente e potência de um dispositivo alimentado por bateria." },
        "/coil": { route: "/coil", title: "Enrolamento de bobinas", description: "Planeje as dimensões e os parâmetros de enrolamento de uma bobina." },
        "/converter": { route: "/converter", title: "Conversor", description: "Converta entre unidades comuns de comprimento e de bitola de fio." },
        "/juice": { route: "/juice", title: "Mistura de líquidos", description: "Planeje a concentração do líquido e as proporções dos ingredientes." },
        "/modrange": { route: "/modrange", title: "Calculadora de faixa do mod", description: "Encontre a faixa de resistências útil a partir dos limites de saída de um mod regulado." },
        "/ohm": { route: "/ohm", title: "Lei de Ohm", description: "Calcule tensão, corrente, resistência e potência." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Compare dados de coeficientes de temperatura e fatores de temperatura dos fios." },
        "/wirewiz": { route: "/wirewiz", title: "Assistente de fios", description: "Construa e analise fios complexos para bobinas personalizadas." },
    },
    ja: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "カタログ", description: "各種計算ツールの基礎となるリファレンスカタログです。" },
        "/compare/batteries": { route: "/compare/batteries", title: "バッテリーを比較", description: "Steam Engineカタログの2つのバッテリーを並べて比較します。" },
        "/batt": { route: "/batt", title: "バッテリー消費", description: "バッテリー駆動機器の電流と電力の消費を計算します。" },
        "/coil": { route: "/coil", title: "コイル巻き", description: "コイルの寸法と巻き方のパラメーターを計画します。" },
        "/converter": { route: "/converter", title: "コンバーター", description: "一般的な長さとワイヤーゲージの単位を変換します。" },
        "/juice": { route: "/juice", title: "リキッドの調合", description: "リキッドの濃度と成分比率を計画します。" },
        "/modrange": { route: "/modrange", title: "MOD範囲計算機", description: "制御機能付きMODの出力制限から、実用的な抵抗値の範囲を求めます。" },
        "/ohm": { route: "/ohm", title: "オームの法則", description: "電圧、電流、抵抗、電力を計算します。" },
        "/tcr": { route: "/tcr", title: "TCR", description: "ワイヤーの温度係数と温度ファクターのデータを比較します。" },
        "/wirewiz": { route: "/wirewiz", title: "ワイヤーウィザード", description: "カスタムコイル用の複雑なワイヤーを設計・分析します。" },
    },
    ko: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "카탈로그", description: "계산기에서 사용하는 참고 카탈로그입니다." },
        "/compare/batteries": { route: "/compare/batteries", title: "배터리 비교", description: "Steam Engine 카탈로그의 배터리 두 개를 나란히 비교합니다." },
        "/batt": { route: "/batt", title: "배터리 소모", description: "배터리로 작동하는 기기의 전류와 전력 소모를 계산합니다." },
        "/coil": { route: "/coil", title: "코일 권선", description: "코일 치수와 권선 매개변수를 계획합니다." },
        "/converter": { route: "/converter", title: "변환기", description: "일반적인 길이 및 와이어 게이지 단위를 변환합니다." },
        "/juice": { route: "/juice", title: "액상 혼합", description: "액상 농도와 성분 비율을 계획합니다." },
        "/modrange": { route: "/modrange", title: "모드 범위 계산기", description: "가변 모드의 출력 한도에서 유용한 저항 범위를 찾습니다." },
        "/ohm": { route: "/ohm", title: "옴의 법칙", description: "전압, 전류, 저항, 전력을 계산합니다." },
        "/tcr": { route: "/tcr", title: "TCR", description: "와이어의 온도 계수와 온도 계수 데이터 포인트를 비교합니다." },
        "/wirewiz": { route: "/wirewiz", title: "와이어 마법사", description: "맞춤형 코일용 복잡한 와이어를 구성하고 분석합니다." },
    },
    el: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": {
            route: "/catalog",
            title: "Κατάλογος",
            description: "Ο κατάλογος αναφοράς στον οποίο βασίζονται οι υπολογιστές.",
        },
        "/compare/batteries": {
            route: "/compare/batteries",
            title: "Σύγκριση μπαταριών",
            description: "Συγκρίνετε δίπλα-δίπλα δύο μπαταρίες από τον κατάλογο Steam Engine.",
        },
        "/batt": {
            route: "/batt",
            title: "Αποφόρτιση μπαταρίας",
            description: "Υπολογίστε την κατανάλωση ρεύματος και ισχύος μιας συσκευής με μπαταρία.",
        },
        "/coil": {
            route: "/coil",
            title: "Τύλιγμα αντίστασης",
            description: "Σχεδιάστε τις διαστάσεις και τις παραμέτρους τυλίγματος μιας αντίστασης.",
        },
        "/converter": {
            route: "/converter",
            title: "Μετατροπέας",
            description: "Μετατρέψτε κοινές μονάδες μήκους και διαμέτρου σύρματος.",
        },
        "/juice": {
            route: "/juice",
            title: "Ανάμειξη υγρού αναπλήρωσης",
            description: "Σχεδιάστε την περιεκτικότητα του υγρού και τις αναλογίες των συστατικών.",
        },
        "/modrange": {
            route: "/modrange",
            title: "Υπολογιστής εύρους mod",
            description: "Βρείτε ένα χρήσιμο εύρος αντίστασης από τα όρια εξόδου ενός ρυθμιζόμενου mod.",
        },
        "/ohm": {
            route: "/ohm",
            title: "Νόμος του Ωμ",
            description: "Υπολογίστε τάση, ρεύμα, αντίσταση και ισχύ.",
        },
        "/tcr": {
            route: "/tcr",
            title: "TCR",
            description: "Συγκρίνετε δεδομένα συντελεστή θερμοκρασίας και παράγοντα θερμοκρασίας για σύρματα.",
        },
        "/wirewiz": {
            route: "/wirewiz",
            title: "Οδηγός σύρματος",
            description: "Κατασκευάστε και αναλύστε σύνθετα σύρματα για προσαρμοσμένες αντιστάσεις.",
        },
    },
    id: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Katalog", description: "Katalog referensi yang mendasari kalkulator." },
        "/compare/batteries": { route: "/compare/batteries", title: "Bandingkan baterai", description: "Bandingkan dua baterai dari katalog Steam Engine secara berdampingan." },
        "/batt": { route: "/batt", title: "Konsumsi baterai", description: "Hitung konsumsi arus dan daya perangkat bertenaga baterai." },
        "/coil": { route: "/coil", title: "Penggulungan coil", description: "Rencanakan dimensi dan parameter penggulungan coil." },
        "/converter": { route: "/converter", title: "Konverter", description: "Konversikan satuan panjang dan ukuran kawat yang umum." },
        "/juice": {
            route: "/juice", title: "Pencampuran liquid",
            description: "Rencanakan kadar nikotin dan perbandingan bahan liquid.",
        },
        "/modrange": {
            route: "/modrange", title: "Kalkulator rentang mod",
            description: "Temukan rentang resistansi yang berguna dari batas keluaran mod teregulasi.",
        },
        "/ohm": { route: "/ohm", title: "Hukum Ohm", description: "Hitung tegangan, arus, resistansi, dan daya." },
        "/tcr": { route: "/tcr", title: "TCR", description: "Bandingkan data koefisien suhu dan faktor suhu kawat." },
        "/wirewiz": { route: "/wirewiz", title: "Asisten kawat", description: "Buat dan analisis kawat kompleks untuk coil khusus." },
    },
    tr: {
        "/": { route: "/", title: "Steam Engine" },
        "/catalog": { route: "/catalog", title: "Katalog", description: "Hesap makinelerinin temelindeki referans katalog." },
        "/compare/batteries": {
            route: "/compare/batteries",
            title: "Pilleri karşılaştır",
            description: "Steam Engine kataloğundaki iki pili yan yana karşılaştırın.",
        },
        "/batt": {
            route: "/batt",
            title: "Pil tüketimi",
            description: "Pille çalışan bir cihaz için akım ve güç tüketimini hesaplayın.",
        },
        "/coil": { route: "/coil", title: "Coil sarımı", description: "Coil boyutlarını ve sarım parametrelerini planlayın." },
        "/converter": {
            route: "/converter",
            title: "Dönüştürücü",
            description: "Yaygın uzunluk ve tel ölçüsü birimleri arasında dönüşüm yapın.",
        },
        "/juice": {
            route: "/juice",
            title: "Likit karışımı",
            description: "Likitin nikotin derişimini ve bileşen oranlarını planlayın.",
        },
        "/modrange": {
            route: "/modrange",
            title: "Mod aralığı hesaplayıcısı",
            description: "Regüleli bir modun çıkış sınırlarından kullanışlı direnç aralığını bulun.",
        },
        "/ohm": { route: "/ohm", title: "Ohm yasası", description: "Gerilim, akım, direnç ve gücü hesaplayın." },
        "/tcr": {
            route: "/tcr",
            title: "TCR",
            description: "Teller için sıcaklık katsayısı ve sıcaklık faktörü verilerini karşılaştırın.",
        },
        "/wirewiz": {
            route: "/wirewiz",
            title: "Wire Wizard",
            description: "Özel coil'ler için karmaşık teller oluşturun ve analiz edin.",
        },
    },
};

export const localeForCode = (code: string): Locale | undefined =>
    supportedLocales.includes(code as Locale) ? code as Locale : undefined;

export const localeDefinition = (locale: Locale): LocaleDefinition =>
    localeDefinitions.find((definition) => definition.code === locale)!;

export const localizedRoute = (locale: Locale, route: string): string => {
    const prefix = localeDefinition(locale).prefix;
    return `${prefix}${route === "/" ? "" : route}` || "/";
};

const catalogIdForSlug = (category: CatalogCategory, slug: string): string | undefined => {
    const items = category === "concepts"
        ? concepts
        : category === "materials"
            ? materials
            : category === "batteries" ? batteryPresets : builtInPresets;
    return items.find((item) => item.slug === slug)?.id;
};

export const encyclopediaDetailMetadataFor = (locale: Locale, route: string): LocalizedRoute | undefined => {
    const segments = route.split("/").filter(Boolean);
    if (segments.length !== 3 || segments[0] !== "catalog") return undefined;
    const category = catalogCategoryForRouteSegment(segments[1]);
    const slug = segments[2];
    if (!category || !slug) return undefined;
    const id = catalogIdForSlug(category, slug);
    if (!id) return undefined;
    const presentation = catalogPresentationFor(locale, category, id);
    return { route, title: presentation.displayName, description: presentation.description ?? presentation.summary };
};

export const routeMetadataFor = (locale: Locale, route: string): LocalizedRoute | undefined => {
    if (route === "/compare/materials") return { route, ...comparisonMessages[locale].materials };
    if (route === "/compare/mods") return { route, ...modComparisonMetadata[locale] };
    return routeMetadata[locale][route] ?? encyclopediaDetailMetadataFor(locale, route);
};

export const translatedRoutes = (locale: Locale): readonly string[] => [
    "/", "/catalog", ...translatedPageRoutes.map((route) => `/${route}`),
].map((route) => localizedRoute(locale, route));
