import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserRole } from "../../modules/Security/User";
import { Navigate, Outlet } from "react-router";

export function TechnicalSupportAccountRoute() {
    const { currentUser } = useContext(AuthContext);
    if (currentUser && currentUser.userRole !== UserRole.TechnicalSupport && currentUser.userRole !== UserRole.Administrator) {
        return <Navigate to="/forbidden" replace />;
    }
    return <Outlet />;
}