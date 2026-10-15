import { useCallback, useContext, useEffect, useState } from "react";
import Location from "../../domain/Location";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useListLocations(name?: string) {
    const { locationRepository } = useContext(DependencyContext);
    const [data, setData] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        locationRepository.ListLocations(name)
            .then((locations) => {
                if (!cancelled) setData(locations);
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
    }, [locationRepository, name, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
