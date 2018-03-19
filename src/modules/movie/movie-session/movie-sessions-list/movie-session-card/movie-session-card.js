import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import SeatsArrangement from '../../../../ticket-reservation/seats-arrangement/seats-arrangement-container';

function getDate(data) {
  return new Date(data).toDateString();
}

const MovieSessionCard = ({ data, clickHandler, match }) => (
  <div className={styles.container}>
    <div onClick={clickHandler}
         className={styles.header}>{getDate(data.date)}</div>
    <Route path={`${match.url}/movie-sessions/${data.id}`}
           render={() => <SeatsArrangement data={data}/>}/>
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
