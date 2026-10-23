import { useState } from 'react';
import TrialLog from '../../domain/TrialLog';
import TrialLogFilter from '../../domain/TrialLogFilter';
import { transactionTypeLabel, transactionTypeOptions } from '../../domain/TransactionType';
import styles from './TrialLogList.module.css'
import { useListTrialLogs } from '../../application/trialLog/useListTrialLogs';
import { useListUsers } from '../../application/user/useListUsers';
import { useListDepartments } from '../../application/department/useListDepartments';
import { useListLocations } from '../../application/location/useListLocations';
import { formatDate } from '../../../../shared/ui/formatting/formatDate';

export default function TrialLogList() {

  const [appliedFilter, setAppliedFilter] = useState<TrialLogFilter>({});
  const { data: trialLogs, isLoading } = useListTrialLogs(appliedFilter);

  const { data: users } = useListUsers();
  const { data: departments } = useListDepartments();
  const { data: locations } = useListLocations();
  const [eventDateFilter, setEventDateFilter] = useState('');
  const [transactionTypeFilter, setTransactionTypeFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');
  const [serialNumberFilter, setSerialNumberFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const hasActiveFilter = eventDateFilter !== '' || transactionTypeFilter !== '' || modelFilter !== ''
    || serialNumberFilter !== '' || userFilter !== '' || departmentFilter !== '' || statusFilter !== '' || locationFilter !== '';

  const applyFilters = () => {
    setAppliedFilter({
      eventDate: eventDateFilter,
      transactionType: transactionTypeFilter === '' ? undefined : Number(transactionTypeFilter),
      model: modelFilter.trim(),
      serialNumber: serialNumberFilter.trim(),
      userId: userFilter,
      departmentId: departmentFilter,
      status: statusFilter,
      locationId: locationFilter,
    });
  }

  const clearFilters = () => {
    setEventDateFilter('');
    setTransactionTypeFilter('');
    setModelFilter('');
    setSerialNumberFilter('');
    setUserFilter('');
    setDepartmentFilter('');
    setStatusFilter('');
    setLocationFilter('');
    setAppliedFilter({});
  }

  if (isLoading)
    return (
      <div className={styles.loadingcontainer}>
        <h3>Please wait</h3>
        <h3>Loading trial logs ...</h3>
      </div>
    )

  return (
    <div className={styles.maincontainer}>
      <div className={styles.filterspanel}>
        <div className={styles.filterfield}>
          <label htmlFor="eventDateFilter">Event Date</label>
          <input id="eventDateFilter" type="date" className={styles.filterinput} value={eventDateFilter} onChange={(e) => setEventDateFilter(e.target.value)} />
        </div>

        <div className={styles.filterfield}>
          <label htmlFor="transactionTypeFilter">Transaction</label>
          <select id="transactionTypeFilter" className={styles.filterinput} value={transactionTypeFilter} onChange={(e) => setTransactionTypeFilter(e.target.value)}>
            <option value="">All transactions</option>
            {transactionTypeOptions.map((transactionType) => (
              <option key={transactionType} value={transactionType}>{transactionTypeLabel(transactionType)}</option>
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
          <label htmlFor="locationFilter">Location</label>
          <select id="locationFilter" className={styles.filterinput} value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="">All locations</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id ?? ''}>{location.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterfield}>
          <label htmlFor="statusFilter">Device Condition</label>
          <input id="statusFilter" type="text" placeholder="Status" className={styles.filterinput} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />        
        </div>

        <div className={styles.filterbuttons}>
          <button type="button" className={styles.filterbutton} onClick={applyFilters}>Apply</button>
          <button type="button" className={styles.filterbutton} onClick={clearFilters} disabled={!hasActiveFilter}>Clear</button>
        </div>
      </div>

      <div className={styles.triallogspanel}>
        <h5 className={styles.triallogstatustitle}>
          Trial Log
        </h5>

        {trialLogs.length == 0 && <div className={styles.emptycontainer}><h5 className={styles.triallogstatustitle}>No trial logs</h5></div>}

        {trialLogs.length > 0 &&
          <div className={styles.tablewrapper}>
            <table className={styles.triallogstable}>
              <thead>
                <tr>
                  <th>Event Date</th>
                  <th>Transaction</th>
                  <th>Model</th>
                  <th>Serial No.</th>
                  <th>User</th>
                  <th>Agent</th>
                  <th>Location</th>
                  <th>Device Condition</th>
                </tr>
              </thead>
              <tbody>
                {trialLogs.map((trialLog: TrialLog) => (
                  <tr key={trialLog.id} className={styles.triallogrow}>
                    <td className={styles.datecell}>
                      {formatDate(trialLog.eventDate)}
                    </td>
                    <td>
                      {transactionTypeLabel(trialLog.transactionType)}
                    </td>
                    <td>
                      {trialLog.deviceModel}
                    </td>
                    <td>
                      {trialLog.deviceSerialNumber}
                    </td>
                    <td>
                      {trialLog.userName}
                    </td>
                    <td>
                      {trialLog.agentName}
                    </td>
                    <td>
                      {trialLog.locationName}
                    </td>
                    <td>
                      {trialLog.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>}

      </div>
    </div>
  );
}
