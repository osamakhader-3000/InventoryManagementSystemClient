import { useCallback, useContext, useState } from "react";
import { DependencyContext } from "../../../../context/DependencyContext";
import Device, { DeviceProps } from "../../domain/Device";
import DeviceValidationError from "../../domain/DeviceValidationError";

export interface UpdateDeviceCommand extends DeviceProps {
    deviceId: string;
}

export function useUpdateDevice() {
    const { deviceRepository } = useContext(DependencyContext);
    const [isSaving, setIsSaving] = useState(false);

    const updateDevice = useCallback(async ({ deviceId, ...changes }: UpdateDeviceCommand): Promise<boolean> => {
        setIsSaving(true);
        try {
            const existing = await deviceRepository.GetDevice(deviceId);
            if (!existing)
                throw new DeviceValidationError("The device no longer exists");

            const device = Device.update(existing, changes);
            return await deviceRepository.UpdateDevice(device);
        } finally {
            setIsSaving(false);
        }
    }, [deviceRepository]);

    return { updateDevice, isSaving };
}
