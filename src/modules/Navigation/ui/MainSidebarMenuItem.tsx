import { Link } from "react-router";
import styles from './MainSidebarMenuItem.module.css'

interface MainSidebarMenuItemProps{
  ID:string,
  Name:string
}

export default function MainSidebarMenuItem({ID,Name}:MainSidebarMenuItemProps){

return(
<div>
    <Link to={'/'+ID}  className={styles.realmsmenurelmlink}>
            <div>
                <div className={styles.realmsmenurealmimg}>
                  <img src="/realmicon.svg" alt=''></img>                    
                    </div>
                <div className={styles.realmsmenurealmtext}>
                  <span className={styles.realmsmenurealmtextspan}>{Name}</span> 
                </div>
            </div>              
    </Link>            
</div>
);
}