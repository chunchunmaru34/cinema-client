import React from 'react';
import { connect } from 'react-redux';
import MovieList from './movie-list';
import LoadingBar from '../../util-component/loading-bar';
import { fetchMovies } from './actions';

class MovieListContainer extends React.Component {
  componentDidMount() {
    if (!this.props.movies) this.refreshMovies();
  }

  refreshMovies = () => {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  };

  render() {
    const { movies, isLoading } = this.props;
    const component = <MovieList refreshMovies={this.refreshMovies}
                                 movies={movies}/>;
    const loading = <LoadingBar isLoading={isLoading}/>;
    return isLoading ? loading : component;
  }
}

const mapStateToProps = state => ({
  movies: state.movieList.data,
  isLoading: state.movieList.isLoading,
});

export default connect(mapStateToProps)(MovieListContainer);

