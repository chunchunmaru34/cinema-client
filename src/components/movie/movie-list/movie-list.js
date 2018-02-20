import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../movie-card/movie-card';
import styles from './styles.scss';

const MovieList = ({ movies }) => (
        <div className={styles.container}>
            {movies.map(item => <Movie
                    id={item.id}
                    posterUrl={item.posterUrl}
                    title={item.title}
                    key={item.id} />)}
        </div>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    posterUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
  })),
};

export default MovieList;
