import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./uk";

type MutableExample = {
    title?: string;
    setup?: string;
    conclusion?: string;
    formulas?: string[];
};

type MutableSection = {
    id: string;
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    formulas?: Array<{ expression: string }>;
    examples?: MutableExample[];
    table?: { headers: string[]; rows: string[][] };
};

type MutableConcept = {
    displayName?: string;
    description?: string;
    summary?: string;
    sections: MutableSection[];
};

type MutablePresentationSet = {
    concepts: Record<string, MutableConcept>;
};

const corrected = JSON.parse(JSON.stringify(draftPresentations)) as MutablePresentationSet;

const getSection = (conceptId: string, sectionId: string): MutableSection => {
    const section = corrected.concepts[conceptId].sections.find((candidate) => candidate.id === sectionId);
    if (!section) {
        throw new Error("Ukrainian catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").bullets![1] = "I — струм, виміряний в амперах (А).";
getSection("concept-ohms-law", "relationship").bullets![2] = "R — опір, виміряний в омах (Ω).";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] = "V = 0,5 А × 10 Ω = 5 В";
getSection("concept-joule-heating", "heating-power").title = "Потужність нагрівання";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Котушка перетворює електричну енергію на тепло з потужністю 7,2 Вт; за 10 секунд це становить 72 Дж.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Гілка — це шлях струму між двома вузлами.";
getSection("concept-kirchhoffs-laws", "current-law").title = "Закон струмів Кірхгофа";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![1] =
    "I = 8,0 В / 0,40 Ω = 20 А";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].conclusion =
    "Через обидва резистори проходить однаковий струм 20 А.";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![3] =
    "Знак коефіцієнта має значення; заміна від’ємного значення його абсолютним значенням змінює прогноз.";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Щодо кута θ протилежна сторона лежить навпроти нього, прилегла сторона прилягає до нього, але не є гіпотенузою,"
    + " а гіпотенуза лежить навпроти прямого кута. SOH-CAH-TOA допомагає запам’ятати: синус — це протилежна сторона"
    + " поділена на гіпотенузу, косинус — прилегла сторона поділена на гіпотенузу, а тангенс — протилежна сторона"
    + " поділена на прилеглу.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "протилежна сторона = 10 × sin(30°) = 5 см";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "прилегла сторона = 10 × cos(30°) ≈ 8,66 см";
getSection("concept-trigonometry", "waveforms-and-identities").title = "Форми хвиль і корисні тотожності";
getSection("concept-heat-capacity", "basic-relationships").title = "Основні співвідношення";
getSection("concept-heat-capacity", "basic-relationships").bullets![1] =
    "Q — передана теплова енергія в джоулях (Дж).";
getSection("concept-heat-capacity", "electrical-heating").title = "Електричне нагрівання";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "Ідеальний час становить близько 7,0 хвилин; за ефективності передавання 80 % це приблизно 523 секунди.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Під час плавлення або кипіння підведена енергія може змінити фазу матеріалу без зміни його температури."
    + " L — питома теплота фазового переходу в Дж/кг.";
getSection("concept-heat-flux", "definition").bullets![0] = "q'' — густина теплового потоку у Вт/м².";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "Густина теплового потоку відрізняється від теплоємності: теплоємність описує накопичену енергію, потрібну для зміни"
    + " температури, а густина теплового потоку описує швидкість проходження тепла через поверхню.";
getSection("concept-heat-flux", "conduction").title = "Теплопровідність через плоский шар";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Тепловий потік — це швидкість передавання енергії, а не температура; для зміни температури використовуйте теплоємність.";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[2][1] = "секунда";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[6][2] = "кд";

getSection("concept-ohms-law", "relationship").title = "Співвідношення";
getSection("concept-ohms-law", "rearranged-formulas").title = "Перетворені формули";
getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "Опір 0 Ω є ідеальним коротким замиканням; із таким випадком слід поводитися окремо.";
getSection("concept-joule-heating", "heating-power").paragraphs![0] =
    "Потужність електричного нагрівання становить:";
getSection("concept-joule-heating", "worked-example").title = "Опрацьований приклад";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "Через котушку опором 0,8 Ω проходить струм 3 А.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Теплопередавання до повітря, рідини та обладнання визначає фактичну температуру.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Електрична потужність — це швидкість передавання енергії, а не температура. Теплоємність і густина теплового "
    + "потоку визначають, як ця енергія змінює температуру та як швидко відводиться від поверхні.";
getSection("concept-kirchhoffs-laws", "circuit-terms").title = "Терміни електричної схеми";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![2] =
    "Контур — це замкнений шлях, який повертається до початкової точки.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").title = "Послідовне та паралельне з’єднання";
getSection("concept-kirchhoffs-laws", "cells").title = "Елементи послідовно та паралельно";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Послідовно з’єднані елементи додають напругу, тоді як ємність в ампер-годинах залишається такою самою, як в одного елемента.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "Послідовне заряджання літій-іонних елементів потребує контролю напруги кожного елемента та належного балансування або захисту.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "Розв’яжіть систему рівнянь і перевірте баланс потужностей.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "Опрацьований приклад";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "Для додатного TCR за постійної напруги підвищення температури збільшує опір і, як правило, зменшує струм. Для "
    + "джерела постійного струму те саме збільшення опору збільшує потужність.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "У прямокутному трикутнику гіпотенуза завдовжки 10 см лежить навпроти кута 30°.";
getSection("concept-heat-capacity", "worked-example").title = "Опрацьований приклад";
getSection("concept-heat-capacity", "object-and-material").title = "Об’єкт і матеріал";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "Теплоємність стосується всього об’єкта й залежить від кількості матеріалу в ньому. Питома теплоємність є "
    + "властивістю матеріалу. Подвоєння маси подвоює теплоємність того самого матеріалу.";
corrected.concepts["concept-heat-flux"].displayName = "Густина теплового потоку";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Відрізняйте середню густину теплового потоку від локального піка; нагрівання може бути нерівномірним.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Більший номер калібру зазвичай означає менший діаметр; розміри понад калібр 0 записують як 00, 000 або 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Визначайте допустимий струм за даними виробу та електричними правилами, а не лише за номером калібру.";

getSection("concept-ohms-law", "worked-examples").examples![0].title = "Обчислити струм";
getSection("concept-ohms-law", "worked-examples").examples![1].title = "Обчислити опір";
getSection("concept-ohms-law", "worked-examples").examples![2].title = "Обчислити напругу";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Закон Ома поєднується зі співвідношенням потужності P = V × I. Потужність P вимірюють у ватах (Вт). Для джерела "
    + "4,2 В і навантаження 1,0 Ω ідеальна потужність становить 17,64 Вт. Компоненту потрібні достатня теплоємність і "
    + "запас безпеки, щоб безпечно розсіювати утворене тепло.";

getSection("concept-joule-heating", "heating-power").bullets![0] = "P — потужність у ватах (Вт).";
getSection("concept-joule-heating", "heating-power").bullets![2] = "I — струм в амперах (А).";
getSection("concept-joule-heating", "what-affects-heating").bullets![2] =
    "За постійної напруги зменшення опору збільшує потужність нагрівання.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Закони Кірхгофа для струму й напруги описують збереження заряду у вузлах і збереження енергії в замкнених контурах.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (parallel branches)";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Алгебраїчна сума підвищень і падінь напруги в замкненому контурі дорівнює нулю. Виберіть напрям обходу контуру та "
    + "дотримуйтеся узгодженої полярності. Зміна напрямку змінює знаки, але не фізичний розв’язок. Більший послідовний "
    + "опір спричиняє більше падіння напруги, оскільки через кожен послідовний компонент проходить той самий струм.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Паралельно з’єднані елементи зберігають ту саму напругу, а їхня ємність і доступний струм приблизно додаються.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "Пов’яжіть напругу та струм резистора співвідношенням V = I × R.";

getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α — температурний коефіцієнт матеріалу, виражений у 1 / °C або ppm / °C.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "Значення TCR від виробника зазвичай стосується визначеного діапазону температури та опору. Градієнти температури, "
    + "зміни властивостей матеріалу, контакти, механічні напруження та самонагрівання можуть спричинити відмінність "
    + "реального результату від оцінки першого порядку.";

getSection("concept-heat-flux", "definition").bullets![1] =
    "Q_dot — загальна швидкість передавання тепла у ватах (Вт).";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 Вт / 0,020 м² = 5 000 Вт/м²";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Середня густина теплового потоку становить 5 000 Вт/м², або 0,5 Вт/см².";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "Конвекція використовує коефіцієнт конвекції h. Випромінювання використовує випромінювальну здатність ε і сталу "
    + "Стефана–Больцмана σ; температури в рівнянні випромінювання мають бути абсолютними температурами в кельвінах.";

getSection("concept-si-system-and-imperial-units", "base-units").title = "Основні одиниці СІ";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[0][0] = "кіло";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[4][1] = "н";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 inch = 25.4 mm = 0.0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 foot = 12 inches = 0.3048 m";
getSection("concept-si-system-and-imperial-units", "unit-checks").title = "Практична перевірка одиниць";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title = "Системи калібрування";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Закони Кірхгофа для струму й напруги описують збереження заряду у вузлах та енергії в замкнених контурах.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Температурний коефіцієнт опору описує, як опір компонента змінюється з температурою.";
corrected.concepts["concept-heat-flux"].displayName = "Густина теплового потоку";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Визначайте допустимий струм за даними виробу та електротехнічними правилами, а не лише за номером калібру.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Закон струмів Кірхгофа";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Якщо у вузол входить 8 А, а одна гілка відводить 3 А, решта гілок разом мають відвести 5 А. " +
    "Перед розв’язанням визначте напрямки струму; негативний результат означає, що реальний струм тече проти " +
    "припущеного напрямку.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = протилежна сторона / гіпотенуза";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = прилегла сторона / гіпотенуза";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = протилежна сторона / прилегла сторона";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(протилежна сторона / гіпотенуза)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(прилегла сторона / гіпотенуза)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(протилежна сторона / прилегла сторона)";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (послідовно)";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (паралельні гілки)";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 дюйм = 25,4 мм = 0,0254 м";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 фут = 12 дюймів = 0,3048 м";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 ярд = 3 фути = 0,9144 м";

getSection("concept-ohms-law", "relationship").bullets![0] =
    "V — напруга, виміряна у вольтах (V).";
getSection("concept-ohms-law", "relationship").bullets![1] =
    "I — струм, виміряний в амперах (A).";
getSection("concept-ohms-law", "worked-examples").examples![0].setup =
    "Джерело 4,2 V підключається до навантаження 1,0 \\u03a9.";
getSection("concept-ohms-law", "worked-examples").examples![0].conclusion =
    "Струм навантаження 4,2 A.";
getSection("concept-ohms-law", "worked-examples").examples![1].setup =
    "До кола прикладено напругу 12 V, і воно споживає струм 2 A.";
getSection("concept-ohms-law", "worked-examples").examples![2].setup =
    "Через опір 10 \\u03a9 протікає струм 0,5 A.";
getSection("concept-ohms-law", "worked-examples").examples![2].conclusion =
    "Напруга 5 V.";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Закон Ома поєднується зі співвідношенням потужності P = V × I. Потужність P вимірюють "
    + "у ватах (W). Для джерела 4,2 V і навантаження 1,0 Ω ідеальна потужність становить "
    + "17,64 W. Компоненту потрібні достатня теплоємність і запас безпеки, щоб безпечно "
    + "розсіювати утворене тепло.";
getSection("concept-ohms-law", "unit-conversions").bullets![2] =
    "1 mA = 0,001 A";
getSection("concept-ohms-law", "unit-conversions").bullets![3] =
    "1 W = 1000 mW";
getSection("concept-joule-heating", "heating-power").bullets![0] =
    "P — потужність у ватах (W).";
getSection("concept-joule-heating", "heating-power").bullets![1] =
    "V — напруга у вольтах (V).";
getSection("concept-joule-heating", "heating-power").bullets![2] =
    "I — струм в амперах (A).";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "Через котушку опором 0,8 Ω проходить струм 3 A.";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Спіраль перетворює енергію на тепло зі швидкістю 7,2 джоуля за секунду, або 72 J за 10 "
    + "секунд.";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Якщо у вузол входить 8 A, а одна гілка відводить 3 A, решта гілок разом мають відвести "
    + "5 A. Перед розв’язанням визначте напрямки струму; негативний результат означає, що "
    + "реальний струм тече проти припущеного напрямку.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].setup =
    "Два резистори 0,20 \\u03a9 підключені послідовно до 8,0 V.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].conclusion =
    "Через обидва резистори проходить однаковий струм 20 A.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].setup =
    "Дві рівні гілки 0,40 \\u03a9 підключаються до 4,0 V.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "При рівному опорі гілки кожна гілка несе 10 A.";
getSection("concept-heat-capacity", "basic-relationships").bullets![0] =
    "C — теплоємність у J/K або J/°C.";
getSection("concept-heat-capacity", "basic-relationships").bullets![1] =
    "Q — передана теплова енергія в джоулях (J).";
getSection("concept-heat-capacity", "basic-relationships").bullets![2] =
    "m — маса в кілограмах, а c — питома теплоємність у J/(kg·K).";
getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "Різниця температур в 1 K дорівнює різниці в 1 °C.";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "Нагрійте 0,20 kg води від 20 °C до 70 °C, використовуючи c = 4180 J/(kg·K).";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "Ідеальна потреба в енергії становить 41,8 kJ; справжній обігрівач потребує більше "
    + "через втрати.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Під час плавлення або кипіння підведена енергія може змінити фазу матеріалу без зміни "
    + "його температури. L — питома теплота фазового переходу в J/kg.";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' — густина теплового потоку у W/m².";
getSection("concept-heat-flux", "definition").bullets![1] =
    "Q_dot — загальна швидкість передавання тепла у ватах (W).";
getSection("concept-heat-flux", "definition").bullets![2] =
    "A – площа, через яку передається тепло в квадратних метрах (m²).";
getSection("concept-heat-flux", "worked-example").examples![0].setup =
    "Обігрівач потужністю 100 W передає тепло через площу 0,020 m².";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Середня густина теплового потоку становить 5 000 W/m², або 0,5 W/cm².";
getSection("concept-heat-flux", "conduction").bullets![0] =
    "k – теплопровідність у W/(m·K).";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "Перш ніж використовувати W/m², переведіть площу в m².";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[0][2] =
    "m";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[1][2] =
    "kg";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[2][2] =
    "s";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[3][2] =
    "K";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[4][2] =
    "A";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[5][2] =
    "mol";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[6][2] =
    "cd";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![0] =
    "Напруга: вольт (V).";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![2] =
    "Потужність: ват (W).";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![3] =
    "Енергія: джоуль (J).";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![4] =
    "Сила: ньютон (N).";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![5] =
    "Тиск: паскаль (Pa).";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![6] =
    "Частота: герц (Hz).";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[1][1] =
    "M";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[2][1] =
    "m";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[4][1] =
    "n";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").paragraphs![0] =
    "Наприклад, 2,2 k\\u03a9 дорівнює 2200 \\u03a9, а 15 mA дорівнює 0,015 A. Перед "
    + "використанням формули переведіть значення в сумісні одиниці.";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].setup =
    "Перетворіть 0,1 дюйма в міліметри та 5 mm в дюйми.";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets![0] =
    "1 lb ≈ 0,45359237 kg.";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets![1] =
    "1 lbf ≈ 4,44822 N.";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets![2] =
    "1 psi ≈ 6894,76 Pa.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[0][1] =
    "2,588 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[0][2] =
    "3,251 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[0][3] =
    "3,404 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[1][1] =
    "0,8128 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[1][2] =
    "0,9144 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[1][3] =
    "0,8890 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[2][1] =
    "0,2540 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[2][2] =
    "0,3150 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[2][3] =
    "0,3048 mm";

getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![1] =
    "Застосуйте KCL у незалежних вузлах і KVL для незалежних контурів.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "У прямокутному трикутнику гіпотенуза завдовжки 10 cm утворює з одним із катетів кут 30°.";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "На калькуляторі має бути вибрано правильні одиниці вимірювання кутів. Використання "
    + "режиму градусів для значення в радіанах або навпаки дає інший результат. Повний оберт "
    + "становить 360° або 2π радіан.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "Для нагрівання води з попереднього прикладу потрібно 41.8 kJ. Використайте джерело "
    + "сталої потужності 100 W і припустіть, що втрат немає.";
getSection("concept-heat-flux", "worked-example").title =
    "Приклад розрахунку";
getSection("concept-si-system-and-imperial-units", "base-units").title =
    "Поширені одиниці СІ";
getSection("concept-si-system-and-imperial-units", "base-units").table!.headers![0] =
    "Величина";
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Фунт може позначати масу (lb) або силу (lbf), а це різні величини. Так само дюйми, "
    + "квадратні дюйми та кубічні дюйми вимірюють величини різних розмірностей.";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![1] =
    "Переконайтеся, що обидві частини рівняння мають сумісні розмірності.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "Для 1/0, 2/0, 3/0 і 4/0 використовуйте n = 0, -1, -2 і -3. AWG визначає розмір "
    + "провідника, а не універсальний безпечний струм; допустимий струм також залежить від "
    + "матеріалу, ізоляції, охолодження, монтажу та відповідних електротехнічних норм.";
corrected.concepts["concept-heat-flux"].description =
    "Густина теплового потоку описує швидкість передавання тепла через одиницю площі "
    + "поверхні незалежно від загальної кількості матеріалу, що накопичує тепло.";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "Середня густина теплового потоку нагрівача";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Густина теплового потоку — це швидкість передавання енергії через одиницю площі, а не "
    + "температура; для визначення зміни температури використовуйте теплоємність.";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 \\u03a9 = 4,2 A";
getSection("concept-ohms-law", "worked-examples").examples![1].formulas![0] =
    "R = 12 V / 2 A = 6 \\u03a9";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] =
    "V = 0,5 A × 10 Ω = 5 V";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0,8 = 7,2 W";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![1] =
    "E = P × t = 7,2 W × 10 s = 72 J";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![0] =
    "R_total = 0,40 \\u03a9";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![1] =
    "I = 8,0 V / 0,40 Ω = 20 A";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![0] =
    "R_total = 0,20 \\u03a9";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![1] =
    "I_total = 4,0 V / 0,20 Ω = 20 A";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "протилежна сторона = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "прилегла сторона = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-heat-capacity", "worked-example").examples![0].formulas![1] =
    "Q = 0,20 × 4180 × 50 = 41800 J";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41800 J / 100 W = 418 s";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0,020 m² = 5 000 W/m²";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![0] =
    "0,1 дюйма × 25,4 = 2,54 mm";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![1] =
    "5 mm / 25,4 ≈ 0,19685 дюйма";
corrected.concepts["concept-joule-heating"].summary =
    "Як електрична енергія перетворюється на тепло під час проходження струму.";

getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Перевірте, чи витримують компоненти, з’єднання та ізоляція очікуваний струм і "
    + "потужність. Передбачте належний запас, оскільки реальні компоненти можуть нагріватися "
    + "нерівномірно, а опір може змінюватися з температурою. Акумулятори та джерела живлення "
    + "також мають межі струму для безперервної роботи.";

export const presentations = corrected as unknown as CatalogPresentationSet;
