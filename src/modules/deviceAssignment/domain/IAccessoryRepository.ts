import Accessory from "./Accessory";

    export default interface IAccessoryRepository {
    GetAccessoryById(id: string): Promise<Accessory | null>;
    ListAccessories(): Promise<Accessory[]>;
    AddAccessory(accessory: Accessory): Promise<boolean>;
    UpdateAccessory(accessory: Accessory): Promise<boolean>;
    DeleteAccessory(id: string): Promise<boolean>;
}