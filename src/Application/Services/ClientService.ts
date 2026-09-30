import Client from "../../Domain/Entities/Client";
import { IClientService } from "../Interfaces/IClientService";
import { IClientRepository } from "../Repositories/IClientRepository";

export class ClientService implements IClientService{

    clientRepository: IClientRepository;

    constructor(clientRepository: IClientRepository) {
        this.clientRepository = clientRepository;
    }


    getClient(clientId: string): Promise<Client> {
        return this.clientRepository.getClient(clientId);
    }
    
    listClients(buildId?: string): Promise<Client[]> {
        return this.clientRepository.listClients(buildId);
    }

    updateClient(client: Client): Promise<boolean> {
        return this.clientRepository.updateClient(client);
    }

    deleteClient(clientId: string): Promise<boolean> {
        return this.clientRepository.deleteClient(clientId);
    }

    createClient(client: Client): Promise<boolean> {
        return this.clientRepository.createClient(client);
    }
}