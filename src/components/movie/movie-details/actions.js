import { MOVIES_PATH } from '../../../../conf/api-paths';
import { RECEIVE_MOVIE_DETAILS, REQUEST_MOVIE_DETAILS } from './action-constants';

export function requestMovieDetails() {
  return {
    type: REQUEST_MOVIE_DETAILS,
  };
}

export function receiveMovieDetails(json) {
  return {
    type: RECEIVE_MOVIE_DETAILS,
    movieDetails: json,
  };
}

export function fetchMovieDetails(id) {
  return (dispatch) => {
    dispatch(requestMovieDetails());
    return fetch(`${MOVIES_PATH}/${id}`)
      .then(
        res => res.json(),
        err => console.log(err),
      )
      .then(json => dispatch(receiveMovieDetails(json)));
  };
}
