import { useContext } from "react";
import { UserAccountStatus } from "../../Domain/Entities/User";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router";

export function TempAccountRoute() {
    const { currentUser } = useContext(AuthContext);
    if (currentUser && currentUser.accountStatus != UserAccountStatus.Active) {
        return <Navigate to="/tempaccount" replace />;
    }
    return <Outlet />;
}