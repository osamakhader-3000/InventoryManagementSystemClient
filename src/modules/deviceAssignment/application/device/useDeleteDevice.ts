import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useDeleteDevice() {
    const { deviceRepository } = useContext(DependencyContext);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    const deleteDevice = useCallback(async (deviceId: string): Promise<boolean> => {
        setDeletingIds((prev) => new Set(prev).add(deviceId));
        try {
            return await deviceRepository.DeleteDevice(deviceId);
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(deviceId);
                return next;
            });
        }
    }, [deviceRepository]);

    return { deleteDevice, deletingIds };
}
