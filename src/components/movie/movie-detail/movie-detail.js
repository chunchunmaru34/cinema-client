import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import MovieSessions from '../../movie-session/movie-sessions-list/index';

function getActors(actors) {
  if (!actors) return '';
  return actors.join(', ');
}

function parseDate(JSONString) {
  return new Date(JSONString).toDateString();
}

const MovieDetail = ({ movie }) => (
        <div className={styles.container}>
            <div>
                <div className={styles.title}><h2>{movie.title}</h2></div>
                <div className={styles.details}>
                    <div className={styles.poster}><img src={movie.posterUrl}/></div>
                    <div className={styles.info}>
                        <div>Year: {movie.year}</div>
                        <div>Director: {movie.director}</div>
                        <div>Actors: {getActors(movie.actors)}</div>
                        <div>Rating: {movie.rating}</div>
                        <div>Show starting: {parseDate(movie.startShowDate)}
                        </div>
                        <div>Show ending: {parseDate(movie.endShowDate)}
                        </div>
                    </div>
                </div>
            </div>
            <MovieSessions data={movie.movieSessions}/>
        </div>
);


MovieDetail.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string),
    director: PropTypes.string,
    startShowDate: PropTypes.string,
    endShowDate: PropTypes.string,
    posterUrl: PropTypes.string,
    rating: PropTypes.number,
    year: PropTypes.number,
    movieSessions: PropTypes.array,
  }),
};

export default MovieDetail;
