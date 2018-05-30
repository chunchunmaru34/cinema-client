import React from 'react';
import { connect } from 'react-redux';

import { insertTicketToState } from '../actions';
import { authService } from '../../../services';
import { WAITING_FOR_PAYMENT } from '../constants/ticket-statuses';
import SeatsArrangement from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedMovieSession && !this.props.selectedMovieSession) {
      this.checkForAddedSeats(nextProps.selectedMovieSession.room.rows);
    }
  }

  // loop through seats and check if they reserved by user, but not added to order
  checkForAddedSeats(seats) {
    const userId = authService.getAuthenticatedUser().id;

    seats.forEach((row) => {
      row.seats.forEach((seat) => {
        if (seat.ticket) {
          const isSeatNotListed =
            seat.ticket.status === WAITING_FOR_PAYMENT &&
            seat.ticket.userId === userId &&
            !this.props.tickets.find(ticket => ticket.seatId === seat.id);

          if (isSeatNotListed) {
            const { ticket } = seat;
            delete seat.ticket;

            const payload = {
              ...ticket,
              seat,
            };

            this.props.dispatch(insertTicketToState(payload));
          }
        }
      });
    });
  }

  render() {
    const { selectedMovieSession } = this.props;
    return <SeatsArrangement movieSession={selectedMovieSession} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  movieSession: ownProps.movieSession,
  tickets: state.ticketReservation.userTickets,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
});

export default connect(mapStateToProps)(SeatsArrangementContainer);
