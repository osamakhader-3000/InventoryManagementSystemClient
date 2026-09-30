import { IClientRepository } from "../../Application/Repositories/IClientRepository";
import Client from "../../Domain/Entities/Client";
import { IClientApi } from "../api/Interfaces/IClientApi";
import { IAuthService } from "../Commons/IAuthService";
import { GeneralApiResult } from "../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export class ClientRepository implements IClientRepository {

    clientApi: IClientApi;
    authService: IAuthService;

    constructor(clientApi: IClientApi, authService: IAuthService) {
        this.clientApi = clientApi;
        this.authService = authService;
    }

    async getClient(clientId: string): Promise<Client> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<Client>>>(async () => {
            return this.clientApi.getClient(clientId);
        });

        return result?.data ?? new Client('', '', '', [], '', '');
    }

    async updateClient(client: Client): Promise<boolean> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.clientApi.updateClient(client);
        });
        return result?.success ?? false;
    }

    async deleteClient(clientId: string): Promise<boolean> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.clientApi.deleteClient(clientId);
        });
        return result?.success ?? false;
    }

    async listClients(buildId?: string): Promise<Client[]> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<Client[]>>>(async () => {
            return this.clientApi.listClients(buildId);
        });
        return result?.data ?? [];
    }

    async createClient(client: Client): Promise<boolean> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.clientApi.createClient(client);
        });
        return result?.success ?? false;
    }

}