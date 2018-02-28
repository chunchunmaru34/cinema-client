import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './movie-card/movie-card-container';
import styles from './styles.scss';

const MovieList = ({ movies }) => (
  <div className={styles.container}>
      {movies.map(item => <MovieCard movie={item} key={item.id} />)}
  </div>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
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
  })),
};

export default MovieList;
