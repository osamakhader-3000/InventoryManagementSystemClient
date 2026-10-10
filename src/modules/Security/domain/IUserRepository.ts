import { User } from './User';

export interface IUserRepository {
  GetUserInfo(): Promise<User>;
  ListUsers(): Promise<User[]>;
  SuspendUser(userId: string): Promise<boolean>;
  ActivateUser(userId: string): Promise<boolean>;
  ChangeUserRole(user: User): Promise<boolean>;
  ListUsersByIds(userIds: string[]): Promise<User[]>;
}
