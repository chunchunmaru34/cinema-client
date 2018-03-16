import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

const Header = ({ user, handleLogout }) => (
  <div className={styles.header}>
    <div className="text-right">
      {
        !user ? <Link to="/login">Login</Link>
          :
          <button onClick={handleLogout}>logout</button>
      }
    </div>
    <Link to='/' className={styles.logo}>Cinema</Link>
  </div>
);

export default Header;
