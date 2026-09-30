import { CubesClientForm } from "./CubesClientForm";
import { useContext, useEffect, useState } from "react";
import { DependencyContext } from "../../../context/DependencyContext";
import Client from "../../../Domain/Entities/Client";
import styles from "./CssStyles/EditCubesClient.module.css";


export default function EditCubesClient() {

    const { clientService } = useContext(DependencyContext);
    const [client, setClient] = useState<Client | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchClient = async () => {
            const clientId = window.location.pathname.split("/").pop();
            if (!clientId) return;

            const result = await clientService.getClient(clientId);
            setIsLoading(false);
            setClient(result);
        };
        fetchClient();
    }, []);

    if (isLoading)
        return (
            <div className={styles.messagecontainer}>
                <h3>Please wait</h3>
                <h3>Loading client ...</h3>
            </div>
        );

    return <CubesClientForm client={client} editMode={true} />;
}
