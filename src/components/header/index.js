import React from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.css';

const Header = () => {
    return (
        <div className={styles.header}>
            <Link to='/' className={styles.logo}>Cinema</Link>
        </div>)
};

export default Header;