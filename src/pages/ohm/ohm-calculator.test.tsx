import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { OhmCalculator } from './ohm-calculator';
import type { OhmField, OhmValues } from './domain';

const fieldByCode = {
    r: 'resistance',
    u: 'voltage',
    i: 'current',
    p: 'power',
} as const satisfies Readonly<Record<string, OhmField>>;

/** Test fake for the calculation API: solves Ohm's law from the edited field and the locked field. */
const solveOhm = (current: OhmValues, field: OhmField, value: number, lock: OhmField): OhmValues => {
    if (!Number.isFinite(value) || value <= 0) return { ...current };
    const next = { ...current, [field]: value };
    if (field === lock) return next;
    const known = new Set([field, lock]);
    if (known.has('resistance') && known.has('voltage')) next.current = next.voltage / next.resistance;
    if (known.has('resistance') && known.has('current')) next.voltage = next.current * next.resistance;
    if (known.has('resistance') && known.has('power')) {
        next.current = Math.sqrt(next.power / next.resistance);
        next.voltage = next.current * next.resistance;
    }
    if (known.has('voltage') && known.has('current')) next.resistance = next.voltage / next.current;
    if (known.has('voltage') && known.has('power')) {
        next.resistance = (next.voltage * next.voltage) / next.power;
        next.current = next.voltage / next.resistance;
    }
    if (known.has('current') && known.has('power')) {
        next.voltage = next.power / next.current;
        next.resistance = next.voltage / next.current;
    }
    if (!known.has('power')) next.power = next.voltage * next.current;
    return next;
};

describe('OhmCalculator', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.stubGlobal('fetch', vi.fn(async (input: RequestInfo | URL) => {
            const query = new URL(String(input)).searchParams;
            const field = fieldByCode[query.get('f') as keyof typeof fieldByCode];
            const lock = fieldByCode[query.get('l') as keyof typeof fieldByCode];
            const values = solveOhm({
                resistance: Number(query.get('r')),
                voltage: Number(query.get('u')),
                current: Number(query.get('i')),
                power: Number(query.get('p')),
            }, field, Number(query.get('v')), lock);
            const response = { r: values.resistance, u: values.voltage, i: values.current, p: values.power };
            return new Response(JSON.stringify(response), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }));
    });
    afterEach(() => {
        vi.unstubAllGlobals();
        cleanup();
    });

    it('renders the familiar fields and recalculates from user input', async () => {
        render(<OhmCalculator />);
        expect(screen.getByRole('heading', { name: "Ohm's law" })).toBeInTheDocument();
        const header = screen.getByRole('heading', { name: "Ohm's law" }).closest('header');
        expect(header).not.toBeNull();
        expect(within(header!).getByRole('link', { name: "Ohm's law" }))
            .toHaveAttribute('href', './catalog/concept/ohms-law');
        expect(within(header!).getByRole('link', { name: "Joule's law" }))
            .toHaveAttribute('href', './catalog/concept/joule-heating');
        expect(header).toHaveTextContent("This is a simple Ohm's law and Joule's law calculator.");
        fireEvent.change(screen.getByLabelText('Voltage U'), { target: { value: '4' } });
        await waitFor(() => expect(screen.getByLabelText('Current I')).toHaveValue(1.6));
    });

    it('announces a result summary once the recalculated values settle', async () => {
        render(<OhmCalculator />);
        const announcement = screen.getAllByRole('status').find((status) => status.classList.contains('sr-only'))!;
        expect(announcement).toBeEmptyDOMElement();

        fireEvent.change(screen.getByLabelText('Voltage U'), { target: { value: '4' } });

        await waitFor(() => expect(announcement).toHaveTextContent(
            'Resistance 2.5 Ω, Voltage 4 V, Current 1.6 A, Power 6.4 W',
        ), { timeout: 3000 });
    });

    it('resets values and lock behavior independently from their owning panels', async () => {
        render(<OhmCalculator />);
        const valuesPanel = screen.getByRole('region', { name: 'Values' });
        const lockPanel = screen.getByRole('region', { name: 'Lock' });
        const lockSelectors = within(screen.getByRole('group', { name: 'Simple locks' })).getAllByRole('combobox');
        expect(within(valuesPanel).queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();

        fireEvent.change(lockSelectors[0], { target: { value: 'current' } });
        fireEvent.change(screen.getByLabelText('Voltage U'), { target: { value: '4' } });
        await waitFor(() => expect(within(valuesPanel).getByRole('button', { name: 'Reset' })).toBeVisible());
        fireEvent.click(within(valuesPanel).getByRole('button', { name: 'Reset' }));

        expect(screen.getByLabelText('Voltage U')).toHaveValue(3.5);
        expect(lockSelectors[0]).toHaveValue('current');
        expect(within(lockPanel).getByRole('button', { name: 'Reset' })).toBeVisible();
        expect(within(valuesPanel).queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();
        expect(within(valuesPanel).getByText('Default settings have been restored.')).toHaveAttribute('role', 'status');

        fireEvent.change(screen.getByLabelText('Voltage U'), { target: { value: '4' } });
        await waitFor(() => expect(screen.getByLabelText('Resistance R')).toHaveValue(2.86));
        fireEvent.click(within(lockPanel).getByRole('button', { name: 'Reset' }));

        expect(screen.getByLabelText('Voltage U')).toHaveValue(4);
        expect(lockSelectors[0]).toHaveValue('resistance');
        expect(within(valuesPanel).getByRole('button', { name: 'Reset' })).toBeVisible();
        expect(within(lockPanel).queryByRole('button', { name: 'Reset' })).not.toBeInTheDocument();
    });

    it('presents the primary and secondary lock rules as explicit selectors', () => {
        render(<OhmCalculator />);

        const simpleLocks = screen.getByRole('group', { name: 'Simple locks' });
        const selectors = within(simpleLocks).getAllByRole('combobox');
        expect(selectors).toHaveLength(2);
        expect(selectors[0]).toHaveValue('resistance');
        expect(selectors[1]).toHaveValue('voltage');
        expect(simpleLocks).toHaveTextContent(
            'Changing voltage, current, and power keeps resistance constant.',
        );
        expect(simpleLocks).toHaveTextContent('Changing resistance keeps voltage constant.');

        fireEvent.change(selectors[0], { target: { value: 'current' } });
        expect(selectors[0]).toHaveValue('current');
        expect(selectors[1]).toHaveValue('voltage');
        expect(simpleLocks).toHaveTextContent('Changing current keeps voltage constant.');
        expect(document.querySelectorAll('svg[data-icon="lock"]')).toHaveLength(0);
    });

    it('localizes the calculator copy on Bokmål pages', () => {
        document.body.innerHTML = '<div id="root" data-locale="nb"></div>';
        render(<OhmCalculator />, { container: document.getElementById('root')! });

        expect(screen.getByRole('heading', { name: 'Ohms lov' })).toBeInTheDocument();
        expect(screen.getByRole('group', { name: 'Enkle låser' })).toBeInTheDocument();
        expect(screen.getByLabelText('Spenning U')).toBeInTheDocument();
        expect(screen.getByLabelText('Motstand R')).toHaveValue(2.5);
        expect(screen.getByLabelText('Spenning U')).toHaveValue(3.5);
        expect(screen.getByLabelText('Strøm I')).toHaveValue(1.4);
        expect(screen.getByLabelText('Effekt P')).toHaveValue(4.9);
        fireEvent.change(screen.getByLabelText('Motstand R'), { target: { value: '0' } });
        fireEvent.blur(screen.getByLabelText('Motstand R'));
        expect(screen.getByText('Motstand > 0')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Vis detaljerte låser' }));
        expect(screen.getByRole('button', { name: 'Skjul detaljerte låser' })).toHaveAttribute(
            'aria-expanded', 'true',
        );
        const detailedLocks = screen.getByRole('heading', { name: 'Detaljerte låser' }).parentElement;
        expect(detailedLocks).not.toBeNull();
        expect(within(detailedLocks!).getAllByText('Spenning', { exact: true })).toHaveLength(3);
        expect(within(detailedLocks!).getAllByText('Strøm', { exact: true })).toHaveLength(3);
        expect(within(detailedLocks!).getAllByText('Effekt', { exact: true })).toHaveLength(3);
        expect(within(detailedLocks!).queryByText('Voltage', { exact: true })).not.toBeInTheDocument();
        expect(within(detailedLocks!).queryByText('Current', { exact: true })).not.toBeInTheDocument();
        expect(within(detailedLocks!).queryByText('Power', { exact: true })).not.toBeInTheDocument();
    });

    it('shows direct field errors only after invalid drafts are committed', () => {
        render(<OhmCalculator />);

        const invalidValues = [
            ['Resistance R', 'Resistance > 0'],
            ['Voltage U', 'Voltage > 0'],
            ['Current I', 'Current > 0'],
            ['Power P', 'Power > 0'],
        ] as const;
        for (const [label, error] of invalidValues) {
            const input = screen.getByLabelText(label);
            fireEvent.change(input, { target: { value: '0' } });
            expect(input).toHaveValue(0);
            expect(input).not.toHaveAttribute('aria-invalid');
            fireEvent.blur(input);
            expect(input).toHaveValue(0);
            expect(input).toHaveAttribute('aria-invalid', 'true');
            expect(input).toHaveAccessibleDescription(error);
            expect(screen.getByText(error)).toHaveAttribute('role', 'alert');
        }
    });

    it('supports replacing a selected value with a sub-ohm decimal', async () => {
        render(<OhmCalculator />);

        const resistance = screen.getByLabelText('Resistance R');
        fireEvent.change(resistance, { target: { value: '0' } });
        fireEvent.blur(resistance);
        expect(resistance).toHaveAttribute('aria-invalid', 'true');
        fireEvent.change(resistance, { target: { value: '0.' } });
        fireEvent.change(resistance, { target: { value: '0.5' } });

        expect(resistance).not.toHaveAttribute('aria-invalid');
        await waitFor(() => expect(resistance).toHaveValue(0.5));
        await waitFor(() => expect(screen.getByLabelText('Current I')).toHaveValue(7));
    });

    it('supports clearing a value before typing its replacement', async () => {
        render(<OhmCalculator />);

        const voltage = screen.getByLabelText('Voltage U');
        fireEvent.change(voltage, { target: { value: '' } });
        fireEvent.change(voltage, { target: { value: '4' } });
        fireEvent.change(voltage, { target: { value: '4.' } });
        fireEvent.change(voltage, { target: { value: '4.2' } });

        await waitFor(() => expect(voltage).toHaveValue(4.2));
        await waitFor(() => expect(screen.getByLabelText('Current I')).toHaveValue(1.68));
    });
});
