import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/pl";
import { messages as juiceDraft } from "./juice/pl";
import { messages as tcrDraft } from "./tcr/pl";
import { messages as wireWizDraft } from "./wirewiz/pl";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    legLength: "Długość wyprowadzeń",
    legPowerLoss: "Strata mocy w wyprowadzeniach",
    wireLengthWarning: "Po odjęciu wyprowadzeń nie pozostaje dość drutu na grzałkę.",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    safetyText:
        "Stężona nikotyna może zaszkodzić lub zabić dzieci, zwierzęta i dorosłych. Przed samodzielnym mieszaniem "
        + "e-liquidu dowiedz się, jak ograniczyć ryzyko, i sprawdź obliczenia także innym narzędziem.",
};

export const tcr: CalculatorRouteMessages = { ...tcrDraft, wireWizard: "Wire Wizard" };

export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    title: "Wire Wizard",
    importDesign: "Importuj projekt Wire Wizard",
    legLength: "Długość wyprowadzeń",
};
