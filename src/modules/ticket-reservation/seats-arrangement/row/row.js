/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import Seat from '../seat/seat-container';
import styles from './styles.scss';

const Row = ({ data, rowIndex }) => {
  const seats = data.map((item, index) => {
    return <Seat data={item}
                 key={index}
                 index={index}
                 rowIndex={rowIndex}
    />;
  });
  return (
    <div className={styles.container}>
        {seats}
    </div>
  );
};

Row.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    kind: PropTypes.shape({
      name: PropTypes.string,
      displayName: PropTypes.string,
      space: PropTypes.number,
      priceMultiplier: PropTypes.number,
    }),
    status: PropTypes.string,
    occupiedUntil: PropTypes.string,
    occupiedBy: PropTypes.string,
  })),
  index: PropTypes.number,
};

export default Row;
