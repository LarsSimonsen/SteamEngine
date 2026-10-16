import { describe, expect, it } from 'vitest';
import { batteryPresets } from './batteries/defaults';
import { builtInPresets } from './mods/presets';

describe('initial catalog weight batch', () => {
    it('contains the researched exact-cell weights', () => {
        expect(Object.fromEntries(
            ['battery-97', 'battery-100', 'battery-106', 'battery-107', 'battery-108']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-97': 48,
            'battery-100': 70,
            'battery-106': 47.1,
            'battery-107': 46.6,
            'battery-108': 67.5
        });
    });

    it('contains the researched standalone-board weights', () => {
        expect(Object.fromEntries(
            ['preset-29', 'preset-31', 'preset-33', 'preset-224', 'preset-217']
                .map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-29': 6,
            'preset-31': 6,
            'preset-33': 15,
            'preset-224': 15.2,
            'preset-217': 15.85
        });
    });

    it('contains the researched second battery batch weights', () => {
        expect(Object.fromEntries(
            [
                'battery-33', 'battery-34', 'battery-35', 'battery-47', 'battery-48', 'battery-49',
                'battery-50', 'battery-51', 'battery-52', 'battery-53', 'battery-54', 'battery-56',
                'battery-58', 'battery-64', 'battery-65', 'battery-66', 'battery-102',
            ].map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-33': 44,
            'battery-34': 48,
            'battery-35': 48,
            'battery-47': 44,
            'battery-48': 47.5,
            'battery-49': 47.5,
            'battery-50': 49.5,
            'battery-51': 48,
            'battery-52': 90,
            'battery-53': 47,
            'battery-54': 44.5,
            'battery-56': 45,
            'battery-58': 48,
            'battery-64': 45,
            'battery-65': 45,
            'battery-66': 44.3,
            'battery-102': 48,
        });
    });

    it('contains the researched third battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-55', 'battery-57', 'battery-59', 'battery-61', 'battery-67', 'battery-68', 'battery-70', 'battery-75']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-55': 45,
            'battery-57': 45,
            'battery-59': 40.5,
            'battery-61': 48,
            'battery-67': 43.6,
            'battery-68': 85,
            'battery-70': 92.5,
            'battery-75': 21,
        });
    });

    it('contains the researched fourth battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-77', 'battery-78', 'battery-79', 'battery-80', 'battery-81', 'battery-82', 'battery-83', 'battery-84']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-77': 48,
            'battery-78': 48,
            'battery-79': 47,
            'battery-80': 50,
            'battery-81': 48,
            'battery-82': 71,
            'battery-83': 67,
            'battery-84': 67,
        });
    });

    it('contains the researched fifth battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-85', 'battery-86', 'battery-87', 'battery-88']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-85': 72,
            'battery-86': 75,
            'battery-87': 71,
            'battery-88': 76,
        });
    });

    it('contains the researched sixth battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-89', 'battery-90', 'battery-91', 'battery-92']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-89': 72,
            'battery-90': 75,
            'battery-91': 71,
            'battery-92': 71,
        });
    });

    it('contains the researched seventh battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-93', 'battery-94', 'battery-95', 'battery-96']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-93': 48,
            'battery-94': 48,
            'battery-95': 46,
            'battery-96': 57.8,
        });
    });

    it('contains the researched eighth battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-98', 'battery-99', 'battery-101', 'battery-103']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-98': 46,
            'battery-99': 47,
            'battery-101': 71,
            'battery-103': 70,
        });
    });

    it('contains the researched ninth battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-104', 'battery-105', 'battery-109', 'battery-110']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-104': 70,
            'battery-105': 72,
            'battery-109': 45,
            'battery-110': 73.7,
        });
    });

    it('contains the researched tenth battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-111', 'battery-112', 'battery-113', 'battery-114']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-111': 89.2,
            'battery-112': 60,
            'battery-113': 62,
            'battery-114': 60,
        });
    });

    it('contains the researched eleventh battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-115', 'battery-116', 'battery-117', 'battery-118']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-115': 71.5,
            'battery-116': 95,
            'battery-117': 95,
            'battery-118': 70,
        });
    });

    it('contains the researched twelfth battery batch weights', () => {
        expect(Object.fromEntries(
            ['battery-119', 'battery-120', 'battery-121', 'battery-122', 'battery-123', 'battery-124']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-119': 68,
            'battery-120': 72,
            'battery-121': 24,
            'battery-122': 26,
            'battery-123': 72,
            'battery-124': 70,
        });
    });

    it('contains the resolved weights from the first legacy battery batch', () => {
        expect(Object.fromEntries(
            ['battery-1', 'battery-3', 'battery-4']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-1': 19.7,
            'battery-3': 15,
            'battery-4': 24,
        });
    });

    it('contains the resolved weights from the second legacy battery batch', () => {
        expect(Object.fromEntries(
            ['battery-5', 'battery-6', 'battery-9', 'battery-10']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-5': 15,
            'battery-6': 35,
            'battery-9': 45,
            'battery-10': 44,
        });
    });

    it('contains the resolved weight from the AWT and EH legacy batch', () => {
        expect(batteryPresets.find((battery) => battery.id === 'battery-11')?.weightGrams).toBe(90);
    });

    it('contains the resolved weights from the first Efest legacy batch', () => {
        expect(Object.fromEntries(
            ['battery-16', 'battery-17', 'battery-18', 'battery-20', 'battery-21']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-16': 22,
            'battery-17': 21,
            'battery-18': 34,
            'battery-20': 40,
            'battery-21': 33,
        });
    });

    it('contains the resolved weights from the second Efest legacy batch', () => {
        expect(Object.fromEntries(
            ['battery-22', 'battery-23', 'battery-24', 'battery-25', 'battery-27', 'battery-28', 'battery-29']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-22': 55,
            'battery-23': 50,
            'battery-24': 45,
            'battery-25': 46,
            'battery-27': 48,
            'battery-28': 50,
            'battery-29': 92,
        });
    });

    it('contains the resolved weight from the Keeppower legacy batch', () => {
        expect(batteryPresets.find((battery) => battery.id === 'battery-32')?.weightGrams).toBe(95);
    });

    it('contains the resolved weights from the MNKE, Nitecore, and Orbtronic legacy batch', () => {
        expect(Object.fromEntries(
            ['battery-36', 'battery-40', 'battery-41', 'battery-42', 'battery-43', 'battery-44', 'battery-46']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-36': 40.5,
            'battery-40': 48,
            'battery-41': 46,
            'battery-42': 46,
            'battery-43': 44,
            'battery-44': 47,
            'battery-46': 44,
        });
    });

    it('keeps conflicting or incomplete legacy weight research unresolved', () => {
        expect(Object.fromEntries(
            ['battery-37', 'battery-38', 'battery-39', 'battery-45']
                .map((id) => [id, batteryPresets.find((battery) => battery.id === id)?.weightGrams]),
        )).toEqual({
            'battery-37': undefined,
            'battery-38': undefined,
            'battery-39': undefined,
            'battery-45': undefined,
        });
    });

    it('contains the resolved UltraFire XSL legacy weight', () => {
        expect(batteryPresets.find((battery) => battery.id === 'battery-73')?.weightGrams).toBe(23);
    });

    it('contains the resolved Sibeile IMR 18500 legacy weight', () => {
        expect(batteryPresets.find((battery) => battery.id === 'battery-62')?.weightGrams).toBe(46);
    });

    it('contains the researched recent mod and board weights', () => {
        expect(Object.fromEntries(
            [
                'preset-214', 'preset-215', 'preset-216', 'preset-217', 'preset-218', 'preset-219', 'preset-220',
                'preset-221', 'preset-222', 'preset-223', 'preset-224', 'preset-227', 'preset-228', 'preset-229',
                'preset-230', 'preset-231', 'preset-232', 'preset-233', 'preset-234', 'preset-235', 'preset-236',
                'preset-237', 'preset-238', 'preset-239', 'preset-240'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-214': 171,
            'preset-215': 15,
            'preset-216': 15.2,
            'preset-217': 15.85,
            'preset-218': 15.85,
            'preset-219': 15.85,
            'preset-220': 15.85,
            'preset-221': 222,
            'preset-222': 77.4,
            'preset-223': 15.2,
            'preset-224': 15.2,
            'preset-227': 108,
            'preset-228': 279,
            'preset-229': 156.58,
            'preset-230': 206,
            'preset-231': 186,
            'preset-232': 143.3,
            'preset-233': 190,
            'preset-234': 196,
            'preset-235': 173,
            'preset-236': 85,
            'preset-237': 96.6,
            'preset-238': 103,
            'preset-239': 150,
            'preset-240': 163.4
        });
    });

    it('contains the resolved historical mod and board weights', () => {
        expect(Object.fromEntries(
            [
                'preset-2', 'preset-6', 'preset-12', 'preset-13', 'preset-14', 'preset-15', 'preset-16',
                'preset-23', 'preset-24', 'preset-25', 'preset-30', 'preset-32', 'preset-34', 'preset-35',
                'preset-36', 'preset-37', 'preset-38', 'preset-39'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-2': 144,
            'preset-6': 239,
            'preset-12': 99,
            'preset-13': 115,
            'preset-14': 183,
            'preset-15': 135,
            'preset-16': 242.5,
            'preset-23': 232,
            'preset-24': 160,
            'preset-25': 90,
            'preset-30': 6,
            'preset-32': 6,
            'preset-34': 15,
            'preset-35': 15,
            'preset-36': 15,
            'preset-37': 15,
            'preset-38': 15,
            'preset-39': 15
        });
    });

    it('keeps the unresolved historical mod weight outcomes undefined', () => {
        expect(Object.fromEntries(
            [
                'preset-1', 'preset-3', 'preset-4', 'preset-5', 'preset-7', 'preset-8', 'preset-9', 'preset-10',
                'preset-11', 'preset-17', 'preset-18', 'preset-19', 'preset-20', 'preset-21', 'preset-22',
                'preset-26', 'preset-27', 'preset-28', 'preset-40'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-1': undefined,
            'preset-3': undefined,
            'preset-4': undefined,
            'preset-5': undefined,
            'preset-7': undefined,
            'preset-8': undefined,
            'preset-9': undefined,
            'preset-10': undefined,
            'preset-11': undefined,
            'preset-17': undefined,
            'preset-18': undefined,
            'preset-19': undefined,
            'preset-20': undefined,
            'preset-21': undefined,
            'preset-22': undefined,
            'preset-26': undefined,
            'preset-27': undefined,
            'preset-28': undefined,
            'preset-40': undefined
        });
    });

    it('contains the resolved historical mod weights from profiles 41 through 63', () => {
        expect(Object.fromEntries(
            [
                'preset-41', 'preset-42', 'preset-43', 'preset-44', 'preset-45', 'preset-51', 'preset-52',
                'preset-55', 'preset-56', 'preset-57', 'preset-59', 'preset-61', 'preset-62'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-41': 87,
            'preset-42': 100,
            'preset-43': 98,
            'preset-44': 148,
            'preset-45': 180,
            'preset-51': 218.6,
            'preset-52': 144,
            'preset-55': 200,
            'preset-56': 161,
            'preset-57': 100,
            'preset-59': 162,
            'preset-61': 273,
            'preset-62': 45
        });
    });

    it('keeps the unresolved historical mod weight outcomes from profiles 41 through 63 undefined', () => {
        expect(Object.fromEntries(
            [
                'preset-46', 'preset-47', 'preset-48', 'preset-49', 'preset-50', 'preset-53', 'preset-54',
                'preset-58', 'preset-60', 'preset-63'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-46': undefined,
            'preset-47': undefined,
            'preset-48': undefined,
            'preset-49': undefined,
            'preset-50': undefined,
            'preset-53': undefined,
            'preset-54': undefined,
            'preset-58': undefined,
            'preset-60': undefined,
            'preset-63': undefined
        });
    });

    it('contains the resolved historical mod weights from profiles 64 through 90', () => {
        expect(Object.fromEntries(
            [
                'preset-65', 'preset-66', 'preset-67', 'preset-68', 'preset-69', 'preset-73', 'preset-78',
                'preset-82', 'preset-83', 'preset-87'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-65': 69.5,
            'preset-66': 232.18,
            'preset-67': 232.18,
            'preset-68': 148,
            'preset-69': 140,
            'preset-73': 117,
            'preset-78': 160,
            'preset-82': 120,
            'preset-83': 120,
            'preset-87': 130
        });
    });

    it('keeps the unresolved historical mod weight outcomes from profiles 64 through 90 undefined', () => {
        expect(Object.fromEntries(
            [
                'preset-64', 'preset-70', 'preset-71', 'preset-72', 'preset-74', 'preset-75', 'preset-76',
                'preset-77', 'preset-79', 'preset-80', 'preset-81', 'preset-84', 'preset-85', 'preset-86',
                'preset-88', 'preset-89', 'preset-90'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-64': undefined,
            'preset-70': undefined,
            'preset-71': undefined,
            'preset-72': undefined,
            'preset-74': undefined,
            'preset-75': undefined,
            'preset-76': undefined,
            'preset-77': undefined,
            'preset-79': undefined,
            'preset-80': undefined,
            'preset-81': undefined,
            'preset-84': undefined,
            'preset-85': undefined,
            'preset-86': undefined,
            'preset-88': undefined,
            'preset-89': undefined,
            'preset-90': undefined
        });
    });

    it('contains the resolved historical mod and board weights from profiles 91 through 120', () => {
        expect(Object.fromEntries(
            [
                'preset-94', 'preset-95', 'preset-96', 'preset-98', 'preset-99', 'preset-100', 'preset-102',
                'preset-106', 'preset-107', 'preset-108', 'preset-109', 'preset-110', 'preset-111', 'preset-116'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-94': 2.6,
            'preset-95': 6.6,
            'preset-96': 125,
            'preset-98': 5.4,
            'preset-99': 2,
            'preset-100': 163,
            'preset-102': 137.3,
            'preset-106': 276,
            'preset-107': 140,
            'preset-108': 99,
            'preset-109': 170,
            'preset-110': 260,
            'preset-111': 185,
            'preset-116': 106
        });
    });

    it('keeps the unresolved historical mod weight outcomes from profiles 91 through 120 undefined', () => {
        expect(Object.fromEntries(
            [
                'preset-91', 'preset-92', 'preset-93', 'preset-97', 'preset-101', 'preset-103', 'preset-104',
                'preset-105', 'preset-112', 'preset-113', 'preset-114', 'preset-115', 'preset-117', 'preset-118',
                'preset-119', 'preset-120'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-91': undefined,
            'preset-92': undefined,
            'preset-93': undefined,
            'preset-97': undefined,
            'preset-101': undefined,
            'preset-103': undefined,
            'preset-104': undefined,
            'preset-105': undefined,
            'preset-112': undefined,
            'preset-113': undefined,
            'preset-114': undefined,
            'preset-115': undefined,
            'preset-117': undefined,
            'preset-118': undefined,
            'preset-119': undefined,
            'preset-120': undefined
        });
    });

    it('contains the resolved historical mod weights from profiles 121 through 150', () => {
        expect(Object.fromEntries(
            [
                'preset-121', 'preset-122', 'preset-123', 'preset-124', 'preset-125', 'preset-127', 'preset-128',
                'preset-130', 'preset-131', 'preset-132', 'preset-133', 'preset-136', 'preset-137', 'preset-139',
                'preset-140', 'preset-141', 'preset-145'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-121': 144,
            'preset-122': 201,
            'preset-123': 76,
            'preset-124': 238.6,
            'preset-125': 130,
            'preset-127': 90,
            'preset-128': 174,
            'preset-130': 80,
            'preset-131': 400,
            'preset-132': 450,
            'preset-133': 290.3,
            'preset-136': 134,
            'preset-137': 130,
            'preset-139': 312,
            'preset-140': 120,
            'preset-141': 92,
            'preset-145': 135
        });
    });

    it('keeps the unresolved historical mod weight outcomes from profiles 121 through 150 undefined', () => {
        expect(Object.fromEntries(
            [
                'preset-126', 'preset-129', 'preset-134', 'preset-135', 'preset-138', 'preset-142', 'preset-143',
                'preset-144', 'preset-146', 'preset-147', 'preset-148', 'preset-149', 'preset-150'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-126': undefined,
            'preset-129': undefined,
            'preset-134': undefined,
            'preset-135': undefined,
            'preset-138': undefined,
            'preset-142': undefined,
            'preset-143': undefined,
            'preset-144': undefined,
            'preset-146': undefined,
            'preset-147': undefined,
            'preset-148': undefined,
            'preset-149': undefined,
            'preset-150': undefined
        });
    });

    it('contains the resolved historical mod weights from profiles 151 through 180', () => {
        expect(Object.fromEntries(
            ['preset-153', 'preset-176', 'preset-180']
                .map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-153': 177,
            'preset-176': 152,
            'preset-180': 225
        });
    });

    it('keeps the unresolved historical mod weight outcomes from profiles 151 through 180 undefined', () => {
        expect(Object.fromEntries(
            [
                'preset-151', 'preset-152', 'preset-154', 'preset-155', 'preset-156', 'preset-157', 'preset-158',
                'preset-159', 'preset-160', 'preset-161', 'preset-162', 'preset-163', 'preset-164', 'preset-165',
                'preset-166', 'preset-167', 'preset-168', 'preset-169', 'preset-170', 'preset-171', 'preset-172',
                'preset-173', 'preset-174', 'preset-175', 'preset-177', 'preset-178', 'preset-179'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-151': undefined,
            'preset-152': undefined,
            'preset-154': undefined,
            'preset-155': undefined,
            'preset-156': undefined,
            'preset-157': undefined,
            'preset-158': undefined,
            'preset-159': undefined,
            'preset-160': undefined,
            'preset-161': undefined,
            'preset-162': undefined,
            'preset-163': undefined,
            'preset-164': undefined,
            'preset-165': undefined,
            'preset-166': undefined,
            'preset-167': undefined,
            'preset-168': undefined,
            'preset-169': undefined,
            'preset-170': undefined,
            'preset-171': undefined,
            'preset-172': undefined,
            'preset-173': undefined,
            'preset-174': undefined,
            'preset-175': undefined,
            'preset-177': undefined,
            'preset-178': undefined,
            'preset-179': undefined
        });
    });

    it('contains the resolved historical mod weights from profiles 181 through 210', () => {
        expect(Object.fromEntries(
            [
                'preset-182', 'preset-183', 'preset-187', 'preset-188', 'preset-191', 'preset-192', 'preset-193',
                'preset-194', 'preset-196', 'preset-205', 'preset-206', 'preset-207', 'preset-210'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-182': 145,
            'preset-183': 173,
            'preset-187': 150,
            'preset-188': 240.9,
            'preset-191': 150,
            'preset-192': 150,
            'preset-193': 120,
            'preset-194': 145,
            'preset-196': 153,
            'preset-205': 140,
            'preset-206': 140,
            'preset-207': 130,
            'preset-210': 160
        });
    });

    it('keeps the unresolved historical mod weight outcomes from profiles 181 through 210 undefined', () => {
        expect(Object.fromEntries(
            [
                'preset-181', 'preset-184', 'preset-185', 'preset-186', 'preset-189', 'preset-190', 'preset-195',
                'preset-197', 'preset-198', 'preset-199', 'preset-200', 'preset-201', 'preset-202', 'preset-203',
                'preset-204', 'preset-208', 'preset-209'
            ].map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-181': undefined,
            'preset-184': undefined,
            'preset-185': undefined,
            'preset-186': undefined,
            'preset-189': undefined,
            'preset-190': undefined,
            'preset-195': undefined,
            'preset-197': undefined,
            'preset-198': undefined,
            'preset-199': undefined,
            'preset-200': undefined,
            'preset-201': undefined,
            'preset-202': undefined,
            'preset-203': undefined,
            'preset-204': undefined,
            'preset-208': undefined,
            'preset-209': undefined
        });
    });

    it('keeps the unresolved historical Vapor Shark weight outcomes undefined', () => {
        expect(Object.fromEntries(
            ['preset-211', 'preset-212', 'preset-213']
                .map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-211': undefined,
            'preset-212': undefined,
            'preset-213': undefined
        });
    });

    it('keeps the unresolved recent mod weight outcomes undefined', () => {
        expect(Object.fromEntries(
            ['preset-225', 'preset-226']
                .map((id) => [id, builtInPresets.find((preset) => preset.id === id)?.weightGrams]),
        )).toEqual({
            'preset-225': undefined,
            'preset-226': undefined
        });
    });
});
