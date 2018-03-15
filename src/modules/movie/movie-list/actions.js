import { MOVIES_REQUESTED, MOVIES_RECEIVED } from './action-types';
import { movieService } from '../../../services';

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
    return movieService.getAllMovies()
      .then(res => dispatch(receiveMovies(res.data)))
      .catch(err => console.log(err));
  };
}

