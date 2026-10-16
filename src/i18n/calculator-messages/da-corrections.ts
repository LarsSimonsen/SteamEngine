import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as battDraft } from "./batt/da";
import { messages as coilDraft } from "./coil/da";
import { messages as converterDraft } from "./converter/da";
import { messages as juiceDraft } from "./juice/da";
import { messages as modrangeDraft } from "./modrange/da";
import { messages as tcrDraft } from "./tcr/da";
import { messages as wireWizDraft } from "./wirewiz/da";

export const batt: CalculatorRouteMessages = {
    ...battDraft,
    calculating: "Beregner…",
    caution: "Der er mindre end 20 % sikkerhedsmargin til strømgrænsen.",
    batteryPresets: "Celleforudindstilling",
    batteryPreset: "Celleforudindstilling",
    cellSelection: "Valg af celle",
    batteryIntro: "Vælg den celletype, der bruges i hele batteripakken, eller indtast værdier pr. celle nedenfor.",
    batteryValues: "Celle og batteripakke",
    batteryConfiguration: "Batterikonfiguration",
    singleCell: "1S — En enkelt celle",
    customConfiguration: "Brugerdefineret konfiguration",
    cellsInSeries: "Celler i serie",
    parallelStrings: "Parallelle grene",
    cells: "celler",
    cell: "celle",
    pack: "Batteripakke",
    currentPerCell: "Estimeret strøm pr. celle",
    matchedCells: "Brug identiske, matchede celler med samme alder og tilstand. Strømfordelingen er idealiseret; "
        + "den svageste celle begrænser batteripakken.",
    efficiency: "Virkningsgrad",
    estimatedRuntime: "Estimeret driftstid",
    continuousRuntime: "Kontinuerlig driftstid",
    safe: "Det estimerede strømforbrug er inden for den effektive batterigrænse.",
    runtimeHelp: "Dette idealiserede estimat forudsætter, at batteriet leverer den beregnede effekt "
        + "kontinuerligt. Den faktiske driftstid varierer med afbrydelsesspænding, spændingsfald, cellens alder, "
        + "enhedens eget forbrug og brug med pauser.",
};

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    calculating: "Beregner…",
    description: "Vælg tråd og byggeparametre for at beregne viklinger, modstand og varme.",
    eyebrow: "Coilviklingsberegner",
    imperial: "Imperiale enheder",
    twistPitch: "Snoningsstigning",
    legLength: "Tilledningslængde",
    wrapSpacing: "Afstand mellem viklinger",
    wraps: "Antal viklinger",
    legPowerLoss: "Effekttab i tilledninger",
    wireLengthWarning: "Der er ikke nok tråd tilbage til coilen efter tilledningerne.",
    targetHeatFlux: "Ønsket varmeflux",
    neutralAxisDiameter: "Diameter ved neutralaksen",
    helixAngle: "Helixvinkel",
    loopLength: "Løkkelængde",
    setupParallel4: "Fire coils (parallel)",
    setupSeries3: "Tre coils (serie)",
    setupSeries4: "Fire coils (serie)",
    setupSeriesParallel4: "Fire coils (serie-parallel)",
};

export const converter: CalculatorRouteMessages = {
    ...converterDraft,
    calculating: "Beregner…",
    input: "Indtastning",
    fractionalInches: "Brøktommer",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    calculating: "Beregner…",
    amount: "Mængde, der skal blandes",
    nicStrengthIn: "Nikotinstyrke i",
    flavoring: "Smagsstoffer",
    vgDefaultTitle: "Standardværdien er PG-baseret.",
    nicBase: "Nikotinbase",
    baseLabel: "værdien på etiketten",
    nicStrength: "Nikotinstyrke",
    targetLabel: "den blanding, du vil fremstille",
    adjustMix:
        "Du skal muligvis sænke den ønskede nikotinstyrke, VG- eller PG-andel eller mængden af smagsstoffer. Du kan "
        + "også bruge en stærkere nikotinbase eller en base med et andet VG/PG-forhold. Juster indstillingerne, indtil "
        + "alle værdier er større end nul.",
    targetNicWarning:
        "Den ønskede nikotinstyrke er højere end nikotinbasens styrke. Brug en stærkere nikotinbase, eller sænk den "
        + "ønskede styrke.",
    safetyText:
        "Koncentreret nikotin kan skade eller dræbe børn, kæledyr og voksne. Sæt dig ind i, hvordan risikoen begrænses, "
        + "før du blander din egen e-væske. Kontrollér beregningerne med et andet værktøj for at være helt sikker.",
    flavorVg: "Smagsstoffet er VG-baseret",
};

export const modrange: CalculatorRouteMessages = {
    ...modrangeDraft,
    calculating: "Beregner…",
    currentLimit: "Strømgrænse",
    currentLimitRequires: "strømgrænsen kræver",
    current: "Strøm",
    currentReachedFirst: "Strømgrænsen nås først.",
    sweetSpot: "Optimalt område",
};

export const tcr: CalculatorRouteMessages = {
    ...tcrDraft,
    calculating: "Beregner…",
    help: "Hvis du redigerer disse værdier, fjernes de valgte materialer. DNA 200-output accepterer 2–8 punkter og "
        + "kræver ét punkt nær 70 °F (cirka 21 °C).",
    baseAt20: "Referencemodstanden måles ved 20 °C.",
    baseResistance: "Referencemodstand",
    baseFor: "Referencemodstand for",
    export: "DNA 200-output",
    csvOutput: "DNA 200 CSV-output",
    downloadCsv: "Hent CSV-fil",
    wireWizard: "Wire Wizard",
};

export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    calculating: "Beregner…",
    title: "Wire Wizard",
    importDesign: "Importér Wire Wizard-design",
    coilParameters: "Coilparametre",
    wraps: "Antal viklinger",
    legLength: "Tilledningslængde",
    wrapSpacing: "Afstand mellem viklinger",
    tfrEditor: "TFR-editor",
    single: "Enkelt",
    configuration: "Konfiguration",
    parallelWires: "Parallelle tråde",
    vapingRange: "i vapingområdet",
    perUnitLength: "pr. længdeenhed",
    downloadCsv: "Hent CSV",
    physical: "Fysiske egenskaber",
    strands: "Tråde",
    twistPitch: "Snoningsstigning",
    coilParametersTitle: "Coilparametre",
    wireDesignTitle: "Tråddesign",
};
