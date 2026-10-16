import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./vi";

export const messages: SharedMessages = {
    ...draftMessages,
    home: {
        ...draftMessages.home,
        tools: {
            ...draftMessages.home.tools,
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Wire Wizard",
            },
            ohm: {
                ...draftMessages.home.tools.ohm,
                description: "Tính điện trở, điện áp, dòng điện và công suất với hiệu ứng tỏa nhiệt "
                    + "Joule.",
            },
            coil: {
                ...draftMessages.home.tools.coil,
                description: "Thiết kế coil cho đầu đốt có thể tự quấn lại và tìm hiểu đặc tính điện "
                    + "của chúng.",
            },
            modrange: {
                ...draftMessages.home.tools.modrange,
                description: "Tìm phạm vi điện trở hữu ích cho mod có điều chỉnh.",
            },
            converter: {
                ...draftMessages.home.tools.converter,
                description: "Chuyển đổi giữa milimét, inch, inch dạng phân số và cỡ dây.",
            },
        },
        blogTitle: "Blog Steam Engine",
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        kicker: "Tài liệu tham khảo Steam Engine",
        lead: "Duyệt các khái niệm, vật liệu, pin, mod và bo mạch điều khiển làm nền tảng cho "
            + "các máy tính.",
        categoryLabels: {
            ...draftMessages.encyclopedia.categoryLabels,
            mods: "Mod và bo mạch",
        },
        categoryDescriptions: {
            ...draftMessages.encyclopedia.categoryDescriptions,
            batteries: "Cell pin, bộ pin và nguồn điện tích hợp.",
            mods: "Các thiết bị có điều chỉnh và hồ sơ bo mạch điều khiển.",
        },
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        availableBy: (date) => `Có sẵn muộn nhất vào ${date}`,
        breadcrumb: "Đường dẫn điều hướng",
        property: "Thuộc tính",
        additionalPropertyNotes: "Ghi chú bổ sung về thuộc tính",
        loadingPowerCurve: "Đang tải đường cong công suất",
        evidenceDate: "Ngày ghi nhận bằng chứng",
        recordStatus: "Trạng thái bản ghi",
        catalogImplication: "Ảnh hưởng đến danh mục",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            boardController: "Bo mạch/bộ điều khiển",
            formFactor: "Dạng pin",
            ratedCapacity: "Dung lượng định mức",
            resistanceRange: "Phạm vi điện trở",
            fullResistanceCurve: "Đường cong điện trở đầy đủ",
        },
        sourceBackedMaterial: "Hồ sơ vật liệu có nguồn chứng minh",
        temperatureResistanceCurve: "Đường cong điện trở theo nhiệt độ",
        relativeResistance: "Điện trở tương đối",
        confidence: "Độ tin cậy",
        continuousDischargeCurrent: (arg0) => "Danh mục ghi dòng xả liên tục định mức là "
            + arg0
            + " A.",
        rewrapExplanation: "Nhãn này được coi là thương hiệu bọc lại cell; không suy đoán nhà sản xuất "
            + "cell bên trong chỉ từ vỏ bọc.",
        oldBatteryWarning: "Đây là mẫu pin cũ và có lẽ đã được thay thế bởi các mẫu phù hợp hơn.",
        unknownBatteryIntroductionNotice:
            "Chưa rõ ngày cell pin này được đưa ra thị trường, nên không thể xác định tuổi "
            + "của nó hoặc liệu nó đã được thay thế hay chưa.",
        basedOnBoardProfile: "Hồ sơ thiết bị này dựa trên hồ sơ bo mạch:",
        batteryAccess: "Khả năng tháo rời pin",
        protectedCell: "Cell pin có mạch bảo vệ.",
        unprotectedCell: "Cell pin không có mạch bảo vệ.",
        markings: "Ký hiệu trên pin",
        noUsableResistanceRange: "Không thể tính được phạm vi điện trở sử dụng được từ các giới hạn trong danh mục.",
        modBoardCatalog: "Danh mục bo mạch mod và thiết bị",
        noMaterialSources: "Không có nguồn nào cho vật liệu này.",
        materialCatalog: "Danh mục vật liệu coil",
    },
    navigation: {
        ...draftMessages.navigation,
        home: "Trang chủ Steam Engine",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        model: "Mẫu",
        batteryAccess: "Khả năng tháo rời pin",
        removableCell: "Cell pin có thể tháo rời",
        formFactor: "Dạng pin",
        selectFormFactor: "Chọn dạng pin",
        terminalStyle: "Kiểu đầu cực",
        buttonTop: "Đầu cực lồi",
        protectedStatus: "Trạng thái mạch bảo vệ",
        protectedCell: "Có mạch bảo vệ",
        unprotectedCell: "Không có mạch bảo vệ",
        markings: "Ký hiệu trên pin",
        ratedCapacity: "Dung lượng định mức (mAh)",
        batteryHelp: "Nhập ít nhất một giới hạn xả liên tục. Pin tích hợp là bộ pin bên trong mod, "
            + "nên không cần kích thước của cell rời. Kích thước cell có thể tháo rời là kích "
            + "thước danh nghĩa; hãy ghi kích thước đo được của sản phẩm khi bán trong phần "
            + "ghi chú. Khi đặt cả hai giới hạn xả, máy tính vẫn dùng giới hạn suy ra an toàn "
            + "hơn nếu hai giới hạn khác nhau đáng kể.",
        resistivity: "Điện trở suất (Ω mm²/m)",
        heatCapacity: "Nhiệt dung (J/g·K)",
        resistanceFactor: "Hệ số điện trở",
        minAtomizerResistance: "Điện trở đầu đốt tối thiểu (Ω)",
        maxAtomizerResistance: "Điện trở đầu đốt tối đa (Ω)",
    },
    ohm: {
        ...draftMessages.ohm,
        descriptionBeforeOhm: "Công cụ này áp dụng",
        descriptionAfterLaws: "cho các phép tính đơn giản.",
        simpleLocks: "Khóa đơn giản",
        showDetailedLocks: "Hiển thị khóa chi tiết",
        hideDetailedLocks: "Ẩn khóa chi tiết",
        fields: {
            ...draftMessages.ohm.fields,
            resistance: "Điện trở",
            current: "Dòng điện",
            power: "Công suất",
        },
        joulesLawLinkLabel: "định luật Joule",
    },
};
