import Client from '../domain/Client';
import urls from '../../../shared/infrastructure/http/urls.json'
import { GeneralApi } from "../../../shared/infrastructure/http/GeneralApi";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export interface ClientDto {
    id: string | null;
    name: string;
    description: string | null;
    builds: { id: string; version?: string | null }[] | null;
}

export default class ClientApi extends GeneralApi {
    private baseUrl:string;

    constructor(){
        super();
        this.baseUrl = `${urls['inventory-management-system-app']}${urls['deployment-registry-domain']}${urls['client']}`;
    }

    async ListClients(name?: string): Promise<GeneralApiResult<ClientDto[]>> {
        let url = `${this.baseUrl}${urls['client-list']}`;
        if (name)
            url += `?name=${encodeURIComponent(name)}`;
        return await this.SecureApiCaller<ClientDto[]>('GET', url);
    }

    // Builds are not sent: the backend manages the relation from the build side.
    async CreateClient(client: Client): Promise<GeneralApiResult<boolean>> {
        const url = `${this.baseUrl}${urls['client-create']}`;
        return await this.SecureApiCaller<boolean>('POST', url, { id: client.id, name: client.name, description: client.description });
    }

    async UpdateClient(client: Client): Promise<GeneralApiResult<boolean>> {
        const url = `${this.baseUrl}${urls['client-update']}`;
        return await this.SecureApiCaller<boolean>('PUT', url, { id: client.id, name: client.name, description: client.description });
    }

    async DeleteClient(clientId: string): Promise<GeneralApiResult<boolean>> {
        const url = `${this.baseUrl}${urls['client-delete']}/${clientId}`;
        return await this.SecureApiCaller<boolean>('DELETE', url);
    }

    async GetClient(clientId: string): Promise<GeneralApiResult<ClientDto>> {
        const url = `${this.baseUrl}${urls['client-get']}/${clientId}`;
        return await this.SecureApiCaller<ClientDto>('GET', url);
    }
}
