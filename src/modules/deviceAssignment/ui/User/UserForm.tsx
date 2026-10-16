import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../app/DependencyContext';
import UserValidationError from '../../domain/UserValidationError';
import styles from '../../../../shared/ui/SharedCss/Forms.module.css';
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useCreateUser } from '../../application/user/useCreateUser';
import { useUpdateUser } from '../../application/user/useUpdateUser';
import { useListDepartments } from '../../application/department/useListDepartments';
import { useListLocations } from '../../application/location/useListLocations';
import SelectBox from '../../../../shared/ui/GeneralComponents/SelectBox';

interface UserFormProps {
    userId?: string | null;
    name?: string;
    departmentId?: string;
    locationId?: string;
    editMode?: boolean;
}

export default function UserForm({ userId = null, name = "", departmentId = "", locationId = "", editMode = false }: UserFormProps) {
  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState(name);
  const [userDepartment, setUserDepartment] = useState(departmentId);
  const [userLocation, setUserLocation] = useState(locationId);
  const { data: allDepartments, isLoading: isLoadingDepartments } = useListDepartments();
  const { data: allLocations, isLoading: isLoadingLocations } = useListLocations();
  const { createUser, isSaving: isCreating } = useCreateUser();
  const { updateUser, isSaving: isUpdating } = useUpdateUser();
  const isSaving = isCreating || isUpdating;

  // Quick UX checks only; business rules are enforced by the User entity.
  const validateForm = (): boolean => {

    debugger;

    if (userName.trim() === "") {
      errorHandlingBus.ErrorOccured("Please enter a name");
      return false;
    }
    if (userDepartment.trim() === "") {
      errorHandlingBus.ErrorOccured("Please select a department");
      return false;
    }
    if (userLocation.trim() === "") {
      errorHandlingBus.ErrorOccured("Please select a location");
      return false;
    }

    return true;
  };

  const buildUserProps = () => ({
    name: userName,
    departmentId: userDepartment,
    locationId: userLocation,
  });

  const save = async (saveUser: () => Promise<boolean>, successMessage: string) => {
    if (!validateForm()) return;

    try {
      if (await saveUser()) {
        notificationHandlingBus.NotificationOccured(successMessage);
        navigate(-1);
      }
    } catch (error) {
      errorHandlingBus.ErrorOccured(error instanceof UserValidationError ? error.message : "Failed to save user");
    }
  };

  const handleAdd = () => save(
    () => createUser(buildUserProps()),
    "User added successfully"
  );

  const handleUpdate = () => {
    if (userId === null) {
      errorHandlingBus.ErrorOccured("User not found");
      return;
    }
    return save(
      () => updateUser({ userId, ...buildUserProps() }),
      "User updated successfully"
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.formcontainer}>
        <h2>
          {editMode ? "Edit User" : "Add User"}
        </h2>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Name:</span>
          <TextBox onChange={(e) => setUserName(e.target.value)} value={userName} placeholder="Name" />
        </div>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Department:</span>
          
          <SelectBox name="department" className={styles.selectBox} onChange={(e) => setUserDepartment(e.target.value)} value={userDepartment} disabled={isLoadingDepartments}>
            <option value="" disabled>
              {isLoadingDepartments ? "Loading departments..." : "Select a department"}
            </option>
            {allDepartments.map((department) => (
              <option key={department.id ?? department.name} value={department.id ?? ""}>
                {department.name}
              </option>
            ))}
          </SelectBox>        
      </div>

        <div className={`${styles.formelementcontainer} ${styles.formlabeledrow}`}>
          <span className={styles.formlabel}>Location:</span>

          <SelectBox name="location" className={styles.selectBox} onChange={(e) => setUserLocation(e.target.value)} value={userLocation} disabled={isLoadingLocations}>
            <option value="" disabled>
              {isLoadingLocations ? "Loading locations..." : "Select a location"}
            </option>
            {allLocations.map((location) => (
              <option key={location.id ?? location.name} value={location.id ?? ""}>
                {location.name}
              </option>
            ))}
          </SelectBox>
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
