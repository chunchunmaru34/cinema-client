import { CINEMAS_PATH, MOVIES_PATH } from '../../../../conf/api-endpoints';
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

export function fetchMovieSessionsForCinema(cinemaId, movieId) {
  return (dispatch) => {
    dispatch(requestMovieSessions());
    return fetch(`${CINEMAS_PATH}/${cinemaId}/movie-sessions?movie-id=${movieId}`)
      .then(res => res.json())
      .then(json => dispatch(receiveMovieSessions(json)))
      .catch(err => console.log(err));
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

export function fetchCinemasForMovie(id) {
  return (dispatch) => {
    dispatch(requestCinemas());
    return fetch(`${MOVIES_PATH}/${id}/cinemas`)
      .then(res => res.json())
      .then(json => dispatch(receiveCinemas(json)))
      .catch(err => console.log(err));
  };
}

export function selectCinema(cinema) {
  return {
    type: CINEMA_SELECTED,
    cinema,
  };
}
