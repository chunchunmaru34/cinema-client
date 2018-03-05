import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import CinemaList from './cinema-list/cinema-list-container';
import styles from './styles.scss';

const MovieSessions = ({ match, handleClick }) => (
  <div>
    <div className={styles.title} onClick={handleClick}><h4>Movie sessions</h4></div>
    <Route path={`${match.url}/cinemas`} component={CinemaList}/>
  </div>
);

export default withRouter(MovieSessions);
