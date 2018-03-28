import React from 'react';
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
      <div className={styles.screen}>Screen</div>
      {rows}
      <OrderSummary movieSession={movieSession}/>
    </div>
  );
};

export default SeatsArrangements;
