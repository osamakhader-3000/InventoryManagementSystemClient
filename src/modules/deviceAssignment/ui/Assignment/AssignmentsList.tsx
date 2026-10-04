import { useState, useContext } from 'react';
import { Link } from 'react-router';
import Assignment from '../../domain/Assignment';
import styles from './AssignmentsList.module.css'
import { DependencyContext } from '../../../../context/DependencyContext';
import {ButtonPreloader} from '../../../../shared/ui/GeneralComponents/ButtonPreloader';
import { useListAssignments } from '../../application/assignment/useListAssignments';
import { useDeleteAssignment } from '../../application/assignment/useDeleteAssignment';


export default function AssignmentsList() {

  const { notificationHandlingBus } = useContext(DependencyContext);

  const { data: assignments, isLoading, reload } = useListAssignments();
  const { deleteAssignment, deletingIds: deletingAssignmentIds } = useDeleteAssignment();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [assignmentid, setAssignmentId] = useState<bigint | null>(null);

  const showDeleteConfirmation = (_assignmentid: bigint | null) => {

    if (!_assignmentid) return;

    setAssignmentId(_assignmentid);
    setShowConfirmation(true);

  }

  const deleteAssignmentConfirmed = () => {
    setShowConfirmation(false);
    handleDeleteAssignment(assignmentid);
  }



  const handleDeleteAssignment = async (assignmentid: bigint | null) => {

    if (!assignmentid) return;

    let result = await deleteAssignment(assignmentid);

    if (result) {
      notificationHandlingBus.NotificationOccured("Assignment deleted successfully");
      reload();
    }

  }

  if (isLoading)
    return (
      <div className={styles.loadingcontainer}>
        <h3>Please wait</h3>
        <h3>Loading assignments ...</h3>
      </div>
    )

  return (
    <>
      {showConfirmation &&
        <div className={styles.confirmationcontainer} onClick={() => setShowConfirmation(false)}>
          <div className={styles.confirmationbox} onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to delete this assignment?</h3>
            <div className={styles.confirmationbuttons}>
              <button className={styles.confirmationbutton} onClick={() => deleteAssignmentConfirmed()}>Yes</button>
              <button className={styles.confirmationbutton} onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        </div>}

      <div className={styles.maincontainer}>
        <div className={styles.assignmentpagebuttonspanel}>
          <Link to={'../addassignment/'} >
            <button type="button" className={styles.addassignmentbuttonclass}>+ Add</button>
          </Link>
        </div>

        <div className={styles.assignmentspanel}>
          <h5 className={styles.assignmentstatustitle}>
            Assignments
          </h5>

          {assignments.length == 0 && <div className={styles.emptycontainer}><h5 className={styles.assignmentstatustitle}>No assignments</h5></div>}

          {assignments.length > 0 && assignments.map((assignment: Assignment, index) => (
            <div key={index} className={styles.assignmentcontainer}>
              <span>
                {assignment.assignedUser.name}
              </span>
              <span>
                {assignment.device.model}
              </span>
               <span>
                {assignment.device.serialNumber}
              </span>
              <span>
                {assignment.accessories[0]?.name}
              </span>
              <span>
                {assignment.device.os}
              </span>
              <span>
                {assignment.device.specs}
              </span>
              <span>
                {assignment.device.purchasedDate?.toLocaleDateString()}
              </span>
              <span>
                {assignment.device.retirementDate?.toLocaleDateString()}
              </span>
              <span>
                {assignment.device.price}
              </span>
              <span>
                {assignment.assignedUser.department.name}
              </span>
              <span>
                {assignment.oldUser?.name}
              </span>
              <span>
                {assignment.remarks}
              </span>
              <span>
                {assignment.lastUpdateDate?.toLocaleDateString()}
              </span>
              <div className={styles.assignmentbuttonspan}>
                <Link to={`/assignment/${assignment.id}`}>
                  <button className={styles.assignmentlistbuttonclass}>
                    <svg width="20" height="20" fill="black" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 494.936 494.936">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier"><g> <g>
                        <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"></path> <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z">
                        </path>
                      </g> </g></g>
                    </svg>
                  </button>
                </Link>
                <button className={styles.assignmentlistbuttonclass} onClick={() => showDeleteConfirmation(assignment.id)}>
                  {deletingAssignmentIds.has(assignment.id!) ? <ButtonPreloader /> : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 16 16" >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}


