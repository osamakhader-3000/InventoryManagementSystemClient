import { useState, useContext } from 'react';
import { Link } from 'react-router';
import Client from '../../domain/Client';
import styles from './ClientsList.module.css'
import { DependencyContext } from '../../../../app/DependencyContext';
import { ButtonPreloader } from '../../../../shared/ui/GeneralComponents/ButtonPreloader';
import { DeleteConfirmation } from '../../../../shared/ui/GeneralComponents/DeleteConfirmation';
import { EditIconSvg } from '../../../../shared/ui/GeneralComponents/EditIconSvg';
import { DeleteIconSvg } from '../../../../shared/ui/GeneralComponents/DeleteIconSvg';
import { useListClients } from '../../application/client/useListClients';
import { useDeleteClient } from '../../application/client/useDeleteClient';

export default function ClientsList() {

  const { notificationHandlingBus } = useContext(DependencyContext);

  const [nameFilter, setNameFilter] = useState('');
  const [appliedNameFilter, setAppliedNameFilter] = useState('');

  const { data: clients, isLoading, reload } = useListClients(appliedNameFilter);
  const { deleteClient, deletingIds: deletingClientIds } = useDeleteClient();
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  const hasActiveFilter = nameFilter !== '' || appliedNameFilter !== '';

  const applyFilters = () => {
    setAppliedNameFilter(nameFilter.trim());
  }

  const clearFilters = () => {
    setNameFilter('');
    setAppliedNameFilter('');
  }

  const deleteClientConfirmed = async () => {
    const client = clientToDelete;
    setClientToDelete(null);
    if (!client?.id) return;

    // The backend rejects deleting a client related to builds; its message is shown by the error listener.
    if (await deleteClient(client.id)) {
      notificationHandlingBus.NotificationOccured("Client deleted successfully");
      reload();
    }
  }

  if (isLoading)
    return (
      <div className={styles.loadingcontainer}>
        <h3>Please wait</h3>
        <h3>Loading clients ...</h3>
      </div>
    )

  return (
    <>
      {clientToDelete &&
        <DeleteConfirmation
          title="Are you sure you want to delete this client?"
          message={clientToDelete.builds.length > 0
            ? `${clientToDelete.name} is related to ${clientToDelete.builds.length} build(s) and cannot be deleted until it is removed from them.`
            : `${clientToDelete.name} will be permanently deleted.`}
          onConfirm={deleteClientConfirmed}
          onCancel={() => setClientToDelete(null)} />}

      <div className={styles.maincontainer}>
        <div className={styles.clientpagebuttonspanel}>
          <Link to={'/addclient'} >
            <button type="button" className={styles.addclientbuttonclass}>+ Add</button>
          </Link>
        </div>

        <div className={styles.filterspanel}>
          <div className={styles.filterfield}>
            <label htmlFor="nameFilter">Name</label>
            <input id="nameFilter" type="text" placeholder="Search clients" className={styles.filterinput} value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters()} />
          </div>
          <div className={styles.filterbuttons}>
            <button type="button" className={styles.filterbutton} onClick={applyFilters}>Apply</button>
            <button type="button" className={styles.filterbutton} onClick={clearFilters} disabled={!hasActiveFilter}>Clear</button>
          </div>
        </div>

        <div className={styles.clientspanel}>
          <h5 className={styles.clientstatustitle}>
            Clients
          </h5>

          {clients.length == 0 && <div className={styles.emptycontainer}><h5 className={styles.clientstatustitle}>No clients</h5></div>}

          {clients.length > 0 &&
            <div className={styles.tablewrapper}>
              <table className={styles.clientstable}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Builds</th>
                    <th className={styles.actionscolumn}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client: Client, index) => (
                    <tr key={client.id ?? index} className={styles.clientrow}>
                      <td className={styles.namecell}>
                        {client.name}
                      </td>
                      <td className={styles.relatedcell}>
                        {client.description ?? '-'}
                      </td>
                      <td className={styles.relatedcell}>
                        {client.builds.length == 0 ? '-' : client.builds.map(build => (
                          <span key={build.id} className={styles.relatedchip}>{build.version}</span>
                        ))}
                      </td>
                      <td className={styles.actionscolumn}>
                        <div className={styles.clientbuttonspan}>
                          <Link to={`/editclient/${client.id}`}>
                            <button className={styles.clientlistbuttonclass}>
                              <EditIconSvg />
                            </button>
                          </Link>
                          <button className={styles.clientlistbuttonclass} onClick={() => setClientToDelete(client)}>
                            {deletingClientIds.has(client.id!) ? <ButtonPreloader /> : <DeleteIconSvg />}
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
