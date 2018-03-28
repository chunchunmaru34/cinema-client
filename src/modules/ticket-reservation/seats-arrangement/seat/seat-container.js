import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSeat, removeSeat } from '../../actions';
import { authService, ticketService } from '../../../../services';
import Seat from './seat';
import { TEMPORARY_OCCUPIED } from '../../constants/seats-statuses';

class SeatContainer extends React.Component {
  componentDidMount() {
    const {
      data, dispatch, rowIndex, index,
    } = this.props;
    const { id } = authService.getAuthenticatedUser();
    if (data.status === TEMPORARY_OCCUPIED && data.occupiedBy === id) {
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

SeatContainer.propTypes = {
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
  }),
  addedSeats: PropTypes.arrayOf({
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
  }),
  index: PropTypes.number,
  rowIndex: PropTypes.number,
};

export default connect(mapStateToProps)(SeatContainer);
