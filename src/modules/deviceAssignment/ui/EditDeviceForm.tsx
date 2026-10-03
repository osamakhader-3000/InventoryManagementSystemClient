import { useParams } from 'react-router';
import DeviceForm from './DeviceForm';
import { useGetDevice } from '../application/device/useGetDevice';
import styles from './EditDeviceForm.module.css';

export default function EditDeviceForm() {

  const { id } = useParams();
  const deviceId = id ?? null;
  const { data: device, isLoading } = useGetDevice(deviceId);

  if (isLoading)
    return (
      <div className={styles.messagecontainer}>
        <h3>Please wait</h3>
        <h3>Loading your device ...</h3>
      </div>
    );

  return (
    <DeviceForm
      editMode={true}
      deviceId={device ? deviceId : null}
      serialNumber={device?.serialNumber ?? null}
      model={device?.model}
      os={device?.os}
      specs={device?.specs}
      purchasedDate={device?.purchasedDate ?? null}
      retirementDate={device?.retirementDate ?? null}
      price={device?.price}
      soldPrice={device?.soldPrice}
    />
  );
}
