import React from 'react';
import PropTypes from 'prop-types';
import MovieSession from './movie-session-card/movi-session-card-container';
import styles from './styles.scss';

const MovieSessionsList = ({ data }) => (
  <div className={styles.container}>
      Sessions:
      {data.map(item => <MovieSession data={item}
                                      key={item.id}/>)}
  </div>
);

MovieSessionsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    roomCodeName: PropTypes.string,
  })),
};

export default MovieSessionsList;
