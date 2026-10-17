import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useReturnAssignment() {
    const { assignmentRepository } = useContext(DependencyContext);
    const [returningIds, setReturningIds] = useState<Set<number>>(new Set());

    const returnAssignment = useCallback(async (assignmentId: number): Promise<boolean> => {
        setReturningIds((prev) => new Set(prev).add(assignmentId));
        try {
            return await assignmentRepository.ReturnAssignment(assignmentId);
        } finally {
            setReturningIds((prev) => {
                const next = new Set(prev);
                next.delete(assignmentId);
                return next;
            });
        }
    }, [assignmentRepository]);

    return { returnAssignment, returningIds };
}
