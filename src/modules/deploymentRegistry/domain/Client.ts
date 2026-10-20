import ClientValidationError from './ClientValidationError';

export interface ClientBuild {
    id: string;
    version: string;
}

export interface ClientProps {
    name: string;
    description: string;
}

// Builds are read-only here: the relation is managed from the build side.
export default class Client {
    id: string|null;
    name: string;
    description: string|null;
    builds: ClientBuild[];
    constructor(
        id: string|null,
        name: string,
        description: string|null,
        builds: ClientBuild[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.builds = builds;
    }

    static create(props: ClientProps): Client {
        return Client.update("00000000-0000-0000-0000-000000000000", props);
    }

    static update(id: string, changes: ClientProps): Client {
        Client.ensureValid(changes);
        const description = changes.description.trim();
        return new Client(id, changes.name.trim(), description === "" ? null : description, []);
    }

    private static ensureValid(props: ClientProps): void {
        if (!props.name.trim())
            throw new ClientValidationError("A client must have a name");
    }
}
