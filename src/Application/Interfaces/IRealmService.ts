import Realm from '../../Domain/Entities/Realm'

export interface IRealmService{
    
    ListRealms(name:string): Promise<Realm[]>;
}