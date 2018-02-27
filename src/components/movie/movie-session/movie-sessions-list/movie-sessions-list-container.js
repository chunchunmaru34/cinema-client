import React from 'react';
import { connect } from 'react-redux';
import MovieSessionList from './movie-sessions-list';
import { fetchMovieSessionsForCinema } from '../actions';

class MovieSessionsListContainer extends React.Component {
  componentDidMount() {
    const { dispatch, cinema, movie } = this.props;
    if (movie && cinema) dispatch(fetchMovieSessionsForCinema(cinema.id, movie.id));
  }

  render() {
    console.log(this.props.movieSessions);
    return this.props.movieSessions ?
      <MovieSessionList data={this.props.movieSessions}
                        clickHandler={this.clickHandler}
      /> : '';
  }
}

const mapStateToProps = state => ({
  movie: state.selectedMovie.movieDetails.data,
  cinema: state.selectedMovie.movieSessions.selectedCinema,
  movieSessions: state.selectedMovie.movieSessions.data,
});


export default connect(mapStateToProps)(MovieSessionsListContainer);
