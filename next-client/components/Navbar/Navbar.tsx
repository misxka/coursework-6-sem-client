import Auth from '../Auth/Auth';

import styles from './Navbar.module.scss';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.buttons}>
        <Auth />
      </div>
    </div>
  );
}

export default Navbar;
