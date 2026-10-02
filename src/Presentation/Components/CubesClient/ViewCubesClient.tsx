import { useContext, useEffect, useState } from "react";
import Client from "../../../Domain/Entities/Client";
import { DependencyContext } from "../../../context/DependencyContext";
import styles from "./CssStyles/ViewCubesClient.module.css";
import { BackButton } from "../../../shared/ui/GeneralComponents/BackButton";

export default function ViewCubesClient() {

    const { clientService } = useContext(DependencyContext);
    const [client, setClient] = useState<Client | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchClient = async () => {
            const clientId = window.location.pathname.split("/").pop();
            if (!clientId) return;
            const fetchedClient = await clientService.getClient(clientId);
            setClient(fetchedClient);
            setIsLoading(false);
        };
        fetchClient();
    }, []);

    if (isLoading)
        return (
            <div>
                <h3>Please wait</h3>
                <h3>Loading cubes client ...</h3>
            </div>
        );

    if (!client)
        return (
            <div>
                <h3>Client not found</h3>
            </div>
        );

    return (

        <div className={styles.maincontainer}>

            <div className={styles.clientpagebuttonspanel}>
                <BackButton to={'../clients/'} />
            </div>

            <div className={styles.info}>
                <div className={styles.clientHeader}>
                    <span className={styles.clientName}>{client.name}</span>
                </div>
                <div key={client.id} className={styles.clientcontainer}>

                    <table className={styles.clientstable}>
                        <tbody>
                            <tr>
                                <td className={styles.clientTitleCell}>Description:</td>
                                <td>{client.description}</td>
                            </tr>
                            <tr>
                                <td className={styles.clientTitleCell}>Current Change Request:</td>
                                <td >{client.currentChangeRequest}</td>
                            </tr>
                            <tr>
                                <td className={styles.clientTitleCell}>Last Change Request:</td>
                                <td >{client.lastChangeRequest}</td>
                            </tr>
                            <tr>
                                <td className={styles.clientTitleCell}>Client Builds:</td>
                                <td>{client.builds.map((build, index) => (
                                    <div key={index} className={styles.buildItem}>
                                        <a href={`/viewcubesbuild/${build.id}`} target="_blank" className={styles.buildLink}><span className={styles.buildName}>{build.version}</span></a>
                                    </div>
                                ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}
