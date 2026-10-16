import { messages as converterDraft } from "./converter/uk";
import { messages as battDraft } from "./batt/uk";
import { messages as modrangeDraft } from "./modrange/uk";
import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/uk";
import { messages as juiceDraft } from "./juice/uk";
import { messages as tcrDraft } from "./tcr/uk";
import { messages as wireWizDraft } from "./wirewiz/uk";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    legLength: "Довжина виводів",
    legPowerLoss: "Втрати потужності у виводах",
    wireLengthWarning: "Після виводів не залишається достатньо дроту для спіралі.",
    wireVolume: "Об’єм дроту",
    description: "Виберіть дріт і параметри спіралі, щоб оцінити кількість витків, опір і теплові "
        + "характеристики.",
    twistPitch: "Крок скручування",
    strands: "Кількість жил",
    wrapSpacing: "Відстань між витками",
    wraps: "Кількість витків",
    wireMass: "Маса дроту",
    customMaterials: "Користувацькі матеріали",
    heatFlux: "Густина теплового потоку",
    targetHeatFlux: "Цільова густина теплового потоку",
};
export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    volume: "Об’єм",
    safetyText: "Концентрований нікотин може зашкодити або вбити дітей, тварин і дорослих. Перш ніж самостійно "
        + "змішувати рідину, дізнайтеся, як зменшити ризики, і перевірте розрахунки іншим інструментом.",
    load: "Завантажити",
    amount: "Об’єм, який ви хочете приготувати",
    nicStrengthIn: "Концентрація нікотину в",
    nicBase: "Нікотинова основа",
    nicStrength: "Концентрація нікотину",
    targetLabel: "бажаний результат",
    adjustMix: "Можливо, потрібно зменшити цільову концентрацію нікотину, вміст VG чи PG або "
        + "частку ароматизатора. Або використайте нікотинову основу з вищою концентрацією чи "
        + "іншим співвідношенням VG/PG. Змініть налаштування так, щоб усі числа були більшими "
        + "за нуль.",
    targetNicWarning: "Цільова концентрація нікотину вища за концентрацію нікотинової основи. "
        + "Використайте основу з вищою концентрацією або зменште цільову концентрацію нікотину.",
    flavorPercentage: "Частка ароматизатора",
    flavorVg: "Ароматизатор на основі VG",
    ml: "ml",
};
export const tcr: CalculatorRouteMessages = {
    ...tcrDraft,
    wireWizard: "Wire Wizard",
    needModel: "Потрібна повна модель спіралі?",
    needModelText: "для геометрії дроту, складних конструкцій і розрахунків спіралей. Цей "
        + "спеціалізований інструмент залишається корисним для порівняння та поєднання кривих "
        + "опору.",
    help: "Редагування цих значень скидає вибір матеріалів. Формат для DNA 200 приймає 2–8 "
        + "точок і потребує однієї точки поблизу 70 °F (приблизно 21 °C).",
    customMaterials: "Користувацькі матеріали",
    export: "Дані для DNA 200",
    csvOutput: "Дані CSV для DNA 200",
};
export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    importDesign: "Імпортувати проєкт Wire Wizard",
    strandWire: "Жила дроту",
    legLength: "Довжина виводів",
    volume: "Об’єм",
    description: "Створюйте та аналізуйте складні дроти для власних спіралей. Перша сучасна версія "
        + "зберігає попередню модель і формати результатів.",
    coilParameters: "Параметри спіралі",
    tfrEditor: "Редактор TFR",
    current: "Струм",
    coilParametersTitle: "Параметри спіралі",
    graphFinal: "Кінцевий результат для дроту",
    wraps: "Витки",
    wrapSpacing: "Відстань між витками",
    dna200: "DNA200",
    strands: "Жили",
    twistPitch: "Крок скручування",
    customMaterials: "Користувацькі матеріали",
    temperatureUnavailable: "Температурні результати недоступні:",
    referenceMaterial: "Еталонний матеріал",
    matchTemperature: "Щоб отримати такий самий результат на моді з профілем",
    adjustTemperature: "встановіть температуру приблизно",
    single: "Одинарний",
    staggeredClapton: "Клептон зі зміщеними витками",
    heatFlux: "Густина теплового потоку",
};

export const modrange: CalculatorRouteMessages = {
    ...modrangeDraft,
    title: "Діапазон мода",
    currentReachedFirst: "Спочатку досягається межа струму.",
    eyebrow: "Калькулятор регульованого мода",
    description: "Знайдіть придатний діапазон опору за обмеженнями вихідних параметрів регульованого "
        + "мода.",
    presets: "Попередні налаштування",
    optimalResistance: "Орієнтири для вибору опору",
    medianResistance: "Точка перетину обмежень струму й напруги",
    sweetSpot: "Середина верхньої частини діапазону",
    watt: "W",
    median: "Точка перетину обмежень струму й напруги",
    ampere: "A",
};

export const batt: CalculatorRouteMessages = {
    ...battDraft,
    powerRegulated: "Мод із регулюванням потужності",
    voltageRegulated: "Мод із регулюванням напруги",
    batteryPresets: "Профіль елемента",
    cellSelection: "Вибір елемента",
    batteryIntro: "Виберіть тип елемента для всього акумуляторного блока або введіть нижче значення "
        + "для одного елемента.",
    batteryPreset: "Профіль елемента",
    batteryValues: "Елемент і акумуляторний блок",
    batteryConfiguration: "Конфігурація акумуляторного блока",
    singleCell: "1S — один елемент",
    customConfiguration: "Власна конфігурація",
    cellsInSeries: "Послідовно з’єднані елементи",
    parallelStrings: "Паралельні гілки",
    cells: "елем.",
    cell: "елем.",
    matchedCells: "Використовуйте однакові, підібрані елементи одного віку й стану. Розподіл струму "
        + "ідеалізовано; найслабший елемент обмежує можливості всього блока.",
    batteryHelp: "Номінальна напруга та ємність визначають розрахункову накопичену енергію та час "
        + "безперервної роботи. Вони не впливають на межу струму.",
    pack: "Акумуляторний блок",
    currentPerCell: "Розрахунковий струм на елемент",
};

export const converter: CalculatorRouteMessages = {
    ...converterDraft,
    inputUnit: "Вхідна одиниця вимірювання",
    needleGauge: "BWG (калібр голок)",
    outputUnit: "Вихідна одиниця вимірювання",
    precisionHelp: "Точність застосовується до числових результатів. У таблицях калібрів дроту "
        + "зберігаються опубліковані значення.",
};
