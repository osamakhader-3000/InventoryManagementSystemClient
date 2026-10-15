import Department from './Department';
import UserValidationError from './UserValidationError';

export interface UserProps {
    name: string;
    departmentName: string;
}

export default class User {
    id: string|null;
    name: string;   
    department: Department;
    constructor(
    id: string|null,    
    name: string,   
    department: Department,
    ) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    static create(props: UserProps): User {
        User.ensureValid(props);
        return new User("00000000-0000-0000-0000-000000000000", props.name.trim(), new Department("00000000-0000-0000-0000-000000000000", props.departmentName.trim()));
    }

    static update(existing: User, changes: UserProps): User {
        User.ensureValid(changes);
        const departmentName = changes.departmentName.trim();
        // Keep the existing department id when the department hasn't changed.
        const department = existing.department?.name === departmentName
            ? existing.department
            : new Department("00000000-0000-0000-0000-000000000000", departmentName);
        return new User(existing.id, changes.name.trim(), department);
    }

    private static ensureValid(props: UserProps): void {
        if (!props.name.trim())
            throw new UserValidationError("A user must have a name");
        if (!props.departmentName.trim())
            throw new UserValidationError("A user must belong to a department");
    }

    static fromId(id: string): User {
        return new User(id, "", new Department("00000000-0000-0000-0000-000000000000", ""));
    }
}
