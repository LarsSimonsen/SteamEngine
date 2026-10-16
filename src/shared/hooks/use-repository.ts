import { useEffect, useState, useSyncExternalStore } from "react";

export type DisposableRepository<Snapshot> = {
    readonly getSnapshot: () => Snapshot;
    readonly subscribe: (listener: () => void) => () => void;
    readonly dispose: () => void;
};

export const useRepository = <Repository extends DisposableRepository<object>>(
    createRepository: () => Repository,
): readonly [Repository, ReturnType<Repository["getSnapshot"]>] => {
    const [repository] = useState(createRepository);
    const snapshot = useSyncExternalStore(
        repository.subscribe,
        repository.getSnapshot,
        repository.getSnapshot,
    ) as ReturnType<Repository["getSnapshot"]>;
    useEffect(() => () => repository.dispose(), [repository]);
    return [repository, snapshot];
};
