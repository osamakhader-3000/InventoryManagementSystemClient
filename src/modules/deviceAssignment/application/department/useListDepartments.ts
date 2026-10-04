import { useCallback, useContext, useEffect, useState } from "react";
import Department from "../../domain/Department";
import { DependencyContext } from "../../../../context/DependencyContext";

export function useListDepartments() {
    const { departmentRepository } = useContext(DependencyContext);
    const [data, setData] = useState<Department[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        departmentRepository.ListDepartments()
            .then((departments) => {
                if (!cancelled) setData(departments);
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
    }, [departmentRepository, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
