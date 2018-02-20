import { connect } from 'react-redux';
import React from 'react';
import MovieList from './movie-list';
import { fetchMovies } from '../../../actions/index';

class MovieListContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMovies());
  }

  render() {
    return this.props.movies ? <MovieList movies={this.props.movies}/> : '';
  }
}

const mapStateToProps = state => ({
  movies: state.movies.data,
});

export default connect(mapStateToProps)(MovieListContainer);

