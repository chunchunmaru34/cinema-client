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
  const additions = data.ticketAdditions && data.ticketAdditions.map(ticketAddition => (
    <div key={ticketAddition.id}>
      {ticketAddition.movieSessionAddition.additionalService.name} - x{ticketAddition.count}
    </div>
  ));

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <h5>{getDate(data.movieSession.date)}</h5>
      </div>

      <div className={styles.info}>
        <div className="mb-3">
          <span>Movie: {data.movieSession.movie.title}</span>
        </div>
        <div className={styles.cinemaInfo}>
          <div>Cinema: {data.movieSession.room.cinema.name}</div>
          <div>Room: {data.movieSession.room.name}</div>
        </div>
        <div className={styles.order}>
          <div>
            <div>Seat: {data.seat.number}</div>
            <div>Row: {data.seat.row.number}</div>
            <div>Seat type: {data.seat.seatType.name}</div>
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
      room: PropTypes.shape({
        name: PropTypes.string,
        cinema: PropTypes.shape({
          name: PropTypes.string,
          city: PropTypes.string,
        }),
      }),
      movie: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        actors: PropTypes.arrayOf(PropTypes.string),
        rating: PropTypes.number,
        director: PropTypes.string,
        startShowDate: PropTypes.date,
        endShowDate: PropTypes.date,
      }),
      date: PropTypes.string,
      roomCodeName: PropTypes.string,
    }),
    seat: PropTypes.shape({
      number: PropTypes.number,
      row: PropTypes.shape({
        number: PropTypes.number,
      }),
    }),
    user: PropTypes.string,
    ticketAdditions: PropTypes.arrayOf(PropTypes.shape({
      movieSessionAddition: PropTypes.shape({
        additionalService: PropTypes.shape({
          name: PropTypes.string,
        }),
        price: PropTypes.number,
      }),
      count: PropTypes.number,
    })),
  }),
};

export default Ticket;
