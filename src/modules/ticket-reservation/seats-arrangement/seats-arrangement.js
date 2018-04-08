import React from 'react';
import PropTypes from 'prop-types';
import Row from './row/row';
import OrderSummary from '../order-summary/order-summary-container';
import styles from './styles.scss';

const SeatsArrangements = ({ movieSession }) => {
  const rows = movieSession.seats
    .map((item, index) => <Row data={item}
                               rowIndex={index}
                               key={index}/>);
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.screen}>Screen</div>
        {rows}
        <OrderSummary movieSession={movieSession}/>
      </div>
    </div>
  );
};

SeatsArrangements.propTypes = {
  movieSession: PropTypes.shape({
    date: PropTypes.string,
    price: PropTypes.number,
    cinema: PropTypes.object,
    movie: PropTypes.object,
    additions: PropTypes.array,
    seat: PropTypes.array,
  }),
  isMovieSessionsLoading: PropTypes.bool,
};

export default SeatsArrangements;
