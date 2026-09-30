import { useContext, useEffect, useState } from 'react';
import { TextBox } from '../GeneralComponents/TextBox';
import style from './CssStyles/CubesBuildForm.module.css';
import { LoadingButton } from '../GeneralComponents/LoadingButton';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../context/DependencyContext';
import Build from '../../../Domain/Entities/Build';
import Client from '../../../Domain/Entities/Client';


interface CubesBuildFormProps {
    build?: Build | null;
    editMode?: boolean;
}

export function CubesBuildForm({ build, editMode }: CubesBuildFormProps) {

    const { buildService, clientService, notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
    const navigate = useNavigate();

    const [clients, setClients] = useState(build?.clients?.length ? build.clients : []);
    const [isSaving, setIsSaving] = useState(false);
    const [version, setVersion] = useState(build?.version ?? '');
    const [link, setLink] = useState(build?.link ?? '');
    const [allClients, setAllClients] = useState<Client[]>([]);
    const [isLoadingClients, setIsLoadingClients] = useState(true);


    useEffect(() => {

        async function fetchClients() {
            let fetchedClients = await clientService.listClients();
            setAllClients(fetchedClients);
            setIsLoadingClients(false);
        }
        fetchClients();
    }, []);

    function toggleClient(client: Client) {
        if (clients.some(c => c.id === client.id)) {
            setClients(clients.filter(c => c.id !== client.id));
        } else {
            setClients([...clients, client]);
        }
    }

    function handleCancel() {
        navigate('/builds');
    }

    function validateBuild(): boolean {

        if (version == null || version.trim() == '') {
            errorHandlingBus.ErrorOccured('The build version or number is required');
            return false;
        }

        return true;
    }

    async function addBuild() {

        if (!validateBuild())
            return;

        let cubesBuild = new Build(null, version, link, clients, null, null);

        setIsSaving(true);

        let result = await buildService.createBuild(cubesBuild);

        setIsSaving(false);

        if (result) {
            notificationHandlingBus.NotificationOccured('Build added successfully');
            navigate('/builds');
        }

    }


    async function editBuild() {

        if (!validateBuild())
            return;

        if (!build) {
            errorHandlingBus.ErrorOccured('Build data is missing');
            return;
        }

        let cubesBuild = new Build(build.id, version, link, clients, build.updatedAt, build.updatedBy);

        setIsSaving(true);

        let result = await buildService.updateBuild(cubesBuild);

        setIsSaving(false);

        if (result){
            navigate('/builds');
            notificationHandlingBus.NotificationOccured('Build updated successfully');
        }
    }


    return (
        <div className={style.maincontainer}>
            <div className={style.formcontainer}>
                {editMode ? <h2>Edit Build</h2> : <h2>Add Build</h2>}
                <div className={style.elementcontainer}>
                    <TextBox maxLength={100} placeholder="Version or number" value={version} onChange={e => setVersion(e.target.value)} />
                </div>
                <div className={style.elementcontainer}>
                    <TextBox maxLength={2000} placeholder="Link of the build" value={link} onChange={e => setLink(e.target.value)} />
                </div>
                <br /><br />

                <div className={style.clientsContainer}>
                    <h3>Associated Clients</h3>
                    <div className={style.clientList}>
                        {isLoadingClients && <p>Loading client...</p>}
                        {!isLoadingClients && allClients.map(client => (
                            <div key={client.id} className={style.clientListItem}>
                                <input type="checkbox" checked={clients.some(c => c.id === client.id)} onChange={() => toggleClient(client)} />
                                <span className={style.spanClientName} onClick={() => toggleClient(client)}>{client.name}</span>
                                <span title={'open ' + client.name}>
                                    <a href={`/editcubesclient/${client.id}`} target="_blank" rel="noopener noreferrer">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="blue" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="blue" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${style.elementcontainer} ${style.elementbuttoncontainer}`}>

                    {editMode ? <LoadingButton cssClass={`${style.formbutton} ${style.formokbutton}`} onClick={editBuild} label='Save' isLoading={isSaving} />
                        : <LoadingButton cssClass={`${style.formbutton} ${style.formokbutton}`} onClick={addBuild} label='Add' isLoading={isSaving} />}

                    <button className={style.formbutton} onClick={handleCancel}>Cancel</button>
                </div>

            </div>
        </div>
    );
}