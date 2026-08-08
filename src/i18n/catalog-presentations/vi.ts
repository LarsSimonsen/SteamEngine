/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";

export const presentations = {
    "concepts": {
        "concept-ohms-law": {
            "displayName": "định luật Ohm",
            "description": "Định luật Ohm kết nối điện áp, dòng điện và điện trở trong mạch điện.",
            "summary": "Mối quan hệ giữa điện áp, dòng điện và điện trở.",
            "sections": [
                {
                    "id": "relationship",
                    "title": "Mối quan hệ",
                    "paragraphs": [
                        "Mối quan hệ cơ bản rất hữu ích bất cứ khi nào điện trở của một thành phần gần như không đổi."
                    ],
                    "formulas": [
                        {
                            "expression": "V = Tôi × R"
                        }
                    ],
                    "bullets": [
                        "V là điện áp, đo bằng vôn (V).",
                        "I là dòng điện, được đo bằng ampe hoặc ampe (A).",
                        "R là điện trở, được đo bằng ohm (\\u03a9)."
                    ]
                },
                {
                    "id": "rearranged-formulas",
                    "title": "Công thức được sắp xếp lại",
                    "paragraphs": [
                        "Sử dụng phiên bản đặt giá trị bạn muốn tìm ở bên trái:"
                    ],
                    "formulas": [
                        {
                            "expression": "Tôi = V/R"
                        },
                        {
                            "expression": "R = V / tôi"
                        }
                    ],
                    "bullets": [
                        "Tăng điện áp làm tăng dòng điện khi điện trở không đổi.",
                        "Tăng điện trở làm giảm dòng điện khi điện áp không đổi.",
                        "Điện trở bằng 0 \\u03a9 là hiện tượng đoản mạch lý tưởng và phải được xử lý riêng."
                    ]
                },
                {
                    "id": "worked-examples",
                    "title": "Ví dụ đã làm việc",
                    "examples": [
                        {
                            "title": "Tìm hiện tại",
                            "setup": "Nguồn 4,2 V được kết nối với tải 1,0 \\u03a9.",
                            "formulas": [
                                "I = 4,2 V / 1,0 \\u03a9 = 4,2 A"
                            ],
                            "conclusion": "Dòng điện tải là 4,2 A."
                        },
                        {
                            "title": "Tìm mức kháng cự",
                            "setup": "Một đoạn mạch có hiệu điện thế 12V chạy qua thì có dòng điện 2A.",
                            "formulas": [
                                "R = 12 V / 2 A = 6 \\u03a9"
                            ],
                            "conclusion": "Điện trở của mạch là 6 \\u03a9."
                        },
                        {
                            "title": "Tìm điện áp",
                            "setup": "Một dòng điện 0,5 A chạy qua điện trở 10 \\u03a9.",
                            "formulas": [
                                "V = 0,5 A × 10 Ω = 5 V"
                            ],
                            "conclusion": "Điện áp là 5 V."
                        }
                    ]
                },
                {
                    "id": "electrical-power",
                    "title": "Năng lượng điện",
                    "formulas": [
                        {
                            "expression": "P = V × I = I^2 × R = V^2 / R"
                        }
                    ],
                    "paragraphs": [
                        "Định luật Ohm kết hợp với mối quan hệ công suất P = V × I. Công suất P được đo bằng watt (W). Đối với nguồn 4,2 V và tải 1,0 Ω, công suất lý tưởng là 17,64 W. Bộ phận này cần có đủ công suất nhiệt và khoảng trống để tản nhiệt sinh ra một cách an toàn."
                    ]
                },
                {
                    "id": "unit-conversions",
                    "title": "Chuyển đổi đơn vị",
                    "paragraphs": [
                        "Giữ đơn vị nhất quán trước khi tính toán:"
                    ],
                    "bullets": [
                        "1 k\\u03a9 = 1.000 \\u03a9",
                        "1 M\\u03a9 = 1.000.000 \\u03a9",
                        "1 mA = 0,001 A",
                        "1 W = 1.000 mW"
                    ]
                },
                {
                    "id": "limits",
                    "title": "Giới hạn của mô hình",
                    "paragraphs": [
                        "Định luật Ohm là một mô hình lý tưởng hóa. Các thành phần thực có thể không phải là ohm: điện trở của chúng có thể thay đổi theo nhiệt độ, điện áp, dòng điện, tần số hoặc trạng thái hoạt động. Đối với mạng nối tiếp và mạng song song, sử dụng định luật Kirchhoff cùng với định luật Ohm."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Ohm%27s_law"
        },
        "concept-joule-heating": {
            "displayName": "sưởi ấm Joule",
            "description": "Gia nhiệt Joule mô tả sự chuyển đổi năng lượng điện thành nhiệt khi dòng điện chạy qua điện trở.",
            "summary": "Làm thế nào dòng điện biến điện trở thành nhiệt.",
            "sections": [
                {
                    "id": "heating-power",
                    "title": "Sức mạnh sưởi ấm",
                    "paragraphs": [
                        "Công suất sưởi ấm bằng điện là:"
                    ],
                    "formulas": [
                        {
                            "expression": "P = V × tôi"
                        },
                        {
                            "expression": "P = I^2 × R"
                        },
                        {
                            "expression": "P = V^2 / R"
                        }
                    ],
                    "bullets": [
                        "P là công suất tính bằng watt (W).",
                        "V là điện áp tính bằng vôn (V).",
                        "I có dòng điện tính bằng ampe (A)."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ví dụ hoạt động",
                    "examples": [
                        {
                            "title": "Tải điện trở",
                            "setup": "Một cuộn dây 0,8 \\u03a9 mang 3 A.",
                            "formulas": [
                                "P = I^2 × R = 3^2 × 0,8 = 7,2 W",
                                "E = P × t = 7,2 W × 10 s = 72 J"
                            ],
                            "conclusion": "Cuộn dây chuyển đổi năng lượng thành nhiệt với tốc độ 7,2 joules mỗi giây hoặc 72 J trong 10 giây."
                        }
                    ]
                },
                {
                    "id": "what-affects-heating",
                    "title": "Điều gì ảnh hưởng đến sưởi ấm",
                    "bullets": [
                        "Ở điện trở không đổi, dòng điện tăng gấp đôi sẽ tạo ra công suất sưởi ấm gấp bốn lần.",
                        "Ở dòng điện không đổi, điện trở tăng gấp đôi sẽ làm tăng gấp đôi công suất sưởi ấm.",
                        "Ở điện áp không đổi, việc giảm điện trở sẽ làm tăng công suất sưởi ấm.",
                        "Truyền nhiệt sang không khí, chất lỏng và phần cứng xác định nhiệt độ thực tế."
                    ],
                    "paragraphs": [
                        "Năng lượng điện là tốc độ truyền năng lượng, không phải nhiệt độ. Công suất nhiệt và dòng nhiệt xác định năng lượng đó thay đổi nhiệt độ như thế nào và nó rời khỏi bề mặt nhanh như thế nào."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Kiểm tra thực hành",
                    "paragraphs": [
                        "Kiểm tra xem các bộ phận, kết nối và lớp cách điện có thể chịu được dòng điện và công suất dự kiến hay không. Sử dụng khoảng không thích hợp vì các bộ phận thực tế có thể nóng không đều và điện trở có thể thay đổi theo nhiệt độ. Pin và nguồn điện cũng có giới hạn dòng điện liên tục."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Joule_heating"
        },
        "concept-kirchhoffs-laws": {
            "displayName": "định luật Kirchhoff",
            "description": "Định luật dòng điện và điện áp của Kirchhoff mô tả sự bảo toàn tại các nút mạch và xung quanh các vòng kín.",
            "summary": "Dòng điện và điện áp hoạt động như thế nào trong các mạch được kết nối.",
            "sections": [
                {
                    "id": "circuit-terms",
                    "title": "Thuật ngữ mạch",
                    "paragraphs": [
                        "Các thuật ngữ cơ bản làm cho sơ đồ mạch dễ lý giải hơn về:"
                    ],
                    "bullets": [
                        "Nút là một tập hợp các dây dẫn được kết nối mà không có thành phần can thiệp.",
                        "Một nhánh là một đường dẫn hiện tại giữa hai nút.",
                        "Vòng lặp là một đường dẫn khép kín quay trở lại điểm bắt đầu.",
                        "Một kết nối nối tiếp chỉ cung cấp một đường dẫn duy nhất qua các thành phần.",
                        "Một kết nối song song nối các nhánh của hai nút giống nhau."
                    ]
                },
                {
                    "id": "current-law",
                    "title": "Định luật hiện hành Kirchhoff",
                    "formulas": [
                        {
                            "expression": "Σ tôi = 0"
                        },
                        {
                            "expression": "ΣI_in = ΣI_out"
                        }
                    ],
                    "paragraphs": [
                        "Nếu 8 A đi vào một nút và một nhánh mang 3 A đi thì các nhánh còn lại phải mang tổng cộng 5 A đi. Chọn hướng dòng điện trước khi giải; kết quả âm có nghĩa là dòng điện thực chạy ngược với hướng giả định."
                    ]
                },
                {
                    "id": "series-and-parallel",
                    "title": "Mạch nối tiếp và song song",
                    "formulas": [
                        {
                            "expression": "I_tổng = I_1 = I_2 = ..."
                        },
                        {
                            "expression": "R_tổng = R_1 + R_2 + ..."
                        },
                        {
                            "expression": "I_tổng = I_1 + I_2 + ..."
                        },
                        {
                            "expression": "1/R_total = 1/R_1+1/R_2+…"
                        }
                    ],
                    "examples": [
                        {
                            "title": "Dòng điện trở",
                            "setup": "Hai điện trở 0,20 \\u03a9 mắc nối tiếp với điện áp 8,0 V.",
                            "formulas": [
                                "R_total = 0,40 \\u03a9",
                                "I = 8,0 V / 0,40 Ω = 20 A"
                            ],
                            "conclusion": "20 A giống nhau đi qua cả hai điện trở."
                        },
                        {
                            "title": "Điện trở song song",
                            "setup": "Hai nhánh 0,40 \\u03a9 bằng nhau được kết nối với 4,0 V.",
                            "formulas": [
                                "R_total = 0,20 \\u03a9",
                                "I_total = 4,0 V / 0,20 Ω = 20 A"
                            ],
                            "conclusion": "Với điện trở nhánh bằng nhau, mỗi nhánh mang 10 A."
                        }
                    ]
                },
                {
                    "id": "voltage-law",
                    "title": "Định luật điện áp Kirchhoff",
                    "formulas": [
                        {
                            "expression": "Σ V = 0"
                        },
                        {
                            "expression": "+8,0V - V_1 - V_2 = 0"
                        },
                        {
                            "expression": "V_total = V_1 = V_2 = ... (các nhánh song song)"
                        }
                    ],
                    "paragraphs": [
                        "Tổng đại số của điện áp tăng và giảm xung quanh một vòng kín bằng không. Chọn một hướng vòng lặp và giữ các cực nhất quán. Đảo ngược hướng làm thay đổi dấu hiệu chứ không phải giải pháp vật lý. Điện trở nối tiếp lớn hơn có độ sụt điện áp lớn hơn vì cùng một dòng điện chạy qua mọi thành phần nối tiếp."
                    ]
                },
                {
                    "id": "cells",
                    "title": "Các tế bào nối tiếp và song song",
                    "formulas": [
                        {
                            "expression": "V_pack = V_1 + V_2 + ... (loạt)"
                        },
                        {
                            "expression": "C_pack = C_1 + C_2 + ... (song song)"
                        }
                    ],
                    "bullets": [
                        "Các ô nối tiếp thêm điện áp trong khi công suất ampe giờ vẫn bằng một ô bằng nhau.",
                        "Các tế bào song song giữ cùng một điện áp trong khi công suất và dòng điện khả dụng tăng thêm xấp xỉ.",
                        "Việc chia sẻ dòng điện phụ thuộc vào điện trở trong, các tiếp điểm, hệ thống dây điện và công tắc.",
                        "Việc sạc lithium-ion nối tiếp yêu cầu giám sát ở cấp độ tế bào và cân bằng hoặc bảo vệ thích hợp."
                    ]
                },
                {
                    "id": "solving-and-limits",
                    "title": "Giải mạch thực",
                    "bullets": [
                        "Đánh dấu điện áp nút, dòng điện nhánh và hướng dòng điện giả định.",
                        "Áp dụng KCL tại các nút độc lập và KVL xung quanh các vòng độc lập.",
                        "Liên hệ điện áp và dòng điện với V = I × R.",
                        "Giải các phương trình đồng thời và kiểm tra cân bằng công suất."
                    ],
                    "paragraphs": [
                        "Một mô hình đơn giản hóa có thể bỏ qua điện trở trong của tế bào, điện trở tiếp điểm, hiệu suất của bộ chuyển đổi, hiệu ứng nhiệt độ, hành vi nhất thời, mạch bảo vệ và dung sai thành phần. Bao gồm mọi hành vi bị bỏ qua có ảnh hưởng nghiêm trọng đến mạch điện cao thế."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws"
        },
        "concept-temperature-coefficient-of-resistance": {
            "displayName": "Hệ số kháng nhiệt độ (TCR)",
            "description": "Hệ số nhiệt độ của điện trở ước tính điện trở thay đổi như thế nào khi vật liệu nóng lên hoặc nguội đi.",
            "summary": "Điện trở của vật liệu thay đổi như thế nào theo nhiệt độ.",
            "sections": [
                {
                    "id": "linear-model",
                    "title": "Mô hình tuyến tính",
                    "paragraphs": [
                        "Đối với sự thay đổi nhiệt độ nhỏ hoặc vừa phải, hãy sử dụng mối quan hệ bậc nhất:"
                    ],
                    "formulas": [
                        {
                            "expression": "R_T = R_0 [1 + \\u03b1 (T - T_0)]"
                        }
                    ],
                    "bullets": [
                        "R_0 là điện trở ở nhiệt độ tham chiếu T_0.",
                        "R_T là điện trở ước tính ở nhiệt độ T.",
                        "\\u03b1 là hệ số nhiệt độ của vật liệu, được biểu thị bằng 1/°C hoặc ppm/°C.",
                        "Nhiệt độ phải sử dụng cùng thang đo và đơn vị cho chênh lệch T - T_0."
                    ]
                },
                {
                    "id": "positive-and-negative",
                    "title": "TCR dương và âm",
                    "bullets": [
                        "TCR dương có nghĩa là điện trở tăng khi nhiệt độ tăng; nhiều kim loại hành xử theo cách này.",
                        "TCR âm có nghĩa là điện trở giảm khi nhiệt độ tăng.",
                        "TCR gần bằng 0 có nghĩa là điện trở thay đổi ít trong phạm vi chỉ định.",
                        "Dấu của hệ số có ý nghĩa quan trọng; thay thế một giá trị âm bằng giá trị tuyệt đối của nó sẽ đảo ngược dự đoán."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ví dụ hoạt động",
                    "examples": [
                        {
                            "title": "Một điện trở nóng",
                            "setup": "Điện trở 1,00 \\u03a9 được chỉ định ở 20 \\u00b0C, với TCR là 400 ppm/\\u00b0C.",
                            "formulas": [
                                "\\u03b1 = 400 × 10^-6 / \\u00b0C = 0,0004 / \\u00b0C",
                                "\\u0394T = 100 - 20 = 80 \\u00b0C",
                                "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 \\u03a9"
                            ],
                            "conclusion": "Điện trở ước tính là 1,032 \\u03a9, cao hơn khoảng 3,2% so với giá trị của nó ở 20 \\u00b0C."
                        }
                    ]
                },
                {
                    "id": "power-and-limits",
                    "title": "TCR, công suất và giới hạn thực tế",
                    "formulas": [
                        {
                            "expression": "Tôi = V/R"
                        },
                        {
                            "expression": "P = V^2 / R = I^2 × R"
                        }
                    ],
                    "paragraphs": [
                        "Đối với điện trở TCR dương được điều khiển ở điện áp không đổi, nhiệt độ tăng sẽ làm tăng điện trở và có xu hướng giảm dòng điện. Đối với nguồn dòng không đổi, việc tăng điện trở tương tự sẽ làm tăng công suất.",
                        "TCR của nhà sản xuất thường áp dụng cho phạm vi nhiệt độ và điện trở đã nêu. Độ dốc nhiệt độ, thay đổi vật liệu, tiếp xúc, biến dạng cơ học và tự phát nhiệt có thể làm cho kết quả thực tế khác với ước tính bậc nhất."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance"
        },
        "concept-trigonometry": {
            "displayName": "lượng giác",
            "description": "Lượng giác liên quan đến góc và độ dài, đồng thời rất hữu ích cho các vectơ, mối quan hệ pha và dạng sóng.",
            "summary": "Mối quan hệ giữa các góc và các cạnh của tam giác.",
            "sections": [
                {
                    "id": "right-triangles",
                    "title": "Tam giác vuông",
                    "paragraphs": [
                        "So với góc θ, cạnh đối diện đối diện với góc đó, cạnh kề tiếp xúc với góc đó không kể cạnh huyền, cạnh huyền đối diện với góc vuông. SOH-CAH-TOA là một công cụ hỗ trợ trí nhớ: sin đối diện với cạnh huyền, cosin kề trên cạnh huyền, và tiếp tuyến đối diện với cạnh huyền."
                    ],
                    "formulas": [
                        {
                            "expression": "sin(θ) = đối diện / cạnh huyền"
                        },
                        {
                            "expression": "cos(θ) = liền kề / cạnh huyền"
                        },
                        {
                            "expression": "tan(θ) = đối diện / liền kề"
                        }
                    ]
                },
                {
                    "id": "finding-sides-and-angles",
                    "title": "Tìm các cạnh và góc chưa biết",
                    "examples": [
                        {
                            "title": "Tìm một bên",
                            "setup": "Một cạnh huyền 10 cm gặp một góc 30°.",
                            "formulas": [
                                "đối diện = 10 × sin(30°) = 5 cm",
                                "liền kề = 10 × cos(30°) ≈ 8,66 cm"
                            ],
                            "conclusion": "Sử dụng hàm lượng giác nghịch đảo khi biết độ dài các cạnh."
                        }
                    ],
                    "formulas": [
                        {
                            "expression": "θ = sin^-1(đối diện / cạnh huyền)"
                        },
                        {
                            "expression": "θ = cos^-1(liền kề / cạnh huyền)"
                        },
                        {
                            "expression": "θ = tan^-1(đối diện / liền kề)"
                        }
                    ]
                },
                {
                    "id": "degrees-and-radians",
                    "title": "Độ và radian",
                    "formulas": [
                        {
                            "expression": "180° = π radian"
                        },
                        {
                            "expression": "θ_rad = θ_deg × π / 180"
                        }
                    ],
                    "paragraphs": [
                        "Máy tính phải ở chế độ góc chính xác. Sử dụng chế độ độ cho giá trị radian hoặc ngược lại sẽ tạo ra kết quả khác. Một chu kỳ hoàn chỉnh là 360° hoặc 2π radian."
                    ]
                },
                {
                    "id": "waveforms-and-identities",
                    "title": "Dạng sóng và nhận dạng hữu ích",
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
                        "A là biên độ, f là tần số tính bằng hertz, t là thời gian tính bằng giây và φ là góc pha.",
                        "Tần số góc ω được đo bằng radian trên giây.",
                        "Giữ dấu hiệu và góc phần tư khi hướng hoặc pha quan trọng."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Trigonometry"
        },
        "concept-heat-capacity": {
            "displayName": "công suất nhiệt",
            "description": "Công suất nhiệt kết nối năng lượng truyền với sự thay đổi nhiệt độ của vật thể hoặc vật liệu.",
            "summary": "Một vật cần bao nhiêu năng lượng để thay đổi nhiệt độ.",
            "sections": [
                {
                    "id": "basic-relationships",
                    "title": "Các mối quan hệ cơ bản",
                    "formulas": [
                        {
                            "expression": "C = Q / ΔT"
                        },
                        {
                            "expression": "Q = m × c × ΔT"
                        }
                    ],
                    "bullets": [
                        "C là nhiệt dung tính bằng J/K hoặc J/°C.",
                        "Q được truyền năng lượng nhiệt tính bằng joules (J).",
                        "m là khối lượng tính bằng kilogam và c là nhiệt dung riêng tính bằng J/(kg·K).",
                        "Chênh lệch nhiệt độ 1 K có cùng độ lớn với chênh lệch 1 ° C."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ví dụ hoạt động",
                    "examples": [
                        {
                            "title": "Nước nóng",
                            "setup": "Đun nóng 0,20 kg nước từ 20 °C đến 70 °C với c = 4.180 J/(kg·K).",
                            "formulas": [
                                "ΔT = 70 - 20 = 50°C",
                                "Q = 0,20 × 4.180 × 50 = 41.800 J"
                            ],
                            "conclusion": "Yêu cầu năng lượng lý tưởng là 41,8 kJ; một lò sưởi thực sự cần nhiều hơn vì tổn thất."
                        }
                    ]
                },
                {
                    "id": "electrical-heating",
                    "title": "Sưởi ấm bằng năng lượng điện",
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
                            "title": "Thời gian sưởi ấm lý tưởng",
                            "setup": "Làm nóng ví dụ 41,8 kJ với nguồn 100 W không đổi và không tổn thất.",
                            "formulas": [
                                "t = 41.800 J / 100 W = 418 giây"
                            ],
                            "conclusion": "Thời gian lý tưởng là khoảng 7,0 phút; ở hiệu suất truyền 80% là khoảng 523 giây."
                        }
                    ]
                },
                {
                    "id": "object-and-material",
                    "title": "Đối tượng so với vật chất",
                    "paragraphs": [
                        "Nhiệt dung thuộc về toàn bộ vật thể và phụ thuộc vào lượng vật chất có mặt. Nhiệt dung riêng là một tính chất của vật chất. Tăng gấp đôi khối lượng sẽ tăng gấp đôi công suất nhiệt cho cùng một vật liệu."
                    ],
                    "formulas": [
                        {
                            "expression": "C_total = Σ m_i × c_i"
                        }
                    ]
                },
                {
                    "id": "phase-changes-and-limits",
                    "title": "Thay đổi pha và giới hạn thực tế",
                    "formulas": [
                        {
                            "expression": "Q = m × L"
                        }
                    ],
                    "paragraphs": [
                        "Trong quá trình nóng chảy hoặc sôi, năng lượng được cung cấp có thể thay đổi trạng thái của vật liệu mà không làm thay đổi nhiệt độ của nó. L là nhiệt dung riêng, tính bằng J/kg.",
                        "Phương trình đơn giản giả sử nhiệt dung riêng gần như không đổi. Sự mất nhiệt, đối lưu, bức xạ, bay hơi, điện trở tiếp xúc và nhiệt độ không đồng đều có thể làm cho kết quả thực tế khác với lý tưởng."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_capacity"
        },
        "concept-heat-flux": {
            "displayName": "dòng nhiệt",
            "description": "Dòng nhiệt mô tả tốc độ nhiệt truyền qua một bề mặt, không phụ thuộc vào tổng lượng nhiệt lưu trữ của vật liệu.",
            "summary": "Tốc độ truyền nhiệt qua một đơn vị diện tích.",
            "sections": [
                {
                    "id": "definition",
                    "title": "Định nghĩa",
                    "formulas": [
                        {
                            "expression": "q'' = Q_dot / A"
                        }
                    ],
                    "bullets": [
                        "q'' là thông lượng nhiệt tính bằng W/m2.",
                        "Q_dot là tổng tốc độ truyền nhiệt tính bằng watt (W).",
                        "A là diện tích truyền nhiệt tính bằng mét vuông (m2)."
                    ],
                    "paragraphs": [
                        "Thông lượng nhiệt khác với công suất nhiệt: công suất nhiệt mô tả năng lượng dự trữ trên mỗi sự thay đổi nhiệt độ, trong khi thông lượng nhiệt mô tả tốc độ nhiệt truyền qua một bề mặt."
                    ]
                },
                {
                    "id": "worked-example",
                    "title": "Ví dụ hoạt động",
                    "examples": [
                        {
                            "title": "Thông lượng lò sưởi trung bình",
                            "setup": "Một lò sưởi 100 W truyền nhiệt qua diện tích 0,020 mét vuông.",
                            "formulas": [
                                "q'' = 100 W / 0,020 m2 = 5.000 W/m2"
                            ],
                            "conclusion": "Thông lượng nhiệt trung bình là 5.000 W/m2, hoặc 0,5 W/cm2."
                        }
                    ]
                },
                {
                    "id": "conduction",
                    "title": "Dẫn điện qua lớp phẳng",
                    "formulas": [
                        {
                            "expression": "q'' = -k × ΔT / L"
                        },
                        {
                            "expression": "Q_dot = k × A × (T_nóng - T_cold) / L"
                        }
                    ],
                    "bullets": [
                        "k là độ dẫn nhiệt tính bằng W/(m·K).",
                        "ΔT là chênh lệch nhiệt độ giữa lớp.",
                        "L là độ dày lớp tính bằng mét.",
                        "Dấu trừ biểu thị dòng chảy từ nhiệt độ cao hơn về nhiệt độ thấp hơn."
                    ]
                },
                {
                    "id": "convection-and-radiation",
                    "title": "Đối lưu và bức xạ",
                    "formulas": [
                        {
                            "expression": "q'' = h × (T_s - T_∞)"
                        },
                        {
                            "expression": "q'' = ε × σ × (T_s^4 - T_sur^4)"
                        }
                    ],
                    "paragraphs": [
                        "Đối lưu sử dụng hệ số bề mặt h. Bức xạ sử dụng độ phát xạ ε và hằng số Stefan–Boltzmann σ; nhiệt độ trong phương trình bức xạ phải là nhiệt độ tuyệt đối tính bằng kelvin."
                    ]
                },
                {
                    "id": "practical-checks",
                    "title": "Kiểm tra thực hành",
                    "bullets": [
                        "Chuyển đổi diện tích sang m2 trước khi sử dụng W/m2.",
                        "Phân biệt thông lượng nhiệt trung bình với đỉnh cục bộ; hệ thống sưởi có thể không đồng đều.",
                        "Bao gồm điện trở tiếp xúc, đối lưu, bức xạ và mất nhiệt khi cần thiết.",
                        "Thông lượng nhiệt là tốc độ truyền chứ không phải nhiệt độ; sử dụng nhiệt năng để thay đổi nhiệt độ."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Heat_flux"
        },
        "concept-si-system-and-imperial-units": {
            "displayName": "Hệ SI và các phép đo hệ Anh",
            "description": "Hệ thống đơn vị quốc tế cung cấp các đơn vị cơ sở nhất quán, đơn vị dẫn xuất và tỷ lệ thập phân cho kỹ thuật.",
            "summary": "Đơn vị, tiền tố và chuyển đổi được sử dụng trong tính toán kỹ thuật.",
            "sections": [
                {
                    "id": "base-units",
                    "title": "Đơn vị SI thông thường",
                    "table": {
                        "headers": [
                            "số lượng",
                            "đơn vị SI",
                            "Biểu tượng"
                        ],
                        "rows": [
                            [
                                "Chiều dài",
                                "mét",
                                "tôi"
                            ],
                            [
                                "Thánh lễ",
                                "kg",
                                "kg"
                            ],
                            [
                                "thời gian",
                                "thứ hai",
                                "s"
                            ],
                            [
                                "Nhiệt độ",
                                "kelvin",
                                "K"
                            ],
                            [
                                "Dòng điện",
                                "ampe",
                                "A"
                            ],
                            [
                                "Lượng chất",
                                "nốt ruồi",
                                "mol"
                            ],
                            [
                                "Cường độ sáng",
                                "nến",
                                "đĩa CD"
                            ]
                        ]
                    },
                    "bullets": [
                        "Điện áp: vôn (V).",
                        "Điện trở: ohm (\\u03a9).",
                        "Công suất: watt (W).",
                        "Năng lượng: joule (J).",
                        "Lực: newton (N).",
                        "Áp suất: pascal (Pa).",
                        "Tần số: hertz (Hz)."
                    ]
                },
                {
                    "id": "decimal-prefixes",
                    "title": "Tiền tố thập phân",
                    "table": {
                        "headers": [
                            "Tiền tố",
                            "Biểu tượng",
                            "Yếu tố"
                        ],
                        "rows": [
                            [
                                "kg",
                                "k",
                                "1.000 = 10^3"
                            ],
                            [
                                "lớn",
                                "M",
                                "1.000.000 = 10^6"
                            ],
                            [
                                "milimét",
                                "tôi",
                                "0,001 = 10^-3"
                            ],
                            [
                                "vi mô",
                                "μ",
                                "0,000001 = 10^-6"
                            ],
                            [
                                "nano",
                                "n",
                                "0,000000001 = 10^-9"
                            ]
                        ]
                    },
                    "paragraphs": [
                        "Ví dụ: 2,2 k\\u03a9 bằng 2.200 \\u03a9 và 15 mA bằng 0,015 A. Chuyển đổi giá trị sang đơn vị tương thích trước khi sử dụng công thức."
                    ]
                },
                {
                    "id": "length-conversions",
                    "title": "Inch và chiều dài số liệu",
                    "formulas": [
                        {
                            "expression": "1 inch = 25,4 mm = 0,0254 m"
                        },
                        {
                            "expression": "1 foot = 12 inch = 0,3048 m"
                        },
                        {
                            "expression": "1 yard = 3 feet = 0,9144 m"
                        },
                        {
                            "expression": "1 inch vuông = 645,16 mm vuông"
                        }
                    ],
                    "examples": [
                        {
                            "title": "Chuyển đổi độ dài",
                            "setup": "Chuyển đổi 0,1 inch sang milimét và 5 mm sang inch.",
                            "formulas": [
                                "0,1 inch × 25,4 = 2,54 mm",
                                "5 mm / 25,4 ≈ 0,19685 inch"
                            ],
                            "conclusion": "Chuyển đổi diện tích và thể tích sử dụng hệ số chiều dài được nâng lên lũy thừa liên quan."
                        }
                    ]
                },
                {
                    "id": "other-conversions",
                    "title": "Các chuyển đổi phổ biến khác",
                    "bullets": [
                        "1 lb ≈ 0,45359237 kg.",
                        "1 lbf ≈ 4,44822 N.",
                        "1 psi ≈ 6.894,76 Pa.",
                        "°F = °C × 9/5 + 32.",
                        "°C = (°F - 32) × 5/9.",
                        "K = °C + 273,15."
                    ],
                    "paragraphs": [
                        "Một pound có thể đề cập đến khối lượng (lb) hoặc lực (lbf), là những đại lượng khác nhau. Tương tự, inch, inch vuông và inch khối đo các kích thước khác nhau."
                    ]
                },
                {
                    "id": "unit-checks",
                    "title": "Kiểm tra đơn vị thực hành",
                    "bullets": [
                        "Viết đơn vị bên cạnh mỗi giá trị trong khi tính toán.",
                        "Xác nhận rằng cả hai vế của phương trình đều có các kích thước tương thích.",
                        "Chuyển đổi trước khi nhân hoặc chia.",
                        "Chỉ làm tròn ở cuối để kết quả trung gian giữ được độ chính xác hữu ích."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/International_System_of_Units"
        },
        "concept-wire-gauges-awg-swg-bwg": {
            "displayName": "Đồng hồ đo dây: AWG, SWG và BWG",
            "description": "Số máy đo chỉ mô tả kích thước danh nghĩa khi hệ thống máy đo của nó được đặt tên.",
            "summary": "Tại sao các số đo dây cần có hệ thống đặt tên và đường kính đã nêu.",
            "sections": [
                {
                    "id": "gauge-systems",
                    "title": "Hệ thống đo",
                    "bullets": [
                        "AWG là Máy đo dây của Mỹ, còn được gọi là máy đo Brown & Sharpe trong lịch sử.",
                        "SWG là Máy đo dây tiêu chuẩn, hệ thống đo độ dày dây và tấm lịch sử của Anh.",
                        "BWG là Máy đo dây Birmingham, trước đây được sử dụng cho dây sắt, ống và độ dày tấm.",
                        "Số đo thông thường lớn hơn thường có nghĩa là đường kính nhỏ hơn; kích thước trên thước đo 0 sử dụng 00, 000 hoặc 0000."
                    ],
                    "paragraphs": [
                        "SWG và BWG là các hệ thống được lập bảng và không được tính toán bằng công thức AWG. Do đó, cùng một số không xác định cùng một đường kính trên các hệ thống."
                    ]
                },
                {
                    "id": "awg-formula",
                    "title": "Đường kính và diện tích AWG",
                    "formulas": [
                        {
                            "expression": "d_inch = 0,005 × 92^((36 - n) / 39)"
                        },
                        {
                            "expression": "d_mm = 0,127 × 92^((36 - n) / 39)"
                        },
                        {
                            "expression": "A = π × d^2 / 4"
                        }
                    ],
                    "paragraphs": [
                        "Đối với 1/0, 2/0, 3/0 và 4/0, hãy sử dụng n = 0, -1, -2 và -3. AWG xác định kích thước dây dẫn, không phải dòng điện an toàn phổ quát; độ khuếch đại cũng phụ thuộc vào vật liệu, cách điện, làm mát, lắp đặt và các quy tắc điện hiện hành."
                    ]
                },
                {
                    "id": "system-comparison",
                    "title": "Tại sao tên hệ thống lại quan trọng",
                    "table": {
                        "headers": [
                            "Máy đo",
                            "AWG",
                            "SWG của Anh",
                            "BWG"
                        ],
                        "rows": [
                            [
                                "10",
                                "2,588 mm",
                                "3,251 mm",
                                "3,404mm"
                            ],
                            [
                                "20",
                                "0,8128 mm",
                                "0,9144 mm",
                                "0,8890mm"
                            ],
                            [
                                "30",
                                "0,2540mm",
                                "0,3150mm",
                                "0,3048 mm"
                            ]
                        ]
                    },
                    "paragraphs": [
                        "Những giá trị này là danh nghĩa. Dung sai của sản phẩm, lớp phủ, lớp cách nhiệt và kết cấu bện có thể thay đổi đường kính đo được hoặc đường kính tổng thể."
                    ]
                },
                {
                    "id": "resistance",
                    "title": "Máy đo, diện tích và điện trở",
                    "formulas": [
                        {
                            "expression": "R = ρ × L / A"
                        }
                    ],
                    "paragraphs": [
                        "Điện trở phụ thuộc vào chiều dài dây dẫn L, diện tích mặt cắt ngang A và điện trở suất của vật liệu ρ. Bởi vì diện tích thay đổi theo bình phương đường kính, nên sự chênh lệch đường kính khiêm tốn có thể tạo ra sự khác biệt đáng kể về điện trở. Trong AWG, việc tăng thước đo lên ba kích cỡ sẽ làm giảm gần một nửa diện tích và tăng gấp đôi điện trở trên mỗi đơn vị chiều dài đối với cùng một vật liệu và nhiệt độ."
                    ]
                },
                {
                    "id": "practical-specification",
                    "title": "Thông số thực tế",
                    "bullets": [
                        "Đặt tên cho hệ thống, chẳng hạn như 24 AWG hoặc 24 British SWG.",
                        "Bao gồm đường kính danh nghĩa tính bằng milimét khi hệ thống có thể bị nhầm lẫn.",
                        "Nêu rõ kích thước là dây dẫn trần, đường kính cách điện, độ dày tấm hoặc độ dày thành ống.",
                        "Đối với dây dẫn bị mắc kẹt, hãy bao gồm việc xây dựng sợi khi tính linh hoạt và đường kính tổng thể là vấn đề quan trọng.",
                        "Xác định công suất hiện tại từ dữ liệu sản phẩm và quy tắc điện, không chỉ từ số máy đo."
                    ]
                }
            ],
            "wikipediaUrl": "https://en.wikipedia.org/wiki/Wire_gauge"
        }
    },
    "materials": {
        "ka1": {
            "displayName": "Kanthal A1 / APM",
            "description": "Hồ sơ danh mục cho Kanthal A1 / APM.",
            "summary": "Hồ sơ danh mục cho Kanthal A1 / APM."
        },
        "ka": {
            "displayName": "Kanthal A / AE / AF",
            "description": "Hồ sơ danh mục cho Kanthal A / AE / AF.",
            "summary": "Hồ sơ danh mục cho Kanthal A / AE / AF."
        },
        "kd": {
            "displayName": "Kanthal D",
            "description": "Hồ sơ danh mục cho Kanthal D.",
            "summary": "Hồ sơ danh mục cho Kanthal D."
        },
        "n20": {
            "displayName": "Nichrome N20",
            "description": "Hồ sơ danh mục cho Nichrome N20.",
            "summary": "Hồ sơ danh mục cho Nichrome N20."
        },
        "n40": {
            "displayName": "Nichrome N40",
            "description": "Hồ sơ danh mục cho Nichrome N40.",
            "summary": "Hồ sơ danh mục cho Nichrome N40."
        },
        "n60": {
            "displayName": "Nichrome N60 (C)",
            "description": "Hồ sơ danh mục cho Nichrome N60 (C).",
            "summary": "Hồ sơ danh mục cho Nichrome N60 (C)."
        },
        "n70": {
            "displayName": "Nichrome N70 (B)",
            "description": "Hồ sơ danh mục cho Nichrome N70 (B).",
            "summary": "Hồ sơ danh mục cho Nichrome N70 (B)."
        },
        "n80": {
            "displayName": "Nichrome N80 (A)",
            "description": "Hồ sơ danh mục cho Nichrome N80 (A).",
            "summary": "Hồ sơ danh mục cho Nichrome N80 (A)."
        },
        "ss304": {
            "displayName": "SS 304",
            "description": "Hồ sơ danh mục cho SS 304.",
            "summary": "Hồ sơ danh mục cho SS 304."
        },
        "ss316": {
            "displayName": "SS 316",
            "description": "Hồ sơ danh mục cho SS 316.",
            "summary": "Hồ sơ danh mục cho SS 316."
        },
        "ss316l": {
            "displayName": "SS 316L / Elite",
            "description": "Hồ sơ danh mục cho SS 316L / Elite.",
            "summary": "Hồ sơ danh mục cho SS 316L / Elite."
        },
        "ss317l": {
            "displayName": "SS 317L / Haywire",
            "description": "Hồ sơ danh mục cho SS 317L / Haywire.",
            "summary": "Hồ sơ danh mục cho SS 317L / Haywire."
        },
        "ss430": {
            "displayName": "SS 430",
            "description": "Hồ sơ danh mục cho SS 430.",
            "summary": "Hồ sơ danh mục cho SS 430."
        },
        "ti1": {
            "displayName": "Titanium 1",
            "description": "Hồ sơ danh mục cho Titanium 1.",
            "summary": "Hồ sơ danh mục cho Titanium 1."
        },
        "ti2": {
            "displayName": "Titanium 2 (R50400)",
            "description": "Hồ sơ danh mục cho Titanium 2 (R50400).",
            "summary": "Hồ sơ danh mục cho Titanium 2 (R50400)."
        },
        "tie": {
            "displayName": "Titanium ready (e-SG)",
            "description": "Hồ sơ danh mục cho Titanium ready (e-SG).",
            "summary": "Hồ sơ danh mục cho Titanium ready (e-SG)."
        },
        "w": {
            "displayName": "Tungsten",
            "description": "Hồ sơ danh mục cho Tungsten.",
            "summary": "Hồ sơ danh mục cho Tungsten."
        },
        "nio": {
            "displayName": "Niobium alloy",
            "description": "Hồ sơ danh mục cho Niobium alloy.",
            "summary": "Hồ sơ danh mục cho Niobium alloy."
        },
        "ni200": {
            "displayName": "Nickel 200 / Ni200 (UNS N02200)",
            "description": "Hồ sơ danh mục cho Nickel 200 / Ni200 (UNS N02200).",
            "summary": "Hồ sơ danh mục cho Nickel 200 / Ni200 (UNS N02200)."
        },
        "nife30": {
            "displayName": "NiFe30 (Resistherm - TFR)",
            "description": "Hồ sơ danh mục cho NiFe30 (Resistherm - TFR).",
            "summary": "Hồ sơ danh mục cho NiFe30 (Resistherm - TFR)."
        },
        "dicodes": {
            "displayName": "NiFe30 (Resistherm - TCR)",
            "description": "Hồ sơ danh mục cho NiFe30 (Resistherm - TCR).",
            "summary": "Hồ sơ danh mục cho NiFe30 (Resistherm - TCR)."
        },
        "reactor": {
            "displayName": "NiFe (Reactor Wire)",
            "description": "Hồ sơ danh mục cho NiFe (Reactor Wire).",
            "summary": "Hồ sơ danh mục cho NiFe (Reactor Wire)."
        },
        "nife30stealth": {
            "displayName": "NiFe30 (StealthVape)",
            "description": "Hồ sơ danh mục cho NiFe30 (StealthVape).",
            "summary": "Hồ sơ danh mục cho NiFe30 (StealthVape)."
        },
        "nft70": {
            "displayName": "Nifethal 70 (Alloy120)",
            "description": "Hồ sơ danh mục cho Nifethal 70 (Alloy120).",
            "summary": "Hồ sơ danh mục cho Nifethal 70 (Alloy120)."
        },
        "nft52": {
            "displayName": "Nifethal 52 (Alloy52)",
            "description": "Hồ sơ danh mục cho Nifethal 52 (Alloy52).",
            "summary": "Hồ sơ danh mục cho Nifethal 52 (Alloy52)."
        },
        "zr": {
            "displayName": "Zirconium (pure)",
            "description": "Hồ sơ danh mục cho Zirconium (pure).",
            "summary": "Hồ sơ danh mục cho Zirconium (pure)."
        },
        "n90": {
            "displayName": "Nichrome N90 (Ni90Cr10)",
            "description": "Hồ sơ danh mục cho Nichrome N90 (Ni90Cr10).",
            "summary": "Hồ sơ danh mục cho Nichrome N90 (Ni90Cr10)."
        },
        "ss904l": {
            "displayName": "SS 904L (UNS N08904)",
            "description": "Hồ sơ danh mục cho SS 904L (UNS N08904).",
            "summary": "Hồ sơ danh mục cho SS 904L (UNS N08904)."
        }
    },
    "batteries": {
        "battery-1": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-2": {
            "displayName": "AW IMR 14500",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-3": {
            "displayName": "AW IMR 16340",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-4": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-5": {
            "displayName": "AW IMR 18350",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-6": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-7": {
            "displayName": "AW IMR 18490",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-8": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-9": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-10": {
            "displayName": "AW IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-11": {
            "displayName": "AWT 26650 4500mAh 75A",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-12": {
            "displayName": "EH IMR 18350",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-13": {
            "displayName": "EH IMR 18500",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-14": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-15": {
            "displayName": "EH IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-16": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-17": {
            "displayName": "Efest IMR 18350",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-18": {
            "displayName": "Efest IMR 18490",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-19": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-20": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-21": {
            "displayName": "Efest IMR 18500",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-22": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-23": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-24": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-25": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-26": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-27": {
            "displayName": "Efest IMR 18650 35A",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-28": {
            "displayName": "Efest IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-29": {
            "displayName": "Efest IMR 26650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-30": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": undefined,
            "summary": "Bộ pin bên trong thiết bị chứ không phải pin người dùng có thể thay thế.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-31": {
            "displayName": "Innokin iTaste VV v3",
            "description": undefined,
            "summary": "Bộ pin bên trong thiết bị chứ không phải pin người dùng có thể thay thế.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-32": {
            "displayName": "Keeppower IMR26650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-33": {
            "displayName": "LG 18650HB6",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-34": {
            "displayName": "LG 18650HE2",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-35": {
            "displayName": "LG 18650HG2",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-36": {
            "displayName": "MNKE IMR 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-37": {
            "displayName": "MNKE IMR 26650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-38": {
            "displayName": "MXJO IMR 18650 35A",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-39": {
            "displayName": "MXJO IMR 18650 20A",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-40": {
            "displayName": "Nitecore NL188",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-41": {
            "displayName": "Orbtronic 18650 PD2900",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-42": {
            "displayName": "Orbtronic 18650 SX22",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-43": {
            "displayName": "Orbtronic 18650 SX30",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-44": {
            "displayName": "Orbtronic 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-45": {
            "displayName": "Orbtronic CGR18650CH",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-46": {
            "displayName": "Orbtronic NCR18650A",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-47": {
            "displayName": "Panasonic CGR18650CH",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-48": {
            "displayName": "Panasonic NCR18650A",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-49": {
            "displayName": "Panasonic NCR18650B",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-50": {
            "displayName": "Panasonic NCR18650BD",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-51": {
            "displayName": "Panasonic NCR18650PF",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-52": {
            "displayName": "Panasonic CGR26650A",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-53": {
            "displayName": "Samsung ICR18650-26F",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-54": {
            "displayName": "Panasonic NCR18650PD",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-55": {
            "displayName": "Samsung INR18650-20R",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-56": {
            "displayName": "Samsung INR18650-25R",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-57": {
            "displayName": "Samsung INR18650-20Q",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-58": {
            "displayName": "Samsung INR18650-30Q",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-59": {
            "displayName": "Sanyo UR16650ZTA",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-60": {
            "displayName": "Sanyo UR18650EX",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-61": {
            "displayName": "Sanyo UR18650F",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": "Pin tiêu hao thấp; không thích hợp cho vaping."
        },
        "battery-62": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-63": {
            "displayName": "Sibeile IMR 18500",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-64": {
            "displayName": "Sony US18650VTC3",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-65": {
            "displayName": "Sony US18650VTC4",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-66": {
            "displayName": "Sony US18650VTC5",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-67": {
            "displayName": "Sony US18650v3",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-68": {
            "displayName": "Sony US26650VT",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-69": {
            "displayName": "Torchy IMR 18350",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-70": {
            "displayName": "Vappower IMR 26650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-71": {
            "displayName": "Vamped 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "20 Đánh giá liên tục; xếp hạng xung không được sử dụng."
            ],
            "safetyText": undefined
        },
        "battery-72": {
            "displayName": "UltraFire BRC 18650 4000mAh li-ion",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "Công suất thực tế thấp hơn nhãn gợi ý."
            ],
            "safetyText": undefined
        },
        "battery-73": {
            "displayName": "UltraFire XSL 18350 1200mAh",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "Công suất thực tế thấp hơn nhãn gợi ý."
            ],
            "safetyText": undefined
        },
        "battery-74": {
            "displayName": "Vamped 26650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-75": {
            "displayName": "Xtar IMR 18350",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-76": {
            "displayName": "Xtar IMR 18500",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": undefined,
            "safetyText": undefined
        },
        "battery-77": {
            "displayName": "EVE INR18650/30P",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "20 Giá trị so sánh độc lập bảo thủ; trình bao bọc chính xác và sửa đổi sản xuất vẫn có liên quan."
            ],
            "safetyText": undefined
        },
        "battery-78": {
            "displayName": "EVE INR18650/25P",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "15 Giá trị thận trọng từ thử nghiệm mô hình chính xác; bản sửa đổi được đánh dấu CCC đã được thử nghiệm vẫn có liên quan."
            ],
            "safetyText": undefined
        },
        "battery-79": {
            "displayName": "EVE INR18650/30PL",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "45 Một giá trị liên tục độc lập cho việc sửa đổi các bảng đã được kiểm tra; không thay thế xếp hạng xung."
            ],
            "safetyText": undefined
        },
        "battery-80": {
            "displayName": "Ampace JP30P1",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "36 Giá trị thực liên tục; con số 56 A bị giới hạn nhiệt độ."
            ],
            "safetyText": undefined
        },
        "battery-81": {
            "displayName": "Tenpower INR18650-30XG",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "40 Một giá trị bảo toàn; các tế bào được thử nghiệm đã xuất hiện trước khi sản xuất và thiếu logo CCC."
            ],
            "safetyText": undefined
        },
        "battery-82": {
            "displayName": "EVE INR21700/58E",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "13 Giá trị liên tục được khuyến nghị; 16,8 A là mức tối đa tuyệt đối không dành cho vòng đời."
            ],
            "safetyText": undefined
        },
        "battery-83": {
            "displayName": "Reliance INR21700-RS40",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "40 Một giá trị bảo toàn; 70 A là nhiệt độ giới hạn và các mẫu được thử nghiệm là tiền sản xuất."
            ],
            "safetyText": undefined
        },
        "battery-84": {
            "displayName": "Reliance INR21700-RS50",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "40 Giá trị so sánh ô sản xuất; 70 A yêu cầu kiểm soát nhiệt độ."
            ],
            "safetyText": undefined
        },
        "battery-85": {
            "displayName": "Vapcell S41",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "40 Giá trị trình bao bọc chính xác; 70 A được giới hạn ở 60 C và được thử nghiệm dưới dạng gói lại EVE 40PL."
            ],
            "safetyText": undefined
        },
        "battery-86": {
            "displayName": "BAK 21700-65E",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "19 Một giá trị bảo thủ; các mẫu thử nghiệm chính xác xuất hiện trước khi sản xuất và thiếu dấu CCC."
            ],
            "safetyText": undefined
        },
        "battery-87": {
            "displayName": "Tenpower INR21700-50XG",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "40 Một giá trị bảo toàn; 90 A là nhiệt độ giới hạn và các tế bào được thử nghiệm đã xuất hiện trước khi sản xuất."
            ],
            "safetyText": undefined
        },
        "battery-88": {
            "displayName": "Tenpower INR21700-60XG",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "40 Một giá trị bảo toàn; 60 A bị giới hạn nhiệt độ và tính liên tục trong sản xuất vẫn chưa được giải quyết."
            ],
            "safetyText": undefined
        },
        "battery-89": {
            "displayName": "Great Power 50Q",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "40 Một giá trị bảo toàn; các mẫu thử nghiệm có công suất không nhất quán và thiếu dấu CCC/CE."
            ],
            "safetyText": undefined
        },
        "battery-90": {
            "displayName": "FEB 21700-68E",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "13 Giá trị bảo toàn; các mẫu thử nghiệm chính xác xuất hiện trước khi sản xuất và thiếu dấu CCC."
            ],
            "safetyText": undefined
        },
        "battery-91": {
            "displayName": "Reliance INR21700-RS60",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "30 Giá trị liên tục được người kiểm tra ước tính; Reliance's 50 A tối đa bị giới hạn nhiệt độ."
            ],
            "safetyText": undefined
        },
        "battery-92": {
            "displayName": "Reliance INR21700-RH60",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "20 Giá trị liên tục từ hai lô liên quan đến sản xuất được thử nghiệm; 30 A là giới hạn nhiệt độ."
            ],
            "safetyText": undefined
        },
        "battery-93": {
            "displayName": "Amprius INR18650/40 (SA110)",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "12 A liên tục; 20 A chỉ có xung. Trình bao bọc được kiểm tra chính xác được ghi lại là SA110 / INR18650/40."
            ],
            "safetyText": undefined
        },
        "battery-94": {
            "displayName": "Vapcell B30 18650",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "20 Giá trị trình bao bọc chính xác; người thử nghiệm khuyến nghị dưới 15 A liên tục. Vapehuset quảng cáo 25 A trong tiêu đề của nó và sau đó gói lại các bản sửa đổi nguồn hoặc trình bao bọc có thể khác nhau."
            ],
            "safetyText": undefined
        },
        "battery-95": {
            "displayName": "Golisi S35 21700",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "30 Giá trị mô hình chính xác; đây là bản tóm tắt lại và các bản sửa đổi trình bao bọc sau này hoặc nguồn cung cấp cơ bản có thể khác."
            ],
            "safetyText": undefined
        },
        "battery-96": {
            "displayName": "iJoy 20700 3000mAh five-leg",
            "description": undefined,
            "summary": "Một tế bào sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
            "notes": [
                "30 Giá trị sửa đổi năm chân chính xác; Các phiên bản bốn chân trở lên sử dụng cùng một lớp bọc sẽ khác nhau về mặt vật chất và không được kế thừa hồ sơ này."
            ],
            "safetyText": undefined
        }
    },
    "mods": {
        "preset-1": {
            "displayName": "AceSmok Ace 50",
            "description": "Hồ sơ thiết bị vaping được quy định cho AceSmok Ace 50.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho AceSmok Ace 50."
        },
        "preset-2": {
            "displayName": "Ante Meridiem Axis",
            "description": "Hồ sơ thiết bị vaping được quy định cho Ante Meridiem Axis.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Ante Meridiem Axis."
        },
        "preset-3": {
            "displayName": "Anyvape AnyMOD",
            "description": "Hồ sơ thiết bị vaping được quy định cho Anyvape AnyMOD.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Anyvape AnyMOD."
        },
        "preset-4": {
            "displayName": "Arrow 100W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Arrow 100W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Arrow 100W."
        },
        "preset-5": {
            "displayName": "Artisan Supermax",
            "description": "Hồ sơ thiết bị vaping được quy định cho Artisan Supermax.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Artisan Supermax."
        },
        "preset-6": {
            "displayName": "Asmodus Snow Wolf 200W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Asmodus Snow Wolf 200W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Asmodus Snow Wolf 200W."
        },
        "preset-7": {
            "displayName": "Aspire CF Sub Ohm",
            "description": "Hồ sơ thiết bị vaping được quy định cho Aspire CF Sub Ohm.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Aspire CF Sub Ohm."
        },
        "preset-8": {
            "displayName": "Beastmode Industries BMI 100 Watt V.1",
            "description": "Hồ sơ thiết bị vaping được quy định cho Beastmode Industries BMI 100 Watt V.1.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Beastmode Industries BMI 100 Watt V.1."
        },
        "preset-9": {
            "displayName": "Billet Box rev. 3a",
            "description": "Billet Box Rev. 3a với lớp hoàn thiện bằng nhôm anodized được phun hạt, nhúng sáng; được giới thiệu vào tháng 5 năm 2014.",
            "summary": "Hộp phôi Rev."
        },
        "preset-10": {
            "displayName": "Cloupor DNA-30",
            "description": "Thiết bị Cloupor 30 W sử dụng chipset nhân bản kiểu DNA30 của bên thứ ba chứ không phải bo mạch Evolv DNA-30D đích thực.",
            "summary": "Thiết bị Cloupor 30 W sử dụng chipset nhân bản kiểu DNA30 của bên thứ ba chứ không phải bo mạch Evolv DNA-30D đích thực."
        },
        "preset-11": {
            "displayName": "Cloupor DNA-50",
            "description": "Hồ sơ thiết bị vaping được quy định cho Cloupor DNA-50.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Cloupor DNA-50."
        },
        "preset-12": {
            "displayName": "Cloupor GT",
            "description": "Hồ sơ thiết bị vaping được quy định cho Cloupor GT.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Cloupor GT."
        },
        "preset-13": {
            "displayName": "Cloupor Mini",
            "description": "Hồ sơ thiết bị vaping được quy định cho Cloupor Mini.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Cloupor Mini."
        },
        "preset-14": {
            "displayName": "Cloupor T5",
            "description": "Hồ sơ thiết bị vaping được quy định cho Cloupor T5.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Cloupor T5."
        },
        "preset-15": {
            "displayName": "Cloupor T6",
            "description": "Hồ sơ thiết bị vaping được quy định cho Cloupor T6.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Cloupor T6."
        },
        "preset-16": {
            "displayName": "Cloupor T8",
            "description": "Hồ sơ thiết bị vaping được quy định cho Cloupor T8.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Cloupor T8."
        },
        "preset-17": {
            "displayName": "Cloupor ZNA50",
            "description": "Hồ sơ thiết bị vaping được quy định cho Cloupor ZNA50.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Cloupor ZNA50."
        },
        "preset-18": {
            "displayName": "C-Tratech Smart Box 50W",
            "description": "Hồ sơ thiết bị vaping được quy định cho C-Tratech Smart Box 50W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho C-Tratech Smart Box 50W."
        },
        "preset-19": {
            "displayName": "Dicodes Dani Extreme",
            "description": "Hồ sơ thiết bị vaping được quy định cho Dicodes Dani Extreme.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Dicodes Dani Extreme."
        },
        "preset-20": {
            "displayName": "Dicodes Dani Extreme v2 / Pipeline Pro v2",
            "description": "Cấu hình thiết bị vaping được quy định cho Dicodes Dani Extreme v2 / Pipeline Pro v2.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Dicodes Dani Extreme v2 / Pipeline Pro v2."
        },
        "preset-21": {
            "displayName": "DJK Wood Mods The Nerd VV",
            "description": "Hồ sơ thiết bị vaping được quy định cho DJK Wood Mods The Nerd VV.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho DJK Wood Mods The Nerd VV."
        },
        "preset-22": {
            "displayName": "Dovpo DT-50",
            "description": "Hồ sơ thiết bị vaping được quy định cho Dovpo DT-50.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Dovpo DT-50."
        },
        "preset-23": {
            "displayName": "Dovpo E-LVT",
            "description": "Hồ sơ thiết bị vaping được quy định cho Dovpo E-LVT.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Dovpo E-LVT."
        },
        "preset-24": {
            "displayName": "Dovpo E-Mech",
            "description": "Hồ sơ thiết bị vaping được quy định cho Dovpo E-Mech.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Dovpo E-Mech."
        },
        "preset-25": {
            "displayName": "Dovpo TC 50",
            "description": "Cấu hình thiết bị vaping được quy định cho Dovpo TC 50.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Dovpo TC 50."
        },
        "preset-26": {
            "displayName": "eGo Twist",
            "description": "Hồ sơ thiết bị vaping được quy định cho eGo Twist.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho eGo Twist."
        },
        "preset-27": {
            "displayName": "eGo-V V3",
            "description": "Hồ sơ thiết bị vaping được quy định cho eGo-V V3.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho eGo-V V3."
        },
        "preset-28": {
            "displayName": "Evod V v3",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evod V v3.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evod V v3."
        },
        "preset-29": {
            "displayName": "Evolv DNA-20D",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-20D.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-20D."
        },
        "preset-30": {
            "displayName": "Evolv DNA-30D",
            "description": "Cấu hình thiết bị vaping được quy định cho Evolv DNA-30D.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-30D."
        },
        "preset-31": {
            "displayName": "Evolv DNA-40 (std. wire)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-40 (std. wire).",
            "summary": "Cấu hình thiết bị vaping được quy định cho Evolv DNA-40 (std."
        },
        "preset-32": {
            "displayName": "Evolv DNA-40 (Ni 200)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-40 (Ni 200).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-40 (Ni 200)."
        },
        "preset-33": {
            "displayName": "Evolv DNA60 (non-color)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA60 (non-color).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA60 (non-color)."
        },
        "preset-34": {
            "displayName": "Evolv DNA-75",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-75.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-75."
        },
        "preset-35": {
            "displayName": "Evolv DNA-200 (2 cells, DNA-133)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-200 (2 cells, DNA-133).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-200 (2 cells, DNA-133)."
        },
        "preset-36": {
            "displayName": "Evolv DNA-200 (3 cells)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-200 (3 cells).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-200 (3 cells)."
        },
        "preset-37": {
            "displayName": "Evolv DNA-200 (TC mode)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-200 (TC mode).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-200 (TC mode)."
        },
        "preset-38": {
            "displayName": "Evolv DNA-250 (2 cells, DNA-166)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-250 (2 cells, DNA-166).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-250 (2 cells, DNA-166)."
        },
        "preset-39": {
            "displayName": "Evolv DNA-250 (3 cells)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-250 (3 cells).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA-250 (3 cells)."
        },
        "preset-40": {
            "displayName": "Evolv Kick 2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv Kick 2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv Kick 2."
        },
        "preset-41": {
            "displayName": "Eleaf iStick",
            "description": "Hồ sơ thiết bị vaping được quy định cho Eleaf iStick.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Eleaf iStick."
        },
        "preset-42": {
            "displayName": "Eleaf iStick 30W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Eleaf iStick 30W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Eleaf iStick 30W."
        },
        "preset-43": {
            "displayName": "Eleaf iStick 40W TC",
            "description": "Hồ sơ thiết bị vaping được quy định cho Eleaf iStick 40W TC.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Eleaf iStick 40W TC."
        },
        "preset-44": {
            "displayName": "Eleaf iStick 50W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Eleaf iStick 50W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Eleaf iStick 50W."
        },
        "preset-45": {
            "displayName": "Eleaf iStick 100W",
            "description": "Cấu hình thiết bị vaping được quy định cho Eleaf iStick 100W.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Eleaf iStick 100W."
        },
        "preset-46": {
            "displayName": "Gossmods The Duke",
            "description": "Hồ sơ thiết bị vaping được quy định cho Gossmods The Duke.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Gossmods The Duke."
        },
        "preset-47": {
            "displayName": "Grand Innovations GI2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Grand Innovations GI2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Grand Innovations GI2."
        },
        "preset-48": {
            "displayName": "Heatvape Invader Mini",
            "description": "Hồ sơ thiết bị vaping được quy định cho Heatvape Invader Mini.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Heatvape Invader Mini."
        },
        "preset-49": {
            "displayName": "Heatvape Invader Mini (TC mode)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Heatvape Invader Mini (TC mode).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Heatvape Invader Mini (TC mode)."
        },
        "preset-50": {
            "displayName": "iJoy A160",
            "description": "Hồ sơ thiết bị vaping được quy định cho iJoy A160.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho iJoy A160."
        },
        "preset-51": {
            "displayName": "Innokin Cool Fire II",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin Cool Fire II.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin Cool Fire II."
        },
        "preset-52": {
            "displayName": "Innokin Cool Fire IV",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin Cool Fire IV.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin Cool Fire IV."
        },
        "preset-53": {
            "displayName": "Innokin Disrupter",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin Disrupter.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin Disrupter."
        },
        "preset-54": {
            "displayName": "Innokin iTaste 134 / iTaste 134 mini",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste 134 / iTaste 134 mini.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste 134 / iTaste 134 mini."
        },
        "preset-55": {
            "displayName": "Innokin iTaste MVP 2.0",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste MVP 2.0.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste MVP 2.0."
        },
        "preset-56": {
            "displayName": "Innokin iTaste MVP 20 Watt",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste MVP 20 Watt.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste MVP 20 Watt."
        },
        "preset-57": {
            "displayName": "Innokin iTaste MVP 3.0",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste MVP 3.0.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste MVP 3.0."
        },
        "preset-58": {
            "displayName": "Innokin iTaste MVP 3 Pro",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste MVP 3 Pro.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste MVP 3 Pro."
        },
        "preset-59": {
            "displayName": "Innokin iTaste SVD",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste SVD.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste SVD."
        },
        "preset-60": {
            "displayName": "Innokin iTaste SVD2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste SVD2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste SVD2."
        },
        "preset-61": {
            "displayName": "Innokin iTaste VTR",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste VTR.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste VTR."
        },
        "preset-62": {
            "displayName": "Innokin iTaste VV V3.0",
            "description": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste VV V3.0.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Innokin iTaste VV V3.0."
        },
        "preset-63": {
            "displayName": "Joy4life Beyang 30W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Joy4life Beyang 30W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Joy4life Beyang 30W."
        },
        "preset-64": {
            "displayName": "Joyetech eCom Supreme",
            "description": "Hồ sơ thiết bị vaping được quy định cho Joyetech eCom Supreme.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Joyetech eCom Supreme."
        },
        "preset-65": {
            "displayName": "Joyetech eVic",
            "description": "Cấu hình thiết bị vaping được quy định cho Joyetech eVic.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Joyetech eVic."
        },
        "preset-66": {
            "displayName": "Joyetech eVic VT",
            "description": "Hồ sơ thiết bị vaping được quy định cho Joyetech eVic VT.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Joyetech eVic VT."
        },
        "preset-67": {
            "displayName": "Joyetech eVic VT (TC mode)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Joyetech eVic VT (TC mode).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Joyetech eVic VT (TC mode)."
        },
        "preset-68": {
            "displayName": "Joyetech eVic Supreme",
            "description": "Hồ sơ thiết bị vaping được quy định cho Joyetech eVic Supreme.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Joyetech eVic Supreme."
        },
        "preset-69": {
            "displayName": "J Well Alesia",
            "description": "Hồ sơ thiết bị vaping được quy định cho J Well Alesia.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho J Well Alesia."
        },
        "preset-70": {
            "displayName": "J Well Troca",
            "description": "Cấu hình thiết bị vaping được quy định cho J Well Troca.",
            "summary": "Cấu hình thiết bị vaping được quy định cho J Well Troca."
        },
        "preset-71": {
            "displayName": "Kanger e-Power v3",
            "description": "Cấu hình thiết bị vaping được quy định cho Kanger e-Power v3.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Kanger e-Power v3."
        },
        "preset-72": {
            "displayName": "Kanger IPOW 2",
            "description": "Cấu hình thiết bị vaping được quy định cho Kanger IPOW 2.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Kanger IPOW 2."
        },
        "preset-73": {
            "displayName": "Kanger KBOX",
            "description": "Hồ sơ thiết bị vaping được quy định cho Kanger KBOX.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Kanger KBOX."
        },
        "preset-74": {
            "displayName": "Kanger KBOX Mini / SUBOX Mini",
            "description": "Hồ sơ thiết bị vaping được quy định cho Kanger KBOX Mini / SUBOX Mini.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Kanger KBOX Mini / SUBOX Mini."
        },
        "preset-75": {
            "displayName": "Kanger K-Simar 20",
            "description": "Hồ sơ thiết bị vaping được quy định cho Kanger K-Simar 20.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Kanger K-Simar 20."
        },
        "preset-76": {
            "displayName": "Kangside e-Huge",
            "description": "Hồ sơ thiết bị vaping được quy định cho Kangside e-Huge.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Kangside e-Huge."
        },
        "preset-77": {
            "displayName": "Kamry 20",
            "description": "Hồ sơ thiết bị vaping được quy định cho Kamry 20.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Kamry 20."
        },
        "preset-78": {
            "displayName": "Kamry 60W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Kamry 60W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Kamry 60W."
        },
        "preset-79": {
            "displayName": "Kamry God Box",
            "description": "Cấu hình thiết bị vaping được quy định cho Kamry God Box.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Kamry God Box."
        },
        "preset-80": {
            "displayName": "KangXin VF clone v3",
            "description": "Hồ sơ thiết bị vaping được quy định cho KangXin VF clone v3.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho KangXin VF clone v3."
        },
        "preset-81": {
            "displayName": "KangXin KX5-50W",
            "description": "Hồ sơ thiết bị vaping được quy định cho KangXin KX5-50W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho KangXin KX5-50W."
        },
        "preset-82": {
            "displayName": "Koopor Mini KP60",
            "description": "Hồ sơ thiết bị vaping được quy định cho Koopor Mini KP60.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Koopor Mini KP60."
        },
        "preset-83": {
            "displayName": "Koopor Mini KP60 (TC)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Koopor Mini KP60 (TC).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Koopor Mini KP60 (TC)."
        },
        "preset-84": {
            "displayName": "KSD 30",
            "description": "Hồ sơ thiết bị vaping được quy định cho KSD 30.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho KSD 30."
        },
        "preset-85": {
            "displayName": "KSD Kmax (single battery)",
            "description": "Hồ sơ thiết bị vaping được quy định cho KSD Kmax (single battery).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho KSD Kmax (single battery)."
        },
        "preset-86": {
            "displayName": "KSD Kmax (stacked)",
            "description": "Hồ sơ thiết bị vaping được quy định cho KSD Kmax (stacked).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho KSD Kmax (stacked)."
        },
        "preset-87": {
            "displayName": "L-Rider Lambo 6.0",
            "description": "Hồ sơ thiết bị vaping được quy định cho L-Rider Lambo 6.0.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho L-Rider Lambo 6.0."
        },
        "preset-88": {
            "displayName": "L-Rider Lavatube",
            "description": "Hồ sơ thiết bị vaping được quy định cho L-Rider Lavatube.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho L-Rider Lavatube."
        },
        "preset-89": {
            "displayName": "Lotus Jellyfish",
            "description": "Hồ sơ thiết bị vaping được quy định cho Lotus Jellyfish.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Lotus Jellyfish."
        },
        "preset-90": {
            "displayName": "Lotus LE80",
            "description": "Hồ sơ thiết bị vaping được quy định cho Lotus LE80.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Lotus LE80."
        },
        "preset-91": {
            "displayName": "Luxyoun Smaug",
            "description": "Cấu hình thiết bị vaping được quy định cho Luxyoun Smaug.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Luxyoun Smaug."
        },
        "preset-92": {
            "displayName": "Majesty 150W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Majesty 150W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Majesty 150W."
        },
        "preset-93": {
            "displayName": "Megatron 260",
            "description": "Hồ sơ thiết bị vaping được quy định cho Megatron 260.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Megatron 260."
        },
        "preset-94": {
            "displayName": "Naos Raptor 10A",
            "description": "Hồ sơ thiết bị vaping được quy định cho Naos Raptor 10A.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Naos Raptor 10A."
        },
        "preset-95": {
            "displayName": "Naos Raptor 20A",
            "description": "Hồ sơ thiết bị vaping được quy định cho Naos Raptor 20A.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Naos Raptor 20A."
        },
        "preset-96": {
            "displayName": "Nivel V3",
            "description": "Hồ sơ thiết bị vaping được quy định cho Nivel V3.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Nivel V3."
        },
        "preset-97": {
            "displayName": "Notcigs VV",
            "description": "Hồ sơ thiết bị vaping được quy định cho Notcigs VV.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Notcigs VV."
        },
        "preset-98": {
            "displayName": "OKL2-T/20-W12",
            "description": "Hồ sơ thiết bị vaping được quy định cho OKL2-T/20-W12.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho OKL2-T/20-W12."
        },
        "preset-99": {
            "displayName": "OKR-T10",
            "description": "Hồ sơ thiết bị vaping được quy định cho OKR-T10.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho OKR-T10."
        },
        "preset-100": {
            "displayName": "Pioneer4You/Green Leaf P-Max",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf P-Max.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf P-Max."
        },
        "preset-101": {
            "displayName": "ProVari 2, ProVari 2.5",
            "description": "Hồ sơ thiết bị vaping được quy định cho ProVari 2, ProVari 2.5.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho ProVari 2, ProVari 2.5."
        },
        "preset-102": {
            "displayName": "ProVari P3 beta",
            "description": "Hồ sơ thiết bị vaping được quy định cho ProVari P3 beta.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho ProVari P3 beta."
        },
        "preset-103": {
            "displayName": "ProVari P35",
            "description": "Hồ sơ thiết bị vaping được quy định cho ProVari P35.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho ProVari P35."
        },
        "preset-104": {
            "displayName": "Psmoke GI2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Psmoke GI2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Psmoke GI2."
        },
        "preset-105": {
            "displayName": "RainbowHeaven Arrow",
            "description": "Hồ sơ thiết bị vaping được quy định cho RainbowHeaven Arrow.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho RainbowHeaven Arrow."
        },
        "preset-106": {
            "displayName": "Robbot Tech ZNA50",
            "description": "Cấu hình thiết bị vaping được quy định cho Robbot Tech ZNA50.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Robbot Tech ZNA50."
        },
        "preset-107": {
            "displayName": "Sigelei 20W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei 20W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei 20W."
        },
        "preset-108": {
            "displayName": "Sigelei 50W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei 50W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei 50W."
        },
        "preset-109": {
            "displayName": "Sigelei 75W TC",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei 75W TC.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei 75W TC."
        },
        "preset-110": {
            "displayName": "Sigelei 150W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei 150W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei 150W."
        },
        "preset-111": {
            "displayName": "Sigelei Fuchai 213 Plus",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei Fuchai 213 Plus.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei Fuchai 213 Plus."
        },
        "preset-112": {
            "displayName": "Sigelei Kick",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei Kick.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei Kick."
        },
        "preset-113": {
            "displayName": "Sigelei Legend v2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei Legend v2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei Legend v2."
        },
        "preset-114": {
            "displayName": "Sigelei Vmax",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei Vmax.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei Vmax."
        },
        "preset-115": {
            "displayName": "Sigelei Zmax V3",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei Zmax V3.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei Zmax V3."
        },
        "preset-116": {
            "displayName": "Sigelei Zmax V5",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei Zmax V5.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei Zmax V5."
        },
        "preset-117": {
            "displayName": "Simeiyue God 180",
            "description": "Hồ sơ thiết bị vaping được quy định cho Simeiyue God 180.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Simeiyue God 180."
        },
        "preset-118": {
            "displayName": "Simeiyue God 180s",
            "description": "Hồ sơ thiết bị vaping được quy định cho Simeiyue God 180s.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Simeiyue God 180s."
        },
        "preset-119": {
            "displayName": "Simeiyue God 260",
            "description": "Hồ sơ thiết bị vaping được quy định cho Simeiyue God 260.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Simeiyue God 260."
        },
        "preset-120": {
            "displayName": "Smok Ace",
            "description": "Hồ sơ thiết bị vaping được quy định cho Smok Ace.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Smok Ace."
        },
        "preset-121": {
            "displayName": "Smok BEC Pro",
            "description": "Hồ sơ thiết bị vaping được quy định cho Smok BEC Pro.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Smok BEC Pro."
        },
        "preset-122": {
            "displayName": "Smok G-Priv 220W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Smok G-Priv 220W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Smok G-Priv 220W."
        },
        "preset-123": {
            "displayName": "Smok Sid",
            "description": "Cấu hình thiết bị vaping được quy định cho Smok Sid.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Smok Sid."
        },
        "preset-124": {
            "displayName": "Smok X Cube II",
            "description": "Hồ sơ thiết bị vaping được quy định cho Smok X Cube II.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Smok X Cube II."
        },
        "preset-125": {
            "displayName": "Smok X Pro BT50",
            "description": "Hồ sơ thiết bị vaping được quy định cho Smok X Pro BT50.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Smok X Pro BT50."
        },
        "preset-126": {
            "displayName": "Smok X Pro M36",
            "description": "Cấu hình thiết bị vaping được quy định cho Smok X Pro M36.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Smok X Pro M36."
        },
        "preset-127": {
            "displayName": "Smok X Pro M50",
            "description": "Hồ sơ thiết bị vaping được quy định cho Smok X Pro M50.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Smok X Pro M50."
        },
        "preset-128": {
            "displayName": "Smok X Pro M80",
            "description": "Hồ sơ thiết bị vaping được quy định cho Smok X Pro M80.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Smok X Pro M80."
        },
        "preset-129": {
            "displayName": "Smok Zmax",
            "description": "Hồ sơ thiết bị vaping được quy định cho Smok Zmax.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Smok Zmax."
        },
        "preset-130": {
            "displayName": "Smok Zmax Mini",
            "description": "Hồ sơ thiết bị vaping được quy định cho Smok Zmax Mini.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Smok Zmax Mini."
        },
        "preset-131": {
            "displayName": "SMY 260W",
            "description": "Hồ sơ thiết bị vaping được quy định cho SMY 260W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho SMY 260W."
        },
        "preset-132": {
            "displayName": "SMY 50TC",
            "description": "Hồ sơ thiết bị vaping được quy định cho SMY 50TC.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho SMY 50TC."
        },
        "preset-133": {
            "displayName": "SMY GOD 180",
            "description": "Hồ sơ thiết bị vaping được quy định cho SMY GOD 180.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho SMY GOD 180."
        },
        "preset-134": {
            "displayName": "Steam STM-1 / STM-2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Steam STM-1 / STM-2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Steam STM-1 / STM-2."
        },
        "preset-135": {
            "displayName": "Sunzip Vapmod Deezel",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sunzip Vapmod Deezel.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sunzip Vapmod Deezel."
        },
        "preset-136": {
            "displayName": "Taifun The Eye",
            "description": "Hồ sơ thiết bị vaping được quy định cho Taifun The Eye.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Taifun The Eye."
        },
        "preset-137": {
            "displayName": "Taifun The Eye (updated)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Taifun The Eye (updated).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Taifun The Eye (updated)."
        },
        "preset-138": {
            "displayName": "Tesla",
            "description": "Hồ sơ thiết bị vaping được quy định cho Tesla.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Tesla."
        },
        "preset-139": {
            "displayName": "Tesla 120W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Tesla 120W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Tesla 120W."
        },
        "preset-140": {
            "displayName": "Tesla 2 Sub Mod",
            "description": "Hồ sơ thiết bị vaping được quy định cho Tesla 2 Sub Mod.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Tesla 2 Sub Mod."
        },
        "preset-141": {
            "displayName": "Tesla Spider",
            "description": "Hồ sơ thiết bị vaping được quy định cho Tesla Spider.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Tesla Spider."
        },
        "preset-142": {
            "displayName": "Tobeco ZNA 36",
            "description": "Hồ sơ thiết bị vaping được quy định cho Tobeco ZNA 36.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Tobeco ZNA 36."
        },
        "preset-143": {
            "displayName": "Vamo 35W (clone)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vamo 35W (clone).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vamo 35W (clone)."
        },
        "preset-144": {
            "displayName": "Vamo V1 / V2 / V3 / V5",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vamo V1 / V2 / V3 / V5.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vamo V1 / V2 / V3 / V5."
        },
        "preset-145": {
            "displayName": "Vamo V7",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vamo V7.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vamo V7."
        },
        "preset-146": {
            "displayName": "VaporFi Vox II",
            "description": "Cấu hình thiết bị vaping được quy định cho VaporFi Vox II.",
            "summary": "Cấu hình thiết bị vaping được quy định cho VaporFi Vox II."
        },
        "preset-147": {
            "displayName": "Vicious Ant VariAnt 120W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vicious Ant VariAnt 120W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vicious Ant VariAnt 120W."
        },
        "preset-148": {
            "displayName": "Vicious Ant VariAnt 250W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vicious Ant VariAnt 250W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vicious Ant VariAnt 250W."
        },
        "preset-149": {
            "displayName": "Vision Spinner / Spinner II",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vision Spinner / Spinner II.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vision Spinner / Spinner II."
        },
        "preset-150": {
            "displayName": "Vision X.Fir/X.Gun",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vision X.Fir/X.Gun.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vision X.Fir/X.Gun."
        },
        "preset-151": {
            "displayName": "Volcano Lavatube",
            "description": "Hồ sơ thiết bị vaping được quy định cho Volcano Lavatube.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Volcano Lavatube."
        },
        "preset-152": {
            "displayName": "Volcano Lavatube v2.5",
            "description": "Hồ sơ thiết bị vaping được quy định cho Volcano Lavatube v2.5.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Volcano Lavatube v2.5."
        },
        "preset-153": {
            "displayName": "Wismec Reuleaux RX200S (4.10)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Wismec Reuleaux RX200S (4.10).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Wismec Reuleaux RX200S (4.10)."
        },
        "preset-154": {
            "displayName": "YiHi SX130",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX130.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX130."
        },
        "preset-155": {
            "displayName": "YiHi SX130 v1.5",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX130 v1.5.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX130 v1.5."
        },
        "preset-156": {
            "displayName": "YiHi SX130H",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX130H.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX130H."
        },
        "preset-157": {
            "displayName": "YiHi SX220",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX220.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX220."
        },
        "preset-158": {
            "displayName": "YiHi SX300",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX300.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX300."
        },
        "preset-159": {
            "displayName": "YiHi SX330 V1 35W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V1 35W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V1 35W."
        },
        "preset-160": {
            "displayName": "YiHi SX330 V2 50W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V2 50W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V2 50W."
        },
        "preset-161": {
            "displayName": "YiHi SX330 V2C 70W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V2C 70W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V2C 70W."
        },
        "preset-162": {
            "displayName": "YiHi SX330 V2 S 60W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V2 S 60W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V2 S 60W."
        },
        "preset-163": {
            "displayName": "YiHi SX330 V3 100W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V3 100W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V3 100W."
        },
        "preset-164": {
            "displayName": "YiHi SX330 V3 150W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V3 150W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V3 150W."
        },
        "preset-165": {
            "displayName": "YiHi SX330 V3S 150W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V3S 150W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V3S 150W."
        },
        "preset-166": {
            "displayName": "YiHi SX330-V3Si 200W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330-V3Si 200W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330-V3Si 200W."
        },
        "preset-167": {
            "displayName": "YiHi SX330 V4S 100W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V4S 100W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX330 V4S 100W."
        },
        "preset-168": {
            "displayName": "YiHi SX350 30W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350 30W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350 30W."
        },
        "preset-169": {
            "displayName": "YiHi SX350 50W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350 50W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350 50W."
        },
        "preset-170": {
            "displayName": "YiHi SX350 100W",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350 100W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350 100W."
        },
        "preset-171": {
            "displayName": "YiHi SX350J VJ mode",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350J VJ mode.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350J VJ mode."
        },
        "preset-172": {
            "displayName": "YiHi SX350J VW/single batt mode",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350J VW/single batt mode.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350J VW/single batt mode."
        },
        "preset-173": {
            "displayName": "YiHi SX350J VW/dual batt mode",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350J VW/dual batt mode.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX350J VW/dual batt mode."
        },
        "preset-174": {
            "displayName": "YiHi SX470",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX470.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX470."
        },
        "preset-175": {
            "displayName": "YiHi SX450",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX450.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX450."
        },
        "preset-176": {
            "displayName": "YiHi SXMini",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SXMini.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SXMini."
        },
        "preset-177": {
            "displayName": "Beyond Vape Solara",
            "description": "Cấu hình thiết bị vaping được quy định cho Beyond Vape Solara.",
            "summary": "Cấu hình thiết bị vaping được quy định cho Beyond Vape Solara."
        },
        "preset-178": {
            "displayName": "Cana Modz",
            "description": "Hồ sơ thiết bị vaping được quy định cho Cana Modz.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Cana Modz."
        },
        "preset-179": {
            "displayName": "Craving Vapor HexOhm",
            "description": "Hồ sơ thiết bị vaping được quy định cho Craving Vapor HexOhm.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Craving Vapor HexOhm."
        },
        "preset-180": {
            "displayName": "Craving Vapor HexOhm V2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Craving Vapor HexOhm V2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Craving Vapor HexOhm V2."
        },
        "preset-181": {
            "displayName": "Hana Modz V3",
            "description": "Hồ sơ thiết bị vaping được quy định cho Hana Modz V3.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Hana Modz V3."
        },
        "preset-182": {
            "displayName": "Hana Modz DNA 40",
            "description": "Hồ sơ thiết bị vaping được quy định cho Hana Modz DNA 40.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Hana Modz DNA 40."
        },
        "preset-183": {
            "displayName": "Lost Vape Therion DNA 75",
            "description": "Hồ sơ thiết bị vaping được quy định cho Lost Vape Therion DNA 75.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Lost Vape Therion DNA 75."
        },
        "preset-184": {
            "displayName": "Lost Vape Therion DNA 133",
            "description": "Hồ sơ thiết bị vaping được quy định cho Lost Vape Therion DNA 133.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Lost Vape Therion DNA 133."
        },
        "preset-185": {
            "displayName": "Lost Vape Therion DNA 166",
            "description": "Hồ sơ thiết bị vaping được quy định cho Lost Vape Therion DNA 166.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Lost Vape Therion DNA 166."
        },
        "preset-186": {
            "displayName": "Notcigs Buzz Pro",
            "description": "Hồ sơ thiết bị vaping được quy định cho Notcigs Buzz Pro.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Notcigs Buzz Pro."
        },
        "preset-187": {
            "displayName": "Pioneer4You/Green Leaf Seven 22",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf Seven 22.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf Seven 22."
        },
        "preset-188": {
            "displayName": "Pioneer4You/Green Leaf Seven 30W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf Seven 30W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf Seven 30W."
        },
        "preset-189": {
            "displayName": "Pioneer4You/Green Leaf IPV",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV."
        },
        "preset-190": {
            "displayName": "Pioneer4You/Green Leaf IPV D2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV D2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV D2."
        },
        "preset-191": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV Mini.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV Mini."
        },
        "preset-192": {
            "displayName": "Pioneer4You/Green Leaf IPV Mini 2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV Mini 2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV Mini 2."
        },
        "preset-193": {
            "displayName": "Pioneer4You/Green Leaf IPV V2",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V2.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V2."
        },
        "preset-194": {
            "displayName": "Pioneer4You/Green Leaf IPV V2S",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V2S.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V2S."
        },
        "preset-195": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 100W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V3 100W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V3 100W."
        },
        "preset-196": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 150W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V3 150W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V3 150W."
        },
        "preset-197": {
            "displayName": "Pioneer4You/Green Leaf IPV V3 200W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V3 200W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V3 200W."
        },
        "preset-198": {
            "displayName": "Pioneer4You/Green Leaf IPV V4 100W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V4 100W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Pioneer4You/Green Leaf IPV V4 100W."
        },
        "preset-199": {
            "displayName": "Protovapor XPV DNA-20D",
            "description": "Hồ sơ thiết bị vaping được quy định cho Protovapor XPV DNA-20D.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Protovapor XPV DNA-20D."
        },
        "preset-200": {
            "displayName": "Protovapor XPV DNA-30D",
            "description": "Hồ sơ thiết bị vaping được quy định cho Protovapor XPV DNA-30D.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Protovapor XPV DNA-30D."
        },
        "preset-201": {
            "displayName": "Protovapor XPV DNA-40D",
            "description": "Hồ sơ thiết bị vaping được quy định cho Protovapor XPV DNA-40D.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Protovapor XPV DNA-40D."
        },
        "preset-202": {
            "displayName": "Raffmods Ranger",
            "description": "Hồ sơ thiết bị vaping được quy định cho Raffmods Ranger.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Raffmods Ranger."
        },
        "preset-203": {
            "displayName": "Reo VV Grand/Woodvil",
            "description": "Hồ sơ thiết bị vaping được quy định cho Reo VV Grand/Woodvil.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Reo VV Grand/Woodvil."
        },
        "preset-204": {
            "displayName": "Sigelei 30W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei 30W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei 30W."
        },
        "preset-205": {
            "displayName": "Sigelei Raptor",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei Raptor.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei Raptor."
        },
        "preset-206": {
            "displayName": "Sigelei 100W",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei 100W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei 100W."
        },
        "preset-207": {
            "displayName": "Sigelei Mini",
            "description": "Hồ sơ thiết bị vaping được quy định cho Sigelei Mini.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Sigelei Mini."
        },
        "preset-208": {
            "displayName": "SvoëMesto Semovar",
            "description": "Hồ sơ thiết bị vaping được quy định cho SvoëMesto Semovar.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho SvoëMesto Semovar."
        },
        "preset-209": {
            "displayName": "Vapor Flask v1/v2 DNA 30",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vapor Flask v1/v2 DNA 30.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vapor Flask v1/v2 DNA 30."
        },
        "preset-210": {
            "displayName": "Vapor Flask v2 DNA 40",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vapor Flask v2 DNA 40.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vapor Flask v2 DNA 40."
        },
        "preset-211": {
            "displayName": "Vapor Shark DNA",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vapor Shark DNA.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vapor Shark DNA."
        },
        "preset-212": {
            "displayName": "Vapor Shark DNA/rDNA 30",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vapor Shark DNA/rDNA 30.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vapor Shark DNA/rDNA 30."
        },
        "preset-213": {
            "displayName": "Vapor Shark rDNA 40",
            "description": "Hồ sơ thiết bị vaping được quy định cho Vapor Shark rDNA 40.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Vapor Shark rDNA 40."
        },
        "preset-214": {
            "displayName": "Geekvape Aegis Legend 5",
            "description": "Hồ sơ thiết bị vaping được quy định cho Geekvape Aegis Legend 5.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Geekvape Aegis Legend 5."
        },
        "preset-215": {
            "displayName": "Evolv DNA60C",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA60C.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA60C."
        },
        "preset-216": {
            "displayName": "Evolv DNA100C",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA100C.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA100C."
        },
        "preset-217": {
            "displayName": "Evolv DNA250C (2S)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA250C (2S).",
            "summary": "Cấu hình thiết bị vaping được quy định cho Evolv DNA250C (2S)."
        },
        "preset-218": {
            "displayName": "Evolv DNA250C (3S, US firmware)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA250C (3S, US firmware).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA250C (3S, US firmware)."
        },
        "preset-219": {
            "displayName": "Evolv DNA250C (3S, international firmware)",
            "description": "Cấu hình thiết bị vaping được quy định cho Evolv DNA250C (3S, international firmware).",
            "summary": "Cấu hình thiết bị vaping được quy định cho Evolv DNA250C (3S, international firmware)."
        },
        "preset-220": {
            "displayName": "Evolv DNA250C (4S)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA250C (4S).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA250C (4S)."
        },
        "preset-221": {
            "displayName": "VOOPOO DRAG 6",
            "description": "Hồ sơ thiết bị vaping được quy định cho VOOPOO DRAG 6.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho VOOPOO DRAG 6."
        },
        "preset-222": {
            "displayName": "YiHi SXmini MQ Class",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SXmini MQ Class.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SXmini MQ Class."
        },
        "preset-223": {
            "displayName": "Evolv DNA80C",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA80C.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA80C."
        },
        "preset-224": {
            "displayName": "Evolv DNA75C",
            "description": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA75C.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Evolv DNA75C."
        },
        "preset-225": {
            "displayName": "YiHi SX600H",
            "description": "Hồ sơ thiết bị vaping được quy định cho YiHi SX600H.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho YiHi SX600H."
        },
        "preset-226": {
            "displayName": "Craving Vapor HexOhm V3",
            "description": "Hồ sơ thiết bị vaping được quy định cho Craving Vapor HexOhm V3.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Craving Vapor HexOhm V3."
        },
        "preset-227": {
            "displayName": "VOOPOO VINCI Spark220",
            "description": "Hồ sơ thiết bị vaping được quy định cho VOOPOO VINCI Spark220.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho VOOPOO VINCI Spark220."
        },
        "preset-228": {
            "displayName": "Dovpo x TVC Topside Dual",
            "description": "Hồ sơ thiết bị vaping được quy định cho Dovpo x TVC Topside Dual.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Dovpo x TVC Topside Dual."
        },
        "preset-229": {
            "displayName": "VOOPOO DRAG 5",
            "description": "Hồ sơ thiết bị vaping được quy định cho VOOPOO DRAG 5.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho VOOPOO DRAG 5."
        },
        "preset-230": {
            "displayName": "Geekvape L200 Classic",
            "description": "Hồ sơ thiết bị vaping được quy định cho Geekvape L200 Classic.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Geekvape L200 Classic."
        },
        "preset-231": {
            "displayName": "VAPORESSO ARMOUR MAX",
            "description": "Mod điều chỉnh Dual-21700 với bộ điều hợp 18650; VAPORESSO đánh giá nó là 220 W; thử nghiệm đo được 208 W, 8,979 V và 39 A.",
            "summary": "Mod điều chỉnh Dual-21700 với bộ điều hợp 18650; VAPORESSO đánh giá nó là 220 W; thử nghiệm đo được 208 W, 8,979 V và 39 A."
        },
        "preset-232": {
            "displayName": "Geekvape Aegis Legend 2 (L200)",
            "description": "Hồ sơ thiết bị vaping được quy định cho Geekvape Aegis Legend 2 (L200).",
            "summary": "Hồ sơ thiết bị vaping được quy định cho Geekvape Aegis Legend 2 (L200)."
        },
        "preset-233": {
            "displayName": "ProVape ProVari Radius 40 W",
            "description": "Hồ sơ thiết bị vaping được quy định cho ProVape ProVari Radius 40 W.",
            "summary": "Hồ sơ thiết bị vaping được quy định cho ProVape ProVari Radius 40 W."
        },
        "preset-234": {
            "displayName": "VAPORESSO GEN MAX",
            "description": "Mod quy định Dual-18650; VAPORESSO đánh giá nó là 220 W; thử nghiệm đo được 215 W, 9,08 V và 37 A.",
            "summary": "Mod quy định Dual-18650; VAPORESSO đánh giá nó là 220 W; thử nghiệm đo được 215 W, 9,08 V và 37 A."
        },
        "preset-235": {
            "displayName": "VAPORESSO ARMOUR ULTRA",
            "description": "Mod điều chỉnh bằng pin tích hợp có công suất định mức 100 W; thử nghiệm đo được 101 W, 29 A và ít nhất 7,97 V.",
            "summary": "Mod điều chỉnh bằng pin tích hợp có công suất định mức 100 W; thử nghiệm đo được 101 W, 29 A và ít nhất 7,97 V."
        },
        "preset-236": {
            "displayName": "Geekvape Aegis Solo 3",
            "description": "Mod điều chỉnh đơn 18650 sử dụng AS Chip 4.0; hồ sơ nhà sản xuất là 100 W, 7,5 V, 32 A, 0,1–3 Ω.",
            "summary": "Mod điều chỉnh đơn 18650 sử dụng AS Chip 4.0; hồ sơ nhà sản xuất là 100 W, 7,5 V, 32 A, 0,1–3 Ω."
        },
        "preset-237": {
            "displayName": "Eleaf iStick Pico 21700",
            "description": "Mod bộ chuyển đổi 21700/18650 một ô; Eleaf chỉ định 100 W, 9 V, 0,05–3,5 Ω; thử nghiệm xác định 30 A.",
            "summary": "Mod bộ chuyển đổi 21700/18650 một ô; Eleaf chỉ định 100 W, 9 V, 0,05–3,5 Ω; thử nghiệm xác định 30 A."
        },
        "preset-238": {
            "displayName": "Vandy Vape Pulse V2",
            "description": "Mod squonk được điều chỉnh một ô cho các ô 21700, 20700 hoặc 18650 được điều chỉnh với cấu hình 95 W, 6 V, 34 A bảo thủ.",
            "summary": "Mod squonk được điều chỉnh một ô cho các ô 21700, 20700 hoặc 18650 được điều chỉnh với cấu hình 95 W, 6 V, 34 A bảo thủ."
        }
    }
};
