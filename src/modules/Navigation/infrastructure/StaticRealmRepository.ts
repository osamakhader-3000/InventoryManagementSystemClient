import Realm from "../domain/Realm";
import { IRealmRepository } from "../domain/IRealmRepository";
import { User, UserAccountStatus, UserEmailVerificationStatus, isAdministrator } from "../../Security/domain/User";

export class StaticRealmRepository implements IRealmRepository {

    ListRealms(name: string, user: User): Promise<Realm[]> {

        let realms: Realm[] = [];

        if (user != null && user.emailVerificationStatus == UserEmailVerificationStatus.Verified && user.accountStatus == UserAccountStatus.Active) {
            
            realms.push(new Realm("assignments", "Assignments", "List of Devices and users assinged to them"));
            realms.push(new Realm("devices", "Devices", "List of all available Devices"));
            realms.push(new Realm("accessories", "Accessories", "List of all available Accessories"));
            realms.push(new Realm("departments", "Departments", "List of all Departments"));
            realms.push(new Realm("locations", "Locations", "List of all Locations"));
            realms.push(new Realm("operatingsystems", "Operating Systems", "List of all Operating Systems"));
            realms.push(new Realm("users", "Users", "List of all available Users"));
            realms.push(new Realm("triallog", "Trial Log", "History of all device transactions"));
            realms.push(new Realm("builds", "Builds", "List of all deployment builds"));
            realms.push(new Realm("clients", "Clients", "List of all deployment clients"));


            if (isAdministrator(user))
                realms.push(new Realm("admin/users","Users", "Description of Users"));
        }

        return Promise.resolve(realms.filter(r => r.name.toLowerCase().includes(name.toLowerCase())));
    }
}