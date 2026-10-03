import  Device  from "./Device";

export interface IDeviceRepository {
  ListDevices(): Promise<Device[]>;
}