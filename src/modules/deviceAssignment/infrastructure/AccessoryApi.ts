
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";
import Accessory from '../domain/Accessory';
import AccessoryFilter from '../domain/AccessoryFilter';

export default class AccessoryApi extends GeneralApi {

    private baseUrl: string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['assignments-domain']}${urls['accessory']}`;
    }

    async ListAccessories(filter?: AccessoryFilter): Promise<GeneralApiResult<Accessory[]>> {
        const params = new URLSearchParams();
        if (filter?.name) params.append('name', filter.name);
        if (filter?.inStock !== undefined) params.append('stock', filter.inStock ? '1' : '0');
        if (filter?.date) params.append('date', filter.date);

        const query = params.toString();
        let url = `${this.baseUrl}${urls['accessories-list']}${query ? `?${query}` : ''}`;
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

    async DeleteAccessory(id: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['accessory-delete']}/${id}`;
        let result = await this.SecureApiCaller<boolean>('DELETE', url);
        return result;
    }

    async GetAccessory(id: string): Promise<GeneralApiResult<Accessory>> {
        let url = `${this.baseUrl}${urls['accessory-get']}/${id}`;
        let result = await this.SecureApiCaller<Accessory>('GET', url);
        return result;
    }
}