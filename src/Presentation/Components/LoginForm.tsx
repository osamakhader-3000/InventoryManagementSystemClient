import React, { useContext,useState,useEffect, useRef } from "react";
import AuthForm from "./AuthForm";
import styles from './LoginForm.module.css'
import { DependencyContext } from '../../context/DependencyContext';
import { ErrorMessageBox } from '../../shared/ui/GeneralComponents/ErrorMessageBox';
import {TextBox} from '../../shared/ui/GeneralComponents/TextBox' 
import { useNavigate } from "react-router";
import { User } from "../../modules/Security/User";
import { LoadingButton } from "../../shared/ui/GeneralComponents/LoadingButton";


interface LoginFormProps {
  redirectUrl: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectUrl }) => {

  const navigate = useNavigate();
  const {userService: userService} = useContext(DependencyContext);

  const [err,setErr] = useState<string|undefined>(undefined);
  const [showError,setShowError] = useState(false);
  const [invalidUsername,setInvalidUsername] = useState(false);
  const [username,setUsername] = useState('');
  const [invalidPassword,setInvalidPassword] = useState(false);
  const [password,setPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const errorBoxWrapperRef = useRef<HTMLDivElement>(null);
  const loginButtonWrapperRef = useRef<HTMLDivElement>(null);


  const usernameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setInvalidUsername(false);
  }



  const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }


  const login = async () => {
       
    setInvalidUsername(false);
    setInvalidPassword(false);

    setShowError(false);

    if(username.length === 0)
    {
      setInvalidUsername(true);      
      setErr("Please insert your username");
      setShowError(true);
      return;
    }

    if(password.length === 0)
    {
      setInvalidPassword(true);
      setErr("Please insert your password");
      setShowError(true);
      return;
    }

    let user = new User('', username, '', password);
      
    setIsLoading(true);

    let loginSuccess = await userService.LoginAccount(user);
    
    setIsLoading(false);

    if(loginSuccess)
      navigate(redirectUrl, { replace: true });

  };

  useEffect(() => {
    if (!showError) return;

    const onPointerDown = (e:Event) => {
      const target = e.target as Node;

      if (errorBoxWrapperRef.current?.contains(target)) return;
      if (loginButtonWrapperRef.current?.contains(target)) return;

      setShowError(false);
    };

    document.addEventListener("click", onPointerDown, true);
    return () => document.removeEventListener("click", onPointerDown, true);
  }, [showError]);

  return (
    <AuthForm buttonLabel="Login" onSubmit={login} linkPrompt="New User?" linkText="Create account" linkHref="/signup">
      <div className={styles.container}>
        <div className={styles.thirdOfWidth}></div>
        <div className={`${styles.loginformdiv}`} style={{width: '25%'}}>

         <TextBox placeholder="Username" value={username} onChange={usernameChanged} isValid={!invalidUsername} onUnClick={()=>{setInvalidUsername(false);}} />
         <TextBox placeholder="Password" value={password} onChange={passwordChanged} isValid={!invalidPassword} onUnClick={()=>{setInvalidPassword(false);}} textInputType="password"/>
          <span ref={loginButtonWrapperRef} className={styles.loginButtonWrap}>
            <LoadingButton label="Login" onClick={login} isLoading={isLoading}/>         
          </span>
          <span ref={errorBoxWrapperRef}>
            <ErrorMessageBox message={err} showError={showError}></ErrorMessageBox>
          </span>
        </div>            
        <div className={`${styles.thirdOfWidth} ${styles.invalidOuterDivStyle}`}></div>  
      </div> 
    </AuthForm>
   
  );
};

export default LoginForm;
