import styles from '../../../shared/ui/SharedCss/SharedStyles.module.css';
import { Navigate } from 'react-router';
import { AuthContext } from './AuthContext';
import { useContext, useState } from 'react';
import { UserEmailVerificationStatus } from '../domain/User.ts';
import { DependencyContext } from '../../../app/DependencyContext';
import { LoadingButton } from "../../../shared/ui/GeneralComponents/LoadingButton.tsx"



export default function EmailUnverifiedMessage() {

    const { currentUser } = useContext(AuthContext);
    const { authService, notificationHandlingBus } = useContext(DependencyContext);

    const [sent, setSent] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    async function resendVerificationEmail() {

        setIsLoading(true);

        let result = await authService.ResendVerificationEmail();

        setIsLoading(false);

        if (result) {
            notificationHandlingBus.NotificationOccured("Verification email has been resent.");
            setSent(true);
        }
        else
            setSent(false);
    }


    if (currentUser && currentUser.emailVerificationStatus == UserEmailVerificationStatus.Verified) {
        return <Navigate to="/" replace />;
    }

    return (

        <div className={styles.container}>
            <div>
                <h2>Email Verification</h2>
                <p>Please check your email for a verification link to complete your registration.</p>
            </div>
            <div>
                <p>If you didn't receive the email, please check your spam folder or click the button below to resend the verification email.</p>
                <LoadingButton label='Resend Verification Email' onClick={resendVerificationEmail} cssClass={sent? styles.disablebutton: ''} isLoading={isLoading} />
            </div>
        </div>
    );
}