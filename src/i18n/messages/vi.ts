/* Machine-materialized draft. Human review may edit string values. */

import type { SharedMessages } from "../messages";

export const messages = {
    "navigation": {
        "about": "Giới thiệu",
        "blog": "Blog",
        "catalog": "Danh mục",
        "home": "Động cơ hơi nước",
        "primary": "Điều hướng chính",
        "calculators": "Điều hướng máy tính",
        "language": "Ngôn ngữ",
        "languageFilter": "Lọc ngôn ngữ",
        "noLanguageMatches": "Không tìm thấy ngôn ngữ nào."
    },
    "theme": {
        "switchToLight": "Chuyển sang chế độ ánh sáng",
        "switchToDark": "Chuyển sang chế độ tối"
    },
    "footer": {
        "purgeCache": "Xóa bộ nhớ đệm",
        "translationDraft": "Bản dịch này được soạn thảo bằng máy và đang chờ con người xem xét.",
        "suggestCorrection": "Đề nghị sửa chữa"
    },
    "error": {
        "title": "Máy tính không thể cập nhật",
        "cancel": "Hủy bỏ",
        "reset": "Đặt lại",
        "hideDetails": "Ẩn chi tiết",
        "viewDetails": "Xem chi tiết",
        "retry": "Thử lại",
        "retrying": "Đang thử lại…"
    },
    "calculatorHeader": {
        "oldVersionNote": "Bạn có thể tìm thấy phiên bản cũ của máy tính này",
        "oldVersionLinkLabel": "ở đây"
    },
    "calculatorVisibility": {
        "label": "Khả năng hiển thị của máy tính",
        "ariaLabel": (...args: unknown[]) => {
        let output = "Khả năng hiển thị máy tính cho __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "shown": "Đã hiển thị",
        "hidden": "Ẩn"
    },
    "catalogManager": {
        "manage": (...args: unknown[]) => {
        let output = "Quản lý __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "shared": (...args: unknown[]) => {
        let output = "danh mục __se_arg_0__ được chia sẻ";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "close": (...args: unknown[]) => {
        let output = "Đóng trình quản lý __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "choose": (...args: unknown[]) => {
        let output = "Chọn các phần dựng sẵn hiển thị hoặc tạo __se_arg_0__ được lưu trữ trong trình duyệt này.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "builtIn": (...args: unknown[]) => {
        let output = "Tích hợp __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "visibility": (...args: unknown[]) => {
        let output = "Những thay đổi về khả năng hiển thị sẽ được lưu ngay lập tức. __se_arg_0__ ẩn vẫn có sẵn để nhân bản.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "filterBuiltIns": "Lọc tích hợp",
        "custom": (...args: unknown[]) => {
        let output = "Tùy chỉnh __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "newCustom": (...args: unknown[]) => {
        let output = "Tùy chỉnh mới __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "noneYet": (...args: unknown[]) => {
        let output = "Chưa có __se_arg_0__ tùy chỉnh nào.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "clone": "bản sao",
        "edit": "Chỉnh sửa",
        "delete": "Xóa",
        "confirmDelete": "Xác nhận xóa",
        "cancel": "Hủy bỏ",
        "confirmReset": "Xác nhận đặt lại",
        "resetSaved": (...args: unknown[]) => {
        let output = "Đặt lại dữ liệu __se_arg_0__ đã lưu";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "resetSavedMessage": "Thao tác này chỉ xóa dữ liệu đã lưu. Tiếp tục?",
        "savedReset": (...args: unknown[]) => {
        let output = "Dữ liệu __se_arg_0__ đã lưu đã được đặt lại.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "usedBy": (...args: unknown[]) => {
        let output = "Không thể xóa __SE_ARG_0__; nó được sử dụng bởi __SE_ARG_1__.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        output = output.replaceAll("__SE_ARG_1__", String(args[1] ?? ""));
        output = output.replaceAll("__se_arg_1__", String(args[1] ?? ""));
        return output;
    },
        "deleted": (...args: unknown[]) => {
        let output = "__SE_ARG_0__ đã bị xóa.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    }
    },
    "catalogEditor": {
        "editCustom": (...args: unknown[]) => {
        let output = "Chỉnh sửa tùy chỉnh __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "newCustom": (...args: unknown[]) => {
        let output = "Tùy chỉnh mới __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "clone": (...args: unknown[]) => {
        let output = "Sao chép __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "properties": (...args: unknown[]) => {
        let output = "__SE_ARG_0__ thuộc tính";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "save": (...args: unknown[]) => {
        let output = "Lưu __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "saved": (...args: unknown[]) => {
        let output = "__SE_ARG_0__ đã lưu.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "cancel": "Hủy bỏ",
        "name": "Tên",
        "manufacturer": "nhà sản xuất",
        "model": "người mẫu",
        "variant": "Biến thể",
        "optional": "Tùy chọn",
        "unknown": "Không xác định",
        "batteryAccess": "Truy cập pin",
        "removableCell": "Tế bào có thể tháo rời",
        "integratedMod": "Tích hợp trong mod",
        "formFactor": "Yếu tố hình thức",
        "selectFormFactor": "Chọn một yếu tố hình thức",
        "notApplicable": "Không áp dụng",
        "cylindrical": "hình trụ",
        "prismatic": "lăng trụ",
        "sizeCode": "Mã kích thước",
        "nominalDiameter": "Đường kính danh nghĩa (mm)",
        "nominalLength": "Chiều dài danh nghĩa (mm)",
        "terminalStyle": "Kiểu thiết bị đầu cuối",
        "flatTop": "Đỉnh phẳng",
        "buttonTop": "Nút trên cùng",
        "length": "Chiều dài (mm)",
        "width": "Chiều rộng (mm)",
        "thickness": "Độ dày (mm)",
        "protectedStatus": "trạng thái được bảo vệ",
        "protectedCell": "Được bảo vệ",
        "unprotectedCell": "không được bảo vệ",
        "wrapperColor": "Màu bọc",
        "markings": "Đánh dấu",
        "ratedCapacity": "Công suất định mức (mAh)",
        "continuousCurrent": "Dòng xả liên tục (A)",
        "continuousC": "Xếp hạng xả liên tục C",
        "nominalVoltage": "Điện áp danh định (V)",
        "safetyWarning": "Cảnh báo an toàn",
        "dataNote": "Ghi chú dữ liệu",
        "batteryHelp": "Nhập ít nhất một giới hạn xả liên tục. Pin tích hợp là gói mod bên trong nên không cần kích thước ô riêng biệt. Kích thước ô có thể tháo rời là danh nghĩa; sử dụng ghi chú để đo kích thước khi bán. Khi cả hai giới hạn xả được đặt, máy tính sẽ tiếp tục sử dụng giới hạn dẫn xuất an toàn hơn nếu chúng khác nhau về mặt cơ bản.",
        "resistivity": "Điện trở suất (Ω mm2/m)",
        "heatCapacity": "Công suất nhiệt (J/g·K)",
        "density": "Mật độ (g/cm³)",
        "temperatureModel": "Mô hình nhiệt độ",
        "noTemperatureData": "Không có dữ liệu nhiệt độ",
        "tcrPerDegree": "TCR (mỗi °C)",
        "temperature": "Nhiệt độ (°C)",
        "resistanceFactor": "hệ số kháng",
        "removeTfrPoint": "Xóa điểm TFR",
        "addTfrPoint": "Thêm điểm TFR",
        "normalizationHelp": "Việc lưu sẽ sắp xếp đường cong, chèn hoặc lấy tham chiếu 20 °C và chuẩn hóa tất cả các hệ số.",
        "normalizationInterpolated": "Điểm 20 ° C được nội suy và đường cong được chuẩn hóa.",
        "normalizationExtrapolated": "Điểm 20 ° C được ngoại suy và đường cong được chuẩn hóa.",
        "normalizationExisting": "Đường cong TFR được chuẩn hóa ở 20 ° C.",
        "basedOnPreset": "Dựa trên cài đặt trước",
        "none": "không có",
        "maxOutputVoltage": "Điện áp đầu ra tối đa (V)",
        "maxOutputPower": "Công suất đầu ra tối đa (W)",
        "maxOutputCurrent": "Dòng điện đầu ra tối đa (A)",
        "minAtomizerResistance": "Điện trở phun tối thiểu (Ω)",
        "maxAtomizerResistance": "Điện trở phun tối đa (Ω)"
    },
    "home": {
        "intro": "Steam Engine là một bộ công cụ tính toán thiết thực để xây dựng cuộn dây, kiểm tra mức tiêu hao pin, trộn tinh dầu và hiểu các con số đằng sau quá trình thiết lập của bạn.",
        "toolkit": "Bộ công cụ",
        "chooseCalculator": "Chọn một máy tính",
        "blogEyebrow": "Luôn cập nhật",
        "blogTitle": "Blog động cơ hơi nước",
        "blogDescription": "Tìm thông tin cập nhật và mẹo tính toán trên blog Steam Engine.",
        "catalogEyebrow": "Thư viện tham khảo",
        "catalogTitle": "Khám phá danh mục",
        "catalogDescription": "Tìm hiểu các khái niệm và tra cứu vật liệu, pin, mod và bo mạch được Steam Engine sử dụng.",
        "tools": {
            "ohm": {
                "label": "Định luật Ohm",
                "description": "Tính toán điện trở, điện áp, dòng điện và công suất bằng hệ thống sưởi Joule."
            },
            "coil": {
                "label": "Quấn coil",
                "description": "Lập kế hoạch xây dựng lại cuộn dây nguyên tử và khám phá hành vi điện của chúng."
            },
            "wirewiz": {
                "label": "Trợ lý dây",
                "description": "Kết hợp các dây khác nhau để định hình một cuộn dây và đường cong nhiệt độ của nó."
            },
            "batt": {
                "label": "Mức tiêu hao pin",
                "description": "Xem dòng điện và mức tiêu hao năng lượng của thiết bị chạy bằng pin."
            },
            "modrange": {
                "label": "Phạm vi mod",
                "description": "Tìm phạm vi kháng cự hữu ích cho một mod được điều chỉnh."
            },
            "juice": {
                "label": "Pha tinh dầu",
                "description": "Trộn công thức theo nồng độ nicotin mục tiêu và tỷ lệ VG/PG của bạn."
            },
            "converter": {
                "label": "Chuyển đổi",
                "description": "Chuyển đổi giữa milimet, inch, inch phân số và thước dây."
            },
            "old": {
                "label": "Trang web kế thừa",
                "description": "Bạn có thể tìm thấy các phiên bản cũ của máy tính ở đây."
            }
        }
    },
    "ohm": {
        "eyebrow": "Máy tính định luật Ohm",
        "title": "định luật Ohm",
        "descriptionBeforeOhm": "Đây là một cách đơn giản",
        "descriptionBetweenLaws": "và",
        "descriptionAfterLaws": "máy tính.",
        "values": "Giá trị",
        "lock": "Khóa",
        "reset": "Đặt lại",
        "simpleLocks": "Ổ khóa đơn giản",
        "showDetailedLocks": "Hiển thị ổ khóa chi tiết",
        "hideDetailedLocks": "Ẩn ổ khóa chi tiết",
        "detailedLocks": "Khóa chi tiết",
        "adjusting": (...args: unknown[]) => {
        let output = "Khi điều chỉnh __se_arg_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "help": "Những gì cần giữ không đổi trong khi bạn điều chỉnh các giá trị khác.",
        "about": "Giới thiệu về máy tính này",
        "aboutText": "Bạn có thể thay đổi bất kỳ giá trị nào. Các giá trị khác cập nhật ngay lập tức. Các giá trị có thể bị khóa để chúng không thay đổi khi bạn điều chỉnh một giá trị khác.",
        "serviceUnavailable": "Dịch vụ máy tính không khả dụng.",
        "defaultsRestored": "Cài đặt mặc định đã được khôi phục.",
        "fields": {
            "resistance": "Kháng chiến",
            "voltage": "Điện áp",
            "current": "hiện tại",
            "power": "quyền lực"
        },
        "lockSummary": (...args: unknown[]) => {
        let output = "Thay đổi __SE_ARG_0__ giữ __se_arg_1__ không đổi.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        output = output.replaceAll("__SE_ARG_1__", String(args[1] ?? ""));
        output = output.replaceAll("__se_arg_1__", String(args[1] ?? ""));
        return output;
    }
    },
    "encyclopedia": {
        "kicker": "Tham khảo động cơ hơi nước",
        "title": "Danh mục",
        "lead": "Duyệt qua các khái niệm, vật liệu, pin, mod và bảng điều khiển đằng sau máy tính.",
        "entriesLabel": (...args: unknown[]) => {
        let output = "__SE_ARG_0__ mục nhập";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "browserLabel": "Mục danh mục",
        "searchLabel": "Tìm kiếm các mục bách khoa toàn thư",
        "searchPlaceholder": "Tìm kiếm tên, kiểu máy hoặc bí danh",
        "filtersLabel": "Lọc các mục bách khoa toàn thư",
        "all": "Tất cả",
        "openEntry": "Mở mục",
        "noMatches": "Không có mục nào khớp với tìm kiếm đó.",
        "browseCategory": (...args: unknown[]) => {
        let output = "Duyệt __SE_ARG_0__ (__SE_ARG_1__ mục)";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        output = output.replaceAll("__SE_ARG_1__", String(args[1] ?? ""));
        output = output.replaceAll("__se_arg_1__", String(args[1] ?? ""));
        return output;
    },
        "categoryLabels": {
            "concepts": "Khái niệm",
            "batteries": "Pin",
            "materials": "Vật liệu",
            "mods": "Mod và bảng"
        },
        "categoryDescriptions": {
            "concepts": "Các nguyên tắc đằng sau máy tính và kết quả của chúng.",
            "batteries": "Tế bào, gói và nguồn năng lượng tích hợp.",
            "materials": "Dây điện trở và vật liệu kiểm soát nhiệt độ.",
            "mods": "Các thiết bị được điều chỉnh và hồ sơ bảng điều khiển."
        }
    },
    "encyclopediaDetail": {
        "breadcrumb": "vụn bánh mì",
        "categoryLabels": {
            "concepts": "Khái niệm",
            "batteries": "Pin",
            "materials": "Vật liệu",
            "mods": "mod"
        },
        "additionalInformation": "Thông tin bổ sung",
        "aliases": "Bí danh",
        "marketIntroduction": "Giới thiệu thị trường",
        "introduced": (...args: unknown[]) => {
        let output = "Đã giới thiệu __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "introducedBetween": (...args: unknown[]) => {
        let output = "Được giới thiệu giữa __SE_ARG_0__ và __SE_ARG_1__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        output = output.replaceAll("__SE_ARG_1__", String(args[1] ?? ""));
        output = output.replaceAll("__se_arg_1__", String(args[1] ?? ""));
        return output;
    },
        "introducedNoEarlier": (...args: unknown[]) => {
        let output = "Được giới thiệu không sớm hơn __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "availableBy": (...args: unknown[]) => {
        let output = "Có sẵn bởi __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "unknown": "Không xác định",
        "relatedEntry": "Mục liên quan",
        "sourceBackedMaterial": "Hồ sơ tài liệu được hỗ trợ từ nguồn",
        "sourceBackedEntity": "Bản ghi thực thể được hỗ trợ bởi nguồn",
        "researchSummary": "Tóm tắt nghiên cứu",
        "noResearchSummary": "Không có bản tóm tắt nghiên cứu có sẵn cho mục này.",
        "evidenceNotes": "Ghi chú bằng chứng",
        "source": "Nguồn",
        "sources": "Nguồn",
        "noSources": "Không có nguồn có sẵn cho mục này.",
        "noSourceBackedRecord": "Không có hồ sơ nghiên cứu dựa trên nguồn nào có sẵn cho mục này.",
        "property": "Tài sản",
        "properties": "Thuộc tính",
        "value": "Giá trị",
        "unit": "Unit",
        "additionalPropertyNotes": "Ghi chú tài sản bổ sung",
        "unknownPropertyValue": "Danh mục không thiết lập giá trị cho thuộc tính này.",
        "appearance": "Ngoại hình",
        "loadingPowerCurve": "Đường cong công suất tải",
        "temperatureResistanceCurve": "Đường cong chịu nhiệt độ",
        "temperature": "Nhiệt độ",
        "relativeResistance": "Sức đề kháng tương đối",
        "extrapolatedCurve": "Các giá trị ngoài các điểm được cung cấp chỉ được ngoại suy tuyến tính cho biểu đồ.",
        "loadingTemperatureCurve": "Đang tải đường cong nhiệt độ…",
        "normalizedCurve": (...args: unknown[]) => {
        let output = "Đường cong danh mục được chuẩn hóa thành R/R20. Phương pháp chuẩn hóa: __SE_ARG_0__.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "loadingResearchRecord": "Đang tải bản ghi nghiên cứu…",
        "independentTestReview": "Kiểm tra và đánh giá độc lập",
        "reviewed": (...args: unknown[]) => {
        let output = "Đã đánh giá __SE_ARG_0__";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "limitation": "giới hạn",
        "evidenceDate": "Ngày chứng minh",
        "confidence": "sự tự tin",
        "date": "Ngày",
        "relation": "quan hệ",
        "lifecycleEvidence": "Bằng chứng vòng đời",
        "recordStatus": "Ghi lại trạng thái",
        "identityStability": "Ổn định danh tính",
        "lastUpdated": "Cập nhật lần cuối",
        "researchSources": "Nguồn nghiên cứu",
        "deviceSafetyNotes": "Ghi chú an toàn dành riêng cho thiết bị",
        "safety": "An toàn",
        "catalogImplication": "Ý nghĩa danh mục",
        "noBatterySafety": "Không có lưu ý an toàn dành riêng cho pin nào được ghi lại cho mục này.",
        "batteryInternal": "Pin này là một bộ pin bên trong thiết bị chứ không phải là một viên pin mà người dùng có thể thay thế.",
        "batteryRemovable": "Đây là loại pin sạc có thể tháo rời được sử dụng trong các thiết bị tương thích.",
        "continuousDischargeCurrent": (...args: unknown[]) => {
        let output = "Danh mục liệt kê __SE_ARG_0__ Xếp hạng phóng điện liên tục.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "continuousDischargeC": (...args: unknown[]) => {
        let output = "Danh mục liệt kê mức xả liên tục __SE_ARG_0__ C.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "noContinuousDischarge": "Xếp hạng xả liên tục không được thiết lập trong danh mục.",
        "rewrapExplanation": "Nhãn được coi như nhãn hiệu được bọc lại; nhà sản xuất tế bào cơ bản không được giả định từ trình bao bọc.",
        "oldBatteryWarning": "Đây là mẫu pin cũ và có lẽ sẽ được thay thế bằng mẫu pin phù hợp hơn.",
        "unknownBatteryIntroductionNotice": "Ngày giới thiệu ra thị trường của loại tế bào này vẫn chưa được xác định, vì vậy không thể xác định được tuổi của nó và liệu nó có bị thay thế hay không.",
        "unknownChemistry": "Hồ sơ nghiên cứu không thiết lập nhãn hóa học cho mục này.",
        "unknownAuthenticitySummary": "Hồ sơ không bao gồm một bản tóm tắt tính xác thực đầy đủ hơn.",
        "nonRemovableBatteryProfile": "Bản mod này có cấu hình pin không thể tháo rời:",
        "basedOnBoardProfile": "Hồ sơ thiết bị này dựa trên hồ sơ bảng:",
        "builtIntoModProfile": "Cấu hình pin này được tích hợp vào cấu hình mod:",
        "appliesTo": "Áp dụng cho",
        "status": "Trạng thái",
        "authenticityAssessment": "Đánh giá tính xác thực",
        "noAuthenticityAssessment": "Không có đánh giá tính xác thực dành riêng cho mục nhập nào được ghi lại.",
        "catalogNote": "Ghi chú danh mục",
        "chemistry": "Hóa học",
        "batteryAccess": "Truy cập pin",
        "integratedInMod": "Tích hợp trong mod",
        "protection": "Bảo vệ",
        "protectedCell": "Tế bào được bảo vệ",
        "unprotectedCell": "Tế bào không được bảo vệ",
        "brand": "Thương hiệu",
        "manufacturer": "nhà sản xuất",
        "nominalVoltage": "Điện áp danh định",
        "wrapperColor": "Màu bọc",
        "markings": "Đánh dấu",
        "noDefinedCurve": (...args: unknown[]) => {
        let output = "Vật liệu này không có điểm đường cong TFR xác định. TCR của nó là __SE_ARG_0__ mỗi °C.";
        output = output.replaceAll("__SE_ARG_0__", String(args[0] ?? ""));
        output = output.replaceAll("__se_arg_0__", String(args[0] ?? ""));
        return output;
    },
        "noUsableResistanceRange": "Không có phạm vi kháng cự hữu dụng nào có thể được tính toán từ giới hạn danh mục.",
        "modBoardCatalog": "Bảng mod và danh mục thiết bị",
        "batteryCatalog": "Danh mục pin",
        "materialCatalog": "Danh mục vật liệu cuộn",
        "overview": "Tổng quan",
        "inVaping": "Trong vape",
        "materialSpecificLimitations": "Hạn chế cụ thể về vật liệu",
        "secondaryProperties": "Thuộc tính phụ",
        "noMaterialSources": "Không có nguồn có sẵn cho tài liệu này.",
        "basedOnArticle": "Dựa trên bài viết cơ sở kiến thức về Steam Engine",
        "seeAlso": "Xem thêm",
        "wikipedia": "Wikipedia",
        "propertyLabels": {
            "formFactor": "Yếu tố hình thức",
            "dimensions": "Kích thước",
            "ratedCapacity": "Công suất định mức",
            "continuousDischarge": "Đánh giá xả liên tục",
            "maximumPower": "Công suất tối đa",
            "maximumVoltage": "Điện áp tối đa",
            "maximumCurrent": "Dòng điện tối đa",
            "resistanceRange": "Phạm vi kháng cự",
            "boardController": "Bảng/bộ điều khiển",
            "resistivity": "Điện trở suất ở 20 °C",
            "temperatureModel": "Mô hình nhiệt độ",
            "fullResistanceCurve": "Đường cong kháng cự đầy đủ",
            "temperatureCoefficient": "Hệ số nhiệt độ",
            "specificHeatCapacity": "Nhiệt dung riêng",
            "maximumRecommendedTemperature": "Nhiệt độ vaping tối đa được đề nghị",
            "density": "Mật độ",
            "meltingPoint": "điểm nóng chảy"
        }
    }
};
