import React from 'react';
import { connect } from 'react-redux';
import { payForOrder, requestTicket, finishOrdering } from '../actions';
import OrderPayment from './order-payment';

class OrderPaymentContainer extends React.Component {
  onPayment = () => {
    const { dispatch, order, ticket } = this.props;
    if (ticket) return;
    dispatch(payForOrder(order));
  };

  onClosing = () => {
    this.props.dispatch(finishOrdering());
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactionId) {
      const { dispatch } = this.props;
      const data = {
        ...nextProps.order,
        selectedMovieSession: nextProps.selectedMovieSession,
      };
      dispatch(requestTicket(data));
    }
  }

  render() {
    const { ticket, error } = this.props;
    return <OrderPayment pay={this.onPayment}
                         ticket={ticket}
                         error={error}
                         finishOrder={this.onClosing}/>;
  }
}

const mapStateToProps = state => ({
  order: state.ticketReservation.order,
  ticket: state.ticketReservation.ticket,
  error: state.ticketReservation.error,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
  transactionId: state.ticketReservation.order.transactionId,
});

export default connect(mapStateToProps)(OrderPaymentContainer);
