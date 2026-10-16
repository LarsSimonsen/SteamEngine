import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./hi";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    value: "मान",
    decimalPlaces: "दशमलव स्थान",
    description: "मिलीमीटर, इंच, AWG, BWG, SWG और भिन्न के रूप में इंच के बीच रूपांतरण करें।",
    fractionalInches: "भिन्न के रूप में इंच",
    outputSettings: "आउटपुट सेटिंग्स",
};
