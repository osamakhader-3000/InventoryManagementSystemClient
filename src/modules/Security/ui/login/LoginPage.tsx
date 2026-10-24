import LoginForm from './LoginForm.tsx';
import CreateAccountForm from './CreateAccountForm.tsx';
import styles from './loginpage.module.css'
import { useTranslations } from '../../../../shared/ui/i18n/useTranslations.ts';
import { useRef } from 'react';
import { useLocation } from 'react-router';
import backgroundImage from '../../../../assets/Icons/Logo.jpg';

const authPages = ["/login", "/signup"];

interface LoginPageProps {
  newAccount: boolean;
}


export default function LoginPage({newAccount}:LoginPageProps) {

  const { T } = useTranslations();
  const location = useLocation();

  // Never redirect back to an auth page (e.g. a stale "from: /login" left in history state).
  const fromPath: string | undefined = (location.state as any)?.from?.pathname;
  const redirectUrlRef = useRef(
    fromPath && !authPages.includes(fromPath) ? fromPath : "/"
  );
 
  return (
    
    <div className={styles.loginroot}>
      <div className={styles.container}>
        <div className={styles.logodiv} style={{ backgroundImage: `url(${backgroundImage})` }}>
          <h3 className={styles.title}>Inventory Management System</h3>
        </div>
        <div className={styles.middle}>
          <div
            className={styles.logo}>
            <h4>{newAccount ? 'Create account:' : T('login')}</h4>
          </div>
          <div className={styles.buttons}>
            <div className={styles.quarter2}>             
              {newAccount ? <CreateAccountForm redirectUrl={redirectUrlRef.current} /> : <LoginForm redirectUrl={redirectUrlRef.current} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

