/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import Addition from './addition/addition-container';
import styles from './styles.scss';

export default class OrderSummary extends React.Component {
  render() {
    const {
      movieSession,
      order,
      isCheckingOut,
      checkout,
    } = this.props;

    const seats = order.addedSeats.map((item) => {
      const seatPrice = movieSession.price * (item.kind.priceMultiplier || 1);
      return <div>Row: {item.rowNumber + 1} Seat: {item.number + 1} - {seatPrice}$</div>;
    });

    const additionList = movieSession.additions.map((item) => {
      return <Addition data={item}
                       key={item._id}/>;
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
          <h4>Total price: {order.totalPrice}$</h4>
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

OrderSummary.propTypes = {
  order: PropTypes.shape({
    transactionId: PropTypes.string,
    addedSeats: PropTypes.array,
    additions: PropTypes.object,
    ticket: PropTypes.shape({
      user: PropTypes.string,
      movieSession: PropTypes.string,
      createdAd: PropTypes.string,
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
  }),
  incrementAddition: PropTypes.func,
  decrementAddition: PropTypes.func,
  checkout: PropTypes.func,
  isCheckingOut: PropTypes.bool,
};

