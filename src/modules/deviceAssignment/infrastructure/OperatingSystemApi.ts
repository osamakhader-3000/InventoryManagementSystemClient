import OperatingSystem from '../domain/OperatingSystem';
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export default class OperatingSystemApi extends GeneralApi {
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['assignments-domain']}${urls['operating-system']}`;
    }

    async ListOperatingSystems(): Promise<GeneralApiResult<OperatingSystem[]>> {
        let url = `${this.baseUrl}${urls['operating-system-list']}`;
        let result = await this.SecureApiCaller<OperatingSystem[]>('GET',url);
        return result;
    }

    async CreateOperatingSystem(operatingSystem: OperatingSystem): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['operating-system-create']}`;
        let result = await this.SecureApiCaller<boolean>('POST', url, { name: operatingSystem.name });
        return result;
    }

    async UpdateOperatingSystem(operatingSystem: OperatingSystem): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['operating-system-update']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, operatingSystem);
        return result;
    }

    async DeleteOperatingSystem(operatingSystemId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['operating-system-delete']}/${operatingSystemId}`;
        let result = await this.SecureApiCaller<boolean>('DELETE', url);
        return result;
    }

    async GetOperatingSystem(operatingSystemId: string): Promise<GeneralApiResult<OperatingSystem>> {
        let url = `${this.baseUrl}${urls['operating-system-get']}/${operatingSystemId}`;
        let result = await this.SecureApiCaller<OperatingSystem>('GET', url);
        return result;
    }
}
