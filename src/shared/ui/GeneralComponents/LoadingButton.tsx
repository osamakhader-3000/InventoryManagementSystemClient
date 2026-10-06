import { ButtonPreloader } from "./ButtonPreloader";
import styles from '../../../shared/ui/SharedCss/SharedStyles.module.css'

export function LoadingButton({label, onClick, cssClass,isLoading}: {label?:string, onClick?:()=>void, cssClass?:string,isLoading?:boolean}) {

  return (
     <button title={label} onClick={onClick} disabled={isLoading} className={isLoading ? `${cssClass} ${styles.disablebutton}` : cssClass} style={{"height":"45px"}}>
              {isLoading ? <ButtonPreloader /> : label}
            </button>
  );
}