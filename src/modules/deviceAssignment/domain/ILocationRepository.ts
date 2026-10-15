import Location from './Location';

export interface ILocationRepository {
    ListLocations(name?: string): Promise<Location[]>;
    CreateLocation(location: Location): Promise<boolean>;
    UpdateLocation(location: Location): Promise<boolean>;
    DeleteLocation(locationId: string): Promise<boolean>;
    GetLocation(locationId: string): Promise<Location|null>;
}
