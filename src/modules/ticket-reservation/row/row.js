/* eslint-disable arrow-body-style,prefer-destructuring */
import React from 'react';
import Seat from '../seat/seat';
import styles from './styles.scss';

const Row = ({ data, movieSession }) => {
  const seats = data.seats.map((item, index) => {
    const reservetationStatus = movieSession.reservation[data.number - 1]
    && movieSession.reservation[data.number - 1][index];
    let reserved;
    if (reservetationStatus) {
      reserved = movieSession.reservation[data.number - 1][index].reserved;
    }
    return <Seat data={item}
                 key={index}
                 className={styles.seat}
                 reserved={reserved}
                 index={index}
    />;
  });
  return (
    <div className={styles.container}>
      {seats}
    </div>
  );
};

export default Row;
