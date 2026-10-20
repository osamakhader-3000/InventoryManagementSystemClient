import { useCallback, useContext, useEffect, useState } from "react";
import Client from "../../domain/Client";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useListClients(name?: string) {
    const { clientRepository } = useContext(DependencyContext);
    const [data, setData] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        clientRepository.ListClients(name)
            .then((clients) => {
                if (!cancelled) setData(clients);
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
    }, [clientRepository, name, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
