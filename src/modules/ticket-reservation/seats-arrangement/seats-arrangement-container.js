import React from 'react';
import { connect } from 'react-redux';
import SeatsArrangements from './seats-arrangement';

class SeatsArrangementContainer extends React.Component {
  render() {
    const { cinema, movieSession } = this.props;
    return cinema && movieSession && <SeatsArrangements cinema={cinema}
                                                        movieSession={movieSession}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  cinema: state.selectedMovie.movieSessions.selectedCinema,
  movieSession: ownProps.data,
});

export default connect(mapStateToProps)(SeatsArrangementContainer);
