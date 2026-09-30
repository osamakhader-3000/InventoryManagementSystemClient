import { Routes, Route, Navigate } from 'react-router';
import RealmsMenu from '../../Components/MainSidebarMenu.tsx'
import TasksPage from '../Tasks/TasksPage.tsx';
import MainViewHeader from '../../Components/MainViewHeader.tsx';
import AddTaskForm from '../../Components/AddTaskForm.tsx';
import styles from './MainPage.module.css'
import { EmailVerifiedRoute } from '../../Routes/EmailVerifiedRoute.tsx';
import { TempAccountRoute } from '../../Routes/TempAccountRoute.tsx';
import EmailUnverifiedMessage from '../auth/EmailUnverifiedMessage.tsx';
import Profile from '../User/Profile.tsx';
import Users from '../AdminPages/Users.tsx';
import { TempAccountMessage } from '../auth/TempAccountMessage.tsx';
import { AdminAccountRoute } from '../../Routes/AdminAccountRoute.tsx';
import EditTaskForm from '../../Components/EditTaskForm.tsx';
import AddCubesBuild from '../../Components/CubesBuild/AddCubesBuild.tsx';
import EditCubesBuild from '../../Components/CubesBuild/EditCubesBuild.tsx';
import Builds from '../Builds/Builds.tsx';
import { TechnicalSupportAccountRoute } from '../../Routes/TechnicalSupportAccountRoute.tsx';
import { ForbiddenMessage } from '../auth/ForbiddenMessage.tsx';
import Clients from '../Clients/Clients.tsx';
import EditCubesClient from '../../Components/CubesClient/EditCubesClient.tsx';
import AddCubesClient from '../../Components/CubesClient/AddCubesClient.tsx';
import ViewCubesClient from '../../Components/CubesClient/ViewCubesClient.tsx';
import ViewCubesBuild from '../../Components/CubesBuild/ViewCubesBuild.tsx';

function MainPage() {

  return (
    <div>
      <header>

        <table className={styles.maintable}>
          <tbody>
            <tr>
              <td className={styles.realmsmenucontainer}>
                <RealmsMenu />
              </td>

              <td className={styles.mainlistcell}>
                <table className={styles.mainviewtable}>
                  <tbody>
                    <tr>
                      <td>
                        <MainViewHeader></MainViewHeader>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Routes>
                          <Route path="/emailverification" element={<EmailUnverifiedMessage />} />
                          <Route path="/tempaccount" element={<TempAccountMessage />} />
                          <Route path="/forbidden" element={<ForbiddenMessage />} />
                          <Route path="/myprofile" element={<Profile />} />
                          <Route element={<EmailVerifiedRoute />}>
                            <Route element={<TempAccountRoute />}>
                              <Route path="/" element={<Navigate to="/mytasks" replace />} />
                              <Route path="/mytasks" element={<TasksPage />} />
                              <Route path="/builds" element={<Builds />} />
                              <Route path="/clients" element={<Clients />} />
                              <Route element={<AdminAccountRoute />}>
                                <Route path="/users" element={<Users />} />
                              </Route>
                              <Route path="/addtask" element={<AddTaskForm />} />
                              <Route path="/task/:id" element={<EditTaskForm />} />
                              <Route path="/viewcubesclient/:id" element={<ViewCubesClient />} />
                              <Route path="/viewcubesbuild/:id" element={<ViewCubesBuild />} />
                              <Route element={<TechnicalSupportAccountRoute />}>
                                <Route path="/addcubesbuild" element={<AddCubesBuild />} />
                                <Route path="/editcubesbuild/:id" element={<EditCubesBuild />} />
                                <Route path="/addcubesclient" element={<AddCubesClient />} />
                                <Route path="/editcubesclient/:id" element={<EditCubesClient />} />                                
                              </Route>
                            </Route>
                          </Route>
                        </Routes>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>

            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default MainPage;
