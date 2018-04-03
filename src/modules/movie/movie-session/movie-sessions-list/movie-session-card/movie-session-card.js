import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import MovieSession from '../../../../ticket-reservation/movie-session/movie-session';

function getDate(data) {
  const date = new Date(data);
  return `${date.toDateString()}  ${date.toTimeString()}`;
}

const MovieSessionCard = ({ data, clickHandler, match }) => (
  <div className={styles.container}>
    <div onClick={clickHandler}
         className={styles.header}>{getDate(data.date)}</div>
    <Route path={`${match.url}/movie-sessions/${data.id}`}
           render={() => <MovieSession movieSession={data}/>}/>
  </div>
);

MovieSessionCard.propTypes = {
  data: PropTypes.shape({
    cinema: PropTypes.object,
    movie: PropTypes.object,
    date: PropTypes.string.isRequired,
    rooms: PropTypes.array,
  }),
  clickHandler: PropTypes.func,
  match: PropTypes.object,
};

export default MovieSessionCard;
