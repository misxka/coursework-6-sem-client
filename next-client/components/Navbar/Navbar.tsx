import { Button, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FaUserPlus } from 'react-icons/fa';

import styles from './Navbar.module.scss';

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div className={styles.buttons}>
          <Link href='/login'>
            <a>
              <Button rightIcon={<Icon as={FaUserPlus} />} colorScheme='linkedin' variant='solid'>
                Войти
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;