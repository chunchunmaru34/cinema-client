import React from 'react';
import styles from './styles.scss';

const NORMAL_SEAT_WIDTH = 40;

const Seat = ({ index, data }) => (
    <div className={`${styles.container} ${styles[data.status]} ${styles[data.name]}`}
         style={{
      minWidth: `${NORMAL_SEAT_WIDTH * data.space}px`,
    }}>
      <div>{index + 1}</div>
      <div>{data.space > 1 && data.name}</div>
    </div>
);

export default Seat;
