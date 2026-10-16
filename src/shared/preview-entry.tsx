import { createRoot } from "react-dom/client";
import { PreviewPage } from "./ui/preview-page";
import { isSiteRoute } from "./ui/site-navigation";
import "./styles/foundation.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("The page is missing its React root element.");
}

const route = rootElement.dataset.route;
if (!isSiteRoute(route)) {
    throw new Error(`Unknown Steam Engine route: ${route ?? "missing"}`);
}
const title = rootElement.dataset.title ?? "Steam Engine";
const description = rootElement.dataset.description ?? "Modernization preview.";

createRoot(rootElement).render(
    <PreviewPage route={route} title={title} description={description} />,
);
