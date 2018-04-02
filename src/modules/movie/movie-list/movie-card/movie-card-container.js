import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectMovie } from '../../movie-details/actions';
import MovieCard from './movie-card';
import { MOVIES_ROUTE } from '../../../../constants/routes';

class MovieCardContainer extends React.Component {
  clickHandler = () => {
    const {
      dispatch, history, movie,
    } = this.props;
    dispatch(selectMovie(movie));
    history.push(`${MOVIES_ROUTE}/${movie.id}`);
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
};


const mapStateToProps = (state, ownProps) => ({
  movie: ownProps.movie,
});


export default withRouter(connect(mapStateToProps)(MovieCardContainer));
