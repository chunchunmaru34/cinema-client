import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scss';

const Header = ({ user, handleLogout }) => (
  <div className={styles.header}>
    <div className="text-right">
      {
        !user ?
          <div>
            <Link to="/login">Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>
          :
          <div>
            <Link to={`/user/${user.id}`}>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
      }
    </div>
    <Link to='/' className={styles.logo}>Cinema</Link>
  </div>
);

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    exp: Number,
  }),
  handleLogout: PropTypes.func,
};

export default Header;
