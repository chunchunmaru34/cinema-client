import React from 'react';
import PropTypes from 'prop-types';

import CinemaList from '../../movie-sessions/cinema-list/cinema-list-container';
import MovieInfo from './movie-info/movie-info';
import LoadingBar from '../../util-components/loading-bar';
import styles from './styles.scss';

const MovieDetail = ({ movie, isLoading }) => {
  if (isLoading || !movie) {
    return <LoadingBar/>;
  }

  return (
    <div className={`${styles.container} container`}>
      <MovieInfo movie={movie}/>
      <div>
        <div className="text-center">
          <h4>Movie Sessions</h4>
        </div>
        <CinemaList/>
      </div>
    </div>
  );
};

MovieDetail.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    startShowDate: PropTypes.string,
    endShowDate: PropTypes.string,
    posterUrl: PropTypes.string,
    rating: PropTypes.number,
    year: PropTypes.number,
    description: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
};

export default MovieDetail;
