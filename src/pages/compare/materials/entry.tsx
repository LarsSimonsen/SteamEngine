import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MaterialComparisonPage } from "./material-comparison-page";

createRoot(document.getElementById("root")!).render(<StrictMode><MaterialComparisonPage /></StrictMode>);
