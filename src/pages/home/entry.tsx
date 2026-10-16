import { createRoot } from "react-dom/client";
import { HomePage } from "./home-page";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("The page is missing its React root element.");
}

createRoot(rootElement).render(<HomePage />);
