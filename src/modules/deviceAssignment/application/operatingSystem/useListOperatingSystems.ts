import { useCallback, useContext, useEffect, useState } from "react";
import OperatingSystem from "../../domain/OperatingSystem";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useListOperatingSystems() {
    const { operatingSystemRepository } = useContext(DependencyContext);
    const [data, setData] = useState<OperatingSystem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        operatingSystemRepository.ListOperatingSystems()
            .then((operatingSystems) => {
                if (!cancelled) setData(operatingSystems);
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
    }, [operatingSystemRepository, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
