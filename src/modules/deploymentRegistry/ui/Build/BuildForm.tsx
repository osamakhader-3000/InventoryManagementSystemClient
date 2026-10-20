import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../app/DependencyContext';
import styles from '../../../../shared/ui/SharedCss/Forms.module.css';
import buildFormStyles from './BuildForm.module.css';
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useCreateBuild } from '../../application/build/useCreateBuild';
import { useUpdateBuild } from '../../application/build/useUpdateBuild';
import { useListClients } from '../../application/client/useListClients';
import { getErrorMessage } from '../../../../shared/infrastructure/messaging/getErrorMessage';

interface BuildFormProps {
    buildId?: string | null;
    version?: string;
    link?: string | null;
    clientIds?: string[];
    editMode?: boolean;
}

export default function BuildForm({ buildId = null, version = "", link = "", clientIds = [], editMode = false }: BuildFormProps) {
  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [buildVersion, setBuildVersion] = useState(version);
  const [buildLink, setBuildLink] = useState(link ?? "");
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>(clientIds);
  const { data: allClients, isLoading: isLoadingClients } = useListClients();
  const { createBuild, isSaving: isCreating } = useCreateBuild();
  const { updateBuild, isSaving: isUpdating } = useUpdateBuild();
  const isSaving = isCreating || isUpdating;

  const toggleClient = (clientId: string) => {
    setSelectedClientIds(prev =>
      prev.includes(clientId) ? prev.filter(id => id !== clientId) : [...prev, clientId]
    );
  };

  // Quick UX checks only; business rules are enforced by the Build entity.
  const validateForm = (): boolean => {
    if (buildVersion.trim() === "") {
      errorHandlingBus.ErrorOccured("Please enter a version");
      return false;
    }

    return true;
  };

  const buildBuildProps = () => ({
    version: buildVersion,
    link: buildLink,
    clientIds: selectedClientIds,
  });

  const save = async (saveBuild: () => Promise<boolean>, successMessage: string) => {
    if (!validateForm()) return;

    try {
      if (await saveBuild()) {
        notificationHandlingBus.NotificationOccured(successMessage);
        navigate(-1);
      }
    } catch (error) {
      errorHandlingBus.ErrorOccured(getErrorMessage(error, "Failed to save build"));
    }
  };

  const handleAdd = () => save(
    () => createBuild(buildBuildProps()),
    "Build added successfully"
  );

  const handleUpdate = () => {
    if (buildId === null) {
      errorHandlingBus.ErrorOccured("Build not found");
      return;
    }
    return save(
      () => updateBuild({ buildId, ...buildBuildProps() }),
      "Build updated successfully"
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.formcontainer}>
        <h2>
          {editMode ? "Edit Build" : "Add Build"}
        </h2>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Version:</span>
          <TextBox onChange={(e) => setBuildVersion(e.target.value)} value={buildVersion} placeholder="Version" />
        </div>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Link:</span>
          <TextBox onChange={(e) => setBuildLink(e.target.value)} value={buildLink} placeholder="Link (optional)" />
        </div>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Clients:</span>
          <div className={buildFormStyles.clientlist}>
            {isLoadingClients && <p>Loading clients...</p>}
            {!isLoadingClients && allClients.length == 0 && <p>No clients</p>}
            {!isLoadingClients && allClients.filter(client => client.id !== null).map(client => (
              <label key={client.id!} className={buildFormStyles.clientlistitem} title={client.description ?? undefined}>
                <input type="checkbox" checked={selectedClientIds.includes(client.id!)} onChange={() => toggleClient(client.id!)} />
                {client.name}
              </label>
            ))}
          </div>
        </div>

        <div className={`${styles.formelementcontainer} ${styles.formbuttoncontainer}`}>
          {!editMode && <LoadingButton cssClass={`${styles.formbutton} ${styles.formokbutton}`} onClick={handleAdd} label='Add' isLoading={isSaving} />}
          {editMode && <LoadingButton cssClass={`${styles.formbutton} ${styles.formokbutton}`} onClick={handleUpdate} label='Save' isLoading={isSaving} />}

          <button className={styles.formbutton} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
