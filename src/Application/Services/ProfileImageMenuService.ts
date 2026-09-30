import ProfileImageMenuItem from "../DataTransferObjects/ProfileImageMenuItem";
import { IProfileImageMenuService } from "../Interfaces/IProfileImageMenuService";
import {IProfileImageMenu} from "../DataTransferInterfaces/IProfileImageMenu";
import { IUserRepository } from "../Repositories/IUserRepository";

export class ProfileImageMenuService implements IProfileImageMenuService{

    profileImageMenu:IProfileImageMenu;
    userRepository:IUserRepository;

    constructor(profileImageMenu:IProfileImageMenu, userRepository:IUserRepository){
        this.profileImageMenu=profileImageMenu;
        this.userRepository=userRepository;
    }

    async ListProfileImageMenuItems(): Promise<ProfileImageMenuItem[]> {

        let user = await this.userRepository.GetCurrentUser();
        return this.profileImageMenu.ListProfileImageMenuItems(user);
    }

}