import { userService, ticketService } from '../../services';
import {
  USER_RECEIVED,
  USER_REQUESTED,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCEED,
  ERROR_CLEARED,
  INFO_CLEARED,
  USER_PROFILE_CLEAR_STATE,
  TICKETS_REQUESTED,
  ALL_TICKETS_RECEIVED,
  RELEVANT_TICKETS_RECEIVED,
} from './action-types';

export function requestUser() {
  return {
    type: USER_REQUESTED,
  };
}

export function receiveUser(user) {
  return {
    type: USER_RECEIVED,
    data: user,
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    dispatch(requestUser());
    return userService.getUserById(id)
      .then(res => dispatch(receiveUser(res.data)));
  };
}

export function ticketsRequested() {
  return {
    type: TICKETS_REQUESTED,
  };
}

export function gotRelevantTickets(tickets) {
  return {
    type: RELEVANT_TICKETS_RECEIVED,
    data: tickets,
  };
}

export function gotAllTickets(tickets) {
  return {
    type: ALL_TICKETS_RECEIVED,
    data: tickets,
  };
}

export function fetchTickets({ user, relevant }) {
  return (dispatch) => {
    dispatch(ticketsRequested());
    return ticketService.getTickets({ user, relevant })
      .then((res) => {
        if (relevant) {
          dispatch(gotRelevantTickets(res.data));
        } else {
          dispatch(gotAllTickets(res.data));
        }
      });
  };
}

export function updateSucceed(user) {
  return {
    type: USER_UPDATE_SUCCEED,
    data: user,
  };
}

export function updateFailed(err) {
  return {
    type: USER_UPDATE_FAILED,
    data: err,
  };
}

export function updateUser(user) {
  return dispatch => userService.updateUser(user)
    .then(res => dispatch(updateSucceed(res.data)))
    .catch((err) => {
      updateFailed(err.response ? err.response.data.message : err.message);
    });
}

export function clearInfo() {
  return {
    type: INFO_CLEARED,
  };
}

export function clearError() {
  return {
    type: ERROR_CLEARED,
  };
}

export function clearState() {
  return {
    type: USER_PROFILE_CLEAR_STATE,
  };
}
