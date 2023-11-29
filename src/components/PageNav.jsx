import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import styles from './PageNav.module.css';

function PageNav() {
  return (
    <nav className={styles.pageNavCS}>
      <Logo />

      <ul>
        <li>
          <NavLink to='/your-city-maps/about'>About</NavLink>
          <div className={styles.hoverDivCS}></div>
        </li>
        <li>
          <NavLink to='/your-city-maps/dev'>Dev</NavLink>
          <div className={styles.hoverDivCS}></div>
        </li>
        <li>
          <NavLink to='/your-city-maps/login'>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
