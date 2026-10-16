import { createRoot } from "react-dom/client";
import { BatteryDrainCalculator } from "./battery-drain-calculator";
import { BackendErrorBoundary } from "../../shared/ui/backend-error-boundary";

createRoot(document.getElementById("root")!).render(<BackendErrorBoundary><BatteryDrainCalculator /></BackendErrorBoundary>);

