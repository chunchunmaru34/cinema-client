import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import { Link } from 'react-router-dom';

const Movie = ({ id, posterUrl, title }) => {
    return (
        //TODO push to history on click instead of Link
        <Link to={`/movies/${id}`} className={styles.container + " col-sm"}>
            <img src={posterUrl} className={styles.poster}/>
            <div className={styles.title}>
                {title}
            </div>
        </Link>
    )
};

Movie.propTypes ={
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    posterUrl: PropTypes.string
};

export default Movie;