/* eslint-disable arrow-body-style */
import React from 'react';
import Seat from '../seat/seat';
import styles from './styles.scss';

const Row = ({ data }) => {
  const seats = data.map((item, seatIndex) => {
    return <Seat data={item}
                 key={seatIndex}
                 className={styles.seat}
                 index={seatIndex}
    />;
  });
  return (
    <div className={styles.container}>
        {seats}
    </div>
  );
};

export default Row;
