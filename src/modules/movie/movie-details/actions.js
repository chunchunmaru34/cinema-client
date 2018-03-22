import {
  MOVIE_DETAILS_RECEIVED,
  MOVIE_DETAILS_REQUESTED,
  MOVIE_SELECTED,
} from './action-types';
import { movieService } from '../../../services';

export function requestMovieDetails() {
  return {
    type: MOVIE_DETAILS_REQUESTED,
  };
}

export function receiveMovieDetails(json) {
  return {
    type: MOVIE_DETAILS_RECEIVED,
    movieDetails: json,
  };
}

export function fetchMovieDetails(id) {
  return (dispatch) => {
    dispatch(requestMovieDetails());
    return movieService.getMovieById(id)
      .then(res => dispatch(receiveMovieDetails(res.data)))
      .catch(err => console.log(err));
  };
}

export function selectMovie(movie) {
  return {
    type: MOVIE_SELECTED,
    movie,
  };
}
