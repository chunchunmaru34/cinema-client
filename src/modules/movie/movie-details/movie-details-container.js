import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { fetchMovieDetails } from './actions';
import MovieDetails from './movie-details';

class MovieDetailsContainer extends React.Component {
  componentDidMount() {
    /* If movie list was not passed from movie-list (e.g. open page from direct link),
    load movie manually */
    if (!this.props.movie) {
      const { dispatch, id } = this.props;
      dispatch(fetchMovieDetails(id));
    }
  }

  render() {
    return this.props.movie ? <MovieDetails movie={this.props.movie}/> : '';
  }
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  movie: state.selectedMovie.movieDetails.data,
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
