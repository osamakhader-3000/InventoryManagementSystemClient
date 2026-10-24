import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useSuspendUser() {
    const { assignmentUserRepository } = useContext(DependencyContext);
    const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

    const track = useCallback(async (userId: string, action: () => Promise<boolean>): Promise<boolean> => {
        setPendingIds((prev) => new Set(prev).add(userId));
        try {
            return await action();
        } finally {
            setPendingIds((prev) => {
                const next = new Set(prev);
                next.delete(userId);
                return next;
            });
        }
    }, []);

    const suspendUser = useCallback((userId: string): Promise<boolean> =>
        track(userId, () => assignmentUserRepository.SuspendUser(userId)), [assignmentUserRepository, track]);

    const unsuspendUser = useCallback((userId: string): Promise<boolean> =>
        track(userId, () => assignmentUserRepository.UnsuspendUser(userId)), [assignmentUserRepository, track]);

    return { suspendUser, unsuspendUser, pendingIds };
}
