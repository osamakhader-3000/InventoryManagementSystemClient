import ProfileImageMenuItem from "../DataTransferObjects/ProfileImageMenuItem";

export interface IProfileImageMenuService{
    ListProfileImageMenuItems(): Promise<ProfileImageMenuItem[]>;
}