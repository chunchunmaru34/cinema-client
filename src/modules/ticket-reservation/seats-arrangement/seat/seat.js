import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { authService } from '../../../../services';
import { OCCUPIED, TEMPORARY_OCCUPIED } from '../../constants/seats-statuses';

export default class Seat extends React.Component {
  NORMAL_SEAT_WIDTH = 40;

  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  componentWillReceiveProps(nextProps) {
    const selected = !!nextProps.addedSeats.find(item => item._id === nextProps.data._id);
    this.setState({ selected });
  }

  handleSelect = () => {
    const {
      addSeat, removeSeat, data, index, rowIndex,
    } = this.props;
    if (data.status === OCCUPIED) return;
    if (data.status === TEMPORARY_OCCUPIED) {
      if (data.occupiedBy !== authService.getAuthenticatedUser().id) return;
    }

    const seat = {
      ...data,
      number: index,
      rowNumber: rowIndex,
    };

    if (this.state.selected) {
      removeSeat(seat);
    } else {
      addSeat(seat);
    }
  };

  render() {
    const { index, data } = this.props;
    return (
      <div className={`${styles.container} ${styles[data.status]} ${styles[data.kind.name]}
        ${this.state.selected && styles.selected}`}
           onClick={this.handleSelect}
           style={{
             minWidth: `${this.NORMAL_SEAT_WIDTH * data.kind.space}px`,
           }}>
        <div>{index + 1}</div>
        <div>{data.kind.space > 1 && data.kind.displayName}</div>
      </div>
    );
  }
}

Seat.propTypes = {
  addSeat: PropTypes.func,
  removeSeat: PropTypes.func,
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
  movieSession: PropTypes.shape({
    roomCodeName: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.number,
    cinema: PropTypes.object,
    movie: PropTypes.object,
    additions: PropTypes.array,
    seat: PropTypes.array,
  }),
  index: PropTypes.number,
  rowIndex: PropTypes.number,
};
