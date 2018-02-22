import { MOVIES_PATH } from '../../conf/api-paths';

export function requestMovies() {
  return {
    type: REQUEST_MOVIES,
  };
}

export function receiveMovies(json) {
  return {
    type: RECEIVE_MOVIES,
    movies: json,
  };
}

export function fetchMovies() {
  return (dispatch) => {
    dispatch(requestMovies());
    return fetch(MOVIES_PATH)
      .then(
        res => res.json(),
        err => console.log(err),
      )
      .then(json => dispatch(receiveMovies(json)));
  };
}

export function selectMovie(movie) {
  return {
    type: SELECT_MOVIE,
    movie,
  };
}
