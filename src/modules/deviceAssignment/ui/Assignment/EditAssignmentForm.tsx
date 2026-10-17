import AssignmentForm from "./AssignmentForm";
import { useGetAssignment } from "../../application/assignment/useGetAssignment";
import styles from "./EditAssignmentForm.module.css";

function getAssignmentIdFromPath(): number | null {
    const assignmentIdStr = window.location.pathname.split("/").pop();
    if (!assignmentIdStr) return null;
    if (isNaN(Number(assignmentIdStr))) return null;
    return Number(assignmentIdStr);
}

export default function EditAssignmentForm() {

    const assignmentId = getAssignmentIdFromPath();
    const { data: assignment, isLoading } = useGetAssignment(assignmentId);

    if (isLoading)
        return (
            <div className={styles.messagecontainer}>
                <h3>Please wait</h3>
                <h3>Loading your assignment ...</h3>
            </div>
        );


    return (
        <AssignmentForm
            editMode={true}
            assignmentId={assignment ? assignmentId : null}
            deviceId={assignment?.device.id ?? null}
            assignmentRemarks={assignment?.remarks ?? null}
            assignedUserId={assignment?.assignedUser.id ?? null}
            accessoryIds={assignment?.accessories
                .map(accessory => accessory.id)
                .filter((id): id is string => id !== null)}
        />
    );
}
