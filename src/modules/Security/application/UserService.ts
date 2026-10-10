
import { User, UserRole } from "../domain/User";
import { IUserService } from "../domain/IUserService";
import { IUserRepository } from "../domain/IUserRepository";
import { ICurrentUserProvider } from "../domain/ICurrentUserProvider";

export class UserService implements IUserService {

    userRepository: IUserRepository;
    currentUserProvider: ICurrentUserProvider;

    constructor(userRepository: IUserRepository, currentUserProvider: ICurrentUserProvider) {
        this.userRepository = userRepository;
        this.currentUserProvider = currentUserProvider;
    }


    async GetCurrentUserProfile(): Promise<User> {
        let currentUser = await this.currentUserProvider.GetCurrentUser();

        if (!currentUser || !currentUser.id)
            throw new Error("User not logged in");

        let user = await this.userRepository.GetUserInfo();

        return user;
    }


    async ListUsers(): Promise<User[]> {
        let users = await this.userRepository.ListUsers();
        return users;
    }

    async SuspendUser(userId: string): Promise<boolean> {
        let result = await this.userRepository.SuspendUser(userId);
        return result;
    }



    async ActivateUser(userId: string): Promise<boolean> {
        let result = await this.userRepository.ActivateUser(userId);
        return result;
    }

    async ChangeUserRole(userId: string, newRole: number): Promise<boolean> {
        let role: UserRole = newRole as UserRole;
        let user = new User(userId, null, "", null, undefined, undefined, role);
        let result = await this.userRepository.ChangeUserRole(user);
        return result;
    }

}
