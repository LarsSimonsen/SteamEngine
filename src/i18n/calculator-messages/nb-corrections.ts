import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/nb";
import { messages as juiceDraft } from "./juice/nb";
import { messages as wireWizDraft } from "./wirewiz/nb";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    legLength: "Tilledningslengde",
    legPowerLoss: "Effekttap i tilledninger",
    wireLengthWarning: "Det er ikke nok tråd igjen til spolen etter tilledningene.",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    safetyText: "Konsentrert nikotin kan skade eller drepe barn, kjæledyr og voksne. Sett deg inn i hvordan "
        + "risikoen kan reduseres før du blander din egen e-væske, og kontroller beregningene med et annet verktøy.",
};

export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    legLength: "Tilledningslengde",
};
