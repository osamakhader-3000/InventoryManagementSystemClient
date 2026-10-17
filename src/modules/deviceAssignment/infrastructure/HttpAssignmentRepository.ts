import Assignment from "../domain/Assignment";
import AssignmentFilter from "../domain/AssignmentFilter";
import { IAssignmentRepository } from "../domain/IAssignmentRepository";
import { AssignmentApi } from "./AssignmentApi";

export class HttpAssignmentRepository implements IAssignmentRepository {
   
    private assignmentApi: AssignmentApi;

    constructor() {
        this.assignmentApi = new AssignmentApi();
    }

    async GetAssignment(assignmentId: number): Promise<Assignment | null> {
        var result = await this.assignmentApi.GetAssignment(assignmentId);
        return result.data ?? null;
    }

    async CreateAssignment(assignment: Assignment): Promise<boolean> {
        var result = await this.assignmentApi.CreateAssignment(assignment);
        return result.success;
    }

    async UpdateAssignment(assignment: Assignment): Promise<boolean> {
        var result = await this.assignmentApi.UpdateAssignment(assignment);
        return result.success;
    }

    async ReturnAssignment(assignmentId: number): Promise<boolean> {
        var result = await this.assignmentApi.ReturnAssignment(assignmentId);
        return result.success;
    }

    async ListAssignments(filter?: AssignmentFilter): Promise<Assignment[]> {
        var result = await this.assignmentApi.ListAssignments(filter);

        if (!Array.isArray(result.data)) 
            return [];
        return result.data ?? [];
    }
}