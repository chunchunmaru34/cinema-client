import {
  LOGIN_RECEIVED,
  LOGIN_REQUESTED,
  LOGIN_FAILED,
} from './actions-types';

const initialState = {
  user: null,
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
    default:
      return state;
  }
};

export default auth;
