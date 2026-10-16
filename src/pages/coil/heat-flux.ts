type Rgb = readonly [number, number, number];
type ColorStop = readonly [number, Rgb];

const colorStops: readonly ColorStop[] = [
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

/** Map heat flux to a warm-to-cool visual scale inspired by correlated colour temperature. */
export const heatFluxColor = (heatFlux: number): string => {
    const value = Number.isFinite(heatFlux) ? Math.min(500, Math.max(10, heatFlux)) : 10;
    for (let index = 0; index < colorStops.length - 1; index += 1) {
        const [leftValue, leftColor] = colorStops[index];
        const [rightValue, rightColor] = colorStops[index + 1];
        if (value <= rightValue) {
            const fraction = (value - leftValue) / (rightValue - leftValue);
            const [red, green, blue] = interpolate(leftColor, rightColor, fraction);
            return `rgb(${red}, ${green}, ${blue})`;
        }
    }
    const [red, green, blue] = colorStops[colorStops.length - 1][1];
    return `rgb(${red}, ${green}, ${blue})`;
};
