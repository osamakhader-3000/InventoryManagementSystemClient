import Accessory from "./Accessory";
import AccessoryFilter from "./AccessoryFilter";

    export default interface IAccessoryRepository {
    GetAccessoryById(id: string): Promise<Accessory | null>;
    ListAccessories(filter?: AccessoryFilter): Promise<Accessory[]>;
    AddAccessory(accessory: Accessory): Promise<boolean>;
    UpdateAccessory(accessory: Accessory): Promise<boolean>;
    DeleteAccessory(id: string): Promise<boolean>;
}