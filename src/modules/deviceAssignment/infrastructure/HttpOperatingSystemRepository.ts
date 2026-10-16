import { IOperatingSystemRepository } from "../domain/IOperatingSystemRepository";
import OperatingSystem from "../domain/OperatingSystem";
import OperatingSystemApi from "./OperatingSystemApi";

export class HttpOperatingSystemRepository implements IOperatingSystemRepository {
    private operatingSystemApi: OperatingSystemApi;

    constructor() {
        this.operatingSystemApi = new OperatingSystemApi();
    }

    async ListOperatingSystems(): Promise<OperatingSystem[]> {
        let result = await this.operatingSystemApi.ListOperatingSystems();
        if (!Array.isArray(result.data))
            return [];
        return result.data ?? [];
    }

    async CreateOperatingSystem(operatingSystem: OperatingSystem): Promise<boolean> {
        let result = await this.operatingSystemApi.CreateOperatingSystem(operatingSystem);
        return result.success;
    }

    async UpdateOperatingSystem(operatingSystem: OperatingSystem): Promise<boolean> {
        let result = await this.operatingSystemApi.UpdateOperatingSystem(operatingSystem);
        return result.success;
    }

    async DeleteOperatingSystem(operatingSystemId: string): Promise<boolean> {
        let result = await this.operatingSystemApi.DeleteOperatingSystem(operatingSystemId);
        return result.success;
    }

    async GetOperatingSystem(operatingSystemId: string): Promise<OperatingSystem|null> {
        let result = await this.operatingSystemApi.GetOperatingSystem(operatingSystemId);
        return result.data ?? null;
    }
}
