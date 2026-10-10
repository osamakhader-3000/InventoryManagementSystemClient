import Account from './Account';
import UserLoginStatus from './UserLogInStatus';
import { User } from './User';
import { ICurrentUserProvider } from './ICurrentUserProvider';

export interface IAuthService extends ICurrentUserProvider {
    CreateAccount(account: Account): Promise<boolean>;
    LoginAccount(user: User): Promise<boolean>;
    CheckLoggedIn(): Promise<UserLoginStatus>;
    Logout(): Promise<void>;
    MicrosoftLoginCallBack(): Promise<boolean>;
    VerifyEmail(token: string): Promise<boolean>;
    ResendVerificationEmail(): Promise<boolean>;
    ChangePassword(oldPassword: string, newPassword: string): Promise<boolean>;
}
