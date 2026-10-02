import { useContext, useEffect, useRef, useState } from "react";
import { DependencyContext } from "../../../context/DependencyContext";
import style from './CssStyles/Profile.module.css'
import { TextBox } from '../../../shared/ui/GeneralComponents/TextBox.tsx'
import { ErrorMessageBox } from '../../../shared/ui/GeneralComponents/ErrorMessageBox.tsx';
import { LoadingButton } from '../../../shared/ui/GeneralComponents/LoadingButton.tsx'

export default function Profile() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [invalidConfirmNewPassword, setInvalidConfirmNewPassword] = useState(false);
    const [duplicatePasswordError, setDuplicatePasswordError] = useState(false);
    const [invalidNewPasswordError, setInvalidNewPasswordError] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isPasswordChanging, setIsPasswordChanging] = useState(false);
    const [loading, setLoading] = useState(true);

    const errorBoxWrapperRef = useRef<HTMLDivElement>(null);
    const { userService: userService, notificationHandlingBus } = useContext(DependencyContext);
    const [user, setUser] = useState({
        id: '',
        username: '',
        email: '',
        userRole: 1,
        localAccount: true
    });

    useEffect(() => {

        async function fetchUser() {
            let result = await userService.GetCurrentUserProfile();
            if (result) {
                setUser({
                    id: result.id ?? '',
                    username: result.username ?? '',
                    email: result.email,
                    userRole: result.userRole,
                    localAccount: result.localAccount

                });
            }
            setLoading(false);
        }

        fetchUser();

    }, []);


    useEffect(() => {
        if (!showError) return;

        const onPointerDown = (e: Event) => {
            const target = e.target as Node;

            if (errorBoxWrapperRef.current?.contains(target)) return;

            setShowError(false);
        };

        document.addEventListener("click", onPointerDown, true);
        return () => document.removeEventListener("click", onPointerDown, true);
    }, [showError]);


    const oldPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(event.target.value);
    }

    const newPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
    }

    const confirmNewPasswordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmNewPassword(event.target.value);
        setInvalidConfirmNewPassword(false);
    }


    async function changePassword() {

        setShowError(false);
        setDuplicatePasswordError(false);
        setInvalidNewPasswordError(false);
        setInvalidConfirmNewPassword(false);

        if (newPassword.length === 0 || newPassword.length < 8 || newPassword.length > 50) {
            setInvalidNewPasswordError(true);
            setShowError(true);
            return;
        }

        if (oldPassword == newPassword) {
            setDuplicatePasswordError(true);
            setShowError(true);
            return;
        }

        if (confirmNewPassword != newPassword) {
            setInvalidConfirmNewPassword(true);
            setShowError(true);
            return;
        }

        setIsPasswordChanging(true);

        let result = await userService.ChangePassword(oldPassword, newPassword);

        setIsPasswordChanging(false);

        if (result)
            notificationHandlingBus.NotificationOccured("Password changed successfully.");

    }



    if (loading) return (
        <div >
            <p>Please wait...</p>
        </div>
    );

    return (

        <div>
            <div>
                <h2>My Profile</h2>
            </div>
            <div className={style.info}>
                <div className={style.row}><div className={style.label}>Username:</div> <div className={style.value}>{user.username}</div></div>
                <div className={style.lastrow}><div className={style.label}>Email:</div> <div className={style.value}>{user.email}</div></div>
            </div>


            {user.localAccount &&
                <div className={style.passwordChangeSection}>
                    <h2>Change Password</h2>
                    <div className={style.passwordChangeContainer}>
                        <div className={style.column}>
                            <TextBox placeholder="Old Password" value={oldPassword} onChange={oldPasswordChanged} isValid={true} />
                            <TextBox placeholder="New Password" value={newPassword} onChange={newPasswordChanged} isValid={!invalidNewPasswordError && !duplicatePasswordError} onUnClick={() => { setInvalidNewPasswordError(false); setDuplicatePasswordError(false) }} />
                            <TextBox placeholder="Confirm New Password" value={confirmNewPassword} onChange={confirmNewPasswordChanged} isValid={!invalidConfirmNewPassword} onUnClick={() => { setInvalidConfirmNewPassword(false); }} />

                        </div>
                        <br />
                        <br />
                        <span ref={errorBoxWrapperRef}>
                            <LoadingButton label="Change Password" onClick={changePassword} cssClass={style.ButtonStyle} isLoading={isPasswordChanging} />
                            <ErrorMessageBox showError={showError}>
                                {invalidNewPasswordError && <div>
                                    <p>Please insert a valid password.</p>
                                    <p>A valid password must be between 8 and 50 characters.</p>
                                </div>}
                                {duplicatePasswordError && <div>
                                    <p>The new password cannot be the same as the old password.</p>
                                </div>}
                                {invalidConfirmNewPassword && <div>
                                    <p>The confirmed password does not match the new password.</p>
                                </div>}

                            </ErrorMessageBox>
                        </span>
                    </div>
                </div>

            }
        </div>
    );
}