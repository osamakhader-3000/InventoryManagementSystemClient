import Client from './Client';

export interface IClientRepository {
    ListClients(name?: string): Promise<Client[]>;
    CreateClient(client: Client): Promise<boolean>;
    UpdateClient(client: Client): Promise<boolean>;
    DeleteClient(clientId: string): Promise<boolean>;
    GetClient(clientId: string): Promise<Client|null>;
}
