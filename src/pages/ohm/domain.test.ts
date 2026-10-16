import { describe, expect, it } from 'vitest';
import {
    createDefaultState,
    getLockRules,
    isDefaultLockSettings,
    isDefaultOhmValues,
    resetOhmLockSettings,
    resetOhmValues,
    selectSimpleLock,
    setSimpleLockPair,
    setCustomLock
} from './domain';

describe('OhmCalc domain', () => {
    it('identifies default and changed lock settings', () => {
        expect(isDefaultLockSettings(createDefaultState().lockSettings)).toBe(true);
        expect(isDefaultLockSettings(setCustomLock(
            createDefaultState().lockSettings, 'resistance', 'power'
        ))).toBe(false);
    });

    it('describes the current lock target for every adjustable field', () => {
        expect(getLockRules(createDefaultState().lockSettings)).toEqual([
            { adjustedField: 'resistance', lockedField: 'voltage' },
            { adjustedField: 'voltage', lockedField: 'resistance' },
            { adjustedField: 'current', lockedField: 'resistance' },
            { adjustedField: 'power', lockedField: 'resistance' }
        ]);
    });

    it('updates shortcut locks and preserves the former primary as secondary', () => {
        const settings = selectSimpleLock(createDefaultState().lockSettings, 'current');
        expect(settings.primaryField).toBe('current');
        expect(settings.secondaryField).toBe('resistance');
        expect(settings.resistanceTarget).toBe('current');
    });

    it('preserves the secondary shortcut when selecting the current primary again', () => {
        const settings = selectSimpleLock(createDefaultState().lockSettings, 'resistance');
        expect(settings.primaryField).toBe('resistance');
        expect(settings.secondaryField).toBe('voltage');
    });

    it('identifies default and changed values', () => {
        expect(isDefaultOhmValues(createDefaultState().values)).toBe(true);
        expect(isDefaultOhmValues({ ...createDefaultState().values, voltage: 4 })).toBe(false);
    });

    it('resets values and lock settings independently', () => {
        const changedState = {
            values: { ...createDefaultState().values, voltage: 4 },
            lockSettings: setSimpleLockPair(createDefaultState().lockSettings, 'current', 'power'),
        };

        const valuesReset = resetOhmValues(changedState);
        expect(valuesReset.values).toEqual(createDefaultState().values);
        expect(valuesReset.lockSettings).toEqual(changedState.lockSettings);

        const locksReset = resetOhmLockSettings(changedState);
        expect(locksReset.values).toEqual(changedState.values);
        expect(locksReset.lockSettings).toEqual(createDefaultState().lockSettings);
    });

    it('sets an explicit primary and secondary lock pair', () => {
        const settings = setSimpleLockPair(createDefaultState().lockSettings, 'current', 'power');
        expect(settings.primaryField).toBe('current');
        expect(settings.secondaryField).toBe('power');
        expect(getLockRules(settings)).toEqual([
            { adjustedField: 'resistance', lockedField: 'current' },
            { adjustedField: 'voltage', lockedField: 'current' },
            { adjustedField: 'current', lockedField: 'power' },
            { adjustedField: 'power', lockedField: 'current' },
        ]);
    });

    it('clears shortcut locks when a detailed lock is selected', () => {
        const settings = setCustomLock(createDefaultState().lockSettings, 'resistance', 'power');
        expect(settings.resistanceTarget).toBe('power');
        expect(settings.primaryField).toBeUndefined();
        expect(settings.secondaryField).toBeUndefined();
    });
});
