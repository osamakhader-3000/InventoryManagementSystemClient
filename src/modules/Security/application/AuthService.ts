import { User } from "../domain/User";
import { IAuthService } from "../domain/IAuthService";
import { IAuthRepository } from "../domain/IAuthRepository";
import UserLoginStatus from "../domain/UserLogInStatus";
import Account from "../domain/Account";

export class AuthService implements IAuthService {

    authRepository: IAuthRepository;

    constructor(authRepository: IAuthRepository) {
        this.authRepository = authRepository;
    }


    async CreateAccount(account: Account): Promise<boolean> {
        let result = await this.authRepository.CreateAccount(account);
        return result.success;
    }


    async LoginAccount(user: User): Promise<boolean> {
        let loginResult = await this.authRepository.LoginAccount(user);
        return loginResult.success;
    }


    async CheckLoggedIn(): Promise<UserLoginStatus> {

        let loginExpireDateTime = this.authRepository.GetLoginExpireTime();

        let expired = loginExpireDateTime && new Date() > loginExpireDateTime;

        if (expired || loginExpireDateTime == null) {
            let result = await this.authRepository.Refresh();

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
        this.authRepository.Logout();
    }

    async MicrosoftLoginCallBack(): Promise<boolean> {
        return this.authRepository.MicrosoftLoginCallBack();
    }

    async GetCurrentUser(): Promise<User | null> {
        return this.authRepository.GetCurrentUser();
    }

    async VerifyEmail(token: string): Promise<boolean> {
        return this.authRepository.VerifyEmail(token);
    }

    async ResendVerificationEmail(): Promise<boolean> {
        return this.authRepository.ResendVerificationEmail();
    }

    async ChangePassword(oldPassword: string, newPassword: string): Promise<boolean> {
        return this.authRepository.ChangePassword(oldPassword, newPassword);
    }

}
