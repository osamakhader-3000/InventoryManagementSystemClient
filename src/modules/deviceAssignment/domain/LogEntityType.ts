// Mirrors the backend LogEntityType enum (serialized as a byte).
export enum LogEntityType {
    Assignment = 0,
    Accessory = 1,
    Device = 2,
    User = 3
}

export const logEntityTypeLabel = (value: LogEntityType): string => LogEntityType[value] ?? '';

export const logEntityTypeOptions: LogEntityType[] = [
    LogEntityType.Assignment,
    LogEntityType.Accessory,
    LogEntityType.Device,
    LogEntityType.User
];
