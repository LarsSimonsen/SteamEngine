import { createRoot } from "react-dom/client";
import { WireWizard } from "./wire-wizard";
import { BackendErrorBoundary } from "../../shared/ui/backend-error-boundary";

const root = document.getElementById("root");
if (!root) throw new Error("The page is missing its React root element.");
createRoot(root).render(<BackendErrorBoundary><WireWizard /></BackendErrorBoundary>);
