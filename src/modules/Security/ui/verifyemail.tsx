import { useContext, useEffect } from "react";
import { DependencyContext } from "../../../app/DependencyContext";
import { useNavigate } from "react-router";
import styles from '../../../shared/ui/SharedCss/SharedStyles.module.css';


export function VerifyEmail() {

const { authService, notificationHandlingBus } = useContext(DependencyContext);
const navigate = useNavigate();

    useEffect(() => {
    async function fetchData() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
        if (token) {

            let result = await authService.VerifyEmail(token);
            if (result) {
                notificationHandlingBus.NotificationOccured("Your email has been successfully verified. You can now log in.");
                authService.Logout();
                navigate("/login");
            }
                 
        }
    }
    fetchData();
  }, []);

    return (
        <div className={styles.container}>
            <h2>Please wait while we verify your email...</h2>
        </div>
    );
    
}