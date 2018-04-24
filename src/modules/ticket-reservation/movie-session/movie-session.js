import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectMovieSession, clearState } from '../actions';
import { refreshMovieSession } from '../../movie/movie-sessions/actions';
import SeatsArrangement from '../seats-arrangement/seats-arrangement-container';
import OrderPayment from '../order-payment/order-payment-container';

class MovieSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = { timer: null };
  }

  componentDidMount() {
    const { selectedMovieSession, movieSession, dispatch } = this.props;
    if (!selectedMovieSession) {
      dispatch(selectMovieSession(movieSession));
    }

    const timer = setInterval(() => dispatch(refreshMovieSession(movieSession)), 10000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    const { dispatch, movieSession } = this.props;
    dispatch(clearState(movieSession));
    clearInterval(this.state.timer);
  }

  render() {
    const { isCheckingOut, movieSession, selectedMovieSession } = this.props;

    if (!selectedMovieSession) return null;

    return isCheckingOut ?
      <OrderPayment/>
      :
      <SeatsArrangement movieSession={movieSession}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  isCheckingOut: state.ticketReservation.isCheckingOut,
  movieSession: ownProps.movieSession,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
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
