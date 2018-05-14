import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

function getDate(data) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  };
  return new Date(data).toLocaleString('en-GB', options);
}

const Ticket = ({ data }) => {
  const seats = data.addedSeats.map(item => (
    <div key={`${item.rowNumber}_${item.number}`}>
      Row: {item.rowNumber + 1} - Seat: {item.number + 1}
    </div>
  ));

  const additions = data.additions &&
    Object.entries(data.additions).map(([key, value]) => (
      <div key={key}>{key} : {value}</div>
    ));

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h5>{getDate(data.movieSession.date)}</h5>
      </div>

      <div className={styles.info}>
        <div className={styles.cinemaInfo}>
          <div>Cinema: {data.movieSession.cinema.name}</div>
          <div>Room: {data.movieSession.roomCodeName}</div>
        </div>
        <div className={styles.order}>
          <div>
            {seats}
          </div>
          <div>
            {additions}
          </div>
        </div>
        <div className="text-center">
          Price: {data.totalPrice}$
        </div>
      </div>
    </div>
  );
};

Ticket.propTypes = {
  data: PropTypes.shape({
    movieSession: PropTypes.shape({
      cinema: PropTypes.object,
      movie: PropTypes.object,
      date: PropTypes.string,
      roomCodeName: PropTypes.string,
    }),
    addedSeats: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      rowNumber: PropTypes.rowNumber,
    })),
    transactionId: PropTypes.string,
    user: PropTypes.string,
    additions: PropTypes.object,
  }),
};

export default Ticket;
