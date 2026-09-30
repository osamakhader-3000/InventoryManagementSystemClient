import Build from "./Build";

export default class Client {
    id: string|null;
    name: string;
    description: string;
    builds: Build[];    
    currentChangeRequest: string;
    lastChangeRequest: string;
    constructor(id: string|null, name: string, description: string, builds: Build[], currentChangeRequest: string, lastChangeRequest: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.builds = builds;
        this.currentChangeRequest = currentChangeRequest;
        this.lastChangeRequest = lastChangeRequest;
    }
}