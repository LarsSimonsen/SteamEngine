import { messages as modrangeDraft } from "./modrange/vi";
import { messages as converterDraft } from "./converter/vi";
import { messages as battDraft } from "./batt/vi";
import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/vi";
import { messages as juiceDraft } from "./juice/vi";
import { messages as tcrDraft } from "./tcr/vi";
import { messages as wireWizDraft } from "./wirewiz/vi";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    legLength: "Chiều dài dây dẫn",
    legPowerLoss: "Công suất hao phí trên dây dẫn",
    wireLengthWarning: "Sau khi trừ phần dây dẫn, không còn đủ dây cho cuộn dây.",
    wireVolume: "Thể tích dây",
    heatCapacity: "Nhiệt dung",
    resistanceActual: "điện trở thực tế",
    unavailableMaterial: "Vật liệu không có sẵn",
    eyebrow: "Máy tính quấn coil",
    metric: "Đơn vị hệ mét",
    imperial: "Đơn vị hệ Anh",
    wireProfile: "Tiết diện dây",
    twistPitch: "Bước xoắn",
    buildDetails: "Chi tiết cấu hình coil",
    wraps: "Số vòng quấn",
    heatFlux: "Mật độ dòng nhiệt",
    setupSeries2: "Coil kép (nối tiếp)",
    setupSeries3: "Ba coil (nối tiếp)",
    setupSeries4: "Bốn coil (nối tiếp)",
};
export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    nicStrengthIn: "Nồng độ nicotine đầu vào",
    nicotineBaseIngredient: "Dung dịch nicotine nền",
    volume: "Thể tích",
    nicBase: "Dung dịch nicotine nền",
    nicStrength: "Nồng độ nicotine",
    targetLabel: "giá trị mục tiêu",
    safetyText: "Nicotine đậm đặc có thể gây hại hoặc gây tử vong cho trẻ em, vật nuôi và người lớn. Trước khi tự "
        + "pha tinh dầu, hãy tìm hiểu cách giảm rủi ro và kiểm tra lại phép tính bằng một công cụ khác.",
    description: "Nhập các đặc tính của dung dịch nicotine nền và hỗn hợp mong muốn.",
    menu: "Trình đơn",
    amount: "Lượng muốn pha",
    adjustMix: "Bạn có thể cần giảm nồng độ nicotine mục tiêu, tỷ lệ VG hoặc PG, hoặc lượng hương "
        + "liệu. Ngoài ra, hãy dùng dung dịch nicotine nền có nồng độ cao hơn hoặc có tỷ lệ "
        + "VG/PG khác. Hãy điều chỉnh cài đặt cho đến khi mọi số đều lớn hơn 0.",
    targetNicWarning: "Nồng độ nicotine mục tiêu cao hơn nồng độ của dung dịch nicotine nền. Bạn cần dùng "
        + "dung dịch nicotine nền có nồng độ cao hơn hoặc giảm nồng độ nicotine mục tiêu.",
    flavorPercentage: "Tỷ lệ hương liệu",
    flavorVg: "Hương liệu dùng nền VG",
};
export const tcr: CalculatorRouteMessages = {
    ...tcrDraft,
    wireWizard: "Wire Wizard",
    needModelText: "để tính hình học dây, các cấu trúc phức tạp và coil. Công cụ chuyên biệt này vẫn "
        + "hữu ích để so sánh và kết hợp các đường cong điện trở.",
    help: "Chỉnh sửa các giá trị này sẽ xóa lựa chọn vật liệu. Đầu ra DNA 200 chấp nhận 2–8 "
        + "điểm và cần một điểm gần 70 °F (khoảng 21 °C).",
    addMaterial: "Thêm vật liệu",
    results: "Điện trở theo nhiệt độ",
    title: "Hệ số nhiệt độ của điện trở",
};
export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    legLength: "Chiều dài dây dẫn",
    volume: "Thể tích",
    dna200: "DNA200",
    resistanceFactor: "Hệ số điện trở",
    referenceMaterial: "Vật liệu tham chiếu",
    heatCapacity: "Nhiệt dung",
    menu: "Trình đơn",
    wraps: "Số vòng quấn",
    heatFlux: "Mật độ dòng nhiệt",
    profile: "Tiết diện",
    round: "Tròn",
    twistPitch: "Bước xoắn",
    export: "Xuất",
    import: "Nhập",
    matchTemperature: "Để đạt cùng mức đó trên mod đặt ở chế độ",
    single: "Đơn",
    physical: "Tính chất vật lý",
    mass: "Khối lượng",
};

export const batt: CalculatorRouteMessages = {
    ...battDraft,
    batteryHelp: "Điện áp danh định và dung lượng quyết định năng lượng dự trữ ước tính và thời gian "
        + "hoạt động liên tục. Chúng không ảnh hưởng đến giới hạn dòng điện.",
    bypass: "Bypass",
    efficiency: "Hiệu suất",
    cellSelection: "Chọn cell pin",
    batteryIntro: "Chọn loại cell dùng cho toàn bộ bộ pin, hoặc nhập các giá trị cho từng cell bên dưới.",
    batteryValues: "Cell và bộ pin",
    batteryConfiguration: "Cấu hình pin",
    singleCell: "1S — Một cell",
    customConfiguration: "Cấu hình tùy chỉnh",
    cellsInSeries: "Số cell nối tiếp",
    parallelStrings: "Số nhánh song song",
    matchedCells: "Dùng các cell giống nhau, được ghép đồng bộ, có cùng tuổi và tình trạng. Việc chia "
        + "dòng điện được lý tưởng hóa; cell yếu nhất giới hạn khả năng của cả bộ pin.",
    pack: "Bộ pin",
    currentPerCell: "Dòng điện ước tính qua mỗi cell",
    caution: "Biên độ dự phòng dòng điện còn dưới 20%.",
    runtimeHelp: "Ước tính lý tưởng hóa này giả định đầu ra liên tục ở mức công suất pin đã tính. "
        + "Thời gian hoạt động thực tế thay đổi theo điện áp ngắt, sụt áp, tuổi cell, điện "
        + "năng thiết bị tự tiêu thụ và việc sử dụng ngắt quãng.",
};

export const converter: CalculatorRouteMessages = {
    ...converterDraft,
    embeddedDescription: "Chuyển đổi giữa milimét, inch, cỡ dây và inch dạng phân số.",
    americanWireGauge: "Cỡ dây Mỹ (AWG)",
    needleGauge: "BWG (cỡ kim)",
    standardWireGauge: "Cỡ dây tiêu chuẩn (SWG)",
    decimalPlaces: "Số chữ số thập phân",
};

export const modrange: CalculatorRouteMessages = {
    ...modrangeDraft,
    currentLimit: "Giới hạn dòng điện",
    currentLimitRequires: "giới hạn dòng điện yêu cầu",
    resistanceAtLimit: "Điện trở tại giới hạn",
    currentReachedFirst: "Đạt giới hạn dòng điện trước.",
    powerCurve: "Đường cong công suất",
    powerCurveDescriptionLong: "Biểu đồ công suất tối đa có thể đạt được theo điện trở, với phạm vi sử dụng được "
        + "đã tính được tô nổi bật.",
    resistance: "Điện trở",
    power: "Công suất",
    current: "Dòng điện",
    eyebrow: "Máy tính mod có điều chỉnh",
    description: "Tìm phạm vi điện trở hữu ích từ các giới hạn đầu ra của mod có điều chỉnh.",
    presetIntro: "Chọn cấu hình có sẵn cho mod có điều chỉnh.",
    preset: "Cấu hình có sẵn của mod có điều chỉnh",
    details: "Thông tin chi tiết về mod này",
    customMod: "Mod tùy chỉnh",
    optimalResistance: "Hướng dẫn chọn điện trở",
    medianResistance: "Điểm giao giữa giới hạn dòng điện và điện áp",
    sweetSpot: "Trung điểm phần trên của phạm vi",
    powerCurveLegend: "Chú giải đường cong công suất",
    median: "Điểm giao giữa giới hạn dòng điện và điện áp",
};
