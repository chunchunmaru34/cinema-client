import React from 'react';
import { connect } from 'react-redux';
import MovieSessionList from './movie-sessions-list';
import { fetchMovieSessionsForCinema, selectCinema } from '../actions';
import LoadingBar from '../../../util-components/loading-bar/index';

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
    const { movieSessions } = this.props;
    return movieSessions ?
      <MovieSessionList data={movieSessions}/>
      :
      <LoadingBar/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  movie: state.selectedMovie.movieDetails.data,
  cinema: ownProps.cinema,
  selectedCinema: state.selectedMovie.movieSessions.selectedCinema,
  movieSessions: state.selectedMovie.movieSessions.data,
});


export default connect(mapStateToProps)(MovieSessionsListContainer);
