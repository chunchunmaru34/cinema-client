import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGOUT,
  CHECK_FOR_AUTHENTICATED_USER,
} from './actions-types';
import { authService } from '../../services';

export function loginRequested() {
  return {
    type: LOGIN_REQUESTED,
  };
}

export function loginReceived(data) {
  return {
    type: LOGIN_RECEIVED,
    data,
  };
}

export function loginFailed(err) {
  return {
    type: LOGIN_FAILED,
    data: err,
  };
}

export function login(credentials) {
  return (dispatch) => {
    dispatch(loginRequested());
    return authService.login(credentials)
      .then(data => dispatch(loginReceived(data)))
      .catch(err => dispatch(loginFailed(err.response.data)));
  };
}

export function checkedForAuthenticatedUser(user) {
  return {
    type: CHECK_FOR_AUTHENTICATED_USER,
    data: user,
  };
}

export function loggedOut() {
  return {
    type: LOGOUT,
  };
}
