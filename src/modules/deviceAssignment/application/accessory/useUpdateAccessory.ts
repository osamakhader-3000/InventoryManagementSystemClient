import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Accessory, { type AccessoryProps } from "../../domain/Accessory";
import AccessoryValidationError from "../../domain/AccessoryValidationError";

export interface UpdateAccessoryCommand extends AccessoryProps {
    accessoryId: number;
}

export function useUpdateAccessory() {
    const { accessoryRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateAccessory = useCallback(async ({ accessoryId, ...changes }: UpdateAccessoryCommand): Promise<boolean> => {
        setIsSaving(true);
        try {
            const existing = await accessoryRepository.GetAccessoryById(accessoryId);
            if (!existing)
                throw new AccessoryValidationError("The accessory no longer exists");

            const accessory = Accessory.update(existing, changes);
            return await accessoryRepository.UpdateAccessory(accessory);
        } finally {
            setIsSaving(false);
        }
    }, [accessoryRepository]);

    return { updateAccessory, isSaving };
}
