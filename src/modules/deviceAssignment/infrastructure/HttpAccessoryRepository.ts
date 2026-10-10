import Accessory from '../domain/Accessory';
import IAccessoryRepository  from '../domain/IAccessoryRepository';
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

    async ListAccessories(): Promise<Accessory[]> {
        var result = await this.accessoryApi.ListAccessories();

        //fake data for testing purposes
        var fakeData = [
            new Accessory(1, 'Mouse', 1, new Date('12/3/2025')),
            new Accessory(2, 'Keyboard + Mouse', 0, new Date('2/24/2026')),
            new Accessory(3, 'HS', 0, new Date('10/3/2025')),
            new Accessory(4, 'H.S - Jabra', 0, new Date('5/5/2026')),
            new Accessory(5, 'HDMI', 3, new Date('10/3/2025')),
            new Accessory(6, 'USB Hub', 2, new Date('9/7/2025')),
            new Accessory(7, 'Bags', 5, new Date('10/3/2025')),
            new Accessory(8, 'Docking', 0, new Date('10/3/2025')),
            new Accessory(9, 'Pointers', 2, new Date('10/3/2025')),
            new Accessory(10, 'Keyboard', 4, new Date('10/3/2025'))
        ];

        return fakeData;

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

    async DeleteAccessory(id: number): Promise<boolean> {
        var result = await this.accessoryApi.DeleteAccessory(id);
        return result.success;
    }
    
}