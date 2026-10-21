import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../../app/DependencyContext';
import DeviceValidationError from '../../domain/DeviceValidationError';
import OperatingSystem from '../../domain/OperatingSystem';
import { DeviceStatus, deviceStatusOptions, getDeviceStatusLabel } from '../../domain/DeviceStatus';
import styles from './DeviceForm.module.css';
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox';
import { MultiLineTextBox } from '../../../../shared/ui/GeneralComponents/MultiLineTextBox';
import { LoadingButton } from '../../../../shared/ui/GeneralComponents/LoadingButton';
import { useCreateDevice } from '../../application/device/useCreateDevice';
import { useUpdateDevice } from '../../application/device/useUpdateDevice';
import { useListOperatingSystems } from '../../application/operatingSystem/useListOperatingSystems';
import SelectBox from '../../../../shared/ui/GeneralComponents/SelectBox';

interface DeviceFormProps {
    deviceId?: string | null;
    serialNumber?: string | null;
    model?: string;
    operatingSystem?: OperatingSystem | null;
    specs?: string;
    purchasedDate?: Date | null;
    retirementDate?: Date | null;
    price?: number;
    soldPrice?: number;
    status?: DeviceStatus;
    editMode?: boolean;
}

// <input type="date"> works with "yyyy-mm-dd" strings.
const toDateInputValue = (date: Date | null): string =>
  date ? new Date(date).toISOString().slice(0, 10) : "";

const fromDateInputValue = (value: string): Date | null =>
  value ? new Date(value) : null;

export default function DeviceForm({ deviceId = null, serialNumber = null, model = "", operatingSystem = null, specs = "", purchasedDate = null, retirementDate = null, price = 0, soldPrice = 0, status = DeviceStatus.New, editMode = false }: DeviceFormProps) {
  const { notificationHandlingBus, errorHandlingBus } = useContext(DependencyContext);
  const navigate = useNavigate();

  const [deviceSerialNumber, setDeviceSerialNumber] = useState(serialNumber ?? "");
  const [deviceModel, setDeviceModel] = useState(model);
  const [selectedOperatingSystemId, setSelectedOperatingSystemId] = useState(operatingSystem?.id ?? "");
  const { data: operatingSystems } = useListOperatingSystems();
  const [deviceSpecs, setDeviceSpecs] = useState(specs);
  const [devicePurchasedDate, setDevicePurchasedDate] = useState(toDateInputValue(purchasedDate));
  const [deviceRetirementDate, setDeviceRetirementDate] = useState(toDateInputValue(retirementDate));
  const [devicePrice, setDevicePrice] = useState(price.toString());
  // Sold price is set only by selling the device from the devices list.
  const deviceSoldPrice = soldPrice.toString();
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>(status);
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
    if (isNaN(Number(devicePrice))) {
      errorHandlingBus.ErrorOccured("Price must be a number");
      return false;
    }

    return true;
  };

  const buildDeviceProps = () => ({
    serialNumber: deviceSerialNumber,
    model: deviceModel,
    operatingSystem: operatingSystems.find((os) => os.id === selectedOperatingSystemId) ?? null,
    specs: deviceSpecs,
    purchasedDate: fromDateInputValue(devicePurchasedDate),
    retirementDate: fromDateInputValue(deviceRetirementDate),
    price: Number(devicePrice),
    soldPrice: Number(deviceSoldPrice),
    status: deviceStatus,
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
    "Device added to stock successfully"
  );

  const handleUpdate = () => {
    if (deviceId === null) {
      errorHandlingBus.ErrorOccured("Device not found");
      return;
    }
    return save(
      () => updateDevice({ deviceId, ...buildDeviceProps() }),
      "Device updated in stock successfully"
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.deviceformcontainer}>
        <h2>
          {editMode ? "Edit Device In Stock" : "Add Device To Stock"}
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
            <SelectBox name="operatingSystem" className="selectBox" onChange={(e) => setSelectedOperatingSystemId(e.target.value)} value={selectedOperatingSystemId}>
              <option value="" disabled>Select an operating system</option>
              {operatingSystems.map((operatingSystem) => (
                <option key={operatingSystem.id} value={operatingSystem.id ?? ""}>{operatingSystem.name}</option>
              ))}
            </SelectBox>
          </div>
        </div>

        <div className={`${styles.deviceformelementcontainer} ${styles.deviceformlabeledrow}`}>
          <span className={styles.deviceformlabel}>Status:</span>
          <div className="selectBoxContainer">
            <SelectBox name="status" className="selectBox" onChange={(e) => setDeviceStatus(Number(e.target.value) as DeviceStatus)} value={deviceStatus}>
              {deviceStatusOptions.map((deviceStatusOption) => (
                <option key={deviceStatusOption} value={deviceStatusOption}>{getDeviceStatusLabel(deviceStatusOption)}</option>
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
          <TextBox textInputType="number" value={deviceSoldPrice} placeholder="0" readOnly />
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
