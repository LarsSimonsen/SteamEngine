import { createRoot } from "react-dom/client";
import { JuiceCalculator } from "./juice";
import { BackendErrorBoundary } from "../../shared/ui/backend-error-boundary";

createRoot(document.getElementById("root")!).render(<BackendErrorBoundary><JuiceCalculator /></BackendErrorBoundary>);
