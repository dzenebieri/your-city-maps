import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import GitHub from '../imgs/GitHub.png';

function Logo() {
  return (
    <>
      <div className={styles.logoCS}>
        <Link to='/your-city-maps'>
          <span className={`material-symbols-rounded ${styles.homeCS}`}>
            home
          </span>
        </Link>
        <a href='https://github.com/dzenebieri' target='__blank'>
          <img src={GitHub} alt='GitHub LOGO' />
        </a>
      </div>
    </>
  );
}

export default Logo;
