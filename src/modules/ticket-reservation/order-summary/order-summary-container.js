import React from 'react';
import { connect } from 'react-redux';
import { incrementAddition, decrementAddition } from '../actions';
import OrderSummary from './order-summary';

class OrderSummaryContainer extends React.Component {
  onIncrementAddition = (addition) => {
    this.props.dispatch(incrementAddition(addition));
  };

  onDecrementAddition = (addition) => {
    this.props.dispatch(decrementAddition(addition));
  };

  render() {
    const {
      addedSeats, movieSession, additions, totalPrice,
    } = this.props;
    return addedSeats.length ? <OrderSummary addedSeats={addedSeats}
                                             additions={additions}
                                             totalPrice={totalPrice}
                                             incrementAddition={this.onIncrementAddition}
                                             decrementAddition={this.onDecrementAddition}
                                             movieSession={movieSession}/> : '';
  }
}

const mapStateToProps = (state, ownProps) => ({
  addedSeats: state.ticketReservation.addedSeats,
  additions: state.ticketReservation.additions,
  totalPrice: state.ticketReservation.totalPrice,
  movieSession: ownProps.movieSession,
});

export default connect(mapStateToProps)(OrderSummaryContainer);
