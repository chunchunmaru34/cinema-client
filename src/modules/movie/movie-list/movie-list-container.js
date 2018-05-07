import React from 'react';
import { connect } from 'react-redux';
import MovieList from './movie-list';
import { fetchMovies, clearState, moviesReceived } from './actions';

class MovieListContainer extends React.Component {
  componentDidMount() {
    const { movies, dispatch } = this.props;
    if (!movies) {
      this.refreshMovies();
    } else {
      dispatch(moviesReceived(movies));
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearState());
  }

  refreshMovies = () => {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  };

  render() {
    const { movies } = this.props;
    return (
      <MovieList
        refreshMovies={this.refreshMovies}
        movies={movies}
      />
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movieList.data,
});

export default connect(mapStateToProps)(MovieListContainer);

