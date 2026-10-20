import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Build, { type BuildProps } from "../../domain/Build";

export type CreateBuildCommand = BuildProps;

export function useCreateBuild() {
    const { buildRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const createBuild = useCallback(async (command: CreateBuildCommand): Promise<boolean> => {
        const build = Build.create(command);

        setIsSaving(true);
        try {
            return await buildRepository.CreateBuild(build);
        } finally {
            setIsSaving(false);
        }
    }, [buildRepository]);

    return { createBuild, isSaving };
}
