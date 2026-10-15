import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../app/DependencyContext';
import DepartmentValidationError from '../../domain/DepartmentValidationError';
import styles from '../../../../shared/ui/SharedCss/Forms.module.css';
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useCreateDepartment } from '../../application/department/useCreateDepartment';
import { useUpdateDepartment } from '../../application/department/useUpdateDepartment';
import { getErrorMessage } from '../../../../shared/infrastructure/messaging/getErrorMessage';

interface DepartmentFormProps {
    departmentId?: string | null;
    name?: string;
    editMode?: boolean;
}

export default function DepartmentForm({ departmentId = null, name = "", editMode = false }: DepartmentFormProps) {
  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [departmentName, setDepartmentName] = useState(name);
  const { createDepartment, isSaving: isCreating } = useCreateDepartment();
  const { updateDepartment, isSaving: isUpdating } = useUpdateDepartment();
  const isSaving = isCreating || isUpdating;

  // Quick UX checks only; business rules are enforced by the Department entity.
  const validateForm = (): boolean => {
    if (departmentName.trim() === "") {
      errorHandlingBus.ErrorOccured("Please enter a name");
      return false;
    }

    return true;
  };

  const buildDepartmentProps = () => ({
    name: departmentName,
  });

  const save = async (saveDepartment: () => Promise<boolean>, successMessage: string) => {
    if (!validateForm()) return;

    try {
      if (await saveDepartment()) {
        notificationHandlingBus.NotificationOccured(successMessage);
        navigate(-1);
      }
    } catch (error) {
      errorHandlingBus.ErrorOccured(getErrorMessage(error,"Failed to save department"));
    }
  };

  const handleAdd = () => save(
    () => createDepartment(buildDepartmentProps()),
    "Department added successfully"
  );

  const handleUpdate = () => {
    if (departmentId === null) {
      errorHandlingBus.ErrorOccured("Department not found");
      return;
    }
    return save(
      () => updateDepartment({ departmentId, ...buildDepartmentProps() }),
      "Department updated successfully"
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.formcontainer}>
        <h2>
          {editMode ? "Edit Department" : "Add Department"}
        </h2>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Name:</span>
          <TextBox onChange={(e) => setDepartmentName(e.target.value)} value={departmentName} placeholder="Name" />
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
