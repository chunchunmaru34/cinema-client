import React from 'react';
import { connect } from 'react-redux';
import SeatsArrangement from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
  render() {
    const { movieSession, selectedMovieSession, isMovieSessionsLoading } = this.props;
    return selectedMovieSession &&
      <SeatsArrangement movieSession={movieSession}
                        isMovieSessionsLoading={isMovieSessionsLoading}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  movieSession: ownProps.movieSession,
  isMovieSessionsLoading: state.selectedMovie.movieSessions.isMovieSessionsLoading,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
});

export default connect(mapStateToProps)(SeatsArrangementContainer);
