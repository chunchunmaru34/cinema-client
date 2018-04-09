import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from '../../util-components/loading-bar';
import { fetchMovieDetails, movieDetailsReceived } from './actions';
import MovieDetails from './movie-details';

class MovieDetailsContainer extends React.Component {
  componentDidMount() {
    /* If movie list was not passed from movie-list (e.g. open page from direct link),
    load movie manually */
    const { dispatch, id, movie } = this.props;
    if (!movie) {
      dispatch(fetchMovieDetails(id));
    } else {
      dispatch(movieDetailsReceived(movie));
    }
  }

  render() {
    const { isLoading, movie } = this.props;
    const component = <MovieDetails movie={movie}/>;
    const loading = <LoadingBar isLoading={isLoading}/>;
    return isLoading ? loading : component;
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  movie: state.selectedMovie.movieDetails.data,
  isLoading: state.selectedMovie.movieDetails.isLoading,
});


MovieDetailsContainer.propTypes = {
  id: PropTypes.string,
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    startShowDate: PropTypes.string,
    endShowDate: PropTypes.string,
    posterUrl: PropTypes.string,
    rating: PropTypes.number,
    year: PropTypes.number,
    movieSessions: PropTypes.array,
  }),
};

export default connect(mapStateToProps)(MovieDetailsContainer);
