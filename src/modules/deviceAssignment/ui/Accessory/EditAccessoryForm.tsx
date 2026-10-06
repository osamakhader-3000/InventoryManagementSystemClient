import { useParams } from 'react-router';
import AccessoryForm from './AccessoryForm';
import { useGetAccessory } from '../../application/accessory/useGetAccessory';
import styles from '../../../../shared/ui/SharedCss/EditForms.module.css';

export default function EditAccessoryForm() {

  const { id } = useParams();
  const parsedId = Number(id);
  const accessoryId = id && Number.isInteger(parsedId) ? parsedId : null;
  const { data: accessory, isLoading } = useGetAccessory(accessoryId);

  if (isLoading)
    return (
      <div className={styles.messagecontainer}>
        <h3>Please wait</h3>
        <h3>Loading your accessory ...</h3>
      </div>
    );

  return (
    <AccessoryForm
      editMode={true}
      accessoryId={accessory ? accessoryId : null}
      name={accessory?.name}
      quantity={accessory?.quantity}
      date={accessory?.date ?? null}
    />
  );
}
