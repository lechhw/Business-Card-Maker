import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './login.module.css';

const Login = ({ authService }) => {
  const history = useHistory();
  const goToMaker = (userId) => {
    history.push({
      pathname: '/maker',
      state: { id: userId },
    });
  };

  const onLogin = (e) => {
    authService
      .login(e.target.textContent)
      .then((result) => goToMaker(result.user.uid));
  };

  const onLoginAnonymously = () => {
    authService
      .loginAnonymously()
      .then(
        alert(
          "⚠️ Non-members login doesn't save the changed data. So, We recommend you log in with Google or Github."
        )
      )
      .then(goToMaker());
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      // 사용자가 로그인을 했다면 user 라는 데이터가 있고, 로그인을 안했다면 user = null
      user && goToMaker(user.uid);
    });
  }, [authService]);

  return (
    <section className={styles.login}>
      <header className={styles.header}>
        <img className={styles.image} src="./images/login.png" alt="" />
        <h1 className={styles.title}>Login</h1>
        <p className={styles.greeting}>Hello, this is Business Card Maker.</p>
      </header>

      <ul className={styles.list}>
        <li className={styles.item}>
          <img className={styles.google} src="./images/google.png" alt="" />
          <button className={styles.button} onClick={onLogin}>
            Google
          </button>
        </li>
        <li className={styles.item}>
          <img src="./images/github.png" alt="" />
          <button className={styles.button} onClick={onLogin}>
            Github
          </button>
        </li>
        <li className={styles.item}>
          <button
            className={`${styles.button} ${styles.non_members}`}
            onClick={onLoginAnonymously}
          >
            Non-members
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Login;
