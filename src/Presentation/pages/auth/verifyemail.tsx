import { useContext, useEffect } from "react";
import { DependencyContext } from "../../../context/DependencyContext";
import { useNavigate } from "react-router";
import styles from '../../GeneralStyles.module.css';


export function VerifyEmail() {

const { userService: userService, notificationHandlingBus: notificationHandlingBus } = useContext(DependencyContext);
const navigate = useNavigate();

    useEffect(() => {
    async function fetchData() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
        if (token) {

            let result = await userService.VerifyEmail(token);
            if (result) {
                notificationHandlingBus.NotificationOccured("Your email has been successfully verified. You can now log in.");
                userService.Logout();
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