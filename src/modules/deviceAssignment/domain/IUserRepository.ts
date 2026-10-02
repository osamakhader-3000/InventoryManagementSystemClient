import User from './User';

export interface IUserRepository {
    ListUsers(): Promise<User[]>;
    GetUser(userID: bigint): Promise<User|null>;
    CreateUser(user: User): Promise<boolean>;
    UpdateUser(user: User): Promise<boolean>;
    DeleteUser(userID: bigint): Promise<boolean>;
}