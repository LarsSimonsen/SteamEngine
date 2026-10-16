import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./sv";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    description: "Uppskatta förångarens elektriska värden, batteriförbrukningen och den tillgängliga "
        + "strömmarginalen för reglerade och oreglerade moddar.",
    efficiency: "Verkningsgrad",
    batteryPresets: "Förinställning för battericell",
    cellSelection: "Cellval",
    batteryIntro: "Välj den cell som används i hela batteripaketet eller ange värden per cell nedan.",
    batteryPreset: "Förinställning för battericell",
    batteryValues: "Cell och batteripaket",
    batteryConfiguration: "Batterikonfiguration",
    singleCell: "1S — En cell",
    customConfiguration: "Anpassad konfiguration",
    cellsInSeries: "Celler i serie",
    parallelStrings: "Parallellgrenar",
    cells: "celler",
    matchedCells: "Använd identiska, matchade celler med samma ålder och skick. Strömfördelningen är "
        + "idealiserad; den svagaste cellen begränsar batteripaketet.",
    pack: "Batteripaket",
    currentPerCell: "Uppskattad ström per cell",
    batteryHelp: "Nominell spänning och kapacitet bestämmer den uppskattade lagrade energin och "
        + "kontinuerlig drifttid. De påverkar inte strömgränsen.",
    atomizerOutput: "Förångarens elektriska värden",
    caution: "Mindre än 20 % strömmarginal återstår.",
    runtimeHelp: "Denna idealiserade uppskattning förutsätter kontinuerlig uteffekt vid den beräknade "
        + "batterieffekten. Verklig drifttid varierar med avstängningsspänning, spänningsnedgång, cellålder, "
        + "enhetens egenförbrukning och intermittent användning.",
    estimatedRuntime: "Beräknad drifttid",
    continuousRuntime: "Kontinuerlig drifttid",
};
