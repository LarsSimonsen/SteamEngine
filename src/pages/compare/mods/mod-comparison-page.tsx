import { useEffect, useMemo, useState, type ReactElement, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faCircleInfo, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import type { ModEntityRecord } from "../../../catalogs/entity-records";
import type { DefaultMod } from "../../../catalogs/mods/catalog";
import { modCatalogEntities } from "../../../catalogs/mods/entities";
import { builtInPresets } from "../../../catalogs/mods/presets";
import { catalogPresentationFor } from "../../../i18n/catalog-presentations";
import { calculatorMessagesFor } from "../../../i18n/calculator-messages";
import { comparisonMessagesFor } from "../../../i18n/comparison-messages";
import { messagesFor } from "../../../i18n/messages";
import { routeMetadataFor } from "../../../i18n/locales";
import { localizedRootHref, localizedRouteHref, pageLocale } from "../../../i18n/page-locale";
import "../../../shared/styles/foundation.css";
import { SiteLayout } from "../../../shared/ui/site-layout";
import { Breadcrumbs } from "../../../shared/ui/breadcrumbs";
import { withoutTrailingSlash } from "../../../shared/ui/site-navigation";
import { PowerCurveUnavailable, type PowerCurveScale } from "../../../shared/ui/power-curve-graph";
import { loadEntityRecord } from "../../encyclopedia/entity-record-loader";
import { calculateModRangeFromApi, type ModRangeApiResponse, type ModRangeGraphResponse } from "../../modrange/api";
import { limitsFromPreset } from "../../modrange/domain";
import { ModRangeGraph } from "../../modrange/mod-range-graph";
import "../batteries/battery-comparison.css";
import { ComparisonPicker } from "../comparison-picker";
import { ComparisonSection, type ComparisonRow } from "../comparison-section";

type Side = "a" | "b";

type ModOption = Readonly<{
    details: string;
    mod: DefaultMod;
    label: string;
    slug: string;
}>;

type ModCurveResponses = Readonly<Record<Side, ModRangeApiResponse | undefined>>;

export const modSlugsFromSearch = (search: string): Readonly<Record<Side, string | undefined>> => {
    const parameters = new URLSearchParams(search);
    return {
        a: parameters.get("a")?.trim() || undefined,
        b: parameters.get("b")?.trim() || undefined,
    };
};

export const modComparisonSearch = (first?: string, second?: string): string => {
    const parameters = new URLSearchParams();
    if (first) parameters.set("a", first);
    if (second) parameters.set("b", second);
    const query = parameters.toString();
    return query ? `?${query}` : "";
};

const sameValue = (first: unknown, second: unknown): boolean =>
    JSON.stringify(first ?? null) === JSON.stringify(second ?? null);

export const platformNoticeState = (
    firstCategory: string | undefined,
    secondCategory: string | undefined,
    firstBatteryConfiguration: string | undefined,
    secondBatteryConfiguration: string | undefined,
): Readonly<{ differs: boolean; unknown: boolean }> => {
    const values = [firstCategory, secondCategory, firstBatteryConfiguration, secondBatteryConfiguration];
    const unknown = values.some((value) => value === undefined);
    return {
        differs: !unknown && (firstCategory !== secondCategory
            || firstBatteryConfiguration !== secondBatteryConfiguration),
        unknown,
    };
};

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

const formatNumber = (locale: string, value: number): string =>
    new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);

const titleCase = (value: string): string => value.replaceAll("-", " ")
    .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

const introductionText = (mod: DefaultMod, locale: ReturnType<typeof pageLocale>): string => {
    const messages = messagesFor(locale).encyclopediaDetail;
    const introduction = mod.introduction;
    if (!introduction) return "—";
    const format = (value: string): string => {
        const dateValue = value.length === 4 ? `${value}-01-01` : value.length === 7 ? `${value}-01` : value;
        return new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: value.length > 4 ? "short" : undefined,
            day: value.length > 7 ? "numeric" : undefined,
            timeZone: "UTC",
        }).format(new Date(`${dateValue}T00:00:00Z`));
    };
    if (introduction.earliest && introduction.latest) {
        return messages.introducedBetween(format(introduction.earliest.date), format(introduction.latest.date));
    }
    if (introduction.earliest) return messages.introducedNoEarlier(format(introduction.earliest.date));
    return messages.availableBy(format(introduction.latest!.date));
};

const sharedPowerCurveScale = (graphs: readonly ModRangeGraphResponse[]): PowerCurveScale | undefined => {
    if (graphs.length === 0) return undefined;
    return {
        minimumResistance: Math.min(...graphs.map((graph) => graph.bounds.minimumResistance)),
        maximumResistance: Math.max(...graphs.map((graph) => graph.bounds.maximumResistance)),
        globalMaximumPower: Math.max(...graphs.map((graph) => graph.bounds.globalMaximumPower)),
    };
};

export const modComparisonPowerCurveScale = (responses: ModCurveResponses): PowerCurveScale | undefined =>
    sharedPowerCurveScale((['a', 'b'] as const).flatMap((side) => {
        const response = responses[side];
        return response?.graph ? [response.graph] : [];
    }));

const ModComparisonPowerCurve = ({ response, scale, selected, loadingLabel, unavailableLabel }: Readonly<{
    response: ModRangeApiResponse | undefined;
    scale: PowerCurveScale | undefined;
    selected: boolean;
    loadingLabel: string;
    unavailableLabel: string;
}>): ReactElement | null => {
    if (!selected) return null;
    if (response === undefined) return <p className="encyclopedia-meta">{loadingLabel}</p>;
    if (response.graph !== null) return <ModRangeGraph graph={response.graph} variant="encyclopedia" scale={scale}
        showTitle={false} showDescription={false} />;
    return <PowerCurveUnavailable message={response.calculation.kind === "invalid"
        ? response.calculation.message : unavailableLabel} />;
};

const categoryFor = (record?: ModEntityRecord): string | undefined => {
    if (record?.domainData?.deviceCategory) return record.domainData.deviceCategory;
    if (record?.entityType === "finished-device" || record?.entityType === "control-board") {
        return record.entityType;
    }
    return undefined;
};

const batteryConfigurationFor = (record?: ModEntityRecord): string | undefined => {
    const direct = record?.domainData?.batterySystem?.configuration;
    if (direct) return direct;
    const configurations = record?.domainData?.batteryConfigurations;
    if (!configurations?.length) return undefined;
    return configurations.map((configuration) => [
        configuration.format,
        configuration.seriesCount && configuration.parallelCount
            ? `${configuration.seriesCount}S${configuration.parallelCount}P` : undefined,
        configuration.manufacturerClaimedCapacityMah
            ? `${configuration.manufacturerClaimedCapacityMah} mAh` : undefined,
    ].filter(Boolean).join(" · ")).join("; ");
};

const controllerFor = (mod: DefaultMod, record?: ModEntityRecord): string | undefined =>
    record?.domainData?.boardRelationships?.[0]?.targetIdentity
    ?? (mod.basedOnPresetId
        ? builtInPresets.find((candidate) => candidate.id === mod.basedOnPresetId)?.displayName
        : undefined);

export const ModComparisonPage = (): ReactElement => {
    const locale = pageLocale();
    const shared = messagesFor(locale);
    const messages = comparisonMessagesFor(locale).mods;
    const metadata = routeMetadataFor(locale, "/compare/mods")!;
    const [slugs, setSlugs] = useState(() => modSlugsFromSearch(window.location.search));
    const [records, setRecords] = useState<Readonly<Record<Side, ModEntityRecord | undefined>>>({
        a: undefined,
        b: undefined,
    });
    const [recordsLoaded, setRecordsLoaded] = useState(false);
    const [curveResponses, setCurveResponses] = useState<ModCurveResponses>({ a: undefined, b: undefined });
    const options = useMemo(() => modCatalogEntities.map(({ mod, slug }) => ({
        details: `${formatNumber(locale, mod.maximumOutputPowerWatts)} W · ${
            formatNumber(locale, mod.maximumOutputVoltageVolts)} V`,
        mod,
        slug,
        label: mod.displayName,
    })).sort((first, second) => first.label.localeCompare(second.label, locale)), [locale]);
    const selected = {
        a: options.find((option) => option.slug === slugs.a),
        b: options.find((option) => option.slug === slugs.b),
    };

    useEffect(() => {
        const onPopState = (): void => setSlugs(modSlugsFromSearch(window.location.search));
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);
    useEffect(() => {
        let active = true;
        setRecordsLoaded(false);
        void Promise.all((["a", "b"] as const).map(async (side) => {
            const id = selected[side]?.mod.id;
            const record = id ? await loadEntityRecord("mods", id) : undefined;
            return [side, record as ModEntityRecord | undefined] as const;
        })).then((entries) => {
            if (!active) return;
            setRecords(Object.fromEntries(entries) as Record<Side, ModEntityRecord | undefined>);
            setRecordsLoaded(true);
        });
        return () => { active = false; };
    }, [slugs.a, slugs.b]);
    useEffect(() => {
        let active = true;
        setCurveResponses({ a: undefined, b: undefined });
        void Promise.all((['a', 'b'] as const).map(async (side) => {
            const mod = selected[side]?.mod;
            const response = mod ? await calculateModRangeFromApi(limitsFromPreset(mod)) : undefined;
            return [side, response] as const;
        })).then((entries) => {
            if (!active) return;
            setCurveResponses(Object.fromEntries(entries) as ModCurveResponses);
        }).catch(() => {
            if (active) setCurveResponses({ a: undefined, b: undefined });
        });
        return () => { active = false; };
    }, [slugs.a, slugs.b]);

    const update = (side: Side, slug: string | undefined): void => {
        const next = { ...slugs, [side]: slug };
        setSlugs(next);
        window.history.replaceState(null, "", `${window.location.pathname}${modComparisonSearch(next.a, next.b)}`);
    };
    const swap = (): void => {
        const next = { a: slugs.b, b: slugs.a };
        setSlugs(next);
        window.history.replaceState(null, "", `${window.location.pathname}${modComparisonSearch(next.a, next.b)}`);
    };
    const value = (side: Side, getter: (mod: DefaultMod, record?: ModEntityRecord) => ReactNode): ReactNode => {
        const mod = selected[side]?.mod;
        return mod ? getter(mod, records[side]) : null;
    };
    const raw = (side: Side, getter: (mod: DefaultMod, record?: ModEntityRecord) => unknown): unknown => {
        const mod = selected[side]?.mod;
        return mod ? getter(mod, records[side]) : undefined;
    };
    const unknown = "—";
    const baseProfile = (mod: DefaultMod): DefaultMod | undefined => mod.basedOnPresetId
        ? builtInPresets.find((candidate) => candidate.id === mod.basedOnPresetId)
        : undefined;
    const baseProfileValue = (mod: DefaultMod): ReactNode => {
        const base = baseProfile(mod);
        if (!base?.slug) return unknown;
        const href = withoutTrailingSlash(localizedRouteHref(locale, `catalog/mod/${base.slug}`));
        return <a href={href}>{catalogPresentationFor(locale, "mods", base.id).displayName}</a>;
    };
    const detailHref = (side: Side): string | undefined => {
        const option = selected[side];
        return option ? withoutTrailingSlash(localizedRouteHref(locale, `catalog/mod/${option.slug}`)) : undefined;
    };
    const sections: readonly { title: string; rows: readonly ComparisonRow[] }[] = [
        {
            title: comparisonMessagesFor(locale).batteries.compareIdentity,
            rows: [
                textRow(shared.catalogEditor.manufacturer,
                    value("a", (mod) => mod.manufacturer ?? unknown),
                    value("b", (mod) => mod.manufacturer ?? unknown),
                    raw("a", (mod) => mod.manufacturer), raw("b", (mod) => mod.manufacturer)),
                textRow(shared.catalogEditor.model, value("a", (mod) => mod.model), value("b", (mod) => mod.model),
                    raw("a", (mod) => mod.model), raw("b", (mod) => mod.model)),
                textRow(shared.catalogEditor.variant, value("a", (mod) => mod.variant ?? unknown),
                    value("b", (mod) => mod.variant ?? unknown), raw("a", (mod) => mod.variant),
                    raw("b", (mod) => mod.variant)),
                textRow(shared.encyclopediaDetail.aliases, value("a", (mod) => mod.aliases?.join(", ") || unknown),
                    value("b", (mod) => mod.aliases?.join(", ") || unknown), raw("a", (mod) => mod.aliases),
                    raw("b", (mod) => mod.aliases)),
            ],
        },
        {
            title: messages.platform,
            rows: [
                textRow(messages.category, value("a", (_mod, record) => categoryFor(record)
                    ? titleCase(categoryFor(record)!) : unknown), value("b", (_mod, record) => categoryFor(record)
                    ? titleCase(categoryFor(record)!) : unknown), raw("a", (_mod, record) => categoryFor(record)),
                raw("b", (_mod, record) => categoryFor(record))),
                textRow(shared.encyclopediaDetail.propertyLabels.boardController,
                    value("a", (mod, record) => controllerFor(mod, record) ?? unknown),
                    value("b", (mod, record) => controllerFor(mod, record) ?? unknown),
                    raw("a", controllerFor), raw("b", controllerFor)),
                textRow(messages.batteryConfiguration,
                    value("a", (_mod, record) => batteryConfigurationFor(record) ?? unknown),
                    value("b", (_mod, record) => batteryConfigurationFor(record) ?? unknown),
                    raw("a", (_mod, record) => batteryConfigurationFor(record)),
                    raw("b", (_mod, record) => batteryConfigurationFor(record))),
                textRow(messages.baseProfile, value("a", baseProfileValue), value("b", baseProfileValue),
                    raw("a", (mod) => mod.basedOnPresetId), raw("b", (mod) => mod.basedOnPresetId)),
                textRow(shared.catalogEditor.weightGrams,
                    value("a", (mod, record) => {
                        const weight = mod.weightGrams ?? record?.domainData?.weightGrams ?? undefined;
                        return weight === undefined ? unknown : `${formatNumber(locale, weight)} g`;
                    }),
                    value("b", (mod, record) => {
                        const weight = mod.weightGrams ?? record?.domainData?.weightGrams ?? undefined;
                        return weight === undefined ? unknown : `${formatNumber(locale, weight)} g`;
                    }),
                    raw("a", (mod, record) => mod.weightGrams ?? record?.domainData?.weightGrams),
                    raw("b", (mod, record) => mod.weightGrams ?? record?.domainData?.weightGrams)),
            ],
        },
        {
            title: messages.powerLimits,
            rows: [
                textRow(shared.encyclopediaDetail.propertyLabels.maximumPower,
                    value("a", (mod) => `${formatNumber(locale, mod.maximumOutputPowerWatts)} W`),
                    value("b", (mod) => `${formatNumber(locale, mod.maximumOutputPowerWatts)} W`),
                    raw("a", (mod) => mod.maximumOutputPowerWatts), raw("b", (mod) => mod.maximumOutputPowerWatts)),
                textRow(shared.encyclopediaDetail.propertyLabels.maximumVoltage,
                    value("a", (mod) => `${formatNumber(locale, mod.maximumOutputVoltageVolts)} V`),
                    value("b", (mod) => `${formatNumber(locale, mod.maximumOutputVoltageVolts)} V`),
                    raw("a", (mod) => mod.maximumOutputVoltageVolts), raw("b", (mod) => mod.maximumOutputVoltageVolts)),
                textRow(shared.encyclopediaDetail.propertyLabels.maximumCurrent,
                    value("a", (mod) => `${formatNumber(locale, mod.maximumOutputCurrentAmps)} A`),
                    value("b", (mod) => `${formatNumber(locale, mod.maximumOutputCurrentAmps)} A`),
                    raw("a", (mod) => mod.maximumOutputCurrentAmps), raw("b", (mod) => mod.maximumOutputCurrentAmps)),
            ],
        },
        {
            title: messages.atomizerRange,
            rows: [
                textRow(shared.catalogEditor.minAtomizerResistance,
                    value("a", (mod) => mod.minimumAtomizerResistanceOhms === undefined ? unknown
                        : `${formatNumber(locale, mod.minimumAtomizerResistanceOhms)} Ω`),
                    value("b", (mod) => mod.minimumAtomizerResistanceOhms === undefined ? unknown
                        : `${formatNumber(locale, mod.minimumAtomizerResistanceOhms)} Ω`),
                    raw("a", (mod) => mod.minimumAtomizerResistanceOhms),
                    raw("b", (mod) => mod.minimumAtomizerResistanceOhms)),
                textRow(shared.catalogEditor.maxAtomizerResistance,
                    value("a", (mod) => mod.maximumAtomizerResistanceOhms === undefined ? unknown
                        : `${formatNumber(locale, mod.maximumAtomizerResistanceOhms)} Ω`),
                    value("b", (mod) => mod.maximumAtomizerResistanceOhms === undefined ? unknown
                        : `${formatNumber(locale, mod.maximumAtomizerResistanceOhms)} Ω`),
                    raw("a", (mod) => mod.maximumAtomizerResistanceOhms),
                    raw("b", (mod) => mod.maximumAtomizerResistanceOhms)),
            ],
        },
        {
            title: comparisonMessagesFor(locale).batteries.compareContext,
            rows: [
                textRow(shared.encyclopediaDetail.marketIntroduction,
                    value("a", (mod) => introductionText(mod, locale)),
                    value("b", (mod) => introductionText(mod, locale)), raw("a", (mod) => mod.introduction),
                    raw("b", (mod) => mod.introduction)),
                textRow(shared.encyclopediaDetail.identityStability,
                    value("a", (_mod, record) => record?.identity.identityStability
                        ? titleCase(record.identity.identityStability) : unknown),
                    value("b", (_mod, record) => record?.identity.identityStability
                        ? titleCase(record.identity.identityStability) : unknown),
                    raw("a", (_mod, record) => record?.identity.identityStability),
                    raw("b", (_mod, record) => record?.identity.identityStability)),
                textRow(shared.encyclopediaDetail.catalogNote, value("a", (mod) => mod.description ?? unknown),
                    value("b", (mod) => mod.description ?? unknown), raw("a", (mod) => mod.description),
                    raw("b", (mod) => mod.description)),
            ],
        },
        {
            title: shared.encyclopediaDetail.safety,
            rows: [textRow(shared.encyclopediaDetail.safety,
                value("a", (_mod, record) => record?.safetyFindings?.map((finding) => finding.title).join("; ")
                    || messages.noSafetyFindings),
                value("b", (_mod, record) => record?.safetyFindings?.map((finding) => finding.title).join("; ")
                    || messages.noSafetyFindings),
                raw("a", (_mod, record) => record?.safetyFindings?.map((finding) => finding.title)),
                raw("b", (_mod, record) => record?.safetyFindings?.map((finding) => finding.title)))],
        },
    ];
    const bothSelected = Boolean(selected.a && selected.b);
    const platformNotice = bothSelected && recordsLoaded
        ? platformNoticeState(
            categoryFor(records.a), categoryFor(records.b),
            batteryConfigurationFor(records.a), batteryConfigurationFor(records.b),
        )
        : { differs: false, unknown: false };
    const invalidReference = (slugs.a !== undefined && !selected.a) || (slugs.b !== undefined && !selected.b);
    const powerCurveScale = modComparisonPowerCurveScale(curveResponses);
    const powerCurveLabel = calculatorMessagesFor(locale).modrange.powerCurve;
    const powerCurveDescription = calculatorMessagesFor(locale).modrange.powerCurveDescription;

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
                <p className="battery-comparison__eyebrow">{shared.encyclopediaDetail.modBoardCatalog}</p>
                <h1>{metadata.title}</h1><p>{metadata.description}</p>
            </header>
            <section className="battery-comparison__selectors" aria-label={metadata.title}>
                <ComparisonPicker label={messages.firstMod} options={options} selected={selected.a}
                    chooseLabel={messages.chooseMod} onSelect={(slug) => update("a", slug)} />
                <button type="button" className="battery-comparison__swap" onClick={swap}
                    aria-label={messages.swap} title={messages.swap}>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} aria-hidden="true" />
                </button>
                <ComparisonPicker label={messages.secondMod} options={options} selected={selected.b}
                    chooseLabel={messages.chooseMod} onSelect={(slug) => update("b", slug)} />
            </section>
            <div className="battery-comparison__notices" aria-live="polite">
                {invalidReference && <p className="notice notice--warning"><FontAwesomeIcon
                    icon={faTriangleExclamation} aria-hidden="true" />{messages.invalidSelection}</p>}
                {slugs.a && slugs.a === slugs.b && <p className="notice"><FontAwesomeIcon icon={faCircleInfo}
                    aria-hidden="true" />{messages.sameSelection}</p>}
                {platformNotice.differs && <p className="notice"><FontAwesomeIcon icon={faCircleInfo}
                    aria-hidden="true" />{messages.platformDiffers}</p>}
                {platformNotice.unknown && <p className="notice"><FontAwesomeIcon icon={faCircleInfo}
                    aria-hidden="true" />{messages.platformUnknown}</p>}
            </div>
            <div className="battery-comparison__column-headings">
                <span></span>
                <strong>{selected.a && detailHref("a")
                    ? <a href={detailHref("a")}>{selected.a.label}</a> : messages.firstMod}</strong>
                <strong>{selected.b && detailHref("b")
                    ? <a href={detailHref("b")}>{selected.b.label}</a> : messages.secondMod}</strong>
            </div>
            {sections.map((section) => <ComparisonSection key={section.title} {...section} unknownLabel={unknown}
                columns={[selected.a?.label ?? messages.firstMod, selected.b?.label ?? messages.secondMod]}
                extraRows={section.title === messages.powerLimits
                    && <tr className="battery-comparison__power-curve-row" role="row">
                    <th role="rowheader" scope="row">{powerCurveLabel}
                        <span className="battery-comparison__power-curve-description">{powerCurveDescription}</span>
                    </th>
                    <td role="cell"><ModComparisonPowerCurve response={curveResponses.a} scale={powerCurveScale}
                        selected={Boolean(selected.a)} loadingLabel={shared.encyclopediaDetail.loadingPowerCurve}
                        unavailableLabel={shared.encyclopediaDetail.noUsableResistanceRange} /></td>
                    <td role="cell"><ModComparisonPowerCurve response={curveResponses.b} scale={powerCurveScale}
                        selected={Boolean(selected.b)} loadingLabel={shared.encyclopediaDetail.loadingPowerCurve}
                        unavailableLabel={shared.encyclopediaDetail.noUsableResistanceRange} /></td>
                </tr>} />)}
        </main>
    </SiteLayout>;
};
