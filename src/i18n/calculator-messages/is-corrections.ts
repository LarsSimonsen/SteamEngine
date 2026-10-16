import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/is";
import { messages as juiceDraft } from "./juice/is";
import { messages as tcrDraft } from "./tcr/is";
import { messages as wireWizDraft } from "./wirewiz/is";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    legLength: "Lengd tengivíra",
    legPowerLoss: "Afltap í tengivírum",
    wireLengthWarning: "Ekki er nægur vír eftir fyrir spóluna þegar tengivírarnir hafa verið dregnir frá.",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    safetyText:
        "Þétt nikótín getur skaðað eða drepið börn, gæludýr og fullorðna. Kynntu þér hvernig draga má úr hættunni "
        + "áður en þú blandar eigin rafvökva. Staðfestu útreikningana einnig með öðru verkfæri.",
};

export const tcr: CalculatorRouteMessages = {
    ...tcrDraft,
    wireWizard: "Wire Wizard",
};

export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    legLength: "Lengd tengivíra",
};
