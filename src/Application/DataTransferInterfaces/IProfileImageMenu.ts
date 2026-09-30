import { User } from "../../Domain/Entities/User";
import ProfileImageMenuItem from "../DataTransferObjects/ProfileImageMenuItem";

export interface IProfileImageMenu {
    ListProfileImageMenuItems(user: User | null): Promise<ProfileImageMenuItem[]>;
}