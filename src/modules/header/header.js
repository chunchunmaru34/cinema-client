import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import { LOGIN_ROUTE, USERS_ROUTE, SIGN_UP_ROUTE } from '../../constants/routes';

const Header = ({ user, handleLogout }) => (
  <header className={styles.header}>
    <div className="text-right position-absolute w-100">
      {
        !user ?
          <div>
            <Link to={LOGIN_ROUTE}
                  className="mr-2">Login</Link>
            <Link to={SIGN_UP_ROUTE}>Sign Up</Link>
          </div>
          :
          <div>
            <Link to={`${USERS_ROUTE}/${user.id}`}>Profile</Link>
            <button className="btn btn-primary ml-2"
                    onClick={handleLogout}>Logout</button>
          </div>
      }
    </div>
    <Link to='/' className={styles.logo}>Cinema</Link>
  </header>
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
