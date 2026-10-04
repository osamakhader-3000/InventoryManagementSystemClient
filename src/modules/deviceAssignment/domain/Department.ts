import DepartmentValidationError from './DepartmentValidationError';

export interface DepartmentProps {
    name: string;
}

export default class Department {
    id: string|null;
    name: string;
    constructor(
        id: string|null,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }

    static create(props: DepartmentProps): Department {
        Department.ensureValid(props);
        return new Department(null, props.name.trim());
    }

    static update(existing: Department, changes: DepartmentProps): Department {
        Department.ensureValid(changes);
        return new Department(existing.id, changes.name.trim());
    }

    private static ensureValid(props: DepartmentProps): void {
        if (!props.name.trim())
            throw new DepartmentValidationError("A department must have a name");
    }
}
