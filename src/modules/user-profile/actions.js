import { userService } from '../../services';
import {
  RECEIVE_USER,
  REQUEST_USER,
  UPDATE_FAILED,
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
      .catch(err => console.log(err));
  };
}

export function updateFailed(err) {
  return {
    type: UPDATE_FAILED,
    data: err,
  };
}

export function updateUser(user) {
  return dispatch => userService.updateUser(user)
    .then(res => dispatch(receiveUser(res.data)))
    .catch(err => dispatch(updateFailed(err)));
}
