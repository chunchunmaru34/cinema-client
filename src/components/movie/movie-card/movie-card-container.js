import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectMovie } from '../../../actions/movie-actions';
import MovieCard from './movie-card';

class MovieCardContainer extends React.Component {
  clickHandler = () => {
    const {
      dispatch, history, movie,
    } = this.props;
    dispatch(selectMovie(movie));
    history.push(`/movies/${movie.id}`);
  };

  render() {
    const { title, id, posterUrl } = this.props.movie;
    return (
      <MovieCard posterUrl={posterUrl}
                 id={id}
                 title={title}
                 clickHandler={this.clickHandler}
      />
    );
  }
}

MovieCard.propTypes = {
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
  history: PropTypes.object,
};


const mapStateToProps = (state, ownProps) => ({
  movie: ownProps.movie,
  history: ownProps.history,
});


export default connect(mapStateToProps)(withRouter(MovieCardContainer));
