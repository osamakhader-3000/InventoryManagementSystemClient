import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../context/DependencyContext";

export function useDeleteAccessory() {
    const { accessoryRepository } = useContext(DependencyContext);
    const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

    const deleteAccessory = useCallback(async (accessoryId: number): Promise<boolean> => {
        setDeletingIds((prev) => new Set(prev).add(accessoryId));
        try {
            return await accessoryRepository.DeleteAccessory(accessoryId);
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(accessoryId);
                return next;
            });
        }
    }, [accessoryRepository]);

    return { deleteAccessory, deletingIds };
}
