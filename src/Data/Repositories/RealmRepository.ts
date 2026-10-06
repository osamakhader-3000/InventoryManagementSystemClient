import Realm from "../../Domain/Entities/Realm";
import { User } from "../../modules/Security/domain/User";
import { IRealmRepository } from "../../Application/Repositories/IRealmRepository";
import { IRealmStorage } from "../LocalData/Interfaces/IRealmStorage";

export class RealmRepository implements IRealmRepository {
    datasource:IRealmStorage

    constructor(datasource:IRealmStorage){
        this.datasource = datasource;
    }
   
    ListRealms(name: string, user: User): Promise<Realm[]> {
       return this.datasource.ListRealms(name, user);
    }    

}