import {
  MOVIES_REQUESTED,
  MOVIES_RECEIVED,
  MOVIES_CLEAR_STATE,
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

export function fetchMovies() {
  return (dispatch) => {
    dispatch(moviesRequested());
    return movieService.getAllMovies()
      .then(res => dispatch(moviesReceived(res.data)))
      .catch(console.log);
  };
}

export function searchMovies(criteria) {
  return (dispatch) => {
    dispatch(moviesRequested());
    const params = {
      'match-title': criteria,
    };
    return movieService.getAllMoviesBy(params)
      .then(res => dispatch(moviesReceived(res.data)))
      .catch(console.log);
  };
}

export function clearState() {
  return {
    type: MOVIES_CLEAR_STATE,
  };
}
