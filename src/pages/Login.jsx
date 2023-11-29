import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PageNav from '../components/PageNav';
import { useAuth } from '../contexts/FakeAuthContext';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('auto-login@mail.com');
  const [password, setPassword] = useState('password');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && password) login(email, password);
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/your-city-maps/maps', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.loginCS}>
      <PageNav />

      <form className={styles.loginLinkFormCS} onSubmit={handleSubmit}>
        <div className={styles.infoDivCS}>
          <label htmlFor='email'>Email</label>
          <input
            disabled='true'
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.infoDivCS}>
          <label htmlFor='password'>Password</label>
          <input
            disabled='true'
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
