import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./pt-BR";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    unregulated: "Mod não regulado",
    description: "Estime a saída do atomizador, o consumo da bateria e a margem de corrente "
        + "disponível para mods regulados e não regulados.",
    atomizerOutput: "Saída do atomizador",
    outputPower: "Potência de saída",
    batteryPresets: "Predefinição de célula",
    cellSelection: "Seleção de célula",
    batteryIntro: "Escolha a célula usada em todo o conjunto ou insira abaixo os valores por célula.",
    batteryPreset: "Predefinição de célula",
    batteryValues: "Célula e conjunto de células",
    batteryConfiguration: "Configuração da bateria",
    singleCell: "1S — Uma célula",
    customConfiguration: "Configuração personalizada",
    cellsInSeries: "Células em série",
    parallelStrings: "Ramos em paralelo",
    cells: "células",
    cell: "célula",
    matchedCells: "Use células idênticas e pareadas, com a mesma idade e nas mesmas condições. O "
        + "compartilhamento de corrente é idealizado; a célula mais fraca limita o conjunto.",
    pack: "Conjunto de células",
    currentPerCell: "Corrente estimada por célula",
    batteryHelp: "A tensão nominal e a capacidade determinam a energia armazenada estimada e o tempo "
        + "de funcionamento contínuo. Elas não afetam o limite de corrente.",
    caution: "A margem de corrente restante é inferior a 20%.",
    estimatedRuntime: "Autonomia estimada",
    continuousRuntime: "Autonomia em uso contínuo",
    runtimeHelp: "Esta estimativa idealizada pressupõe uma saída contínua à potência calculada da "
        + "bateria. A autonomia real varia com a tensão de corte, a queda de tensão, a idade "
        + "das células, o consumo interno do dispositivo e o uso intermitente.",
};
