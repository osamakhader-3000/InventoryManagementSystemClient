import User from './User';

export interface UserFilter {
    name?: string;
    departmentId?: string;
    locationId?: string;
    isSuspended?: boolean;
}

export interface IUserRepository {
    ListUsers(filter?: UserFilter): Promise<User[]>;
    GetUser(userID: string): Promise<User|null>;
    CreateUser(user: User): Promise<boolean>;
    UpdateUser(user: User): Promise<boolean>;
    SuspendUser(userID: string): Promise<boolean>;
    UnsuspendUser(userID: string): Promise<boolean>;
}
