import Device from "../domain/Device";
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";


export class DeviceApi extends GeneralApi{
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}/${urls['assignments-domain']}/${urls['devices']}/`;
    }

    async ListDevices(): Promise<GeneralApiResult<Device[]>> {
        let url = `${this.baseUrl}/${urls['devices-list']}`;
        let result = await this.GeneralApiCaller<Device[]>('GET', url);
        return result;
    }

    async CreateDevice(device: Device): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['device-create']}`;
        let result = await this.GeneralApiCaller<boolean>('POST', url, device);
        return result;
    }
    
    async UpdateDevice(device: Device): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['device-update']}`;
        let result = await this.GeneralApiCaller<boolean>('PUT', url, device);
        return result;
    }

    async DeleteDevice(deviceId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['device-delete']}`;
        let result = await this.GeneralApiCaller<boolean>('DELETE', url, { id: deviceId });
        return result;
    }

    async GetDevice(deviceId: string): Promise<GeneralApiResult<Device>> {
        let url = `${this.baseUrl}/${urls['device-get']}`;
        let result = await this.GeneralApiCaller<Device>('GET', url, { id: deviceId });
        return result;
    }
}