import React from 'react';
import Row from './row/row';
import OrderSummary from '../order-summary/order-summary-container';
import styles from './styles.scss';
import OrderPayment from '../order-payment/order-payment-container';

const SeatsArrangements = ({ movieSession, isCheckingOut }) => {
  const rows = movieSession.seats
    .map((item, index) => <Row data={item}
                               rowIndex={index}
                               key={index}/>);
  return (
    <div className={styles.container}>
      {rows}
      <OrderSummary movieSession={movieSession}/>
      {isCheckingOut && <OrderPayment/>}
    </div>
  );
};

export default SeatsArrangements;
