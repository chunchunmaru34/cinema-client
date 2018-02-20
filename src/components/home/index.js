import React from 'react';
import MovieList from '../movie/movie-list/movie-list-container';
import styles from './styles.scss';

const Home = () => (
        <div className={styles.container}>
            <h1>Current movie sessions</h1>
            <MovieList/>
        </div>
);

export default Home;
