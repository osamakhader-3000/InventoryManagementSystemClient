import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useDeleteUser() {
    const { assignmentUserRepository } = useContext(DependencyContext);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    const deleteUser = useCallback(async (userId: string): Promise<boolean> => {
        setDeletingIds((prev) => new Set(prev).add(userId));
        try {
            // DeleteUser takes a bigint, while user ids arrive from the API as strings.
            return await assignmentUserRepository.DeleteUser(BigInt(userId));
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(userId);
                return next;
            });
        }
    }, [assignmentUserRepository]);

    return { deleteUser, deletingIds };
}
