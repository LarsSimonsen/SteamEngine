import { useEffect, useId, useState, type MouseEvent, type ReactElement } from "react";
import {
    SvgAxisLine,
    SvgCurve,
    SvgGraph,
    SvgGraphLabel,
    SvgGridLine,
    svgLinePath,
} from "./svg-graph";
import "./power-curve-graph.css";
import { calculatorMessagesFor } from "../../i18n/calculator-messages";
import { pageLocale } from "../../i18n/page-locale";

export type PowerCurveLimits = Readonly<{
    readonly maxPower: number;
    readonly maxVoltage: number;
    readonly maxCurrent: number;
}>;

export type PowerCurveValues = Readonly<{
    readonly minimumResistance: number;
    readonly maximumResistance: number;
    readonly medianResistance: number;
    readonly sweetSpotResistance: number;
}>;

export type PowerCurveBounds = Readonly<{
    readonly minimumResistance: number;
    readonly maximumResistance: number;
    readonly globalMaximumPower: number;
}>;

export type PowerCurveScale = PowerCurveBounds;

export type PowerCurvePoint = Readonly<{
    readonly resistance: number;
    readonly power: number;
}>;

export type PowerCurveKind = "combined" | "current" | "voltage" | "power";

type PowerCurveGraphProps = Readonly<{
    readonly limits: PowerCurveLimits;
    readonly values: PowerCurveValues;
    readonly bounds: PowerCurveBounds;
    readonly createCurve: (curve: PowerCurveKind) => readonly PowerCurvePoint[];
    readonly maximumPowerAtResistance: (resistance: number) => number;
    readonly variant: "mod-range" | "encyclopedia";
    readonly scale?: PowerCurveScale;
    readonly showTitle?: boolean;
    readonly showDescription?: boolean;
}>;

type PowerCurveUnavailableProps = Readonly<{
    readonly message: string;
}>;

type GraphMarker = Readonly<{
    readonly key: "crossover" | "upperMidpoint";
    readonly label: string;
    readonly resistance: number;
    readonly color: string;
}>;

type PowerCurveVisibility = Readonly<{
    readonly showCrossover: boolean;
    readonly showUpperMidpoint: boolean;
}>;

type GraphHover = Readonly<{
    readonly resistance: number;
    readonly power: number;
    readonly x: number;
    readonly y: number;
}>;

const chart = {
    width: 760,
    height: 380,
    margin: { top: 24, right: 24, bottom: 52, left: 58 },
} as const;

const powerCurveStorageKey = "steamengine.power-curve.v1";
const defaultPowerCurveVisibility: PowerCurveVisibility = {
    showCrossover: true,
    showUpperMidpoint: true,
};

const readPowerCurveVisibility = (): PowerCurveVisibility => {
    if (typeof localStorage === "undefined") return defaultPowerCurveVisibility;
    try {
        const raw = localStorage.getItem(powerCurveStorageKey);
        if (!raw) return defaultPowerCurveVisibility;
        const saved = JSON.parse(raw) as {
            readonly version?: unknown;
            readonly showCrossover?: unknown;
            readonly showUpperMidpoint?: unknown;
            readonly showMedian?: unknown;
            readonly showSweetSpot?: unknown;
        };
        if (saved.version !== 1) return defaultPowerCurveVisibility;
        return {
            showCrossover: typeof saved.showCrossover === "boolean"
                ? saved.showCrossover
                : typeof saved.showMedian === "boolean" ? saved.showMedian : true,
            showUpperMidpoint: typeof saved.showUpperMidpoint === "boolean"
                ? saved.showUpperMidpoint
                : typeof saved.showSweetSpot === "boolean" ? saved.showSweetSpot : true,
        };
    } catch {
        return defaultPowerCurveVisibility;
    }
};

const savePowerCurveVisibility = (visibility: PowerCurveVisibility): void => {
    if (typeof localStorage === "undefined") return;
    try {
        localStorage.setItem(powerCurveStorageKey, JSON.stringify({ version: 1, ...visibility }));
    } catch {
        // Storage restrictions should not prevent using the graph.
    }
};

const formatGraphValue = (value: number): string => value.toFixed(2).replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");

const graphId = (value: string): string => value.replace(/[^a-zA-Z0-9_-]/g, "");

const graphClassName = (variant: PowerCurveGraphProps["variant"]): string =>
    `${variant === "mod-range" ? "se-card" : "encyclopedia-card"} power-curve-graph power-curve-graph--${variant}`;

export const PowerCurveUnavailable = ({ message }: PowerCurveUnavailableProps): ReactElement => (
    <section className={graphClassName("encyclopedia")} aria-labelledby="power-curve-unavailable-title">
        <h2 id="power-curve-unavailable-title">{calculatorMessagesFor(pageLocale()).modrange.powerCurve}</h2>
        <p className="power-curve-graph__unavailable">{message}</p>
    </section>
);

export const PowerCurveGraph = ({
    limits,
    values,
    bounds,
    createCurve,
    maximumPowerAtResistance,
    variant,
    scale,
    showTitle = true,
    showDescription = true,
}: PowerCurveGraphProps): ReactElement => {
    const messages = calculatorMessagesFor(pageLocale()).modrange;
    const [hover, setHover] = useState<GraphHover | null>(null);
    const [inspectedResistance, setInspectedResistance] = useState(values.sweetSpotResistance);
    const [visibility, setVisibility] = useState<PowerCurveVisibility>(readPowerCurveVisibility);
    const instanceId = graphId(useId());
    const titleId = `power-curve-title-${instanceId}`;
    const descriptionId = `power-curve-description-${instanceId}`;
    const plotId = `power-curve-plot-${instanceId}`;
    const axisBounds = scale ?? bounds;
    const plotWidth = chart.width - chart.margin.left - chart.margin.right;
    const plotHeight = chart.height - chart.margin.top - chart.margin.bottom;
    const yMaximum = axisBounds.globalMaximumPower * 1.1;
    const xScale = (value: number): number => chart.margin.left
        + ((value - axisBounds.minimumResistance)
            / (axisBounds.maximumResistance - axisBounds.minimumResistance)) * plotWidth;
    const yScale = (value: number): number => chart.margin.top + plotHeight - (value / yMaximum) * plotHeight;
    const xTicks = Array.from({ length: 5 }, (_, index) => axisBounds.minimumResistance
        + ((axisBounds.maximumResistance - axisBounds.minimumResistance) * index) / 4);
    const yTicks = Array.from({ length: 5 }, (_, index) => (yMaximum * index) / 4);
    const resistanceRange = axisBounds.maximumResistance - axisBounds.minimumResistance;
    const clampedInspectedResistance = Math.max(axisBounds.minimumResistance,
        Math.min(axisBounds.maximumResistance, inspectedResistance));
    const inspectedPower = maximumPowerAtResistance(clampedInspectedResistance);
    const inspectionStep = Math.max(Math.min(resistanceRange / 100, 0.01), 0.001);
    const markers: readonly GraphMarker[] = [
        {
            key: "crossover",
            label: messages.median,
            resistance: values.medianResistance,
            color: "#3498db",
        },
        {
            key: "upperMidpoint",
            label: messages.sweetSpot,
            resistance: values.sweetSpotResistance,
            color: "#2ecc71",
        },
    ];
    useEffect(() => {
        setInspectedResistance(values.sweetSpotResistance);
    }, [values.sweetSpotResistance]);
    const combinedPath = svgLinePath(createCurve("combined").map((point) => ({
        x: xScale(point.resistance),
        y: yScale(point.power),
    })));
    const usableStart = xScale(values.minimumResistance);
    const usableEnd = xScale(values.maximumResistance);
    const handleGraphMouseMove = (event: MouseEvent<SVGRectElement>): void => {
        const rectangle = event.currentTarget.getBoundingClientRect();
        if (rectangle.width <= 0) return;
        const fraction = Math.max(0, Math.min(1, (event.clientX - rectangle.left) / rectangle.width));
        const resistance = axisBounds.minimumResistance
            + fraction * (axisBounds.maximumResistance - axisBounds.minimumResistance);
        const power = maximumPowerAtResistance(resistance);
        setHover({
            resistance,
            power,
            x: Math.max(130, Math.min(chart.width - 130, xScale(resistance))),
            y: Math.max(chart.margin.top + 32, yScale(power) - 12),
        });
    };
    const inspectGraphPoint = (event: MouseEvent<SVGRectElement>): void => {
        const rectangle = event.currentTarget.getBoundingClientRect();
        if (rectangle.width <= 0) return;
        const fraction = Math.max(0, Math.min(1, (event.clientX - rectangle.left) / rectangle.width));
        setInspectedResistance(axisBounds.minimumResistance + fraction * resistanceRange);
    };
    const hoverTitle = hover === null
        ? undefined
        : `${hover.power.toFixed(2)}W @ ${hover.resistance.toFixed(2)}Ω`;
    const toggleVisibility = (key: keyof PowerCurveVisibility): void => {
        setVisibility((current) => {
            const next = { ...current, [key]: !current[key] };
            savePowerCurveVisibility(next);
            return next;
        });
    };
    return <section className={graphClassName(variant)} aria-labelledby={showTitle ? titleId : undefined}
        aria-label={showTitle ? undefined : messages.powerCurve}>
        {(showTitle || showDescription) && <div className="power-curve-graph__header">
            <div>
                {showTitle && <h2 id={titleId}>{messages.powerCurve}</h2>}
                {showDescription && <p>{messages.powerCurveDescription}</p>}
            </div>
        </div>}
        <SvgGraph className="power-curve-graph__svg" width={chart.width} height={chart.height}
            ariaLabel={showTitle ? undefined : messages.powerCurve}
            ariaLabelledBy={showTitle ? titleId : undefined} ariaDescribedBy={descriptionId}>
            <desc id={descriptionId}>
                {messages.powerCurveDescriptionLong}
            </desc>
            <defs>
                <clipPath id={plotId}>
                    <rect x={chart.margin.left} y={chart.margin.top} width={plotWidth} height={plotHeight} />
                </clipPath>
            </defs>
            <rect className="power-curve-graph__usable" x={usableStart} y={chart.margin.top}
                width={Math.max(0, usableEnd - usableStart)} height={plotHeight} />
            {yTicks.map((value) => <SvgGridLine key={`y-grid-${value}`} className="power-curve-graph__grid"
                x1={chart.margin.left} x2={chart.width - chart.margin.right} y1={yScale(value)} y2={yScale(value)} />)}
            {xTicks.map((value) => <SvgGridLine key={`x-grid-${value}`} className="power-curve-graph__grid"
                x1={xScale(value)} x2={xScale(value)} y1={chart.margin.top}
                y2={chart.height - chart.margin.bottom} />)}
            <g clipPath={`url(#${plotId})`}>
                <SvgCurve className="power-curve-graph__curve power-curve-graph__curve--combined" d={combinedPath} />
                {markers.filter(({ key }) => visibility[key === "crossover"
                    ? "showCrossover"
                    : "showUpperMidpoint"]).map(({ key, label, resistance, color }) => {
                    const markerX = xScale(resistance);
                    const markerY = yScale(maximumPowerAtResistance(resistance));
                    const nearLeftEdge = markerX < chart.margin.left + 90;
                    const nearRightEdge = markerX > chart.width - chart.margin.right - 90;
                    const textAnchor = nearLeftEdge ? "start" : nearRightEdge || key === "crossover" ? "end" : "start";
                    const labelX = markerX + (textAnchor === "start" ? 8 : -8);
                    const labelY = Math.max(chart.margin.top + 14, markerY - 10);
                    return <g key={label}>
                        <line className="power-curve-graph__marker" stroke={color} x1={markerX}
                            x2={markerX} y1={chart.margin.top} y2={chart.height - chart.margin.bottom} />
                        <circle cx={markerX} cy={markerY} r="4" fill={color} />
                        <text className="power-curve-graph__marker-value" fill={color} x={labelX} y={labelY}
                            textAnchor={textAnchor}>{formatGraphValue(resistance)} Ω</text>
                    </g>;
                })}
                <line className="power-curve-graph__inspection-line" x1={xScale(clampedInspectedResistance)}
                    x2={xScale(clampedInspectedResistance)} y1={chart.margin.top}
                    y2={chart.height - chart.margin.bottom} />
                <circle className="power-curve-graph__inspection-point" cx={xScale(clampedInspectedResistance)}
                    cy={yScale(inspectedPower)} r="5" />
                <rect className="power-curve-graph__hover-target" x={chart.margin.left} y={chart.margin.top}
                    width={plotWidth} height={plotHeight} fill="transparent" onMouseMove={handleGraphMouseMove}
                    onMouseLeave={() => setHover(null)} onClick={inspectGraphPoint}>
                    {hoverTitle !== undefined && <title>{hoverTitle}</title>}
                </rect>
            </g>
            {hover !== null && hoverTitle !== undefined && <g className="power-curve-graph__hover-tooltip"
                aria-label={hoverTitle} pointerEvents="none" transform={`translate(${hover.x} ${hover.y})`}>
                <rect x="-125" y="-32" width="250" height="24" rx="4" />
                <text x="0" y="-16" textAnchor="middle">{hoverTitle}</text>
            </g>}
            <SvgAxisLine className="power-curve-graph__axis" x1={chart.margin.left}
                x2={chart.width - chart.margin.right}
                y1={chart.height - chart.margin.bottom} y2={chart.height - chart.margin.bottom} />
            <SvgAxisLine className="power-curve-graph__axis" x1={chart.margin.left} x2={chart.margin.left}
                y1={chart.margin.top} y2={chart.height - chart.margin.bottom} />
            {xTicks.map((value) => <SvgGraphLabel key={`x-label-${value}`} className="power-curve-graph__label"
                x={xScale(value)} y={chart.height - chart.margin.bottom + 24} textAnchor="middle">
                {formatGraphValue(value)} Ω
            </SvgGraphLabel>)}
            {yTicks.map((value) => <SvgGraphLabel key={`y-label-${value}`} className="power-curve-graph__label"
                x={chart.margin.left - 10} y={yScale(value) + 4} textAnchor="end">
                {formatGraphValue(value)} W
            </SvgGraphLabel>)}
            <SvgGraphLabel axis className="power-curve-graph__axis-label" x={chart.width / 2}
                y={chart.height - 8} textAnchor="middle">{messages.resistance}</SvgGraphLabel>
            <SvgGraphLabel axis className="power-curve-graph__axis-label"
                transform={`translate(14 ${chart.height / 2}) rotate(-90)`} textAnchor="middle">
                {messages.power}
            </SvgGraphLabel>
        </SvgGraph>
        <div className="power-curve-graph__legend" role="group" aria-label={messages.powerCurveLegend}>
            <span><i className="power-curve-graph__legend-line power-curve-graph__legend-line--combined" />
                {messages.maxAchievablePower}</span>
            <span><i className="power-curve-graph__legend-area" /> {messages.maximumPowerRange}</span>
            {markers.map(({ key, label, color }) => {
                const visibilityKey = key === "crossover" ? "showCrossover" : "showUpperMidpoint";
                return <button key={key} type="button" className={`power-curve-graph__legend-toggle${
                    visibility[visibilityKey] ? "" : " power-curve-graph__legend-toggle--inactive"}`}
                    aria-pressed={visibility[visibilityKey]} onClick={() => toggleVisibility(visibilityKey)}>
                    <i className="power-curve-graph__legend-marker" style={{ backgroundColor: color }} />
                    {label}
                </button>;
            })}
        </div>
        <div className="power-curve-graph__inspector">
            <label htmlFor={`power-curve-inspector-${instanceId}`}>{messages.resistance}</label>
            <input id={`power-curve-inspector-${instanceId}`} type="range"
                min={axisBounds.minimumResistance} max={axisBounds.maximumResistance} step={inspectionStep}
                value={clampedInspectedResistance}
                aria-valuetext={`${formatGraphValue(clampedInspectedResistance)} Ω, `
                    + `${formatGraphValue(inspectedPower)} W`}
                onChange={(event) => setInspectedResistance(Number(event.currentTarget.value))} />
            {/* The slider's value text already announces both values. */}
            <output htmlFor={`power-curve-inspector-${instanceId}`} aria-live="off">
                {formatGraphValue(clampedInspectedResistance)} Ω · {formatGraphValue(inspectedPower)} W
            </output>
        </div>
    </section>;
};
