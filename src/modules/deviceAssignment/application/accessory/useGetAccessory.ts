import { useState, useEffect, useContext } from 'react';
import { DependencyContext } from '../../../../context/DependencyContext';
import Accessory from '../../domain/Accessory';

export function useGetAccessory(accessoryId: number | null) {
        const { accessoryRepository } = useContext(DependencyContext);
        const [data, setData] = useState<Accessory | null>(null);
        const [isLoading, setIsLoading] = useState(accessoryId !== null);
        const [error, setError] = useState<unknown>(null);

        useEffect(() => {
            if (accessoryId === null) {
                setData(null);
                setIsLoading(false);
                return;
            }

            let cancelled = false;
            setIsLoading(true);
            setError(null);
            accessoryRepository.GetAccessoryById(accessoryId)
                .then((accessory) => {
                    if (!cancelled) setData(accessory);
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
        }, [accessoryRepository, accessoryId]);

        return { data, isLoading, error };
}
