import React from 'react';
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
    const { movieSessions, selectedCinema, isMovieSessionsLoading } = this.props;
    return selectedCinema &&
      (
        <MovieSessionList
          data={movieSessions}
          isLoading={isMovieSessionsLoading}
        />
      );
  }
}

const mapStateToProps = (state, ownProps) => ({
  movie: state.selectedMovie.movieDetails.data,
  cinema: ownProps.cinema,
  selectedCinema: state.selectedMovie.movieSessions.selectedCinema,
  movieSessions: state.selectedMovie.movieSessions.data,
  isLoading: state.selectedMovie.isMovieSessionsLoading,
});


export default connect(mapStateToProps)(MovieSessionsListContainer);
