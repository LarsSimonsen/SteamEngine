import { useEffect, useMemo, useRef, useState, type ReactElement, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft, faCircleInfo, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import type { DefaultBattery } from "../../../catalogs/batteries/catalog";
import { batteryPresets } from "../../../catalogs/batteries/defaults";
import type { BatteryEntityRecord } from "../../../catalogs/entity-records";
import { catalogPresentationFor } from "../../../i18n/catalog-presentations";
import { comparisonMessagesFor } from "../../../i18n/comparison-messages";
import { messagesFor } from "../../../i18n/messages";
import { localizedRootHref, localizedRouteHref, pageLocale } from "../../../i18n/page-locale";
import "../../../shared/styles/foundation.css";
import { SiteLayout } from "../../../shared/ui/site-layout";
import { Breadcrumbs } from "../../../shared/ui/breadcrumbs";
import { withoutTrailingSlash } from "../../../shared/ui/site-navigation";
import { loadEntityRecord } from "../../encyclopedia/entity-record-loader";
import "./battery-comparison.css";

type Side = "a" | "b";

type BatteryOption = Readonly<{
    battery: DefaultBattery;
    details: string;
    heading: string;
    label: string;
    slug: string;
}>;

type ComparisonRow = Readonly<{
    label: string;
    first: ReactNode;
    second: ReactNode;
    different?: boolean;
}>;

export const batterySlugsFromSearch = (search: string): Readonly<Record<Side, string | undefined>> => {
    const parameters = new URLSearchParams(search);
    return {
        a: parameters.get("a")?.trim() || undefined,
        b: parameters.get("b")?.trim() || undefined,
    };
};

export const comparisonSearch = (first?: string, second?: string): string => {
    const parameters = new URLSearchParams();
    if (first) parameters.set("a", first);
    if (second) parameters.set("b", second);
    const query = parameters.toString();
    return query ? `?${query}` : "";
};

const sameValue = (first: unknown, second: unknown): boolean =>
    JSON.stringify(first ?? null) === JSON.stringify(second ?? null);

type ConstructionNoticeInput = Readonly<{
    compatibility: readonly unknown[];
    completeness: readonly unknown[];
}>;

export const constructionNoticeState = (
    first: ConstructionNoticeInput,
    second: ConstructionNoticeInput,
): Readonly<{ differs: boolean; unknown: boolean }> => {
    const unknown = [...first.completeness, ...second.completeness].some((item) => item === undefined);
    return {
        differs: !unknown && !sameValue(first.compatibility, second.compatibility),
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

const formatNumber = (locale: string, value: number, maximumFractionDigits = 2): string =>
    new Intl.NumberFormat(locale, { maximumFractionDigits }).format(value);

export const dischargeRatingText = (
    locale: string,
    battery: Pick<DefaultBattery, "ratedCapacityMah" | "continuousDischargeCurrentAmps"
        | "continuousDischargeCRating">,
    unknown: string,
): string => {
    const capacityAmpHours = battery.ratedCapacityMah / 1000;
    if (battery.continuousDischargeCurrentAmps !== undefined) {
        const cRating = battery.continuousDischargeCRating
            ?? battery.continuousDischargeCurrentAmps / capacityAmpHours;
        return `${formatNumber(locale, battery.continuousDischargeCurrentAmps)} A `
            + `(${formatNumber(locale, cRating)} C)`;
    }
    if (battery.continuousDischargeCRating !== undefined) {
        const currentAmps = battery.continuousDischargeCRating * capacityAmpHours;
        return `${formatNumber(locale, battery.continuousDischargeCRating)} C `
            + `(${formatNumber(locale, currentAmps)} A)`;
    }
    return unknown;
};

const BatteryPicker = ({
    label,
    options,
    selected,
    onSelect,
    chooseLabel,
}: Readonly<{
    label: string;
    options: readonly BatteryOption[];
    selected?: BatteryOption;
    onSelect: (slug: string | undefined) => void;
    chooseLabel: string;
}>): ReactElement => {
    const details = useRef<HTMLDetailsElement>(null);
    const [query, setQuery] = useState("");
    const matches = options.filter((option) => `${option.label} ${option.slug}`.toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()));
    const select = (slug: string | undefined): void => {
        onSelect(slug);
        setQuery("");
        if (details.current) details.current.open = false;
    };

    return <div className="battery-picker">
        <span className="battery-picker__label">
            <span className="battery-picker__label-full">{label}</span>
            <span className="battery-picker__label-compact" aria-hidden="true">
                {label === "Select battery A" ? "Battery A" : label === "Select battery B" ? "Battery B" : label}
            </span>
        </span>
        <details ref={details}>
            <summary>{selected?.label ?? chooseLabel}</summary>
            <div className="battery-picker__popover">
                <input type="search" value={query} aria-label={chooseLabel} placeholder={chooseLabel}
                    onChange={(event) => setQuery(event.target.value)} />
                {selected && <button type="button" className="battery-picker__clear"
                    onClick={() => select(undefined)}>{chooseLabel}</button>}
                <div className="battery-picker__options" role="listbox" aria-label={label}>
                    {matches.map((option) => <button type="button" role="option" key={option.battery.id}
                        aria-selected={option.slug === selected?.slug} onClick={() => select(option.slug)}>
                        <strong>{option.label}</strong>
                        <span>{option.details}</span>
                    </button>)}
                </div>
            </div>
        </details>
    </div>;
};

const ComparisonSection = ({ title, rows, unknownLabel }: Readonly<{
    title: string;
    rows: readonly ComparisonRow[];
    unknownLabel: string;
}>): ReactElement => <section className="battery-comparison__section">
    <h2>{title}</h2>
    <dl>
        {rows.map((row) => <div className={row.different ? "is-different" : ""} key={row.label}>
            <dt>{row.label}</dt>
            <dd className={row.first === unknownLabel ? "comparison-value--unknown" : undefined}>{row.first}</dd>
            <dd className={row.second === unknownLabel ? "comparison-value--unknown" : undefined}>{row.second}</dd>
        </div>)}
    </dl>
</section>;

const introductionText = (
    battery: DefaultBattery,
    locale: ReturnType<typeof pageLocale>,
): string => {
    const messages = messagesFor(locale).encyclopediaDetail;
    const introduction = battery.introduction;
    if (!introduction) return messages.unknown;
    const format = (value: string): string => {
        const dateValue = value.length === 4
            ? `${value}-01-01`
            : value.length === 7 ? `${value}-01` : value;
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

const batteryRecord = (value: unknown): BatteryEntityRecord | undefined =>
    value && typeof value === "object" && "domainData" in value ? value as BatteryEntityRecord : undefined;

const displayCatalogText = (value: string): string => value
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â", "—")
    .replaceAll("Ã¢â‚¬â€", "—")
    .replaceAll("â€”", "—");

export const BatteryComparisonPage = (): ReactElement => {
    const locale = pageLocale();
    const shared = messagesFor(locale);
    const messages = comparisonMessagesFor(locale).batteries;
    const [slugs, setSlugs] = useState(() => batterySlugsFromSearch(window.location.search));
    const [records, setRecords] = useState<Readonly<Record<Side, BatteryEntityRecord | undefined>>>({
        a: undefined,
        b: undefined,
    });
    const options = useMemo(() => batteryPresets.flatMap((battery) => {
        if (!battery.slug) return [];
        const heading = catalogPresentationFor(locale, "batteries", battery.id).displayName;
        return [{
            battery,
            details: [
                battery.formFactor?.kind === "cylindrical" ? battery.formFactor.sizeCode : undefined,
                dischargeRatingText(locale, battery, ""),
            ].filter(Boolean).join(" · "),
            heading,
            slug: battery.slug,
            label: `${heading} · ${formatNumber(locale, battery.ratedCapacityMah, 0)} mAh`,
        }];
    }).sort((first, second) => first.label.localeCompare(second.label, locale)), [locale]);
    const selected = {
        a: options.find((option) => option.slug === slugs.a),
        b: options.find((option) => option.slug === slugs.b),
    };

    useEffect(() => {
        const onPopState = (): void => setSlugs(batterySlugsFromSearch(window.location.search));
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);
    useEffect(() => {
        let active = true;
        void Promise.all((["a", "b"] as const).map(async (side) => {
            const id = selected[side]?.battery.id;
            return [side, id ? batteryRecord(await loadEntityRecord("batteries", id)) : undefined] as const;
        })).then((entries) => {
            if (active) setRecords(Object.fromEntries(entries) as Record<Side, BatteryEntityRecord | undefined>);
        });
        return () => { active = false; };
    }, [slugs.a, slugs.b]);

    const update = (side: Side, slug: string | undefined): void => {
        const next = { ...slugs, [side]: slug };
        setSlugs(next);
        window.history.replaceState(null, "", `${window.location.pathname}${comparisonSearch(next.a, next.b)}`);
    };
    const swap = (): void => {
        const next = { a: slugs.b, b: slugs.a };
        setSlugs(next);
        window.history.replaceState(null, "", `${window.location.pathname}${comparisonSearch(next.a, next.b)}`);
    };

    const batteries = [selected.a?.battery, selected.b?.battery] as const;
    const value = (
        side: Side,
        getter: (battery: DefaultBattery, record?: BatteryEntityRecord) => ReactNode,
    ): ReactNode => {
        const battery = selected[side]?.battery;
        return battery ? getter(battery, records[side]) : null;
    };
    const raw = (side: Side, getter: (battery: DefaultBattery, record?: BatteryEntityRecord) => unknown): unknown => {
        const battery = selected[side]?.battery;
        return battery ? getter(battery, records[side]) : undefined;
    };
    const access = (battery: DefaultBattery, record?: BatteryEntityRecord): string =>
        battery.batteryAccess ?? record?.domainData.batteryAccess ?? "removable";
    const formFactor = (battery: DefaultBattery, record?: BatteryEntityRecord) =>
        battery.formFactor ?? record?.domainData.formFactor;
    const formFactorText = (battery: DefaultBattery, record?: BatteryEntityRecord): string => {
        if (access(battery, record) === "integrated") return shared.encyclopediaDetail.integratedInMod;
        const form = formFactor(battery, record);
        if (!form) return shared.encyclopediaDetail.unknown;
        return form.kind === "cylindrical"
            ? `${shared.catalogEditor.cylindrical}${form.sizeCode ? ` (${form.sizeCode})` : ""}`
            : shared.catalogEditor.prismatic;
    };
    const dimensionsText = (battery: DefaultBattery, record?: BatteryEntityRecord): string => {
        const form = formFactor(battery, record);
        if (!form) return access(battery, record) === "integrated"
            ? shared.catalogEditor.notApplicable : shared.encyclopediaDetail.unknown;
        const dimensions = form.kind === "cylindrical"
            ? [form.nominalDiameterMm, form.nominalLengthMm]
            : [form.lengthMm, form.widthMm, form.thicknessMm];
        return `${dimensions.map((item) => formatNumber(locale, item)).join(" × ")} mm`;
    };
    const terminalText = (battery: DefaultBattery, record?: BatteryEntityRecord): string => {
        const form = formFactor(battery, record);
        if (access(battery, record) === "integrated" || form?.kind === "prismatic") {
            return shared.catalogEditor.notApplicable;
        }
        return form?.terminalStyle === "flat-top" ? shared.catalogEditor.flatTop
            : form?.terminalStyle === "button-top" ? shared.catalogEditor.buttonTop
                : shared.encyclopediaDetail.unknown;
    };
    const terminalStyle = (battery: DefaultBattery, record?: BatteryEntityRecord): string | null | undefined => {
        const form = formFactor(battery, record);
        return form?.kind === "cylindrical" ? form.terminalStyle : null;
    };
    const protectionText = (battery: DefaultBattery, record?: BatteryEntityRecord): string => {
        const status = battery.protected ?? record?.domainData.protected;
        return status === true ? shared.encyclopediaDetail.protectedCell
            : status === false ? shared.encyclopediaDetail.unprotectedCell : shared.encyclopediaDetail.unknown;
    };
    const ratingText = (battery: DefaultBattery): string => dischargeRatingText(
        locale,
        battery,
        shared.encyclopediaDetail.unknown,
    );
    const wrapperColorText = (color: string | null | undefined): string => {
        if (!color) return shared.encyclopediaDetail.unknown;
        const messageKey = {
            black: "compareColorBlack",
            green: "compareColorGreen",
            orange: "compareColorOrange",
            purple: "compareColorPurple",
            red: "compareColorRed",
            yellow: "compareColorYellow",
        }[color.toLowerCase()];
        return messageKey ? messages[messageKey] : color;
    };
    const authenticityText = (record?: BatteryEntityRecord): string => {
        const status = record?.domainData.authenticity?.status;
        if (!status || status === "unresolved") return shared.encyclopediaDetail.unknown;
        return messages[`compareAuthenticity${status.charAt(0).toUpperCase()}${status.slice(1)}`];
    };
    const authenticityStatus = (record?: BatteryEntityRecord): string | undefined => {
        const status = record?.domainData.authenticity?.status;
        return status === "unresolved" ? undefined : status;
    };
    const weightGrams = (item: DefaultBattery, record?: BatteryEntityRecord): number | undefined =>
        item.weightGrams ?? record?.domainData.weightGrams ?? undefined;
    const weightText = (item: DefaultBattery, record?: BatteryEntityRecord): string => {
        const value = weightGrams(item, record);
        return value === undefined ? shared.encyclopediaDetail.unknown : `${formatNumber(locale, value)} g`;
    };
    const detailHref = (side: Side): string | undefined => {
        const option = selected[side];
        return option ? withoutTrailingSlash(localizedRouteHref(
            locale,
            `catalog/battery/${option.slug}`,
        )) : undefined;
    };
    const sections: readonly { title: string; rows: readonly ComparisonRow[] }[] = [
        {
            title: messages.compareIdentity,
            rows: [
                textRow(shared.catalogEditor.manufacturer, value("a", (item) => item.manufacturer),
                    value("b", (item) => item.manufacturer), raw("a", (item) => item.manufacturer),
                    raw("b", (item) => item.manufacturer)),
                textRow(shared.catalogEditor.model, value("a", (item) => item.model), value("b", (item) => item.model),
                    raw("a", (item) => item.model), raw("b", (item) => item.model)),
                textRow(shared.encyclopediaDetail.aliases, value("a", (item) => item.aliases?.join(", ")
                    || shared.encyclopediaDetail.unknown), value("b", (item) => item.aliases?.join(", ")
                    || shared.encyclopediaDetail.unknown), raw("a", (item) => item.aliases),
                    raw("b", (item) => item.aliases)),
            ],
        },
        {
            title: messages.compareConstruction,
            rows: [
                textRow(shared.encyclopediaDetail.propertyLabels.formFactor, value("a", formFactorText),
                    value("b", formFactorText), raw("a", formFactor), raw("b", formFactor)),
                textRow(shared.encyclopediaDetail.propertyLabels.dimensions, value("a", dimensionsText),
                    value("b", dimensionsText), raw("a", formFactor), raw("b", formFactor)),
                textRow(shared.catalogEditor.weightGrams, value("a", weightText),
                    value("b", weightText), raw("a", weightGrams), raw("b", weightGrams)),
                textRow(shared.catalogEditor.terminalStyle, value("a", terminalText), value("b", terminalText),
                    raw("a", terminalStyle), raw("b", terminalStyle)),
                textRow(shared.encyclopediaDetail.batteryAccess, value("a", (item, record) => access(item, record)
                    === "integrated"
                    ? shared.encyclopediaDetail.integratedInMod
                    : shared.encyclopediaDetail.batteryRemovable),
                value("b", (item, record) => access(item, record) === "integrated"
                    ? shared.encyclopediaDetail.integratedInMod : shared.encyclopediaDetail.batteryRemovable),
                raw("a", access), raw("b", access)),
                textRow(shared.encyclopediaDetail.protection, value("a", protectionText), value("b", protectionText),
                    raw("a", (item, record) => item.protected ?? record?.domainData.protected),
                    raw("b", (item, record) => item.protected ?? record?.domainData.protected)),
                textRow(shared.encyclopediaDetail.chemistry, value("a", (item, record) =>
                    record?.domainData.chemistry
                        ? displayCatalogText(record.domainData.chemistry) : shared.encyclopediaDetail.unknown),
                value("b", (item, record) => record?.domainData.chemistry
                    ? displayCatalogText(record.domainData.chemistry) : shared.encyclopediaDetail.unknown),
                raw("a", (item, record) => record?.domainData.chemistry),
                raw("b", (item, record) => record?.domainData.chemistry)),
                textRow(shared.encyclopediaDetail.wrapperColor, value("a", (item, record) => wrapperColorText(
                    item.appearance?.wrapperColor ?? record?.domainData.appearance?.wrapperColor,
                )), value("b", (item, record) => wrapperColorText(
                    item.appearance?.wrapperColor ?? record?.domainData.appearance?.wrapperColor,
                )), raw("a", (item, record) =>
                    item.appearance?.wrapperColor ?? record?.domainData.appearance?.wrapperColor),
                raw(
                    "b",
                    (item, record) => item.appearance?.wrapperColor ?? record?.domainData.appearance?.wrapperColor,
                )),
            ],
        },
        {
            title: messages.compareElectrical,
            rows: [
                textRow(shared.encyclopediaDetail.propertyLabels.ratedCapacity,
                    value("a", (item) => `${formatNumber(locale, item.ratedCapacityMah, 0)} mAh`),
                    value("b", (item) => `${formatNumber(locale, item.ratedCapacityMah, 0)} mAh`),
                    raw("a", (item) => item.ratedCapacityMah), raw("b", (item) => item.ratedCapacityMah)),
                textRow(shared.encyclopediaDetail.propertyLabels.continuousDischarge, value("a", ratingText),
                    value("b", ratingText), raw("a", (item) => [item.continuousDischargeCurrentAmps,
                        item.continuousDischargeCRating]), raw("b", (item) => [item.continuousDischargeCurrentAmps,
                        item.continuousDischargeCRating])),
                textRow(shared.encyclopediaDetail.nominalVoltage,
                    value("a", (item) => `${formatNumber(locale, item.nominalVoltageVolts ?? 3.7)} V`),
                    value("b", (item) => `${formatNumber(locale, item.nominalVoltageVolts ?? 3.7)} V`),
                    raw("a", (item) => item.nominalVoltageVolts ?? 3.7),
                    raw("b", (item) => item.nominalVoltageVolts ?? 3.7)),
            ],
        },
        {
            title: messages.compareDerived,
            rows: [textRow(messages.compareNominalEnergy,
                value("a", (item) => `${formatNumber(locale,
                    (item.nominalVoltageVolts ?? 3.7) * item.ratedCapacityMah / 1000)} Wh`),
                value("b", (item) => `${formatNumber(locale,
                    (item.nominalVoltageVolts ?? 3.7) * item.ratedCapacityMah / 1000)} Wh`),
                raw("a", (item) => (item.nominalVoltageVolts ?? 3.7) * item.ratedCapacityMah),
                raw("b", (item) => (item.nominalVoltageVolts ?? 3.7) * item.ratedCapacityMah))],
        },
        {
            title: messages.compareContext,
            rows: [
                textRow(shared.encyclopediaDetail.marketIntroduction,
                    value("a", (item) => introductionText(item, locale)),
                    value("b", (item) => introductionText(item, locale)),
                    raw("a", (item) => item.introduction), raw("b", (item) => item.introduction)),
                textRow(shared.encyclopediaDetail.authenticityAssessment,
                    value("a", (item, record) => authenticityText(record)),
                    value("b", (item, record) => authenticityText(record)),
                    raw("a", (item, record) => authenticityStatus(record)),
                    raw("b", (item, record) => authenticityStatus(record))),
            ],
        },
        {
            title: shared.encyclopediaDetail.safety,
            rows: [textRow(shared.encyclopediaDetail.safety,
                value("a", (item) => item.safetyWarning ?? shared.encyclopediaDetail.noBatterySafety),
                value("b", (item) => item.safetyWarning ?? shared.encyclopediaDetail.noBatterySafety),
                raw("a", (item) => item.safetyWarning), raw("b", (item) => item.safetyWarning))],
        },
    ];

    const constructionValues = (side: Side): ConstructionNoticeInput => {
        const compatibility = [
            raw(side, access),
            raw(side, formFactor),
            raw(side, (item, record) => item.protected ?? record?.domainData.protected),
            raw(side, (item, record) => item.appearance ?? record?.domainData.appearance),
            raw(side, (item) => item.nominalVoltageVolts ?? 3.7),
        ];
        return {
            compatibility,
            completeness: [
                ...compatibility,
                raw(side, (item, record) => record?.domainData.chemistry),
            ],
        };
    };
    const bothSelected = batteries.every(Boolean);
    const constructions = bothSelected ? [constructionValues("a"), constructionValues("b")] : undefined;
    const constructionNotice = constructions
        ? constructionNoticeState(constructions[0], constructions[1])
        : { differs: false, unknown: false };
    const invalidReference = (slugs.a !== undefined && !selected.a) || (slugs.b !== undefined && !selected.b);

    return <SiteLayout basePath="../../" className="battery-comparison-page" rootHref={localizedRootHref(locale)}>
        <main className="page-content battery-comparison">
            <Breadcrumbs label={shared.encyclopediaDetail.breadcrumb} items={[
                { label: "Steam Engine", href: localizedRootHref(locale) },
                {
                    label: shared.encyclopedia.title,
                    href: withoutTrailingSlash(localizedRouteHref(locale, "catalog")),
                },
                { label: messages.compareTitle },
            ]} />
            <header className="battery-comparison__hero">
                <p className="battery-comparison__eyebrow">{messages.compareEyebrow}</p>
                <h1>{messages.compareTitle}</h1>
                <p>{messages.compareDescription}</p>
            </header>
            <section className="battery-comparison__selectors" aria-label={messages.compareTitle}>
                <BatteryPicker label={messages.compareFirstBattery} options={options} selected={selected.a}
                    chooseLabel={messages.compareChooseBattery} onSelect={(slug) => update("a", slug)} />
                <button type="button" className="battery-comparison__swap" onClick={swap}
                    aria-label={messages.compareSwap} title={messages.compareSwap}>
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} aria-hidden="true" />
                </button>
                <BatteryPicker label={messages.compareSecondBattery} options={options} selected={selected.b}
                    chooseLabel={messages.compareChooseBattery} onSelect={(slug) => update("b", slug)} />
            </section>
            <div className="battery-comparison__notices" aria-live="polite">
                {invalidReference && <p className="notice notice--warning"><FontAwesomeIcon
                    icon={faTriangleExclamation} aria-hidden="true" />{messages.compareInvalidBattery}</p>}
                {slugs.a && slugs.a === slugs.b && <p className="notice"><FontAwesomeIcon icon={faCircleInfo}
                    aria-hidden="true" />{messages.compareSameBattery}</p>}
                {constructionNotice.differs && <p className="notice"><FontAwesomeIcon
                    icon={faCircleInfo}
                    aria-hidden="true" />{messages.compareConstructionDiffers}</p>}
                {constructionNotice.unknown && <p className="notice"><FontAwesomeIcon icon={faCircleInfo}
                    aria-hidden="true" />{messages.compareConstructionUnknown}</p>}
            </div>
            <div className="battery-comparison__column-headings">
                <span></span>
                <strong>{selected.a && detailHref("a")
                    ? <a href={detailHref("a")}>{selected.a.heading}</a> : messages.compareFirstBattery}</strong>
                <strong>{selected.b && detailHref("b")
                    ? <a href={detailHref("b")}>{selected.b.heading}</a> : messages.compareSecondBattery}</strong>
            </div>
            {sections.map((section) => <ComparisonSection key={section.title} {...section}
                unknownLabel={shared.encyclopediaDetail.unknown} />)}
        </main>
    </SiteLayout>;
};
