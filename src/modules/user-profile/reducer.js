import {
  REQUEST_USER,
  RECEIVE_USER,
  REQUEST_FAILED,
  UPDATE_SUCCEED,
  CLEAR_INFO,
  CLEAR_ERROR,
  CLEAR_STATE,
} from './action-types';

const initialState = {
  userDetails: null,
  error: null,
  info: null,
  isLoading: true,
};

export default function profile(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_USER:
      return {
        ...state,
        userDetails: action.data,
        isLoading: false,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case UPDATE_SUCCEED:
      return {
        ...state,
        userDetails: action.data,
        info: 'User was updated successfully',
      };
    case CLEAR_INFO:
      return {
        ...state,
        info: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
