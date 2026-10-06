import { User } from "../../../modules/Security/domain/User";

export interface IAuthStorage{
    SetLoginExpireTime(expireTime: Date): void;
    GetLoginExpireTime(): Date | null;
    RemoveLoginExpireTime(): void;
    GetCurrentUser(): User | null;
    SetCurrentUser(user: User): void;
    RemoveCurrentUser(): void;
}