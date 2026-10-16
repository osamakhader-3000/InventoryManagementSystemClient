import Accessory from '../domain/Accessory';
import IAccessoryRepository  from '../domain/IAccessoryRepository';
import AccessoryApi from './AccessoryApi';

export class HttpAccessoryRepository implements IAccessoryRepository {

    private accessoryApi: AccessoryApi;

    constructor() {
        this.accessoryApi = new AccessoryApi();
    }

    async GetAccessoryById(id: string): Promise<Accessory | null> {
       var result = await this.accessoryApi.GetAccessory(id);
       return result.data ?? null;
    }

    async ListAccessories(): Promise<Accessory[]> {
        var result = await this.accessoryApi.ListAccessories();

        if (!Array.isArray(result.data))
            return [];
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

    async DeleteAccessory(id: string): Promise<boolean> {
        var result = await this.accessoryApi.DeleteAccessory(id);
        return result.success;
    }
    
}