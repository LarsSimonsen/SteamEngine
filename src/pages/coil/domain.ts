import { canonicalMaterialId, materials, type Material } from "../../catalogs/materials/catalog";
import { rectangularCrossSectionArea, roundCrossSectionArea } from "../../shared/domain/wire-physics";
import {
    awgToMm,
    inchesToMm,
    mmToAwg,
    mmToInches,
} from "../../shared/domain/wire-units";

export { materials, type Material } from "../../catalogs/materials/catalog";
export { awgToMm, inchesToMm, mmToAwg, mmToInches } from "../../shared/domain/wire-units";

export type CoilProfile = "round" | "roundmulti" | "ribbon";

export type CoilSetup =
    | "single"
    | "parallel-2"
    | "parallel-3"
    | "parallel-4"
    | "parallel-5"
    | "parallel-6"
    | "parallel-7"
    | "parallel-8"
    | "series-2"
    | "series-3"
    | "series-4"
    | "series-parallel-4";

export type CoilSettings = {
    readonly showSi: boolean;
    readonly advanced: boolean;
    readonly materialId: string;
    readonly profile: CoilProfile;
    readonly strands: number;
    readonly twistPitch: number;
    readonly awg: number;
    readonly setup: CoilSetup;
    readonly targetResistance: number;
    /** Resistance per millimetre in ohms. */
    readonly resistancePerLength: number;
    readonly wireLength: number;
    readonly wireLengthManual: boolean;
    readonly diameter: number;
    readonly ribbonWidth: number;
    readonly ribbonThickness: number;
    readonly innerDiameter: number;
    readonly legLength: number;
    readonly wrapSpacing: number;
    readonly heatFlux: number;
};

export type CoilResults = {
    readonly wireLength: number;
    readonly numberOfWraps: number;
    readonly roundedWraps: number;
    readonly roundedWrapResistance: number;
    readonly halfWraps: string;
    readonly halfWrapResistance: number;
    readonly resistancePerCoil?: number;
    readonly legLoss: number;
    readonly heatCapacity: number | null;
    readonly surfaceArea: number;
    readonly coilArea: number;
    readonly crossSectionalArea: number;
    readonly wireVolume: number;
    readonly density: number | null;
    readonly wireMass: number | null;
    readonly outerDiameter: number;
    readonly neutralAxisDiameter: number;
    readonly loopCircumference: number;
    readonly helixAngle: number;
    readonly loopLength: number;
    readonly coilWidth: number;
    readonly recommendPower: number;
    readonly recommendVoltage: number;
    readonly wireLengthWarning: boolean;
    readonly legLossStatus: "normal" | "warning" | "danger";
    readonly legLossMessage?: string;
};

export type CoilCalculation =
    | { readonly kind: "valid"; readonly values: CoilResults }
    | { readonly kind: "invalid"; readonly message: string };

export type LegacyCoilQuery = Readonly<Record<string, string>>;

export const setupOptions: readonly { readonly id: CoilSetup; readonly label: string; readonly wires: number }[] = [
    { id: "single", label: "Single coil", wires: 1 },
    { id: "parallel-2", label: "Dual coil (parallel)", wires: 2 },
    { id: "parallel-3", label: "Triple coil (parallel)", wires: 3 },
    { id: "parallel-4", label: "Quad coil (parallel)", wires: 4 },
    { id: "parallel-5", label: "Five coils (parallel)", wires: 5 },
    { id: "parallel-6", label: "Six coils (parallel)", wires: 6 },
    { id: "parallel-7", label: "Seven coils (parallel)", wires: 7 },
    { id: "parallel-8", label: "Eight coils (parallel)", wires: 8 },
    { id: "series-2", label: "Dual coil (series)", wires: 2 },
    { id: "series-3", label: "Triple coil (series)", wires: 3 },
    { id: "series-4", label: "Quad coil (series)", wires: 4 },
    { id: "series-parallel-4", label: "Quad coil (series-parallel)", wires: 4 },
];

export const defaultSettings: CoilSettings = {
    showSi: true,
    advanced: false,
    materialId: "ka1",
    profile: "round",
    strands: 1,
    twistPitch: 0,
    awg: 30,
    setup: "single",
    targetResistance: 1.8,
    resistancePerLength: 0.028472674975859414,
    wireLength: 63.21850692027117,
    wireLengthManual: false,
    diameter: 0.2546390029766585,
    ribbonWidth: 0.5,
    ribbonThickness: 0.1,
    innerDiameter: 1.3,
    legLength: 5,
    wrapSpacing: 0.01,
    heatFlux: 200,
};

export const setupWires = (setup: CoilSetup): number => setupOptions.find((item) => item.id === setup)?.wires ?? 1;

export const setupResistanceFactor = (setup: CoilSetup): number => {
    if (setup === "single" || setup === "series-parallel-4") return 1;
    if (setup.startsWith("parallel-")) return 1 / setupWires(setup);
    if (setup.startsWith("series-")) return setupWires(setup);
    return 1;
};

export const crossSectionalArea = (settings: CoilSettings): number => settings.profile === "ribbon"
    ? rectangularCrossSectionArea(settings.ribbonWidth, settings.ribbonThickness)
    : roundCrossSectionArea(settings.diameter) * settings.strands;

const number = (value: string | undefined, fallback: number): number => {
    const parsed = value === undefined ? Number.NaN : Number.parseFloat(value.replace(",", "."));
    return Number.isFinite(parsed) ? parsed : fallback;
};

const profileFromQuery = (value: string | undefined): CoilProfile | undefined =>
    value === "ribbon" || value === "roundmulti" ? value : value === undefined ? undefined : "round";

const setupFromQuery = (value: string | undefined): CoilSetup | undefined => {
    const map: Record<string, CoilSetup> = {
        dp: "parallel-2", tp: "parallel-3", qp: "parallel-4", "5p": "parallel-5", "6p": "parallel-6",
        "7p": "parallel-7", "8p": "parallel-8", ds: "series-2", ts: "series-3", qs: "series-4",
        qsp: "series-parallel-4",
    };
    return value === undefined ? undefined : map[value] ?? "single";
};

export const fromLegacyQuery = (query: LegacyCoilQuery, base = defaultSettings): CoilSettings => {
    const profile = profileFromQuery(query.p) ?? base.profile;
    const showSi = query.si === undefined ? base.showSi : query.si !== "false";
    const queriedMaterialId = query.mat ?? base.materialId;
    const materialId = canonicalMaterialId(
        queriedMaterialId === "custom" ? defaultSettings.materialId : queriedMaterialId,
    );
    const diameter = query.dia === undefined ? number(query.awg, base.awg) : base.diameter;
    const awg = query.dia === undefined ? number(query.awg, base.awg) : mmToAwg(number(query.dia, base.diameter));
    const next: CoilSettings = {
        ...base,
        showSi,
        advanced: query.a === undefined ? base.advanced : query.a === "true",
        materialId,
        profile,
        twistPitch: number(query.tp, base.twistPitch),
        setup: setupFromQuery(query.s) ?? base.setup,
        targetResistance: number(query.r, base.targetResistance),
        resistancePerLength: base.resistancePerLength,
        awg,
        diameter: query.dia === undefined ? awgToMm(awg) : number(query.dia, base.diameter),
        ribbonWidth: number(query.width, base.ribbonWidth),
        ribbonThickness: number(query.thick, base.ribbonThickness),
        strands: Math.min(4, Math.max(1, Math.round(number(query.str, base.strands)))),
        wireLength: number(query.wl, base.wireLength),
        wireLengthManual: query.wl !== undefined,
        innerDiameter: number(query.id, base.innerDiameter),
        legLength: number(query.ll, base.legLength),
        wrapSpacing: number(query.ws, base.wrapSpacing),
        heatFlux: number(query.hf, base.heatFlux),
    };
    return profile === "round" || profile === "ribbon" ? { ...next, strands: 1, twistPitch: 0 } : next;
};

export const toLegacyQuery = (settings: CoilSettings): string => {
    const pairs: string[] = [];
    const materialId = canonicalMaterialId(settings.materialId);
    if (!settings.showSi) pairs.push("si=false");
    if (settings.advanced) pairs.push("a=true");
    if (materialId !== "custom" && materialId !== defaultSettings.materialId) {
        pairs.push(`mat=${materialId}`);
    }
    if (settings.profile !== defaultSettings.profile) pairs.push(`p=${settings.profile}`);
    if (settings.twistPitch !== defaultSettings.twistPitch) pairs.push(`tp=${settings.twistPitch}`);
    if (settings.setup !== defaultSettings.setup) {
        const setupMap: Record<CoilSetup, string> = {
            single: "single", "parallel-2": "dp", "parallel-3": "tp", "parallel-4": "qp",
            "parallel-5": "5p", "parallel-6": "6p", "parallel-7": "7p", "parallel-8": "8p",
            "series-2": "ds", "series-3": "ts", "series-4": "qs", "series-parallel-4": "qsp",
        };
        pairs.push(`s=${setupMap[settings.setup]}`);
    }
    if (settings.targetResistance !== defaultSettings.targetResistance) pairs.push(`r=${settings.targetResistance}`);
    if (settings.heatFlux !== defaultSettings.heatFlux) pairs.push(`hf=${settings.heatFlux}`);
    if (settings.profile === "ribbon") {
        if (settings.ribbonWidth !== defaultSettings.ribbonWidth) pairs.push(`width=${settings.ribbonWidth}`);
        if (settings.ribbonThickness !== defaultSettings.ribbonThickness) {
            pairs.push(`thick=${settings.ribbonThickness}`);
        }
    } else if (settings.awg === Math.round(settings.awg)) {
        if (settings.awg !== defaultSettings.awg) pairs.push(`awg=${settings.awg}`);
    } else if (settings.diameter !== defaultSettings.diameter) pairs.push(`dia=${settings.diameter}`);
    if (settings.profile === "roundmulti" && settings.strands !== defaultSettings.strands) {
        pairs.push(`str=${settings.strands}`);
    }
    if (settings.wireLengthManual) pairs.push(`wl=${settings.wireLength}`);
    if (settings.innerDiameter !== defaultSettings.innerDiameter) pairs.push(`id=${settings.innerDiameter}`);
    if (settings.legLength !== defaultSettings.legLength) pairs.push(`ll=${settings.legLength}`);
    if (settings.wrapSpacing !== defaultSettings.wrapSpacing) pairs.push(`ws=${settings.wrapSpacing}`);
    return pairs.join("&");
};

export const cloneSettings = (settings: CoilSettings): CoilSettings => ({ ...settings });
