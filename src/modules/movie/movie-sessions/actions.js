import {
  MOVIE_SESSIONS_REQUESTED,
  MOVIE_SESSIONS_RECEIVED,
  CINEMA_SELECTED,
  CINEMAS_REQUESTED,
  CINEMAS_RECEIVED,
  CINEMA_UNSELECTED,
  CLEAR_MOVIE_SESSIONS_STATE,
  MOVIE_SESSION_REFRESH_RECEIVED,
  MOVIE_SESSION_REFRESH_REQUESTED,
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
      .then(res => dispatch(receiveMovieSessions(res.data)))
      .catch(err => console.log(err));
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
      .then(res => dispatch(receiveMovieSessions(res.data)))
      .catch(err => console.log(err));
  };
}

export function movieSessionRefreshRequested() {
  return {
    type: MOVIE_SESSION_REFRESH_REQUESTED,
  };
}

export function movieSessionRefreshReceived(movieSession) {
  return {
    type: MOVIE_SESSION_REFRESH_RECEIVED,
    data: movieSession,
  };
}

export function refreshMovieSession(movieSession) {
  return (dispatch) => {
    dispatch(movieSessionRefreshRequested());
    return movieSessionService.getMovieSessionById(movieSession.id)
      .then(res => dispatch(movieSessionRefreshReceived(res.data)))
      .catch(console.log);
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

export function unselectCinema() {
  return {
    type: CINEMA_UNSELECTED,
  };
}

export function clearState() {
  return {
    type: CLEAR_MOVIE_SESSIONS_STATE,
  };
}
