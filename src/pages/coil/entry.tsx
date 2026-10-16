import { createRoot } from "react-dom/client";
import { CoilCalculator } from "./coil-calculator";
import { BackendErrorBoundary } from "../../shared/ui/backend-error-boundary";

const root = document.getElementById("root");
if (!root) throw new Error("Coil Wrapping root element was not found.");

createRoot(root).render(<BackendErrorBoundary><CoilCalculator /></BackendErrorBoundary>);

