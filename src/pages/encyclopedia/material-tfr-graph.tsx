import type { ReactElement } from "react";
import type { MaterialTfrApiResponse } from "./material-tfr-api";
import {
    SvgAxisLine,
    SvgCurve,
    SvgExtrapolationBoundaries,
    SvgGraph,
    SvgGraphLabel,
    SvgGridLine,
    svgLinePath,
} from "../../shared/ui/svg-graph";
import "./material-tfr-graph.css";

type Props = {
    readonly materialName: string;
    readonly data: Extract<MaterialTfrApiResponse, { readonly kind: "valid" }>;
    readonly caption?: string;
    readonly scale?: MaterialTfrGraphScale;
};
export type MaterialTfrGraphScale = Readonly<{
    readonly minimumTemperature: number;
    readonly maximumTemperature: number;
    readonly minimumFactor: number;
    readonly maximumFactor: number;
}>;

export type MaterialTfrGraphData = NonNullable<Extract<MaterialTfrApiResponse, {
    readonly kind: "valid";
}>["graph"]>;

const graphMinimumTemperature = 20;
const graphMaximumTemperature = 300;

export const materialTfrGraphFactorAt = (graph: MaterialTfrGraphData, temperature: number): number => {
    const rightIndex = graph.temperatures.findIndex((candidate) => candidate >= temperature);
    const leftIndex = rightIndex === -1 ? graph.temperatures.length - 2 : Math.max(0, rightIndex - 1);
    const right = Math.min(graph.temperatures.length - 1, leftIndex + 1);
    const leftTemperature = graph.temperatures[leftIndex];
    const rightTemperature = graph.temperatures[right];
    if (leftTemperature === rightTemperature) return graph.factors[leftIndex];
    return graph.factors[leftIndex]
        + ((temperature - leftTemperature) * (graph.factors[right] - graph.factors[leftIndex]))
        / (rightTemperature - leftTemperature);
};

export const materialTfrGraphTemperatures = (graph: MaterialTfrGraphData): readonly number[] => [
    graphMinimumTemperature,
    ...graph.temperatures.filter((temperature) => temperature > graphMinimumTemperature
        && temperature < graphMaximumTemperature),
    graphMaximumTemperature,
].filter((temperature, index, all) => all.indexOf(temperature) === index);

export const materialTfrGraphVisibleMaximum = (graph: MaterialTfrGraphData): number => Math.max(
    ...materialTfrGraphTemperatures(graph).map((temperature) => materialTfrGraphFactorAt(graph, temperature)),
);

export const materialTfrGraphYMaximum = (visibleMaximum: number): number => {
    const rounded = Math.ceil(visibleMaximum * 2) / 2;
    return Math.max(1.5, rounded <= visibleMaximum ? rounded + 0.5 : rounded);
};

export const MaterialTfrGraph = ({ materialName, data, caption, scale }: Props): ReactElement => {
    const graph = data.graph;
    if (!graph || !data.points) return <></>;
    const bounds = {
        ...(scale ?? graph),
        minimumTemperature: graphMinimumTemperature,
        maximumTemperature: graphMaximumTemperature,
        minimumFactor: scale?.minimumFactor ?? 1,
        maximumFactor: scale?.maximumFactor ?? materialTfrGraphYMaximum(materialTfrGraphVisibleMaximum(graph)),
    };
    const width = 760;
    const height = 250;
    const padding = { left: 64, right: 18, top: 20, bottom: 48 };
    const x = (temperature: number): number => padding.left
        + ((temperature - bounds.minimumTemperature) / (bounds.maximumTemperature - bounds.minimumTemperature))
        * (width - padding.left - padding.right);
    const y = (factor: number): number => height - padding.bottom
        - ((factor - bounds.minimumFactor) / (bounds.maximumFactor - bounds.minimumFactor))
        * (height - padding.top - padding.bottom);
    const plottedTemperatures = materialTfrGraphTemperatures(graph);
    const path = svgLinePath(plottedTemperatures.map((temperature) => ({
        x: x(temperature), y: y(materialTfrGraphFactorAt(graph, temperature)),
    })));
    const grid = Array.from({ length: 6 }, (_, index) => bounds.minimumFactor
        + ((bounds.maximumFactor - bounds.minimumFactor) / 5) * index);
    const sourceRangeVisible = graph.sourceMinimumTemperature > bounds.minimumTemperature
        || graph.sourceMaximumTemperature < bounds.maximumTemperature;

    return <figure className="material-tfr-graph">
        <SvgGraph width={width} height={height} className="material-tfr-graph__svg"
            ariaLabel={`${materialName} temperature resistance graph`}>
            {grid.map((factor) => <g key={factor}>
                <SvgGridLine className="material-tfr-graph__grid" x1={padding.left} x2={width - padding.right}
                    y1={y(factor)} y2={y(factor)} />
                <SvgGraphLabel className="material-tfr-graph__label" x={padding.left - 8} y={y(factor) + 4}
                    textAnchor="end">{factor.toFixed(2)}</SvgGraphLabel>
            </g>)}
            <SvgAxisLine className="material-tfr-graph__axis" x1={padding.left} x2={width - padding.right}
                y1={height - padding.bottom} y2={height - padding.bottom} />
            <SvgExtrapolationBoundaries className="material-tfr-graph__boundary"
                domain={[bounds.minimumTemperature, bounds.maximumTemperature]}
                sourceRange={[graph.sourceMinimumTemperature, graph.sourceMaximumTemperature]} x={x}
                y1={padding.top} y2={height - padding.bottom} />
            {[bounds.minimumTemperature, graph.sourceMinimumTemperature,
                graph.sourceMaximumTemperature, bounds.maximumTemperature]
                .filter((temperature) => temperature >= graphMinimumTemperature
                    && temperature <= graphMaximumTemperature)
                .filter((temperature, index, all) => all.indexOf(temperature) === index)
                .map((temperature) => <SvgGraphLabel className="material-tfr-graph__label"
                    key={temperature} x={x(temperature)} y={height - padding.bottom + 20} textAnchor="middle">
                    {temperature}
                </SvgGraphLabel>)}
            <SvgCurve className="material-tfr-graph__curve" d={path} />
            <SvgGraphLabel axis className="material-tfr-graph__axis-label" x={width / 2} y={height - 5}
                textAnchor="middle">Temperature (°C)</SvgGraphLabel>
        </SvgGraph>
        <figcaption>{caption ?? <>
            Relative resistance, normalized to R/R20. {sourceRangeVisible
                ? "Dashed boundaries mark the measured or supplied TFR range; the outer sections are "
                    + "linear extrapolations."
                : "The plotted range is within the supplied TFR data."}
        </>}</figcaption>
    </figure>;
};
