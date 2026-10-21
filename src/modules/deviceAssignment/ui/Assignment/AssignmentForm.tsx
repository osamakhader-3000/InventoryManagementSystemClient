import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../app/DependencyContext';
import AssignmentValidationError from '../../domain/AssignmentValidationError';
import styles from './AssignmentForm.module.css'
import { MultiLineTextBox } from '../../../../shared/ui/GeneralComponents/MultiLineTextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useListUsers } from '../../application/user/useListUsers';
import { useListAccessories } from '../../application/accessory/useListAccessories';
import { useListDevices } from '../../application/device/useListDevices';
import { useCreateAssignment } from '../../application/assignment/useCreateAssignment';
import { useUpdateAssignment } from '../../application/assignment/useUpdateAssignment';
import SelectBox from '../../../../shared/ui/GeneralComponents/SelectBox';
import Device from '../../domain/Device';


interface AssignmentFormProps {
  assignmentId?: number | null;
  deviceId?: string | null;
  assignmentRemarks?: string | null;
  assignedUserId?: string | null;
  accessoryIds?: string[];
  editMode?: boolean;
}


export default function AssignmentForm({ assignmentId = null, deviceId = null, assignmentRemarks = null, assignedUserId = null,accessoryIds = [], editMode: editMode = false }: AssignmentFormProps) {

  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [remarks, setRemarks] = useState(assignmentRemarks ?? "");
  const [selectedUserId, setSelectedUserId] = useState(assignedUserId ?? "");
  const { data: users, isLoading: isLoadingUsers } = useListUsers();
  const { data: allAccessories, isLoading: isLoadingAccessories } = useListAccessories();
  const { data: allDevices, isLoading: isLoadingDevices } = useListDevices();
  const { createAssignment, isSaving: isCreating } = useCreateAssignment();
  const { updateAssignment, isSaving: isUpdating } = useUpdateAssignment();  
  const isSaving = isCreating || isUpdating;
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>(accessoryIds ?? []);
  const [selectedDeviceId, setSelectedDeviceId] = useState(deviceId ?? "");


  useEffect(() => {
    setRemarks(assignmentRemarks ?? "");
    setSelectedUserId(assignedUserId ?? "");
    setSelectedAccessoryIds(accessoryIds ?? []);
    setSelectedDeviceId(deviceId ?? "");
  }, []);


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(e.target.value);
  };

  const handleAccessorySelectChange = (id: string) => {
    setSelectedAccessoryIds(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleRemarksChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRemarks(e.target.value);
  };

 

  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(e.target.value);
  };

  // The device already held by this assignment stays selectable.
  const isDeviceUnavailable = (device: Device) => (!!device.isTaken || !!device.isSold) && device.id !== deviceId;

  const getUnavailableLabel = (device: Device) => device.isSold ? " (sold)" : " (assigned)";

  // Quick UX checks only; business rules are enforced by the Assignment entity.
  const validateForm = (): boolean => {
    if (selectedUserId === "") {
      errorHandlingBus.ErrorOccured("Please select a user");
      return false;
    }

    return true;
  };

  const isSelectedDeviceTaken = () =>
    !!allDevices.find(device => device.id === selectedDeviceId)?.isTaken;

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
    () => createAssignment({ assignedUserId: selectedUserId, deviceId: selectedDeviceId, isDeviceTaken: isSelectedDeviceTaken(), remarks: remarks, accessoryIds : selectedAccessoryIds??[] }),
    "Assignment added successfully"
  );

  const handleUpdate = () => {
    if (assignmentId === null) {
      errorHandlingBus.ErrorOccured("Assignment not found");
      return;
    }
    return save(
      () => updateAssignment({ assignmentId, assignedUserId: selectedUserId,deviceId: selectedDeviceId, isDeviceTaken: isSelectedDeviceTaken(), remarks: remarks, accessoryIds: selectedAccessoryIds??[] }),
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
          {editMode ? "Edit Stock Assignment" : "Add Stock Assignment"}
        </h2>
         <div className={`${styles.assignmentformelementcontainer} ${styles.assignmentformlabeledrow}`}>
          <span style={{ width: "20%" }}>Assigned User:</span>
          <SelectBox name="userId" className="selectBox" onChange={handleSelectChange} value={selectedUserId} disabled={isLoadingUsers}>
            <option value="" disabled>
              {isLoadingUsers ? "Loading users..." : "Select a user"}
            </option>
            {users.length > 0 && users.filter((user) => user.id !== null).map((user) => (
              <option key={user.id!} value={user.id!}>
                {user.name}
              </option>
            ))}
          </SelectBox>
        </div>

         <div className={`${styles.assignmentformelementcontainer} ${styles.assignmentformlabeledrow}`}>
          <span style={{ width: "20%" }}>Device:</span>
         <SelectBox name="deviceId" className="selectBox" onChange={handleDeviceChange} value={selectedDeviceId} disabled={isLoadingDevices}>
            <option value="" disabled>
              {isLoadingDevices ? "Loading devices..." : "Select a device"}
            </option>
            {allDevices.filter((device) => device.id !== null).map((device) => (
              <option key={device.id!} value={device.id!} disabled={isDeviceUnavailable(device)}>
                {device.model} - {device.serialNumber}{isDeviceUnavailable(device) ? getUnavailableLabel(device) : ""}
              </option>
            ))}
          </SelectBox>
        </div>

       
        <div className={`${styles.assignmentformelementcontainer} ${styles.assignmentformlabeledrow}`}>
          <span style={{ width: "20%" }}>Accessories</span>
          <div className={styles.accessoryList}>
              {isLoadingAccessories && <p>Loading accessories...</p>}
              {!isLoadingAccessories && allAccessories.filter(accessory => accessory.id !== null).map(accessory => {
                  // Accessories already held by this assignment stay toggleable so they can be released.
                  const isUnavailable = accessory.availableQuantity <= 0 && !accessoryIds.includes(accessory.id!);
                  return (
                    <div key={accessory.id!} className={`${styles.accessoryListItem} ${isUnavailable ? styles.accessoryListItemDisabled : ''}`} title={isUnavailable ? "Out of stock" : undefined}>
                        <input type="checkbox" checked={selectedAccessoryIds.includes(accessory.id!)} disabled={isUnavailable} onChange={() => handleAccessorySelectChange(accessory.id!)} />
                        <span className={styles.spanBuildVersion} onClick={() => !isUnavailable && handleAccessorySelectChange(accessory.id!)}>
                          {accessory.name}
                        </span>
                    </div>
                  );
              })}
          </div>
        </div>


        <div className={`${styles.assignmentformelementcontainer} ${styles.assignmentformlabeledrow}`}>
          <span style={{ width: "20%" }}>Remarks:</span>
          <MultiLineTextBox rows={20} onChange={handleRemarksChange} value={remarks} placeholder="Remarks and general notes"></MultiLineTextBox>
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