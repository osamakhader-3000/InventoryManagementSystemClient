export default class Realm {
    id: string;
    name: string;
    description:string;
    group:string;
    constructor(id: string, name: string,description:string,group:string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.group = group;
    }
}