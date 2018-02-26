import { connect } from 'react-redux';
import React from 'react';
import MovieList from './movie-list';
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
    return this.props.movies ? <MovieList refreshMovies={this.refreshMovies}
                                          movies={this.props.movies}/> : '';
  }
}

const mapStateToProps = state => ({
  movies: state.movieList.data,
});

export default connect(mapStateToProps)(MovieListContainer);

