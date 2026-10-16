import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./hi";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    batteryPresets: "सेल प्रीसेट",
    cellSelection: "सेल चयन",
    batteryIntro: "पूरे पैक में इस्तेमाल होने वाला सेल चुनें या नीचे प्रति सेल मान दर्ज करें।",
    batteryPreset: "सेल प्रीसेट",
    batteryValues: "सेल और पैक",
    batteryConfiguration: "बैटरी विन्यास",
    singleCell: "1S — एक सेल",
    customConfiguration: "कस्टम विन्यास",
    cellsInSeries: "श्रृंखला में सेल",
    parallelStrings: "समानांतर शाखाएँ",
    cells: "सेल",
    cell: "सेल",
    matchedCells: "समान उम्र और स्थिति वाले एक जैसे, मिलान किए हुए सेल उपयोग करें। करंट का बँटवारा "
        + "आदर्श माना गया है; पैक की सीमा सबसे कमजोर सेल तय करता है।",
    pack: "बैटरी पैक",
    currentPerCell: "प्रति सेल अनुमानित करंट",
    enterValue: "इसका मान दर्ज करें:",
    safe: "अनुमानित करंट खपत प्रभावी बैटरी सीमा के भीतर है।",
    danger: "अनुमानित करंट खपत प्रभावी बैटरी सीमा से अधिक है।",
    caution: "करंट रिज़र्व 20% से कम बचा है।",
};
