import { User, UserRole } from "../../modules/Security/domain/User";
import { IUserService } from "../Interfaces/IUserService";
import { IUserRepository } from "../Repositories/IUserRepository";
import UserLoginStatus from "../../modules/Security/domain/UserLogInStatus";
import Account from "../../modules/Security/domain/Account";

export class UserService implements IUserService {

    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;

    }


    async FetchUser(token: string): Promise<User> {
        return this.userRepository.FetchUser(token);
    }


    async CreateAccount(account: Account): Promise<boolean> {
        let result = await this.userRepository.CreateAccount(account);
        return result.success;

    }


    async LoginAccount(user: User): Promise<boolean> {
        let loginResult = await this.userRepository.LoginAccount(user);
        return loginResult.success;
    }


    async CheckLoggedIn(): Promise<UserLoginStatus> {


        let loginExpireDateTime = this.userRepository.GetLoginExpireTime();

        let expired = loginExpireDateTime && new Date() > loginExpireDateTime;

        if (expired || loginExpireDateTime == null) {
            let result = await this.userRepository.Refresh();

            if (!result.success) {

                if (expired)
                    return new UserLoginStatus(false, true);

                if (loginExpireDateTime == null)
                    return new UserLoginStatus(false, false);
            }
        }

        return new UserLoginStatus(true, false);
    }



    async Logout(): Promise<void> {
        this.userRepository.Logout();
    }

    async MicrosoftLoginCallBack(): Promise<boolean> {
        return this.userRepository.MicrosoftLoginCallBack();
    }

    async GetCurrentUser(): Promise<User | null> {
        let user = await this.userRepository.GetCurrentUser();
        return user;
    }

    async VerifyEmail(token: string): Promise<boolean> {
        let result = await this.userRepository.VerifyEmail(token);
        return result;
    }

    async ResendVerificationEmail(): Promise<boolean> {
        let result = await this.userRepository.ResendVerificationEmail();
        return result;
    }

    async GetCurrentUserProfile(): Promise<User> {
        let currentUser = await this.GetCurrentUser();

        if (!currentUser || !currentUser.id)
            throw new Error("User not logged in");

        let user = await this.userRepository.GetUserInfo();

        return user;
    }


    async ChangePassword(oldPassword: string, newPassword: string): Promise<boolean> {

        let result = await this.userRepository.ChangePassword(oldPassword, newPassword);
        return result;
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
