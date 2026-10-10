import Realm from './Realm'

export interface IRealmService{
    
    ListRealms(name:string): Promise<Realm[]>;
}