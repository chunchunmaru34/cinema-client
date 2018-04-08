import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSeat, removeSeat } from '../../actions';
import { ticketService } from '../../../../services';
import Seat from './seat';
import { refreshMovieSession } from '../../../movie/movie-sessions/actions';

class SeatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  componentDidMount() {
    this.checkIfSeatAlreadySelected(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkIfSeatAlreadySelected(nextProps);
  }

  checkIfSeatAlreadySelected({ addedSeats, data }) {
    const selected = !!addedSeats.find(item => item._id === data._id);
    this.setState({ selected });
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

  render() {
    const {
      data, index, rowIndex,
    } = this.props;
    return <Seat data={data}
                 selected={this.state.selected}
                 index={index}
                 rowIndex={rowIndex}
                 addSeat={this.onAddSeat}
                 removeSeat={this.onRemoveSeat}/>;
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
