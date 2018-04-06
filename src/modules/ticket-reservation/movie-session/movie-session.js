import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearState } from '../actions';
import SeatsArrangement from '../seats-arrangement/seats-arrangement-container';
import OrderPayment from '../order-payment/order-payment-container';

class MovieSession extends React.Component {
  componentWillUnmount() {
    this.props.dispatch(clearState());
  }

  render() {
    const { isCheckingOut, movieSession } = this.props;
    return isCheckingOut ? <OrderPayment/> : <SeatsArrangement movieSession={movieSession}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCheckingOut: state.ticketReservation.isCheckingOut,
  movieSession: ownProps.movieSession,
});

MovieSession.propTypes = {
  movieSession: PropTypes.shape({
    roomCodeName: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.number,
    cinema: PropTypes.object,
    movie: PropTypes.object,
    additions: PropTypes.array,
    seat: PropTypes.array,
  }),
};

export default connect(mapStateToProps)(MovieSession);
