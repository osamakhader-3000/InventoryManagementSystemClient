import { User } from '../../../modules/Security/domain/User.ts'
import { LoginRequest } from '../../DataTransferObjects/LoginRequest.ts'
import { IUserApi } from '../Interfaces/IUserApi.ts'
import urls from '../../../shared/infrastructure/http/urls.json';
import { GeneralApi } from '../../../shared/infrastructure/http/GeneralApi.ts';
import axios from 'axios';
import { GeneralApiResult } from '../../../shared/infrastructure/DataTransferObjects/GeneralApiResult.ts';
import { TokenHolder } from '../../DataTransferObjects/TokenHolder.ts';
import { PasswordChangeRequest } from '../../DataTransferObjects/PasswordChangeRequest.ts';
import Account from '../../../Domain/Entities/Account.ts';

export class UserApi extends GeneralApi implements IUserApi {

    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = urls['security-app-domain'];

    }

    async Test(): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['test']}`;
        let result = await this.SecureApiCaller<boolean>('GET', url);
        return result;
    }


    async CreateAccount(account: Account): Promise<GeneralApiResult<Date>> {
        debugger;
        let url = `${this.baseUrl}/${urls['create-account']}`;
        let result = await this.ApiCaller<Date>('POST', url, account, null);
        return result;
    }


    async LoginAccount(loginRequest: LoginRequest): Promise<GeneralApiResult<Date>> {
        const url = `${this.baseUrl}/${urls['login']}`;
        let result = await this.ApiCaller<Date>('POST', url, loginRequest);
        return result;
    }

    async Logout(): Promise<void> {
        let url = `${this.baseUrl}/${urls['logout']}`;
        axios({ method: 'GET', url: url, withCredentials: true });
    }

    async FetchUser(): Promise<GeneralApiResult<User>> {
        let url = `${this.baseUrl}/${urls['user-get']}`;
        let result = await this.SecureApiCaller<User>('GET', url);
        return result;
    }

    async MicrosoftLoginCallBack(): Promise<GeneralApiResult<Date>> {
        let url = `${this.baseUrl}/${urls['microsoft-login-callback']}`;
        let result = await this.ApiCaller<Date>('POST', url);
        return result;
    }

    async GetCurrentUser(): Promise<GeneralApiResult<User>> {
        let url = `${this.baseUrl}/${urls['current-user']}`;
        let result = await this.SecureApiCaller<User>('GET', url);
        return result;
    }

    async VerifyEmail(token: string): Promise<GeneralApiResult<boolean>> {
        let tokenObj = new TokenHolder(token);
        let url = `${this.baseUrl}/${urls['verify-email']}`;
        let result = await this.ApiCaller<boolean>('PUT', url, tokenObj);
        return result;
    }

    async ResendVerificationEmail(): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['resend-verification-email']}`;
        let result = await this.SecureApiCaller<boolean>('GET', url);
        return result;
    }

    async GetUserInfo(): Promise<GeneralApiResult<User>> {
        let url = `${this.baseUrl}/${urls['get-user-info']}`;
        let result = await this.SecureApiCaller<User>('GET', url);
        return result;
    }

    async ChangePassword(oldPassword: string, newPassword: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['change-password']}`;
        let passwordChangeRequest = new PasswordChangeRequest(oldPassword, newPassword);

        let result = await this.SecureApiCaller<boolean>('PUT', url, passwordChangeRequest);
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


