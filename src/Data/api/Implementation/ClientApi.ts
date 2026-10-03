import Client from "../../../Domain/Entities/Client";
import { IClientApi } from "../Interfaces/IClientApi";
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import urls from '../../../shared/infrastructure/http/urls.json';
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export class ClientApi extends GeneralApi implements IClientApi {

    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = urls['inventory-management-system-app'];
    }

    async getClient(clientId: string): Promise<GeneralApiResult<Client>> {
        let url = `${this.baseUrl}/${urls['client-get']}/${clientId}`;
        let result = await this.GeneralApiCaller<Client>('GET', url);
        return result;
    }

    async updateClient(client: Client): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['client-update']}`;
        let result = await this.GeneralApiCaller<boolean>('PUT', url, client);
        return result;
    }

    async deleteClient(clientId: string): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['client-delete']}/${clientId}`;
        let result = await this.GeneralApiCaller<boolean>('DELETE', url);
        return result;
    }

    async listClients(buildId?: string): Promise<GeneralApiResult<Client[]>> {
        let url = `${this.baseUrl}/${urls['client-list']}`;
        if (buildId) {
            url += `?buildId=${buildId}`;
        }
        let result = await this.GeneralApiCaller<Client[]>('GET', url);
        return result;
    }

    async createClient(client: Client): Promise<GeneralApiResult<boolean>> {
        let url = `${this.baseUrl}/${urls['client-create']}`;
        let result = await this.GeneralApiCaller<boolean>('POST', url, client);
        return result;
    }
}
