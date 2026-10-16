import { useEffect, useMemo, useState, useSyncExternalStore, type ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { batteryPresets } from "../../catalogs/batteries/defaults";
import { createBatteryRepository } from "../../catalogs/batteries/repository";
import { concepts } from "../../catalogs/concepts/catalog";
import { builtInPresets } from "../../catalogs/mods/presets";
import { modCatalogEntities } from "../../catalogs/mods/entities";
import { createModRepository } from "../../catalogs/mods/repository";
import { materials } from "../../catalogs/materials/catalog";
import { createMaterialRepository } from "../../catalogs/materials/repository";
import type { DefaultBattery } from "../../catalogs/batteries/catalog";
import type { DefaultMaterial } from "../../catalogs/materials/catalog";
import type { DefaultMod } from "../../catalogs/mods/catalog";
import type { CatalogIntroduction } from "../../catalogs/entry-metadata";
import { materialEncyclopediaRecordFor } from "../../catalogs/materials/encyclopedia";
import "../../shared/styles/foundation.css";
import { SiteLayout } from "../../shared/ui/site-layout";
import { withoutTrailingSlash } from "../../shared/ui/site-navigation";
import { catalogPresentationFor, modTextTranslations } from "../../i18n/catalog-presentations";
import { messagesFor } from "../../i18n/messages";
import { comparisonMessagesFor } from "../../i18n/comparison-messages";
import { localizedRoute, routeMetadataFor } from "../../i18n/locales";
import { localizedRootHref, pageLocale } from "../../i18n/page-locale";
import { CalculatorVisibility } from "./calculator-visibility";
import { fuzzyCatalogMatch } from "./catalog-search";
import { catalogCategoryPath, type CatalogCategory } from "./routes";
import "./encyclopedia.css";

export type EncyclopediaCategory = "all" | CatalogCategory;

type EncyclopediaEntry = {
    readonly category: Exclude<EncyclopediaCategory, "all">;
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly aliases: readonly string[];
    readonly profileIds?: readonly string[];
    readonly description?: string;
    readonly summary: string;
    readonly introduction?: CatalogIntroduction | null;
};

type CategorySummary = {
    readonly id: Exclude<EncyclopediaCategory, "all">;
    readonly label: string;
};

const titleForMod = (mod: DefaultMod): string => mod.displayName;
const titleForBattery = (battery: DefaultBattery): string => battery.displayName;
const titleForMaterial = (material: DefaultMaterial): string => material.name;
const titleForConcept = (concept: (typeof concepts)[number]): string => concept.title;

const firstSentence = (value: string): string => value.match(/^[\s\S]*?[.!?](?:\s|$)/)?.[0].trim() ?? value;

const conciseSummary = (value: string): string => {
    const sentence = firstSentence(value);
    const directForm = sentence.replace(/^This is\s+/i, "");
    return directForm === sentence
        ? sentence
        : `${directForm.charAt(0).toUpperCase()}${directForm.slice(1)}`;
};

const batteryVapingSummary = (battery: DefaultBattery): string => conciseSummary(
    battery.batteryAccess === "integrated"
        ? "An internal battery pack in the device rather than a user-replaceable cell."
        : "A removable rechargeable cell used in compatible devices.",
);

const modSummary = (mod: DefaultMod): string => conciseSummary(
    mod.description ?? `A regulated vaping device profile for ${mod.displayName}.`,
);

const introductionDateTime = (value: string): number => {
    const [year, month = 1, day = 1] = value.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
};

export const introductionSortTime = (introduction?: CatalogIntroduction | null): number | null => {
    if (!introduction?.earliest && !introduction?.latest) return null;
    if (introduction.earliest && introduction.latest) {
        return (introductionDateTime(introduction.earliest.date)
            + introductionDateTime(introduction.latest.date)) / 2;
    }
    const date = introduction.earliest?.date ?? introduction.latest!.date;
    return introductionDateTime(date);
};

const categoryOrder: Readonly<Record<EncyclopediaEntry["category"], number>> = {
    concepts: 0,
    batteries: 1,
    materials: 2,
    mods: 3,
};

const catalogEntries: readonly EncyclopediaEntry[] = [
    ...concepts.map((concept) => ({
        category: "concepts" as const,
        id: concept.id,
        slug: concept.slug,
        title: titleForConcept(concept),
        aliases: [],
        summary: concept.summary,
    })),
    ...batteryPresets.flatMap((battery) => battery.slug ? [{
        category: "batteries" as const,
        id: battery.id,
        slug: battery.slug,
        title: titleForBattery(battery),
        aliases: battery.aliases ?? [],
        description: battery.description,
        summary: batteryVapingSummary(battery),
        introduction: battery.introduction,
    }] : []),
    ...materials.flatMap((material) => material.slug ? [{
        category: "materials" as const,
        id: material.id,
        slug: material.slug,
        title: titleForMaterial(material),
        aliases: material.aliases ?? [],
        description: material.description,
        summary: conciseSummary(materialEncyclopediaRecordFor(material).vapingContext
            || materialEncyclopediaRecordFor(material).overview),
    }] : []),
    ...modCatalogEntities.map(({ mod, profiles, slug }) => ({
        category: "mods" as const,
        id: mod.id,
        slug,
        title: titleForMod(mod),
        aliases: mod.aliases ?? [],
        profileIds: profiles.map((profile) => profile.id),
        description: mod.description,
        summary: modSummary(mod),
        introduction: mod.introduction,
    })),
];

const entries: readonly EncyclopediaEntry[] = [
    ...new Map(catalogEntries.map((entry) => [`${entry.category}-${entry.slug}`, entry])).values(),
].sort((left, right) => {
    if (left.category !== right.category) {
        return categoryOrder[left.category] - categoryOrder[right.category];
    }

    if (left.category === "materials") return left.title.localeCompare(right.title);

    const leftTime = introductionSortTime(left.introduction);
    const rightTime = introductionSortTime(right.introduction);
    if (leftTime === null && rightTime === null) return left.title.localeCompare(right.title);
    if (leftTime === null) return 1;
    if (rightTime === null) return -1;
    return rightTime - leftTime || left.title.localeCompare(right.title);
});

const localizedEntriesFor = (
    locale: ReturnType<typeof pageLocale>,
): readonly EncyclopediaEntry[] => entries.map((entry) => {
    const presentation = catalogPresentationFor(locale, entry.category, entry.id);
    if (entry.category === "mods" && (entry.profileIds?.length ?? 0) > 1) {
        const profilePresentations = entry.profileIds!.map((id) => catalogPresentationFor(locale, "mods", id));
        const description = modTextTranslations[locale]["mod.profile.regulated"](entry.title);
        return {
            ...entry,
            aliases: [...new Set([
                ...entry.aliases,
                ...profilePresentations.flatMap((profile) => [
                    profile.displayName,
                    profile.description ?? "",
                    profile.summary ?? "",
                ]),
            ])],
            description,
            summary: description,
        };
    }
    return {
        ...entry,
        title: presentation.displayName,
        description: presentation.description,
        summary: presentation.summary ?? entry.summary,
    };
});

const categorySummaries: readonly CategorySummary[] = [
    {
        id: "concepts",
        label: "Concepts",
    },
    {
        id: "batteries",
        label: "Batteries",
    },
    {
        id: "materials",
        label: "Materials",
    },
    {
        id: "mods",
        label: "Mods and boards",
    },
];

const categoryFromHash = (hash: string): EncyclopediaCategory => {
    const value = hash.replace(/^#/, "");
    return categorySummaries.some((category) => category.id === value)
        ? value as Exclude<EncyclopediaCategory, "all">
        : "all";
};

const replaceCategoryFragment = (category: EncyclopediaCategory): void => {
    const url = new URL(window.location.href);
    url.hash = category === "all" ? "" : category;
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
};

const entryHref = (entry: EncyclopediaEntry): string => withoutTrailingSlash(
    `./${catalogCategoryPath(entry.category)}/${entry.slug}`,
);

const matchesEntry = (entry: EncyclopediaEntry, query: string): boolean => {
    return fuzzyCatalogMatch([
        entry.title,
        entry.slug,
        ...entry.aliases,
        entry.description ?? "",
        entry.summary,
    ], query);
};

export const EncyclopediaHub = (): ReactElement => {
    const locale = pageLocale();
    const messages = messagesFor(locale).encyclopedia;
    const comparisonMessages = comparisonMessagesFor(locale).batteries;
    const materialComparisonMetadata = routeMetadataFor(locale, "/compare/materials")!;
    const modComparisonMetadata = routeMetadataFor(locale, "/compare/mods")!;
    const localizedEntries = useMemo(() => localizedEntriesFor(locale), [locale]);
    const categories = categorySummaries.map((category) => ({
        ...category,
        label: messages.categoryLabels[category.id],
    }));
    const [category, setCategory] = useState<EncyclopediaCategory>(() =>
        typeof window === "undefined" ? "all" : categoryFromHash(window.location.hash));
    const [query, setQuery] = useState("");
    const repositories = useMemo(() => ({
        batteries: createBatteryRepository(),
        materials: createMaterialRepository(),
        mods: createModRepository(),
    }), []);
    useEffect(() => () => {
        repositories.batteries.dispose();
        repositories.materials.dispose();
        repositories.mods.dispose();
    }, [repositories]);
    useEffect(() => {
        replaceCategoryFragment(category);
    }, [category]);
    useEffect(() => {
        const handleHashChange = (): void => setCategory(categoryFromHash(window.location.hash));
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);
    const batterySnapshot = useSyncExternalStore(
        repositories.batteries.subscribe,
        repositories.batteries.getSnapshot,
        repositories.batteries.getSnapshot,
    );
    const materialSnapshot = useSyncExternalStore(
        repositories.materials.subscribe,
        repositories.materials.getSnapshot,
        repositories.materials.getSnapshot,
    );
    const modSnapshot = useSyncExternalStore(
        repositories.mods.subscribe,
        repositories.mods.getSnapshot,
        repositories.mods.getSnapshot,
    );
    const filteredEntries = useMemo(() => localizedEntries.filter((entry) =>
        (category === "all" || entry.category === category) && matchesEntry(entry, query)),
    [category, localizedEntries, query]);
    const visibilityFor = (entry: EncyclopediaEntry): boolean => {
        if (entry.category === "concepts") return true;
        if (entry.category === "batteries") return !batterySnapshot.hiddenDefaultBatteryIds.has(entry.id);
        if (entry.category === "materials") return !materialSnapshot.hiddenDefaultMaterialIds.has(entry.id);
        return (entry.profileIds ?? [entry.id]).every((id) => !modSnapshot.hiddenDefaultModIds.has(id));
    };
    const setVisibilityFor = (entry: EncyclopediaEntry, visible: boolean): void => {
        if (entry.category === "concepts") return;
        if (entry.category === "batteries") repositories.batteries.setDefaultVisible(entry.id, visible);
        else if (entry.category === "materials") repositories.materials.setDefaultVisible(entry.id, visible);
        else (entry.profileIds ?? [entry.id]).forEach((id) => repositories.mods.setDefaultVisible(id, visible));
    };

    return <SiteLayout
        adPlacement="catalog-index-footer"
        basePath="./"
        className="encyclopedia-hub-page"
        currentRoute="catalog"
        rootHref={localizedRootHref(locale)}
    >
        <main className="page-content encyclopedia-hub-content">
            <section className="encyclopedia-hero" aria-labelledby="encyclopedia-title">
                <p className="encyclopedia-kicker">{messages.kicker}</p>
                <h1 id="encyclopedia-title">{messages.title}</h1>
                <p className="encyclopedia-lead">{messages.lead}</p>
            </section>

            <section className="encyclopedia-browser" aria-label={messages.browserLabel}>
                <div className="encyclopedia-browser__heading">
                    <span className="encyclopedia-result-count" aria-live="polite">
                        {messages.entriesLabel(filteredEntries.length)}
                    </span>
                    <a href={`${localizedRoute(locale, "/compare/batteries")}`}>
                        {comparisonMessages.compareTitle}
                    </a>
                    <a href={`${localizedRoute(locale, "/compare/materials")}`}>
                        {materialComparisonMetadata.title}
                    </a>
                    <a href={`${localizedRoute(locale, "/compare/mods")}`}>
                        {modComparisonMetadata.title}
                    </a>
                </div>

                <div className="encyclopedia-controls">
                    <label className="encyclopedia-search">
                        <span className="sr-only">{messages.searchLabel}</span>
                        <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
                        <input type="search" value={query} placeholder={messages.searchPlaceholder}
                            onChange={(event) => setQuery(event.target.value)} />
                    </label>
                    <div className="encyclopedia-filters" aria-label={messages.filtersLabel}>
                        <button type="button" className={category === "all" ? "is-active" : ""}
                            aria-pressed={category === "all"} onClick={() => setCategory("all")}>{messages.all}</button>
                        {categories.map((item) => (
                            <button type="button" className={category === item.id ? "is-active" : ""}
                                aria-pressed={category === item.id} key={item.id}
                                onClick={() => setCategory(item.id)}>{item.label}</button>
                        ))}
                    </div>
                </div>

                {filteredEntries.length > 0 ? <div className="encyclopedia-entry-grid">
                    {filteredEntries.map((entry) => (
                        <article className="encyclopedia-entry-card" key={`${entry.category}-${entry.slug}`}>
                            <a href={entryHref(entry)}>
                                <span className="encyclopedia-entry-card__category">
                                    {messages.categoryLabels[entry.category]}
                                </span>
                                <strong>{entry.title}</strong>
                                <span className="encyclopedia-entry-card__summary">{entry.summary}</span>
                                <span className="encyclopedia-entry-card__link">{messages.openEntry}
                                    <span aria-hidden="true">-&gt;</span></span>
                            </a>
                            {entry.category !== "concepts" && <CalculatorVisibility label={entry.title}
                                visible={visibilityFor(entry)} onChange={(visible) => setVisibilityFor(entry, visible)} />}
                        </article>
                    ))}
                </div> : <p className="encyclopedia-empty">{messages.noMatches}</p>}
            </section>
        </main>
    </SiteLayout>;
};
