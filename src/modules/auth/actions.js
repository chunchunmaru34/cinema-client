import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGGED_OUT,
  AUTH_ERROR_CLEARED,
  USER_ALREADY_EXIST, USER_IS_UNIQUE,
} from './actions-types';
import { authService, userService } from '../../services';

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
      .catch((err) => {
        dispatch(loginFailed(err.response ? err.response.data.message : err.message));
      });
  };
}

export function signUp(credentials) {
  return (dispatch) => {
    dispatch(loginRequested());
    return authService.signUp(credentials)
      .then(data => dispatch(loginReceived(data)))
      .catch((err) => {
        dispatch(loginFailed(err.response ? err.response.data.message : err.message));
      });
  };
}

export function loggedOut() {
  return {
    type: LOGGED_OUT,
  };
}

export function clearAuthError() {
  return {
    type: AUTH_ERROR_CLEARED,
  };
}

export function userAlreadyExist() {
  return {
    type: USER_ALREADY_EXIST,
  };
}


export function userIsUnique() {
  return {
    type: USER_IS_UNIQUE,
  };
}

export function checkIfUserAlreadyExist(email) {
  return dispatch => userService.getUserBy({ email })
    .then((res) => {
      if (res.data.length) {
        dispatch(userAlreadyExist());
      } else {
        dispatch(userIsUnique());
      }
    });
}
