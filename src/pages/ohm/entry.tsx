import { createRoot } from 'react-dom/client';
import { OhmCalculator } from './ohm-calculator';
import { BackendErrorBoundary } from '../../shared/ui/backend-error-boundary';

createRoot(document.getElementById('root')!).render(<BackendErrorBoundary><OhmCalculator /></BackendErrorBoundary>);
