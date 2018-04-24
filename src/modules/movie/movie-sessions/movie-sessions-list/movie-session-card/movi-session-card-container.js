import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectMovieSession, unselectMovieSession } from '../../../../ticket-reservation/actions';
import MovieSessionCard from './movie-session-card';

class MovieSessionCardContainer extends React.Component {
  onClick = () => {
    const {
      history, match, movieSession, dispatch, selectedMovieSession,
    } = this.props;

    if (selectedMovieSession && selectedMovieSession.id === movieSession.id) {
      dispatch(unselectMovieSession());
      history.push(match.url);
    } else {
      dispatch(selectMovieSession(movieSession));
      history.push(`${match.url}/movie-sessions/${movieSession.id}`);
    }
  };

  render() {
    const { movieSession, match } = this.props;
    return (
      <MovieSessionCard
        data={movieSession}
        match={match}
        clickHandler={this.onClick}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  movieSession: ownProps.data,
  match: ownProps.match,
  selectedMovieSession: state.ticketReservation.selectedMovieSession,
});

MovieSessionCardContainer.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    seats: PropTypes.array,
    price: PropTypes.number,
    freeSeatsCount: PropTypes.number,
    roomCodeName: PropTypes.string,
  }),
};

export default withRouter(connect(mapStateToProps)(MovieSessionCardContainer));
