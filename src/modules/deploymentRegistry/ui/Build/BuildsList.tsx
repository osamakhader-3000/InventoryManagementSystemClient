import { useState, useContext } from 'react';
import { Link } from 'react-router';
import Build from '../../domain/Build';
import styles from './BuildsList.module.css'
import { DependencyContext } from '../../../../app/DependencyContext';
import { ButtonPreloader } from '../../../../shared/ui/GeneralComponents/ButtonPreloader';
import { DeleteConfirmation } from '../../../../shared/ui/GeneralComponents/DeleteConfirmation';
import { EditIconSvg } from '../../../../shared/ui/GeneralComponents/EditIconSvg';
import { DeleteIconSvg } from '../../../../shared/ui/GeneralComponents/DeleteIconSvg';
import { useListBuilds } from '../../application/build/useListBuilds';
import { useDeleteBuild } from '../../application/build/useDeleteBuild';

export default function BuildsList() {

  const { notificationHandlingBus } = useContext(DependencyContext);

  const [versionFilter, setVersionFilter] = useState('');
  const [appliedVersionFilter, setAppliedVersionFilter] = useState('');

  const { data: builds, isLoading, reload } = useListBuilds(appliedVersionFilter);
  const { deleteBuild, deletingIds: deletingBuildIds } = useDeleteBuild();
  const [buildToDelete, setBuildToDelete] = useState<Build | null>(null);

  const hasActiveFilter = versionFilter !== '' || appliedVersionFilter !== '';

  const applyFilters = () => {
    setAppliedVersionFilter(versionFilter.trim());
  }

  const clearFilters = () => {
    setVersionFilter('');
    setAppliedVersionFilter('');
  }

  const deleteBuildConfirmed = async () => {
    const build = buildToDelete;
    setBuildToDelete(null);
    if (!build?.id) return;

    // The backend rejects deleting a build related to clients; its message is shown by the error listener.
    if (await deleteBuild(build.id)) {
      notificationHandlingBus.NotificationOccured("Build deleted successfully");
      reload();
    }
  }

  if (isLoading)
    return (
      <div className={styles.loadingcontainer}>
        <h3>Please wait</h3>
        <h3>Loading builds ...</h3>
      </div>
    )

  return (
    <>
      {buildToDelete &&
        <DeleteConfirmation
          title="Are you sure you want to delete this build?"
          message={buildToDelete.clients.length > 0
            ? `Build ${buildToDelete.version} is related to ${buildToDelete.clients.length} client(s) and cannot be deleted until they are removed from it.`
            : `Build ${buildToDelete.version} will be permanently deleted.`}
          onConfirm={deleteBuildConfirmed}
          onCancel={() => setBuildToDelete(null)} />}

      <div className={styles.maincontainer}>
        <div className={styles.buildpagebuttonspanel}>
          <Link to={'/addbuild'} >
            <button type="button" className={styles.addbuildbuttonclass}>+ Add</button>
          </Link>
        </div>

        <div className={styles.filterspanel}>
          <div className={styles.filterfield}>
            <label htmlFor="versionFilter">Version</label>
            <input id="versionFilter" type="text" placeholder="Search builds" className={styles.filterinput} value={versionFilter}
              onChange={(e) => setVersionFilter(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters()} />
          </div>
          <div className={styles.filterbuttons}>
            <button type="button" className={styles.filterbutton} onClick={applyFilters}>Apply</button>
            <button type="button" className={styles.filterbutton} onClick={clearFilters} disabled={!hasActiveFilter}>Clear</button>
          </div>
        </div>

        <div className={styles.buildspanel}>
          <h5 className={styles.buildstatustitle}>
            Builds
          </h5>

          {builds.length == 0 && <div className={styles.emptycontainer}><h5 className={styles.buildstatustitle}>No builds</h5></div>}

          {builds.length > 0 &&
            <div className={styles.tablewrapper}>
              <table className={styles.buildstable}>
                <thead>
                  <tr>
                    <th>Version</th>
                    <th>Link</th>
                    <th>Clients</th>
                    <th className={styles.actionscolumn}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {builds.map((build: Build, index) => (
                    <tr key={build.id ?? index} className={styles.buildrow}>
                      <td className={styles.namecell}>
                        {build.version}
                      </td>
                      <td className={styles.linkcell}>
                        {build.link ? <a href={build.link} target="_blank" rel="noopener noreferrer">{build.link}</a> : '-'}
                      </td>
                      <td className={styles.relatedcell}>
                        {build.clients.length == 0 ? '-' : build.clients.map(client => (
                          <span key={client.id} className={styles.relatedchip}>{client.name}</span>
                        ))}
                      </td>
                      <td className={styles.actionscolumn}>
                        <div className={styles.buildbuttonspan}>
                          <Link to={`/editbuild/${build.id}`}>
                            <button className={styles.buildlistbuttonclass}>
                              <EditIconSvg />
                            </button>
                          </Link>
                          <button className={styles.buildlistbuttonclass} onClick={() => setBuildToDelete(build)}>
                            {deletingBuildIds.has(build.id!) ? <ButtonPreloader /> : <DeleteIconSvg />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}

        </div>
      </div>
    </>
  );
}
