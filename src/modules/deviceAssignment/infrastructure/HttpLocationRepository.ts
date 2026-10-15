import { ILocationRepository } from "../domain/ILocationRepository";
import Location from "../domain/Location";
import LocationApi from "./LocationApi";

export class HttpLocationRepository implements ILocationRepository {
    private locationApi: LocationApi;

    constructor() {
        this.locationApi = new LocationApi();
    }

    async ListLocations(name?: string): Promise<Location[]> {
        let result = await this.locationApi.ListLocations(name);
        if (!Array.isArray(result.data))
            return [];
        return result.data ?? [];
    }

    async CreateLocation(location: Location): Promise<boolean> {
        let result = await this.locationApi.CreateLocation(location);
        return result.success;
    }

    async UpdateLocation(location: Location): Promise<boolean> {
        let result = await this.locationApi.UpdateLocation(location);
        return result.success;
    }

    async DeleteLocation(locationId: string): Promise<boolean> {
        let result = await this.locationApi.DeleteLocation(locationId);
        return result.success;
    }

    async GetLocation(locationId: string): Promise<Location|null> {
        let result = await this.locationApi.GetLocation(locationId);
        return result.data ?? null;
    }
}
