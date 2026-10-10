import { User } from "../domain/User.ts";
import { LoginRequest } from "../domain/LoginRequest.ts";
import { IUserRepository } from "../domain/IUserRepository.ts";
import { IUserApi } from "./IUserApi.ts";
import { IAuthStorage } from "../../../Data/LocalData/Interfaces/IAuthStorage.ts";
import { AuthenticationResult } from "../domain/AuthenticationResult.ts";
import { IAuthSessionService } from "./IAuthSessionService.ts";
import Account from "../domain/Account.ts";

export class UserRepository implements IUserRepository {

    protected userApi: IUserApi;
    protected authStorage: IAuthStorage;
    protected authService: IAuthSessionService;

    constructor(userApi: IUserApi, authStorage: IAuthStorage, authService: IAuthSessionService) {
        this.userApi = userApi;
        this.authStorage = authStorage;
        this.authService = authService;
    }


    async FetchUser(token: string): Promise<User> {

        let result = await this.userApi.FetchUser(token);
        return result.data ?? new User('', '', '', '');
    }

    async LoginAccount(user: User): Promise<AuthenticationResult> {
        if (!user.username || !user.password)
            throw new Error("Username and Password are required");

        let loginReq = new LoginRequest(user.username, user.password);

        return await this.authService.AfterLogin(async () => {
            let result = await this.userApi.LoginAccount(loginReq);
            return result;
        });
    }

    async CreateAccount(account: Account): Promise<AuthenticationResult> {
        return await this.authService.AfterLogin(async () => {
            let result = await this.userApi.CreateAccount(account);
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
        this.userApi.Logout();
    }



    async MicrosoftLoginCallBack(): Promise<boolean> {
        let result= await this.authService.AfterLogin(async () => {
                let result = await this.userApi.MicrosoftLoginCallBack();
                return result;
        });
        return result.success;
    }

    async GetCurrentUser(): Promise<User | null> {

        let cachedUser = this.authStorage.GetCurrentUser();
        if (cachedUser)
            return cachedUser;

        let result = await this.userApi.GetCurrentUser();

        if (result.data)
            this.authStorage.SetCurrentUser(result.data);

        return result?.data ?? null;
    }

    async VerifyEmail(token: string): Promise<boolean> {
        let result = await this.userApi.VerifyEmail(token);
        return result.data ?? false;
    }

    async ResendVerificationEmail(): Promise<boolean> {
        let result = await this.userApi.ResendVerificationEmail();
        return result?.success ?? false;
    }

    async GetUserInfo(): Promise<User> {
        let result = await this.userApi.GetUserInfo();
        return result.data ?? new User('', '', '', '');
    }


    async ChangePassword(oldPassword: string, newPassword: string): Promise<boolean> {
        let result = await this.userApi.ChangePassword(oldPassword, newPassword);
        return result?.success ?? false;
    }

    async ListUsers(): Promise<User[]> {
        let result = await this.userApi.ListUsers();
        return result.data??[];
    }

    async SuspendUser(userId: string): Promise<boolean> {
        let result = await this.userApi.SuspendUser(userId);
        return result?.success ?? false;
    }

    async ActivateUser(userId: string): Promise<boolean> {
        let result = await this.userApi.ActivateUser(userId);
       return result?.success ?? false;
    }  

    async ChangeUserRole(user: User): Promise<boolean> {
        let result = await this.userApi.ChangeUserRole(user);
        return result?.success ?? false;
    }

    async ListUsersByIds(userIds: string[]): Promise<User[]> {
        let result = await this.userApi.ListUsersByIds(userIds);
        return result.data??[];
    }
    
}