/* Machine-materialized draft. Human review may edit string values. */

import type { CatalogPresentationSet } from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
import { materialPresentationsFor, type MaterialTextDictionary } from "../material-presentation-text";

export const batteryTexts: BatteryTextDictionary = {
    "battery.summary.removable": "Pin sạc dạng cell có thể tháo rời cho các thiết bị tương thích.",
    "battery.summary.integrated": "Bộ pin tích hợp trong thiết bị, không phải cell mà người dùng có thể thay thế.",
    "battery.note.approvedResearch": "Được phê duyệt ngày 2026-08-13; xem hồ sơ nghiên cứu liên quan.",
    "battery.note.capacityBelowLabel": "Dung lượng thực tế thấp hơn mức ghi trên nhãn.",
    "battery.note.battery-71.evidence": "20 A, giá trị liên tục; các giá trị xung không được sử dụng.",
    "battery.note.battery-77.evidence":
        "20 A, giá trị so sánh độc lập thận trọng; vỏ bọc chính xác và "
        + "phiên bản sản xuất vẫn là thông tin quan trọng.",
    "battery.note.battery-78.evidence":
        "15 A, giá trị thận trọng từ thử nghiệm đúng mẫu; phiên bản đã thử "
        + "nghiệm có dấu CCC vẫn là thông tin quan trọng.",
    "battery.note.battery-79.evidence":
        "45 A, giá trị xả liên tục độc lập của phiên bản tabless đã thử nghiệm; không "
        + "thay bằng giá trị dòng xung.",
    "battery.note.battery-80.evidence": "36 A, giá trị liên tục thực tế; giá trị 56 A bị giới hạn bởi nhiệt độ.",
    "battery.note.battery-81.evidence":
        "40 A, giá trị thận trọng; các cell đã thử nghiệm có vẻ là mẫu tiền sản xuất và "
        + "không có logo CCC.",
    "battery.note.battery-82.evidence":
        "13 A, giá trị liên tục được khuyến nghị; 16,8 A là mức tối đa tuyệt đối "
        + "không nhằm bảo đảm tuổi thọ chu kỳ.",
    "battery.note.battery-83.evidence":
        "40 A, giá trị thận trọng; 70 A bị giới hạn bởi nhiệt độ và các mẫu đã "
        + "thử nghiệm là mẫu tiền sản xuất.",
    "battery.note.battery-84.evidence": "40 A, giá trị so sánh của cell sản xuất; 70 A cần được kiểm soát nhiệt độ.",
    "battery.note.battery-85.evidence":
        "40 A, giá trị của vỏ bọc chính xác; 70 A bị giới hạn ở 60 °C và được "
        + "thử nghiệm dưới dạng cell rewrap EVE 40PL.",
    "battery.note.battery-86.evidence":
        "19 A, giá trị thận trọng; các mẫu đã thử nghiệm có vẻ là mẫu tiền sản xuất và "
        + "không có dấu CCC.",
    "battery.note.battery-87.evidence":
        "40 A, giá trị thận trọng; 90 A bị giới hạn bởi nhiệt độ và các cell đã thử "
        + "nghiệm có vẻ là mẫu tiền sản xuất.",
    "battery.note.battery-88.evidence":
        "40 A, giá trị thận trọng; 60 A bị giới hạn bởi nhiệt độ và tính liên tục "
        + "của sản xuất vẫn chưa được giải quyết.",
    "battery.note.battery-89.evidence":
        "40 A, giá trị thận trọng; các mẫu đã thử nghiệm có dung lượng không nhất "
        + "quán và không có dấu CCC/CE.",
    "battery.note.battery-90.evidence":
        "13 A, giá trị thận trọng; các mẫu đã thử nghiệm có vẻ là mẫu tiền sản xuất và "
        + "không có dấu CCC.",
    "battery.note.battery-91.evidence":
        "30 A, giá trị liên tục do người kiểm tra ước tính; mức tối đa 50 A của "
        + "Reliance bị giới hạn bởi nhiệt độ.",
    "battery.note.battery-92.evidence":
        "20 A, giá trị liên tục từ hai lô đã thử nghiệm có liên quan đến sản xuất; "
        + "30 A bị giới hạn bởi nhiệt độ.",
    "battery.note.battery-93.evidence":
        "12 A liên tục; 20 A chỉ dành cho xung. Vỏ bọc chính xác đã thử nghiệm "
        + "được ghi là SA110 / INR18650/40.",
    "battery.note.battery-94.evidence":
        "20 A, giá trị của vỏ bọc chính xác; người thử nghiệm khuyến nghị dưới "
        + "15 A liên tục. Vapehuset quảng cáo 25 A trong tiêu đề, và nguồn rewrap "
        + "hoặc phiên bản vỏ bọc về sau có thể khác nhau.",
    "battery.note.battery-95.evidence":
        "30 A, giá trị đúng mẫu; đây là cell rewrap và các phiên bản vỏ bọc sau "
        + "này hoặc nguồn cung ứng ban đầu có thể khác nhau.",
    "battery.note.battery-96.evidence":
        "30 A, giá trị chính xác của phiên bản năm chân; các phiên bản bốn chân và "
        + "các phiên bản sau dùng cùng vỏ bọc khác biệt đáng kể, không được kế thừa hồ sơ này.",
    "battery.safety.lowDrain": "Pin có khả năng xả thấp; không phù hợp để vaping.",
};

export const materialTexts: MaterialTextDictionary = {
    "material.profile": (displayName) => "Hồ sơ danh mục cho " + displayName + ".",
    "material.safety.verifiedProfile":
        "Hãy sử dụng hồ sơ vật liệu đã được xác minh và tuân thủ các "
        + "giới hạn về nhiệt độ và vận hành của thiết bị.",
};
export const modTexts: ModTextDictionary = {
    "mod.profile.regulated": (displayName) => "Hồ sơ thiết bị vape có điều chỉnh cho " + displayName + ".",
    "mod.preset-9.profile":
        "Billet Box Rev. 3a với lớp hoàn thiện bằng nhôm anodized "
        + "được phun hạt, nhúng sáng; được giới thiệu vào tháng 5 năm "
        + "2014.",
    "mod.preset-10.profile":
        "Thiết bị Cloupor 30 W sử dụng chipset nhân bản kiểu DNA30 "
        + "của bên thứ ba chứ không phải bo mạch Evolv DNA-30D đích "
        + "thực.",
    "mod.preset-231.profile":
        "Mod điều chỉnh Dual-21700 với bộ điều hợp 18650; VAPORESSO "
        + "đánh giá nó là 220 W; thử nghiệm đo được 208 W, 8,979 V và "
        + "39 A.",
    "mod.preset-234.profile":
        "Mod có điều chỉnh dùng hai pin 18650; VAPORESSO công bố công suất 220 W; thử "
        + "nghiệm đo được 215 W, 9,08 V và 37 A.",
    "mod.preset-235.profile":
        "Mod điều chỉnh bằng pin tích hợp có công suất định mức 100 "
        + "W; thử nghiệm đo được 101 W, 29 A và ít nhất 7,97 V.",
    "mod.preset-236.profile":
        "Mod điều chỉnh đơn 18650 sử dụng AS Chip 4.0; hồ sơ nhà "
        + "sản xuất là 100 W, 7,5 V, 32 A, 0,1–3 Ω.",
    "mod.preset-237.profile":
        "Mod dùng một cell 21700 hoặc cell 18650 qua bộ chuyển đổi; Eleaf công bố 100 W, "
        + "9 V, 0,05–3,5 Ω; thử nghiệm xác định 30 A.",
    "mod.preset-238.profile":
        "Mod squonk có điều chỉnh dùng một cell 21700, 20700 hoặc cell 18650 qua bộ "
        + "chuyển đổi, với cấu hình thận trọng 95 W, 6 V, 34 A.",
};

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
    materials: materialPresentationsFor(materialTexts),
    batteries: batteryPresentationsFor(batteryTexts),
    mods: modPresentationsFor(modTexts)
};
