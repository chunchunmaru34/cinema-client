import React from 'react';
import { connect } from 'react-redux';
import { addSeat } from '../actions';
import { authService } from '../../../services';
import { TEMPORARY_OCCUPIED } from '../constants/seats-statuses';
import SeatsArrangement from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
  componentDidMount() {
    const { movieSession } = this.props;
    this.checkForAddedSeats(movieSession.seats);
  }

  checkForAddedSeats(seats) {
    const userId = authService.getAuthenticatedUser().id;
    seats.forEach((row, rowNumber) => {
      row.forEach((seat, number) => {
        if (seat.status === TEMPORARY_OCCUPIED &&
            seat.occupiedBy === userId &&
            !this.props.addedSeats.find(item => item._id === seat._id)
        ) {
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
    const { movieSession, isMovieSessionsLoading } = this.props;
    return <SeatsArrangement movieSession={movieSession}
                             isMovieSessionsLoading={isMovieSessionsLoading}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  movieSession: ownProps.movieSession,
  addedSeats: state.ticketReservation.order.addedSeats,
  isMovieSessionsLoading: state.selectedMovie.movieSessions.isMovieSessionsLoading,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
});

export default connect(mapStateToProps)(SeatsArrangementContainer);
