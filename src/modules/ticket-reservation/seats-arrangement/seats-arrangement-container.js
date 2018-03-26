import React from 'react';
import { connect } from 'react-redux';
import { finishOrdering, selectMovieSession } from '../actions';
import SeatsArrangement from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
  componentDidMount() {
    const { selectMovieSessions, movieSession, dispatch } = this.props;
    if (!selectMovieSessions) {
      dispatch(selectMovieSession(movieSession));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(finishOrdering());
  }

  render() {
    const { movieSession, isCheckingOut } = this.props;
    return <SeatsArrangement movieSession={movieSession}
                             isCheckingOut={isCheckingOut}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  movieSession: ownProps.movieSession,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
  isCheckingOut: state.ticketReservation.isCheckingOut,
});


export default connect(mapStateToProps)(SeatsArrangementContainer);
