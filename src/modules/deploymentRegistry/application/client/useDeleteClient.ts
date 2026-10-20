import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";

export function useDeleteClient() {
    const { clientRepository } = useContext(DependencyContext);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    const deleteClient = useCallback(async (clientId: string): Promise<boolean> => {
        setDeletingIds((prev) => new Set(prev).add(clientId));
        try {
            return await clientRepository.DeleteClient(clientId);
        } finally {
            setDeletingIds((prev) => {
                const next = new Set(prev);
                next.delete(clientId);
                return next;
            });
        }
    }, [clientRepository]);

    return { deleteClient, deletingIds };
}
