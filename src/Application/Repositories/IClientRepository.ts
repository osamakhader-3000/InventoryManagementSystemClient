import Client from "../../Domain/Entities/Client";

export interface IClientRepository {   
    getClient(clientId: string): Promise<Client>;
    listClients(buildId?: string): Promise<Client[]>;
    updateClient(client: Client): Promise<boolean>;
    deleteClient(clientId: string): Promise<boolean>;
    createClient(client: Client): Promise<boolean>;
}