import React from 'react';
import { connect } from 'react-redux';
import { addSeat, removeSeat } from '../actions';
import Seat from './seat';

class SeatContainer extends React.Component {
  addSeat = (seat) => {
    this.props.dispatch(addSeat(seat));
  };

  removeSeat = (seat) => {
    this.props.dispatch(removeSeat(seat));
  };

  render() {
    const { data, index, rowIndex } = this.props;
    return <Seat data={data}
                 index={index}
                 rowIndex={rowIndex}
                 addSeat={this.addSeat}
                 removeSeat={this.removeSeat}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.data,
  index: ownProps.index,
  rowIndex: ownProps.rowIndex,
});

export default connect(mapStateToProps)(SeatContainer);
