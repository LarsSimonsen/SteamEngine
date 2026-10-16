import { PowerCurveGraph, type PowerCurveScale } from "../../shared/ui/power-curve-graph";
import type { ModRangeGraphResponse } from "./api";
import type { ReactElement } from "react";
import { calculatorMessagesFor } from "../../i18n/calculator-messages";
import { pageLocale } from "../../i18n/page-locale";

type ModRangeGraphProps = Readonly<{
    readonly graph: ModRangeGraphResponse | null;
    readonly variant?: "mod-range" | "encyclopedia";
    readonly scale?: PowerCurveScale;
    readonly showTitle?: boolean;
    readonly showDescription?: boolean;
}>;

const formatGraphPower = (value: number): string => value.toFixed(2).replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");

export const ModRangeGraph = ({
    graph,
    variant = "mod-range",
    scale,
    showTitle,
    showDescription,
}: ModRangeGraphProps): ReactElement | null => {
    if (graph === null) return null;
    const messages = calculatorMessagesFor(pageLocale()).modrange;
    const maximumPowerAtResistance = (resistance: number): number => {
        const points = graph.curves.combined;
        if (points.length === 0) return 0;
        const nextIndex = points.findIndex((point) => point.resistance >= resistance);
        if (nextIndex <= 0) return points[0].power;
        if (nextIndex === -1) return points[points.length - 1].power;
        const previous = points[nextIndex - 1];
        const next = points[nextIndex];
        const fraction = (resistance - previous.resistance) / (next.resistance - previous.resistance);
        return previous.power + (next.power - previous.power) * fraction;
    };
    return <>
        {graph.adjusted && <p className={variant === "encyclopedia"
            ? "encyclopedia-meta power-curve-graph__adjustment-note"
            : "mod-range-graph-adjustment-note"}>
            {messages.adjustedGraph} {formatGraphPower(graph.limits.maxPower)} W.
        </p>}
        <PowerCurveGraph
            limits={graph.limits}
            values={graph.calculation}
            bounds={graph.bounds}
            createCurve={(curve) => graph.curves[curve]}
            maximumPowerAtResistance={maximumPowerAtResistance}
            variant={variant}
            scale={scale}
            showTitle={showTitle}
            showDescription={showDescription}
        />
    </>;
};
