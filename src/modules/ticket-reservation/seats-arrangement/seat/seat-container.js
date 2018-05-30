import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createTicket, deleteTicket, refreshMovieSession } from '../../actions';
import { PAID, WAITING_FOR_PAYMENT } from '../../constants/ticket-statuses';
import Seat from './seat';

class SeatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  componentDidMount() {
    const { tickets, data } = this.props;
    this.checkIfSeatSelected({ tickets, data });
  }

  componentWillReceiveProps(nextProps) {
    this.checkIfSeatSelected(nextProps);
  }

  checkIfSeatSelected({ tickets, data }) {
    const selected = !!tickets.find(ticket => ticket.seatId === data.id);
    this.setState({ selected });
  }

  onAddSeat = (seat) => {
    const {
      movieSession, dispatch, user, tickets,
    } = this.props;

    if (tickets.find(ticket => ticket.seatId === seat.id)) return;

    const ticket = {
      userId: user.id,
      movieSessionId: movieSession.id,
      seatId: seat.id,
    };

    dispatch(createTicket(ticket));
    setTimeout(() => dispatch(refreshMovieSession(movieSession)), 200);
  };

  onRemoveSeat = (seat) => {
    const { movieSession, dispatch, tickets } = this.props;

    const ticket = tickets.find(item => item.seatId === seat.id);

    dispatch(deleteTicket(ticket));

    setTimeout(() => dispatch(refreshMovieSession(movieSession)), 200);
  };

  handleSelect = () => {
    const { data, user } = this.props;

    if (data.ticket) {
      const isSeatOccupied = data.ticket.status === PAID;
      const isSeatNotReservedByUser =
        data.ticket.status === WAITING_FOR_PAYMENT
        && data.ticket.userId !== user.id;

      if (isSeatOccupied || isSeatNotReservedByUser) {
        return;
      }
    }

    if (this.state.selected) {
      this.onRemoveSeat(data);
    } else {
      this.onAddSeat(data);
    }
  };

  render() {
    const {
      data, index, rowIndex,
    } = this.props;
    return (
      <Seat
        data={data}
        selected={this.state.selected}
        index={index}
        rowIndex={rowIndex}
        handleSelect={this.handleSelect}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.data,
  index: ownProps.index,
  rowIndex: ownProps.rowIndex,
  user: state.auth.user,
  tickets: state.ticketReservation.userTickets,
  movieSession: state.ticketReservation.selectedMovieSession,
});

SeatContainer.propTypes = {
  tickets: PropTypes.array,
  data: PropTypes.shape({
    kind: PropTypes.shape({
      name: PropTypes.string,
      displayName: PropTypes.string,
      space: PropTypes.number,
      priceMultiplier: PropTypes.number,
    }),
    status: PropTypes.string,
    occupiedUntil: PropTypes.string,
    occupiedBy: PropTypes.string,
  }),
  addedSeats: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf({
      kind: PropTypes.shape({
        name: PropTypes.string,
        displayName: PropTypes.string,
        space: PropTypes.number,
        priceMultiplier: PropTypes.number,
      }),
      status: PropTypes.string,
      occupiedUntil: PropTypes.string,
      occupiedBy: PropTypes.string,
      number: PropTypes.number,
      rowNumber: PropTypes.number,
    }),
  })),
  index: PropTypes.number,
  rowIndex: PropTypes.number,
};

export default connect(mapStateToProps)(SeatContainer);
