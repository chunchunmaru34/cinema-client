import React from 'react';
import { connect } from 'react-redux';
import MovieList from './movie-list';
import LoadingBar from '../../utils/loading-bar';
import { fetchMovies, clearError } from './actions';

class MovieListContainer extends React.Component {
  componentDidMount() {
    if (!this.props.movies) this.refreshMovies();
  }

  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  refreshMovies = () => {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  };

  render() {
    const { movies, isLoading, error } = this.props;
    if (error) return <div className="alert alert-danger">{error}</div>;
    const component = <MovieList refreshMovies={this.refreshMovies}
                                 movies={movies}/>;
    const loading = <LoadingBar isLoading={isLoading}/>;
    return isLoading ? loading : component;
  }
}

const mapStateToProps = state => ({
  movies: state.movieList.data,
  isLoading: state.movieList.isLoading,
  error: state.movieList.error,
});

export default connect(mapStateToProps)(MovieListContainer);

