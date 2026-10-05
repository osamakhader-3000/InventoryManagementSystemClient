import Realm from '../../Domain/Entities/Realm';
import { User } from '../../modules/Security/User';

export interface IRealmRepository {

  ListRealms(name:string, user: User): Promise<Realm[]>;  
}