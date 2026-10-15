import { useParams } from 'react-router';
import LocationForm from './LocationForm';
import { useGetLocation } from '../../application/location/useGetLocation';
import styles from '../../../../shared/ui/SharedCss/EditForms.module.css';

export default function EditLocationForm() {

  const { id } = useParams();
  const locationId = id ? id : null;
  const { data: location, isLoading } = useGetLocation(locationId);

  if (isLoading)
    return (
      <div className={styles.messagecontainer}>
        <h3>Please wait</h3>
        <h3>Loading your location ...</h3>
      </div>
    );

  return (
    <LocationForm
      editMode={true}
      locationId={location ? locationId : null}
      name={location?.name}
    />
  );
}
