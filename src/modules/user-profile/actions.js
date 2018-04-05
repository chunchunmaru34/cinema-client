import { userService, ticketService } from '../../services';
import {
  RECEIVE_USER,
  REQUEST_USER,
  USER_REQUEST_FAILED,
  UPDATE_SUCCEED,
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

export function requestFailed(err) {
  return {
    type: USER_REQUEST_FAILED,
    data: err,
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    dispatch(requestUser());
    return userService.getUserById(id)
      .then(res => dispatch(receiveUser(res.data)))
      .catch((err) => {
        if (err.response) {
          dispatch(requestFailed(err.response.data.message));
        } else {
          dispatch(requestFailed(err));
        }
      });
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
      .catch((err) => {
        if (err.response) {
          dispatch(requestFailed(err.response.data.message));
        } else {
          dispatch(requestFailed(err));
        }
      });
  };
}

export function updateSucceed(user) {
  return {
    type: UPDATE_SUCCEED,
    data: user,
  };
}

export function updateUser(user) {
  return dispatch => userService.updateUser(user)
    .then(res => dispatch(updateSucceed(res.data)))
    .catch((err) => {
      if (err.response) {
        dispatch(requestFailed(err.response.data.message));
      } else {
        dispatch(requestFailed(err));
      }
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
