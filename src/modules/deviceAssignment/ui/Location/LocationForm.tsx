import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../app/DependencyContext';
import LocationValidationError from '../../domain/LocationValidationError';
import styles from '../../../../shared/ui/SharedCss/Forms.module.css';
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useCreateLocation } from '../../application/location/useCreateLocation';
import { useUpdateLocation } from '../../application/location/useUpdateLocation';

interface LocationFormProps {
    locationId?: string | null;
    name?: string;
    editMode?: boolean;
}

export default function LocationForm({ locationId = null, name = "", editMode = false }: LocationFormProps) {
  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [locationName, setLocationName] = useState(name);
  const { createLocation, isSaving: isCreating } = useCreateLocation();
  const { updateLocation, isSaving: isUpdating } = useUpdateLocation();
  const isSaving = isCreating || isUpdating;

  // Quick UX checks only; business rules are enforced by the Location entity.
  const validateForm = (): boolean => {
    if (locationName.trim() === "") {
      errorHandlingBus.ErrorOccured("Please enter a name");
      return false;
    }

    return true;
  };

  const buildLocationProps = () => ({
    name: locationName,
  });

  const save = async (saveLocation: () => Promise<boolean>, successMessage: string) => {
    if (!validateForm()) return;

    try {
      if (await saveLocation()) {
        notificationHandlingBus.NotificationOccured(successMessage);
        navigate(-1);
      }
    } catch (error) {
      errorHandlingBus.ErrorOccured(error instanceof LocationValidationError ? error.message : "Failed to save location");
    }
  };

  const handleAdd = () => save(
    () => createLocation(buildLocationProps()),
    "Location added successfully"
  );

  const handleUpdate = () => {
    if (locationId === null) {
      errorHandlingBus.ErrorOccured("Location not found");
      return;
    }
    return save(
      () => updateLocation({ locationId, ...buildLocationProps() }),
      "Location updated successfully"
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.formcontainer}>
        <h2>
          {editMode ? "Edit Location" : "Add Location"}
        </h2>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Name:</span>
          <TextBox onChange={(e) => setLocationName(e.target.value)} value={locationName} placeholder="Name" />
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
