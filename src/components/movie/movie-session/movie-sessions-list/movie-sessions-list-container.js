import React from 'react';
import { connect } from 'react-redux';
import MovieSessionList from './movie-sessions-list';
import { fetchMovieSessionsForCinema } from '../actions';

class MovieSessionsListContainer extends React.Component {
  componentDidMount() {
    const { dispatch, cinema, movie } = this.props;
    dispatch(fetchMovieSessionsForCinema(cinema.id, movie.id));
  }

  render() {
    return this.props.movieSessions ?
      <MovieSessionList data={this.props.movieSessions}/> : 'Loading';
  }
}

const mapStateToProps = (state, ownProps) => ({
  movie: state.selectedMovie.movieDetails.data,
  cinema: ownProps.cinema,
  movieSessions: state.selectedMovie.movieSessions.data,
});


export default connect(mapStateToProps)(MovieSessionsListContainer);
