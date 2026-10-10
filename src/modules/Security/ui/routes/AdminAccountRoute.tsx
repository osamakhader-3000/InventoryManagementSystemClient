import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { isAdministrator } from "../../domain/User";

export function AdminAccountRoute() {
    const { currentUser } = useContext(AuthContext);
 

    if (currentUser && !isAdministrator(currentUser)) {
        return <Navigate to="/forbidden" replace />;
    }

    return <Outlet />;
}