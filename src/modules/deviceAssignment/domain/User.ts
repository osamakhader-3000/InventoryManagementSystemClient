import Department from './Department';

export default class User {
    id: string|null;
    name: string;   
    department: Department;
    constructor(
    id: string|null,    
    name: string,   
    department: Department,
    ) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    static fromId(id: string): User {
        return new User(id, "", new Department(null, ""));
    }
}