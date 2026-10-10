import { User } from "../domain/User.ts";
import { LoginRequest } from "../domain/LoginRequest.ts";
import { IAuthRepository } from "../domain/IAuthRepository.ts";
import { IAuthApi } from "./IAuthApi.ts";
import { IAuthStorage } from "../../../Data/LocalData/Interfaces/IAuthStorage.ts";
import { AuthenticationResult } from "../domain/AuthenticationResult.ts";
import { IAuthSessionService } from "./IAuthSessionService.ts";
import Account from "../domain/Account.ts";

export class AuthRepository implements IAuthRepository {

    protected authApi: IAuthApi;
    protected authStorage: IAuthStorage;
    protected authService: IAuthSessionService;

    constructor(authApi: IAuthApi, authStorage: IAuthStorage, authService: IAuthSessionService) {
        this.authApi = authApi;
        this.authStorage = authStorage;
        this.authService = authService;
    }


    async FetchUser(token: string): Promise<User> {

        let result = await this.authApi.FetchUser(token);
        return result.data ?? new User('', '', '', '');
    }

    async LoginAccount(user: User): Promise<AuthenticationResult> {
        if (!user.username || !user.password)
            throw new Error("Username and Password are required");

        let loginReq = new LoginRequest(user.username, user.password);

        return await this.authService.AfterLogin(async () => {
            let result = await this.authApi.LoginAccount(loginReq);
            return result;
        });
    }

    async CreateAccount(account: Account): Promise<AuthenticationResult> {
        return await this.authService.AfterLogin(async () => {
            let result = await this.authApi.CreateAccount(account);
            return result;
        });
    }


    GetLoginExpireTime(): Date | null {
        return this.authStorage.GetLoginExpireTime();
    }

    async Refresh(): Promise<AuthenticationResult> {
        return await this.authService.Refresh();
    }

    async Logout(): Promise<void> {
        this.authStorage.RemoveCurrentUser();
        this.authStorage.RemoveLoginExpireTime();
        this.authApi.Logout();
    }



    async MicrosoftLoginCallBack(): Promise<boolean> {
        let result= await this.authService.AfterLogin(async () => {
                let result = await this.authApi.MicrosoftLoginCallBack();
                return result;
        });
        return result.success;
    }

    async GetCurrentUser(): Promise<User | null> {

        let cachedUser = this.authStorage.GetCurrentUser();
        if (cachedUser)
            return cachedUser;

        let result = await this.authApi.GetCurrentUser();

        if (result.data)
            this.authStorage.SetCurrentUser(result.data);

        return result?.data ?? null;
    }

    async VerifyEmail(token: string): Promise<boolean> {
        let result = await this.authApi.VerifyEmail(token);
        return result.data ?? false;
    }

    async ResendVerificationEmail(): Promise<boolean> {
        let result = await this.authApi.ResendVerificationEmail();
        return result?.success ?? false;
    }


    async ChangePassword(oldPassword: string, newPassword: string): Promise<boolean> {
        let result = await this.authApi.ChangePassword(oldPassword, newPassword);
        return result?.success ?? false;
    }
    
}