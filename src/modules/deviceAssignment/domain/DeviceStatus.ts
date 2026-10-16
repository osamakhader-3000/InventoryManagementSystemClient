export enum DeviceStatus {
    New = 0,
    Used = 1
}

export const deviceStatusOptions: DeviceStatus[] = [DeviceStatus.New, DeviceStatus.Used];

// Returns the enum name for a status value, or an empty string when the value is null or not in the enum.
export function getDeviceStatusLabel(status: number | null | undefined): string {
    if (status === null || status === undefined)
        return "";
    const label = DeviceStatus[status];
    return typeof label === "string" ? label : "";
}
