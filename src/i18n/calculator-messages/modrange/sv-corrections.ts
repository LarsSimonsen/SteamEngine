import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./sv";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    title: "Moddens intervall",
    specs: "Moddens specifikationer",
    currentLimit: "Strömgräns",
    currentLimitRequires: "strömgränsen kräver",
    currentReachedFirst: "Strömgränsen nås först.",
    power: "Effekt",
    current: "Ström",
    eyebrow: "Kalkylator för reglerade moddar",
    description: "Hitta ett användbart motståndsområde från en reglerad mods utgångsgränser.",
    preset: "Förinställning för reglerad mod",
    optimalResistance: "Vägledning om motstånd",
    medianResistance: "Skärningspunkt mellan ström- och spänningsgränserna",
    sweetSpot: "Mittpunkt i det övre intervallet",
    median: "Skärningspunkt mellan ström- och spänningsgränserna",
    at: "Vid",
    powerCurveLegend: "Teckenförklaring för effektkurvan",
    optimalRange: "Optimalt intervall",
};
