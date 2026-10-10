import { IUserApi } from '../infrastructure/IUserApi.ts';
import { User } from '../../../modules/Security/domain/User.ts'
import { LoginRequest } from '../domain/LoginRequest.ts'
import urls from '../../../shared/infrastructure/http/urls.json';
import { GeneralApi } from '../../../shared/infrastructure/http/GeneralApi.ts';
import axios from 'axios';
import { GeneralApiResult } from '../../../shared/infrastructure/DataTransferObjects/GeneralApiResult.ts';
import { TokenHolder } from '../domain/TokenHolder.ts';
import { PasswordChangeRequest } from '../domain/PasswordChangeRequest.ts';
import Account from '../../../modules/Security/domain/Account.ts';

export class UserApi extends GeneralApi implements IUserApi {

    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['auth']}${urls['user']}`;

    }

    async Test(): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['test']}`;
        let result = await this.SecureApiCaller<boolean>('GET', url);
        return result;
    }





    async GetUserInfo(): Promise<GeneralApiResult<User>> {
        let url = `${this.baseUrl}/${urls['get-user-info']}`;
        let result = await this.SecureApiCaller<User>('GET', url);
        return result;
    }



    async ListUsers(): Promise<GeneralApiResult<User[]>> {
        let url = `${this.baseUrl}/${urls["list-users"]}`;

        let result = await this.SecureApiCaller<User[]>('GET', url);
        return result;
    }

    async SuspendUser(userId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['suspend-user']}/${userId}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url);
        return result;
    }

    async ActivateUser(userId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['activate-user']}/${userId}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url);
        return result;
    }

    async ChangeUserRole(user: User): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['change-user-role']}`;
        let result = await this.SecureApiCaller<boolean>('PUT', url, user);
        return result;
    }


    async ListUsersByIds(userIds: string[]): Promise<GeneralApiResult<User[]>> {
        let url = `${this.baseUrl}/${urls['list-users-by-ids']}`;
        let result = await this.SecureApiCaller<User[]>('POST', url, userIds);
        return result;
    }


}


