import Assignment from "./Assignment";

export interface IAssignmentRepository {
    GetAssignment(assignmentId: bigint): Promise<Assignment | null>;
    ListAssignments(): Promise<Assignment[]>;
    CreateAssignment(assignment: Assignment): Promise<boolean>;
    UpdateAssignment(assignment: Assignment): Promise<boolean>;
    DeleteAssignment(assignmentId: bigint): Promise<boolean>;
}