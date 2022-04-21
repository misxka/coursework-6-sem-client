import { Avatar, Button, Icon, Skeleton } from '@chakra-ui/react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaSignOutAlt, FaUserPlus } from 'react-icons/fa';

import styles from './Navbar.module.scss';

function Navbar() {
  const [authGroup, setAuthGroup] = useState<JSX.Element>(<Skeleton height='40px' />);

  useEffect(() => {
    let isExpired;
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const dateNow = new Date();
      if (decodedToken.exp && decodedToken.exp * 1000 < dateNow.getTime()) isExpired = true;
      else isExpired = false;
    }

    if (!isExpired) {
      setAuthGroup(
        <>
          <Avatar name='Mikhail Viaryha' className={styles.avatar} />
          <Link href='/login'>
            <a>
              <Button rightIcon={<Icon as={FaSignOutAlt} />} colorScheme='red' variant='outline'>
                Выйти
              </Button>
            </a>
          </Link>
        </>
      );
    } else {
      setAuthGroup(
        <Link href='/login'>
          <a>
            <Button rightIcon={<Icon as={FaUserPlus} />} colorScheme='blue' variant='solid'>
              Войти
            </Button>
          </a>
        </Link>
      );
    }
  }, []);

  return (
    <div className={styles.navbar}>
      <div className={styles.buttons}>{authGroup}</div>
    </div>
  );
}

export default Navbar;
