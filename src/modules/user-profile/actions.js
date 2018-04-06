import { userService, ticketService } from '../../services';
import {
  RECEIVE_USER,
  REQUEST_USER,
  USER_UPDATE_FAILED,
  USER_UPDATE_SUCCEED,
  CLEAR_ERROR,
  CLEAR_INFO,
  CLEAR_STATE,
  TICKETS_REQUESTED,
  GOT_ALL_TICKETS,
  GOT_RELEVANT_TICKETS,
} from './action-types';

export function requestUser() {
  return {
    type: REQUEST_USER,
  };
}

export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    data: user,
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    dispatch(requestUser());
    return userService.getUserById(id)
      .then(res => dispatch(receiveUser(res.data)))
      .catch(console.log);
  };
}

export function ticketsRequested() {
  return {
    type: TICKETS_REQUESTED,
  };
}

export function gotRelevantTickets(tickets) {
  return {
    type: GOT_RELEVANT_TICKETS,
    data: tickets,
  };
}

export function gotAllTickets(tickets) {
  return {
    type: GOT_ALL_TICKETS,
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
      })
      .catch(console.log);
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
    type: CLEAR_INFO,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}

export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}
