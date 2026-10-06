import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { hasTechnicalSupportAccess } from "../../domain/User";
import { Navigate, Outlet } from "react-router";

export function TechnicalSupportAccountRoute() {
    const { currentUser } = useContext(AuthContext);
    if (currentUser && !hasTechnicalSupportAccess(currentUser)) {
        return <Navigate to="/forbidden" replace />;
    }
    return <Outlet />;
}