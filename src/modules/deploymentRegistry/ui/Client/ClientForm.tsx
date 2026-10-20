import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../app/DependencyContext';
import styles from '../../../../shared/ui/SharedCss/Forms.module.css';
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox';
import { MultiLineTextBox } from '../../../../shared/ui/GeneralComponents/MultiLineTextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useCreateClient } from '../../application/client/useCreateClient';
import { useUpdateClient } from '../../application/client/useUpdateClient';
import { getErrorMessage } from '../../../../shared/infrastructure/messaging/getErrorMessage';

interface ClientFormProps {
    clientId?: string | null;
    name?: string;
    description?: string | null;
    editMode?: boolean;
}

export default function ClientForm({ clientId = null, name = "", description = "", editMode = false }: ClientFormProps) {
  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [clientName, setClientName] = useState(name);
  const [clientDescription, setClientDescription] = useState(description ?? "");
  const { createClient, isSaving: isCreating } = useCreateClient();
  const { updateClient, isSaving: isUpdating } = useUpdateClient();
  const isSaving = isCreating || isUpdating;

  // Quick UX checks only; business rules are enforced by the Client entity.
  const validateForm = (): boolean => {
    if (clientName.trim() === "") {
      errorHandlingBus.ErrorOccured("Please enter a name");
      return false;
    }

    return true;
  };

  const buildClientProps = () => ({
    name: clientName,
    description: clientDescription,
  });

  const save = async (saveClient: () => Promise<boolean>, successMessage: string) => {
    if (!validateForm()) return;

    try {
      if (await saveClient()) {
        notificationHandlingBus.NotificationOccured(successMessage);
        navigate(-1);
      }
    } catch (error) {
      errorHandlingBus.ErrorOccured(getErrorMessage(error, "Failed to save client"));
    }
  };

  const handleAdd = () => save(
    () => createClient(buildClientProps()),
    "Client added successfully"
  );

  const handleUpdate = () => {
    if (clientId === null) {
      errorHandlingBus.ErrorOccured("Client not found");
      return;
    }
    return save(
      () => updateClient({ clientId, ...buildClientProps() }),
      "Client updated successfully"
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.formcontainer}>
        <h2>
          {editMode ? "Edit Client" : "Add Client"}
        </h2>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Name:</span>
          <TextBox onChange={(e) => setClientName(e.target.value)} value={clientName} placeholder="Name" />
        </div>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Description:</span>
          <MultiLineTextBox onChange={(e) => setClientDescription(e.target.value)} value={clientDescription} placeholder="Description (optional)" rows={4} />
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
