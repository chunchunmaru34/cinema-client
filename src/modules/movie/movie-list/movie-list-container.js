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
    const { movies, isLoading } = this.props;
    return (
      <MovieList
        refreshMovies={this.refreshMovies}
        isLoading={isLoading}
        movies={movies}
      />
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movieList.data,
  isLoading: state.movieList.isLoading,
});

export default connect(mapStateToProps)(MovieListContainer);

