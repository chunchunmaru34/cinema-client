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
    this.props.dispatch(checkout());
  };

  render() {
    const {
      movieSession, order, isCheckingOut,
    } = this.props;
    return order.addedSeats.length ? <OrderSummary order={order}
                                                    checkout={this.onCheckout}
                                                    isCheckingOut={isCheckingOut}
                                                    incrementAddition={this.onIncrementAddition}
                                                    decrementAddition={this.onDecrementAddition}
                                                    movieSession={movieSession}/> : null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  order: state.ticketReservation.order,
  isCheckingOut: state.ticketReservation.isCheckingOut,
  movieSession: ownProps.movieSession,
});

export default connect(mapStateToProps)(OrderSummaryContainer);
