// Header.js
import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>BoldSoftmation</h1>
      {/* Add any other header content here */}
    </header>
  );
};

export default Header;
