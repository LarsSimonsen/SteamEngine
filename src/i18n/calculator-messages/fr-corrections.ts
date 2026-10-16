import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/fr";
import { messages as juiceDraft } from "./juice/fr";
import { messages as tcrDraft } from "./tcr/fr";
import { messages as wireWizDraft } from "./wirewiz/fr";

export const coil: CalculatorRouteMessages = {
    ...coilDraft, legLength: "Longueur des pattes de connexion",
    legPowerLoss: "Perte de puissance dans les pattes de connexion",
    wireLengthWarning: "Après les pattes de connexion, il ne reste pas assez de fil pour la résistance.",
};
export const juice: CalculatorRouteMessages = {
    ...juiceDraft, nicStrengthIn: "Concentration en nicotine", nicStrength: "Concentration en nicotine",
    targetNicWarning: "La concentration cible dépasse celle de la base nicotinée. Utilisez une base plus concentrée "
        + "ou réduisez la concentration cible.",
    safetyText: "La nicotine concentrée peut blesser ou tuer les enfants, les animaux et les adultes. Avant de "
        + "préparer votre e-liquide, apprenez à réduire les risques et vérifiez les calculs avec un autre outil.",
};
export const tcr: CalculatorRouteMessages = { ...tcrDraft, wireWizard: "Wire Wizard" };
export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft, title: "Wire Wizard", importDesign: "Importer une conception Wire Wizard",
    legLength: "Longueur des pattes de connexion",
};
