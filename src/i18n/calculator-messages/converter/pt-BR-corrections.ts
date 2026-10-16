import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./pt-BR";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    americanWireGauge: "American Wire Gauge",
    precisionHelp: "A precisão se aplica aos resultados numéricos. As tabelas de bitolas mantêm os "
        + "valores publicados.",
    reset: "Restaurar configurações padrão",
};
