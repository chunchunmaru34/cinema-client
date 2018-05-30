import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { checkout, refreshMovieSession, confirmOrder } from '../actions';
import OrderSummary from './order-summary';

class OrderSummaryContainer extends React.Component {
  onCheckout = () => {
    const { tickets, dispatch, selectedMovieSession } = this.props;

    dispatch(checkout());
    dispatch(confirmOrder(tickets));

    setTimeout(() => dispatch(refreshMovieSession(selectedMovieSession)), 200);
  };

  render() {
    const {
      movieSession, isCheckingOut, tickets,
    } = this.props;
    return tickets.length
      ? <OrderSummary
           tickets={tickets}
           checkout={this.onCheckout}
           isCheckingOut={isCheckingOut}
           movieSession={movieSession}
      />
      : null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  tickets: state.ticketReservation.userTickets,
  isCheckingOut: state.ticketReservation.isCheckingOut,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
  movieSession: ownProps.movieSession,
});

OrderSummaryContainer.propTypes = {
  order: PropTypes.shape({
    transactionId: PropTypes.string,
    addedSeats: PropTypes.array,
    additions: PropTypes.object,
    ticket: PropTypes.shape({
      user: PropTypes.string,
      movieSession: PropTypes.string,
      createdAd: PropTypes.string,
    }),
    movieSession: PropTypes.shape({
      roomCodeName: PropTypes.string,
      date: PropTypes.string,
      price: PropTypes.number,
      cinema: PropTypes.object,
      movie: PropTypes.object,
      additions: PropTypes.array,
      seat: PropTypes.array,
    }),
  }),
  isCheckingOut: PropTypes.bool,
};

export default connect(mapStateToProps)(OrderSummaryContainer);
