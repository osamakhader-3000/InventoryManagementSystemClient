import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../context/DependencyContext';
import AssignmentValidationError from '../domain/AssignmentValidationError';
import styles from './AssignmentForm.module.css'
import { TextBox } from '../../../shared/ui/GeneralComponents/TextBox';
import { MultiLineTextBox } from '../../../shared/ui/GeneralComponents/MultiLineTextBox';
import { LoadingButton } from '../../../shared/ui/GeneralComponents/LoadingButton';
import { useListUsers } from '../application/user/useListUsers';
import { useListAccessories } from '../application/accessory/useListAccessories';
import { useCreateAssignment } from '../application/assignment/useCreateAssignment';
import { useUpdateAssignment } from '../application/assignment/useUpdateAssignment';
import { OperatingSystem } from '../domain/OperatingSystem';



interface AssignmentFormProps {
  assignmentId?: bigint | null;
  serialNumber?: string | null;
  assignmentDescription?: string | null;
  assignedUserId?: string | null;
  editMode?: boolean;
}


export default function AssignmentForm({ assignmentId = null, serialNumber = null, assignmentDescription = null, assignedUserId = null, editMode: editMode = false }: AssignmentFormProps) {

  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [deviceSerialNumber, setDeviceSerialNumber] = useState(serialNumber ?? "");
  const [remarks, setRemarks] = useState(assignmentDescription ?? "");
  const [selectedUserId, setSelectedUserId] = useState(assignedUserId ?? "");
  const [selectedAccessoryId, setSelectedAccessoryId] = useState("");
  const { data: users, isLoading: isLoadingUsers } = useListUsers();
  const { data: accessories, isLoading: isLoadingAccessories } = useListAccessories();
  const { createAssignment, isSaving: isCreating } = useCreateAssignment();
  const { updateAssignment, isSaving: isUpdating } = useUpdateAssignment();  
  const [selectedOperatingSystem, setSelectedOperatingSystem] = useState("");
  const [specs, setSpecs] = useState("");
  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    setDeviceSerialNumber(serialNumber ?? "");
    setRemarks(assignmentDescription ?? "");
    setSelectedUserId(assignedUserId ?? "");
    setSelectedOperatingSystem("");
    setSpecs("");
  }, [serialNumber, assignmentDescription, assignedUserId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeviceSerialNumber(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
  };

  const handleAccessorySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccessoryId(e.target.value);
  };

  const handleTextAreaInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemarks(e.target.value);
  };

  const handleSpecsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpecs(e.target.value);
  };

  const handleOperatingSystemSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOperatingSystem(e.target.value);
  };

  // Quick UX checks only; business rules are enforced by the Assignment entity.
  const validateForm = (): boolean => {
    if (selectedUserId === "") {
      errorHandlingBus.ErrorOccured("Please select a user");
      return false;
    }
    if (deviceSerialNumber.trim() === "") {
      errorHandlingBus.ErrorOccured("Serial Number cannot be empty");
      return false;
    }
    return true;
  };

  const save = async (saveAssignment: () => Promise<boolean>, successMessage: string) => {
    if (!validateForm()) return;

    try {
      if (await saveAssignment()) {
        notificationHandlingBus.NotificationOccured(successMessage);
        navigate('/assignments');
      }
    } catch (error) {
      errorHandlingBus.ErrorOccured(error instanceof AssignmentValidationError ? error.message : "Failed to save assignment");
    }
  };

  const handleAdd = () => save(
    () => createAssignment({ assignedUserId: selectedUserId, deviceSerialNumber, remarks: remarks }),
    "Assignment added successfully"
  );

  const handleUpdate = () => {
    if (assignmentId === null) {
      errorHandlingBus.ErrorOccured("Assignment not found");
      return;
    }
    return save(
      () => updateAssignment({ assignmentId, assignedUserId: selectedUserId, deviceSerialNumber, remarks: remarks }),
      "Assignment updated successfully"
    );
  };

  const handleCancel = () => {
    navigate('/assignments');

  }



  return (
    <div className={styles.maincontainer}>
      <div className={styles.assignmentformcontainer}>
        <h2>
          {editMode ? "Edit Assignment" : "Add Assignment"}
        </h2>
        <div>
          <select onChange={handleSelectChange} value={selectedUserId} disabled={isLoadingUsers}>
            <option value="" disabled>
              {isLoadingUsers ? "Loading users..." : "Select a user"}
            </option>
            {users.filter((user) => user.id !== null).map((user) => (
              <option key={user.id!} value={user.id!}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.assignmentformelementcontainer}>
          <TextBox onChange={handleInputChange} value={deviceSerialNumber} placeholder="Serial Number"></TextBox>
        </div>

        <div className={styles.assignmentformelementcontainer}>
          <select onChange={handleAccessorySelectChange} value={selectedAccessoryId} disabled={isLoadingAccessories}>
            <option value="" disabled>
              {isLoadingAccessories ? "Loading accessories..." : "Select an accessory"}
            </option>
            {accessories.filter((accessory) => accessory.id !== null).map((accessory) => (
              <option key={accessory.id!} value={accessory.id!}>
                {accessory.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.assignmentformelementcontainer}>
         <select onChange={handleOperatingSystemSelectChange} value={selectedOperatingSystem}>
            <option value="" disabled>Select an operating system</option>
            {Object.values(OperatingSystem).map((os) => (
              <option key={os} value={os}>{os}</option>
            ))}
          </select>
        </div>

        <div className={styles.assignmentformelementcontainer}>
                    <MultiLineTextBox rows={20} onChange={handleSpecsChange} value={specs} placeholder="Specs"></MultiLineTextBox>

        </div>

        <div className={styles.assignmentformelementcontainer}>
          <MultiLineTextBox rows={20} onChange={handleTextAreaInputChange} value={remarks} placeholder="Remarks"></MultiLineTextBox>
        </div>

        <div className={`${styles.assignmentformelementcontainer} ${styles.assignmentformelementbuttoncontainer}`}>

          {!editMode && <LoadingButton cssClass={`${styles.assignmentformbutton} ${styles.assignmentformokbutton}`} onClick={handleAdd} label='Add' isLoading={isSaving} />}
          {editMode && <LoadingButton cssClass={`${styles.assignmentformbutton} ${styles.assignmentformokbutton}`} onClick={handleUpdate} label='Save' isLoading={isSaving} />}

          <button className={styles.assignmentformbutton} onClick={handleCancel}>Cancel</button>
        </div>

      </div>

    </div>
  )

}