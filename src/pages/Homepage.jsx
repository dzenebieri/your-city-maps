import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import styles from './Homepage.module.css';

export default function Homepage() {
  return (
    <main className={styles.homepageCS}>
      <PageNav />

      <main>
        <Link to='/your-city-maps/login'>
          Your
          <span className='material-symbols-rounded'>favorite</span>
          City Maps
        </Link>
      </main>
    </main>
  );
}
