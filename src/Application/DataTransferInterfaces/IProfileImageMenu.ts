import { User } from "../../modules/Security/domain/User";
import ProfileImageMenuItem from "../DataTransferObjects/ProfileImageMenuItem";

export interface IProfileImageMenu {
    ListProfileImageMenuItems(user: User | null): Promise<ProfileImageMenuItem[]>;
}