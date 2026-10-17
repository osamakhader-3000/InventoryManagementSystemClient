import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useDeleteAssignment() {
    const { assignmentRepository } = useContext(DependencyContext);
    const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

    const deleteAssignment = useCallback(async (assignmentId: number): Promise<boolean> => {
        setDeletingIds((prev) => new Set(prev).add(assignmentId));
        try {
            return await assignmentRepository.DeleteAssignment(assignmentId);
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(assignmentId);
                return next;
            });
        }
    }, [assignmentRepository]);

    return { deleteAssignment, deletingIds };
}
