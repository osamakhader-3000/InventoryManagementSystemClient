import { useEffect, useContext, useState } from "react";
import { DependencyContext } from '../../../../app/DependencyContext'
import { User, UserAccountStatus, UserEmailVerificationStatus } from "../../domain/User";
import style from './Users.module.css'

export default function Users() {

    const { userService, notificationHandlingBus } = useContext(DependencyContext);
    const [users, setUsers] = useState<User[]>([]);


    async function fetchUsers() {

        let users = await userService.ListUsers();
        setUsers(users);
    }

    useEffect(() => {
        fetchUsers();
    }, []);


    async function suspendUser(userId: string | null) {

        if (userId == null)
            return;

        let result = await userService.SuspendUser(userId);

        if (result) {
            notificationHandlingBus.NotificationOccured("User suspended");
            fetchUsers();
        }
    }


    async function activateUser(userId: string | null) {

        if (userId == null)
            return;
        let result = await userService.ActivateUser(userId);

        if (result) {
            notificationHandlingBus.NotificationOccured("User activated");
            fetchUsers();
        }
    }


    function getAccountStatusString(status: UserAccountStatus): string {

        switch (status) {
            case UserAccountStatus.Active:
                return "Active";
            case UserAccountStatus.Suspended:
                return "Suspended";
            case UserAccountStatus.Temporary:
                return "Temporary";
            case UserAccountStatus.Deleted:
                return "Deleted";
            default:
                return "Unknown";
        }
    }

    async function roleChanged(event: React.ChangeEvent<HTMLSelectElement>, userId: string | null) {

        if (userId == null)
            return;
        let newRole = event.target.value as unknown as number;

        let result = await userService.ChangeUserRole(userId, newRole);
        if (result) {
            notificationHandlingBus.NotificationOccured("User role changed");
            fetchUsers();
        }
    }


    return (

        <>
            <h2 className={style.mainTitle}>All Users</h2>
            <div className={style.info}>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Account Status</th>
                            <th>Email Status</th>
                            <th>User Role</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{getAccountStatusString(user.accountStatus)}</td>
                                <td>{user.emailVerificationStatus === UserEmailVerificationStatus.Verified ? "Verified" : "Not Verified"}</td>
                                <td>
                                    {user.userRole == 3 && "Admin"}
                                    {user.userRole != 3 &&
                                        <select value={user.userRole} onChange={(event) => roleChanged(event, user.id)}>
                                            <option value="1">Employee</option>
                                            <option value="2">Technical Support</option>
                                        </select>}
                                </td>
                                <td><button disabled={user.accountStatus === UserAccountStatus.Active} onClick={() => activateUser(user.id)}>Activate</button></td>
                                <td><button disabled={user.accountStatus === UserAccountStatus.Suspended} onClick={() => suspendUser(user.id)}>Suspend</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );


}