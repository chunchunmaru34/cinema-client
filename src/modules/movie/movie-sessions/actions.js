import {
  MOVIE_SESSIONS_REQUESTED,
  MOVIE_SESSIONS_RECEIVED,
  CINEMA_SELECTED,
  CINEMAS_REQUESTED,
  CINEMAS_RECEIVED,
  CINEMA_UNSELECTED,
  MOVIE_SESSIONS_STATE_CLEARED,
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

export function receiveMovieSessions(movieSessions) {
  return {
    type: MOVIE_SESSIONS_RECEIVED,
    data: movieSessions,
  };
}

export function fetchMovieSessionsForCinema({ cinemaId, movieId }) {
  return (dispatch) => {
    dispatch(requestMovieSessions());
    const params = {
      cinema: cinemaId,
      movie: movieId,
      sortBy: 'date',
      relevant: true,
    };
    return movieSessionService.getAllMovieSessionsFor(params)
      .then(res => dispatch(receiveMovieSessions(res.data.data)));
  };
}

export function searchMovieSessionsForCinema({ cinemaId, movieId }, criteria) {
  return (dispatch) => {
    dispatch(requestMovieSessions());

    const params = {
      cinema: cinemaId,
      movie: movieId,
      sortBy: 'date',
      relevant: true,
      since: criteria.since,
      to: criteria.to,
      availableSeats: criteria.availableSeats,
    };
    return movieSessionService.getAllMovieSessionsFor(params)
      .then(res => dispatch(receiveMovieSessions(res.data.data)));
  };
}

export function requestCinemas() {
  return {
    type: CINEMAS_REQUESTED,
  };
}

export function receiveCinemas(cinemas) {
  return {
    type: CINEMAS_RECEIVED,
    data: cinemas,
  };
}

export function fetchCinemasForMovie(id) {
  return (dispatch) => {
    dispatch(requestCinemas());
    const params = { movie: id };
    cinemaService.getAllCinemasFor(params)
      .then(res => dispatch(receiveCinemas(res.data.data)));
  };
}

export function searchCinemasForMovie(id, criteria) {
  return (dispatch) => {
    dispatch(requestCinemas());

    const params = {
      movie: id,
      matchName: criteria.name,
      matchCity: criteria.city,
    };
    return cinemaService.getAllCinemasFor(params)
      .then(res => dispatch(receiveCinemas(res.data.data)));
  };
}

export function selectCinema(cinema) {
  return {
    type: CINEMA_SELECTED,
    data: cinema,
  };
}

export function unselectCinema() {
  return {
    type: CINEMA_UNSELECTED,
  };
}

export function clearState() {
  return {
    type: MOVIE_SESSIONS_STATE_CLEARED,
  };
}
