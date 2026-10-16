import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/it";
import { messages as juiceDraft } from "./juice/it";
import { messages as tcrDraft } from "./tcr/it";
import { messages as wireWizDraft } from "./wirewiz/it";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    legLength: "Lunghezza dei terminali",
    legPowerLoss: "Perdita di potenza nei terminali",
    wireLengthWarning: "Dopo i terminali non rimane filo sufficiente per la resistenza.",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    safetyText:
        "La nicotina concentrata può ferire o uccidere bambini, animali e adulti. Informati su come ridurre i rischi "
        + "prima di miscelare il tuo e-liquid e verifica i calcoli anche con un altro strumento.",
};

export const tcr: CalculatorRouteMessages = { ...tcrDraft, wireWizard: "Wire Wizard" };

export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    importDesign: "Importa progetto Wire Wizard",
    legLength: "Lunghezza dei terminali",
};
