export default class Task {
    id: string|null;
    title: string;
    description: string;
    assignedTo?: string;
    assignedBy?: string;

    constructor(id: string|null, title: string, description: string, assignedTo?: string, assignedBy?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.assignedTo = assignedTo;
        this.assignedBy = assignedBy;
    }
}