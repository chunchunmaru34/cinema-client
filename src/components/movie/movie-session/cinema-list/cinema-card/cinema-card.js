import React from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.scss';
import MovieSessionsList from '../../movie-sessions-list/movie-sessions-list-container';

const CinemaCard = ({ data, clickHandler, match }) => (
  <div className={styles.container}>
    <div className={styles.header} onClick={clickHandler}>{data.name}</div>
    <Route path={`${match.url}/${data.id}`}
           component={MovieSessionsList}
    />
  </div>
);

export default CinemaCard;
