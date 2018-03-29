import React from 'react';
import { connect } from 'react-redux';
import MovieSessionList from './movie-sessions-list';
import { fetchMovieSessionsForCinema, selectCinema } from '../actions';

class MovieSessionsListContainer extends React.Component {
  FETCH_REFRESH_RATE = 5000;

  componentDidMount() {
    const {
      dispatch, cinema, selectedCinema, movie,
    } = this.props;
    if (!selectedCinema) {
      dispatch(selectCinema(cinema));
    }
    dispatch(fetchMovieSessionsForCinema(cinema.id, movie.id));

    const interval = setInterval(
      () => dispatch(fetchMovieSessionsForCinema(cinema.id, movie.id)),
      this.FETCH_REFRESH_RATE,
    );
    this.setState({ interval });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return this.props.movieSessions ?
      <MovieSessionList data={this.props.movieSessions}/> : 'Loading';
  }
}

const mapStateToProps = (state, ownProps) => ({
  movie: state.selectedMovie.movieDetails.data,
  cinema: ownProps.cinema,
  selectedCinema: state.selectedMovie.movieSessions.selectedCinema,
  movieSessions: state.selectedMovie.movieSessions.data,
});


export default connect(mapStateToProps)(MovieSessionsListContainer);
