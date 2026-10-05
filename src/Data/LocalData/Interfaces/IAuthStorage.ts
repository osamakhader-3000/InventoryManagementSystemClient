import { User } from "../../../modules/Security/User";

export interface IAuthStorage{
    SetLoginExpireTime(expireTime: Date): void;
    GetLoginExpireTime(): Date | null;
    RemoveLoginExpireTime(): void;
    GetCurrentUser(): User | null;
    SetCurrentUser(user: User): void;
    RemoveCurrentUser(): void;
}