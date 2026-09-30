import Client from "../../../Domain/Entities/Client";
import { GeneralApiResult } from "../../../shared/infrastructure/DataTransferObjects/GeneralApiResult";

export interface IClientApi {
    createClient(client: Client): Promise<GeneralApiResult<boolean>>;
    getClient(clientId: string): Promise<GeneralApiResult<Client>>;
    updateClient(client: Client): Promise<GeneralApiResult<boolean>>;
    deleteClient(clientId: string): Promise<GeneralApiResult<boolean>>;
    listClients(buildId?: string): Promise<GeneralApiResult<Client[]>>;
}