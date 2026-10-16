import User from './User';

export interface UserFilter {
    name?: string;
    departmentId?: string;
    locationId?: string;
}

export interface IUserRepository {
    ListUsers(filter?: UserFilter): Promise<User[]>;
    GetUser(userID: string): Promise<User|null>;
    CreateUser(user: User): Promise<boolean>;
    UpdateUser(user: User): Promise<boolean>;
    DeleteUser(userID: string): Promise<boolean>;
}
