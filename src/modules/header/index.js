import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

const Header = () => (
  <div className={styles.header}>
    <div className="text-right">
      <Link to="/login">Login</Link>
    </div>
    <Link to='/' className={styles.logo}>Cinema</Link>
  </div>
);

export default Header;
