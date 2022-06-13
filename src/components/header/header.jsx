import React, { memo } from 'react';
import styles from './header.module.css';

const Header = memo(({ onLogOut }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Business Card Maker</h1>
      {onLogOut && (
        <button className={styles.button} onClick={onLogOut}>
          Logout
        </button>
      )}
    </header>
  );
});

export default Header;
