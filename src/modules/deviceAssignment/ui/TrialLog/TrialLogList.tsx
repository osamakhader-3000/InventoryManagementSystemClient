import TrialLog from '../../domain/TrialLog';
import { transactionTypeLabel } from '../../domain/TransactionType';
import { getDeviceStatusLabel } from '../../domain/DeviceStatus';
import styles from './TrialLogList.module.css'
import { useListTrialLogs } from '../../application/trialLog/useListTrialLogs';
import { formatDate } from '../../../../shared/ui/formatting/formatDate';

export default function TrialLogList() {

  const { data: trialLogs, isLoading } = useListTrialLogs();

  if (isLoading)
    return (
      <div className={styles.loadingcontainer}>
        <h3>Please wait</h3>
        <h3>Loading trial logs ...</h3>
      </div>
    )

  return (
    <div className={styles.maincontainer}>
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
                      {getDeviceStatusLabel(trialLog.status)}
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
