import BuildValidationError from './BuildValidationError';

export interface BuildClient {
    id: string;
    name: string;
}

export interface BuildProps {
    version: string;
    link: string;
    clientIds: string[];
}

// A build owns its relation to clients; clients are referenced by id when saving.
export default class Build {
    id: string|null;
    version: string;
    link: string|null;
    clients: BuildClient[];
    constructor(
        id: string|null,
        version: string,
        link: string|null,
        clients: BuildClient[]
    ) {
        this.id = id;
        this.version = version;
        this.link = link;
        this.clients = clients;
    }

    static create(props: BuildProps): Build {
        return Build.update("00000000-0000-0000-0000-000000000000", props);
    }

    static update(id: string, changes: BuildProps): Build {
        Build.ensureValid(changes);
        const link = changes.link.trim();
        const clients = [...new Set(changes.clientIds)].map(clientId => ({ id: clientId, name: "" }));
        return new Build(id, changes.version.trim(), link === "" ? null : link, clients);
    }

    private static ensureValid(props: BuildProps): void {
        if (!props.version.trim())
            throw new BuildValidationError("A build must have a version");
    }
}
