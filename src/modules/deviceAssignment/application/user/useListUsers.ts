import { useCallback, useContext, useEffect, useState } from "react";
import User from "../../domain/User";
import { DependencyContext } from "../../../../context/DependencyContext";

export function useListUsers() {
    const { assignmentUserRepository } = useContext(DependencyContext);
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        assignmentUserRepository.ListUsers()
            .then((users) => {
                if (!cancelled) setData(users);
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
    }, [assignmentUserRepository, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
