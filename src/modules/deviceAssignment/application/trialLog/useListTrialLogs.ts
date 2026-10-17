import { useCallback, useContext, useEffect, useState } from "react";
import TrialLog from "../../domain/TrialLog";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useListTrialLogs() {
    const { trialLogRepository } = useContext(DependencyContext);
    const [data, setData] = useState<TrialLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        trialLogRepository.ListTrialLogs()
            .then((trialLogs) => {
                if (!cancelled) setData(trialLogs);
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
