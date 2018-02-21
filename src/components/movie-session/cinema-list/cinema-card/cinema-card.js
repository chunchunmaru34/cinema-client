import React from 'react';
import styles from './styles.scss';

const CinemaCard = ({ data, clickHandler }) => (
  <div className={styles.container} onClick={clickHandler}>
    {data.name}
  </div>
);

export default CinemaCard;
