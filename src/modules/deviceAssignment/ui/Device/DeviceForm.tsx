import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../context/DependencyContext';
import DeviceValidationError from '../../domain/DeviceValidationError';
import { OperatingSystem } from '../../domain/OperatingSystem';
import styles from './DeviceForm.module.css';
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox';
import { MultiLineTextBox } from '../../../../shared/ui/GeneralComponents/MultiLineTextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useCreateDevice } from '../../application/device/useCreateDevice';
import { useUpdateDevice } from '../../application/device/useUpdateDevice';
import SelectBox from '../../../../shared/ui/GeneralComponents/SelectBox';

interface DeviceFormProps {
    deviceId?: string | null;
    serialNumber?: string | null;
    model?: string;
    os?: string;
    specs?: string;
    purchasedDate?: Date | null;
    retirementDate?: Date | null;
    price?: number;
    soldPrice?: number;
    editMode?: boolean;
}

// <input type="date"> works with "yyyy-mm-dd" strings.
const toDateInputValue = (date: Date | null): string =>
  date ? new Date(date).toISOString().slice(0, 10) : "";

const fromDateInputValue = (value: string): Date | null =>
  value ? new Date(value) : null;

export default function DeviceForm({ deviceId = null, serialNumber = null, model = "", os = "", specs = "", purchasedDate = null, retirementDate = null, price = 0, soldPrice = 0, editMode = false }: DeviceFormProps) {
  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [deviceSerialNumber, setDeviceSerialNumber] = useState(serialNumber ?? "");
  const [deviceModel, setDeviceModel] = useState(model);
  const [selectedOperatingSystem, setSelectedOperatingSystem] = useState(os);
  const [deviceSpecs, setDeviceSpecs] = useState(specs);
  const [devicePurchasedDate, setDevicePurchasedDate] = useState(toDateInputValue(purchasedDate));
  const [deviceRetirementDate, setDeviceRetirementDate] = useState(toDateInputValue(retirementDate));
  const [devicePrice, setDevicePrice] = useState(price.toString());
  const [deviceSoldPrice, setDeviceSoldPrice] = useState(soldPrice.toString());
  const { createDevice, isSaving: isCreating } = useCreateDevice();
  const { updateDevice, isSaving: isUpdating } = useUpdateDevice();
  const isSaving = isCreating || isUpdating;

  // Quick UX checks only; business rules are enforced by the Device entity.
  const validateForm = (): boolean => {
    if (deviceSerialNumber.trim() === "") {
      errorHandlingBus.ErrorOccured("Please enter a serial number");
      return false;
    }
    if (deviceModel.trim() === "") {
      errorHandlingBus.ErrorOccured("Please enter a model");
      return false;
    }
    if (isNaN(Number(devicePrice)) || isNaN(Number(deviceSoldPrice))) {
      errorHandlingBus.ErrorOccured("Prices must be numbers");
      return false;
    }

    return true;
  };

  const buildDeviceProps = () => ({
    serialNumber: deviceSerialNumber,
    model: deviceModel,
    os: selectedOperatingSystem,
    specs: deviceSpecs,
    purchasedDate: fromDateInputValue(devicePurchasedDate),
    retirementDate: fromDateInputValue(deviceRetirementDate),
    price: Number(devicePrice),
    soldPrice: Number(deviceSoldPrice),
  });

  const save = async (saveDevice: () => Promise<boolean>, successMessage: string) => {
    if (!validateForm()) return;

    try {
      if (await saveDevice()) {
        notificationHandlingBus.NotificationOccured(successMessage);
        navigate(-1);
      }
    } catch (error) {
      errorHandlingBus.ErrorOccured(error instanceof DeviceValidationError ? error.message : "Failed to save device");
    }
  };

  const handleAdd = () => save(
    () => createDevice(buildDeviceProps()),
    "Device added successfully"
  );

  const handleUpdate = () => {
    if (deviceId === null) {
      errorHandlingBus.ErrorOccured("Device not found");
      return;
    }
    return save(
      () => updateDevice({ deviceId, ...buildDeviceProps() }),
      "Device updated successfully"
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.deviceformcontainer}>
        <h2>
          {editMode ? "Edit Device" : "Add Device"}
        </h2>

        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformlabeledrow}`}>
          <span className={styles.deviceformlabel}>Serial Number:</span>
          <TextBox onChange={(e) => setDeviceSerialNumber(e.target.value)} value={deviceSerialNumber} placeholder="Serial number" />
        </div>

        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformlabeledrow}`}>
          <span className={styles.deviceformlabel}>Model:</span>
          <TextBox onChange={(e) => setDeviceModel(e.target.value)} value={deviceModel} placeholder="Model" />
        </div>

        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformlabeledrow}`}>
          <span className={styles.deviceformlabel}>Specs:</span>
          <MultiLineTextBox rows={10} onChange={(e) => setDeviceSpecs(e.target.value)} value={deviceSpecs} placeholder="Specifications" />
        </div>
      
        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformlabeledrow}`}>
          <span className={styles.deviceformlabel}>Operating System:</span>
          <div className="selectBoxContainer">
            <SelectBox name="operatingSystem" className="selectBox" onChange={(e) => setSelectedOperatingSystem(e.target.value)} value={selectedOperatingSystem}>
              <option value="" disabled>Select an operating system</option>
              {Object.values(OperatingSystem).map((operatingSystem) => (
                <option key={operatingSystem} value={operatingSystem}>{operatingSystem}</option>
              ))}
            </SelectBox>
          </div>
        </div>

        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformlabeledrow}`}>
          <span className={styles.deviceformlabel}>Purchased Date:</span>
          <TextBox textInputType="date" onChange={(e) => setDevicePurchasedDate(e.target.value)} value={devicePurchasedDate} />
        </div>

        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformlabeledrow}`}>
          <span className={styles.deviceformlabel}>Retirement Date:</span>
          <TextBox textInputType="date" onChange={(e) => setDeviceRetirementDate(e.target.value)} value={deviceRetirementDate} />
        </div>

        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformlabeledrow}`}>
          <span className={styles.deviceformlabel}>Price:</span>
          <TextBox textInputType="number" onChange={(e) => setDevicePrice(e.target.value)} value={devicePrice} placeholder="0" />
        </div>

        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformlabeledrow}`}>
          <span className={styles.deviceformlabel}>Sold Price:</span>
          <TextBox textInputType="number" onChange={(e) => setDeviceSoldPrice(e.target.value)} value={deviceSoldPrice} placeholder="0" />
        </div>

      

        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformbuttoncontainer}`}>
          {!editMode && <LoadingButton cssClass={`${styles.deviceformbutton} ${styles.deviceformokbutton}`} onClick={handleAdd} label='Add' isLoading={isSaving} />}
          {editMode && <LoadingButton cssClass={`${styles.deviceformbutton} ${styles.deviceformokbutton}`} onClick={handleUpdate} label='Save' isLoading={isSaving} />}

          <button className={styles.deviceformbutton} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
