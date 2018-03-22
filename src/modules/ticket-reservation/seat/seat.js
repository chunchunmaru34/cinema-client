import React from 'react';
import styles from './styles.scss';

const Seat = ({ index, data }) => (
    <div className={`${styles.container} ${styles[data.status]} ${styles[data.name]}`}
         style={{
      minWidth: `${40 * data.space}px`,
    }}>
      <div>{index + 1}</div>
      <div>{data.space > 1 && data.name}</div>
    </div>
);

export default Seat;
