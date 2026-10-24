import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ModRangeCalculator } from './mod-range-calculator';

describe('ModRangeCalculator', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({
            calculation: {
                kind: 'valid',
                values: {
                    minimumResistance: 1.2, maximumResistance: 2.4, theoreticalMedianResistance: 1.71,
                    medianResistance: 1.71, sweetSpotResistance: 2.05, currentLimitRequiredVoltage: 4.28,
                    currentLimitResistance: 1.22, voltageLimitRequiredCurrent: 12.5, voltageLimitResistance: 2.4,
                },
            },
            graph: {
                limits: { maxPower: 15, maxVoltage: 6, maxCurrent: 3.5, minResistance: 1.2 },
                calculation: { minimumResistance: 1.2, maximumResistance: 2.4, medianResistance: 1.71,
                    sweetSpotResistance: 2.05 },
                adjusted: false,
                bounds: { minimumResistance: 0, maximumResistance: 9.6, globalMaximumPower: 15,
                    rightThresholdPower: 3.75 },
                curves: {
                    combined: [{ resistance: 0, power: 0 }, { resistance: 9.6, power: 0 }],
                    current: [], voltage: [], power: [],
                },
            },
        }), { status: 200, headers: { 'Content-Type': 'application/json' } })));
    });
    afterEach(() => {
        vi.unstubAllGlobals();
        cleanup();
    });

    it('renders the core inputs and updates them from a built-in preset', async () => {
        const { container } = render(<ModRangeCalculator />);
        expect(screen.getByRole('heading', { name: 'Mod range' })).toBeInTheDocument();
        const sidebar = container.querySelector('.mod-range-sidebar');
        expect(sidebar).toContainElement(screen.getByRole('heading', { name: 'Presets' }).closest('section'));
        expect(sidebar).toContainElement(screen.getByRole('heading', { name: 'Mod specs' }).closest('section'));
        expect(screen.getByRole('region', { name: 'Results' })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { name: 'Results' })).not.toBeInTheDocument();
        expect(screen.getByLabelText('Maximum power')).toHaveAttribute('min', '1');
        expect(screen.getByLabelText('Maximum power')).toHaveAttribute('step', '1');
        expect(screen.getByLabelText('Maximum voltage')).toHaveAttribute('min', '0.1');
        expect(screen.getByLabelText('Maximum voltage')).toHaveAttribute('step', '0.1');
        expect(screen.getByLabelText('Maximum current')).toHaveAttribute('min', '0.1');
        expect(screen.getByLabelText('Maximum current')).toHaveAttribute('step', '0.1');
        expect(screen.getByLabelText('Minimum resistance (optional)')).toHaveAttribute('min', '0.05');
        expect(screen.getByLabelText('Minimum resistance (optional)')).toHaveAttribute('step', '0.05');
        expect(screen.getByLabelText('Maximum resistance (optional)')).toHaveAttribute('min', '0.05');
        expect(screen.getByLabelText('Maximum resistance (optional)')).toHaveAttribute('step', '0.05');
        expect(screen.getAllByText('Custom values').length).toBeGreaterThan(0);
        expect(screen.getByLabelText('Minimum resistance (optional)'))
            .toHaveAttribute('placeholder', 'No configured lower limit');
        expect(screen.getByLabelText('Maximum resistance (optional)'))
            .toHaveAttribute('placeholder', 'No configured upper limit');
        fireEvent.change(screen.getByRole('combobox', { name: 'Regulated mod preset' }),
            { target: { value: 'preset-33' } });
        expect(screen.getByRole('link', { name: 'Details about this mod' }))
            .toHaveAttribute('href', './catalog/mod/dna60-non-color');
        expect(screen.getByRole('link', { name: 'Battery drain: Evolv DNA60 (non-color)' }))
            .toHaveAttribute('href', 'batt?mod=dna60-non-color&power=60');
        expect(screen.getByLabelText('Maximum power')).toHaveValue(60);
        expect(screen.getByRole('button', { name: /Reset/ })).toBeInTheDocument();
        await waitFor(() => expect(screen.getByRole('heading', { name: 'Resistance guidance' }))
            .toBeInTheDocument());
        const graph = screen.getByRole('img', { name: 'Power curve' });
        expect(graph).toBeInTheDocument();
        expect(graph.querySelectorAll('.power-curve-graph__marker-value')).toHaveLength(2);
        expect(graph).toHaveTextContent('1.71 Ω');
        expect(graph).toHaveTextContent('2.05 Ω');
        expect(screen.queryByRole('checkbox', { name: 'Show limits' })).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Current/voltage crossover' }))
            .toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('button', { name: 'Upper-range midpoint' }))
            .toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('slider', { name: 'Resistance' })).toBeInTheDocument();
        expect(screen.getAllByText('Maximum-power range').length).toBeGreaterThan(0);
    });

    it('shows a native power-curve title at the hovered resistance', async () => {
        render(<ModRangeCalculator />);

        const graph = await screen.findByRole('img', { name: 'Power curve' });
        const hoverTarget = graph.querySelector('.power-curve-graph__hover-target');
        if (!hoverTarget) throw new Error('Expected a power-curve hover target.');
        Object.defineProperty(hoverTarget, 'getBoundingClientRect', {
            value: () => ({ left: 0, width: 760 }) as DOMRect,
        });

        fireEvent.mouseMove(hoverTarget, { clientX: 380 });

        expect(graph.querySelector('title')).toHaveTextContent(/^\d+\.\d{2}W @ \d+\.\d{2}Ω$/);
        expect(graph.querySelector('.power-curve-graph__hover-tooltip')).toBeInTheDocument();
        fireEvent.click(hoverTarget, { clientX: 380 });
        expect(document.querySelector('.power-curve-graph__inspector output')).toHaveTextContent(/^4\.8 Ω ·/);
    });

    it('shows the visible preset list without a filter control', () => {
        render(<ModRangeCalculator />);
        expect(screen.getByRole('option', { name: 'Evolv DNA60 (non-color)' })).toBeInTheDocument();
        expect(screen.queryByRole('option', { name: 'Smok G-Priv 220W' })).not.toBeInTheDocument();
        expect(screen.queryByRole('option', { name: 'Ante Meridiem Axis' })).not.toBeInTheDocument();
        expect(screen.queryByRole('searchbox', { name: 'Filter presets' })).not.toBeInTheDocument();
    });

    it('manages default visibility and custom mod lifecycle in a modal dialog', () => {
        const { container } = render(<ModRangeCalculator />);
        expect(screen.queryByRole('option', { name: 'AceSmok Ace 50' })).not.toBeInTheDocument();
        const managerButton = screen.getByRole('button', { name: 'Manage mods' });
        const pageHeader = container.querySelector('.mod-range-page-header');
        const presetControls = container.querySelector('.mod-range-preset-controls');
        expect(pageHeader).not.toContainElement(managerButton);
        expect(presetControls).toContainElement(managerButton);
        fireEvent.click(managerButton);
        expect(managerButton).toHaveClass('se-button--secondary-active');
        const dialog = screen.getByRole('dialog', { name: 'Manage mods' });
        expect(dialog.tagName).toBe('DIALOG');
        expect(dialog).toHaveAttribute('open');
        expect(dialog).toHaveFocus();

        fireEvent.change(within(dialog).getByRole('searchbox', { name: 'Filter built-ins' }), {
            target: { value: 'AceSmok' }
        });
        expect(within(dialog).getByRole('link', { name: 'AceSmok Ace 50' }))
            .toHaveAttribute('href', 'catalog/mod/acesmok-ace50');
        const visibility = within(dialog).getByRole('button', { name: /AceSmok Ace 50/ });
        expect(visibility).toHaveAttribute('aria-pressed', 'false');
        fireEvent.click(visibility);
        expect(visibility).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('option', { name: 'AceSmok Ace 50' })).toBeInTheDocument();

        fireEvent.click(within(dialog).getByRole('button', { name: 'New custom mod' }));
        const editor = screen.getByRole('heading', { name: 'Mod properties' }).closest('form');
        if (!editor) throw new Error('Expected the custom mod editor.');
        expect(within(editor).getByLabelText('Maximum output voltage (V)')).toHaveAttribute('min', '0.1');
        expect(within(editor).getByLabelText('Maximum output voltage (V)')).toHaveAttribute('step', '0.1');
        expect(within(editor).getByLabelText('Maximum output power (W)')).toHaveAttribute('min', '1');
        expect(within(editor).getByLabelText('Maximum output power (W)')).toHaveAttribute('step', '1');
        expect(within(editor).getByLabelText('Maximum output current (A)')).toHaveAttribute('min', '0.1');
        expect(within(editor).getByLabelText('Maximum output current (A)')).toHaveAttribute('step', '0.1');
        expect(within(editor).getByLabelText('Minimum atomizer resistance (Ω)'))
            .toHaveAttribute('min', '0.05');
        expect(within(editor).getByLabelText('Minimum atomizer resistance (Ω)'))
            .toHaveAttribute('step', '0.05');
        expect(within(editor).getByLabelText('Maximum atomizer resistance (Ω)'))
            .toHaveAttribute('min', '0.05');
        expect(within(editor).getByLabelText('Maximum atomizer resistance (Ω)'))
            .toHaveAttribute('step', '0.05');
        fireEvent.change(within(editor).getByLabelText('Manufacturer'), { target: { value: 'Test' } });
        fireEvent.change(within(editor).getByLabelText('Model'), { target: { value: 'Mod' } });
        fireEvent.change(within(editor).getByLabelText('Maximum output voltage (V)'), {
            target: { value: '8' }
        });
        fireEvent.change(within(editor).getByLabelText('Maximum output power (W)'), {
            target: { value: '100' }
        });
        fireEvent.change(within(editor).getByLabelText('Maximum output current (A)'), {
            target: { value: '30' }
        });
        fireEvent.click(within(editor).getByRole('button', { name: 'Save mod' }));
        expect(screen.getByRole('option', { name: 'Test Mod' })).toBeInTheDocument();
        fireEvent.click(within(dialog).getByRole('button', { name: 'Close mod manager' }));
        expect(screen.queryByRole('dialog', { name: 'Manage mods' })).not.toBeInTheDocument();
        expect(managerButton).toHaveFocus();

        fireEvent.change(screen.getByRole('combobox', { name: 'Regulated mod preset' }), {
            target: { value: screen.getByRole('option', { name: 'Test Mod' }).getAttribute('value') }
        });
        expect(screen.getByText('Custom mod')).toBeInTheDocument();
        fireEvent.click(managerButton);
        fireEvent.click(within(screen.getByRole('dialog', { name: 'Manage mods' }))
            .getByRole('button', { name: 'Delete' }));
        expect(within(screen.getByRole('dialog', { name: 'Manage mods' })).getByRole('status'))
            .toHaveTextContent('Cannot delete Test Mod; it is used by Current Mod Range settings.');
    });

    it('preserves invalid input and keeps results from the last valid values', async () => {
        render(<ModRangeCalculator />);
        await screen.findByRole('heading', { name: 'Resistance guidance' });
        const maximumPower = screen.getByLabelText('Maximum power');
        fireEvent.change(maximumPower, { target: { value: '' } });

        expect(maximumPower).toHaveValue(null);
        expect(maximumPower).toHaveAttribute('aria-invalid', 'true');
        expect(screen.getByRole('alert')).toHaveTextContent('Enter a value for maximum power.');
        expect(screen.getByRole('heading', { name: 'Resistance guidance' })).toBeInTheDocument();
        expect(screen.getByText('Results use the last valid value.')).toHaveAttribute('role', 'status');
        await waitFor(() => expect(JSON.parse(localStorage.getItem('steamengine.modRange.settings.v1') ?? '{}')
            .drafts.maxPower).toBe('15'));
    });

    it('preserves invalid zero resistance limits for correction', () => {
        render(<ModRangeCalculator />);

        const minimum = screen.getByLabelText('Minimum resistance (optional)');
        const maximum = screen.getByLabelText('Maximum resistance (optional)');
        fireEvent.change(minimum, { target: { value: '0' } });
        fireEvent.change(maximum, { target: { value: '0' } });

        expect(minimum).toHaveValue(0);
        expect(maximum).toHaveValue(0);
        expect(minimum).toHaveAttribute('aria-invalid', 'true');
        expect(maximum).toHaveAttribute('aria-invalid', 'true');
    });
});
