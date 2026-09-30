import { User } from "../../../Domain/Entities/User";

export interface IAuthStorage{
    SetLoginExpireTime(expireTime: Date): void;
    GetLoginExpireTime(): Date | null;
    RemoveLoginExpireTime(): void;
    GetCurrentUser(): User | null;
    SetCurrentUser(user: User): void;
    RemoveCurrentUser(): void;
}