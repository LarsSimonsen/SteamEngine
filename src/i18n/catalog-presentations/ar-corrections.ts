import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./ar";

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
        throw new Error("Arabic catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "electrical-power").title = "القدرة الكهربائية";
corrected.concepts["concept-joule-heating"].summary =
    "كيف يحول التيار الكهربائي الطاقة الكهربائية إلى حرارة.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "القدرة الكهربائية هي معدل انتقال الطاقة، وليست درجة الحرارة. تحدد السعة الحرارية والتدفق الحراري كيفية "
    + "تغير الطاقة درجة الحرارة ومدى سرعة مغادرتها للسطح.";

getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (توالي)";
getSection("concept-kirchhoffs-laws", "cells").formulas![1].expression =
    "C_pack = C_1 + C_2 + ... (توازي)";

getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "مثال محلول";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![0] =
    "α = 400 × 10^-6 / °C = 0.0004 / °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![1] =
    "ΔT = 100 - 20 = 80 °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].conclusion =
    "المقاومة المقدرة هي 1.032 Ω، أي أعلى بنحو 3.2% من قيمتها عند 20 °C.";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "بالنسبة إلى الزاوية θ، يقع الضلع المقابل على الجانب الآخر من الزاوية، ويلامس الضلع المجاور الزاوية من دون "
    + "أن يكون الوتر، بينما يقع الوتر مقابل الزاوية القائمة. SOH-CAH-TOA قاعدة تذكّر: جيب الزاوية هو المقابل "
    + "مقسوماً على الوتر، وجيب التمام هو المجاور مقسوماً على الوتر، والظل هو المقابل مقسوماً على المجاور.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "وتر طوله 10 سم يصنع زاوية قياسها 30°.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "opposite = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "adjacent = 10 × cos(30°) ≈ 8.66 cm";
getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = opposite / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = adjacent / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = opposite / adjacent";

corrected.concepts["concept-heat-capacity"].displayName = "السعة الحرارية";
getSection("concept-heat-capacity", "worked-example").title = "مثال محلول";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "الطاقة المثالية المطلوبة هي 41.8 kJ؛ ويحتاج السخان الحقيقي إلى طاقة أكبر بسبب الفواقد.";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "Q = 41,800 J / 100 W = 418 s";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41,800 J / 100 W = 418 s";

getSection("concept-heat-flux", "worked-example").title = "مثال محلول";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0.020 m² = 5,000 W/m²";
getSection("concept-heat-flux", "practical-checks").title = "فحوصات عملية";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "ميّز بين متوسط تدفق الحرارة والقمة المحلية؛ فقد يكون التسخين غير متساوٍ.";

const baseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
baseUnits.rows[1] = ["الكتلة", "كيلوغرام", "kg"];
baseUnits.rows[2] = ["الزمن", "ثانية", "s"];
baseUnits.rows[5] = ["كمية المادة", "مول", "mol"];
baseUnits.rows[6] = ["شدة الإضاءة", "كانديلا", "cd"];

getSection("concept-ohms-law", "worked-examples").examples![2].conclusion =
    "الجهد هو 5 فولت (5 V).";

getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0.8 = 7.2 W";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "يحوّل الملف الطاقة إلى حرارة بمعدل 7.2 W، أو 72 J خلال 10 s.";

getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![1] =
    "I_total = 4.0 V / 0.20 Ω = 20 A";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "عندما تكون مقاومات الفروع متساوية، يحمل كل فرع 10 A.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = المقابل / الوتر";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = المجاور / الوتر";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = المقابل / المجاور";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "المقابل = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "المجاور = 10 × cos(30°) ≈ 8.66 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(المقابل / الوتر)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(المجاور / الوتر)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(المقابل / المجاور)";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression =
    "180° = π راديان";

getSection("concept-heat-capacity", "basic-relationships").bullets![1] =
    "Q هي الطاقة الحرارية المنقولة بالجول (J).";
getSection("concept-heat-capacity", "basic-relationships").bullets![2] =
    "m هي الكتلة بالكيلوغرام، وc هي السعة الحرارية النوعية بوحدة J/(kg·K).";
getSection("concept-heat-capacity", "worked-example").examples![0].formulas![1] =
    "Q = 0.20 × 4,180 × 50 = 41,800 J";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41,800 J / 100 W = 418 s";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "الزمن المثالي هو نحو 7.0 دقائق؛ وعند كفاءة نقل قدرها 80% يستغرق التسخين نحو 523 s.";

getSection("concept-heat-flux", "definition").paragraphs![0] =
    "يختلف التدفق الحراري عن السعة الحرارية: تصف السعة الحرارية الطاقة المخزنة لكل تغير في درجة الحرارة، بينما "
    + "يصف التدفق الحراري معدل عبور الحرارة للسطح.";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "متوسط كثافة تدفق الحرارة من سخان";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "تبلغ كثافة تدفق الحرارة المتوسطة 5,000 W/m²، أو 0.5 W/cm².";
getSection("concept-heat-flux", "practical-checks").bullets![2] =
    "أدرج مقاومة التلامس والحمل الحراري والإشعاع وفقدان الحرارة عند الحاجة.";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "تذكّر أن التدفق الحراري معدل نقل لا درجة حرارة؛ استخدم السعة الحرارية لحساب تغير درجة الحرارة.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "يصف معامل درجة حرارة المقاومة كيفية تغير المقاومة عندما تسخن المادة أو تبرد.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").paragraphs![0] =
    "عند وجود تغير صغير أو متوسط في درجة الحرارة، استخدم العلاقة الخطية من الدرجة الأولى:";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "يُعبَّر عن α بمعامل درجة الحرارة للمادة بوحدة 1/°C أو ppm/°C.";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").title =
    "قيم TCR الموجبة والسالبة";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![0] =
    "تؤدي قيمة TCR موجبة إلى زيادة المقاومة مع ارتفاع درجة الحرارة؛ وتتصرف معادن كثيرة بهذه الطريقة.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "تبلغ مقاومة مقدارها 1.00 Ω عند 20 °C، وتبلغ قيمة TCR فيها 400 ppm/°C.";

getSection("concept-trigonometry", "finding-sides-and-angles").title =
    "إيجاد الأضلاع والزوايا المجهولة";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "إيجاد ضلع";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![0] =
    "A هي السعة، وf هو التردد بالهرتز، وt هو الزمن بالثواني، وφ هي زاوية الطور.";

getSection("concept-heat-capacity", "basic-relationships").bullets![0] =
    "C هي السعة الحرارية بوحدة J/K أو J/°C.";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "سخّن 0.20 kg من الماء من 20 °C إلى 70 °C باستخدام c = 4,180 J/(kg·K).";
getSection("concept-heat-capacity", "electrical-heating").title = "التسخين بالطاقة الكهربائية";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "سخّن المثال الذي يحتاج إلى 41.8 kJ باستخدام مصدر ثابت قدره 100 W ومن دون فواقد.";
getSection("concept-heat-capacity", "object-and-material").title = "الجسم والمادة";
getSection("concept-heat-capacity", "phase-changes-and-limits").title =
    "تغيرات الطور والحدود العملية";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "أثناء الانصهار أو الغليان، يمكن للطاقة المضافة أن تغير طور المادة من دون تغيير درجة حرارتها. L هي الحرارة "
    + "الكامنة النوعية بوحدة J/kg.";

getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' هي كثافة التدفق الحراري بوحدة W/m².";
getSection("concept-heat-flux", "definition").bullets![2] =
    "A هي المساحة التي تنتقل الحرارة عبرها، بوحدة m².";
getSection("concept-heat-flux", "conduction").bullets![3] =
    "تشير الإشارة السالبة إلى انتقال الحرارة من درجة حرارة أعلى إلى درجة حرارة أقل.";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "يستخدم الحمل الحراري معامل سطح h. ويستخدم الإشعاع الانبعاثية ε وثابت ستيفان–بولتزمان σ؛ ويجب أن تكون "
    + "درجات الحرارة في معادلة الإشعاع مطلقة وبالكلفن.";

getSection("concept-si-system-and-imperial-units", "base-units").title = "وحدات SI الأساسية";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").paragraphs![0] =
    "على سبيل المثال، 2.2 kΩ تساوي 2,200 Ω، و15 mA تساوي 0.015 A. حوّل القيم إلى وحدات متوافقة قبل استخدام "
    + "الصيغة.";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 بوصة = 25.4 mm = 0.0254 m";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets![0] =
    "1 lb ≈ 0.45359237 kg.";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![2] =
    "حوّل الوحدات قبل الضرب أو القسمة.";

getSection("concept-ohms-law", "unit-conversions").bullets![0] = "1 kΩ = 1,000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![1] = "1 MΩ = 1,000,000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![2] = "1 mA = 0.001 A";
getSection("concept-ohms-law", "unit-conversions").bullets![3] = "1 W = 1,000 mW";

getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "يمر تيار قدره 3 A في كويل مقاومته 0.8 Ω.";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "يحوّل الكويل الطاقة إلى حرارة بمعدل 7.2 W، أو 72 J خلال 10 s.";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "تجمع الخلايا المتسلسلة الجهد، بينما تظل السعة بالأمبير-ساعة مساوية تقريبًا لسعة خلية واحدة.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "تحافظ الخلايا المتوازية على الجهد نفسه، بينما تتجمع السعة والتيار المتاح تقريبًا.";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "بالنسبة إلى مقاومة ذات TCR موجب تعمل بجهد ثابت، تؤدي زيادة درجة الحرارة إلى زيادة المقاومة، ويميل التيار إلى "
    + "الانخفاض. وبالنسبة إلى مصدر تيار ثابت، تؤدي زيادة المقاومة نفسها إلى زيادة القدرة.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "ينطبق TCR الذي تحدده الشركة المصنّعة عادةً على نطاق محدد من درجة الحرارة والمقاومة. وقد تجعل تدرجات الحرارة، "
    + "وتغيرات المادة، والوصلات، والإجهاد الميكانيكي، والتسخين الذاتي النتيجة الفعلية مختلفة عن تقدير الدرجة الأولى.";

getSection("concept-trigonometry", "waveforms-and-identities").bullets![1] =
    "يقاس التردد الزاوي ω بالراديان لكل ثانية.";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![2] =
    "حافظ على إشارة العدد والربع عندما يكون الاتجاه أو الطور مهمًا.";

getSection("concept-heat-capacity", "worked-example").examples![0].formulas![0] =
    "ΔT = 70 - 20 = 50 °C";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "تفترض المعادلة البسيطة أن السعة الحرارية النوعية ثابتة تقريبًا. وقد يؤدي فقدان الحرارة والحمل الحراري والإشعاع "
    + "والتبخر ومقاومة التلامس وعدم تساوي درجة الحرارة إلى اختلاف النتيجة الفعلية عن المثالية.";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "حوّل المساحة إلى m² قبل استخدام W/m².";

baseUnits.headers[1] = "وحدة SI";
baseUnits.rows[0] = ["الطول", "متر", "m"];
baseUnits.rows[3] = ["درجة الحرارة", "كلفن", "K"];
baseUnits.rows[4] = ["التيار الكهربائي", "أمبير", "A"];
getSection("concept-si-system-and-imperial-units", "base-units").bullets![2] = "القدرة: واط (W).";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![4] = "القوة: نيوتن (N).";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![5] = "الضغط: باسكال (Pa).";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 قدم = 12 بوصة = 0.3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 ياردة = 3 أقدام = 0.9144 m";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets![1] = "1 lbf ≈ 4.44822 N.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.headers[1] = "AWG";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "توضح قوانين كيرشوف للتيار والجهد حفظ الشحنة عند العقد وحفظ الطاقة في الحلقات المغلقة.";
getSection("concept-kirchhoffs-laws", "circuit-terms").title = "مصطلحات الدائرة";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "إذا دخل تيار قدره 8 A إلى عقدة وخرج 3 A عبر أحد الفروع، فيجب أن يخرج من الفروع الأخرى ما مجموعه 5 A. حدّد " +
    "اتجاهات التيار قبل الحساب؛ وتشير النتيجة السالبة إلى أن التيار الفعلي يسري عكس الاتجاه المفترض.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8.0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "يساوي المجموع الجبري لارتفاعات الجهد وانخفاضاته حول حلقة مغلقة صفرًا. اختر اتجاهًا للحلقة وحافظ على اتساق " +
    "الأقطاب. يؤدي عكس الاتجاه إلى تغيير الإشارات، لا إلى تغيير الحل الفيزيائي. ويكون انخفاض الجهد أكبر عبر مقاومة " +
    "سلسلية أكبر لأن التيار نفسه يمر في جميع المكونات المتسلسلة.";
getSection("concept-kirchhoffs-laws", "cells").bullets![2] =
    "يعتمد تقاسم التيار على المقاومة الداخلية ونقاط التلامس والأسلاك والمفاتيح.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![0] =
    "حدّد جهود العقد وتيارات الفروع واتجاهات التيار المفترضة.";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "يصف معامل درجة حرارة المقاومة كيف تتغير مقاومة مكوّن مع ارتفاع درجة الحرارة أو انخفاضها.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").paragraphs![0] =
    "استخدم علاقة من الدرجة الأولى لتغير صغير أو متوسط في درجة الحرارة:";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![0] =
    "يعني معامل درجة الحرارة الموجب أن المقاومة تزداد مع ارتفاع درجة الحرارة؛ وتتبع معادن كثيرة هذا السلوك.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α هو معامل درجة حرارة المادة، ويُعبّر عنه بوحدة 1/°C أو ppm/°C.";
corrected.concepts["concept-trigonometry"].description =
    "تربط حساب المثلثات بين الزوايا والأطوال، وتفيد في المتجهات وعلاقات الطور وأشكال الموجات.";
getSection("concept-trigonometry", "finding-sides-and-angles").title = "إيجاد الأضلاع والزوايا المجهولة";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "المقابل = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "المجاور = 10 × cos(30°) ≈ 8.66 cm";
getSection("concept-trigonometry", "degrees-and-radians").title = "الدرجات والراديان";
getSection("concept-trigonometry", "degrees-and-radians").formulas![0].expression = "180° = π راديان";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "يجب ضبط الآلة الحاسبة على وضع الزاوية الصحيح. يؤدي استخدام وضع الدرجات لقيمة بالراديان، أو العكس، إلى نتيجة " +
    "مختلفة. تمثل الدورة الكاملة 360° أو 2π راديان.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "أثناء الانصهار أو الغليان، يمكن للطاقة المضافة أن تغيّر حالة المادة من دون تغيير درجة حرارتها. وتمثل L الحرارة " +
    "الكامنة النوعية بوحدة J/kg.";
corrected.concepts["concept-heat-flux"].displayName = "كثافة التدفق الحراري";
corrected.concepts["concept-heat-flux"].summary = "معدل انتقال الحرارة لكل وحدة مساحة.";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "تختلف كثافة التدفق الحراري عن السعة الحرارية: تصف السعة الحرارية الطاقة المخزنة لكل تغير في درجة الحرارة، بينما " +
    "تصف كثافة التدفق الحراري معدل عبور الحرارة لسطح ما لكل وحدة مساحة.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.headers =
    ["المقياس", "AWG", "SWG البريطاني", "BWG"];
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "تعتمد المقاومة على طول الموصل L ومساحة مقطعه العرضي A ومقاومية المادة ρ. وبما أن المساحة تتغير مع مربع القطر، " +
    "فإن اختلافًا صغيرًا في القطر قد يسبب فرقًا مهمًا في المقاومة. وفي AWG، تؤدي زيادة المقياس ثلاث درجات إلى خفض " +
    "المساحة إلى النصف تقريبًا ومضاعفة المقاومة لكل وحدة طول للمادة ودرجة الحرارة نفسيهما.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "حدّد سعة التيار استنادًا إلى بيانات المنتج والقواعد الكهربائية، لا إلى رقم المقياس وحده.";

getSection("concept-ohms-law", "unit-conversions").bullets![2] = "1 mA = 0.001 A";
getSection("concept-ohms-law", "unit-conversions").bullets![3] = "1 W = 1000 mW";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41.8 kJ / 100 W = 418 s";
getSection("concept-trigonometry", "right-triangles").title = "المثلثات القائمة";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "بالنسبة إلى الزاوية θ، يكون الضلع المقابل لها مقابلًا لها، والضلع المجاور يلامسها من دون أن يكون الوتر، والوتر " +
    "مقابل الزاوية القائمة. تساعد قاعدة SOH-CAH-TOA على التذكّر: الجيب هو المقابل على الوتر، وجيب التمام هو " +
    "المجاور على الوتر، والظل هو المقابل على المجاور.";
getSection("concept-trigonometry", "right-triangles").formulas = [
    { expression: "sin(θ) = الضلع المقابل / الوتر" },
    { expression: "cos(θ) = الضلع المجاور / الوتر" },
    { expression: "tan(θ) = الضلع المقابل / الضلع المجاور" }
];
getSection("concept-trigonometry", "finding-sides-and-angles").title = "إيجاد الأضلاع والزوايا المجهولة";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas = [
    { expression: "θ = sin^-1(الضلع المقابل / الوتر)" },
    { expression: "θ = cos^-1(الضلع المجاور / الوتر)" },
    { expression: "θ = tan^-1(الضلع المقابل / الضلع المجاور)" }
];
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "الضلع المقابل = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "الضلع المجاور = 10 × cos(30°) ≈ 8.66 cm";

getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "المقاومة التي تبلغ صفر Ω تمثل دائرة قصر مثالية ويجب التعامل معها على نحو منفصل.";
getSection("concept-ohms-law", "worked-examples").examples![0].setup =
    "وُصل مصدر بجهد 4.2 V بحمل مقاومته 1.0 Ω.";
getSection("concept-ohms-law", "worked-examples").examples![2].setup =
    "يمر تيار قدره 0.5 A عبر مقاومة مقدارها 10 Ω.";

const jouleHeatingEffects = getSection("concept-joule-heating", "what-affects-heating");
jouleHeatingEffects.bullets![0] =
    "عند ثبات المقاومة، تؤدي مضاعفة التيار إلى زيادة قدرة التسخين إلى أربعة أمثالها.";
jouleHeatingEffects.bullets![1] = "عند ثبات التيار، تؤدي مضاعفة المقاومة إلى مضاعفة قدرة التسخين.";
jouleHeatingEffects.bullets![2] = "عند ثبات الجهد، يؤدي خفض المقاومة إلى زيادة قدرة التسخين.";
jouleHeatingEffects.paragraphs![0] =
    "القدرة الكهربائية هي معدل انتقال الطاقة وليست درجة حرارة. وتحدد السعة الحرارية وكثافة التدفق الحراري مقدار " +
    "تغير درجة الحرارة بتلك الطاقة ومدى سرعة انتقال الحرارة بعيدًا عن السطح.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "تأكد من قدرة المكونات والتوصيلات والعزل على تحمل التيار والقدرة المتوقعين. واترك هامش أمان مناسبًا لأن " +
    "المكونات الفعلية قد تسخن بشكل غير متساوٍ، ولأن المقاومة قد تتغير مع درجة الحرارة. وللبطاريات ومصادر التغذية " +
    "أيضًا حدود للتيار المتواصل المسموح به.";

const kirchhoffTerms = getSection("concept-kirchhoffs-laws", "circuit-terms");
kirchhoffTerms.bullets![1] = "الفرع هو مسار للتيار بين عقدتين.";
kirchhoffTerms.bullets![4] = "يوصل التوصيل على التوازي الفروع بالعقدتين نفسيهما.";
const kirchhoffExamples = getSection("concept-kirchhoffs-laws", "series-and-parallel").examples!;
kirchhoffExamples[0].setup = "وُصلت مقاومتان مقدار كل منهما 0.20 Ω على التوالي بمصدر جهد قدره 8.0 V.";
kirchhoffExamples[0].conclusion = "يمر التيار نفسه، ومقداره 20 A، عبر كلتا المقاومتين.";
kirchhoffExamples[1].setup = "وُصل فرعان متساويان مقاومة كل منهما 0.40 Ω على التوازي بمصدر جهد قدره 4.0 V.";
kirchhoffExamples[1].formulas![0] = "R_total = 0.20 Ω";
kirchhoffExamples[1].conclusion = "عند تساوي مقاومتي الفرعين، يمر تيار قدره 10 A في كل فرع.";
const kirchhoffSolving = getSection("concept-kirchhoffs-laws", "solving-and-limits");
kirchhoffSolving.bullets![1] = "طبّق KCL عند العقد المستقلة وKVL حول الحلقات المستقلة.";
kirchhoffSolving.bullets![3] = "حل نظام المعادلات وتحقق من توازن القدرة.";
kirchhoffSolving.paragraphs![0] =
    "قد يهمل النموذج المبسط المقاومة الداخلية للخلية، ومقاومة التلامس، وكفاءة المحول، وتأثيرات درجة الحرارة، " +
    "والسلوك العابر، ودوائر الحماية، وتفاوتات المكونات. أدرج كل تأثير مهمل يؤثر بدرجة مهمة في دائرة ذات تيار عالٍ.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].displayName =
    "معامل درجة حرارة المقاومة (TCR)";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![2] =
    "تعني قيمة TCR القريبة من الصفر أن المقاومة لا تتغير كثيرًا عبر النطاق المحدد.";
const tcrExample = getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0];
tcrExample.setup = "مقاومة قيمتها الاسمية 1.00 Ω عند 20 °C، ومعامل درجة حرارتها 400 ppm/°C.";
tcrExample.formulas![2] = "R_T = 1.00 [1 + 0.0004 × 80] = 1.032 Ω";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").title =
    "TCR والقدرة والحدود العملية";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "ينطبق معامل TCR الذي تحدده الشركة المصنّعة عادةً ضمن نطاق معلن لدرجة الحرارة والمقاومة. وقد تؤدي تدرجات " +
    "درجة الحرارة، وتغيرات المادة، والوصلات، والانفعال الميكانيكي، والتسخين الذاتي إلى اختلاف النتيجة الفعلية عن " +
    "التقدير الخطي.";

corrected.concepts["concept-trigonometry"].displayName = "حساب المثلثات";
getSection("concept-trigonometry", "waveforms-and-identities").title = "الأشكال الموجية والمتطابقات المفيدة";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![2] =
    "حافظ على إشارة القيمة والربع عندما يكون للاتجاه أو الطور أهمية.";

getSection("concept-heat-capacity", "electrical-heating").title = "التسخين بالقدرة الكهربائية";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "السعة الحرارية خاصية للجسم كله وتعتمد على كمية المادة فيه، أما السعة الحرارية النوعية فهي خاصية للمادة. وتؤدي " +
    "مضاعفة الكتلة إلى مضاعفة السعة الحرارية للمادة نفسها.";

const decimalPrefixes = getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!;
decimalPrefixes.rows[0][1] = "k";
decimalPrefixes.rows[1][1] = "M";
decimalPrefixes.rows[2][1] = "m";
decimalPrefixes.rows[4][1] = "n";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![1] = "المقاومة: أوم (Ω).";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![6] = "التردد: هرتز (Hz).";
const otherConversions = getSection("concept-si-system-and-imperial-units", "other-conversions");
otherConversions.bullets![2] = "1 psi ≈ 6,894.76 Pa.";
otherConversions.bullets![3] = "°F = °C × 9/5 + 32.";
otherConversions.bullets![4] = "°C = (°F - 32) × 5/9.";
otherConversions.bullets![5] = "K = °C + 273.15.";
otherConversions.paragraphs![0] =
    "قد يشير الرطل إلى الكتلة (lb) أو القوة (lbf)، وهما كميتان مختلفتان. وبالمثل، تقيس البوصة والبوصة المربعة " +
    "والبوصة المكعبة أبعادًا مختلفة.";

corrected.concepts["concept-heat-flux"].description =
    "تصف كثافة التدفق الحراري مدى سرعة انتقال الحرارة عبر سطح ما، بصرف النظر عن إجمالي كمية المادة التي تخزنها.";
const heatFluxExample = getSection("concept-heat-flux", "worked-example").examples![0];
heatFluxExample.title = "متوسط كثافة التدفق الحراري لسخان";
heatFluxExample.conclusion = "يبلغ متوسط كثافة التدفق الحراري 5,000 W/m²، أي 0.5 W/cm².";
const heatFluxChecks = getSection("concept-heat-flux", "practical-checks");
heatFluxChecks.bullets![1] =
    "ميّز بين متوسط كثافة التدفق الحراري وقيمتها العظمى الموضعية؛ فقد لا يكون التسخين متجانسًا.";
heatFluxChecks.bullets![3] =
    "كثافة التدفق الحراري معدل انتقال وليست درجة حرارة؛ استخدم السعة الحرارية لحساب تغير درجة الحرارة.";

getSection("concept-si-system-and-imperial-units", "base-units").title = "وحدات SI الشائعة";
decimalPrefixes.rows[0][2] = "1,000 = 10^3";
getSection("concept-si-system-and-imperial-units", "length-conversions").title =
    "التحويل بين البوصة والوحدات المترية";
const lengthExample = getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0];
lengthExample.setup = "حوّل 0.1 بوصة إلى ملليمترات و5 mm إلى بوصات.";
lengthExample.formulas![0] = "0.1 بوصة × 25.4 = 2.54 mm";
lengthExample.formulas![1] = "5 mm / 25.4 ≈ 0.19685 بوصة";
getSection("concept-si-system-and-imperial-units", "unit-checks").title = "فحوصات عملية للوحدات";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![3] =
    "قرّب النتيجة في النهاية فقط كي تحتفظ النتائج الوسيطة بدقة مفيدة.";

const gaugeConcept = corrected.concepts["concept-wire-gauges-awg-swg-bwg"];
gaugeConcept.description = "لا يحدد رقم المقياس حجمًا اسميًا إلا عند ذكر نظام القياس المستخدم.";
const gaugeSystems = getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems");
gaugeSystems.bullets![2] =
    "BWG هو مقياس برمنغهام للأسلاك، وقد استُخدم تاريخيًا لأسلاك الحديد والأنابيب وسماكة الصفائح.";
gaugeSystems.bullets![3] =
    "يعني الرقم الأكبر في المقاييس العادية قطرًا أصغر عمومًا؛ وتُكتب المقاسات الأكبر من المقياس 0 على هيئة 00 أو " +
    "000 أو 0000.";
gaugeSystems.paragraphs![0] =
    "يعتمد SWG وBWG على جداول، ولا يجوز حسابهما بصيغة AWG. ولذلك لا يدل الرقم نفسه على القطر نفسه في الأنظمة " +
    "المختلفة.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "استخدم n = 0 و-1 و-2 و-3 للمقاسات 1/0 و2/0 و3/0 و4/0 على الترتيب. يحدد AWG حجم الموصل، لا تيارًا " +
    "آمنًا في جميع الحالات؛ فسعة حمل التيار تعتمد أيضًا على المادة والعزل والتبريد وطريقة التركيب والقواعد " +
    "الكهربائية المعمول بها.";
const gaugeTable = getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!;
for (const row of gaugeTable.rows) {
    row[1] = row[1].replace("ملم", "mm");
    row[2] = row[2].replace("ملم", "mm");
    row[3] = row[3].replace("ملم", "mm");
}
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "هذه قيم اسمية؛ فقد تغير تفاوتات التصنيع والطلاءات والعزل والبنية متعددة الشعيرات القطر المقاس أو القطر الكلي.";
const gaugeSpecification = getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification");
gaugeSpecification.bullets![0] = "اذكر النظام، مثل 24 AWG أو 24 SWG بريطاني.";
gaugeSpecification.bullets![1] = "أدرج القطر الاسمي بالملليمترات عندما يحتمل الخلط بين الأنظمة.";
gaugeSpecification.bullets![2] =
    "وضّح هل يخص البعد موصلًا عاريًا أم قطرًا معزولًا أم سماكة صفيحة أم سماكة جدار أنبوب.";
gaugeSpecification.bullets![3] =
    "للموصلات متعددة الشعيرات، اذكر بنية الشعيرات عندما تكون المرونة والقطر الكلي مهمين.";

getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41,800 J / 100 W = 418 s";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "الزمن المثالي نحو 7.0 دقائق؛ وعند كفاءة نقل قدرها 80% يستغرق التسخين نحو 523 ثانية.";

getSection("concept-ohms-law", "unit-conversions").title = "تحويلات الوحدات";
getSection("concept-ohms-law", "worked-examples").examples![1].setup =
    "يوجد فرق جهد مقداره 12 V عبر دائرة تسحب تيارًا قدره 2 A.";
getSection("concept-ohms-law", "limits").paragraphs![0] =
    "قانون أوم نموذج مثالي. وقد تكون المكونات الفعلية غير أومية، فتتغير مقاومتها مع درجة الحرارة أو الجهد أو التيار " +
    "أو التردد أو حالة التشغيل. وللدوائر الموصولة على التوالي أو التوازي، استخدم قوانين كيرشوف مع قانون أوم.";

corrected.concepts["concept-joule-heating"].displayName = "التسخين بتأثير جول";
corrected.concepts["concept-joule-heating"].summary =
    "كيف يحوّل مرور التيار في مقاومة الطاقة الكهربائية إلى حرارة.";
jouleHeatingEffects.bullets![3] =
    "يحدد انتقال الحرارة إلى الهواء والسائل وأجزاء الجهاز درجة الحرارة الفعلية.";

kirchhoffTerms.bullets![0] = "العقدة مجموعة موصلات متصلة من دون مكوّن يفصل بينها.";
kirchhoffTerms.bullets![3] = "لا يوفر التوصيل على التوالي للتيار إلا مسارًا واحدًا عبر المكونات.";
const kirchhoffCells = getSection("concept-kirchhoffs-laws", "cells");
kirchhoffCells.bullets![0] =
    "تُجمع جهود الخلايا الموصولة على التوالي، بينما تظل سعة الأمبير-ساعة مساوية لسعة خلية مماثلة واحدة.";
kirchhoffCells.bullets![1] =
    "تحافظ الخلايا الموصولة على التوازي على الجهد نفسه، بينما تُجمع السعات والتيارات المتاحة تقريبًا.";
kirchhoffCells.bullets![3] =
    "يتطلب شحن خلايا ليثيوم أيون موصولة على التوالي مراقبة كل خلية وتوفير الموازنة أو الحماية المناسبة.";

getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![1] =
    "تعني قيمة TCR السالبة أن المقاومة تنخفض مع ارتفاع درجة الحرارة.";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![3] =
    "استخدم مقياس درجة الحرارة ووحدتها نفسيهما عند حساب الفرق T - T_0.";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "بالنسبة إلى الزاوية θ، يقع الضلع المقابل في مواجهتها، ويلامسها الضلع المجاور من دون أن يكون الوتر، ويقابل " +
    "الوتر الزاوية القائمة. تساعد قاعدة SOH-CAH-TOA على التذكّر: الجيب هو المقابل على الوتر، وجيب التمام هو " +
    "المجاور على الوتر، والظل هو المقابل على المجاور.";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![1] =
    "يُقاس التردد الزاوي ω بالراديان في الثانية.";

getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "يساوي فرق درجة حرارة مقداره 1 K فرقًا مقداره 1 °C.";
getSection("concept-heat-capacity", "worked-example").examples![0].title = "تسخين الماء";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "سخّن المثال الذي يتطلب 41.8 kJ بمصدر قدرة ثابتة قدرها 100 W ومن دون فواقد.";

corrected.concepts["concept-heat-flux"].description =
    "تصف كثافة التدفق الحراري مدى سرعة انتقال الحرارة عبر سطح ما بصرف النظر عن إجمالي كمية المادة التي تخزن الحرارة.";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "يستخدم الحمل الحراري معامل السطح h، ويستخدم الإشعاع معامل الانبعاثية ε وثابت ستيفان–بولتزمان σ. ويجب إدخال " +
    "درجات الحرارة المطلقة بالكلفن في معادلة الإشعاع.";

corrected.concepts["concept-si-system-and-imperial-units"].description =
    "يوفر النظام الدولي للوحدات وحدات أساسية ومشتقة متسقة وبادئات عشرية للحسابات الهندسية.";
decimalPrefixes.headers[2] = "المعامل";
decimalPrefixes.rows[1][0] = "ميغا";
decimalPrefixes.rows[3][0] = "ميكرو";

gaugeConcept.summary = "لماذا يجب ذكر نظام مقياس السلك وقطره مع رقم المقياس.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title = "أنظمة مقاييس الأسلاك";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").title =
    "إرشادات عملية للمواصفات";

getSection("concept-ohms-law", "worked-examples").examples![2].conclusion = "الجهد هو 5 V.";
corrected.concepts["concept-joule-heating"].description =
    "يصف التسخين بتأثير جول تحوّل الطاقة الكهربائية إلى حرارة عند مرور تيار عبر مقاومة.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].title =
    "المقاومات الموصولة على التوازي";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "يساوي المجموع الجبري لارتفاعات الجهد وانخفاضاته حول حلقة مغلقة صفرًا. اختر اتجاهًا للحلقة وحافظ على اتساق " +
    "الأقطاب. يؤدي عكس الاتجاه إلى تغيير الإشارات لا الحل الفيزيائي. ويكون انخفاض الجهد أكبر عبر المقاومة الأكبر " +
    "الموصولة على التوالي، لأن التيار نفسه يمر في جميع المكونات المتوالية.";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "يجب ضبط الحاسبة على وضع الزاوية الصحيح. يؤدي استخدام وضع الدرجات لقيمة بالراديان، أو العكس، إلى نتيجة مختلفة. " +
    "تمثل الدورة الكاملة 360° أو 2π راديان.";

getSection("concept-ohms-law", "unit-conversions").bullets![3] = "1 W = 1,000 mW";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "يحوّل الكويل الطاقة إلى حرارة بمعدل 7.2 جول في الثانية، أي 72 J خلال 10 ثوانٍ.";

export const presentations = corrected as unknown as CatalogPresentationSet;
