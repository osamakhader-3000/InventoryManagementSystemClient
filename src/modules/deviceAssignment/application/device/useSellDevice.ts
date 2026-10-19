import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useSellDevice() {
    const { deviceRepository } = useContext(DependencyContext);
    const [sellingIds, setSellingIds] = useState<Set<string>>(new Set());

    const sellDevice = useCallback(async (deviceId: string, price: number): Promise<boolean> => {
        setSellingIds((prev) => new Set(prev).add(deviceId));
        try {
            return await deviceRepository.SellDevice(deviceId, price);
        } finally {
            setSellingIds((prev) => {
                const next = new Set(prev);
                next.delete(deviceId);
                return next;
            });
        }
    }, [deviceRepository]);

    return { sellDevice, sellingIds };
}
