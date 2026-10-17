import Assignment from "./Assignment";

export interface IAssignmentRepository {
    GetAssignment(assignmentId: number): Promise<Assignment | null>;
    ListAssignments(): Promise<Assignment[]>;
    CreateAssignment(assignment: Assignment): Promise<boolean>;
    UpdateAssignment(assignment: Assignment): Promise<boolean>;
    ReturnAssignment(assignmentId: number): Promise<boolean>;
}