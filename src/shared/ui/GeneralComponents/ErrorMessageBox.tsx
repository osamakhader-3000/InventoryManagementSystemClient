import styles from './ErrorMessageBox.module.css';
import { useRef } from "react";

interface ErrorMessageBoxProps {
  message?:string|undefined;
  showError?:boolean|false;
  children?: React.ReactNode;
}

export function ErrorMessageBox({message,showError,children }: ErrorMessageBoxProps) {

  const localRef = useRef<HTMLDivElement>(null);

  return (
    <>
      { showError && 
      <div className={`${styles.outerdiv} ${styles.fadein} ${ showError ? styles.show : ''}`} ref={localRef}>
        {message}
        {children}
      </div>}
    </>
  );
}