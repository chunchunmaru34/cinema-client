import { userService } from '../../services';
import {
  RECEIVE_USER,
  REQUEST_USER,
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
