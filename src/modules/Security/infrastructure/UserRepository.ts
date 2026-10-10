import { User } from "../domain/User.ts";
import { IUserRepository } from "../domain/IUserRepository.ts";
import { IUserApi } from "./IUserApi.ts";

export class UserRepository implements IUserRepository {

    protected userApi: IUserApi;

    constructor(userApi: IUserApi) {
        this.userApi = userApi;
    }


    async GetUserInfo(): Promise<User> {
        let result = await this.userApi.GetUserInfo();
        return result.data ?? new User('', '', '', '');
    }

    async ListUsers(): Promise<User[]> {
        let result = await this.userApi.ListUsers();
        return result.data??[];
    }

    async SuspendUser(userId: string): Promise<boolean> {
        let result = await this.userApi.SuspendUser(userId);
        return result?.success ?? false;
    }

    async ActivateUser(userId: string): Promise<boolean> {
        let result = await this.userApi.ActivateUser(userId);
       return result?.success ?? false;
    }

    async ChangeUserRole(user: User): Promise<boolean> {
        let result = await this.userApi.ChangeUserRole(user);
        return result?.success ?? false;
    }

    async ListUsersByIds(userIds: string[]): Promise<User[]> {
        let result = await this.userApi.ListUsersByIds(userIds);
        return result.data??[];
    }

}
