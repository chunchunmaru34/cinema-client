import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';


const MovieCard = ({ id, posterUrl, title }) => (
        // TODO push to history on click instead of Link
        <Link to={`/movies/${id}`} className={styles.container}>
            <div className={styles.poster}>
                <img src={posterUrl}/>
            </div>
            <div className={styles.title}>
                {title}
            </div>
        </Link>
);

MovieCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string,
};

export default MovieCard;