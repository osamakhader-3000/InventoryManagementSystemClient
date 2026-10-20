import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Build, { type BuildProps } from "../../domain/Build";

export interface UpdateBuildCommand extends BuildProps {
    buildId: string;
}

export function useUpdateBuild() {
    const { buildRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateBuild = useCallback(async ({ buildId, ...changes }: UpdateBuildCommand): Promise<boolean> => {
        const build = Build.update(buildId, changes);

        setIsSaving(true);
        try {
            return await buildRepository.UpdateBuild(build);
        } finally {
            setIsSaving(false);
        }
    }, [buildRepository]);

    return { updateBuild, isSaving };
}
