import  Device  from "./Device";
import DeviceFilter from "./DeviceFilter";

export interface IDeviceRepository {
  ListDevices(filter?: DeviceFilter): Promise<Device[]>;
  GetDevice(deviceId: string): Promise<Device | null>;
  CreateDevice(device: Device): Promise<boolean>;
  UpdateDevice(device: Device): Promise<boolean>;
  DeleteDevice(deviceId: string): Promise<boolean>;
}
