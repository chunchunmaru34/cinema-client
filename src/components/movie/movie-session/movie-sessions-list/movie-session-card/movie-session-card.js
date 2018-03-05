import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import SeatsArrangement from '../../seats-arrangement';

function getDate(data) {
  return new Date(data).toDateString();
}

const MovieSessionCard = ({ data, clickHandler, match }) => (
  <div className={styles.container}>
    <div onClick={clickHandler}
         className={styles.header}>{getDate(data.date)}</div>
    <Route path={`${match.url}/movie-sessions/${data.id}`}
           component={SeatsArrangement}/>
  </div>
);

MovieSessionCard.propTypes = {
  data: PropTypes.shape({
    cinemaId: PropTypes.string.isRequired,
    movieId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rooms: PropTypes.array,
  }),
  clickHandler: PropTypes.func,
  match: PropTypes.object,
};

export default MovieSessionCard;
