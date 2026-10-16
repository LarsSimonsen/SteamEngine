import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./zh-Hans";

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
        throw new Error("Simplified Chinese catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "worked-examples").examples![0].title = "查找电流";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4.2 V / 1.0 Ω = 4.2 A";
getSection("concept-ohms-law", "worked-examples").examples![1].title = "查找电阻";
getSection("concept-ohms-law", "worked-examples").examples![1].formulas![0] =
    "R = 12 V / 2 A = 6 Ω";
getSection("concept-ohms-law", "worked-examples").examples![2].formulas![0] =
    "V = 0.5 A × 10 Ω = 5 V";
getSection("concept-ohms-law", "electrical-power").title = "电功率";
getSection("concept-ohms-law", "unit-conversions").bullets![1] = "1 MΩ = 1,000,000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![2] = "1 mA = 0.001 A";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "线圈以 7.2 W 的功率将能量转化为热量；10 秒内转化的能量为 72 J。";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "分支是两个节点之间的电流路径。";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "如果 8 A 电流进入一个节点，而一个分支带走 3 A，其他分支总共必须带走 5 A。求解前先选择电流方向；"
    + "负结果表示实际电流方向与假设方向相反。";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![0].expression = "I_total = I_1 = I_2 = ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![1].expression = "R_total = R_1 + R_2 + ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![2].expression = "I_total = I_1 + I_2 + ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![3].expression =
    "1 / R_total = 1 / R_1 + 1 / R_2 + ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![1] =
    "I_total = 4.0 V / 0.20 Ω = 20 A";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8.0 V - V_1 - V_2 = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (parallel branches)";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (series)";
getSection("concept-kirchhoffs-laws", "cells").formulas![1].expression =
    "C_pack = C_1 + C_2 + ... (parallel)";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0.020 m² = 5,000 W/m²";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[0][1] = "米";
siBaseUnits.rows[0][2] = "m";
siBaseUnits.rows[1][0] = "质量";
siBaseUnits.rows[1][1] = "千克";
siBaseUnits.rows[1][2] = "kg";
siBaseUnits.rows[4][2] = "A";
siBaseUnits.rows[5][1] = "摩尔";
siBaseUnits.rows[5][2] = "mol";
siBaseUnits.rows[6][2] = "cd";

getSection("concept-ohms-law", "rearranged-formulas").title = "变形公式";
getSection("concept-ohms-law", "worked-examples").title = "示例";
getSection("concept-ohms-law", "worked-examples").examples![0].setup =
    "4.2 V 电源连接到 1.0 Ω 负载。";
getSection("concept-ohms-law", "worked-examples").examples![0].conclusion =
    "负载电流为 4.2 A。";
getSection("concept-ohms-law", "worked-examples").examples![2].setup =
    "0.5 A 电流流过 10 Ω 电阻。";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "欧姆定律与功率公式 P = V × I 结合使用。功率 P 的单位是瓦特（W）。对于 4.2 V 电源和 1.0 Ω 负载，"
    + "理想功率为 17.64 W。元件需要足够的散热能力和适当的安全裕量，才能安全地散去产生的热量。";
corrected.concepts["concept-joule-heating"].summary =
    "电流如何将电能转化为热量。";
getSection("concept-joule-heating", "heating-power").title = "发热功率";
getSection("concept-joule-heating", "worked-example").title = "示例";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "一根电阻为 0.8 Ω 的线圈中通过 3 A 电流。";
getSection("concept-joule-heating", "what-affects-heating").title = "影响发热的因素";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "向空气、液体和设备的传热决定实际温度。";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "电功率是能量传递的速率，而不是温度。热容量和热流密度决定这些能量如何改变温度，以及热量从表面传出的速度。";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "检查元件、连接和绝缘层是否能够承受预期的电流和功率。使用适当的安全裕量，因为实际元件可能受热不均，"
    + "电阻也可能随温度变化。电池和电源同样有连续电流限制。";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "了解以下基本术语有助于分析电路图：";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "如果 8 A 电流流入一个节点，而一个分支流出 3 A，则其余分支必须总共流出 5 A。求解前先假定电流方向；"
    + "负结果表示实际电流方向与假定方向相反。";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].setup =
    "两个 0.20 Ω 电阻串联后接到 8.0 V 电源。";
getSection("concept-kirchhoffs-laws", "cells").title = "电池串联和并联";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "串联电池的电压相加，而安时容量与单个相同电池保持一致。";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "并联电池保持相同电压，而容量和可用电流大致相加。";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "串联锂离子电池充电需要进行单体级监控，并配备适当的均衡或保护。";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "简化模型可能忽略电池内阻、接触电阻、转换器效率、温度影响、瞬态行为、保护电路和元件容差。对于大电流电路，"
    + "应纳入所有会产生重大影响的遗漏因素。";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![0] =
    "R_0 是参考温度 T_0 下的电阻。";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "相对于角 θ，对边位于角的正对面，邻边与角相邻但不是斜边，斜边位于直角的对面。SOH-CAH-TOA 有助于记忆："
    + "正弦等于对边除以斜边，余弦等于邻边除以斜边，正切等于对边除以邻边。";

getSection("concept-ohms-law", "relationship").bullets![1] = "I 是电流，单位为安培（A）。";
getSection("concept-ohms-law", "limits").paragraphs![0] =
    "欧姆定律是一个理想化模型。实际元件可能不是欧姆元件：其电阻可能随温度、电压、电流、频率或工作状态变化。"
    + "对于串联和并联网络，应将基尔霍夫定律与欧姆定律结合使用。";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "基尔霍夫电流定律和电压定律描述节点处的电荷守恒，以及闭合回路中的能量守恒。";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![4] =
    "并联连接将各分支连接到相同的两个节点。";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "闭合回路中电压上升和电压下降的代数和为零。选择一个回路方向并保持极性一致。改变方向会改变符号，但不会改变物理解。"
    + "串联电阻越大，压降越大，因为相同的电流流过每个串联元件。";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "用 V = I × R 关联电阻两端的电压和电流。";

getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![3] =
    "计算差值 T - T_0 时，温度必须采用相同的温标和单位。";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "制造商给出的 TCR 通常适用于规定的温度和电阻范围。温度梯度、材料性质变化、接触、机械应变和自热可能使实际结果与一阶估计不同。";

getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "求边长";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "计算器必须处于正确的角度模式。对弧度值使用度数模式（反之亦然）会得到不同结果。一个完整旋转是 360° 或 2π 弧度。";

getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "理想能量需求为 41.8 kJ；由于存在热损失，实际加热器需要更多能量。";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "在熔化或沸腾过程中，输入能量可以改变材料的相态而不改变温度。L 是单位质量的潜热，单位为 J/kg。";
getSection("concept-heat-capacity", "electrical-heating").title = "电加热";

corrected.concepts["concept-heat-flux"].displayName = "热流密度";
corrected.concepts["concept-heat-flux"].description =
    "热流密度描述热量通过每单位面积传递的速率，与储存热量的材料总量无关。";
getSection("concept-heat-flux", "definition").bullets![0] = "q'' 是热流密度，单位为 W/m²。";
getSection("concept-heat-flux", "worked-example").title = "加热器平均热流密度";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "平均热流密度为 5,000 W/m²，即 0.5 W/cm²。";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "对流使用对流系数 h。辐射使用发射率 ε 和 Stefan–Boltzmann 常数 σ；辐射方程中的温度必须是以开尔文表示的绝对温度。";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "热流是一种传递速率，而不是温度；使用热容量计算温度变化。";

getSection("concept-si-system-and-imperial-units", "base-units").title = "SI 基本单位";
getSection("concept-si-system-and-imperial-units", "base-units").table!.headers[2] = "符号";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[0][0] = "千";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[1][1] = "M";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[2][1] = "m";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "基尔霍夫电流定律和电压定律说明节点处电荷守恒以及闭合回路中能量守恒。";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8.0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "电阻温度系数描述元件的电阻如何随温度变化。";
corrected.concepts["concept-heat-flux"].displayName = "热流密度";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "应根据产品数据和电气规范确定载流能力，而不能只依据线规编号。";

getSection("concept-ohms-law", "unit-conversions").bullets![1] = "1 MΩ = 1,000,000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![2] = "1 mA = 0.001 A";
getSection("concept-ohms-law", "unit-conversions").bullets![3] = "1 W = 1,000 mW";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "如果 8 A 流入一个节点，某一分支流出 3 A，其余分支必须合计流出 5 A。求解前先确定电流方向；" +
    "负结果表示实际电流方向与假设方向相反。";

getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = 对边 / 邻边";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(对边 / 斜边)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(邻边 / 斜边)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(对边 / 邻边)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "邻边 = 10 × cos(30°) ≈ 8.66 cm";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![0].expression = "Σ V = 0";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (并联分支)";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (串联)";
getSection("concept-kirchhoffs-laws", "cells").formulas![1].expression =
    "C_pack = C_1 + C_2 + ... (并联)";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![0].expression =
    "1 英寸 = 25.4 mm = 0.0254 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 英尺 = 12 英寸 = 0.3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 码 = 3 英尺 = 0.9144 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![3].expression =
    "1 英寸² = 645.16 mm²";

export const presentations = corrected as unknown as CatalogPresentationSet;
