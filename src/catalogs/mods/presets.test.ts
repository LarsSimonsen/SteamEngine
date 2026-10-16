import { describe, expect, it } from 'vitest';
import { builtInPresets } from './presets';

describe('built-in mod presets', () => {
    it('includes the historical presets and their aliases', () => {
        expect(builtInPresets.length).toBeGreaterThan(200);
        expect(builtInPresets.some((preset) => preset.basedOnPresetId)).toBe(true);
    });

    it('contains only the modern limit fields', () => {
        expect(builtInPresets.every((preset) => !('umin' in preset) && !('pmin' in preset))).toBe(true);
    });

    it('uses structured identities and explicit units', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-35')).toMatchObject({
            manufacturer: 'Evolv',
            model: 'DNA-200',
            variant: '2 cells, DNA-133',
            displayName: 'Evolv DNA-200 (2 cells, DNA-133)',
            maximumOutputVoltageVolts: 6,
            maximumOutputPowerWatts: 133,
            maximumOutputCurrentAmps: 50
        });
    });

    it('includes the Geekvape Aegis Legend 5 with its manufacturer limits', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-214')).toMatchObject({
            manufacturer: 'Geekvape',
            model: 'Aegis Legend 5',
            displayName: 'Geekvape Aegis Legend 5',
            maximumOutputVoltageVolts: 12,
            maximumOutputPowerWatts: 200,
            maximumOutputCurrentAmps: 45,
            minimumAtomizerResistanceOhms: 0.1,
            maximumAtomizerResistanceOhms: 2,
            introduction: {
                earliest: {
                    date: '2025-06',
                    event: 'market-availability',
                    relation: 'no-earlier-than',
                },
                latest: {
                    date: '2025-06',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the Evolv DNA100C with continuous output limits and the approved resistance approximation', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-216')).toMatchObject({
            manufacturer: 'Evolv',
            model: 'DNA100C',
            displayName: 'Evolv DNA100C',
            maximumOutputVoltageVolts: 9,
            maximumOutputPowerWatts: 100,
            maximumOutputCurrentAmps: 40,
            minimumAtomizerResistanceOhms: 0.1,
            maximumAtomizerResistanceOhms: 3,
            introduction: {
                latest: {
                    date: '2021',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('projects the Evolv DNA250C conditional battery and firmware profiles separately', () => {
        const profiles = builtInPresets.filter(({ model }) => model === 'DNA250C');
        expect(profiles).toHaveLength(4);
        expect(profiles.map(({ id, variant, maximumOutputPowerWatts }) => ({
            id,
            variant,
            maximumOutputPowerWatts
        }))).toEqual([
            { id: 'preset-217', variant: '2S', maximumOutputPowerWatts: 200 },
            { id: 'preset-218', variant: '3S, US firmware', maximumOutputPowerWatts: 250 },
            { id: 'preset-219', variant: '3S, international firmware', maximumOutputPowerWatts: 300 },
            { id: 'preset-220', variant: '4S', maximumOutputPowerWatts: 400 }
        ]);
        expect(profiles.every((profile) => (
            profile.maximumOutputVoltageVolts === 10
            && profile.maximumOutputCurrentAmps === 65
            && profile.minimumAtomizerResistanceOhms === 0.02
            && profile.maximumAtomizerResistanceOhms === 8
        ))).toBe(true);
    });

    it('includes the VOOPOO DRAG 6 with the approved conservative measured limits', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-221')).toMatchObject({
            manufacturer: 'VOOPOO',
            model: 'DRAG 6',
            displayName: 'VOOPOO DRAG 6',
            maximumOutputVoltageVolts: 7.06,
            maximumOutputPowerWatts: 204,
            maximumOutputCurrentAmps: 50,
            minimumAtomizerResistanceOhms: 0.05,
            maximumAtomizerResistanceOhms: 3,
            introduction: {
                earliest: {
                    date: '2026-03',
                    event: 'market-availability',
                    relation: 'no-earlier-than',
                },
                latest: {
                    date: '2026-03',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the YiHi SXmini MQ Class with the approved vendor-stated current limit', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-222')).toMatchObject({
            manufacturer: 'YiHi',
            model: 'SXmini MQ Class',
            displayName: 'YiHi SXmini MQ Class',
            maximumOutputVoltageVolts: 8,
            maximumOutputPowerWatts: 60,
            maximumOutputCurrentAmps: 25,
            minimumAtomizerResistanceOhms: 0.1,
            maximumAtomizerResistanceOhms: 3,
            introduction: {
                earliest: {
                    date: '2024-12',
                    event: 'market-availability',
                    relation: 'no-earlier-than',
                },
                latest: {
                    date: '2024-12',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the Evolv DNA80C with its approved implementation-supported resistance range', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-223')).toMatchObject({
            manufacturer: 'Evolv',
            model: 'DNA80C',
            displayName: 'Evolv DNA80C',
            maximumOutputVoltageVolts: 9,
            maximumOutputPowerWatts: 80,
            maximumOutputCurrentAmps: 30,
            minimumAtomizerResistanceOhms: 0.08,
            maximumAtomizerResistanceOhms: 3.5,
            introduction: {
                latest: {
                    date: '2024-04-06',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the Evolv DNA75C ordinary profile without flattening transient 100 W modes', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-224')).toMatchObject({
            manufacturer: 'Evolv',
            model: 'DNA75C',
            displayName: 'Evolv DNA75C',
            maximumOutputVoltageVolts: 9,
            maximumOutputPowerWatts: 75,
            maximumOutputCurrentAmps: 30,
            minimumAtomizerResistanceOhms: 0.02,
            maximumAtomizerResistanceOhms: 8,
            introduction: {
                earliest: {
                    date: '2017-06-13',
                    event: 'market-availability',
                    relation: 'no-earlier-than',
                },
                latest: {
                    date: '2017-06-13',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes one YiHi SX600H ordinary profile for both display variants', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-225')).toMatchObject({
            manufacturer: 'YiHi',
            model: 'SX600H',
            displayName: 'YiHi SX600H',
            maximumOutputVoltageVolts: 8,
            maximumOutputPowerWatts: 60,
            maximumOutputCurrentAmps: 20,
            minimumAtomizerResistanceOhms: 0.1,
            maximumAtomizerResistanceOhms: 3,
            introduction: {
                latest: {
                    date: '2024-11-29',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the approved conservative Craving Vapor HexOhm V3 profile', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-226')).toMatchObject({
            manufacturer: 'Craving Vapor',
            model: 'HexOhm V3',
            displayName: 'Craving Vapor HexOhm V3',
            maximumOutputVoltageVolts: 6,
            maximumOutputPowerWatts: 180,
            maximumOutputCurrentAmps: 30,
            minimumAtomizerResistanceOhms: 0.2,
            maximumAtomizerResistanceOhms: 3,
            introduction: {
                latest: {
                    date: '2016-06-28',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the approved measured VOOPOO VINCI Spark220 profile', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-227')).toMatchObject({
            manufacturer: 'VOOPOO',
            model: 'VINCI Spark220',
            displayName: 'VOOPOO VINCI Spark220',
            maximumOutputVoltageVolts: 7.566,
            maximumOutputPowerWatts: 215,
            maximumOutputCurrentAmps: 38,
            minimumAtomizerResistanceOhms: 0.05,
            maximumAtomizerResistanceOhms: 3,
            introduction: {
                latest: {
                    date: '2025-02',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the approved hybrid Dovpo x TVC Topside Dual profile', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-228')).toMatchObject({
            manufacturer: 'Dovpo x TVC',
            model: 'Topside Dual',
            displayName: 'Dovpo x TVC Topside Dual',
            maximumOutputVoltageVolts: 12,
            maximumOutputPowerWatts: 200,
            maximumOutputCurrentAmps: 40,
            minimumAtomizerResistanceOhms: 0.08,
            maximumAtomizerResistanceOhms: 3.5,
            introduction: {
                latest: {
                    date: '2018',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the approved hybrid VOOPOO DRAG 5 profile', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-229')).toMatchObject({
            manufacturer: 'VOOPOO',
            model: 'DRAG 5',
            displayName: 'VOOPOO DRAG 5',
            maximumOutputVoltageVolts: 7.566,
            maximumOutputPowerWatts: 177,
            maximumOutputCurrentAmps: 38,
            minimumAtomizerResistanceOhms: 0.05,
            maximumAtomizerResistanceOhms: 3,
            introduction: {
                latest: {
                    date: '2024-07',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the approved official Geekvape L200 Classic profile', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-230')).toMatchObject({
            manufacturer: 'Geekvape',
            model: 'L200 Classic',
            displayName: 'Geekvape L200 Classic',
            maximumOutputVoltageVolts: 12,
            maximumOutputPowerWatts: 200,
            maximumOutputCurrentAmps: 45,
            minimumAtomizerResistanceOhms: 0.1,
            maximumAtomizerResistanceOhms: 3,
            introduction: {
                latest: {
                    date: '2022-12',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the approved measured VAPORESSO ARMOUR MAX profile', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-231')).toMatchObject({
            manufacturer: 'VAPORESSO',
            model: 'ARMOUR MAX',
            displayName: 'VAPORESSO ARMOUR MAX',
            maximumOutputVoltageVolts: 8.979,
            maximumOutputPowerWatts: 208,
            maximumOutputCurrentAmps: 39,
            minimumAtomizerResistanceOhms: 0.1,
            maximumAtomizerResistanceOhms: 5,
            introduction: {
                latest: {
                    date: '2023-10',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the approved measured Geekvape Aegis Legend 2 profile', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-232')).toMatchObject({
            manufacturer: 'Geekvape',
            model: 'Aegis Legend 2',
            variant: 'L200',
            displayName: 'Geekvape Aegis Legend 2 (L200)',
            maximumOutputVoltageVolts: 8.52,
            maximumOutputPowerWatts: 196,
            maximumOutputCurrentAmps: 42,
            minimumAtomizerResistanceOhms: 0.1,
            maximumAtomizerResistanceOhms: 3,
            introduction: {
                latest: {
                    date: '2021',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
    });

    it('includes the approved ProVape ProVari Radius profile without an invented maximum resistance', () => {
        const radius = builtInPresets.find(({ id }) => id === 'preset-233');

        expect(radius).toMatchObject({
            manufacturer: 'ProVape',
            model: 'ProVari Radius 40 W',
            displayName: 'ProVape ProVari Radius 40 W',
            maximumOutputVoltageVolts: 6,
            maximumOutputPowerWatts: 40,
            maximumOutputCurrentAmps: 9.5,
            minimumAtomizerResistanceOhms: 0.3,
            introduction: {
                latest: {
                    date: '2015',
                    event: 'market-availability',
                    relation: 'no-later-than'
                }
            }
        });
        expect(radius?.maximumAtomizerResistanceOhms).toBeUndefined();
    });

    it('includes the approved voltage-only ProVape ProVari 1 profile', () => {
        const provari = builtInPresets.find(({ id }) => id === 'preset-241');

        expect(provari).toMatchObject({
            manufacturer: 'ProVape',
            model: 'ProVari 1',
            displayName: 'ProVape ProVari 1',
            maximumOutputVoltageVolts: 6,
            maximumOutputPowerWatts: 15,
            maximumOutputCurrentAmps: 2.5,
            minimumAtomizerResistanceOhms: 1.2,
            introduction: {
                earliest: {
                    date: '2010',
                    event: 'market-availability',
                    relation: 'no-earlier-than',
                },
                latest: {
                    date: '2010',
                    event: 'market-availability',
                    relation: 'no-later-than',
                },
            },
        });
        expect(provari?.maximumAtomizerResistanceOhms).toBeUndefined();
        expect(provari?.operatingFeatures).toMatchObject({
            outputModes: { voltage: 'supported', power: 'unsupported', current: 'unsupported' },
        });
    });

    it('publishes researched battery configurations without inventing unresolved topology', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-226')?.batteryConfigurations).toEqual([
            {
                id: 'native-18650-series',
                profileIds: ['preset-226'],
                format: '18650',
                seriesCount: 2,
                parallelCount: 1,
                support: 'native',
            },
        ]);
        expect(builtInPresets.find(({ id }) => id === 'preset-237')?.batteryConfigurations).toHaveLength(2);
        expect(builtInPresets.find(({ id }) => id === 'preset-240')?.batteryConfigurations).toEqual([
            expect.objectContaining({
                format: 'integrated',
                seriesCount: null,
                parallelCount: null,
                manufacturerClaimedCapacityMah: 3200,
            }),
        ]);
        expect(builtInPresets.find(({ id }) => id === 'preset-241')?.batteryConfigurations).toEqual([
            expect.objectContaining({
                id: 'native-18490-18500',
                format: '18490/18500',
                seriesCount: 1,
                parallelCount: 1,
                support: 'native',
            }),
            expect.objectContaining({
                id: 'extension-18650',
                format: '18650',
                seriesCount: 1,
                parallelCount: 1,
                support: 'alternative',
            }),
        ]);
    });

    it('projects researched finished-device and board inputs into the runtime catalog', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-1')?.batteryConfigurations).toEqual([
            {
                id: 'native-18650',
                profileIds: ['preset-1'],
                format: '18650',
                seriesCount: 1,
                parallelCount: 1,
                support: 'native',
            },
        ]);
        expect(builtInPresets.find(({ id }) => id === 'preset-29')?.supportedBatteryInputs).toEqual([
            {
                id: '1s',
                seriesCount: 1,
                parallelCountConstraint: 'not-board-constrained',
                minimumInputVoltageVolts: 3.2,
                typicalInputVoltageVolts: 3.7,
                maximumInputVoltageVolts: 4.3,
                profileIds: ['preset-29'],
            },
        ]);
        expect(builtInPresets.find(({ id }) => id === 'preset-223')?.supportedBatteryInputs?.[0]).toMatchObject({
            minimumInputVoltageVolts: 3,
            typicalInputVoltageVolts: 3.7,
            maximumInputVoltageVolts: 4.5,
        });
        expect(builtInPresets.find(({ id }) => id === 'preset-177')?.batteryConfigurations?.[0]).toMatchObject({
            format: 'pouch',
            seriesCount: 1,
            parallelCount: null,
        });
        expect(builtInPresets.find(({ id }) => id === 'preset-183')?.batteryConfigurations).toEqual([
            {
                id: 'native-18650',
                profileIds: ['preset-183'],
                format: '18650',
                seriesCount: 1,
                parallelCount: 2,
                support: 'native',
            },
        ]);
        expect(builtInPresets.find(({ id }) => id === 'preset-209')?.batteryConfigurations).toEqual([
            {
                id: 'native-18650',
                profileIds: ['preset-209'],
                format: '18650',
                seriesCount: 1,
                parallelCount: 2,
                support: 'native',
            },
        ]);
        expect(builtInPresets.find(({ id }) => id === 'preset-10')?.batteryConfigurations?.[0]).toMatchObject({
            format: '18650',
            seriesCount: 1,
            parallelCount: 1,
        });
    });

    it('references related presets by stable ID', () => {
        const therion = builtInPresets.find(({ id }) => id === 'preset-183');
        expect(therion?.basedOnPresetId).toBe('preset-34');
        expect(builtInPresets.some(({ id }) => id === therion?.basedOnPresetId)).toBe(true);
    });

    it('projects tri-state operating features for every mod and board profile', () => {
        expect(builtInPresets.every(({ operatingFeatures }) => operatingFeatures !== undefined)).toBe(true);
        expect(builtInPresets.find(({ id }) => id === 'preset-10')?.operatingFeatures).toMatchObject({
            outputModes: { power: 'supported' },
        });
        expect(builtInPresets.find(({ id }) => id === 'preset-101')?.operatingFeatures).toMatchObject({
            outputModes: { voltage: 'supported', power: 'unsupported', current: 'unsupported' },
        });
        expect(builtInPresets.find(({ id }) => id === 'preset-102')?.operatingFeatures).toMatchObject({
            outputModes: { voltage: 'supported', power: 'supported', current: 'unknown' },
        });
        expect(builtInPresets.find(({ id }) => id === 'preset-103')?.operatingFeatures).toMatchObject({
            outputModes: { voltage: 'supported', power: 'supported', current: 'unknown' },
        });
        expect(builtInPresets.find(({ id }) => id === 'preset-136')?.operatingFeatures).toMatchObject({
            outputModes: { voltage: 'supported', power: 'supported', current: 'supported' },
            capabilities: { preheat: 'supported' },
        });
        expect(builtInPresets.find(({ id }) => id === 'preset-233')?.operatingFeatures).toMatchObject({
            outputModes: { voltage: 'unknown', power: 'supported', current: 'unknown' },
            capabilities: { preheat: 'supported' },
        });
        expect(builtInPresets.find(({ id }) => id === 'preset-232')?.operatingFeatures).toMatchObject({
            outputModes: { power: 'supported' },
            capabilities: { temperatureControl: 'supported' },
        });
        expect(builtInPresets.find(({ id }) => id === 'preset-240')?.operatingFeatures).toMatchObject({
            outputModes: { voltage: 'unsupported', power: 'supported', current: 'unsupported' },
            capabilities: { temperatureControl: 'supported', smartMode: 'supported' },
        });

        const evolvDnaProfiles = builtInPresets.filter(({ manufacturer, model }) =>
            manufacturer === 'Evolv' && /^DNA-?\d/.test(model));
        expect(evolvDnaProfiles.every(({ operatingFeatures }) =>
            operatingFeatures?.outputModes.power === 'supported')).toBe(true);
        expect(evolvDnaProfiles
            .filter(({ model }) => Number(model.match(/^DNA-?(\d+)/)?.[1]) >= 40)
            .every(({ operatingFeatures }) =>
                operatingFeatures?.capabilities.temperatureControl === 'supported')).toBe(true);

        const replayBoardSlugs = new Set(['dna60c', 'dna75c', 'dna80c', 'dna100c', 'dna250c']);
        expect(builtInPresets
            .filter(({ slug }) => slug !== undefined && replayBoardSlugs.has(slug))
            .every(({ operatingFeatures }) => operatingFeatures?.capabilities.replay === 'supported')).toBe(true);

        const dnaPowerOnlyProfileIds = new Set([
            'preset-10', 'preset-11', 'preset-29', 'preset-30', 'preset-31', 'preset-32', 'preset-33',
            'preset-34', 'preset-35', 'preset-36', 'preset-37', 'preset-38', 'preset-39', 'preset-177',
            'preset-178', 'preset-181', 'preset-182', 'preset-183', 'preset-184', 'preset-185',
            'preset-199', 'preset-200', 'preset-201', 'preset-209', 'preset-210', 'preset-211',
            'preset-212', 'preset-213', 'preset-215', 'preset-216', 'preset-217', 'preset-218',
            'preset-219', 'preset-220', 'preset-223', 'preset-224',
        ]);
        expect(builtInPresets
            .filter(({ id }) => dnaPowerOnlyProfileIds.has(id))
            .every(({ operatingFeatures }) =>
                operatingFeatures?.outputModes.voltage === 'unsupported'
                && operatingFeatures.outputModes.power === 'supported'
                && operatingFeatures.outputModes.current === 'unsupported')).toBe(true);
        expect(builtInPresets.filter(({ id }) => dnaPowerOnlyProfileIds.has(id)))
            .toHaveLength(dnaPowerOnlyProfileIds.size);
    });

    it('projects every 4.2 V lithium input and linked finished mod as 1S', () => {
        const singleSeriesBoardIds = new Set(builtInPresets
            .filter(({ supportedBatteryInputs }) => supportedBatteryInputs?.some(
                ({ maximumInputVoltageVolts }) => maximumInputVoltageVolts === 4.2,
            ))
            .map(({ id }) => id));

        expect([...singleSeriesBoardIds]).toEqual([
            'preset-33',
            'preset-34',
            'preset-215',
            'preset-216',
            'preset-224',
        ]);
        for (const board of builtInPresets.filter(({ id }) => singleSeriesBoardIds.has(id))) {
            expect(board.supportedBatteryInputs
                ?.filter(({ maximumInputVoltageVolts }) => maximumInputVoltageVolts === 4.2)
                .every(({ seriesCount }) => seriesCount === 1)).toBe(true);
        }

        const linkedMods = builtInPresets.filter(({ basedOnPresetId }) => (
            basedOnPresetId !== undefined && singleSeriesBoardIds.has(basedOnPresetId)
        ));
        expect(linkedMods.map(({ id }) => id)).toEqual(['preset-183', 'preset-243']);
        expect(linkedMods.every(({ batteryConfigurations }) => (
            batteryConfigurations?.every(({ seriesCount }) => seriesCount === 1) === true
        ))).toBe(true);
    });

    it('uses null rather than inventing an unknown manufacturer', () => {
        expect(builtInPresets.find(({ id }) => id === 'preset-26')).toMatchObject({
            manufacturer: null,
            model: 'eGo Twist',
            displayName: 'eGo Twist'
        });
    });
});
