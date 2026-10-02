
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";
import User from '../domain/User';

export class UserApi extends GeneralApi {
       private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}/${urls['assignments-domain']}`;
    }

    async ListUsers(): Promise<GeneralApiResult<User[]>> {
        let url = `${this.baseUrl}/${urls['users-list']}`;
        let result = await this.GeneralApiCaller<User[]>('GET', url);
        return result;
    }

    async GetUser(userID: bigint): Promise<GeneralApiResult<User>> {
        let url = `${this.baseUrl}/${urls['user-get']}/${userID.toString()}`;
        let result = await this.GeneralApiCaller<User>('GET', url);
        return result;
        
    }

    async CreateUser(user: User): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['user-create']}`;
        let result = await this.GeneralApiCaller<boolean>('POST', url, user);
        return result;
    }

    async UpdateUser(user: User): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['user-update']}`;
        let result = await this.GeneralApiCaller<boolean>('PUT', url, user);
        return result;
    }

    async DeleteUser(userID: bigint): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['user-delete']}/${userID.toString()}`;
        let result = await this.GeneralApiCaller<boolean>('DELETE', url);
        return result;
    }
}
