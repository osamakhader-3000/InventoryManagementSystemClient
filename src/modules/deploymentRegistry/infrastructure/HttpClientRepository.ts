import { IClientRepository } from "../domain/IClientRepository";
import Client from "../domain/Client";
import ClientApi, { ClientDto } from "./ClientApi";

export class HttpClientRepository implements IClientRepository {
    private clientApi: ClientApi;

    constructor() {
        this.clientApi = new ClientApi();
    }

    async ListClients(name?: string): Promise<Client[]> {
        const result = await this.clientApi.ListClients(name);

        if (!Array.isArray(result.data))
            return [];
        return result.data.map(HttpClientRepository.ToDomain);
    }

    async CreateClient(client: Client): Promise<boolean> {
        const result = await this.clientApi.CreateClient(client);
        return result.success;
    }

    async UpdateClient(client: Client): Promise<boolean> {
        const result = await this.clientApi.UpdateClient(client);
        return result.success;
    }

    async DeleteClient(clientId: string): Promise<boolean> {
        const result = await this.clientApi.DeleteClient(clientId);
        return result.success;
    }

    async GetClient(clientId: string): Promise<Client|null> {
        const result = await this.clientApi.GetClient(clientId);
        return result.data ? HttpClientRepository.ToDomain(result.data) : null;
    }

    private static ToDomain(dto: ClientDto): Client {
        return new Client(
            dto.id,
            dto.name,
            dto.description ?? null,
            (dto.builds ?? []).map(b => ({ id: b.id, version: b.version ?? "" }))
        );
    }
}
