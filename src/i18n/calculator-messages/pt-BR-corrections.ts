import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/pt-BR";
import { messages as juiceDraft } from "./juice/pt-BR";
import { messages as tcrDraft } from "./tcr/pt-BR";
import { messages as wireWizDraft } from "./wirewiz/pt-BR";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    legLength: "Comprimento dos terminais",
    legPowerLoss: "Perda de potência nos terminais",
    wireLengthWarning: "Depois dos terminais, não resta fio suficiente para a bobina.",
    description: "Escolha o fio e os parâmetros de construção para estimar o número de voltas, a "
        + "resistência e o calor.",
    material: "Material",
    wrapSpacing: "Espaçamento entre voltas",
};
export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    menu: "Menu",
    amount: "Quantidade a preparar",
    nicStrengthIn: "Concentração de nicotina",
    nicBase: "Base de nicotina",
    nicStrength: "Concentração de nicotina",
    targetLabel: "valor desejado",
    safetyText: "A nicotina concentrada pode ferir ou matar crianças, animais e adultos. Antes de misturar seu "
        + "próprio e-líquido, aprenda a reduzir os riscos e confira os cálculos com outra ferramenta.",
    adjustMix: "Pode ser necessário reduzir a concentração desejada de nicotina, o teor de VG ou "
        + "PG, ou a quantidade de aromatizante. Como alternativa, use uma base com maior "
        + "concentração de nicotina ou uma base com uma proporção VG/PG diferente. Ajuste as "
        + "configurações até que todos os números sejam maiores que zero.",
    targetNicWarning: "A concentração desejada de nicotina é maior que a concentração da base de "
        + "nicotina. Use uma base mais concentrada ou reduza a concentração desejada.",
    flavorPercentage: "Porcentagem de aromatizante",
    flavorVg: "O aromatizante é à base de VG",
};
export const tcr: CalculatorRouteMessages = {
    ...tcrDraft,
    wireWizard: "Wire Wizard",
    material: "Material",
    noticeCleared: "Os pontos de temperatura mudaram; a seleção de materiais foi limpa.",
};
export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    eyebrow: "Calculadora de fios personalizados",
    menu: "Menu",
    legLength: "Comprimento dos terminais",
    single: "Único",
    table: "Tabela",
    round: "Redondo",
    material: "Material",
    wrapSpacing: "Espaçamento entre voltas",
    wraps: "Voltas",
    strandWire: "Fio individual",
    matchTemperature: "Para obter um resultado equivalente em um mod configurado para",
    sourceFactorSuffix: "nessa temperatura.",
};
