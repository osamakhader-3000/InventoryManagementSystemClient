import { useCallback, useContext, useEffect, useState } from "react";
import Assignment from "../../domain/Assignment";
import { DependencyContext } from "../../../../app/DependencyContext";
import AssignmentFilter from "../../domain/AssignmentFilter";

export function useListAssignments(filter?: AssignmentFilter) {
    const { assignmentRepository } = useContext(DependencyContext);
    const [data, setData] = useState<Assignment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        assignmentRepository.ListAssignments(filter)
            .then((assignments) => {
                if (!cancelled) setData(assignments);
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
    }, [assignmentRepository, filter, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
