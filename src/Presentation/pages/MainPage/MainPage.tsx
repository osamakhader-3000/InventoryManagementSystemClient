import { Routes, Route, Navigate } from 'react-router';
import MainSidebarMenu from '../../Components/MainSidebarMenu.tsx'
import MainViewHeader from '../../Components/MainViewHeader.tsx';
import styles from './MainPage.module.css'
import { EmailVerifiedRoute } from '../../../modules/Security/ui/routes/EmailVerifiedRoute.tsx';
import { TempAccountRoute } from '../../../modules/Security/ui/routes/TempAccountRoute.tsx';
import EmailUnverifiedMessage from '../../../modules/Security/ui/EmailUnverifiedMessage.tsx';
import Profile from '../User/Profile.tsx';
import Users from '../AdminPages/Users.tsx';
import { TempAccountMessage } from '../../../modules/Security/ui/TempAccountMessage.tsx';
import { AdminAccountRoute } from '../../../modules/Security/ui/routes/AdminAccountRoute.tsx';
import { TechnicalSupportAccountRoute } from '../../../modules/Security/ui/routes/TechnicalSupportAccountRoute.tsx';
import { ForbiddenMessage } from '../../../modules/Security/ui/ForbiddenMessage.tsx';
import AddAssignmentForm from '../../../modules/deviceAssignment/ui/Assignment/AddAssignmentForm.tsx';
import EditAssignmentForm from '../../../modules/deviceAssignment/ui/Assignment/EditAssignmentForm.tsx';
import AddDeviceForm from '../../../modules/deviceAssignment/ui/Device/AddDeviceForm.tsx';
import EditDeviceForm from '../../../modules/deviceAssignment/ui/Device/EditDeviceForm.tsx';
import AddAccessoryForm from '../../../modules/deviceAssignment/ui/Accessory/AddAccessoryForm.tsx';
import EditAccessoryForm from '../../../modules/deviceAssignment/ui/Accessory/EditAccessoryForm.tsx';
import AddDepartmentForm from '../../../modules/deviceAssignment/ui/Department/AddDepartmentForm.tsx';
import EditDepartmentForm from '../../../modules/deviceAssignment/ui/Department/EditDepartmentForm.tsx';
import AddUserForm from '../../../modules/deviceAssignment/ui/User/AddUserForm.tsx';
import EditUserForm from '../../../modules/deviceAssignment/ui/User/EditUserForm.tsx';
import AssignmentsList from '../../../modules/deviceAssignment/ui/Assignment/AssignmentsList.tsx';
import AccessoriesList from '../../../modules/deviceAssignment/ui/Accessory/AccessoriesList.tsx';
import DevicesList from '../../../modules/deviceAssignment/ui/Device/DevicesList.tsx';
import UsersList from '../../../modules/deviceAssignment/ui/User/UsersList.tsx';
import DepartmentsList from '../../../modules/deviceAssignment/ui/Department/DepartmentsList.tsx';


function MainPage() {

  return (
    <div>
      <header>

        <table className={styles.maintable}>
          <tbody>
            <tr>
              <td className={styles.realmsmenucontainer}>
                <MainSidebarMenu />
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
                              <Route path="/" element={<Navigate to="/assignments" replace />} />
                              <Route element={<AdminAccountRoute />}>
                                <Route path="/admin/users" element={<Users />} />
                              </Route>
                              <Route path="/assignments" element={<AssignmentsList />} />
                              <Route path="/addassignment" element={<AddAssignmentForm />} />
                              <Route path="/assignment/:id" element={<EditAssignmentForm />} />
                              <Route path="/adddevice" element={<AddDeviceForm />} />
                              <Route path="/editdevice/:id" element={<EditDeviceForm />} />
                              <Route path="/addaccessory" element={<AddAccessoryForm />} />
                              <Route path="/editaccessory/:id" element={<EditAccessoryForm />} />
                              <Route path="/accessories" element={<AccessoriesList />} />
                              <Route path="/devices" element={<DevicesList />} />
                              <Route path="/departments" element={<DepartmentsList />} />
                              <Route path="/adddepartment" element={<AddDepartmentForm />} />
                              <Route path="/editdepartment/:id" element={<EditDepartmentForm />} />
                              <Route path="/users" element={<UsersList />} />
                              <Route path="/adduser" element={<AddUserForm />} />
                              <Route path="/edituser/:id" element={<EditUserForm />} />
                              <Route element={<TechnicalSupportAccountRoute />}>                             
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
