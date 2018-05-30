import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { incrementAddition, decrementAddition } from '../../actions';
import Addition from './addition';

class AdditionContainer extends React.Component {
  onIncrement = () => {
    const { dispatch, data, ticket } = this.props;
    dispatch(incrementAddition({ movieSessionAddition: data, ticket }));
  };

  onDecrement = () => {
    const { dispatch, data, ticket } = this.props;
    dispatch(decrementAddition({ movieSessionAddition: data, ticket }));
  };

  render() {
    const { data, ticket } = this.props;
    const ticketAddition = ticket.ticketAdditions
      .find(item => item.movieSessionAdditionId === data.id);
    return (
      <Addition
        data={data}
        ticketAddition={ticketAddition}
        increment={this.onIncrement}
        decrement={this.onDecrement}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: ownProps.data,
  ticket: ownProps.ticket,
});

AdditionContainer.propTypes = {
  data: PropTypes.shape({
    additionalService: PropTypes.shape({
      name: PropTypes.string,
    }),
    price: PropTypes.number,
  }),
  count: PropTypes.number,
};

export default connect(mapStateToProps)(AdditionContainer);

