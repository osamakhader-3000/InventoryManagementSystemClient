import Assignment from "./Assignment";
import AssignmentFilter from "./AssignmentFilter";

export interface IAssignmentRepository {
    GetAssignment(assignmentId: number): Promise<Assignment | null>;
    ListAssignments(filter?: AssignmentFilter): Promise<Assignment[]>;
    CreateAssignment(assignment: Assignment): Promise<boolean>;
    UpdateAssignment(assignment: Assignment): Promise<boolean>;
    ReturnAssignment(assignmentId: number): Promise<boolean>;
}