import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { cancelCheckingOut, finishOrdering } from '../actions';
import { PAYMENT_SUCCESS } from '../constants/payment-statuses';
import OrderPayment from './order-payment';

class OrderPaymentContainer extends React.Component {
  onClosing = () => {
    const { dispatch, paymentStatus } = this.props;

    if (paymentStatus === PAYMENT_SUCCESS) {
      dispatch(finishOrdering());
    } else {
      dispatch(cancelCheckingOut());
    }
  };

  render() {
    const { confirmedTickets, error } = this.props;
    return (
      <OrderPayment
        pay={this.onPayment}
        confirmedTickets={confirmedTickets}
        error={error}
        finishOrder={this.onClosing}
      />
    );
  }
}

OrderPaymentContainer.propTypes = {
  userTickets: PropTypes.array,
  confirmedTickets: PropTypes.array,
  error: PropTypes.string,
  selectedMovieSession: PropTypes.object,
};

const mapStateToProps = state => ({
  order: state.ticketReservation.order,
  confirmedTickets: state.ticketReservation.confirmedTickets,
  userTickets: state.ticketReservation.userTickets,
  error: state.ticketReservation.error,
  paymentStatus: state.ticketReservation.paymentStatus,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
});

export default connect(mapStateToProps)(OrderPaymentContainer);
