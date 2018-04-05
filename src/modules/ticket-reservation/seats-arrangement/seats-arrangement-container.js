import React from 'react';
import { connect } from 'react-redux';
import { selectMovieSession } from '../actions';
import SeatsArrangement from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
  componentDidMount() {
    const { selectMovieSessions, movieSession, dispatch } = this.props;
    if (!selectMovieSessions) {
      dispatch(selectMovieSession(movieSession));
    }
  }

  render() {
    const { movieSession, selectedMovieSession } = this.props;
    return selectedMovieSession && <SeatsArrangement movieSession={movieSession}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  movieSession: ownProps.movieSession,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
});


export default connect(mapStateToProps)(SeatsArrangementContainer);
