import {User} from '../domain/User'
import { GeneralApiResult } from '../../../shared/infrastructure/DataTransferObjects/GeneralApiResult';

export interface IUserApi{
    Test(): Promise<GeneralApiResult<boolean>>;
    GetUserInfo(): Promise<GeneralApiResult<User>>;
    ListUsers():Promise<GeneralApiResult<User[]>>;
    SuspendUser(userId: string): Promise<GeneralApiResult<boolean>>;
    ActivateUser(userId: string): Promise<GeneralApiResult<boolean>>;
    ChangeUserRole(user: User): Promise<GeneralApiResult<boolean>>;
    ListUsersByIds(userIds: string[]): Promise<GeneralApiResult<User[]>>;
}
