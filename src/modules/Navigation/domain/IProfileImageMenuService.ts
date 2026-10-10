import ProfileImageMenuItem from "./ProfileImageMenuItem";

export interface IProfileImageMenuService{
    ListProfileImageMenuItems(): Promise<ProfileImageMenuItem[]>;
}