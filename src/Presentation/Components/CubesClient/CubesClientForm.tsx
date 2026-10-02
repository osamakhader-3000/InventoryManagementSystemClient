import { useContext, useEffect, useState } from 'react';
import { TextBox } from '../../../shared/ui/GeneralComponents/TextBox';
import style from './CssStyles/CubesClientForm.module.css';
import { LoadingButton } from '../../../shared/ui/GeneralComponents/LoadingButton';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../context/DependencyContext';
import Client from '../../../Domain/Entities/Client';
import Build from '../../../Domain/Entities/Build';

interface CubesClientFormProps {
    client?: Client | null;
    editMode?: boolean;
}

export function CubesClientForm({ client, editMode }: CubesClientFormProps) {

    const { clientService, buildService, notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
    const navigate = useNavigate();

    const [isSaving, setIsSaving] = useState(false);
    const [name, setName] = useState(client?.name ?? '');
    const [description, setDescription] = useState(client?.description ?? '');
    const [builds, setBuilds] = useState<Build[]>(client?.builds ?? []);
    const [allBuilds, setAllBuilds] = useState<Build[]>([]);
    const [currentChangeRequest, setCurrentChangeRequest] = useState(client?.currentChangeRequest ?? '');
    const [lastChangeRequest, setLastChangeRequest] = useState(client?.lastChangeRequest ?? '');
    const [isLoadingBuilds, setIsLoadingBuilds] = useState(true);

    useEffect(() => {

        async function fetchBuilds() {
            let fetchedBuilds = await buildService.listBuilds();
            setAllBuilds(fetchedBuilds);
            setIsLoadingBuilds(false);
        }

        fetchBuilds();

    }, []);

    function handleCancel() {
        navigate('/clients');
    }

    function validateClient(): boolean {
        if (!name.trim()) {
            errorHandlingBus.ErrorOccured('The client name is required');
            return false;
        }
        return true;
    }

    async function addClient() {
        if (!validateClient()) return;


        const newClient = new Client(null, name.trim(), description.trim(), builds, currentChangeRequest.trim(), lastChangeRequest.trim());

        setIsSaving(true);
        let success = await clientService.createClient(newClient);
        setIsSaving(false);

        if (success) {
            notificationHandlingBus.NotificationOccured('Client added successfully');
            navigate('/clients');
        }
    }

    function toggleBuild(build: Build) {
        if (builds.some(b => b.id === build.id)) {
            setBuilds(builds.filter(b => b.id !== build.id).map(b => new Build(b.id, '', '', [], null, null)));
        } else {
            setBuilds([...builds, new Build(build.id, '', '', [], null, null)]);
        }
    }

    async function editClient() {
        if (!validateClient()) return;

        if (!client) {
            errorHandlingBus.ErrorOccured('Client data is missing');
            return;
        }

        const updatedClient = new Client(client.id, name.trim(), description.trim(), builds, currentChangeRequest.trim(), lastChangeRequest.trim());

        setIsSaving(true);
        let success = await clientService.updateClient(updatedClient);
        setIsSaving(false);

        if (success) {
            notificationHandlingBus.NotificationOccured('Client updated successfully');
            navigate('/clients');
        }
    }

    return (
        <div className={style.maincontainer}>
            <div className={style.formcontainer}>
                {editMode ? <h2>Edit Client</h2> : <h2>Add Client</h2>}
                <div className={style.elementcontainer}>
                    <TextBox maxLength={100} placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className={style.elementcontainer}>
                    <TextBox maxLength={500} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className={style.elementcontainer}>
                    <TextBox maxLength={200} placeholder="Current Change Request" value={currentChangeRequest} onChange={e => setCurrentChangeRequest(e.target.value)} />
                </div>
                <div className={style.elementcontainer}>
                    <TextBox maxLength={200} placeholder="Last Change Request" value={lastChangeRequest} onChange={e => setLastChangeRequest(e.target.value)} />
                </div>
                <div className={style.buildsContainer}>
                    <h3>Associated Builds</h3>
                    <div className={style.buildList}>
                        {isLoadingBuilds && <p>Loading builds...</p>}
                        {!isLoadingBuilds && allBuilds.map(build => (
                            <div key={build.id} className={style.buildListItem}>
                                <input type="checkbox" checked={builds.some(b => b.id === build.id)} onChange={() => toggleBuild(build)} />
                                <span className={style.spanBuildVersion} onClick={() => toggleBuild(build)}>{build.version}</span>
                                <span title={'open ' + build.version}>
                                    <a href={`/editcubesbuild/${build.id}`} target="_blank" rel="noopener noreferrer">
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
                    {editMode
                        ? <LoadingButton cssClass={`${style.formbutton} ${style.formokbutton}`} onClick={editClient} label='Save' isLoading={isSaving} />
                        : <LoadingButton cssClass={`${style.formbutton} ${style.formokbutton}`} onClick={addClient} label='Add' isLoading={isSaving} />
                    }
                    <button className={style.formbutton} onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
