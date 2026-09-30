import ProfileImageMenu from './ProfileImageMenu';
import styles from './MainViewHeader.module.css'
import { useContext, useEffect, useState } from "react";
import { User } from "../../Domain/Entities/User";
import { DependencyContext } from '../../context/DependencyContext';

export default function MainViewHeader(){
  
   const { userService } = useContext(DependencyContext);
   const [currentUser, setCurrentUser] = useState<User | null>(null);

   useEffect(() => {

      const fetchCurrentUser = async () => {
        const result = await userService.GetCurrentUserProfile();
        if (result) {
          setCurrentUser(result);

        }
      };

      fetchCurrentUser();

  }, []);

    return (
    <div className={styles.mainviewheader}>
      <div className={styles.searchDiv}>
 
      </div>
      <div className={styles.profileButton}>
        {currentUser  && 
        <div className={styles.username}>{currentUser.username??currentUser.email}</div>
        }
        <ProfileImageMenu></ProfileImageMenu>
        </div>
    </div>);
}