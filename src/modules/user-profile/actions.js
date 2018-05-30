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
  TICKETS_ALL_RECEIVED,
  TICKETS_RELEVANT_RECEIVED,
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

export function receiveRelevantTickets(tickets) {
  return {
    type: TICKETS_RELEVANT_RECEIVED,
    data: tickets,
  };
}

export function receiveAllTickets(tickets) {
  return {
    type: TICKETS_ALL_RECEIVED,
    data: tickets,
  };
}

export function fetchTickets(params) {
  return (dispatch) => {
    dispatch(ticketsRequested());
    return ticketService.getTickets(params)
      .then((res) => {
        if (params.relevant) {
          dispatch(receiveRelevantTickets(res.data.data));
        } else {
          dispatch(receiveAllTickets(res.data.data));
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
