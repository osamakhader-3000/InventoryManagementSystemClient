import { useState, useContext } from 'react';
import { Link } from 'react-router';
import Assignment from '../../domain/Assignment';
import AssignmentFilter from '../../domain/AssignmentFilter';
import styles from './AssignmentsList.module.css'
import { DependencyContext } from '../../../../app/DependencyContext';
import {ButtonPreloader} from '../../../../shared/ui/GeneralComponents/ButtonPreloader';
import { useListAssignments } from '../../application/assignment/useListAssignments';
import { useReturnAssignment } from '../../application/assignment/useReturnAssignment';
import { useListUsers } from '../../application/user/useListUsers';
import { useListDepartments } from '../../application/department/useListDepartments';
import { formatDate } from '../../../../shared/ui/formatting/formatDate';

export default function AssignmentsList() {

  const { notificationHandlingBus } = useContext(DependencyContext);

  const [appliedFilter, setAppliedFilter] = useState<AssignmentFilter>({});
  const { data: assignments, isLoading, reload } = useListAssignments(appliedFilter);
  const { returnAssignment, returningIds: returningAssignmentIds } = useReturnAssignment();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [assignmentid, setAssignmentId] = useState<number | null>(null);

  const { data: users } = useListUsers();
  const { data: departments } = useListDepartments();
  const [userFilter, setUserFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [purchasedDateFilter, setPurchasedDateFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [isReturnedFilter, setIsReturnedFilter] = useState('');
  const [serialNumberFilter, setSerialNumberFilter] = useState('');
  const hasActiveFilter = userFilter !== '' || departmentFilter !== '' || purchasedDateFilter !== ''
    || modelFilter !== '' || isReturnedFilter !== '' || serialNumberFilter !== '';

  const applyFilters = () => {
    setAppliedFilter({
      userId: userFilter,
      departmentId: departmentFilter,
      purchasedDate: purchasedDateFilter,
      model: modelFilter.trim(),
      serialNumber: serialNumberFilter.trim(),
      isReturned: isReturnedFilter === '' ? undefined : isReturnedFilter === 'true',
    });
  }

  const clearFilters = () => {
    setUserFilter('');
    setDepartmentFilter('');
    setPurchasedDateFilter('');
    setModelFilter('');
    setIsReturnedFilter('');
    setSerialNumberFilter('');
    setAppliedFilter({});
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
            <label htmlFor="modelFilter">Model</label>
            <input id="modelFilter" type="text" placeholder="Search model" className={styles.filterinput} value={modelFilter} onChange={(e) => setModelFilter(e.target.value)} />
          </div>

         <div className={styles.filterfield}>
            <label htmlFor="serialNumberFilter">Serial No.</label>
            <input id="serialNumberFilter" type="text" placeholder="Search serial no." className={styles.filterinput} value={serialNumberFilter} onChange={(e) => setSerialNumberFilter(e.target.value)} />
          </div>
          <div className={styles.filterfield}>
            <label htmlFor="purchasedDateFilter">Purchased Date</label>
            <input id="purchasedDateFilter" type="date" className={styles.filterinput} value={purchasedDateFilter} onChange={(e) => setPurchasedDateFilter(e.target.value)} />
          </div>

          <div className={styles.filterfield}>
            <label htmlFor="isReturnedFilter">Is Returned</label>
            <select id="isReturnedFilter" className={styles.filterinput} value={isReturnedFilter} onChange={(e) => setIsReturnedFilter(e.target.value)}>
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
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
                    <th>Operating System</th>
                    <th>Specs</th>
                    <th>Purchase Date</th>
                    <th>Is Returned</th>
                    <th>Department</th>
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
                {assignment.device.operatingSystem?.name}
              </td>
              <td>
                {assignment.device.specs}
              </td>
              <td>
                {formatDate(assignment.device.purchasedDate)}
              </td>           
              <td>
                {assignment.isReturned ? 'Yes' : 'No'}
              </td>
              <td>
                {assignment.assignedUser.department.name}
              </td> 
              <td>
                {formatDate(assignment.lastUpdateDate)}
              </td>
              <td className={styles.actionscolumn}>
              {!assignment.isReturned && <div className={styles.assignmentbuttonspan}>
                <Link to={`/viewassignment/${assignment.id}`}>
                  <button className={styles.assignmentlistbuttonclass} title="View Details">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
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
              </div>}
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


