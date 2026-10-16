import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as coilDraft } from "./coil/sv";
import { messages as juiceDraft } from "./juice/sv";
import { messages as wireWizDraft } from "./wirewiz/sv";

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    imperial: "Brittiska måttenheter",
    twistPitch: "Tvinningsstigning",
    legLength: "Anslutningslängd",
    wrapSpacing: "Avstånd mellan lindningar",
    legPowerLoss: "Effektförlust i anslutningarna",
    wireLengthWarning: "Efter anslutningarna finns inte tillräckligt med tråd kvar till spolen.",
    buildDetails: "Konstruktionsdetaljer",
    wraps: "Antal varv",
    coilArea: "Spolarea",
};
export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    amount: "Mängd att blanda",
    nicStrengthIn: "Nikotinstyrka",
    nicBase: "Nikotinbas",
    nicStrength: "Nikotinstyrka",
    targetLabel: "önskat värde",
    flavorVg: "Smaksättningen är VG-baserad",
    safetyText: "Koncentrerat nikotin kan skada eller döda barn, husdjur och vuxna. Läs på om hur riskerna minskas "
        + "innan du blandar egen e-vätska och kontrollera beräkningen med ett annat verktyg.",
    adjustMix: "Du kan behöva sänka den önskade nikotinhalten, VG- eller PG-halten eller mängden "
        + "smaksättning. Alternativt kan du använda en starkare nikotinbas eller en "
        + "nikotinbas med ett annat VG/PG-förhållande. Justera inställningarna tills alla tal "
        + "är större än noll.",
    targetNicWarning: "Den önskade nikotinhalten är högre än nikotinbasens styrka. Skaffa antingen en "
        + "starkare nikotinbas eller sänk den önskade nikotinhalten.",
    flavorPercentage: "Smaksättning i procent",
};
export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    importDesign: "Importera Wire Wizard-design",
    wraps: "Lindningar",
    legLength: "Anslutningslängd",
    wrapSpacing: "Avstånd mellan lindningar",
    current: "Ström",
    powerDissipated: "Avgiven effekt",
    mass: "Massa",
    strands: "Trådar",
    twistPitch: "Tvinningsstigning",
    vapingRange: "inom temperaturintervallet för vejping",
    strandWire: "Deltråd",
    eyebrow: "Kalkylator för anpassade trådar",
    tfrEditor: "TFR-redigerare",
    dnaUnavailable: "DNA200-export är inte tillgänglig:",
    single: "Enkel",
    parallel: "Parallell",
    twisted: "Tvinnad",
    staggeredClapton: "Staggered Clapton",
    sourceFactorSuffix: "vid denna temperatur.",
};
