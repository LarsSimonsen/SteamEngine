import { useEffect, useMemo, useState, type ReactElement, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faCircleInfo, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { materialEncyclopediaRecordFor, type MaterialProperty } from "../../../catalogs/materials/encyclopedia";
import { materials, type DefaultMaterial } from "../../../catalogs/materials/catalog";
import { hasTemperatureData } from "../../../catalogs/materials/temperature";
import { catalogPresentationFor } from "../../../i18n/catalog-presentations";
import { comparisonMessagesFor } from "../../../i18n/comparison-messages";
import { messagesFor } from "../../../i18n/messages";
import { routeMetadataFor } from "../../../i18n/locales";
import { localizedRootHref, localizedRouteHref, pageLocale } from "../../../i18n/page-locale";
import "../../../shared/styles/foundation.css";
import { Breadcrumbs } from "../../../shared/ui/breadcrumbs";
import { SiteLayout } from "../../../shared/ui/site-layout";
import { withoutTrailingSlash } from "../../../shared/ui/site-navigation";
import {
    MaterialTfrGraph,
    materialTfrGraphVisibleMaximum,
    materialTfrGraphYMaximum,
    type MaterialTfrGraphScale,
} from "../../encyclopedia/material-tfr-graph";
import {
    calculateMaterialTfrFromApi,
    materialTfrPointsFor,
    type MaterialTfrApiResponse,
} from "../../encyclopedia/material-tfr-api";
import "../batteries/battery-comparison.css";
import { ComparisonPicker } from "../comparison-picker";
import { ComparisonSection, type ComparisonRow } from "../comparison-section";

type Side = "a" | "b";

type MaterialOption = Readonly<{
    details: string;
    material: DefaultMaterial;
    label: string;
    slug: string;
}>;

type MaterialCurveResponses = Readonly<Record<Side, MaterialTfrApiResponse | undefined>>;

export const materialSlugsFromSearch = (search: string): Readonly<Record<Side, string | undefined>> => {
    const parameters = new URLSearchParams(search);
    return {
        a: parameters.get("a")?.trim() || undefined,
        b: parameters.get("b")?.trim() || undefined,
    };
};

export const materialComparisonSearch = (first?: string, second?: string): string => {
    const parameters = new URLSearchParams();
    if (first) parameters.set("a", first);
    if (second) parameters.set("b", second);
    const query = parameters.toString();
    return query ? `?${query}` : "";
};

export const temperatureCapabilityDiffers = (
    first: Pick<DefaultMaterial, "tcr" | "tfr"> | undefined,
    second: Pick<DefaultMaterial, "tcr" | "tfr"> | undefined,
): boolean => Boolean(first && second)
    && (first?.tcr !== undefined || first?.tfr !== undefined)
    !== (second?.tcr !== undefined || second?.tfr !== undefined);

const sameValue = (first: unknown, second: unknown): boolean =>
    JSON.stringify(first ?? null) === JSON.stringify(second ?? null);

const textRow = (
    label: string,
    first: ReactNode,
    second: ReactNode,
    firstValue: unknown,
    secondValue: unknown,
): ComparisonRow => ({
    label,
    first,
    second,
    different: !sameValue(firstValue, secondValue),
});

const formatNumber = (locale: string, value: number, maximumFractionDigits = 2): string =>
    new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value);

const propertyValue = (property: MaterialProperty | undefined): string | undefined =>
    property?.unit ? `${property.value} ${property.unit}` : undefined;

const thermalConductivityFor = (material: DefaultMaterial): MaterialProperty | undefined =>
    materialEncyclopediaRecordFor(material).practicalProperties
        ?.find((property) => property.label.startsWith("Thermal conductivity"));

const meltingPointFor = (material: DefaultMaterial): string | undefined => {
    if (material.meltingPoint !== null) return `${material.meltingPoint} °C`;
    const property = materialEncyclopediaRecordFor(material).secondaryProperties
        .find((candidate) => /^Melting (point|range)$/.test(candidate.label));
    return propertyValue(property);
};

const MaterialCurve = ({ material, response, loadingLabel, noCurveLabel, derivedCaption, scale }: Readonly<{
    material: DefaultMaterial;
    response: MaterialTfrApiResponse | undefined;
    loadingLabel: string;
    noCurveLabel: string;
    derivedCaption: string;
    scale: MaterialTfrGraphScale | undefined;
}>): ReactElement => {
    if (!material.tfr && material.tcr === undefined) {
        return <span className="comparison-value--unknown">{noCurveLabel}</span>;
    }
    if (!response) return <span>{loadingLabel}</span>;
    if (response.kind !== "valid" || !response.graph || !response.points) {
        return <span className="comparison-value--unknown">{noCurveLabel}</span>;
    }
    return <MaterialTfrGraph materialName={material.name} data={response}
        caption={material.tfr ? undefined : derivedCaption} scale={scale} />;
};

export const MaterialComparisonPage = (): ReactElement => {
    const locale = pageLocale();
    const shared = messagesFor(locale);
    const messages = comparisonMessagesFor(locale).materials;
    const metadata = routeMetadataFor(locale, "/compare/materials")!;
    const [slugs, setSlugs] = useState(() => materialSlugsFromSearch(window.location.search));
    const options = useMemo(() => Array.from(new Map([...materials].reverse().flatMap((material) => material.slug ? [[
        material.slug,
        {
            details: `${formatNumber(locale, material.resistivity, 4)} Ω·mm²/m · ${
                hasTemperatureData(material) ? messages.profileAvailable : messages.profileUnavailable}`,
            material,
            slug: material.slug,
            label: catalogPresentationFor(locale, "materials", material.id).displayName,
        } satisfies MaterialOption,
    ] as const] : [])).values()).sort((first, second) => first.label.localeCompare(second.label, locale)), [locale]);
    const selected = {
        a: options.find((option) => option.slug === slugs.a),
        b: options.find((option) => option.slug === slugs.b),
    };
    const curvePoints = useMemo(() => ({
        a: selected.a ? materialTfrPointsFor(selected.a.material) : undefined,
        b: selected.b ? materialTfrPointsFor(selected.b.material) : undefined,
    }), [selected.a?.material, selected.b?.material]);
    const [curveResponses, setCurveResponses] = useState<MaterialCurveResponses>({ a: undefined, b: undefined });

    useEffect(() => {
        let active = true;
        setCurveResponses({ a: undefined, b: undefined });
        void Promise.all((['a', 'b'] as const).map(async (side) => {
            const points = curvePoints[side];
            if (!points) return [side, undefined] as const;
            try {
                return [side, await calculateMaterialTfrFromApi(points)] as const;
            } catch {
                return [side, { kind: "invalid", message: "" } satisfies MaterialTfrApiResponse] as const;
            }
        })).then((entries) => {
            if (active) setCurveResponses(Object.fromEntries(entries) as MaterialCurveResponses);
        });
        return () => { active = false; };
    }, [curvePoints]);

    const curveScale = useMemo<MaterialTfrGraphScale | undefined>(() => {
        const graphs = (['a', 'b'] as const).flatMap((side) => {
            const response = curveResponses[side];
            return response?.kind === "valid" && response.graph ? [response.graph] : [];
        });
        if (graphs.length === 0) return undefined;
        return {
            minimumTemperature: 20,
            maximumTemperature: 300,
            minimumFactor: 1,
            maximumFactor: materialTfrGraphYMaximum(Math.max(
                ...graphs.map((graph) => materialTfrGraphVisibleMaximum(graph)),
            )),
        };
    }, [curveResponses]);

    useEffect(() => {
        const onPopState = (): void => setSlugs(materialSlugsFromSearch(window.location.search));
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    const update = (side: Side, slug: string | undefined): void => {
        const next = { ...slugs, [side]: slug };
        setSlugs(next);
        window.history.replaceState(null, "", `${window.location.pathname}${materialComparisonSearch(next.a, next.b)}`);
    };
    const swap = (): void => {
        const next = { a: slugs.b, b: slugs.a };
        setSlugs(next);
        window.history.replaceState(null, "", `${window.location.pathname}${materialComparisonSearch(next.a, next.b)}`);
    };
    const value = (side: Side, getter: (material: DefaultMaterial) => ReactNode): ReactNode => {
        const material = selected[side]?.material;
        return material ? getter(material) : null;
    };
    const raw = (side: Side, getter: (material: DefaultMaterial) => unknown): unknown => {
        const material = selected[side]?.material;
        return material ? getter(material) : undefined;
    };
    const unknown = shared.encyclopediaDetail.unknown;
    const missingAlias = "—";
    const temperatureModel = (material: DefaultMaterial): string => material.tfr
        ? shared.encyclopediaDetail.propertyLabels.fullResistanceCurve
        : material.tcr === undefined
            ? unknown
            : `${formatNumber(locale, material.tcr * 1_000_000)} ppm/K`;
    const temperatureProfile = (material: DefaultMaterial): string => hasTemperatureData(material)
        ? messages.profileAvailable : messages.profileUnavailable;
    const safetyText = (material: DefaultMaterial): string => {
        const record = materialEncyclopediaRecordFor(material);
        if (record.safetyNoteScope !== "vaping-specific" || !record.safetyNote) return messages.noSafetyNote;
        return catalogPresentationFor(locale, "materials", material.id).safetyText ?? record.safetyNote;
    };
    const detailHref = (side: Side): string | undefined => {
        const option = selected[side];
        return option
            ? withoutTrailingSlash(localizedRouteHref(locale, `catalog/material/${option.slug}`))
            : undefined;
    };
    const sections: readonly { title: string; rows: readonly ComparisonRow[] }[] = [
        {
            title: messages.identity,
            rows: [
                textRow(messages.name, value("a", (material) => catalogPresentationFor(
                    locale, "materials", material.id,
                ).displayName), value("b", (material) => catalogPresentationFor(
                    locale, "materials", material.id,
                ).displayName), raw("a", (material) => material.id), raw("b", (material) => material.id)),
                textRow(shared.encyclopediaDetail.aliases,
                    value("a", (material) => material.aliases?.join(", ") || missingAlias),
                    value("b", (material) => material.aliases?.join(", ") || missingAlias),
                    raw("a", (material) => material.aliases), raw("b", (material) => material.aliases)),
            ],
        },
        {
            title: messages.electricalProperties,
            rows: [textRow(shared.encyclopediaDetail.propertyLabels.resistivity,
                value("a", (material) => `${formatNumber(locale, material.resistivity, 11)} µΩ·m`),
                value("b", (material) => `${formatNumber(locale, material.resistivity, 11)} µΩ·m`),
                raw("a", (material) => material.resistivity), raw("b", (material) => material.resistivity))],
        },
        {
            title: messages.temperatureBehavior,
            rows: [
                textRow(messages.temperatureControlProfile, value("a", temperatureProfile),
                    value("b", temperatureProfile), raw("a", hasTemperatureData), raw("b", hasTemperatureData)),
                textRow(shared.encyclopediaDetail.propertyLabels.temperatureModel, value("a", temperatureModel),
                    value("b", temperatureModel), raw("a", (material) => material.tfr ?? material.tcr),
                    raw("b", (material) => material.tfr ?? material.tcr)),
                textRow(shared.encyclopediaDetail.propertyLabels.maximumRecommendedTemperature,
                    value("a", (material) => materialEncyclopediaRecordFor(material)
                        .maxRecommendedVapingTemperatureCelsius === undefined ? unknown
                        : `${formatNumber(locale, materialEncyclopediaRecordFor(material)
                            .maxRecommendedVapingTemperatureCelsius!)} °C`),
                    value("b", (material) => materialEncyclopediaRecordFor(material)
                        .maxRecommendedVapingTemperatureCelsius === undefined ? unknown
                        : `${formatNumber(locale, materialEncyclopediaRecordFor(material)
                            .maxRecommendedVapingTemperatureCelsius!)} °C`),
                    raw("a", (material) => materialEncyclopediaRecordFor(material)
                        .maxRecommendedVapingTemperatureCelsius),
                    raw("b", (material) => materialEncyclopediaRecordFor(material)
                        .maxRecommendedVapingTemperatureCelsius)),
                textRow(shared.encyclopediaDetail.temperatureResistanceCurve,
                    value("a", (material) => <MaterialCurve material={material}
                        response={curveResponses.a}
                        loadingLabel={shared.encyclopediaDetail.loadingTemperatureCurve}
                        noCurveLabel={material.tcr === undefined ? unknown
                            : shared.encyclopediaDetail.noDefinedCurve(String(material.tcr))}
                        derivedCaption={shared.encyclopediaDetail.normalizedCurve("TCR-derived")}
                        scale={curveScale} />),
                    value("b", (material) => <MaterialCurve material={material}
                        response={curveResponses.b}
                        loadingLabel={shared.encyclopediaDetail.loadingTemperatureCurve}
                        noCurveLabel={material.tcr === undefined ? unknown
                            : shared.encyclopediaDetail.noDefinedCurve(String(material.tcr))}
                        derivedCaption={shared.encyclopediaDetail.normalizedCurve("TCR-derived")}
                        scale={curveScale} />),
                    raw("a", (material) => material.tfr ?? material.tcr),
                    raw("b", (material) => material.tfr ?? material.tcr)),
            ],
        },
        {
            title: messages.physicalProperties,
            rows: [
                textRow(messages.thermalConductivity,
                    value("a", (material) => propertyValue(thermalConductivityFor(material)) ?? unknown),
                    value("b", (material) => propertyValue(thermalConductivityFor(material)) ?? unknown),
                    raw("a", thermalConductivityFor), raw("b", thermalConductivityFor)),
                textRow(shared.encyclopediaDetail.propertyLabels.specificHeatCapacity,
                    value("a", (material) => material.heatCapacity === null ? unknown
                        : `${formatNumber(locale, material.heatCapacity * 1000)} J/(kg·K)`),
                    value("b", (material) => material.heatCapacity === null ? unknown
                        : `${formatNumber(locale, material.heatCapacity * 1000)} J/(kg·K)`),
                    raw("a", (material) => material.heatCapacity), raw("b", (material) => material.heatCapacity)),
                textRow(shared.encyclopediaDetail.propertyLabels.density,
                    value("a", (material) => material.density === null ? unknown
                        : `${formatNumber(locale, material.density * 1000)} kg/m³`),
                    value("b", (material) => material.density === null ? unknown
                        : `${formatNumber(locale, material.density * 1000)} kg/m³`),
                    raw("a", (material) => material.density), raw("b", (material) => material.density)),
                textRow(shared.encyclopediaDetail.propertyLabels.meltingPoint,
                    value("a", (material) => meltingPointFor(material) ?? unknown),
                    value("b", (material) => meltingPointFor(material) ?? unknown),
                    raw("a", meltingPointFor), raw("b", meltingPointFor)),
            ],
        },
        {
            title: shared.encyclopediaDetail.safety,
            rows: [textRow(shared.encyclopediaDetail.safety, value("a", safetyText), value("b", safetyText),
                raw("a", safetyText), raw("b", safetyText))],
        },
    ];
    const invalidReference = (slugs.a !== undefined && !selected.a) || (slugs.b !== undefined && !selected.b);
    const capabilityDiffers = temperatureCapabilityDiffers(selected.a?.material, selected.b?.material);

    return <SiteLayout basePath="../../" className="battery-comparison-page" rootHref={localizedRootHref(locale)}>
        <main id="main" className="page-content battery-comparison">
            <Breadcrumbs label={shared.encyclopediaDetail.breadcrumb} items={[
                { label: "Steam Engine", href: localizedRootHref(locale) },
                {
                    label: shared.encyclopedia.title,
                    href: withoutTrailingSlash(localizedRouteHref(locale, "catalog")),
                },
                { label: metadata.title },
            ]} />
            <header className="battery-comparison__hero">
                <p className="battery-comparison__eyebrow">{shared.encyclopediaDetail.materialCatalog}</p>
                <h1>{metadata.title}</h1><p>{metadata.description}</p>
            </header>
            <section className="battery-comparison__selectors" aria-label={metadata.title}>
                <ComparisonPicker label={messages.firstMaterial} options={options} selected={selected.a}
                    chooseLabel={messages.chooseMaterial} onSelect={(slug) => update("a", slug)} />
                <button type="button" className="battery-comparison__swap" onClick={swap}
                    aria-label={messages.swap} title={messages.swap}>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} aria-hidden="true" />
                </button>
                <ComparisonPicker label={messages.secondMaterial} options={options} selected={selected.b}
                    chooseLabel={messages.chooseMaterial} onSelect={(slug) => update("b", slug)} />
            </section>
            <div className="battery-comparison__notices" aria-live="polite">
                {invalidReference && <p className="notice notice--warning"><FontAwesomeIcon
                    icon={faTriangleExclamation} aria-hidden="true" />{messages.invalidSelection}</p>}
                {slugs.a && slugs.a === slugs.b && <p className="notice"><FontAwesomeIcon icon={faCircleInfo}
                    aria-hidden="true" />{messages.sameSelection}</p>}
                {capabilityDiffers && <p className="notice"><FontAwesomeIcon icon={faCircleInfo}
                    aria-hidden="true" />{messages.capabilityDiffers}</p>}
            </div>
            <div className="battery-comparison__column-headings">
                <span></span>
                <strong>{selected.a && detailHref("a")
                    ? <a href={detailHref("a")}>{selected.a.label}</a> : messages.firstMaterial}</strong>
                <strong>{selected.b && detailHref("b")
                    ? <a href={detailHref("b")}>{selected.b.label}</a> : messages.secondMaterial}</strong>
            </div>
            {sections.map((section) => <ComparisonSection key={section.title} {...section}
                columns={[selected.a?.label ?? messages.firstMaterial, selected.b?.label ?? messages.secondMaterial]}
                unknownLabel={unknown} />)}
        </main>
    </SiteLayout>;
};
