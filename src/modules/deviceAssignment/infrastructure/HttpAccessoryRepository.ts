import Accessory from '../domain/Accessory';
import  IAccessoryRepository  from '../domain/IAccessoryRepository';
import AccessoryApi from './AccessoryApi';

export class HttpAccessoryRepository implements IAccessoryRepository {

    private accessoryApi: AccessoryApi;

    constructor() {
        this.accessoryApi = new AccessoryApi();
    }

    async GetAccessoryById(id: number): Promise<Accessory | null> {
       var result = await this.accessoryApi.GetAccessory(id);
       return result.data ?? null;
    }

    async GetAllAccessories(): Promise<Accessory[]> {
        var result = await this.accessoryApi.ListAccessories();
        return result.data ?? [];
    }

    async AddAccessory(accessory: Accessory): Promise<boolean> {
        var result = await this.accessoryApi.CreateAccessory(accessory);
        return result.success;
    }

    async UpdateAccessory(accessory: Accessory): Promise<boolean> {
        var result = await this.accessoryApi.UpdateAccessory(accessory);
        return result.success;
    }

    async DeleteAccessory(id: number): Promise<boolean> {
        var result = await this.accessoryApi.DeleteAccessory(id);
        return result.success;
    }
    
}