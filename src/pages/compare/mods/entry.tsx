import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModComparisonPage } from "./mod-comparison-page";

createRoot(document.getElementById("root")!).render(<StrictMode><ModComparisonPage /></StrictMode>);
