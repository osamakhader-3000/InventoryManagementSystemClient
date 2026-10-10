import React, { ReactNode } from "react";
import { Link } from "react-router";
import styles from './AuthForm.module.css'

interface AuthFormProps {
  children: ReactNode;
  buttonLabel: string;
  onSubmit: () => void;
  linkPrompt: string;
  linkText: string;
  linkHref: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ children, linkPrompt, linkText, linkHref }) => {
  return (
    <div className={styles.loginformcontainerdiv}>
    
        {children} 
   
      <div className={styles.alreadyhavacc}>
        <p>{linkPrompt}</p> <Link to={linkHref}>{linkText}</Link>
      </div>
    </div>
  );
};                                                                                                                                                                                                                                                                                                                                                                        

export default AuthForm;
