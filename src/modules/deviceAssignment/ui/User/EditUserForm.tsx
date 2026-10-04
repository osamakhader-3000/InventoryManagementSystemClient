import { useParams } from 'react-router';
import UserForm from './UserForm';
import { useGetUser } from '../../application/user/useGetUser';
import styles from '../../../../shared/ui/GeneralCss/EditForms.module.css';

export default function EditUserForm() {

  const { id } = useParams();
  // GetUser takes a bigint, so only pass ids that BigInt() can parse.
  const userId = id && /^\d+$/.test(id) ? id : null;
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
      departmentName={user?.department?.name}
    />
  );
}
