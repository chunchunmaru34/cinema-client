import React from 'react';
import { connect } from 'react-redux';
import { finishOrdering } from '../actions';
import SeatsArrangement from '../seats-arrangement/seats-arrangement-container';
import OrderPayment from '../order-payment/order-payment-container';

class MovieSession extends React.Component {
  componentWillUnmount() {
    this.props.dispatch(finishOrdering());
  }

  render() {
    const { isCheckingOut, movieSession } = this.props;
    return isCheckingOut ? <OrderPayment/> : <SeatsArrangement movieSession={movieSession}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCheckingOut: state.ticketReservation.isCheckingOut,
  movieSession: ownProps.movieSession,
});

export default connect(mapStateToProps)(MovieSession);
