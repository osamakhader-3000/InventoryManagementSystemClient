import React, { useState, useEffect, useContext } from 'react';
import RealmsMenuItem from './MainSidebarMenuItem';
import SearchBox from '../../shared/ui/GeneralComponents/SearchBox';
import Realm from '../../Domain/Entities/Realm';
import styles from './MainSidebarMenu.module.css'
import { useListRealmsByName } from '../Hooks/useListRealmsByName';
import { DependencyContext } from '../../context/DependencyContext';
import { User, UserAccountStatus, UserEmailVerificationStatus } from '../../Domain/Entities/User';


export default function MainSidebarMenu() {

  const listRealms = useListRealmsByName();
  const [_realmname, setRealmName] = useState('');
  const [realms, setData] = useState<Realm[]>([]);
  const { userService } = useContext(DependencyContext);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const _realms = await listRealms(_realmname);
      setData(_realms);
    };

    fetchData();
  }, [_realmname]);

  useEffect(() => {

    const fetchCurrentUser = async () => {
      const result = await userService.GetCurrentUser();
      if (result) {
        setCurrentUser(result);

      }
    };

    fetchCurrentUser();

  }, []);

  function RealmSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    setRealmName((event.target as HTMLInputElement).value);
  }


  return (

    <div>
      <div className={styles.homebutton}>
        <a tabIndex={0} href="/" className={styles.homebuttonlink}>
          <h3 className={styles.realmsmenusearchlogofont}>Inventory Management System</h3>
        </a>
      </div>
      {currentUser && currentUser.emailVerificationStatus == UserEmailVerificationStatus.Verified && currentUser.accountStatus == UserAccountStatus.Active &&
        <>
          <div className={styles.realmsmenusearch}>
            <SearchBox placeholder="Search" keyUpFunc={RealmSearch} />
          </div>
          <div className={styles.realmsmenucontainer}>
            <table className={styles.realmsmenutable}>
              <tbody>
                {realms.length > 0 &&
                  realms.map((realm: Realm) => (
                    <tr key={realm.id} className={styles.realmsmenuelement}>
                      <td>
                        <RealmsMenuItem ID={realm.id} Name={realm.name} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>}
    </div>
  );
}