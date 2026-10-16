import type { ReactElement, ReactNode, SVGProps } from "react";
import "../styles/svg-graph.css";

export type SvgPoint = {
    readonly x: number;
    readonly y: number;
};

export const svgLinePath = (points: readonly SvgPoint[]): string => points
    .map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

type SvgGraphProps = {
    readonly width: number;
    readonly height: number;
    readonly className?: string;
    readonly ariaLabel?: string;
    readonly ariaLabelledBy?: string;
    readonly ariaDescribedBy?: string;
    readonly children: ReactNode;
};

const classes = (base: string, className?: string): string =>
    `${base}${className === undefined ? "" : ` ${className}`}`;

export const SvgGraph = ({
    width,
    height,
    className,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    children,
}: SvgGraphProps): ReactElement => <svg className={classes("se-svg-graph", className)}
    viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ariaLabel}
    aria-labelledby={ariaLabelledBy} aria-describedby={ariaDescribedBy}>
    {children}
</svg>;

export const SvgGridLine = ({ className, ...props }: SVGProps<SVGLineElement>): ReactElement =>
    <line className={classes("se-svg-graph__grid", className)} {...props} />;

export const SvgAxisLine = ({ className, ...props }: SVGProps<SVGLineElement>): ReactElement =>
    <line className={classes("se-svg-graph__axis", className)} {...props} />;

export const SvgExtrapolationBoundaries = ({
    className,
    domain,
    sourceRange,
    x,
    y1,
    y2,
}: {
    readonly className?: string;
    readonly domain: readonly [number, number];
    readonly sourceRange: readonly [number, number] | undefined;
    readonly x: (value: number) => number;
    readonly y1: number;
    readonly y2: number;
}): ReactElement | null => {
    if (!sourceRange) return null;
    const [domainMin, domainMax] = domain;
    const [sourceMin, sourceMax] = sourceRange;
    return <>
        {sourceMin > domainMin && <line className={classes("se-svg-graph__boundary", className)}
            x1={x(sourceMin)} x2={x(sourceMin)} y1={y1} y2={y2} />}
        {sourceMax < domainMax && <line className={classes("se-svg-graph__boundary", className)}
            x1={x(sourceMax)} x2={x(sourceMax)} y1={y1} y2={y2} />}
    </>;
};

export const SvgGraphLabel = ({
    className,
    axis = false,
    ...props
}: SVGProps<SVGTextElement> & { readonly axis?: boolean }): ReactElement => <text
    className={classes(axis ? "se-svg-graph__label se-svg-graph__axis-label" : "se-svg-graph__label", className)}
    {...props} />;

export const SvgCurve = ({ className, ...props }: SVGProps<SVGPathElement>): ReactElement =>
    <path className={classes("se-svg-graph__curve", className)} {...props} />;
