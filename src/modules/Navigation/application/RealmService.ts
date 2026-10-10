import { IRealmService } from "../domain/IRealmService";
import { IRealmRepository } from "../domain/IRealmRepository";
import Realm from "../domain/Realm";
import { ICurrentUserProvider } from "../../Security/domain/ICurrentUserProvider";


export class RealmService implements IRealmService {

    realmsRepository: IRealmRepository;
    currentUserProvider: ICurrentUserProvider;
    constructor(realmsRepository: IRealmRepository, currentUserProvider: ICurrentUserProvider) {
        this.realmsRepository = realmsRepository;
        this.currentUserProvider = currentUserProvider;
    }

    async ListRealms(name: string): Promise<Realm[]> {
        let user = await this.currentUserProvider.GetCurrentUser();

        if (user == null) {
            return [];
        }

        return this.realmsRepository.ListRealms(name, user);
    }

}
