import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addSeat, removeSeat, refreshMovieSession } from '../../actions';
import { ticketService, authService } from '../../../../services';
import { OCCUPIED, AVAILABLE, TEMPORARY_OCCUPIED } from '../../constants/seats-statuses';
import Seat from './seat';

class SeatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  componentDidMount() {
    const { addedSeats, data } = this.props;
    this.checkIfSeatAlreadySelected({ addedSeats, data });
  }

  componentWillReceiveProps(nextProps) {
    this.checkIfSeatAlreadySelected(nextProps);
    this.checkIfSeatExpired(nextProps);
  }

  checkIfSeatAlreadySelected({ addedSeats, data }) {
    const selected = !!addedSeats.find(item => item._id === data._id);
    this.setState({ selected });
  }

  checkIfSeatExpired({
    data, addedSeats, rowIndex, index, dispatch,
  }) {
    const oldSeat = this.props.data;

    const isSeatExpired =
      oldSeat.status === TEMPORARY_OCCUPIED &&
      data.status === AVAILABLE &&
      addedSeats.find(item => item._id === data._id);

    if (isSeatExpired) {
      const payload = {
        ...data,
        rowNumber: rowIndex,
        number: index,
      };
      dispatch(removeSeat(payload));
      this.setState({ selected: false });
    }
  }

  onAddSeat = (seat) => {
    const {
      movieSession, dispatch, addedSeats, data,
    } = this.props;

    if (addedSeats.find(item => item._id === data._id)) return;

    dispatch(addSeat(seat));
    ticketService.reserveSeat({ seat, movieSession });
    setTimeout(() => dispatch(refreshMovieSession(movieSession)), 100);
  };

  onRemoveSeat = (seat) => {
    const { movieSession, dispatch } = this.props;
    dispatch(removeSeat(seat));
    ticketService.unreserveSeat({ seat, movieSession });
    setTimeout(() => dispatch(refreshMovieSession(movieSession)), 100);
  };

  handleSelect = () => {
    const { data, index, rowIndex } = this.props;

    const isSeatOccupied = data.status === OCCUPIED;
    const isSeatNotReservedByUser =
      data.status === TEMPORARY_OCCUPIED
      && data.occupiedBy !== authService.getAuthenticatedUser().id;
    if (isSeatOccupied || isSeatNotReservedByUser) {
      return;
    }

    const seat = {
      ...data,
      number: index,
      rowNumber: rowIndex,
    };

    if (this.state.selected) {
      this.onRemoveSeat(seat);
    } else {
      this.onAddSeat(seat);
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
  addedSeats: state.ticketReservation.order.addedSeats,
  movieSession: state.ticketReservation.selectedMovieSession,
});

SeatContainer.propTypes = {
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
