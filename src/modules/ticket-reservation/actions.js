import {
  ADD_SEAT,
  REMOVE_SEAT,
  CLEAR_ORDER,
} from './action-types';

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

export function clearOrder() {
  return {
    type: CLEAR_ORDER,
  };
}
