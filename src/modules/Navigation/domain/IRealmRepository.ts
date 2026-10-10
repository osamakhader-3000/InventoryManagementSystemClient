import Realm from './Realm';
import { User } from '../../Security/domain/User';

export interface IRealmRepository {

  ListRealms(name:string, user: User): Promise<Realm[]>;  
}
