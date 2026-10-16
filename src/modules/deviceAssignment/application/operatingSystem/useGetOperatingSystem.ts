import { useState, useEffect, useContext } from 'react';
import { DependencyContext } from '../../../../app/DependencyContext';
import OperatingSystem from '../../domain/OperatingSystem';

export function useGetOperatingSystem(operatingSystemId: string | null) {
        const { operatingSystemRepository } = useContext(DependencyContext);
        const [data, setData] = useState<OperatingSystem | null>(null);
        const [isLoading, setIsLoading] = useState(operatingSystemId !== null);
        const [error, setError] = useState<unknown>(null);

        useEffect(() => {
            if (operatingSystemId === null) {
                setData(null);
                setIsLoading(false);
                return;
            }

            let cancelled = false;
            setIsLoading(true);
            setError(null);
            operatingSystemRepository.GetOperatingSystem(operatingSystemId)
                .then((operatingSystem) => {
                    if (!cancelled) setData(operatingSystem);
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
        }, [operatingSystemRepository, operatingSystemId]);

        return { data, isLoading, error };
}
