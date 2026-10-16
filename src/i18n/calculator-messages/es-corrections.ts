import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/es";
import { messages as juiceDraft } from "./juice/es";
import { messages as tcrDraft } from "./tcr/es";
import { messages as wireWizDraft } from "./wirewiz/es";

export const coil: CalculatorRouteMessages = {
    ...coilDraft, legLength: "Longitud de los terminales", legPowerLoss: "Pérdida de potencia en los terminales",
    wireLengthWarning: "Después de los terminales no queda suficiente alambre para la bobina.",
};
export const juice: CalculatorRouteMessages = {
    ...juiceDraft, nicStrengthIn: "Concentración de nicotina",
    targetNicWarning: "La concentración objetivo supera la de la base de nicotina. Use una base más concentrada o "
        + "reduzca la concentración objetivo.",
    safetyText: "La nicotina concentrada puede dañar o matar a niños, mascotas y adultos. Antes de mezclar su propio "
        + "e-líquido, infórmese sobre cómo reducir los riesgos y compruebe los cálculos con otra herramienta.",
};
export const tcr: CalculatorRouteMessages = { ...tcrDraft, wireWizard: "Wire Wizard" };
export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft, title: "Wire Wizard", importDesign: "Importar diseño de Wire Wizard",
    legLength: "Longitud de los terminales",
};
