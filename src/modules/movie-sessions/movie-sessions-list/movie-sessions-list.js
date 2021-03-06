import React from 'react';
import PropTypes from 'prop-types';

import MovieSessionCard from './movie-session-card/movi-session-card-container';
import styles from './styles.scss';
import LoadingBar from '../../util-components/loading-bar/index';
import SearchBar from './search-bar/search-bar-container';

const MovieSessionsList = ({ data, isLoading }) => {
  const movieSessionsList = data && data.map(item => (
      <MovieSessionCard data={item} key={item.id}/>
  ));
  return (
    <div className={styles.container}>
      <span>Sessions:</span>
      <SearchBar/>
      {isLoading ? <LoadingBar/> : movieSessionsList}
    </div>
  );
};

MovieSessionsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    seats: PropTypes.array,
    price: PropTypes.number,
    roomCodeName: PropTypes.string,
  })),
  isLoading: PropTypes.bool,
};

export default MovieSessionsList;
