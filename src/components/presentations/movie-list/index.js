import Movie from '../movie/index';
import React from 'react';
import styles from './styles.css';

const MovieList = ({ movies }) => {
    let movieList;
    if (movies && movies.length) {
        movieList = movies.map(item => {
            return <Movie data={item} key={item._id} />
        })
    } else {
        movieList = (
            <div className={styles.errorMessage}>There is nothing to show yet :(</div>
        )
    }
    return(

        <div className={styles.container}>
            {movieList}
        </div>
    )
};

export default MovieList;