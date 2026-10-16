export type CylindricalTerminalStyle = "flat-top" | "button-top";

export type BatteryAccess = "integrated" | "removable";

export type BatteryMarkingLocation = "wrapper" | "positive-terminal" | "negative-terminal" | "packaging";

export type BatteryMarkingMethod = "printed" | "laser-etched" | "stamped" | "barcode" | "qr-code";

export type BatteryMarking = {
    readonly location: BatteryMarkingLocation;
    readonly text: string;
    readonly method?: BatteryMarkingMethod;
    readonly notes?: string;
};

export type BatteryAppearance = {
    readonly wrapperColor?: string;
    readonly markings?: readonly BatteryMarking[];
};

export type CylindricalBatteryFormFactor = {
    readonly kind: "cylindrical";
    /** Common nominal code such as 18650; actual dimensions may vary by product. */
    readonly sizeCode?: string;
    readonly nominalDiameterMm: number;
    readonly nominalLengthMm: number;
    readonly terminalStyle?: CylindricalTerminalStyle;
};

export type PrismaticBatteryFormFactor = {
    readonly kind: "prismatic";
    readonly lengthMm: number;
    readonly widthMm: number;
    readonly thicknessMm: number;
};

export type BatteryFormFactor = CylindricalBatteryFormFactor | PrismaticBatteryFormFactor;

export const formFactorFromLegacySize = (size: string): CylindricalBatteryFormFactor | undefined => {
    const normalized = size.trim();
    if (!/^\d{5}$/.test(normalized)) return undefined;
    return {
        kind: "cylindrical",
        sizeCode: normalized,
        nominalDiameterMm: Number(normalized.slice(0, 2)),
        nominalLengthMm: Number(normalized.slice(2)) / 10,
    };
};

export const formatBatteryFormFactor = (formFactor: BatteryFormFactor | null | undefined): string => {
    if (!formFactor) return "Not specified";
    if (formFactor.kind === "cylindrical") {
        const terminal = formFactor.terminalStyle ? `, ${formFactor.terminalStyle}` : "";
        const code = formFactor.sizeCode ? ` (${formFactor.sizeCode})` : "";
        return `Cylindrical${code}: ${formFactor.nominalDiameterMm} × ${formFactor.nominalLengthMm} mm${terminal}`;
    }
    return `Prismatic: ${formFactor.lengthMm} × ${formFactor.widthMm} × ${formFactor.thicknessMm} mm`;
};
