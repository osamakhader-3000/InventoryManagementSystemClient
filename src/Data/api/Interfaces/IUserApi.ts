import {User} from '../../../modules/Security/domain/User'
import {LoginRequest} from '../../../modules/Security/domain/LoginRequest'
import { GeneralApiResult } from '../../../shared/infrastructure/DataTransferObjects/GeneralApiResult';
import Account from '../../../modules/Security/domain/Account';

export interface IUserApi{
    CreateAccount(account:Account):Promise<GeneralApiResult<Date>>;
    LoginAccount(loginRequest:LoginRequest):Promise<GeneralApiResult<Date>>;
    Logout():Promise<void>;
    FetchUser(token:string):Promise<GeneralApiResult<User>>;
    Test(): Promise<GeneralApiResult<boolean>>; 
    MicrosoftLoginCallBack(): Promise<GeneralApiResult<Date>>;
    GetCurrentUser(): Promise<GeneralApiResult<User>>;
    VerifyEmail(token: string): Promise<GeneralApiResult<boolean>>;
    ResendVerificationEmail(): Promise<GeneralApiResult<boolean>>;
    GetUserInfo(): Promise<GeneralApiResult<User>>;
    ChangePassword(oldPassword: string, newPassword: string): Promise<GeneralApiResult<boolean>>;
    ListUsers():Promise<GeneralApiResult<User[]>>;
    SuspendUser(userId: string): Promise<GeneralApiResult<boolean>>;
    ActivateUser(userId: string): Promise<GeneralApiResult<boolean>>;
    ChangeUserRole(user: User): Promise<GeneralApiResult<boolean>>;
    ListUsersByIds(userIds: string[]): Promise<GeneralApiResult<User[]>>;
}