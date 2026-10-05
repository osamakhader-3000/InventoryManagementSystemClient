import ProfileImageMenuItem from "../../Application/DataTransferObjects/ProfileImageMenuItem";
import { IProfileImageMenu } from "../../Application/DataTransferInterfaces/IProfileImageMenu";
import { User } from "../../modules/Security/User";


export class ProfileImageMenuRepository implements IProfileImageMenu {

    async ListProfileImageMenuItems(user: User): Promise<ProfileImageMenuItem[]> {

        const profileImageMenuItems: ProfileImageMenuItem[] = [];

        if (user)
            profileImageMenuItems.push(new ProfileImageMenuItem(1, "My Profile", "/myprofile"));

        profileImageMenuItems.push(new ProfileImageMenuItem(2, "Log out", "/logout"));

        return Promise.resolve(profileImageMenuItems);
    }

}