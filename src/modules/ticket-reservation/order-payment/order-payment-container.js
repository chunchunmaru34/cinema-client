import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { payForOrder, requestTicket, finishOrdering } from '../actions';
import OrderPayment from './order-payment';

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
    if (nextProps.order.transactionId) {
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

OrderPaymentContainer.propTypes = {
  order: {
    transactionId: PropTypes.string,
    addedSeats: PropTypes.array,
    additions: PropTypes.array,
    ticket: PropTypes.shape({
      user: PropTypes.string,
      movieSession: PropTypes.string,
      createdAd: PropTypes.string,
    }),
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    selectedMovieSession: PropTypes.object,
  },
};

const mapStateToProps = state => ({
  order: state.ticketReservation.order,
  ticket: state.ticketReservation.ticket,
  error: state.ticketReservation.error,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
});

export default connect(mapStateToProps)(OrderPaymentContainer);
