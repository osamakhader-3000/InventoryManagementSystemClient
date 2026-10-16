import Location from '../domain/Location';
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export default class LocationApi extends GeneralApi {
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['inventory-domain']}${urls['location']}`;
    }

    async ListLocations(name?: string): Promise<GeneralApiResult<Location[]>> {
        let url = `${this.baseUrl}${urls['location-list']}`;
        if (name)
            url += `?name=${encodeURIComponent(name)}`;
        let result = await this.SecureApiCaller<Location[]>('GET',url);
        return result;
    }

    async CreateLocation(location: Location): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['location-create']}`;
        let result = await this.SecureApiCaller<boolean>('POST', url, { name: location.name });
        return result;
    }

    async UpdateLocation(location: Location): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['location-update']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, location);
        return result;
    }

    async DeleteLocation(locationId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['location-delete']}/${locationId}`;
        let result = await this.SecureApiCaller<boolean>('DELETE', url);
        return result;
    }

    async GetLocation(locationId: string): Promise<GeneralApiResult<Location>> {
        let url = `${this.baseUrl}${urls['location-get']}/${locationId}`;
        let result = await this.SecureApiCaller<Location>('GET', url);
        return result;
    }
}
