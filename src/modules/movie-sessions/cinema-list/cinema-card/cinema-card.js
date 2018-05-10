import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import MovieSessionsList from '../../movie-sessions-list/movie-sessions-list-container';
import styles from './styles.scss';

const CinemaCard = ({ data, clickHandler, match }) => (
  <div className={styles.container}>
    <div
      className={styles.header}
      onClick={clickHandler}
    >
      <span>{data.name}</span>
      <span className="ml-4">City: {data.city}</span>
    </div>
    <Route
      path={`${match.url}/cinemas/${data.id}`}
      render={location => (
        <MovieSessionsList
          location={location}
          cinema={data}
        />
      )}
    />
  </div>
);

CinemaCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rooms: PropTypes.array,
  }),
  clickHandler: PropTypes.func,
  match: PropTypes.object,
};

export default CinemaCard;
