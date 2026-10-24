import { useState, useContext } from 'react';
import { Link } from 'react-router';
import User from '../../domain/User';
import { UserFilter } from '../../domain/IUserRepository';
import styles from './UsersList.module.css'
import { DependencyContext } from '../../../../app/DependencyContext';
import {ButtonPreloader} from '../../../../shared/ui/GeneralComponents/ButtonPreloader';
import { useListUsers } from '../../application/user/useListUsers';
import { useSuspendUser } from '../../application/user/useSuspendUser';
import { useListDepartments } from '../../application/department/useListDepartments';
import { useListLocations } from '../../application/location/useListLocations';

export default function UsersList() {

  const { notificationHandlingBus } = useContext(DependencyContext);

  const [appliedFilter, setAppliedFilter] = useState<UserFilter>({});
  const { data: users, isLoading, reload } = useListUsers(appliedFilter);
  const { suspendUser, unsuspendUser, pendingIds: pendingUserIds } = useSuspendUser();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userid, setUserId] = useState<string | null>(null);

  const { data: departments } = useListDepartments();
  const { data: locations } = useListLocations();
  const [nameFilter, setNameFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const hasActiveFilter = nameFilter !== '' || departmentFilter !== '' || locationFilter !== '';

  const applyFilters = () => {
    setAppliedFilter({
      name: nameFilter.trim() || undefined,
      departmentId: departmentFilter || undefined,
      locationId: locationFilter || undefined,
    });
  }

  const clearFilters = () => {
    setNameFilter('');
    setDepartmentFilter('');
    setLocationFilter('');
    setAppliedFilter({});
  }

  const showSuspendConfirmation = (_userid: string | null) => {

    if (!_userid) return;

    setUserId(_userid);
    setShowConfirmation(true);

  }

  const suspendUserConfirmed = () => {
    setShowConfirmation(false);
    handleSuspendUser(userid);
  }

  const handleSuspendUser = async (userid: string | null) => {

    if (!userid) return;

    let result = await suspendUser(userid);

    if (result) {
      notificationHandlingBus.NotificationOccured("User suspended successfully");
      reload();
    }

  }

  const handleUnsuspendUser = async (userid: string | null) => {

    if (!userid) return;

    let result = await unsuspendUser(userid);

    if (result) {
      notificationHandlingBus.NotificationOccured("User unsuspended successfully");
      reload();
    }

  }

  if (isLoading)
    return (
      <div className={styles.loadingcontainer}>
        <h3>Please wait</h3>
        <h3>Loading users ...</h3>
      </div>
    )

  return (
    <>
      {showConfirmation &&
        <div className={styles.confirmationcontainer} onClick={() => setShowConfirmation(false)}>
          <div className={styles.confirmationbox} onClick={(e) => e.stopPropagation()}>
            <h3>Are you sure you want to suspend this user?</h3>
            <p>All devices and accessories assigned to this user will be returned to stock.</p>
            <div className={styles.confirmationbuttons}>
              <button className={styles.confirmationbutton} onClick={() => suspendUserConfirmed()}>Yes</button>
              <button className={styles.confirmationbutton} onClick={() => setShowConfirmation(false)}>No</button>
            </div>
          </div>
        </div>}

      <div className={styles.maincontainer}>
        <div className={styles.userpagebuttonspanel}>
          <Link to={'/adduser'} >
            <button type="button" className={styles.adduserbuttonclass}>+ Add</button>
          </Link>
        </div>

        <div className={styles.filterspanel}>
          <div className={styles.filterfield}>
            <label htmlFor="nameFilter">Name</label>
            <input id="nameFilter" type="text" placeholder="Search users" className={styles.filterinput} value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') applyFilters(); }} />
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
            <label htmlFor="locationFilter">Location</label>
            <select id="locationFilter" className={styles.filterinput} value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="">All locations</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id ?? ''}>{location.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterbuttons}>
            <button type="button" className={styles.filterbutton} onClick={applyFilters}>Apply</button>
            <button type="button" className={styles.filterbutton} onClick={clearFilters} disabled={!hasActiveFilter}>Clear</button>
          </div>
        </div>

        <div className={styles.userspanel}>
          <h5 className={styles.userstatustitle}>
            Users
          </h5>

          {users.length == 0 && <div className={styles.emptycontainer}><h5 className={styles.userstatustitle}>No users</h5></div>}

          {users.length > 0 &&
            <div className={styles.tablewrapper}>
              <table className={styles.userstable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th className={styles.actionscolumn}>Actions</th>
                  </tr>
                </thead>
                <tbody>
          {users.map((user: User, index) => (
            <tr key={user.id ?? index} className={styles.userrow}>
              <td className={styles.namecell}>
                {user.name}
              </td>
              <td>
                {user.department?.name}
              </td>
              <td>
                {user.location?.name}
              </td>
              <td>
                {user.isSuspended ? "Suspended" : "Active"}
              </td>
              <td className={styles.actionscolumn}>
              <div className={styles.userbuttonspan}>
                <Link to={`/edituser/${user.id}`}>
                  <button className={styles.userlistbuttonclass}>
                    <svg width="20" height="20" fill="black" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 494.936 494.936">
                      <g>
                        <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"></path> <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"></path>
                      </g>
                    </svg>
                  </button>
                </Link>
                {!user.isSuspended &&
                <button className={styles.userlistbuttonclass} title="Suspend user" onClick={() => showSuspendConfirmation(user.id)}>
                  {pendingUserIds.has(user.id!) ? <ButtonPreloader /> : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 16 16" >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
                    </svg>
                  )}
                </button>}
                {!!user.isSuspended &&
                <button className={styles.userlistbuttonclass} title="Unsuspend user" onClick={() => handleUnsuspendUser(user.id)}>
                  {pendingUserIds.has(user.id!) ? <ButtonPreloader /> : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" viewBox="0 0 16 16" >
                      <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                      <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                    </svg>
                  )}
                </button>}
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
