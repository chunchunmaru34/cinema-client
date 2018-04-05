import {
  REQUEST_USER,
  RECEIVE_USER,
  REQUEST_FAILED,
  UPDATE_SUCCEED,
  CLEAR_INFO,
  CLEAR_ERROR,
  CLEAR_STATE,
  TICKETS_REQUESTED,
  GOT_ALL_TICKETS,
  GOT_RELEVANT_TICKETS,
} from './action-types';

const initialState = {
  userDetails: null,
  tickets: null,
  error: null,
  info: null,
  isLoading: true,
  isTicketsRelevant: true,
  isTicketsLoading: true,
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
        isTicketsLoading: false,
        error: action.data,
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
    case TICKETS_REQUESTED:
      return {
        ...state,
        isTicketsLoading: true,
      };
    case GOT_ALL_TICKETS:
      return {
        ...state,
        tickets: action.data,
        isTicketsRelevant: false,
        isTicketsLoading: false,
      };
    case GOT_RELEVANT_TICKETS:
      return {
        ...state,
        tickets: action.data,
        isTicketsRelevant: true,
        isTicketsLoading: false,
      };
    case CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
}
