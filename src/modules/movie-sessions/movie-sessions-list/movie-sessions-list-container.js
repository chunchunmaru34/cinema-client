import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MovieSessionList from './movie-sessions-list';
import { fetchMovieSessionsForCinema, selectCinema } from '../actions';

class MovieSessionsListContainer extends React.Component {
  componentDidMount() {
    const {
      dispatch, cinema, selectedCinema, movie,
    } = this.props;

    if (!selectedCinema) {
      dispatch(selectCinema(cinema));
    }

    dispatch(fetchMovieSessionsForCinema({ cinemaId: cinema.id, movieId: movie.id }));
  }

  render() {
    const { movieSessions, selectedCinema, isLoading } = this.props;
    return selectedCinema && (
      <MovieSessionList
        data={movieSessions}
        isLoading={isLoading}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  movie: state.selectedMovie.movieDetails.data,
  cinema: ownProps.cinema,
  selectedCinema: state.selectedMovie.movieSessions.selectedCinema,
  movieSessions: state.selectedMovie.movieSessions.data,
  isLoading: state.selectedMovie.movieSessions.isMovieSessionsLoading,
});

MovieSessionsListContainer.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    startShowDate: PropTypes.string,
    endShowDate: PropTypes.string,
    posterUrl: PropTypes.string,
    rating: PropTypes.number,
    year: PropTypes.number,
  }),
  cinema: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rooms: PropTypes.array,
  }),
  movieSessions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    price: PropTypes.number,
    freeSeatsCount: PropTypes.number,
    roomCodeName: PropTypes.string,
  })),
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(MovieSessionsListContainer);
