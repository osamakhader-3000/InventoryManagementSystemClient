import LocationValidationError from './LocationValidationError';

export interface LocationProps {
    name: string;
}

export default class Location {
    id: string|null;
    name: string;
    constructor(
        id: string|null,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }

    static create(props: LocationProps): Location {
        Location.ensureValid(props);
        return new Location(null, props.name.trim());
    }

    static update(existing: Location, changes: LocationProps): Location {
        Location.ensureValid(changes);
        return new Location(existing.id, changes.name.trim());
    }

    private static ensureValid(props: LocationProps): void {
        if (!props.name.trim())
            throw new LocationValidationError("A location must have a name");
    }
}
