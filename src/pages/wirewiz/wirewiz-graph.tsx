import type { ReactElement } from "react";
import {
    SvgAxisLine,
    SvgCurve,
    SvgExtrapolationBoundaries,
    SvgGraph,
    SvgGraphLabel,
    SvgGridLine,
    svgLinePath,
} from "../../shared/ui/svg-graph";
import type { CalculatedWire, TemperatureScale } from "./domain";
import { calculatorMessagesFor } from "../../i18n/calculator-messages";
import { pageLocale } from "../../i18n/page-locale";

type Props = {
    readonly temperatures: readonly number[];
    readonly root: CalculatedWire;
    readonly components: readonly CalculatedWire[];
    readonly scale: TemperatureScale;
    readonly showAll: boolean;
};

const displayTemperature = (value: number, scale: TemperatureScale): number =>
    scale === "fahrenheit" ? (value * 9) / 5 + 32 : value;

export const WireWizardGraph = ({
    temperatures,
    root,
    components,
    scale,
    showAll,
}: Props): ReactElement => {
    const messages = calculatorMessagesFor(pageLocale()).wirewiz;
    const width = 760;
    const height = 200;
    const padding = { left: 58, right: 18, top: 18, bottom: 42 };
    const minTemperature = Math.min(...temperatures, 0);
    const maxTemperature = Math.max(...temperatures, 300);
    const x = (value: number) =>
        padding.left +
        ((displayTemperature(value, scale) -
            displayTemperature(minTemperature, scale)) /
            (displayTemperature(maxTemperature, scale) -
                displayTemperature(minTemperature, scale))) *
            (width - padding.left - padding.right);
    const y = (value: number) =>
        height -
        padding.bottom -
        ((value - 0.5) / 2.5) * (height - padding.top - padding.bottom);
    const pathFor = (values: readonly number[]): string =>
        svgLinePath(values.map((value, index) => ({
            x: x(temperatures[index]),
            y: y(value),
        })));
    const visible = showAll ? components : [root];
    const grid = [0.5, 1, 1.5, 2, 2.5, 3];
    return (
        <figure className="wirewiz-graph">
            <SvgGraph
                className="wirewiz-graph__svg"
                width={width}
                height={height}
                ariaLabel={`${messages.temperature} ${messages.resistanceFactor} graph`}
            >
                {grid.map((value) => (
                    <g key={value}>
                        <SvgGridLine
                            className="wirewiz-graph__grid"
                            x1={padding.left}
                            x2={width - padding.right}
                            y1={y(value)}
                            y2={y(value)}
                        />
                        <SvgGraphLabel
                            className="wirewiz-graph__label"
                            x={padding.left - 8}
                            y={y(value) + 4}
                            textAnchor="end"
                        >
                            {value.toFixed(1)}
                        </SvgGraphLabel>
                    </g>
                ))}
                <SvgAxisLine
                    className="wirewiz-graph__axis"
                    x1={padding.left}
                    x2={width - padding.right}
                    y1={height - padding.bottom}
                    y2={height - padding.bottom}
                />
                <SvgExtrapolationBoundaries
                    className="wirewiz-graph__boundary"
                    domain={[minTemperature, maxTemperature]}
                    sourceRange={root.temperatureDataRangeCelsius}
                    x={x}
                    y1={padding.top}
                    y2={height - padding.bottom}
                />
                {temperatures.map((temperature) => (
                    <SvgGraphLabel
                        className="wirewiz-graph__label"
                        key={temperature}
                        x={x(temperature)}
                        y={height - padding.bottom + 20}
                        textAnchor="middle"
                    >
                        {displayTemperature(temperature, scale)}
                    </SvgGraphLabel>
                ))}
                {visible.map((component, index) => (
                    <SvgCurve
                        key={component.id}
                        className={`wirewiz-graph__curve${index === 0 ? " wirewiz-graph__curve--root" : ""}`}
                        d={pathFor(component.normalizedFactors)}
                    />
                ))}
                <SvgGraphLabel
                    axis
                    className="wirewiz-graph__axis-label"
                    x={width / 2}
                    y={height - 4}
                    textAnchor="middle"
                >
                    {messages.temperature} ({scale === "fahrenheit" ? messages.fahrenheit : messages.celsius})
                </SvgGraphLabel>
            </SvgGraph>
            <figcaption>
                {showAll ? messages.graphAll : messages.graphFinal}
            </figcaption>
        </figure>
    );
};
