import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Client, { type ClientProps } from "../../domain/Client";

export type CreateClientCommand = ClientProps;

export function useCreateClient() {
    const { clientRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const createClient = useCallback(async (command: CreateClientCommand): Promise<boolean> => {
        const client = Client.create(command);

        setIsSaving(true);
        try {
            return await clientRepository.CreateClient(client);
        } finally {
            setIsSaving(false);
        }
    }, [clientRepository]);

    return { createClient, isSaving };
}
