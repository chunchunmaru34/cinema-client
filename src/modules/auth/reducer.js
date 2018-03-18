import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGGED_OUT,
} from './actions-types';
import { authService } from '../../services';

const initialState = {
  user: authService.getUserFromToken() || null,
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
      };
    default:
      return state;
  }
};

export default auth;
