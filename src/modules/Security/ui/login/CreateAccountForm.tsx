import React, { useContext, useEffect, useRef } from "react";
import AuthForm from "./AuthForm";
import { TextBox } from '../../../../shared/ui/GeneralComponents/TextBox'
import styles from './CreateAccountForm.module.css'
import { DependencyContext } from '../../../../app/DependencyContext';
import { ErrorMessageBox } from '../../../../shared/ui/GeneralComponents/ErrorMessageBox';
import { useNavigate } from "react-router";
import { LoadingButton } from "../../../../shared/ui/GeneralComponents/LoadingButton";
import Account from "../../domain/Account";

interface CreateAccountFormProps {
  redirectUrl: string;
}

const CreateAccountForm: React.FC<CreateAccountFormProps> = () => {

  const [invalidEmail, setInvalidEmail] = React.useState(false);
  const [invalidUsername, setInvalidUsername] = React.useState(false);
  const [invalidPassword, setInvalidPassword] = React.useState(false);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [showError, setShowError] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const errorBoxWrapperRef = useRef<HTMLDivElement>(null);
  const { authService } = useContext(DependencyContext);

  const navigate = useNavigate();

  const usernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const usernameUnclick = () => {
    setInvalidUsername(false);
  }

  const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const emailUnclick = () => {
    setInvalidEmail(false);
  }

  const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const passwordUnclick = () => {
    setInvalidPassword(false);
  }


  const createAccount = async () => {

    setInvalidUsername(false);
    setInvalidPassword(false);
    setInvalidEmail(false);

    if (validUsername(username) === false) {
      setInvalidUsername(true);
      setShowError(true);
      return;
    }


    if (email.length === 0 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInvalidEmail(true);
      setShowError(true);
      return;
    }

    if (password.length === 0 || password.length < 8 || password.length > 50) {
      setInvalidPassword(true);
      setShowError(true);
      return;
    }

    let account = new Account(username, email, password);

    setIsLoading(true);

    var success = await authService.CreateAccount(account);

    setIsLoading(false);

    if (success) {
      navigate("/emailverification", { replace: true });
    }

  };

  function validUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9._-]{5,50}$/;
    return usernameRegex.test(username);
  }

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

  return (
    <AuthForm buttonLabel="Create Account" onSubmit={createAccount} linkPrompt="Already have an account?" linkText="Log in" linkHref="/login">
      <div className={styles.container}>
        <div className={styles.thirdOfWidth}></div>
        <div className={`${styles.loginformdiv} ${styles.thirdOfWidth}`}>
          <TextBox onChange={usernameChanged} onBlur={usernameUnclick} value={username} isValid={!invalidUsername} placeholder="Username" name="username" autoComplete="username" />
          <TextBox onChange={emailChanged} onBlur={emailUnclick} value={email} isValid={!invalidEmail} placeholder="Email" name="email" autoComplete="email" />
          <TextBox onChange={passwordChanged} onBlur={passwordUnclick} value={password} isValid={!invalidPassword} placeholder="Password" textInputType="password" name="password" autoComplete="new-password" />
          <span ref={errorBoxWrapperRef} className={styles.buttonWrap}>
            <LoadingButton label="Create Account" onClick={createAccount} cssClass={styles.buttonStyle} isLoading={isLoading} />
            <ErrorMessageBox showError={showError}>
              {invalidEmail && <div>
                <p>Please insert a valid email.</p>
                <p>A valid email must be in the format <em>someone@provider.com</em>.</p>
              </div>}
              {invalidUsername && <div>
                <p>Please insert a valid username.</p>
                <p>A valid Username can only contain letters, numbers, underscores</p>
                <p>and dots, and must be between 5 and 50 characters.</p>
              </div>}
              {invalidPassword && <div>
                <p>Please insert a valid password.</p>
                <p>A valid password must be between 8 and 50 characters.</p>
              </div>}

            </ErrorMessageBox>
          </span>
        </div>
        <div className={`${styles.thirdOfWidth} ${styles.invalidOuterDivStyle}`}>
        </div>
      </div>
    </AuthForm>
  );
};

export default CreateAccountForm;