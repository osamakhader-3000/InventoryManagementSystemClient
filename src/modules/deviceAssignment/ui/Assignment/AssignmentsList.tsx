import { useState, useContext } from 'react';
import { Link } from 'react-router';
import Assignment from '../../domain/Assignment';
import styles from './AssignmentsList.module.css'
import { DependencyContext } from '../../../../app/DependencyContext';
import {ButtonPreloader} from '../../../../shared/ui/GeneralComponents/ButtonPreloader';
import { useListAssignments } from '../../application/assignment/useListAssignments';
import { useReturnAssignment } from '../../application/assignment/useReturnAssignment';
import { useListUsers } from '../../application/user/useListUsers';
import { useListDepartments } from '../../application/department/useListDepartments';


export default function AssignmentsList() {

  const { notificationHandlingBus } = useContext(DependencyContext);

  const { data: assignments, isLoading, reload } = useListAssignments();
  const { returnAssignment, returningIds: returningAssignmentIds } = useReturnAssignment();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [assignmentid, setAssignmentId] = useState<number | null>(null);

  const { data: users } = useListUsers();
  const { data: departments } = useListDepartments();
  const [userFilter, setUserFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [purchasedDateFilter, setPurchasedDateFilter] = useState('');

  const hasActiveFilter = userFilter !== '' || departmentFilter !== '' || purchasedDateFilter !== '';

  const applyFilters = () => {
    // TODO: pass the filters to the server once server-side filtering is available.
  }

  const clearFilters = () => {
    setUserFilter('');
    setDepartmentFilter('');
    setPurchasedDateFilter('');
  }

  const showReturnConfirmation = (_assignmentid: number | null) => {

    if (!_assignmentid) return;

    setAssignmentId(_assignmentid);
    setShowConfirmation(true);

  }

  const returnAssignmentConfirmed = () => {
    setShowConfirmation(false);
    handleReturnAssignment(assignmentid);
  }



  const handleReturnAssignment = async (assignmentid: number | null) => {

    if (!assignmentid) return;

    let result = await returnAssignment(assignmentid);

    if (result) {
      notificationHandlingBus.NotificationOccured("Assignment returned successfully");
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
            <h3>Are you sure you want to return this assignment?</h3>
            <div className={styles.confirmationbuttons}>
              <button className={styles.confirmationbutton} onClick={() => returnAssignmentConfirmed()}>Yes</button>
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

        <div className={styles.filterspanel}>
          <div className={styles.filterfield}>
            <label htmlFor="userFilter">User</label>
            <select id="userFilter" className={styles.filterinput} value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
              <option value="">All users</option>
              {users.map((user) => (
                <option key={user.id} value={user.id ?? ''}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterfield}>
            <label htmlFor="departmentFilter">Department</label>
            <select id="departmentFilter" className={styles.filterinput} value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
              <option value="">All departments</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id ?? ''}>{department.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterfield}>
            <label htmlFor="purchasedDateFilter">Purchased Date</label>
            <input id="purchasedDateFilter" type="date" className={styles.filterinput} value={purchasedDateFilter} onChange={(e) => setPurchasedDateFilter(e.target.value)} />
          </div>
          <div className={styles.filterbuttons}>
            <button type="button" className={styles.filterbutton} onClick={applyFilters}>Apply</button>
            <button type="button" className={styles.filterbutton} onClick={clearFilters} disabled={!hasActiveFilter}>Clear</button>
          </div>
        </div>

        <div className={styles.assignmentspanel}>
          <h5 className={styles.assignmentstatustitle}>
            Assignments
          </h5>

          {assignments.length == 0 && <div className={styles.emptycontainer}><h5 className={styles.assignmentstatustitle}>No assignments</h5></div>}

          {assignments.length > 0 &&
            <div className={styles.tablewrapper}>
              <table className={styles.assignmentstable}>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Model</th>
                    <th>Serial No.</th>
                    <th>Accessory</th>
                    <th>OS</th>
                    <th>Specs</th>
                    <th>Purchased</th>
                    <th>Retirement</th>
                    <th>Price</th>
                    <th>Department</th>
                    <th>Old User</th>
                    <th>Remarks</th>
                    <th>Last Update</th>
                    <th className={styles.actionscolumn}>Actions</th>
                  </tr>
                </thead>
                <tbody>
          {assignments.map((assignment: Assignment, index) => (
            <tr key={index} className={styles.assignmentrow}>
              <td className={styles.usercell}>
                {assignment.assignedUser.name}
              </td>
              <td>
                {assignment.device.model}
              </td>
              <td>
                {assignment.device.serialNumber}
              </td>
              <td>
                {assignment.accessories[0]?.name}
              </td>
              <td>
                {assignment.device.operatingSystem?.name}
              </td>
              <td>
                {assignment.device.specs}
              </td>
              <td>
                {assignment.device.purchasedDate?.toLocaleString()}
              </td>
              <td>
                {assignment.device.retirementDate?.toLocaleString()}
              </td>
              <td>
                {assignment.device.price}
              </td>
              <td>
                {assignment.assignedUser.department.name}
              </td>
              <td>
                {assignment.oldUser?.name}
              </td>
              <td className={styles.remarkscell}>
                {assignment.remarks}
              </td>
              <td>
                {assignment.lastUpdateDate?.toLocaleString()}
              </td>
              <td className={styles.actionscolumn}>
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
                <button className={styles.assignmentlistbuttonclass} title="Return Assignment" onClick={() => showReturnConfirmation(assignment.id)}>
                  {returningAssignmentIds.has(assignment.id!) ? <ButtonPreloader /> : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 14L4 9l5-5" />
                      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11" />
                    </svg>
                  )}
                </button>
              </div>
              </td>
            </tr>
          ))}
                </tbody>
              </table>
            </div>}

        </div>
      </div>
    </>
  );
}


