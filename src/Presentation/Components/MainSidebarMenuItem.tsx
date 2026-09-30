import { Link } from "react-router";
import styles from './RealmsMenuItem.module.css'

interface RealmsMenuItemProps{
  ID:string,
  Name:string
}

export default function RealmsMenuItem({ID,Name}:RealmsMenuItemProps){

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