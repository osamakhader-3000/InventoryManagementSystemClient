
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";
import Accessory from '../domain/Accessory';

export default class AccessoryApi extends GeneralApi {

    private baseUrl: string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['assignments-domain']}${urls['accessories']}`;
    }

    async ListAccessories(): Promise<GeneralApiResult<Accessory[]>> {
        let url = `${this.baseUrl}${urls['accessories-list']}`;
        let result = await this.SecureApiCaller<Accessory[]>('GET', url);   
        return result;
    }

    async CreateAccessory(data: Accessory): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['accessory-create']}`;
        let result = await this.SecureApiCaller<boolean>('POST', url, data);
        return result;
    }

    async UpdateAccessory(data: Accessory): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['accessory-update']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, data);
        return result;
    }

    async DeleteAccessory(id: number): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['accessory-delete']}/${id}`;
        let result = await this.SecureApiCaller<boolean>('DELETE', url);
        return result;
    }

    async GetAccessory(id: number): Promise<GeneralApiResult<Accessory>> {
        let url = `${this.baseUrl}${urls['accessory-get']}`;
        let result = await this.SecureApiCaller<Accessory>('GET', url, { id });
        return result;
    }
}