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

        //fake data for testing purposes
        var fakeData = [
            new Device("1", "Desktop - Dell OptiPlex 7060", "CW883P2","Win 10 Home 64 Bit","Core i7, 16 GB RAM, 1 TB NVMe",new Date(),new Date(),100,0),
            new Device("2", "MS Surface Pro 4", "CW883P3","Win 10 Pro 64 Bit","Core i7, 16 GB RAM, 512 GB NVMe",new Date(),new Date(),100,0),
            new Device("3", "HP EliteBook 840 G6", "5CG952649Y","Win 11 Pro 64 Bit","Ultra 7, 32 GB RAM, 1 TB NVMe",new Date(),new Date(),100,0),
            new Device("4", "Lenovo Thinkpad T15", "0F009PV220701J","Win 11 home 64 Bit","Ultra 7, 32 GB RAM, 1 TB NVMe",new Date(),new Date(),100,0)
        ];

        return fakeData;

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