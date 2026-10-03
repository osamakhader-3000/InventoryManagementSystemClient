import { IDeviceRepository } from "../domain/IDeviceRepository";
import Device from "../domain/Device";
import { DeviceApi } from "./DeviceApi";

export class HttpDeviceRepository implements IDeviceRepository {

    private deviceApi: DeviceApi;

    constructor() {
        this.deviceApi = new DeviceApi();
    }

    async ListDevices(): Promise<Device[]> {
        let result = await this.deviceApi.ListDevices();
        if (!Array.isArray(result.data)) 
            return [];
        return result.data??new Array<Device>();
    }

    async CreateDevice(device: Device): Promise<boolean> {
        let result = await this.deviceApi.CreateDevice(device);
        return result.success??false;
    }

    async UpdateDevice(device: Device): Promise<boolean> {
        let result = await this.deviceApi.UpdateDevice(device);
        return result.success??false;
    }

    async DeleteDevice(deviceId: string): Promise<boolean> {
        let result = await this.deviceApi.DeleteDevice(deviceId);
        return result.success??false;
    }

    async GetDevice(deviceId: string): Promise<Device|null> {
        let result = await this.deviceApi.GetDevice(deviceId);
        return result.data??null;
    }

}