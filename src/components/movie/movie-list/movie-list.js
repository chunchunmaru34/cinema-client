import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card';
import styles from './styles.css';

const MovieList = ({ movies }) => (
        <div className={styles.container}>
            {movies.map(item => <MovieCard
                    id={item._id}
                    posterUrl={item.posterUrl}
                    title={item.title}
                    key={item._id} />)}
        </div>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    posterUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
  })),
};

export default MovieList;
