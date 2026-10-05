import { User } from "../../modules/Security/User";
import ProfileImageMenuItem from "../DataTransferObjects/ProfileImageMenuItem";

export interface IProfileImageMenu {
    ListProfileImageMenuItems(user: User | null): Promise<ProfileImageMenuItem[]>;
}