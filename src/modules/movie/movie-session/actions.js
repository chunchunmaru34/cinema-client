import {
  MOVIE_SESSIONS_REQUESTED,
  MOVIE_SESSIONS_RECEIVED,
  CINEMA_SELECTED,
  CINEMAS_REQUESTED,
  CINEMAS_RECEIVED,
} from './action-types';
import {
  movieSessionService,
  cinemaService,
} from '../../../services';

export function requestMovieSessions() {
  return {
    type: MOVIE_SESSIONS_REQUESTED,
  };
}

export function receiveMovieSessions(json) {
  return {
    type: MOVIE_SESSIONS_RECEIVED,
    movieSessions: json,
  };
}

export function fetchMovieSessionsForCinema(cinemaId, movieId) {
  return (dispatch) => {
    dispatch(requestMovieSessions());
    const params = {
      cinema: cinemaId,
      movie: movieId,
    };
    return movieSessionService.getAllMovieSessionsFor(params)
      .then(res => dispatch(receiveMovieSessions(res.data)))
      .catch(err => console.log(err));
  };
}

export function requestCinemas() {
  return {
    type: CINEMAS_REQUESTED,
  };
}

export function receiveCinemas(json) {
  return {
    type: CINEMAS_RECEIVED,
    cinemas: json,
  };
}

export function fetchCinemasForMovie(id) {
  return (dispatch) => {
    dispatch(requestCinemas());
    const params = { movie: id };
    cinemaService.getAllCinemasFor(params)
      .then(res => dispatch(receiveCinemas(res.data)))
      .catch(err => console.log(err));
  };
}

export function selectCinema(cinema) {
  return {
    type: CINEMA_SELECTED,
    cinema,
  };
}