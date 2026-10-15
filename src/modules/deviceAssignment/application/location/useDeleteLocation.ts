import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useDeleteLocation() {
    const { locationRepository } = useContext(DependencyContext);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    const deleteLocation = useCallback(async (locationId: string): Promise<boolean> => {
        setDeletingIds((prev) => new Set(prev).add(locationId));
        try {
            return await locationRepository.DeleteLocation(locationId);
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(locationId);
                return next;
            });
        }
    }, [locationRepository]);

    return { deleteLocation, deletingIds };
}
