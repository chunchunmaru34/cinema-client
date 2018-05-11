import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { checkout } from '../actions';
import OrderSummary from './order-summary';

class OrderSummaryContainer extends React.Component {
  onCheckout = () => {
    this.props.dispatch(checkout());
  };

  render() {
    const {
      movieSession, order, isCheckingOut,
    } = this.props;
    return order.addedSeats.length
      ? <OrderSummary
           order={order}
           checkout={this.onCheckout}
           isCheckingOut={isCheckingOut}
           movieSession={movieSession}
      />
      : null;
  }
}

const mapStateToProps = (state, ownProps) => ({
  order: state.ticketReservation.order,
  isCheckingOut: state.ticketReservation.isCheckingOut,
  movieSession: ownProps.movieSession,
});

OrderSummaryContainer.propTypes = {
  order: PropTypes.shape({
    transactionId: PropTypes.string,
    addedSeats: PropTypes.array,
    additions: PropTypes.object,
    ticket: PropTypes.shape({
      user: PropTypes.string,
      movieSession: PropTypes.string,
      createdAd: PropTypes.string,
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
  }),
  isCheckingOut: PropTypes.bool,
};

export default connect(mapStateToProps)(OrderSummaryContainer);
