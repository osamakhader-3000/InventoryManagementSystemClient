import { useParams } from 'react-router';
import DepartmentForm from './DepartmentForm';
import { useGetDepartment } from '../../application/department/useGetDepartment';
import styles from '../../../../shared/ui/GeneralCss/EditForms.module.css';

export default function EditDepartmentForm() {

  const { id } = useParams();
  const departmentId = id ? id : null;
  const { data: department, isLoading } = useGetDepartment(departmentId);

  if (isLoading)
    return (
      <div className={styles.messagecontainer}>
        <h3>Please wait</h3>
        <h3>Loading your department ...</h3>
      </div>
    );

  return (
    <DepartmentForm
      editMode={true}
      departmentId={department ? departmentId : null}
      name={department?.name}
    />
  );
}
