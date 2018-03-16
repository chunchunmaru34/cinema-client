import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
  LOGOUT,
  CHECK_FOR_AUTHENTICATED_USER,
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
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case CHECK_FOR_AUTHENTICATED_USER:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
};

export default auth;
