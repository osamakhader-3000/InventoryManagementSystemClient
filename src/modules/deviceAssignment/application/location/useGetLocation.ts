import { useState, useEffect, useContext } from 'react';
import { DependencyContext } from '../../../../app/DependencyContext';
import Location from '../../domain/Location';

export function useGetLocation(locationId: string | null) {
        const { locationRepository } = useContext(DependencyContext);
        const [data, setData] = useState<Location | null>(null);
        const [isLoading, setIsLoading] = useState(locationId !== null);
        const [error, setError] = useState<unknown>(null);

        useEffect(() => {
            if (locationId === null) {
                setData(null);
                setIsLoading(false);
                return;
            }

            let cancelled = false;
            setIsLoading(true);
            setError(null);
            locationRepository.GetLocation(locationId)
                .then((location) => {
                    if (!cancelled) setData(location);
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
        }, [locationRepository, locationId]);

        return { data, isLoading, error };
}
