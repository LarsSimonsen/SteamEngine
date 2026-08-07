/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";

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
    "materials": {
        "ka1": {
            "displayName": "Kanthal A1 / APM",
            "description": "Kanthal A1 / APM 的目录配置文件。",
            "summary": "Kanthal A1 / APM 的目录配置文件。"
        },
        "ka": {
            "displayName": "Kanthal A / AE / AF",
            "description": "Kanthal A / AE / AF 的目录配置文件。",
            "summary": "Kanthal A / AE / AF 的目录配置文件。"
        },
        "kd": {
            "displayName": "Kanthal D",
            "description": "Kanthal D 的目录简介",
            "summary": "Kanthal D 的目录简介"
        },
        "n20": {
            "displayName": "Nichrome N20",
            "description": "镍铬合金 N20 的目录剖面。",
            "summary": "镍铬合金 N20 的目录剖面。"
        },
        "n40": {
            "displayName": "Nichrome N40",
            "description": "镍铬合金 N40 的目录剖面。",
            "summary": "镍铬合金 N40 的目录剖面。"
        },
        "n60": {
            "displayName": "Nichrome N60 (C)",
            "description": "镍铬合金 N60 (C) 的目录剖面。",
            "summary": "镍铬合金 N60 (C) 的目录剖面。"
        },
        "n70": {
            "displayName": "Nichrome N70 (B)",
            "description": "镍铬合金 N70 (B) 的目录剖面。",
            "summary": "镍铬合金 N70 (B) 的目录剖面。"
        },
        "n80": {
            "displayName": "Nichrome N80 (A)",
            "description": "镍铬合金 N80 (A) 的目录剖面。",
            "summary": "镍铬合金 N80 (A) 的目录剖面。"
        },
        "ss304": {
            "displayName": "SS 304",
            "description": "SS 304 的目录型材。",
            "summary": "SS 304 的目录型材。"
        },
        "ss316": {
            "displayName": "SS 316",
            "description": "SS 316 的目录剖面。",
            "summary": "SS 316 的目录剖面。"
        },
        "ss316l": {
            "displayName": "SS 316L / Elite",
            "description": "SS 316L / Elite 的目录型材。",
            "summary": "SS 316L / Elite 的目录型材。"
        },
        "ss317l": {
            "displayName": "SS 317L / Haywire",
            "description": "SS 317L / Haywire 的目录型材。",
            "summary": "SS 317L / Haywire 的目录型材。"
        },
        "ss430": {
            "displayName": "SS 430",
            "description": "SS 430 的目录型材。",
            "summary": "SS 430 的目录型材。"
        },
        "ti1": {
            "displayName": "Titanium 1",
            "description": "钛 1 的目录剖面。",
            "summary": "钛 1 的目录剖面。"
        },
        "ti2": {
            "displayName": "Titanium 2 (R50400)",
            "description": "钛 2 (R50400) 的目录剖面。",
            "summary": "钛 2 (R50400) 的目录剖面。"
        },
        "tie": {
            "displayName": "Titanium ready (e-SG)",
            "description": "适用于钛合金 (e-SG) 的目录配置文件。",
            "summary": "适用于钛合金 (e-SG) 的目录配置文件。"
        },
        "w": {
            "displayName": "Tungsten",
            "description": "钨的目录剖面。",
            "summary": "钨的目录剖面。"
        },
        "nio": {
            "displayName": "Niobium alloy",
            "description": "铌合金目录剖面。",
            "summary": "铌合金目录剖面。"
        },
        "ni200": {
            "displayName": "Nickel 200 / Ni200 (UNS N02200)",
            "description": "Nickel 200 / Ni200 (UNS N02200) 的目录剖面。",
            "summary": "Nickel 200 / Ni200 (UNS N02200) 的目录剖面。"
        },
        "nife30": {
            "displayName": "NiFe30 (Resistherm - TFR)",
            "description": "NiFe30 的目录剖面（Resistherm - TFR）。",
            "summary": "NiFe30 的目录剖面（Resistherm - TFR）。"
        },
        "dicodes": {
            "displayName": "NiFe30 (Resistherm - TCR)",
            "description": "NiFe30 的目录剖面（Resistherm - TCR）。",
            "summary": "NiFe30 的目录剖面（Resistherm - TCR）。"
        },
        "reactor": {
            "displayName": "NiFe (Reactor Wire)",
            "description": "NiFe（电抗器线）的目录型材。",
            "summary": "NiFe（电抗器线）的目录型材。"
        },
        "nife30stealth": {
            "displayName": "NiFe30 (StealthVape)",
            "description": "NiFe30 (StealthVape) 的目录配置文件。",
            "summary": "NiFe30 (StealthVape) 的目录配置文件。"
        },
        "nft70": {
            "displayName": "Nifethal 70 (Alloy120)",
            "description": "Nifethal 70 (Alloy120) 的目录剖面。",
            "summary": "Nifethal 70 (Alloy120) 的目录剖面。"
        },
        "nft52": {
            "displayName": "Nifethal 52 (Alloy52)",
            "description": "Nifethal 52 (Alloy52) 的目录剖面。",
            "summary": "Nifethal 52 (Alloy52) 的目录剖面。"
        },
        "zr": {
            "displayName": "Zirconium (pure)",
            "description": "锆（纯）的目录剖面。",
            "summary": "锆（纯）的目录剖面。"
        },
        "n90": {
            "displayName": "Nichrome N90 (Ni90Cr10)",
            "description": "镍铬合金 N90 (Ni90Cr10) 的目录剖面。",
            "summary": "镍铬合金 N90 (Ni90Cr10) 的目录剖面。"
        },
        "ss904l": {
            "displayName": "SS 904L (UNS N08904)",
            "description": "SS 904L (UNS N08904) 的目录型材。",
            "summary": "SS 904L (UNS N08904) 的目录型材。"
        }
    },
    "batteries": {
        "battery-1": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-2": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-3": {
            "displayName": "AW IMR 16340",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-4": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-5": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-6": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-7": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-8": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-9": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-10": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-11": {
            "displayName": "AWT 26650 4500mAh 75A",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-12": {
            "displayName": "EH IMR 18350",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-13": {
            "displayName": "EH IMR 18500",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-14": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-15": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-16": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-17": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-18": {
            "displayName": "Efest IMR 18490",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-19": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-20": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-21": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-22": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-23": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-24": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-25": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-26": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-27": {
            "displayName": "Efest IMR 18650 35A",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-28": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-29": {
            "displayName": "Efest IMR 26650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-30": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": undefined,
            "summary": "设备中的内部电池组而不是用户可更换的电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-31": {
            "displayName": "Innokin iTaste VV v3",
            "description": undefined,
            "summary": "设备中的内部电池组而不是用户可更换的电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-32": {
            "displayName": "Keeppower IMR26650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-33": {
            "displayName": "LG 18650HB6",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-34": {
            "displayName": "LG 18650HE2",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-35": {
            "displayName": "LG 18650HG2",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-36": {
            "displayName": "MNKE IMR 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-37": {
            "displayName": "MNKE IMR 26650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-38": {
            "displayName": "MXJO IMR 18650 35A",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-39": {
            "displayName": "MXJO IMR 18650 20A",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-40": {
            "displayName": "Nitecore NL188",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-41": {
            "displayName": "Orbtronic 18650 PD2900",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-42": {
            "displayName": "Orbtronic 18650 SX22",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-43": {
            "displayName": "Orbtronic 18650 SX30",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-44": {
            "displayName": "Orbtronic 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-45": {
            "displayName": "Orbtronic CGR18650CH",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-46": {
            "displayName": "Orbtronic NCR18650A",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-47": {
            "displayName": "Panasonic CGR18650CH",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-48": {
            "displayName": "Panasonic NCR18650A",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-49": {
            "displayName": "Panasonic NCR18650B",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-50": {
            "displayName": "Panasonic NCR18650BD",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-51": {
            "displayName": "Panasonic NCR18650PF",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-52": {
            "displayName": "Panasonic CGR26650A",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-53": {
            "displayName": "Samsung ICR18650-26F",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-54": {
            "displayName": "Panasonic NCR18650PD",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-55": {
            "displayName": "Samsung INR18650-20R",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-56": {
            "displayName": "Samsung INR18650-25R",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-57": {
            "displayName": "Samsung INR18650-20Q",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-58": {
            "displayName": "Samsung INR18650-30Q",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-59": {
            "displayName": "Sanyo UR16650ZTA",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-60": {
            "displayName": "Sanyo UR18650EX",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-61": {
            "displayName": "Sanyo UR18650F",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": "低耗电电池；不适合吸电子烟。"
        },
        "battery-62": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-63": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-64": {
            "displayName": "Sony US18650VTC3",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-65": {
            "displayName": "Sony US18650VTC4",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-66": {
            "displayName": "Sony US18650VTC5",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-67": {
            "displayName": "Sony US18650v3",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-68": {
            "displayName": "Sony US26650VT",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-69": {
            "displayName": "Torchy IMR 18350",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-70": {
            "displayName": "Vappower IMR 26650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-71": {
            "displayName": "Vamped 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "20个连续评级；不使用脉冲额定值。"
            ],
            "safetyText": undefined
        },
        "battery-72": {
            "displayName": "UltraFire BRC 18650 4000mAh li-ion",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "真实容量低于标签显示的容量。"
            ],
            "safetyText": undefined
        },
        "battery-73": {
            "displayName": "UltraFire XSL 18350 1200mAh",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "真实容量低于标签显示的容量。"
            ],
            "safetyText": undefined
        },
        "battery-74": {
            "displayName": "Vamped 26650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-75": {
            "displayName": "Xtar IMR 18350",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-76": {
            "displayName": "Xtar IMR 18500",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-77": {
            "displayName": "EVE INR18650/30P",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "20 保守的独立比较值；确切的包装和生产修订仍然相关。"
            ],
            "safetyText": undefined
        },
        "battery-78": {
            "displayName": "EVE INR18650/25P",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "15 精确模型测试的保守值；经过测试的带有 CCC 标记的修订版仍然具有相关性。"
            ],
            "safetyText": undefined
        },
        "battery-79": {
            "displayName": "EVE INR18650/30PL",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "45 测试表修订版的独立连续值；不要替代脉冲额定值。"
            ],
            "safetyText": undefined
        },
        "battery-80": {
            "displayName": "Ampace JP30P1",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "36 真正的连续值； 56 A 数字受温度限制。"
            ],
            "safetyText": undefined
        },
        "battery-81": {
            "displayName": "Tenpower INR18650-30XG",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "40 保守值；测试的电池似乎是预生产的，并且没有 CCC 标志。"
            ],
            "safetyText": undefined
        },
        "battery-82": {
            "displayName": "EVE INR21700/58E",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "13 推荐的连续值； 16.8 A 是绝对最大值，不适用于循环寿命。"
            ],
            "safetyText": undefined
        },
        "battery-83": {
            "displayName": "Reliance INR21700-RS40",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "40 保守值； 70 A 是温度限制的，测试样品是预生产的。"
            ],
            "safetyText": undefined
        },
        "battery-84": {
            "displayName": "Reliance INR21700-RS50",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "40 生产单元比较值； 70 A 需要温度控制。"
            ],
            "safetyText": undefined
        },
        "battery-85": {
            "displayName": "Vapcell S41",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "40 精确包装值； 70 A 限制为 60 C，并作为 EVE 40PL 重新包装进行测试。"
            ],
            "safetyText": undefined
        },
        "battery-86": {
            "displayName": "BAK 21700-65E",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "19 保守值；精确的测试样品出现在生产前，并且没有 CCC 标志。"
            ],
            "safetyText": undefined
        },
        "battery-87": {
            "displayName": "Tenpower INR21700-50XG",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "40 保守值； 90 A 受温度限制，测试电池出现在生产前。"
            ],
            "safetyText": undefined
        },
        "battery-88": {
            "displayName": "Tenpower INR21700-60XG",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "40 保守值； 60 A 受温度限制，生产连续性仍未解决。"
            ],
            "safetyText": undefined
        },
        "battery-89": {
            "displayName": "Great Power 50Q",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "40 保守值；测试样品容量不一致且缺乏 CCC/CE 标志。"
            ],
            "safetyText": undefined
        },
        "battery-90": {
            "displayName": "FEB 21700-68E",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "13 保守值；精确的测试样品出现在生产前，并且没有 CCC 标志。"
            ],
            "safetyText": undefined
        },
        "battery-91": {
            "displayName": "Reliance INR21700-RS60",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "30 测试人员估计的连续值； Reliance 的 50 A 最大值受温度限制。"
            ],
            "safetyText": undefined
        },
        "battery-92": {
            "displayName": "Reliance INR21700-RH60",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "20 两个测试的生产相关批次的连续值； 30 A 是有温度限制的。"
            ],
            "safetyText": undefined
        },
        "battery-93": {
            "displayName": "Amprius INR18650/40 (SA110)",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "12 连续； 20 A 仅脉冲。精确测试的包装纸记录为 SA110 / INR18650/40。"
            ],
            "safetyText": undefined
        },
        "battery-94": {
            "displayName": "Vapcell B30 18650",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "20 精确包装值；测试仪建议连续电流低于 15 A。 Vapehuset 在其标题中宣传 25 A，后来的重新包装采购或包装修订可能会有所不同。"
            ],
            "safetyText": undefined
        },
        "battery-95": {
            "displayName": "Golisi S35 21700",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "30 精确模型值；这是一个重新包装，以后的包装修订或底层采购可能会有所不同。"
            ],
            "safetyText": undefined
        },
        "battery-96": {
            "displayName": "iJoy 20700 3000mAh five-leg",
            "description": undefined,
            "summary": "用于兼容设备的可拆卸充电电池。",
            "notes": [
                "30 精确的五腿修正值；使用相同包裹的四腿和更高版本有本质上的不同，并且不得继承此配置文件。"
            ],
            "safetyText": undefined
        }
    },
    "mods": {
        "preset-1": {
            "displayName": "AceSmok Ace 50",
            "description": "AceSmok Ace 50 的受控电子烟设备配置文件。",
            "summary": "AceSmok Ace 50 的受控电子烟设备配置文件。"
        },
        "preset-2": {
            "displayName": "Ante Meridiem Axis",
            "description": "Ante Meridiem Axis 的受监管电子烟设备配置文件。",
            "summary": "Ante Meridiem Axis 的受监管电子烟设备配置文件。"
        },
        "preset-3": {
            "displayName": "Anyvape AnyMOD",
            "description": "Anyvape AnyMOD 的受监管电子烟设备配置文件。",
            "summary": "Anyvape AnyMOD 的受监管电子烟设备配置文件。"
        },
        "preset-4": {
            "displayName": "Arrow 100W",
            "description": "Arrow 100W 的受控电子烟设备配置文件。",
            "summary": "Arrow 100W 的受控电子烟设备配置文件。"
        },
        "preset-5": {
            "displayName": "Artisan Supermax",
            "description": "Artisan Supermax 的受监管电子烟设备配置文件。",
            "summary": "Artisan Supermax 的受监管电子烟设备配置文件。"
        },
        "preset-6": {
            "displayName": "Asmodus Snow Wolf 200W",
            "description": "Asmodus Snow Wolf 200W 的受控电子烟设备配置文件。",
            "summary": "Asmodus Snow Wolf 200W 的受控电子烟设备配置文件。"
        },
        "preset-7": {
            "displayName": "Aspire CF Sub Ohm",
            "description": "Aspire CF Sub Ohm 的受控电子烟设备配置文件。",
            "summary": "Aspire CF Sub Ohm 的受控电子烟设备配置文件。"
        },
        "preset-8": {
            "displayName": "Beastmode Industries BMI 100 Watt V.1",
            "description": "Beastmode Industries BMI 100 Watt V.1 的受监管电子烟设备配置文件。",
            "summary": "Beastmode Industries BMI 100 Watt V.1 的受监管电子烟设备配置文件。"
        },
        "preset-9": {
            "displayName": "Billet Box rev. 3a",
            "description": "Billet Box Rev. 3a 采用喷砂、光亮浸镀阳极氧化铝表面； 2014 年 5 月推出。",
            "summary": "方坯箱 Rev."
        },
        "preset-10": {
            "displayName": "Cloupor DNA-30",
            "description": "Cloupor 30 W 设备使用第三方 DNA30 型克隆芯片组，而不是正宗的 Evolv DNA-30D 板。",
            "summary": "Cloupor 30 W 设备使用第三方 DNA30 型克隆芯片组，而不是正宗的 Evolv DNA-30D 板。"
        },
        "preset-11": {
            "displayName": "Cloupor DNA-50",
            "description": "Cloupor DNA-50 的受监管电子烟设备配置文件。",
            "summary": "Cloupor DNA-50 的受监管电子烟设备配置文件。"
        },
        "preset-12": {
            "displayName": "Cloupor GT",
            "description": "Cloupor GT 的受监管电子烟设备配置文件。",
            "summary": "Cloupor GT 的受监管电子烟设备配置文件。"
        },
        "preset-13": {
            "displayName": "Cloupor Mini",
            "description": "Cloupor Mini 的受监管电子烟设备配置文件。",
            "summary": "Cloupor Mini 的受监管电子烟设备配置文件。"
        },
        "preset-14": {
            "displayName": "Cloupor T5",
            "description": "Cloupor T5 的受监管电子烟设备配置文件。",
            "summary": "Cloupor T5 的受监管电子烟设备配置文件。"
        },
        "preset-15": {
            "displayName": "Cloupor T6",
            "description": "Cloupor T6 的受监管电子烟设备配置文件。",
            "summary": "Cloupor T6 的受监管电子烟设备配置文件。"
        },
        "preset-16": {
            "displayName": "Cloupor T8",
            "description": "Cloupor T8 的受监管电子烟设备配置文件。",
            "summary": "Cloupor T8 的受监管电子烟设备配置文件。"
        },
        "preset-17": {
            "displayName": "Cloupor ZNA50",
            "description": "Cloupor ZNA50 的受控电子烟设备配置文件。",
            "summary": "Cloupor ZNA50 的受控电子烟设备配置文件。"
        },
        "preset-18": {
            "displayName": "C-Tratech Smart Box 50W",
            "description": "适用于 C-Tratech Smart Box 50W 的受控电子烟设备配置文件。",
            "summary": "适用于 C-Tratech Smart Box 50W 的受控电子烟设备配置文件。"
        },
        "preset-19": {
            "displayName": "Dicodes Dani Extreme",
            "description": "Dicodes Dani Extreme 的受监管电子烟设备配置文件。",
            "summary": "Dicodes Dani Extreme 的受监管电子烟设备配置文件。"
        },
        "preset-20": {
            "displayName": "Dicodes Dani Extreme v2 / Pipeline Pro v2",
            "description": "Dicodes Dani Extreme v2 / Pipeline Pro v2 的受监管电子烟设备配置文件。",
            "summary": "Dicodes Dani Extreme v2 / Pipeline Pro v2 的受监管电子烟设备配置文件。"
        },
        "preset-21": {
            "displayName": "DJK Wood Mods The Nerd VV",
            "description": "适用于 DJK Wood Mods The Nerd VV 的受控电子烟设备配置文件。",
            "summary": "适用于 DJK Wood Mods The Nerd VV 的受控电子烟设备配置文件。"
        },
        "preset-22": {
            "displayName": "Dovpo DT-50",
            "description": "Dovpo DT-50 的受监管电子烟设备配置文件。",
            "summary": "Dovpo DT-50 的受监管电子烟设备配置文件。"
        },
        "preset-23": {
            "displayName": "Dovpo E-LVT",
            "description": "Dovpo E-LVT 的受监管电子烟设备配置文件。",
            "summary": "Dovpo E-LVT 的受监管电子烟设备配置文件。"
        },
        "preset-24": {
            "displayName": "Dovpo E-Mech",
            "description": "Dovpo E-Mech 的受监管电子烟设备配置文件。",
            "summary": "Dovpo E-Mech 的受监管电子烟设备配置文件。"
        },
        "preset-25": {
            "displayName": "Dovpo TC 50",
            "description": "Dovpo TC 50 的受控电子烟设备配置文件。",
            "summary": "Dovpo TC 50 的受控电子烟设备配置文件。"
        },
        "preset-26": {
            "displayName": "eGo Twist",
            "description": "eGo Twist 的受监管电子烟设备配置文件。",
            "summary": "eGo Twist 的受监管电子烟设备配置文件。"
        },
        "preset-27": {
            "displayName": "eGo-V V3",
            "description": "eGo-V V3 的受监管电子烟设备配置文件。",
            "summary": "eGo-V V3 的受监管电子烟设备配置文件。"
        },
        "preset-28": {
            "displayName": "Evod V v3",
            "description": "Evod V v3 的受监管电子烟设备配置文件。",
            "summary": "Evod V v3 的受监管电子烟设备配置文件。"
        },
        "preset-29": {
            "displayName": "Evolv DNA-20D",
            "description": "Evolv DNA-20D 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA-20D 的受监管电子烟设备配置文件。"
        },
        "preset-30": {
            "displayName": "Evolv DNA-30D",
            "description": "Evolv DNA-30D 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA-30D 的受监管电子烟设备配置文件。"
        },
        "preset-31": {
            "displayName": "Evolv DNA-40 (std. wire)",
            "description": "Evolv DNA-40（标准线材）的受控电子烟设备配置文件。",
            "summary": "Evolv DNA-40（标准）的受监管电子烟设备配置文件"
        },
        "preset-32": {
            "displayName": "Evolv DNA-40 (Ni 200)",
            "description": "Evolv DNA-40 (Ni 200) 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA-40 (Ni 200) 的受监管电子烟设备配置文件。"
        },
        "preset-33": {
            "displayName": "Evolv DNA60 (non-color)",
            "description": "Evolv DNA60（非彩色）的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA60（非彩色）的受监管电子烟设备配置文件。"
        },
        "preset-34": {
            "displayName": "Evolv DNA-75",
            "description": "Evolv DNA-75 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA-75 的受监管电子烟设备配置文件。"
        },
        "preset-35": {
            "displayName": "Evolv DNA-200 (2 cells, DNA-133)",
            "description": "Evolv DNA-200（2 个单元，DNA-133）的受控电子烟设备配置文件。",
            "summary": "Evolv DNA-200（2 个单元，DNA-133）的受控电子烟设备配置文件。"
        },
        "preset-36": {
            "displayName": "Evolv DNA-200 (3 cells)",
            "description": "Evolv DNA-200（3 个单元）的受控电子烟设备配置文件。",
            "summary": "Evolv DNA-200（3 个单元）的受控电子烟设备配置文件。"
        },
        "preset-37": {
            "displayName": "Evolv DNA-200 (TC mode)",
            "description": "Evolv DNA-200 的受监管电子烟设备配置文件（TC 模式）。",
            "summary": "Evolv DNA-200 的受监管电子烟设备配置文件（TC 模式）。"
        },
        "preset-38": {
            "displayName": "Evolv DNA-250 (2 cells, DNA-166)",
            "description": "Evolv DNA-250（2 个细胞，DNA-166）的受控电子烟设备配置文件。",
            "summary": "Evolv DNA-250（2 个细胞，DNA-166）的受控电子烟设备配置文件。"
        },
        "preset-39": {
            "displayName": "Evolv DNA-250 (3 cells)",
            "description": "Evolv DNA-250（3 个单元）的受控电子烟设备配置文件。",
            "summary": "Evolv DNA-250（3 个单元）的受控电子烟设备配置文件。"
        },
        "preset-40": {
            "displayName": "Evolv Kick 2",
            "description": "Evolv Kick 2 的受控电子烟设备配置文件。",
            "summary": "Evolv Kick 2 的受控电子烟设备配置文件。"
        },
        "preset-41": {
            "displayName": "Eleaf iStick",
            "description": "Eleaf iStick 的受监管电子烟设备配置文件。",
            "summary": "Eleaf iStick 的受监管电子烟设备配置文件。"
        },
        "preset-42": {
            "displayName": "Eleaf iStick 30W",
            "description": "Eleaf iStick 30W 的受控电子烟设备配置文件。",
            "summary": "Eleaf iStick 30W 的受控电子烟设备配置文件。"
        },
        "preset-43": {
            "displayName": "Eleaf iStick 40W TC",
            "description": "Eleaf iStick 40W TC 的受控电子烟设备配置文件。",
            "summary": "Eleaf iStick 40W TC 的受控电子烟设备配置文件。"
        },
        "preset-44": {
            "displayName": "Eleaf iStick 50W",
            "description": "Eleaf iStick 50W 的受控电子烟设备配置文件。",
            "summary": "Eleaf iStick 50W 的受控电子烟设备配置文件。"
        },
        "preset-45": {
            "displayName": "Eleaf iStick 100W",
            "description": "Eleaf iStick 100W 的受控电子烟设备配置文件。",
            "summary": "Eleaf iStick 100W 的受控电子烟设备配置文件。"
        },
        "preset-46": {
            "displayName": "Gossmods The Duke",
            "description": "Gossmods The Duke 的受监管电子烟设备配置文件。",
            "summary": "Gossmods The Duke 的受监管电子烟设备配置文件。"
        },
        "preset-47": {
            "displayName": "Grand Innovations GI2",
            "description": "Grand Innovations GI2 的受监管电子烟设备配置文件。",
            "summary": "Grand Innovations GI2 的受监管电子烟设备配置文件。"
        },
        "preset-48": {
            "displayName": "Heatvape Invader Mini",
            "description": "Heatvape Invader Mini 的受控电子烟设备配置文件。",
            "summary": "Heatvape Invader Mini 的受控电子烟设备配置文件。"
        },
        "preset-49": {
            "displayName": "Heatvape Invader Mini (TC mode)",
            "description": "Heatvape Invader Mini（TC 模式）的受控电子烟设备配置文件。",
            "summary": "Heatvape Invader Mini（TC 模式）的受控电子烟设备配置文件。"
        },
        "preset-50": {
            "displayName": "iJoy A160",
            "description": "iJoy A160 的受控电子烟设备配置文件。",
            "summary": "iJoy A160 的受控电子烟设备配置文件。"
        },
        "preset-51": {
            "displayName": "Innokin Cool Fire II",
            "description": "Innokin Cool Fire II 的受控电子烟设备配置文件。",
            "summary": "Innokin Cool Fire II 的受控电子烟设备配置文件。"
        },
        "preset-52": {
            "displayName": "Innokin Cool Fire IV",
            "description": "Innokin Cool Fire IV 的受控电子烟设备配置文件。",
            "summary": "Innokin Cool Fire IV 的受控电子烟设备配置文件。"
        },
        "preset-53": {
            "displayName": "Innokin Disrupter",
            "description": "Innokin Disrupter 的受监管电子烟设备配置文件。",
            "summary": "Innokin Disrupter 的受监管电子烟设备配置文件。"
        },
        "preset-54": {
            "displayName": "Innokin iTaste 134 / iTaste 134 mini",
            "description": "Innokin iTaste 134 / iTaste 134 mini 的受控电子烟设备配置文件。",
            "summary": "Innokin iTaste 134 / iTaste 134 mini 的受控电子烟设备配置文件。"
        },
        "preset-55": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": "Innokin iTaste MVP 2.0 的受监管电子烟设备配置文件。",
            "summary": "Innokin iTaste MVP 2.0 的受监管电子烟设备配置文件。"
        },
        "preset-56": {
            "displayName": "Innokin iTaste MVP 20 Watt",
            "description": "Innokin iTaste MVP 20 瓦的受控电子烟设备配置文件。",
            "summary": "Innokin iTaste MVP 20 瓦的受控电子烟设备配置文件。"
        },
        "preset-57": {
            "displayName": "Innokin iTaste MVP 3.0",
            "description": "Innokin iTaste MVP 3.0 的受监管电子烟设备配置文件。",
            "summary": "Innokin iTaste MVP 3.0 的受监管电子烟设备配置文件。"
        },
        "preset-58": {
            "displayName": "Innokin iTaste MVP 3 Pro",
            "description": "Innokin iTaste MVP 3 Pro 的受监管电子烟设备配置文件。",
            "summary": "Innokin iTaste MVP 3 Pro 的受监管电子烟设备配置文件。"
        },
        "preset-59": {
            "displayName": "Innokin iTaste SVD",
            "description": "Innokin iTaste SVD 的受监管电子烟设备配置文件。",
            "summary": "Innokin iTaste SVD 的受监管电子烟设备配置文件。"
        },
        "preset-60": {
            "displayName": "Innokin iTaste SVD2",
            "description": "Innokin iTaste SVD2 的受监管电子烟设备配置文件。",
            "summary": "Innokin iTaste SVD2 的受监管电子烟设备配置文件。"
        },
        "preset-61": {
            "displayName": "Innokin iTaste VTR",
            "description": "Innokin iTaste VTR 的受监管电子烟设备配置文件。",
            "summary": "Innokin iTaste VTR 的受监管电子烟设备配置文件。"
        },
        "preset-62": {
            "displayName": "Innokin iTaste VV V3.0",
            "description": "Innokin iTaste VV V3.0 的受控电子烟设备配置文件。",
            "summary": "Innokin iTaste VV V3.0 的受控电子烟设备配置文件。"
        },
        "preset-63": {
            "displayName": "Joy4life Beyang 30W",
            "description": "Joy4life Beyang 30W 的受控电子烟设备配置文件。",
            "summary": "Joy4life Beyang 30W 的受控电子烟设备配置文件。"
        },
        "preset-64": {
            "displayName": "Joyetech eCom Supreme",
            "description": "Joyetech eCom Supreme 的受监管电子烟设备配置文件。",
            "summary": "Joyetech eCom Supreme 的受监管电子烟设备配置文件。"
        },
        "preset-65": {
            "displayName": "Joyetech eVic",
            "description": "Joyetech eVic 的受监管电子烟设备配置文件。",
            "summary": "Joyetech eVic 的受监管电子烟设备配置文件。"
        },
        "preset-66": {
            "displayName": "Joyetech eVic VT",
            "description": "Joyetech eVic VT 的受控电子烟设备配置文件。",
            "summary": "Joyetech eVic VT 的受控电子烟设备配置文件。"
        },
        "preset-67": {
            "displayName": "Joyetech eVic VT (TC mode)",
            "description": "Joyetech eVic VT（TC 模式）的受控电子烟设备配置文件。",
            "summary": "Joyetech eVic VT（TC 模式）的受控电子烟设备配置文件。"
        },
        "preset-68": {
            "displayName": "Joyetech eVic Supreme",
            "description": "Joyetech eVic Supreme 的受控电子烟设备配置文件。",
            "summary": "Joyetech eVic Supreme 的受控电子烟设备配置文件。"
        },
        "preset-69": {
            "displayName": "J Well Alesia",
            "description": "J Well Alesia 的受监管电子烟设备配置文件。",
            "summary": "J Well Alesia 的受监管电子烟设备配置文件。"
        },
        "preset-70": {
            "displayName": "J Well Troca",
            "description": "J Well Troca 的受监管电子烟设备配置文件。",
            "summary": "J Well Troca 的受监管电子烟设备配置文件。"
        },
        "preset-71": {
            "displayName": "Kanger e-Power v3",
            "description": "Kanger e-Power v3 的受控电子烟设备配置文件。",
            "summary": "Kanger e-Power v3 的受控电子烟设备配置文件。"
        },
        "preset-72": {
            "displayName": "Kanger IPOW 2",
            "description": "Kanger IPOW 2 的受监管电子烟设备配置文件。",
            "summary": "Kanger IPOW 2 的受监管电子烟设备配置文件。"
        },
        "preset-73": {
            "displayName": "Kanger KBOX",
            "description": "Kanger KBOX 的受监管电子烟设备配置文件。",
            "summary": "Kanger KBOX 的受监管电子烟设备配置文件。"
        },
        "preset-74": {
            "displayName": "Kanger KBOX Mini / SUBOX Mini",
            "description": "适用于 Kanger KBOX Mini / SUBOX Mini 的受控电子烟设备配置文件。",
            "summary": "适用于 Kanger KBOX Mini / SUBOX Mini 的受控电子烟设备配置文件。"
        },
        "preset-75": {
            "displayName": "Kanger K-Simar 20",
            "description": "Kanger K-Simar 20 的受控电子烟设备配置文件。",
            "summary": "Kanger K-Simar 20 的受控电子烟设备配置文件。"
        },
        "preset-76": {
            "displayName": "Kangside e-Huge",
            "description": "Kangside e-Huge 的受控电子烟设备配置文件。",
            "summary": "Kangside e-Huge 的受控电子烟设备配置文件。"
        },
        "preset-77": {
            "displayName": "Kamry 20",
            "description": "Kamry 20 的受控电子烟设备配置文件。",
            "summary": "Kamry 20 的受控电子烟设备配置文件。"
        },
        "preset-78": {
            "displayName": "Kamry 60W",
            "description": "Kamry 60W 的受控电子烟设备配置文件。",
            "summary": "Kamry 60W 的受控电子烟设备配置文件。"
        },
        "preset-79": {
            "displayName": "Kamry God Box",
            "description": "Kamry God Box 的受监管电子烟设备配置文件。",
            "summary": "Kamry God Box 的受监管电子烟设备配置文件。"
        },
        "preset-80": {
            "displayName": "KangXin VF clone v3",
            "description": "KangXin VF 克隆 v3 的受监管电子烟设备配置文件。",
            "summary": "KangXin VF 克隆 v3 的受监管电子烟设备配置文件。"
        },
        "preset-81": {
            "displayName": "KangXin KX5-50W",
            "description": "KangXin KX5-50W 的调节电子烟设备配置文件。",
            "summary": "KangXin KX5-50W 的调节电子烟设备配置文件。"
        },
        "preset-82": {
            "displayName": "Koopor Mini KP60",
            "description": "Koopor Mini KP60 的受控电子烟设备配置文件。",
            "summary": "Koopor Mini KP60 的受控电子烟设备配置文件。"
        },
        "preset-83": {
            "displayName": "Koopor Mini KP60 (TC)",
            "description": "Koopor Mini KP60 (TC) 的受控电子烟设备配置文件。",
            "summary": "Koopor Mini KP60 (TC) 的受控电子烟设备配置文件。"
        },
        "preset-84": {
            "displayName": "KSD 30",
            "description": "KSD 30 的受监管电子烟设备配置文件。",
            "summary": "KSD 30 的受监管电子烟设备配置文件。"
        },
        "preset-85": {
            "displayName": "KSD Kmax (single battery)",
            "description": "KSD Kmax（单电池）的受控电子烟设备配置文件。",
            "summary": "KSD Kmax（单电池）的受控电子烟设备配置文件。"
        },
        "preset-86": {
            "displayName": "KSD Kmax (stacked)",
            "description": "KSD Kmax（堆叠式）的受控电子烟设备配置文件。",
            "summary": "KSD Kmax（堆叠式）的受控电子烟设备配置文件。"
        },
        "preset-87": {
            "displayName": "L-Rider Lambo 6.0",
            "description": "L-Rider Lambo 6.0 的受控电子烟设备配置文件。",
            "summary": "L-Rider Lambo 6.0 的受控电子烟设备配置文件。"
        },
        "preset-88": {
            "displayName": "L-Rider Lavatube",
            "description": "L-Rider Lavatube 的受控电子烟设备配置文件。",
            "summary": "L-Rider Lavatube 的受控电子烟设备配置文件。"
        },
        "preset-89": {
            "displayName": "Lotus Jellyfish",
            "description": "Lotus Jellyfish 的受监管电子烟设备配置文件。",
            "summary": "Lotus Jellyfish 的受监管电子烟设备配置文件。"
        },
        "preset-90": {
            "displayName": "Lotus LE80",
            "description": "Lotus LE80 的受监管电子烟设备配置文件。",
            "summary": "Lotus LE80 的受监管电子烟设备配置文件。"
        },
        "preset-91": {
            "displayName": "Luxyoun Smaug",
            "description": "Luxyoun Smaug 的受监管电子烟设备配置文件。",
            "summary": "Luxyoun Smaug 的受监管电子烟设备配置文件。"
        },
        "preset-92": {
            "displayName": "Majesty 150W",
            "description": "Majesty 150W 的受控电子烟设备配置文件。",
            "summary": "Majesty 150W 的受控电子烟设备配置文件。"
        },
        "preset-93": {
            "displayName": "Megatron 260",
            "description": "Megatron 260 的受控电子烟设备配置文件。",
            "summary": "Megatron 260 的受控电子烟设备配置文件。"
        },
        "preset-94": {
            "displayName": "Naos Raptor 10A",
            "description": "Naos Raptor 10A 的受控电子烟设备配置文件。",
            "summary": "Naos Raptor 10A 的受控电子烟设备配置文件。"
        },
        "preset-95": {
            "displayName": "Naos Raptor 20A",
            "description": "Naos Raptor 20A 的受控电子烟设备配置文件。",
            "summary": "Naos Raptor 20A 的受控电子烟设备配置文件。"
        },
        "preset-96": {
            "displayName": "Nivel V3",
            "description": "Nivel V3 的受控电子烟设备配置文件。",
            "summary": "Nivel V3 的受控电子烟设备配置文件。"
        },
        "preset-97": {
            "displayName": "Notcigs VV",
            "description": "Notcigs VV 的受监管电子烟设备配置文件。",
            "summary": "Notcigs VV 的受监管电子烟设备配置文件。"
        },
        "preset-98": {
            "displayName": "OKL2-T/20-W12",
            "description": "OKL2-T/20-W12 的受控电子烟设备配置文件。",
            "summary": "OKL2-T/20-W12 的受控电子烟设备配置文件。"
        },
        "preset-99": {
            "displayName": "OKR-T10",
            "description": "OKR-T10 的受监管电子烟设备配置文件。",
            "summary": "OKR-T10 的受监管电子烟设备配置文件。"
        },
        "preset-100": {
            "displayName": "Pioneer4You/Green Leaf P-Max",
            "description": "适用于 Pioneer4You/Green Leaf P-Max 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf P-Max 的受监管电子烟设备配置文件。"
        },
        "preset-101": {
            "displayName": "ProVari 2, ProVari 2.5",
            "description": "ProVari 2、ProVari 2.5 的受监管电子烟设备配置文件。",
            "summary": "ProVari 2、ProVari 2.5 的受监管电子烟设备配置文件。"
        },
        "preset-102": {
            "displayName": "ProVari P3 beta",
            "description": "ProVari P3 beta 的受监管电子烟设备配置文件。",
            "summary": "ProVari P3 beta 的受监管电子烟设备配置文件。"
        },
        "preset-103": {
            "displayName": "ProVari P35",
            "description": "ProVari P35 的受监管电子烟设备配置文件。",
            "summary": "ProVari P35 的受监管电子烟设备配置文件。"
        },
        "preset-104": {
            "displayName": "Psmoke GI2",
            "description": "Psmoke GI2 的受控电子烟设备配置文件。",
            "summary": "Psmoke GI2 的受控电子烟设备配置文件。"
        },
        "preset-105": {
            "displayName": "RainbowHeaven Arrow",
            "description": "RainbowHeaven Arrow 的受监管电子烟设备配置文件。",
            "summary": "RainbowHeaven Arrow 的受监管电子烟设备配置文件。"
        },
        "preset-106": {
            "displayName": "Robbot Tech ZNA50",
            "description": "Robbot Tech ZNA50 的受监管电子烟设备配置文件。",
            "summary": "Robbot Tech ZNA50 的受监管电子烟设备配置文件。"
        },
        "preset-107": {
            "displayName": "Sigelei 20W",
            "description": "Sigelei 20W 的调节电子烟设备配置文件。",
            "summary": "Sigelei 20W 的调节电子烟设备配置文件。"
        },
        "preset-108": {
            "displayName": "Sigelei 50W",
            "description": "Sigelei 50W 的调节电子烟设备配置文件。",
            "summary": "Sigelei 50W 的调节电子烟设备配置文件。"
        },
        "preset-109": {
            "displayName": "Sigelei 75W TC",
            "description": "Sigelei 75W TC 的调节电子烟设备配置文件。",
            "summary": "Sigelei 75W TC 的调节电子烟设备配置文件。"
        },
        "preset-110": {
            "displayName": "Sigelei 150W",
            "description": "Sigelei 150W 的调节电子烟设备配置文件。",
            "summary": "Sigelei 150W 的调节电子烟设备配置文件。"
        },
        "preset-111": {
            "displayName": "Sigelei Fuchai 213 Plus",
            "description": "思格雷 Fuchai 213 Plus 的受控电子烟设备配置文件。",
            "summary": "思格雷 Fuchai 213 Plus 的受控电子烟设备配置文件。"
        },
        "preset-112": {
            "displayName": "Sigelei Kick",
            "description": "Sigelei Kick 的受控电子烟设备配置文件。",
            "summary": "Sigelei Kick 的受控电子烟设备配置文件。"
        },
        "preset-113": {
            "displayName": "Sigelei Legend v2",
            "description": "Sigelei Legend v2 的受监管电子烟设备配置文件。",
            "summary": "Sigelei Legend v2 的受监管电子烟设备配置文件。"
        },
        "preset-114": {
            "displayName": "Sigelei Vmax",
            "description": "Sigelei Vmax 的受控电子烟设备配置文件。",
            "summary": "Sigelei Vmax 的受控电子烟设备配置文件。"
        },
        "preset-115": {
            "displayName": "Sigelei Zmax V3",
            "description": "Sigelei Zmax V3 的受控电子烟设备配置文件。",
            "summary": "Sigelei Zmax V3 的受控电子烟设备配置文件。"
        },
        "preset-116": {
            "displayName": "Sigelei Zmax V5",
            "description": "Sigelei Zmax V5 的受控电子烟设备配置文件。",
            "summary": "Sigelei Zmax V5 的受控电子烟设备配置文件。"
        },
        "preset-117": {
            "displayName": "Simeiyue God 180",
            "description": "Simeiyue God 180 的受控电子烟设备配置文件。",
            "summary": "Simeiyue God 180 的受控电子烟设备配置文件。"
        },
        "preset-118": {
            "displayName": "Simeiyue God 180s",
            "description": "Simeiyue God 180s 的受控电子烟设备配置文件。",
            "summary": "Simeiyue God 180s 的受控电子烟设备配置文件。"
        },
        "preset-119": {
            "displayName": "Simeiyue God 260",
            "description": "Simeiyue God 260 的受控电子烟设备配置文件。",
            "summary": "Simeiyue God 260 的受控电子烟设备配置文件。"
        },
        "preset-120": {
            "displayName": "Smok Ace",
            "description": "Smok Ace 的受监管电子烟设备配置文件。",
            "summary": "Smok Ace 的受监管电子烟设备配置文件。"
        },
        "preset-121": {
            "displayName": "Smok BEC Pro",
            "description": "Smok BEC Pro 的受监管电子烟设备配置文件。",
            "summary": "Smok BEC Pro 的受监管电子烟设备配置文件。"
        },
        "preset-122": {
            "displayName": "Smok G-Priv 220W",
            "description": "Smok G-Priv 220W 的受控电子烟设备配置文件。",
            "summary": "Smok G-Priv 220W 的受控电子烟设备配置文件。"
        },
        "preset-123": {
            "displayName": "Smok Sid",
            "description": "Smok Sid 的受监管电子烟设备配置文件。",
            "summary": "Smok Sid 的受监管电子烟设备配置文件。"
        },
        "preset-124": {
            "displayName": "Smok X Cube II",
            "description": "Smok X Cube II 的受控电子烟设备配置文件。",
            "summary": "Smok X Cube II 的受控电子烟设备配置文件。"
        },
        "preset-125": {
            "displayName": "Smok X Pro BT50",
            "description": "Smok X Pro BT50 的受控电子烟设备配置文件。",
            "summary": "Smok X Pro BT50 的受控电子烟设备配置文件。"
        },
        "preset-126": {
            "displayName": "Smok X Pro M36",
            "description": "Smok X Pro M36 的受控电子烟设备配置文件。",
            "summary": "Smok X Pro M36 的受控电子烟设备配置文件。"
        },
        "preset-127": {
            "displayName": "Smok X Pro M50",
            "description": "Smok X Pro M50 的受控电子烟设备配置文件。",
            "summary": "Smok X Pro M50 的受控电子烟设备配置文件。"
        },
        "preset-128": {
            "displayName": "Smok X Pro M80",
            "description": "Smok X Pro M80 的受控电子烟设备配置文件。",
            "summary": "Smok X Pro M80 的受控电子烟设备配置文件。"
        },
        "preset-129": {
            "displayName": "Smok Zmax",
            "description": "Smok Zmax 的受控电子烟设备配置文件。",
            "summary": "Smok Zmax 的受控电子烟设备配置文件。"
        },
        "preset-130": {
            "displayName": "Smok Zmax Mini",
            "description": "Smok Zmax Mini 的受控电子烟设备配置文件。",
            "summary": "Smok Zmax Mini 的受控电子烟设备配置文件。"
        },
        "preset-131": {
            "displayName": "SMY 260W",
            "description": "SMY 260W 的受控电子烟设备配置文件。",
            "summary": "SMY 260W 的受控电子烟设备配置文件。"
        },
        "preset-132": {
            "displayName": "SMY 50TC",
            "description": "SMY 50TC 的受控电子烟设备配置文件。",
            "summary": "SMY 50TC 的受控电子烟设备配置文件。"
        },
        "preset-133": {
            "displayName": "SMY GOD 180",
            "description": "SMY GOD 180 的受控电子烟设备配置文件。",
            "summary": "SMY GOD 180 的受控电子烟设备配置文件。"
        },
        "preset-134": {
            "displayName": "Steam STM-1 / STM-2",
            "description": "适用于 Steam STM-1 / STM-2 的受控电子烟设备配置文件。",
            "summary": "适用于 Steam STM-1 / STM-2 的受控电子烟设备配置文件。"
        },
        "preset-135": {
            "displayName": "Sunzip Vapmod Deezel",
            "description": "Sunzip Vapmod Deezel 的受监管电子烟设备配置文件。",
            "summary": "Sunzip Vapmod Deezel 的受监管电子烟设备配置文件。"
        },
        "preset-136": {
            "displayName": "Taifun The Eye",
            "description": "Taifun The Eye 的受监管电子烟设备配置文件。",
            "summary": "Taifun The Eye 的受监管电子烟设备配置文件。"
        },
        "preset-137": {
            "displayName": "Taifun The Eye (updated)",
            "description": "Taifun The Eye 的受监管电子烟设备配置文件（已更新）。",
            "summary": "Taifun The Eye 的受监管电子烟设备配置文件（已更新）。"
        },
        "preset-138": {
            "displayName": "Tesla",
            "description": "特斯拉受监管的电子烟设备配置文件。",
            "summary": "特斯拉受监管的电子烟设备配置文件。"
        },
        "preset-139": {
            "displayName": "Tesla 120W",
            "description": "Tesla 120W 的受控电子烟设备配置文件。",
            "summary": "Tesla 120W 的受控电子烟设备配置文件。"
        },
        "preset-140": {
            "displayName": "Tesla 2 Sub Mod",
            "description": "Tesla 2 Sub Mod 的受监管电子烟设备配置文件。",
            "summary": "Tesla 2 Sub Mod 的受监管电子烟设备配置文件。"
        },
        "preset-141": {
            "displayName": "Tesla Spider",
            "description": "Tesla Spider 受监管的电子烟设备配置文件。",
            "summary": "Tesla Spider 受监管的电子烟设备配置文件。"
        },
        "preset-142": {
            "displayName": "Tobeco ZNA 36",
            "description": "Tobeco ZNA 36 的受控电子烟设备配置文件。",
            "summary": "Tobeco ZNA 36 的受控电子烟设备配置文件。"
        },
        "preset-143": {
            "displayName": "Vamo 35W (clone)",
            "description": "Vamo 35W（克隆）的受控电子烟设备配置文件。",
            "summary": "Vamo 35W（克隆）的受控电子烟设备配置文件。"
        },
        "preset-144": {
            "displayName": "Vamo V1 / V2 / V3 / V5",
            "description": "适用于 Vamo V1 / V2 / V3 / V5 的受控电子烟设备配置文件。",
            "summary": "适用于 Vamo V1 / V2 / V3 / V5 的受控电子烟设备配置文件。"
        },
        "preset-145": {
            "displayName": "Vamo V7",
            "description": "Vamo V7 的受控电子烟设备配置文件。",
            "summary": "Vamo V7 的受控电子烟设备配置文件。"
        },
        "preset-146": {
            "displayName": "VaporFi Vox II",
            "description": "VaporFi Vox II 的受监管电子烟设备配置文件。",
            "summary": "VaporFi Vox II 的受监管电子烟设备配置文件。"
        },
        "preset-147": {
            "displayName": "Vicious Ant VariAnt 120W",
            "description": "Vicious Ant VariAnt 120W 的受控电子烟设备配置文件。",
            "summary": "Vicious Ant VariAnt 120W 的受控电子烟设备配置文件。"
        },
        "preset-148": {
            "displayName": "Vicious Ant VariAnt 250W",
            "description": "Vicious Ant VariAnt 250W 的受控电子烟设备配置文件。",
            "summary": "Vicious Ant VariAnt 250W 的受控电子烟设备配置文件。"
        },
        "preset-149": {
            "displayName": "Vision Spinner / Spinner II",
            "description": "Vision Spinner / Spinner II 的受控电子烟设备配置文件。",
            "summary": "Vision Spinner / Spinner II 的受控电子烟设备配置文件。"
        },
        "preset-150": {
            "displayName": "Vision X.Fir/X.Gun",
            "description": "Vision X.Fir/X.Gun 的受监管电子烟设备配置文件。",
            "summary": "Vision X.Fir/X.Gun 的受监管电子烟设备配置文件。"
        },
        "preset-151": {
            "displayName": "Volcano Lavatube",
            "description": "Volcano Lavatube 的受控电子烟设备配置文件。",
            "summary": "Volcano Lavatube 的受控电子烟设备配置文件。"
        },
        "preset-152": {
            "displayName": "Volcano Lavatube v2.5",
            "description": "Volcano Lavatube v2.5 的受控电子烟设备配置文件。",
            "summary": "Volcano Lavatube v2.5 的受控电子烟设备配置文件。"
        },
        "preset-153": {
            "displayName": "Wismec Reuleaux RX200S (4.10)",
            "description": "Wismec Reuleaux RX200S (4.10) 的受监管电子烟设备配置文件。",
            "summary": "Wismec Reuleaux RX200S (4.10) 的受监管电子烟设备配置文件。"
        },
        "preset-154": {
            "displayName": "YiHi SX130",
            "description": "YiHi SX130 的受控电子烟设备配置文件。",
            "summary": "YiHi SX130 的受控电子烟设备配置文件。"
        },
        "preset-155": {
            "displayName": "YiHi SX130 v1.5",
            "description": "适用于 YiHi SX130 v1.5 的受控电子烟设备配置文件。",
            "summary": "适用于 YiHi SX130 v1.5 的受控电子烟设备配置文件。"
        },
        "preset-156": {
            "displayName": "YiHi SX130H",
            "description": "适用于 YiHi SX130H 的受控电子烟设备配置文件。",
            "summary": "适用于 YiHi SX130H 的受控电子烟设备配置文件。"
        },
        "preset-157": {
            "displayName": "YiHi SX220",
            "description": "YiHi SX220 的受控电子烟设备配置文件。",
            "summary": "YiHi SX220 的受控电子烟设备配置文件。"
        },
        "preset-158": {
            "displayName": "YiHi SX300",
            "description": "YiHi SX300 的受控电子烟设备配置文件。",
            "summary": "YiHi SX300 的受控电子烟设备配置文件。"
        },
        "preset-159": {
            "displayName": "YiHi SX330 V1 35W",
            "description": "适用于 YiHi SX330 V1 35W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX330 V1 35W 的调节电子烟设备配置文件。"
        },
        "preset-160": {
            "displayName": "YiHi SX330 V2 50W",
            "description": "适用于 YiHi SX330 V2 50W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX330 V2 50W 的调节电子烟设备配置文件。"
        },
        "preset-161": {
            "displayName": "YiHi SX330 V2C 70W",
            "description": "适用于 YiHi SX330 V2C 70W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX330 V2C 70W 的调节电子烟设备配置文件。"
        },
        "preset-162": {
            "displayName": "YiHi SX330 V2 S 60W",
            "description": "适用于 YiHi SX330 V2 S 60W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX330 V2 S 60W 的调节电子烟设备配置文件。"
        },
        "preset-163": {
            "displayName": "YiHi SX330 V3 100W",
            "description": "适用于 YiHi SX330 V3 100W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX330 V3 100W 的调节电子烟设备配置文件。"
        },
        "preset-164": {
            "displayName": "YiHi SX330 V3 150W",
            "description": "适用于 YiHi SX330 V3 150W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX330 V3 150W 的调节电子烟设备配置文件。"
        },
        "preset-165": {
            "displayName": "YiHi SX330 V3S 150W",
            "description": "适用于 YiHi SX330 V3S 150W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX330 V3S 150W 的调节电子烟设备配置文件。"
        },
        "preset-166": {
            "displayName": "YiHi SX330-V3Si 200W",
            "description": "适用于 YiHi SX330-V3Si 200W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX330-V3Si 200W 的调节电子烟设备配置文件。"
        },
        "preset-167": {
            "displayName": "YiHi SX330 V4S 100W",
            "description": "适用于 YiHi SX330 V4S 100W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX330 V4S 100W 的调节电子烟设备配置文件。"
        },
        "preset-168": {
            "displayName": "YiHi SX350 30W",
            "description": "适用于 YiHi SX350 30W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX350 30W 的调节电子烟设备配置文件。"
        },
        "preset-169": {
            "displayName": "YiHi SX350 50W",
            "description": "适用于 YiHi SX350 50W 的调节电子烟设备配置文件。",
            "summary": "适用于 YiHi SX350 50W 的调节电子烟设备配置文件。"
        },
        "preset-170": {
            "displayName": "YiHi SX350 100W",
            "description": "适用于 YiHi SX350 100W 的受控电子烟设备配置文件。",
            "summary": "适用于 YiHi SX350 100W 的受控电子烟设备配置文件。"
        },
        "preset-171": {
            "displayName": "YiHi SX350J VJ mode",
            "description": "适用于 YiHi SX350J VJ 模式的受控电子烟设备配置文件。",
            "summary": "适用于 YiHi SX350J VJ 模式的受控电子烟设备配置文件。"
        },
        "preset-172": {
            "displayName": "YiHi SX350J VW/single batt mode",
            "description": "适用于 YiHi SX350J VW/单电池模式的受控电子烟设备配置文件。",
            "summary": "适用于 YiHi SX350J VW/单电池模式的受控电子烟设备配置文件。"
        },
        "preset-173": {
            "displayName": "YiHi SX350J VW/dual batt mode",
            "description": "适用于 YiHi SX350J VW/双电池模式的受控电子烟设备配置文件。",
            "summary": "适用于 YiHi SX350J VW/双电池模式的受控电子烟设备配置文件。"
        },
        "preset-174": {
            "displayName": "YiHi SX470",
            "description": "YiHi SX470 的受控电子烟设备配置文件。",
            "summary": "YiHi SX470 的受控电子烟设备配置文件。"
        },
        "preset-175": {
            "displayName": "YiHi SX450",
            "description": "适用于 YiHi SX450 的受控电子烟设备配置文件。",
            "summary": "适用于 YiHi SX450 的受控电子烟设备配置文件。"
        },
        "preset-176": {
            "displayName": "YiHi SXMini",
            "description": "适用于 YiHi SXMini 的受控电子烟设备配置文件。",
            "summary": "适用于 YiHi SXMini 的受控电子烟设备配置文件。"
        },
        "preset-177": {
            "displayName": "Beyond Vape Solara",
            "description": "Beyond Vape Solara 的受监管电子烟设备配置文件。",
            "summary": "Beyond Vape Solara 的受监管电子烟设备配置文件。"
        },
        "preset-178": {
            "displayName": "Cana Modz",
            "description": "Cana Modz 的受监管电子烟设备配置文件。",
            "summary": "Cana Modz 的受监管电子烟设备配置文件。"
        },
        "preset-179": {
            "displayName": "Craving Vapor HexOhm",
            "description": "Craving Vapor HexOhm 的受控电子烟设备配置文件。",
            "summary": "Craving Vapor HexOhm 的受控电子烟设备配置文件。"
        },
        "preset-180": {
            "displayName": "Craving Vapor HexOhm V2",
            "description": "Craving Vapor HexOhm V2 的受控电子烟设备配置文件。",
            "summary": "Craving Vapor HexOhm V2 的受控电子烟设备配置文件。"
        },
        "preset-181": {
            "displayName": "Hana Modz V3",
            "description": "Hana Modz V3 的受控电子烟设备配置文件。",
            "summary": "Hana Modz V3 的受控电子烟设备配置文件。"
        },
        "preset-182": {
            "displayName": "Hana Modz DNA 40",
            "description": "Hana Modz DNA 40 的受监管电子烟设备配置文件。",
            "summary": "Hana Modz DNA 40 的受监管电子烟设备配置文件。"
        },
        "preset-183": {
            "displayName": "Lost Vape Therion DNA 75",
            "description": "Lost Vape Therion DNA 75 的受监管电子烟设备配置文件。",
            "summary": "Lost Vape Therion DNA 75 的受监管电子烟设备配置文件。"
        },
        "preset-184": {
            "displayName": "Lost Vape Therion DNA 133",
            "description": "Lost Vape Therion DNA 133 的受监管电子烟设备配置文件。",
            "summary": "Lost Vape Therion DNA 133 的受监管电子烟设备配置文件。"
        },
        "preset-185": {
            "displayName": "Lost Vape Therion DNA 166",
            "description": "Lost Vape Therion DNA 166 的受监管电子烟设备配置文件。",
            "summary": "Lost Vape Therion DNA 166 的受监管电子烟设备配置文件。"
        },
        "preset-186": {
            "displayName": "Notcigs Buzz Pro",
            "description": "Notcigs Buzz Pro 的受监管电子烟设备配置文件。",
            "summary": "Notcigs Buzz Pro 的受监管电子烟设备配置文件。"
        },
        "preset-187": {
            "displayName": "Pioneer4You/Green Leaf Seven 22",
            "description": "适用于 Pioneer4You/Green Leaf Seven 22 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf Seven 22 的受监管电子烟设备配置文件。"
        },
        "preset-188": {
            "displayName": "Pioneer4You/Green Leaf Seven 30W",
            "description": "适用于 Pioneer4You/Green Leaf Seven 30W 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf Seven 30W 的受监管电子烟设备配置文件。"
        },
        "preset-189": {
            "displayName": "Pioneer4You/Green Leaf IPV",
            "description": "Pioneer4You/Green Leaf IPV 的受监管电子烟设备配置文件。",
            "summary": "Pioneer4You/Green Leaf IPV 的受监管电子烟设备配置文件。"
        },
        "preset-190": {
            "displayName": "Pioneer4You/Green Leaf IPV D2",
            "description": "适用于 Pioneer4You/Green Leaf IPV D2 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf IPV D2 的受监管电子烟设备配置文件。"
        },
        "preset-191": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini",
            "description": "适用于 Pioneer4You/Green Leaf IPV Mini 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf IPV Mini 的受监管电子烟设备配置文件。"
        },
        "preset-192": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini 2",
            "description": "适用于 Pioneer4You/Green Leaf IPV Mini 2 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf IPV Mini 2 的受监管电子烟设备配置文件。"
        },
        "preset-193": {
            "displayName": "Pioneer4You/Green Leaf IPV V2",
            "description": "适用于 Pioneer4You/Green Leaf IPV V2 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf IPV V2 的受监管电子烟设备配置文件。"
        },
        "preset-194": {
            "displayName": "Pioneer4You/Green Leaf IPV V2S",
            "description": "适用于 Pioneer4You/Green Leaf IPV V2S 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf IPV V2S 的受监管电子烟设备配置文件。"
        },
        "preset-195": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 100W",
            "description": "适用于 Pioneer4You/Green Leaf IPV V3 100W 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf IPV V3 100W 的受监管电子烟设备配置文件。"
        },
        "preset-196": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 150W",
            "description": "适用于 Pioneer4You/Green Leaf IPV V3 150W 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf IPV V3 150W 的受监管电子烟设备配置文件。"
        },
        "preset-197": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 200W",
            "description": "适用于 Pioneer4You/Green Leaf IPV V3 200W 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf IPV V3 200W 的受监管电子烟设备配置文件。"
        },
        "preset-198": {
            "displayName": "Pioneer4You/Green Leaf IPV V4 100W",
            "description": "适用于 Pioneer4You/Green Leaf IPV V4 100W 的受监管电子烟设备配置文件。",
            "summary": "适用于 Pioneer4You/Green Leaf IPV V4 100W 的受监管电子烟设备配置文件。"
        },
        "preset-199": {
            "displayName": "Protovapor XPV DNA-20D",
            "description": "Protovapor XPV DNA-20D 的受监管电子烟设备配置文件。",
            "summary": "Protovapor XPV DNA-20D 的受监管电子烟设备配置文件。"
        },
        "preset-200": {
            "displayName": "Protovapor XPV DNA-30D",
            "description": "Protovapor XPV DNA-30D 的受监管电子烟设备配置文件。",
            "summary": "Protovapor XPV DNA-30D 的受监管电子烟设备配置文件。"
        },
        "preset-201": {
            "displayName": "Protovapor XPV DNA-40D",
            "description": "Protovapor XPV DNA-40D 的受监管电子烟设备配置文件。",
            "summary": "Protovapor XPV DNA-40D 的受监管电子烟设备配置文件。"
        },
        "preset-202": {
            "displayName": "Raffmods Ranger",
            "description": "Raffmods Ranger 的受监管电子烟设备配置文件。",
            "summary": "Raffmods Ranger 的受监管电子烟设备配置文件。"
        },
        "preset-203": {
            "displayName": "Reo VV Grand/Woodvil",
            "description": "Reo VV Grand/Woodvil 的受监管电子烟设备配置文件。",
            "summary": "Reo VV Grand/Woodvil 的受监管电子烟设备配置文件。"
        },
        "preset-204": {
            "displayName": "Sigelei 30W",
            "description": "Sigelei 30W 的调节电子烟设备配置文件。",
            "summary": "Sigelei 30W 的调节电子烟设备配置文件。"
        },
        "preset-205": {
            "displayName": "Sigelei Raptor",
            "description": "Sigelei Raptor 的受控电子烟设备配置文件。",
            "summary": "Sigelei Raptor 的受控电子烟设备配置文件。"
        },
        "preset-206": {
            "displayName": "Sigelei 100W",
            "description": "Sigelei 100W 的调节电子烟设备配置文件。",
            "summary": "Sigelei 100W 的调节电子烟设备配置文件。"
        },
        "preset-207": {
            "displayName": "Sigelei Mini",
            "description": "Sigelei Mini 的受控电子烟设备配置文件。",
            "summary": "Sigelei Mini 的受控电子烟设备配置文件。"
        },
        "preset-208": {
            "displayName": "SvoëMesto Semovar",
            "description": "SvoëMesto Semovar 的受监管电子烟设备配置文件。",
            "summary": "SvoëMesto Semovar 的受监管电子烟设备配置文件。"
        },
        "preset-209": {
            "displayName": "Vapor Flask v1/v2 DNA 30",
            "description": "Vapor Flask v1/v2 DNA 30 的受监管电子烟设备配置文件。",
            "summary": "Vapor Flask v1/v2 DNA 30 的受监管电子烟设备配置文件。"
        },
        "preset-210": {
            "displayName": "Vapor Flask v2 DNA 40",
            "description": "Vapor Flask v2 DNA 40 的受监管电子烟设备配置文件。",
            "summary": "Vapor Flask v2 DNA 40 的受监管电子烟设备配置文件。"
        },
        "preset-211": {
            "displayName": "Vapor Shark DNA",
            "description": "Vapor Shark DNA 的受监管电子烟设备配置文件。",
            "summary": "Vapor Shark DNA 的受监管电子烟设备配置文件。"
        },
        "preset-212": {
            "displayName": "Vapor Shark DNA/rDNA 30",
            "description": "Vapor Shark DNA/rDNA 30 的受监管电子烟设备配置文件。",
            "summary": "Vapor Shark DNA/rDNA 30 的受监管电子烟设备配置文件。"
        },
        "preset-213": {
            "displayName": "Vapor Shark rDNA 40",
            "description": "Vapor Shark rDNA 40 的受监管电子烟设备配置文件。",
            "summary": "Vapor Shark rDNA 40 的受监管电子烟设备配置文件。"
        },
        "preset-214": {
            "displayName": "Geekvape Aegis Legend 5",
            "description": "Geekvape Aegis Legend 5 的受监管电子烟设备配置文件。",
            "summary": "Geekvape Aegis Legend 5 的受监管电子烟设备配置文件。"
        },
        "preset-215": {
            "displayName": "Evolv DNA60C",
            "description": "Evolv DNA60C 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA60C 的受监管电子烟设备配置文件。"
        },
        "preset-216": {
            "displayName": "Evolv DNA100C",
            "description": "Evolv DNA100C 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA100C 的受监管电子烟设备配置文件。"
        },
        "preset-217": {
            "displayName": "Evolv DNA250C (2S)",
            "description": "Evolv DNA250C (2S) 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA250C (2S) 的受监管电子烟设备配置文件。"
        },
        "preset-218": {
            "displayName": "Evolv DNA250C (3S, US firmware)",
            "description": "Evolv DNA250C（3S，美国固件）的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA250C（3S，美国固件）的受监管电子烟设备配置文件。"
        },
        "preset-219": {
            "displayName": "Evolv DNA250C (3S, international firmware)",
            "description": "Evolv DNA250C（3S，国际固件）的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA250C（3S，国际固件）的受监管电子烟设备配置文件。"
        },
        "preset-220": {
            "displayName": "Evolv DNA250C (4S)",
            "description": "Evolv DNA250C (4S) 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA250C (4S) 的受监管电子烟设备配置文件。"
        },
        "preset-221": {
            "displayName": "VOOPOO DRAG 6",
            "description": "VOOPOO DRAG 6 的受控电子烟设备配置文件。",
            "summary": "VOOPOO DRAG 6 的受控电子烟设备配置文件。"
        },
        "preset-222": {
            "displayName": "YiHi SXmini MQ Class",
            "description": "YiHi SXmini MQ Class 的受控电子烟设备配置文件。",
            "summary": "YiHi SXmini MQ Class 的受控电子烟设备配置文件。"
        },
        "preset-223": {
            "displayName": "Evolv DNA80C",
            "description": "Evolv DNA80C 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA80C 的受监管电子烟设备配置文件。"
        },
        "preset-224": {
            "displayName": "Evolv DNA75C",
            "description": "Evolv DNA75C 的受监管电子烟设备配置文件。",
            "summary": "Evolv DNA75C 的受监管电子烟设备配置文件。"
        },
        "preset-225": {
            "displayName": "YiHi SX600H",
            "description": "YiHi SX600H 的受控电子烟设备配置文件。",
            "summary": "YiHi SX600H 的受控电子烟设备配置文件。"
        },
        "preset-226": {
            "displayName": "Craving Vapor HexOhm V3",
            "description": "Craving Vapor HexOhm V3 的受控电子烟设备配置文件。",
            "summary": "Craving Vapor HexOhm V3 的受控电子烟设备配置文件。"
        },
        "preset-227": {
            "displayName": "VOOPOO VINCI Spark220",
            "description": "VOOPOO VINCI Spark220 的受控电子烟设备配置文件。",
            "summary": "VOOPOO VINCI Spark220 的受控电子烟设备配置文件。"
        },
        "preset-228": {
            "displayName": "Dovpo x TVC Topside Dual",
            "description": "Dovpo x TVC Topside Dual 的受控电子烟设备配置文件。",
            "summary": "Dovpo x TVC Topside Dual 的受控电子烟设备配置文件。"
        },
        "preset-229": {
            "displayName": "VOOPOO DRAG 5",
            "description": "VOOPOO DRAG 5 的受控电子烟设备配置文件。",
            "summary": "VOOPOO DRAG 5 的受控电子烟设备配置文件。"
        },
        "preset-230": {
            "displayName": "Geekvape L200 Classic",
            "description": "Geekvape L200 Classic 的受监管电子烟设备配置文件。",
            "summary": "Geekvape L200 Classic 的受监管电子烟设备配置文件。"
        },
        "preset-231": {
            "displayName": "VAPORESSO ARMOUR MAX",
            "description": "双 21700 稳压模组，带 18650 适配器； VAPORESSO 额定功率为 220 W；测试测得 208 W、8.979 V 和 39 A。",
            "summary": "双 21700 稳压模组，带 18650 适配器； VAPORESSO 额定功率为 220 W；测试测得 208 W、8.979 V 和 39 A。"
        },
        "preset-232": {
            "displayName": "Geekvape Aegis Legend 2 (L200)",
            "description": "Geekvape Aegis Legend 2 (L200) 的受监管电子烟设备配置文件。",
            "summary": "Geekvape Aegis Legend 2 (L200) 的受监管电子烟设备配置文件。"
        },
        "preset-233": {
            "displayName": "ProVape ProVari Radius 40 W",
            "description": "ProVape ProVari Radius 40 W 的受控电子烟设备配置文件。",
            "summary": "ProVape ProVari Radius 40 W 的受控电子烟设备配置文件。"
        },
        "preset-234": {
            "displayName": "VAPORESSO GEN MAX",
            "description": "双18650稳压模组； VAPORESSO 额定功率为 220 W；测试测得 215 W、9.08 V 和 37 A。",
            "summary": "双18650稳压模组； VAPORESSO 额定功率为 220 W；测试测得 215 W、9.08 V 和 37 A。"
        },
        "preset-235": {
            "displayName": "VAPORESSO ARMOUR ULTRA",
            "description": "内置电池调节主机，额定功率为 100 W；测试测得 101 W、29 A 和至少 7.97 V。",
            "summary": "内置电池调节主机，额定功率为 100 W；测试测得 101 W、29 A 和至少 7.97 V。"
        },
        "preset-236": {
            "displayName": "Geekvape Aegis Solo 3",
            "description": "采用AS芯片4.0的单18650稳压主机；制造商简介为 100 W、7.5 V、32 A、0.1–3 Ω。",
            "summary": "采用AS芯片4.0的单18650稳压主机；制造商简介为 100 W、7.5 V、32 A、0.1–3 Ω。"
        },
        "preset-237": {
            "displayName": "Eleaf iStick Pico 21700",
            "description": "单电池 21700/18650 适配器模块； Eleaf 指定 100 W、9 V、0.05–3.5 Ω；测试确定 30 A。",
            "summary": "单电池 21700/18650 适配器模块； Eleaf 指定 100 W、9 V、0.05–3.5 Ω；测试确定 30 A。"
        },
        "preset-238": {
            "displayName": "Vandy Vape Pulse V2",
            "description": "适用于 21700、20700 或改装 18650 电池的单细胞调节底部注油模块，具有保守的 95 W、6 V、34 A 曲线。",
            "summary": "适用于 21700、20700 或改装 18650 电池的单细胞调节底部注油模块，具有保守的 95 W、6 V、34 A 曲线。"
        }
    }
};
