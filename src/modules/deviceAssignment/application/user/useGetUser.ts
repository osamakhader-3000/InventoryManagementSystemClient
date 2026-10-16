import { useState, useEffect, useContext } from 'react';
import { DependencyContext } from '../../../../app/DependencyContext';
import User from '../../domain/User';

export function useGetUser(userId: string | null) {
        const { assignmentUserRepository } = useContext(DependencyContext);
        const [data, setData] = useState<User | null>(null);
        const [isLoading, setIsLoading] = useState(userId !== null);
        const [error, setError] = useState<unknown>(null);

        useEffect(() => {
            if (userId === null) {
                setData(null);
                setIsLoading(false);
                return;
            }

            let cancelled = false;
            setIsLoading(true);
            setError(null);
            assignmentUserRepository.GetUser(userId)
                .then((user) => {
                    if (!cancelled) setData(user);
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
        }, [assignmentUserRepository, userId]);

        return { data, isLoading, error };
}
