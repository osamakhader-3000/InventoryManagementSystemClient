import Realm from "../../../Domain/Entities/Realm"

export interface IRealmApi{
    ListRealmsByName(name: string): Promise<Realm[]>
}