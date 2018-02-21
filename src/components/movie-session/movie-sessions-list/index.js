import React from 'react';
import PropTypes from 'prop-types';
import MovieSession from '../movie-session-card/index';

const MovieSessionsList = ({ data, match }) => (
  <div>
      <h3>Sessions:</h3>
      {data.map(item => <MovieSession data={item} key={item.id} match={match}/>)}
  </div>
);

MovieSessions.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    roomCodeName: PropTypes.string.isRequired,
  })),
};

export default MovieSessionsList;
