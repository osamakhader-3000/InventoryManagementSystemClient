import { User } from "../../../Domain/Entities/User";
import { IAuthStorage } from "../Interfaces/IAuthStorage";

export class AuthStorage implements IAuthStorage {

    GetLoginExpireTime(): Date | null {

        const storedValue = localStorage.getItem('loginExpireTime');
        if (!storedValue) return null;
        return new Date(storedValue);
    }

    SetLoginExpireTime(expireTime: Date): void {
        localStorage.setItem('loginExpireTime', expireTime.toString());
    }

    RemoveLoginExpireTime(): void {
        localStorage.removeItem('loginExpireTime');
    }

    GetCurrentUser(): User | null {
        const storedUser = localStorage.getItem('currentUser');
        if (!storedUser) return null;
        return JSON.parse(storedUser) as User;
    }

    SetCurrentUser(user: User): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    RemoveCurrentUser(): void {
        localStorage.removeItem('currentUser');
    }

}
