import { describe, expect, it } from 'vitest';
import { defaultModLimits, modRangeFieldErrors, parseModRangeDrafts } from './domain';

describe('Mod Range input domain', () => {
    it('treats a blank maximum resistance as unlimited', () => {
        const result = parseModRangeDrafts({
            maxPower: '15', maxVoltage: '6', maxCurrent: '3.5', minResistance: '1.2', maxResistance: ''
        });
        expect(result).toEqual({ kind: 'valid', limits: defaultModLimits });
    });

    it('allows a blank minimum resistance when no lower cutoff is known', () => {
        const result = parseModRangeDrafts({
            maxPower: '15', maxVoltage: '6', maxCurrent: '3.5', minResistance: '', maxResistance: ''
        });
        expect(result).toEqual({
            kind: 'valid',
            limits: { maxPower: 15, maxVoltage: 6, maxCurrent: 3.5 }
        });
    });

    it('rejects an inverted resistance range before calling the backend', () => {
        const result = parseModRangeDrafts({
            maxPower: '15', maxVoltage: '6', maxCurrent: '3.5', minResistance: '3', maxResistance: '2'
        });
        expect(result).toEqual({
            kind: 'invalid',
            message: 'The maximum resistance must be greater than the minimum resistance.'
        });
    });

    it('returns errors for the individual fields without changing their drafts', () => {
        const drafts = {
            maxPower: '', maxVoltage: '-1', maxCurrent: '3.5', minResistance: '3', maxResistance: '2'
        };

        expect(modRangeFieldErrors(drafts)).toEqual({
            maxPower: 'Enter a value for maximum power.',
            maxVoltage: 'Enter a positive value for maximum voltage.',
            maxResistance: 'The maximum resistance must be greater than the minimum resistance.',
        });
        expect(drafts).toEqual({
            maxPower: '', maxVoltage: '-1', maxCurrent: '3.5', minResistance: '3', maxResistance: '2'
        });
    });
});
