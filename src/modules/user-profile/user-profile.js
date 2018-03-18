import React from 'react';
import gravatar from 'gravatar';
import styles from './styles.css';

const UserProfile = ({ user }) => (
  <div className={styles.container}>
    <div className={styles.info}>
      <div className={styles.profilePic}>
        <img src={gravatar.url(user.email, { s: '220', r: 'pg' })}/>
      </div>
      <div className={styles.details}>
        <div>{user.name}</div>
        <div>{user.email}</div>
      </div>
    </div>
  </div>
);

export default UserProfile;
