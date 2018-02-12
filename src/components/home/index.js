import React from 'react';
import MovieSessionsList from '../movie-list';
import styles from './styles.css'

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>Current movie sessions</h1>
            <MovieSessionsList/>
        </div>
    )
};

export default Home;