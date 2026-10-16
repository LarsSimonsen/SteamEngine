import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./pt";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    calculating: "A calcular…",
    americanWireGauge: "American Wire Gauge",
    precisionHelp: "A precisão aplica-se aos resultados numéricos. As tabelas de calibres mantêm os "
        + "valores publicados.",
    reset: "Repor predefinições",
};
