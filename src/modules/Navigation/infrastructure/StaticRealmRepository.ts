import Realm from "../domain/Realm";
import { IRealmRepository } from "../domain/IRealmRepository";
import { User, UserAccountStatus, UserEmailVerificationStatus, isAdministrator } from "../../Security/domain/User";

export class StaticRealmRepository implements IRealmRepository {

    ListRealms(name: string, user: User): Promise<Realm[]> {

        let realms: Realm[] = [];

        if (user != null && user.emailVerificationStatus == UserEmailVerificationStatus.Verified && user.accountStatus == UserAccountStatus.Active) {
            
            realms.push(new Realm("assignments", "Stock Assignments", "List of Devices and users assinged to them", "Inventory"));
            realms.push(new Realm("devices", "Stock", "List of all available Devices", "Inventory"));
            realms.push(new Realm("accessories", "Accessories", "List of all available Accessories", "Inventory"));
            realms.push(new Realm("departments", "Departments", "List of all Departments", "Inventory"));
            realms.push(new Realm("locations", "Locations", "List of all Locations", "Inventory"));
            realms.push(new Realm("users", "Users", "List of all available Users", "Inventory"));
            realms.push(new Realm("triallog", "Trial Log", "History of all device transactions", "Inventory"));
            realms.push(new Realm("builds", "Builds", "List of all deployment builds", "Deployment"));
            realms.push(new Realm("clients", "Clients", "List of all deployment clients", "Deployment"));


            if (isAdministrator(user))
                realms.push(new Realm("admin/users","Users", "Manage system accounts", "Administration"));
        }

        return Promise.resolve(realms.filter(r => r.name.toLowerCase().includes(name.toLowerCase())));
    }
}