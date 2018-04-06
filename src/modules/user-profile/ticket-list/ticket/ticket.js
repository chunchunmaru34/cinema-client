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

const Ticket = ({ data }) => (
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
          {data.addedSeats.map(item => <div>Row: {item.rowNumber} - Seat: {item.number} </div>)}
        </div>
        <div>
          {data.additions &&
            Object.entries(data.additions).map(([key, value]) => <div>{key} : {value}</div>)
          }
        </div>
      </div>
      <div className="text-center">Price: {data.totalPrice}$</div>
    </div>
  </div>
);

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
