import ProfileImageMenuItem from "../domain/ProfileImageMenuItem";
import { IProfileImageMenuRepository } from "../domain/IProfileImageMenuRepository";
import { User } from "../../Security/domain/User";


export class StaticProfileImageMenuRepository implements IProfileImageMenuRepository {

    async ListProfileImageMenuItems(user: User | null): Promise<ProfileImageMenuItem[]> {

        const profileImageMenuItems: ProfileImageMenuItem[] = [];

        if (user)
            profileImageMenuItems.push(new ProfileImageMenuItem(1, "My Profile", "/myprofile"));

        profileImageMenuItems.push(new ProfileImageMenuItem(2, "Log out", "/logout"));

        return Promise.resolve(profileImageMenuItems);
    }

}
