import type { ModComparisonMessages } from "../../comparison-messages";

export const messages: ModComparisonMessages = {
    platform: "Nền tảng",
    powerLimits: "Giới hạn công suất",
    atomizerRange: "Phạm vi đầu đốt",
    category: "Danh mục",
    batteryConfiguration: "Cấu hình pin",
    baseProfile: "Hồ sơ cơ sở",
    invalidSelection:
        "Không tìm thấy mod hoặc bo mạch được liên kết chia sẻ này tham chiếu trong danh " +
        "mục.",
    sameSelection: "Bạn đã chọn cùng một mod hoặc bo mạch ở cả hai bên.",
    platformDiffers:
        "Các mục này khác nhau về danh mục hoặc cấu hình pin. Hãy xác nhận phép so sánh phù " +
        "hợp với mục đích sử dụng của bạn.",
    platformUnknown:
        "Một số chi tiết nền tảng chưa rõ, nên không thể so sánh đầy đủ khả năng tương " +
        "thích về danh mục và cấu hình pin.",
    noSafetyFindings: "Không có phát hiện an toàn riêng cho mục này được ghi nhận.",
};
