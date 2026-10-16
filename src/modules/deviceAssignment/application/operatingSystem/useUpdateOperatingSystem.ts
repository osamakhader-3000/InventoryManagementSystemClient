import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import OperatingSystem, { type OperatingSystemProps } from "../../domain/OperatingSystem";
import OperatingSystemValidationError from "../../domain/OperatingSystemValidationError";

export interface UpdateOperatingSystemCommand extends OperatingSystemProps {
    operatingSystemId: string;
}

export function useUpdateOperatingSystem() {
    const { operatingSystemRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateOperatingSystem = useCallback(async ({ operatingSystemId, ...changes }: UpdateOperatingSystemCommand): Promise<boolean> => {
        setIsSaving(true);
        try {
            const existing = await operatingSystemRepository.GetOperatingSystem(operatingSystemId);
            if (!existing)
                throw new OperatingSystemValidationError("The operating system no longer exists");

            const operatingSystem = OperatingSystem.update(existing, changes);
            return await operatingSystemRepository.UpdateOperatingSystem(operatingSystem);
        } finally {
            setIsSaving(false);
        }
    }, [operatingSystemRepository]);

    return { updateOperatingSystem, isSaving };
}
