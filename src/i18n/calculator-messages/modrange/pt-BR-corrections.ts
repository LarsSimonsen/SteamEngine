import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./pt-BR";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    description: "Encontre uma faixa de resistência útil nos limites de saída de um mod regulado.",
    presetIntro: "Escolha uma predefinição de mod regulado.",
    preset: "Predefinição de mod regulado",
    eyebrow: "Calculadora de mod regulado",
    power: "Potência",
    title: "Faixa do mod",
    optimalRange: "Faixa ideal",
    optimalResistance: "Orientações sobre resistência",
    medianResistance: "Cruzamento dos limites de corrente e tensão",
    median: "Cruzamento dos limites de corrente e tensão",
    sweetSpot: "Ponto médio da faixa superior",
    currentLimit: "Limite de corrente",
    currentLimitRequires: "o limite de corrente exige",
    currentReachedFirst: "O limite de corrente é atingido primeiro.",
    current: "Corrente",
    ampere: "A",
};
