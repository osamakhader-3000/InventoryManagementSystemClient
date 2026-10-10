import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useDeleteDepartment() {
    const { departmentRepository } = useContext(DependencyContext);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    const deleteDepartment = useCallback(async (departmentId: string): Promise<boolean> => {
        setDeletingIds((prev) => new Set(prev).add(departmentId));
        try {
            return await departmentRepository.DeleteDepartment(departmentId);
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(departmentId);
                return next;
            });
        }
    }, [departmentRepository]);

    return { deleteDepartment, deletingIds };
}
