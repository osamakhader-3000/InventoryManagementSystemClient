import { useState, useEffect, useContext } from 'react';
import { DependencyContext } from '../../../../app/DependencyContext';
import Assignment from '../../domain/Assignment';

export function useGetAssignment(assignmentId: bigint | null) {
        const { assignmentRepository } = useContext(DependencyContext);
        const [data, setData] = useState<Assignment | null>(null);
        const [isLoading, setIsLoading] = useState(assignmentId !== null);
        const [error, setError] = useState<unknown>(null);

        useEffect(() => {
            if (assignmentId === null) {
                setData(null);
                setIsLoading(false);
                return;
            }

            let cancelled = false;
            setIsLoading(true);
            setError(null);
            assignmentRepository.GetAssignment(assignmentId)
                .then((assignment) => {
                    if (!cancelled) setData(assignment);
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
        }, [assignmentRepository, assignmentId]);

        return { data, isLoading, error };
}
