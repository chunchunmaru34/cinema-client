import { CINEMAS_PATH } from '../../conf/api-paths';

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
