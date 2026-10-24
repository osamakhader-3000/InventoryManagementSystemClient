import Department from './Department';
import UserValidationError from './UserValidationError';
import Location from './Location';

export interface UserProps {
    name: string;
    departmentId: string;
    locationId: string;
}

export default class User {
    id: string|null;
    name: string;
    department: Department;
    location: Location;
    isSuspended: number;
    constructor(
    id: string|null,
    name: string,
    department: Department,
    location: Location,
    isSuspended: number = 0,
    ) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.location = location;
        this.isSuspended = isSuspended;
    }

    static create(props: UserProps): User {
        User.ensureValid(props);
        return new User("00000000-0000-0000-0000-000000000000", props.name.trim(), new Department(props.departmentId, ""), new Location(props.locationId, ""));
    }

    static update(id: string, changes: UserProps): User {
        User.ensureValid(changes);
        return new User(id, changes.name.trim(), new Department(changes.departmentId, ""), new Location(changes.locationId, ""));
    }

    private static ensureValid(props: UserProps): void {
        if (!props.name.trim())
            throw new UserValidationError("A user must have a name");
        if (!props.departmentId.trim())
            throw new UserValidationError("A user must belong to a department");
        if (!props.locationId.trim())
            throw new UserValidationError("A user must have a location");
    }

    static fromId(id: string): User {
        return new User(id, "", new Department("00000000-0000-0000-0000-000000000000", ""), new Location("00000000-0000-0000-0000-000000000000", ""  ));
    }
}
