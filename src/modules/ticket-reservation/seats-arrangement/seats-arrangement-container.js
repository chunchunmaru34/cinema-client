import React from 'react';
import { connect } from 'react-redux';

import { addSeat, removeSeat } from '../actions';
import { authService } from '../../../services';
import { TEMPORARY_OCCUPIED } from '../constants/seats-statuses';
import SeatsArrangement from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.selectedMovieSession && nextProps.selectedMovieSession) {
      // Check only after session was initially loaded
      this.checkForAddedSeats(nextProps.selectedMovieSession.seats);
    } else {
      // Check only after session refresh
      this.checkForUnavailableSeats(nextProps.selectedMovieSession.seats);
    }
  }

  // loop through seats and check if they reserved by user, but not added to order
  checkForAddedSeats(seats) {
    const userId = authService.getAuthenticatedUser().id;

    seats.forEach((row, rowNumber) => {
      row.forEach((seat, number) => {
        const isSeatNotListed =
          seat.status === TEMPORARY_OCCUPIED &&
          seat.occupiedBy === userId &&
          !this.props.addedSeats.find(item => item._id === seat._id);

        if (isSeatNotListed) {
          const payload = {
            ...seat,
            number,
            rowNumber,
          };
          this.props.dispatch(addSeat(payload));
        }
      });
    });
  }

  // loop through seats and check if they added to order by user,
  // but were already reserved by other users in refresh interval
  checkForUnavailableSeats(seats) {
    const userId = authService.getAuthenticatedUser().id;

    seats.forEach((row, rowNumber) => {
      row.forEach((seat, number) => {
        const isSeatListed =
          seat.status === TEMPORARY_OCCUPIED &&
          seat.occupiedBy !== userId &&
          this.props.addedSeats.find(item => item._id === seat._id);

        if (isSeatListed) {
          const payload = {
            ...seat,
            number,
            rowNumber,
          };
          this.props.dispatch(removeSeat(payload));
        }
      });
    });
  }

  render() {
    const { selectedMovieSession } = this.props;
    return <SeatsArrangement movieSession={selectedMovieSession}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  movieSession: ownProps.movieSession,
  addedSeats: state.ticketReservation.order.addedSeats,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
});

export default connect(mapStateToProps)(SeatsArrangementContainer);
