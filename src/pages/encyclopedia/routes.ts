export type CatalogCategory = "concepts" | "mods" | "batteries" | "materials";

export const catalogCategoryRouteSegments: Readonly<Record<CatalogCategory, string>> = {
    concepts: "concept",
    mods: "mod",
    batteries: "battery",
    materials: "material",
};

const routeSegmentCategories: Readonly<Record<string, CatalogCategory>> = {
    concept: "concepts",
    mod: "mods",
    battery: "batteries",
    material: "materials",
};

export const catalogCategoryForRouteSegment = (segment: string): CatalogCategory | undefined =>
    routeSegmentCategories[segment];

export const catalogCategoryPath = (category: CatalogCategory): string =>
    `catalog/${catalogCategoryRouteSegments[category]}`;
