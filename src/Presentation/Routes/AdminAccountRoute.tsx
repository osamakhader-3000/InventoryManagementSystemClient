import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { UserRole } from "../../Domain/Entities/User";

export function AdminAccountRoute() {
    const { currentUser } = useContext(AuthContext);
 

    if (currentUser && currentUser.userRole !== UserRole.Administrator) {
        return <Navigate to="/forbidden" replace />;
    }

    return <Outlet />;
}