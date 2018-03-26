/* eslint-disable arrow-body-style */
import React from 'react';
import Addition from './addition/addition';
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
      isCheckingOut,
      checkout,
    } = this.props;

    const seats = addedSeats.map((item) => {
      const seatPrice = movieSession.price * (item.kind.priceMultiplier || 1);
      return <div>Row: {item.rowNumber + 1} Seat: {item.number + 1} - {seatPrice}$</div>;
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
            Seats:
            {seats}
          </div>
          <div>
            Additions: {additionList}
          </div>
        </div>
        <div className="text-center mt-3">
          <h4>Total price: {totalPrice}$</h4>
        </div>
        <div className="text-center mt-3">
          <button disabled={isCheckingOut}
                  className="btn btn-primary"
                  onClick={checkout}>Checkout</button>
        </div>
      </div>
    );
  }
}
