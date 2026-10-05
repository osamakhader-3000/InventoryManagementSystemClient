import Department from '../domain/Department';
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

        //create fake data for testng
        /*
        Bdour Khalouf
Mr. Al Otaiba
Froilan Pagador
Lubna Sarhan
Mohamed Shahi
Moutaz Bou Saab
*/
        var fakeData: User[] = [
            new User(null, "Bdour Khalouf", new Department(null, "IT")),
            new User(null, "Mr. Al Otaiba", new Department(null, "HR")),
            new User(null, "Froilan Pagador", new Department(null, "Finance")  ),
            new User(null, "Lubna Sarhan", new Department(null, "Marketing")),
            new User(null, "Mohamed Shahi", new Department(null, "Sales")),
            new User(null, "Moutaz Bou Saab", new Department(null, "IT"))
        ];

        return fakeData;

        if (!Array.isArray(result.data)) 
            return [];


        return result.data??new Array<User>();
    }
    async GetUser(userID: bigint): Promise<User|null> {
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
    async DeleteUser(userID: bigint): Promise<boolean> {
        let result = await this.userApi.DeleteUser(userID);
        return result.success;
    }
}