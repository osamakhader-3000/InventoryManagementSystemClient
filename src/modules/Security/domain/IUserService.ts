import { User } from './User';

export interface IUserService {
    GetCurrentUserProfile(): Promise<User>;
    ListUsers(): Promise<User[]>;
    SuspendUser(userId: string): Promise<boolean>;
    ActivateUser(userId: string): Promise<boolean>;
    ChangeUserRole(userId: string, newRole: number): Promise<boolean>;
}
