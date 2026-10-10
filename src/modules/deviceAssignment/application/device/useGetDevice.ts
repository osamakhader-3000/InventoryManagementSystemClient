import { useState, useEffect, useContext } from 'react';
import { DependencyContext } from '../../../../app/DependencyContext';
import Device from '../../domain/Device';

export function useGetDevice(deviceId: string | null) {
        const { deviceRepository } = useContext(DependencyContext);
        const [data, setData] = useState<Device | null>(null);
        const [isLoading, setIsLoading] = useState(deviceId !== null);
        const [error, setError] = useState<unknown>(null);

        useEffect(() => {
            if (deviceId === null) {
                setData(null);
                setIsLoading(false);
                return;
            }

            let cancelled = false;
            setIsLoading(true);
            setError(null);
            deviceRepository.GetDevice(deviceId)
                .then((device) => {
                    if (!cancelled) setData(device);
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
        }, [deviceRepository, deviceId]);

        return { data, isLoading, error };
}
