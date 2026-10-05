import Client from "./Client";
import { User } from "../../modules/Security/User";

export default class Build {
    id: string|null;
    version: string;
    link: string;
    clients: Client[];
    updatedAt: Date|null;
    updatedBy: User|null;
    constructor(id: string|null, version: string, link: string, clients: Client[], updatedAt: Date|null, updatedBy: User|null) {
        this.id = id;
        this.version = version;
        this.link = link;
        this.clients = clients;
        this.updatedAt = updatedAt;
        this.updatedBy = updatedBy;
    }
}