import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const MovieCard = ({ posterUrl, title, clickHandler }) => (
  <div onClick={clickHandler}
       className={styles.container}>
      <div className={styles.poster}>
          <img src={posterUrl}/>
      </div>
      <div className={styles.title}>
          {title}
      </div>
  </div>
);

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterUrl: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
};

export default MovieCard;
