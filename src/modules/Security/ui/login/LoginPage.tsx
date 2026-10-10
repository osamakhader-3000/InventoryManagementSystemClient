import LoginForm from './LoginForm.tsx';
import CreateAccountForm from './CreateAccountForm.tsx';
import microsoftLogo from '../../../../assets/Icons/32px-Microsoft_logo.svg.png';
import styles from './loginpage.module.css'
import { useTranslations } from '../../../../shared/ui/i18n/useTranslations.ts';
import { DependencyContext } from '../../../../app/DependencyContext.tsx';
import { useContext, useRef } from 'react';
import { useLocation } from 'react-router';
import backgroundImage from '../../../../assets/Icons/Logo.jpg';

interface LoginPageProps {
  newAccount: boolean;
}


export default function LoginPage({newAccount}:LoginPageProps) {

  const { T } = useTranslations();
    const location = useLocation();


  const { relocationService: relocationService } = useContext(DependencyContext);

  const redirectUrlRef = useRef(
    (location.state as any)?.from?.pathname || "/"
  );
  function microsoftlogin() {
    relocationService.RelocateToMicrosoftLogin();
  }


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
            <div className={styles.quarter1}>
              <button className={styles.socialbtn} onClick={microsoftlogin}>
                <span className={styles.sociallogowrapper}>
                  <img className={styles.sociallogo} src={microsoftLogo} alt="Microsoft logo" />
                </span>
                <span>Continue with Microsoft Account</span>
              </button>
            </div>
            <div className={styles.quarter2}>
              <p>- OR -</p>
              {newAccount ? <CreateAccountForm redirectUrl={redirectUrlRef.current} /> : <LoginForm redirectUrl={redirectUrlRef.current} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

