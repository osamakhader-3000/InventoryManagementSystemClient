import Realm from "../../../Domain/Entities/Realm";
import { IRealmStorage } from "../Interfaces/IRealmStorage";
import { User, UserAccountStatus, UserEmailVerificationStatus, UserRole } from "../../../Domain/Entities/User";

export class RealmStorage implements IRealmStorage {

    ListRealms(name: string, user: User): Promise<Realm[]> {

        let realms: Realm[] = [];

        if (user != null && user.emailVerificationStatus == UserEmailVerificationStatus.Verified && user.accountStatus == UserAccountStatus.Active) {
            
            realms.push(new Realm("mytasks", "My Tasks", "Description of My Tasks"));
            realms.push(new Realm("builds", "Builds", "Description of Builds"));
            realms.push(new Realm("clients", "Clients", "Description of Clients"));

            if (user.userRole == UserRole.Administrator)
                realms.push(new Realm("users", "Users", "Description of Users"));
        }

        return Promise.resolve(realms.filter(r => r.name.toLowerCase().includes(name.toLowerCase())));
    }
}