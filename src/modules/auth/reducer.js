import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGGED_OUT,
  CLEAR_AUTH_ERROR, USER_ALREADY_EXIST,
} from './actions-types';
import { authService } from '../../services';

const initialState = {
  user: authService.getAuthenticatedUser() || null,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUESTED:
      return {
        ...state,
      };
    case LOGIN_RECEIVED:
      return {
        ...state,
        user: action.data,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.data,
      };
    case LOGGED_OUT:
      return {
        ...state,
        user: null,
        error: null,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
    case USER_ALREADY_EXIST:
      return {
        ...state,
        error: {
          message: 'User already exist',
        },
      };
    default:
      return state;
  }
};

export default auth;
