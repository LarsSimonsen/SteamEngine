import { useEffect, useMemo, useState, useSyncExternalStore, type ReactElement } from "react";
import { catalogPresentationFor, modTextTranslations } from "../../i18n/catalog-presentations";
import { messagesFor } from "../../i18n/messages";
import { comparisonMessagesFor } from "../../i18n/comparison-messages";
import { calculatorMessagesFor } from "../../i18n/calculator-messages";
import { localizedRoute, routeMetadataFor } from "../../i18n/locales";
import { localizedRootHref, pageLocale } from "../../i18n/page-locale";
import { SiteLayout } from "../../shared/ui/site-layout";
import { Breadcrumbs } from "../../shared/ui/breadcrumbs";
import { AdPlacement } from "../../shared/ui/ad-placement";
import { catalogCategoryRouteSegments, type CatalogCategory } from "./routes";
import { batteryPresets } from "../../catalogs/batteries/defaults";
import { createBatteryRepository } from "../../catalogs/batteries/repository";
import { concepts, type Concept } from "../../catalogs/concepts/catalog";
import { builtInPresets } from "../../catalogs/mods/presets";
import {
    modCatalogEntityForSlug,
    type ModCatalogEntity,
} from "../../catalogs/mods/entities";
import { createModRepository } from "../../catalogs/mods/repository";
import {
    modAdditionalCapabilities,
    modOutputControlModes,
    type ModAdditionalCapability,
    type ModOutputControlMode,
} from "../../catalogs/mods/catalog";
import { materials } from "../../catalogs/materials/catalog";
import { createMaterialRepository } from "../../catalogs/materials/repository";
import type { DefaultBattery } from "../../catalogs/batteries/catalog";
import type { DefaultMaterial } from "../../catalogs/materials/catalog";
import type { DefaultMod } from "../../catalogs/mods/catalog";
import type { BatteryEntityRecord, EntitySource, ModEntityRecord } from "../../catalogs/entity-records";
import type { CatalogIntroduction } from "../../catalogs/entry-metadata";
import keeppower26650Image from "../../assets/catalog/batteries/keeppower-imr26650-5200mah/26650-cells-in-charger.jpg";
import lg18650Hb6Image from "../../assets/catalog/batteries/lg-18650hb6/18650-li-ion-representative.jpg";
import lg18650Hg2Image from "../../assets/catalog/batteries/lg-18650hg2/four-18650-cells.jpg";
import panasonicCgr18650ChImage from "../../assets/catalog/batteries/panasonic-cgr18650ch/18650-and-21700-comparison-detail.jpg";
import panasonicNcr18650bImage from "../../assets/catalog/batteries/panasonic-ncr18650b/18650-and-21700-comparison.jpg";
import panasonicNcr18650PfImage from "../../assets/catalog/batteries/panasonic-ncr18650pf/18650-with-aa-scale.jpg";
import samsungInr1865025rImage from "../../assets/catalog/batteries/samsung-inr18650-25r/18650-lityum-ion-piller.jpg";
import samsungInr1865030qImage from "../../assets/catalog/batteries/samsung-inr18650-30q/18650-cell-open.jpg";
import egoTwistImage from "../../assets/catalog/mods/ego-twist/ego-battery.jpg";
import eleafIstick50wImage from "../../assets/catalog/mods/eleaf-istick-50w/eleaf-istick-50w.jpg";
import joyetechEvicVtImage from "../../assets/catalog/mods/joyetech-evic-vt/evic-vtc.jpg";
import sigeleiMiniImage from "../../assets/catalog/mods/sigelei-mini/sigelei-mini-book-kit.jpg";
import smokGPriv220wImage from "../../assets/catalog/mods/smok-g-priv-220w/smok-g-priv-220w.jpg";
import vamoV5Image from "../../assets/catalog/mods/vamo-v1-v2-v3-v5/vamo-v5.jpg";
import wismecReuleauxRxImage from "../../assets/catalog/mods/wismec-reuleaux-rx200s-4-10/wismec-reuleaux-rx-2-3.jpg";
import {
    materialEncyclopediaRecordFor,
    type MaterialImage,
    type MaterialEncyclopediaRecord,
    type MaterialProperty,
    type MaterialPropertyNote,
    type MaterialSource,
} from "../../catalogs/materials/encyclopedia";
import "../../shared/styles/foundation.css";
import { CalculatorVisibility } from "./calculator-visibility";
import { relationForBattery, relationForMod } from "./integrated-battery-relations";
import { MaterialTfrGraph } from "./material-tfr-graph";
import { PowerCurveUnavailable } from "../../shared/ui/power-curve-graph";
import { calculateModRangeFromApi, type ModRangeApiResponse } from "../modrange/api";
import { limitsFromPreset } from "../modrange/domain";
import { ModRangeGraph } from "../modrange/mod-range-graph";
import { calculateMaterialTfrFromApi, materialTfrPointsFor, type MaterialTfrApiResponse } from "./material-tfr-api";
import {
    getStaticEntityRecord,
    loadEntityRecord,
    type EntityRecordCategory,
} from "./entity-record-loader";
import "./encyclopedia.css";

type EncyclopediaProps = {
    readonly category: CatalogCategory;
    readonly slug: string;
};

type EncyclopediaDetailMessages = ReturnType<typeof messagesFor>["encyclopediaDetail"];

const detailMessages = (): EncyclopediaDetailMessages => messagesFor(pageLocale()).encyclopediaDetail;

const findBySlug = <T extends { readonly slug?: string }>(items: readonly T[], slug: string): T => {
    const item = items.find((candidate) => candidate.slug === slug);
    if (!item) throw new Error(`No encyclopedia item found for ${slug}`);
    return item;
};

const formatNumber = (
    value: number | null | undefined,
    fallback = "Not specified",
): string => value === null || value === undefined
    ? fallback
    : String(value);

const formatLocalizedNumber = (value: number): string => new Intl.NumberFormat(pageLocale()).format(value);

const formatIntroductionDate = (date: string): string => {
    const [year, month, day] = date.split("-").map(Number);
    if (month === undefined) return String(year);
    const locale = pageLocale() === "nb" ? "nb-NO" : "en-US";
    const options: Intl.DateTimeFormatOptions = {
        timeZone: "UTC",
        month: "long",
        year: "numeric",
        ...(day === undefined ? {} : { day: "numeric" }),
    };
    return new Intl.DateTimeFormat(locale, options).format(Date.UTC(year, month - 1, day ?? 1));
};

type EntityRecordState = {
    readonly record: BatteryEntityRecord | ModEntityRecord | undefined;
    readonly loading: boolean;
};

const useEntityRecord = (
    category: EntityRecordCategory | undefined,
    id: string | undefined,
): EntityRecordState => {
    const staticRecord = category && id ? getStaticEntityRecord(category, id) : undefined;
    const [record, setRecord] = useState<BatteryEntityRecord | ModEntityRecord | undefined>(staticRecord);
    const [loading, setLoading] = useState(Boolean(category && id && import.meta.env.PROD));

    useEffect(() => {
        if (!category || !id || !import.meta.env.PROD) {
            setRecord(staticRecord);
            setLoading(false);
            return;
        }

        let active = true;
        setRecord(undefined);
        setLoading(true);
        void loadEntityRecord(category, id).then((next) => {
            if (!active) return;
            setRecord(next);
            setLoading(false);
        });
        return () => {
            active = false;
        };
    }, [category, id, staticRecord]);

    return { record, loading };
};

const formatMarketIntroduction = (introduction: CatalogIntroduction): string => {
    const messages = detailMessages();
    const earliest = introduction.earliest;
    const latest = introduction.latest;
    if (earliest && latest && earliest.date === latest.date) {
        return messages.introduced(formatIntroductionDate(earliest.date));
    }
    if (earliest && latest) {
        const earliest = introduction.earliest!;
        const latest = introduction.latest!;
        return messages.introducedBetween(formatIntroductionDate(earliest.date), formatIntroductionDate(latest.date));
        return `${formatIntroductionDate(earliest.date)} – ${formatIntroductionDate(latest.date)}`;
    }
    if (earliest) return messages.introducedNoEarlier(formatIntroductionDate(earliest.date));
    return messages.availableBy(formatIntroductionDate(latest!.date));
};

const isBatteryOldOrUndated = (battery: DefaultBattery): boolean => {
    if (!battery.introduction) return true;
    const date = battery.introduction.latest?.date ?? battery.introduction.earliest?.date;
    if (!date) return true;
    const [year, month = 1, day = 1] = date.split("-").map(Number);
    const introductionTime = Date.UTC(year, month - 1, day);
    const today = new Date();
    const tenYearsAgo = Date.UTC(today.getUTCFullYear() - 10, today.getUTCMonth(), today.getUTCDate());
    return introductionTime < tenYearsAgo;
};

const hasUnknownMarketIntroduction = (battery: DefaultBattery): boolean => !battery.introduction;
const Metadata = ({
    aliases,
    description,
}: {
    readonly aliases?: readonly string[];
    readonly description?: string;
}): ReactElement | null => {
    const messages = detailMessages();
    if (!description && (!aliases || aliases.length === 0)) return null;
    return <section className="encyclopedia-card" aria-labelledby="additional-information">
        <h2 id="additional-information">{messages.additionalInformation}</h2>
        {description && <p>{description}</p>}
        {aliases && aliases.length > 0 && <>
            <h3>{messages.aliases}</h3>
            <ul className="encyclopedia-list">
                {aliases.map((alias) => <li key={alias}>{alias}</li>)}
            </ul>
        </>}
    </section>;
};

const InlineMetadata = ({ aliases }: { readonly aliases?: readonly string[] }): ReactElement | null => {
    if (!aliases || aliases.length === 0) return null;
    return <>
        <h3>{detailMessages().aliases}</h3>
        <ul className="encyclopedia-list">
            {aliases.map((alias) => <li key={alias}>{alias}</li>)}
        </ul>
    </>;
};

const MarketIntroduction = ({
    introduction,
}: {
    readonly introduction?: CatalogIntroduction | null;
}): ReactElement => {
    const messages = detailMessages();
    return <p><strong>{messages.marketIntroduction}:</strong> {introduction
        ? formatMarketIntroduction(introduction)
        : messages.unknown}.</p>;
};

const findOptionalBySlug = <T extends { readonly slug?: string }>(
    items: readonly T[],
    slug: string | undefined,
): T | undefined => slug === undefined ? undefined : items.find((item) => item.slug === slug);

const RelatedEntry = ({
    description,
    href,
    label,
    headingId = "related-entry",
}: {
    readonly description: string;
    readonly href: string;
    readonly label: string;
    readonly headingId?: string;
}): ReactElement => <section className="encyclopedia-card" aria-labelledby={headingId}>
    <h2 id={headingId}>{detailMessages().relatedEntry}</h2>
    <p>{description} <a href={href}>{label}</a>.</p>
</section>;

type EntryCategory = "batteries" | "materials" | "mods";

type EntryVisibilityProps = {
    readonly id: string;
    readonly label: string;
};

const BatteryCalculatorVisibility = ({ id, label }: EntryVisibilityProps): ReactElement => {
    const repository = useMemo(() => createBatteryRepository(), []);
    useEffect(() => () => repository.dispose(), [repository]);
    const snapshot = useSyncExternalStore(repository.subscribe, repository.getSnapshot, repository.getSnapshot);
    const visible = !snapshot.hiddenDefaultBatteryIds.has(id);
    return <CalculatorVisibility label={label} visible={visible}
        onChange={(nextVisible) => repository.setDefaultVisible(id, nextVisible)} />;
};

const MaterialCalculatorVisibility = ({ id, label }: EntryVisibilityProps): ReactElement => {
    const repository = useMemo(() => createMaterialRepository(), []);
    useEffect(() => () => repository.dispose(), [repository]);
    const snapshot = useSyncExternalStore(repository.subscribe, repository.getSnapshot, repository.getSnapshot);
    const visible = !snapshot.hiddenDefaultMaterialIds.has(id);
    return <CalculatorVisibility label={label} visible={visible}
        onChange={(nextVisible) => repository.setDefaultVisible(id, nextVisible)} />;
};

const ModCalculatorVisibility = ({ id, label }: EntryVisibilityProps): ReactElement => {
    const repository = useMemo(() => createModRepository(), []);
    useEffect(() => () => repository.dispose(), [repository]);
    const snapshot = useSyncExternalStore(repository.subscribe, repository.getSnapshot, repository.getSnapshot);
    const visible = !snapshot.hiddenDefaultModIds.has(id);
    return <CalculatorVisibility label={label} visible={visible}
        onChange={(nextVisible) => repository.setDefaultVisible(id, nextVisible)} />;
};

const EntryCalculatorVisibility = ({
    category,
    id,
    label,
}: EntryVisibilityProps & { readonly category: EntryCategory }): ReactElement => {
    if (category === "batteries") return <BatteryCalculatorVisibility id={id} label={label} />;
    if (category === "materials") return <MaterialCalculatorVisibility id={id} label={label} />;
    return <ModCalculatorVisibility id={id} label={label} />;
};

const SourceReference = ({ source }: { readonly source: EntitySource }): ReactElement => {
    const title = source.url?.startsWith("http")
        ? <a href={source.url} target="_blank" rel="nofollow noreferrer">{source.title}</a>
        : source.title;
    return <li>
        <strong>{title}</strong>
        {source.publisher && <span className="encyclopedia-source-detail">{source.publisher}</span>}
        {source.limitations && <span className="encyclopedia-source-detail">{source.limitations}</span>}
    </li>;
};

const MaterialSourceReference = ({ source }: { readonly source: MaterialSource }): ReactElement => <li>
    <strong><a href={source.url} target="_blank" rel="nofollow noreferrer">{source.title}</a></strong>
    {source.publisher && <span className="encyclopedia-source-detail">{source.publisher}</span>}
    {source.note && <span className="encyclopedia-source-detail">{source.note}</span>}
</li>;

const MaterialResearchNotes = ({ record }: { readonly record: MaterialEncyclopediaRecord }): ReactElement => {
    const messages = detailMessages();
    const notes = record.evidenceNotes ?? [];
    const hasResearchContent = Boolean(record.researchSummary) || notes.length > 0;
    return <section className="encyclopedia-card battery-research encyclopedia-research-summary"
        aria-labelledby="material-research-summary">
        <p className="encyclopedia-kicker">{messages.sourceBackedMaterial}</p>
        <h2 id="material-research-summary">{messages.researchSummary}</h2>
        {!hasResearchContent
            ? <p className="encyclopedia-meta">{messages.noResearchSummary}</p>
            : <>
                {record.researchSummary && <p>{record.researchSummary}</p>}
                {notes.length > 0 && <section
                    className="battery-research__subsection encyclopedia-research-summary__evidence"
                    aria-labelledby="material-research-evidence">
                    <h3 id="material-research-evidence">{messages.evidenceNotes}</h3>
                    <ul className="encyclopedia-claim-list">
                        {notes.map((note) => <li key={note.id}>
                            <p>{note.statement}</p>
                            <span className="encyclopedia-source-detail">
                                {note.confidence ? `${messages.confidence}: ${note.confidence}. ` : ""}
                                {note.limitations ? `${messages.limitation}: ${note.limitations}` : ""}
                            </span>
                            <span className="encyclopedia-source-detail">
                                {messages.sources}: {note.sourceIds.map((sourceId, index) => {
                                    const source = record.sources.find((candidate) => candidate.id === sourceId);
                                    return <span key={sourceId}>{index > 0 ? "; " : ""}{source
                                        ? <a href={source.url} target="_blank" rel="nofollow noreferrer">{source.title}</a>
                                        : sourceId}</span>;
                                })}
                            </span>
                        </li>)}
                    </ul>
                </section>}
            </>}
    </section>;
};

const MaterialPropertyTable = ({
    emphasizeFirst = false,
    properties,
    muted = false,
}: {
    readonly emphasizeFirst?: boolean;
    readonly properties: readonly MaterialProperty[];
    readonly muted?: boolean;
}): ReactElement | null => {
    const messages = detailMessages();
    if (properties.length === 0) return null;
    return <table className={`se-table encyclopedia-property-table${muted ? " encyclopedia-property-table--muted" : ""}${
        emphasizeFirst ? " encyclopedia-property-table--emphasize-first" : ""}`}>
        <thead><tr><th>{messages.property}</th><th>{messages.value}</th><th>{messages.unit}</th></tr></thead>
        <tbody>{properties.map((property) => <tr key={`${property.label}-${property.value}`}>
            <th scope="row">{property.label}</th>
            <td>
                {property.href ? <a href={property.href}>{property.value}</a> : property.value}
                {property.note && <span className="encyclopedia-property-note"> {property.note}</span>}
            </td>
            <td>{property.unit ?? ""}</td>
        </tr>)}</tbody>
    </table>;
};

const MaterialPropertyNotes = ({
    notes,
    properties,
}: {
    readonly notes: readonly MaterialPropertyNote[];
    readonly properties: readonly MaterialProperty[];
}): ReactElement | null => {
    const messages = detailMessages();
    if (notes.length === 0 && properties.length === 0) return null;
    return <div className="material-property-notes" aria-label={messages.additionalPropertyNotes}>
        {properties.map((property) => <p key={`${property.label}-${property.value}`}>
            <strong>{property.label}:</strong> {property.value}. {property.note
                ?? messages.unknownPropertyValue}
        </p>)}
        {notes.map((note) => <p key={note.label}>
            <strong>{note.label}:</strong> {note.description}{note.explanation ? ` ${note.explanation}` : ""}
        </p>)}
    </div>;
};

const MaterialImages = ({
    images,
    sources,
}: {
    readonly images: readonly MaterialImage[] | undefined;
    readonly sources: readonly MaterialSource[];
}): ReactElement | null => images && images.length > 0 ? <section className="encyclopedia-card material-images"
    aria-labelledby="material-images">
    <h2 id="material-images">{detailMessages().appearance}</h2>
    <div className="material-images__grid">
        {images.slice(0, 1).map((image) => {
            const source = sources.find((candidate) => candidate.id === image.sourceId);
            return <figure key={image.src} className="material-image">
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.caption}{source && <> {detailMessages().source}: <a href={source.url} target="_blank"
                    rel="nofollow noreferrer">{source.title}</a>.</>}</figcaption>
            </figure>;
        })}
    </div>
</section> : null;

type BatteryEncyclopediaImage = {
    readonly src: string;
    readonly alt: string;
    readonly caption: string;
    readonly sourceTitle: string;
    readonly sourceUrl: string;
};

const batteryEncyclopediaImages: Readonly<Record<string, BatteryEncyclopediaImage>> = {
    "keeppower-imr26650-5200mah": {
        src: keeppower26650Image,
        alt: "26650 lithium batteries in a multi-bay charger",
        caption: "Representative 26650 lithium batteries; the image does not establish the Keeppower branding or capacity.",
        sourceTitle: "2OpenRov batteries and chargers",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:2OpenRov_batteries_chargers_ProjetCh%27tiPlouf2017.jpg",
    },
    "lg-18650hb6": {
        src: lg18650Hb6Image,
        alt: "Rechargeable 18650 lithium-ion cell",
        caption: "Representative 18650 lithium-ion cell; the image does not establish the LG HB6 wrapper or model.",
        sourceTitle: "18650 battery, 3000mAh, new in 2024",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:18650_battery,_3000mAh,_new_in_2024.jpg",
    },
    "lg-18650hg2": {
        src: lg18650Hg2Image,
        alt: "Four cylindrical 18650 lithium-ion cells in a charger",
        caption: "Representative 18650 cells; the image does not establish the LG HG2 wrapper or model.",
        sourceTitle: "Four 18650 lithium cells in a Liitokala PL4 charger",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Four_18650_lithium_cells_in_a_Liitokala_PL4_charger.jpg",
    },
    "panasonic-cgr18650ch": {
        src: panasonicCgr18650ChImage,
        alt: "Close-up of cylindrical 18650 lithium-ion cells",
        caption: "Representative 18650 cells with visible positive terminals; the image does not establish the CGR18650CH model.",
        sourceTitle: "Comparison of 18650 and 21700 batteries 02",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Comparison_of_18650_and_21700_batteries_02.jpg",
    },
    "panasonic-ncr18650b": {
        src: panasonicNcr18650bImage,
        alt: "Cylindrical 18650 and 21700 rechargeable batteries side by side",
        caption: "Representative 18650 form-factor comparison; the image does not establish the NCR18650B wrapper or model.",
        sourceTitle: "Comparison of 18650 and 21700 batteries 01",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Comparison_of_18650_and_21700_batteries_01.jpg",
    },
    "panasonic-ncr18650pf": {
        src: panasonicNcr18650PfImage,
        alt: "Green 18650 lithium-ion cell beside an AA battery",
        caption: "Representative 18650 cell for scale; the image does not establish the NCR18650PF model.",
        sourceTitle: "Liion 18650 AA battery",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Liion-18650-AA-battery.jpg",
    },
    "samsung-inr18650-25r": {
        src: samsungInr1865025rImage,
        alt: "Row of differently wrapped cylindrical 18650 lithium-ion cells",
        caption: "Representative 18650 cells with visible markings; the image does not establish a specific Samsung 25R identity.",
        sourceTitle: "18650 lithium-ion batteries",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:18650_lityum_iyon_piller.jpg",
    },
    "samsung-inr18650-30q": {
        src: samsungInr1865030qImage,
        alt: "Opened cylindrical 18650 lithium-ion cell showing internal construction",
        caption: "Representative opened 18650 cell; the image does not establish the Samsung 30Q wrapper or model.",
        sourceTitle: "Lithium-Ion Cell cylindric",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Lithium-Ion_Cell_cylindric.JPG",
    },
};

const BatteryImages = ({ slug }: { readonly slug?: string }): ReactElement | null => {
    const messages = detailMessages();
    const image = slug === undefined ? undefined : batteryEncyclopediaImages[slug];
    if (!image) return null;
    return <section className="encyclopedia-card material-images" aria-labelledby="battery-images">
        <h2 id="battery-images">{messages.appearance}</h2>
        <div className="material-images__grid">
            <figure className="material-image">
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.caption} {messages.source}: <a href={image.sourceUrl} target="_blank"
                    rel="nofollow noreferrer">{image.sourceTitle}</a>.</figcaption>
            </figure>
        </div>
    </section>;
};

const MaterialTfrTable = ({ material }: { readonly material: DefaultMaterial }): ReactElement | null => {
    const messages = detailMessages();
    const points = materialTfrPointsFor(material);
    if (!points) return null;
    const tcrDerived = material.tfr === undefined && material.tcr !== undefined;
    const [response, setResponse] = useState<MaterialTfrApiResponse>();
    useEffect(() => {
        let active = true;
        void calculateMaterialTfrFromApi(points).then((next) => {
            if (active) setResponse(next);
        }).catch(() => {
            // The shared request client reports the failure to BackendErrorBoundary.
        });
        return () => {
            active = false;
        };
    }, [points]);
    if (!response) return <section className="encyclopedia-card material-tfr" aria-labelledby="material-tfr">
        <h2 id="material-tfr">{messages.temperatureResistanceCurve}</h2>
        <p className="encyclopedia-meta">{messages.loadingTemperatureCurve}</p>
    </section>;
    if (response.kind === "invalid") return <p className="encyclopedia-warning">{response.message}</p>;
    if (!response.points || !response.graph || !response.method) return null;
    const curveDescription = tcrDerived
        ? `${messages.normalizedCurve("TCR-derived")} ${messages.extrapolatedCurve}`
        : `${messages.normalizedCurve(response.method)} ${messages.extrapolatedCurve}`;
    return <section className="encyclopedia-card material-tfr" aria-labelledby="material-tfr">
        <h2 id="material-tfr">{messages.temperatureResistanceCurve}</h2>
        <p className="encyclopedia-meta">{curveDescription}</p>
        <MaterialTfrGraph materialName={material.name} data={response}
            caption={tcrDerived ? curveDescription : undefined} />
        <table className="se-table encyclopedia-property-table material-tfr__table">
            <thead><tr><th>{messages.temperature} (°C)</th><th>{messages.relativeResistance} (R/R20)</th></tr></thead>
            <tbody>{response.points.map(({ temperatureCelsius, resistanceFactor }) => <tr key={temperatureCelsius}>
                <th scope="row">{temperatureCelsius}</th><td>{resistanceFactor.toFixed(6)}</td>
            </tr>)}</tbody>
        </table>
    </section>;
};

const MaterialTfrTableLegacy = ({ material }: { readonly material: DefaultMaterial }): ReactElement | null => {
    /*
    if (!material.tfr) return null;
    const normalized = normalizeTfr(material.tfr);
    if (normalized.kind === "invalid") return <p className="encyclopedia-warning">{normalized.message}</p>;
    return <section className="encyclopedia-card material-tfr" aria-labelledby="material-tfr">
        <h2 id="material-tfr">Temperature resistance curve</h2>
        <p className="encyclopedia-meta">The catalog curve is normalized to R/R20. Normalization method: {
            normalized.method}. Values beyond the supplied points are linearly extrapolated for the graph only.</p>
        <MaterialTfrGraph material={material} />
        <table className="se-table encyclopedia-property-table material-tfr__table">
            <thead><tr><th>Temperature (°C)</th><th>Relative resistance (R/R20)</th></tr></thead>
            <tbody>{normalized.points.map(([temperature, factor]) => <tr key={temperature}>
                <th scope="row">{temperature}</th><td>{factor.toFixed(6)}</td>
            </tr>)}</tbody>
        </table>
    </section>;
    */
    return null;
};

const isRewrapRecord = (record: BatteryEntityRecord | undefined): boolean =>
    record?.classifications?.includes("rewrap") === true
    || /rewrap/i.test(record?.summary.shortDescription ?? "");

const batteryFormFactorProperties = (
    battery: DefaultBattery,
    record: BatteryEntityRecord | undefined,
): MaterialProperty[] => {
    const messages = detailMessages();
    const formFactor = battery.formFactor ?? record?.domainData.formFactor ?? null;
    const batteryAccess = battery.batteryAccess ?? record?.domainData.batteryAccess ?? "removable";
    if (!formFactor) {
        return batteryAccess === "integrated"
            ? [{ label: messages.propertyLabels.formFactor, value: "Internal battery pack" }]
            : [{ label: messages.propertyLabels.formFactor, value: messages.unknown, note: messages.unknownPropertyValue }];
    }
    if (formFactor.kind === "cylindrical") {
        return [
            {
                label: messages.propertyLabels.formFactor,
                value: `Cylindrical${formFactor.sizeCode ? ` (${formFactor.sizeCode})` : ""}`,
            },
            {
                label: messages.propertyLabels.dimensions,
                value: `${formFactor.nominalDiameterMm} × ${formFactor.nominalLengthMm}`,
                unit: "mm",
            },
        ];
    }
    return [
        { label: messages.propertyLabels.formFactor, value: "Prismatic" },
        {
            label: messages.propertyLabels.dimensions,
            value: `${formFactor.lengthMm} × ${formFactor.widthMm} × ${formFactor.thicknessMm}`,
            unit: "mm",
        },
    ];
};

const BatteryVapingContext = ({
    battery,
    record,
}: {
    readonly battery: DefaultBattery;
    readonly record: BatteryEntityRecord | undefined;
}): ReactElement => {
    const messages = detailMessages();
    const batteryAccess = battery.batteryAccess ?? record?.domainData.batteryAccess ?? "removable";
    const accessText = batteryAccess === "integrated"
        ? messages.batteryInternal
        : messages.batteryRemovable;
    const ratingText = battery.continuousDischargeCurrentAmps !== undefined
        ? messages.continuousDischargeCurrent(battery.continuousDischargeCurrentAmps)
        : battery.continuousDischargeCRating !== undefined
            ? messages.continuousDischargeC(battery.continuousDischargeCRating)
            : messages.noContinuousDischarge;
    const rewrapText = isRewrapRecord(record)
        ? messages.rewrapExplanation
        : "";
    return <>{accessText} {ratingText} {rewrapText}</>;
};

const ModEntityCalculatorVisibility = ({
    ids,
    label,
}: {
    readonly ids: readonly string[];
    readonly label: string;
}): ReactElement => {
    const repository = useMemo(() => createModRepository(), []);
    useEffect(() => () => repository.dispose(), [repository]);
    const snapshot = useSyncExternalStore(repository.subscribe, repository.getSnapshot, repository.getSnapshot);
    const visible = ids.every((id) => !snapshot.hiddenDefaultModIds.has(id));
    return <CalculatorVisibility label={label} visible={visible}
        onChange={(nextVisible) => ids.forEach((id) => repository.setDefaultVisible(id, nextVisible))} />;
};

const weightProperty = (
    label: string,
    value: number | null | undefined,
    unknown: string,
    unknownNote: string,
): MaterialProperty => value === undefined || value === null
    ? { label, value: unknown, note: unknownNote }
    : { label, value: formatNumber(value), unit: "g" };

const BatterySafety = ({
    battery,
    presentation,
    record,
}: {
    readonly battery: DefaultBattery;
    readonly presentation: ReturnType<typeof catalogPresentationFor>;
    readonly record: BatteryEntityRecord | undefined;
}): ReactElement => {
    const messages = detailMessages();
    const findings = record?.safetyFindings ?? [];
    const hasSafetyContent = battery.safetyWarning !== undefined || findings.length > 0;
    return <section className="encyclopedia-card material-safety" aria-labelledby="battery-safety">
        <h2 id="battery-safety">{messages.safety}</h2>
        {(presentation.safetyText ?? battery.safetyWarning) && <p>{presentation.safetyText ?? battery.safetyWarning}</p>}
        {findings.map((finding, index) => {
            const summary = typeof finding.summary === "string" ? finding.summary : undefined;
            const implication = typeof finding.runtimeImplication === "string"
                ? finding.runtimeImplication : undefined;
            return <div key={`${summary ?? "finding"}-${index}`}>
                {summary && <p>{summary}</p>}
                {implication && <p className="encyclopedia-meta">{messages.catalogImplication}: {implication}</p>}
            </div>;
        })}
        {!hasSafetyContent && <p>{messages.noBatterySafety}</p>}
    </section>;
};

const EntityRecordLoading = (): ReactElement => <p className="encyclopedia-meta">{detailMessages().loadingResearchRecord}</p>;

const BatteryResearchNotes = ({
    record,
    loading,
}: {
    readonly record: BatteryEntityRecord | undefined;
    readonly loading: boolean;
}): ReactElement => {
    const messages = detailMessages();
    const evidenceClaims = record?.claims ?? [];
    return <section className="encyclopedia-card battery-research encyclopedia-research-summary"
        aria-labelledby="battery-research-summary">
        <p className="encyclopedia-kicker">{messages.sourceBackedEntity}</p>
        <h2 id="battery-research-summary">{messages.researchSummary}</h2>
        {loading
            ? <EntityRecordLoading />
            : !record
            ? <p className="encyclopedia-meta">{messages.noResearchSummary}</p>
            : <>
        <p>{record.summary.description}</p>
        <ul className="encyclopedia-list">
            {record.summary.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <dl className="encyclopedia-facts encyclopedia-research-facts">
            <div><dt>{messages.recordStatus}</dt><dd>{record.recordStatus}</dd></div>
            <div><dt>{messages.identityStability}</dt><dd>{record.identity.identityStability}</dd></div>
            <div><dt>{messages.lastUpdated}</dt><dd>{record.updatedAt}</dd></div>
            <div><dt>{messages.researchSources}</dt><dd>{record.sources.length}</dd></div>
        </dl>
        {record.reviews.length > 0 && <section className="battery-research__subsection" aria-labelledby="research-reviews">
            <h3 id="research-reviews">{messages.independentTestReview}</h3>
            {record.reviews.map((review) => <article className="encyclopedia-review" key={review.id}>
                <h4>{review.reviewer}: {review.verdict}</h4>
                <p className="encyclopedia-meta">{messages.reviewed(review.reviewedAt)}</p>
                <p>{review.summary}</p>
                {review.pros && <ul className="encyclopedia-list">
                    {review.pros.map((pro) => <li key={pro}>{pro}</li>)}
                </ul>}
                {review.reservations && <p className="encyclopedia-review__reservation">
                    {messages.limitation}: {review.reservations.join(" ")}
                </p>}
            </article>)}
        </section>}
        {evidenceClaims.length > 0 && <section
            className="battery-research__subsection encyclopedia-research-summary__evidence"
            aria-labelledby="research-evidence">
            <h3 id="research-evidence">{messages.evidenceNotes}</h3>
            <ul className="encyclopedia-claim-list">
                {evidenceClaims.map((claim) => <li key={claim.id}>
                    <p>{claim.statement}</p>
                    <span className="encyclopedia-source-detail">
                        {claim.evidenceDate ? `${messages.evidenceDate}: ${claim.evidenceDate}. ` : ""}
                        {claim.confidence ? `${messages.confidence}: ${claim.confidence}.` : ""}
                    </span>
                </li>)}
            </ul>
        </section>}
            </>}
    </section>;
};

const ModResearchNotes = ({
    record,
    loading,
}: {
    readonly record: ModEntityRecord | undefined;
    readonly loading: boolean;
}): ReactElement => {
    const messages = detailMessages();
    const claims = record?.claims ?? [];
    const highlights = record?.summary.highlights ?? [];
    const lifecycleEvents = record?.lifecycleEvents ?? [];
    const safetyFindings = (record?.safetyFindings ?? []).filter((finding) =>
        finding.title.trim().length > 0 && finding.summary.trim().length > 0,
    );
    const hasResearchContent = Boolean(record?.summary.description || record?.summary.shortDescription)
        || highlights.length > 0
        || claims.length > 0
        || lifecycleEvents.length > 0
        || safetyFindings.length > 0;
    return <section className="encyclopedia-card battery-research encyclopedia-research-summary"
        aria-labelledby="mod-research-summary">
        <p className="encyclopedia-kicker">{messages.sourceBackedEntity}</p>
        <h2 id="mod-research-summary">{messages.researchSummary}</h2>
        {loading
            ? <EntityRecordLoading />
            : !record || !hasResearchContent
            ? <p className="encyclopedia-meta">{messages.noResearchSummary}</p>
            : <>
        {(record.summary.description || record.summary.shortDescription)
            && <p>{record.summary.description ?? record.summary.shortDescription}</p>}
        {highlights.length > 0 && <ul className="encyclopedia-list">
            {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>}
        <dl className="encyclopedia-facts encyclopedia-research-facts">
            <div><dt>{messages.recordStatus}</dt><dd>{record.recordStatus}</dd></div>
            <div><dt>{messages.identityStability}</dt><dd>{record.identity.identityStability}</dd></div>
            <div><dt>{messages.lastUpdated}</dt><dd>{record.updatedAt}</dd></div>
            <div><dt>{messages.researchSources}</dt><dd>{record.sources.length}</dd></div>
        </dl>
        {claims.length > 0 && <section
            className="battery-research__subsection encyclopedia-research-summary__evidence"
            aria-labelledby="mod-research-evidence">
            <h3 id="mod-research-evidence">{messages.evidenceNotes}</h3>
            <ul className="encyclopedia-claim-list">
                {claims.map((claim) => <li key={claim.id}>
                    <p>{claim.statement}</p>
                    <span className="encyclopedia-source-detail">
                        {claim.evidenceDate ? `${messages.evidenceDate}: ${claim.evidenceDate}. ` : ""}
                        {claim.confidence ? `${messages.confidence}: ${claim.confidence}. ` : ""}
                        {claim.limitations ? `${messages.limitation}: ${claim.limitations}` : ""}
                    </span>
                </li>)}
            </ul>
        </section>}
        {lifecycleEvents.length > 0 && <section className="battery-research__subsection" aria-labelledby="mod-research-lifecycle">
            <h3 id="mod-research-lifecycle">{messages.lifecycleEvidence}</h3>
            <ul className="encyclopedia-claim-list">
                {lifecycleEvents.map((event) => <li key={event.id}>
                    <p>{event.summary}</p>
                    <span className="encyclopedia-source-detail">
                        {event.date ? `${messages.date}: ${event.date}. ` : ""}
                        {event.relation ? `${messages.relation}: ${event.relation}. ` : ""}
                        {event.confidence ? `Confidence: ${event.confidence}.` : ""}
                    </span>
                </li>)}
            </ul>
        </section>}
        {safetyFindings.length > 0 && <section className="battery-research__subsection" aria-labelledby="mod-research-safety">
            <h3 id="mod-research-safety">{messages.deviceSafetyNotes}</h3>
            <ul className="encyclopedia-claim-list">
                {safetyFindings.map((finding) => <li key={finding.id}>
                    <p><strong>{finding.title}:</strong> {finding.summary}</p>
                    {finding.appliesTo && <span className="encyclopedia-source-detail">{messages.appliesTo}: {finding.appliesTo}.</span>}
                    {finding.status && <span className="encyclopedia-source-detail">{messages.status}: {finding.status}.</span>}
                </li>)}
            </ul>
        </section>}
            </>}
    </section>;
};

const BatterySources = ({
    record,
    loading,
}: {
    readonly record: BatteryEntityRecord | undefined;
    readonly loading: boolean;
}): ReactElement => {
    const messages = detailMessages();
    return <section className="encyclopedia-card" aria-labelledby="battery-sources">
        <h2 id="battery-sources">{messages.sources}</h2>
        {loading
            ? <EntityRecordLoading />
            : record && record.sources.length > 0
            ? <ul className="encyclopedia-source-list">
                {record.sources.map((source) => <SourceReference key={source.id} source={source} />)}
            </ul>
            : <p className="encyclopedia-meta">{messages.noSourceBackedRecord}</p>}
    </section>;
};

const modsUsingBoard = (board: DefaultMod): readonly DefaultMod[] => {
    const boardProfileIds = new Set(builtInPresets
        .filter(({ slug }) => slug === board.slug)
        .map(({ id }) => id));
    const seenSlugs = new Set<string>();
    return builtInPresets.filter((candidate) => {
        if (
            candidate.basedOnPresetId === undefined
            || !boardProfileIds.has(candidate.basedOnPresetId)
        ) return false;
        if (candidate.slug === undefined || seenSlugs.has(candidate.slug)) return false;
        seenSlugs.add(candidate.slug);
        return true;
    });
};

const BoardImplementations = ({
    board,
    record,
}: {
    readonly board: DefaultMod;
    readonly record: ModEntityRecord | undefined;
}): ReactElement | null => {
    if (record?.entityType !== "control-board") return null;
    const messages = detailMessages();
    const implementations = modsUsingBoard(board);
    return <section className="encyclopedia-card" aria-labelledby="board-implementations">
        <h2 id="board-implementations">{messages.categoryLabels.mods}</h2>
        {implementations.length === 0
            ? <p className="encyclopedia-meta">{messages.unknown}</p>
            : <ul className="encyclopedia-list">
                {implementations.map((implementation) => <li key={implementation.id}>
                    <a href={`./${implementation.slug}`}>{implementation.displayName}</a>
                </li>)}
            </ul>}
    </section>;
};

const ModOperatingFeatures = ({ mod }: { readonly mod: DefaultMod }): ReactElement => {
    const messages = detailMessages();
    const labels = messages.operatingFeatureLabels;
    const fallbackLabels: Readonly<Record<string, string>> = { smartMode: "Smart mode" };
    const supportedModes = modOutputControlModes.filter(
        (mode) => mod.operatingFeatures?.outputModes[mode] === "supported",
    );
    const supportedCapabilities = modAdditionalCapabilities.filter(
        (capability) => mod.operatingFeatures?.capabilities[capability] === "supported",
    );
    const formatModes = (modes: readonly ModOutputControlMode[]): string => modes.length === 0
        ? messages.unknown
        : modes.map((mode) => labels[mode]).join(", ");
    const formatCapabilities = (capabilities: readonly ModAdditionalCapability[]): string =>
        capabilities.length === 0
            ? messages.unknown
            : capabilities.map((capability) => labels[capability] ?? fallbackLabels[capability] ?? capability).join(", ");

    return <section className="encyclopedia-card" aria-labelledby="mod-operating-features">
        <h2 id="mod-operating-features">{messages.supportedModesAndCapabilities}</h2>
        <dl className="encyclopedia-facts">
            <div>
                <dt>{messages.outputControlModes}</dt>
                <dd>{formatModes(supportedModes)}</dd>
            </div>
            <div>
                <dt>{messages.additionalCapabilities}</dt>
                <dd>{formatCapabilities(supportedCapabilities)}</dd>
            </div>
        </dl>
    </section>;
};

const ModSources = ({
    record,
    loading,
}: {
    readonly record: ModEntityRecord | undefined;
    readonly loading: boolean;
}): ReactElement => {
    const messages = detailMessages();
    return <section className="encyclopedia-card" aria-labelledby="mod-sources">
        <h2 id="mod-sources">{messages.sources}</h2>
        {loading
            ? <EntityRecordLoading />
            : record && record.sources.length > 0
            ? <ul className="encyclopedia-source-list">
                {record.sources.map((source) => <SourceReference key={source.id} source={source} />)}
            </ul>
            : <p className="encyclopedia-meta">{messages.noSources}</p>}
    </section>;
};

const BatteryAdditionalDetails = ({
    battery,
    presentation,
    record,
    unresolvedProperties,
}: {
    readonly battery: DefaultBattery;
    readonly presentation: ReturnType<typeof catalogPresentationFor>;
    readonly record: BatteryEntityRecord | undefined;
    readonly unresolvedProperties: readonly MaterialProperty[];
}): ReactElement => {
    const messages = detailMessages();
    const authenticity = record?.domainData.authenticity;
    const isRewrap = isRewrapRecord(record);
    const batteryAccess = battery.batteryAccess ?? record?.domainData.batteryAccess ?? "removable";
    const appearance = battery.appearance ?? record?.domainData.appearance ?? undefined;
    const protectedStatus = battery.protected ?? record?.domainData.protected ?? undefined;
    return <div className="encyclopedia-property-notes battery-property-notes">
        <MaterialPropertyNotes notes={[]} properties={unresolvedProperties} />
        {record?.domainData.chemistry
            ? <p><strong>{messages.chemistry}:</strong> {record.domainData.chemistry}.</p>
            : <p><strong>{messages.chemistry}:</strong> {messages.unknown}. {messages.unknownChemistry}</p>}
        {batteryAccess === "integrated" && <p><strong>{messages.batteryAccess}:</strong> <span>{messages.integratedInMod}</span>.</p>}
        {protectedStatus !== undefined && <p><strong>{messages.protection}:</strong> {
            protectedStatus ? messages.protectedCell : messages.unprotectedCell
        }</p>}
        <p><strong>{isRewrap ? messages.brand : messages.manufacturer}:</strong> {battery.manufacturer}.</p>
        {battery.nominalVoltageVolts !== undefined && <p><strong>{messages.nominalVoltage}:</strong> {
            battery.nominalVoltageVolts} V.</p>}
        <MarketIntroduction introduction={battery.introduction} />
        {appearance?.wrapperColor && <p><strong>{messages.wrapperColor}:</strong> {appearance.wrapperColor}.</p>}
        {appearance?.markings && appearance.markings.length > 0 && <p><strong>{messages.markings}:</strong> {
            appearance.markings.map((marking) => marking.text).join("; ")}.</p>}
        <section className="battery-property-notes__section" aria-labelledby="battery-authenticity">
            <h2 id="battery-authenticity">{messages.authenticityAssessment}</h2>
            {authenticity ? <>
                <p><strong>{messages.status}:</strong> {authenticity.status}; {messages.confidence.toLowerCase()}: {
                    authenticity.confidence}.</p>
                <p>{authenticity.summary ?? messages.unknownAuthenticitySummary}</p>
                {authenticity.checks && authenticity.checks.length > 0 && <ul className="encyclopedia-list">
                    {authenticity.checks.map((check) => <li key={check}>{check}</li>)}
                </ul>}
            </> : <p>{messages.noAuthenticityAssessment}</p>}
        </section>
        {(presentation.notes?.[0] ?? battery.dataNote) && <p><strong>{messages.catalogNote}:</strong> {
            presentation.notes?.[0] ?? battery.dataNote}</p>}
    </div>;
};

type ModEncyclopediaImage = {
    readonly src: string;
    readonly alt: string;
    readonly caption: string;
    readonly sourceTitle: string;
    readonly sourceUrl: string;
};

const modEncyclopediaImages: Readonly<Record<string, ModEncyclopediaImage>> = {
    "ego-twist": {
        src: egoTwistImage,
        alt: "eGo electronic cigarette battery",
        caption: "Representative eGo-family battery; the image does not establish the Twist variant.",
        sourceTitle: "eGo battery",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:E-Cig_eGo_battery_%2824380734523%29.jpg",
    },
    "eleaf-istick-50w": {
        src: eleafIstick50wImage,
        alt: "Eleaf iStick 50W box mod",
        caption: "Eleaf iStick 50W box mod.",
        sourceTitle: "Eleaf iStick 50W",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Eleaf_Istick_50w_E_Cigarette_-_Box_Mod_-_Vaporizer_-_Vape_Mod_%2816721884182%29.jpg",
    },
    "joyetech-evic-vt": {
        src: joyetechEvicVtImage,
        alt: "Joyetech eVic-VTC mod with tank",
        caption: "Joyetech eVic-VTC family device.",
        sourceTitle: "eVic-VTC",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:EVic-VTC_with_Billow_2_Tank.jpg",
    },
    "sigelei-mini": {
        src: sigeleiMiniImage,
        alt: "Sigelei Mini Book Kit",
        caption: "Sigelei Mini Book Kit.",
        sourceTitle: "Sigelei Mini Book Kit",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:2017_Mod_Siegelei_Mini_Book_Kit_1.jpg",
    },
    "smok-g-priv-220w": {
        src: smokGPriv220wImage,
        alt: "SMOK G-Priv 220W touchscreen mod",
        caption: "SMOK G-Priv 220W box mod.",
        sourceTitle: "SMOK G-Priv 220W",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Smok-g-priv-220w-touch-screen-mod.jpg",
    },
    "vamo-v1-v2-v3-v5": {
        src: vamoV5Image,
        alt: "Vamo V5 regulated mod",
        caption: "Vamo V5, representative of the Vamo V1–V5 family.",
        sourceTitle: "Vamo V5",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Vamo_V5.jpg",
    },
    "wismec-reuleaux-rx200s-4-10": {
        src: wismecReuleauxRxImage,
        alt: "Wismec Reuleaux RX 2/3 vape mod with tank",
        caption: "Related Wismec Reuleaux family reference; the image does not establish the RX200S 4.10 variant.",
        sourceTitle: "Wismec Reuleaux RX 2/3",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:2016_E-papieros_mod_1.jpg",
    },
};

const ModImages = ({ slug }: { readonly slug?: string }): ReactElement | null => {
    const messages = detailMessages();
    const image = slug === undefined ? undefined : modEncyclopediaImages[slug];
    if (!image) return null;
    return <section className="encyclopedia-card material-images" aria-labelledby="mod-images">
        <h2 id="mod-images">{messages.appearance}</h2>
        <div className="material-images__grid">
            <figure className="material-image">
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.caption} {messages.source}: <a href={image.sourceUrl} target="_blank"
                    rel="nofollow noreferrer">{image.sourceTitle}</a>.</figcaption>
            </figure>
        </div>
    </section>;
};

const ModPowerCurve = ({ mod }: { readonly mod: DefaultMod }): ReactElement => {
    const messages = detailMessages();
    const [response, setResponse] = useState<ModRangeApiResponse>();

    useEffect(() => {
        let active = true;
        setResponse(undefined);
        void calculateModRangeFromApi(limitsFromPreset(mod)).then((next) => {
            if (active) setResponse(next);
        }).catch(() => {
            // The shared request client reports the failure to BackendErrorBoundary.
        });
        return () => {
            active = false;
        };
    }, [mod]);

    if (response === undefined) return <p className="encyclopedia-meta">{messages.loadingPowerCurve}</p>;
    if (response.graph !== null) return <ModRangeGraph graph={response.graph} variant="encyclopedia" />;
    return <PowerCurveUnavailable message={response.calculation.kind === "invalid"
        ? response.calculation.message
        : messages.noUsableResistanceRange} />;
};

const ModEntry = ({
    entity,
    record,
    loading,
}: {
    readonly entity: ModCatalogEntity;
    readonly record: ModEntityRecord | undefined;
    readonly loading: boolean;
}): ReactElement => {
    const { mod, profiles } = entity;
    const messages = detailMessages();
    const locale = pageLocale();
    const modComparisonMessages = comparisonMessagesFor(locale).mods;
    const comparisonMetadata = routeMetadataFor(locale, "/compare/mods")!;
    const presentation = catalogPresentationFor(locale, "mods", mod.id);
    const description = profiles.length === 1
        ? presentation.description
        : modTextTranslations[locale]["mod.profile.regulated"](mod.displayName);
    const relation = relationForMod(mod.slug ?? "");
    const battery = findOptionalBySlug(batteryPresets, relation?.batterySlug);
    const board = mod.basedOnPresetId
        ? builtInPresets.find((candidate) => candidate.id === mod.basedOnPresetId)
        : undefined;
    const resistanceRange = mod.minimumAtomizerResistanceOhms !== undefined
        || mod.maximumAtomizerResistanceOhms !== undefined
        ? `${formatNumber(mod.minimumAtomizerResistanceOhms)}–${formatNumber(mod.maximumAtomizerResistanceOhms)}`
        : messages.unknown;
    const batteryConfiguration = mod.batteryConfigurations?.map((configuration) => {
        const topology = configuration.seriesCount === null || configuration.parallelCount === null
            ? messages.unknown
            : `${configuration.seriesCount}S${configuration.parallelCount}P`;
        const format = configuration.format === "integrated"
            ? messages.integratedInMod
            : configuration.format;
        const capacity = configuration.manufacturerClaimedCapacityMah === undefined
            ? []
            : [`${configuration.manufacturerClaimedCapacityMah} mAh`];
        return [topology, format, ...capacity].join(" · ");
    }).join(" / ");
    const batteryInput = mod.supportedBatteryInputs?.[0];
    const inputVoltages = batteryInput ? [
        [messages.propertyLabels.minimumInputVoltage, batteryInput.minimumInputVoltageVolts],
        [messages.propertyLabels.typicalInputVoltage, batteryInput.typicalInputVoltageVolts],
        [messages.propertyLabels.maximumInputVoltage, batteryInput.maximumInputVoltageVolts],
    ] as const : [];
    const properties: MaterialProperty[] = [
        { label: messages.propertyLabels.maximumPower, value: String(mod.maximumOutputPowerWatts), unit: "W" },
        { label: messages.propertyLabels.maximumVoltage, value: String(mod.maximumOutputVoltageVolts), unit: "V" },
        { label: messages.propertyLabels.maximumCurrent, value: String(mod.maximumOutputCurrentAmps), unit: "A" },
        { label: messages.propertyLabels.resistanceRange, value: resistanceRange, unit: "Ω" },
        ...(board ? [{
            label: messages.propertyLabels.boardController,
            value: board.displayName,
            ...(board.slug ? { href: `./${board.slug}` } : {}),
        }] : []),
        weightProperty(messagesFor(pageLocale()).catalogEditor.weightGrams,
            mod.weightGrams ?? record?.domainData?.weightGrams,
            messages.unknown, messages.unknownPropertyValue),
    ];
    const powerCurve = <ModPowerCurve mod={mod} />;
    return <>
        <p className="encyclopedia-kicker">{messages.modBoardCatalog}</p>
        <h1>{mod.displayName}</h1>
        <p className="encyclopedia-lead">{description}</p>
        <ModEntityCalculatorVisibility ids={profiles.map((profile) => profile.id)} label={mod.displayName} />
        {mod.slug && <p><a href={`${localizedRoute(locale, "/compare/mods")}?a=${
            encodeURIComponent(mod.slug)}`}>{comparisonMetadata.title}</a></p>}
        <div className="encyclopedia-entry-layout">
            <div className="encyclopedia-entry-main">
                <section className="encyclopedia-card material-context" aria-labelledby="mod-overview">
                    <h2 id="mod-overview">{messages.overview}</h2>
                    <p>{description}</p>
                </section>
                <ModImages slug={mod.slug} />
                {powerCurve}
                {battery?.slug && <RelatedEntry headingId="mod-related-battery"
                    description={messages.nonRemovableBatteryProfile}
                    href={`../${catalogCategoryRouteSegments.batteries}/${battery.slug}`}
                    label={battery.displayName} />}
                {board?.slug && <RelatedEntry headingId="mod-related-board"
                    description={messages.basedOnBoardProfile}
                    href={`./${board.slug}`} label={board.displayName} />}
            </div>
            <aside className="encyclopedia-entry-sidebar" aria-label={messages.propertyLabels.boardController}>
                <section className="encyclopedia-card" aria-labelledby="mod-properties">
                    <h2 id="mod-properties">{messages.properties}</h2>
                    <MaterialPropertyTable properties={properties} emphasizeFirst />
                    {batteryConfiguration && <p>
                        <strong>{modComparisonMessages.batteryConfiguration}:</strong> {batteryConfiguration}.
                    </p>}
                    {inputVoltages.map(([label, voltage]) => voltage === null ? null : <p key={label}>
                        <strong>{label}:</strong> {formatLocalizedNumber(voltage)} V.
                    </p>)}
                    <MarketIntroduction introduction={mod.introduction} />
                    <InlineMetadata aliases={mod.aliases} />
                </section>
            </aside>
        </div>
        <div className="encyclopedia-entry-full">
            <AdPlacement placement="catalog-mod-inline" />
            <BoardImplementations board={mod} record={record} />
            <ModOperatingFeatures mod={mod} />
            <ModResearchNotes record={record} loading={loading} />
            <ModSources record={record} loading={loading} />
        </div>
    </>;
};

const BatteryEntry = ({
    battery,
    record,
    loading,
}: {
    readonly battery: DefaultBattery;
    readonly record: BatteryEntityRecord | undefined;
    readonly loading: boolean;
}): ReactElement => {
    const messages = detailMessages();
    const locale = pageLocale();
    const comparisonMessages = comparisonMessagesFor(locale).batteries;
    const batteryCalculatorTitle = calculatorMessagesFor(locale).batt.title;
    const presentation = catalogPresentationFor(locale, "batteries", battery.id);
    const showAgeWarning = isBatteryOldOrUndated(battery);
    const showUnknownIntroductionNotice = hasUnknownMarketIntroduction(battery);
    const weightGrams = battery.weightGrams ?? record?.domainData.weightGrams;
    const primaryProperties: MaterialProperty[] = [
        { label: messages.propertyLabels.ratedCapacity, value: String(battery.ratedCapacityMah), unit: "mAh" },
        battery.continuousDischargeCurrentAmps !== undefined
            ? { label: messages.propertyLabels.continuousDischarge, value: String(battery.continuousDischargeCurrentAmps), unit: "A" }
            : battery.continuousDischargeCRating !== undefined
                ? { label: messages.propertyLabels.continuousDischarge, value: String(battery.continuousDischargeCRating), unit: "C" }
                : {
                    label: messages.propertyLabels.continuousDischarge,
                    value: messages.unknown,
                    note: messages.unknownPropertyValue,
                },
        ...batteryFormFactorProperties(battery, record),
        weightProperty(messagesFor(pageLocale()).catalogEditor.weightGrams, weightGrams, messages.unknown,
            messages.unknownPropertyValue),
    ];
    const tableProperties = primaryProperties.filter((property) => property.value !== messages.unknown);
    const unresolvedProperties = primaryProperties.filter((property) => property.value === messages.unknown);
    const relation = relationForBattery(battery.slug ?? "");
    const mod = findOptionalBySlug(builtInPresets, relation?.modSlug);
    return <>
        <p className="encyclopedia-kicker">{messages.batteryCatalog}</p>
        <h1>{presentation.displayName}</h1>
        <p className="encyclopedia-lead">{presentation.description}</p>
        {battery.slug && <nav className="encyclopedia-entry-actions" aria-label={presentation.displayName}>
            <a className="se-button encyclopedia-entry-actions__primary"
                href={`${localizedRoute(locale, "/batt")}?battery=${encodeURIComponent(battery.slug)}`}>
                {locale === "en" ? "Use in Battery drain" : batteryCalculatorTitle} →
            </a>
            <a href={`${localizedRoute(locale, "/compare/batteries")}?a=${encodeURIComponent(battery.slug)}`}>
                {comparisonMessages.compareTitle}
            </a>
        </nav>}
        <EntryCalculatorVisibility category="batteries" id={battery.id} label={presentation.displayName} />
        <div className="encyclopedia-entry-layout">
            <div className="encyclopedia-entry-main">
                <section className="encyclopedia-card material-context" aria-labelledby="battery-overview">
                    <h2 id="battery-overview">{messages.overview}</h2>
                    <p>{locale === "nb"
                        ? presentation.summary
                        : record?.summary.shortDescription ?? record?.summary.description ?? battery.description
                            ?? presentation.summary}</p>
                </section>
                <BatteryImages slug={battery.slug} />
                <section className="encyclopedia-card material-context" aria-labelledby="battery-vaping">
                    <h2 id="battery-vaping">{messages.inVaping}</h2>
                    {showAgeWarning && <p className="encyclopedia-warning">
                        {showUnknownIntroductionNotice
                            ? messages.unknownBatteryIntroductionNotice
                            : messages.oldBatteryWarning}
                    </p>}
                    <p><BatteryVapingContext battery={battery} record={record} /></p>
                    {mod?.slug && <RelatedEntry description={messages.builtIntoModProfile}
                        href={`../${catalogCategoryRouteSegments.mods}/${mod.slug}`}
                        label={mod.displayName} />}
                </section>
                    <BatterySafety battery={battery} presentation={presentation} record={record} />
            </div>
            <aside className="encyclopedia-entry-sidebar" aria-label={messages.property}>
                <section className="encyclopedia-card" aria-labelledby="battery-properties">
                    <h2 id="battery-properties">{messages.properties}</h2>
                    <MaterialPropertyTable properties={tableProperties} emphasizeFirst />
                </section>
                <BatteryAdditionalDetails battery={battery} presentation={presentation} record={record}
                    unresolvedProperties={unresolvedProperties} />
            </aside>
        </div>
        <div className="encyclopedia-entry-full">
            <AdPlacement placement="catalog-battery-inline" />
            <BatteryResearchNotes record={record} loading={loading} />
            <BatterySources record={record} loading={loading} />
        </div>
    </>;
};

const LegacyMaterialEntry = ({ material }: { readonly material: DefaultMaterial }): ReactElement => {
    const messages = detailMessages();
    const locale = pageLocale();
    const comparisonMetadata = routeMetadataFor(locale, "/compare/materials")!;
    const presentation = catalogPresentationFor(locale, "materials", material.id);
    return <>
        <p className="encyclopedia-kicker">{messages.materialCatalog}</p>
        <h1>{presentation.displayName}</h1>
        <p className="encyclopedia-lead">{presentation.description}</p>
        <EntryCalculatorVisibility category="materials" id={material.id} label={presentation.displayName} />
        {material.slug && <p><a href={`${localizedRoute(locale, "/compare/materials")}?a=${
            encodeURIComponent(material.slug)}`}>{comparisonMetadata.title}</a></p>}
        <section className="encyclopedia-card" aria-labelledby="material-properties">
            <h2 id="material-properties">{messages.properties}</h2>
            <dl className="encyclopedia-facts">
                <div><dt>{messages.propertyLabels.resistivity}</dt><dd>{material.resistivity} Ω·mm²/m</dd></div>
                <div><dt>{messages.propertyLabels.specificHeatCapacity}</dt><dd>{formatNumber(material.heatCapacity)} J/(g·K)</dd></div>
                <div><dt>{messages.propertyLabels.density}</dt><dd>{formatNumber(material.density)} g/cm³</dd></div>
                <div><dt>{messages.propertyLabels.temperatureModel}</dt><dd>{material.tfr
                    ? messages.propertyLabels.fullResistanceCurve
                    : `TCR ${formatNumber(material.tcr)}`}</dd></div>
            </dl>
        </section>
        <Metadata aliases={material.aliases} description={presentation.description} />
    </>;
};

const MaterialEntry = ({ material }: { readonly material: DefaultMaterial }): ReactElement => {
    const messages = detailMessages();
    const locale = pageLocale();
    const comparisonMetadata = routeMetadataFor(locale, "/compare/materials")!;
    const presentation = catalogPresentationFor(locale, "materials", material.id);
    const record = materialEncyclopediaRecordFor(material);
    const primaryProperties: MaterialProperty[] = [
        { label: messages.propertyLabels.resistivity, value: material.resistivity.toString(), unit: "µΩ·m" },
        material.tfr
            ? { label: messages.propertyLabels.temperatureModel, value: messages.propertyLabels.fullResistanceCurve }
            : material.tcr !== undefined
                ? { label: messages.propertyLabels.temperatureCoefficient, value: String(material.tcr * 1_000_000), unit: "ppm/K" }
                : { label: messages.propertyLabels.temperatureModel, value: messages.unknown },
        {
            label: messages.propertyLabels.specificHeatCapacity,
            value: material.heatCapacity === null ? messages.unknown : String(material.heatCapacity * 1000),
            unit: material.heatCapacity === null ? undefined : "J/(kg·K)",
        },
        ...(record.maxRecommendedVapingTemperatureCelsius === undefined ? [] : [{
            label: messages.propertyLabels.maximumRecommendedTemperature,
            value: String(record.maxRecommendedVapingTemperatureCelsius),
            unit: "°C" as const,
        }]),
        ...(record.practicalProperties ?? []),
    ];
    const secondaryProperties: MaterialProperty[] = [
        {
            label: messages.propertyLabels.density,
            value: material.density === null ? messages.unknown : String(material.density * 1000),
            unit: material.density === null ? undefined : "kg/m³",
        },
        ...(material.meltingPoint === null ? [] : [{
            label: messages.propertyLabels.meltingPoint,
            value: String(material.meltingPoint),
            unit: "°C" as const,
        }]),
        ...record.secondaryProperties,
    ];
    const tablePrimaryProperties = primaryProperties.filter((property) => property.value !== messages.unknown);
    const tableSecondaryProperties = secondaryProperties.filter((property) => property.value !== messages.unknown);
    const additionalPropertyNotes = [...primaryProperties, ...secondaryProperties]
        .filter((property) => property.value === messages.unknown);
    const hasSpecificSafetyNote = Boolean(record.safetyNote)
        && record.safetyNoteScope === "vaping-specific";
    return <>
        <p className="encyclopedia-kicker">{messages.materialCatalog}</p>
        <h1>{presentation.displayName}</h1>
        <p className="encyclopedia-lead">{presentation.description}</p>
        <EntryCalculatorVisibility category="materials" id={material.id} label={presentation.displayName} />
        {material.slug && <p><a href={`${localizedRoute(locale, "/compare/materials")}?a=${
            encodeURIComponent(material.slug)}`}>{comparisonMetadata.title}</a></p>}
        <div className="encyclopedia-entry-layout">
            <div className="encyclopedia-entry-main">
        <section className="encyclopedia-card material-context" aria-labelledby="material-overview">
            <h2 id="material-overview">{messages.overview}</h2>
            <p>{locale === "nb" ? presentation.description : record.overview}</p>
        </section>
        <MaterialImages images={record.images} sources={record.sources} />
        <section className="encyclopedia-card material-context" aria-labelledby="material-vaping">
            <h2 id="material-vaping">{messages.inVaping}</h2>
            <p>{locale === "nb" ? presentation.summary : record.vapingContext}</p>
        </section>
        {hasSpecificSafetyNote && <section className="encyclopedia-card material-safety" aria-labelledby="material-safety">
            <h2 id="material-safety">{messages.materialSpecificLimitations}</h2>
            <p>{locale === "nb" ? presentation.safetyText : record.safetyNote}</p>
        </section>}
            </div>
            <aside className="encyclopedia-entry-sidebar" aria-label={messages.property}>
        <section className="encyclopedia-card" aria-labelledby="material-primary-properties">
            <h2 id="material-primary-properties">{messages.properties}</h2>
            <MaterialPropertyTable properties={tablePrimaryProperties} emphasizeFirst />
        </section>
        <section className="encyclopedia-card encyclopedia-card--muted" aria-label={messages.secondaryProperties}>
            <MaterialPropertyTable properties={tableSecondaryProperties} muted />
        </section>
        <MaterialPropertyNotes notes={record.propertyNotes ?? []} properties={additionalPropertyNotes} />
            </aside>
        </div>
        <div className="encyclopedia-entry-full">
        <MaterialTfrTable material={material} />
        <AdPlacement placement="catalog-material-inline" />
        <MaterialResearchNotes record={record} />
        <Metadata aliases={material.aliases} description={presentation.description} />
        <section className="encyclopedia-card" aria-labelledby="material-sources">
            <h2 id="material-sources">{messages.sources}</h2>
            {record.sources.length > 0
                ? <ul className="encyclopedia-source-list">
                    {record.sources.map((source) => <MaterialSourceReference key={source.id} source={source} />)}
                </ul>
                : <p className="encyclopedia-meta">{messages.noMaterialSources}</p>}
        </section>
        </div>
    </>;
};

const ConceptEntry = ({ concept }: { readonly concept: Concept }): ReactElement => {
    const messages = detailMessages();
    const presentation = catalogPresentationFor(pageLocale(), "concepts", concept.id);
    const sections = presentation.sections ?? concept.sections;
    return <>
    <p className="encyclopedia-kicker">{messages.categoryLabels.concepts}</p>
    <h1>{presentation.displayName}</h1>
    <p className="encyclopedia-lead">{presentation.description}</p>
    <div className="encyclopedia-entry-full concept-entry-full">
        {sections.map((section) => <section className="encyclopedia-card concept-section"
            aria-labelledby={`concept-${section.id}`} key={section.id}>
            <h2 id={`concept-${section.id}`}>{section.title}</h2>
            {section.paragraphs?.map((paragraph, index) => <p key={`${section.id}-paragraph-${index}`}>{paragraph}</p>)}
            {section.formulas?.map((formula, index) => <div className="concept-formula" key={`${section.id}-formula-${index}`}>
                <code>{formula.expression}</code>
                {formula.explanation && <span>{formula.explanation}</span>}
            </div>)}
            {section.bullets && <ul className="encyclopedia-list">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>}
            {section.table && <div className="encyclopedia-table-wrapper">
                <table className="encyclopedia-property-table concept-table">
                    <thead><tr>{section.table.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
                    <tbody>{section.table.rows.map((row, rowIndex) => <tr key={`${section.id}-row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => cellIndex === 0
                            ? <th scope="row" key={`${section.id}-${rowIndex}-${cellIndex}`}>{cell}</th>
                            : <td key={`${section.id}-${rowIndex}-${cellIndex}`}>{cell}</td>)}
                    </tr>)}</tbody>
                </table>
            </div>}
            {section.examples?.map((example) => <div className="concept-example" key={example.title}>
                <h3>{example.title}</h3>
                <p>{example.setup}</p>
                {example.formulas.map((formula) => <div className="concept-formula concept-formula--example" key={formula}>
                    <code>{formula}</code>
                </div>)}
                <p>{example.conclusion}</p>
            </div>)}
        </section>)}
        <AdPlacement placement="catalog-concept-inline" />
        <p className="encyclopedia-meta concept-source">{messages.basedOnArticle}. {presentation.wikipediaUrl && <>
                {messages.seeAlso} <a href={presentation.wikipediaUrl} target="_blank" rel="nofollow noreferrer">
                    {messages.wikipedia}
                </a>.
            </>}</p>
    </div>
</>;
};

export const EncyclopediaPage = ({ category, slug }: EncyclopediaProps): ReactElement => {
    const locale = pageLocale();
    const messages = messagesFor(locale).encyclopediaDetail;
    const concept = category === "concepts" ? findBySlug(concepts, slug) : undefined;
    const modEntity = category === "mods" ? modCatalogEntityForSlug(slug) : undefined;
    if (category === "mods" && modEntity === undefined) throw new Error(`No encyclopedia item found for ${slug}`);
    const mod = modEntity?.mod;
    const battery = category === "batteries" ? findBySlug(batteryPresets, slug) : undefined;
    const material = category === "materials" ? findBySlug(materials, slug) : undefined;
    const entityRecordCategory = category === "mods" || category === "batteries" ? category : undefined;
    const entityRecordId = mod?.id ?? battery?.id;
    const entityRecordState = useEntityRecord(entityRecordCategory, entityRecordId);
    const content = category === "concepts"
        ? <ConceptEntry concept={concept!} />
        : category === "mods"
            ? <ModEntry entity={modEntity!} record={entityRecordState.record as ModEntityRecord | undefined}
                loading={entityRecordState.loading} />
            : category === "batteries"
                ? <BatteryEntry battery={battery!} record={entityRecordState.record as BatteryEntityRecord | undefined}
                    loading={entityRecordState.loading} />
                : <MaterialEntry material={material!} />;
    const label = messages.categoryLabels[category];
    const entryId = concept?.id ?? mod?.id ?? battery?.id ?? material?.id;
    const entryTitle = mod?.displayName ?? catalogPresentationFor(locale, category, entryId!).displayName;

    const rootHref = localizedRootHref(locale);

    return <SiteLayout basePath="../../" className="encyclopedia-page" currentRoute="catalog" rootHref={rootHref}>
        <main className="page-content encyclopedia-content">
            <Breadcrumbs label={messages.breadcrumb} items={[
                { label: "Steam Engine", href: rootHref },
                { label: messagesFor(locale).encyclopedia.title, href: "../../catalog" },
                { label, href: `../../catalog#${category}` },
                { label: entryTitle },
            ]} />
            <article className="encyclopedia-entry">{content}</article>
        </main>
    </SiteLayout>;
};
