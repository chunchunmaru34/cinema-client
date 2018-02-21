import { MOVIES_PATH } from '../../conf/api-paths';

export const REQUEST_MOVIES = 'REQUEST_MOVIES';
export function requestMovies() {
  return {
    type: REQUEST_MOVIES,
  };
}

export const RECEIVE_MOVIES = 'RECEIVE_MOVIES';
export function receiveMovies(json) {
  return {
    type: RECEIVE_MOVIES,
    movies: json,
  };
}

export const FETCH_MOVIES = 'FETCH_MOVIES';
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

export const SELECT_MOVIE = 'SELECT_MOVIE';
export function selectMovie(movie) {
  return {
    type: SELECT_MOVIE,
    movie,
  };
}

export const REQUEST_MOVIE_DETAILS = 'REQUEST_MOVIE_DETAILS';
export function requestMovieDetails() {
  return {
    type: REQUEST_MOVIE_DETAILS,
  };
}

export const RECEIVE_MOVIE_DETAILS = 'RECEIVE_MOVIE_DETAILS';
export function receiveMovieDetails(json) {
  return {
    type: RECEIVE_MOVIE_DETAILS,
    movieDetails: json,
  };
}

export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS';
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
