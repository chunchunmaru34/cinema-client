import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { payForOrder, requestTicket, finishOrdering } from '../actions';
import OrderPayment from './order-payment';
import { PAYMENT_SUCCESS } from '../constants/payment-statuses';

class OrderPaymentContainer extends React.Component {
  onPayment = (e) => {
    e.preventDefault();
    const { dispatch, order, ticket } = this.props;
    if (ticket) return;
    dispatch(payForOrder(order));
  };

  onClosing = () => {
    this.props.dispatch(finishOrdering());
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.paymentStatus === PAYMENT_SUCCESS) {
      const { dispatch } = this.props;
      const data = {
        ...nextProps.order,
        selectedMovieSession: nextProps.selectedMovieSession,
      };
      dispatch(requestTicket(data));
    }
  }

  render() {
    const { ticket, error, paymentStatus } = this.props;
    return <OrderPayment pay={this.onPayment}
                         ticket={ticket}
                         error={error}
                         paymentStatus={paymentStatus}
                         finishOrder={this.onClosing}/>;
  }
}

OrderPaymentContainer.propTypes = {
  order: PropTypes.shape({
    transactionId: PropTypes.string,
    addedSeats: PropTypes.array,
    additions: PropTypes.array,
    totalPrice: PropTypes.number,
  }),
  ticket: PropTypes.shape({
    id: PropTypes.string,
    user: PropTypes.string,
    movieSession: PropTypes.string,
    additions: PropTypes.array,
    addedSeats: PropTypes.array,
    createdAd: PropTypes.string,
  }),
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  selectedMovieSession: PropTypes.object,
  paymentStatus: PropTypes.string,
};

const mapStateToProps = state => ({
  order: state.ticketReservation.order,
  ticket: state.ticketReservation.ticket,
  error: state.ticketReservation.error,
  paymentStatus: state.ticketReservation.paymentStatus,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
});

export default connect(mapStateToProps)(OrderPaymentContainer);
