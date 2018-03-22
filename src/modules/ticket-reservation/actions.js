import {
  ADD_SEAT,
  REMOVE_SEAT,
  CLEAR_ORDER,
  INCREMENT_ADDITION,
  DECREMENT_ADDITION,
  SELECT_MOVIE_SESSION,
} from './action-types';

export function selectMovieSession(movieSession) {
  return {
    type: SELECT_MOVIE_SESSION,
    data: movieSession,
  };
}

export function addSeat(seat) {
  return {
    type: ADD_SEAT,
    data: seat,
  };
}

export function removeSeat(seat) {
  return {
    type: REMOVE_SEAT,
    data: seat,
  };
}

export function incrementAddition(addition) {
  return {
    type: INCREMENT_ADDITION,
    data: addition,
  };
}

export function decrementAddition(addition) {
  return {
    type: DECREMENT_ADDITION,
    data: addition,
  };
}

export function clearOrder() {
  return {
    type: CLEAR_ORDER,
  };
}
