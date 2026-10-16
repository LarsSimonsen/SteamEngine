import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/pt";
import { messages as juiceDraft } from "./juice/pt";
import { messages as tcrDraft } from "./tcr/pt";
import { messages as wireWizDraft } from "./wirewiz/pt";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    wraps: "Número de voltas",
    resistancePerCoil: "Resistência de cada bobina",
    legLength: "Comprimento dos terminais",
    legPowerLoss: "Perda de potência nos terminais",
    wireLengthWarning: "Depois dos terminais, não resta fio suficiente para a bobina.",
    calculating: "A calcular…",
    description: "Escolha o fio e os parâmetros de construção para estimar o número de voltas, a "
        + "resistência e o calor.",
    wrapSpacing: "Espaçamento entre voltas",
    material: "Material",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    menu: "Menu",
    save: "Guardar",
    amount: "Quantidade a preparar",
    nicStrengthIn: "Concentração de nicotina",
    nicBase: "Base de nicotina",
    nicStrength: "Concentração de nicotina",
    targetLabel: "valor pretendido",
    safetyText: "A nicotina concentrada pode ferir ou matar crianças, animais e adultos. Antes de misturar o seu "
        + "próprio e-líquido, saiba como reduzir os riscos e confirme os cálculos com outra ferramenta.",
    calculating: "A calcular…",
    percentage: "Percentagem",
    adjustMix: "Pode ser necessário reduzir a concentração pretendida de nicotina, o teor de VG ou "
        + "PG, ou a quantidade de aroma. Em alternativa, utilize uma base com maior "
        + "concentração de nicotina ou uma base com uma proporção VG/PG diferente. Ajuste as "
        + "definições até que todos os números sejam superiores a zero.",
    targetNicWarning: "A concentração pretendida de nicotina é superior à concentração da base de "
        + "nicotina. Utilize uma base mais concentrada ou reduza a concentração pretendida.",
    flavor: "Aroma",
    flavorName: "Aroma",
    flavorPercentage: "Percentagem de aroma",
    flavorVg: "O aroma tem VG como base",
    canMix: "Esta mistura pode ser preparada.",
};

export const tcr: CalculatorRouteMessages = {
    ...tcrDraft,
    wireWizard: "Wire Wizard",
    calculating: "A calcular…",
    downloadCsv: "Descarregar ficheiro CSV",
    material: "Material",
    help: "A edição destes valores limpa os materiais selecionados. A saída do DNA 200 aceita "
        + "2 a 8 pontos e necessita de um ponto próximo dos 70 °F (cerca de 21 °C).",
    csvOutput: "Saída CSV do DNA 200",
    noticeCleared: "Os pontos de temperatura foram alterados; a seleção de materiais foi limpa.",
};
export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    eyebrow: "Calculadora de fios personalizados",
    legLength: "Comprimento dos terminais",
    single: "Único",
    table: "Tabela",
    round: "Redondo",
    calculating: "A calcular…",
    downloadCsv: "Descarregar CSV",
    temperatureControl: "Controlo de temperatura",
    tempControlTitle: "Controlo de temperatura",
    menu: "Menu",
    wrapSpacing: "Espaçamento entre voltas",
    wraps: "Voltas",
    material: "Material",
    dna200: "DNA200",
    strandWire: "Fio individual",
    matchTemperature: "Para obter um resultado equivalente num mod configurado para",
    sourceFactorSuffix: "a esta temperatura.",
};
