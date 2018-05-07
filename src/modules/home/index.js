import React from 'react';
import MovieList from '../movie/movie-list/movie-list-container';
import styles from './styles.scss';

const Home = () => (
    <div className={styles.container}>
        <MovieList/>
    </div>
);

export default Home;
