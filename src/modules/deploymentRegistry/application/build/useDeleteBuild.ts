import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useDeleteBuild() {
    const { buildRepository } = useContext(DependencyContext);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    const deleteBuild = useCallback(async (buildId: string): Promise<boolean> => {
        setDeletingIds((prev) => new Set(prev).add(buildId));
        try {
            return await buildRepository.DeleteBuild(buildId);
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(buildId);
                return next;
            });
        }
    }, [buildRepository]);

    return { deleteBuild, deletingIds };
}
