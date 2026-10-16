import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./ko";

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
        throw new Error("Korean catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").formulas![0].expression = "V = I × R";
getSection("concept-ohms-law", "relationship").bullets![1] = "I는 전류이며 암페어(A) 단위로 측정됩니다.";
getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4.2 V / 1.0 Ω = 4.2 A";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] =
    "V = 0.5 A × 10 Ω = 5 V";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "옴의 법칙은 전력 관계 P = V × I와 함께 사용합니다. 전력 P는 와트(W) 단위로 측정됩니다."
    + "4.2 V 전원과 1.0 Ω 부하의 이상적인 전력은 17.64 W입니다. 발생한 열을 안전하게 방출하려면 부품에"
    + "충분한 열용량과 안전 여유가 필요합니다.";

getSection("concept-joule-heating", "heating-power").title = "가열 전력";
getSection("concept-joule-heating", "heating-power").formulas![0].expression = "P = V × I";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "코일은 7.2 W의 전력으로 에너지를 열로 변환하며, 10초 동안에는 72 J입니다.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = opposite / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = adjacent / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = opposite / adjacent";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(opposite / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(adjacent / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(opposite / adjacent)";
getSection("concept-trigonometry", "waveforms-and-identities").formulas![0].expression =
    "x(t) = A × sin(2πft + φ)";
getSection("concept-trigonometry", "waveforms-and-identities").formulas![1].expression = "ω = 2πf";
getSection("concept-trigonometry", "waveforms-and-identities").formulas![2].expression =
    "sin^2(θ) + cos^2(θ) = 1";

getSection("concept-heat-capacity", "electrical-heating").formulas![0].expression = "Q = P × t";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41,800 J / 100 W = 418 s";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "이상적인 시간은 약 7.0분입니다. 80%의 전달 효율에서는 약 523 s입니다.";

getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0.020 m² = 5,000 W/m²";
getSection("concept-heat-flux", "convection-and-radiation").formulas![0].expression =
    "q'' = h × (T_s - T_∞)";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "대류에는 대류 계수 h를 사용합니다. 복사에는 방사율 ε과 Stefan–Boltzmann 상수 σ를 사용합니다."
    + "복사 방정식의 온도는 Kelvin 단위의 절대 온도여야 합니다.";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[2][1] = "초";
siBaseUnits.rows[2][2] = "s";
siBaseUnits.rows[4][2] = "A";
siBaseUnits.rows[5][0] = "물질의 양";
siBaseUnits.rows[5][1] = "몰";

getSection("concept-kirchhoffs-laws", "current-law").title = "키르히호프의 전류 법칙";
getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "노드에 8 A가 들어오고 한 분기에서 3 A가 나가면, 나머지 분기에서는 합계 5 A가 나가야 합니다."
    + "계산하기 전에 전류의 방향을 정하세요. 음의 결과는 실제 전류가 가정한 방향과 반대로 흐른다는 뜻입니다.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![0].expression =
    "I_total = I_1 = I_2 = ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![1].expression =
    "R_total = R_1 + R_2 + ...";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![0].expression = "Σ V = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8.0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (series)";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α는 재료의 온도 계수이며 1 / °C 또는 ppm / °C로 표시됩니다.";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "각도 θ에 대해 대변은 각도의 반대편에 있는 변이고, 인접변은 빗변을 제외하고 각도에 맞닿은 변이며,"
    + "빗변은 직각의 반대편에 있는 변입니다. SOH-CAH-TOA는 사인=대변/빗변, 코사인=인접변/빗변,"
    + "탄젠트=대변/인접변을 기억하기 위한 방법입니다.";
getSection("concept-trigonometry", "waveforms-and-identities").title = "파형 및 항등식";
getSection("concept-heat-capacity", "worked-example").title = "풀이 예제";
getSection("concept-heat-capacity", "object-and-material").title = "물체와 재료";
getSection("concept-heat-flux", "convection-and-radiation").formulas![0].expression =
    "q'' = h × (T_s - T_∞)";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "평균 열유속과 국소적인 피크를 구분하세요. 가열이 고르지 않을 수 있습니다.";

const siUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siUnits.rows[0][2] = "m";
siUnits.rows[6][2] = "cd";
const decimalPrefixes = getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!;
decimalPrefixes.rows[0][1] = "k";
decimalPrefixes.rows[2][1] = "m";
decimalPrefixes.rows[4][1] = "n";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 inch = 25.4 mm = 0.0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 foot = 12 inches = 0.3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 yard = 3 feet = 0.9144 m";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0.005 × 92^((36 - n) / 39)";

getSection("concept-ohms-law", "worked-examples").examples![0].setup =
    "4.2 V 전원은 1.0 Ω 부하에 연결됩니다.";
getSection("concept-ohms-law", "worked-examples").examples![1].formulas![0] =
    "R = 12 V / 2 A = 6 Ω";
getSection("concept-ohms-law", "worked-examples").examples![0].conclusion =
    "부하 전류는 4.2 A입니다.";
getSection("concept-ohms-law", "worked-examples").examples![2].conclusion =
    "전압은 5 V입니다.";
getSection("concept-ohms-law", "unit-conversions").bullets![0] = "1 kΩ = 1,000 Ω";

corrected.concepts["concept-joule-heating"].description =
    "줄열은 전류가 저항기를 통해 흐를 때 전기 에너지가 열로 변환되는 것을 말합니다.";
getSection("concept-joule-heating", "what-affects-heating").title = "가열에 영향을 미치는 요인";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0.8 = 7.2 W";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![1] =
    "E = P × t = 7.2 W × 10 s = 72 J";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "키르히호프의 전류 법칙과 전압 법칙은 노드에서의 전하 보존과 폐루프를 따른 에너지 보존을 나타냅니다.";
corrected.concepts["concept-kirchhoffs-laws"].summary =
    "연결된 회로에서 전류와 전압이 보이는 거동.";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "기본 용어를 사용하면 회로도를 더 쉽게 분석할 수 있습니다.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![1] =
    "I_total = 4.0 V / 0.20 Ω = 20 A";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "연립방정식을 풀고 전력 균형을 확인하세요.";

getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "계산 예제";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].title =
    "가열된 저항기";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "1.00 Ω 저항기는 20 °C에서 지정되며 TCR은 400 ppm/°C입니다.";

getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "1 K의 온도차는 1 °C의 온도차와 같은 크기입니다.";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "이상적인 에너지 요구량은 41.8 kJ입니다. 실제 히터에는 열손실이 있으므로 더 많은 에너지가 필요합니다.";
getSection("concept-heat-capacity", "electrical-heating").title = "전력에 의한 가열";

getSection("concept-heat-flux", "worked-example").examples![0].setup =
    "100 W 히터는 0.020 m² 면적을 통해 열을 전달합니다.";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "평균 열유속은 5,000 W/m² 또는 0.5 W/cm²입니다.";

getSection("concept-si-system-and-imperial-units", "base-units").title = "SI 기본 단위";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[1][1] = "M";

getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "1/0, 2/0, 3/0, 4/0의 경우 n = 0, -1, -2, -3을 사용합니다. AWG는 범용 안전 전류가 아닌 도체 크기를 "
    + "결정합니다. 전류용량은 재료, 절연재, 냉각, 설치 및 적용 가능한 전기 규정에 따라 달라집니다.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "키르히호프의 전류 법칙과 전압 법칙은 노드에서 전하가, 닫힌 루프에서 에너지가 보존됨을 설명합니다.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8.0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "저항의 온도 계수는 온도에 따라 부품의 저항이 어떻게 변하는지를 나타냅니다.";
corrected.concepts["concept-heat-flux"].displayName = "열유속 밀도";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "허용 전류는 게이지 번호만이 아니라 제품 데이터와 전기 규정을 기준으로 결정하십시오.";

getSection("concept-kirchhoffs-laws", "current-law").title = "키르히호프의 전류 법칙";
getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0.8 = 7.2 W";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![1] =
    "E = P × t = 7.2 W × 10 s = 72 J";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = 대변 / 빗변";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = 인접변 / 빗변";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = 대변 / 인접변";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(대변 / 빗변)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(인접변 / 빗변)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(대변 / 인접변)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "10 cm 길이의 빗변이 30°의 각도를 만듭니다.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "대변 = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "인접변 = 10 × cos(30°) ≒ 8.66 cm";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (직렬)";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 인치 = 25.4 mm = 0.0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 피트 = 12 인치 = 0.3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 야드 = 3 피트 = 0.9144 m";

export const presentations = corrected as unknown as CatalogPresentationSet;
