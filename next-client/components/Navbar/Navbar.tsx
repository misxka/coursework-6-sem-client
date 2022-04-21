import { Button, Icon } from '@chakra-ui/react';
import Link from 'next/link';
import { FaUserPlus } from 'react-icons/fa';
import GameModeButton from '../GameModeButton/GameModeButton';

import styles from './Navbar.module.scss';

function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <GameModeButton />
        <div className={styles.buttons}>
          <Link href='/login'>
            <a>
              <Button rightIcon={<Icon as={FaUserPlus} />} colorScheme='blue' variant='solid'>
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
