import {
  MOVIE_DETAILS_RECEIVED,
  MOVIE_DETAILS_REQUESTED,
  MOVIE_SELECTED,
  MOVIE_DETAILS_STATE_CLEARED,
} from './action-types';
import { movieService } from '../../../services';

export function requestMovieDetails() {
  return {
    type: MOVIE_DETAILS_REQUESTED,
  };
}

export function movieDetailsReceived(json) {
  return {
    type: MOVIE_DETAILS_RECEIVED,
    movieDetails: json,
  };
}

export function fetchMovieDetails(id) {
  return (dispatch) => {
    dispatch(requestMovieDetails());
    return movieService.getMovieById(id)
      .then(res => dispatch(movieDetailsReceived(res.data)));
  };
}

export function selectMovie(movie) {
  return {
    type: MOVIE_SELECTED,
    movie,
  };
}

export function clearState() {
  return {
    type: MOVIE_DETAILS_STATE_CLEARED,
  };
}
