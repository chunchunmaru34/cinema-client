import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementAddition, decrementAddition } from '../../actions';
import Addition from './addition';

class AdditionContainer extends React.Component {
  onIncrement = () => {
    const { dispatch, data } = this.props;
    dispatch(incrementAddition(data));
  };

  onDecrement = () => {
    const { dispatch, data, count } = this.props;
    if (count === 0) return;
    dispatch(decrementAddition(data));
  };

  render() {
    const { data, count } = this.props;
    return <Addition data={data}
                     count={count}
                     increment={this.onIncrement}
                     decrement={this.onDecrement}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.data,
  count: state.ticketReservation.order.additions[ownProps.data.addition.name],
});

AdditionContainer.propTypes = {
  data: PropTypes.shape({
    addition: PropTypes.shape({
      name: PropTypes.string,
    }),
    price: PropTypes.number,
  }),
  count: PropTypes.number,
};

export default connect(mapStateToProps)(AdditionContainer);

