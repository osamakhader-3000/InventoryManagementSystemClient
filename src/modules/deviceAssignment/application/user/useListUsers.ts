import { useCallback, useContext, useEffect, useState } from "react";
import User from "../../domain/User";
import { UserFilter } from "../../domain/IUserRepository";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useListUsers(filter?: UserFilter) {
    const { assignmentUserRepository } = useContext(DependencyContext);
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);
    // Depend on the individual fields so a new filter object with the same values doesn't refetch.
    const { name, departmentId, locationId, isSuspended } = filter ?? {};

    useEffect(() => {
        let cancelled = false;
        assignmentUserRepository.ListUsers({ name, departmentId, locationId, isSuspended })
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
    }, [assignmentUserRepository, reloadKey, name, departmentId, locationId, isSuspended]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
