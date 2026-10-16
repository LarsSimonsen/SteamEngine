import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./sv";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    fractionalInches: "Tum i bråkform",
    inches: "Tum",
    needleGauge: "BWG (nålkaliber)",
    standardWireGauge: "Standard Wire Gauge",
};
