import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Accessory, { type AccessoryProps } from "../../domain/Accessory";

export interface UpdateAccessoryCommand extends AccessoryProps {
    accessoryId: string;
}

export function useUpdateAccessory() {
    const { accessoryRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateAccessory = useCallback(async ({ accessoryId, ...changes }: UpdateAccessoryCommand): Promise<boolean> => {
        setIsSaving(true);
        try {
            const accessory = Accessory.update(accessoryId, changes);
            return await accessoryRepository.UpdateAccessory(accessory);
        } finally {
            setIsSaving(false);
        }
    }, [accessoryRepository]);

    return { updateAccessory, isSaving };
}
