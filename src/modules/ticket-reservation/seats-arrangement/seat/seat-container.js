import React from 'react';
import { connect } from 'react-redux';
import { addSeat, removeSeat } from '../../actions';
import Seat from './seat';

class SeatContainer extends React.Component {
  onAddSeat = (seat) => {
    this.props.dispatch(addSeat(seat));
  };

  onRemoveSeat = (seat) => {
    this.props.dispatch(removeSeat(seat));
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
});

export default connect(mapStateToProps)(SeatContainer);
