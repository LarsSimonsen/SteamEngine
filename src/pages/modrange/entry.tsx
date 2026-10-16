import { createRoot } from 'react-dom/client';
import { ModRangeCalculator } from './mod-range-calculator';
import { BackendErrorBoundary } from '../../shared/ui/backend-error-boundary';

createRoot(document.getElementById('root')!).render(<BackendErrorBoundary><ModRangeCalculator /></BackendErrorBoundary>);
