import { MOVIES_PATH } from '../../../../conf/api-endpoints';
import { MOVIE_DETAILS_RECEIVED, MOVIE_DETAILS_REQUESTED, MOVIE_SELECTED } from './action-types';


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
    return fetch(`${MOVIES_PATH}/${id}`)
      .then(res => res.json())
      .then(json => dispatch(receiveMovieDetails(json)))
      .catch(err => console.log(err));
  };
}

export function selectMovie(movie) {
  return {
    type: MOVIE_SELECTED,
    movie,
  };
}
