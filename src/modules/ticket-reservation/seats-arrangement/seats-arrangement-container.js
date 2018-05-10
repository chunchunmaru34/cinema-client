import React from 'react';
import { connect } from 'react-redux';

import { addSeat } from '../actions';
import { authService } from '../../../services';
import { TEMPORARY_OCCUPIED } from '../constants/seats-statuses';
import SeatsArrangement from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { selectedMovieSession } = nextProps;
    if (!this.props.selectedMovieSession && selectedMovieSession) {
      this.checkForAddedSeats(selectedMovieSession.seats);
    }
  }

  checkForAddedSeats(seats) {
    const userId = authService.getAuthenticatedUser().id;

    // loop through seats and check if they reserved by user, but not added to order
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
