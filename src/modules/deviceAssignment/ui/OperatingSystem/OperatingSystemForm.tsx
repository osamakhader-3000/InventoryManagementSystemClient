import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../app/DependencyContext';
import OperatingSystemValidationError from '../../domain/OperatingSystemValidationError';
import styles from '../../../../shared/ui/SharedCss/Forms.module.css';
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useCreateOperatingSystem } from '../../application/operatingSystem/useCreateOperatingSystem';
import { useUpdateOperatingSystem } from '../../application/operatingSystem/useUpdateOperatingSystem';

interface OperatingSystemFormProps {
    operatingSystemId?: string | null;
    name?: string;
    editMode?: boolean;
}

export default function OperatingSystemForm({ operatingSystemId = null, name = "", editMode = false }: OperatingSystemFormProps) {
  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [operatingSystemName, setOperatingSystemName] = useState(name);
  const { createOperatingSystem, isSaving: isCreating } = useCreateOperatingSystem();
  const { updateOperatingSystem, isSaving: isUpdating } = useUpdateOperatingSystem();
  const isSaving = isCreating || isUpdating;

  // Quick UX checks only; business rules are enforced by the OperatingSystem entity.
  const validateForm = (): boolean => {
    if (operatingSystemName.trim() === "") {
      errorHandlingBus.ErrorOccured("Please enter a name");
      return false;
    }

    return true;
  };

  const buildOperatingSystemProps = () => ({
    name: operatingSystemName,
  });

  const save = async (saveOperatingSystem: () => Promise<boolean>, successMessage: string) => {
    if (!validateForm()) return;

    try {
      if (await saveOperatingSystem()) {
        notificationHandlingBus.NotificationOccured(successMessage);
        navigate(-1);
      }
    } catch (error) {
      errorHandlingBus.ErrorOccured(error instanceof OperatingSystemValidationError ? error.message : "Failed to save operating system");
    }
  };

  const handleAdd = () => save(
    () => createOperatingSystem(buildOperatingSystemProps()),
    "Operating system added successfully"
  );

  const handleUpdate = () => {
    if (operatingSystemId === null) {
      errorHandlingBus.ErrorOccured("Operating system not found");
      return;
    }
    return save(
      () => updateOperatingSystem({ operatingSystemId, ...buildOperatingSystemProps() }),
      "Operating system updated successfully"
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.formcontainer}>
        <h2>
          {editMode ? "Edit Operating System" : "Add Operating System"}
        </h2>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Name:</span>
          <TextBox onChange={(e) => setOperatingSystemName(e.target.value)} value={operatingSystemName} placeholder="Name" />
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
