import { useParams } from 'react-router';
import BuildForm from './BuildForm';
import { useGetBuild } from '../../application/build/useGetBuild';
import styles from '../../../../shared/ui/SharedCss/EditForms.module.css';

export default function EditBuildForm() {

  const { id } = useParams();
  const buildId = id ? id : null;
  const { data: build, isLoading } = useGetBuild(buildId);

  if (isLoading)
    return (
      <div className={styles.messagecontainer}>
        <h3>Please wait</h3>
        <h3>Loading your build ...</h3>
      </div>
    );

  return (
    <BuildForm
      editMode={true}
      buildId={build ? buildId : null}
      version={build?.version}
      link={build?.link}
      clientIds={build?.clients.map(c => c.id)}
    />
  );
}
