import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import Realm from '../domain/Realm';
import styles from './PageTitle.module.css'
import { useListRealmsByName } from '../application/useListRealmsByName';
import { AppIcon } from '../../../shared/ui/GeneralComponents/AppIcon';

// Sub pages that are not realms themselves: route name => [parent realm id, page title]
const subPages: Record<string, [string, string]> = {
  addassignment: ['assignments', 'New Assignment'],
  viewassignment: ['assignments', 'View Assignment'],
  adddevice: ['devices', 'Add Device'],
  editdevice: ['devices', 'Edit Device'],
  addaccessory: ['accessories', 'Add Accessory'],
  editaccessory: ['accessories', 'Edit Accessory'],
  adddepartment: ['departments', 'Add Department'],
  editdepartment: ['departments', 'Edit Department'],
  addlocation: ['locations', 'Add Location'],
  editlocation: ['locations', 'Edit Location'],
  adduser: ['users', 'Add User'],
  edituser: ['users', 'Edit User'],
  addbuild: ['builds', 'Add Build'],
  editbuild: ['builds', 'Edit Build'],
  addclient: ['clients', 'Add Client'],
  editclient: ['clients', 'Edit Client'],
};

const otherPages: Record<string, string> = {
  myprofile: 'My Profile',
};

export default function PageTitle() {

  const listRealms = useListRealmsByName();
  const [realms, setRealms] = useState<Realm[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setRealms(await listRealms(''));
    };

    fetchData();
  }, []);

  const path = pathname.replace(/^\/+|\/+$/g, '');
  const routeName = path.split('/')[0];
  const realm = realms.find((r: Realm) => r.id == path);
  const subPage = subPages[routeName];
  const parent = subPage ? realms.find((r: Realm) => r.id == subPage[0]) : undefined;

  let title: string;
  let icon: string;
  if (realm) {
    title = realm.name;
    icon = realm.id;
  } else if (subPage && parent) {
    title = subPage[1];
    icon = parent.id;
  } else if (otherPages[routeName]) {
    title = otherPages[routeName];
    icon = routeName;
  } else {
    return null;
  }

  const group = (realm ?? parent)?.group;

  return (
    <div className={styles.pagetitle}>
      <span className={styles.pageicon}><AppIcon name={icon} size={26} /></span>
      <div>
        <h1 className={styles.pagetitletext}>{title}</h1>
        <div className={styles.breadcrumb}>
          <Link to="/">Home</Link>
          {group && <><span className={styles.separator}>/</span><span>{group}</span></>}
          {parent && <><span className={styles.separator}>/</span><Link to={'/' + parent.id}>{parent.name}</Link></>}
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{title}</span>
        </div>
      </div>
    </div>
  );
}
