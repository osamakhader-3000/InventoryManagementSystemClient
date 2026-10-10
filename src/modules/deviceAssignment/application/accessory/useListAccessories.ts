import { useCallback, useContext, useEffect, useState } from "react";
import Accessory from "../../domain/Accessory";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useListAccessories() {
    const { accessoryRepository } = useContext(DependencyContext);
    const [data, setData] = useState<Accessory[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        accessoryRepository.ListAccessories()
            .then((accessories) => {
                debugger;
                if (!cancelled) setData(accessories);
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
    }, [accessoryRepository, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
