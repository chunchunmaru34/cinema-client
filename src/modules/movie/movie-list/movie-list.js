import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './movie-card/movie-card-container';
import styles from './styles.scss';
import icon from './_media/icons/refresh.svg';

const MovieList = ({ movies, refreshMovies }) => {
  const movieList = movies
    .map(item => (
      <MovieCard
        movie={item}
        key={item.id}
      />
    ));

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Available Movies</h1>
        <div onClick={refreshMovies}
             className={styles.refreshIcon}>
          <img src={icon}/>
        </div>
      </div>
      <div>
        {movieList}
      </div>
    </div>
  );
};

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
  })),
};

export default MovieList;
