import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../context/DependencyContext';
import AssignmentValidationError from '../domain/AssignmentValidationError';
import styles from './AssignmentForm.module.css'
import { MultiLineTextBox } from '../../../shared/ui/GeneralComponents/MultiLineTextBox';
import { LoadingButton } from '../../../shared/ui/GeneralComponents/LoadingButton';
import { useListUsers } from '../application/user/useListUsers';
import { useListAccessories } from '../application/accessory/useListAccessories';
import { useListDevices } from '../application/device/useListDevices';
import { useCreateAssignment } from '../application/assignment/useCreateAssignment';
import { useUpdateAssignment } from '../application/assignment/useUpdateAssignment';
import { OperatingSystem } from '../domain/OperatingSystem';



interface AssignmentFormProps {
  assignmentId?: bigint | null;
  serialNumber?: string | null;
  assignmentRemarks?: string | null;
  assignedUserId?: string | null;
  accessoryIds?: number[];
  editMode?: boolean;
}


export default function AssignmentForm({ assignmentId = null, serialNumber = null, assignmentRemarks = null, assignedUserId = null,accessoryIds = [], editMode: editMode = false }: AssignmentFormProps) {

  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [remarks, setRemarks] = useState(assignmentRemarks ?? "");
  const [selectedUserId, setSelectedUserId] = useState(assignedUserId ?? "");
  const { data: users, isLoading: isLoadingUsers } = useListUsers();
  const { data: allAccessories, isLoading: isLoadingAccessories } = useListAccessories();
  const { data: allDevices, isLoading: isLoadingDevices } = useListDevices();
  const { createAssignment, isSaving: isCreating } = useCreateAssignment();
  const { updateAssignment, isSaving: isUpdating } = useUpdateAssignment();  
  const [selectedOperatingSystem, setSelectedOperatingSystem] = useState("");
  const [specs, setSpecs] = useState("");
  const isSaving = isCreating || isUpdating;
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<number[]>(accessoryIds ?? []);
  const [selectedDeviceSerialNumber, setSelectedDeviceSerialNumber] = useState(serialNumber ?? "");


  useEffect(() => {
    setRemarks(assignmentRemarks ?? "");
    setSelectedUserId(assignedUserId ?? "");
    setSelectedOperatingSystem("");
    setSpecs("");
    setSelectedAccessoryIds(accessoryIds ?? []);
    setSelectedDeviceSerialNumber(serialNumber ?? "");
  }, [serialNumber, assignmentRemarks, assignedUserId, accessoryIds]);


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
  };

  const handleAccessorySelectChange = (id: number) => {
    setSelectedAccessoryIds(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleRemarksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemarks(e.target.value);
  };

  const handleSpecsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpecs(e.target.value);
  };

  const handleOperatingSystemSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOperatingSystem(e.target.value);
  };

  const handleSerialNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceSerialNumber(e.target.value);
  }; 

  // Quick UX checks only; business rules are enforced by the Assignment entity.
  const validateForm = (): boolean => {
    if (selectedUserId === "") {
      errorHandlingBus.ErrorOccured("Please select a user");
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
    () => createAssignment({ assignedUserId: selectedUserId, deviceSerialNumber: selectedDeviceSerialNumber ?? "", remarks: remarks, accessoryIds : selectedAccessoryIds??[] }),
    "Assignment added successfully"
  );

  const handleUpdate = () => {
    if (assignmentId === null) {
      errorHandlingBus.ErrorOccured("Assignment not found");
      return;
    }
    return save(
      () => updateAssignment({ assignmentId, assignedUserId: selectedUserId,deviceSerialNumber: selectedDeviceSerialNumber ?? "", remarks: remarks, accessoryIds: selectedAccessoryIds??[] }),
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
         <select onChange={handleSerialNumberChange} value={serialNumber ?? ""} disabled={isLoadingDevices}>
            <option value="" disabled>
              {isLoadingDevices ? "Loading devices..." : "Select a device"}
            </option>
            {allDevices.filter((device) => device.serialNumber !== null).map((device) => (
              <option key={device.serialNumber!} value={device.serialNumber!}>
                {device.serialNumber}
              </option>
            ))}
          </select>
        </div>

       
        <div className={styles.accessoriesContainer}>
          <h3>Accessories</h3>
          <div className={styles.accessoryList}>
              {isLoadingAccessories && <p>Loading accessories...</p>}
              {!isLoadingAccessories && allAccessories.filter(accessory => accessory.id !== null).map(accessory => (
                  <div key={accessory.id!} className={styles.accessoryListItem}>
                      <input type="checkbox" checked={selectedAccessoryIds.includes(accessory.id!)} onChange={() => handleAccessorySelectChange(accessory.id!)} />
                      <span className={styles.spanBuildVersion} onClick={() => handleAccessorySelectChange(accessory.id!)}>{accessory.name}</span>
                  </div>
              ))}
          </div>
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
          <MultiLineTextBox rows={20} onChange={handleRemarksChange} value={remarks} placeholder="Remarks"></MultiLineTextBox>
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