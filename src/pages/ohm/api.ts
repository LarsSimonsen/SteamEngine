import { fieldCodeByField, type OhmField, type OhmValues } from './domain';
import { requestJson } from '../../shared/backend-request';

const ohmApiUrl = 'https://steam-engine-api.lars-simonsen.workers.dev/api/v1/ohm';

type OhmApiResponse = Readonly<Record<'r' | 'u' | 'i' | 'p', unknown>>;

const isPositiveFinite = (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value) && value > 0;

const readResponse = (value: unknown): OhmValues => {
    const response = value as Partial<OhmApiResponse>;
    if (!isPositiveFinite(response.r) || !isPositiveFinite(response.u)
        || !isPositiveFinite(response.i) || !isPositiveFinite(response.p)) {
        throw new Error('The Ohm API returned an invalid result.');
    }
    return { resistance: response.r, voltage: response.u, current: response.i, power: response.p };
};

export const calculateOhmValues = async (
    values: OhmValues,
    field: OhmField,
    value: number,
    lock: OhmField,
): Promise<OhmValues> => {
    const query = new URLSearchParams({
        f: fieldCodeByField[field],
        v: String(value),
        l: fieldCodeByField[lock],
        r: String(values.resistance),
        u: String(values.voltage),
        i: String(values.current),
        p: String(values.power),
    });
    return readResponse(await requestJson<OhmApiResponse>(
        `${ohmApiUrl}?${query.toString()}`, undefined, 'The Ohm API',
    ));
};
