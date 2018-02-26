import { CINEMAS_PATH } from '../../../../conf/api-endpoints';
import {
  MOVIE_SESSIONS_REQUESTED,
  MOVIE_SESSIONS_RECEIVED,
  CINEMA_SELECTED,
  CINEMAS_REQUESTED,
  CINEMAS_RECEIVED,
} from './action-types';

export function requestMovieSessions() {
  return {
    type: MOVIE_SESSIONS_REQUESTED,
  };
}

export function receiveMovieSessions(json) {
  return {
    type: MOVIE_SESSIONS_RECEIVED,
    movieSessions: json,
  };
}

export function fetchMovieSessionsForCinema(id) {
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

export function requestCinemas() {
  return {
    type: CINEMAS_REQUESTED,
  };
}

export function receiveCinemas(json) {
  return {
    type: CINEMAS_RECEIVED,
    cinemas: json,
  };
}

export function fetchCinemas() {
  return (dispatch) => {
    dispatch(requestCinemas());
    return fetch(CINEMAS_PATH)
      .then(
        res => res.json(),
        err => console.log(err),
      )
      .then(json => dispatch(receiveCinemas(json)));
  };
}

export function selectCinema(cinema) {
  return {
    type: CINEMA_SELECTED,
    cinema,
  };
}
