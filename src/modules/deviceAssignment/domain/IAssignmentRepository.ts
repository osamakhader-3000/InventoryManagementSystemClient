import Assignment from "./Assignment";

export interface IAssignmentRepository {
    GetAssignment(assignmentId: string): Promise<Assignment>;
    CreateAssignment(assignment: Assignment): Promise<Assignment>;
    UpdateAssignment(assignment: Assignment): Promise<Assignment>;
    DeleteAssignment(assignmentId: string): Promise<void>;
}