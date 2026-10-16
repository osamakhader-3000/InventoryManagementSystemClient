import { useParams } from 'react-router';
import UserForm from './UserForm';
import { useGetUser } from '../../application/user/useGetUser';
import styles from '../../../../shared/ui/SharedCss/EditForms.module.css';

const EMPTY_GUID = "00000000-0000-0000-0000-000000000000";

// The API returns an empty GUID when nothing is assigned; treat it as "not selected"
// so the select shows its placeholder instead of silently displaying the first option.
const selectedId = (id: string | null | undefined) => (id && id !== EMPTY_GUID ? id : "");

export default function EditUserForm() {

  const { id } = useParams();
  const userId = id ?? null;
  const { data: user, isLoading } = useGetUser(userId);

  if (isLoading)
    return (
      <div className={styles.messagecontainer}>
        <h3>Please wait</h3>
        <h3>Loading your user ...</h3>
      </div>
    );

  return (
    <UserForm
      editMode={true}
      userId={user ? userId : null}
      name={user?.name}
      departmentId={selectedId(user?.department?.id)}
      locationId={selectedId(user?.location?.id)}
    />
  );
}
