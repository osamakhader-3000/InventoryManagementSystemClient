import { User } from "../../Security/domain/User";
import ProfileImageMenuItem from "./ProfileImageMenuItem";

export interface IProfileImageMenuRepository {
    ListProfileImageMenuItems(user: User | null): Promise<ProfileImageMenuItem[]>;
}
