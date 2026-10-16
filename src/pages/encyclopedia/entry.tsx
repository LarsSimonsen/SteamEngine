import { createRoot } from "react-dom/client";
import { BackendErrorBoundary } from "../../shared/ui/backend-error-boundary";
import { EncyclopediaHub } from "./encyclopedia-hub";
import { EncyclopediaPage } from "./encyclopedia-page";
import { catalogCategoryForRouteSegment, type CatalogCategory } from "./routes";

const readDetailRoute = (): { readonly category: CatalogCategory; readonly slug: string } | null => {
    const segments = window.location.pathname.split("/").filter(Boolean);
    const categoryIndex = segments.findIndex(
        (segment) => catalogCategoryForRouteSegment(segment) !== undefined,
    );
    const category = catalogCategoryForRouteSegment(segments[categoryIndex] ?? "");
    const slug = segments[categoryIndex + 1];
    return category && slug ? { category, slug } : null;
};

const detailRoute = readDetailRoute();

createRoot(document.getElementById("root")!).render(
    detailRoute
        ? <BackendErrorBoundary><EncyclopediaPage category={detailRoute.category} slug={detailRoute.slug} /></BackendErrorBoundary>
        : <EncyclopediaHub />,
);
