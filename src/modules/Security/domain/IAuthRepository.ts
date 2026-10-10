import { User } from './User';
import { AuthenticationResult } from './AuthenticationResult';
import Account from './Account';

export interface IAuthRepository {
  CreateAccount(account: Account): Promise<AuthenticationResult>;
  LoginAccount(user: User): Promise<AuthenticationResult>;
  Logout(): Promise<void>;
  FetchUser(token: string): Promise<User>; 
  GetLoginExpireTime(): Date | null;
  Refresh(): Promise<AuthenticationResult>;
  MicrosoftLoginCallBack(): Promise<boolean>;
  GetCurrentUser(): Promise<User | null>;
  VerifyEmail(token: string): Promise<boolean>;
  ResendVerificationEmail(): Promise<boolean>;
  ChangePassword(oldPassword: string, newPassword: string): Promise<boolean>;

}