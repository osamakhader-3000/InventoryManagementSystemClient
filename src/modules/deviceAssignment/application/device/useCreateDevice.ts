import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../app/DependencyContext";
import Device, { DeviceProps } from "../../domain/Device";

export type CreateDeviceCommand = DeviceProps;

export function useCreateDevice() {
    const { deviceRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const createDevice = useCallback(async (command: CreateDeviceCommand): Promise<boolean> => {
        const device = Device.create(command);

        setIsSaving(true);
        try {
            return await deviceRepository.CreateDevice(device);
        } finally {
            setIsSaving(false);
        }
    }, [deviceRepository]);

    return { createDevice, isSaving };
}
