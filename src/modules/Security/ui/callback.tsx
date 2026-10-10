
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../app/DependencyContext';
import { useContext, useEffect } from 'react';
import styles from '../../../shared/ui/SharedCss/SharedStyles.module.css';

export default function AuthCallback() {
    const navigate = useNavigate();

    const { authService } = useContext(DependencyContext);

    useEffect(() => {

        async function handleMicrosoftLoginCallback() {

            let result = await authService.MicrosoftLoginCallBack();
            if (result)
                navigate("/");

        }

        handleMicrosoftLoginCallback();

    }, []);


    return (
        <div className={styles.container}>
            <h2>Processing authentication...</h2>
            <p>Please wait while we log you in.</p>
        </div>
    );


}
