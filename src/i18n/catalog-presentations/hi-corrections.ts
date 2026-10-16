import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./hi";

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
    table?: {
        headers: string[];
        rows: string[][];
    };
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
        throw new Error("Hindi catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").formulas![0].expression = "V = I × R";
getSection("concept-ohms-law", "relationship").bullets![1] = "I धारा है, जिसे एम्पीयर (A) में मापा जाता है।";
getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4.2 V / 1.0 Ω = 4.2 A";
getSection("concept-ohms-law", "worked-examples").examples![1].formulas![0] =
    "R = 12 V / 2 A = 6 Ω";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] =
    "V = 0.5 A × 10 Ω = 5 V";
getSection("concept-ohms-law", "electrical-power").formulas![0].expression =
    "P = V × I = I^2 × R = V^2 / R";

corrected.concepts["concept-joule-heating"].displayName = "जूल तापन";
corrected.concepts["concept-joule-heating"].description =
    "जूल तापन बताता है कि प्रतिरोध के माध्यम से धारा बहने पर विद्युत ऊर्जा किस प्रकार ऊष्मा में बदलती है।";
getSection("concept-joule-heating", "heating-power").formulas![0].expression = "P = V × I";
getSection("concept-joule-heating", "heating-power").formulas![1].expression = "P = I^2 × R";
getSection("concept-joule-heating", "heating-power").formulas![2].expression = "P = V^2 / R";
getSection("concept-joule-heating", "practical-checks").title = "व्यावहारिक परीक्षण";

getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
getSection("concept-kirchhoffs-laws", "current-law").formulas![1].expression = "Σ I_in = Σ I_out";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![1].expression =
    "R_total = R_1 + R_2 + ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![0] = "R_total = 0.40 Ω";

getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![0] =
    "α = 400 × 10^-6 / °C = 0.0004 / °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![1] =
    "ΔT = 100 - 20 = 80 °C";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = opposite / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = adjacent / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = opposite / adjacent";

getSection("concept-heat-capacity", "basic-relationships").formulas![0].expression = "C = Q / ΔT";
getSection("concept-heat-capacity", "basic-relationships").formulas![1].expression = "Q = m × c × ΔT";
getSection("concept-heat-capacity", "electrical-heating").formulas![0].expression = "Q = P × t";
getSection("concept-heat-capacity", "phase-changes-and-limits").formulas![0].expression = "Q = m × L";
getSection("concept-joule-heating", "worked-example").title = "उदाहरण सहित समाधान";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "ओम का नियम P = V × I शक्ति-संबंध के साथ उपयोग किया जाता है। शक्ति P को वाट (W) में मापा जाता है। "
    + "4.2 V स्रोत और 1.0 Ω लोड के लिए आदर्श शक्ति 17.64 W है। उत्पन्न ऊष्मा को सुरक्षित रूप से हटाने के लिए "
    + "घटक में पर्याप्त तापधारण क्षमता और सुरक्षा-सीमा होनी चाहिए।";
getSection("concept-kirchhoffs-laws", "current-law").title = "किरचॉफ का धारा नियम";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![2] =
    "R_T = 1.00 [1 + 0.0004 × 80] = 1.032 Ω";
getSection("concept-heat-capacity", "electrical-heating").title = "विद्युत शक्ति से तापन";

getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0.8 = 7.2 W";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![1] =
    "E = P × t = 7.2 W × 10 s = 72 J";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "कुंडल ऊर्जा को 7.2 W की शक्ति से ऊष्मा में बदलता है, अर्थात 10 सेकंड में 72 J।";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "वायु, तरल और उपकरण में ऊष्मा स्थानांतरण वास्तविक तापमान निर्धारित करता है।";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "जांचें कि घटक, कनेक्शन और इन्सुलेशन अपेक्षित धारा और शक्ति को संभाल सकते हैं। पर्याप्त सुरक्षा-मार्जिन रखें, "
    + "क्योंकि वास्तविक घटक असमान रूप से गर्म हो सकते हैं और तापमान के साथ प्रतिरोध बदल सकता है। बैटरियों और "
    + "बिजली आपूर्ति में भी निरंतर धारा सीमाएँ होती हैं।";

getSection("concept-kirchhoffs-laws", "circuit-terms").title = "परिपथ की शब्दावली";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![0] =
    "नोड उन जुड़े हुए चालक का समूह है जिनके बीच कोई घटक नहीं होता।";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "शाखा दो नोड के बीच धारा का एक पथ है।";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![0].expression = "Σ V = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8.0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (समानांतर शाखाएँ)";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "1.00 Ω प्रतिरोध 20 °C पर निर्दिष्ट है, 400 ppm/°C की TCR के साथ।";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].conclusion =
    "अनुमानित प्रतिरोध 1.032 Ω है, जो 20 °C पर इसके मान से लगभग 3.2% अधिक है।";

getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "opposite = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "adjacent = 10 × cos(30°) ≈ 8.66 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(opposite / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(adjacent / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(opposite / adjacent)";
getSection("concept-trigonometry", "waveforms-and-identities").formulas![0].expression =
    "x(t) = A × sin(2πft + φ)";
getSection("concept-trigonometry", "waveforms-and-identities").formulas![2].expression =
    "sin^2(θ) + cos^2(θ) = 1";

corrected.concepts["concept-heat-capacity"].displayName = "ताप क्षमता";
getSection("concept-heat-capacity", "object-and-material").formulas![0].expression =
    "C_total = Σ m_i × c_i";
getSection("concept-heat-capacity", "worked-example").examples![0].formulas![0] =
    "ΔT = 70 - 20 = 50 °C";
getSection("concept-heat-capacity", "worked-example").examples![0].formulas![1] =
    "Q = 0.20 × 4,180 × 50 = 41,800 J";

corrected.concepts["concept-ohms-law"].displayName = "ओम का नियम";
getSection("concept-ohms-law", "relationship").title = "संबंध";
getSection("concept-ohms-law", "relationship").bullets![2] =
    "R प्रतिरोध है, जिसे ओम (Ω) में मापा जाता है।";
getSection("concept-ohms-law", "rearranged-formulas").paragraphs![0] =
    "उस संस्करण का उपयोग करें जो आपको ज्ञात करना वाला मान बाईं ओर रखता है:";

getSection("concept-joule-heating", "heating-power").title = "तापन शक्ति";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "प्रतिरोध का तापमान गुणांक बताता है कि किसी सामग्री के गर्म या ठंडा होने पर उसका प्रतिरोध कैसे बदलता है।";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").title =
    "धनात्मक और ऋणात्मक TCR";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![0] =
    "धनात्मक TCR का अर्थ है कि तापमान बढ़ने पर प्रतिरोध बढ़ता है; कई धातुएँ इसी तरह व्यवहार करती हैं।";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "समाधान सहित उदाहरण";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "किसी कोण θ के सामने वाली भुजा विपरीत भुजा है, आसन्न भुजा कर्ण को छोड़कर कोण को छूती है, और कर्ण समकोण के "
    + "सामने होता है। SOH-CAH-TOA एक स्मृति-सहायक है: sine = विपरीत भुजा/कर्ण, cosine = आसन्न भुजा/कर्ण, और "
    + "tangent = विपरीत भुजा/आसन्न भुजा।";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "एक भुजा ज्ञात करें";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "10 सेमी लंबा कर्ण 30° का कोण बनाता है।";

corrected.concepts["concept-heat-capacity"].displayName = "ऊष्मा धारिता";
getSection("concept-heat-capacity", "basic-relationships").title = "बुनियादी संबंध";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "41.8 kJ वाले उदाहरण को 100 W के स्थिर स्रोत से बिना किसी हानि के गर्म करें।";
getSection("concept-heat-capacity", "object-and-material").title = "वस्तु और पदार्थ";
getSection("concept-heat-capacity", "phase-changes-and-limits").title =
    "प्रावस्था परिवर्तन और व्यावहारिक सीमाएँ";

corrected.concepts["concept-heat-flux"].displayName = "ऊष्मा प्रवाह घनत्व";
corrected.concepts["concept-heat-flux"].description =
    "ऊष्मा प्रवाह घनत्व बताता है कि प्रति इकाई क्षेत्रफल ऊष्मा कितनी तेजी से स्थानांतरित होती है, चाहे ऊष्मा संग्रहीत "
    + "करने वाले पदार्थ की कुल मात्रा कुछ भी हो।";
corrected.concepts["concept-heat-flux"].summary = "प्रति इकाई क्षेत्रफल ऊष्मा स्थानांतरण की दर।";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' W/m² में ऊष्मा-प्रवाह घनत्व है।";
getSection("concept-heat-flux", "worked-example").title = "समाधान सहित उदाहरण";
getSection("concept-heat-flux", "worked-example").examples![0].setup =
    "एक 100 W हीटर 0.020 m² क्षेत्रफल से ऊष्मा स्थानांतरित करता है।";
getSection("concept-heat-flux", "conduction").bullets![2] =
    "L परत की मोटाई मीटर में है।";

getSection("concept-si-system-and-imperial-units", "base-units").title = "मूल एसआई इकाइयाँ";

getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "1/0, 2/0, 3/0 और 4/0 के लिए n = 0, -1, -2 और -3 का उपयोग करें। AWG चालक का आकार निर्धारित करता है, "
    + "सार्वभौमिक सुरक्षित धारा का नहीं; धारा-वहन क्षमता सामग्री, इन्सुलेशन, शीतलन, स्थापना और लागू विद्युत नियमों "
    + "पर भी निर्भर करती है।";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").title = "व्यावहारिक विनिर्देशन";

corrected.concepts["concept-ohms-law"].description =
    "ओम का नियम विद्युत परिपथ में वोल्टेज, धारा और प्रतिरोध के बीच संबंध बताता है।";
corrected.concepts["concept-ohms-law"].summary = "वोल्टेज, धारा और प्रतिरोध के बीच संबंध।";
getSection("concept-ohms-law", "unit-conversions").bullets![3] = "1 W = 1,000 mW";
getSection("concept-ohms-law", "limits").paragraphs![0] =
    "ओम का नियम एक आदर्श मॉडल है। वास्तविक घटक गैर-ओमिक हो सकते हैं: उनका प्रतिरोध तापमान, वोल्टेज, धारा, आवृत्ति या "
    + "संचालन की स्थिति के साथ बदल सकता है। श्रृंखला और समानांतर नेटवर्क के लिए ओम के नियम के साथ किरचॉफ के नियमों "
    + "का उपयोग करें।";

corrected.concepts["concept-joule-heating"].description =
    "जूल तापन बताता है कि प्रतिरोध के माध्यम से धारा बहने पर विद्युत ऊर्जा किस प्रकार ऊष्मा में बदलती है।";
getSection("concept-joule-heating", "heating-power").paragraphs![0] = "विद्युत तापन शक्ति का वर्णन इन संबंधों से किया जाता है:";
getSection("concept-joule-heating", "heating-power").bullets![2] =
    "I धारा है, जिसे एम्पीयर (A) में मापा जाता है।";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "एक 0.8 Ω कुंडल में 3 A धारा बहती है।";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "जांचें कि घटक, कनेक्शन और इन्सुलेशन अपेक्षित धारा और शक्ति को संभाल सकते हैं। पर्याप्त सुरक्षा-मार्जिन रखें, "
    + "क्योंकि वास्तविक घटक असमान रूप से गर्म हो सकते हैं और तापमान के साथ प्रतिरोध बदल सकता है। बैटरियों और बिजली "
    + "आपूर्ति में भी निरंतर धारा सीमाएँ होती हैं।";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "किरचॉफ के धारा और वोल्टेज नियम परिपथ के नोडों और बंद पाशों में संरक्षण संबंधों का वर्णन करते हैं।";
corrected.concepts["concept-kirchhoffs-laws"].summary = "जुड़े हुए परिपथ में धारा और वोल्टेज का व्यवहार।";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "यदि 8 A किसी नोड में प्रवेश करती है और एक शाखा 3 A बाहर ले जाती है, तो शेष शाखाएँ मिलकर 5 A बाहर ले जानी चाहिए। "
    + "हल करने से पहले धारा की दिशाएँ चुनें; ऋणात्मक परिणाम का अर्थ है कि वास्तविक धारा कल्पित दिशा के विपरीत बहती है।";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![0].expression =
    "I_total = I_1 = I_2 = ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![2].expression =
    "I_total = I_1 + I_2 + ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![3].expression =
    "1 / R_total = 1 / R_1 + 1 / R_2 + ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![1] =
    "I = 8.0 V / 0.40 Ω = 20 A";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![0] =
    "R_total = 0.20 Ω";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![1] =
    "I_total = 4.0 V / 0.20 Ω = 20 A";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![1] =
    "स्वतंत्र नोडों पर KCL और स्वतंत्र पाशों के चारों ओर KVL लागू करें।";

getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α सामग्री का तापमान गुणांक है, जिसे 1/°C या ppm/°C में व्यक्त किया जाता है।";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";

getSection("concept-heat-capacity", "electrical-heating").formulas![0].expression = "Q = P × t";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41,800 J / 100 W = 418 s";

getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows![3][0] = "माइक्रो";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows![4][2] =
    "0.000000001 = 10^-9";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "किर्चहॉफ के धारा और वोल्टेज नियम नोड पर आवेश तथा बंद लूप में ऊर्जा के संरक्षण को स्पष्ट करते हैं।";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8.0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "प्रतिरोध का तापमान गुणांक बताता है कि किसी घटक का प्रतिरोध तापमान के साथ कैसे बदलता है।";
corrected.concepts["concept-heat-flux"].displayName = "ताप-प्रवाह घनत्व";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "धारा-वहन क्षमता का निर्धारण केवल गेज संख्या से नहीं, बल्कि उत्पाद डेटा और विद्युत नियमों से करें।";

getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
getSection("concept-kirchhoffs-laws", "current-law").formulas![1].expression = "Σ I_in = Σ I_out";

getSection("concept-ohms-law", "worked-examples").title = "समाधान सहित उदाहरण";
getSection("concept-ohms-law", "worked-examples").examples![0].title = "धारा ज्ञात करें";
getSection("concept-ohms-law", "worked-examples").examples![0].conclusion =
    "लोड धारा 4.2 A है।";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![1].expression =
    "P = V^2 / R = I^2 × R";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = विपरीत भुजा / कर्ण";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = आसन्न भुजा / कर्ण";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = विपरीत भुजा / आसन्न भुजा";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(विपरीत भुजा / कर्ण)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(आसन्न भुजा / कर्ण)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(विपरीत भुजा / आसन्न भुजा)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "विपरीत भुजा = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "आसन्न भुजा = 10 × cos(30°) ≈ 8.66 cm";

getSection("concept-heat-capacity", "worked-example").title = "समाधान सहित उदाहरण";

getSection("concept-si-system-and-imperial-units", "base-units").table!.rows![0][2] = "m";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows![1][2] = "kg";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows![2][2] = "s";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows![3][2] = "K";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows![4][2] = "A";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows![5][2] = "mol";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows![6][2] = "cd";
getSection("concept-si-system-and-imperial-units", "base-units").bullets = [
    "वोल्टेज: वोल्ट (V)।",
    "प्रतिरोध: ओम (Ω)।",
    "शक्ति: वाट (W)।",
    "ऊर्जा: जूल (J)।",
    "बल: न्यूटन (N)।",
    "दबाव: पास्कल (Pa)।",
    "आवृत्ति: हर्ट्ज़ (Hz)।",
];
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows![0][1] = "k";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows![1][1] = "M";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows![2][1] = "m";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows![3][1] = "μ";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows![4][1] = "n";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets = [
    "1 lb ≈ 0.45359237 kg।",
    "1 lbf ≈ 4.44822 N।",
    "1 psi ≈ 6,894.76 Pa।",
    "°F = °C × 9/5 + 32।",
    "°C = (°F - 32) × 5/9।",
    "K = °C + 273.15।",
];
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "पाउंड द्रव्यमान (lb) या बल (lbf) को दर्शा सकता है; ये अलग-अलग राशियाँ हैं। इसी तरह, इंच, वर्ग इंच और घन इंच "
    + "अलग-अलग आयामों को मापते हैं।";

getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0.005 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![1].expression =
    "d_mm = 0.127 × 92^((36 - n) / 39)";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![2].expression =
    "A = π × d^2/4";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").formulas![0].expression =
    "R = ρ × L / A";

getSection("concept-kirchhoffs-laws", "cells").title =
    "श्रृंखला और समानांतर में सेल";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "समानांतर सेल का वोल्टेज समान रहता है, जबकि क्षमता और उपलब्ध करंट लगभग जुड़ जाते हैं।";
getSection("concept-ohms-law", "unit-conversions").bullets![1] =
    "1 MΩ = 1,000,000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![2] =
    "1 mA = 0.001 A";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "समान शाखा प्रतिरोध के साथ, प्रत्येक शाखा 10 A वहन करती है।";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "10 cm लंबा कर्ण 30° का कोण बनाता है।";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "c = 4,180 J/(kg·K) का उपयोग करके 0.20 kg पानी को 20 °C से 70 °C तक गर्म करें।";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].setup =
    "0.1 इंच को मिलीमीटर और 5 mm को इंच में बदलें।";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![0] =
    "0.1 इंच × 25.4 = 2.54 mm";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].formulas![1] =
    "5 mm / 25.4 ≈ 0.19685 इंच";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[0][1] =
    "2.588 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[0][2] =
    "3.251 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[0][3] =
    "3.404 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[1][1] =
    "0.8128 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[1][2] =
    "0.9144 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[1][3] =
    "0.8890 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[2][1] =
    "0.2540 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[2][2] =
    "0.3150 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.rows[2][3] =
    "0.3048 mm";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "प्रतिरोध कंडक्टर की लंबाई L, क्रॉस-अनुभागीय क्षेत्र A और सामग्री प्रतिरोधकता ρ पर "
    + "निर्भर करता है। क्योंकि क्षेत्रफल व्यास के वर्ग के साथ बदलता रहता है, व्यास का मामूली "
    + "अंतर प्रतिरोध में पर्याप्त अंतर ला सकता है। AWG में, गेज को तीन आकारों तक बढ़ाने से "
    + "क्षेत्र लगभग आधा हो जाता है और समान सामग्री और तापमान के लिए प्रति इकाई लंबाई में "
    + "प्रतिरोध दोगुना हो जाता है।";
getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "शून्य Ω का प्रतिरोध एक आदर्श शॉर्ट सर्किट है और इसे अलग से संभाला जाना चाहिए।";
getSection("concept-ohms-law", "worked-examples").examples![0].setup =
    "एक 4.2 V स्रोत 1.0 Ω लोड से जुड़ा है।";
getSection("concept-ohms-law", "worked-examples").examples![1].conclusion =
    "सर्किट प्रतिरोध 6 Ω है।";
getSection("concept-ohms-law", "worked-examples").examples![2].setup =
    "10 Ω प्रतिरोध से 0.5 A धारा प्रवाहित होती है।";
getSection("concept-ohms-law", "unit-conversions").bullets![0] =
    "1 kΩ = 1,000 Ω";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].setup =
    "श्रृंखला में दो 0.20 Ω प्रतिरोधक 8.0 V से जुड़े हुए हैं।";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].setup =
    "दो बराबर 0.40 Ω शाखाएँ 4.0 V से जुड़ी हैं।";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").paragraphs![0] =
    "उदाहरण के लिए, 2.2 kΩ 2,200 Ω के बराबर है, और 15 mA 0.015 A के बराबर है। सूत्र का "
    + "उपयोग करने से पहले मानों को संगत इकाइयों में परिवर्तित करें।";

getSection("concept-ohms-law", "rearranged-formulas").paragraphs![0] =
    "वह सूत्र चुनें जिसमें ज्ञात किया जाने वाला मान बाईं ओर हो:";
getSection("concept-kirchhoffs-laws", "cells").bullets![2] =
    "करंट का बँटवारा आंतरिक प्रतिरोध, संपर्कों, वायरिंग और स्विचों पर निर्भर करता है।";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![0] =
    "नोड वोल्टेज, शाखाओं के करंट और करंट की मानी गई दिशाएँ चिह्नित करें।";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "प्रतिरोधक के वोल्टेज और करंट को V = I × R से संबंधित करें।";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "सरलीकृत मॉडल में सेल का आंतरिक प्रतिरोध, संपर्क प्रतिरोध, कनवर्टर दक्षता, तापमान के "
    + "प्रभाव, क्षणिक व्यवहार, सुरक्षा परिपथ और घटकों की सहनशीलता छूट सकती है। उच्च करंट वाले "
    + "परिपथ पर महत्वपूर्ण प्रभाव डालने वाले हर छूटे हुए व्यवहार को शामिल करें।";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![2] =
    "शून्य के करीब TCR का अर्थ है कि निर्दिष्ट तापमान रेंज में प्रतिरोध बहुत कम बदलता है।";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "स्थिर वोल्टेज पर चलने वाले धनात्मक TCR वाले प्रतिरोध का तापमान बढ़ने पर प्रतिरोध बढ़ता "
    + "है और करंट घटने की प्रवृत्ति होती है। स्थिर करंट स्रोत के साथ प्रतिरोध में यही वृद्धि "
    + "पावर बढ़ाती है।";
corrected.concepts["concept-si-system-and-imperial-units"].displayName =
    "SI प्रणाली और इम्पीरियल माप";

corrected.concepts["concept-trigonometry"].description =
    "त्रिकोणमिति कोणों और लंबाइयों के बीच संबंध बताती है तथा सदिशों, कला-संबंधों और "
    + "तरंगरूपों के लिए उपयोगी है।";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![0] =
    "A आयाम है, f हर्ट्ज़ में आवृत्ति है, t सेकंड में समय है और φ कला कोण है।";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![2] =
    "दिशा या कला महत्वपूर्ण हो तो चिह्न और चतुर्थांश का ध्यान रखें।";
getSection("concept-trigonometry", "waveforms-and-identities").title =
    "तरंगरूप और उपयोगी सर्वसमिकाएँ";
getSection("concept-heat-capacity", "basic-relationships").bullets![1] =
    "Q स्थानांतरित ऊष्मा ऊर्जा है, जिसे जूल (J) में मापा जाता है।";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "आदर्श ऊर्जा आवश्यकता 41.8 kJ है; हानियों के कारण वास्तविक हीटर को अधिक ऊर्जा चाहिए।";
getSection("concept-heat-flux", "definition").bullets![2] =
    "A उस सतह का क्षेत्रफल है जिससे ऊष्मा स्थानांतरित होती है; इसे वर्ग मीटर (m²) में मापा "
    + "जाता है।";
getSection("concept-heat-flux", "conduction").title =
    "सपाट परत से ऊष्मा चालन";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "संवहन में सतह गुणांक h का उपयोग होता है। विकिरण में उत्सर्जकता ε और "
    + "स्टीफ़न–बोल्ट्ज़मैन नियतांक σ का उपयोग होता है; विकिरण समीकरण में तापमान केल्विन में "
    + "परम ताप होना चाहिए।";
getSection("concept-si-system-and-imperial-units", "base-units").title =
    "सामान्य SI इकाइयाँ";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[2][1] =
    "सेकंड";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[5][1] =
    "मोल";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].conclusion =
    "क्षेत्रफल और आयतन के रूपांतरण में लंबाई के रूपांतरण गुणक की संबंधित घात ली जाती है।";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![3] =
    "संख्याओं को केवल अंत में राउंड करें, ताकि बीच के परिणामों की उपयोगी परिशुद्धता बनी रहे।";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "सामान्यतः बड़ी गेज संख्या का अर्थ छोटा व्यास होता है; गेज 0 से बड़े आकारों के लिए 00, "
    + "000 या 0000 का उपयोग होता है।";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "ये मान नाममात्र हैं। उत्पाद की सहनशीलता, कोटिंग, इन्सुलेशन और कई तारों से बनी संरचना "
    + "मापे गए या कुल व्यास को बदल सकती है।";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "कई तारों से बने चालकों में, जहाँ लचीलापन और कुल व्यास महत्वपूर्ण हों, वहाँ तारों की "
    + "संरचना भी बताएँ।";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "एक 0.8 Ω कॉइल में 3 A धारा बहती है।";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "कॉइल ऊर्जा को 7.2 जूल प्रति सेकंड की दर से ऊष्मा में बदलती है, अर्थात 10 सेकंड में 72 J।";
corrected.concepts["concept-joule-heating"].summary =
    "विद्युत धारा बहने पर विद्युत ऊर्जा ऊष्मा में कैसे बदलती है।";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "विद्युत शक्ति ऊर्जा स्थानांतरण की दर है, तापमान नहीं। ऊष्मा क्षमता और ऊष्मा प्रवाह "
    + "घनत्व यह निर्धारित करते हैं कि वह ऊर्जा तापमान को कैसे बदलती है और कितनी जल्दी सतह को "
    + "छोड़ देती है।";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "ऊष्मा प्रवाह घनत्व ऊष्मा क्षमता से भिन्न होता है: ऊष्मा क्षमता प्रति तापमान परिवर्तन "
    + "के अनुसार संग्रहीत ऊर्जा का वर्णन करती है, जबकि ऊष्मा प्रवाह घनत्व उस दर का वर्णन करता "
    + "है जिस पर ऊष्मा किसी सतह को पार करती है।";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "हीटर का औसत ताप-प्रवाह घनत्व";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "औसत ताप-प्रवाह घनत्व 5,000 W/m², या 0.5 W/cm² है।";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "स्थानीय शिखर से औसत ताप-प्रवाह घनत्व को अलग करें; हीटिंग असमान हो सकता है.";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "ऊष्मा प्रवाह घनत्व एक स्थानांतरण दर है, तापमान नहीं; तापमान परिवर्तन के लिए ताप क्षमता "
    + "का उपयोग करें।";

export const presentations = corrected as unknown as CatalogPresentationSet;
