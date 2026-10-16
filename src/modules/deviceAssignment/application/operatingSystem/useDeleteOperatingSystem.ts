import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useDeleteOperatingSystem() {
    const { operatingSystemRepository } = useContext(DependencyContext);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    const deleteOperatingSystem = useCallback(async (operatingSystemId: string): Promise<boolean> => {
        setDeletingIds((prev) => new Set(prev).add(operatingSystemId));
        try {
            return await operatingSystemRepository.DeleteOperatingSystem(operatingSystemId);
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(operatingSystemId);
                return next;
            });
        }
    }, [operatingSystemRepository]);

    return { deleteOperatingSystem, deletingIds };
}
