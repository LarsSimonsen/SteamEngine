type Rgb = readonly [number, number, number];
type ColorStop = readonly [number, Rgb];

export type HeatFluxColorScale = "legacy" | "blackBody";

/** The original site's blue-green-yellow-red steps, spread evenly over 100–330 mW/mm². */
const legacyColors: readonly string[] = [
    "00C0E3", "00D4E2", "00E1D9", "00E0C3", "00DFAD", "00DE98", "00DC6E", "00DA44", "33D400",
    "59D200", "7FD000", "A4CE00", "B7CD00", "C9CC00", "CBBC00", "CAA800", "C99400", "C88100",
    "C76E00", "C65B00", "C54800", "C43500", "C32300", "C21100", "C10000", "C00012", "BF0024",
];

const blackBodyStops: readonly ColorStop[] = [
    [10, [255, 0, 0]],
    [200, [255, 140, 0]],
    [350, [255, 255, 0]],
    [425, [242, 247, 255]],
    [500, [173, 216, 230]],
];

const interpolate = (left: Rgb, right: Rgb, fraction: number): Rgb => [
    Math.round(left[0] + (right[0] - left[0]) * fraction),
    Math.round(left[1] + (right[1] - left[1]) * fraction),
    Math.round(left[2] + (right[2] - left[2]) * fraction),
];

const legacyHeatFluxColor = (heatFlux: number): string => {
    const last = legacyColors.length - 1;
    const value = Number.isFinite(heatFlux) ? heatFlux : 100;
    const index = Math.min(last, Math.max(0, Math.round((value - 100) * last / (330 - 100))));
    return `#${legacyColors[index]}`;
};

/** Warm-to-cool scale inspired by correlated colour temperature. */
const blackBodyHeatFluxColor = (heatFlux: number): string => {
    const value = Number.isFinite(heatFlux) ? Math.min(500, Math.max(10, heatFlux)) : 10;
    for (let index = 0; index < blackBodyStops.length - 1; index += 1) {
        const [leftValue, leftColor] = blackBodyStops[index];
        const [rightValue, rightColor] = blackBodyStops[index + 1];
        if (value <= rightValue) {
            const fraction = (value - leftValue) / (rightValue - leftValue);
            const [red, green, blue] = interpolate(leftColor, rightColor, fraction);
            return `rgb(${red}, ${green}, ${blue})`;
        }
    }
    const [red, green, blue] = blackBodyStops[blackBodyStops.length - 1][1];
    return `rgb(${red}, ${green}, ${blue})`;
};

export const heatFluxColor = (heatFlux: number, scale: HeatFluxColorScale = "legacy"): string =>
    scale === "blackBody" ? blackBodyHeatFluxColor(heatFlux) : legacyHeatFluxColor(heatFlux);
