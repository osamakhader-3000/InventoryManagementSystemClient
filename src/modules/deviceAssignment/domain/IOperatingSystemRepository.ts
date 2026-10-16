import OperatingSystem from './OperatingSystem';

export interface IOperatingSystemRepository {
    ListOperatingSystems(): Promise<OperatingSystem[]>;
    CreateOperatingSystem(operatingSystem: OperatingSystem): Promise<boolean>;
    UpdateOperatingSystem(operatingSystem: OperatingSystem): Promise<boolean>;
    DeleteOperatingSystem(operatingSystemId: string): Promise<boolean>;
    GetOperatingSystem(operatingSystemId: string): Promise<OperatingSystem|null>;
}
