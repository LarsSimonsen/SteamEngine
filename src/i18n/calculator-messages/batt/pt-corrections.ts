import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./pt";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    calculating: "A calcular…",
    unregulated: "Mod não regulado",
    description: "Estime a saída do atomizador, o consumo da bateria e a margem de corrente "
        + "disponível para mods regulados e não regulados.",
    atomizerOutput: "Saída do atomizador",
    outputPower: "Potência de saída",
    batteryPresets: "Predefinição de célula",
    cellSelection: "Seleção de célula",
    batteryIntro: "Escolha a célula utilizada em todo o conjunto ou introduza abaixo os valores por "
        + "célula.",
    batteryPreset: "Predefinição de célula",
    batteryValues: "Célula e conjunto de células",
    batteryConfiguration: "Configuração da bateria",
    singleCell: "1S — Uma célula",
    customConfiguration: "Configuração personalizada",
    cellsInSeries: "Células em série",
    parallelStrings: "Ramos em paralelo",
    cells: "células",
    cell: "célula",
    matchedCells: "Utilize células idênticas e emparelhadas, com a mesma idade e no mesmo estado. A "
        + "partilha de corrente é idealizada; a célula mais fraca limita o conjunto.",
    pack: "Conjunto de células",
    currentPerCell: "Corrente estimada por célula",
    caution: "A margem de corrente restante é inferior a 20%.",
    estimatedRuntime: "Autonomia estimada",
    continuousRuntime: "Autonomia em utilização contínua",
    runtimeHelp: "Esta estimativa idealizada pressupõe uma saída contínua à potência calculada da "
        + "bateria. A autonomia real varia com a tensão de corte, a queda de tensão, a idade "
        + "das células, o consumo interno do dispositivo e a utilização intermitente.",
};
