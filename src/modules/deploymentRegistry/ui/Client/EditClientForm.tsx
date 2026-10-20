import { useParams } from 'react-router';
import ClientForm from './ClientForm';
import { useGetClient } from '../../application/client/useGetClient';
import styles from '../../../../shared/ui/SharedCss/EditForms.module.css';

export default function EditClientForm() {

  const { id } = useParams();
  const clientId = id ? id : null;
  const { data: client, isLoading } = useGetClient(clientId);

  if (isLoading)
    return (
      <div className={styles.messagecontainer}>
        <h3>Please wait</h3>
        <h3>Loading your client ...</h3>
      </div>
    );

  return (
    <ClientForm
      editMode={true}
      clientId={client ? clientId : null}
      name={client?.name}
      description={client?.description}
    />
  );
}
