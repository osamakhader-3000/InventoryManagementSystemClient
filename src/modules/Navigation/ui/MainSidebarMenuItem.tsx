import { NavLink } from "react-router";
import styles from './MainSidebarMenuItem.module.css'
import { AppIcon } from '../../../shared/ui/GeneralComponents/AppIcon';

interface MainSidebarMenuItemProps{
  ID:string,
  Name:string
}

export default function MainSidebarMenuItem({ID,Name}:MainSidebarMenuItemProps){

return(
<div>
    <NavLink to={'/'+ID}  className={styles.realmsmenurelmlink}>
            <div>
                <span className={styles.realmsmenurealmimg}><AppIcon name={ID} /></span>
                <div className={styles.realmsmenurealmtext}>
                  <span className={styles.realmsmenurealmtextspan}>{Name}</span> 
                </div>
            </div>              
    </NavLink>            
</div>
);
}