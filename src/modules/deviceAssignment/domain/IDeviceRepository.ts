import  Device  from "./Device";

export interface IDeviceRepository {
  ListDevices(): Promise<Device[]>;
  GetDevice(deviceId: string): Promise<Device | null>;
  CreateDevice(device: Device): Promise<boolean>;
  UpdateDevice(device: Device): Promise<boolean>;
  DeleteDevice(deviceId: string): Promise<boolean>;
}
