import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Seat = ({
  index, data, selected, handleSelect,
}) => (
  <div
    className={`
      ${styles.container}
      ${styles[data.status]}
      ${styles[data.kind.name]}
      ${selected && styles.selected}
    `}
    onClick={handleSelect}
  >
    <div>{index + 1}</div>
    <div>
      <small>{data.kind.name !== 'common' && data.kind.displayName}</small>
    </div>
  </div>
);

Seat.propTypes = {
  handleSelect: PropTypes.func,
  data: PropTypes.shape({
    kind: PropTypes.shape({
      name: PropTypes.string,
      displayName: PropTypes.string,
      space: PropTypes.number,
      priceMultiplier: PropTypes.number,
    }),
    status: PropTypes.string,
    occupiedUntil: PropTypes.string,
    occupiedBy: PropTypes.string,
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
