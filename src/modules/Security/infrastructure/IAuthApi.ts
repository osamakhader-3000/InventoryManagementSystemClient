import { GeneralApiResult } from '../../../shared/infrastructure/DataTransferObjects/GeneralApiResult';
import  Account  from '../domain/Account';
import { LoginRequest } from '../domain/LoginRequest';
import { User } from '../domain/User';

export interface IAuthApi {

    Refresh(): Promise<GeneralApiResult<Date>>;
    CreateAccount(account: Account): Promise<GeneralApiResult<Date>>;
    LoginAccount(loginRequest: LoginRequest): Promise<GeneralApiResult<Date>>;
    GetCurrentUser(): Promise<GeneralApiResult<any>>;
    ChangePassword(oldPassword: string, newPassword: string): Promise<GeneralApiResult<boolean>>;
    MicrosoftLoginCallBack(): Promise<GeneralApiResult<Date>>;
    ResendVerificationEmail(): Promise<GeneralApiResult<boolean>>;
    FetchUser(token: string): Promise<GeneralApiResult<User>>;
    Logout(): Promise<void>;
    VerifyEmail(token: string): Promise<GeneralApiResult<boolean>>;
}
