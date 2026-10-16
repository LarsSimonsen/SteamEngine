import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./vi";

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
        throw new Error("Vietnamese catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").formulas![0].expression = "V = I × R";
getSection("concept-ohms-law", "relationship").bullets![1] = "I là dòng điện, được đo bằng ampe (A).";
getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-ohms-law", "worked-examples").examples![1].title = "Tìm điện trở";
getSection("concept-ohms-law", "electrical-power").title = "Công suất điện";
corrected.concepts["concept-joule-heating"].displayName = "Gia nhiệt Joule";
getSection("concept-joule-heating", "heating-power").title = "Công suất gia nhiệt";
getSection("concept-joule-heating", "heating-power").formulas![0].expression = "P = V × I";
getSection("concept-joule-heating", "heating-power").bullets![2] = "I là dòng điện, đo bằng ampe (A).";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "Cuộn dây biến đổi năng lượng thành nhiệt với công suất 7,2 W; trong 10 giây, năng lượng truyền đi là 72 J.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Một nhánh là một đường dẫn của dòng điện giữa hai nút.";
getSection("concept-kirchhoffs-laws", "current-law").title = "Định luật dòng điện Kirchhoff";
getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![0].expression = "I_total = I_1 = I_2 = ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![1].expression = "R_total = R_1 + R_2 + ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![2].expression = "I_total = I_1 + I_2 + ...";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (parallel branches)";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (series)";
getSection("concept-kirchhoffs-laws", "cells").formulas![1].expression =
    "C_pack = C_1 + C_2 + ... (parallel)";
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
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "Nhiệt dung thuộc về toàn bộ vật thể và phụ thuộc vào lượng vật chất có mặt. Nhiệt dung riêng là một tính chất của vật liệu."
    + " Tăng gấp đôi khối lượng sẽ tăng gấp đôi nhiệt dung của cùng một vật liệu.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "Trong quá trình nóng chảy hoặc sôi, năng lượng được cung cấp có thể làm thay đổi pha của vật liệu mà không làm thay đổi"
    + " nhiệt độ. L là nhiệt ẩn riêng, tính bằng J/kg.";
getSection("concept-heat-flux", "definition").bullets![0] = "q'' là mật độ dòng nhiệt, tính bằng W/m².";
getSection("concept-heat-flux", "definition").bullets![2] = "A là diện tích truyền nhiệt, tính bằng mét vuông (m²).";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0,020 m² = 5.000 W/m²";
getSection("concept-heat-flux", "conduction").title = "Dẫn nhiệt qua lớp phẳng";
getSection("concept-heat-flux", "conduction").formulas![1].expression =
    "Q_dot = k × A × (T_hot - T_cold) / L";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "Dòng nhiệt là tốc độ truyền năng lượng, không phải nhiệt độ; hãy dùng nhiệt dung để tính thay đổi nhiệt độ.";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[0][2] = "m";
siBaseUnits.rows[2][1] = "giây";
siBaseUnits.rows[5][1] = "mol";
siBaseUnits.rows[5][2] = "mol";
siBaseUnits.rows[6][2] = "cd";

corrected.concepts["concept-ohms-law"].displayName = "Định luật Ohm";
getSection("concept-ohms-law", "worked-examples").examples![0].title = "Tìm dòng điện";
getSection("concept-ohms-law", "worked-examples").examples![1].setup =
    "Một mạch điện có điện áp 12 V và dòng điện 2 A.";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "Định luật Ohm kết hợp với công thức công suất P = V × I. Công suất P được đo bằng watt (W). Với nguồn 4,2 V và "
    + "tải 1,0 Ω, công suất lý tưởng là 17,64 W. Linh kiện cần có khả năng tản nhiệt đủ lớn và biên độ an toàn thích hợp "
    + "để tản nhiệt sinh ra một cách an toàn.";
corrected.concepts["concept-joule-heating"].summary =
    "Cách dòng điện biến đổi năng lượng điện thành nhiệt.";
getSection("concept-joule-heating", "heating-power").title = "Công suất tỏa nhiệt";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "Một cuộn dây có điện trở 0,8 Ω dẫn dòng điện 3 A.";
getSection("concept-joule-heating", "what-affects-heating").title =
    "Các yếu tố ảnh hưởng đến sự tỏa nhiệt";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "Sự truyền nhiệt sang không khí, chất lỏng và thiết bị quyết định nhiệt độ thực tế.";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Công suất điện là tốc độ truyền năng lượng, không phải nhiệt độ. Công suất nhiệt và mật độ dòng nhiệt quyết định "
    + "năng lượng đó làm thay đổi nhiệt độ như thế nào và được truyền khỏi bề mặt nhanh đến mức nào.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Kiểm tra xem linh kiện, mối nối và lớp cách điện có chịu được dòng điện và công suất dự kiến hay không. Sử dụng "
    + "biên độ an toàn thích hợp vì linh kiện thực tế có thể nóng không đều và điện trở có thể thay đổi theo nhiệt độ. "
    + "Pin và bộ nguồn cũng có giới hạn dòng điện liên tục.";
corrected.concepts["concept-kirchhoffs-laws"].displayName = "Các định luật Kirchhoff";
getSection("concept-kirchhoffs-laws", "circuit-terms").title = "Thuật ngữ mạch điện";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "Các thuật ngữ cơ bản giúp phân tích sơ đồ mạch điện:";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].title =
    "Các điện trở mắc nối tiếp";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].conclusion =
    "Cùng một dòng điện 20 A đi qua cả hai điện trở.";
getSection("concept-kirchhoffs-laws", "cells").title =
    "Các cell mắc nối tiếp và song song";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "Các cell mắc nối tiếp cộng điện áp, trong khi dung lượng tính bằng ampe-giờ vẫn bằng dung lượng của một cell tương đương.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "Các cell mắc song song giữ nguyên điện áp, trong khi dung lượng và dòng điện khả dụng tăng lên gần như theo tổng.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "Sạc nối tiếp các cell lithium-ion cần giám sát từng cell và có mạch cân bằng hoặc bảo vệ phù hợp.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "Mô hình đơn giản hóa có thể bỏ qua điện trở trong của cell, điện trở tiếp xúc, hiệu suất bộ chuyển đổi, ảnh hưởng "
    + "của nhiệt độ, quá độ, mạch bảo vệ và dung sai linh kiện. Hãy bổ sung mọi yếu tố bị bỏ qua có ảnh hưởng đáng kể "
    + "đến mạch dòng điện lớn.";
corrected.concepts["concept-temperature-coefficient-of-resistance"].displayName =
    "Hệ số nhiệt độ của điện trở (TCR)";
corrected.concepts["concept-trigonometry"].displayName = "Lượng giác";
corrected.concepts["concept-heat-capacity"].displayName = "Nhiệt dung";
corrected.concepts["concept-heat-flux"].displayName = "Mật độ dòng nhiệt";

getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "Điện trở 0 Ω là hiện tượng đoản mạch lý tưởng và phải được xử lý riêng.";
getSection("concept-ohms-law", "limits").paragraphs![0] =
    "Định luật Ohm là một mô hình lý tưởng hóa. Linh kiện thực tế có thể không tuân theo định luật Ohm: điện trở của chúng "
    + "có thể thay đổi theo nhiệt độ, điện áp, dòng điện, tần số hoặc trạng thái hoạt động. Đối với mạng nối tiếp và song song, "
    + "hãy dùng các định luật Kirchhoff cùng với định luật Ohm.";

getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "Công suất điện là tốc độ truyền năng lượng, không phải nhiệt độ. Nhiệt dung và mật độ dòng nhiệt quyết định năng lượng "
    + "đó làm thay đổi nhiệt độ như thế nào và rời khỏi bề mặt nhanh đến mức nào.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Các định luật Kirchhoff về dòng điện và điện áp mô tả sự bảo toàn điện tích tại các nút và bảo toàn năng lượng quanh các vòng kín.";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Nếu 8 A đi vào một nút và một nhánh dẫn ra 3 A, các nhánh còn lại phải cùng dẫn ra 5 A. Hãy chọn chiều dòng điện trước "
    + "khi giải; kết quả âm nghĩa là dòng điện thực tế chạy ngược với chiều đã giả định.";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "Tổng đại số của các mức tăng và sụt điện áp quanh một vòng kín bằng không. Hãy chọn một chiều đi vòng và giữ cực tính nhất quán. "
    + "Đảo chiều chỉ thay đổi dấu, không thay đổi nghiệm vật lý. Điện trở nối tiếp lớn hơn tạo ra sụt áp lớn hơn vì cùng một dòng điện đi qua mỗi linh kiện nối tiếp.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "Liên hệ điện áp và dòng điện qua điện trở bằng V = I × R.";

getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α là hệ số nhiệt độ của vật liệu, được biểu thị bằng 1 / °C hoặc ppm / °C.";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "Ví dụ tính toán";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "TCR do nhà sản xuất công bố thường áp dụng cho một dải nhiệt độ và điện trở xác định. Độ dốc nhiệt độ, thay đổi tính chất vật liệu, "
    + "tiếp điểm, ứng suất cơ học và hiện tượng tự nung nóng có thể khiến kết quả thực tế khác với ước tính bậc nhất.";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Đối với góc θ, cạnh đối diện nằm đối diện góc đó, cạnh kề tiếp xúc với góc nhưng không phải là cạnh huyền, còn cạnh huyền nằm "
    + "đối diện góc vuông. SOH-CAH-TOA giúp ghi nhớ: sin bằng cạnh đối diện chia cho cạnh huyền, cos bằng cạnh kề chia cho cạnh huyền, "
    + "còn tan bằng cạnh đối diện chia cho cạnh kề.";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title = "Tìm một cạnh";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "cạnh đối = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "cạnh kề = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "Máy tính phải ở đúng chế độ góc. Dùng chế độ độ cho giá trị radian hoặc ngược lại sẽ cho kết quả khác. Một vòng đầy đủ là 360° hoặc 2π radian.";

getSection("concept-heat-capacity", "basic-relationships").title = "Các mối quan hệ cơ bản";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "Đun 0,20 kg nước từ 20 °C lên 70 °C bằng c = 4.180 J/(kg·K).";
getSection("concept-heat-capacity", "electrical-heating").title = "Gia nhiệt bằng điện";

corrected.concepts["concept-heat-flux"].description =
    "Mật độ dòng nhiệt mô tả tốc độ nhiệt truyền qua mỗi đơn vị diện tích, không phụ thuộc vào tổng lượng vật liệu tích trữ nhiệt.";
corrected.concepts["concept-heat-flux"].summary = "Tốc độ truyền nhiệt trên một đơn vị diện tích.";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "Đối lưu sử dụng hệ số đối lưu h. Bức xạ sử dụng độ phát xạ ε và hằng số Stefan–Boltzmann σ; nhiệt độ trong phương trình bức xạ "
    + "phải là nhiệt độ tuyệt đối tính bằng kelvin.";

getSection("concept-si-system-and-imperial-units", "base-units").title = "Các đơn vị cơ bản SI";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[0][0] = "kilo";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Số cỡ dây chỉ mô tả kích thước danh nghĩa khi hệ thống cỡ dây được nêu rõ.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "Định luật dòng điện và điện áp Kirchhoff mô tả sự bảo toàn điện tích tại các nút và năng lượng trong các vòng kín.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "Hệ số nhiệt của điện trở mô tả điện trở của một linh kiện thay đổi như thế nào theo nhiệt độ.";
corrected.concepts["concept-heat-flux"].displayName = "Mật độ dòng nhiệt";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Xác định khả năng tải dòng điện dựa trên dữ liệu sản phẩm và quy định điện, không chỉ dựa vào số cỡ dây.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Định luật dòng điện của Kirchhoff";
getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Nếu 8 A đi vào một nút và một nhánh dẫn ra 3 A, các nhánh còn lại phải dẫn ra tổng cộng 5 A. " +
    "Hãy chọn chiều dòng điện trước khi giải; kết quả âm nghĩa là dòng điện thực tế chạy ngược với chiều đã giả định.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = cạnh đối / cạnh huyền";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = cạnh kề / cạnh huyền";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = cạnh đối / cạnh kề";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(cạnh đối / cạnh huyền)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(cạnh kề / cạnh huyền)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(cạnh đối / cạnh kề)";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (nối tiếp)";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (các nhánh song song)";
getSection("concept-si-system-and-imperial-units", "length-conversions").title =
    "Inch và chiều dài hệ mét";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![1].expression =
    "1 foot = 12 inch = 0,3048 m";
getSection("concept-si-system-and-imperial-units", "length-conversions").formulas![2].expression =
    "1 yard = 3 foot = 0,9144 m";

corrected.concepts["concept-heat-capacity"].description =
    "Nhiệt dung liên hệ năng lượng truyền vào với sự thay đổi nhiệt độ của vật thể hoặc vật "
    + "liệu.";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "Mật độ dòng nhiệt khác với nhiệt dung: nhiệt dung mô tả năng lượng tích trữ trên mỗi "
    + "đơn vị thay đổi nhiệt độ, còn mật độ dòng nhiệt mô tả tốc độ nhiệt truyền qua bề mặt "
    + "trên mỗi đơn vị diện tích.";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "Mật độ dòng nhiệt trung bình là 5.000 W/m², hoặc 0,5 W/cm².";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "Đổi diện tích sang m² trước khi dùng W/m².";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].displayName =
    "Cỡ dây: AWG, SWG và BWG";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title =
    "Các hệ cỡ dây";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![0] =
    "AWG là hệ cỡ dây Mỹ (American Wire Gauge), trước đây còn được gọi là hệ cỡ dây Brown & "
    + "Sharpe.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![1] =
    "SWG là hệ cỡ dây tiêu chuẩn (Standard Wire Gauge), hệ quy định cỡ dây và độ dày tấm "
    + "trước đây của Anh.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![2] =
    "BWG là hệ cỡ dây Birmingham (Birmingham Wire Gauge), trước đây dùng cho dây sắt, ống "
    + "và độ dày tấm.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Số cỡ dây thông thường càng lớn thì đường kính thường càng nhỏ; các kích cỡ lớn hơn cỡ "
    + "0 dùng 00, 000 hoặc 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.headers![0] =
    "Cỡ dây";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title =
    "Cỡ dây, diện tích và điện trở";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "Điện trở phụ thuộc vào chiều dài dây dẫn L, diện tích mặt cắt ngang A và điện trở suất "
    + "vật liệu ρ. Vì diện tích thay đổi theo bình phương đường kính, chênh lệch nhỏ về đường "
    + "kính có thể tạo ra chênh lệch đáng kể về điện trở. Trong AWG, tăng số cỡ dây thêm ba "
    + "bậc sẽ làm diện tích giảm còn khoảng một nửa và điện trở trên mỗi đơn vị chiều dài "
    + "tăng gấp đôi với cùng vật liệu và nhiệt độ.";

getSection("concept-ohms-law", "worked-examples").title =
    "Ví dụ tính toán";
getSection("concept-joule-heating", "worked-example").title =
    "Ví dụ tính toán";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![0] =
    "Nút là tập hợp các dây dẫn được nối với nhau mà không có linh kiện xen giữa.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![4] =
    "Mắc song song là nối các nhánh vào cùng hai nút.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "Giải hệ phương trình và kiểm tra cân bằng công suất.";
getSection("concept-trigonometry", "waveforms-and-identities").title =
    "Dạng sóng và các đồng nhất thức hữu ích";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![2] =
    "Giữ đúng dấu và góc phần tư khi hướng hoặc pha có ý nghĩa quan trọng.";
getSection("concept-heat-capacity", "basic-relationships").bullets![1] =
    "Q là nhiệt lượng truyền đi, tính bằng joule (J).";
getSection("concept-heat-capacity", "worked-example").title =
    "Ví dụ tính toán";
getSection("concept-heat-capacity", "electrical-heating").examples![0].formulas![0] =
    "t = 41.800 J / 100 W = 418 s";
getSection("concept-heat-flux", "worked-example").title =
    "Ví dụ tính toán";
getSection("concept-heat-flux", "conduction").bullets![1] =
    "ΔT là chênh lệch nhiệt độ giữa hai mặt của lớp.";
getSection("concept-si-system-and-imperial-units", "base-units").title =
    "Các đơn vị SI thông dụng";
getSection("concept-si-system-and-imperial-units", "base-units").table!.headers![0] =
    "Đại lượng";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[1][0] =
    "Khối lượng";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[1][1] =
    "kilogam";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[6][1] =
    "candela";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.headers![2] =
    "Hệ số";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[1][0] =
    "mega";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[2][0] =
    "milli";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[2][1] =
    "m";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[3][0] =
    "micro";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![1] =
    "Xác nhận rằng hai vế của phương trình có thứ nguyên tương thích.";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "Đối với 1/0, 2/0, 3/0 và 4/0, dùng n = 0, -1, -2 và -3. AWG xác định kích thước dây "
    + "dẫn, không quy định một dòng điện an toàn chung; khả năng tải dòng điện còn phụ thuộc "
    + "vào vật liệu, lớp cách điện, làm mát, cách lắp đặt và các quy định điện áp dụng.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "Đây là các giá trị danh nghĩa. Dung sai sản phẩm, lớp phủ, lớp cách điện và cấu tạo "
    + "nhiều sợi có thể làm thay đổi đường kính đo được hoặc đường kính tổng thể.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "Với dây dẫn nhiều sợi, hãy nêu cấu tạo các sợi khi độ mềm dẻo và đường kính tổng thể "
    + "có ý nghĩa quan trọng.";

export const presentations = corrected as unknown as CatalogPresentationSet;
