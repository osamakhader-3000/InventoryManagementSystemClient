import { useParams } from 'react-router';
import OperatingSystemForm from './OperatingSystemForm';
import { useGetOperatingSystem } from '../../application/operatingSystem/useGetOperatingSystem';
import styles from '../../../../shared/ui/SharedCss/EditForms.module.css';

export default function EditOperatingSystemForm() {

  const { id } = useParams();
  const operatingSystemId = id ? id : null;
  const { data: operatingSystem, isLoading } = useGetOperatingSystem(operatingSystemId);

  if (isLoading)
    return (
      <div className={styles.messagecontainer}>
        <h3>Please wait</h3>
        <h3>Loading your operating system ...</h3>
      </div>
    );

  return (
    <OperatingSystemForm
      editMode={true}
      operatingSystemId={operatingSystem ? operatingSystemId : null}
      name={operatingSystem?.name}
    />
  );
}
