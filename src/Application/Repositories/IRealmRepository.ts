import Realm from '../../Domain/Entities/Realm';
import { User } from '../../Domain/Entities/User';

export interface IRealmRepository {

  ListRealms(name:string, user: User): Promise<Realm[]>;  
}