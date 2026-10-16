import { birminghamWireGauge, fractionalInches, standardWireGauge, type GaugePoint } from "./data";
import { awgToInches, inchesToAwg } from "../../shared/domain/wire-units";

export { awgToInches, inchesToAwg } from "../../shared/domain/wire-units";

export type UnitId = "mm" | "inch" | "awg" | "bwg" | "swg" | "fractional-inch";
export type NumericUnit = "mm" | "inch" | "awg";

export type ConverterSettings = {
    readonly fromUnit: UnitId;
    readonly fromValue: string;
    readonly toUnit: UnitId;
    readonly precision: number;
};

export type Approximation = {
    readonly larger: GaugePoint;
    readonly smaller: GaugePoint;
    readonly largerErrorPercent: number;
    readonly smallerErrorPercent: number;
};

export type ConversionResult =
    | { readonly kind: "invalid"; readonly message: string }
    | { readonly kind: "out-of-range"; readonly message: string }
    | { readonly kind: "approximate"; readonly approximation: Approximation }
    | { readonly kind: "exact"; readonly outputValue: string; readonly numericOutput?: number };

export const defaultSettings: ConverterSettings = {
    fromUnit: "inch",
    fromValue: "1",
    toUnit: "mm",
    precision: 3,
};

export const unitOptions = [
    { id: "mm", label: "Millimetres", kind: "numeric" },
    { id: "inch", label: "Inches", kind: "numeric" },
    { id: "awg", label: "American Wire Gauge", kind: "numeric" },
    { id: "bwg", label: "BWG (needle gauge)", kind: "discrete" },
    { id: "swg", label: "Standard Wire Gauge", kind: "discrete" },
    { id: "fractional-inch", label: "Fractional inches", kind: "discrete" },
] as const satisfies ReadonlyArray<{
    readonly id: UnitId;
    readonly label: string;
    readonly kind: "numeric" | "discrete";
}>;

export const gaugePoints = (unit: UnitId): readonly GaugePoint[] => {
    if (unit === "bwg") return birminghamWireGauge;
    if (unit === "swg") return standardWireGauge;
    return fractionalInches;
};

export const isNumericUnit = (unit: UnitId): unit is NumericUnit =>
    unit === "mm" || unit === "inch" || unit === "awg";

export const isDiscreteUnit = (unit: UnitId): boolean => !isNumericUnit(unit);

export const defaultInputValue = (unit: UnitId): string => {
    if (isDiscreteUnit(unit)) return gaugePoints(unit)[0].name;
    return "1";
};
