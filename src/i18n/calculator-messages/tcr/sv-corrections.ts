import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./sv";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    help: "Om du redigerar dessa värden rensas valda material. DNA 200-exporten accepterar "
        + "2–8 punkter och behöver en punkt nära 70 °F (cirka 21 °C).",
    results: "Motstånd vid olika temperaturer",
    export: "DNA 200-export",
    csvOutput: "DNA 200-export i CSV-format",
};
