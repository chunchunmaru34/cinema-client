import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import { NO_IMAGE_PLACEHOLDER } from '../../../../constants/placeholders';

const MovieCard = ({ posterUrl, title, clickHandler }) => (
  <div
    onClick={clickHandler}
    className={styles.container}
  >
      <div className={styles.poster}>
        {posterUrl
          ? <img src={posterUrl}/>
          : <img src={NO_IMAGE_PLACEHOLDER}/>
        }
      </div>
      <div className={styles.title}>
          {title}
      </div>
  </div>
);

MovieCard.propTypes = {
  posterUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default MovieCard;
