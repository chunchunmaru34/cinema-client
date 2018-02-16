import React from 'react';
import styles from './styles.css';
import { Link } from 'react-router-dom'

const Movie = ({ data }) => {
    return (
        //TODO push to history on click instead of Link
        <Link to={`/movies/${data._id}`} className={styles.container + " col-sm"}>
            <img src={data.posterUrl} className={styles.poster}/>
            <div className={styles.title}>
                {data.title}
            </div>
        </Link>
    )
};

export default Movie;