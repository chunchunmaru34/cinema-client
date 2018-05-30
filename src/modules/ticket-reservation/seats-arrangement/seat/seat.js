import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Seat = ({
  data, selected, handleSelect,
}) => (
  <div
    className={`
      ${styles.container}
      ${styles[data.ticket && data.ticket.status]}
      ${styles[data.seatType.name]}
      ${selected && styles.selected}
    `}
    onClick={handleSelect}
  >
    <div>{data.number}</div>
    <div>
      <small>{data.seatType.name !== 'common' && data.seatType.displayName}</small>
    </div>
  </div>
);

Seat.propTypes = {
  handleSelect: PropTypes.func,
  data: PropTypes.shape({
    seatType: PropTypes.shape({
      name: PropTypes.string,
      displayName: PropTypes.string,
      priceMultiplier: PropTypes.number,
    }),
    ticket: PropTypes.shape({
      status: PropTypes.string,
      occupiedUntil: PropTypes.string,
      occupiedBy: PropTypes.string,
    }),
    number: PropTypes.number,
  }),
  movieSession: PropTypes.shape({
    roomCodeName: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.number,
    cinema: PropTypes.object,
    movie: PropTypes.object,
    additions: PropTypes.array,
    seat: PropTypes.array,
  }),
  index: PropTypes.number,
  rowIndex: PropTypes.number,
};

export default Seat;
