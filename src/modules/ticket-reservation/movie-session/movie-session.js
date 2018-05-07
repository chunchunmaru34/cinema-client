import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearState, refreshMovieSession, requestAndSelectMovieSession } from '../actions';
import SeatsArrangement from '../seats-arrangement/seats-arrangement-container';
import OrderPayment from '../order-payment/order-payment-container';

class MovieSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timer: null };
  }

  componentDidMount() {
    const {
      movieSession, isMovieSessionLoading, selectedMovieSession, dispatch,
    } = this.props;

    setTimeout(() => {
      if (!selectedMovieSession && !isMovieSessionLoading) {
        dispatch(requestAndSelectMovieSession(movieSession));
      }
    }, 2000);

    const timer = setInterval(() => dispatch(refreshMovieSession(movieSession)), 5000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    const { dispatch, movieSession } = this.props;
    dispatch(clearState(movieSession));
    clearInterval(this.state.timer);
  }

  render() {
    const { isCheckingOut, selectedMovieSession } = this.props;

    return isCheckingOut
      ? <OrderPayment/>
      : <SeatsArrangement movieSession={selectedMovieSession}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCheckingOut: state.ticketReservation.isCheckingOut,
  movieSession: ownProps.movieSession,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
  isMovieSessionLoading: state.ticketReservation.isMovieSessionLoading,
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
