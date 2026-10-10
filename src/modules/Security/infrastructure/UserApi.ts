import { IUserApi } from './IUserApi.ts';
import { User } from '../domain/User.ts'
import urls from '../../../shared/infrastructure/http/urls.json';
import { GeneralApi } from '../../../shared/infrastructure/http/GeneralApi.ts';
import { GeneralApiResult } from '../../../shared/infrastructure/DataTransferObjects/GeneralApiResult.ts';

export class UserApi extends GeneralApi implements IUserApi {

    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['auth']}${urls['user']}`;

    }

    async Test(): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['test']}`;
        let result = await this.SecureApiCaller<boolean>('GET', url);
        return result;
    }





    async GetUserInfo(): Promise<GeneralApiResult<User>> {
        let url = `${this.baseUrl}${urls['get-user-info']}`;
        let result = await this.SecureApiCaller<User>('GET', url);
        return result;
    }



    async ListUsers(): Promise<GeneralApiResult<User[]>> {
        let url = `${this.baseUrl}${urls["list-users"]}`;

        let result = await this.SecureApiCaller<User[]>('GET', url);
        return result;
    }

    async SuspendUser(userId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['suspend-user']}/${userId}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url);
        return result;
    }

    async ActivateUser(userId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['activate-user']}/${userId}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url);
        return result;
    }

    async ChangeUserRole(user: User): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['change-user-role']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, user);
        return result;
    }


    async ListUsersByIds(userIds: string[]): Promise<GeneralApiResult<User[]>> {
        let url = `${this.baseUrl}${urls['list-users-by-ids']}`;
        let result = await this.SecureApiCaller<User[]>('POST', url, userIds);
        return result;
    }


}


