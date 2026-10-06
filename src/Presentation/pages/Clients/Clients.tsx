import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../context/DependencyContext";
import Client from "../../../Domain/Entities/Client";
import styles from './CssStyles/Clients.module.css';
import { Link } from "react-router";
import { EditIconSvg } from "../../../shared/ui/GeneralComponents/EditIconSvg";
import { DeleteIconSvg } from "../../../shared/ui/GeneralComponents/DeleteIconSvg";
import { ButtonPreloader } from "../../../shared/ui/GeneralComponents/ButtonPreloader";
import { UserRole } from "../../../modules/Security/domain/User";
import { ViewIconSvg } from "../../../shared/ui/GeneralComponents/ViewIconSvg";
import { DeleteConfirmation } from "../../../shared/ui/GeneralComponents/DeleteConfirmation";

export default function Clients() {

    const { clientService, notificationHandlingBus, userService } = useContext(DependencyContext);

    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingClientIds, setDeletingClientIds] = useState<Set<string>>(new Set());
    const [readonly, setReadonly] = useState(true);
    const [clientId, setClientId] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deletePermission, setDeletePermission] = useState(true);


    useEffect(() => {
        const fetchClients = async () => {
            const result = await clientService.listClients();
            setClients(result);
            setIsLoading(false);

            let currentUser = await userService.GetCurrentUser();
            if (currentUser) {
                setReadonly(currentUser.userRole !== UserRole.Administrator && currentUser.userRole !== UserRole.TechnicalSupport);
                setDeletePermission(currentUser.userRole === UserRole.Administrator);
            }

        };
        fetchClients();
    }, []);

    const showDeleteConfirmation = (_clientId: string | null) => {

        if (!_clientId) return;

        setClientId(_clientId);
        setShowConfirmation(true);
    }

    const deleteClientConfirmed = () => {
        setShowConfirmation(false);
        handleDeleteClient(clientId);
    }


    const handleDeleteClient = async (clientId: string | null) => {

        if (!clientId) return;

        setDeletingClientIds(prev => new Set(prev).add(clientId));
        let result = await clientService.deleteClient(clientId);

        if (result) {
            notificationHandlingBus.NotificationOccured("Client deleted successfully");
            var _clients = await clientService.listClients();
            setClients(_clients);
        }

        setDeletingClientIds(prev => { const next = new Set(prev); next.delete(clientId!); return next; });

    }

    if (isLoading)
        return (
            <div>
                <h3>Please wait</h3>
                <h3>Loading clients ...</h3>
            </div>
        );

    return (



        <div className={styles.maincontainer}>

            {showConfirmation &&
                <DeleteConfirmation
                    title="Delete Client"
                    message="Are you sure you want to delete this client?"
                    onConfirm={deleteClientConfirmed}
                    onCancel={() => setShowConfirmation(false)}
                />
            }

            <div className={styles.clientpagebuttonspanel}>
                {!readonly &&
                    <Link to={'../addcubesclient/'} >
                        <button type="button" className={styles.addClientbuttonclass}>+ Add Client</button>
                    </Link>
                }
            </div>

            <div className={styles.info}>
                <h2 className={styles.mainTitle}>Clients</h2>

                {clients.length === 0 && (
                    <div className={styles.emptycontainer}>
                        <h5 className={styles.clientstatustitle}>No clients available</h5>
                    </div>
                )}

                {clients.length > 0 && clients.map((client) => (
                    <div key={client.id} className={styles.clientcontainer}>
                        <div className={styles.clientHeader}>
                            <span className={styles.clientName}>{client.name}</span>
                            <span className={styles.actionButtons}>
                                <Link to={`/viewcubesclient/${client.id}`} className={styles.viewButton} title="View">
                                    <button className={styles.listbuttonclass}>
                                        <ViewIconSvg />
                                    </button>
                                </Link>
                                {!readonly &&
                                    <>
                                        <Link to={`/editcubesclient/${client.id}`} className={styles.editButton} title="Edit">
                                            <button className={styles.listbuttonclass}>
                                                <EditIconSvg />
                                            </button>
                                        </Link>

                                        {deletePermission &&
                                        <button className={styles.listbuttonclass} onClick={() => showDeleteConfirmation(client.id)} title="Delete">
                                            {deletingClientIds.has(client.id!) ? <ButtonPreloader /> : (
                                                <DeleteIconSvg />
                                            )}
                                        </button>}
                                    </>
                                }
                            </span>
                        </div>
                        <table className={styles.clientstable}>
                            <tbody>
                                <tr>
                                    <td className={styles.clientTitleCell}>Description:</td>
                                    <td>{client.description}</td>
                                </tr>
                                <tr>
                                    <td className={styles.clientTitleCell}>Current Change Request:</td>
                                    <td>{client.currentChangeRequest}</td>
                                </tr>
                                <tr>
                                    <td className={styles.clientTitleCell}>Last Change Request:</td>
                                    <td>{client.lastChangeRequest}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}
