import { DependencyContext } from '../../../app/DependencyContext';
import { useNavigate } from "react-router";
import { useState, useContext, useEffect } from 'react';
import PopupBackground from '../../../shared/ui/GeneralComponents/PopupBackground';
import styles from './ProfileImageMenu.module.css'
import ProfileImageMenuItem from '../domain/ProfileImageMenuItem'
import inventoryManagementSystemLogo from '../../../assets/Icons/Logo.jpg';

export default function ProfileImageMenu() {

  const [imgMenuItems, setImgMenuItems] = useState<ProfileImageMenuItem[]>([]);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const { profileImgMenuService, authService } = useContext(DependencyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {

      var imageMenuItems = await profileImgMenuService.ListProfileImageMenuItems();

      setImgMenuItems(imageMenuItems);
    }

    fetchData();

  }, []);

  function menuItemClick(linkRef: string) {
    if (linkRef == "/logout") {
      authService.Logout();
      navigate('/login');
    }
    else
      navigate(linkRef);
  }

  function toggleList() {
    setMenuVisible(!menuVisible);
  }

  function backGroundClicked() {
    setMenuVisible(false);
  }

  return (
    <>
      {menuVisible && <PopupBackground onClick={backGroundClicked}></PopupBackground>}
      <div className={styles.profileimagemenu}>
        <button type='button' onClick={toggleList} className={styles.userbuttonclass}>
          <img src={inventoryManagementSystemLogo} className={styles.userimgclass} alt=''></img>
        </button>
        <div className={menuVisible ? `${styles.profileimagemenu} ${styles.menu}` : 'hide'}>
          {imgMenuItems.map((menuItem) => (
            <a key={menuItem.ID.toString()} onClick={() => { setMenuVisible(false); menuItemClick(menuItem.LinkRef); }}>
              <div className={styles.menuitem}>
                {menuItem.Text}
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

