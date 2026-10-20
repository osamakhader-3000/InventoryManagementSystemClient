import { useState, useEffect, useContext } from 'react';
import { DependencyContext } from '../../../../app/DependencyContext';
import Client from '../../domain/Client';

export function useGetClient(clientId: string | null) {
        const { clientRepository } = useContext(DependencyContext);
        const [data, setData] = useState<Client | null>(null);
        const [isLoading, setIsLoading] = useState(clientId !== null);
        const [error, setError] = useState<unknown>(null);

        useEffect(() => {
            if (clientId === null) {
                setData(null);
                setIsLoading(false);
                return;
            }

            let cancelled = false;
            setIsLoading(true);
            setError(null);
            clientRepository.GetClient(clientId)
                .then((client) => {
                    if (!cancelled) setData(client);
                })
                .catch((err) => {
                    if (!cancelled) setError(err);
                })
                .finally(() => {
                    if (!cancelled) setIsLoading(false);
                });

            return () => {
                cancelled = true;
            };
        }, [clientRepository, clientId]);

        return { data, isLoading, error };
}
