
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";
import User from '../domain/User';
import { UserFilter } from '../domain/IUserRepository';

export class UserApi extends GeneralApi {
       private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['inventory-domain']}${urls['users-domain']}`;
    }

    async ListUsers(filter?: UserFilter): Promise<GeneralApiResult<User[]>> {
        let params = new URLSearchParams();
        if (filter?.name) params.append('name', filter.name);
        if (filter?.departmentId) params.append('dptId', filter.departmentId);
        if (filter?.locationId) params.append('locId', filter.locationId);
        let query = params.toString();
        let url = `${this.baseUrl}${urls['users-list']}${query ? `?${query}` : ''}`;
        let result = await this.SecureApiCaller<User[]>('GET', url);
        return result;
    }

    async GetUser(userID: string): Promise<GeneralApiResult<User>> {
        let url = `${this.baseUrl}${urls['user-get']}/${userID}`;
        let result = await this.SecureApiCaller<User>('GET', url);
        return result;
        
    }

    async CreateUser(user: User): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['user-create']}`;
        let result = await this.SecureApiCaller<boolean>('POST', url, user);
        return result;
    }

    async UpdateUser(user: User): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['user-update']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, user);
        return result;
    }

    async DeleteUser(userID: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['user-delete']}/${userID}`;
        let result = await this.SecureApiCaller<boolean>('DELETE', url);
        return result;
    }
}
