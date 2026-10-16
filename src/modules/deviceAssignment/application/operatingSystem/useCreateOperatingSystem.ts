import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import OperatingSystem, { type OperatingSystemProps } from "../../domain/OperatingSystem";

export type CreateOperatingSystemCommand = OperatingSystemProps;

export function useCreateOperatingSystem() {
    const { operatingSystemRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const createOperatingSystem = useCallback(async (command: CreateOperatingSystemCommand): Promise<boolean> => {
        const operatingSystem = OperatingSystem.create(command);

        setIsSaving(true);
        try {
            return await operatingSystemRepository.CreateOperatingSystem(operatingSystem);
        } finally {
            setIsSaving(false);
        }
    }, [operatingSystemRepository]);

    return { createOperatingSystem, isSaving };
}
