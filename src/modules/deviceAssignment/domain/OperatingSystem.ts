import OperatingSystemValidationError from './OperatingSystemValidationError';

export interface OperatingSystemProps {
    name: string;
}

export default class OperatingSystem {
    id: string|null;
    name: string;
    constructor(
        id: string|null,
        name: string
    ) {
        this.id = id;
        this.name = name;
    }

    static create(props: OperatingSystemProps): OperatingSystem {
        OperatingSystem.ensureValid(props);
        return new OperatingSystem("00000000-0000-0000-0000-000000000000", props.name.trim());
    }

    static update(existing: OperatingSystem, changes: OperatingSystemProps): OperatingSystem {
        OperatingSystem.ensureValid(changes);
        return new OperatingSystem(existing.id, changes.name.trim());
    }

    private static ensureValid(props: OperatingSystemProps): void {
        if (!props.name.trim())
            throw new OperatingSystemValidationError("An operating system must have a name");
    }
}
