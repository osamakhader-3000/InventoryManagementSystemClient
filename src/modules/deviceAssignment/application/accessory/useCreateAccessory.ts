import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Accessory, { type AccessoryProps } from "../../domain/Accessory";

export type CreateAccessoryCommand = AccessoryProps;

export function useCreateAccessory() {
    const { accessoryRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const createAccessory = useCallback(async (command: CreateAccessoryCommand): Promise<boolean> => {
        const accessory = Accessory.create(command);

        setIsSaving(true);
        try {
            return await accessoryRepository.AddAccessory(accessory);
        } finally {
            setIsSaving(false);
        }
    }, [accessoryRepository]);

    return { createAccessory, isSaving };
}
