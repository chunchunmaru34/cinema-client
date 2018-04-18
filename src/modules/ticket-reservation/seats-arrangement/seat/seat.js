import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { authService } from '../../../../services';
import { OCCUPIED, TEMPORARY_OCCUPIED } from '../../constants/seats-statuses';

export default class Seat extends React.Component {
  handleSelect = () => {
    const {
      addSeat, removeSeat, data, index, rowIndex, selected,
    } = this.props;

    if (data.status === OCCUPIED) return;
    if (data.status === TEMPORARY_OCCUPIED &&
        data.occupiedBy !== authService.getAuthenticatedUser().id
    ) {
      return;
    }

    const seat = {
      ...data,
      number: index,
      rowNumber: rowIndex,
    };

    if (selected) {
      removeSeat(seat);
    } else {
      addSeat(seat);
    }
  };

  render() {
    const { index, data, selected } = this.props;
    return (
      <div className={`${styles.container} ${styles[data.status]} ${styles[data.kind.name]}
        ${selected && styles.selected}`}
           onClick={this.handleSelect}>
        <div>{index + 1}</div>
        <div>
          <small>{data.kind.name !== 'common' && data.kind.displayName}</small>
        </div>
      </div>
    );
  }
}

Seat.propTypes = {
  addSeat: PropTypes.func,
  removeSeat: PropTypes.func,
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
