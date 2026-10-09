import { User } from '../../modules/Security/domain/User';
import { AuthenticationResult } from '../../modules/Security/domain/AuthenticationResult';
import Account from '../../modules/Security/domain/Account';

export interface IUserRepository {
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
  GetUserInfo(): Promise<User>;
  ChangePassword(oldPassword: string, newPassword: string): Promise<boolean>;
  ListUsers():Promise<User[]>;
  SuspendUser(userId: string): Promise<boolean>;
  ActivateUser(userId: string): Promise<boolean>;
  ChangeUserRole(user: User): Promise<boolean>;
  ListUsersByIds(userIds: string[]): Promise<User[]>;
}