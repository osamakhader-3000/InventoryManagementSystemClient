import { IClientRepository } from "../../Application/Repositories/IClientRepository";
import Client from "../../Domain/Entities/Client";
import { IClientApi } from "../api/Interfaces/IClientApi";

export class ClientRepository implements IClientRepository {

    clientApi: IClientApi;

    constructor(clientApi: IClientApi) {
        this.clientApi = clientApi;
    }

    async getClient(clientId: string): Promise<Client> {
        let result = await this.clientApi.getClient(clientId);

        return result?.data ?? new Client('', '', '', [], '', '');
    }

    async updateClient(client: Client): Promise<boolean> {
        let result = await this.clientApi.updateClient(client);
        return result?.success ?? false;
    }

    async deleteClient(clientId: string): Promise<boolean> {
        let result = await this.clientApi.deleteClient(clientId);
        return result?.success ?? false;
    }

    async listClients(buildId?: string): Promise<Client[]> {
        let result = await this.clientApi.listClients(buildId);
        return result?.data ?? [];
    }

    async createClient(client: Client): Promise<boolean> {
        let result = await this.clientApi.createClient(client);
        return result?.success ?? false;
    }

}