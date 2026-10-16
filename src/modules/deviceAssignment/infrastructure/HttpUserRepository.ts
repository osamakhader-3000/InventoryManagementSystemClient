import { IUserRepository } from '../domain/IUserRepository';
import User from '../domain/User';
import { UserApi } from './UserApi';

export class HttpUserRepository implements IUserRepository {

    private userApi: UserApi;

    constructor() {
        this.userApi = new UserApi();
    }

    async ListUsers(): Promise<User[]> {
        let result = await this.userApi.ListUsers();

        if (!Array.isArray(result.data)) 
            return [];

        return result.data??new Array<User>();
    }

    async GetUser(userID: string): Promise<User|null> {
        let result = await this.userApi.GetUser(userID);
        return result.data;
    }

    async CreateUser(user: User): Promise<boolean> {
        let result = await this.userApi.CreateUser(user);
        return result.success;
    }

    async UpdateUser(user: User): Promise<boolean> {
        let result = await this.userApi.UpdateUser(user);
        return result.success;
    }

    async DeleteUser(userID: string): Promise<boolean> {
        let result = await this.userApi.DeleteUser(userID);
        return result.success;
    }

}