import React from 'react';
import { connect } from 'react-redux';
import { incrementAddition, decrementAddition, checkout } from '../actions';
import OrderSummary from './order-summary';

class OrderSummaryContainer extends React.Component {
  onIncrementAddition = (addition) => {
    this.props.dispatch(incrementAddition(addition));
  };

  onDecrementAddition = (addition) => {
    this.props.dispatch(decrementAddition(addition));
  };

  onCheckout = () => {
    // ticketService.reserveSeats({ seats: addedSeats, movieSession });
    this.props.dispatch(checkout());
  };

  render() {
    const {
      addedSeats, movieSession, additions, totalPrice, isCheckingOut,
    } = this.props;
    return addedSeats.length ? <OrderSummary addedSeats={addedSeats}
                                             additions={additions}
                                             totalPrice={totalPrice}
                                             checkout={this.onCheckout}
                                             isCheckingOut={isCheckingOut}
                                             incrementAddition={this.onIncrementAddition}
                                             decrementAddition={this.onDecrementAddition}
                                             movieSession={movieSession}/> : '';
  }
}

const mapStateToProps = (state, ownProps) => ({
  addedSeats: state.ticketReservation.order.addedSeats,
  additions: state.ticketReservation.order.additions,
  totalPrice: state.ticketReservation.order.totalPrice,
  isCheckingOut: state.ticketReservation.isCheckingOut,
  movieSession: ownProps.movieSession,
});

export default connect(mapStateToProps)(OrderSummaryContainer);
