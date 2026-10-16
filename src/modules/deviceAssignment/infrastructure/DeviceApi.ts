import Device from "../domain/Device";
import DeviceFilter from "../domain/DeviceFilter";
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";


export class DeviceApi extends GeneralApi{
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['assignments-domain']}${urls['device']}`;
    }

    async ListDevices(filter?: DeviceFilter): Promise<GeneralApiResult<Device[]>> {
        const params = new URLSearchParams();
        if (filter?.model) params.append('model', filter.model);
        if (filter?.serialNumber) params.append('sn', filter.serialNumber);
        if (filter?.operatingSystem) params.append('os', filter.operatingSystem);
        if (filter?.purchasedDate) params.append('purDate', filter.purchasedDate);

        const query = params.toString();
        let url = `${this.baseUrl}${urls['devices-list']}${query ? `?${query}` : ''}`;
        let result = await this.SecureApiCaller<Device[]>('GET', url);
        return result;
    }

    async CreateDevice(device: Device): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['device-create']}`;
        let result = await this.SecureApiCaller<boolean>('POST', url, device);
        return result;
    }
    
    async UpdateDevice(device: Device): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['device-update']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, device);
        return result;
    }

    async DeleteDevice(deviceId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['device-delete']}/${deviceId}`;
        let result = await this.SecureApiCaller<boolean>('DELETE', url);
        return result;
    }

    async GetDevice(deviceId: string): Promise<GeneralApiResult<Device>> {
        let url = `${this.baseUrl}${urls['device-get']}/${deviceId}`;
        let result = await this.SecureApiCaller<Device>('GET', url);
        return result;
    }
}