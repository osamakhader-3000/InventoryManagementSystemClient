import styles from './NotificationMessageBox.module.css';
import { useRef } from "react";

interface NotificationMessageBoxProps {
  message?:string|undefined;
  showNotification?:boolean|false;
  children?: React.ReactNode;
}

export function NotificationMessageBox({message,showNotification,children }: NotificationMessageBoxProps) {

  const localRef = useRef<HTMLDivElement>(null);

  return (
    <>
      { showNotification && 
      <div className={`${styles.outerdiv} ${styles.fadein} ${ showNotification ? styles.show : ''}`} ref={localRef}>
        {message}
        {children}
      </div>}
    </>
  );
}