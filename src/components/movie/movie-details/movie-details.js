import React from 'react';
import styles from './styles.css';
import MovieSessions from '../../movie-session/movie-sessions-list';

function getActors(actors) {
  if (!actors) return '';
  return actors.join(', ');
}

function parseDate(JSONString) {
  return new Date(JSONString).toDateString();
}

const MovieDetail = ({ movie }) => {
  if (movie) {
    return (
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
  } return 'Loading';
};

export default MovieDetail;
