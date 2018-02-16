import Movie from '../movie/index';
import React from 'react';
import styles from './styles.css';

const MovieList = ({ movies }) => {
    return(
        <div className={styles.container}>
            {movies.map(item => {
                return <Movie data={item} key={item._id} />
            })}
        </div>
    )
};

export default MovieList;