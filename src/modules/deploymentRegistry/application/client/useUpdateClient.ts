import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Client, { type ClientProps } from "../../domain/Client";

export interface UpdateClientCommand extends ClientProps {
    clientId: string;
}

export function useUpdateClient() {
    const { clientRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateClient = useCallback(async ({ clientId, ...changes }: UpdateClientCommand): Promise<boolean> => {
        const client = Client.update(clientId, changes);

        setIsSaving(true);
        try {
            return await clientRepository.UpdateClient(client);
        } finally {
            setIsSaving(false);
        }
    }, [clientRepository]);

    return { updateClient, isSaving };
}
