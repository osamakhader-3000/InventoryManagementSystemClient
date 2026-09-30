import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router";
import { UserAccountStatus } from "../../../Domain/Entities/User";
import styles from '../../GeneralStyles.module.css';

export function TempAccountMessage() {

    const { currentUser } = useContext(AuthContext);
    
    if (currentUser && currentUser.accountStatus == UserAccountStatus.Active) {
        return <Navigate to="/" replace />;
    }
    
    return (
        <div className={styles.container}>
            <h2>Your account is temporary</h2>
            <p>Your account has been created with temporary credentials. Please wait for administrator approval.</p>
        </div>
    );
}