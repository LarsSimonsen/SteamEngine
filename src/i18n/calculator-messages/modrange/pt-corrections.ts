import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./pt";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    calculating: "A calcular…",
    description: "Encontre uma gama de resistência útil nos limites de saída de um mod regulado.",
    presetIntro: "Escolha uma predefinição de mod regulado.",
    preset: "Predefinição de mod regulado",
    eyebrow: "Calculadora de mod regulado",
    power: "Potência",
    title: "Gama do mod",
    optimalResistance: "Orientações sobre resistência",
    medianResistance: "Cruzamento dos limites de corrente e tensão",
    median: "Cruzamento dos limites de corrente e tensão",
    sweetSpot: "Ponto médio do intervalo superior",
    currentLimit: "Limite de corrente",
    currentLimitRequires: "o limite de corrente exige",
    currentReachedFirst: "O limite de corrente é atingido em primeiro lugar.",
    current: "Corrente",
    watt: "W",
    ampere: "A",
};
