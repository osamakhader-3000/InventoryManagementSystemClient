import { ButtonPreloader } from "./ButtonPreloader";
import GeneralStyles from '../../../Presentation/GeneralStyles.module.css'

export function LoadingButton({label, onClick, cssClass,isLoading}: {label?:string, onClick?:()=>void, cssClass?:string,isLoading?:boolean}) {

  return (
     <button title={label} onClick={onClick} disabled={isLoading} className={isLoading ? `${cssClass} ${GeneralStyles.disablebutton}` : cssClass} style={{"height":"45px"}}>
              {isLoading ? <ButtonPreloader /> : label}
            </button>
  );
}