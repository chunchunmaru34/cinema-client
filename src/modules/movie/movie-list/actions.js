import {
  MOVIES_REQUESTED,
  MOVIES_RECEIVED,
  REQUEST_FAILED,
} from './action-types';
import { movieService } from '../../../services';

export function moviesRequested() {
  return {
    type: MOVIES_REQUESTED,
  };
}

export function moviesReceived(json) {
  return {
    type: MOVIES_RECEIVED,
    movies: json,
  };
}

export function requestFailed(err) {
  return {
    type: REQUEST_FAILED,
    data: err,
  };
}

export function fetchMovies() {
  return (dispatch) => {
    dispatch(moviesRequested());
    return movieService.getAllMovies()
      .then(res => dispatch(moviesReceived(res.data)))
      .catch((err) => {
        if (err.response) {
          dispatch(requestFailed(err.response.data.message));
        } else {
          dispatch(requestFailed(err));
        }
      });
  };
}

