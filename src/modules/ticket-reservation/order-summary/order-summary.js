/* eslint-disable arrow-body-style */
import React from 'react';
import Addition from '../addition/addition';
import styles from './styles.scss';

export default class OrderSummary extends React.Component {
  render() {
    const {
      movieSession,
      addedSeats,
      additions,
      incrementAddition,
      decrementAddition,
      totalPrice,
    } = this.props;
    const seats = addedSeats.map((item) => {
      const seatPrice = movieSession.price * (item.kind.priceMultiplier || 1);
      return <div>Row: {item.rowNumber} Seat: {item.number} - {seatPrice}$</div>;
    });
    const additionList = movieSession.additions.map((item) => {
      return <Addition data={item}
                       key={item._id}
                       count={additions[item.addition.name]}
                       increment={incrementAddition}
                       decrement={decrementAddition}/>;
    });
    return (
      <div className={styles.container}>
        <div className={styles.orderInfo}>
          <div>
            {seats}
          </div>
          <div>
            Additions: {additionList}
          </div>
          <div>
            <h4>Total price: {totalPrice}$</h4>
          </div>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-primary">Checkout</button>
        </div>
      </div>
    );
  }
}
