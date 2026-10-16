import { createRoot } from "react-dom/client";
import { TcrCalculator } from "./tcr-calculator";
import { BackendErrorBoundary } from "../../shared/ui/backend-error-boundary";

const root = document.getElementById("root");
if (!root) throw new Error("The TCR page is missing its React root element.");

createRoot(root).render(<BackendErrorBoundary><TcrCalculator /></BackendErrorBoundary>);
