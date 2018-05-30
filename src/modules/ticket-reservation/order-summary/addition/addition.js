import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Addition = ({
  data, ticketAddition, increment, decrement,
}) => (
  <div className={styles.container}>
    <span>{data.additionalService.name}: {data.price}$</span>
    <div className={styles.control}>
      <button
        className="btn btn-sm btn-primary m-sm-1"
        onClick={increment}
      >
        +
      </button>
      <button
        className="btn btn-sm btn-primary m-1"
        onClick={decrement}
        disabled={!ticketAddition || ticketAddition.count < 1}
      >
        -
      </button>
      <span>x{(ticketAddition && ticketAddition.count) || 0}</span>
    </div>
  </div>
);

Addition.propTypes = {
  data: PropTypes.shape({
    addition: PropTypes.shape({
      name: PropTypes.string,
    }),
    price: PropTypes.number,
  }),
  count: PropTypes.number,
  increment: PropTypes.func,
  decrement: PropTypes.func,
};

export default Addition;

