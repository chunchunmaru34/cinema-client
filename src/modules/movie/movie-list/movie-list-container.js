import React from 'react';
import { connect } from 'react-redux';
import MovieList from './movie-list';
import LoadingBar from '../../util-components/loading-bar';
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
    const component = (
      <MovieList
        refreshMovies={this.refreshMovies}
        movies={movies}
      />
    );
    const loading = <LoadingBar/>;
    return isLoading ? loading : component;
  }
}

const mapStateToProps = state => ({
  movies: state.movieList.data,
  isLoading: state.movieList.isLoading,
});

export default connect(mapStateToProps)(MovieListContainer);

