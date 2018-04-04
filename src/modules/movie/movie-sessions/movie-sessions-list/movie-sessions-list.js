import React from 'react';
import PropTypes from 'prop-types';
import MovieSessionCard from './movie-session-card/movi-session-card-container';
import styles from './styles.scss';

const MovieSessionsList = ({ data }) => (
  <div className={styles.container}>
      Sessions:
      {data.map(item => <MovieSessionCard data={item}
                                      key={item.id}/>)}
  </div>
);

MovieSessionsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    seats: PropTypes.array,
    price: PropTypes.number,
    freeSeatsCount: PropTypes.number,
    roomCodeName: PropTypes.string,
  })),
};

export default MovieSessionsList;
