import React from 'react';
import MovieList from '../../containers/movie-list';
import styles from './styles.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>Current movie sessions</h1>
            <MovieList/>
        </div>
    )
};

export default Home;