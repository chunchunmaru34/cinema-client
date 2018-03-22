import React from 'react';
import { connect } from 'react-redux';
import { payForOrder } from '../actions';
import OrderPayment from './order-payment';

class OrderPaymentContainer extends React.Component {
  onPayment = () => {
    const { dispatch, order } = this.props;
    dispatch(payForOrder(order));
  };

  render() {
    const { ticket, error } = this.props;
    return <OrderPayment pay={this.onPayment} ticket={ticket} error={error}/>;
  }
}

const mapStateToProps = state => ({
  order: state.ticketReservation,
  ticket: state.ticketReservation.ticket,
  error: state.ticketReservation.error,
});

export default connect(mapStateToProps)(OrderPaymentContainer);
