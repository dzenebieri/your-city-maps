import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/FakeAuthContext';
import styles from './User.module.css';

function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const logoutBN = () => {
    logout();
    navigate('/your-city-maps');
  };

  return (
    <div className={styles.user}>
      <a href='https://dzenebieri.github.io' target='__blank'>
        <img src={user.img} alt={user.name} />
      </a>
      <p>{user.name}'re Welcome</p>
      <button onClick={logoutBN}>Logout</button>
    </div>
  );
}

export default User;
