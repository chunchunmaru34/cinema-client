import { CINEMAS_PATH } from '../../conf/api-paths';
import { fetchMovieSessionsForCinemas } from './movie-session-actions';

export const REQUEST_CINEMAS = 'REQUEST_CINEMAS';
export function requestCinemas() {
  return {
    type: REQUEST_CINEMAS,
  };
}

export const RECEIVE_CINEMAS = 'RECEIVE_CINEMAS';
export function receiveCinemas(json) {
  return {
    type: RECEIVE_CINEMAS,
    cinemas: json,
  };
}

export const FETCH_CINEMAS = 'FETCH_CINEMAS';
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

export const SELECT_CINEMA = 'SELECT_CINEMA';
export function selectCinema(cinema) {
  return (dispatch) => {
    dispatch(fetchMovieSessionsForCinemas(cinema.id));
    return {
      type: SELECT_CINEMA,
      cinema,
    };
  };
}
