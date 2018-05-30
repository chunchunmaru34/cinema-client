import React from 'react';

import Addition from '../addition/addition-container';
import styles from './styles.scss';

const Ticket = ({ ticket, movieSession }) => {
  const additionList = movieSession.movieSessionAdditions
    .map(item => (
        <Addition
          data={item}
          ticket={ticket}
          key={item.id}
        />
    ));

  return (
    <div
      className={styles.container}
      key={`${ticket.seat.row.number}_${ticket.seat.number}`}
    >
      <div className={styles.header}>
        Row: {ticket.seat.row.number} Seat: {ticket.seat.number} - {ticket.totalPrice}$
      </div>
      <div className={styles.additionsList}>
        {additionList}
      </div>
    </div>
  );
};

export default Ticket;
