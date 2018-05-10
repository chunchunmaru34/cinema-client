import React from 'react';
import PropTypes from 'prop-types';

import { NO_IMAGE_PLACEHOLDER } from '../../../../constants/placeholders';
import styles from './styles.scss';

function getActors(actors) {
  if (!actors.length) return '';
  return actors.join(', ');
}

function parseDate(JSONString) {
  return new Date(JSONString).toDateString();
}

const MovieInfo = ({ movie }) => (
  <div>
    <div>
      <div className={styles.title}>
        <h2>{movie.title}</h2>
      </div>
      <div className={styles.details}>
        <div className={styles.poster}>
          {
            movie.posterUrl
              ? <img src={movie.posterUrl}/>
              : <img src={NO_IMAGE_PLACEHOLDER}/>
          }
        </div>
        <div className={styles.info}>
          {movie.year && <div>Year: {movie.year}</div> }
          {movie.director && <div>Director: {movie.director}</div> }
          {movie.actors && <div>Actors: {getActors(movie.actors)}</div> }
          {movie.rating && <div>Rating: {movie.rating}</div> }
          <div>Show starting: {parseDate(movie.startShowDate)}</div>
          <div>Show ending: {parseDate(movie.endShowDate)}</div>
        </div>
      </div>
    </div>
    <div className={styles.description}>
      <div className={styles.descriptionHeader}>
        <span>Description</span>
      </div>
      <p>{movie.description}</p>
    </div>
  </div>
);

MovieInfo.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    startShowDate: PropTypes.string,
    endShowDate: PropTypes.string,
    posterUrl: PropTypes.string,
    rating: PropTypes.number,
    year: PropTypes.number,
    description: PropTypes.string,
  }),
};

export default MovieInfo;
