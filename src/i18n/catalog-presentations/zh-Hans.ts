/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
import { materialPresentationsFor, type MaterialTextDictionary } from "../material-presentation-text";

export const batteryTexts: BatteryTextDictionary = {
    "battery.summary.removable": "适用于兼容设备的可拆卸充电电芯。",
    "battery.summary.integrated": "设备内置的电池组，而不是用户可以更换的电芯。",
    "battery.note.approvedResearch": "已于 2026-08-13 批准；请参阅相关研究记录。",
    "battery.note.capacityBelowLabel": "真实容量低于标签显示的容量。",
    "battery.note.battery-71.evidence": "20 A 连续值；不使用脉冲值。",
    "battery.note.battery-77.evidence": "20 A 保守的独立比较值；准确的外包装和生产版本仍然重要。",
    "battery.note.battery-78.evidence": "15 A 来自准确型号测试的保守值；经过测试且带 CCC 标记的版本仍然重要。",
    "battery.note.battery-79.evidence": "45 A 测试过的无极耳版本的独立连续值；不要用它替代脉冲值。",
    "battery.note.battery-80.evidence": "36 A 实际连续值；56 A 数值受温度限制。",
    "battery.note.battery-81.evidence": "40 A 保守值；测试电芯属于试产阶段，且没有 CCC 标志。",
    "battery.note.battery-82.evidence": "13 A 推荐连续值；16.8 A 是不用于保证循环寿命的绝对最大值。",
    "battery.note.battery-83.evidence": "40 A 保守值；70 A 受温度限制，测试样品属于试产阶段。",
    "battery.note.battery-84.evidence": "40 A 生产电芯比较值；70 A 需要温度控制。",
    "battery.note.battery-85.evidence": "40 A 准确外包装值；70 A 限制为 60 °C，并按 EVE 40PL 重包电芯进行测试。",
    "battery.note.battery-86.evidence": "19 A 保守值；准确测试的样品属于试产阶段，且没有 CCC 标志。",
    "battery.note.battery-87.evidence": "40 A 保守值；90 A 受温度限制，测试电芯属于试产阶段。",
    "battery.note.battery-88.evidence": "40 A 保守值；60 A 受温度限制，生产连续性仍未解决。",
    "battery.note.battery-89.evidence": "40 A 保守值；测试样品的容量不一致，且没有 CCC/CE 标志。",
    "battery.note.battery-90.evidence": "13 A 保守值；准确测试的样品属于试产阶段，且没有 CCC 标志。",
    "battery.note.battery-91.evidence": "30 A 测试人员估计的连续值；Reliance 的 50 A 最大值受温度限制。",
    "battery.note.battery-92.evidence": "20 A 来自两个与生产相关的测试批次的连续值；30 A 受温度限制。",
    "battery.note.battery-93.evidence": "12 A 连续值；20 A 仅用于脉冲。准确测试的外包装记录为 SA110 / INR18650/40。",
    "battery.note.battery-94.evidence": "20 A 准确外包装值；测试人员建议连续电流低于 15 A。Vapehuset 在标题中宣传 25 A，后续重包来源或外包装版本可能不同。",
    "battery.note.battery-95.evidence": "30 A 准确型号值；这是重包电芯，后续外包装版本或原始供应来源可能不同。",
    "battery.note.battery-96.evidence": "30 A 准确五端版本值；四端版本及后续使用同一外包装的版本存在实质差异，不得继承此配置文件。",
    "battery.safety.lowDrain": "低放电能力电池；不适合吸电子烟。",
};

export const materialTexts: MaterialTextDictionary = {
    "material.profile": (displayName) => displayName + " 的目录配置文件。",
    "material.safety.verifiedProfile": "使用经过验证的材料配置文件，并遵循设备的温度和工作限制。",
};
export const modTexts: ModTextDictionary = {
    "mod.profile.regulated": (displayName) => "受控电子烟设备或控制板的配置文件："
        + displayName + "。",
    "mod.preset-9.profile": "Billet Box Rev. 3a 采用喷砂、光亮浸镀阳极氧化铝表面； 2014 年 5 月推出。",
    "mod.preset-10.profile": "Cloupor 30 W 设备使用第三方 DNA30 型克隆芯片组，而不是正宗的 Evolv DNA-30D 板。",
    "mod.preset-231.profile": "双 21700 稳压模组，带 18650 适配器； VAPORESSO 额定功率为 220 W；测试测得 208 W、8.979 V 和 39 A。",
    "mod.preset-234.profile": "双18650稳压模组； VAPORESSO 额定功率为 220 W；测试测得 215 W、9.08 V 和 37 A。",
    "mod.preset-235.profile": "内置电池调节主机，额定功率为 100 W；测试测得 101 W、29 A 和至少 7.97 V。",
    "mod.preset-236.profile": "采用AS芯片4.0的单18650稳压主机；制造商简介为 100 W、7.5 V、32 A、0.1–3 Ω。",
    "mod.preset-237.profile": "单电池 21700/18650 适配器模块； Eleaf 指定 100 W、9 V、0.05–3.5 Ω；测试确定 30 A。",
    "mod.preset-238.profile": "适用于 21700、20700 或改装 18650 电池的单细胞调节底部注油模块，具有保守的 95 W、6 V、34 A 曲线。",
};

export const presentations: CatalogPresentationSet = {
    "concepts": {
        "concept-ohms-law": {
            "displayName": "欧姆定律",
            "description": "欧姆定律将电路中的电压、电流和电阻联系起来。",
            "summary": "电压、电流和电阻之间的关系。",
            "sections": [
                {
                    "id": "relationship",
                    "title": "关系",
                    "paragraphs": [
                        "只要元件的电阻近似恒定，基本关系就很有用。"
                    ],
                    "formulas": [
                        {
                            "expression": "V = I × R"
                        }
                    ],
                    "bullets": [
                        "V 是电压，以伏特 (V) 为单位测量。",
                        "I 是电流，以安培或安培 (A) 为单位测量。",
                        "R 是电阻，以欧姆 (Ω) 为单位测量。"
                    ]
                },
                {
                    "id": "rearranged-formulas",
                    "title": "重新排列的公式",
                    "paragraphs": [
                        "使用将要查找的值放在左侧的版本："
                    ],
                    "formulas": [
                        {
                            "expression": "我=V/R"
                        },
                        {
                            "expression": "R = V / I"
                        }
                    ],
                    "bullets": [
                        "当电阻保持不变时，增加电压会增加电流。",
                        "当电压保持不变时，增加电阻会降低电流。",
                        "零电阻是理想的短路，必须单独处理。"
                    ]
                },
                {
                    "id": "worked-examples",
                    "title": "工作实例",
                    "examples": [
                        {
                            "title": "查找当前",
                            "setup": "4.2 V 电源连接到 1.0Ω 负载。",
                            "formulas": [
                                "I = 4.2V / 1.0 = 4.2A"
                            ],
                            "conclusion": "负载电流为4.2A。"
                        },
                        {
                            "title": "寻找阻力",
                            "setup": "电路两端电压为 12 V，电流为 2 A。",
                            "formulas": [
                                "R=12V/2A=6Ω"
                            ],
                            "conclusion": "电路电阻为6Ω。"
                        },
                        {
                            "title": "查找电压",
                            "setup": "0.5A电流流过10Ω电阻。",
                            "formulas": [
                                "VCC = 0.5A × 10Ω = 5V"
                            ],
                            "conclusion": "电压为5V。"
                        }
                    ]
                },
                {
                    "id": "electrical-power",
                    "title": "电力",
                    "formulas": [
                        {
                            "expression": "P = V × I = I^2 × R = V^2 / R"
                        }
                    ],
                    "paragraphs": [
                        "欧姆定律与功率关系 P = V × I 相结合。功率 P 以瓦 (W) 为单位进行测量。对于 4.2 V 电源和 1.0 Ω 负载，理想功率为 17.64 W。该组件需要足够的热容量和净空来安全地散发产生的热量。"
                    ]
                },
                {
                    "id": "unit-conversions",
                    "title": "单位换算",
                    "paragraphs": [
                        "计算前保持单位一致："
                    ],
                    "bullets": [
                        "1 k\\u03a9 = 1,000 \\u03a9",
                        "1 百万欧元 = 1,000,000 欧元",
                        "1毫安=0.001安",
                        "1 瓦 = 1,000 毫瓦"
                    ]
                },
                {
                    "id": "limits",
                    "title": "模型的限制",
                    "paragraphs": [
                        "欧姆定律是一个理想化的模型。实际元件可以是非欧姆的：它们的电阻可能随温度、电压、电流、频率或工作状态而变化。对于串联和并联网络，将基尔霍夫定律与欧姆定律结合使用。"
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law"
        },
        "concept-joule-heating": {
            "displayName": "焦耳热",
            "description": "焦耳热描述了电流流过电阻时电能转化为热量的过程。",
            "summary": "电流如何将电阻转化为热量。",
            "sections": [
                {
                    "id": "heating-power",
                    "title": "加热功率",
                    "paragraphs": [
                        "电加热功率为："
                    ],
                    "formulas": [
                        {
                            "expression": "P = V × I"
                        },
                        {
                            "expression": "P = I^2 × R"
                        },
                        {
                            "expression": "P = V^2 / R"
                        }
                    ],
                    "bullets": [
                        "P 是功率，单位为瓦 (W)。",
                        "V 是电压，单位为伏特 (V)。",
                        "I 是电流，单位为安培 (A)。"
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "工作示例",
                    "examples": [
                        {
                            "title": "阻性负载",
                            "setup": "0.8Ω 线圈可承载 3A 电流。",
                            "formulas": [
                                "P = I^2 × R = 3^2 × 0.8 = 7.2 W",
                                "E = P × t = 7.2 W × 10 s = 72 J"
                            ],
                            "conclusion": "线圈以每秒 7.2 焦耳或 10 秒内 72 J 的速度将能量转化为热量。"
                        }
                    ]
                },
                {
                    "id": "what-affects-heating",
                    "title": "影响供暖的因素有哪些",
                    "bullets": [
                        "在恒定电阻下，加倍电流会产生四倍的加热功率。",
                        "在恒定电流下，电阻加倍，加热功率也加倍。",
                        "在恒定电压下，降低电阻会增加加热功率。",
                        "空气、液体和硬件的热传递决定了实际温度。"
                    ],
                    "paragraphs": [
                        "电功率是能量传输速率，而不是温度。热容和热通量决定能量如何改变温度以及它离开表面的速度。"
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "实际检查",
                    "paragraphs": [
                        "检查组件、连接和绝缘是否能够处理预期的电流和功率。使用适当的余量，因为实际组件可能受热不均匀，并且电阻会随温度变化。电池和电源也有连续电流限制。"
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Joule_heating"
        },
        "concept-kirchhoffs-laws": {
            "displayName": "基尔霍夫定律",
            "description": "基尔霍夫电流和电压定律描述了电路节点和闭环周围的守恒。",
            "summary": "连接电路中电流和电压的行为方式。",
            "sections": [
                {
                    "id": "circuit-terms",
                    "title": "电路术语",
                    "paragraphs": [
                        "基本术语使电路图更容易推理："
                    ],
                    "bullets": [
                        "节点是一组无需中间组件即可连接的导体。",
                        "分支是两个节点之间的当前路径。",
                        "环路是一条返回起点的闭合路径。",
                        "串联连接仅提供电流通过组件的一条路径。",
                        "并行连接将分支连接到相同的两个节点。"
                    ]
                },
                {
                    "id": "current-law",
                    "title": "基尔霍夫电流定律",
                    "formulas": [
                        {
                            "expression": "ΣI = 0"
                        },
                        {
                            "expression": "Σ I_in = Σ I_out"
                        }
                    ],
                    "paragraphs": [
                        "如果 8 个 A 进入一个节点，并且一个分支带走 3 A，则其余分支必须带走组合的 5 A。求解前选择当前方向；负结果意味着实际电流与假设方向相反。"
                    ]
                },
                {
                    "id": "series-and-parallel",
                    "title": "串联和并联电路",
                    "formulas": [
                        {
                            "expression": "I_总计 = I_1 = I_2 = ..."
                        },
                        {
                            "expression": "R_总计 = R_1 + R_2 + ..."
                        },
                        {
                            "expression": "I_总计 = I_1 + I_2 + ..."
                        },
                        {
                            "expression": "1 / R_总计 = 1 / R_1 + 1 / R_2 + ..."
                        }
                    ],
                    "examples": [
                        {
                            "title": "串联电阻",
                            "setup": "两个0.20Ω电阻串联连接到8.0V。",
                            "formulas": [
                                "R_total = 0.40 \\u03a9",
                                "I = 8.0V/0.40Ω = 20A"
                            ],
                            "conclusion": "同样的 20 A 电流流过两个电阻。"
                        },
                        {
                            "title": "并联电阻",
                            "setup": "两个相等的 0.40Ω 分支连接到 4.0V。",
                            "formulas": [
                                "R_total = 0.20 \\u03a9",
                                "I_总 = 4.0V/0.20Ω = 20A"
                            ],
                            "conclusion": "在支路电阻相等的情况下，每个支路承载 10 A。"
                        }
                    ]
                },
                {
                    "id": "voltage-law",
                    "title": "基尔霍夫电压定律",
                    "formulas": [
                        {
                            "expression": "ΣV = 0"
                        },
                        {
                            "expression": "+8.0V-V_1-V_2 = 0"
                        },
                        {
                            "expression": "V_total = V_1 = V_2 = ...（并行分支）"
                        }
                    ],
                    "paragraphs": [
                        "闭环周围电压上升和下降的代数和为零。选择一个环路方向并保持极性一致。改变方向会改变符号，而不是物理解决方案。串联电阻越大，压降越大，因为流过每个串联元件的电流相同。"
                    ]
                },
                {
                    "id": "cells",
                    "title": "串联和并联的电池",
                    "formulas": [
                        {
                            "expression": "V_pack = V_1 + V_2 + ...（系列）"
                        },
                        {
                            "expression": "C_pack = C_1 + C_2 + ...（并行）"
                        }
                    ],
                    "bullets": [
                        "串联电池增加了电压，而安时容量仍保持为同等电池的水平。",
                        "并联电池保持相同的电压，而容量和可用电流大约增加。",
                        "均流取决于内阻、触点、接线和开关。",
                        "串联锂离子充电需要电池级监控和适当的平衡或保护。"
                    ]
                },
                {
                    "id": "solving-and-limits",
                    "title": "求解实际电路",
                    "bullets": [
                        "标记节点电压、支路电流和假定的电流方向。",
                        "在独立节点处应用 KCL，在独立环路周围应用 KVL。",
                        "将电阻器电压和电流与 V = I × R 联系起来。",
                        "求解联立方程并检查功率平衡。"
                    ],
                    "paragraphs": [
                        "简化模型可以忽略电池内阻、接触电阻、转换器效率、温度影响、瞬态行为、保护电路和组件容差。包括对高电流电路产生重大影响的所有被遗漏的行为。"
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws"
        },
        "concept-temperature-coefficient-of-resistance": {
            "displayName": "电阻温度系数（TCR）",
            "description": "电阻温度系数估计电阻随着材料加热或冷却而变化的情况。",
            "summary": "材料的电阻如何随温度变化。",
            "sections": [
                {
                    "id": "linear-model",
                    "title": "线性模型",
                    "paragraphs": [
                        "对于较小或中等的温度变化，请使用一阶关系："
                    ],
                    "formulas": [
                        {
                            "expression": "R_T = R_0 [1 + \\u03b1 (T - T_0)]"
                        }
                    ],
                    "bullets": [
                        "R_0是参考温度T_0下的电阻。",
                        "R_T 是温度 T 下的估计电阻。",
                        "ρ是材料的温度系数，以1/°C或ppm/°C表示。",
                        "温度差值 T - T_0 必须使用相同的标度和单位。"
                    ]
                },
                {
                    "id": "positive-and-negative",
                    "title": "正、负TCR",
                    "bullets": [
                        "正 TCR 意味着电阻随着温度升高而增加；许多金属都有这种行为。",
                        "负 TCR 意味着电阻随着温度升高而降低。",
                        "TCR 接近零意味着电阻在指定范围内变化很小。",
                        "系数的符号很重要；将负值替换为其绝对值会反转预测。"
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "工作示例",
                    "examples": [
                        {
                            "title": "加热电阻",
                            "setup": "20℃时规定电阻值为 1.00Ω，TCR 为 400ppm/℃。",
                            "formulas": [
                                "\\u03b1 = 400 × 10^-6 / \\u00b0C = 0.0004 / \\u00b0C",
                                "\\u0394T = 100 - 20 = 80 \\u00b0C",
                                "R_T = 1.00 [1 + 0.0004 × 80] = 1.032 Ω"
                            ],
                            "conclusion": "估计电阻为 1.032 Ω，比 20 ℃ 时的电阻值高出约 3.2%。"
                        }
                    ]
                },
                {
                    "id": "power-and-limits",
                    "title": "TCR、功率和实际限制",
                    "formulas": [
                        {
                            "expression": "我=V/R"
                        },
                        {
                            "expression": "P = V^2 / R = I^2 × R"
                        }
                    ],
                    "paragraphs": [
                        "对于恒定电压驱动的正 TCR 电阻，温度升高会增加电阻并趋于降低电流。对于恒流源，相同的电阻增加会增加功率。",
                        "制造商的 TCR 通常适用于规定的温度和电阻范围。温度梯度、材料变化、接触、机械应变和自热可能会使实际结果与一阶估计不同。"
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance"
        },
        "concept-trigonometry": {
            "displayName": "三角学",
            "description": "三角学涉及角度和长度，对于矢量、相位关系和波形很有用。",
            "summary": "三角形的角和边之间的关系。",
            "sections": [
                {
                    "id": "right-triangles",
                    "title": "直角三角形",
                    "paragraphs": [
                        "相对于角θ，其对边与其相对，邻边与它相切（不包括斜边），斜边与直角相对。 SOH-CAH-TOA 是一种记忆辅助工具：正弦与斜边相反，余弦与斜边相邻，正切与相邻相反。"
                    ],
                    "formulas": [
                        {
                            "expression": "sin(θ) = 对边 / 斜边"
                        },
                        {
                            "expression": "cos(θ) = 邻边 / 斜边"
                        },
                        {
                            "expression": "tan(θ) = 对边/相邻"
                        }
                    ]
                },
                {
                    "id": "finding-sides-and-angles",
                    "title": "寻找未知的边和角",
                    "examples": [
                        {
                            "title": "寻找一边",
                            "setup": "10 厘米的斜边所成的角为 30°。",
                            "formulas": [
                                "对边 = 10 × sin(30°) = 5 cm",
                                "相邻 = 10 × cos(30°) ≈ 8.66 cm"
                            ],
                            "conclusion": "当边长已知时，使用反三角函数。"
                        }
                    ],
                    "formulas": [
                        {
                            "expression": "θ = sin^-1（对边/斜边）"
                        },
                        {
                            "expression": "θ = cos^-1(邻边/斜边)"
                        },
                        {
                            "expression": "θ = tan^-1（对边/相邻）"
                        }
                    ]
                },
                {
                    "id": "degrees-and-radians",
                    "title": "度数和弧度",
                    "formulas": [
                        {
                            "expression": "180° = π 弧度"
                        },
                        {
                            "expression": "θ_rad = θ_deg × π / 180"
                        }
                    ],
                    "paragraphs": [
                        "计算器必须处于正确的角度模式。对弧度值使用度数模式（反之亦然）会产生不同的结果。一个完整的周期是 360° 或 2π 弧度。"
                    ]
                },
                {
                    "id": "waveforms-and-identities",
                    "title": "波形和有用的恒等式",
                    "formulas": [
                        {
                            "expression": "x(t) = A × sin(2πft + φ)"
                        },
                        {
                            "expression": "ω = 2πf"
                        },
                        {
                            "expression": "sin^2(θ) + cos^2(θ) = 1"
                        },
                        {
                            "expression": "a^2 + b^2 = c^2"
                        }
                    ],
                    "bullets": [
                        "A 是振幅，f 是频率（以赫兹为单位），t 是时间（以秒为单位），φ 是相位角。",
                        "角频率 ω 以弧度/秒为单位测量。",
                        "当方向或相位很重要时，保留符号和象限。"
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Trigonometry"
        },
        "concept-heat-capacity": {
            "displayName": "热容量",
            "description": "热容将传递的能量与物体或材料的温度变化联系起来。",
            "summary": "物体改变温度需要多少能量。",
            "sections": [
                {
                    "id": "basic-relationships",
                    "title": "基本关系",
                    "formulas": [
                        {
                            "expression": "C = Q / ΔT"
                        },
                        {
                            "expression": "Q = m × c × ΔT"
                        }
                    ],
                    "bullets": [
                        "C 是热容，单位为 J/K 或 J/°C。",
                        "Q 是传递的热能，单位为焦耳 (J)。",
                        "m 是质量，单位为千克，c 是比热容，单位为 J/(kg·K)。",
                        "1 K 的温差与 1 °C 的温差大小相同。"
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "工作示例",
                    "examples": [
                        {
                            "title": "热水",
                            "setup": "使用 c = 4,180 J/(kg·K) 将 0.20 kg 水从 20 °C 加热至 70 °C。",
                            "formulas": [
                                "ΔT = 70 - 20 = 50 °C",
                                "Q = 0.20 × 4,180 × 50 = 41,800 焦耳"
                            ],
                            "conclusion": "理想的能量需求是41.8 kJ；由于损耗，真正的加热器需要更多。"
                        }
                    ]
                },
                {
                    "id": "electrical-heating",
                    "title": "用电力加热",
                    "formulas": [
                        {
                            "expression": "Q = P × t"
                        },
                        {
                            "expression": "t = m × c × ΔT / P"
                        }
                    ],
                    "examples": [
                        {
                            "title": "理想的加热时间",
                            "setup": "使用恒定的 100 W 源加热 41.8 kJ 示例，没有损失。",
                            "formulas": [
                                "t = 41,800 J / 100 W = 418 秒"
                            ],
                            "conclusion": "理想的时间是7.0分钟左右；传输效率为 80% 时约为 523 秒。"
                        }
                    ]
                },
                {
                    "id": "object-and-material",
                    "title": "物体与材料",
                    "paragraphs": [
                        "热容属于整个物体，取决于存在的材料量。比热容是一种材料特性。对于相同材料，质量加倍会使热容加倍。"
                    ],
                    "formulas": [
                        {
                            "expression": "C_total = Σ m_i × c_i"
                        }
                    ]
                },
                {
                    "id": "phase-changes-and-limits",
                    "title": "相变和实际限制",
                    "formulas": [
                        {
                            "expression": "Q = m × L"
                        }
                    ],
                    "paragraphs": [
                        "在熔化或沸腾过程中，提供的能量可以改变材料的状态而不改变其温度。 L 是比潜热，单位为 J/kg。",
                        "这个简单的方程假设比热大致恒定。热损失、对流、辐射、蒸发、接触电阻和温度不均匀都会导致实际结果与理想结果不同。"
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_capacity"
        },
        "concept-heat-flux": {
            "displayName": "热通量",
            "description": "热通量描述热量穿过表面的速度，与储存热量的材料总量无关。",
            "summary": "通过单位面积的传热速率。",
            "sections": [
                {
                    "id": "definition",
                    "title": "定义",
                    "formulas": [
                        {
                            "expression": "q'' = Q_dot / A"
                        }
                    ],
                    "bullets": [
                        "q'' 是热通量，单位为 W/m²。",
                        "Q_dot 是总传热率，单位为瓦 (W)。",
                        "A 是热量传递的面积，单位为平方米 (m²)。"
                    ],
                    "paragraphs": [
                        "热通量与热容量不同：热容量描述每次温度变化所储存的能量，而热通量描述热量穿过表面的速率。"
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "工作示例",
                    "examples": [
                        {
                            "title": "平均加热器通量",
                            "setup": "100 W 加热器可通过 0.020 m² 的面积传递热量。",
                            "formulas": [
                                "q'' = 100 瓦/0.020 平方米 = 5,000 瓦/平方米"
                            ],
                            "conclusion": "平均热通量为 5,000 W/m²，或 0.5 W/cm²。"
                        }
                    ]
                },
                {
                    "id": "conduction",
                    "title": "通过平坦层传导",
                    "formulas": [
                        {
                            "expression": "q'' = -k × ΔT / L"
                        },
                        {
                            "expression": "Q_dot = k × A × (T_hot - T_cold) / L"
                        }
                    ],
                    "bullets": [
                        "k 是热导率，单位为 W/(m·K)。",
                        "ΔT 是层间的温差。",
                        "L 是以米为单位的层厚度。",
                        "负号表示从较高温度流向较低温度。"
                    ]
                },
                {
                    "id": "convection-and-radiation",
                    "title": "对流和辐射",
                    "formulas": [
                        {
                            "expression": "q'' = h × (T_s - T_∞)"
                        },
                        {
                            "expression": "q'' = ε × σ × (T_s^4 - T_sur^4)"
                        }
                    ],
                    "paragraphs": [
                        "对流使用表面系数 h。辐射使用发射率 ε 和 Stefan-Boltzmann 常数 σ；辐射方程中的温度必须是绝对温度（以开尔文为单位）。"
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "实际检查",
                    "bullets": [
                        "在使用 W/m² 之前将面积转换为 m²。",
                        "区分平均热通量与局部峰值；加热可能不均匀。",
                        "需要时包括接触电阻、对流、辐射和热损失。",
                        "热通量是一种传递速率，而不是温度；利用热容来改变温度。"
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_flux"
        },
        "concept-si-system-and-imperial-units": {
            "displayName": "SI 系统和英制测量",
            "description": "国际单位制为工程提供一致的基本单位、派生单位和小数缩放比例。",
            "summary": "工程计算中使用的单位、前缀和换算。",
            "sections": [
                {
                    "id": "base-units",
                    "title": "常用国际单位制",
                    "table": {
                        "headers": [
                            "数量",
                            "国际单位制",
                            "象征"
                        ],
                        "rows": [
                            [
                                "长度",
                                "仪表",
                                "米"
                            ],
                            [
                                "大量的",
                                "公斤",
                                "千克"
                            ],
                            [
                                "时间",
                                "第二",
                                "s"
                            ],
                            [
                                "温度",
                                "开尔文",
                                "K"
                            ],
                            [
                                "电流",
                                "安培",
                                "一个"
                            ],
                            [
                                "物质的量",
                                "痣",
                                "摩尔"
                            ],
                            [
                                "发光强度",
                                "坎德拉",
                                "光盘"
                            ]
                        ]
                    },
                    "bullets": [
                        "电压：伏特（V）。",
                        "电阻：欧姆（Ω）。",
                        "功率：瓦（W）。",
                        "能量：焦耳（J）。",
                        "力：牛顿（N）。",
                        "压力：帕斯卡（Pa）。",
                        "频率：赫兹（Hz）。"
                    ]
                },
                {
                    "id": "decimal-prefixes",
                    "title": "十进制前缀",
                    "table": {
                        "headers": [
                            "前缀",
                            "象征",
                            "因素"
                        ],
                        "rows": [
                            [
                                "公斤",
                                "k",
                                "1,000 = 10^3"
                            ],
                            [
                                "兆",
                                "中号",
                                "1,000,000 = 10^6"
                            ],
                            [
                                "毫",
                                "米",
                                "0.001 = 10^-3"
                            ],
                            [
                                "微",
                                "μ",
                                "0.000001 = 10^-6"
                            ],
                            [
                                "纳米",
                                "n",
                                "0.000000001 = 10^-9"
                            ]
                        ]
                    },
                    "paragraphs": [
                        "例如，2.2 kΩ 等于 2,200Ω，15 mA 等于 0.015 A。在使用公式之前，请将值转换为兼容单位。"
                    ]
                },
                {
                    "id": "length-conversions",
                    "title": "英寸和公制长度",
                    "formulas": [
                        {
                            "expression": "1 inch = 25.4 mm = 0.0254 m"
                        },
                        {
                            "expression": "1 foot = 12 inches = 0.3048 m"
                        },
                        {
                            "expression": "1 yard = 3 feet = 0.9144 m"
                        },
                        {
                            "expression": "1 in² = 645.16 mm²"
                        }
                    ],
                    "examples": [
                        {
                            "title": "转换长度",
                            "setup": "将 0.1 英寸转换为毫米，将 5 毫米转换为英寸。",
                            "formulas": [
                                "0.1 英寸 × 25.4 = 2.54 毫米",
                                "5 毫米/25.4 ≈ 0.19685 英寸"
                            ],
                            "conclusion": "面积和体积转换使用长度因子的相关幂。"
                        }
                    ]
                },
                {
                    "id": "other-conversions",
                    "title": "其他常见转换",
                    "bullets": [
                        "1 磅 ≈ 0.45359237 千克。",
                        "1 磅 ≈ 4.44822 N。",
                        "1 psi ≈ 6,894.76 Pa。",
                        "°F = °C × 9/5 + 32。",
                        "°C = (°F - 32) × 5/9。",
                        "K = °C + 273.15。"
                    ],
                    "paragraphs": [
                        "磅可以指质量 (lb) 或力 (lbf)，它们是不同的量。同样，英寸、平方英寸和立方英寸测量不同的尺寸。"
                    ]
                },
                {
                    "id": "unit-checks",
                    "title": "实用单元检查",
                    "bullets": [
                        "计算时在每个值旁边写下单位。",
                        "确认方程两边具有兼容的尺寸。",
                        "乘法或除法之前先进行转换。",
                        "仅在最后舍入，以便中间结果保留有用的精度。"
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/International_System_of_Units"
        },
        "concept-wire-gauges-awg-swg-bwg": {
            "displayName": "线规：AWG、SWG 和 BWG",
            "description": "仅当其规格系统被命名时，规格编号才描述标称尺寸。",
            "summary": "为什么线规数字需要命名系统和规定的直径。",
            "sections": [
                {
                    "id": "gauge-systems",
                    "title": "仪表系统",
                    "bullets": [
                        "AWG 是美国线规，历史上也称为 Brown & Sharpe 线规。",
                        "SWG 是标准线规，是历史悠久的英国线材和板材厚度系统。",
                        "BWG 是伯明翰线规，历史上用于铁丝、管材和板材厚度。",
                        "普通标号越大，通常意味着直径越小； 0 号以上的尺寸使用 00、000 或 0000。"
                    ],
                    "paragraphs": [
                        "SWG 和 BWG 是表格系统，不得使用 AWG 公式进行计算。因此，相同的数字并不表示系统中的直径相同。"
                    ]
                },
                {
                    "id": "awg-formula",
                    "title": "AWG 直径和面积",
                    "formulas": [
                        {
                            "expression": "d_inch = 0.005 × 92^((36 - n) / 39)"
                        },
                        {
                            "expression": "d_mm = 0.127 × 92^((36 - n) / 39)"
                        },
                        {
                            "expression": "A = π × d^2 / 4"
                        }
                    ],
                    "paragraphs": [
                        "对于 1/0、2/0、3/0 和 4/0，请使用 n = 0、-1、-2 和 -3。 AWG 确定导体尺寸，而不是通用安全电流；载流量还取决于材料、绝缘、冷却、安装和适用的电气规则。"
                    ]
                },
                {
                    "id": "system-comparison",
                    "title": "为什么系统名称很重要",
                    "table": {
                        "headers": [
                            "测量",
                            "任意波形发生器",
                            "英国SWG",
                            "生物工作组"
                        ],
                        "rows": [
                            [
                                "10",
                                "2.588毫米",
                                "3.251毫米",
                                "3.404毫米"
                            ],
                            [
                                "20",
                                "0.8128毫米",
                                "0.9144毫米",
                                "0.8890毫米"
                            ],
                            [
                                "30",
                                "0.2540毫米",
                                "0.3150毫米",
                                "0.3048毫米"
                            ]
                        ]
                    },
                    "paragraphs": [
                        "这些值是标称值。产品公差、涂层、绝缘层和绞合结构可能会改变测量直径或总直径。"
                    ]
                },
                {
                    "id": "resistance",
                    "title": "规格、面积和电阻",
                    "formulas": [
                        {
                            "expression": "R = ρ × L / A"
                        }
                    ],
                    "paragraphs": [
                        "电阻取决于导体长度 L、横截面积 A 和材料电阻率 ρ。由于面积随直径的平方而变化，因此适度的直径差异可能会产生显着的电阻差异。在 AWG 中，在相同材料和温度下，将规格增加三个尺寸，面积大约减半，单位长度的电阻增加一倍。"
                    ]
                },
                {
                    "id": "practical-specification",
                    "title": "实用规格",
                    "bullets": [
                        "为系统命名，例如 24 AWG 或 24 British SWG。",
                        "当系统可能混淆时，请包括以毫米为单位的标称直径。",
                        "说明尺寸是裸导体、绝缘直径、板材厚度还是管壁厚度。",
                        "对于绞合导体，当灵活性和总直径很重要时，请包括绞合结构。",
                        "根据产品数据和电气规则确定电流容量，而不是仅根据规格编号。"
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Wire_gauge"
        }
    },
    materials: materialPresentationsFor(materialTexts),
    batteries: batteryPresentationsFor(batteryTexts),
    mods: modPresentationsFor(modTexts)
};

const zhHansTcr = presentations.concepts["concept-temperature-coefficient-of-resistance"];
const zhHansTcrSections = zhHansTcr.sections ?? [];
Object.assign(zhHansTcr, {
    "description": "电阻温度系数（TCR）描述材料受热或冷却时电阻如何变化。",
    "sections": zhHansTcrSections.map((section, index) => {
        if (index === 0) {
            return {
                ...section,
                "bullets": section.bullets?.map((bullet, bulletIndex) => bulletIndex === 2
                    ? "α 是材料的电阻温度系数，单位为 1/°C 或 ppm/°C。"
                    : bullet)
            };
        }
        if (index === 1) {
            return { ...section, "title": "正、负 TCR" };
        }
        if (index === 2) {
            return {
                ...section,
                "examples": section.examples?.map((example, exampleIndex) => exampleIndex === 0
                    ? {
                        ...example,
                        "setup": "电阻在 20 °C 时为 1.00 Ω，TCR 为 400 ppm/°C。",
                        "conclusion": "估计电阻为 1.032 Ω，比 20 °C 时的电阻高约 3.2%。"
                    }
                    : example)
            };
        }
        return section;
    })
});
