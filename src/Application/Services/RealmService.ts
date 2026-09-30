import { IRealmService } from "../Interfaces/IRealmService";
import { IRealmRepository } from "../Repositories/IRealmRepository";
import Realm from "../../Domain/Entities/Realm";
import { IUserRepository } from "../Repositories/IUserRepository";


export class RealmService implements IRealmService {

    realmsRepository: IRealmRepository;
    userRepository: IUserRepository;
    constructor(realmsRepository: IRealmRepository, userRepository: IUserRepository) {
        this.realmsRepository = realmsRepository;
        this.userRepository = userRepository;
    }

    async ListRealms(name: string): Promise<Realm[]> {
        let user = await this.userRepository.GetCurrentUser();

        if (user == null) {
            return [];
        }

        return this.realmsRepository.ListRealms(name, user);
    }

}