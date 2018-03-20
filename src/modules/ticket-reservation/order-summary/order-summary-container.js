import React from 'react';
import { connect } from 'react-redux';
import OrderSummary from './order-summary';

class OrderSummaryContainer extends React.Component {
  render() {
    console.log(this.props.movieSession);
    const { addedSeats, movieSession } = this.props;
    return addedSeats.length ? <OrderSummary addedSeats={addedSeats} movieSession={movieSession}/> : '';
  }
}

const mapStateToProps = (state, ownProps) => ({
  addedSeats: state.ticketReservation.addedSeats,
  movieSession: ownProps.movieSession,
});

export default connect(mapStateToProps)(OrderSummaryContainer);
