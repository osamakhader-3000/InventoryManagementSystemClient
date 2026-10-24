import { useCallback, useContext, useEffect, useState } from "react";
import TrialLogAgent from "../../domain/TrialLogAgent";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useListTrialLogAgents() {
    const { trialLogRepository } = useContext(DependencyContext);
    const [data, setData] = useState<TrialLogAgent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        trialLogRepository.ListAgents()
            .then((agents) => {
                if (!cancelled) setData(agents);
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
    }, [trialLogRepository, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
