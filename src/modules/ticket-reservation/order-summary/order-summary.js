/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';

import Ticket from './ticket/ticket';
import styles from './styles.scss';

export default class OrderSummary extends React.Component {
  render() {
    const {
      movieSession,
      tickets,
      isCheckingOut,
      checkout,
    } = this.props;

    let totalPrice = 0;
    const seats = tickets.map((ticket) => {
      totalPrice += ticket.totalPrice;
      return (
        <Ticket
          key={`${ticket.seat.row.number}_${ticket.seat.number}`}
          ticket={ticket}
          movieSession={movieSession}
        />
      );
    });

    return (
      <div className={styles.container}>
        <div className="text-center">
          <h4>Your order</h4>
        </div>
        <div className={styles.tickets}>
           {seats}
        </div>
        <div className="text-center mt-3">
          <h4>Total price: {totalPrice}$</h4>
        </div>
        <div className="text-center mt-3">
          <button
            disabled={isCheckingOut}
            className="btn btn-primary"
            onClick={checkout}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

OrderSummary.propTypes = {
  tickets: PropTypes.array,
  incrementAddition: PropTypes.func,
  decrementAddition: PropTypes.func,
  checkout: PropTypes.func,
  isCheckingOut: PropTypes.bool,
};

