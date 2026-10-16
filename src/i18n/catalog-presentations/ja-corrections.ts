import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./ja";

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
        throw new Error("Japanese catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").bullets![1] = "I は電流で、アンペア (A) 単位で測定されます。";
getSection("concept-ohms-law", "worked-examples").examples![0].title = "電流を求める";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] =
    "V = 0.5 A × 10 Ω = 5 V";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "オームの法則は電力の関係 P = V × I と組み合わせて使います。電力 P はワット (W) で表します。"
    + "4.2 V の電源と 1.0 Ω の負荷では、理想的な電力は 17.64 W です。発生した熱を安全に放散するため、"
    + "部品には十分な熱容量と安全余裕が必要です。";

getSection("concept-joule-heating", "heating-power").title = "加熱電力";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "コイルは 7.2 W の電力でエネルギーを熱に変換し、10 秒間では 72 J になります。";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "空気、液体、機器への熱伝達によって実際の温度が決まります。";

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

getSection("concept-heat-capacity", "basic-relationships").title = "基本的な関係";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41,800 J / 100 W = 418 s";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "理想的な時間は約 7.0 分です。80% の伝達効率では約 523 s です。";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "融解または沸騰中は、供給されたエネルギーによって温度を変えずに材料の相を変化させることがあります。"
    + "L は J/kg 単位の比潜熱です。";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "単純な式では比熱容量がほぼ一定だと仮定します。熱損失、対流、放射、蒸発、接触抵抗、不均一な温度により、"
    + "実際の結果は理想値と異なることがあります。";

getSection("concept-heat-flux", "worked-example").examples![0].title = "ヒーターの平均熱流束";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0.020 m² = 5,000 W/m²";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "対流では対流係数 h を使います。放射では放射率 ε と Stefan–Boltzmann 定数 σ を使います。"
    + "放射の式に入れる温度は Kelvin 単位の絶対温度でなければなりません。";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[2][1] = "秒";
siBaseUnits.rows[4][2] = "A";
siBaseUnits.rows[5][0] = "物質量";
siBaseUnits.rows[5][1] = "モル";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![3].expression =
    "1 in² = 645.16 mm²";

corrected.concepts["concept-joule-heating"].summary =
    "電流が電気エネルギーを熱に変える仕組み。";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "0.8 Ω のコイルに 3 A の電流が流れます。";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "部品、接続、絶縁が予想される電流と電力に対応できることを確認してください。実際の部品は不均一に "
    + "加熱され、抵抗は温度によって変化する可能性があるため、十分な安全余裕を確保してください。"
    + "バッテリーと電源にも連続電流の制限があります。";

getSection("concept-kirchhoffs-laws", "current-law").title = "キルヒホッフの電流則";
getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "ノードに 8 A が流れ込み、1 つの分岐から 3 A が流れ出る場合、残りの分岐からは合計 5 A が流れ出る "
    + "必要があります。解く前に電流の向きを選び、負の結果が出た場合は実際の電流が仮定した向きと逆に "
    + "流れることを意味します。";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![0] =
    "R_total = 0.40 Ω";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![0].expression = "Σ V = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8.0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "閉ループに沿った電圧の上昇と降下の代数和はゼロです。1 つのループ方向を選び、極性を一貫させて "
    + "ください。方向を反転すると符号は変わりますが、物理的な解は変わりません。直列抵抗が大きいほど、"
    + "同じ電流が各直列部品を流れるため電圧降下も大きくなります。";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (series)";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "リチウムイオンセルを直列で充電するには、セル単位の監視と適切なバランス調整または保護が必要です。";

getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α は材料の温度係数で、1 / °C または ppm / °C で表されます。";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![3] =
    "温度差 T - T_0 には、同じ温度尺度と単位を使用する必要があります。";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "20 °C で 1.00 Ω の抵抗が指定され、TCR は 400 ppm/°C です。";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "角度 θ に対して、対辺は角度の向かい側、隣辺は角度に接する辺（斜辺を除く）、斜辺は直角の向かい側 "
    + "です。SOH-CAH-TOA は、正弦が対辺/斜辺、余弦が隣辺/斜辺、正接が対辺/隣辺であることを覚えるための "
    + "語呂合わせです。";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "opposite = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "adjacent = 10 × cos(30°) ≈ 8.66 cm";
getSection("concept-trigonometry", "waveforms-and-identities").title = "波形と恒等式";

getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "理想的なエネルギー要件は 41.8 kJ です。実際のヒーターでは熱損失があるため、より多くのエネルギーが "
    + "必要です。";
getSection("concept-heat-capacity", "object-and-material").title = "物体と材料";

const siBase = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBase.rows[0] = ["長さ", "メートル", "m"];
siBase.rows[1][0] = "質量";
siBase.rows[6][2] = "cd";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[2][1] = "m";

getSection("concept-ohms-law", "worked-examples").examples![0].conclusion =
    "負荷電流は 4.2 A です。";
getSection("concept-ohms-law", "worked-examples").examples![1].conclusion =
    "回路抵抗は 6 Ω です。";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] =
    "V = 0.5 A × 10 Ω = 5 V";
getSection("concept-ohms-law", "unit-conversions").bullets![0] = "1 kΩ = 1,000 Ω";

corrected.concepts["concept-joule-heating"].description =
    "ジュール加熱は、電流が抵抗器を流れるときに電気エネルギーが熱へ変換されることを表します。";
getSection("concept-joule-heating", "heating-power").paragraphs![0] =
    "電気による加熱電力は次の式で表されます。";
getSection("concept-joule-heating", "what-affects-heating").title = "加熱に影響する要因";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "キルヒホッフの電流則と電圧則は、ノードでの電荷保存と閉ループに沿ったエネルギー保存を表します。";
corrected.concepts["concept-kirchhoffs-laws"].summary =
    "接続された回路における電流と電圧の振る舞い。";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "基本的な用語を使うと、回路図を分析しやすくなります。";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![0] =
    "R_total = 0.20 Ω";

getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "計算例";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].title =
    "加熱された抵抗器";

getSection("concept-trigonometry", "finding-sides-and-angles").title = "未知の辺と角度を求める";

getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "熱容量は物体全体に属し、存在する材料の量によって異なります。比熱容量は材料の特性です。質量が 2 倍に "
    + "なると、同じ材料の熱容量も 2 倍になります。";
getSection("concept-heat-flux", "definition").bullets![1] =
    "Q_dot は熱の総移動率で、ワット (W) 単位で表します。";

getSection("concept-si-system-and-imperial-units", "base-units").title = "SI基本単位";
getSection("concept-si-system-and-imperial-units", "base-units").table!.headers[2] = "記号";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").title = "10進接頭辞";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.headers[0] = "接頭辞";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 インチ = 25.4 mm = 0.0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 フィート = 12 インチ = 0.3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 ヤード = 3 フィート = 0.9144 m";
getSection("concept-si-system-and-imperial-units", "other-conversions").bullets![5] =
    "K = °C + 273.15。";

getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0.005 × 92^((36 - n) / 39)";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "キルヒホッフの電流則と電圧則は、節点での電荷保存と閉じたループでのエネルギー保存を説明します。";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8.0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "抵抗の温度係数は、温度によって部品の抵抗がどのように変化するかを表します。";
corrected.concepts["concept-heat-flux"].displayName = "熱流束密度";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "許容電流はゲージ番号だけでなく、製品データと電気規則に基づいて決めてください。";

getSection("concept-kirchhoffs-laws", "current-law").title = "キルヒホッフの電流則";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "ノードに 8 A が流れ込み、1 つの枝から 3 A が流れ出る場合、残りの枝から合計 5 A が流れ出る必要があります。" +
    "解く前に電流の向きを決めてください。負の結果は、実際の電流が仮定した向きとは逆に流れることを意味します。";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = 対辺 / 斜辺";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = 隣辺 / 斜辺";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = 対辺 / 隣辺";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(対辺 / 斜辺)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(隣辺 / 斜辺)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(対辺 / 隣辺)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "対辺 = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "隣辺 = 10 × cos(30°) ≈ 8.66 cm";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (直列)";

export const presentations = corrected as unknown as CatalogPresentationSet;
