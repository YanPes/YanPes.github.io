import { NavLink } from '@modern-js/runtime/router';
import Logo from '../../assets/yp-bold-white.svg?react';
import styles from './navigation.module.css';

const Navigation = () => {
  return (
    <div className={styles.navigationContainer}>
      <nav className={styles.navigation}>
        <ul>
          <li>
            <Logo />
          </li>
          <li>
            <NavLink to="/about/" className={styles.navLink}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/reading-list/" className={styles.navLink}>
              Reading List
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts/overview" className={styles.navLink}>
              Blog
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
