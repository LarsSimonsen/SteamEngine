import { createRoot } from "react-dom/client";
import { Converter } from "./converter";
import { BackendErrorBoundary } from "../../shared/ui/backend-error-boundary";

createRoot(document.getElementById("root")!).render(<BackendErrorBoundary><Converter /></BackendErrorBoundary>);

