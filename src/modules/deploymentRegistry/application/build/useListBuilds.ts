import { useCallback, useContext, useEffect, useState } from "react";
import Build from "../../domain/Build";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useListBuilds(version?: string) {
    const { buildRepository } = useContext(DependencyContext);
    const [data, setData] = useState<Build[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        buildRepository.ListBuilds(version)
            .then((builds) => {
                if (!cancelled) setData(builds);
            })
            .catch((err) => {
                if (!cancelled) setError(err);
            })
            .finally(() => {
                if (!cancelled) setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [buildRepository, version, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
