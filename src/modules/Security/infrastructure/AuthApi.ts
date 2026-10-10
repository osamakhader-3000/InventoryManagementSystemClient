import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { IAuthApi } from "./IAuthApi";
import urls from '../../../shared/infrastructure/http/urls.json';
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";
import Account from '../domain/Account.ts';
import {TokenHolder} from '../domain/TokenHolder.ts';
import {PasswordChangeRequest} from '../domain/PasswordChangeRequest.ts';
import {LoginRequest} from '../domain/LoginRequest.ts';
import {User} from '../domain/User.ts';
import axios from "axios";



export class AuthApi extends GeneralApi implements IAuthApi {

    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['security']}${urls['auth']}`;
    }


    Refresh(): Promise<GeneralApiResult<Date>> {
        const url = `${this.baseUrl}${urls["refresh-token"]}`;
        return this.ApiCaller<Date>('POST', url);
    }

    
    async Test(): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['test']}`;
        let result = await this.SecureApiCaller<boolean>('GET', url);
        return result;
    }


    async CreateAccount(account: Account): Promise<GeneralApiResult<Date>> {
        let url = `${this.baseUrl}${urls['create-account']}`;
        let result = await this.ApiCaller<Date>('POST', url, account, null);
        return result;
    }


    async LoginAccount(loginRequest: LoginRequest): Promise<GeneralApiResult<Date>> {
        const url = `${this.baseUrl}${urls['login']}`;
        let result = await this.ApiCaller<Date>('POST', url, loginRequest);
        return result;
    }

    async Logout(): Promise<void> {
        let url = `${this.baseUrl}${urls['logout']}`;
        axios({ method: 'GET', url: url, withCredentials: true });
    }

    async MicrosoftLoginCallBack(): Promise<GeneralApiResult<Date>> {
        let url = `${this.baseUrl}${urls['microsoft-login-callback']}`;
        let result = await this.ApiCaller<Date>('POST', url);
        return result;
    }


    async GetCurrentUser(): Promise<GeneralApiResult<User>> {
        let url = `${this.baseUrl}${urls['current-user']}`;
        let result = await this.SecureApiCaller<User>('GET', url);
        return result;
    }

    async VerifyEmail(token: string): Promise<GeneralApiResult<boolean>> {
        let tokenObj = new TokenHolder(token);
        let url = `${this.baseUrl}${urls['verify-email']}`;
        let result = await this.ApiCaller<boolean>('PUT', url, tokenObj);
        return result;
    }

    async ResendVerificationEmail(): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['resend-verification-email']}`;
        let result = await this.SecureApiCaller<boolean>('GET', url);
        return result;
    }

    async ChangePassword(oldPassword: string, newPassword: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}${urls['change-password']}`;
        let passwordChangeRequest = new PasswordChangeRequest(oldPassword, newPassword);

        let result = await this.SecureApiCaller<boolean>('PUT', url, passwordChangeRequest);
        return result;
    }


    
}
