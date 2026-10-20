import { useState, useEffect, useContext } from 'react';
import { DependencyContext } from '../../../../app/DependencyContext';
import Build from '../../domain/Build';

export function useGetBuild(buildId: string | null) {
        const { buildRepository } = useContext(DependencyContext);
        const [data, setData] = useState<Build | null>(null);
        const [isLoading, setIsLoading] = useState(buildId !== null);
        const [error, setError] = useState<unknown>(null);

        useEffect(() => {
            if (buildId === null) {
                setData(null);
                setIsLoading(false);
                return;
            }

            let cancelled = false;
            setIsLoading(true);
            setError(null);
            buildRepository.GetBuild(buildId)
                .then((build) => {
                    if (!cancelled) setData(build);
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
        }, [buildRepository, buildId]);

        return { data, isLoading, error };
}
