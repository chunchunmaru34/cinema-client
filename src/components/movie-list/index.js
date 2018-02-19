import Movie from '../movie/index';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const MovieList = ({ movies }) => {
    return(
        <div className={styles.container}>
            {movies.map(item => {
                return <Movie
                    id={item._id}
                    posterUrl={item.posterUrl}
                    title={item.title}
                    key={item._id} />
            })}
        </div>
    )
};

MovieList.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        posterUrl: PropTypes.string,
        title: PropTypes.string.isRequired
    }))
};

export default MovieList;