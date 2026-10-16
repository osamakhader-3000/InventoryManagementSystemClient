import { useCallback, useContext, useEffect, useState } from "react";
import Device from "../../domain/Device";
import { DependencyContext } from "../../../../app/DependencyContext";
import DeviceFilter from "../../domain/DeviceFilter";

export function useListDevices(filter?: DeviceFilter) {
    const { deviceRepository } = useContext(DependencyContext);
    const [data, setData] = useState<Device[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        let cancelled = false;        
        deviceRepository.ListDevices(filter)
            .then((devices) => {
                if (!cancelled) setData(devices);
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
    }, [deviceRepository, filter, reloadKey]);

    const reload = useCallback(() => setReloadKey((k) => k + 1), []);

    return { data, isLoading, error, reload };
}
