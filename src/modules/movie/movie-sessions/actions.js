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

export function receiveMovieSessions(json) {
  return {
    type: MOVIE_SESSIONS_RECEIVED,
    data: json,
  };
}

export function fetchMovieSessionsForCinema({ cinemaId, movieId }) {
  return (dispatch) => {
    dispatch(requestMovieSessions());
    const params = {
      cinema: cinemaId,
      movie: movieId,
      'sort-by': 'date',
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
      'sort-by': 'date',
      relevant: true,
      since: criteria.since,
      to: criteria.to,
      'available-seats': criteria.availableSeats,
    };
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    return movieSessionService.getAllMovieSessionsFor(params)
      .then(res => dispatch(receiveMovieSessions(res.data.data)))
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
      .then(res => dispatch(receiveCinemas(res.data.data)));
  };
}

export function searchCinemasForMovie(id, criteria) {
  return (dispatch) => {
    dispatch(requestCinemas());

    const params = {
      movie: id,
      'match-name': criteria.name,
      'match-city': criteria.city,
    };
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        delete params[key];
      }
    });

    cinemaService.getAllCinemasFor(params)
      .then(res => dispatch(receiveCinemas(res.data.data)))
      .catch(err => console.log(err));
  };
}

export function selectCinema(cinema) {
  return {
    type: CINEMA_SELECTED,
    cinema,
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
