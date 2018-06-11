import React from 'react';
import styles from './header.css';

const Header = () => (
  <header className={styles.header}>
    <nav>
      <div className={'nav-wrapper'}>
        <div className="col">
          <a href="#" className="brand-logo">BlockLedger</a>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;
