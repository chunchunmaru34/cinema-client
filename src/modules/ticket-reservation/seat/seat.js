import React from 'react';
import styles from './styles.scss';

const Seat = ({ index, reserved }) => (
  <div className={styles.container}
       style={{
         backgroundColor: reserved !== 'paid' ? 'white' : 'transparent',
         color: reserved !== 'paid' ? 'black' : 'white',
       }}>
    {index + 1}
  </div>
);

export default Seat;
