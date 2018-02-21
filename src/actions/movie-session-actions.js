import { CINEMAS_PATH } from '../../conf/api-paths';

export const REQUEST_MOVIE_SESSIONS = 'REQUEST_MOVIE_SESSIONS';
export function requestMovieSessions() {
  return {
    type: REQUEST_MOVIE_SESSIONS,
  };
}

export const RECIEVE_MOVIE_SESSIONS = 'RECEIVE_MOVIE_SESSIONS';
export function receiveMovieSessions(json) {
  return {
    type: RECIEVE_MOVIE_SESSIONS,
    cinemas: json,
  };
}

export const FETCH_MOVIE_SESSIONS_FOR_CINEMAS = 'FETCH_MOVIE_SESSIONS_FOR_CINEMA';
export function fetchMovieSessionsForCinemas(id) {
  return (dispatch) => {
    dispatch(requestMovieSessions());
    return fetch(`${CINEMAS_PATH}/${id}/movie-sessions/`)
      .then(
        res => res.json(),
        err => console.log(err),
      )
      .then(json => dispatch(receiveMovieSessions(json)));
  };
}
