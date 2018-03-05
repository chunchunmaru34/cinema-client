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
    const component = <MovieList refreshMovies={this.refreshMovies}
                                 movies={this.props.movies}/>;
    const loadingMessage = 'Loading';
    return this.props.movies ? component : loadingMessage;
  }
}

const mapStateToProps = state => ({
  movies: state.movieList.data,
});

export default connect(mapStateToProps)(MovieListContainer);

