export const debouncedRequestSuperseded = Symbol("debounced-request-superseded");

export type DebouncedRequest<T> = {
    readonly schedule: (request: () => Promise<T>) => Promise<T>;
    readonly cancel: () => void;
};

export const createDebouncedRequest = <T>(delayMs: number): DebouncedRequest<T> => {
    let timer: number | undefined;
    let rejectPending: ((reason: typeof debouncedRequestSuperseded) => void) | undefined;

    const cancel = (): void => {
        if (timer !== undefined) window.clearTimeout(timer);
        timer = undefined;
        rejectPending?.(debouncedRequestSuperseded);
        rejectPending = undefined;
    };

    const schedule = (request: () => Promise<T>): Promise<T> => {
        cancel();
        return new Promise<T>((resolve, reject) => {
            rejectPending = reject;
            timer = window.setTimeout(() => {
                timer = undefined;
                rejectPending = undefined;
                void request().then(resolve, reject);
            }, delayMs);
        });
    };

    return { schedule, cancel };
};
