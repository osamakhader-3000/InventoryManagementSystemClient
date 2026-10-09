import Account from '../../modules/Security/domain/Account';
import UserLogginStatus from '../../modules/Security/domain/UserLogInStatus';
import {User} from '../../modules/Security/domain/User'

export interface IUserService{
    CreateAccount(account: Account): Promise<boolean>;
    LoginAccount(user: User): Promise<boolean>;
    CheckLoggedIn(): Promise<UserLogginStatus>;
    Logout(): Promise<void>;
    FetchUser(token: string): Promise<User>;
    MicrosoftLoginCallBack(): Promise<boolean>;
    GetCurrentUser(): Promise<User | null>;
    VerifyEmail(token:string): Promise<boolean>;
    ResendVerificationEmail(): Promise<boolean>;
    GetCurrentUserProfile(): Promise<User>;
    ChangePassword(oldPassword:string,newPassword:string): Promise<boolean>;
    ListUsers():Promise<User[]>;
    SuspendUser(userId:string): Promise<boolean>;
    ActivateUser(userId:string): Promise<boolean>;
    ChangeUserRole(userId:string, newRole:number): Promise<boolean>;
}