import React, { useState, useEffect, useContext } from 'react';
import MainSidebarMenuItem from './MainSidebarMenuItem';
import SearchBox from '../../../shared/ui/GeneralComponents/SearchBox';
import Realm from '../domain/Realm';
import styles from './MainSidebarMenu.module.css'
import { useListRealmsByName } from '../application/useListRealmsByName';
import { DependencyContext } from '../../../app/DependencyContext';
import { User, UserAccountStatus, UserEmailVerificationStatus } from '../../Security/domain/User';


export default function MainSidebarMenu() {

  const listRealms = useListRealmsByName();
  const [_realmname, setRealmName] = useState('');
  const [realms, setData] = useState<Realm[]>([]);
  const { authService } = useContext(DependencyContext);
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
      const result = await authService.GetCurrentUser();
      if (result) {
        setCurrentUser(result);

      }
    };

    fetchCurrentUser();

  }, []);

  function RealmSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    setRealmName((event.target as HTMLInputElement).value);
  }


  const groups = [...new Set(realms.map((realm: Realm) => realm.group))];

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
            {groups.map((group) => (
              <div key={group} className={styles.realmsmenugroup}>
                <div className={styles.realmsmenugroupheader}>{group}</div>
                <table className={styles.realmsmenutable}>
                  <tbody>
                    {realms.filter((realm: Realm) => realm.group == group).map((realm: Realm) => (
                      <tr key={realm.id} className={styles.realmsmenuelement}>
                        <td>
                          <MainSidebarMenuItem ID={realm.id} Name={realm.name} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </>}
    </div>
  );
}