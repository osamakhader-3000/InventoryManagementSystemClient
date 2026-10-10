import { User } from './User';

export interface IUserRepository {
  GetCurrentUser(): Promise<User | null>;
  GetUserInfo(): Promise<User>;
  ChangePassword(oldPassword: string, newPassword: string): Promise<boolean>;
  ListUsers():Promise<User[]>;
  SuspendUser(userId: string): Promise<boolean>;
  ActivateUser(userId: string): Promise<boolean>;
  ChangeUserRole(user: User): Promise<boolean>;
  ListUsersByIds(userIds: string[]): Promise<User[]>;
}