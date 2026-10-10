import { useState, useEffect, useContext } from 'react';
import { DependencyContext } from '../../../../app/DependencyContext';
import Department from '../../domain/Department';

export function useGetDepartment(departmentId: string | null) {
        const { departmentRepository } = useContext(DependencyContext);
        const [data, setData] = useState<Department | null>(null);
        const [isLoading, setIsLoading] = useState(departmentId !== null);
        const [error, setError] = useState<unknown>(null);

        useEffect(() => {
            if (departmentId === null) {
                setData(null);
                setIsLoading(false);
                return;
            }

            let cancelled = false;
            setIsLoading(true);
            setError(null);
            departmentRepository.GetDepartment(departmentId)
                .then((department) => {
                    if (!cancelled) setData(department);
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
        }, [departmentRepository, departmentId]);

        return { data, isLoading, error };
}
