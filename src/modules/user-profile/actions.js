import { userService } from '../../services';
import {
  RECEIVE_USER,
  REQUEST_USER,
  REQUEST_FAILED,
  UPDATE_SUCCEED,
  CLEAR_ERROR,
  CLEAR_INFO,
  CLEAR_STATE,
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
    type: REQUEST_FAILED,
    data: err,
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    dispatch(requestUser());
    return userService.getUserById(id)
      .then(res => dispatch(receiveUser(res.data)))
      .catch(err => dispatch(requestFailed(err.response.data.message)));
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
    .catch(err => dispatch(requestFailed(err.response.data.message)));
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
