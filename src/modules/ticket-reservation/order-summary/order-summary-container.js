import React from 'react';
import { connect } from 'react-redux';
import { checkout } from '../actions';
import OrderSummary from './order-summary';

class OrderSummaryContainer extends React.Component {
  onCheckout = () => {
    this.props.dispatch(checkout());
  };

  render() {
    const {
      movieSession, order, isCheckingOut,
    } = this.props;
    return order.addedSeats.length ?
      <OrderSummary
           order={order}
           checkout={this.onCheckout}
           isCheckingOut={isCheckingOut}
           movieSession={movieSession}
      />
      :
      null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  order: state.ticketReservation.order,
  isCheckingOut: state.ticketReservation.isCheckingOut,
  movieSession: ownProps.movieSession,
});

export default connect(mapStateToProps)(OrderSummaryContainer);
