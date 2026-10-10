import ProfileImageMenuItem from "../domain/ProfileImageMenuItem";
import { IProfileImageMenuService } from "../domain/IProfileImageMenuService";
import { IProfileImageMenuRepository } from "../domain/IProfileImageMenuRepository";
import { ICurrentUserProvider } from "../../Security/domain/ICurrentUserProvider";

export class ProfileImageMenuService implements IProfileImageMenuService{

    profileImageMenuRepository:IProfileImageMenuRepository;
    currentUserProvider:ICurrentUserProvider;

    constructor(profileImageMenuRepository:IProfileImageMenuRepository, currentUserProvider:ICurrentUserProvider){
        this.profileImageMenuRepository=profileImageMenuRepository;
        this.currentUserProvider=currentUserProvider;
    }

    async ListProfileImageMenuItems(): Promise<ProfileImageMenuItem[]> {

        let user = await this.currentUserProvider.GetCurrentUser();
        return this.profileImageMenuRepository.ListProfileImageMenuItems(user);
    }

}
