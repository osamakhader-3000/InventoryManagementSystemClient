import { useParams, useNavigate } from 'react-router';
import { useGetAssignment } from '../../application/assignment/useGetAssignment';
import formStyles from './AssignmentForm.module.css';
import styles from './ViewAssignmentForm.module.css';

function formatDate(date: Date | string | null | undefined): string {
    return date ? new Date(date).toLocaleString() : "-";
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className={`${formStyles.assignmentformelementcontainer} ${formStyles.assignmentformlabeledrow}`}>
            <span className={styles.label}>{label}:</span>
            <div className={styles.value}>{value || "-"}</div>
        </div>
    );
}

export default function ViewAssignmentForm() {

    const { id } = useParams();
    const assignmentId = id && !isNaN(Number(id)) ? Number(id) : null;
    const { data: assignment, isLoading, error } = useGetAssignment(assignmentId);
    const navigate = useNavigate();

    if (isLoading)
        return (
            <div className={styles.messagecontainer}>
                <h3>Please wait</h3>
                <h3>Loading your assignment ...</h3>
            </div>
        );

    if (error || !assignment)
        return (
            <div className={styles.messagecontainer}>
                <h3>Assignment not found</h3>
                <button className={formStyles.assignmentformbutton} onClick={() => navigate('/assignments')}>Back</button>
            </div>
        );

    const { device, assignedUser } = assignment;

    return (
        <div className={formStyles.maincontainer}>
            <div className={formStyles.assignmentformcontainer}>
                <h2>View Stock Assignment</h2>

                <Field label="Assigned User" value={assignedUser.name} />
                <Field label="Department" value={assignedUser.department?.name} />
                <Field label="Location" value={assignedUser.location?.name} />
                <Field label="Previous User" value={assignment.oldUser?.name} />
                <Field label="Device" value={`${device.model} - ${device.serialNumber}`} />
                <Field label="Specs" value={device.specs} />
                <Field label="Assignment Date" value={formatDate(assignment.assignmentDate)} />
                <Field label="Return Date" value={formatDate(assignment.returnDate)} />
                <Field label="Last Update" value={formatDate(assignment.lastUpdateDate)} />
                <Field label="Headset" value={assignment.headset} />

                <div className={`${formStyles.assignmentformelementcontainer} ${formStyles.assignmentformlabeledrow}`}>
                    <span className={styles.label}>Accessories:</span>
                    <div className={formStyles.accessoryList}>
                        {assignment.accessories.length === 0 && <div className={styles.value}>-</div>}
                        {assignment.accessories.map(accessory => (
                            <div key={accessory.id ?? accessory.name} className={formStyles.accessoryListItem}>
                                {accessory.name}
                            </div>
                        ))}
                    </div>
                </div>

                <Field label="Remarks" value={<span className={styles.remarks}>{assignment.remarks}</span>} />

                <div className={`${formStyles.assignmentformelementcontainer} ${formStyles.assignmentformelementbuttoncontainer}`}>
                    <button className={formStyles.assignmentformbutton} onClick={() => navigate('/assignments')}>Back</button>
                </div>
            </div>
        </div>
    );
}
