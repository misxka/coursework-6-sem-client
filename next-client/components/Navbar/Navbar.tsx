import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../utils/store';
import Auth from '../Auth/Auth';

import styles from './Navbar.module.scss';

function Navbar() {
  const [links, setLinks] = useState<JSX.Element>(<></>);
  const [didMount, setDidMount] = useState<boolean>(false);

  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.value);

  const teacherLinks = (
    <div className={styles.links}>
      <Link href='/categories/studio'>
        <a className={`${styles.link} ${router.pathname == '/categories/studio' ? styles.currentLink : ''}`}>Мастерская</a>
      </Link>
    </div>
  );

  const adminLinks = (
    <div className={styles.links}>
      <Link href='/admin-dashboard'>
        <a className={`${styles.link} ${router.pathname == '/admin-dashboard' ? styles.currentLink : ''}`}>Кабинет администратора</a>
      </Link>
    </div>
  );

  useEffect(() => {
    if (didMount || user.role) {
      if (user.role === 'TEACHER') {
        setLinks(teacherLinks);
        return;
      } else if (user.role === 'ADMIN') {
        setLinks(adminLinks);
        return;
      }
      setLinks(<></>);
    }
  }, [user]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return (
    <div className={styles.navbar}>
      {links}
      <div className={styles.buttons}>
        <Auth />
      </div>
    </div>
  );
}

export default Navbar;
