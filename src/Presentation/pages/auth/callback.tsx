
import { useNavigate } from 'react-router';
import { DependencyContext } from '../../../context/DependencyContext';
import { useContext, useEffect } from 'react';
import styles from '../../GeneralStyles.module.css';

export default function AuthCallback() {
    const navigate = useNavigate();

    const { userService: userService } = useContext(DependencyContext);

    useEffect(() => {

        async function handleMicrosoftLoginCallback() {

            let result = await userService.MicrosoftLoginCallBack();
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
