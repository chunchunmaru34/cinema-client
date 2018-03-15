import { MOVIES_PATH } from '../../../../conf/api-endpoints';
import { MOVIES_REQUESTED, MOVIES_RECEIVED } from './action-types';

export function requestMovies() {
  return {
    type: MOVIES_REQUESTED,
  };
}

export function receiveMovies(json) {
  return {
    type: MOVIES_RECEIVED,
    movies: json,
  };
}

export function fetchMovies() {
  return (dispatch) => {
    dispatch(requestMovies());
    return fetch(MOVIES_PATH)
      .then(res => res.json())
      .then(json => dispatch(receiveMovies(json)))
      .catch(err => console.log(err));
  };
}

