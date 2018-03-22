import React from 'react';
import styles from './styles.scss';

export default class Seat extends React.Component {
  NORMAL_SEAT_WIDTH = 40;

  constructor(props) {
    super(props);
    this.state = { selected: false };
  }

  handleSelect = () => {
    const {
      addSeat, removeSeat, data, index, rowIndex,
    } = this.props;
    if (this.props.data.status === 'occupied') return;
    const seat = {
      ...data,
      number: index + 1,
      rowNumber: rowIndex + 1,
    };
    if (this.state.selected) {
      removeSeat(seat);
    } else {
      addSeat(seat);
    }
    this.setState({ selected: !this.state.selected });
  };

  render() {
    const { index, data } = this.props;
    return (
      <div className={`${styles.container} ${styles[data.status]} ${styles[data.name]}
        ${this.state.selected && styles.selected}`}
           onClick={this.handleSelect}
           style={{
             minWidth: `${this.NORMAL_SEAT_WIDTH * data.space}px`,
           }}>
        <div>{index + 1}</div>
        <div>{data.space > 1 && data.name}</div>
      </div>
    );
  }
}
