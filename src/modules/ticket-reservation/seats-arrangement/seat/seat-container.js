import React from 'react';
import { connect } from 'react-redux';
import { addSeat, removeSeat } from '../../actions';
import { authService, ticketService } from '../../../../services';
import Seat from './seat';

class SeatContainer extends React.Component {
  componentDidMount() {
    const {
      data, dispatch, rowIndex, index,
    } = this.props;
    const { id } = authService.getAuthenticatedUser();
    if (data.status === 'temporaryOccupied' && data.occupiedBy === id) {
      const payload = {
        ...data,
        number: index,
        rowNumber: rowIndex,
      };
      dispatch(addSeat(payload));
    }
  }

  onAddSeat = (seat) => {
    this.props.dispatch(addSeat(seat));
    const { movieSession } = this.props;
    ticketService.reserveSeat({ seat, movieSession });
  };

  onRemoveSeat = (seat) => {
    this.props.dispatch(removeSeat(seat));
    const { movieSession } = this.props;
    ticketService.unreserveSeat({ seat, movieSession });
  };

  render() {
    const {
      data, index, rowIndex, addedSeats,
    } = this.props;
    return <Seat data={data}
                 addedSeats={addedSeats}
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

export default connect(mapStateToProps)(SeatContainer);
