import React from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.scss';
import SeatsArrangement from '../../seats-arrangement';

function getDate(data) {
  return new Date(data).toDateString();
}

const MovieSessionCard = ({ data, clickHandler, url }) => (
  <div className={styles.container}>
    <div onClick={clickHandler} className={styles.header}>{getDate(data.date)}</div>
    <Route path={`${url}/movie-sessions/${data.id}`} component={SeatsArrangement}/>
  </div>
);


export default MovieSessionCard;
