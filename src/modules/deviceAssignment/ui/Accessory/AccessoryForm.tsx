import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../context/DependencyContext';
import AccessoryValidationError from '../../domain/AccessoryValidationError';
import styles from '../../../../shared/ui/SharedCss/Forms.module.css';
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useCreateAccessory } from '../../application/accessory/useCreateAccessory';
import { useUpdateAccessory } from '../../application/accessory/useUpdateAccessory';

interface AccessoryFormProps {
    accessoryId?: number | null;
    name?: string;
    quantity?: number;
    date?: Date | null;
    editMode?: boolean;
}

// <input type="date"> works with "yyyy-mm-dd" strings.
const toDateInputValue = (date: Date | null): string =>
  date ? new Date(date).toISOString().slice(0, 10) : "";

const fromDateInputValue = (value: string): Date | null =>
  value ? new Date(value) : null;

export default function AccessoryForm({ accessoryId = null, name = "", quantity = 0, date = null, editMode = false }: AccessoryFormProps) {
  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [accessoryName, setAccessoryName] = useState(name);
  const [accessoryQuantity, setAccessoryQuantity] = useState(quantity.toString());
  const [accessoryDate, setAccessoryDate] = useState(toDateInputValue(date));
  const { createAccessory, isSaving: isCreating } = useCreateAccessory();
  const { updateAccessory, isSaving: isUpdating } = useUpdateAccessory();
  const isSaving = isCreating || isUpdating;

  // Quick UX checks only; business rules are enforced by the Accessory entity.
  const validateForm = (): boolean => {
    if (accessoryName.trim() === "") {
      errorHandlingBus.ErrorOccured("Please enter a name");
      return false;
    }
    if (accessoryQuantity.trim() === "" || isNaN(Number(accessoryQuantity))) {
      errorHandlingBus.ErrorOccured("Quantity must be a number");
      return false;
    }

    return true;
  };

  const buildAccessoryProps = () => ({
    name: accessoryName,
    quantity: Number(accessoryQuantity),
    date: fromDateInputValue(accessoryDate),
  });

  const save = async (saveAccessory: () => Promise<boolean>, successMessage: string) => {
    if (!validateForm()) return;

    try {
      if (await saveAccessory()) {
        notificationHandlingBus.NotificationOccured(successMessage);
        navigate(-1);
      }
    } catch (error) {
      errorHandlingBus.ErrorOccured(error instanceof AccessoryValidationError ? error.message : "Failed to save accessory");
    }
  };

  const handleAdd = () => save(
    () => createAccessory(buildAccessoryProps()),
    "Accessory added successfully"
  );

  const handleUpdate = () => {
    if (accessoryId === null) {
      errorHandlingBus.ErrorOccured("Accessory not found");
      return;
    }
    return save(
      () => updateAccessory({ accessoryId, ...buildAccessoryProps() }),
      "Accessory updated successfully"
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.formcontainer}>
        <h2>
          {editMode ? "Edit Accessory" : "Add Accessory"}
        </h2>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Name:</span>
          <TextBox onChange={(e) => setAccessoryName(e.target.value)} value={accessoryName} placeholder="Name" />
        </div>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Quantity:</span>
          <TextBox textInputType="number" onChange={(e) => setAccessoryQuantity(e.target.value)} value={accessoryQuantity} placeholder="0" />
        </div>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Date:</span>
          <TextBox textInputType="date" onChange={(e) => setAccessoryDate(e.target.value)} value={accessoryDate} />
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
